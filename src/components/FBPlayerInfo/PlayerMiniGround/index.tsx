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

      <div className={styles.right}>
        <div className={styles.position}>
          <div className={styles.right_position}>DL</div>
          <div className={styles.right_position}>ML</div>
          <div className={styles.right_position}>LW</div>
        </div>
        <div className={styles.position} style={{ width: 165 }}>
          <div className={styles.right_position}>GK</div>
          <div className={styles.right_position}>DC</div>
          <div className={styles.right_position}>DM</div>
          <div className={styles.right_position}>MC</div>
          <div className={styles.right_position}>AM</div>
          <div className={styles.right_position}>ST</div>
        </div>
        <div className={styles.position}>
          <div className={styles.right_position}>DR</div>
          <div className={styles.right_position}>MR</div>
          <div className={styles.right_position}>RW</div>
        </div>
      </div>
    </div>
  );
};

export default PlayerMiniGround;
