import React from 'react'
import styles from "./index.less"
interface DataType {
    text: string;
    bgcolor: string
    bdcolor: string
}
type Props = {
    TypeList: DataType[]
}

const FBTableType = (props: Props) => {
    const { TypeList } = props

    return (
        <div>   <div className={styles.home_type_color}>
            {TypeList.map((item: DataType) => {
                return <div className={styles.type_space} key={item.text}>
                    <div className={styles.type_space_before} style={{ background: item.bgcolor, borderColor: item.bdcolor }} />
                    {item.text}</div>
            })}
        </div></div>
    )
}

export default FBTableType