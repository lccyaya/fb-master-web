import React, { useState, useEffect, useRef, useCallback } from 'react';
import classnames from 'classnames';
import { Spin, Row, Button } from 'antd';
import { SwapOutlined } from '@ant-design/icons';
import { connect, FormattedMessage, Link } from 'umi';
import type { ConnectState } from '@/models/connect';
import styles from './index.less';
import * as matchService from '@/services/matchPage';
import type { matchType as matchTypeObject } from '@/services/matchPage';
// import MatchCard from '../../components/MatchCard';
import { MatchCard } from '@/func-components/pc';
import { MatchCard as MatchCardMobile } from '@/func-components/mobile';
import MatchCardHome from '@/components/MatchCardHome';
import MatchCardScore from '@/components/MatchCardScore';
import { getDateData } from '../../components/MatchList';
import LoginModal from '@/components/MatchCard/Login';
import type { UserInfoType } from '@/services/user';
import { checkIsPhone, toShortLangCode } from '@/utils/utils';
import type { matchType } from '@/services/matchPage';
import MatchLive from '@/components/MatchLive';
import { REPORT_CATE } from '@/constants';
import CallAppModal from '@/components/OpenApp/CallAppModal';
import { useIntl } from '@@/plugin-locale/localeExports';
import { locale } from '@/app';
import findIndex from 'lodash/findIndex';

export type sameDayMatch = {
  date: number;
  matches: matchTypeObject[];
};

function handleLiveList(list: matchService.matchList) {
  return getDateData(sortMatchList(list.matches));
}

function sortMatchList(list: matchService.matchType[]) {
  return list.sort((a, b) => {
    return a.match_time - b.match_time;
  });
}

const livePageSize = 50;

type IProps = {
  currentUser?: UserInfoType | null;
  isPhone?: boolean;
  ssrLiveList?: matchService.matchList;
  hideLoading?: boolean;
};

function LiveEmpty() {
  return (
    <div className={styles.liveEmpty}>
      <div className={styles.text}>
        <FormattedMessage id="key_no_game_in_progress" />
      </div>
    </div>
  );
}

const Matches = React.memo(
  (props: {
    matches: matchService.matchType[];
    switchType: string;
    setParams: (id: number, bool: boolean) => void;
  }) => {
    const { matches, switchType, setParams } = props;
    const isPhone = checkIsPhone();
    return (
      <Row className={classnames(styles.listContainer, styles.liveListContainer)}>
        {matches.map((d: matchTypeObject) => {
          return isPhone ? 
          <MatchCardMobile data={d} key={d.match_id} type={switchType === 'Score' ? 'score' : 'index'} /> 
          : 
          <MatchCard data={d} key={d.match_id} type={switchType === 'Score' ? 'score' : 'index'} />
          // return switchType === 'Score' ? (
          //   <MatchCardScore
          //     reportCate={REPORT_CATE.live}
          //     data={d}
          //     key={d.match_id}
          //     from="match"
          //     setParams={setParams}
          //   />
          // ) : (
          //   <MatchCardHome
          //     reportCate={REPORT_CATE.live}
          //     data={d}
          //     key={d.match_id}
          //     from="match"
          //     setParams={setParams}
          //   />
          // );
        })}
      </Row>
    );
  },
);

function UpcomingTip() {
  return (
    <div className={`${styles.upcomingMatchTip}`}>
      <div className={styles.icon} />
      <div className={styles.text}>
        <FormattedMessage id="key_upcoming_matches" />
      </div>
    </div>
  );
}

