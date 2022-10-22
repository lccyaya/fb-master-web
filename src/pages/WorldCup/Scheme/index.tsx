import React, { useState } from 'react'
import FBWorldCapTab from "@/components/FBWordCopTab"
import FBHotSchemeItem from "@/components/FBHotSchemeItem"
import { FormattedMessage } from 'umi';
import styles from "./index.less"
type Props = {}
const Scheme = (props: Props) => {
    const [activeKey, setActiveKey] = useState("key_wordcap_hit")
    const tab = [{
        title: <FormattedMessage id={'key_wordcap_hit'} />,
        key: "key_wordcap_hit",
    }, {
        title: <FormattedMessage id={'key_wordcap_winhit'} />,
        key: "key_wordcap_winhit",
    }, {
        title: <FormattedMessage id={'key_wordcap_free'} />,
        key: "key_wordcap_free",
    },

    ]
    const informationlist = [{
        nickname: "卡塔尔V",
        published_at: "2022",
        visit: "123",
        hit_tag: "9",
        continuous_tag: "5",
        hit_rate: "79"
    }, {
        nickname: "卡塔尔",
        published_at: "2022",
        visit: "123",
        hit_tag: "9",
        continuous_tag: "5"
    }, {
        nickname: "卡塔尔",
        published_at: "2022",
        visit: "123"
    }, {
        nickname: "卡塔尔",
        published_at: "2022",
        visit: "123",
        hit_tag: "7中5",
        continuous_tag: "5"
    }]
    const onChangetab = (key: string) => {
        console.log(key, "ppooiuytre");
        setActiveKey(key)
    }

    return (
        <div className={styles.cap_list} >
            <div style={{ width: "230px", margin: "10px 0" }}>
                <FBWorldCapTab mini={true} list={tab} defaultActiveKey={activeKey} onChange={onChangetab}></FBWorldCapTab>


            </div>
            {informationlist && informationlist.map((item, index) => {
                return <div style={{ margin: "10px 0 0 0" }} key={index}> <FBHotSchemeItem color="#7E1132" scheme={item} /></div>

            })}

        </div >
    )
}

export default Scheme