import React from 'react';
import Table from '../table';
import RightTab from '../RightTab';
import styles from './index.less';
import type { ColumnsType } from 'antd/es/table';
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
type Props = {};

const Ranking = (props: Props) => {
  const data = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const columns: ColumnsType<DataType> = [
    {
      title: <div style={{ fontWeight: 600, color: '#000028' }}>英格兰</div>,
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },

    {
      title: '日期',
      dataIndex: 'nickname',
      key: 'nickname',
      align: 'center',
      render: (text, record, index) => <div>2022-11-02</div>,
    },
    {
      title: '主队',
      dataIndex: 'number',
      width: 60,
      key: 'number',
      align: 'center',
      render: (text, record, index) => (
        <div style={{ color: '#45494C', width: 60, whiteSpace: 'pre-wrap', fontWeight: 500 }}>
          沙特阿拉沙特阿拉
        </div>
      ),
    },
    {
      title: '客队',
      dataIndex: 'reward_rate',
      width: 60,
      align: 'center',
      render: (text, record, index) => (
        <div style={{ width: 60, whiteSpace: 'pre-wrap' }}>沙特阿拉沙特阿拉</div>
      ),
    },
    {
      title: '间隔',
      dataIndex: props.activeKey == '0' ? 'energy_num' : 'reward_rate',

      align: 'center',
      render: (text, record, index) => <div>3天</div>,
    },
  ];
  return (
    <div>
      <div className={styles.table_space}>
        <Table data={data} columns={columns} />
      </div>
      <div className={styles.table_space}>
        <Table data={data} columns={columns} />
      </div>
      <div className={styles.table_space}>
        <Table data={data} columns={columns} />
      </div>
    </div>
  );
};

export default Ranking;
