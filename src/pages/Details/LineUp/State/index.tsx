import React from 'react';
import { state } from './config';
import styles from './index.less';
import { Grid } from 'antd-mobile';

type Props = {};

const State = (props: Props) => {
  console.log(state, 'poopooojjjjjj');

  return (
    <div className={styles.lineup_mian}>
      <Grid columns={5}>
        {state.map((item) => {
          return (
            <div className={styles.lineup_state} key={item.id}>
              <Grid.Item>
                <div className={styles.lineup_img}>
                  <img className={styles.img} src={item.img} alt="" />
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
