import React, { useState, useEffect } from 'react';
import Table from '../table';
// import RightTab from '../RightTab';
import styles from './index.less';
import type { ColumnsType } from 'antd/es/table';
import type * as matchServicets from '@/services/match';

type Props = {
  match: any;
  matchTypeData: matchServicets.MatchDetails;
};

const Ranking = (props: Props) => {
  const { match, matchTypeData } = props;

  // const { match_id } = props;
  // const [data, setData] = useState<any>();
  const columns = (name: string) => {
    return [
      {
        title: <div style={{ fontWeight: 600, color: '#000028' }}>{name}</div>,
        dataIndex: 'home_team_name',
        key: 'home_team_name',
        align: 'center',
        render: (text, record) => (
          <div>
            <img className={styles.team_logo} src={record.team_logo} alt="" />
            {text}
          </div>
        ),
      },

      {
        title: '赛',
        dataIndex: 'played',
        key: 'played',
        align: 'center',
        // render: (text, record, index) => <div>{text}</div>,
      },
      {
        title: '胜/平/负',
        dataIndex: 'won',

        key: 'won',
        align: 'center',
        render: (text, record) => (
          <div>
            {text}/ {record.drawn}/{record.lost}
          </div>
        ),
      },
      {
        title: '进/失/净',
        dataIndex: 'goals',

        align: 'center',
        render: (text, record) => (
          <div>
            {text}/{record.against}
          </div>
        ),
      },
      {
        title: '积分',
        dataIndex: 'pts',

        align: 'center',
      },
      {
        title: '排名',
        dataIndex: 'position',
        align: 'center',
        // render: (text, record, index) => <div style={{ color: '#7E1132' }}>{text}</div>,
      },
    ];
  };

  return (
    <div>
      {match?.map((item: any) => {
        return (
          <div className={styles.table_space} key={item.name}>
            <Table
              addRight={<div>完整积分榜</div>}
              dataTitle={matchTypeData.competition_name}
              dataSource={item?.match}
              columns={columns(item.name)}
            />
          </div>
        );
      })}

      {/* <div className={styles.table_space}>
        <Table addRight={<div>完整积分榜</div>} data={data} columns={columns} dataTitle />
      </div> */}
    </div>
  );
};

export default Ranking;
