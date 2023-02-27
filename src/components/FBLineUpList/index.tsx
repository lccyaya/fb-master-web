import React from 'react';
import { Grid } from 'antd-mobile';
import FBDemoBlock from '@/components/FBDemoBlock';
import styles from './index.less';
type Props = {};

const FBLineUpList = (props: Props) => {
  return (
    <div className={styles.line_up_list}>
      <div className={styles.line_up_list_type}>教练</div>
      <div style={{ padding: '12px' }}>
        <Grid columns={5}>
          <Grid.Item span={2}>
            <div className={styles.teacher}>
              <div className={styles.img}>
                <img src="" alt="" />
              </div>
              <div className={styles.grid_list} style={{ alignItems: 'start' }}>
                <div className={styles.name} style={{ width: '90px' }}>
                  卡洛·安切洛蒂卡洛
                </div>
                <div className={styles.info}>63岁/意大利</div>
              </div>
            </div>
          </Grid.Item>
          <Grid.Item>
            <div className={styles.grid_list}>
              <div className={styles.name}>主教练</div>
              <div className={styles.info}>2025-01-01</div>
            </div>
          </Grid.Item>
          <Grid.Item>
            <div className={styles.grid_list}>
              <div className={styles.name}>28/18/28</div>
              <div className={styles.info}>胜/平/负</div>
            </div>
          </Grid.Item>
          <Grid.Item>
            <div className={styles.grid_list}>
              <div className={styles.name}>56.67%</div>
              <div className={styles.info}>胜率</div>
            </div>
          </Grid.Item>
        </Grid>
      </div>
      <FBDemoBlock></FBDemoBlock>
    </div>
  );
};

export default FBLineUpList;
