import React from 'react';
import styles from './index.less';
type Props = {};

const InfoCard = (props: Props) => {
  return (
    <div className={styles.info_card_box}>
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
      <div className={styles.is_win}>近6场走势：胜 平 胜 负</div>
    </div>
  );
};

export default InfoCard;
