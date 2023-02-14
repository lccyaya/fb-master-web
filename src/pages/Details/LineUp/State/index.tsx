import React from 'react';
import { state } from '@/components/FBFootball/config';
import styles from './index.less';
import { Grid } from 'antd-mobile';

type Props = {};

const State = (props: Props) => {
  return (
    <div className={styles.lineup_mian}>
      <Grid columns={5}>
        {state.map((item, index) => {
          return (
            <div className={styles.lineup_state} key={index}>
              <Grid.Item>
                <div className={styles.lineup_img}>
                  <img className={styles.img} src={item?.img} alt="" />
                  {item.text}
                </div>
              </Grid.Item>
            </div>
          );
        })}
      </Grid>
    </div>
  );
};

export default State;
