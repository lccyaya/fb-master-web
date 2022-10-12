import React, { useEffect, useState } from 'react'
import Banner from "@/components/FBInformationBanner"
import FBTitle from "@/components/FBTitle"
import FBInformationList from "@/components/FBInformationList"
import FBInformationImg from "@/components/FBInformationImg"
import ShowMoreImg from "./ShowMoreImg"
import ShowOnlyImg from "./ShowOnlyImg"
import { InfiniteScroll } from 'antd-mobile';

import { fetchHotNewsList, fetchNewsList } from '@/services/news';
import { useInfiniteScroll } from 'ahooks';

// import { formatNumber } from "@/utils/peoplenum"

import styles from "./index.less"
type Props = {}
// type Getlist = {
//     list: any,
//     total:number,
//     page: number,
// }

const Information = (props: Props) => {
    const [informationlist, setInformationlist] = useState([])

    const [fetchNewsListState, setFetchNewsList] = useState([])

    const getFetchNewsList = async (page, size) => {
        let data: any = {
            page,
            size,
        }
        const result: any = await fetchNewsList(data);
        console.log(result, "00000011111111");
        if (result.success == true) {
            setFetchNewsList(result.data.news)
        }

    }
    const GetFetchHot = async () => {
        const result: any = await fetchHotNewsList();
        console.log(result, "000000");
        if (result.success == true) {
            setInformationlist(result.data)
        }

    }
    useEffect(() => {
        GetFetchHot()
        getFetchNewsList(1, 10)
    }, []);
    // const { data, loading, loadMore, noMore, loadMoreAsync, } = useInfiniteScroll(
    //     (data) => {
    //         getFetchNewsList(1, 10)
    //         console.log(data);

    //     },
    //     {

    //         isNoMore: (d) => d?.ID === undefined,
    //     },
    // );



    return (
        <div className={styles.main}>
            {/* 轮播图 */}
            <Banner className={styles.information_banner} />


            <FBTitle title="热门资讯" />
            {/* 列表 */}
            <div className={styles.conent} >
                {informationlist.map((item: any, index) => {
                    return <FBInformationList showLine={index !== informationlist.length - 1} informationList={item} key={item.ID} id={item.ID} />
                })}
                {/* <FBInformationImg title="wenben" content={<div><ShowMoreImg /></div>} />
                <FBInformationImg title="wenben" showLine={false} content={<div><ShowOnlyImg /></div>} /> */}
            </div>
            <FBTitle title="最新资讯" />
            {/* 列表 */}
            <div className={styles.conent} >
                {fetchNewsListState?.map((item: any, index) => {
                    return <FBInformationList showLine={index !== fetchNewsListState.length - 1} informationList={item} key={item.ID} id={item.ID} />
                })}

            </div>
            {/* <InfiniteScroll
                loadMore={async () => {
                    await loadMoreAsync();
                }}
                hasMore={!noMore}
            /> */}
            <div className={styles.nomore}>
                没有更多了
            </div>
        </div>

    )
}
export default Information