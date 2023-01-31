import React, { useEffect, useState } from 'react'
import styles from './index.less';
import * as matchService from '@/services/match';
import { Spin } from 'antd';
import { SideBar } from 'antd-mobile'
import Ranking from "../datatable"
import useWindowSize from '@/hooks/useWindowSize';

type Props = {
    matchId: number;
    id: number;
    data: any;
    type: string
}

const Table = (props: Props) => {
    const { height } = useWindowSize();

    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState({});
    const init = async (id) => {
        setLoading(true);
        const result: any = await matchService.fetchCompanyHistoryOdds({
            match_id: props.matchId,
            company_id: id,
        });

        if (result.success) {

            setData(result.data)
        }
        console.log(result, "2222222");

        setLoading(false);
        // if (result.success) {
        //     const { data } = result;
        //     if (data) {
        //         setData(data[`${type}`]);
        //     }
        // }
    };

    useEffect(() => {
        init(props.id)

        console.log(props.data);

    }, [])


    return (
        <div className={styles.main} >

            <div style={{ display: "flex", background: "#fff", height: height - 158 }}>
                <div className={styles.sideBar}>
                    <div className={styles.company_id} style={{ borderRadius: "8px 0 0 0" }}>  公司</div>
                    <SideBar style={{ "--background-color": "#F3F4F6", '--item-border-radius': '0px', }} defaultActiveKey={props.id} onChange={(key) => {
                        init(key)
                    }} >
                        {props.data.map(item => (
                            <SideBar.Item key={item.id} title={`${item.name[0]}*`} >


                            </SideBar.Item>
                        ))}
                    </SideBar>
                </div>
                <div style={{ width: "100%", height: "100%" }}>
                    <Spin spinning={loading}>

                        <Ranking data={data[props.type]} />

                    </Spin>
                </div>
            </div>
        </div>
    )
}

export default Table