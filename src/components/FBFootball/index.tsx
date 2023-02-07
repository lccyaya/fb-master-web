import React from 'react';
import styles from './index.less';
import { useHistory } from 'umi';
import { State } from './config';

type Props = {
  type: number;
};

const FBFootball = (props: Props) => {
  const { type } = props;

  return (
    <div>
      <img className={styles.football_img} src={State(type)} alt="" />
    </div>
  );
};

export default FBFootball;
