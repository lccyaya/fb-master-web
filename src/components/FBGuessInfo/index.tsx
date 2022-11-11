import React from 'react';
import styles from './index.less';
import { FormattedMessage, useSelector } from 'umi';
import type { guessUserDetailList } from '@/services/worldcup';
import GuessAvatar from '@/assets/worldcup/guess_avatar.png';

type Props = {
  user: any;
};

const FBGuessInfo = (props: Props) => {
  const { user } = props;
  const guessUser: guessUserDetailList = useSelector((s) => s.guessUser.guessUserState);

  return (
    <div className={styles.guess_main}>
      {/* { }
                未登录，请写登录 */}
      {user == null ? (
        <div className={styles.guess_userlogin}>未登录，请先登录</div>
      ) : (
        <div className={styles.guess_user}>
          <div className={styles.guess_username}>
            <div className={styles.avatar}>
              <img
                className={styles.avatar}
                src={guessUser?.avatar ? guessUser?.avatar : GuessAvatar}
                alt=""
              />
            </div>
            <div className={styles.guess_name}>
              <div>{guessUser?.nickname}</div>
              <div style={{ fontSize: 14 }}>
                <span style={{ fontWeight: 50, marginRight: 5 }}> 能量值</span>
                <span>{guessUser?.energy_num}</span>
              </div>
            </div>
          </div>
          <div className={styles.guess_userrank}>
            <div className={styles.ranking}>
              <FormattedMessage id={'key_worldcap_guessvalue'} />榜
              {guessUser?.energy_rank ? (
                <div style={{ width: 48, textAlign: 'center' }}>
                  <span style={{ fontSize: 17, marginLeft: 3 }}> {guessUser?.energy_rank} </span> 名
                </div>
              ) : (
                <div>
                  <span
                    style={{
                      marginLeft: 3,
                      fontSize: 11,
                    }}
                  >
                    {' '}
                    暂未上榜{' '}
                  </span>
                </div>
              )}
            </div>
            <div className={styles.guess_name}>
              <div className={styles.ranking}>
                {' '}
                <FormattedMessage id={'key_worldcap_return'} />榜
                {guessUser?.reward_rank ? (
                  <div style={{ width: 48, textAlign: 'center' }}>
                    <span style={{ fontSize: 17, marginLeft: 3 }}> {guessUser?.reward_rank} </span>
                    名
                  </div>
                ) : (
                  <div>
                    <span
                      style={{
                        marginLeft: 3,
                        fontSize: 11,
                      }}
                    >
                      {' '}
                      暂未上榜{' '}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={styles.guess_box}>
        <div className={styles.guess_list}>
          <div className={styles.guess_value}> {!user ? '-' : guessUser?.energy_num}</div>

          <div>
            <FormattedMessage id={'key_worldcap_guessvalue'} />
          </div>
        </div>
        <div className={styles.guess_list}>
          <div className={styles.guess_value}> {!user ? '-' : guessUser?.cumulative}</div>

          <div>总奖励</div>
        </div>
        <div className={styles.guess_list}>
          <div className={styles.guess_value}>{!user ? '-' : guessUser?.numbers}</div>

          <div>参与次数</div>
        </div>
        <div className={styles.guess_list}>
          <div className={styles.guess_value}> {!user ? '-' : guessUser?.reward_rate}%</div>

          <div>
            <FormattedMessage id={'key_worldcap_return'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FBGuessInfo;
