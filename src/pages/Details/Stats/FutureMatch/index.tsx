import React, { useEffect, useState } from 'react';
import Table from '../table';
import RightTab from '../RightTab';
import styles from './index.less';
import type { ColumnsType } from 'antd/es/table';
import { futureList } from '@/services/matchdetail';
import type { FutureListRes, futurematchType } from '@/services/matchdetail';
import moment from 'moment';

const Ranking = (props: Props) => {
  const { match_id } = props;
  const [data, setData] = useState<FutureListRes[]>([]);
  const columns = (name: string): ColumnsType<futurematchType> => {
    return [
      {
        title: <div style={{ fontWeight: 600, color: '#000028' }}>{name}</div>,
        dataIndex: 'competition_name',
        key: 'competition_name',
        align: 'center',
      },

      {
        title: '日期',
        dataIndex: 'match_time',
        key: 'match_time',
        align: 'center',
        render: (text, record, index) => <div>{moment(text * 1000).format('YYYY-MM-DD')}</div>,
      },
      {
        title: '主队',
        dataIndex: 'home_team_name',
        width: 60,
        key: 'home_team_name',
        align: 'center',
        render: (text, record, index) => (
          <div className={text === name ? styles.namestyle : null}>{text}</div>
        ),
      },
      {
        title: '客队',
        dataIndex: 'away_team_name',
        key: 'away_team_name',
        width: 60,
        align: 'center',
        render: (text, record, index) => (
          <div className={text === name ? styles.namestyle : null}>{text}</div>
        ),
      },
      {
        title: '间隔',
        dataIndex: 'interval',
        key: 'interval',
        align: 'center',
        render: (text, record, index) => <div>{text}天</div>,
      },
    ];
  };

  const getFutureList = async () => {
    const res = await futureList({ match_id });
    if (res.success) {
      setData(res.data);
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
          <div className={styles.table_space}>
            <Table dataSource={item.match} rowKey="match_id" columns={columns(item.name)} />
          </div>
        );
      })}
    </div>
  );
};

export default Ranking;
