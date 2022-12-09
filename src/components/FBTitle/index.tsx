import React, { ReactElement } from 'react';
import styles from './index.less';
type Props = {
  title: ReactElement | string;
  size?: string;
  color?: string;
};

const FBTitle = (props: Props) => {
  return (
    <div
      className={styles['font_size']}
      style={{ fontSize: props.size ? props.size : '', color: props.color ? props.color : '' }}
    >
      {props.title}
    </div>
  );
};
export default FBTitle;
