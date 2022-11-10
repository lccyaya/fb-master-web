import React from 'react';
import styles from './index.less';
import IconFont from '@/components/IconFont';

import HitImage from '@/assets/red_img.png';
import MissImage from '@/assets/black_img.png';
import moment from 'moment';
import type { guessSchemList } from '@/services/worldcup';
import { OddTags, GoalTags } from '@/utils/guess';
type Props = {
  myguesslist: guessSchemList;
};

const FBMyguess = (props: Props) => {
  const { myguesslist } = props;
  return (
    <div className={styles.myguess} key={myguesslist.id}>
      <div className={styles.myguess_time}>
        {moment(new Date(Number(myguesslist.published_at) * 1000)).format('YYYY MM-DD')}

        <div className={styles.myguess_hitImage}>
          {/* {state>2} */}
          {myguesslist.status_id < 8 ? (
            '待开奖'
          ) : myguesslist.recommend == myguesslist.result ? (
            <img src={HitImage} alt="" />
          ) : (
            <img src={MissImage} alt="" />
          )}
        </div>
      </div>
      <div className={styles.myguess_country}>
        <div style={{ display: 'flex' }}>
          {' '}
          <div> {myguesslist.home_team_name}</div>
          <IconFont className={styles.star} type="icon-VS" color="#7E1132" size={20} />
          <div> {myguesslist.away_team_name}</div>
        </div>
        <div>
          {myguesslist.goal == 0 ? (
            <div>
              【{OddTags.title(myguesslist.recommend)}】@{myguesslist.odd}
            </div>
          ) : (
            <div>
              【{GoalTags.goaltitle(myguesslist.recommend)}
              <span style={{ color: myguesslist.goal > 0 ? '#FE2222' : '#39906A' }}>
                {' '}
                {myguesslist.goal > 0 ? `+${myguesslist.goal}` : myguesslist.goal}
              </span>
              】@{myguesslist.odd}
            </div>
          )}
        </div>
        <div className={styles.lost}>{myguesslist.energy_coin}</div>
        <div className={styles.win}>{myguesslist.award.toFixed(0)}</div>
      </div>
    </div>
  );
};

export default FBMyguess;
