import React from 'react';
import styles from './index.less';
type Props = {};

const InfoCard = (props: Props) => {
  return (
    <div className={styles.info_card}>
      <div className={styles.list}>
        1<div className={styles.text}>总市值</div>
      </div>
      <div className={styles.list_center}>
        1<div className={styles.text}>总市值</div>
      </div>
      <div className={styles.list}>
        1<div className={styles.text}>总市值</div>
      </div>
    </div>
  );
};

export default InfoCard;
