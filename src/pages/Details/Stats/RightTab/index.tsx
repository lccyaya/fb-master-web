import React, { useState } from 'react';
import styles from './index.less';
type tabData = {
  title: string;
  key: number | string;
};
type Props = {
  tab: tabData[];
  setActivekey: any;
  activekey: any;
  num: number;
  setNum: any;
};

const RightTab = (props: Props) => {
  const { tab, activekey, setActivekey, num, setNum } = props;
  // eslint-disable-next-line @typescript-eslint/no-shadow
  // 点击切换tab
  const onTabChange = (key: number | string) => {
    console.log(key, 'poiuytre');
    setActivekey(key);
  };
  return (
    <div className={styles.right_tab}>
      {tab.map((item) => {
        return (
          // eslint-disable-next-line react/jsx-key
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              key={item.key}
              // className={activekey == item.key ? styles.right_tab_btn_active : styles.right_tab_btn}
              className={activekey == item.key ? styles.right_tab_btn_active : styles.right_tab_btn}
              onClick={() => {
                onTabChange(item.key);
              }}
            >
              {item.title}
            </div>
          </div>
        );
      })}
      <div
        // className={activekey == item.key ? styles.right_tab_btn_active : styles.right_tab_btn}
        className={num == 20 ? styles.right_tab_btn_active : styles.right_tab_btn}
        onClick={() => {
          setNum(20);
        }}
      >
        20场
      </div>
    </div>
  );
};

export default RightTab;
