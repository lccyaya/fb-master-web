import React, { useState, useEffect } from 'react';
import Group from '@/pages/Info/groupmatch/group';
import FBShadowTab from '@/components/FBShadowTab';
import Table from '@/pages/Details/Stats/table';
import type { ColumnsType } from 'antd/es/table';
import { analysisList } from '@/services/matchdetail';
import moment from 'moment';
import { Color } from '@/utils/match';
import styles from './index.less';

import type {
  AnalysisListRes,
  analysisType,
  AnalysisListParams,
  spType,
} from '@/services/matchdetail';

type Props = {};

const Integral = (props: Props) => {
  const [activeKey, setActiveKey] = useState('1');
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<AnalysisListRes>();
  // const history = useHistory();
  const onChangeTab = (key: string) => {
    console.log(key, 'kskskksks');
    setActiveKey(key);
  };
  const columns = (sp: spType | undefined): ColumnsType<analysisType> => {
    return [
      {
        title: '赛事',
        width: 70,
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
        width: 70,
        align: 'center',
        render: (text, record) => (
          <div
            className={sp?.team_name == text.team_name ? styles.namestyle : styles.wrapnamestyle}
            // className={styles.wrapnamestyle}
          >
            {text.team_name}
          </div>
        ),
      },
      {
        title: '',
        dataIndex: 'home',
        key: 'home',
        width: 30,
        align: 'center',
        render: (text, record) => (
          <div className={styles.bfstyle}>
            <span
              style={{
                color:
                  record?.home?.team_name == sp?.team_name
                    ? Color.numColor(
                        record?.home?.score > record.away?.score
                          ? '赢'
                          : record?.home?.score == record.away?.score
                          ? '走'
                          : '输',
                      )
                    : Color.numColor(
                        record?.home?.score < record.away?.score
                          ? '赢'
                          : record?.home?.score == record.away?.score
                          ? '走'
                          : '输',
                      ),
              }}
            >
              {record.home.score}:{record.away.score}
            </span>
            <span className={styles.scores}>
              ({record.home.scores[1]}:{record.away.scores[1]})
            </span>
          </div>
        ),
      },
      {
        title: '客队',
        dataIndex: 'away',
        width: 70,
        key: 'away',
        align: 'center',
        render: (text, record) => (
          <div
            className={sp?.team_name == text.team_name ? styles.namestyle : styles.wrapnamestyle}
            // className={styles.wrapnamestyle}
          >
            {text.team_name}
          </div>
        ),
      },
      {
        title: '走',
        dataIndex: 'asia',
        width: 35,
        align: 'center',
        render: (text) => (
          <div style={{ color: Color.numColor(text.name) }}>
            <div>{text.branch}</div>
            {text.name}
          </div>
        ),
      },

      {
        title: '进',
        dataIndex: 'bs',
        width: 35,
        align: 'center',
        render: (text, record) => (
          <div style={{ color: Color.numColor(text.name) }}>
            <div>{text.branch}</div>
            {text.name}
          </div>
        ),
      },
      {
        title: '角',
        dataIndex: 'cr',
        width: 35,
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
  const tab = [
    {
      title: '世界杯分组赛',
      key: '1',
    },
    {
      title: '积分',
      key: '2',
    },
  ];
  const getHistoryRankList = async (params: AnalysisListParams) => {
    setLoading(true);

    const res = await analysisList(params);
    if (res.success) {
      setData(res.data);
      setLoading(false);
    }
  };
  useEffect(() => {
    const params: AnalysisListParams = {
      match_id: 3749545,
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
      <div className={styles.tab}>
        <FBShadowTab tab={tab} onChangeTab={onChangeTab} activeKey={activeKey} />
      </div>
      <div className={styles.table_space} style={{ marginTop: 10 }}>
        <Table
          // loading={loading}
          // dataText={data?.list && data?.sp}
          rowKey="match_id"
          dataSource={data?.list}
          columns={columns(data?.list && data?.sp)}
        />
      </div>
    </div>
  );
};

export default Integral;
