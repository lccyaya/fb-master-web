import React from 'react'
import { NavBar, Button } from 'antd-mobile';
import { useHistory } from 'umi';
import styles from './index.less'
type Props = {}

const About = (props: Props) => {

    const history = useHistory();
    const back = () => {
        history.goBack();
    };
    return (
        <div className={styles.main}>
            <NavBar onBack={back}>关于我们</NavBar>
            <div className={styles.aboutlogo}>
                <img src="https://ceshibucket1111.oss-cn-beijing.aliyuncs.com/1664275636422432109.png" alt="" />
                <div style={{ color: "#45494C", fontSize: 16 }}>当前版本v1.1</div>

            </div>

            <div className={styles.customesrvice} style={{ color: "#848494", fontSize: 14 }}>
                <Button style={{ width: 300, marginBottom: 10 }} color='primary'>微信客服</Button>
                长按可复制，向34客服说句话吧

                <div>客服时间: 工作日 10:00 - 19</div>
            </div>
        </div>
    )
}
export default About