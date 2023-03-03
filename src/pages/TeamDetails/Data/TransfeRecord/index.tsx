import React, { useState } from 'react';
import styles from './index.less';
import { FormattedMessage, useHistory } from 'umi';
import FBTransfeRecord from '@/components/FBTransfeRecord';

import FBTitle from '@/components/FBTitle';
import IconFont from '@/components/IconFont';
type Props = {};

const TransfeRecord = (props: Props) => {
  const history = useHistory();

  return (
    <div className={styles.transfe_record}>
      <div className={styles.title}>
        <FBTitle logo={true} title={<FormattedMessage id="key_transfer_record" />} />
        <div
          className={styles.more}
          onClick={() => {
            history.push(`/zh/TransferRecord/${1}`);
          }}
        >
          查看更多
          <IconFont type="icon-jiantouyou" color="#848494" size={10} />
        </div>
      </div>
      <div className={styles.content}>
        <FBTransfeRecord />
      </div>
      <div className={styles.content}>
        <FBTransfeRecord />
      </div>
      <div className={styles.content}>
        <FBTransfeRecord />
      </div>
    </div>
  );
};

export default TransfeRecord;
