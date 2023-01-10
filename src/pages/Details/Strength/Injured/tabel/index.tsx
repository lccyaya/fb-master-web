import React from 'react'
import { FormattedMessage } from 'umi';
import styles from './index.less';

type Props = {}

const Tabel = (props: Props) => {
    return (
        <div>
            <div className={styles.oddstype_main}>
                <div className={styles.oddstype_box}>
                    <div className={styles.oddstype_box_right}>
                        <div className={styles.oddstype_title} style={{ color: "#000028", fontWeight: 500 }}>皇马</div>
                        <div className={styles.oddstype}>
                            <div>
                                <FormattedMessage id="key_1x2" />
                            </div>
                            <div>
                                <FormattedMessage id="key_handicap" />
                            </div>
                            <div>
                                <FormattedMessage id="key_over_under" />
                            </div>
                        </div>
                    </div>
                    <div className={styles.oddstype_box_right}>
                        <div className={styles.oddstype_title}>
                            位置
                        </div>
                        <div className={styles.oddstype}>
                            <div>
                                <FormattedMessage id="key_1x2" />
                            </div>
                            <div>
                                <FormattedMessage id="key_handicap" />
                            </div>
                            <div>
                                <FormattedMessage id="key_over_under" />
                            </div>
                        </div>
                    </div>
                    <div className={styles.oddstype_box_right}>
                        <div className={styles.oddstype_title}>
                            原因
                        </div>
                        <div className={styles.oddstype} style={{ border: 'none' }}>
                            <div>
                                <FormattedMessage id="key_1x2" />
                            </div>
                            <div>
                                <FormattedMessage id="key_handicap" />
                            </div>
                            <div>
                                <FormattedMessage id="key_over_under" />
                            </div>
                        </div>
                    </div>
                    <div className={styles.oddstype_box_right}>
                        <div className={styles.oddstype_title}>
                            身价(欧)
                        </div>
                        <div className={styles.oddstype} style={{ border: 'none' }}>
                            <div>
                                <FormattedMessage id="key_1x2" />
                            </div>
                            <div>
                                <FormattedMessage id="key_handicap" />
                            </div>
                            <div>
                                <FormattedMessage id="key_over_under" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tabel