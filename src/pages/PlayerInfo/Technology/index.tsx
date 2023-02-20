import React, { useState } from 'react';
import PlayerTechnology from '@/components/FBPlayerInfo/PlayerTechnology';
import FBShadowTab from '@/components/FBShadowTab';
import styles from './index.less';
import { FormattedMessage } from 'umi';
import FBTitle from '@/components/FBTitle';
import { Tabs } from 'antd-mobile';

import Date from './Date';
type Props = {};

const Technology = (props: Props) => {
  const [activeKey, setActiveKey] = useState('1');
  const tab = [
    {
      key: '1',
      title: '联赛',
    },
    {
      key: '2',
      title: '杯赛',
    },
  ];
  const formatted = [
    {
      key: 'key_new_goalkeeper',
    },
    {
      key: 'key_attack',
    },
    {
      key: 'key_pass_ball',
    },
    {
      key: 'key_guard',
    },
  ];
  const onChangeTab = (key: string) => {
    setActiveKey(key);
  };
  const onClick = (key: string) => {
    console.log(key, 'ssss');
  };

  return (
    <div className={styles.technology}>
      <div className={styles.technology_tab}>
        <div>
          <FBShadowTab tab={tab} activeKey={activeKey} onChangeTab={onChangeTab} />
        </div>
        <Date onClick={onClick} />
      </div>
      <div className={styles.technology_tab}>
        <div>2022-2023</div>
        <div>西甲-皇马</div>
      </div>
      <div style={{ padding: '12px' }}>
        <PlayerTechnology />
      </div>
      {formatted.map((item) => {
        return (
          <div key={item.key}>
            <div className={styles.demoblock_height} />
            <div style={{ padding: '12px' }}>
              <FBTitle logo={true} title={<FormattedMessage id={item.key} />} />
              <PlayerTechnology />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Technology;
