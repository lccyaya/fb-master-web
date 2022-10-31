import React from 'react'
import FBGuessInfo from "@/components/FBGuessInfo"
import FBGuessShare from "@/components/FBGuessShare"
import FBMyguess from "@/components/FBMyguess"
import styles from './index.less';
type Props = {}

const Guess = (props: Props) => {
    const myguesslist = [{ time: "2020-12-20", home: "中国", away: "哈根达斯", iswin: "【让负-2】@1.85", lost: -100, win: 350 }, { time: "2020-12-20", home: "中国", away: "哈根达斯", iswin: "【让负-2】@1.85", lost: -100, win: 350 }]

    const sharelist = [{ title: "分享34体育 +50", content: "每日分享获得能量值", action: "去分析" }, { title: "分享34体育 +50", content: "每日分享获得能量值", action: "去分析" }]

    return (
        <div>   <div className={styles.guess_info}>
            <div style={{ padding: 12, }}>
                < FBGuessInfo guessData></FBGuessInfo>
            </div>
            <div className={styles.my_guess_info}>
                {sharelist && sharelist.map((item, index) => {
                    return < FBGuessShare backgroundImage={index == 0 ? "linear-gradient(to right, #FFEBD9,#CD986A)" : "linear-gradient(to right, #FCE6E5,#C66961)"} sharelist={item} />
                })}

                {myguesslist && myguesslist.map((item => {
                    return <FBMyguess myguesslist={item}></FBMyguess>
                }))
                }

            </div>


        </div>
        </div>
    )
}

export default Guess