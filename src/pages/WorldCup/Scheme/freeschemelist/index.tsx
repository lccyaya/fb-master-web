import React, { useEffect } from 'react'
import { FreeSchemeList } from "@/services/worldcup"
import { InfiniteScroll } from 'antd-mobile';
import { useInfiniteScroll } from 'ahooks';
import FBHotSchemeItem from "@/components/FBHotSchemeItem"
import type { WordCapParams } from '@/services/worldcup';


import { Spin } from 'antd';
type Props = {}

const FreeSchemeListpage = (props: Props) => {
    const getFreeSchemeList = async (page: number, size: number, play: number, tab: number): Promise<any> => {
        let data: WordCapParams = {
            page,
            size,
            play,
            tab
        }
        const result: any = await FreeSchemeList(data);
        if (result.success == true) {

            return {
                list: result.data.list,
                total: result.data.total,
                page: page + 1,
            };
        }

    }


    const { data = () => { }, loading, loadMoreAsync, reload, noMore } = useInfiniteScroll(
        (d): any => {

            const { page = 1 } = d || {};
            return getFreeSchemeList(page, 10, 0, 0);
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

    useEffect(() => {
        reload()
    }, [])

    return (
        <div>
            <Spin spinning={loading}>
                <div>
                    {data?.list?.map((item: any, index: number) => {
                        return <div style={{ margin: "10px 0 0 0" }} key={index}> <FBHotSchemeItem color="#7E1132" scheme={item} /></div>
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
    )
}

export default FreeSchemeListpage