import React, { useState, useEffect } from 'react';
import { Rate } from 'antd';
import styles from './index.less';
import { Button, Swiper } from 'antd-mobile';
import { useHistory } from 'umi';
import IconFont from '@/components/IconFont';
import useWindowSize from '@/hooks/useWindowSize';
import guide_1 from '@/assets/guide/guide_1.png';
import guide_2 from '@/assets/guide/guide_2.png';

import guide_3 from '@/assets/guide/guide_3.png';
import guide_4 from '@/assets/guide/guide_4.png';

type Props = {};

const Guide = (props: Props) => {
  const { height } = useWindowSize();
  const history = useHistory();
  const [activeIdnex, setActiveIdnex] = useState(0);
  const [innerHeight, setInnerHeight] = useState<number>(0);
  // const [isAndroid, setIsAndroid] = useState<boolean>(false);
  useEffect(() => {
    const height1 = height - 355;
    setInnerHeight(height1);
  }, [height]);
  const imgs = [guide_1, guide_2, guide_3, guide_4];
  const goRule = () => {
    history.push(`/zh/rule`, {
      title: '权限说明',
      url: `${window.publicPath}auth.html`,
    });
  };
  const isAndroidfn = () => {
    const u = navigator.userAgent;
    console.log(u, 'pppp');

    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
      return true;
    }

    return false;
  };

  const items = imgs.map((img, index) => (
    <Swiper.Item key={index}>
      <div
        className={styles.content}
        style={{
          height: activeIdnex == index ? innerHeight : innerHeight - 20,

          marginTop: activeIdnex == index ? 0 : 10,
        }}
      >
        {/* {index + 1} */}
        <img className={styles.banner_img} src={img} alt="" />
      </div>
    </Swiper.Item>
  ));

  return (
    <div className={styles.guide_main}>
      <div className={styles.guide_sport}>
        <div className={styles.guide_sport_logo}>
          {' '}
          <IconFont className={styles.star} type="icon-a-34-shouye" color="#fff" size={50} />
        </div>
        <div>
          {' '}
          <div className={styles.sport_name}>
            34体育
            <span> 官方正版</span>
          </div>
          <div className={styles.sport_red}>红单从这里开始</div>
        </div>
        <div className={styles.rate}>
          {' '}
          <div style={{ fontSize: 28 }}> 5.0</div>
          <Rate className={styles.rate_icon} allowHalf defaultValue={5} />
        </div>
      </div>
      <div className={styles.swiper}>
        <div className={styles.swiper_downloadbox}>
          <div className={styles.swiper_download}> 下载注册 免费领取价值105元新手大礼包</div>
        </div>

        <div>
          <Swiper
            indicator={() => null}
            rubberband
            onIndexChange={(index: number) => {
              setActiveIdnex(index);
            }}
            // style={{ '--track-padding': '10px' }}
            autoplay
            slideSize={70}
            trackOffset={15}
            loop={true}
            stuckAtBoundary={false}
          >
            {items}
          </Swiper>
        </div>
      </div>
      <div className={styles.download}>
        <div style={{ padding: '0 10px' }}>
          {' '}
          <Button
            block
            color="primary"
            size="large"
            onClick={() => {
              let boolean = isAndroidfn();
            }}
          >
            立即下载
          </Button>
        </div>

        <div className={styles.download_info}>
          <div className={styles.info_company}>
            <div className={styles.company_box}>
              {' '}
              <div className={styles.company_name}>开 发 者：</div>
              杭州斯凌科技有限公司
            </div>
            <div className={styles.company_box}>
              <div> 软件信息：</div>
              34体育 （官方版1.2.0）
            </div>
            <div className={styles.company_box}>
              <div> 更新时间：</div>
              2022 11.02
            </div>
          </div>
          <div className={styles.privacy}>
            {/* {isAndroid ? 'android' : 'ios'} */}
            <div onClick={goRule}>
              <IconFont className={styles.star} type="icon-yinsibaohu" size={13} />
              隐私
            </div>
            <div onClick={goRule}>
              <IconFont className={styles.star} type="icon-fuhao-quanxian" size={13} />
              权限
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guide;
