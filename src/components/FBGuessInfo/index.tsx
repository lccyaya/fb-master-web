import React from 'react'
import styles from "./index.less"

type Props = {
    guessData: any
    user: any
}

const FBGuessInfo = (props: Props) => {
    const { guessData, user } = props

    return (
        <div className={styles.guess_main}>

            {/* { }
                未登录，请写登录 */}
            {user == null ? <div className={styles.guess_userlogin}>未登录，请先登录</div> : <div className={styles.guess_user} >


                <div className={styles.guess_username}>
                    <div className={styles.img} >

                    </div>
                    <div className={styles.guess_name}>
                        <div>姓名</div>
                        <div style={{ fontSize: 14 }}>能量值 <span>188888</span></div>
                    </div>
                </div>
                <div className={styles.guess_userrank}>
                    <div >
                        竞猜值榜 <span style={{ fontSize: 16 }}>22</span> 名
                    </div>
                    <div className={styles.guess_name}>
                        回报率榜  暂未上榜

                    </div>
                </div>
            </div>}



            <div className={styles.guess_box}>
                <div className={styles.guess_list}>
                    <div className={styles.guess_value}>     {guessData && user ? "有值" : "-"}</div>


                    <div>竞猜值</div>
                </div>
                <div className={styles.guess_list}>

                    <div className={styles.guess_value}>    {guessData && user ? "有值" : "-"}</div>

                    <div>总奖励</div>
                </div>
                <div className={styles.guess_list}>
                    <div className={styles.guess_value}>     {guessData && user ? "有值" : "-"}</div>

                    <div>参与次数</div>
                </div>
                <div className={styles.guess_list}>
                    <div className={styles.guess_value}>     {guessData && user ? "有值" : "-"}</div>

                    <div>回报率</div>
                </div>
            </div>

        </div>
    )
}

export default FBGuessInfo