import React from 'react'
import { FormattedMessage } from 'umi';
import styles from './index.less';

type Props = {}

const Tabel = (props: Props) => {
    return (
        <div>
            <div className={styles.oddstype_main}>
                <div className={styles.oddstype_box}>
                    <div className={styles.oddstype_box_right} style={{ width: "35%" }}>
                        <div className={styles.oddstype_title} style={{ color: "#000028", fontWeight: 500, textAlign: "left", padding: "0 10px" }}>皇马</div>
                        <div className={styles.oddstype}>
                            <div className={styles.oddstype_flex}>
                                <div className={styles.oddstype_img} >
                                    <img src="" alt="" />
                                </div>
                                <div>     理查尔里森</div>
                            </div>
                            <div className={styles.oddstype_flex}>
                                <div className={styles.oddstype_img} >
                                    <img src="" alt="" />
                                </div>
                                <div>理查尔</div>

                            </div>
                            <div className={styles.oddstype_flex}>
                                <div className={styles.oddstype_img} >
                                    <img src="" alt="" />
                                </div>
                                <div>理查尔里</div>

                            </div>
                        </div>
                    </div>
                    <div className={styles.oddstype_box_right} style={{ width: "15%" }}>
                        <div className={styles.oddstype_title}>
                            位置
                        </div>
                        <div className={styles.oddstype}>
                            <div>
                                前锋
                            </div>
                            <div>
                                后卫
                            </div>
                            <div>
                                守门员
                            </div>
                        </div>
                    </div>
                    <div className={styles.oddstype_box_right} style={{ width: "35%", }}>
                        <div className={styles.oddstype_title} style={{ textAlign: "left", }}>
                            原因
                        </div>
                        <div className={styles.oddstype} style={{ border: 'none' }}>
                            <div className={styles.oddstype_flex}>
                                <div className={styles.oddstype_img_logo} >
                                    <img src="" alt="" />
                                </div>
                                <div>小腿肌肉撕裂</div>
                            </div>
                            <div className={styles.oddstype_flex}>
                                <div className={styles.oddstype_img_logo} >
                                    <img src="" alt="" />
                                </div>
                                <div>小腿撕裂</div>

                            </div>
                            <div className={styles.oddstype_flex}>
                                <div className={styles.oddstype_img_logo} >
                                    <img src="" alt="" />
                                </div>
                                <div>小撕裂</div>

                            </div>
                        </div>
                    </div>
                    <div className={styles.oddstype_box_right} style={{ width: "15%" }}>
                        <div className={styles.oddstype_title} >
                            身价(欧)
                        </div>
                        <div className={styles.oddstype} style={{ border: 'none' }}>
                            <div>
                                100万
                            </div>
                            <div>
                                200万
                            </div>
                            <div>
                                300万
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tabel