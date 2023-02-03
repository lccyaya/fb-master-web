import React, { useState, useEffect } from 'react';
import { Picker } from 'antd-mobile';
import { FormattedMessage } from 'umi';
import IconFont from '@/components/IconFont';
import type { OddsDetailsRes } from '@/services/matchdetail';

import styles from './index.less';

type Props = {
  data: OddsDetailsRes;
};

const OddsType = (props: Props) => {
  const { data } = props;

  return (
    <div className={styles.oddstype_main}>
      <div className={styles.oddstype_box}>
        <div className={styles.oddstype_box_left}>
          <div className={styles.oddstype_title}>
            {/* {lable} */}
            {/* <IconFont
              color="#848494"
              className={styles.icon}
              size={10}
              type="icon-biaoqianjiantou"
            /> */}
          </div>

          <div className={styles.oddstype}>
            <div>
              <FormattedMessage id="key_1x2" />
            </div>
            <div>
              {' '}
              <FormattedMessage id="key_handicap" />
            </div>
            <div>
              {' '}
              <FormattedMessage id="key_over_under" />
            </div>
          </div>
        </div>
        <div className={styles.oddstype_box_right}>
          <div className={styles.oddstype_title}>
            {' '}
            <FormattedMessage id="key_inital" />始
          </div>

          <div className={styles.oddstype}>
            <div className={styles.oddstype_inital}>
              <div className={styles.oddstype_odd}>{data?.eu[0]?.init?.home}</div>
              <div className={styles.oddstype_odd}>{data?.eu[0]?.init?.draw}</div>
              <div className={styles.oddstype_odd}>{data?.eu[0]?.init?.away}</div>
            </div>
            <div className={styles.oddstype_inital}>
              <div className={styles.oddstype_odd}>{data?.asia[0]?.init?.home}</div>
              <div className={styles.oddstype_odd}>{data?.asia[0]?.init?.draw}</div>
              <div className={styles.oddstype_odd}>{data?.asia[0]?.init?.away}</div>
            </div>
            <div className={styles.oddstype_inital}>
              <div className={styles.oddstype_odd}>{data?.bs[0]?.init?.home}</div>
              <div className={styles.oddstype_odd}>{data?.bs[0]?.init?.draw}</div>
              <div className={styles.oddstype_odd}>{data?.bs[0]?.init?.away}</div>
            </div>
          </div>
        </div>
        <div className={styles.oddstype_box_right}>
          <div className={styles.oddstype_title}>
            {' '}
            <FormattedMessage id="key_spot" />时
          </div>
          <div className={styles.oddstype}>
            <div className={styles.oddstype_inital}>
              <div
                className={styles.oddstype_odd}
                style={{
                  color:
                    data?.eu[0]?.spot?.home > data?.eu[0]?.init?.home
                      ? '#FA5900'
                      : data?.eu[0]?.spot?.home < data?.eu[0]?.init?.home
                      ? '#39906A'
                      : '',
                }}
              >
                {data?.eu[0]?.spot?.home}
              </div>
              <div
                className={styles.oddstype_odd}
                style={{
                  color:
                    data?.eu[0]?.spot?.draw > data?.eu[0]?.init?.draw
                      ? '#FA5900'
                      : data?.eu[0]?.spot?.draw < data?.eu[0]?.init?.draw
                      ? '#39906A'
                      : '',
                }}
              >
                {data?.eu[0]?.spot?.draw}
              </div>
              <div
                className={styles.oddstype_odd}
                style={{
                  color:
                    data?.eu[0]?.spot?.away > data?.eu[0]?.init?.away
                      ? '#FA5900'
                      : data?.eu[0]?.spot?.away < data?.eu[0]?.init?.away
                      ? '#39906A'
                      : '',
                }}
              >
                {data?.eu[0]?.spot?.away}
              </div>
            </div>
            <div className={styles.oddstype_inital}>
              <div
                className={styles.oddstype_odd}
                style={{
                  color:
                    data?.asia[0]?.spot?.home > data?.asia[0]?.init?.home
                      ? '#FA5900'
                      : data?.asia[0]?.spot?.home < data?.asia[0]?.init?.home
                      ? '#39906A'
                      : '',
                }}
              >
                {data?.asia[0]?.spot?.home}
              </div>
              <div
                className={styles.oddstype_odd}
                style={{
                  color:
                    data?.asia[0]?.spot?.draw > data?.asia[0]?.init?.draw
                      ? '#FA5900'
                      : data?.asia[0]?.spot?.draw < data?.asia[0]?.init?.draw
                      ? '#39906A'
                      : '',
                }}
              >
                {data?.asia[0]?.spot?.draw}
              </div>
              <div
                className={styles.oddstype_odd}
                style={{
                  color:
                    data?.asia[0]?.spot?.away > data?.asia[0]?.init?.away
                      ? '#FA5900'
                      : data?.asia[0]?.spot?.away < data?.asia[0]?.init?.away
                      ? '#39906A'
                      : '',
                }}
              >
                {data?.asia[0]?.spot?.away}
              </div>
            </div>
            <div className={styles.oddstype_inital}>
              <div
                className={styles.oddstype_odd}
                style={{
                  color:
                    data?.bs[0]?.spot?.home > data?.bs[0]?.init?.home
                      ? '#FA5900'
                      : data?.bs[0]?.spot?.home < data?.bs[0]?.init?.home
                      ? '#39906A'
                      : '',
                }}
              >
                {data?.bs[0]?.spot?.home}
              </div>
              <div
                className={styles.oddstype_odd}
                style={{
                  color:
                    data?.bs[0]?.spot?.draw > data?.bs[0]?.init?.draw
                      ? '#FA5900'
                      : data?.bs[0]?.spot?.draw < data?.bs[0]?.init?.draw
                      ? '#39906A'
                      : '',
                }}
              >
                {data?.bs[0]?.spot?.draw}
              </div>
              <div
                className={styles.oddstype_odd}
                style={{
                  color:
                    data?.bs[0]?.spot?.away > data?.bs[0]?.init?.away
                      ? '#FA5900'
                      : data?.bs[0]?.spot?.away < data?.bs[0]?.init?.away
                      ? '#39906A'
                      : '',
                }}
              >
                {data?.bs[0]?.spot?.away}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OddsType;
