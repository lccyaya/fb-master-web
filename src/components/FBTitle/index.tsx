import React, { ReactElement } from 'react';
import styles from './index.less';
type Props = {
  title: ReactElement | string;
  size?: string;
  color?: string;
  logo?: boolean;
};

const FBTitle = (props: Props) => {
  return (
    <div
      className={styles['font_size']}
      style={{
        fontSize: props.size ? props.size : '16px',
        color: props.color ? props.color : '#45494C',
      }}
    >
      <div className={props.logo ? styles.mobileStatTitle_title : ''}>
        <div className={props.logo ? styles.title_logo : ''} />
        {props.title}
      </div>
    </div>
  );
};
export default FBTitle;
