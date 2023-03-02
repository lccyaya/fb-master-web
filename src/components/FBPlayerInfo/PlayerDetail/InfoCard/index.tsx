import React from 'react';
import styles from './index.less';

type Props = {};

const InfoCard = (props: Props) => {
  const { configs, data } = props;
  return (
    <div className={styles.player_info_card}>
      {configs.map((item) => {
        return (
          <div className={styles.player_info_card_flex} key={item.value}>
            <div className={styles.player_info_card_text}>{item.text}</div>
            <div className={styles.player_info_card_value}>{item.value}</div>
          </div>
        );
      })}
    </div>
  );
};

export default InfoCard;
