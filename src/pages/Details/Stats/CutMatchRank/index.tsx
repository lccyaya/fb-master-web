import React from 'react';
import Table from './table';
import RightTab from '../RightTab';
import styles from './index.less';

type Props = {};

const Ranking = (props: Props) => {
  const data = [{ id: 1 }, { id: 2 }, { id: 3 }];

  return (
    <div>
      <div className={styles.table_space}>
        <Table data={data} />
      </div>
    </div>
  );
};

export default Ranking;
