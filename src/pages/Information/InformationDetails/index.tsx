import React, { useState } from 'react'
import styles from "./index.less"
import { useHistory } from 'umi';
import { NavBar } from 'antd-mobile';
import FBInformationList from "@/components/FBInformationList";
import FBTabs from "@/components/FBTabs"
import FBTitle from "@/components/FBTitle"
import FBInfomationDetailList from "@/components/FBInfomationDetailList"
import FBLeaveMessage from "@/components/FBLeaveMessage"

const Informationdetails = () => {
  const tabtitle = [
    { key: 1, title: "回复" }, {
      key: 2, title: "点赞"
    }, {
      key: 3, title: "收藏"
    }
  ]
  const [currentActiveKey, setCurrentActiveKey] = useState(1)


  const history = useHistory();
  // 返回
  const back = () => {
    history.goBack();
  };

  const content = `<p>西班牙皇家足协和西班牙职业足球联盟宣布，本轮西甲西乙剩余的全部比赛中，将在赛前为印尼爪哇岛中出现的球场暴力事件遇难者默哀一分钟。</p><p style=\"text-align:center;\"><img src=\"https://s.besget.com/dongtai/636255/o/ddfd3ede9fe6184e1c4cbc71cdf935ac.jpg\"/></p><p><strong>西甲第7轮剩余5场比赛：</strong></p><p>西班牙人vs瓦伦西亚;塞尔塔vs皇家贝蒂斯;吉罗纳vs皇家社会</p><p>皇马vs奥萨苏纳;巴列卡诺闪电vs埃尔切</p><p><strong>西乙第8轮剩余6场比赛：</strong></p><p>阿拉维斯vs庞费拉迪纳;莱加内斯vs阿尔瓦塞特;格拉纳达vs韦斯卡</p><p>皇家奥维耶多vs卡塔赫纳;伊比萨vs卢戈;皇家萨拉戈萨vs埃瓦尔</p>`
  const newcontent = content.replaceAll("<p><strong>", "<p style=\"font-size:20px;\"><strong>").replaceAll("<img", "<img style=\"width:100%;height:100%;\"")

  console.log(newcontent, "pppppppp");
  // tab切换⌚️
  const changeTab = (key: number): void => {
    setCurrentActiveKey(key)
  }

  // 点赞⌚️事件
  const onClickLove = (islove: boolean): void => {
    console.log(islove);

  }
  // onClickMoreActions
  const onClickMoreActions = (): void => {
    console.log("三个点");

  }

  return (
    <div >

      <NavBar onBack={back}>34体育</NavBar>
      <div className={styles.main} >
        <div style={{ fontSize: 16 }} dangerouslySetInnerHTML={{ __html: newcontent }} />
      </div>
      <div style={{ padding: 12, background: "#F7F7F7" }}>
        <FBTitle title="最新资讯" />
        <div style={{ borderRadius: 7, background: "#fff" }} >  <FBInformationList id={1} /></div>

        {/* 切换栏 */}
        <div style={{ width: "160px" }}>  <FBTabs items={tabtitle} activeKey={currentActiveKey}
          onChange={changeTab}
          selectStyle={{ color: "#000028", fontSize: 18 }} normalStyle={{ color: "#848494", fontSize: 18 }} />
        </div>
        <FBInfomationDetailList onClickLove={onClickLove} onClickMoreActions={onClickMoreActions} />
      </div>
      <FBLeaveMessage />
    </div >
  )
}

export default Informationdetails