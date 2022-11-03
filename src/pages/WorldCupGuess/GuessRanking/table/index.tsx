import React, { useEffect, useState } from 'react';
import { Table, ConfigProvider } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Empty from '@/components/Empty';
import RankingOne from '@/assets/worldcup/Ranking_1.png';
import RankingTwo from '@/assets/worldcup/Ranking_2.png';
import RankingThree from '@/assets/worldcup/Ranking_3.png';
import { useHistory } from 'umi';
// import { ScoresList } from "@/services/worldcup"

import styles from './index.less';
interface DataType {
  key: string;
  ranking: string;
  num: number;
  team: string;
  teamplay: string;
  team_logo: string;
  position: number;
  played: number;
  won: number;
  against: number;
  drawn: number;
  goals: number;
  diff: number;
  lost: number;
  team_id: number;
}
type Props = {
  group?: string | number;
  data?: any;
  activeKey?: string;
};
const customizeRenderEmpty = () => (
  <div style={{ textAlign: 'center' }}>
    <Empty style={{ fontSize: 20 }} />
  </div>
);
const TablePage = (props: Props) => {
  const history = useHistory();
  const columns: ColumnsType<DataType> = [
    {
      title: '排名',
      dataIndex: 'team_name',
      key: 'team_name',
      width: 110,
      // align: "center",
      render: (text, record, index) => (
        <div className={styles.rankflex}>
          <div className={styles.rankflex} style={{ width: 25, height: 25, margin: '0 5px' }}>
            {record.id < 4 ? (
              <img
                style={{ width: 25, height: 25 }}
                src={record.id == 1 ? RankingOne : record.id == 2 ? RankingTwo : RankingThree}
                alt=""
              />
            ) : (
              <span>{record.id}</span>
            )}
          </div>

          <img
            style={{
              width: 40,
              height: 40,
              margin: ' 0 5px 0 10px',
              borderRadius: 50,
              background: '#eee',
            }}
            // src={record.team_logo}
            alt=""
          />
        </div>
      ),
    },

    {
      title: '用户名',
      dataIndex: 'team',
      key: 'team',
      //   width: 150,
      align: 'center',
      render: (text, record, index) => <div>你好</div>,
    },
    {
      title: '参与次数',
      dataIndex: 'won',

      key: 'won',
      align: 'center',
    },
    {
      title: props.activeKey == '1' ? '世界杯竞猜值' : '回报率',
      dataIndex: 'num',
      width: 100,
      key: 'address',
      align: 'center',
      render: (text, record, index) => (
        <div style={{ color: '#7E1132' }}>
          sss
          {/* {record.goals}/{record.against}/{record.diff} */}
        </div>
      ),
    },
  ];
  return (
    <div className={styles.tab_teamtable}>
      <ConfigProvider renderEmpty={customizeRenderEmpty}>
        <Table
          pagination={false}
          columns={columns}
          dataSource={props.data}

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
