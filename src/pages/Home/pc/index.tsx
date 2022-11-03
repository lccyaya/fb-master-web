import Iconfont from '@/components/IconFont';
import { WechatOutlined, WeiboOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import styles from './index.module.less';
import classnames from 'classnames';

import androidQrcode from '@/assets/home/android_qrcode.png';
import iOSQrcode from '@/assets/home/ios_qrcode.png';
import appSnapshot from '@/assets/home/app_snapshot.png';
import app_des_icon01 from '@/assets/home/app_des_icon01.png';
import app_des_icon02 from '@/assets/home/app_des_icon02.png';
import app_des_icon03 from '@/assets/home/app_des_icon03.png';
import app_des_icon04 from '@/assets/home/app_des_icon04.png';
import { useEffect, useState } from 'react';
import pageConfig from '@/utils/pageConfig';
import { useLocation } from 'umi';

type HomeProps = {
  isPhone?: boolean;
  showTips?: boolean;
  hideLoading?: boolean;
};

enum APP_TYPE {
  android,
  iOS,
}

const NewHome: React.FC<HomeProps> = (props) => {
  const [appType, setAppType] = useState(APP_TYPE.android);
  const [icpnum, setIcpnum] = useState(2);

  const checkHost = () => {
    const reg01 = /34sport.net/;
    const reg02 = /gxxuancang.com/;
    if (reg01.test(window.location.host)) {
      setIcpnum(1);
    }
    if (reg02.test(window.location.host)) {
      setIcpnum(3);
    }
  }

  useEffect(() => {
    checkHost();
  },[]);
  return (
    <>
      <div>
        <div className={styles.top_container}>
          <div className={styles.app_container}>
            <span className={styles.top_des}>专注于赛前决策服务</span>
            <span className={styles.top_note}>所以等待 值得期待，世界杯该你上场啦 </span>
            <div className={styles.app_box}>
              <div className={styles.button_box}>
                <div
                  className={classnames(
                    styles.app_button,
                    appType == APP_TYPE.android ? styles.active : null,
                  )}
                  onClick={() => {
                    setAppType(APP_TYPE.android);
                  }}
                >
                  <Iconfont
                    type="icon-anzhuo"
                    color={appType == APP_TYPE.android ? '#050505' : '#E6E6E6'}
                    size={32}
                  />
                  <span className={styles.button_title}>Android 版</span>
                </div>
                <div
                  className={classnames(
                    styles.app_button,
                    appType == APP_TYPE.iOS ? styles.active : null,
                  )}
                  onClick={() => {
                    setAppType(APP_TYPE.iOS);
                  }}
                >
                  <Iconfont
                    type="icon-apple-fill"
                    color={appType == APP_TYPE.iOS ? '#050505' : '#E6E6E6'}
                    size={32}
                  />
                  <span className={styles.button_title}>iOS 版</span>
                </div>
              </div>
              <div>
                <img
                  className={styles.qrcode}
                  src={appType == APP_TYPE.android ? androidQrcode : iOSQrcode}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.middle_container}>
          {/* <span className={styles.middle_title}>34体育专注于赛前决策服务</span> */}
          {/* <div className={styles.first_box}>
            <div className={styles.first_des}>
              赛前实时情报资讯，包括球员伤停、更衣室氛围、首发阵容、战术打法特点等，让用户能够
              更加全面、有深度的分析比赛；
            </div>
          </div> */}
          {/* <div className={styles.second_box}>
            <div className={styles.second_left_box}>
              <div className={styles.des_box}>
                <span className={styles.second_title}>提供足球</span>
                <span className={styles.second_des}>即时比分直播</span>
              </div>
            </div>
            <div className={styles.second_right01_box}>
              <div className={styles.des_box}>
                <span className={styles.second_title}>国内知名赛事分析专家</span>
                <span className={styles.second_des}>提供多维度赛事攻略</span>
              </div>
            </div>
            <div className={styles.second_right02_box}>
              <div className={styles.des_box}>
                <span className={styles.second_title}>赛事资深达人</span>
                <span className={styles.second_des}>提供多维度赛事知识分享</span>
              </div>
            </div>
          </div>
          <div className={styles.third_box}>
            <div className={styles.third_des_box}>
              <span className={styles.third_title}>和 34SPORTS 一起</span>
              <span className={styles.third_des}>了解足彩与赛前决策服务文案占位</span>
            </div>
          </div> */}
          <div className={styles.des_container}>
            <div className={styles.des_box}>
              <div className={styles.des_title}>产品介绍</div>
              <div className={styles.text_box}>
                <img src={app_des_icon01} alt="" />
                <div className={styles.des_note}>
                  ·赛前实时情报资讯，包括球员伤停、更衣室氛围、首发阵容、战术打法特点等，让用户能够更加全面、有深度的分析比赛；
                </div>
              </div>
              <div className={styles.text_box}>
                <img src={app_des_icon02} alt="" />
                <div className={styles.des_note}>·提供足球即时比分直播；</div>
              </div>
              <div className={styles.text_box}>
                <img src={app_des_icon03} alt="" />
                <div className={styles.des_note}>·国内知名赛事分析专家提供多维度赛事攻略；</div>
              </div>
              <div className={styles.text_box}>
                <img src={app_des_icon04} alt="" />
                <div className={styles.des_note}>·赛事资深达人提供多维度赛事知识分享；</div>
              </div>
            </div>
            <div>
              <img className={styles.snapshot} src={appSnapshot} alt="" />
            </div>
          </div>
        </div>
        <div className={styles.footer_container}>
          <div className={styles.footer_box}>
            <div className={styles.about_box}>
              <div className={styles.about_left_box}>
                <span className={styles.box_title}>客服电话</span>
                <Iconfont type="icon-phone05" color="#ffffff" size={28} />
                <span className={styles.box_des}>18501989134</span>
              </div>
              <img className={styles.logo} src={pageConfig.logo_34sport_white} />
            </div>
            <div className={styles.copyright_box}>
              <div className={styles.copyright_left_box}>
                <span className={styles.copyright_title}>合作联系方式：hezuo@34sport.cn </span>
                <div className={styles.copyright_title}>
                  <a className={styles.copyright_title} target="_blank" href="https://beian.miit.gov.cn">桂ICP备2022008606号-{icpnum}</a> 营业执照代码：91450100MABU66J394
                </div>
              </div>
              <div className={styles.copyright_right_box}>
                <a className={styles.protocol_link} target="_blank" href="/terms-and-conditions.html">
                  用户协议
                </a>
                <a className={styles.protocol_link} target="_blank" href="/privacy.html">
                  隐私协议
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewHome;
