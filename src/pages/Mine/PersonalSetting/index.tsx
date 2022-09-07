import IconFont from '@/components/IconFont';
import { ConnectState } from '@/models/connect';
import { UserInfoType } from '@/services/user';
import { ExpertStatus } from '@/utils/scheme';
import { NavBar } from 'antd-mobile';
import React from 'react';
import { useHistory, useSelector } from 'umi';
import styles from './index.less';
import avatarImg from '@/assets/mine/avatar.png';
import { Avatar } from 'antd';

type Props = {};

const PersonalSetting: React.FC<Props> = (props) => {
  const user = useSelector<ConnectState, UserInfoType | null | undefined>(
    (s) => s.user.currentUser,
  );
  const history = useHistory();
  const avatar = user?.expert?.status == ExpertStatus.Accept ? user?.expert?.avatar : user?.avatar;
  const nickname = user?.expert.status == ExpertStatus.Accept ? user?.expert?.nickname : user?.nickname;

  const settingItems = [
    {
      title: '头像',
      key: 'avatar',
    },
    {
      title: '用户名',
      key: 'nickname',
    },
  ];

  const back = () => {
    history.goBack();
  };

  return (
    <div className={styles.container}>
      <NavBar className={styles.navbar} onBack={back}>
        个人设置
      </NavBar>
      <div className={styles.items_container}>
        {settingItems.map((settingItem) => (
          <div className={styles.item_box} key={settingItem.key}>
            <div className={styles.item_content}>
              <div className={styles.item_title}>{settingItem.title}</div>
              {settingItem.key == 'avatar' ? (
                <Avatar src={avatar && avatar.length > 0 ? avatar : avatarImg} size={40} />
              ) : <div className={styles.nickname}>nickname</div>}
            </div>
            <IconFont
              className={styles.arrow_icon}
              type="icon-jiantouyou"
              color="#BBBBBB"
              size={14}
            ></IconFont>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalSetting;
