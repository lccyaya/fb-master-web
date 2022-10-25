// import React, { useState } from 'react'
// import FBWorldCapTab from "@/components/FBWordCopTab"
// import FBHotSchemeItem from "@/components/FBHotSchemeItem"
// import { FormattedMessage } from 'umi';
// import styles from "./index.less"
// type Props = {}
// const Scheme = (props: Props) => {
//     const [activeKey, setActiveKey] = useState("key_wordcap_hit")
//     const tab = [{
//         title: <FormattedMessage id={'key_wordcap_hit'} />,
//         key: "key_wordcap_hit",
//     }, {
//         title: <FormattedMessage id={'key_wordcap_winhit'} />,
//         key: "key_wordcap_winhit",
//     }, {
//         title: <FormattedMessage id={'key_wordcap_free'} />,
//         key: "key_wordcap_free",
//     },

//     ]
//     const informationlist = [{
//         nickname: "卡塔尔V",
//         published_at: "2022",
//         visit: "123",
//         hit_tag: "9",
//         continuous_tag: "5",
//         hit_rate: "79"
//     }, {
//         nickname: "卡塔尔",
//         published_at: "2022",
//         visit: "123",
//         hit_tag: "9",
//         continuous_tag: "5"
//     }, {
//         nickname: "卡塔尔",
//         published_at: "2022",
//         visit: "123"
//     }, {
//         nickname: "卡塔尔",
//         published_at: "2022",
//         visit: "123",
//         hit_tag: "7中5",
//         continuous_tag: "5"
//     }]
//     const onChangetab = (key: string) => {
//         // console.log(key, "ppooiuytre");
//         setActiveKey(key)
//     }

//     return (
//         <div className={styles.cap_list} >
//             <div style={{ width: "230px", margin: "10px 0" }}>
//                 <FBWorldCapTab mini={true} list={tab} defaultActiveKey={activeKey} onChange={onChangetab}></FBWorldCapTab>


//             </div>
//             {informationlist && informationlist.map((item, index) => {
//                 return <div style={{ margin: "10px 0 0 0" }} key={index}> <FBHotSchemeItem color="#7E1132" scheme={item} /></div>

//             })}

//         </div >
//     )
// }

// export default Scheme



import React, { useEffect, useState } from 'react'
import FBWorldCapTab from "@/components/FBWordCopTab"
import FBHotSchemeItem from "@/components/FBHotSchemeItem"
import { FreeSchemeList, WorldCapSchemeList } from "@/services/worldcap"
import { InfiniteScroll } from 'antd-mobile';
import { Spin } from 'antd';
import { useInfiniteScroll } from 'ahooks';
import { FormattedMessage } from 'umi';
import FreeSchimport from './freeschemelist';
import HitSchemList from './hitschemelist';
import styles from "./index.less"
type Props = {}
const Scheme = (props: Props) => {
    const [activeKey, setActiveKey] = useState("key_wordcap_hit")
    // const [freeSchemeList, setFreeSchemeList] = useState("key_wordcap_hit")
    const tab = [{
        title: <FormattedMessage id={'key_wordcap_hit'} />,
        key: "key_wordcap_hit",
    }, {
        title: <FormattedMessage id={'key_wordcap_winhit'} />,
        key: "key_wordcap_winhit",
    }, {
        title: <FormattedMessage id={'key_wordcap_free'} />,
        key: "key_wordcap_free",
    },

    ]
    // const getFreeSchemeList = async (page: number, size: number, play: number, tab: number): Promise<any> => {
    //     let data: any = {
    //         page,
    //         size,
    //         play,
    //         tab
    //     }
    //     const result: any = await FreeSchemeList(data);
    //     if (result.success == true) {

    //         return {
    //             list: result.data.list,
    //             total: result.data.total,
    //             page: page + 1,
    //         };
    //     }

    // }


    // const { data = () => { }, loading, loadMoreAsync, reload, noMore } = useInfiniteScroll(
    //     (d) => {

    //         const { page = 1 } = d || {};
    //         return getFreeSchemeList(page, 10, 0, 0);
    //     },
    //     {
    //         // target: ref,
    //         isNoMore: (data) => {
    //             if (!data?.list?.length) {
    //                 return true;
    //             }
    //             return data?.list?.length >= data?.total;

    //         },
    //         manual: true,
    //     }
    // );

    useEffect(() => {
        // reload()
    }, [])

    // console.log(freeSchemeList, "ooooo0000987yygv");

    // const informationlist = [{
    //     nickname: "卡塔尔V",
    //     published_at: "2022",
    //     visit: "123",
    //     hit_tag: "9",
    //     continuous_tag: "5",
    //     hit_rate: "79"
    // }, {
    //     nickname: "卡塔尔",
    //     published_at: "2022",
    //     visit: "123",
    //     hit_tag: "9",
    //     continuous_tag: "5"
    // }, {
    //     nickname: "卡塔尔",
    //     published_at: "2022",
    //     visit: "123"
    // }, {
    //     nickname: "卡塔尔",
    //     published_at: "2022",
    //     visit: "123",
    //     hit_tag: "7中5",
    //     continuous_tag: "5"
    // }]
    const onChangetab = (key: string) => {
        // console.log(key, "ppooiuytre");
        setActiveKey(key)
    }

    return (
        <div className={styles.cap_list} >
            <div style={{ width: "230px", margin: "10px 0" }}>
                <FBWorldCapTab mini={true} list={tab} defaultActiveKey={activeKey} onChange={onChangetab}></FBWorldCapTab>


            </div>
            {/* {data && data.list?.map((item, index) => {
                return <div style={{ margin: "10px 0 0 0" }} key={index}> <FBHotSchemeItem color="#7E1132" scheme={item} /></div>

            })} */}
            {activeKey == "key_wordcap_hit" ? < HitSchemList activeKey={activeKey}></HitSchemList> : ""}
            {activeKey == "key_wordcap_winhit" ? < HitSchemList activeKey={activeKey}></HitSchemList> : ""}
            {activeKey == "key_wordcap_free" ? <FreeSchimport ></FreeSchimport> : ""}

            {/* <Spin spinning={loading}>
                <div className={styles.content}>
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
            </Spin> */}

        </div >
    )
}

export default Scheme
