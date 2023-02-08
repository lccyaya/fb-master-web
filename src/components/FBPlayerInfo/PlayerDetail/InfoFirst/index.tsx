import React from 'react';
import styles from './index.less';

type Props = {};

const InfoFirst = (props: Props) => {
  return (
    <div className={styles.title_flex_tip_first} style={{ height: 95 }}>
      <div className={styles.first_value}>
        <div className={styles.first_value_num}>
          <span style={{ color: '#333333' }}>98</span>
        </div>
        首发场次
      </div>
      <div className={styles.first_value}>
        <div className={styles.first_value_num}>
          <span style={{ color: '#FE2222' }}>70%</span>
        </div>
        赢率
      </div>
    </div>
  );
};

export default InfoFirst;
