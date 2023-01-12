import { ConnectState } from '@/models/connect';
import { UserInfoType } from '@/services/user';
import { ExpertStatus } from '@/utils/scheme';
import { Avatar, Button, Form, Input, message, Spin, Upload } from 'antd';
import { Image, NavBar } from 'antd-mobile';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useSelector } from 'umi';
import ApplicationSteps from './ApplicationSteps';
import styles from './index.less';
import Applying from './Applying';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Disuser from "@/assets/mine/dis_user.png"
import useWindowSize from '@/hooks/useWindowSize';



type Props = {};

const ExpertApplication: React.FC<Props> = (props) => {
  const user = useSelector<ConnectState, UserInfoType | null | undefined>(
    (s) => s.user.currentUser,
  );
  const history = useHistory();
  const [status, setStatus] = useState(user?.expert?.status ?? ExpertStatus.None);
  const { height } = useWindowSize();

  const back = () => {
    history.goBack();
  };
  // const avatar = user?.expert?.status == ExpertStatus.Accept ? user?.expert?.avatar : user?.avatar;

  useEffect(() => {
    const status = user?.expert?.status ?? ExpertStatus.None;
    setStatus(status);
  }, [user]);

  const reapply = () => {
    setStatus(ExpertStatus.None);
  };

  return (
    <div className={styles.container} style={{ height: height }}>
      <NavBar className={styles.navbar} onBack={back}>
        申请专家
      </NavBar>
      <div className={styles.bg_container}>
        <div className={styles.header}>
          <span className={styles.header_title01}>申请专家</span>
          <span className={styles.header_title02}>34优选通道</span>
          <span className={styles.header_title03}>欢迎加入34体育</span>
        </div>
        <div className={styles.form_box}>
          <div className={styles.form}>
            <ApplicationSteps className={styles.steps} status={status} />
            {status == ExpertStatus.None ? <Applying /> : null}
            {status == ExpertStatus.Applying ? (
              <div className={styles.note_box}>
                <div className={styles.application_note}>
                  身份审核中，请耐心等待，预计审核
                  <br />
                  时间，1-3个工作日
                </div>
              </div>
            ) : null}
            {status == ExpertStatus.Accept ? (
              <div className={styles.note_box}>
                <div className={styles.application_note}>
                  恭喜申请通过，请添加客服
                  <br />
                  微信: ty34sports复制领取攻略发布地址
                </div>
                <CopyToClipboard text="ty34sports" onCopy={() => message.success('已复制')}>
                  <Button className={styles.button}>复制</Button>
                </CopyToClipboard>
              </div>
            ) : null}
            {status == ExpertStatus.Invalid ? (
              <div className={styles.note_box}>
                <div className={styles.application_note}>身份审核失败</div>
                <Button className={styles.button} onClick={reapply}>
                  重新认证
                </Button>
              </div>
            ) : null}
            {status == ExpertStatus.Disable ? (
              <div className={styles.note_box}>
                <img style={{ width: 60, height: 60 }} src={Disuser} alt="" />
                <div className={styles.dis_application_note}>
                  您的专家账号已被禁用    <br />
                  如有疑问请联系客服，微信:ty34sports
                </div>
                <CopyToClipboard text="ty34sports" onCopy={() => message.success('已复制')}>
                  <Button className={styles.dis_button}>复制</Button>
                </CopyToClipboard>
              </div>
            ) : null}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertApplication;
