import React from 'react';
import styles from './index.less';
import Iconfont from '@/components/IconFont';
import { Toast } from 'antd-mobile';
import useWindowSize from '@/hooks/useWindowSize';
type Props = {};

const DownloadApp = (props: Props) => {
  const { height } = useWindowSize();

  return (
    <div className={styles.downloadApp} style={{ height: height - 97 }}>
      <div className={styles.button_box}>
        <div
          style={{ background: '#BE070C' }}
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
          <span className={styles.button_title}>安卓</span>
        </div>
        <a />
        <div
          className={styles.button_download}
          style={{ background: '#333333' }}
          onClick={() => {
            Toast.show({
              content: '尽情期待',
            });
          }}
        >
          <div>
            <Iconfont type="icon-apple-fill" size={18} />
            <span className={styles.button_title}>苹果</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadApp;
