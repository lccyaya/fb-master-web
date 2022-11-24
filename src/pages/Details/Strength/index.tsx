import React from 'react';
import Table from './table';
import RightTab from '../Stats/RightTab';
import styles from './index.less';

type Props = {};

const Ranking = (props: Props) => {
  const data = [{ id: 1 }, { id: 2 }, { id: 3 }];

  return (
    <div>
      <div className={styles.table_space}>
        <Table addRight={<div>完整积分榜</div>} data={data} />
      </div>
      <div className={styles.table_space}>
        <Table addRight={<RightTab />} />
      </div>
      <div className={styles.table_space}>
        <Table addRight={<RightTab />} />
      </div>
    </div>
  );
};

export default Ranking;
