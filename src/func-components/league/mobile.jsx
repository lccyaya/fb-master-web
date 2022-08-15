import React, { useState, useEffect, createRef, useMemo } from 'react';
import { Tabs, Spin, Button, Radio } from 'antd';
import styles from './mobile.module.less';
import IconFont from '@/components/IconFont';
import { Search, Empty } from '@/base-components/mobile';
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
  const intl = useIntl();
  const floorRefs = createRef();
  const [selectedIds, setSelectedIds] = useState(JSON.parse(sessionStorage.getItem(SESS_STORAGE_SELECTED_LEAGUES) || '[]'));
  const [keyword, setKeyword] = useState('');
  const [tab, setTab] = useState(COMPETITION_STATUS['main']);
  const [allLen, setAllLen] = useState(0);
  const [data, setData] = useState([]);

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
    setData(tdata);
    setAllLen(idLens.length);
    setSelectedIds(getTheSame(ids, idLens));
  }

  // 获取联赛列表
  const { data: dataResult, loading, run: getFilter } = useRequest(competitionFilter, {
    initialData: {},
    manual: true,
    formatResult: ({ code, data, message }) => {
      const categories = data?.categories;
      sortList(categories); // 整理联赛信息
      dataResult[tab] = categories;
      return dataResult;
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
    if (!keyword) {
      return false;
    } else if (keyword && data?.filter((item) => item.name.includes(keyword)).length) {
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
      data.map(item => ids.indexOf(item.id) === -1 && ids.push(item.id));
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

  return <div className={cls(styles.league, visible ? styles.show : null)}>
    <i className={styles.bg} onClick={onClose}></i>
    <div className={styles.content}>
      <IconFont className={styles.close} type="icon-yuanquanguanbi" size={24} onClick={onClose}/>
      <h5 className={styles.title}>
        {intl.formatMessage({id: "key_select_the_league",defaultMessage: "key_select_the_league"})}</h5>

      <Spin spinning={loading}>
        <div className={styles.search} >
            <Search value={keyword} onChange={e => setKeyword(e)} placeholder={intl.formatMessage({ id: 'key_search_for_leagues' })}/>
        </div>
  
        {/* 菜单 */}
        <Tabs defaultActiveKey="1" centered onChange={onMenuChange}>
          <Tabs.TabPane tab={intl.formatMessage({id: "key_main",defaultMessage: "key_main"})} key={COMPETITION_STATUS['main']}/>
          <Tabs.TabPane tab={intl.formatMessage({id: "key_all",defaultMessage: "key_all"})} key={COMPETITION_STATUS['all']}/>
          {/* { data?.map((item, key) => <Tabs.TabPane tab={item.name} key={key}/>) } */}
        </Tabs>

        <div className={styles.competition_list}>
          <div className={styles.list} ref={floorRefs}>
            {/* 无数据展示 */}
            { isEmpty && !loading ? <Empty/> : null }

            {/* 列表 */}
            {data?.filter((item) => item.name.includes(keyword)).map((item, i) => {
              const isSubscribed = isAll || selectedIds.indexOf(item.id) > -1;
              return <div
                className={styles.logoCon}
                key={`${i}_${item.id}`}
                onClick={() => {
                  handleLeagueClick(item.id);
                }}
              >
                <img className={styles.logo} src={item.logo || emptyLogo} />
                {isSubscribed ? <img className={styles.check} src={check} /> : null}
                <div className={styles.name}>
                  <span className={styles.nameText}>{item.name}</span>
                </div>
              </div>
            })}
          </div>
        </div>

        {/* 底部 */}
        <div className={styles.footer}>
          {!keyword && (
            <div className={styles.top}>
              <label className={styles.radio} >
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