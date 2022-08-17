import BaseTabs from '@/components/BaseTabs';
import styles from './mobile.module.less';
import { Tabs } from 'antd';
import Item from 'antd/lib/list/Item';
import React, { useState } from 'react';
const TabPane = Tabs.TabPane;
import { RANKING_TYPE } from '@/constants/index';
import Glz from './components/glz/mobile';
import Gmz from './components/gmz/mobile';
import Watch from './components/watch/mobile';
import { history, connect } from 'umi';
import EventEmitter from '@/utils/event';
import { handleReport } from '@/utils/report';

const ExpertRank = ({ currentUser = {} }) => {
  const { query } = history.location;
  const [curKey, setCurKey] = useState(() => {
    return query.tab || RANKING_TYPE.GLZ;
  });
  const navs = [
    {
      key: RANKING_TYPE.GLZ,
      title: '高连中',
    },
    {
      key: RANKING_TYPE.GMZ,
      title: '高命中',
    },
    {
      key: RANKING_TYPE.WATCH,
      title: '关注',
    },
  ];
  const handleTabClick = (key) => {
    if (key === '2' && !currentUser) {
      EventEmitter.emit('login-modal', true);
    } else {
      setCurKey(key);
      handleReport({
        action: ['continuous', 'hit', 'follow_list'][key],
      });
    }
  };
  return (
    <div className={styles.main}>
      <Tabs
        activeKey={curKey}
        className={styles.navTab}
        onTabClick={handleTabClick}
        style={{ position: 'sticky', top: '0px' }}
      >
        {navs.map((n) => (
          <TabPane tab={n.title} key={n.key} />
        ))}
      </Tabs>
      {curKey === '0' ? <Glz /> : null}
      {curKey === '1' ? <Gmz /> : null}
      {curKey === '2' ? <Watch /> : null}
    </div>
  );
};

export default connect(({ user }) => ({ currentUser: user.currentUser }))(ExpertRank);
