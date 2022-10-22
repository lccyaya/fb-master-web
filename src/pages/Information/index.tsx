import React, { useEffect, useState, } from 'react'
import Banner from "@/components/FBInformationBanner"
import FBTitle from "@/components/FBTitle"
import FBInformationList from "@/components/FBInformationList"
// import FBInformationImg from "@/components/FBInformationImg"
// import ShowMoreImg from "./ShowMoreImg"
// import ShowOnlyImg from "./ShowOnlyImg"
import { InfiniteScroll } from 'antd-mobile';
import { Spin } from 'antd';
import { fetchHotNewsList, fetchNewsList } from '@/services/news';
import type { News } from '@/services/news';
import { useInfiniteScroll } from 'ahooks';
import styles from "./index.less"

type Props = {}

const Information = (props: Props) => {
    const [informationlist, setInformationlist] = useState([])

    const getFetchNewsList = async (page: number, size: number): Promise<any> => {
        let data: any = {
            page,
            size,
        }
        const result: any = await fetchNewsList(data);
        if (result.success == true) {

            return {
                list: result.data.news,
                total: result.data.total,
                page: page + 1,
            };
        }

    }
    const GetFetchHot = async () => {
        const result: any = await fetchHotNewsList();
        if (result.success == true) {
            setInformationlist(result.data)
        }

    }
    useEffect(() => {
        GetFetchHot()
        reload()
    }, []);
    const { data = () => { }, loading, loadMoreAsync, reload, noMore } = useInfiniteScroll(
        (d) => {

            const { page = 1 } = d || {};
            return getFetchNewsList(page, 10);
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

    return (
        <div>
            <div className={styles.main} >
                {/* 轮播图 */}
                <Banner className={styles.information_banner} />
                {informationlist.length ? <FBTitle title="热门资讯" /> : ""}
                {/* 列表 */}
                <div className={styles.conent} >
                    {informationlist.map((item: any, index) => {
                        return <FBInformationList showLine={index !== informationlist.length - 1} informationList={item} key={item.ID} id={item.ID} />
                    })}

                </div>
                <FBTitle title="最新资讯" />
                {/* 列表 */}
                <div className={styles.conent} >
                    <Spin spinning={loading}>
                        <div className={styles.content}>
                            {data?.list?.map((item: any, index: number) => {
                                return <FBInformationList showLine={index !== data.length - 1} informationList={item} key={item.ID} id={item.ID} />
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
        </div>
    )
}
export default Information