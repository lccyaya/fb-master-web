import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import Ranking from './Ranking';
import type * as matchService from '@/services/match';

import styles from './index.less';

interface IProps {
  matchId: number;
  match: matchService.MatchDetails;
}
const Stats: React.FC<IProps> = (props) => {
  useEffect(() => {}, []);

  return (
    <Spin spinning={false}>
      <div className={styles.tabstyle}>
        <Ranking />
      </div>
    </Spin>
  );
};

export default Stats;
