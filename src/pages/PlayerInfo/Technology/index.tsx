import React from 'react';
import PlayerTechnology from '@/components/FBPlayerInfo/PlayerTechnology';
import styles from './index.less';
import { FormattedMessage } from 'umi';
import FBTitle from '@/components/FBTitle';
type Props = {};

const Technology = (props: Props) => {
  return (
    <div className={styles.technology}>
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
