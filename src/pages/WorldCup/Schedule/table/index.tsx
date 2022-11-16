import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Spin } from 'antd';
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
  group: string | number;
  data: any;
};
const grouplist = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const TablePage = (props: Props) => {
  const history = useHistory();
  const columns: ColumnsType<DataType> = [
    {
      title: `${grouplist[props.group]}组`,
      dataIndex: 'team_name',
      key: 'team_name',
      // width: 150,
      // align: "center",
      render: (text, record, index) => (
        <div>
          <span>{record.position}</span>
          <img style={{ width: 20, height: 20, margin: ' 0 5px', objectFit: 'cover' }} src={record.team_logo} alt="" />
          {text}
        </div>
      ),
    },
    {
      title: '赛',
      dataIndex: 'team',
      key: 'team',
      width: 100,
      align: 'center',
      render: (text, record, index) => <div>{record.played}</div>,
    },
    {
      title: '胜/平/负',
      dataIndex: 'won',
      key: 'won',
      align: 'center',
      render: (text, record, index) => (
        <div>
          {record.won}/{record.drawn}/{record.lost}
        </div>
      ),
    },
    {
      title: '进/失/净',
      dataIndex: 'num',
      key: 'address',
      align: 'center',
      render: (text, record, index) => (
        <div>
          {record.goals}/{record.against}/{record.diff}
        </div>
      ),
    },
    {
      title: '积分',
      dataIndex: 'pts',
      key: 'pts',
      align: 'center',
    },
  ];
  return (
    <div className={styles.tab_teamtable}>
      <Spin spinning={!props.data?.length}>
        <Table
          pagination={false}
          columns={columns}
          dataSource={props.data}
          rowKey="team_id"
          onRow={(record) => {
            return {
              onClick: (event) => {
                console.log(record, 'pppp');

                history.push(`/zh/teamdetails/${record.team_id}`);
              }, // 点击行
            };
          }}
        />
      </Spin>
    </div>
  );
};

export default TablePage;
