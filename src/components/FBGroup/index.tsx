import React from 'react'
import styles from './index.less'
import type { listprops, GroupListres } from '@/services/worldcup';
import moment from 'moment';
type Props = {
    groupList: GroupListres[]
}

const FBGroup = (props: Props) => {
    const { groupList } = props
    return (
        <div>
            {groupList?.map((item: GroupListres, index) => {
                return <div key={index}>
                    <div className={styles.title}>  {item.groupName}组</div>

                    <div>

                        {item?.match.map((items: listprops) => {
                            return <div className={styles.group_list} key={items.MatchId}>
                                <div style={{ color: "#848494" }}>
                                    {moment(items.MatchTime * 1000).format('MM-DD HH:mm')}</div>
                                <div className={styles.logo_name} style={{ justifyContent: "right" }}>
                                    {items.HomeTeam.name}</div>
                                <img style={{ width: 20, height: 20, marginRight: 5 }} src={items.HomeTeam.logo} alt="" />

                                <div>{items.StatusID > 1 ?
                                    <div>{items.HomeScores[0]}:{items.AwayScores[0]}</div> : <div>VS</div>
                                }</div>
                                <div className={styles.logo_name} >
                                    <img style={{ width: 20, height: 20, marginRight: 5 }} src={items.AwayTeam.logo} alt="" />
                                    {items.AwayTeam.name}</div>

                            </div>
                        })
                        }</div>


                </div>
            })}
            <div style={{ height: 55 }}>

            </div>
        </div>
    )
}

export default FBGroup