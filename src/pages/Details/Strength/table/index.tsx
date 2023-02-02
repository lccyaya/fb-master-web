import React from 'react';
import styles from './index.less';

type Props = {
  type?: string;
};

const Table = (props: Props) => {
  const { type } = props;
  const data = [
    {
      home: 1.2,
      text: '场均进球',
      away: 2.9,
    },
    {
      home: 1.3,
      text: '射门',
      away: 2.8,
    },
    {
      home: 1.2,
      text: '场均进球',
      away: 2.9,
    },
    {
      home: 1.2,
      text: '场均进球',
      away: 2.9,
    },
  ];
  console.log(type, 'ppppppp');

  return (
    <div className={styles.strength_main_gong}>
      <div className={type == 'shou' ? styles.shou_bg : styles.gong_bg}>
        <div className={styles.border_bg}>
          <div className={styles.type_bg}>
            {data.map((item, index) => {
              return (
                <div className={styles.strength_main_text} key={index}>
                  <div className={styles.left_text}>{item.home}个</div>
                  <div className={styles.center_text}>{item.text}</div>
                  <div className={styles.right_text}>{item.away}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
