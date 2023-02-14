import React from 'react';
import styles from './index.less';
import { Grid } from 'antd-mobile';
type Props = {};

const PlayerTechnology = (props: Props) => {
  return (
    <div>
      <Grid columns={4} gap={8}>
        <Grid.Item>
          <div className={styles.technologyo_item_block}>
            <div>17/7</div>
            <div className={styles.text}>首发</div>
          </div>
        </Grid.Item>
        <Grid.Item>
          <div className={styles.technologyo_item_block}>
            <div>17/7</div>
            <div className={styles.text}>首发</div>
          </div>
        </Grid.Item>
        <Grid.Item>
          <div className={styles.technologyo_item_block}>
            <div>17/7</div>
            <div className={styles.text}>首发</div>
          </div>
        </Grid.Item>
        <Grid.Item>
          <div className={styles.technologyo_item_block}>
            <div>17/7</div>
            <div className={styles.text}>首发</div>
          </div>
        </Grid.Item>
        <Grid.Item>
          <div className={styles.technologyo_item_block}>
            <div>17/7</div>
            <div className={styles.text}>首发</div>
          </div>
        </Grid.Item>
      </Grid>
    </div>
  );
};

export default PlayerTechnology;
