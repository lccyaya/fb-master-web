import React from 'react';
import styles from './index.less';
import Capacity from './Capacity';
import TransferRecord from './TransferRecord';
import Honour from './Honour';

type Props = {};

const BaseInfo = (props: Props) => {
  return (
    <div className={styles.player_info_baseinfo}>
      <div style={{ padding: '0 12px' }}>
        <Capacity />
      </div>

      <div className={styles.demoblock} />
      <TransferRecord />
      <div className={styles.demoblock_height} />
      <Honour></Honour>
    </div>
  );
};

export default BaseInfo;
