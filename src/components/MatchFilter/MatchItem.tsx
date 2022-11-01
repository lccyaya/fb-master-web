import React, { memo } from 'react';
import classNames from 'classnames';
import styles from './MatchItem.module.less';

const MatchItem = ({ name, selectedList = [], id, handleClick, className, allBg = false }: {
  name: string;
  id: number;
  selectedList?: number[];
  handleClick?: (id: number) => void;
  className?: string;
  allBg?: boolean;
}) => {

  const handleItemClick = (idx: number) => {
    if(handleClick) handleClick(idx)
  }
  return (
    <div
      className={classNames(styles.itemWrapper, className, {
        [styles.selected]: selectedList.includes(id),
        [styles.selected2]: selectedList.includes(id) && allBg
      })}
      onClick={() => handleItemClick(id)}
    >
      { name }
    </div>
  );
};

export default memo(MatchItem);
