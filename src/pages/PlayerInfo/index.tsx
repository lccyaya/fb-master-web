import React, { useState } from 'react';
import InfoHeader from './InfoHeader';
import BaseInfo from './BaseInfo';
import Technology from './Technology';
import PlayerInfoTab from '@/components/FBPlayerInfo/PlayerInfoTab';
import { NavBar } from 'antd-mobile';

import styles from './index.less';
import { useHistory } from 'umi';
type Props = {};

const PlayerInfo = (props: Props) => {
  const [active, seActive] = useState(1);
  const history = useHistory();
  const tab = [
    {
      key: '1',
      label: '基本信息',
    },
    {
      key: '2',
      label: '技术统计',
    },
  ];
  const onTabClick = (key: number) => {
    seActive(key);
  };
  const back = () => {
    history.goBack();
  };
  return (
    <div>
      <div style={{ position: 'sticky', top: 0, zIndex: 10, background: '#F7F7F7' }}>
        <div className={styles.player_info_bg}>
          <NavBar style={{ color: '#fff' }} onBack={back} />
          {/* 头部信息 */}
          <InfoHeader />
        </div>

        <PlayerInfoTab onClick={onTabClick} tab={tab} active={active} />
      </div>

      <div className={styles.player_info_detail}>
        {/* 基本信息 */}
        {active == 1 && (
          <div>
            <BaseInfo />
          </div>
        )}
        {/* 技术统计 */}
        {active == 2 && (
          <div>
            <Technology />
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerInfo;
