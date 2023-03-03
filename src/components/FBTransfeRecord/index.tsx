import React from 'react';
import styles from './index.less';
import defaultAvatar from '@/assets/mine/avatar.png';
type Props = {
  activeKey?: string;
};

const FBTransfeRecord = (props: Props) => {
  const { configs, data, activeKey } = props;
  return (
    <div className={styles.player_info_card}>
      <div className={styles.player_info_card_flex}>
        <div
          className={styles.player_info_card_text}
          style={{ width: '80%', justifyContent: 'space-between' }}
        >
          <div className={styles.player_info_card_text}>
            <img className={styles.img} src={defaultAvatar} alt="" />
            <div>
              <div className={styles.text}>巴西</div>

              <div className={styles.info}>30岁/守门员/英格兰</div>
            </div>
          </div>
          <div className={styles.player_info_card_text}>
            <img className={styles.transfe_record_img} src="" alt="" />
            <div>
              {}
              <div className={styles.text}>水晶宫</div>
              <div className={styles.info}>2023-01-6</div>
            </div>
          </div>
        </div>
        <div className={styles.player_info_card_value}>
          {!activeKey ? (
            <div>
              <div>转会</div>
              <div className={styles.player_info_data}>4000万</div>
            </div>
          ) : (
            <div>转会</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FBTransfeRecord;
