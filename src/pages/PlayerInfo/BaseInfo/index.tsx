import React from 'react';
import styles from './index.less';
import Capacity from './Capacity';
import TransferRecord from './TransferRecord';
import MiniGround from './MiniGround';
import Honour from './Honour';

type Props = {};

const BaseInfo = (props: Props) => {
  return (
    <div className={styles.player_info_baseinfo}>
      {/* 能力值 */}
      <div>
        <Capacity />
      </div>
      <div className={styles.demoblock} />
      {/* 小操场 */}
      <MiniGround />
      <div className={styles.demoblock_height} />
      {/* 转会记录 */}
      <TransferRecord />
      <div className={styles.demoblock_height} />
      {/* 荣誉记录 */}
      <Honour />
    </div>
  );
};

export default BaseInfo;
