import React, { useEffect, useState } from 'react';
import { NavBar } from 'antd-mobile';
import { useHistory } from 'umi';
import { Tabs, SideBar } from 'antd-mobile';
import * as competitionService from '@/services/competition';
import styles from './index.less';
import FBNavList from '@/components/FBNavList';
import useWindowSize from '@/hooks/useWindowSize';
import { getnavList } from "@/utils/match"
import type { CompetitionsCategoryItemProps, CompetitionCategoryProps } from '@/services/competition';
import Empty from '@/components/Empty';

const Info = () => {
  const { height } = useWindowSize();
  const history = useHistory();
  const [innerHeight, setInnerHeight] = useState<number>(0)
  const [navtab, setNavtab] = useState<CompetitionCategoryProps[]>([]);//一级导航默数据列表
  const [navtabkey, setNavTabKey] = useState("0");//一级导航默认选择
  const [navtablist, setNavTabList] = useState<CompetitionsCategoryItemProps[]>([]);//二级导航默数据列表
  const [navtablistkey, setNavTabListKey] = useState("热门");//二级导航默认选择
  const [navtabitem, setNavTabitem] = useState([]);//三级导航默认数据列表


  // 导航栏
  const init = async () => {
    const result: any = await competitionService.category();
    if (result.success) {
      setNavtab(result?.data?.categories);
      const navlistres: any = await competitionService.categorys({ id: navtabkey });
      setNavTabList(navlistres?.data?.categories)

      if (navlistres?.data?.categories) {

        const item_name = navlistres?.data?.categories[0].name
        setNavTabListKey(item_name)
        const navitems = getnavList(navlistres?.data?.categories, item_name)
        setNavTabitem(navitems)
      }

    }
  };
  // 一级导航切换
  const onTabChange = (key: string) => {
    setNavTabKey(key)
  }
  // 二级导航切换
  const onNavListChange = (key: string) => {
    setNavTabListKey(key)
    const navitems = getnavList(navtablist, key)
    setNavTabitem(navitems)

  }
  useEffect(() => {
    init()
  }, [navtabkey])
  useEffect(() => {
    const height1 = height - 90;
    setInnerHeight(height1);
    // init();
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
          onChange={onTabChange}
          style={{
            '--title-font-size': '16px',
            '--fixed-active-line-width': '0px',
            '--content-padding': '0',
          }}
          defaultActiveKey={navtabkey}
        >
          {navtab?.map((item: any) => {
            return (
              <Tabs.Tab title={item.name} key={item.id} >
                {navtablist ? <div className={styles.nav_child}>
                  {navtabkey !== "0" && <SideBar
                    style={{
                      '--width': '130px',
                      '--height': `${innerHeight}px`,
                      '--item-border-radius': '0',
                      '--background-color': '#FAFBFD',
                    }}
                    onChange={onNavListChange}
                    activeKey={navtablistkey}
                  >
                    {navtablist.map((itemnav) => {
                      return <SideBar.Item key={itemnav.name} title={<div style={{ fontSize: "16px" }}>{itemnav.name}</div>} />
                    })}

                  </SideBar>}

                  <div style={{ height: innerHeight, width: "100%", overflow: "auto", }}>
                    <FBNavList data={navtabitem} type={navtabkey} />
                  </div>

                </div> : <Empty message='暂无数据' />}
              </Tabs.Tab>
            );
          })}
        </Tabs >
      </div >



    </div >
  );
};

export default Info;
