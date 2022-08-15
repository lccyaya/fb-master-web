import React from 'react';
import styles from './pc.module.less';
import Menu from '@/func-components/menu/pc';

const Content = ({ children, menus = [], onChange }) => {
  return <div className={styles.content}>
    <div className={styles.left}>
      <Menu menus={menus} onChange={(e) => {
        onChange(menus[+e.key]);
      }}/>
    </div>
    <div className={styles.right}>
      {children}
    </div>
  </div>;
};


export default Content;
