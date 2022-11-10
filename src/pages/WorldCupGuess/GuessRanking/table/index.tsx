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
  avatar: string;
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
      dataIndex: 'user_id',
      key: 'user_id',
      width: 110,
      // align: "center",
      render: (text, record, index) => (
        <div className={styles.rankflex}>
          <div className={styles.rankflex} style={{ width: 25, height: 25, margin: '0 5px' }}>
            {index < 3 ? (
              <img
                style={{ width: 25, height: 25 }}
                src={index == 0 ? RankingOne : index == 1 ? RankingTwo : RankingThree}
                alt=""
              />
            ) : (
              <span>{index + 1}</span>
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
            src={record.avatar}
            alt=""
          />
        </div>
      ),
    },

    {
      title: '用户名',
      dataIndex: 'nickname',
      key: 'nickname',
      //   width: 150,
      align: 'center',
      render: (text, record, index) => <div>{text}</div>,
    },
    {
      title: '参与次数',
      dataIndex: 'number',

      key: 'number',
      align: 'center',
      render: (text, record, index) => <div style={{ color: '#7E1132' }}>{text}</div>,
    },
    {
      title: props.activeKey == '0' ? '世界杯能量值' : '回报率',
      dataIndex: props.activeKey == '0' ? 'energy_num' : 'reward_rate',
      width: 100,

      align: 'center',
      render: (text, record, index) => (
        <div style={{ color: '#7E1132' }}>
          {props.activeKey == '0' ? text : Math.trunc(text) + '%'}
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
          dataSource={props.data.list}
          rowKey="user_id"
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
