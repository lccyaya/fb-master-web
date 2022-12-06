import React, { useEffect, useState } from 'react';
import Table from '../table';
import RightTab from '../RightTab';
import styles from './index.less';
import type { ColumnsType } from 'antd/es/table';
import { analysisList } from '@/services/matchdetail';
import type { AnalysisListRes, analysisType, AnalysisListParams } from '@/services/matchdetail';

type Props = {
  match_id: number;
};

const RecentGames = (props: Props) => {
  const columns: ColumnsType<analysisType> = [
    {
      title: '赛事',
      dataIndex: 'competition_name',
      key: 'competition_name',
      align: 'center',
    },

    {
      title: '主队',
      dataIndex: 'home',
      key: 'home',
      //   width: 150,
      align: 'center',
      render: (text, record, index) => <div>{text.team_name}</div>,
    },
    {
      title: '',
      dataIndex: 'home',
      key: 'home',
      //   width: 150,
      align: 'center',
      render: (text, record, index) => (
        <div className={styles.namestyle}>
          {record.home.score}:{record.away.score}
        </div>
      ),
    },
    {
      title: '客队',
      dataIndex: 'away',

      key: 'away',
      align: 'center',
      render: (text, record, index) => <div>{text.team_name}</div>,
    },
    // {
    //   title: '进',
    //   dataIndex: props.activeKey == '0' ? 'energy_num' : 'reward_rate',

    //   align: 'center',
    //   render: (text) => (
    //     <div style={{ color: '#7E1132' }}>
    //       {props.activeKey == '0' ? Math.trunc(text) : Math.trunc(text) + '%'}
    //     </div>
    //   ),
    // },
    // {
    //   title: '角',
    //   dataIndex: props.activeKey == '0' ? 'energy_num' : 'reward_rate',

    //   align: 'center',
    //   render: (text, record, index) => (
    //     <div style={{ color: '#7E1132' }}>
    //       {props.activeKey == '0' ? Math.trunc(text) : Math.trunc(text) + '%'}
    //     </div>
    //   ),
    // },
  ];
  const { match_id } = props;
  const [homedata, setHomeData] = useState<AnalysisListRes>();

  const [activekey, setActivekey] = useState<string | number>(1);
  const [num, setNum] = useState<number>(1);
  // 近10/20场

  const tab = [
    { title: '同主客', key: 1 },
    { title: '同赛事', key: 0 },
  ];
  const getHomeFutureList = async () => {
    const params: AnalysisListParams = {
      match_id,
      tab: 3, //近期对战
      event: activekey,
      size: num,
    };
    const res = await analysisList(params);
    if (res.success) {
      setHomeData(res.data.list);
    }
    console.log(res.data, 'pppppppppp的点点滴滴');
  };

  useEffect(() => {
    getHomeFutureList();
    // getAwayFutureList();
  }, [activekey, num]);
  return (
    <div>
      <div className={styles.table_space}>
        <Table
          addRight={
            <RightTab
              tab={tab}
              activekey={activekey}
              setActivekey={setActivekey}
              num={num}
              setNum={setNum}
            />
          }
          dataSource={homedata}
          columns={columns}
        />
      </div>

      {/* <div className={styles.table_space}>
        <Table addRight={<RightTab tab={tab} />} data={data} columns={columns} dataText />
      </div> */}
    </div>
  );
};

export default RecentGames;
