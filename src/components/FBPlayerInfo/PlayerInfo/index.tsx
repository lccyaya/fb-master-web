import React, { useEffect } from 'react';
import styles from './index.less';
import { Grid } from 'antd-mobile';
import FBFootball from '@/components/FBFootball/index';
import { Position, rating } from '@/utils/match';
import defaultAvatar from '@/assets/mine/avatar.png';

type Props = {
  data: any;
  match: any;
};

const PlayerInfo = (props: Props) => {
  const { match, data } = props;

  return (
    <div>
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
          <Grid.Item>
            <div className={styles.boder_color}>
              <div className={styles.left_grid}>
                <div style={{ display: 'flex' }}>
                  <div>
                    <img
                      className={styles.coach_img}
                      src={data.home_coach?.logo ? data.home_coach?.logo : defaultAvatar}
                      alt=""
                    />
                  </div>
                  <div>
                    <div className={styles.name}>
                      {data.home_coach?.name ? data.home_coach?.name : '-'}
                    </div>
                    <div className={styles.teacher}>教练</div>
                  </div>
                </div>
              </div>
              {/* 主队球员信息 */}
              <Grid columns={1}>
                {data?.home.map((item) => {
                  // eslint-disable-next-line react/jsx-key
                  return (
                    <div key={item.id}>
                      {item.first == 0 ? (
                        <div>
                          <Grid.Item>
                            <div className={styles.left_grid}>
                              <div className={styles.logo}>
                                <div style={{ marginTop: 5 }}>{item.shirt_number}</div>
                              </div>
                              <div className={styles.text}>
                                <div className={styles.name}>
                                  {item?.name}
                                  <div style={{ width: 20 }}>
                                    {item?.incidents?.map((item, index) => {
                                      return (
                                        <div key={index}>
                                          {item.type == 9 && (
                                            <FBFootball type={item.type} isUp={1} />
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                                <div className={styles.teacher}>
                                  {Position(item?.position)}

                                  {rating(item?.rating) && (
                                    <span className={styles.home_rating}>{item?.rating}</span>
                                  )}
                                  <div style={{ width: 20, display: 'flex' }}>
                                    {item?.incidents?.map((item, index) => {
                                      return (
                                        <div key={index}>
                                          {item.type !== 9 && <FBFootball type={item.type} />}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Grid.Item>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </Grid>
            </div>
          </Grid.Item>
          <Grid.Item>
            <div className={styles.right_grid}>
              <div style={{ display: 'flex' }}>
                <div>
                  <img
                    className={styles.coach_img}
                    src={data?.away_coach?.logo ? data?.away_coach?.logo : defaultAvatar}
                    alt=""
                  />
                </div>
                <div className={styles.text}>
                  <div className={styles.name}>
                    {data?.away_coach?.name ? data?.away_coach?.name : '-'}
                  </div>

                  <div className={styles.teacher}>教练</div>
                </div>
              </div>
            </div>
            {/* 客队球员信息 */}
            <Grid columns={1}>
              {data.away.map((item) => {
                // eslint-disable-next-line react/jsx-key
                return (
                  <div key={item.id}>
                    {item.first == 0 ? (
                      <div>
                        {' '}
                        <Grid.Item>
                          <div className={styles.left_grid}>
                            <div className={styles.right_logo}>
                              <div style={{ marginTop: 5 }}>{item.shirt_number}</div>
                            </div>
                            <div className={styles.text}>
                              <div className={styles.name}>
                                {item?.name}
                                <div style={{ width: 20 }}>
                                  {item?.incidents?.map((item, index) => {
                                    return (
                                      <div key={index}>
                                        {item.type == 9 && <FBFootball type={item.type} isUp={1} />}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>

                              <div className={styles.teacher}>
                                {Position(item?.position)}
                                {item?.rating !== '0.0' && (
                                  <span className={styles.away_rating}>{item?.rating}</span>
                                )}

                                <div style={{ width: 20, display: 'flex' }}>
                                  {item?.incidents?.map((item, index) => {
                                    return (
                                      <div key={index}>
                                        {item.type !== 9 && <FBFootball type={item.type} />}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Grid.Item>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </Grid>
          </Grid.Item>
        </Grid>
      </div>
    </div>
  );
};

export default PlayerInfo;
