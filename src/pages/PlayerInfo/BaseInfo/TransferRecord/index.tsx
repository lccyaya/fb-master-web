import React from 'react';
import PlayerList from '@/components/FBPlayerInfo/PlayerList';
import styles from './index.less';
import { FormattedMessage, useHistory } from 'umi';
import FBTitle from '@/components/FBTitle';
import IconFont from '@/components/IconFont';
type Props = {};

const TransferRecord = (props: Props) => {
  const history = useHistory();
  return (
    <div className={styles.transfer_record}>
      <div className={styles.title}>
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