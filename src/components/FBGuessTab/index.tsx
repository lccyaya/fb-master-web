import React, { useEffect, useState } from 'react'
import IconFont from '@/components/IconFont';
import styles from "./index.less"
import { useHistory } from 'umi';


type itemparms = {
    label: string
    key: string
    children?: string
}
type Props = {
    item: itemparms[]
    ativeKey: string
    onChange: Function
    list: any
}

const FBGuessTab = (props: Props) => {
    const history = useHistory()
    const { item, ativeKey, onChange, list } = props
    const onChangetab = (key: string) => {
        onChange(key)
    }
    const ongoMore = (key: string) => {
        history.push(`/zh/worldcup_guess`)
    }


    useEffect(() => { console.log(item); }, [ativeKey])
    return (
        <div className={styles.guess_main}>

            <div className={styles.guess_tab}>
                <div style={{ display: "flex" }}>
                    {item.map((items) => {
                        return <div onClick={() => {
                            onChangetab(items.key)
                        }} className={ativeKey == items.key ? styles.guess_ativeKey_tab : styles.guess_default_tab} key={items.key}>{items.label}</div>
                    })}</div>
                <div className={styles.more} onClick={ongoMore}>更多           <IconFont className={styles.star} type="icon-jiantouyou" size={10} />
                </div>


            </div>


            <div style={{ borderRadius: "0 6px 6px 6px", backgroundColor: "#fff", padding: 12, marginTop: -1 }} >
                {list.map((item) => {
                    return <div className={styles.card_content}>


                        <div className={styles.card_content_name}>
                            <div className={styles.card_content_nameleft}>
                                {item}
                            </div>
                            <div>

                                <div>姓名</div>
                                <div style={{ color: "#848494" }}>竞猜值</div></div>


                        </div>
                        <div className={styles.card_content_return}>
                            <div>
                                30%</div>
                            回报率</div>
                    </div>

                })}
            </div>
        </div>
    )
}
export default FBGuessTab