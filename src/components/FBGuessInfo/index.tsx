import React from 'react'
import styles from "./index.less"
type Props = {
    guessData: any
}

const FBGuessInfo = (props: Props) => {
    const { guessData } = props
    return (
        <div className={styles.guess_main}>
            <div className={styles.guess_user} >

                { }
                未登录，请写登录
            </div>
            <div className={styles.guess_box}>
                <div className={styles.guess_list}>
                    {guessData ? "有值" : "-"}

                    <div>竞猜值</div>
                </div>
                <div className={styles.guess_list}>
                    {guessData ? "有值" : "-"}
                    <div>总奖励</div>
                </div>
                <div className={styles.guess_list}>
                    {guessData ? "有值" : "-"}
                    <div>参与次数</div>
                </div>
                <div className={styles.guess_list}>
                    {guessData ? "有值" : "-"}
                    <div>回报率</div>
                </div>
            </div>

        </div>
    )
}

export default FBGuessInfo