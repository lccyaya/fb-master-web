import React, { useState, useEffect, createRef, useMemo } from 'react';
import { Tabs, Spin, Button, Radio } from 'antd';
import styles from './pc.module.less';
import IconFont from '@/components/IconFont';
import { Search, Empty } from '@/base-components/pc';
import cls from 'classnames';
import { competitionFilter } from '@/services/competition';
import { FormattedMessage, useIntl, useRequest } from 'umi';
import { COMPETITION_STATUS } from '@/constants/index';
import { SESS_STORAGE_SELECTED_LEAGUES } from '@/constants';
import { getTheSame } from '@/utils/utils';

import emptyLogo from '@/assets/emptyLogo.png';
import check from '@/assets/check.svg';
const League = ({ 
  visible, onClose = () => {}, onSubmit = () => {}
}) => {
  // SESS_STORAGE_SELECTED_LEAGUES
  const intl = useIntl();
  const floorRefs = createRef();
  const [selectedIds, setSelectedIds] = useState(JSON.parse(sessionStorage.getItem(SESS_STORAGE_SELECTED_LEAGUES) || '[]'));
  const [keyword, setKeyword] = useState('');
  const [repeatLen, setRepeatLen] = useState(0);
  const [tab, setTab] = useState(COMPETITION_STATUS['main']);
  const [allLen, setAllLen] = useState(0);
  const [totalData, setTotalData] = useState([]);

  // 整理联赛信息
  const sortList = (categories) => {
    const idLens = [];
    const ids = [...selectedIds];
    const tdata = [];
    categories.map(item => {
      item.competitions.map(subItem => {
        // 统计总数量 去重
        if (idLens.indexOf(subItem.id) === -1) { 
          idLens.push(subItem.id); 
          tdata.push(subItem);
        }
        if (!selectedIds.length) {
          // 第一次 选中所有
          if (ids.indexOf(subItem.id) === -1) { ids.push(subItem.id); }
        }
      })
    });
    setTotalData(tdata); // 所有数据 并且不重复  过滤时需要用
    setAllLen(idLens.length);
    setSelectedIds(getTheSame(ids, idLens));
  }

  // 获取联赛列表
  const { data: dataResult, loading, run: getFilter } = useRequest(competitionFilter, {
    initialData: {},
    manual: true,
    formatResult: ({ data, success }) => {
      if (success) {
        const categories = data?.categories;
        sortList(categories); // 整理联赛信息
        dataResult[tab] = categories;
        return dataResult;
      } else {
        return [];
      }
    }
  });

  // 菜单点击
  const  onMenuChange = (e) => {
    setTab(e);
    dataResult[e] && sortList(dataResult[e]);
    const current = floorRefs?.current;
    current.scrollTop = 0;
  }

  // 左侧菜单点击
  const onMenuClick = (e) => {
    const current = floorRefs?.current;
    const top = current.getElementsByTagName('h5')[+e].offsetTop;
    current.scrollTop = top - 100;
  }

  // 是否全部选中
  const isAll = useMemo(() => {
    const len = selectedIds.length;
    if (len && len === allLen) {
      return true;
    }
    return false;
  }, [selectedIds, allLen])

  // 是否为空
  const isEmpty = useMemo(() => {
    // console.log(keyword, '&&', dataResult, tab);
    // && dataResult[tab]?.length > 0
    if (!keyword) {
      return false;
    } else if (keyword && totalData?.filter((item) => item.name.includes(keyword)).length) {
      return false;
    }
    return true;
  }, [keyword, dataResult, tab])

  // 选择联盟
  const handleLeagueClick = (id) => {
    const ids = [...selectedIds];
    const i = ids.indexOf(id);
    if (i > -1) {
      ids.splice(i, 1);
    } else {
      ids.push(id);
    }
    setSelectedIds([...ids]);
  };

  // 全选/非全选
  const handleSelectAllClick = () => {
    const ids = [];
    if (!isAll) {
      data.map(item => item.competitions.map(subItem => (ids.indexOf(subItem.id) === -1 && ids.push(subItem.id))));
    }
    setSelectedIds(ids);
  }

  // 选中
  const handleFinishClick = () => {
    sessionStorage.setItem(SESS_STORAGE_SELECTED_LEAGUES, JSON.stringify(selectedIds))
    onSubmit(selectedIds);
    onClose();
  }

  useEffect(() => {
    if (visible && (!dataResult || !dataResult[tab])) {
      getFilter({ tab: COMPETITION_STATUS[tab] });
    }
  }, [visible, tab])

  const ListItem = ({ subItem, name }) => {
    const isSubscribed = isAll || selectedIds.indexOf(subItem.id) > -1;
    // const isHidden = keyword && subItem?.name?.indexOf(keyword) === -1;
    return (
      <div
        className={cls(styles.logoCon)}
        key={`${name}_${subItem.id}`}
        onClick={() => {
          handleLeagueClick(subItem.id);
        }}
      >
        <img className={styles.logo} src={subItem.logo || emptyLogo} />
        {isSubscribed ? <img className={styles.check} src={check} /> : null}
        <div className={styles.name}>
          <span className={styles.nameText}>{subItem.name}</span>
        </div>
      </div>
    );
  }

  const data = dataResult[tab] || [];
  return <div className={cls(styles.league, visible ? styles.show : null)}>
    <div className={styles.content}>
      <IconFont className={styles.close} type="icon-yuanquanguanbi" size={24} onClick={onClose}/>
      <h5 className={styles.title}>
        {intl.formatMessage({id: "key_select_the_league",defaultMessage: "key_select_the_league"})}</h5>

      <Spin spinning={loading}>
        <Search value={keyword} onChange={e => setKeyword(e)} placeholder={intl.formatMessage({ id: 'key_search_for_leagues' })}/>
  
        {/* 菜单 */}
        <Tabs defaultActiveKey="1" centered onChange={onMenuChange}>
          <Tabs.TabPane tab={intl.formatMessage({id: "key_main",defaultMessage: "key_main"})} key={COMPETITION_STATUS['main']}/>
          <Tabs.TabPane tab={intl.formatMessage({id: "key_all",defaultMessage: "key_all"})} key={COMPETITION_STATUS['all']}/>
        </Tabs>

        {/* competition list */}
        <div className={cls(styles.competition_list, isEmpty ? styles.empty_list : null)}>
          {/* 无数据展示 */}
          { isEmpty && !loading ? <Empty/> : null }

          {/* 左侧菜单 */}
          {!keyword && !isEmpty ? <Tabs tabPosition={'left'} onChange={onMenuClick}>
            { data?.map((item, key) => <Tabs.TabPane tab={item.name} key={key}/>) }
          </Tabs> : null}

          {/* 列表 */}
          <div className={styles.list} ref={floorRefs}>
            { !keyword ? data?.map((item, i) => {
              return (
                <div className={cls(styles.floor)} key={item.name}>
                  <h5 className={styles.title}><span>{item.name}</span></h5>
                  <div className={styles.floorContent}>
                    {item.competitions.map((subItem) => <ListItem name={item.name} subItem={subItem}/>)}
                  </div>
                </div>
              );
            }) : <div className={styles.floorContent}>
              {totalData?.filter((item) => item.name.includes(keyword)).map((item, key) => {
                return <ListItem name={key} subItem={item}/>;
              })}
            </div>}
          </div>
        </div>

        {/* 底部 */}
        <div className={styles.footer}>
          {!keyword && (
            <div className={styles.top}>
               {/* onClick={handleSelectAllClick} */}
              <label className={styles.radio}>
                <Radio checked={isAll} onClick={handleSelectAllClick}>
                  <span><FormattedMessage id="key_select_all" /></span>
                </Radio>
              </label>
              <div className={styles.selectedTip}>
                {selectedIds.length} <FormattedMessage id="key_league_selected" />
              </div>
            </div>
          )}
          {keyword ? (
            <Button
              className={cls(styles.button, styles.back)}
              onClick={() => setKeyword('')}
              type="default"
            >
              <span><FormattedMessage id="key_back" /></span>
            </Button>
            ) : (
              <Button
                className={cls(styles.button, styles.choose)}
                onClick={handleFinishClick}
                disabled={selectedIds.length === 0}
                type="primary"
              >
                <span><FormattedMessage id="key_finish" /></span>
              </Button>
            )}
          </div>
      </Spin>
    </div>
  </div>
};

export default League;