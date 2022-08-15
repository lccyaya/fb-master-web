import React, { useState, useEffect } from 'react';
import { Carousel } from 'antd';
import { connect } from 'umi';
import classnames from 'classnames';
import type { ConnectState } from '@/models/connect';
import styles from './index.less';
import type { bannerType } from '@/services/ad';
import { getBanner, report } from '@/services/ad';
import { BANNER_POSITION_MOBILE, BANNER_POSITION_PC, REPORT_ACTION } from '@/constants';
import { getReportCate, checkIsPhone } from '@/utils/utils';

export type CarouselProps = {
  isPhone: boolean;
  className?: any;
  reportTag?: string;
  setIsBanner?: any;
};

export function getPosition() {
  const isPhone = checkIsPhone();
  const POSITION = isPhone ? BANNER_POSITION_MOBILE : BANNER_POSITION_PC;
  let result = POSITION.home;
  const { href: path } = window.location;
  if (path) {
    if (path.includes('tip')) {
      result = POSITION.tips;
    } else if (path.includes('detail')) {
      result = POSITION.detail;
    } else if (path.includes('home')) {
      result = POSITION.home;
    }
  }
  return result;
}

const BannerWidget: React.FC<CarouselProps> = (props) => {
  const [banners, setBanners] = useState<bannerType[]>([]);

  const init = async () => {
    console.log('开始调用Banner 接口');
    const result = await getBanner({ position: getPosition() });
    if (result.success && result.data.banners.length > 0) {
      setBanners(result.data.banners);
    }
  };

  const reportBanner = async (action: REPORT_ACTION, tag?: string | number) => {
    const reportTag = props.reportTag || tag;
    await report({ cate: getReportCate(), action, tag: reportTag });
  };

  useEffect(() => {
    init();
  }, []);
  useEffect(() => {
    props.setIsBanner?.(!!banners.length);
  }, [banners]);

  return banners && banners.length > 0 ? (
    <div className={classnames(styles.bannerContainer, props.className)}>
      <Carousel
        autoplay={true}
        autoplaySpeed={5000}
        onInit={() => {
          if (banners.length === 1) {
            reportBanner(REPORT_ACTION.banner_display, banners[0].id);
          }
        }}
        beforeChange={(current, next) => {
          if (current !== next) {
            reportBanner(REPORT_ACTION.banner_display, banners[current].id);
          }
        }}
        dots={{ className: styles.bannerDots }}
      >
        {banners.map((item, i) => {
          const key = `matches${i}`;
          return (
            <img
              key={key}
              className={styles.img}
              src={item.img}
              onClick={() => {
                window.open(item.landing_page, '_blank');
                reportBanner(REPORT_ACTION.banner_click, item.id);
              }}
            />
          );
        })}
      </Carousel>
    </div>
  ) : null;
};

// export default Carousel;
export default connect(({ divice }: ConnectState) => ({
  isPhone: divice.isPhone,
}))(BannerWidget);
