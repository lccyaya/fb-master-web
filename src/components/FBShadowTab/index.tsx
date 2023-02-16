import React from 'react';
import styles from './index.less';
type Props = {
  tab: any;
  onChangeTab: any;
  activeKey: string;
};

const FBShadowTab = (props: Props) => {
  const { tab, onChangeTab, activeKey } = props;
  return (
    <div className={styles.shadowtab_box}>
      {tab.map((item) => {
        return (
          <div
            onClick={() => {
              onChangeTab(item.key);
            }}
            className={activeKey == item.key ? styles.shadowtab : styles.default_shadowtab}
            key={item.key}
          >
            {item.title}
          </div>
        );
      })}
    </div>
  );
};

export default FBShadowTab;
