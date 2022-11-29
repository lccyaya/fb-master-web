import React from 'react';
import styles from './index.less';

type Props = {
  type?: string;
};

const Table = (props: Props) => {
  const { type } = props;
  return (
    <div className={type == 'shou' ? styles.strength_main_shou : styles.strength_main_gong}>
      <div className={styles.strength_main_text}>
        <div>
          <div className={styles.left_text}>0.9个</div>
          <div className={styles.left_text}>0.9个</div>
          <div className={styles.left_text}>0.9个</div>
        </div>
        <div>
          {' '}
          <div className={styles.center_text}>场均进球</div>
          <div className={styles.center_text}>场均进球sssss</div>
          <div className={styles.center_text}>场均进球收拾收拾</div>
        </div>
        <div>
          <div className={styles.right_text}>0.9个</div>
          <div className={styles.right_text}>0.9个</div>

          <div className={styles.right_text}>0.9个</div>
        </div>
      </div>
    </div>
  );
};

export default Table;
