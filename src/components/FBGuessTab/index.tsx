import React, { useEffect, useState } from 'react'
import IconFont from '@/components/IconFont';
import styles from "./index.less"
import { useHistory } from 'umi';
import TabFirstImg from "@/assets/worldcup/guess_tab_first.png";
import TabTwoImg from "@/assets/worldcup/guess_tab_two.png";
import TabThreeImg from "@/assets/worldcup/guess_tab_three.png";


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


            <div className={styles.card_content_box} >
                {list.map((item, index) => {
                    return <div style={{ marginTop: index == 1 ? "-20px" : "20px" }} className={styles.card_content}>


                        <div className={styles.card_content_name}>
                            <div className={styles.card_content_nameleft}>
                                <img className={styles.rank} src={index == 0 ? TabTwoImg : index == 1 ? TabFirstImg : TabThreeImg} alt="" />

                            </div>
                            <div>

                                <div style={{ color: "#7E1132", textAlign: "center" }}>姓名</div>
                                <div className={styles.guess_num}>128%</div></div>


                        </div>
                        <div className={styles.card_content_return}>


                            回报率  30%</div>
                    </div>

                })}
            </div>
        </div>
    )
}
export default FBGuessTab