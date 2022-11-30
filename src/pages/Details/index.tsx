/* eslint-disable react-hooks/rules-of-hooks */
import { Dispatch, useHistory } from 'umi';
import { useLocation } from 'umi';
import { connect, FormattedMessage, useIntl } from 'umi';
import type { ConnectState } from '@/models/connect';
import React, { useEffect, useRef, useState } from 'react';
import { Col, message, Row, Spin, Tag } from 'antd';
import type { RouteComponentProps } from 'dva/router';
import * as matchService from '@/services/match';
import MEmpty from '@/components/Empty';
import * as matchUtils from '@/utils/match';
import { getMatchStatus, MatchStatus } from '@/utils/match';
import Banner from '@/components/Banner';
import CallAppModal from '@/components/OpenApp/CallAppModal';
import Scheme from './scheme/index';
import { Tabs, Badge, CapsuleTabs } from 'antd-mobile';
// import FBWorldCapTab from '@/components/FBWordCopTab';
import RightTab from './Stats/RightTab';
import GoalLost from './Strength/GoalLost';

import IconFont from '@/components/IconFont';

import SupportYourTeam from '../../components/SupportYourTeam';
import Tips from '../../components/Tips';
import styles from './index.less';

import IndexTab from './IndexTab';
import LineUp from './LineUp';
import Stats from './Stats';
import Strength from './Strength';

import CutMatchRank from './Stats/CutMatchRank';
import HistoryRanking from './Stats/HistoryRanking';
import FutureMatch from './Stats/FutureMatch';
import RecentGames from './Stats/RecentGames';

// import Strength from './Strength';

import type { SupportVoteData } from '@/components/SupportYourTeam';

import type { tipsType } from '@/services/home';
import * as homeService from '@/services/home';
import { REPORT_ACTION, REPORT_CATE } from '@/constants';
import { report } from '@/services/ad';
import { checkIsPhone, toShortLangCode } from '@/utils/utils';
import Notification from '@/components/Notification';
import InfoCard from './InfoCard';
import Events from './Events';
import MatchLive from '@/components/MatchLive';
import Progress from '@/pages/Details/Progress';
import DetailNews from '@/pages/Details/News';
import { locale } from '@/app';
import { handleReport } from '@/utils/report';
import { NavBar } from 'antd-mobile';

type TabType = 'index' | 'lineUp' | 'data' | 'overview' | 'info' | 'scheme';

export type DetailProps = {
  dispatch: Dispatch;
  isPhone: boolean;
  showTips: boolean;
} & RouteComponentProps<{
  matchId: string;
}>;

const { CheckableTag } = Tag;

function pauseVideo() {
  [].forEach.call(document.querySelectorAll('video'), (v: HTMLVideoElement) => {
    v.pause();
  });
}

