import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useIntl } from 'umi';
import styles from './pc.module.less';
import ScrollView from 'react-custom-scrollbars';
import { Content, League, MatchCard, TimeTitle, Calendar } from '@/func-components/pc';
import { Container, Search, Switch, IconButton, Empty, More, Spining } from '@/base-components/pc';
import { MatchListV3, getMatchesTabs } from '@/services/matchPage';
import { Spin, Row } from 'antd';
import moment from 'moment';
import { formatDate, getScrollDirection } from '@/utils/utils';
import { useLocalStorageState, useRequest } from 'ahooks';
import { STORAGE_INDEX_VALUE } from '@/constants';
import { useUpdateMatch } from '@/hooks/update-match';

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
let firstTime = null;
const Match = () => {
  const [indexVal, setIndexVal] = useLocalStorageState(STORAGE_INDEX_VALUE, false);

  const [menuActive, setMenuActive] = useState({});
  const [leagueShow, setLeagueShow] = useState(false); // league 是否显示

  const [calenderShow, setCalenderShow] = useState(false); // 日历是否显示
  const [calenderVal, setCalendarVal] = useState(''); // 日历的值
  const [currentHeight, setCurrentHeight] = useState(null);
  const [ignoreScroll, setIgnoreScroll] = useState(false); // 临时禁止滚动

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

  const [searchVal, setSearchVal] = useState('');
  const [menuList, setMenuList] = useState(null);
  const intl = useIntl();
  const scrollRef = useRef();

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
  };

  // 选择菜单
  const onMenusChange = (item) => {
    if (item.param_value === menuActive.param_value) {
      return;
    }
    setMenuActive(item);
    onParamsChange({
      param_key: item.param_key,
      param_value: item.param_value,
      timestamp: moment().startOf('days') / 1000,
    });
    setCalendarVal(''); // 日历的数据每次切换 tab 需要初始化
  };

  // 日历变化
  const calendarChange = (v) => {
    const date = v.format('YYYY-MM-DD');
    setCalendarVal(date);
    onParamsChange({ timestamp: moment(date) / 1000 });
    setCalenderShow(false);
  };

  // 联赛确认点击
  const onLeagueSubmit = (e) => {
    onParamsChange({ competition_ids: e });
  };

  // 获取联赛列表
  const getTabList = async () => {
    const { data = [] } = await getMatchesTabs();
    data.map((item) => {
      item.label = item.name;
    });
    setMenuList(data);
    onParamsChange({
      param_key: data[0].param_key,
      param_value: data[0].param_value,
    });
    setMenuActive(data[0]);
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

  // 点击加载更多
  const getPreMore = () => {
    const { prePage, has_pre } = pageInfo;
    setPageInfo({ ...pageInfo, prePage: prePage - 1, is_pre: true, isLoading: 'pre' });
    onParamsChange({ page: prePage - 1});
  }

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
    const current = scrollRef.current;
    const status = getScrollDirection(current.getValues());

    const { page, prePage, has_pre, has_next } = pageInfo;
    // 下拉加载之前的数据 two_way 获取是否支持
    if (status === 'top' && menuActive.two_way && has_pre) {
      setCurrentHeight(current.getValues().scrollHeight);
      setPageInfo({ ...pageInfo, prePage: prePage - 1, is_pre: true, page, isLoading: 'pre' });
      onParamsChange({ page: prePage - 1 });
    }

    // 上滑到底加载之后的数据
    if (status === 'bottom' && has_next) {
      setPageInfo({ ...pageInfo, page: page + 1, is_pre: false, prePage, isLoading: 'next' });
      onParamsChange({ page: page + 1 });
    }
  };

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

  // 兼听是否要处理滚动条位置
  useEffect(() => {
    if (currentHeight && !loading) {
      const height = currentHeight;
      setTimeout(() => {
        const current = scrollRef.current;
        disableScroll();
        console.log(current.getValues().scrollHeight, height);
        current.scrollTop(current.getValues().scrollHeight - height);
      }, 1500)
      setCurrentHeight(null);
    }
  }, [currentHeight, loading])

  // 初始化
  useEffect(() => {
    if (menuList === null) {
      getTabList();
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

  return (
    <Container>
      <Spin spinning={spinning}>
        <Content menus={menuList || []} onChange={onMenusChange}>
          {/* 操作栏 */}
          <div className={styles.tools}>
            <Search
              width={456}
              value={searchVal}
              onChange={setSearchVal}
              onEnter={(e) => onParamsChange({ keywords: e })}
            />
            <div className={styles.aside}>
              <Switch
                title={intl.formatMessage({ id: indexVal ? 'key_score' : 'key_index' })}
                value={indexVal}
                onChange={setIndexVal}
              />
              <IconButton
                onClick={() => setLeagueShow(true)}
                active={params.competition_ids}
                icon="icon-bisai"
                show={menuActive.has_competition}
                title={intl.formatMessage({ id: 'key_league', defaultMessage: 'key_league' })}
              />
              <IconButton
                active={calenderVal}
                show={menuActive.has_calendar}
                onClick={() => setCalenderShow(true)}
                icon="icon-rili"
                title={
                  calenderVal
                    ? calenderVal
                    : intl.formatMessage({
                        id: 'key_calendar',
                        defaultMessage: 'key_calendar',
                      })
                }
              >
                <Calendar
                  params={params}
                  show={calenderShow}
                  onClose={() => setCalenderShow(false)}
                  onChange={calendarChange}
                  className={styles.calender}
                />
              </IconButton>
            </div>
          </div>

          <div className={styles.list}>
            {/* 列表渲染加上滚动监听 */}
            {renderList.length && !spinning ? (
              <ScrollView className={styles.scroll_view} onScroll={handleUpdate} ref={scrollRef}>
                <Spining show={pageInfo.isLoading === 'pre'} />
                <More
                  show={pageInfo.isLoading !== 'pre' && pageInfo.has_pre && menuActive.two_way}
                  className={styles.more} onClick={getPreMore}
                />
                {renderList.map((dataKey, key) => (
                  <>
                    <TimeTitle title={dataKey} sticky key={key} />
                    <div className={styles.match_card_wrap} key={key}>
                      {renderData[dataKey].map((item) => (
                        <MatchCard
                          data={item}
                          key={`${item.match_id}_${key}`}
                          type={indexVal ? 'index' : 'score'}
                          className={styles.match_card}
                        />
                      ))}
                    </div>
                  </>
                ))}
                <Spining show={pageInfo.isLoading === 'next'} />
              </ScrollView>
            ) : null}

            {/* 无数据 */}
            {!renderList.length && !spinning ? <Empty /> : null}
          </div>
        </Content>
      </Spin>

      {/* 联赛选择 */}
      <League visible={leagueShow} onSubmit={onLeagueSubmit} onClose={() => setLeagueShow(false)} />
    </Container>
  );
};

export default Match;
