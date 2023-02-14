import React from 'react';
import styles from './index.less';
type Props = {};

const PlayerMiniGround = (props: Props) => {
  return (
    <div className={styles.player_mini_ground}>
      <div>
        <div className={styles.left}>
          <div className={styles.left_label}>
            <div className={styles.circle} />
            优势
          </div>
          <div>
            <div>长传卸球</div>
            <div>长传卸球</div>
            <div>长传卸球</div>
          </div>
        </div>
        <div className={styles.left}>
          <div className={styles.left_label} style={{ color: '#39906A' }}>
            <div className={styles.circle} style={{ background: '#39906A' }} />
            优势
          </div>
          <div>
            <div>长传卸球</div>
            <div>长传卸球</div>
            <div>长传卸球</div>
          </div>
        </div>
      </div>

      <div className={styles.right}>c</div>
    </div>
  );
};

export default PlayerMiniGround;