const Details: React.FC<DetailProps> = (props) => {
  const location = useLocation();
  const history = useHistory();
  const lang = toShortLangCode(locale.getLocale());
  const isPhone = checkIsPhone();
  const timer = useRef<number>();
  const [detailType, setDetailType] = useState<string>('overview');
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<matchService.MatchDetails>();
  const [tipsData, setTipsData] = useState<tipsType[]>([]);
  const [voteData, setVoteData] = useState<SupportVoteData>();
  const [notificationVisible, setNotificationVisible] = useState(true);
  const [newsTabVisible, setNewsTabVisible] = useState(false);
  const [selectNewsTabIfHasData, setSelectNewsTabIfHasData] = useState(false);
  // 是否展示方案入口
  const [hasScheme, setHasScheme] = useState(false);
  const tabClicked = useRef(false);
  const videoWrapperRef = useRef<HTMLDivElement | null>(null);

  const { matchId } = props.match.params;
  const { showTips } = props;
  // const { TabPane } = Tabs;
  const tab = [
    { title: '同主客', key: '0' },
    { title: '同赛事', key: '1' },
    { title: '20场', key: '2' },
  ];
  const init = async (showLoading = true) => {
    if (showLoading) {
      setLoading(true);
    }
    const result = await matchService.matchDetails({ match_id: +matchId });
    setLoading(false);
    let pull = false;
    if (result.success) {
      const match = result.data;
      const status = getMatchStatus(match.status);
      console.log(match, status, '&&&&');
      setHasScheme(match.has_scheme);

      if (match.has_scheme) {
        const tab = location?.query?.tab;
        if (tab === 'scheme') {
          setDetailType('scheme');
        }
      } else if (status === MatchStatus.Before || status === MatchStatus.TBD) {
        if (!tabClicked.current) {
          setDetailType('data');
        }
      } else if (status === MatchStatus.Going) {
        pull = true;
        if (!tabClicked.current) {
          setDetailType('overview');
        }
      } else if (status === MatchStatus.Complete) {
        if (!tabClicked.current) {
          setSelectNewsTabIfHasData(true);
          // 移动端如果有集锦或者资讯，就显示 info tab
          if (isPhone && match.has_highlight && match.highlights.length) {
            setNewsTabVisible(true);
            setDetailType('info');
          }
        }
      }
      setData(result.data);
    } else {
      pull = true;
    }
    clearTimeout(timer.current);
    if (pull) {
      timer.current = window.setTimeout(() => init(false), 10000);
    }
  };

  const getVoteInfo = async () => {
    const voteInfo = await matchService.matchVote({ match_id: +matchId });
    if (voteInfo.success && voteInfo.data) {
      // @ts-ignore
      setVoteData(voteInfo.data);
    }
  };

  const getTipsData = async () => {
    const result = await homeService.getTipData();
    if (result.success) {
      if (result.data.tips && result.data.tips.length > 0) {
        const currentTipsData = result.data.tips.filter(
          (m) => Number(m.match_id) === Number(matchId),
        );
        setTipsData(currentTipsData.length ? [currentTipsData[0]] : []);
      }
    }
  };

  const handleScroll = () => {
    if (!videoWrapperRef.current) return;
    const { y, height } = videoWrapperRef.current.getBoundingClientRect();
    if (document.documentElement.scrollTop > window.scrollY + y + height - 48) {
      pauseVideo();
    }
  };

  useEffect(() => {
    init();
    getTipsData();
    getVoteInfo();
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer.current);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onVoteHandler = async (type: matchService.VOTE_TYPE, cb: (e?: string) => void) => {
    const result = await matchService.vote({ match_id: +matchId, vote_type: type });
    if (result.success) {
      await getVoteInfo();
      cb();
    } else {
      message.error(result.message);
      cb(result.message);
    }
  };

  const handleDetailTypeClick = (type: string) => {
    tabClicked.current = true;
    setDetailType(type);
    if (type === 'scheme') {
      handleReport({ action: 'scheme', tag: '', cate: 'matchdetail' });
    } else {
      report({
        cate: REPORT_CATE.match_detail,
        action: REPORT_ACTION[`match_detail_tab_${type.toLowerCase()}`],
      });
    }
  };

  const handleNewsTotalLoaded = (total: number) => {
    if (total > 0) {
      setNewsTabVisible(true);
      if (selectNewsTabIfHasData) {
        setDetailType('info');
      }
    }
  };

  const Vote = voteData ? (
    <SupportYourTeam match={data} data={voteData} onVote={onVoteHandler} />
  ) : null;

  const status = data ? getMatchStatus(data.status) : null;
  const hasLive =
    status === MatchStatus.Going &&
    Boolean(data?.has_live) &&
    Boolean(data?.normal_live_link || data?.high_live_link);
  const hasHighlight = Boolean(data?.has_highlight && data?.highlights.length);
  const hasPlayback = Boolean(data?.playback_link);
  // const back = () => {
  //   history.goBack();
  // };

  return (
    <div style={{ height: '100%', background: '#F7FAFB' }}>
      <Spin spinning={loading}>
        {/* {checkIsPhone() && (
          <NavBar className={styles.navbar} onBack={back}>
            比赛详情
          </NavBar>
        )} */}
        <div className={styles.main}>
          <InfoCard
            match={data}
            reportCate={REPORT_CATE.match_detail}
            reportAction={REPORT_ACTION.match_detail_remind}
          />
          {data ? (
            <Row
              className={styles.container}
              gutter={16}
              style={checkIsPhone() ? { margin: 0 } : {}}
            >
              <Col className={styles.left} xs={24} sm={24} md={24} lg={15} xl={15}>
                {(hasLive || hasHighlight || hasPlayback) && !checkIsPhone() && (
                  <Row className={styles.videoContainer}>
                    <MatchLive
                      isHighlight={!hasLive && (hasHighlight || hasPlayback)}
                      matchList={[data]}
                      hideVideoTeamInfo
                      hideVideoTitle
                      onlyOne
                      reportCate={REPORT_CATE.match_detail}
                    />
                  </Row>
                )}
                <div className={styles.tabWrapper}>
                  <div className={styles.tabstyle}>
                    <Tabs
                      activeLineMode="fixed"
                      style={{ color: '#848494', '--fixed-active-line-width': '15px' }}
                      defaultActiveKey={detailType}
                      onChange={handleDetailTypeClick}
                    >
                      {newsTabVisible && (
                        <Tabs.Tab
                          title={lang === 'en' ? 'Info' : <FormattedMessage id="key_news" />}
                          key="info"
                        >
                          {/* {lang === 'en' ? 'Info' : <FormattedMessage id="key_news" />} */}
                        </Tabs.Tab>
                      )}

                      <Tabs.Tab
                        title={<FormattedMessage id="key_overview" />}
                        key="overview"
                      ></Tabs.Tab>
                      {hasScheme ? <Tabs.Tab title="攻略" key="scheme"></Tabs.Tab> : null}

                      <Tabs.Tab title="分析" key="data"></Tabs.Tab>
                      <Tabs.Tab
                        title={<FormattedMessage id="key_line_up" />}
                        key="lineUp"
                      ></Tabs.Tab>
                      <Tabs.Tab title="数据" key="index"></Tabs.Tab>
                    </Tabs>

                    {/* {newsTabVisible && (
                      <CheckableTag
                        className={styles.tabButton}
                        onClick={() => handleDetailTypeClick('info')}
                        checked={detailType === 'info'}
                        key="info"
                      >
                        {lang === 'en' ? 'Info' : <FormattedMessage id="key_news" />}
                      </CheckableTag>
                    )}
                    <CheckableTag
                      className={styles.tabButton}
                      onClick={() => handleDetailTypeClick('overview')}
                      checked={detailType === 'overview'}
                      key="overview"
                    >
                      <FormattedMessage id="key_overview" />
                    </CheckableTag>
                    {hasScheme ? (
                      <CheckableTag
                        className={styles.tabButton}
                        onClick={() => handleDetailTypeClick('scheme')}
                        checked={detailType === 'scheme'}
                        key="scheme"
                      >
                        攻略
                      </CheckableTag>

                    ) : null}
                    <CheckableTag
                      className={styles.tabButton}
                      onClick={() => handleDetailTypeClick('data')}
                      checked={detailType === 'data'}
                      key="data"
                    >
                      分析
                    </CheckableTag>
                    <CheckableTag
                      className={styles.tabButton}
                      onClick={() => handleDetailTypeClick('lineUp')}
                      checked={detailType === 'lineUp'}
                      key="lineUp"
                    >
                      <FormattedMessage id="key_line_up" />
                    </CheckableTag>
                    <CheckableTag
                      className={styles.tabButton}
                      onClick={() => handleDetailTypeClick('index')}
                      key="index"
                      checked={detailType === 'index'}
                    >
                      数据
                    </CheckableTag> */}
                  </div>
                  {matchId && (
                    <div className={styles.tabPanel}>
                      <div style={{ display: detailType === 'info' ? 'block' : 'none' }}>
                        {isPhone && status === MatchStatus.Complete && hasHighlight && (
                          <div className={styles.mobileVideoWrapper} ref={videoWrapperRef}>
                            <MatchLive
                              isHighlight
                              matchList={[data]}
                              hideVideoTeamInfo
                              hideVideoTitle
                              onlyOne
                              reportCate={REPORT_CATE.match_detail}
                              hideHighlightTab
                              showHighlightTag
                            />
                          </div>
                        )}
                        <DetailNews
                          showEmpty={false}
                          matchId={Number(matchId)}
                          onRecordTotalLoaded={handleNewsTotalLoaded}
                        />
                      </div>
                      {detailType === 'overview' && (
                        <>
                          <Progress match={data} />
                          {isPhone &&
                            ([MatchStatus.Going, MatchStatus.Complete] as any[]).includes(
                              status,
                            ) && <Events matchId={matchId} />}
                        </>
                      )}
                      {detailType === 'index' && <IndexTab match={data} matchId={matchId as any} />}
                      {detailType === 'lineUp' && (
                        <LineUp matchId={matchId as any} status={data.status} />
                      )}
                      {detailType === 'data' && (
                        <>
                          <div className={styles.smallView_state}>
                            <CapsuleTabs>
                              <CapsuleTabs.Tab title="基本面" key="fruits">
                                <div>
                                  {isPhone ? <>{Vote}</> : null}
                                  <div>
                                    {' '}
                                    <div className={styles.mobileStatTitle_title}>
                                      <div className={styles.title_logo}></div>
                                      <FormattedMessage id="key_league_ranking" />
                                    </div>
                                    <div
                                      style={{
                                        marginTop: 12,
                                      }}
                                    >
                                      <Stats match={data} matchId={matchId as any} />
                                    </div>
                                  </div>
                                  <div>
                                    <div className={styles.mobileStatTitle_title}>
                                      <div className={styles.title_logo}></div>
                                      <FormattedMessage id="key_cup_match_ranking" />
                                    </div>
                                    <div
                                      style={{
                                        marginTop: 12,
                                      }}
                                    >
                                      <CutMatchRank match={data} matchId={matchId as any} />
                                    </div>
                                  </div>

                                  <div>
                                    {' '}
                                    <div className={styles.mobileStatTitle_title}>
                                      <div className={styles.title_logo}></div>
                                      <FormattedMessage id="key_history_ranking" />
                                    </div>
                                    <div
                                      style={{
                                        marginTop: 12,
                                      }}
                                    >
                                      <HistoryRanking match={data} matchId={matchId as any} />
                                    </div>
                                  </div>
                                  <div>
                                    {' '}
                                    <div className={styles.mobileStatTitle_title}>
                                      <div className={styles.title_logo}></div>
                                      <FormattedMessage id="key_recent_games" />
                                    </div>
                                    <div
                                      style={{
                                        marginTop: 12,
                                      }}
                                    >
                                      <RecentGames match={data} matchId={matchId as any} />
                                    </div>
                                  </div>
                                  <div>
                                    {' '}
                                    <div className={styles.mobileStatTitle_title}>
                                      <div className={styles.title_logo}></div>
                                      <FormattedMessage id="key_future_match" />
                                    </div>
                                    <div
                                      style={{
                                        marginTop: 12,
                                      }}
                                    >
                                      <FutureMatch match={data} matchId={matchId as any} />
                                    </div>
                                  </div>
                                </div>
                              </CapsuleTabs.Tab>
                              <CapsuleTabs.Tab title="实力" key="vegetables">
                                <div className={styles.mobileStatTitle}>
                                  <div className={styles.mobileStatTitle_title}>
                                    <div className={styles.title_logo}></div>
                                    <FormattedMessage id="key_schedule_before" />
                                  </div>

                                  <div>
                                    <div className={styles.getmore}>
                                      查看更多
                                      <IconFont
                                        className={styles.icon}
                                        size={12}
                                        type="icon-jiantouyou"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  {' '}
                                  <GoalLost />
                                </div>

                                <div className={styles.mobileStatTitle}>
                                  <div className={styles.mobileStatTitle_title}>
                                    <div className={styles.title_logo}></div>
                                    <FormattedMessage id="key_attack_defenseh" />
                                  </div>

                                  <RightTab tab={tab} />
                                </div>
                                <Strength />
                              </CapsuleTabs.Tab>
                            </CapsuleTabs>
                          </div>
                        </>
                      )}
                      {detailType === 'scheme' ? (
                        <div className={styles.schemeWrapper}>
                          <Scheme matchId={matchId} />
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              </Col>
              <Col className={styles.right} xs={24} sm={24} md={24} lg={9} xl={9}>
                {!isPhone &&
                  ([MatchStatus.Going, MatchStatus.Complete] as any[]).includes(status) && (
                    <Events matchId={matchId} />
                  )}
                <Banner className={styles.banner} />
                {!isPhone ? Vote : null}
                {matchUtils.getMatchStatus(data.status) !== matchUtils.MatchStatus.Before &&
                  tipsData &&
                  tipsData.length > 0 &&
                  showTips && (
                    <>
                      <div className={styles.tips}>
                        <FormattedMessage id="key_tips" />
                      </div>
                      <Tips data={tipsData} />
                    </>
                  )}
              </Col>
            </Row>
          ) : (
            <MEmpty />
          )}
        </div>
        <Notification
          visible={notificationVisible}
          onCancel={() => setNotificationVisible(false)}
          onOk={() => setNotificationVisible(false)}
        />
      </Spin>
    </div>
  );
};
// export default Details;
export default connect(({ divice, tips }: ConnectState) => ({
  isPhone: divice.isPhone,
  showTips: tips.showTips,
}))(Details);
