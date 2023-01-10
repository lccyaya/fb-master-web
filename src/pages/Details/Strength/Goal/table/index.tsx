import React, { useState } from 'react';
import { Picker } from 'antd-mobile';
import { FormattedMessage } from 'umi';
import IconFont from '@/components/IconFont';

import styles from './index.less';

type Props = {};

const Table = (props: Props) => {


  return (
    <div className={styles.oddstype_main}>
      <div className={styles.oddstype_box} style={{ height: 30 }}>
        <div className={styles.oddstype_title} />
        <div className={styles.oddstype}>
          00‘ 22’ 33‘ 55’ 6‘ 6’ 7‘
        </div>
      </div>
      <div className={styles.oddstype_box}>
        <div className={styles.oddstype_title}>英格兰</div>
        <div className={styles.oddstype}>
          <div className={styles.oddstype_list}>
            1
          </div>
          <div className={styles.oddstype_list}>
            1
          </div>
          <div className={styles.oddstype_list}>
            1
          </div>
          <div style={{ width: 5 }} />

          <div className={styles.oddstype_list}>
            1
          </div>
          <div className={styles.oddstype_list}>
            1
          </div>
        </div>
      </div>
      <div className={styles.oddstype_box}>
        <div className={styles.oddstype_title}>英格兰</div>
        <div className={styles.oddstype}>
          <div style={{ marginRight: 10 }}>
            20 (33:8)
          </div>
          <div className={styles.oddstype_list}>
            1
          </div>
          <div className={styles.oddstype_list}>
            1
          </div>
          <div className={styles.oddstype_list}>
            1
          </div>
          <div style={{ width: 5 }} />
          <div className={styles.oddstype_list}>
            1
          </div>
          <div className={styles.oddstype_list}>
            1
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
