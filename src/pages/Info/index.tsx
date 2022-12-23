import React, { useEffect, useState } from 'react';
import { NavBar } from 'antd-mobile';
import { useHistory } from 'umi';
import { Tabs, Badge, SideBar } from 'antd-mobile';

import * as competitionService from '@/services/competition';
import styles from './index.less';

import FBNavList from '@/components/FBNavList';
import useWindowSize from '@/hooks/useWindowSize';

type Props = {};

const Info = (props: Props) => {
  const history = useHistory();

  const [innerHeight, setInnerHeight] = useState<number>(0);

  const [navtab, setNavtab] = useState([]);
  const { height } = useWindowSize();

  // 导航栏
  const init = async () => {
    // setLoading(!hideLoading);
    // setClientTouched(true);
    const result = await competitionService.category();

    if (result.success) {
      setNavtab(result.data.categories);
    }
  };


  useEffect(() => {
    const height1 = height - 90;
    setInnerHeight(height1);
    init();
  }, [height]);

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
                  <SideBar
                    style={{
                      '--width': '130px',
                      '--height': `${innerHeight}px`,
                      '--item-border-radius': '0',
                      '--background-color': '#FAFBFD',
                    }}
                  >
                    <SideBar.Item key="goal" title={<div style={{ fontSize: "16px" }}>欧洲洲际</div>} />
                  </SideBar>
                  <div style={{ height: innerHeight, width: "100%", overflow: "auto" }}>
                    <FBNavList data={item.competitions} />
                  </div>

                </div>
              </Tabs.Tab>
            );
          })}
        </Tabs >
      </div >
    </div >
  );
};

export default Info;
