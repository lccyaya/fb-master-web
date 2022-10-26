import React, { useEffect } from 'react'
import FBInformationList from "@/components/FBInformationList"
import styles from "./index.less"
import { AnalysisList } from '@/services/worldcup';
import { InfiniteScroll } from 'antd-mobile';
import { Spin } from 'antd';
import { useInfiniteScroll } from 'ahooks';
import { useHistory } from 'umi';
import Empty from '@/components/Empty';
import type { WordCapParams, Datares } from '@/services/worldcup';
type Props = {}

const Analysis = (props: Props) => {

    const history = useHistory()
    const getAnalysisList = async (page: number, size: number): Promise<any> => {
        let data: WordCapParams = {
            page,
            size,
            worldcup: true,
            type: 2
        }
        const result: Datares = await AnalysisList(data);
        if (result.success) {
            return {
                list: result.data.news,
                total: result.data.total,
                page: page + 1,
            };
        }

    }

    useEffect(() => {
        reload()
    }, [])

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
    return (
        <div className={styles.cap_list}>



            {data?.list ? <div>  <Spin spinning={loading}>
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
            </Spin></div> : <Empty />}


        </div>
    )
}

export default Analysis