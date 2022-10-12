import React from 'react'
import { useHistory } from 'umi';
import styles from './index.less';
import { formatNumber } from "@/utils/peoplenum"
import { formatTime } from '@/utils/utils';
import Empty from '@/components/Empty';

// import moment from 'moment';


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
            <div>
              {/* {formatTime(informationList?.source_published_at)} */}

              {informationList?.published_at ? `${formatTime(informationList?.published_at)}发布` : ''}

            </div>
          </div>
        </div>
        <div className={styles.rightImg}>
          <img style={{ width: "100%", height: "100%", borderRadius: 4 }} src={informationList?.cover_img_url} />
        </div>
      </div>
    </div>
  )
}

export default FBInformationList