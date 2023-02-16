import React from 'react';
import styles from './index.less';
type Props = {};

const PlayerHonour = (props: Props) => {
  return (
    <div className={styles.player_honour}>
      <div className={styles.player_honour_img}>图片</div>
      <div>
        <div className={styles.honour_text}>冠军o欧洲</div>
        <div className={styles.honour}>
          <div className={styles.honour_list}>
            <div style={{ fontSize: 13 }}>2021-04-05</div>
            冠军o欧洲
          </div>
          <div className={styles.honour_list}>冠军o欧洲</div>
          <div className={styles.honour_list}>冠军o欧洲</div>
          <div className={styles.honour_list}>冠军o欧洲</div>
        </div>
      </div>
    </div>
  );
};

export default PlayerHonour;
