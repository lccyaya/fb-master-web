import React, { useState, useEffect, useRef } from 'react'
import FBWorldCapTab from "@/components/FBWordCopTab"
import styles from "./index.less"
import { SideBar } from 'antd-mobile'
import { Table, Spin } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import useWindowSize from '@/hooks/useWindowSize'
import { PlayerGoalList } from "@/services/worldcup"
type Props = {}
interface DataType {
    key: string;
    ranking: string;
    num: number;
    team: string;
    teamplay: string
    team_logo: string
}
const team_columns: ColumnsType<DataType> = [
    {
        title: '排名',
        dataIndex: 'ranking',
        key: 'ranking',
        align: "center",
        // render: text => <a>{text}</a>,
    },
    {
        title: '球队',
        dataIndex: 'team',
        key: 'team',
        width: 100,
        align: "center",
    },
    {
        title: '总数',
        dataIndex: 'num',
        key: 'address',
        align: "center",
    },

];
const teamplayer_columns: ColumnsType<DataType> = [
    {
        title: '排名',
        dataIndex: 'position',
        key: 'position',
        align: "center",
        width: 50
        // render: text => <a>{text}</a>,
    },
    {
        title: '球员',
        dataIndex: 'name',
        key: 'name',
        // width: 100,
        align: "center",
        render: (text, record, index) => <div className={styles.team_logo} >

            <img style={{ width: 30, height: 30, marginRight: 5 }} src={record.team_logo} alt="" />

            <div>
                {text}
            </div>
        </div>,
    },
    {
        title: '球队',
        dataIndex: 'team_name',
        key: 'team_name',
        align: "center",
        // ellipsis: true
    },
    {
        title: '总数',
        dataIndex: 'goal',
        key: 'goal',
        align: "center",
    },

];

const Rankinglist = (props: Props) => {

    const [activeKey, setActiveKey] = useState("key_teamplayers")
    const [columns, setColumns] = useState(teamplayer_columns)

    const [innerHeight, setInnerHeight] = useState<number>(0)
    const [data, setData] = useState([])
    const tabref = useRef<any>()
    const { height } = useWindowSize()
    const tab = [
        //     {
        //     title: "球队",
        //     key: "key_team",
        // },
        {
            title: "球员",
            key: "key_teamplayers",
        },

    ]
    const onChangetab = (key: string) => {
        // console.log(key, "ppooiuytre");
        setActiveKey(key)
        if (key == "key_teamplayers") {
            setColumns(teamplayer_columns)
        } else {
            setColumns(team_columns)
        }
    }
    // 上拉滚动
    const getPlayerGoalList = async (): Promise<any> => {
        let data: any = {
            competition_id: 1,
            season_id: 7555
        }
        const result: any = await PlayerGoalList(data);

        if (result.success == true) {
            setData(result.data)

        }

    }

    useEffect(() => {
        getPlayerGoalList()
        const height1 = height - tabref.current?.clientHeight - 325
        setInnerHeight(height1)

    }, [height]);


    return (
        <div className={styles.cap_list} >
            <div style={{ width: "70px", marginLeft: 12, marginBottom: 10 }} ref={tabref}>
                <FBWorldCapTab mini={true} list={tab} defaultActiveKey={activeKey} onChange={onChangetab}></FBWorldCapTab>

            </div>
            <div className={styles.tab_team} >
                <SideBar style={{ "--width": "70px", "--height": `${innerHeight + 54}px`, '--item-border-radius': '0px', "--background-color": "#FAFBFD", }}>

                    <SideBar.Item key="goal" title="进球" />

                </SideBar>
                <div className={styles.tab_teamtable} >
                    <Table scroll={{ y: innerHeight }} rowKey="position" pagination={false} columns={columns} dataSource={data} />
                    <div style={{ height: 55 }}></div>
                </div>

            </div>

        </div >
    )
}

export default Rankinglist