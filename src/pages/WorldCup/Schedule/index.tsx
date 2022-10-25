import React, { useEffect, useState } from 'react'
import { useHistory } from 'umi';
import FBWorldCapTab from "@/components/FBWordCopTab"
import FBGroup from "@/components/FBGroup"
import Table from "./table"
import styles from "./index.less"
import { GroupList, ScoresList, BracketList } from "@/services/worldcap"
import type { GroupListres, scoresListprops, Datares } from '@/services/worldcap';
import Eliminate from "./eliminate"
import { login } from '@/services/certification';


type Props = {}
const Scheme = (props: Props) => {
    const history = useHistory();
    const [activeKey, setActiveKey] = useState("0")
    const [grouList, setGroupList] = useState<GroupListres[]>([])
    const [scoresList, setScoresList] = useState<scoresListprops[]>()
    const [eliminateList, setEliminateList] = useState<scoresListprops[]>()


    const tab = [{
        title: "小组赛",
        key: "0",
    }, {
        title: "积分榜",
        key: "1",
    }, {
        title: "淘汰赛",
        key: "2",
    },

    ]

    const onChangetab = (key: string) => {
        // console.log(key, "ppooiuytre");
        if (key == "0") {
            // getGroupList()
        } else if (key == "1") {
            // getScoresList()
        } else {
            getBracketList()
        }

        setActiveKey(key)
    }
    const getGroupList = async () => {
        let data = {
            competition_id: 1,
            season_id: 7555
        }
        let res: Datares = await GroupList(data)
        if (res.success) {
            console.log(res, "小组赛收拾收拾宿舍");

            setGroupList(res.data.list)
        }
    }
    const getScoresList = async () => {
        let data = {
            competition_id: 1,
            season_id: 7555
        }
        let res: Datares = await ScoresList(data)
        if (res.success) {
            console.log(res, "积分榜收拾收拾宿舍");



            setScoresList(res.data.list)
        }
    }

    const getBracketList = async () => {
        // let data = {
        //     season_id: 10810
        // }
        // let res: Datares = await BracketList(data)
        // if (res.success) {
        //     console.log(res, "淘汰赛99999999");

        //     // 修改数据  
        //     // let data = {
        //     //     one: [],
        //     //     tewo: [[],[],[],[]]
        //     // }

        //     setEliminateList(res.data.list)
        // }



        let params = {
            "code": 0,
            "data": {
                "tables": [
                    {
                        "rounds": {
                            "bracket_id": 30908,
                            "end_time": 1670353200,
                            "group_id": 31280,
                            "id": 95893,
                            "name": "1/8",
                            "number": 1,
                            "short_name": "R16",
                            "start_time": 1670079600
                        },
                        "matchUps": [
                            {
                                "away_score": 0,
                                "away_team_id": 59325,
                                "children_ids": [],
                                "home_score": 0,
                                "home_team_id": 59326,
                                "id": 518919,
                                "match_ids": [
                                    3718432
                                ],
                                "match_time": 1670079600,
                                "number": 1,
                                "parent_ids": [
                                    518927
                                ],
                                "round_id": 95893,
                                "state_id": 1,
                                "type_id": 1,
                                "winner_team_id": 59326,
                                "home_name": "1st in Group A",
                                "away_name": "2nd in Group B",
                                "home_country_logo": "",
                                "away_country_logo": ""
                            },
                            {
                                "away_score": 0,
                                "away_team_id": 59332,
                                "children_ids": [],
                                "home_score": 0,
                                "home_team_id": 59328,
                                "id": 518920,
                                "match_ids": [
                                    3718433
                                ],
                                "match_time": 1670094000,
                                "number": 2,
                                "parent_ids": [
                                    518927
                                ],
                                "round_id": 95893,
                                "state_id": 1,
                                "type_id": 1,
                                "winner_team_id": 59328,
                                "home_name": "1st in Group C",
                                "away_name": "2nd in Group D",
                                "home_country_logo": "",
                                "away_country_logo": ""
                            },
                            {
                                "away_score": 0,
                                "away_team_id": 59337,
                                "children_ids": [],
                                "home_score": 0,
                                "home_team_id": 59338,
                                "id": 518921,
                                "match_ids": [
                                    3718436
                                ],
                                "match_time": 1670252400,
                                "number": 3,
                                "parent_ids": [
                                    518928
                                ],
                                "round_id": 95893,
                                "state_id": 1,
                                "type_id": 1,
                                "winner_team_id": 59338,
                                "home_name": "1st in Group E",
                                "away_name": "2nd in Group F",
                                "home_country_logo": "",
                                "away_country_logo": ""
                            },
                            {
                                "away_score": 0,
                                "away_team_id": 69744,
                                "children_ids": [],
                                "home_score": 0,
                                "home_team_id": 69741,
                                "id": 518922,
                                "match_ids": [
                                    3718437
                                ],
                                "match_time": 1670266800,
                                "number": 4,
                                "parent_ids": [
                                    518928
                                ],
                                "round_id": 95893,
                                "state_id": 1,
                                "type_id": 1,
                                "winner_team_id": 69741,
                                "home_name": "1st in Group G",
                                "away_name": "2nd in Group H",
                                "home_country_logo": "",
                                "away_country_logo": ""
                            },
                            {
                                "away_score": 0,
                                "away_team_id": 59324,
                                "children_ids": [],
                                "home_score": 0,
                                "home_team_id": 59330,
                                "id": 518923,
                                "match_ids": [
                                    3718435
                                ],
                                "match_time": 1670180400,
                                "number": 5,
                                "parent_ids": [
                                    518929
                                ],
                                "round_id": 95893,
                                "state_id": 1,
                                "type_id": 1,
                                "winner_team_id": 59324,
                                "home_name": "1st in Group B",
                                "away_name": "2nd in Group A",
                                "home_country_logo": "",
                                "away_country_logo": ""
                            },
                            {
                                "away_score": 0,
                                "away_team_id": 59327,
                                "children_ids": [],
                                "home_score": 0,
                                "home_team_id": 59336,
                                "id": 518924,
                                "match_ids": [
                                    3718434
                                ],
                                "match_time": 1670166000,
                                "number": 6,
                                "parent_ids": [
                                    518929
                                ],
                                "round_id": 95893,
                                "state_id": 1,
                                "type_id": 1,
                                "winner_team_id": 59327,
                                "home_name": "1st in Group D",
                                "away_name": "2nd in Group C",
                                "home_country_logo": "",
                                "away_country_logo": ""
                            },
                            {
                                "away_score": 0,
                                "away_team_id": 59333,
                                "children_ids": [],
                                "home_score": 0,
                                "home_team_id": 59334,
                                "id": 518925,
                                "match_ids": [
                                    3718438
                                ],
                                "match_time": 1670338800,
                                "number": 7,
                                "parent_ids": [
                                    518930
                                ],
                                "round_id": 95893,
                                "state_id": 1,
                                "type_id": 1,
                                "winner_team_id": 59333,
                                "home_name": "1st in Group F",
                                "away_name": "2nd in Group E",
                                "home_country_logo": "",
                                "away_country_logo": ""
                            },
                            {
                                "away_score": 0,
                                "away_team_id": 69742,
                                "children_ids": [],
                                "home_score": 0,
                                "home_team_id": 69743,
                                "id": 518926,
                                "match_ids": [
                                    3718439
                                ],
                                "match_time": 1670353200,
                                "number": 8,
                                "parent_ids": [
                                    518930
                                ],
                                "round_id": 95893,
                                "state_id": 1,
                                "type_id": 1,
                                "winner_team_id": 69742,
                                "home_name": "1st in Group H",
                                "away_name": "2nd in Group G",
                                "home_country_logo": "",
                                "away_country_logo": ""
                            }
                        ]
                    },
                    {
                        "rounds": {
                            "bracket_id": 30908,
                            "end_time": 1670698800,
                            "group_id": 31280,
                            "id": 95894,
                            "name": "Quarterfinals",
                            "number": 2,
                            "short_name": "QF",
                            "start_time": 1670598000
                        },
                        "matchUps": [
                            {
                                "away_score": 0,
                                "away_team_id": 59343,
                                "children_ids": [
                                    518919,
                                    518920
                                ],
                                "home_score": 0,
                                "home_team_id": 59345,
                                "id": 518927,
                                "match_ids": [
                                    3718441
                                ],
                                "match_time": 1670612400,
                                "number": 1,
                                "parent_ids": [
                                    518931
                                ],
                                "round_id": 95894,
                                "state_id": 1,
                                "type_id": 1,
                                "winner_team_id": 59345,
                                "home_name": "Winner R16 match 1",
                                "away_name": "Winner R16 match 2",
                                "home_country_logo": "",
                                "away_country_logo": ""
                            },
                            {
                                "away_score": 0,
                                "away_team_id": 59340,
                                "children_ids": [
                                    518921,
                                    518922
                                ],
                                "home_score": 0,
                                "home_team_id": 59341,
                                "id": 518928,
                                "match_ids": [
                                    3718440
                                ],
                                "match_time": 1670598000,
                                "number": 2,
                                "parent_ids": [
                                    518931
                                ],
                                "round_id": 95894,
                                "state_id": 1,
                                "type_id": 1,
                                "winner_team_id": 59341,
                                "home_name": "Winner R16 match 5",
                                "away_name": "Winner R16 match 6",
                                "home_country_logo": "",
                                "away_country_logo": ""
                            },
                            {
                                "away_score": 0,
                                "away_team_id": 59344,
                                "children_ids": [
                                    518923,
                                    518924
                                ],
                                "home_score": 0,
                                "home_team_id": 59342,
                                "id": 518929,
                                "match_ids": [
                                    3718443
                                ],
                                "match_time": 1670698800,
                                "number": 3,
                                "parent_ids": [
                                    518932
                                ],
                                "round_id": 95894,
                                "state_id": 1,
                                "type_id": 1,
                                "winner_team_id": 59344,
                                "home_name": "Winner R16 match 4",
                                "away_name": "Winner R16 match 3",
                                "home_country_logo": "",
                                "away_country_logo": ""
                            },
                            {
                                "away_score": 0,
                                "away_team_id": 59346,
                                "children_ids": [
                                    518925,
                                    518926
                                ],
                                "home_score": 0,
                                "home_team_id": 59347,
                                "id": 518930,
                                "match_ids": [
                                    3718442
                                ],
                                "match_time": 1670684400,
                                "number": 4,
                                "parent_ids": [
                                    518932
                                ],
                                "round_id": 95894,
                                "state_id": 1,
                                "type_id": 1,
                                "winner_team_id": 59346,
                                "home_name": "Winner R16 match 7",
                                "away_name": "Winner R16 match 8",
                                "home_country_logo": "",
                                "away_country_logo": ""
                            }
                        ]
                    },
                    {
                        "rounds": {
                            "bracket_id": 30908,
                            "end_time": 1671044400,
                            "group_id": 31280,
                            "id": 95895,
                            "name": "Semifinals",
                            "number": 3,
                            "short_name": "SF",
                            "start_time": 1670958000
                        },
                        "matchUps": [
                            {
                                "away_score": 0,
                                "away_team_id": 59349,
                                "children_ids": [
                                    518927,
                                    518928
                                ],
                                "home_score": 0,
                                "home_team_id": 59348,
                                "id": 518931,
                                "match_ids": [
                                    3718444
                                ],
                                "match_time": 1670958000,
                                "number": 1,
                                "parent_ids": [
                                    518933,
                                    518934
                                ],
                                "round_id": 95895,
                                "state_id": 1,
                                "type_id": 1,
                                "winner_team_id": 59348,
                                "home_name": "Winner QF2",
                                "away_name": "Winner QF1",
                                "home_country_logo": "",
                                "away_country_logo": ""
                            },
                            {
                                "away_score": 0,
                                "away_team_id": 59351,
                                "children_ids": [
                                    518929,
                                    518930
                                ],
                                "home_score": 0,
                                "home_team_id": 59350,
                                "id": 518932,
                                "match_ids": [
                                    3718445
                                ],
                                "match_time": 1671044400,
                                "number": 2,
                                "parent_ids": [
                                    518933,
                                    518934
                                ],
                                "round_id": 95895,
                                "state_id": 1,
                                "type_id": 1,
                                "winner_team_id": 59351,
                                "home_name": "Winner QF4",
                                "away_name": "Winner QF3",
                                "home_country_logo": "",
                                "away_country_logo": ""
                            }
                        ]
                    },
                    {
                        "rounds": {
                            "bracket_id": 30908,
                            "end_time": 1671375600,
                            "group_id": 31280,
                            "id": 95896,
                            "name": "Final",
                            "number": 4,
                            "short_name": "F",
                            "start_time": 1671375600
                        },
                        "matchUps": [
                            {
                                "away_score": 0,
                                "away_team_id": 59353,
                                "children_ids": [
                                    518931,
                                    518932
                                ],
                                "home_score": 0,
                                "home_team_id": 59352,
                                "id": 518933,
                                "match_ids": [
                                    3718447
                                ],
                                "match_time": 1671375600,
                                "number": 1,
                                "parent_ids": [],
                                "round_id": 95896,
                                "state_id": 1,
                                "type_id": 1,
                                "winner_team_id": 59352,
                                "home_name": "Winner SF1",
                                "away_name": "Winner SF2",
                                "home_country_logo": "",
                                "away_country_logo": ""
                            }
                        ]
                    },
                    {
                        "rounds": {
                            "bracket_id": 30908,
                            "end_time": 0,
                            "group_id": 31281,
                            "id": 95897,
                            "name": "Placement match for 3rd",
                            "number": 1,
                            "short_name": "3rd",
                            "start_time": 0
                        },
                        "matchUps": [
                            {
                                "away_score": 0,
                                "away_team_id": 61088,
                                "children_ids": [
                                    518931,
                                    518932
                                ],
                                "home_score": 0,
                                "home_team_id": 61087,
                                "id": 518934,
                                "match_ids": [
                                    3718446
                                ],
                                "match_time": 1671289200,
                                "number": 1,
                                "parent_ids": [],
                                "round_id": 95897,
                                "state_id": 2,
                                "type_id": 1,
                                "winner_team_id": 61088,
                                "home_name": "Loser SF1",
                                "away_name": "Loser SF2",
                                "home_country_logo": "",
                                "away_country_logo": ""
                            }
                        ]
                    }
                ]
            },
            "message": ""
        }
        console.log(params, "pppppoooo");

        let newdata = params.data.tables
        let onelist = []
        let twolist = []

        for (let i = 0; i < newdata.length; i++) {
            let num
            if (newdata[i].matchUps.length > 1) {
                num = newdata[i].matchUps.length / 2
                onelist.push(newdata[i].matchUps.slice(0, num))

                twolist.push(newdata[i].matchUps.slice(num, newdata[i].matchUps.length))

            }
            if (i == newdata.length - 1) {
                twolist.push(newdata[i].matchUps)

            }
            if (i == newdata.length - 2) {
                onelist.push(newdata[i].matchUps)

            }





            // if (i == 0) {

            //     onelist.push(newdata[i].matchUps.slice(0, 4))

            //     twolist.push(newdata[i].matchUps.slice(4, 8))

            //     console.log(onelist);
            // } else if (i == 1) {
            //     onelist.push(newdata[i].matchUps.slice(0, 2))

            //     twolist.push(newdata[i].matchUps.slice(2, 4))
            // }
            // else if (i == 2) {
            //     onelist.push(newdata[i].matchUps[0])

            //     twolist.push(newdata[i].matchUps[1])
            // }
            // else if (i == 3) {
            //     onelist.push(newdata[i].matchUps)

            //     twolist.push(newdata[i].matchUps)
            // } else {
            //     onelist.push(newdata[i].matchUps)

            //     twolist.push(newdata[i].matchUps)
            // }

        }

        let obj = {
            onelist,
            twolist
        }
        console.log(onelist, "999999", twolist, "oooooo");

        setEliminateList(obj)

    }

    const goRule = () => {
        history.push(`/zh/rule`, {
            title: "世界杯赛制说明",
            url: `${window.publicPath}worldcup_rules.html`
        })
    }
    useEffect(() => {
        // getGroupList()
    }, [])
    return (
        <div className={styles.cap_list} >
            <div className={styles.tab_box}>
                <div className={styles.tab}>
                    <FBWorldCapTab mini={true} list={tab} defaultActiveKey={activeKey} onChange={onChangetab}></FBWorldCapTab>
                </div>
                <div style={{ color: "#848494" }} onClick={goRule}>赛制说明</div>


            </div>
            {activeKey == "0" ? <FBGroup groupList={grouList}></FBGroup> : ""}
            {activeKey == "1" ?
                <div>{
                    scoresList?.map((item, index: any) => {
                        return <div className={styles.title_left} key={item.team_id}>
                            <div className={styles.title_left_img}></div>
                            <div style={{ height: 10, width: "100%", background: "#F7F7F7" }}></div>

                            <Table data={item.all} group={item.groups - 1}></Table>
                        </div>
                    })}
                    <div style={{ height: 55 }}></div>
                </div>

                : ""}

            {activeKey == "2" ? <Eliminate eliminateList={eliminateList}></Eliminate> : ""}
        </div >
    )
}

export default Scheme