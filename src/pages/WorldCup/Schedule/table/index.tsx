import React, { useEffect, useState } from 'react';
import { Table, ConfigProvider } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Spin } from 'antd';
import avatarImg from '@/assets/mine/avatar.png';
import { useHistory } from 'umi';
import Empty from '@/components/Empty';
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
  data: any;
  titletext?: any;
  integrate?: any
};
const grouplist = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const TablePage = (props: Props) => {
  const history = useHistory();
  const columns: ColumnsType<DataType> = [
    {
      title: (
        <div className={styles.title}>
          {props?.titletext > 0 ? `${grouplist[props?.titletext - 1]}组` : props?.titletext}
        </div>
      ),
      dataIndex: 'team_name',
      key: 'team_name',
      // width: 100,
      // align: "center",
      render: (text, record, index) => (
        <div
          className={styles.bgheight}
          style={{
            borderTop:
              props.data[index - 1]?.promotions?.name !== record.promotions?.name && props.integrate == "1" &&
                record.promotions?.name !== ''
                ? `2px solid ${record.promotions?.color}`
                : '',
            background: props.integrate == "1" && record.promotions?.color.length ? record.promotions?.color + 30 : "",
          }}
        >
          <div style={{ width: 20, textAlign: 'center' }}>{record.position}</div>
          <img
            style={{ width: 20, height: 15, margin: ' 0 5px', objectFit: 'contain' }}
            src={record.team_logo ? record.team_logo : avatarImg}
            alt=""
          />
          <div
            style={{
              width: "130px",
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            {text}
          </div>
        </div>
      ),
    },
    // {
    //   // title: '赛',
    //   dataIndex: 'team',
    //   key: 'team',
    //   width: 50,
    //   align: 'center',
    //   render: (text, record, index) => (
    //     <div
    //       className={styles.bgheight}
    //       style={{
    //         background: record.promotions?.color + 30,
    //         borderTop:
    //           props.data[index - 1]?.promotions?.name !== record.promotions?.name &&
    //             record.promotions?.name !== ''
    //             ? `2px solid ${record.promotions?.color}`
    //             : '',
    //         flexDirection: 'column',
    //       }}
    //     >
    //       <div style={{ background: record.promotions?.color }} className={styles.row_tip}>
    //         {props.data[index - 1]?.promotions?.name !== record.promotions?.name ? (
    //           <div></div>
    //         ) : (
    //           ''
    //         )}
    //       </div>

    //     </div>
    //   ),
    // },
    {
      title: '赛',
      dataIndex: 'team',
      key: 'team',
      // width: 100,
      align: 'center',
      render: (text, record, index) => (
        <div
          className={styles.bgheight}
          style={{
            background: props.integrate == "1" && record.promotions?.color.length ? record.promotions?.color + 30 : "",
            borderTop:
              props.data[index - 1]?.promotions?.name !== record.promotions?.name && props.integrate == "1" &&
                record.promotions?.name !== ''
                ? `2px solid ${record.promotions?.color}`
                : '',
            flexDirection: 'column',
          }}
        >
          <div style={{ background: record.promotions?.color }} className={styles.row_tip}>
            {props.data[index - 1]?.promotions?.name !== record.promotions?.name && props.integrate == "1" ? (
              <div>{record.promotions?.name}</div>
            ) : (
              ''
            )}
          </div>

          {record.played}
        </div>
      ),
    },
    {
      title: '胜/平/负',
      dataIndex: 'won',
      key: 'won',
      align: 'center',
      render: (text, record, index) => (
        <div
          className={styles.bgheight}
          style={{
            background: props.integrate == "1" && record.promotions?.color.length ? record.promotions?.color + 30 : "",
            borderTop:
              props.data[index - 1]?.promotions?.name !== record.promotions?.name && props.integrate == "1" &&
                record.promotions?.name !== ''
                ? `2px solid ${record.promotions?.color}`
                : '',
          }}
        >
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
        <div
          className={styles.bgheight}
          style={{
            background: props.integrate == "1" && record.promotions?.color.length ? record.promotions?.color + 30 : "",
            borderTop:
              props.data[index - 1]?.promotions?.name !== record.promotions?.name && props.integrate == "1" &&
                record.promotions?.name !== ''
                ? `2px solid ${record.promotions?.color}`
                : '',
          }}
        >
          {record.goals}/{record.against}/{record.diff}
        </div>
      ),
    },
    {
      title: '积分',
      dataIndex: 'pts',
      key: 'pts',
      align: 'center',

      render: (text, record, index) => (
        <div
          className={styles.bgheight}
          style={{

            background: props.integrate == "1" && record.promotions?.color.length ? record.promotions?.color + 30 : "",
            borderTop:
              props.data[index - 1]?.promotions?.name !== record.promotions?.name && props.integrate == "1" &&
                record.promotions?.name !== ''
                ? `2px solid ${record.promotions?.color}`
                : '',
          }}
        >
          {text}
        </div>
      ),
    },
  ];
  const customizeRenderEmpty = () => (
    <div style={{ textAlign: 'center' }}>
      <Empty style={{ fontSize: 20 }} />
    </div>
  );
  return (
    <div className={styles.tab_teamtable}>
      <ConfigProvider renderEmpty={customizeRenderEmpty}>
        <Table
          pagination={false}
          columns={columns}
          dataSource={props.data}
          rowKey="team_id"
          rowClassName={(record: any): any => {
            return record.promotions.name !== '' ? 'jf_bgrow_table' : null;
          }}
          onRow={(record) => {
            return {
              onClick: (event) => {
                console.log(record, 'pppp');
                history.push(`/zh/teamdetails/${record.team_id}`);
              }, // 点击行
            };
          }}
        />
      </ConfigProvider>
    </div>
  );
};

export default TablePage;
