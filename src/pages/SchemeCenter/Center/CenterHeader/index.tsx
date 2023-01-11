import { ConnectState } from '@/models/connect';
import { UserInfoType } from '@/services/user';
import { ExpertStatus } from '@/utils/scheme';
import React from 'react';
import { useSelector } from 'umi';
import styles from './index.less';
import avatarImg from '@/assets/mine/avatar.png';
import { Avatar, message } from 'antd';
import CopyToClipboard from 'react-copy-to-clipboard';
import Disstatus from "@/assets/mine/dis_status.png"

type Props = {};

const CenterHeader: React.FC<Props> = (props) => {
  const user = useSelector<ConnectState, UserInfoType | null | undefined>(
    (s) => s.user.currentUser,
  );
  const avatar = user?.expert?.status == ExpertStatus.Accept ? user?.expert?.avatar : user?.avatar;
  const nickname =
    user?.expert?.status == ExpertStatus.Accept ? user?.expert?.nickname : user?.nickname;

  return (
    <div className={styles.container}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Avatar src={avatar && avatar.length > 0 ? avatar : avatarImg} size={40} />
        <div style={{ fontSize: 13 }}>
          <span className={styles.nickname_title}>{nickname}</span>
          {user?.expert?.status == "4" && <div className={styles.dis_status}>
            <img src={Disstatus} alt="" />
            禁用</div>}
        </div>


      </div>
      <CopyToClipboard text="ty34sports" onCopy={() => message.success('已复制')}>
        <div className={styles.des_title}>
          如需修改专家信息， 请联系
          <br />
          客服微信：ty34sports<span className={styles.button}>复制</span>
        </div>
      </CopyToClipboard>
    </div>
  );
};

export default CenterHeader;
