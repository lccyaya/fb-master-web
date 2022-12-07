import React, { ReactElement, useEffect, useState } from 'react';
import { Table, ConfigProvider } from 'antd';
import Empty from '@/components/Empty';
// import { useHistory } from 'umi';
import FBTitle from '@/components/FBTitle';
import { Color } from '@/utils/match';
import type { spType } from '@/services/matchdetail';
// import { ScoresList } from "@/services/worldcup"

import styles from './index.less';

type Props = {
  group?: string | number;
  dataSource?: any;
  activeKey?: string;
  addRight?: ReactElement;
  columns?: any;
  dataText?: spType;
  dataTitle?: string;
  rowKey?: string;
  loading?: boolean;
};
const customizeRenderEmpty = () => (
  <div style={{ textAlign: 'center' }}>
    <Empty style={{ fontSize: 20 }} />
  </div>
);
const TablePage = (props: Props) => {
  // const history = useHistory();

  const { addRight, dataText, dataTitle, rowKey, dataSource, loading } = props;
  console.log(dataText);

  return (
    <div className={styles.tab_teamtable_rank}>
      <div style={{ padding: '0 10px' }}>
        <div className={styles.rank_title}>
          {dataTitle ? <FBTitle title={dataTitle} /> : <FBTitle title="" />}

          <div>{addRight}</div>
        </div>

        {dataText && (
          <div className={styles.data_text}>
            <div className={styles.data_big}>
              近{dataText.played}场
              <img
                style={{ width: 20, height: 20, margin: '0 5px' }}
                src={dataText.team_logo}
                alt=""
              />
              {dataText.team_name}
              <span style={{ color: Color.numColor('win'), margin: '0 0 0 5px' }}>
                {' '}
                {dataText.won}胜
              </span>
              <span style={{ color: Color.numColor('draw'), margin: '0 0 0 5px' }}>
                {' '}
                {dataText.drawn}平
              </span>
              <span style={{ color: Color.numColor('lost'), margin: '0 0 0 5px' }}>
                {' '}
                {dataText.lost}负
              </span>
            </div>

            <div className={styles.data_text_rate}>{dataText.recent}</div>
          </div>
        )}
      </div>

      <ConfigProvider renderEmpty={customizeRenderEmpty}>
        <Table
          loading={loading}
          pagination={false}
          columns={props.columns}
          dataSource={dataSource}
          rowKey={rowKey}
          // onRow={record => {
          //     return {
          //         onClick: event => {
          //             console.log(record, "pppp");

          //             history.push(`/zh/teamdetails/${record.team_id}`)
          //         }, // 点击行

          //     };
          // }}
        />
      </ConfigProvider>
    </div>
  );
};

export default TablePage;
