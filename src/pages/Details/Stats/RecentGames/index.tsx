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
      title: '赛事',
      dataIndex: 'nickname',
      key: 'nickname',
      //   width: 150,
      align: 'center',
      render: (text, record, index) => <div>西甲</div>,
    },
    {
      title: '主队',
      dataIndex: 'id',
      key: 'id',
      width: 60,
      align: 'center',
      render: (text, record, index) => (
        <div style={{ color: '#45494C', width: 60, whiteSpace: 'pre-wrap' }}>沙特阿拉沙特阿拉</div>
      ),
    },
    {
      title: '',
      dataIndex: 'id',
      key: 'id',

      align: 'center',
      render: (text, record, index) => (
        <div>
          <div style={{ fontSize: 15, fontWeight: 500, color: '#45494C' }}>2:1</div>

          <div style={{ fontSize: 11 }}>(0:0)</div>
        </div>
      ),
    },
    {
      title: '客队',
      dataIndex: 'number',
      width: 60,
      key: 'number',
      align: 'center',
      render: (text, record, index) => (
        <div style={{ width: 60, whiteSpace: 'pre-wrap' }}>沙特阿拉沙特阿拉</div>
      ),
    },
    {
      title: '盘',
      dataIndex: 'reward_rate',

      align: 'center',
      render: (text, record, index) => <div style={{ color: '#7E1132' }}>赢</div>,
    },
    {
      title: '进',
      dataIndex: props.activeKey == '0' ? 'energy_num' : 'reward_rate',

      align: 'center',
      render: (text, record, index) => <div style={{ color: '#7E1132' }}>赢</div>,
    },
    {
      title: '角',
      dataIndex: props.activeKey == '0' ? 'energy_num' : 'reward_rate',

      align: 'center',
      render: (text, record, index) => <div style={{ color: '#7E1132' }}>赢</div>,
    },
  ];
  const tab = [
    { title: '同主客', key: '0' },
    { title: '同赛事', key: '1' },
    { title: '20场', key: '2' },
  ];
  return (
    <div>
      <div className={styles.table_space}>
        <Table addRight={<RightTab tab={tab} />} data={data} columns={columns} dataText />
      </div>
      <div className={styles.table_space}>
        <Table addRight={<RightTab tab={tab} />} data={data} columns={columns} dataText />
      </div>
    </div>
  );
};

export default Ranking;
