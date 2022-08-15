import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { connect, FormattedMessage, Link, useIntl } from 'umi';
import type { ConnectState } from '@/models/connect';
import { Col, Row, Spin, Tabs } from 'antd';
import MatchCardHome from '../MatchCardHome';
import MatchCardScore from '../MatchCardScore';
import styles from './index.less';
import type { hotCompetition, matchType, NewMatchList } from '@/services/matchPage';
import type * as matchService from '@/services/matchPage';
import filterIcon from '../../assets/icon/filter.svg';
import MEmpty from '@/components/Empty';
import type { UserInfoType } from '@/services/user';
import LoginModal from '@/components/MatchCard/Login';
import LeagueFilterModal from '@/components/LeagueFilterModal';
import { report } from '@/services/ad';
import type { REPORT_CATE } from '@/constants';
import { REPORT_ACTION, SESS_STORAGE_SELECTED_LEAGUES } from '@/constants';
// import { checkIsPhone } from '@/utils/utils';
import { getAtLeastThreeDayMatch, getMatchStatus, MatchStatus } from '@/utils/match';
import { CheckOutlined } from '@ant-design/icons';
import { toShortLangCode } from '@/utils/utils';
import { locale } from '@/app';
import { MatchCard } from '@/func-components/pc';

const { TabPane } = Tabs;

export const getDateData = (matches: matchType[]) => {
  if (!matches) return [];
  const dayObj = {};
  for (let i = 0; i < matches.length; i += 1) {
    const ele = matches[i];
    const day = new Date(ele.match_time * 1000).setHours(0, 0, 0, 0);
    const stringDay = `${day}`;
    ele.currentDay = stringDay;
    dayObj[stringDay] = 0;
  }

  const dayKeys = Object.keys(dayObj);
  const final = dayKeys.map((day: string) => {
    const dayData = matches.filter((ele: matchType) => ele.currentDay === day);
    return {
      date: day,
      matches: dayData,
    };
  });
  return final;
};

function groupMatchByFinishStatus(data: matchType[]) {
  const finished: matchType[] = [];
  const notFinished: matchType[] = [];
  data.forEach((d) => {
    const s = getMatchStatus(d.status);
    if (s === MatchStatus.Complete || s === MatchStatus.TBD) {
      finished.push(d);
    } else {
      notFinished.push(d);
    }
  });
  return {
    finished,
    notFinished,
  };
}

function Matches(props: {
  match: matchService.matchType;
  switchType: string;
  reportCate?: REPORT_CATE;
  setParams: (id: number, bool: boolean) => void;
  handleChangeLiveMatch: (id: number) => void;
}) {
  const { switchType, match, reportCate, setParams, handleChangeLiveMatch } = props;
  return (
    <>
      <MatchCard data={match} key={match.match_id} type={switchType === 'Score' ? 'score' : 'index' } />
      {/* {switchType === 'Score' ? (
        <MatchCardScore
          reportCate={reportCate}
          data={match}
          setParams={setParams}
          handleChangeLiveMatch={handleChangeLiveMatch}
          whiteBg
          expandable
        />
      ) : (
        <MatchCardHome
          reportCate={reportCate}
          data={match}
          setParams={setParams}
          handleChangeLiveMatch={handleChangeLiveMatch}
          whiteBg
        />
      )} */}
    </>
  );
}

// function LiveEmpty() {
//   return <div className={styles.liveEmpty}>
//     <div className={styles.text}>
//       <FormattedMessage id='key_no_game_in_progress' />
//     </div>
//   </div>
// }

function MatchListComp(props: {
  data: matchType[];
  onChange: (data: matchType[]) => void;
  reportCate?: REPORT_CATE;
  handleChangeLiveMatch: (id: number) => void;
}) {
  const { data, onChange, reportCate } = props;
  return (
    <>
      {data.map((ele) => {
        return (
          <Matches
            reportCate={reportCate}
            key={ele.match_id}
            match={ele}
            switchType="Score"
            setParams={(id: number, bool: boolean) => {
              const sameMatch = data.find((m) => m.match_id === id);
              if (sameMatch) {
                sameMatch.subscribed = bool;
                const cloned = JSON.parse(JSON.stringify(data));
                onChange(cloned);
              }
            }}
            handleChangeLiveMatch={props.handleChangeLiveMatch}
          />
        );
      })}
    </>
  );
}