const Live: React.FC<IProps> = (props) => {
  const { ssrLiveList, hideLoading } = props;
  const [liveList, setLiveList] = useState<ReturnType<typeof handleLiveList>>(
    ssrLiveList ? handleLiveList(ssrLiveList) : [],
  );
  const [matchList, setMatchList] = useState<matchType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loginVisible, setLoginVisible] = useState<boolean>(false);
  const [livePage, setLivePage] = useState<number>(1);
  const [switchType, setSwitchType] = useState<string>('Score');
  const [canPlayLiveMatches, setCanPlayLiveMatches] = useState<matchType[]>([]);

  const liveTimer = useRef<number>();
  const isPhone = checkIsPhone();

  const intl = useIntl();

  const getLiveList = async (p: number, bool?: boolean) => {
    const currentTime = new Date().getTime();
    const result = await matchService.MatchListV3({
      tab_type: 1,
      zone: 8,
      timestamp: Math.floor(currentTime / 1000),
      page: p,
      size: 20
    });
    if (result.success) {
      const cantPlay: matchType[] = [];
      const canPlay: matchType[] = [];
      const matches = result.data.matches;
      matches.forEach((m) => {
        const playable =
          [2, 3, 4, 5, 6, 7].includes(m.status) &&
          ((m.has_live && (m.normal_live_link || m.high_live_link)) || m.live_animation_link);
        if (playable) {
          canPlay.push(m);
        } else {
          cantPlay.push(m);
        }
      });
      cantPlay.sort((a, b) => a.match_time - b.match_time);
      const now = Math.floor(Date.now() / 1000);
      const source = isPhone ? matches : cantPlay;
      const upcomingIndex = findIndex(source, (m) => m.match_time > now);
      let final = handleLiveList({ matches: source.slice(0, upcomingIndex) });
      setCanPlayLiveMatches(canPlay.sort((a, b) => a.match_time - b.match_time));
      if (bool) {
        final = liveList.concat(final);
        setLivePage(p);
      }
      if (upcomingIndex === -1) {
        setMatchList([]);
      } else {
        setMatchList(source.slice(upcomingIndex));
      }
      setLiveList(final);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const handleSwitch = () => {
    const currentSwitch = switchType === 'Score' ? 'Index' : 'Score';
    setSwitchType(currentSwitch);
  };

  const handleUpcomingMatchSetParams = useCallback(
    (id: number, bool: boolean) => {
      const index = matchList.findIndex((m) => m.match_id === id);
      if (index < 0) return;
      const newData = [
        ...matchList.slice(0, index),
        {
          ...matchList[index],
          subscribed: bool,
        },
        ...matchList.slice(index + 1),
      ];
      setMatchList(newData);
    },
    [matchList],
  );

  const handleSetParams = useCallback(
    (id: number, bool: boolean) => {
      let dateIndex = -1;
      let matchIndex = -1;
      const found = liveList.some((d, index) => {
        const i = d.matches.findIndex((m) => m.match_id === id);
        if (i > -1) {
          dateIndex = index;
          matchIndex = i;
          return true;
        }
        return false;
      });

      if (!found) return;
      const { matches } = liveList[dateIndex];
      liveList[dateIndex].matches = [
        ...matches.slice(0, matchIndex),
        {
          ...matches[matchIndex],
          subscribed: bool,
        },
        ...matches.slice(matchIndex + 1),
      ];

      setLiveList([...liveList]);
    },
    [liveList],
  );

  useEffect(() => {
    setLoading(!hideLoading);
    getLiveList(livePage);
    liveTimer.current = window.setInterval(() => getLiveList(1), 10000);
    return () => {
      clearInterval(liveTimer.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const showLiveVideo = !isPhone && canPlayLiveMatches.length > 0;
  const lang = toShortLangCode(locale.getLocale());

  console.log(liveList, '**', matchList, '&&&&')
  return (
    <Spin spinning={loading}>
      {/* {checkIsPhone() && <CallAppModal title={intl.formatMessage({ id: 'key_watch_in_app' })} />} */}
      <LoginModal
        visible={loginVisible}
        onLogin={() => {
          setLoginVisible(false);
        }}
        onCancel={() => {
          setLoginVisible(false);
        }}
      />
      <div className={classnames(styles.main, canPlayLiveMatches.length === 1 ? styles.min : null)}>
        {/* <Row className={styles.switchRow}>
          <Button
            className={styles.switchButton}
            icon={<SwapOutlined />}
            type="text"
            size="large"
            onClick={handleSwitch}
          >
            <FormattedMessage id={switchType === 'Score' ? 'key_index' : 'key_score'} />
          </Button>
        </Row> */}
        <Row className={classnames(isPhone ? styles.phone : '')}>
          {showLiveVideo && (
            <MatchLive
              reportCate={REPORT_CATE.live}
              matchList={canPlayLiveMatches}
              indexView={switchType === 'Index'}
            />
          )}
          <div className={styles.scrollContainer}>
            {liveList && liveList.length > 0
              ? liveList.map((ele) => {
                  const key = ele.date;
                  return (
                    <Matches
                      matches={ele.matches}
                      key={key}
                      switchType={switchType}
                      setParams={handleSetParams}
                    />
                  );
                })
              : null}
            {!loading && canPlayLiveMatches.length + liveList.length === 0 && <LiveEmpty />}
            {!loading && matchList.length > 0 ? <UpcomingTip /> : null}
            <Matches
              matches={matchList}
              switchType={switchType}
              setParams={handleUpcomingMatchSetParams}
            />
            {!loading && (
              <Link to={`/${lang}/match?type=all`} className={styles.upcomingMore}>
                <FormattedMessage id="key_more" />
              </Link>
            )}
          </div>
        </Row>
      </div>
    </Spin>
  );
};

// @ts-ignore
// Live.getInitialProps = async () => {
//   const currentTime = new Date().getTime();
//   const liveResult = await matchService.fetchLiveMatchList({
//     timestamp: Math.floor(currentTime / 1000),
//     page: 1,
//     size: livePageSize,
//   });
//   return {
//     ssrLiveList: liveResult.success ? liveResult.data : undefined,
//     hideLoading: true,
//   };
// };

export default connect(({ user, divice }: ConnectState) => ({
  currentUser: user.currentUser,
  isPhone: divice.isPhone,
}))(Live);
