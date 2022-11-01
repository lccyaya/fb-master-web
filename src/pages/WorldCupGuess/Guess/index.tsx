import React from 'react';
import FBGuessInfo from '@/components/FBGuessInfo';
import FBGuessShare from '@/components/FBGuessShare';
import FBMyguess from '@/components/FBMyguess';
import FBTitle from '@/components/FBTitle';
import Empty from '@/components/Empty';
import styles from './index.less';
import { useSelector } from 'umi';
import { ConnectState } from '@/models/connect';
import { UserInfoType } from '@/services/user';
import MyguessTitleImg from '@/assets/worldcup/my_guess_title.png';
import WorldcupEmpty from '@/assets/worldcup/worldcup_empty.png';

type Props = {};

const Guess = (props: Props) => {
    const myguesslist = [
        {
            time: '2020-12-20',
            home: '中国',
            away: '哈根达斯',
            iswin: '【让负-2】@1.85',
            lost: -100,
            win: 350,
        },
        {
            time: '2020-12-20',
            home: '中国',
            away: '哈根达斯',
            iswin: '【让负-2】@1.85',
            lost: -100,
            win: 350,
        },
    ];

    const sharelist = [
        { title: '分享34体育', content: '每日分享获得能量值', action: '去分析' },
        { title: '分享34体育', content: '每日分享获得能量值', action: '去分析' },
    ];
    const user = useSelector<ConnectState, UserInfoType | null | undefined>(
        (s) => s.user.currentUser,
    );
    return (

        <div className={styles.guess_info}>
            <div style={{ padding: 12 }}>
                <FBGuessInfo user={user} guessData></FBGuessInfo>
            </div>
            <div className={styles.my_guess_info}>
                {user ? (
                    <div>
                        {sharelist &&
                            sharelist.map((item, index) => {
                                return (
                                    <FBGuessShare
                                        backgroundImage={
                                            index == 0
                                                ? 'linear-gradient(to right, #FFEBD9,#CD986A)'
                                                : 'linear-gradient(to right, #FCE6E5,#C66961)'
                                        }
                                        sharelist={item}
                                    />
                                );
                            })}
                    </div>
                ) : null}
                <div className={styles.title}>
                    <div className={styles.title_left}>
                        <img src={MyguessTitleImg} style={{ width: 26, height: 26 }} alt="" />
                        <FBTitle title="我的竞猜"></FBTitle>


                    </div>

                    <div className={styles.title_right} >
                        <span style={{ color: "#9B9B9B" }}>次数  3 </span>
                        <span style={{ color: "#39906A" }}> 消耗 200 </span>
                        <span style={{ color: "#FE2222" }}>  奖励 200 </span>
                    </div>
                </div>
                {user ? (
                    <div>
                        {' '}
                        {myguesslist &&
                            myguesslist.map((item) => {
                                return <FBMyguess myguesslist={item}></FBMyguess>;
                            })}
                    </div>
                ) : (
                    <Empty pic={WorldcupEmpty} message="暂无数据，请先登录" />
                )}
            </div>
        </div>

    );
};

export default Guess;
