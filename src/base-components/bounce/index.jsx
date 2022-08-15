import React from 'react';
import styles from './index.module.less';

const Bounce = () => {
  return (
    <div className={styles.bounce}>
      <div className={styles.item}></div>
      <div className={styles.item}> </div>
      <div className={styles.item}></div>
    </div>
  );
};

export default Bounce;
