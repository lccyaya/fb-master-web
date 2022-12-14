import React from 'react';
import { NavBar } from 'antd-mobile';
import styles from './index.less';
import { useHistory } from 'umi';
import useWindowSize from '@/hooks/useWindowSize';
import Iconfont from '@/components/IconFont';

type Props = {};

const DqdDownloadapp = (props: Props) => {
  const history = useHistory();
  const { height } = useWindowSize();

  const back = () => {
    history.goBack();
  };
  return (
    <div className={styles.dqd_downloadapp}>
      <NavBar className={styles.navbar} onBack={back}>
        分享
      </NavBar>
      <div className={styles.dqd_downloadappbg} style={{ height: height - 45 }}>
        <div
          // style={{ }}
          className={styles.button_download}
          onClick={() => {
            const a = document.createElement('a');
            a.style.display = 'none';
            a.download = '34sport';
            a.href = 'https://34api.oss-cn-beijing.aliyuncs.com/package/34Sport_Release_Last.apk';
            document.body.appendChild(a);
            a.click(); // 自动触发点击a标签的click事件
            document.body.removeChild(a);
          }}
        >
          <Iconfont type="icon-anzhuo" size={18} />
          <span className={styles.button_title}>立即下载(安卓版)</span>
        </div>
      </div>
    </div>
  );
};

export default DqdDownloadapp;
