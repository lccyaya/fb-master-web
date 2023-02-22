import React, { useEffect, useState } from 'react';
import Table from '../table';
import RightTab from '../RightTab';
import styles from './index.less';
import type { ColumnsType } from 'antd/es/table';
import { futureList } from '@/services/matchdetail';
import type { FutureListRes, futurematchType } from '@/services/matchdetail';
import moment from 'moment';

type Props = {
  match_id: number;
};

const Ranking = (props: Props) => {
  const { match_id } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<FutureListRes[]>();
  const columns = (name: string): ColumnsType<futurematchType> => {
    return [
      {
        title: (
          <div className={styles.wrapnamestyle} style={{ fontWeight: 600, color: '#000028' }}>
            {name}
          </div>
        ),
        dataIndex: 'competition_name',
        key: 'competition_name',
        width: 70,
        align: 'center',
      },

      {
        title: '日期',
        width: 80,
        dataIndex: 'match_time',
        key: 'match_time',
        align: 'center',
        render: (text) => <div>{moment(text * 1000).format('YYYY-MM-DD')}</div>,
      },
      {
        title: '主队',
        dataIndex: 'home_team_name',
        width: 70,
        key: 'home_team_name',
        align: 'center',
        render: (text) => (
          <div className={text === name ? styles.namestyle : styles.wrapnamestyle}>{text}</div>
        ),
      },
      {
        title: '客队',
        dataIndex: 'away_team_name',
        key: 'away_team_name',
        width: 70,
        align: 'center',
        render: (text) => (
          <div className={text === name ? styles.namestyle : styles.wrapnamestyle}>{text}</div>
        ),
      },
      {
        title: '间隔',
        width: 40,
        dataIndex: 'interval',
        key: 'interval',
        align: 'center',
        render: (text) => <div>{text}天</div>,
      },
    ];
  };

  const getFutureList = async () => {
    setLoading(true);
    const res = await futureList({ match_id });
    if (res.success) {
      setData(res.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(match_id);
    getFutureList();
  }, []);
  return (
    <div>
      {data?.map((item) => {
        return (
          // eslint-disable-next-line react/jsx-key
          <div className={styles.table_space} key={item.name}>
            <Table
              loading={loading}
              dataSource={item.match}
              rowKey="match_id"
              columns={columns(item.name)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Ranking;
