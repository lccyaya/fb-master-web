import React from 'react';
import styles from './index.less';
import { useHistory } from 'umi';
import moment from 'moment';

import Zanwei from '@/assets/worldcup/Zanwei.png';
import type { eliminateList } from '@/services/worldcup';

type Props = {
  eliminateList: any;
};

const Eliminate = (props: Props) => {
  const history = useHistory();

  const { eliminateList } = props;
  console.log(eliminateList, 'ioioioioio');
  const godetail = (id: number) => {
    history.push(`/zh/details/${id}`);
  };

  return (
    <div className={styles.box_main}>
      <div>
        <div className={styles.box_onetop}>
          {eliminateList?.onelist[0].map((item: eliminateList) => {
            return (
              <div
                key={item.id}
                className={styles.box_onetopflex}
                onClick={() => {
                  godetail(item.match_ids[0]);
                }}
              >
                <div className={styles.box_top}>
                  <div className={styles.box_top_name}>
                    {/* {item.away_name ? "A" : ""} */}
                    {item.home_country_logo ? (
                      <img style={{ width: 20, height: 20 }} src={item.home_country_logo} alt="" />
                    ) : (
                      <img style={{ width: 20, height: 20 }} src={Zanwei} alt="" />
                    )}
                    <div className={styles.stem_name}> {item.home_name}</div>
                  </div>

                  <div>
                    {item.state_id > 1 ? (
                      <div>
                        {' '}
                        {item.home_score}-{item.away_score}
                      </div>
                    ) : (
                      <div>{moment(item.match_time * 1000).format('MM/DD')}</div>
                    )}
                  </div>
                  <div className={styles.box_top_name}>
                    {item.away_country_logo ? (
                      <img style={{ width: 20, height: 20 }} src={item.away_country_logo} alt="" />
                    ) : (
                      <img style={{ width: 20, height: 20 }} src={Zanwei} alt="" />
                    )}
                    <div className={styles.stem_name}> {item.away_name}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', width: '65px' }}>
                  <div
                    className={styles.box_top_line}
                    style={{
                      borderColor: item.winner_team_id == item.home_team_id ? '#7E1132' : '',
                    }}
                  ></div>
                  <div
                    className={styles.box_top_rightline}
                    style={{
                      borderColor: item.winner_team_id == item.away_team_id ? '#7E1132' : '',
                    }}
                  ></div>
                </div>

                <div
                  className={styles.box_top_shu}
                  style={{
                    background:
                      item.winner_team_id == item.home_team_id ||
                      item.winner_team_id == item.away_team_id
                        ? '#7E1132'
                        : '',
                  }}
                ></div>
              </div>
            );
          })}
        </div>

        <div className={styles.box_onetop}>
          {eliminateList?.onelist[1].map((item: eliminateList) => {
            return (
              <div
                key={item.id}
                className={styles.box_twotopflex}
                onClick={() => {
                  godetail(item.match_ids[0]);
                }}
              >
                <div className={styles.box_top}>
                  <div className={styles.box_toptwo_name}>
                    {item.home_country_logo ? (
                      <img style={{ width: 20, height: 20 }} src={item.home_country_logo} alt="" />
                    ) : (
                      <img style={{ width: 20, height: 20 }} src={Zanwei} alt="" />
                    )}
                    <div className={styles.stem_name}> {item.home_name}</div>
                  </div>

                  <div style={{ width: '25%', textAlign: 'center' }}>
                    {item.state_id > 1 ? (
                      <div>
                        {' '}
                        {item.home_score}-{item.away_score}
                      </div>
                    ) : (
                      <div> {moment(item.match_time * 1000).format('MM/DD')}</div>
                    )}
                  </div>
                  <div className={styles.box_toptwo_name}>
                    {item.away_country_logo ? (
                      <img style={{ width: 20, height: 20 }} src={item.away_country_logo} alt="" />
                    ) : (
                      <img style={{ width: 20, height: 20 }} src={Zanwei} alt="" />
                    )}
                    <div className={styles.stem_name}> {item.away_name}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', width: '50%' }}>
                  <div
                    className={styles.box_top_line}
                    style={{
                      borderColor: item.winner_team_id == item.home_team_id ? '#7E1132' : '',
                    }}
                  ></div>
                  <div
                    className={styles.box_top_rightline}
                    style={{
                      borderColor: item.winner_team_id == item.away_team_id ? '#7E1132' : '',
                    }}
                  ></div>
                </div>
                <div
                  className={styles.box_top_shu}
                  style={{
                    background:
                      item.winner_team_id == item.home_team_id ||
                      item.winner_team_id == item.away_team_id
                        ? '#7E1132'
                        : '',
                  }}
                ></div>
              </div>
            );
          })}
        </div>
        <div className={styles.box_onetop}>
          {eliminateList?.onelist[2].map((item: eliminateList) => {
            return (
              <div
                key={item.id}
                className={styles.box_threetopflex}
                onClick={() => {
                  godetail(item.match_ids[0]);
                }}
              >
                <div className={styles.box_top}>
                  <div className={styles.box_toptwo_name}>
                    {item.home_country_logo ? (
                      <img style={{ width: 20, height: 20 }} src={item.home_country_logo} alt="" />
                    ) : (
                      <img style={{ width: 20, height: 20 }} src={Zanwei} alt="" />
                    )}
                    <div className={styles.stem_name}> {item.home_name}</div>
                  </div>

                  <div style={{ width: '37%', textAlign: 'center' }}>
                    {item.state_id > 1 ? (
                      <div>
                        {' '}
                        {item.home_score}-{item.away_score}
                      </div>
                    ) : (
                      <div> {moment(item.match_time * 1000).format('MM/DD')}</div>
                    )}
                  </div>
                  <div className={styles.box_toptwo_name}>
                    {item.away_country_logo ? (
                      <img style={{ width: 20, height: 20 }} src={item.away_country_logo} alt="" />
                    ) : (
                      <img style={{ width: 20, height: 20 }} src={Zanwei} alt="" />
                    )}
                    <div className={styles.stem_name}> {item.away_name}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', width: '50%' }}>
                  <div
                    className={styles.box_top_line}
                    style={{
                      height: 20,
                      borderColor: item.winner_team_id == item.home_team_id ? '#7E1132' : '',
                    }}
                  ></div>
                  <div
                    className={styles.box_top_rightline}
                    style={{
                      height: 20,
                      borderColor: item.winner_team_id == item.away_team_id ? '#7E1132' : '',
                    }}
                  ></div>
                </div>
                <div
                  className={styles.box_top_shu}
                  style={{
                    background:
                      item.winner_team_id == item.home_team_id ||
                      item.winner_team_id == item.away_team_id
                        ? '#7E1132'
                        : '',
                  }}
                ></div>
              </div>
            );
          })}
        </div>
        <div className={styles.box_onetop}>
          {eliminateList?.onelist[3].map((item: eliminateList) => {
            return (
              <div
                key={item.id}
                className={styles.box_threetopflex}
                onClick={() => {
                  godetail(item.match_ids[0]);
                }}
              >
                <div className={styles.box_top}>
                  <div className={styles.box_toptwo_name}>
                    {item.home_country_logo ? (
                      <img style={{ width: 40, height: 40 }} src={item.home_country_logo} alt="" />
                    ) : (
                      <img style={{ width: 40, height: 40 }} src={Zanwei} alt="" />
                    )}
                    <div className={styles.stem_name}> {item.home_name}</div>
                  </div>

                  <div style={{ width: 120, textAlign: 'center' }}>
                    {/* {item.state_id > 1 ? <div>  {item.home_score}-{item.away_score}</div> : <div>     {moment(item.match_time * 1000).format('MM/DD')}</div>} */}
                    <div>
                      {' '}
                      {item.home_score}-{item.away_score}
                    </div>
                  </div>
                  <div className={styles.box_toptwo_name}>
                    {item.away_country_logo ? (
                      <img style={{ width: 40, height: 40 }} src={item.away_country_logo} alt="" />
                    ) : (
                      <img style={{ width: 40, height: 40 }} src={Zanwei} alt="" />
                    )}

                    <div className={styles.stem_name}> {item.away_name}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <div className={styles.box_onetop}>
          {eliminateList?.twolist[eliminateList.twolist.length - 1].map((item: eliminateList) => {
            return (
              <div
                key={item.id}
                className={styles.box_threetopflex}
                onClick={() => {
                  godetail(item.match_ids[0]);
                }}
              >
                <div
                  style={{
                    width: '70%',
                    backgroundColor: '#F7F7F7',
                    borderRadius: 6,
                  }}
                >
                  <div className={styles.box_top}>
                    <div className={styles.box_toptwo_name}>
                      {item.home_country_logo ? (
                        <img
                          style={{ width: 40, height: 40 }}
                          src={item.home_country_logo}
                          alt=""
                        />
                      ) : (
                        <img style={{ width: 40, height: 40 }} src={Zanwei} alt="" />
                      )}
                      <div className={styles.stem_name}> {item.home_name}</div>
                    </div>
                    <div style={{ width: 120, textAlign: 'center' }}>
                      {/* {item.state_id > 1 ? <div>  {item.home_score}-{item.away_score}</div> : <div>     {moment(item.match_time * 1000).format('MM/DD')}</div>} */}
                      <div>
                        {' '}
                        {item.home_score}-{item.away_score}
                      </div>
                    </div>
                    <div className={styles.box_toptwo_name}>
                      {item.away_country_logo ? (
                        <img
                          style={{ width: 40, height: 40 }}
                          src={item.away_country_logo}
                          alt=""
                        />
                      ) : (
                        <img style={{ width: 40, height: 40 }} src={Zanwei} alt="" />
                      )}
                      <div className={styles.name}>
                        <div className={styles.stem_name}> {item.away_name}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.box_onetop}>
          {eliminateList?.twolist[eliminateList.twolist.length - 2].map((item: eliminateList) => {
            return (
              <div
                key={item.id}
                className={styles.box_threetopflex}
                onClick={() => {
                  godetail(item.match_ids[0]);
                }}
              >
                <div
                  className={styles.box_top_shu}
                  style={{
                    background:
                      item.winner_team_id == item.home_team_id ||
                      item.winner_team_id == item.away_team_id
                        ? '#7E1132'
                        : '',
                  }}
                ></div>

                <div style={{ display: 'flex', width: '50%' }}>
                  <div
                    className={styles.box_bottom_line}
                    style={{
                      height: 20,
                      borderColor: item.winner_team_id == item.home_team_id ? '#7E1132' : '',
                    }}
                  ></div>
                  <div
                    className={styles.box_bottom_rightline}
                    style={{
                      height: 20,
                      borderColor: item.winner_team_id == item.away_team_id ? '#7E1132' : '',
                    }}
                  ></div>
                </div>
                <div className={styles.box_top}>
                  <div className={styles.box_toptwo_name}>
                    {item.home_country_logo ? (
                      <img style={{ width: 20, height: 20 }} src={item.home_country_logo} alt="" />
                    ) : (
                      <img style={{ width: 20, height: 20 }} src={Zanwei} alt="" />
                    )}
                    <div className={styles.stem_name}> {item.home_name}</div>
                  </div>
                  <div style={{ width: '37%', textAlign: 'center' }}>
                    {item.state_id > 1 ? (
                      <div>
                        {' '}
                        {item.home_score}-{item.away_score}
                      </div>
                    ) : (
                      <div> {moment(item.match_time * 1000).format('MM/DD')}</div>
                    )}
                  </div>
                  <div className={styles.box_toptwo_name}>
                    {item.away_country_logo ? (
                      <img style={{ width: 20, height: 20 }} src={item.away_country_logo} alt="" />
                    ) : (
                      <img style={{ width: 20, height: 20 }} src={Zanwei} alt="" />
                    )}

                    <div className={styles.stem_name}> {item.away_name}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.box_onetop}>
          {eliminateList?.twolist[1].map((item: eliminateList) => {
            return (
              <div
                key={item.id}
                className={styles.box_twotopflex}
                onClick={() => {
                  godetail(item.match_ids[0]);
                }}
              >
                <div
                  className={styles.box_top_shu}
                  style={{
                    background:
                      item.winner_team_id == item.home_team_id ||
                      item.winner_team_id == item.away_team_id
                        ? '#7E1132'
                        : '',
                  }}
                ></div>
                <div style={{ display: 'flex', width: '50%' }}>
                  <div
                    className={styles.box_bottom_line}
                    style={{
                      borderColor: item.winner_team_id == item.home_team_id ? '#7E1132' : '',
                    }}
                  ></div>
                  <div
                    className={styles.box_bottom_rightline}
                    style={{
                      borderColor: item.winner_team_id == item.away_team_id ? '#7E1132' : '',
                    }}
                  ></div>
                </div>
                <div className={styles.box_top}>
                  <div className={styles.box_toptwo_name}>
                    {item.home_country_logo ? (
                      <img style={{ width: 20, height: 20 }} src={item.home_country_logo} alt="" />
                    ) : (
                      <img style={{ width: 20, height: 20 }} src={Zanwei} alt="" />
                    )}
                    <div className={styles.stem_name}> {item.home_name}</div>
                  </div>
                  <div style={{ width: '25%', textAlign: 'center' }}>
                    {item.state_id > 1 ? (
                      <div>
                        {' '}
                        {item.home_score}-{item.away_score}
                      </div>
                    ) : (
                      <div> {moment(item.match_time * 1000).format('MM/DD')}</div>
                    )}
                  </div>
                  <div className={styles.box_toptwo_name}>
                    {item.away_country_logo ? (
                      <img style={{ width: 20, height: 20 }} src={item.away_country_logo} alt="" />
                    ) : (
                      <img style={{ width: 20, height: 20 }} src={Zanwei} alt="" />
                    )}
                    <div className={styles.stem_name}> {item.away_name}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.box_onetop}>
          {eliminateList?.twolist[0].map((item: eliminateList) => {
            return (
              <div
                key={item.id}
                className={styles.box_onetopflex}
                onClick={() => {
                  godetail(item.match_ids[0]);
                }}
              >
                <div
                  className={styles.box_top_shu}
                  style={{
                    background:
                      item.winner_team_id == item.home_team_id ||
                      item.winner_team_id == item.away_team_id
                        ? '#7E1132'
                        : '',
                  }}
                ></div>
                <div style={{ display: 'flex', width: '65px' }}>
                  <div
                    className={styles.box_bottom_line}
                    style={{
                      borderColor: item.winner_team_id == item.home_team_id ? '#7E1132' : '',
                    }}
                  ></div>
                  <div
                    className={styles.box_bottom_rightline}
                    style={{
                      borderColor: item.winner_team_id == item.away_team_id ? '#7E1132' : '',
                    }}
                  ></div>
                </div>
                <div className={styles.box_top}>
                  <div className={styles.box_top_name}>
                    {item.home_country_logo ? (
                      <img style={{ width: 20, height: 20 }} src={item.home_country_logo} alt="" />
                    ) : (
                      <img style={{ width: 20, height: 20 }} src={Zanwei} alt="" />
                    )}
                    <div className={styles.stem_name}> {item.home_name}</div>
                  </div>

                  <div>
                    {item.state_id > 1 ? (
                      <div>
                        {' '}
                        {item.home_score}-{item.away_score}
                      </div>
                    ) : (
                      <div> {moment(item.match_time * 1000).format('MM/DD')}</div>
                    )}
                  </div>
                  <div className={styles.box_top_name}>
                    {item.away_country_logo ? (
                      <img style={{ width: 20, height: 20 }} src={item.away_country_logo} alt="" />
                    ) : (
                      <img style={{ width: 20, height: 20 }} src={Zanwei} alt="" />
                    )}
                    <div className={styles.stem_name}> {item.away_name}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ height: 55 }}></div>
    </div>
  );
};

export default Eliminate;
