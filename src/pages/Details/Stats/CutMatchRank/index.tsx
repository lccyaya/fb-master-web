import React, { ReactElement, useEffect, useState } from 'react';
import { Table, ConfigProvider } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Empty from '@/components/Empty';
import type { cupmatchListType } from '@/services/matchdetail';
// import RankingOne from '@/assets/worldcup/Ranking_1.png';
// import RankingTwo from '@/assets/worldcup/Ranking_2.png';
// import RankingThree from '@/assets/worldcup/Ranking_3.png';
// import { useHistory } from 'umi';
// import GuessAvatar from '@/assets/worldcup/guess_avatar.png';
// import FBTitle from '@/components/FBTitle';
// import { Color } from '@/utils/match';
// import type { FutureListRes, cupmatchList } from '@/services/matchdetail';
// import { ScoresList } from "@/services/worldcup"

import styles from './index.less';

type Props = {
  // columns: any;
  dataSource: any;
  matchTypeData: any;
};
const customizeRenderEmpty = () => (
  <div style={{ textAlign: 'center' }}>
    <Empty style={{ fontSize: 20 }} />
  </div>
);
const CutMatchRank = (props: Props) => {
  // const history = useHistory();
  const { dataSource, matchTypeData } = props;
  const grouplist = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];

  const columns = (
    group: number,
    home_name: string,
    away_name: string,
  ): ColumnsType<cupmatchListType> => {
    return [
      {
        title: <div style={{ fontWeight: 600, color: '#000028' }}>{grouplist[group]}组</div>,
        dataIndex: 'team_name',
        key: 'team_name',
        align: 'center',

        render: (text, record, index) => (
          <div
            style={{ fontWeight: 500 }}
            className={
              home_name == record.team_name
                ? styles.home_name_bg
                : away_name == record.team_name
                ? styles.away_name_bg
                : null
            }
          >
            {text}
          </div>
        ),
      },

      {
        title: '赛',
        dataIndex: 'played',
        key: 'played',
        align: 'center',
        render: (text, record, index) => (
          <div
            className={
              home_name == record.team_name
                ? styles.home_name_bg
                : away_name == record.team_name
                ? styles.away_name_bg
                : null
            }
          >
            {text}
          </div>
        ),
      },
      {
        title: '胜/平/负',
        dataIndex: 'won',

        key: 'won',
        align: 'center',
        render: (text, record) => (
          <div
            className={
              home_name == record.team_name
                ? styles.home_name_bg
                : away_name == record.team_name
                ? styles.away_name_bg
                : null
            }
          >
            {text}/{record.drawn}/{record.lost}
          </div>
        ),
      },
      {
        title: '进/失/净',
        dataIndex: 'goals',

        align: 'center',
        render: (text, record) => (
          <div
            className={
              home_name == record.team_name
                ? styles.home_name_bg
                : away_name == record.team_name
                ? styles.away_name_bg
                : null
            }
          >
            {text}/{record.against}/{record.diff}
          </div>
        ),
      },
      {
        title: '积分',
        dataIndex: 'pts',

        align: 'center',
        render: (text, record, index) => (
          <div
            className={
              home_name == record.team_name
                ? styles.home_name_bg
                : away_name == record.team_name
                ? styles.away_name_bg
                : null
            }
          >
            {text}
          </div>
        ),
      },
      {
        title: '排名',
        dataIndex: 'position',
        align: 'center',
        render: (text, record, index) => (
          <div
            className={
              home_name == record.team_name
                ? styles.home_name_bg
                : away_name == record.team_name
                ? styles.away_name_bg
                : null
            }
          >
            {text}
          </div>
        ),
        // render: (text, record, index) => <div style={{ color: '#7E1132' }}>{text}</div>,
      },
    ];
  };
  return (
    <div className={styles.tab_teamtable_cuprank}>
      <ConfigProvider renderEmpty={customizeRenderEmpty}>
        <Table
          pagination={false}
          columns={columns(
            dataSource.groups,
            matchTypeData?.home_team_name,
            matchTypeData?.away_team_name,
          )}
          dataSource={dataSource?.all}
          rowKey="position"
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

export default CutMatchRank;
