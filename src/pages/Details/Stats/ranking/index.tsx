import React, { useState, useEffect } from 'react';
import Table from '../table';
// import RightTab from '../RightTab';
import styles from './index.less';
import type { ColumnsType } from 'antd/es/table';
import type { cupmatchListType, cupmatchTypeList } from '@/services/matchdetail';
// import type  matchServicets  from '@/services/match';
import { MatchRanking } from '@/utils/match';
import IconFont from '@/components/IconFont';

type Props = {
  match: cupmatchTypeList;
  // matchTypeData: matchServicets.MatchDetails;
  matchTypeData: any;
};

const Ranking = (props: Props) => {
  const { match, matchTypeData } = props;

  const [dataSource, setDataSource] = useState<any>([]);
  // const { match_id } = props;
  // const [data, setData] = useState<any>();
  const columns = (name: string): ColumnsType<cupmatchListType> => {
    return [
      {
        title: (
          <div className={styles.wrapnamestyle} style={{ fontWeight: 600, color: '#000028' }}>
            {name}
          </div>
        ),
        dataIndex: 'label',
        key: 'label',
        align: 'center',
        width: 80,
        render: (text) => <div>{MatchRanking(text)}</div>,
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
            {text}/{record.drawn}/{record.lost}
          </div>
        ),
      },
      {
        title: '进/失/净',
        dataIndex: 'goals',

        align: 'center',
        render: (text, record) => (
          <div>
            {text}/{record.against}/{record.diff}
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
  useEffect(() => {
    const home = [];
    const away = [];

    // eslint-disable-next-line @typescript-eslint/no-for-in-array
    for (const key in match.home) {
      match.home[key].label = key;
      home.push(match.home[key]);
    }
    // eslint-disable-next-line @typescript-eslint/no-for-in-array
    for (const key in match.away) {
      match.away[key].label = key;
      away.push(match.away[key]);
    }
    const data = { home, away };
    setDataSource(data);
    // setDataSource;
  }, []);
  return (
    <div style={{ width: '100%' }}>
      <div className={styles.table_space} style={{ marginBottom: 12 }}>
        <Table
          rowKey="label"
          // addRight={
          //   <div className={styles.intact_rank}>
          //     完整积分榜 <IconFont type="icon-jiantouyou" size={10} />
          //   </div>
          // }
          dataTitle={matchTypeData.competition_name}
          dataSource={dataSource?.home}
          columns={columns(matchTypeData?.home_team_name)}
        />
      </div>
      <div className={styles.table_space}>
        <Table
          rowKey="label"
          // addRight={
          //   <div className={styles.intact_rank}>
          //     完整积分榜 <IconFont type="icon-jiantouyou" size={10} />
          //   </div>
          // }
          dataTitle={matchTypeData.competition_name}
          dataSource={dataSource.away}
          columns={columns(matchTypeData.away_team_name)}
        />
      </div>
    </div>
  );
};

export default Ranking;
