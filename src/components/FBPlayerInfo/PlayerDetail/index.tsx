import React from 'react';
import styles from './index.less';
import InfoCard from './InfoCard';
import InfoFirst from './InfoFirst';
import InfoHeader from './InfoHeader';

import FBTitle from '@/components/FBTitle';
import { FormattedMessage } from 'umi';
import { configs, configs1 } from './config';
type Props = {};

const PlayerInfo = (props: Props) => {
  return (
    <div className={styles.player_info}>
      <div>
        <InfoHeader></InfoHeader>

        <div className={styles.title_flex_tip}>
          <FBTitle logo={true} title={<FormattedMessage id="key_first_data" />} />
          <div className={styles.title_tip}>（以下为球员本赛季在本球队的数据统计）</div>
        </div>
        <InfoFirst></InfoFirst>
      </div>
      <div className={styles.title_flex_tip}>
        <FBTitle logo={true} title={<FormattedMessage id="key_personal_bx" />} />
        <div className={styles.title_tip}>（以下均为球员本场比赛的个人数据统计）</div>
      </div>
      <div style={{ height: 450, overflow: 'auto' }}>
        <InfoCard configs={configs1}></InfoCard>
        <InfoCard configs={configs}></InfoCard>
        <InfoCard configs={configs}></InfoCard>
        <InfoCard configs={configs}></InfoCard>
      </div>
    </div>
  );
};

export default PlayerInfo;
