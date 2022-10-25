import React, { useState, useEffect } from 'react'
import FBWorldCapTab from "@/components/FBWordCopTab"
import styles from "./index.less"
import { SideBar } from 'antd-mobile'
import { Table, Spin } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useInfiniteScroll } from 'ahooks';
import { InfiniteScroll } from 'antd-mobile';
import { login } from '@/services/certification';
import { PlayerGoalList } from "@/services/worldcap"
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
        align: "center",
        ellipsis: true
    },
    {
        title: '总数',
        dataIndex: 'num',
        key: 'address',
        align: "center",
    },

];

const Rankinglist = (props: Props) => {
    const [activeKey, setActiveKey] = useState("key_teamplayers")
    const [columns, setColumns] = useState(teamplayer_columns)
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
    const getPlayerGoalList = async (page: number, size: number): Promise<any> => {
        let data: any = {
            season_id: "0085",
            competition_id: 542

        }
        const result: any = await PlayerGoalList(data);
        if (result.success == true) {

            return {
                list: result.data.list,
                total: result.data.total,
                page: page + 1,
            };
        }

    }
    const { data = () => { }, loading, loadMoreAsync, reload, noMore } = useInfiniteScroll(
        (d) => {

            const { page = 1 } = d || {};
            return getPlayerGoalList(page, 10);
        },
        {
            // target: ref,
            isNoMore: (data) => {
                if (!data?.list?.length) {
                    return true;
                }
                return data?.list?.length >= data?.total;

            },
            manual: true,
        }
    );
    useEffect(() => {
        reload()
    }, []);
    return (
        <div className={styles.cap_list}>
            <div style={{ width: "70px", marginLeft: 12, marginBottom: 10 }}>
                <FBWorldCapTab mini={true} list={tab} defaultActiveKey={activeKey} onChange={onChangetab}></FBWorldCapTab>

            </div>
            <div className={styles.tab_team} >
                <SideBar style={{ "--width": "70px", '--item-border-radius': '0px', "--background-color": "#FAFBFD", }}>

                    <SideBar.Item key="goal" title="进球" />

                </SideBar>

                {/* <Spin spinning={loading}>
                    <div className={styles.tab_teamtable} >
                        <Table scroll={{ y: 500 }} pagination={false} columns={columns} dataSource={data} />
                    </div>
                    <InfiniteScroll
                        loadMore={async (isRetry) => {
                            await loadMoreAsync();
                        }}
                        hasMore={!noMore}
                    />

                </Spin> */}



            </div>
        </div >
    )
}

export default Rankinglist