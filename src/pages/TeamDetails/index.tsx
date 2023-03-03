import type { Dispatch } from 'umi';
import { connect, FormattedMessage } from 'umi';
import type { ConnectState } from '@/models/connect';
import React, { useState, useEffect } from 'react';
import myContext from '@/utils/createContext';
import { Tag, Row, Spin, Col } from 'antd';
import type { RouteComponentProps } from 'dva/router';
import { ArrowLeftOutlined } from '@ant-design/icons';
import emptyLogo from '@/assets/emptyLogo.png';
import * as matchService from '@/services/matchPage';
import type { matchType, info as infoType, teamPlayersType } from '@/services/matchPage';
import styles from './index.less';
import Trophies from './Trophies';
import Fixtures from './Fixtures';
import Players from './Players';

import Button from 'antd/es/button';
import { getDateData } from '@/components/MatchList';
import { checkIsPhone } from '@/utils/utils';
import PopupLogin from '@/components/PopupLogin';
import Notification from '@/components/Notification';
import { NavBar } from 'antd-mobile';
import IconFont from '@/components/IconFont';
import FBLineTab from '@/components/FBLineTab';
import FBTabDate from '@/components/FBTabDate';
import Integral from './Integral';
import Schedule from './Schedule';
import Player from './Player';
import LineUp from './LineUp';
import Data from './Data';
import InfoCard from './InfoCard';

type TabType = 'fixtures' | 'players';

export type DetailProps = {
  dispatch: Dispatch;
  isPhone: boolean;
} & RouteComponentProps<{
  teamId: string;
}>;

export type trophy = {
  id: number;
  name: string;
  season: string;
};

export type trophies = {
  name: string;
  list: trophy[];
};

const { CheckableTag } = Tag;

const TeamDetails: React.FC<DetailProps> = (props) => {
  const [detailType, setDetailType] = useState<TabType>('fixtures');
  const [loading, setLoading] = useState<boolean>(true);
  const [teamLogo, setTeamLogo] = useState<string>('');
  const [teamName, setTeamName] = useState<string>('');
  const [teamSubscribed, setTeamSubscribed] = useState<boolean>(true);
  const [schedualer, setSchedualer] = useState<{ date: string; matches: matchType[] }[]>([]);
  const [info, setInfo] = useState<infoType>({ founded: 0, website: '' });
  const [trophies, setTrophies] = useState<trophies[]>([]);
  const [playersData, setPlayersData] = useState<teamPlayersType>({ coach: [], squad: [] });
  const [notificationVisible, setNotificationVisible] = useState(false);

  const { teamId } = props.match.params;
  const [activeKey, setActiveKey] = useState('1');
  const [season_id, setSeasonId] = useState<any>();

  const themes = {
    competition_id: 82,
    season_id,
  };
  // const history = useHistory();
  const onChangeTab = (key: string) => {
    console.log(key, 'kskskksks');
    setActiveKey(key);
  };
  const tab = [
    {
      title: '资料',
      key: '1',
    },
    {
      title: '积分',
      key: '2',
    },
    {
      title: '赛程',
      key: '3',
    },
    {
      title: '阵容',
      key: '4',
    },

    {
      title: '球员',
      key: '5',
    },
  ];
  const handleBack = () => {
    window.history.back();
  };

  const getTeamInfo = async () => {
    const result = await matchService.teamInfo({ team_id: +teamId });
    if (result.success) {
      setInfo(result.data.info);
      const final = result.data.honor_ids.map((ele: number) => {
        const list = result.data.honor[ele];
        return { name: list[0].name, list };
      });
      setTrophies(final);
    }
  };

  const getTeamPlayers = async () => {
    const result = await matchService.teamPlayers({
      team_id: +teamId,
    });
    if (result.success) {
      setPlayersData(result.data);
    }
  };

  const getTeamScheduler = async () => {
    const result = await matchService.teamScheduler({
      team_id: +teamId,
      timestamp: 0,
      asc: true,
      count: 50,
      zone: 8,
    });
    if (result.success) {
      setTeamLogo(result.data.team_logo);
      setTeamName(result.data.team_name);
      setTeamSubscribed(result.data.subscribed);
      const final = getDateData(result.data.matches);
      setSchedualer(final);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTeamScheduler();
    getTeamPlayers();
    getTeamInfo();
  }, []);

  return (
    <Spin spinning={loading}>
      <Notification
        visible={notificationVisible}
        onCancel={() => setNotificationVisible(false)}
        onOk={() => setNotificationVisible(false)}
      />
      <div>
        <div className={styles.head}>
          {/* <div className={styles.back} onClick={handleBack}>
            <ArrowLeftOutlined className={styles.arrow} />
            <div className={styles.text}>
              <FormattedMessage id="key_back" />
            </div>
          </div> */}
          <NavBar style={{ color: '#fff' }} onBack={handleBack} />

          {teamSubscribed ? (
            <PopupLogin
              onLogin={() => {
                setTeamSubscribed(false);
                matchService.unsubscribeTeam(+teamId);
              }}
            >
              <Button type="dashed" className={styles.followButton}>
                {/* <IconFont type="icon-tianjia" color="FA5900" size={10} /> */}
                <FormattedMessage id="key_following" />
              </Button>
            </PopupLogin>
          ) : (
            <PopupLogin
              onLogin={() => {
                setNotificationVisible(true);
                setTeamSubscribed(true);
                matchService.subscribeTeam([+teamId]);
              }}
            >
              <Button type="primary" className={styles.followButton}>
                <IconFont type="icon-tianjia" color="FA5900" size={10} />
                <FormattedMessage id="key_follow" />
              </Button>
            </PopupLogin>
          )}
        </div>
        <Row className={styles.headerArea}>
          <div className={styles.detailCard}>
            <img className={styles.logo} src={teamLogo || emptyLogo} />
            <div className={styles.text}>{teamName}</div>
          </div>
          {/* 背景信息展示 */}
          <InfoCard />
        </Row>

        <div className={styles.main}>
          <myContext.Provider value={themes}>
            <div className={styles.main_tab}>
              <FBLineTab tab={tab} onChangeTab={onChangeTab} />

              <div style={{ marginRight: 12 }}>
                <FBTabDate competition_id={82} season_id={season_id} setSeasonId={setSeasonId} />
              </div>
            </div>
            {activeKey == '1' && <Data />}
            {activeKey == '2' && <Integral />}
            {activeKey == '3' && <Schedule />}
            {activeKey == '4' && <LineUp />}
            {activeKey == '5' && <Player />}
          </myContext.Provider>
        </div>
      </div>
    </Spin>
  );
};
// export default Details;
export default connect(({ divice }: ConnectState) => ({
  isPhone: divice.isPhone,
}))(TeamDetails);
