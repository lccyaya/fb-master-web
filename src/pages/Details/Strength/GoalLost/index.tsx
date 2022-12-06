import React from 'react';
// import FBWorldCapTab from '@/components/FBWordCopTab';
import { FormattedMessage } from 'umi';
import RightTab from '../../Stats/RightTab';
import OddsType from '../OddsType';

import styles from './index.less';
// import { Button, Space } from 'antd-mobile';

type Props = {};

const tab = [
  { title: '同主客', key: '0' },
  { title: '上赛季', key: '1' },
];
const GoalLost = (props: Props) => {
  return (
    <div className={styles.goallost_match_tab}>
      <OddsType />
      {/* <div>xxxx</div> */}
      {/* <div>
        <RightTab tab={tab} />
      </div> */}
    </div>
  );
};

export default GoalLost;
