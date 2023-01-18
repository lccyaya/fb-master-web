import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'umi';
import styles from "./index.less"
import FBInformationList from '@/components/FBInformationList';
import { useHistory } from 'umi';
import { fetchHotNewsList } from '@/services/news';



type Props = {}

const InfoAbount = (props: Props) => {
    const history = useHistory();
    const [informationlist, setInformationlist] = useState([])

    const GetFetchHot = async () => {
        const result: any = await fetchHotNewsList();
        if (result.success == true) {
            setInformationlist(result.data);
        }
    };
    useEffect(() => {
        GetFetchHot();
    }, []);
    return (
        <div>
            <div className={styles.mobile_stat_title}>
                <div className={styles.mobile_stat_title_list}>
                    <div className={styles.title_logo} />
                    <FormattedMessage id="key_Now_info" />
                </div>

            </div>
            <div className={styles.info_about}>
                {informationlist?.map((item: any, index: number) => {
                    return (
                        <FBInformationList
                            onClick={() => {
                                history.push(`/zh/informationdetail/${item.ID}`);
                            }}
                            showLine={index !== informationlist.length - 1}
                            informationList={item}
                            key={item.ID}
                            id={item.ID}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default InfoAbount