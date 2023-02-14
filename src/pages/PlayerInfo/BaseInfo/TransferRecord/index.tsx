import React from 'react';
import PlayerList from '@/components/FBPlayerInfo/PlayerList';
import styles from './index.less';
import { FormattedMessage } from 'umi';
import FBTitle from '@/components/FBTitle';
type Props = {};

const TransferRecord = (props: Props) => {
  return (
    <div className={styles.transfer_record}>
      <div style={{ paddingLeft: '12px' }}>
        <FBTitle logo={true} title={<FormattedMessage id="key_transfer_record" />} />
      </div>
      <div className={styles.transfer_record_list}>
        <PlayerList />
      </div>
      <div className={styles.transfer_record_list}>
        <PlayerList />
      </div>
      <div className={styles.transfer_record_list}>
        <PlayerList />
      </div>
    </div>
  );
};

export default TransferRecord;
