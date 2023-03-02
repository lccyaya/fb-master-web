import React from 'react';
import styles from './index.less';
type Props = {
  height: number;
};

const FBDemoBlock = (props: Props) => {
  const { height } = props;
  return <div className={styles.demo_block} style={{ height: height }}></div>;
};

export default FBDemoBlock;
