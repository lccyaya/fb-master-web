import React, { memo, FC, useMemo, useState } from 'react';
import { Tabs } from 'antd-mobile';
import cls from 'classnames';
import { currentDayStamp } from '@/utils/utils'
import styles from './index.module.less';

interface DateItem {
  timestamp: number;
  date: string;
  week: string;
  today: boolean;
  key: number;
}

interface IDateTabProps {
  dateList: DateItem[];
  onChange?: (key: string) => void;
}

const DateTab: FC<IDateTabProps> = ({ dateList, onChange }) => {
  // 默认选中的key, 为了取值方便, 直接拿时间戳当Tab的key
  const stampKey = useMemo(() => {
    return currentDayStamp().toString();
  }, [])
  const [selectedKey, setSelectedKey] = useState(stampKey);
  const renderTitle = (item: DateItem) => {
    return (
      <div
        className={cls(styles.titleWrapper, {
          [styles.selected]: selectedKey === String(item.timestamp)
        })}
      >
        {
          item.today ? (
            <div className={styles.today}>
              今天
            </div>
          ) : (
            <>
              <div className={styles.titleTop}>
                {item.date}
              </div>
              <div className={styles.titleBottom}>
                {item.week}
              </div>
            </>
          )
        }
      </div>
    )
  }
  const handleChange = (key: string) => {
    setSelectedKey(key)
    if(onChange) onChange(key)
  }


  return (
    <div className={styles.dataScrollWrapper}>
      <Tabs defaultActiveKey={stampKey} onChange={handleChange}>
        {
          dateList.map(item => (
            <Tabs.Tab title={renderTitle(item)} key={item.timestamp} />
          ))
        }
      </Tabs>
    </div>
  );
};

export default memo(DateTab);
