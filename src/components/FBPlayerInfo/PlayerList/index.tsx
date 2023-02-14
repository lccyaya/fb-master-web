import React from 'react';
import styles from './index.less';
type Props = {};

const PlayerList = (props: Props) => {
  const { configs, data } = props;
  return (
    <div className={styles.player_info_card}>
      <div className={styles.player_info_card_flex}>
        <div className={styles.player_info_card_text}>
          <div>巴西</div>
          <img className={styles.img} src="" alt="" />
          <img className={styles.img} src="" alt="" />
          <img className={styles.img} src="" alt="" />
          <div>巴西</div>
        </div>
        <div className={styles.player_info_card_value}>
          <div>转会</div>
          <div className={styles.player_info_data}>2023-01-6</div>
        </div>
      </div>
    </div>
  );
};

export default PlayerList;
