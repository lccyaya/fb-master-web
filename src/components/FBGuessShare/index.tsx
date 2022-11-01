import React from 'react'
import styles from './index.less'
import Fire from "@/assets/worldcup/fire.png"


type Props = {
    sharelist: any
    backgroundImage: string
}

const FBGuessShare = (props: Props) => {
    const { sharelist, backgroundImage } = props
    return (
        <div className={styles.share_main} style={{
            backgroundImage: backgroundImage
        }}>
            <div className={styles.share_main_left}>  <div>{sharelist.title} <span style={{ color: "#7E1132", fontSize: 18 }}>+50</span>
                <img style={{ width: 16, height: 16, marginTop: -3 }} src={Fire} alt="" />
            </div>
                <div style={{ color: "#5A5A5A", fontSize: 13 }}>{sharelist.content}</div></div>
            <div className={styles.share_main_riight}>
                {sharelist.action}
            </div>
        </div>
    )
}

export default FBGuessShare