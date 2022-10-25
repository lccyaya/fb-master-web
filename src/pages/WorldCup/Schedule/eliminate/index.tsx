import React from 'react'
import styles from "./index.less"
import Zanwei from "@/assets/worldcap/Zanwei.png"
type Props = {
    eliminateList: any
}

const Eliminate = (props: Props) => {
    const { eliminateList } = props
    console.log(eliminateList, "ioioioioio");

    return (
        <div className={styles.box_main} >
            <div>
                <div className={styles.box_onetop}>

                    {eliminateList.onelist[0].map((item, index) => {
                        return <div key={index} className={styles.box_onetopflex}>
                            <div className={styles.box_top}>
                                <div className={styles.box_top_name}>
                                    {/* {item.away_name ? "A" : ""} */}
                                    {item.home_country_logo ? <img style={{ width: 30, height: 30 }} src={item.home_country_logo} alt="" /> : <img style={{ width: 30, height: 30 }} src={Zanwei} alt="" />}
                                    {/* <div> {item.home_name}</div> */}

                                </div>

                                <div>
                                    {item.home_score}/{item.away_score}
                                </div>
                                <div className={styles.box_top_name}>
                                    {item.away__country_logo ? <img style={{ width: 30, height: 30 }} src={item.away_country_logo} alt="" /> : <img style={{ width: 30, height: 30 }} src={Zanwei} alt="" />}
                                    {/* <div> {item.away_name}</div> */}
                                </div>
                            </div>
                            <div className={styles.name} style={{ height: 50 }}>
                                <div className={styles.stem_name}> {item.home_name}</div>
                                <div className={styles.stem_name}> {item.away_name}</div>
                            </div>
                            <div style={{ display: "flex", width: "50%" }}>
                                <div className={styles.box_top_line} style={{ borderColor: item.winner_team_id == item.home_team_id ? "#7E1132" : "" }}>


                                </div>
                                <div className={styles.box_top_rightline} style={{ borderColor: item.winner_team_id == item.away_team_id ? "#7E1132" : "" }}>


                                </div>
                            </div>


                            <div className={styles.box_top_shu} style={{ background: item.winner_team_id == item.home_team_id || item.winner_team_id == item.away_team_id ? "#7E1132" : "" }}></div>
                        </div>
                    })}


                </div>

                <div className={styles.box_onetop}>
                    {eliminateList.onelist[1].map((item, index) => {
                        return <div key={index} className={styles.box_twotopflex} >
                            <div className={styles.box_top}>
                                <div className={styles.box_toptwo_name}>

                                    {item.home_country_logo ? <img style={{ width: 30, height: 30 }} src={item.home_country_logo} alt="" /> : <img style={{ width: 30, height: 30 }} src={Zanwei} alt="" />}

                                </div>

                                <div style={{ width: "35%", textAlign: "center" }}>
                                    {item.home_score}/{item.away_score}
                                </div>
                                <div className={styles.box_toptwo_name}>
                                    {item.away_country_logo ? <img style={{ width: 30, height: 30 }} src={item.away_country_logo} alt="" /> : <img style={{ width: 30, height: 30 }} src={Zanwei} alt="" />}

                                </div>



                            </div>
                            <div className={styles.name}>
                                <div className={styles.stem_name}> {item.home_name}</div>
                                <div className={styles.stem_name}> {item.away_name}</div>
                            </div>
                            <div style={{ display: "flex", width: "50%" }}>
                                <div className={styles.box_top_line} style={{ borderColor: item.winner_team_id == item.home_team_id ? "#7E1132" : "" }}>


                                </div>
                                <div className={styles.box_top_rightline} style={{ borderColor: item.winner_team_id == item.away_team_id ? "#7E1132" : "" }}>


                                </div>
                            </div>
                            <div className={styles.box_top_shu} style={{ background: item.winner_team_id == item.home_team_id || item.winner_team_id == item.away_team_id ? "#7E1132" : "" }}></div>
                        </div>
                    })}


                </div>
                <div className={styles.box_onetop}>

                    {eliminateList.onelist[2].map((item, index) => {
                        return <div className={styles.box_threetopflex} >
                            <div className={styles.box_top}>
                                <div className={styles.box_toptwo_name}>

                                    {item.home_country_logo ? <img style={{ width: 30, height: 30 }} src={item.home_country_logo} alt="" /> : <img style={{ width: 30, height: 30 }} src={Zanwei} alt="" />}

                                </div>

                                <div style={{ width: "42%", textAlign: "center" }}>
                                    {item.home_score}/{item.away_score}
                                </div>
                                <div className={styles.box_toptwo_name}>
                                    {item.away_country_logo ? <img style={{ width: 30, height: 30 }} src={item.away_country_logo} alt="" /> : <img style={{ width: 30, height: 30 }} src={Zanwei} alt="" />}

                                </div>

                            </div>
                            <div className={styles.name} style={{ width: "69%" }}>
                                <div className={styles.stem_name}> {item.home_name}</div>
                                <div className={styles.stem_name}> {item.away_name}</div>
                            </div>
                            <div style={{ display: "flex", width: "50%" }}>
                                <div className={styles.box_top_line} style={{ height: 30, borderColor: item.winner_team_id == item.home_team_id ? "#7E1132" : "" }}>


                                </div>
                                <div className={styles.box_top_rightline} style={{ height: 30, borderColor: item.winner_team_id == item.away_team_id ? "#7E1132" : "" }}>


                                </div>
                            </div>
                            <div className={styles.box_top_shu} style={{ background: item.winner_team_id == item.home_team_id || item.winner_team_id == item.away_team_id ? "#7E1132" : "" }}></div>
                        </div>
                    })}
                </div>
                <div className={styles.box_onetop}>
                    {eliminateList.onelist[3].map((item, index) => {
                        return <div className={styles.box_threetopflex}  >

                            <div className={styles.box_top} >
                                <div className={styles.box_toptwo_name}>
                                    {item.home_country_logo ? <img style={{ width: 50, height: 50 }} src={item.home_country_logo} alt="" /> : <img style={{ width: 50, height: 50 }} src={Zanwei} alt="" />}


                                </div>

                                <div style={{ width: 130, textAlign: "center" }}>
                                    {item.home_score}-{item.away_score}
                                </div>
                                <div className={styles.box_toptwo_name}>
                                    {item.away_country_logo ? <img style={{ width: 50, height: 50 }} src={item.away_country_logo} alt="" /> : <img style={{ width: 50, height: 50 }} src={Zanwei} alt="" />}


                                </div>
                            </div>
                            <div className={styles.name} style={{ width: "60%" }}>
                                <div className={styles.stem_name}> {item.home_name}</div>
                                <div className={styles.stem_name}> {item.away_name}</div>
                            </div>
                        </div>

                    })}
                </div>
            </div>
            <div>
                <div className={styles.box_onetop}>
                    {eliminateList.twolist[eliminateList.twolist.length - 1].map((item) => {
                        return <div className={styles.box_threetopflex} >

                            <div style={{
                                width: "70%",
                                backgroundColor: "#F7F7F7",
                                borderRadius: 6
                            }}>
                                <div className={styles.box_top} >
                                    <div className={styles.box_toptwo_name}>
                                        {item.home_country_logo ? <img style={{ width: 50, height: 50 }} src={item.home_country_logo} alt="" /> : <img style={{ width: 50, height: 50 }} src={Zanwei} alt="" />}
                                    </div>
                                    <div style={{ width: 130, textAlign: "center" }}>
                                        {item.home_score}-{item.away_score}
                                    </div>
                                    <div className={styles.box_toptwo_name}>
                                        {item.away_country_logo ? <img style={{ width: 50, height: 50 }} src={item.away_country_logo} alt="" /> : <img style={{ width: 50, height: 50 }} src={Zanwei} alt="" />}
                                    </div>
                                </div>


                            </div>
                            <div className={styles.name} style={{ width: "60%" }}>
                                <div className={styles.stem_name}> {item.home_name}</div>
                                <div className={styles.stem_name}> {item.away_name}</div>
                            </div>

                        </div>

                    })}
                </div>
                <div className={styles.box_onetop}>
                    {eliminateList.twolist[eliminateList.twolist.length - 2].map((item) => {
                        return <div className={styles.box_threetopflex} >
                            <div className={styles.box_top_shu} style={{ background: item.winner_team_id == item.home_team_id || item.winner_team_id == item.away_team_id ? "#7E1132" : "" }}></div>

                            <div style={{ display: "flex", width: "50%", }}>
                                <div className={styles.box_bottom_line} style={{ height: 30, borderColor: item.winner_team_id == item.home_team_id ? "#7E1132" : "" }}>
                                </div>
                                <div className={styles.box_bottom_rightline} style={{ height: 30, borderColor: item.winner_team_id == item.away_team_id ? "#7E1132" : "" }}>
                                </div>
                            </div>
                            <div className={styles.box_top}>
                                <div className={styles.box_toptwo_name}>
                                    {item.home_country_logo ? <img style={{ width: 30, height: 30 }} src={item.home_country_logo} alt="" /> : <img style={{ width: 30, height: 30 }} src={Zanwei} alt="" />}
                                </div>
                                <div style={{ width: "42%", textAlign: "center" }}>
                                    {item.home_score}/{item.away_score}
                                </div>
                                <div className={styles.box_toptwo_name}>

                                    {item.away_country_logo ? <img style={{ width: 30, height: 30 }} src={item.away_country_logo} alt="" /> : <img style={{ width: 30, height: 30 }} src={Zanwei} alt="" />}


                                </div>
                            </div>
                            <div className={styles.name} style={{ width: "66%" }}>
                                <div className={styles.stem_name}> {item.home_name}</div>
                                <div className={styles.stem_name}> {item.away_name}</div>
                            </div>
                        </div>
                    })}
                </div>
                <div className={styles.box_onetop}>
                    {eliminateList.twolist[1].map((item, index) => {
                        return <div key={index} className={styles.box_twotopflex} >
                            <div className={styles.box_top_shu} style={{ background: item.winner_team_id == item.home_team_id || item.winner_team_id == item.away_team_id ? "#7E1132" : "" }}></div>
                            <div style={{ display: "flex", width: "50%" }}>
                                <div className={styles.box_bottom_line} style={{ borderColor: item.winner_team_id == item.home_team_id ? "#7E1132" : "" }}>
                                </div>
                                <div className={styles.box_bottom_rightline} style={{ borderColor: item.winner_team_id == item.away_team_id ? "#7E1132" : "" }}>
                                </div>
                            </div>
                            <div className={styles.box_top}>
                                <div className={styles.box_toptwo_name}>
                                    {item.home_country_logo ? <img style={{ width: 30, height: 30 }} src={item.home_country_logo} alt="" /> : <img style={{ width: 30, height: 30 }} src={Zanwei} alt="" />}

                                </div>
                                <div style={{ width: "35%", textAlign: "center" }}>
                                    {item.home_score}/{item.away_score}
                                </div>
                                <div className={styles.box_toptwo_name}>
                                    {item.away_country_logo ? <img style={{ width: 30, height: 30 }} src={item.away_country_logo} alt="" /> : <img style={{ width: 30, height: 30 }} src={Zanwei} alt="" />}
                                </div>
                            </div>
                            <div className={styles.name} >
                                <div className={styles.stem_name}> {item.home_name}</div>
                                <div className={styles.stem_name}> {item.away_name}</div>
                            </div>
                        </div>
                    })}
                </div>
                <div className={styles.box_onetop}>
                    {eliminateList.twolist[0].map((item, index) => {
                        return <div key={index} className={styles.box_onetopflex}>
                            <div className={styles.box_top_shu} style={{ background: item.winner_team_id == item.home_team_id || item.winner_team_id == item.away_team_id ? "#7E1132" : "" }}></div>
                            <div style={{ display: "flex", width: "50%" }}>
                                <div className={styles.box_bottom_line} style={{ borderColor: item.winner_team_id == item.home_team_id ? "#7E1132" : "" }}>
                                </div>
                                <div className={styles.box_bottom_rightline} style={{ borderColor: item.winner_team_id == item.away_team_id ? "#7E1132" : "" }}>
                                </div>
                            </div>
                            <div className={styles.box_top}>
                                <div className={styles.box_top_name}>
                                    {item.home_country_logo ? <img style={{ width: 30, height: 30 }} src={item.home_country_logo} alt="" /> : <img style={{ width: 30, height: 30 }} src={Zanwei} alt="" />}
                                </div>

                                <div>
                                    {item.home_score}/{item.away_score}
                                </div>
                                <div className={styles.box_top_name}>
                                    {item.away_country_logo ? <img style={{ width: 30, height: 30 }} src={item.away_country_logo} alt="" /> : <img style={{ width: 30, height: 30 }} src={Zanwei} alt="" />}
                                </div>
                            </div>
                            <div className={styles.name} style={{ height: 50 }}>
                                <div className={styles.stem_name}> {item.home_name}</div>
                                <div className={styles.stem_name}> {item.away_name}</div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
            <div style={{ height: 55 }}></div>
        </div>
    )
}

export default Eliminate