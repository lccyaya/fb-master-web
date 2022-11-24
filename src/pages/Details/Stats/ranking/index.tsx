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
  const data = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
  const columns: ColumnsType<DataType> = [
    {
      title: <div style={{ fontWeight: 600, color: '#000028' }}>英格兰</div>,
      dataIndex: 'id',
      key: 'id',
      // align: "center",
    },

    {
      title: '赛',
      dataIndex: 'nickname',
      key: 'nickname',
      width: 50,
      align: 'center',
      render: (text, record, index) => <div>{text}</div>,
    },
    {
      title: '胜/平/负',
      dataIndex: 'number',

      key: 'number',
      align: 'center',
      render: (text, record, index) => <div style={{ color: '#7E1132' }}>{text}</div>,
    },
    {
      title: '进/失/净',
      dataIndex: props.activeKey == '0' ? 'energy_num' : 'reward_rate',

      align: 'center',
      render: (text, record, index) => (
        <div style={{ color: '#7E1132' }}>
          {props.activeKey == '0' ? Math.trunc(text) : Math.trunc(text) + '%'}
        </div>
      ),
    },
    {
      title: '积分',
      dataIndex: props.activeKey == '0' ? 'energy_num' : 'reward_rate',

      align: 'center',
      render: (text, record, index) => (
        <div style={{ color: '#7E1132' }}>
          {props.activeKey == '0' ? Math.trunc(text) : Math.trunc(text) + '%'}
        </div>
      ),
    },
    {
      title: '排名',
      dataIndex: props.activeKey == '0' ? 'energy_num' : 'reward_rate',

      align: 'center',
      render: (text, record, index) => (
        <div style={{ color: '#7E1132' }}>
          {props.activeKey == '0' ? Math.trunc(text) : Math.trunc(text) + '%'}
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className={styles.table_space}>
        <Table addRight={<div>完整积分榜</div>} data={data} columns={columns} dataTitle />
      </div>
      <div className={styles.table_space}>
        <Table addRight={<div>完整积分榜</div>} data={data} columns={columns} dataTitle />
      </div>
      <div className={styles.table_space}>
        <Table addRight={<div>完整积分榜</div>} data={data} columns={columns} dataTitle />
      </div>
    </div>
  );
};

export default Ranking;
