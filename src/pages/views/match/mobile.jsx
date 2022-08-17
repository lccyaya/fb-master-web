import React, { useEffect, useState, useMemo, createRef } from 'react';
import { useIntl } from 'umi';
import styles from './mobile.less';
import { Container, Empty, Search, Spining } from '@/base-components/mobile';
import { Menu, MatchCard, TimeTitle, Calendar, BottomIcon, League } from '@/func-components/mobile';
import { MatchListV3, getMatchesTabs } from '@/services/matchPage';
import moment from 'moment';
import { formatDate, getScrollDirection } from '@/utils/utils';
import IconFont from '@/components/IconFont';
import filterIcon from '@/assets/icon/filter.svg';
import ScrollView from 'react-custom-scrollbars';
import { Spin } from 'antd';
import FixedBtns from '@/components/FixedBtns/mobile';
import { useLocalStorageState, useRequest } from 'ahooks';
import { STORAGE_INDEX_VALUE } from '@/constants';
import { useUpdateMatch } from '@/hooks/update-match';
import cls from 'classnames';

// 初始化的数据
const initParams = {
  zone: -new Date().getTimezoneOffset() / 60, // 获取时区
  // timestamp: new Date().setHours(0, 0, 0, 0) / 1000, // 初始化 今日 0 点 0 分
  timestamp: moment().startOf('days') / 1000,
  // moment()
  keywords: '', // 搜索的 key
  page: 1,
  size: 20,
};
const Mobile = () => {
  const intl = useIntl();
  const [menuActive, setMenuActive] = useState({});
  const [menuList, setMenuList] = useState(null);
  const scrollRef = createRef();
  const [showTopIcon, setShowTopIcon] = useState(false);
  const [indexVal, setIndexVal] = useLocalStorageState(STORAGE_INDEX_VALUE, false);
  const [indexData, setIndexData] = useState({ type: 'icon-tubiao_zhishu', color: '#999999' });
  const [leagueShow, setLeagueShow] = useState(false); // league 是否显示
  const [searchVal, setSearchVal] = useState(''); // 搜索的值
  const [ignoreScroll, setIgnoreScroll] = useState(false); // 临时禁止滚动

  const [searchShow, setSearchShow] = useState(false); // 搜索
  const [calenderShow, setCalenderShow] = useState(false); // 日历是否显示
  const [calenderVal, setCalendarVal] = useState(''); // 日历的值

  // 获取列表的参数 和 page 的参数
  const [params, setParams] = useState(initParams);
  const [pageInfo, setPageInfo] = useState({
    is_pre: false,
    page: 1,
    prePage: 0,
    isLoading: false,
    has_pre: true,
    has_next: true,
  });

  // 调用接口的数据改变
  const onParamsChange = (obj = {}) => {
    const query = { ...params, page: 1, ...obj };
    if (!query.competition_id) {
      delete query.competition_id;
    }
    if (!query.tab_type) {
      delete query.tab_type;
    }
    setParams(query);
    console.log('参数：', query);
  };

  // 选择菜单
  const onMenusChange = (item) => {
    if (item.param_value === menuActive.param_value) {
      return;
    }
    setMenuActive(item);
    const obj = {
      param_key: item.param_key,
      param_value: item.param_value,
      timestamp: moment().startOf('days') / 1000,
    };
    onParamsChange(obj);
    setCalendarVal(''); // 日历的数据每次切换 tab 需要初始化
  };

  // 联赛确认点击
  const onLeagueSubmit = (e) => {
    onParamsChange({ competition_ids: e });
  };

  // 日历变化
  const calendarChange = (v) => {
    const date = v.format('YYYY-MM-DD');
    setCalendarVal(date);
    onParamsChange({ timestamp: moment(date) / 1000 });
    setCalenderShow(false);
  };

  // 滚动临时禁止
  const disableScroll = () => {
    setIgnoreScroll(true);
    setTimeout(() => {
      setIgnoreScroll(false);
    }, 200);
  }

  // 滚动监听
  const handleUpdate = () => {
    if (loading || ignoreScroll || !scrollRef.current) return;
    const values = scrollRef.current.getValues();
    const status = getScrollDirection(values);
    setShowTopIcon(values.scrollTop > 100 ? true : false);

    const { page, prePage, has_pre, has_next } = pageInfo;
    // 下拉加载之前的数据 two_way 获取是否支持
    if (status === 'top' && menuActive.two_way && has_pre) {
      setPageInfo({ ...pageInfo, prePage: prePage - 1, is_pre: true, page, isLoading: 'pre' });
      onParamsChange({ page: prePage - 1 });
    }

    // 上滑到底加载之后的数据
    if (status === 'bottom' && has_next) {
      setPageInfo({ ...pageInfo, page: page + 1, is_pre: false, prePage, isLoading: 'next' });
      onParamsChange({ page: page + 1 });
    }
  };
  const getRequestMatchListV3 = (params) => {
    return MatchListV3(params).then(({ success, code, data: newData, message }) => {
      if (success) {
        newData.matches = newData.matches || [];
        newData.matches.map((item) => {
          item.time = formatDate(item.match_time);
        });
        const matches = data?.matches || [];
        const pageExtra = {};
        if (params.page !== 1) {
          if (pageInfo.is_pre) {
            if (newData.matches.length < params.size) {
              pageExtra.has_pre = false;
            }
            newData.matches = [...newData.matches, ...matches];
          } else {
            if (newData.matches.length < params.size) {
              pageExtra.has_next = false;
            }
            newData.matches = [...matches, ...newData.matches];
          }
        }
        setPageInfo({ ...pageInfo, isLoading: false, ...pageExtra });
        scrollRef?.current?.scrollTop(50);
        return newData;
      } else {
        return { matches: [] };
      }
    });
  };
  const {
    data,
    mutate,
    loading,
    run: getMatchList,
  } = useRequest(getRequestMatchListV3, {
    initialData: {},
    manual: true,
  });
  useUpdateMatch(data?.matches || [], (oldList, list) => {
    const newList = oldList.map((old) => {
      let newObj = list?.find((item) => item.match_id === old.match_id);
      return newObj ? Object.assign(old, newObj) : old;
    });
    mutate({ matches: newList });
  });

  // 获取联赛列表
  const getTabList = async () => {
    const { data = [] } = await getMatchesTabs();
    data.map((item) => {
      item.label = item.name;
      item.key = item.param_key;
      item.id = item.param_value;
    });
    setMenuList(data);
    onParamsChange({
      param_key: data[0].param_key,
      param_value: data[0].param_value,
    });
    setMenuActive(data[0]);
    console.log(data, 'result***', JSON.stringify(data));
  };

  // 底部点击
  const onBottomClick = (item) => {
    // 指数切换
    if (item.type === 'icon-tubiao_zhishu') {
      if (indexVal) {
        setIndexData({ ...indexData, color: '#999999', bg: '' });
        setIndexVal(false);
      } else {
        setIndexData({
          ...indexData,
          color: '#ffffff',
          bg: '#39906A linear-gradient(145deg, #50E4A4 0%, #049A59 100%)',
        });
        setIndexVal(true);
      }
    }

    // 搜索点击
    if (item.type === 'icon-sousuo') {
      setSearchShow(!searchShow);
    }
  };

  // 初始化
  useEffect(() => {
    if (menuList === null) {
      getTabList();
      // 缓存了 index 和 true 的话，需要设置一下这个状态
      if (indexVal === true) {
        setIndexData({
          ...indexData,
          color: '#ffffff',
          bg: '#39906A linear-gradient(145deg, #50E4A4 0%, #049A59 100%)',
        });
      }
      // indexVal
    } else {
      const data = {
        zone: params.zone,
        timestamp: params.timestamp,
        keywords: params.keywords,
        page: params.page,
        size: params.size,
        // competition_ids
      };
      data[params.param_key] = params.param_value;
      if (params.competition_ids && params.param_key !== 'competition_id') {
        data.competition_ids = params.competition_ids;
      }
      getMatchList(data);
    }
  }, [params]);

  // 获取渲染的数据
  const handlerData = (data) => {
    const { matches } = data || {};
    if (matches) {
      let obj = {};
      matches.map((item) => {
        const { time } = item;
        if (obj[time]) {
          obj[time].push(item);
        } else {
          obj[time] = [item];
        }
      });
      return [Object.keys(obj), obj];
    }
    return [[], []];
  };
  const [renderList, renderData] = handlerData(data);

  // loading
  const spinning = useMemo(() => {
    if (menuList === null) {
      return true;
    }
    if (params.page !== 1) {
      return false;
    }
    setPageInfo({ ...pageInfo, has_next: true, has_pre: true }); // 重置是否有上下一页
    return loading;
  }, [loading, menuList, params]);

  return (<>
  {/* styles.container */}
    <div className={cls(styles.container, searchShow ? styles.has_search : null)}>
      <Menu menus={menuList || []} className={styles.menu} onChange={onMenusChange}>
        <div className={styles.menu_right}>
          {menuActive.has_calendar ? (
            <IconFont
              onClick={() => setCalenderShow(true)}
              className={styles.icon}
              type="icon-rili"
              size={18}
            />
          ) : null}
          {menuActive.has_competition ? (
            <img onClick={() => setLeagueShow(true)} src={filterIcon} className={styles.img} />
          ) : null}
        </div>
      </Menu>
      {/* 搜索 */}
      {searchShow ? (
        <div className={styles.search}>
          <Search
            value={searchVal}
            onChange={setSearchVal}
            onEnter={(e) => onParamsChange({ keywords: e })}
          />
          <span className={styles.text} onClick={() => {
            onParamsChange({ keywords: '' });
            setSearchShow(!searchShow)
          }}>
            {intl.formatMessage({ id: 'key_cancel', defaultMessage: 'key_cancel' })}
          </span>
        </div>
      ) : null}
      {/* 主内容 */}
      
      <Spin spinning={spinning}>
      <ScrollView className={styles.scroll_view} onScroll={handleUpdate} ref={scrollRef}>
          <Spining show={pageInfo.isLoading === 'pre'} />

          {/* 列表渲染 */}
          {renderList.map((dataKey, key) => (
            <>
              <TimeTitle title={dataKey} key={key} sticky />
              {renderData[dataKey].map((item, key) => (
                <MatchCard data={item} key={key} type={indexVal ? 'index' : 'score'} />
              ))}
            </>
          ))}

          <Spining show={pageInfo.isLoading === 'next'} />

          {/* 无数据 */}
          {!renderList.length && !spinning ? <Empty /> : null}
      </ScrollView>
      </Spin>

      <Calendar
        params={params}
        show={calenderShow}
        onClose={() => setCalenderShow(false)}
        onChange={calendarChange}
        className={styles.calender}
      />
      <BottomIcon
        onClick={onBottomClick}
        // icons={[indexData, { type: 'icon-sousuo', color: '#39906A' }]}
        icons={[{ type: 'icon-sousuo', color: '#39906A' }]}
      />
      <FixedBtns
        showTopIcon={showTopIcon}
        onTopClick={() => {
          disableScroll(); // 滚动临时禁止
          scrollRef?.current?.scrollTop(0);
        }}
      />
    </div>
    {/* 联赛选择 */}
    <League visible={leagueShow} onSubmit={onLeagueSubmit} onClose={() => setLeagueShow(false)} />
  </>)
};

export default Mobile;
