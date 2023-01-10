import React from 'react';
// import FBWorldCapTab from '@/components/FBWordCopTab';
import { FormattedMessage } from 'umi';
import RightTab from '../../Stats/RightTab';
import OddsType from '../OddsType';
import IconFont from '@/components/IconFont';
import styles from './index.less';
import Table from './table';
// import { Button, Space } from 'antd-mobile';

type Props = {};


const GoalLost = (props: Props) => {
  const options = [
    { label: '同主客', value: 'event' },
    { label: '上季赛', value: 'sameCompetition' },

  ];
  return (
    <div>
      <div className={styles.mobile_stat_title}>
        <div className={styles.mobile_stat_title_list}>
          <div className={styles.title_logo} />
          <FormattedMessage id="key_schedule_goal" />
        </div>
        <div>
          <div>
            <RightTab options={options} onChange={() => {
            }} />
          </div>
        </div>
      </div>
      <div className={styles.goallost_match_tab}>
        <Table />
      </div>
    </div>

  );
};

export default GoalLost;
