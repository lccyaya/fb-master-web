import React, { useState } from 'react'
import { useHistory } from 'umi';
import styles from './index.less';

interface DetailData {
  id: number;
  avatar: string;
  name: string;
  time: string;
  lovenum: number;
  content: string;
  islove: boolean
}

type DetailDataProps = {
  isShowLine?: boolean
  detaidata?: DetailData
  onClickLove?: Function
  onClickMoreActions?: Function
}

const FBInfomationDetailList: React.FC<DetailDataProps> = (props: DetailDataProps) => {
  const [islove, setIslove] = useState(false)
  const { onClickLove = () => { }, onClickMoreActions = () => { } } = props

  return (
    <div className={styles.main}>
      <div className={styles.avatar}>
        <div className={styles.avatarflex}>
          <div className={styles.avatarimg}> 头像</div>
          <div>
            <div>小贾</div>
            <div style={{ color: "#848494", fontSize: 15 }}>22天</div>
          </div>
        </div>
        <div onClick={() => {
          onClickMoreActions()
        }}>...</div>
      </div>

      <div>文字</div>
      <div className={styles.love} >
        <div onClick={() => {
          setIslove(!islove)
          onClickLove(islove)
        }}>
          <span> {
            islove ? "已点赞小手" : "未点赞"
          }
          </span>

        </div>
        <div style={{ fontSize: 12, marginLeft: 5 }}>

          12
        </div>
      </div>
    </div>
  )
}

export default FBInfomationDetailList