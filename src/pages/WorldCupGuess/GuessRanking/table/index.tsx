import React, { useEffect, useState } from 'react'
import { Table, ConfigProvider } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Empty from '@/components/Empty';
import { useHistory } from 'umi'
// import { ScoresList } from "@/services/worldcup"


import styles from "./index.less"
interface DataType {
    key: string;
    ranking: string;
    num: number;
    team: string;
    teamplay: string;
    team_logo: string
    position: number
    played: number
    won: number
    against: number
    drawn: number
    goals: number
    diff: number
    lost: number
    team_id: number
}
type Props = {
    group?: string | number;
    data?: any
}
const customizeRenderEmpty = () => (
    <div style={{ textAlign: 'center' }}>
        <Empty style={{ fontSize: 20 }} />
    </div>
);
const grouplist = ["A", "B", "C", "D", "E", "F", "G", "H"]
const TablePage = (props: Props) => {

    const history = useHistory()
    const columns: ColumnsType<DataType> = [
        {
            title: "排名",
            dataIndex: 'team_name',
            key: 'team_name',
            // width: 150,
            // align: "center",
            render: (text, record, index) => <div>
                <span >{record.position}</span>
                <img style={{ width: 20, height: 20, margin: " 0 5px" }} src={record.team_logo} alt="" />
                {text}
            </div>,
        },
        {
            title: '用户名',
            dataIndex: 'team',
            key: 'team',
            width: 100,
            align: "center",
            render: (text, record, index) => <div>
                {record.played}
            </div>,

        },
        {
            title: '参与次数',
            dataIndex: 'won',
            key: 'won',
            align: "center",
            render: (text, record, index) => <div style={{ color: "#7E1132" }}>
                {record.won}/{record.drawn}/{record.lost}
            </div>,
        },
        {
            title: '回报率',
            dataIndex: 'num',
            key: 'address',
            align: "center",
            render: (text, record, index) => <div style={{ color: "#7E1132" }}>
                {record.goals}/{record.against}/{record.diff}
            </div>,
        },

    ];
    return (
        <div className={styles.tab_teamtable}>
            <ConfigProvider renderEmpty={customizeRenderEmpty}>
                <Table pagination={false} columns={columns} dataSource={props.data}

                    onRow={record => {
                        return {
                            onClick: event => {
                                console.log(record, "pppp");

                                history.push(`/zh/teamdetails/${record.team_id}`)
                            }, // 点击行

                        };
                    }}
                />
            </ConfigProvider>


        </div >
    )
}

export default TablePage