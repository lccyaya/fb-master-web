import React from 'react';
import RightTab from '../Stats/RightTab';
import styles from './index.less';
import Table from './table';
import { FormattedMessage } from 'umi';


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
        <div className={styles.mobile_stat_title_list}>
          <div className={styles.title_logo} />
          <FormattedMessage id="key_attack_defenseh" />
        </div>
        <div>
          <RightTab options={options} onChange={(key: any) => {
            console.log(key);

          }} />
        </div>
      </div>
      <div className={styles.strength_main}>
        <Table />
        <Table type="shou" />
      </div>
    </div>
  );
};

export default Ranking;
