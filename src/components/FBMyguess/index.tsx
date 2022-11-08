import React from 'react';
import styles from './index.less';
import IconFont from '@/components/IconFont';

import HitImage from '@/assets/red_img.png';
import MissImage from '@/assets/black_img.png';
import moment from 'moment';
type Props = {
  myguesslist: any;
};

const FBMyguess = (props: Props) => {
  const { myguesslist } = props;
  return (
    <div className={styles.myguess} key={myguesslist.id}>
      <div className={styles.myguess_time}>
        {moment(new Date(Number(myguesslist.match_time) * 1000)).format('YYYY MM-DD')}

        <div className={styles.myguess_hitImage}>
          {/* {state>2} */}
          <img src={HitImage} alt="" />
          {/* <img src={MissImage} alt="" /> */}
        </div>
      </div>
      <div className={styles.myguess_country}>
        <div style={{ display: 'flex' }}>
          {' '}
          <div> {myguesslist.home_team_name}</div>
          <IconFont className={styles.star} type="icon-VS" color="#7E1132" size={20} />
          <div> {myguesslist.away_team_name}</div>
        </div>
        <div>{myguesslist.iswin}</div>
        <div className={styles.lost}>{myguesslist.lost}</div>
        <div className={styles.win}>{myguesslist.win}</div>
      </div>
    </div>
  );
};

export default FBMyguess;
