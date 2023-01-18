import React from 'react';
import { FormattedMessage } from 'umi';
import styles from './index.less';
import Tabel from "./tabel"

type Props = {};

const Injured = (props: Props) => {
    return (
        <div>
            <div className={styles.mobile_stat_title}>
                <div className={styles.mobile_stat_title_list}>
                    <div className={styles.title_logo} />
                    <FormattedMessage id="key_Injured_defenseh" />
                </div>
            </div>
            <div>
                <Tabel />
                <Tabel />
            </div>

        </div>
    );
};

export default Injured;
