import React, { useEffect } from 'react'
import { HitSchemeList } from "@/services/worldcap"
import { InfiniteScroll } from 'antd-mobile';
import { useInfiniteScroll } from 'ahooks';
import FBHotSchemeItem from "@/components/FBHotSchemeItem"
import { Spin } from 'antd';
type Props = {
    activeKey: string
}

const FreeSchemeListpage = ({ activeKey }: Props) => {
    const getFreeSchemeList = async (page: number, size: number, play: number, tab: number, world_cup: number): Promise<any> => {
        let data: any = {
            page,
            size,
            play,
            tab,
            world_cup
        }
        const result: any = await HitSchemeList(data);
        if (result.success == true) {

            return {
                list: result.data.list,
                total: result.data.total,
                page: page + 1,
            };
        }

    }


    const { data = () => { }, loading, loadMoreAsync, reload, noMore } = useInfiniteScroll(
        (d) => {

            const { page = 1 } = d || {};
            console.log(activeKey, "pppppp");

            // if (activeKey = "key_wordcap_hit") {
            //     return getFreeSchemeList(page, 10, 0, 1, 1);
            // } else {

            // }
            let tab = activeKey == "key_wordcap_hit" ? 1 : 0
            return getFreeSchemeList(page, 10, 0, tab, 1);
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