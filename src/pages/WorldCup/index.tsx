import React, { useEffect, useState } from 'react'
import FBWorldCapTab from "@/components/FBWordCopTab"
import Analysis from "./Analysis"
import Scheme from "./Scheme"
import Rankinglist from "./Rankinglist"
import Focusing from "./Focusing"
import WorldcapImg from "@/assets/worldcap/cap_bg.png"

import { FormattedMessage } from 'umi';

import styles from "./index.less"
type Props = {}

const WorldCup = (props: Props) => {
    const [activeKey, setActiveKey] = useState("key_worldcap_focusing")



    const tab = [{
        title: <FormattedMessage id={'key_worldcap_focusing'} />,
        key: "key_worldcap_focusing",
    }, {
        title: <FormattedMessage id={'key_worldcap_schedule'} />,
        key: "key_worldcap_schedule",
    }, {
        title: <FormattedMessage id={'key_worldcap_analysis'} />,
        key: "key_worldcap_analysis",
    },
    {
        title: <FormattedMessage id={'key_scheme'} />,
        key: "key_scheme",
    },

    {
        title: <FormattedMessage id={'key_worldcap_rankinglist'} />,
        key: "key_worldcap_rankinglist",
    },
    ]
    const onChangetab = (key: string) => {
        console.log(key, "ppooiuytre");
        setActiveKey(key)
    }

    return (
        <div className={styles.cap_main}>
            <div className={styles.cap_bg}>
                <img style={{ width: "100%", height: "200px" }} src={WorldcapImg} alt="" />

                <div className={styles.cap_tabbg}>
                    <FBWorldCapTab list={tab} defaultActiveKey={activeKey} onChange={onChangetab}></FBWorldCapTab>

                </div>





            </div>
            {/* 聚焦 */}
            {activeKey == "key_worldcap_focusing" && <Focusing></Focusing>}
            {/* 34分析 */}
            {activeKey == "key_worldcap_analysis" && <Analysis></Analysis>}
            {activeKey == "key_scheme" && <Scheme></Scheme>}
            {activeKey == "key_worldcap_rankinglist" && <Rankinglist></Rankinglist>}


        </div>
    )
}

export default WorldCup