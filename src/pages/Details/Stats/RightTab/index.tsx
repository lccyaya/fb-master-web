import React, { useState } from 'react';
import styles from './index.less';
type tabData = {
  title: string;
  key: string;
};
type Props = {
  tab: tabData[];
};

const RightTab = (props: Props) => {
  const [activekey, setActivekey] = useState<string | null>(null);

  const { tab } = props;
  // eslint-disable-next-line @typescript-eslint/no-shadow
  // 点击切换tab
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
