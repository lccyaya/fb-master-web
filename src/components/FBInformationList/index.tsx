import React from 'react'
import { useHistory } from 'umi';
import styles from './index.less';
import { formatNumber } from "@/utils/peoplenum"
import { rangeDateNum } from "@/utils/rangeDateNum"

import moment from 'moment';


interface informationList {
  ID: number
  title: string;
  nickname: string
  cover_img_url: string
  visit: string
  avatar: string
}

type Informationlist = {
  id: number
  showLine?: boolean
  informationList: informationList
}

const FBInformationList: React.FC<Informationlist> = (props: Informationlist) => {



  const history = useHistory()
  const { informationList } = props


  // 跳转详情
  const getdetail = () => {
    history.push(`/zh/informationdetail/${props.id}`)
  }
  return (
    <div className={styles.main} onClick={getdetail}>
      <div className={props.showLine ? styles.minMain : styles.isShowLine} >
        <div style={{ marginRight: 12 }} className={styles.leftText} >
          {informationList?.title}
          <div className={styles.minText}>


            <div className={styles.avatar}>
              <img style={{ width: 15, height: 15, marginRight: 7 }} src={informationList?.avatar} alt="" />
              <span style={{ marginRight: 12 }}> {informationList?.nickname}</span>
              <span>{formatNumber(informationList?.visit)}人阅</span></div>
            <div>{

              rangeDateNum(moment(informationList?.source_published_at).format('YYYY-MM-DD'))

              // ((new Date().getTime() - new Date(moment(informationList?.source_published_at).format('YYYY-MM-DD')).getTime()) / (1000 * 3600 * 24)).toFixed(0)

            }

            </div>
          </div>
        </div>
        <div className={styles.rightImg}>
          <img style={{ width: "100%", height: "100%" }} src={informationList?.cover_img_url} />
        </div>
      </div>
    </div>
  )
}

export default FBInformationList