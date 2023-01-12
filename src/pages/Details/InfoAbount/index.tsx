import React from 'react';
import { FormattedMessage } from 'umi';
import styles from "./index.less"
type Props = {}

const InfoAbount = (props: Props) => {
    return (
        <div>
            <div className={styles.mobile_stat_title}>
                <div className={styles.mobile_stat_title_list}>
                    <div className={styles.title_logo} />
                    <FormattedMessage id="key_Now_info" />
                </div>
            </div>

        </div>
    )
}

export default InfoAbount