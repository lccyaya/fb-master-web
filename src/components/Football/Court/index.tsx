import React from 'react';
import Player from '../Player';
import * as matchService from '@/services/match';

import styles from './index.less';
import { checkIsPhone } from '@/utils/utils';
import { login } from '@/services/certification';

type _PlayerItem = matchService.PlayerItem & { isHome: boolean };
interface ICourt {
  data: _PlayerItem[];
  isPhone?: boolean;
  status: number;
  dataName?: any;
  dataTeam: any;
}
const Court: React.FC<ICourt> = (props) => {
  const { data, status, dataName, dataTeam } = props;

  return (
    <div className={styles.container}>
      <div className={styles.home_name}>
        <div className={styles.home_name_logo}>
          <img className={styles.team_logo} src={dataName.home_team_logo} alt="" />
          {dataName.home_team_name}
        </div>

        <div>阵型：{dataTeam.home_formation ? dataTeam.home_formation : '-'}</div>
        <div>教练：{dataTeam.home_coach?.name ? dataTeam.home_coach?.name : '-'}</div>
      </div>
      <div className={styles.away_name}>
        <div className={styles.away_name_logo}>
          <img className={styles.team_logo} src={dataName.away_team_logo} alt="" />
          {dataName.away_team_name}
        </div>

        <div>阵型：{dataTeam.away_formation ? dataTeam.away_formation : '-'}</div>
        <div>教练：{dataTeam.away_coach?.name ? dataTeam.away_coach?.name : '-'}</div>
      </div>

      <div className={styles.content}>
        {data.map((i) => (
          <div key={i.id}>
            <Player isPhone={checkIsPhone()} {...i} />
          </div>
        ))}
      </div>
      {status === 1 && <div className={styles.prediction}>Prediction</div>}
    </div>
  );
};

export default Court;
