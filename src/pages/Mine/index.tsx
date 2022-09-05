import { ConnectState } from '@/models/connect';
import { UserInfoType } from '@/services/user';
import { ExpertStatus } from '@/utils/scheme';
import { Avatar, Button, Card } from 'antd';
import React from 'react';
import { useHistory, useSelector } from 'umi';
import styles from './index.less';
import UserInfo from "./UserInfo";

type Props = {};

const Mine: React.FC<Props> = (props) => {
  const user = useSelector<ConnectState, UserInfoType | null | undefined>(
    (s) => s.user.currentUser,
  );
  const history = useHistory();

  const applicateExpert = () => {
    if (user) {
      history.push('')
    }
  }

  return (
    <div style={{backgroundColor: '#F7FAFB'}}>
      <UserInfo style={{margin: '10px 10px'}} />
      <div className={styles.followinfo_box} >
        <div className={styles.followitem_box}>
          <span className={styles.value_text}>0</span>
          <span className={styles.des_text}>关注</span>
        </div>
        <div className={styles.followitem_box}>
          <span className={styles.value_text}>0</span>
          <span className={styles.des_text}>订阅</span>
        </div>
        <div className={styles.followitem_box}>
          <span className={styles.value_text}>0</span>
          <span className={styles.des_text}>最近浏览</span>
        </div>
      </div>
      <div className={styles.beaninfo_box}>
        <div className={styles.beaninfo_card}>
          <div className={styles.beanitem_box}>
            <span className={styles.des_text}>金豆</span>
            <span className={styles.value_text}>0</span>
            <div className={styles.button}>充值</div>
          </div>
          <div className={styles.beanitem_box}>
            <span className={styles.des_text}>积分</span>
            <span className={styles.value_text}>0</span>
            <div className={styles.button}>赚积分</div>
          </div>
          <div className={styles.beanitem_box}>
            <span className={styles.des_text}>卡券</span>
            <span className={styles.value_text}>0</span>
            <div className={styles.button}>领取</div>
          </div>
        </div>
        <div className={styles.beanfoot_bg}></div>
      </div>
      <div className={styles.actions_container}>
        <div className={styles.card}>
          <div className={styles.action_item}>
            <img className={styles.action_icon} src={require('@/assets/mine/yigou.png')} alt="" />
            <span className={styles.action_title}>已购攻略</span>
          </div>
          <div className={styles.action_item}>
            <img className={styles.action_icon} src={require('@/assets/mine/kefu.png')} alt="" />
            <span className={styles.action_title}>客服</span>
          </div>
          <div className={styles.action_item}>
            <img className={styles.action_icon} src={require('@/assets/mine/changjianwenti.png')} alt="" />
            <span className={styles.action_title}>常见问题</span>
          </div>
          <div className={styles.action_item}>
            <img className={styles.action_icon} src={require('@/assets/mine/yijianfankui.png')} alt="" />
            <span className={styles.action_title}>意见反馈</span>
          </div>
          <div className={styles.action_item}>
            <img className={styles.action_icon} src={require('@/assets/mine/yaoqinghaoyou.png')} alt="" />
            <span className={styles.action_title}>邀请好友</span>
          </div>
          <div className={styles.action_item} onClick={applicateExpert}>
            <img className={styles.action_icon} src={require('@/assets/mine/shenqingzhuanjia.png')} alt="" />
            <span className={styles.action_title}>申请专家</span>
          </div>
          <div className={styles.action_item}>
            <img className={styles.action_icon} src={require('@/assets/mine/chuangzaozhongxin.png')} alt="" />
            <span className={styles.action_title}>创造中心</span>
          </div>
          <div className={styles.action_item}>
            <img className={styles.action_icon} src={require('@/assets/mine/shimingrenzheng.png')} alt="" />
            <span className={styles.action_title}>实名认证</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mine;
