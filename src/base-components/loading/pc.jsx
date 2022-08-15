import React from 'react';
import { Spin } from 'antd';
import styles from './pc.module.less';

const LoadingCom = ({ show, height }) => {
  return show === false ? null : <div style={{ height }} className={styles.loading}>
    <Spin spinning={true}/>
  </div>
};
export default LoadingCom;