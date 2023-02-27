import React, { useState } from 'react';
import PlayerTable from '@/components/FBPlayerInfo/PlayerTable';
import Ranking from '@/pages/info/ranking';
import styles from './index.less';
type Props = {};

const Player = (props: Props) => {
  const { competition_id, season_id } = props;
  const tab = [
    {
      title: '世界杯分组赛',
      key: 'key_teamplayers',
    },
    {
      title: '积分',
      key: '2',
    },
  ];
  const data = [
    {
      id: 1,
      team_name: 'ssss',
    },
  ];
  return (
    <div>
      <div className={styles.match_cap_list}>
        {/* <PlayerTable tab={tab} loading={loading} data={data} /> */}
        <Ranking competition_id={competition_id} season_id={season_id}></Ranking>
        {/* <PlayerTable tab={tab} loading={false} data={data} /> */}
      </div>
    </div>
  );
};

export default Player;
