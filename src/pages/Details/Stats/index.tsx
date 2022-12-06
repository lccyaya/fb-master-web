import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import Ranking from './Ranking';
import * as matchService from '@/services/match';
import { FormattedMessage } from 'umi';

// import type * as matchService from '@/services/match';

import styles from './index.less';

interface IProps {
  matchId: number;
  match: matchService.MatchDetails;
}
const Stats: React.FC<IProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [match, setMatch] = useState({});

  const init = async () => {
    setLoading(true);
    const result = await matchService.fetchRankingList({ match_id: props.matchId });
    setLoading(false);
    if (result.success) {
      setMatch(result.data.tables);
    }
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <Spin spinning={loading}>
      <div className={styles.tabstyle}>
        {match?.home && match?.away ? (
          <div className={styles.mobileStatTitle_title}>
            <div className={styles.title_logo}></div>
            <FormattedMessage id="key_league_ranking" />
          </div>
        ) : null}

        <Ranking match={match} matchTypeData={props.match} />
      </div>
    </Spin>
  );
};

export default Stats;
