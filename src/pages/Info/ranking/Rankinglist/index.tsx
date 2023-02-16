import React, { useState, useEffect, useRef } from 'react';

import styles from './index.less';
import PlayerTable from '@/components/FBPlayerInfo/PlayerTable';
import type { ColumnsType } from 'antd/es/table';
import type { PlayerGoalListParams } from '@/services/worldcup';
import Empty from '@/components/Empty';

import useWindowSize from '@/hooks/useWindowSize';
import { PlayerGoalList } from '@/services/worldcup';
type Props = {
  season_id: number;
  competition_id: number;
};

const Rankinglist = (props: Props) => {
  const { competition_id, season_id } = props;

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState<boolean>(false);
  const tab = [
    // {
    //   title: '球队',
    //   key: 'key_team',
    // },
    {
      title: '球员',
      key: 'key_teamplayers',
    },
  ];
  const getPlayerGoalList = async (): Promise<any> => {
    setLoading(true);

    const params: PlayerGoalListParams = {
      competition_id: competition_id,
      season_id: season_id,
    };
    const result: any = await PlayerGoalList(params);

    if (result.success == true) {
      setLoading(false);

      setData(result.data);
    }
  };

  useEffect(() => {
    getPlayerGoalList();
  }, [season_id]);

  return (
    <div className={styles.match_cap_list}>
      <PlayerTable tab={tab} loading={loading} data={data} />
    </div>
  );
};

export default Rankinglist;
