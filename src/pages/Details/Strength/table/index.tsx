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
  addRight?: ReactElement;
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
      title: <div style={{ fontWeight: 600, color: '#000028' }}>英格兰</div>,
      dataIndex: 'id',
      key: 'id',
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
            src={record?.avatar ? record?.avatar : GuessAvatar}
            alt=""
          />
        </div>
      ),
    },

    {
      title: '赛',
      dataIndex: 'nickname',
      key: 'nickname',
      //   width: 150,
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
  const { addRight } = props;
  return (
    <div className={styles.tab_teamtable_rank}>
      <div style={{ padding: 10 }}>
        <div className={styles.rank_title}>
          <FBTitle title="西甲" />
          <div>{addRight}</div>
        </div>

        <div className={styles.data_text}>
          <div>
            近12场交战 卡塔尔
            <span style={{ color: Color.numColor('win') }}> 2胜</span>
            <span style={{ color: Color.numColor('draw') }}>2平</span>
            <span style={{ color: Color.numColor('lost') }}> 0负</span>
          </div>

          <div className={styles.data_text_rate}>胜率50% 赢率37.5% 大率75%备份</div>
        </div>
      </div>

      <ConfigProvider renderEmpty={customizeRenderEmpty}>
        <Table
          pagination={false}
          columns={columns}
          dataSource={props.data}
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
