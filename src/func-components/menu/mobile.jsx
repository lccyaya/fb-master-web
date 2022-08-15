import React, { useState } from 'react';
import { Tabs } from 'antd';
import styles from './mobile.module.less';
import cls from 'classnames';

const menu = ({ 
  menus = [], onChange = () => {}, children, className
}) => {
  const [active, setActive] = useState('0');
  const onClick = (e) => {
    onChange(menus[+e]);
    setActive(e);
  }
  return <div className={cls(styles.menu, className)}>
    <Tabs 
        activeKey={active} className={styles.navTab} onTabClick={onClick} onChange={onClick}
        style={{ position: 'sticky', top: '92px' }}
    >
        {menus.map((item, key) => (
            <Tabs.TabPane tab={item.label} key={key} />
        ))}
    </Tabs>
    {children}
  </div>
};

export default menu;




