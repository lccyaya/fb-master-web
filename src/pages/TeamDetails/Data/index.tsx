import React from 'react';
import styles from './index.less';
import FBDemoBlock from '@/components/FBDemoBlock';
import TransfeRecord from './TransfeRecord';
import Honour from './Honour';
import BaseInfo from './BaseInfo';

type Props = {};

const Data = (props: Props) => {
  return (
    <div className={styles.data}>
      <BaseInfo />
      <FBDemoBlock height={5} />
      {/* 转会 */}
      <TransfeRecord />
      <FBDemoBlock height={5} />
      {/* 荣誉 */}
      <Honour />
    </div>
  );
};

export default Data;
