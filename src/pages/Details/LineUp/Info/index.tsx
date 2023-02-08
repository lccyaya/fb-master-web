import React from 'react';
import styles from './index.less';

type Props = {};

const Info = (props: Props) => {
  return (
    <div className={styles.info}>
      <div className={styles.info_num}>
        <div className={styles.info_left_num}>
          <span>15</span>
          <span className={styles.info_left_dw}>万</span>
        </div>
        <div>
          <span className={styles.info_center_text}>首发身价(欧)</span>
        </div>
        <div className={styles.info_right_num}>
          <span>180</span>
          <span className={styles.info_right_dw}>cm</span>
        </div>
      </div>
      <div className={styles.info_num}>
        <div className={styles.info_left_num}>
          <span>15</span>
          <span className={styles.info_left_dw}>万</span>
        </div>
        <div>
          <span className={styles.info_center_text}>首发平均年龄</span>
        </div>
        <div className={styles.info_right_num}>
          <span>180</span>
          <span className={styles.info_right_dw}>cm</span>
        </div>
      </div>
      <div className={styles.info_num}>
        <div className={styles.info_left_num}>
          <span>28</span>
          <span className={styles.info_left_dw}>岁</span>
        </div>
        <div>
          <span className={styles.info_center_text}>首发平均年龄</span>
        </div>
        <div className={styles.info_right_num}>
          <span>180</span>
          <span className={styles.info_right_dw}>cm</span>
        </div>
      </div>
    </div>
  );
};

export default Info;
