import React from 'react';
import RightTab from '../Stats/RightTab';
import styles from './index.less';
import Table from './table';
type Props = {};

const Ranking = (props: Props) => {
  const data = [{ id: 1 }, { id: 2 }, { id: 3 }];

  return (
    <div className={styles.strength_main}>
      <Table />
      <Table type="shou" />
    </div>
  );
};

export default Ranking;
