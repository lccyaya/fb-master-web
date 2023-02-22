import React, { useState } from 'react';
import { Picker } from 'antd-mobile';
import { FormattedMessage } from 'umi';
import IconFont from '@/components/IconFont';
import Empty from '@/components/Empty';

import styles from './index.less';
import type { GoalDistributionListRes, goalDistributionList } from '@/services/matchdetail';
type Props = {
  data: GoalDistributionListRes;
};

const Table = (props: Props) => {
  const { data } = props;

  return (
    <div className={styles.oddstype_main}>
      <div className={styles.oddstype_box} style={{ height: 30 }}>
        <div style={{ width: '30%' }} />
        <div className={styles.oddstype_time}>
          <div className={styles.oddstype_time_list}>00`</div>
          <div className={styles.oddstype_time_list}>15`</div>
          <div className={styles.oddstype_time_list}>30`</div>
          <div className={styles.oddstype_time_list}>45`</div>
          <div className={styles.oddstype_time_list}>60`</div>
          <div className={styles.oddstype_time_list}>75`</div>
          <div className={styles.oddstype_time_list}>90`</div>
        </div>
      </div>

      <div className={styles.oddstype_box}>
        <div className={styles.oddstype_title}>{data?.home?.name}</div>

        <div className={styles.oddstype}>
          <div style={{ width: '30%', textAlign: 'right' }}>
            {data?.home?.total} ({data?.home?.up}|{data?.home?.lower})
          </div>

          <div className={styles.oddstype_list_box}>
            {data?.home?.dis?.map((item: any, index: number) => {
              return (
                <div
                  style={{
                    marginRight: index == 2 ? 5 : 0,
                    background: item != 0 && Math.max(...data?.home?.dis) == item ? '#FFE2E2' : '',
                  }}
                  key={index}
                  className={styles.oddstype_list}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.oddstype_box}>
        <div className={styles.oddstype_title}>{data?.away?.name}</div>
        <div className={styles.oddstype}>
          <div style={{ width: '30%', textAlign: 'right', fontSize: 12 }}>
            {data?.away?.total} ({data?.away?.up}|{data?.away?.lower})
          </div>

          <div className={styles.oddstype_list_box}>
            {data?.away?.dis?.map((item: any, index: number) => {
              return (
                <div
                  style={{
                    marginRight: index == 2 ? 5 : 0,
                    background: item != 0 && Math.max(...data?.away?.dis) == item ? '#D7E8E1' : '',
                  }}
                  key={index}
                  className={styles.oddstype_list}
                >
                  {item}
                </div>
              );
            })}
          </div>

          {/* <Empty style={{ fontSize: 20 }} /> */}
        </div>
      </div>
    </div>
  );
};

export default Table;
