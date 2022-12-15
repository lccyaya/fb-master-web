import React from 'react';
import styles from './index.less';
import useWindowSize from '@/hooks/useWindowSize';
import Iconfont from '@/components/IconFont';

type Props = {};

const DqdDownloadapp = (props: Props) => {
  const { height } = useWindowSize();

  return (
    <div className={styles.dqd_downloadapp}>
      <div className={styles.dqd_downloadappbg} style={{ height: height }}>
        <div
          // style={{ }}
          className={styles.button_download}
          onClick={() => {
            // 百度统计
            _hmt.push(['_trackEvent', 'download Button', 'click', '下载APP']);

            const a = document.createElement('a');
            a.style.display = 'none';
            a.download = '34sport';
            a.href = 'https://34api.oss-cn-beijing.aliyuncs.com/package/34Sport_1.2.3_Dongqiudi_Release.apk';
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