const dateFmt = 'DD/MM';
const today = new Date().setHours(0, 0, 0, 0);
const yesterdayDate = moment(today - 864e5).format(dateFmt);
const todayDate = moment(today).format(dateFmt);
const tomorrowDate = moment(today + 864e5).format(dateFmt);

interface matchListProps {
  handleChangeLiveMatch: (id: number) => void;
  currentUser?: UserInfoType | null;
  reportCate?: REPORT_CATE;
  ssrMatchList?: NewMatchList;
  hideLoading?: boolean;
  onTypeChange?: (type: 'Index' | 'Score') => void;
  onTabTypeChange?: (type: string) => void;
}

const MatchList: React.FC<matchListProps> = (props) => {
  const { currentUser, reportCate, ssrMatchList } = props;
  const formatMsg = useIntl().formatMessage;

  const initTypes = [
    { id: 'main', name: useIntl().formatMessage({ id: 'key_main' }) },
    { id: 'all', name: useIntl().formatMessage({ id: 'key_all' }) },
    { id: 'subscribed', name: useIntl().formatMessage({ id: 'key_subscribed' }) },
  ];

  const dateTypes = [
    {
      key: 'yesterday',
      name: formatMsg({ id: 'key_yesterday' }),
    },
    {
      key: 'today',
      name: formatMsg({ id: 'key_today' }),
    },
    {
      key: 'tomorrow',
      name: formatMsg({ id: 'key_tomorrow' }),
    },
  ];

  const groupedMatchList = groupMatchByFinishStatus(ssrMatchList?.matches ?? []);

  const [dateType, setDateType] = useState('today');
  const [leagueFilterVisible, setLeagueFilterVisible] = useState(false);
  const [competitionType, setCompetitionType] = useState<any>('main');
  const [matchList, setMatchList] = useState(ssrMatchList?.matches ?? []);
  const [notFinishedMatchList, setNotFinishedMatchList] = useState(groupedMatchList.notFinished);
  const [finishedMatchList, setFinishedMatchList] = useState(groupedMatchList.finished);
  // const [canPlayLiveMatches, setCanPlayLiveMatches] = useState<matchType[]>([]);
  const [isMatchListLoading, setMatchListLoading] = useState<boolean>(false);
  const [competitionList] = useState<hotCompetition[]>(initTypes);
  const [loginVisible, setLoginVisible] = useState<boolean>(false);
  // const [switchType, setSwitchType] = useState<string>('Score');
  const [selectedCompetitionIds, setSelectedCompetitionIds] = useState<number[] | undefined>();
  // const [upcomingList, setUpcomingList] = useState<matchType[]>([]);
  // const liveTimer = useRef<number>();

  const todayTimestamp = new Date().setHours(0, 0, 0, 0);

  const getMatchList = async (t: number | string, loading = true) => {
    setMatchListLoading(loading);
    const zone = -new Date().getTimezoneOffset() / 60;
    const res = await getAtLeastThreeDayMatch({
      secondDayTimestamp: todayTimestamp,
      zone,
      tab_type: ['', 'main', 'all', 'subscribed'].indexOf(String(t)) as 1 | 2 | 3,
      tab_competition_ids: selectedCompetitionIds?.length ? selectedCompetitionIds : undefined,
    });
    setMatchList(res);
    setMatchListLoading(false);
  };

  useEffect(() => {
    let ids: number[] = [];
    try {
      ids = JSON.parse(sessionStorage.getItem(SESS_STORAGE_SELECTED_LEAGUES) || '[]');
      // eslint-disable-next-line no-empty
    } catch (e) {}
    setSelectedCompetitionIds(ids);
    // return () => {
    //   clearInterval(liveTimer.current);
    // };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!selectedCompetitionIds) return;
    if (competitionType !== 'live') {
      getMatchList(competitionType, !props.hideLoading);
    }
  }, [selectedCompetitionIds]);

  const handleClick = (key: any) => {
    props.onTabTypeChange?.(key);
    // clearInterval(liveTimer.current);
    if (reportCate) {
      report({
        cate: reportCate,
        action: REPORT_ACTION.home_tab + key,
      });
    }
    if (key === 'subscribed' && !currentUser) {
      setLoginVisible(true);
      return;
    }
    setCompetitionType(key);
    getMatchList(key);
  };

  const setMatch = (date: string) => {
    const targetDate = { yesterday: yesterdayDate, today: todayDate, tomorrow: tomorrowDate }[
      date
    ]!;
    const matchData = matchList.filter((m) => {
      const matchDate = moment(m.match_time * 1000).format(dateFmt);
      return matchDate === targetDate;
    });
    if (date === 'today') {
      const data = groupMatchByFinishStatus(matchData);
      setNotFinishedMatchList(data.notFinished);
      setFinishedMatchList(data.finished);
    } else {
      setNotFinishedMatchList(matchData);
      setFinishedMatchList([]);
    }
  };

  const handleDateTabChange = (date: string) => {
    setDateType(date);
    setMatch(date);
  };

  const handleLeagueChange = (isAll: boolean, selectedIds: number[]) => {
    setLeagueFilterVisible(false);
    setSelectedCompetitionIds(isAll ? [] : selectedIds);
  };

  const handleFilterLeagueTriggerClick = () => {
    setLeagueFilterVisible(true);
    if (reportCate) {
      report({
        action: REPORT_ACTION.select_league,
        cate: reportCate,
      });
    }
  };

  useEffect(() => {
    setMatch(dateType);
  }, [matchList]);
  const lang = toShortLangCode(locale.getLocale());
  return (
    <div className={styles.container}>
      <LoginModal
        visible={loginVisible}
        onLogin={() => {
          setLoginVisible(false);
        }}
        onCancel={() => {
          setLoginVisible(false);
        }}
      />
      <Spin spinning={isMatchListLoading}>
        <Row className={styles.tabsContainer}>
          <Col span={14}>
            <Tabs
              activeKey={`${competitionType}`}
              className={styles.tabs}
              onChange={(activeKey) => handleClick(activeKey)}
            >
              {competitionList.map((ele) => {
                return <TabPane tab={ele.name} key={ele.id} />;
              })}
            </Tabs>
          </Col>
          <Col className={styles.filterIconContainer} onClick={handleFilterLeagueTriggerClick}>
            <img src={filterIcon} className={styles.menuIcon} />
          </Col>
        </Row>
        <Row className={styles.dateTabContainer}>
          <Tabs onChange={handleDateTabChange} activeKey={dateType}>
            {dateTypes.map((t) => (
              <TabPane tab={t.name} key={t.key} />
            ))}
          </Tabs>
        </Row>
        <Row className={styles.matchLIstContainer}>
          {notFinishedMatchList.length + finishedMatchList.length > 0 ? (
            <>
              <MatchListComp
                data={notFinishedMatchList}
                onChange={setNotFinishedMatchList}
                reportCate={reportCate}
                handleChangeLiveMatch={props.handleChangeLiveMatch}
              />
              {finishedMatchList.length > 0 && (
                <div className={styles.finishedMatchTip}>
                  <CheckOutlined className={styles.icon} />
                  <div className={styles.text}>
                    <FormattedMessage id="key_finished_matches" />
                  </div>
                </div>
              )}
              <MatchListComp
                data={finishedMatchList}
                onChange={setFinishedMatchList}
                reportCate={reportCate}
                handleChangeLiveMatch={props.handleChangeLiveMatch}
              />
            </>
          ) : (
            !isMatchListLoading && <MEmpty />
          )}
        </Row>
        <Link
          to={`/${lang}/${competitionType === 'live' ? 'live' : `match?type=${competitionType}`}`}
          style={{ width: '100%' }}
        >
          <Row className={styles.footer}>
            <FormattedMessage id="key_more" />
          </Row>
        </Link>
      </Spin>

      <LeagueFilterModal
        open={leagueFilterVisible}
        close={() => setLeagueFilterVisible(false)}
        onOk={handleLeagueChange}
      />
    </div>
  );
};
// export default MatchList;
export default connect(({ user }: ConnectState) => ({
  currentUser: user.currentUser,
}))(MatchList);
