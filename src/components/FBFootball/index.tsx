import React from 'react';
import styles from './index.less';
import { useHistory } from 'umi';
import { State } from './config';

type Props = {
  type: number;
  isUp?: number;
};

const FBFootball = (props: Props) => {
  const { type, isUp } = props;

  return (
    <div>
      <img className={styles.football_img} src={State(type, isUp)} alt="" />
    </div>
  );
};

export default FBFootball;
