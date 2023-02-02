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
        <div />
        <div className={styles.oddstype_time}>
          <span className={styles.oddstype_time}>00‘</span>
          <span className={styles.oddstype_time}>15’</span>
          <span className={styles.oddstype_time}>30‘</span>
          <span className={styles.oddstype_time}>45‘</span>
          <span className={styles.oddstype_time}>60‘</span>
          <span className={styles.oddstype_time}>75‘</span>
          <span className={styles.oddstype_time}>90‘</span>
        </div>
      </div>

      <div className={styles.oddstype_box}>
        <div className={styles.oddstype_title}>{data?.home?.name}</div>

        <div className={styles.oddstype}>
          <div style={{ width: '30%', textAlign: 'right' }}>
            {data?.home?.total} ({data?.home?.up}:{data?.home?.lower})
          </div>
          {data?.home?.dis?.length ? (
            <div className={styles.oddstype_list_box}>
              {data?.home?.dis?.map((item: goalDistributionList, index: number) => {
                return (
                  <div
                    style={{ marginRight: index == 2 ? 5 : 0 }}
                    key={index}
                    className={styles.oddstype_list}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={styles.oddstype_list_box}>
              {[1, 2, 3, 4, 5, 6].map((item: any, index: number) => {
                return (
                  <div
                    style={{ marginRight: index == 2 ? 5 : 0 }}
                    key={index}
                    className={styles.oddstype_list}
                  >
                    -
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className={styles.oddstype_box}>
        <div className={styles.oddstype_title}>{data?.away?.name}</div>
        <div className={styles.oddstype}>
          <div style={{ width: '30%', textAlign: 'right' }}>
            {data?.away?.total} ({data?.away?.up}:{data?.away?.lower})
          </div>
          {data?.home?.dis?.length ? (
            <div className={styles.oddstype_list_box}>
              {data?.away?.dis?.map((item: goalDistributionList, index: number) => {
                return (
                  <div
                    style={{ marginRight: index == 2 ? 5 : 0 }}
                    key={index}
                    className={styles.oddstype_list}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={styles.oddstype_list_box}>
              {[1, 2, 3, 4, 5, 6].map((item: any, index: number) => {
                return (
                  <div
                    style={{ marginRight: index == 2 ? 5 : 0 }}
                    key={index}
                    className={styles.oddstype_list}
                  >
                    -
                  </div>
                );
              })}
            </div>
          )}

          {/* <Empty style={{ fontSize: 20 }} /> */}
        </div>
      </div>
    </div>
  );
};

export default Table;
