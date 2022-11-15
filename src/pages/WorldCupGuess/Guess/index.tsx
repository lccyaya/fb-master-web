import React, { useEffect } from 'react';
import FBGuessInfo from '@/components/FBGuessInfo';
import FBGuessShare from '@/components/FBGuessShare';
import FBMyguess from '@/components/FBMyguess';
import FBTitle from '@/components/FBTitle';
import Empty from '@/components/Empty';
import styles from './index.less';
import { useSelector, useDispatch } from 'umi';
import { ConnectState } from '@/models/connect';
import { UserInfoType } from '@/services/user';
import MyguessTitleImg from '@/assets/worldcup/my_guess_title.png';
import WorldcupEmpty from '@/assets/worldcup/worldcup_empty.png';
// import Gotop from '@/assets/worldcup/go_top.png';
import useScrollTop from '@/hooks/useScrollTop';
import { MyGuess } from '@/services/worldcup';
import type { GuessUserDetailParams, GuessSchemParams, guessSchemList } from '@/services/worldcup';
import { FOOTBALL_MASTER_TOKEN } from '@/constants';
import { timeStorageGet } from '@/utils/timestorage';
import { Anchor, Spin } from 'antd';
import { InfiniteScroll } from 'antd-mobile';
import { useInfiniteScroll } from 'ahooks';
// const { Link } = Anchor;
type Props = {};

const Guess = (props: Props) => {
  const scrollTop = useScrollTop();
  const isNative = useSelector<ConnectState>((s) => s.native.isNative);

  const sharelist = [
    {
      title: '购买比赛攻略',
      content: '每次付费购买攻略获得能量值',
      action: '去购买',
    },
    {
      title: `分享34体育`,
      app: '(App专享)',
      content: '每日分享获得能量值',
      action: isNative ? '去分享' :'去下载',
    },
  ];
  useSelector;
  const user = useSelector<ConnectState, UserInfoType | null | undefined>(
    (s) => s.user.currentUser,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const val = timeStorageGet(FOOTBALL_MASTER_TOKEN);
    let data: GuessUserDetailParams = { authtoken: val };
    dispatch({
      type: 'guessUser/guessUser',
      payload: {
        data,
      },
    });
  }, []);

  const getMyGuessList = async (page: number, size: number): Promise<any> => {
    let data: GuessSchemParams = {
      page,
      size,
    };
    const result: any = await MyGuess(data);
    console.log(result);

    if (result.success == true) {
      return {
        list: result.data,
        total: result.data.result.length >= 10,
        page: page + 1,
      };
    }
  };

  const {
    data = () => {},
    loading,
    loadMoreAsync,
    reload,
    noMore,
  } = useInfiniteScroll(
    (d) => {
      const { page = 1 } = d || {};

      return getMyGuessList(page, 10);
    },
    {
      // target: ref,
      isNoMore: (data) => {
        if (!data?.list?.length) {
          return true;
        }
        return !data?.total;
      },
      manual: true,
    },
  );
  useEffect(() => {
    reload();
  }, []);
  //
  return (
    <div className={styles.guess_info}>
      <div style={{ padding: 12 }}>
        <FBGuessInfo user={user}></FBGuessInfo>
      </div>
      <div className={styles.my_guess_info}>
        {user ? (
          <div>
            {sharelist &&
              sharelist.map((item, index) => {
                return (
                  <div key={index}>
                    {' '}
                    <FBGuessShare
                      backgroundImage={
                        index !== 0
                          ? 'linear-gradient(to right, #FFEBD9,#CD986A)'
                          : 'linear-gradient(to right, #FCE6E5,#C66961)'
                      }
                      sharelist={item}
                    />
                  </div>
                );
              })}
          </div>
        ) : null}
        <div className={styles.title}>
          <div className={styles.title_left}>
            <img src={MyguessTitleImg} style={{ width: 26, height: 26 }} alt="" />
            <FBTitle title="我的竞猜"></FBTitle>
          </div>
          {user && (
            <div className={styles.title_right}>
              <span style={{ color: '#9B9B9B' }}>次数 {data.list?.numbers} </span>
              <span style={{ color: '#39906A' }}> 消耗 {data.list?.consume} </span>
              <span style={{ color: '#FE2222' }}> 奖励 {data.list?.energy_num} </span>
            </div>
          )}
        </div>
        {user ? (
          <div>
            {' '}
            <Spin spinning={loading}>
              <div>
                {data &&
                  data.list?.result.map((item: guessSchemList) => {
                    return (
                      <div key={item.id}>
                        <FBMyguess myguesslist={item}></FBMyguess>
                      </div>
                    );
                  })}
                <InfiniteScroll
                  loadMore={async (isRetry) => {
                    await loadMoreAsync();
                  }}
                  hasMore={!noMore}
                />
              </div>
            </Spin>
          </div>
        ) : (
          <Empty pic={WorldcupEmpty} message="暂无数据，请先登录" />
        )}
      </div>

      {/* <Anchor affix={false}>
        <Link
          href="#root"
          title={
            <div className={styles.goTop}>
              {scrollTop > 50 && <img className={styles.goTop_img} src={Gotop} alt="" />}
            </div>
          }
        ></Link>
      </Anchor> */}
    </div>
  );
};

export default Guess;
