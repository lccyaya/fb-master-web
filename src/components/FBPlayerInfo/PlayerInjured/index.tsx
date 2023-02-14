import React, { useEffect } from 'react';
import styles from './index.less';
import { Grid } from 'antd-mobile';
import FBFootball from '@/components/FBFootball/index';
import { Position } from '@/utils/match';
import { injuredValue } from '@/pages/Details/Strength/Injured/tabel/config';

type Props = {
  data: any;
  match: any;
};

const PlayerInjured = (props: Props) => {
  const { match, data } = props;

  return (
    <div className={styles.substitutes_bench}>
      <Grid columns={2}>
        <Grid.Item>
          <div className={styles.first_left_grid}>
            <div>
              <img className={styles.home_coach_img} src={match.home_team_logo} alt="" />
            </div>
            {data.home_name}
          </div>
        </Grid.Item>
        <Grid.Item>
          <div className={styles.first_right_grid}>
            <div>
              <img className={styles.away_coach_img} src={match.away_team_logo} alt="" />
            </div>
            {data.away_name}
          </div>
        </Grid.Item>
      </Grid>
      <Grid columns={2}>
        <div className={styles.boder_color}>
          {' '}
          <Grid.Item>
            <Grid columns={1}>
              {data?.home_absence?.map((item) => {
                // eslint-disable-next-line react/jsx-key
                return (
                  <div key={item.id}>
                    <Grid.Item>
                      <div className={styles.left_grid}>
                        <div className={styles.logo}>
                          <div style={{ marginTop: 5 }}>{item.shirt_number}</div>
                        </div>
                        <div className={styles.text}>
                          <div className={styles.name}>{item?.name}</div>
                          <div className={styles.teacher}>
                            {Position(item?.position)}｜{item.reason ? item.reason : '受伤'}
                          </div>
                        </div>
                      </div>
                    </Grid.Item>
                  </div>
                );
              })}
            </Grid>
          </Grid.Item>
        </div>

        <Grid.Item>
          <Grid columns={1}>
            {data?.away_absence?.map((item) => {
              // eslint-disable-next-line react/jsx-key
              return (
                <div key={item.id}>
                  <Grid.Item>
                    <div className={styles.left_grid}>
                      <div className={styles.right_logo}>
                        <div style={{ marginTop: 5 }}>{item.shirt_number}</div>
                      </div>
                      <div className={styles.text}>
                        <div className={styles.name}>{item?.name}</div>
                        <div className={styles.teacher}>
                          {Position(item?.position)}｜{item.reason ? item.reason : '受伤'}
                        </div>
                      </div>
                      <div>
                        <img
                          style={{ width: 15, height: 15 }}
                          src={injuredValue(item.type)}
                          alt=""
                        />
                      </div>
                    </div>
                  </Grid.Item>
                </div>
              );
            })}
          </Grid>
        </Grid.Item>
      </Grid>
    </div>
  );
};

export default PlayerInjured;
