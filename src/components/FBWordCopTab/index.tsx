import React from 'react'
import { CapsuleTabs } from 'antd-mobile'
import styles from "./index.less"

type titleprops = {
    title: string,
    key: string | number
}

type Props = {
    title: titleprops[]
}

const FBWordCopTab = (props: Props) => {
    const { title } = props
    return (
        <div className={styles.cap_main}>
            <CapsuleTabs>

                {title.map((item) => {
                    <CapsuleTabs.Tab title={item.title} key={item.key} />
                })}
            </CapsuleTabs>
        </div>
    )
}

export default FBWordCopTab