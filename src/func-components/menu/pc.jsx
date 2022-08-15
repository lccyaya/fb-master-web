import React, { useState } from 'react';
import { Menu } from 'antd';
import styles from './pc.module.less';

const menu = ({ 
  menus = [], onChange = () => {} 
}) => {
  const [active, setActive] = useState('0');
  const onClick = (e) => {
    setActive(e.key);
    onChange(e);
  }
  return <div className={styles.menu}>
    <Menu selectedKeys={active}>
      {menus.map((item, key) => <>
        <Menu.Item onClick={onClick} key={key}>{item.label}</Menu.Item>
        {/* {item.children ? <Menu.SubMenu title="子菜单">
          {item.children.map((val, index) => <Menu.Item key={index}>{val.label}</Menu.Item>)}
        </Menu.SubMenu> : null} */}
      </>)}
    </Menu>
  </div>
};

export default menu;


