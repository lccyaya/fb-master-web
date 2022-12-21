import React, { useEffect, useState } from 'react';
import { NavBar } from 'antd-mobile';
import { useHistory } from 'umi';
import { Tabs, Badge } from 'antd-mobile';
import * as competitionService from '@/services/competition';
import styles from './index.less';

import FBNavList from '@/components/FBNavList';
type Props = {};

const Info = (props: Props) => {
  const history = useHistory();
  const [navtab, setNavtab] = useState([]);
  // 导航栏
  const init = async () => {
    // setLoading(!hideLoading);
    // setClientTouched(true);
    const result = await competitionService.category();
    console.log(result.data.categories);
    if (result.success) {
      setNavtab(result.data.categories);
    }
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div className={styles.library}>
      <NavBar
        style={{ fontWeight: '500' }}
        onBack={() => {
          history.goBack();
        }}
      >
        资料库
      </NavBar>

      <div className={styles.nav}>
        <Tabs
          style={{
            '--title-font-size': '16px',
            '--fixed-active-line-width': '0px',
            '--content-padding': '0',
          }}
          defaultActiveKey="热门"
        >
          {navtab?.map((item: any) => {
            return (
              <Tabs.Tab title={item.name} key={item.name}>
                <div className={styles.nav_child}>
                  {/* <div>{data?.name}</div> */}
                  <FBNavList data={item.competitions} />
                </div>
              </Tabs.Tab>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
};

export default Info;
