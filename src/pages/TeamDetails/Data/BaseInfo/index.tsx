import React from 'react';
import styles from './index.less';
import InfoCard from '@/components/FBPlayerInfo/PlayerDetail/InfoCard';

import { FormattedMessage } from 'umi';
import FBTitle from '@/components/FBTitle';
import { configs, configs1 } from './config';
type Props = {};

const BaseInfo = (props: Props) => {
  return (
    <div className={styles.base_info}>
      <div style={{ paddingLeft: '12px' }}>
        <FBTitle logo={true} title={<FormattedMessage id="key_base_info" />} />
      </div>
      <InfoCard configs={configs1} />
    </div>
  );
};

export default BaseInfo;
