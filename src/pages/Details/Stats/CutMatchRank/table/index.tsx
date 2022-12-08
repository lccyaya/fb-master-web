import React, { ReactElement, useEffect, useState } from 'react';
import { Table, ConfigProvider } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Empty from '@/components/Empty';
import RankingOne from '@/assets/worldcup/Ranking_1.png';
import RankingTwo from '@/assets/worldcup/Ranking_2.png';
import RankingThree from '@/assets/worldcup/Ranking_3.png';
import { useHistory } from 'umi';
import GuessAvatar from '@/assets/worldcup/guess_avatar.png';
import FBTitle from '@/components/FBTitle';
import { Color } from '@/utils/match';
import { cupmatchList } from '@/services/matchdetail';
// import type { FutureListRes, cupmatchList } from '@/services/matchdetail';
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

  activeKey?: string;
  addRight?: ReactElement;
  match_id?: number;
};
const customizeRenderEmpty = () => (
  <div style={{ textAlign: 'center' }}>
    <Empty style={{ fontSize: 20 }} />
  </div>
);
const TablePage = (props: Props) => {
  const history = useHistory();
  const { match_id } = props;
  const [data, setData] = useState<any>();
  const columns: ColumnsType<DataType> = [
    {
      title: <div style={{ fontWeight: 600, color: '#000028' }}>{data?.name}</div>,
      dataIndex: 'home_team_name',
      key: 'home_team_name',
      // className: data?.name == home_team_name,
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
  const getCupmatchList = async () => {
    const params: any = {
      match_id,
    };
    const res = await cupmatchList(params);
    if (res.success) {
      setData(res.data);
    }
    console.log(res.data, 'pppppppppp');
  };

  useEffect(() => {
    getCupmatchList();
  }, []);
  return (
    <div className={styles.tab_teamtable_rank}>
      <ConfigProvider renderEmpty={customizeRenderEmpty}>
        <Table
          pagination={false}
          columns={columns}
          dataSource={data?.match}
          rowKey="id"
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
