import React from 'react';
import styles from './index.less';
import { useHistory } from 'umi';
import { report } from '@/services/ad';
import { REPORT_ACTION, REPORT_CATE } from '@/constants';
import Logo from '@/assets/match/library_logo.png';
import cls from 'classnames';

type Props = {
  data?: any;
  type?: any
};

const FBNavList = (props: Props) => {
  const { data, type } = props;
  const history = useHistory();

  return (

    <div className={styles.navlist}>
      {data.map((item) => {
        return (
          // eslint-disable-next-line react/jsx-key
          <div
            key={item.id}
            className={cls(styles.navlist_flex, type == 0 ? styles.navlist_flex_bg : null)}

            // className={type == 0 ? styles.navlist_flex_bg : styles.navlist_flex}
            onClick={() => {
              history.push(`/zh/library/detail?id=${item.id}&&name=${item?.name}`);
              report({
                cate: REPORT_CATE.info,
                action: REPORT_ACTION.info_tab2 + item?.name,
              });
            }}
          >
            <div className={styles.logo}>
              {item?.logo ? (
                <img className={styles.logo_img} src={item?.logo} alt="" />
              ) : (
                <img className={styles.logo_default_img} src={Logo} alt="" />
              )}
            </div>
            <div style={{ fontSize: 12, }}>{item?.name}</div>
            {/* <div className={styles.num}>20场</div> */}
          </div>
        );
      })}
    </div>

  );
};

export default FBNavList;
