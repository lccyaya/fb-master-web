import React from 'react';
import styles from './index.less';
import IconFont from '@/components/IconFont';

import { Grid } from 'antd-mobile';

type Props = {};

const InfoHeader = (props: Props) => {
  return (
    <div className={styles.player_info_card}>
      <div className={styles.player_info_card_flex}>
        <div className={styles.player_info_card_left}>
          <img className={styles.avatar} src="" alt="" />
          <div>
            <div className={styles.name}>
              维尼修斯·儒尼奥尔 <div>dddd</div>
            </div>
            <div>国际米兰/22</div>
            <div>前锋/左脚</div>
          </div>
        </div>
      </div>
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
    </div>
  );
};

export default InfoHeader;
