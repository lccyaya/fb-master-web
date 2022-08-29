import React, { useEffect, useState } from 'react';
import styles from './index.less';
import classNames from 'classnames';
import { useHistory, useLocation } from 'umi';

type Props = {};

type FBMenuItem = {
  key: string;
  title: string;
  path: string;
  regex: RegExp;
}

const HeaderMenu: React.FC = (props: Props) => {
  const items: FBMenuItem[] = [
    { key: '1', title: '首页', path: '/zh/home', regex: /\/home\/*/, },
    { key: '2', title: '创作中心', path: '/zh/profile/center', regex: /\/profile\/*/, },
  ];

  const history = useHistory()
  const location = useLocation()
  const path = location.pathname
  const [selectedKey, setSelectedKey] = useState('');

  const onClick = (item: FBMenuItem) => {
    history.push(item.path)
  }

  useEffect(() => {
    const _page = items.find(item => item.regex.test(path))
    setSelectedKey(_page?.key || '');
  }, [path]);

  return (
    <div className={styles.container}>
      {items.map((item) => (
        <div className={classNames(styles.menu_item)} onClick={() => onClick(item)} key={item.key}>
          <div
            className={classNames(
              styles.item_content,
              selectedKey == item.key ? styles.menu_item_active : null,
            )}
          >
            {item.title}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeaderMenu;
