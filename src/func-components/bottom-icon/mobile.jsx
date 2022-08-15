import React, { useState } from 'react';
import styles from './mobile.module.less';
import cls from 'classnames';
import IconFont from '@/components/IconFont';

const BottomIcon = ({ 
  icons = [], className, onClick = () => {}
}) => {
  return <ul className={cls(styles.bottom_icon, className)}>
    { icons.map((item, key) => <li style={{ background: item.bg }} key={key} onClick={() => onClick(item)}>
      <IconFont color={item.color} type={item.type} size={item.size || 22}/>
    </li>) }
  </ul>
};

export default BottomIcon;


