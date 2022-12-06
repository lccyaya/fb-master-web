import React, { useEffect, useState } from 'react';
import Table from '../../table';
import RightTab from '../../RightTab';
import styles from './index.less';
import type { ColumnsType } from 'antd/es/table';
import { analysisList } from '@/services/matchdetail';
import type { AnalysisListRes, analysisType, AnalysisListParams } from '@/services/matchdetail';
import { Color } from '@/utils/match';
import moment from 'moment';

type Props = {
  match_id: number;
};

const Ranking = (props: Props) => {
  const columns: ColumnsType<analysisType> = [
    {
      title: '赛事',
      dataIndex: 'competition_name',
      key: 'competition_name',
      align: 'center',
      render: (text, record, index) => (
        <div>
          {text}
          <div>{moment(record.match_time * 1000).format('YYYY-MM-DD')}</div>
        </div>
      ),
    },
    {
      title: '主队',
      dataIndex: 'home',
      key: 'home',
      width: 80,
      align: 'center',
      render: (text, record, index) => <div className={styles.namestyle}>{text.team_name}</div>,
    },
    {
      title: '',
      dataIndex: 'home',
      key: 'home',
      width: 20,
      align: 'center',
      render: (text, record, index) => (
        <div className={styles.bfstyle}>
          {record.home.score}:{record.away.score}
        </div>
      ),
    },
    {
      title: '客队',
      dataIndex: 'away',
      width: 80,
      key: 'away',
      align: 'center',
      render: (text, record, index) => <div className={styles.namestyle}>{text.team_name}</div>,
    },
    {
      title: '盘',
      dataIndex: 'asia',

      align: 'center',
      render: (text) => (
        <div style={{ color: Color.numColor(text.name) }}>
          <div>{text.branch}</div>
          {text.name}
        </div>
      ),
    },

    {
      title: '进球',
      dataIndex: 'bs',

      align: 'center',
      render: (text) => (
        <div style={{ color: Color.numColor(text.name) }}>
          <div>{text.branch}</div>
          {text.name}
        </div>
      ),
    },
    {
      title: '角球',
      dataIndex: 'cr',

      align: 'center',
      render: (text) => (
        <div>
          <div>{text.branch}</div>
          <div> {text.name}</div>
        </div>
      ),
    },
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
      tab: 1, //历史交锋主
      event: activekey,
      size: num,
    };
    const res = await analysisList(params);
    if (res.success) {
      setHomeData(res.data);
    }
  };

  useEffect(() => {
    getHomeFutureList();
    // getAwayFutureList();
  }, [activekey, num]);
  return (
    <div>
      <div className={styles.table_space}>
        <Table
          dataText={homedata?.sp}
          rowKey="match_id"
          addRight={
            <RightTab
              tab={tab}
              activekey={activekey}
              setActivekey={setActivekey}
              num={num}
              setNum={setNum}
            />
          }
          dataSource={homedata?.list}
          columns={columns}
        />
      </div>

      {/* <div className={styles.table_space}>
        <Table addRight={<RightTab tab={tab} />} data={data} columns={columns} dataText />
      </div> */}
    </div>
  );
};

export default Ranking;