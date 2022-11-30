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
  render: any;
}
type Props = {};

const Ranking = (props: Props) => {
  const data = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const columns: ColumnsType<DataType> = [
    {
      title: '赛事',
      dataIndex: 'id',
      key: 'id',
      width: 110,
      // align: "center",
    },

    {
      title: '主队',
      dataIndex: 'nickname',
      key: 'nickname',
      //   width: 150,
      align: 'center',
      render: (text, record, index) => <div>{text}</div>,
    },
    {
      title: '客队',
      dataIndex: 'number',

      key: '盘',
      align: 'center',
      render: (text, record, index) => <div style={{ color: '#7E1132' }}>{text}</div>,
    },
    {
      title: '进',
      dataIndex: props.activeKey == '0' ? 'energy_num' : 'reward_rate',

      align: 'center',
      render: (text) => (
        <div style={{ color: '#7E1132' }}>
          {props.activeKey == '0' ? Math.trunc(text) : Math.trunc(text) + '%'}
        </div>
      ),
    },
    {
      title: '角',
      dataIndex: props.activeKey == '0' ? 'energy_num' : 'reward_rate',

      align: 'center',
      render: (text, record, index) => (
        <div style={{ color: '#7E1132' }}>
          {props.activeKey == '0' ? Math.trunc(text) : Math.trunc(text) + '%'}
        </div>
      ),
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
