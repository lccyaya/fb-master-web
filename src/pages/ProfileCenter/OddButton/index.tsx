import React, { MouseEventHandler } from 'react';
import styles from './index.less';
import classnames from 'classnames';

type Props = {
  selected?: boolean;
};

const OddButton: React.FC<Props> = (props) => {
  return (
    <div
      className={classnames(styles.container, props.selected ? styles.selected : null)}
    >
      {props.children}
    </div>
  );
};

export default OddButton;
