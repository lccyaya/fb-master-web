import React from 'react';
import RightTab from '../Stats/RightTab';
import styles from './index.less';
import Table from './table';
import { FormattedMessage } from 'umi';
import FBTitle from '@/components/FBTitle';

type Props = {};

const Ranking = (props: Props) => {
  const options = [
    { label: '同主客', value: 'event' },
    { label: '同赛事', value: 'sameCompetition' },
    { label: '20场', value: 'size' },
  ];
  return (
    <div>
      <div className={styles.mobile_stat_title}>
        <FBTitle
          logo={true}
          size="18px"
          color="#45494C"
          title={<FormattedMessage id="key_attack_defenseh" />}
        />
        <div>
          <RightTab
            options={options}
            onChange={(key: any) => {
              console.log(key);
            }}
          />
        </div>
      </div>
      <div className={styles.strength_main}>
        <Table />
        <div style={{ height: 10 }}></div>
        <Table type="shou" />
      </div>
    </div>
  );
};

export default Ranking;
