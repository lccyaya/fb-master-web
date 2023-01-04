import React, { useEffect, useState } from 'react';
import Table from '../table';
import RightTab from '../RightTab';
import styles from './index.less';
import type { ColumnsType } from 'antd/es/table';
import { analysisList } from '@/services/matchdetail';
import moment from 'moment';
import { Color } from '@/utils/match';

import type {
  AnalysisListRes,
  analysisType,
  AnalysisListParams,
  spType,
} from '@/services/matchdetail';

type Props = {
  match_id: number;
};

const RecentGames = (props: Props) => {
  const columns = (sp: spType | undefined): ColumnsType<analysisType> => {
    return [
      {
        title: '赛事',
        dataIndex: 'competition_name',
        key: 'competition_name',
        align: 'center',
        render: (text, record) => (
          <div>
            {text}
            <div>{moment(record.match_time * 1000).format('YY/MM/DD')}</div>
          </div>
        ),
      },
      {
        title: '主队',
        dataIndex: 'home',
        key: 'home',
        width: 80,
        align: 'center',
        render: (text, record) => (
          <div
            className={sp?.team_name == text.team_name ? styles.namestyle : styles.wrapnamestyle}
          >
            {text.team_name}
          </div>
        ),
      },
      {
        title: '',
        dataIndex: 'home',
        key: 'home',
        width: 20,
        align: 'center',
        render: (text, record) => (
          <div className={styles.bfstyle} >

            <span style={{

              color: record?.home?.team_name == sp?.team_name ? Color.numColor(
                record?.home?.score > record.away?.score
                  ? '赢'
                  : record?.home?.score == record.away?.score
                    ? '走'
                    : '输',

              ) : Color.numColor(
                record?.home?.score < record.away?.score
                  ? '赢'
                  : record?.home?.score == record.away?.score
                    ? '走'
                    : '输',

              ),
            }}>{record.home.score}:{record.away.score}
            </span>
            <span className={styles.scores}>({record.home.scores[1]}:{record.away.scores[1]})
            </span>

          </div>
        ),
      },
      {
        title: '客队',
        dataIndex: 'away',
        width: 80,
        key: 'away',
        align: 'center',
        render: (text, record) => (
          <div
            className={sp?.team_name == text.team_name ? styles.namestyle : styles.wrapnamestyle}
          >
            {text.team_name}
          </div>
        ),
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
        render: (text, record) => (
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
            <div>{text.name}</div>
          </div>
        ),
      },
    ];
  };

  const { match_id } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<AnalysisListRes>();

  const options = [
    { label: '同主客', value: 'event' },
    { label: '同赛事', value: 'sameCompetition' },
    { label: '20场', value: 'size' },
  ];

  const getHistoryRankList = async (params: AnalysisListParams) => {
    setLoading(true);

    const res = await analysisList(params);
    if (res.success) {
      setData(res.data);
      setLoading(false);
    }
  };

  // 切换按钮
  const onChange = (value: any) => {
    const params: AnalysisListParams = {
      match_id,
      tab: 3, //历史交锋
      event: value.includes('event') ? 1 : 0,
      sameCompetition: value.includes('sameCompetition') ? 1 : 0,
      size: value.includes('size') ? 20 : 10,
    };
    getHistoryRankList(params);
  };
  useEffect(() => {
    const params: AnalysisListParams = {
      match_id,
      tab: 3, //历史交锋
      event: 0,
      sameCompetition: 0,
      size: 10,
    };

    getHistoryRankList(params);
    // getAwayFutureList();
  }, []);
  return (
    <div>
      <div className={styles.table_space}>
        <Table
          loading={loading}
          dataText={data?.list && data?.sp}
          rowKey="match_id"
          addRight={<RightTab options={options} onChange={onChange} />}
          dataSource={data?.list}
          columns={columns(data?.list && data?.sp)}
        />
      </div>

      {/* <div className={styles.table_space}>
        <Table addRight={<RightTab tab={tab} />} data={data} columns={columns} dataText />
      </div> */}
    </div>
  );
};

export default RecentGames;
