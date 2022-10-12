import React, { useEffect, useState } from 'react'
import styles from "./index.less"
import { useHistory } from 'umi';
import { NavBar } from 'antd-mobile';
import { formatMatchTime } from '@/utils/utils';
import { informationDetail } from "@/services/information"
import { visitNews } from '@/services/news';
import type { InformationDetailData } from '@/services/information';

const Informationdetails = (props: any) => {

  // const [content, setContent] = useState("")
  const [detailData, setDetailData] = useState<InformationDetailData>()
  const history = useHistory();
  const { id } = props.match.params;

  useEffect(() => {

    console.log(props);
    visit()
    getInformationDetail()
  }, [])

  const visit = async () => {
    if (!id || Number.isNaN(id)) return;

    await visitNews(Number(id));

  };
  const getInformationDetail = async () => {
    let res = await informationDetail(id)
    if (res.success) {
      setDetailData(res.data)
    }
  }
  // 返回
  const back = () => {
    history.goBack();
  };
  return (
    <div >
      <NavBar onBack={back}>34体育</NavBar>
      <div className={styles.main} >
        <div>
          <div style={{
            fontSize: 20,
            color: "#000028",
            fontWeight: 500
          }}>{detailData?.title}</div>
        </div>
        <div className={styles.flex}>
          <div className={styles.avatarimg}>
            <img src={detailData?.avatar} style={{
              width: 30, height: 30,
              borderRadius: "50%",
              marginRight: 10
            }} alt="" />
            <div style={{ fontSize: 14 }}>{detailData?.nickname}</div>
          </div>

          <div className={styles.timeColor}>
            {formatMatchTime(detailData?.published_at)}
          </div>
        </div>
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: detailData?.content }} />
        <div className={styles.nomore}>
          没有更多了
        </div>
      </div>
    </div >
  )
}

export default Informationdetails