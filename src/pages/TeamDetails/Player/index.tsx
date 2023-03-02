import React, { useState, useContext } from 'react';
import PlayerTable from '@/components/FBPlayerInfo/PlayerTable';
import Ranking from '@/pages/info/ranking';
import styles from './index.less';
import myContext from '@/utils/createContext';
type Props = {};

const Player = (props: Props) => {
  const { competition_id, season_id } = useContext(myContext);
  return (
    <div>
      <div className={styles.match_cap_list}>
        {/* <PlayerTable tab={tab} loading={loading} data={data} /> */}
        <Ranking competition_id={competition_id} season_id={season_id} />
      </div>
    </div>
  );
};

export default Player;
