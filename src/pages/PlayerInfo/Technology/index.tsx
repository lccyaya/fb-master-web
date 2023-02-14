import React from 'react';
import PlayerTechnology from '@/components/FBPlayerInfo/PlayerTechnology';
import styles from './index.less';
import { FormattedMessage } from 'umi';
import FBTitle from '@/components/FBTitle';
import Date from './Date';
type Props = {};

const Technology = (props: Props) => {
  const onClick = (key) => {
    console.log(key, 'ssss');
  };

  return (
    <div className={styles.technology}>
      <div className={styles.technology_tab}>
        <div>联赛 杯赛 国家队 </div>
        <Date onClick={onClick}></Date>
      </div>
      <div className={styles.technology_tab}>
        <div>2022-2023</div>
        <div>西甲-皇马</div>
      </div>
      <div style={{ padding: '12px' }}>
        <PlayerTechnology />
      </div>

      <div className={styles.demoblock_height} />
      <div style={{ padding: '12px' }}>
        <FBTitle logo={true} title={<FormattedMessage id="key_new_goalkeeper" />} />
        <PlayerTechnology />
      </div>
      <div className={styles.demoblock_height} />
      <div style={{ padding: '12px' }}>
        <FBTitle logo={true} title={<FormattedMessage id="key_attack" />} />
        <PlayerTechnology />
      </div>
      <div className={styles.demoblock_height} />
      <div style={{ padding: '12px' }}>
        <FBTitle logo={true} title={<FormattedMessage id="key_pass_ball" />} />
        <PlayerTechnology />
      </div>
      <div className={styles.demoblock_height} />
      <div style={{ padding: '12px' }}>
        <FBTitle logo={true} title={<FormattedMessage id="key_guard" />} />
        <PlayerTechnology />
      </div>
    </div>
  );
};

export default Technology;
