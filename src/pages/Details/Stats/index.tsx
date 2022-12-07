import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import Ranking from './Ranking';
import * as matchService from '@/services/match';
import { FormattedMessage } from 'umi';
import { cupmatchList } from '@/services/matchdetail';
// import type * as matchService from '@/services/match';

import styles from './index.less';

interface IProps {
  match_id: number;
  match: matchService.MatchDetails;
}
const Stats: React.FC<IProps> = (props) => {
  const { match_id } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  const getCupmatchList = async () => {
    const params: any = {
      match_id,
    };
    const res = await cupmatchList(params);
    if (res.success) {
      setData(res.data);
      setLoading(true);
    }
    console.log(res.data, 'pppppppppp');
  };

  useEffect(() => {
    getCupmatchList();
    // getAwayFutureList();
  }, []);

  return (
    // <Spin spinning={loading}>
    <div className={styles.tabstyle}>
      {data?.home && data?.away ? (
        <div className={styles.mobileStatTitle_title}>
          <div className={styles.title_logo}></div>
          <FormattedMessage id="key_league_ranking" />
        </div>
      ) : null}

      <Ranking match={data} matchTypeData={props.match} />
    </div>
    // </Spin>
  );
};

export default Stats;
