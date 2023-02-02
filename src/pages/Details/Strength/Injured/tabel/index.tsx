import React from 'react';
import { FormattedMessage } from 'umi';
import { Position } from '@/utils/match';
import Empty from '@/components/Empty';
import type { injuryList } from '@/services/matchdetail';

import styles from './index.less';

type Props = {
  data: injuryList;
};

const Tabel = (props: Props) => {
  const { data } = props;
  console.log(data, 'lslslslslsl');

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
                        <div>
                          <img className={styles.oddstype_img} src={item.logo} alt="" />
                        </div>
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
                        <div className={styles.oddstype_img_logo}>
                          <img src="" alt="" />
                        </div>
                        <div>{item.reason}</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.oddstype_box_right} style={{ width: '15%' }}>
                    <div className={styles.oddstype} style={{ border: 'none' }}>
                      <div>{(item.market_value / 10000).toFixed(0)}万</div>
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
