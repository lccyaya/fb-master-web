import React, { useState } from 'react';
import styles from './index.less';
type Props = {};

const RightTab = (props: Props) => {
  const [activekey, setActivekey] = useState<string | null>(null);
  const tab = [
    { title: '同主客', key: '0' },
    { title: '同赛事', key: '1' },
    { title: '20场', key: '2' },
  ];
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const onTabChange = (key: string) => {
    console.log(key, 'poiuytre');
    if (key == activekey) {
      setActivekey(null);
    } else {
      setActivekey(key);
    }
  };
  return (
    <div className={styles.right_tab}>
      {tab.map((item) => {
        return (
          <div
            key={item.key}
            className={activekey == item.key ? styles.right_tab_btn_active : styles.right_tab_btn}
            onClick={() => {
              onTabChange(item.key);
            }}
          >
            {item.title}
          </div>
        );
      })}
    </div>
  );
};

export default RightTab;
