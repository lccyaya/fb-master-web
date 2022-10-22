import React from 'react'
import { CapsuleTabs } from 'antd-mobile'
import styles from "./index.less"

type titleprops = {
    title: any,
    key: string | number
}

type Props = {
    list: titleprops[],
    defaultActiveKey: string,
    onChange: Function
    mini?: boolean
}

const FBWordCopTab = (props: Props) => {
    const { defaultActiveKey, list, mini, onChange = () => { } } = props
    const onChangetab = (key: string) => {
        onChange(key)
    }
    console.log(list, "00000");
    return (
        <div className={mini ? styles.cap_main_height : styles.cap_main}>
            <div className={styles.cap_tab}>
                <CapsuleTabs className={styles.cap_tab} defaultActiveKey={defaultActiveKey} onChange={onChangetab}>

                    {list.map((item) => {
                        return <CapsuleTabs.Tab title={item.title} key={item.key} />
                    })}
                </CapsuleTabs>
            </div>
        </div>
    )
}

export default FBWordCopTab