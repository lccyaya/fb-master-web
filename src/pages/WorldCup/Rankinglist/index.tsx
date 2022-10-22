import React, { useState } from 'react'
import FBWorldCapTab from "@/components/FBWordCopTab"
import styles from "./index.less"
import { SideBar } from 'antd-mobile'
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { login } from '@/services/certification';
type Props = {}
interface DataType {
    key: string;
    ranking: string;
    num: number;
    team: string;
    teamplay: string
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
        dataIndex: 'ranking',
        key: 'ranking',
        align: "center",
        // render: text => <a>{text}</a>,
    },
    {
        title: '球员',
        dataIndex: 'teamplay',
        key: 'teamplay',
        // width: 100,
        align: "center",
    },
    {
        title: '球队',
        dataIndex: 'team',
        key: 'team',
        width: 70,
        align: "center",
    },
    {
        title: '总数',
        dataIndex: 'num',
        key: 'address',
        align: "center",
    },

];
const data: DataType[] = [
    {
        key: '1',
        ranking: '1',
        num: 32,
        team: 'New York No.',
        teamplay: "莫扎特"
    },
    {
        key: '2',
        ranking: '2',
        num: 42,
        team: 'London No.',
        teamplay: "莫扎特"
    },
    {
        key: '3',
        ranking: '3',
        num: 32,
        team: 'Sidney No. ',
        teamplay: "莫扎特"
    },
];
const Rankinglist = (props: Props) => {
    const [activeKey, setActiveKey] = useState("key_team")
    const [columns, setColumns] = useState(team_columns)
    const tab = [{
        title: "球队",
        key: "key_team",
    }, {
        title: "球员",
        key: "key_teamplayers",
    },

    ]
    const onChangetab = (key: string) => {
        console.log(key, "ppooiuytre");
        setActiveKey(key)
        if (key == "key_teamplayers") {
            setColumns(teamplayer_columns)
        } else {
            setColumns(team_columns)
        }
    }
    console.log();

    return (
        <div className={styles.cap_list}>
            <div style={{ width: "150px", marginLeft: 12, marginBottom: 10 }}>
                <FBWorldCapTab mini={true} list={tab} defaultActiveKey={activeKey} onChange={onChangetab}></FBWorldCapTab>

            </div>
            <div className={styles.tab_team} >
                <SideBar style={{ '--item-border-radius': '0px', "--background-color": "#FAFBFD", }}>
                    {tab.map(item => (
                        <SideBar.Item key={item.key} title={item.title} />
                    ))}
                </SideBar>
                <div className={styles.tab_teamtable} >
                    <Table pagination={false} columns={columns} dataSource={data} />
                </div>
            </div>
        </div >
    )
}

export default Rankinglist