import React, { memo, useState, useEffect } from 'react';
import cls from 'classnames'
import styles from './index.module.less';

type KeyProps = string | number;
interface IToggleProps {
  sourceList: {
    name: string;
    key: KeyProps;
  }[];
  defaultSelectedKey?: KeyProps;
  onChange?: (key: KeyProps) => void;
}

const Toggle = ({ sourceList, onChange, defaultSelectedKey }: IToggleProps) => {
  const [selectedKey, setSelectedKey] = useState<KeyProps>()

  const handleClick = (key: KeyProps) => {
    setSelectedKey(key)
    if(onChange) onChange(key)
  }

  useEffect(() => {
    setSelectedKey(defaultSelectedKey)
  }, [defaultSelectedKey])

  return (
    <div className={styles.toggleWrapper}>
      {
        sourceList.map((item) => (
          <span
            className={cls(styles.toggleItem, {
              [styles.selected]: item.key === selectedKey
            })}
            key={item.key}
            onClick={() => handleClick(item.key)}
          >
            { item.name }
          </span>
        ))
      }

    </div>
  );
};

export default memo(Toggle);
