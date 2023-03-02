import React from 'react';
import PlayerHonour from '@/components/FBPlayerInfo/PlayerHonour';
import styles from './index.less';
import { FormattedMessage } from 'umi';
import FBTitle from '@/components/FBTitle';

type Props = {};

const Honour = (props: Props) => {
  return (
    <div>
      <div className={styles.honour}>
        <div style={{ paddingLeft: '12px' }}>
          <FBTitle logo={true} title={<FormattedMessage id="key_team_honour" />} />
        </div>
        <div className={styles.honour_list}>
          <PlayerHonour />
        </div>
        <div className={styles.honour_list}>
          <PlayerHonour />
        </div>
        <div className={styles.honour_list}>
          <PlayerHonour />
        </div>
      </div>
    </div>
  );
};

export default Honour;
