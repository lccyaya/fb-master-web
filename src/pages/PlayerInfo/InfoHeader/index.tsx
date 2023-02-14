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
      <div className={styles.player_info_grid}>
        <Grid columns={3}>
          <Grid.Item>
            <div className={styles['grid-demo-item-block']}>
              <div>7.28亿欧</div>
              <div className={styles.text}>预计身价</div>
            </div>
          </Grid.Item>
          <Grid.Item>
            <div className={styles['grid-demo-item-block']}>
              <div>7.28亿欧</div>
              <div className={styles.text}>预计身价</div>
            </div>
          </Grid.Item>
          <Grid.Item>
            <div className={styles['grid-demo-item-block_last']}>
              <div>7.28亿欧</div>
              <div className={styles.text}>预计身价</div>
            </div>
          </Grid.Item>
        </Grid>
      </div>
    </div>
  );
};

export default InfoHeader;
