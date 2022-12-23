import { time } from 'echarts'
import React from 'react'
import styles from "./index.less"
type Props = {
    TypeList: any
}

const FBTableType = (props: Props) => {
    const { TypeList } = props
    return (
        <div>   <div className={styles.home_type_color}>
            {TypeList.map((item) => {
                // eslint-disable-next-line react/jsx-key
                return <div className={styles.type_space}>
                    <div className={styles.type_space_before} style={{ background: item.bgcolor, borderColor: item.bdcolor }} />
                    {item.text}</div>
            })}
        </div></div>
    )
}

export default FBTableType