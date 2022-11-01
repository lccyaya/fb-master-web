import React, { useState } from 'react'
import { NavBar } from 'antd-mobile'
import FBTabs from "@/components/FBTabs"
import Guess from "./Guess"
import GuessCenter from "./GuessCenter"
import GuessRanking from "./GuessRanking"
import Rule from "@/assets/worldcup/rule.png"

import { useHistory } from 'umi';

import styles from './index.less';


type Props = {}

const WorldCapguess = (props: Props) => {
    const history = useHistory();
    const [curKey, setCurKey] = useState("0");
    const items = [
        {
            key: '0',
            title: '世界杯竞猜',
        },
        {
            key: '1',
            title: '竞猜中心',
        },
        {
            key: '2',
            title: '竞猜排行',
        },
    ];


    const handleTabClick = (key: string) => {
        console.log(key);
        setCurKey(key)
    };
    const title = (<FBTabs
        items={items}
        activeKey={curKey}
        onChange={handleTabClick}
        selectStyle={{ fontSize: '20px', color: '#000000' }}
        normalStyle={{ color: "#000028" }}
    />)
    const back = () => {
        history.goBack();
    }
    return (
        <div className={styles.main_guess_bg}>

            <div className={styles.guess_bg} style={{ background: curKey !== "0" ? "#fff" : "" }}>
                <NavBar onBack={back} right={curKey
                    !== "0" ? <div style={{ color: "#848494", fontSize: 11, height: 15 }}>规则</div> : ""}>
                    {title}
                </NavBar>

                <div className={styles.guess_rule}>
                    <img src={Rule} alt="" />
                </div>
            </div>
            {curKey == "0" ? <Guess></Guess> : null}
            {curKey == "1" ? <GuessCenter></GuessCenter> : null}
            {curKey == "2" ? <GuessRanking></GuessRanking> : null}


        </div >
    )
}

export default WorldCapguess