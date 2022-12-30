import { Tabs } from 'antd';
import styles from './MobileLayout.less';
import { useHistory, useIntl, useLocation } from 'umi';
import { toShortLangCode, isForChina } from '@/utils/utils';
import { locale } from '@/app';
import type { ReactNode } from 'react';
import { useState, useEffect, useMemo } from 'react';
import { getPageFromPath, pageRegex } from '@/utils/page-info';
import { report } from '@/services/ad';
import { TabBar } from 'antd-mobile';
import IconFont from '@/components/IconFont';
import CapLogo from '@/assets/worldcup/cup_bottom_logo.png';

const { TabPane } = Tabs;

interface IProps {
  showTips: boolean;
}

const MobileLayout: React.FC<IProps> = (props) => {
  const { showTips, children } = props;
  const allNavs = [
    {
      key: 'home',
      pathRegex: pageRegex.get('home'),
      path: '/zh/home',
      locale: 'key_home_tab',
      icon: (active: boolean) => (
        <IconFont type={active ? 'icon-dianji-shouye' : 'icon-shouye1'} size={22} />
      ),
    },
    // {
    //   key: 'news',
    //   pathRegex: pageRegex.get('news'),
    //   path: '/news',
    //   locale: 'key_news',
    // },
    // {
    //   key: 'video',
    //   pathRegex: pageRegex.get('highlight'),
    //   path: '/highlight',
    //   locale: 'key_highlight',
    // },
    // {
    //   key: 'live',
    //   pathRegex: pageRegex.get('live'),
    //   path: '/live',
    //   locale: 'key_spot',
    //   icon: (active: boolean) => (
    //     <IconFont type={active ? 'icon-saizhi-dianji' : 'icon-saizhi'} size={22} />
    //   ),
    // },
    {
      key: 'match',
      pathRegex: pageRegex.get('match'),
      path: '/zh/match',
      locale: 'key_match',
      icon: (active: boolean) => (
        <IconFont type={active ? 'icon-a-dianjibisai' : 'icon-bisai1'} size={22} />
      ),
    },

    // {
    //   key: 'worldcup',
    //   pathRegex: pageRegex.get('worldcap'),
    //   path: '/zh/worldcup',
    //   locale: 'key_worldcup',
    //   icon: (active: boolean) => (
    //     <div
    //       style={{
    //         display: 'flex',
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //         height: '100%',
    //       }}
    //     >
    //       {!active ? (
    //         <IconFont type={'icon-a-3123'} size={22} />
    //       ) : (
    //         <img style={{ width: 22, height: 22 }} src={CapLogo} alt=""></img>
    //       )}
    //     </div>
    //   ),
    //   worldcup: true,
    // },
    {
      key: 'expert',
      pathRegex: pageRegex.get('expert'),
      path: '/zh/expert/rank',
      locale: 'key_expert',
      icon: (active: boolean) => (
        <IconFont type={active ? 'icon-dianji-zhuanjia' : 'icon-zhuanjia1'} size={22} />
      ),
    },

    // {
    //   key: 'views_match',
    //   pathRegex: pageRegex.get('views_match'),
    //   path: '/views/match',
    //   locale: '比赛new',
    // },
    // {
    //   key: 'tips',
    //   pathRegex: pageRegex.get('tips'),
    //   path: '/tips',
    //   locale: 'key_tips',
    // },
    {
      key: 'mine',
      pathRegex: pageRegex.get('mine'),
      path: '/zh/mine',
      locale: 'key_me',
      icon: (active: boolean) => (
        <IconFont type={active ? 'icon-dianji-wode' : 'icon-wode'} size={22} />
      ),
    },
    // {
    //   key: 'info',
    //   pathRegex: pageRegex.get('info'),
    //   path: '/info',
    //   locale: 'key_info_tab',
    // },
    // {
    //   key: 'download',
    //   pathRegex: pageRegex.get('download'),
    //   path: '/download',
    //   locale: 'key_download',
    // },
  ];
  const navs = useMemo(() => {
    if (isForChina()) {
      return allNavs.filter((item) => {
        return item.key !== 'tips';
      });
    } else {
      return allNavs.filter((item) => {
        if (showTips) {
          return item.key !== 'expert';
        } else {
          return !(item.key === 'expert' || item.key === 'tips');
        }
      });
    }
  }, [showTips]);
  const formatMsg = useIntl().formatMessage;
  const lang = toShortLangCode(locale.getLocale());
  const history = useHistory();
  const location = useLocation();
  const [curKey, setCurKey] = useState('');
  const handleTabClick = (key: string) => {
    setCurKey(key);
    const cur = navs.find((n) => n.key === key);
    if (cur) {
      const page = getPageFromPath(history.location.pathname);
      const targetPage = getPageFromPath(cur.path);
      if (page && targetPage) {
        report({
          cate: page.cate,
          action: targetPage.cate,
        });
      }
      history.push({
        pathname: `${cur.path}`,
      });
    }
  };

  useEffect(() => {
    const nav = navs.find((n) => {
      const regex = new RegExp(`^${n.path}/?$`);
      return regex.test(location.pathname);
    });
    console.log(location.pathname);
    setCurKey(nav?.key ?? '');
  }, [location.pathname]);

  // useEffect(() => {
  //   const nav = navs.find((n) => {
  //     const regex = new RegExp(`^${n.path}/?$`);
  //     return regex.test(location.pathname);
  //   });
  //   console.log(location.pathname);
  //   setCurKey(nav?.key ?? '');
  // }, []);

  return (
    <>
      <div className={styles.navTabWrapperBox}>
        <div className={curKey ? styles.navTabWrapperChildren : null}>{props.children}</div>
        {curKey ? (
          <div className={styles.navTabWrapper}>
            <TabBar activeKey={curKey} onChange={handleTabClick}>
              {navs.map((item) => (
                <TabBar.Item
                  key={item.key}
                  title={formatMsg({ id: item.locale })}
                  icon={item.icon}
                  className={item.worldcup ? styles.worldcup : null}
                />
              ))}
            </TabBar>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default MobileLayout;
