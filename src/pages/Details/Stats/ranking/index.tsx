import React, { useState, useEffect } from 'react';
import Table from '../table';
// import RightTab from '../RightTab';
import styles from './index.less';
import type { ColumnsType } from 'antd/es/table';
import type * as matchServicets from '@/services/match';

type Props = {
  match: { home: matchServicets.TeamRankingItemType[]; away: matchServicets.TeamRankingItemType[] };
  matchTypeData: matchServicets.MatchDetails;
};

const Ranking = (props: Props) => {
  const { match, matchTypeData } = props;
  // const { match_id } = props;
  // const [data, setData] = useState<any>();
  const columns: ColumnsType<matchServicets.TeamRankingItemType> = [
    {
      title: (
        <div style={{ fontWeight: 600, color: '#000028' }}>{matchTypeData.home_team_name}</div>
      ),
      dataIndex: 'team_name',
      key: 'team_name',
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
  // const getCupmatchList = async () => {
  //   const params: any = {
  //     match_id,
  //   };
  //   const res = await cupmatchList(params);
  //   if (res.success) {
  //     setData(res.data);
  //   }
  //   console.log(res.data, 'pppppppppp');
  // };

  // useEffect(() => {
  //   getCupmatchList();
  //   // getAwayFutureList();
  // }, []);
  return (
    <div>
      {match?.home && (
        <div className={styles.table_space}>
          <Table
            addRight={<div>完整积分榜</div>}
            dataTitle={matchTypeData.competition_name}
            dataSource={match?.home}
            columns={columns}
          />
        </div>
      )}
      {match?.away && (
        <div className={styles.table_space}>
          <Table
            addRight={<div>完整积分榜</div>}
            // dataSource={data?.home.}
            columns={columns}
            dataTitle={matchTypeData.competition_name}
          />
        </div>
      )}

      {/* <div className={styles.table_space}>
        <Table addRight={<div>完整积分榜</div>} data={data} columns={columns} dataTitle />
      </div> */}
    </div>
  );
};

export default Ranking;
