import React, { useState } from 'react';
import { NavBar } from 'antd-mobile';
import FBTabs from '@/components/FBTabs';
import Guess from './Guess';
import GuessCenter from './GuessCenter';
import GuessRanking from './GuessRanking';
import Rule from '@/assets/worldcup/rule.png';
import { useHistory, useSelector } from 'umi';

import styles from './index.less';
import { ConnectState } from '@/models/connect';
import { webJsBridge } from '@/services/webjsbridge';

type Props = {};

const WorldCapguess = (props: Props) => {
  const history = useHistory();
  const [curKey, setCurKey] = useState('0');
  const isNative = useSelector<ConnectState>((s) => s.native.isNative);

  const items = [
    {
      key: '0',
      title: '世界杯竞猜',
    },
    {
      key: '1',
      title: '竞猜中心',
    },
    {
      key: '2',
      title: '竞猜排行',
    },
  ];

  const handleTabClick = (key: string) => {
    console.log(key);
    setCurKey(key);
  };
  const title = (
    <FBTabs
      items={items}
      activeKey={curKey}
      onChange={handleTabClick}
      selectStyle={{ fontSize: '20px', color: '#000000' }}
      normalStyle={{ color: '#000028' }}
    />
  );
  const back = () => {
    history.goBack();
  };
  // 跳转规则
  const goRule = () => {
    if (isNative) {
      webJsBridge.callHandler('openSchemeUrl', 'sport34://router/news?id=4153', (res: string) => {
        console.log(res);
      });
    } else {
      history.push('/zh/informationdetail/4153');
    }
  };

  return (
    <div className={styles.main_guess_bg}>
      <div className={styles.guess_bg}>
        <div style={{ position: 'fixed', width: '100%', zIndex: '1000', background: '#fff' }}>
          <NavBar
            backArrow={!isNative}
            style={{ '--height': '50px' }}
            onBack={back}
            right={
              curKey !== '0' ? (
                <div style={{ color: '#848494', fontSize: 11, height: 15 }} onClick={goRule}>
                  规则
                </div>
              ) : (
                ''
              )
            }
          >
            {title}
          </NavBar>
        </div>
        <div style={{ height: 50, background: '#fff' }}></div>
        {curKey !== '0' ? null : (
          <div className={styles.guess_rule} onClick={goRule}>
            <img src={Rule} alt="" />
          </div>
        )}
      </div>
      <div style={{ height: 150, background: '#F7F7F7' }}></div>
      {curKey == '0' ? <Guess /> : null}

      {curKey == '1' ? <GuessCenter /> : null}
      {curKey == '2' ? <GuessRanking /> : null}
    </div>
  );
};

export default WorldCapguess;
