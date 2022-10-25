import React, { useState, useEffect } from 'react'
import FBInformationList from "@/components/FBInformationList"
import FBTitle from "@/components/FBTitle"
import FBMajorMatchItem from "@/components/FBMajorMatchItem"
import styles from "./index.less"
import TitleLogo from "@/assets/worldcap/title_logo.png"
import IconFont from '@/components/IconFont';
import { getMajorData } from '@/services/home';
import { Swiper } from 'antd-mobile'
import { Spin } from 'antd';
import { useInfiniteScroll } from 'ahooks';
import { InfiniteScroll } from 'antd-mobile';
import { useHistory } from 'umi';
import type { majorMatchType } from '@/services/home';
import { AnalysisList } from '@/services/worldcap';



type Props = {}
const colors = ['#fff', '#fff', '#fff', '#fff']

const Focusing = (props: Props) => {
    const history = useHistory()
    const [bannerIndex, setBannerIndex] = useState(0)
    const [dataCard, setDataCard] = useState<majorMatchType[]>([]);
    // 左右滚动卡片
    const getData = async () => {
        const res: any = await getMajorData();
        if (res.success) {
            setDataCard(res.data.matches);
        }
    };

    // 上拉滚动
    const getAnalysisList = async (page: number, size: number): Promise<any> => {
        let data: any = {
            page,
            size,
            worldcup: true,
            // type: 2
        }
        const result: any = await AnalysisList(data);
        if (result.success == true) {

            return {
                list: result.data.news,
                total: result.data.total,
                page: page + 1,
            };
        }

    }

    useEffect(() => {
        getData();
        reload()
    }, []);
    const { data = () => { }, loading, loadMoreAsync, reload, noMore } = useInfiniteScroll(
        (d) => {

            const { page = 1 } = d || {};
            return getAnalysisList(page, 10);
        },
        {
            // target: ref,
            isNoMore: (data) => {
                if (!data?.list?.length) {
                    return true;
                }
                return data?.list?.length >= data?.total;

            },
            manual: true,
        }
    );
    // const verticalItems = colors.map((color, index) => (
    //     <Swiper.Item key={index} >
    //         <div className={styles.verticalContent} style={{ background: color, color: bannerIndex == index ? "#7E1132" : "rgba(126, 17, 50, 0.4)" }}>
    //             {index + "c***e 荣登 世界杯颜值榜 颜王"}
    //         </div>
    //     </Swiper.Item>
    // ))

    return (
        <div className={styles.cap_list}>
            <FBMajorMatchItem data={dataCard} borderColor="#7E1132" />
            {/* <div className={styles.vertical}>
                <IconFont type={'icon-tuiguang'} size={20} />
                <div style={{ width: 10 }}></div>


                <Swiper
                    onIndexChange={(index: number) => {
                        // console.log(index);
                        setBannerIndex(index)
                    }}
                    slideSize={80} stuckAtBoundary={false}
                    indicatorProps={{ color: "white" }} loop
                    autoplay
                    autoplayInterval={3000}
                    style={{ '--height': '35px' }}>
                    {verticalItems}
                </Swiper>



            </div> */}

            <div className={styles.conent} style={{ background: "#fff" }}>
                <div className={styles.title}>
                    <img className={styles.title_logo} src={TitleLogo} alt="" />

                    <FBTitle title="世界杯动态" />

                </div>
                <div>

                    <Spin spinning={loading}>
                        <div className={styles.content}>
                            {data?.list?.map((item: any, index: number) => {
                                return <div key={item.ID} style={{
                                    borderBottom: "1px solid #EEEEEE",

                                }}>
                                    <FBInformationList onClick={() => {
                                        history.push(`/zh/informationdetail/${item.ID}`)
                                    }} showLine={false} informationList={item} id={index} />

                                </div>
                            })}
                            <InfiniteScroll
                                loadMore={async (isRetry) => {
                                    await loadMoreAsync();
                                }}
                                hasMore={!noMore}
                            />
                        </div>
                    </Spin>
                </div>

            </div>
            {/* <div style={{ height: 40, fontSize: 14, textAlign: "center", color: "#848494" }}>
                没有更多了
            </div> */}
        </div>
    )
}

export default Focusing