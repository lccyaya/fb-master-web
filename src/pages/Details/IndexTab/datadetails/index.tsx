import React, { useEffect, useState } from 'react'
import { NavBar } from 'antd-mobile';
import styles from './index.less';
import { useHistory } from 'umi';
import { CapsuleTabs } from 'antd-mobile'
import Table from "./table"
import IconFont from '@/components/IconFont';
type Props = {}

const Datadetails = (props: Props) => {
    const history = useHistory();
    const matchId = props.location.state.matchId
    const id = props.match.params.matchId
    const data = props.location.state.data
    const match = props.location.state.match
    const [type, setType] = useState(props.location.state.type)
    const back = () => {
        history.goBack();
    };
    useEffect(() => {
        console.log(props);

    })

    // const Tabs = ()
    return (
        <div >
            <div className={styles.header}>
                {/* <NavBar className={styles.navbar} onBack={back} >
                 
                </NavBar> */}
                <div className={styles.navbar}>
                    {/* <IconFont onClick={back} className={styles.icon} type="icon-gengduo" size={22} color="#fff" />

                    <CapsuleTabs className={styles.tabs} defaultActiveKey={type} onChange={(key) => {
                        setType(key)
                    }}>
                        <CapsuleTabs.Tab title='胜平负' key='eu'>



                        </CapsuleTabs.Tab>
                        <CapsuleTabs.Tab title='让球数' key='asia'>

                        </CapsuleTabs.Tab>
                        <CapsuleTabs.Tab title='进球数' key='bs'>

                        </CapsuleTabs.Tab>
                    </CapsuleTabs> */}
                </div>

            </div>
            <div className={styles.table}>

                <div className={styles.navbar} style={{ background: "rgba(255, 255, 255, 0)", height: "8%" }}>
                    <IconFont onClick={back} className={styles.icon} type="icon-gengduo" size={22} color="#fff" />
                    <CapsuleTabs className={styles.tabs} defaultActiveKey={type} onChange={(key) => {
                        setType(key)
                    }}>
                        <CapsuleTabs.Tab title='胜平负' key='eu'>



                        </CapsuleTabs.Tab>
                        <CapsuleTabs.Tab title='让球数' key='asia'>

                        </CapsuleTabs.Tab>
                        <CapsuleTabs.Tab title='进球数' key='bs'>

                        </CapsuleTabs.Tab>
                    </CapsuleTabs>
                </div>
                <div style={{
                    height: "88%", background: "#fff", borderRadius: "8px 8px 0 0"
                }}>
                    <div className={styles.name} >
                        <img className={styles.nameimg} src={match.home_team_logo} alt="" />   {match.home_team_name} VS   {match.away_team_name}
                        <img className={styles.nameimg} src={match.away_team_logo} alt="" />
                    </div>
                    <div style={{ height: "93%" }}>
                        <Table matchId={matchId} id={id} data={data} type={type}></Table>
                    </div>


                </div>
            </div>
        </div >
    )
}

export default Datadetails