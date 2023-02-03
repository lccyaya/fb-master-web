import React from 'react';
import { FormattedMessage } from 'umi';
import { Position } from '@/utils/match';
import Empty from '@/components/Empty';
import type { injuryList } from '@/services/matchdetail';
import { playerValue } from '@/utils/match';
import { injuredValue } from './config';
import styles from './index.less';

type Props = {
  data: injuryList | undefined;
};

const Tabel = (props: Props) => {
  const { data } = props;

  return (
    <div>
      <div className={styles.oddstype_main}>
        <div className={styles.oddstype_title_flex}>
          <div
            className={styles.oddstype_title}
            style={{
              color: '#000028',
              fontWeight: 500,
              textAlign: 'left',
              padding: '0 10px',
              width: '35%',
            }}
          >
            {data?.team_name}
          </div>
          <div
            className={styles.oddstype_title}
            style={{
              width: '15%',
              justifyContent: 'center',
            }}
          >
            位置
          </div>
          <div className={styles.oddstype_title} style={{ textAlign: 'left', width: '35%' }}>
            原因
          </div>
          <div
            style={{
              width: '15%',
            }}
            className={styles.oddstype_title}
          >
            身价(欧)
          </div>
        </div>
        {data?.injury.length ? (
          <div>
            {data?.injury?.map((item) => {
              return (
                <div className={styles.oddstype_box} key={item.id}>
                  <div className={styles.oddstype_box_right} style={{ width: '35%' }}>
                    <div className={styles.oddstype}>
                      <div className={styles.oddstype_flex}>
                        <img className={styles.oddstype_img} src={item.logo} alt="" />

                        <div>{item.name}</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.oddstype_box_right} style={{ width: '15%' }}>
                    <div className={styles.oddstype}>
                      <div>{Position(item.position)}</div>
                    </div>
                  </div>
                  <div className={styles.oddstype_box_right} style={{ width: '35%' }}>
                    <div className={styles.oddstype} style={{ border: 'none' }}>
                      <div className={styles.oddstype_flex}>
                        <img
                          className={styles.oddstype_img_logo}
                          src={injuredValue(item.type)}
                          alt=""
                        />

                        <div>{item.reason ? item.reason : '受伤'}</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.oddstype_box_right} style={{ width: '15%' }}>
                    <div className={styles.oddstype} style={{ border: 'none' }}>
                      <div>{playerValue(item.market_value)}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <Empty style={{ fontSize: 20 }} />
        )}
      </div>
    </div>
  );
};

export default Tabel;
