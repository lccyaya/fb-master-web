import React from 'react';
import styles from './index.less';

export enum FBTagType {
  HitRate = 0,
  Continue = 1,
}

type Props = {
  tag: string;
  type: FBTagType;
  color?: string
};

const FBExpertTag: React.FC<Props> = (props) => {
  const { tag, type, color } = props;

  return (
    <>
      {type === FBTagType.HitRate ? (
        <div className={color ? styles.cap_box : styles.score_box}>
          <div className={color ? styles.cap : styles.score}>{tag}</div>
        </div>
      ) : (
        <div className={color ? styles.cap_box : styles.score_box}>
          <div className={color ? styles.caphit : styles.hit}>{tag}</div>
          <div className={color ? styles.cap : styles.score}>连红</div>
        </div>
      )}
    </>
  );
};

export default FBExpertTag;
