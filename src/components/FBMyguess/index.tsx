import React from 'react'
import styles from './index.less'
import IconFont from '@/components/IconFont';
type Props = {
    myguesslist: any
}

const FBMyguess = (props: Props) => {
    const { myguesslist } = props
    return (
        <div className={styles.myguess}>
            <div className={styles.myguess_time}>{myguesslist.time}</div>
            <div className={styles.myguess_country}>
                <div style={{ display: "flex" }}>    <div>  {myguesslist.home}</div>
                    <IconFont className={styles.star} type="icon-VS" color='#7E1132' size={20} />
                    <div>  {myguesslist.away}</div></div>
                <div>{myguesslist.iswin}</div>
                <div className={styles.lost}>{myguesslist.lost}</div>
                <div className={styles.win}>{myguesslist.win}</div>
            </div>

        </div>
    )
}

export default FBMyguess