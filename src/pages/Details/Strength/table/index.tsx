import React from 'react';
import styles from './index.less';
import type { StatsDetailsRes } from '@/services/matchdetail';
type Props = {
  type?: string;
  data: StatsDetailsRes | undefined;
};

const Table = (props: Props) => {
  const { type, data } = props;
  const gong = [
    {
      text: '场均进球',
      value: 'goalpPerGame',
      unit: '个',
    },
    {
      text: '场均射正',
      value: 'orthophoto',
      unit: '次',
    },
    {
      text: '场均射门',
      value: 'projectivdeviation',
      unit: '次',
    },
    {
      text: '场均危险进攻',
      value: 'dangerouAttack',
      unit: '次',
    },
    {
      text: '场均进攻',
      value: 'attack',
      unit: '次',
    },
    {
      text: '场球控球率',
      value: 'ballControlRate',
    },
    {
      text: '场球红黄牌率',
      value: 'ryCard',
    },
    {
      text: '场球角率',
      value: 'cornerBall',
    },
  ];
  const shou = [
    {
      text: '场均失球',
      value: 'coverGoalpPerGame',
      unit: '个',
    },
    {
      text: '被射正',
      value: 'coverOrthophoto',
      unit: '次',
    },
    {
      text: '被射门',
      value: 'coverProjectivdeviation',
      unit: '次',
    },
    {
      text: '防守成功率',
      value: 'coverBallControlRate',
    },
  ];

  return (
    <div className={styles.strength_main_gong}>
      <div className={type == 'shou' ? styles.shou_bg : styles.gong_bg}>
        <div className={styles.border_bg}>
          {type == 'shou' ? (
            <div className={styles.type_bg}>
              {shou.map((item, index) => {
                return (
                  <div className={styles.strength_main_text} key={index}>
                    <div className={styles.left_text}>
                      {data?.guardh[item.value]}
                      {item.unit}
                    </div>
                    <div className={styles.center_text}>{item.text}</div>
                    <div className={styles.right_text}>
                      {data?.guardh[item.value]} {item.unit}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={styles.type_bg}>
              {gong.map((item, index) => {
                return (
                  <div className={styles.strength_main_text} key={index}>
                    <div className={styles.left_text}>
                      {data?.attackh[item.value]} {item.unit}
                    </div>
                    <div className={styles.center_text}>{item.text}</div>
                    <div className={styles.right_text}>
                      {data?.attacka[item.value]} {item.unit}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Table;
