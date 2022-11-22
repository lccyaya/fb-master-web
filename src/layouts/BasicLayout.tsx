/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 *
 * @see You can view component api by: https://github.com/ant-design/ant-design-pro-layout
 */
// import 'lib-flexible';
import type {
  BasicLayoutProps as ProLayoutProps,
  MenuDataItem,
  Settings,
} from '@ant-design/pro-layout';
import moment from 'moment';
import 'moment-timezone';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Dispatch } from 'umi';
import { connect, FormattedMessage, getLocale, history, Link, useIntl } from 'umi';
// import { GithubOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
import { parse } from 'query-string';
// @ts-ignore

import { FOOTBALL_MASTER_LINE_CODE } from '@/constants';
import type { ConnectState } from '@/models/connect';
import Authorized from '@/utils/Authorized';
import { checkIsPhone, getLangFromPath } from '@/utils/utils';
import { getMatchMenu } from '@umijs/route-utils';
import MobileLayout from './NewMobileLayout';

import LoginModal from '@/components/MatchCard/Login';
import { active } from '@/services/abtest';
import { getTipsStatus } from '@/services/tips';
import { PageActive } from '@/utils/page-active';

import EventEmitter from '@/utils/event';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);
export type BasicLayoutProps = {
  breadcrumbNameMap: Record<string, MenuDataItem>;
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  settings: Settings;
  dispatch: Dispatch;
  isPhone: boolean;
  showTips: boolean;
} & ProLayoutProps;
export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: Record<string, MenuDataItem>;
};

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    },
    showTips,
  } = props;
  const [pathname, setPathname] = useState<string>();
  const [code, setCode] = useState('');
  const [loginVisible, setLoginVisible] = useState(false);
  /** Use Authorized check all menu item */

  const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] => {
    const result = menuList
      .filter((item) => {
        return item.locale === 'key_home_tab' || item.locale === 'key_profile_center';
      })
      .filter((item) => {
        if (showTips) {
          return true;
        }
        return item.key !== '/:locale/tips';
      })
      .map((item) => {
        const localItem = {
          ...item,
          // children: item.children ? menuDataRender(item.children) : undefined,
        };
        return Authorized.check(item.authority, localItem, null) as MenuDataItem;
      });

    return result;
  };

  // const [divice, setDivice] = useState<DiviceType>(false);
  const fetchData = async () => {
    const resp = await getTipsStatus();
    if (resp.success) {
      if (/\/tips\/*/.test(history.location.pathname) && resp.data.status) {
        history.replace('/home');
      }
      if (dispatch) {
        dispatch({
          type: 'tips/setShowTips',
          payload: !resp.data.status,
        });
      }
    }
  };

  useEffect(() => {
    const lang = getLangFromPath();
    dayjs.locale(lang);
    if (getLangFromPath() === 'ar') {
      moment.locale('en');
    } else {
      moment.locale(lang);
    }
    const isPhone = /Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent);
    if (dispatch) {
      dispatch({
        type: 'divice/isPhone',
        payload: isPhone,
      });
    }
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const menuDataRef = useRef<MenuDataItem[]>([]);

  /** Init variables */

  const handleMenuCollapse = (payload: boolean): void => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  };
  // get children authority
  const authorized = useMemo(() => {
    console.log('当前的语言是', getLocale());
    return (
      getMatchMenu(pathname || '/', menuDataRef.current).pop() || {
        authority: undefined,
      }
    );
  }, [pathname]);

  const onPageChangeHandle = (e: any) => {
    console.log('页面发送变化', e);
    const { pathname: _pn } = e;
    setPathname(_pn);
  };

  const { formatMessage } = useIntl();

  const handlePageActive = useCallback(() => {
    // eslint-disable-next-line no-new
    new PageActive((duration) => {
      const s = Math.round(duration / 1000);
      if (s > 0) {
        active(s);
      }
    });
  }, []);

  useEffect(() => {
    console.log('渲染-----BasicLayout', props);
    try {
      document.getElementsByClassName('ant-menu-overflow-item')?.forEach((el) => {
        el.setAttribute('title', '');
      });
    } catch (error) {}

    const query = parse(window?.location.search);

    if (query.code) {
      setCode(query.code as string);
      localStorage.removeItem(FOOTBALL_MASTER_LINE_CODE);
      localStorage.setItem(FOOTBALL_MASTER_LINE_CODE, query.code as string);
      setTimeout(() => {
        window?.close();
      }, 1000);
    }
    handlePageActive();
  }, []);

  const openLoginModal = (open) => {
    setLoginVisible(open);
  };
  useEffect(() => {
    EventEmitter.on('login-modal', openLoginModal);
    return () => {
      EventEmitter.off('login-modal', openLoginModal);
    };
  }, []);

  return (
    <>
      {code ? (
        <div>
          <FormattedMessage id="key_being_certified" />
          ...
        </div>
      ) : (
        <>
          <Authorized authority={authorized!.authority} noMatch={noMatch}>
            <MobileLayout onPageChange={onPageChangeHandle} {...props}>
              {children}
            </MobileLayout>
          </Authorized>
          <LoginModal
            visible={loginVisible}
            onLogin={() => {
              setLoginVisible(false);
              EventEmitter.emit('login-status-change');
            }}
            onCancel={() => {
              setLoginVisible(false);
            }}
          />
          {/* </ProLayout> */}
        </>
      )}
    </>
  );
};

export default connect(({ global, tips, settings, divice, user }: ConnectState) => ({
  collapsed: global.collapsed,
  settings,
  isPhone: divice.isPhone,
  showTips: tips.showTips,
  currentUser: user.currentUser,
}))(BasicLayout);
