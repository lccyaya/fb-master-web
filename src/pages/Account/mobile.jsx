import React, { useState, useEffect } from 'react';
import Container from '@/components/Container';
import { Tabs, Avatar } from 'antd';
import { FormattedMessage, connect, history, useIntl } from 'umi';
import defaultAvatar from '@/assets/icon/avatar.svg';
import IconFont from '@/components/IconFont';

import Profile from './profile';
import Setting from './setting';
import MyTeam from './myTeam';
import MyCoupon from './mycoupon/mobile';
import Follow from './follow/mobile';
import MyOrder from './myorder/mobile';
import Recharge from './recharge/mobile';
import RechargeRecord from './rechargeRecord/mobile';
import WarnTip from '@/components/WarmTip/mobile';
import classnames from 'classnames';
import { useParams } from 'umi';
import styles from './mobile.module.less';
import { toShortLangCode, isForChina } from '@/utils/utils';
import { locale } from '@/app';

const { TabPane } = Tabs;

const Account = (props) => {
  const intl = useIntl();
  const { type } = useParams();
  const { currentUser } = props;
  const TAB_LIST = isForChina()
    ? {
        setting: intl.formatMessage({ id: 'key_setting' }),
        myteam: intl.formatMessage({ id: 'key_my_teams' }),
        recharge: '金币充值',
        'recharge-record': '交易记录',
        coupon: '我的卡券',
        myorder: '我的订单',
        follow: '我的收藏',
        profile: '个人中心',
      }
    : {
        setting: intl.formatMessage({ id: 'key_setting' }),
        myteam: intl.formatMessage({ id: 'key_my_teams' }),
        profile: intl.formatMessage({ id: 'key_profile' }),
      };
  return (
    <Container>
      <div className={styles.container}>
        <div
          className={styles.header}
          style={{ top: '48px', margin: '-18px -10px 16px', padding: '25px 10px 28px' }}
        >
          <Avatar className={styles.avatar} src={currentUser?.avatar || defaultAvatar} />
          <div className={styles.info}>
            <div className={styles.nicknameWrapper}>
              <span className={classnames(styles.nickname, styles.item)}>
                {currentUser?.nickname}
              </span>
              <span className={classnames(styles.item, styles.divide)}>/</span>
              <span className={classnames(styles.item, styles.type)}>{TAB_LIST[type]}</span>
            </div>
            <div className={styles.email}>{currentUser?.email || currentUser?.phone}</div>
          </div>
        </div>
        <div className={styles.body}>
          {isForChina() ? (
            <>
              {type === 'recharge' ? (
                <div className={styles.tabContent}>
                  <Recharge coin={currentUser?.coin || 0} />
                  <WarnTip className={styles.warn_tip} />
                </div>
              ) : null}
              {type === 'coupon' ? <MyCoupon /> : null}
              {type === 'myorder' ? <MyOrder /> : null}
              {type === 'follow' ? <Follow /> : null}
              {type === 'recharge-record' ? <RechargeRecord /> : null}
            </>
          ) : null}
          {type === 'myteam' ? <MyTeam /> : null}
          {type === 'profile' ? <Profile onSummit={(e) => console.log(e)} /> : null}
          {type === 'setting' ? <Setting /> : null}
        </div>
      </div>
    </Container>
  );
};

export default connect(({ user, loading }) => ({
  currentUser: user.currentUser,
  loading: loading.models.user,
}))(Account);
