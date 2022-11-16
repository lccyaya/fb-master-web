import FeedBack from '@/components/FeedBack/mobile';
import PopupLogin from '@/components/PopupLogin';
import type { ConnectState } from '@/models/connect';
import type { UserInfoType } from '@/services/user';
import { ExpertStatus } from '@/utils/scheme';
// import { Avatar, Button, Card } from 'antd';
import { Dialog } from 'antd-mobile';
import React, { useEffect, useState } from 'react';
import { useHistory, useSelector } from 'umi';
import styles from './index.less';
import UserInfo from './UserInfo';
import MainCorldCup from '@/assets/worldcup/mine_world_cup.png';
import { GuessEntry } from '@/services/worldcup';
type Props = {};

const Mine: React.FC<Props> = (props) => {
  const user = useSelector<ConnectState, UserInfoType | null | undefined>(
    (s) => s.user.currentUser,
  );
  const history = useHistory();
  const [visible, setVisible] = useState(false);

  const [guessEntryState, setGuessEntry] = useState(false);

  const handleAuthName = () => {
    history.push('/zh/certification');
  };

  const applicateExpert = () => {
    if (user) {
      if (!user?.user_info?.is_real) {
        Dialog.confirm({
          title: '实名认证',
          content: '您还未完成实名认证，请先进行认证！',
          confirmText: '去认证',
          cancelText: <span className={styles.cancelStyle}>取消</span>,
          onConfirm: handleAuthName,
        });
      } else {
        history.push('/zh/expert/application');
      }
    }
  };
  const getGuessEntry = async (): Promise<any> => {
    const result: any = await GuessEntry();
    if (result.data.status == 1) {
      setGuessEntry(true);
    } else {
      setGuessEntry(false);
    }
  };
  useEffect(() => {
    getGuessEntry();
  }, []);

  const toOrders = () => {
    history.push('/zh/myorders');
  };
  const openFeedback = () => {
    setVisible(true);
  };
  const openSetting = () => {
    history.push('/zh/settings');
  };
  const openCoupon = () => {
    history.push('/zh/account/coupon');
  };
  const openRecharge = () => {
    history.push('/zh/account/recharge');
  };
  const openFollow = () => {
    history.push('/zh/account/follow');
  };
  const openExpertFocus = () => {
    history.push('/zh/expert/rank');
  };
  const openSubMatch = () => {
    history.push('/zh/match');
  };
  const openSchemeCenter = () => {
    history.push('/zh/profile/center');
  };
  const goGuessEntry = () => {
    history.push('/zh/worldcup_guess');
  };

  return (
    <div className={styles.container}>
      <UserInfo style={{ padding: '10px 10px', zIndex: '3' }} />
      <div className={styles.followinfo_box}>
        <div className={styles.followitem_box} onClick={openExpertFocus}>
          <span className={styles.value_text}>{user?.followExpertNum ?? 0}</span>
          <span className={styles.des_text}>关注</span>
        </div>
        <div className={styles.followitem_box} onClick={openSubMatch}>
          <span className={styles.value_text}>{user?.subMatchNum ?? 0}</span>
          <span className={styles.des_text}>订阅</span>
        </div>
        <div className={styles.followitem_box} onClick={openFollow}>
          <span className={styles.value_text}>{user?.favorite ?? 0}</span>
          <span className={styles.des_text}>收藏</span>
        </div>
      </div>
      <div className={styles.beaninfo_box}>
        <div className={styles.beaninfo_card}>
          <PopupLogin onLogin={openRecharge}>
            <div className={styles.beanitem_box}>
              <span className={styles.des_text}>金豆</span>
              <span className={styles.value_text}>{user?.coin ?? 0}</span>
              <div className={styles.button}>充值</div>
            </div>
          </PopupLogin>
          {/* <div className={styles.beanitem_box}>
            <span className={styles.des_text}>积分</span>
            <span className={styles.value_text}>0</span>
            <div className={styles.button}>赚积分</div>
          </div> */}
          <PopupLogin onLogin={openCoupon}>
            <div className={styles.beanitem_box}>
              <span className={styles.des_text}>卡券</span>
              <span className={styles.value_text}>{user?.coupon ?? 0}</span>
              <div className={styles.button}>领取</div>
            </div>
          </PopupLogin>
        </div>
        <div className={styles.beanfoot_bg}></div>
      </div>
      <div className={styles.actions_container}>
        <div className={styles.card}>
          <PopupLogin onLogin={toOrders}>
            <div className={styles.action_item}>
              <img className={styles.action_icon} src={require('@/assets/mine/yigou.png')} alt="" />
              <span className={styles.action_title}>已购攻略</span>
            </div>
          </PopupLogin>
          {/* <div className={styles.action_item}>
            <img className={styles.action_icon} src={require('@/assets/mine/kefu.png')} alt="" />
            <span className={styles.action_title}>客服</span>
          </div> */}
          {/* <div className={styles.action_item}>
            <img className={styles.action_icon} src={require('@/assets/mine/changjianwenti.png')} alt="" />
            <span className={styles.action_title}>常见问题</span>
          </div> */}
          <div className={styles.action_item} onClick={openFeedback}>
            <img
              className={styles.action_icon}
              src={require('@/assets/mine/yijianfankui.png')}
              alt=""
            />
            <span className={styles.action_title}>意见反馈</span>
          </div>
          {/* <div className={styles.action_item}>
            <img className={styles.action_icon} src={require('@/assets/mine/yaoqinghaoyou.png')} alt="" />
            <span className={styles.action_title}>邀请好友</span>
          </div> */}
          <PopupLogin onLogin={applicateExpert}>
            <div className={styles.action_item}>
              <img
                className={styles.action_icon}
                src={require('@/assets/mine/shenqingzhuanjia.png')}
                alt=""
              />
              <span className={styles.action_title}>申请专家</span>
            </div>
          </PopupLogin>
          {user?.expert?.status == ExpertStatus.Accept ? (
            <PopupLogin onLogin={openSchemeCenter}>
              <div className={styles.action_item}>
                <img
                  className={styles.action_icon}
                  src={require('@/assets/mine/chuangzaozhongxin.png')}
                  alt=""
                />
                <span className={styles.action_title}>创作中心</span>
              </div>
            </PopupLogin>
          ) : null}
          <PopupLogin onLogin={openSetting}>
            <div className={styles.action_item}>
              <img
                className={styles.action_icon}
                src={require('@/assets/mine/shezhi.png')}
                alt=""
              />
              <span className={styles.action_title}>设置</span>
            </div>
          </PopupLogin>
        </div>
      </div>
      <FeedBack visible={visible} setVisible={setVisible} />
      {guessEntryState && (
        <div className={styles.main_cord_cup} onClick={goGuessEntry}>
          <img className={styles.main_cord_cup_img} src={MainCorldCup} alt="" />
        </div>
      )}
    </div>
  );
};

export default Mine;
