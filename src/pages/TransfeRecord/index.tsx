import React, { useState } from 'react';
import { Tabs, Badge } from 'antd-mobile';
import { NavBar } from 'antd-mobile';
import styles from './index.less';
import { useHistory } from 'umi';
import FBTransfeRecord from '@/components/FBTransfeRecord';
import FBLineTab from '@/components/FBLineTab';
type Props = {};

const TransfeRecord = (props: Props) => {
  const [activeKey, setActiveKey] = useState('1');
  const history = useHistory();
  const onChangeTab = (key: string) => {
    console.log(key, 'kskskksks');
    setActiveKey(key);
  };
  const tab = [
    {
      title: '球员',
      key: '1',
    },
  ];
  const back = () => {
    history.goBack();
  };
  return (
    <div className={styles.transfe_record} style={{ background: '#F7F7F7' }}>
      <div style={{ position: 'sticky', top: '0', zIndex: 10, background: '#F7F7F7' }}>
        <NavBar onBack={back}>转会记录</NavBar>

        <FBLineTab tab={tab} onChangeTab={onChangeTab}></FBLineTab>
      </div>
      {activeKey == '1' && (
        <div className={styles.content}>
          <FBTransfeRecord />
        </div>
      )}
      {activeKey == '2' && (
        <div className={styles.content}>
          <FBTransfeRecord activeKey={activeKey} />
        </div>
      )}
    </div>
  );
};

export default TransfeRecord;
