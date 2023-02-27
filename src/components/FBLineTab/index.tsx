import React from 'react';
import { Tabs, Badge } from 'antd-mobile';
import styles from './index.less';
type Props = {
  tab: any;
  onChangeTab: any;
};

const FBLineTab = (props: Props) => {
  const { tab, onChangeTab } = props;
  return (
    <div className={styles.team_details_tab}>
      <Tabs
        activeLineMode="fixed"
        defaultActiveKey="1"
        onChange={(key) => {
          onChangeTab(key);
        }}
        style={{
          '--fixed-active-line-width': '10px',

          '--title-font-size': '15px',
          '--active-line-height': '3px',
        }}
      >
        {tab.map((item) => {
          return <Tabs.Tab title={item.title} key={item.key} />;
        })}
      </Tabs>
    </div>
  );
};

export default FBLineTab;
