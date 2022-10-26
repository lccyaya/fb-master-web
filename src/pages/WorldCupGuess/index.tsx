import React, { useState } from 'react'
import { NavBar } from 'antd-mobile'
import FBTabs from "@/components/FBTabs"
import FBGuessInfo from "@/components/FBGuessInfo"

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

            <div className={styles.guess_bg}>
                <NavBar onBack={back}>
                    {title}
                </NavBar>
            </div>
            < FBGuessInfo guessData></FBGuessInfo>
        </div>
    )
}

export default WorldCapguess