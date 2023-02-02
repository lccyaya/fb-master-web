import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import Ranking from './Ranking';
import * as matchService from '@/services/match';
import CutMatchRank from '../Stats/CutMatchRank';
import { FormattedMessage } from 'umi';
import { cupmatchList } from '@/services/matchdetail';
import type { CupmatchListRes } from '@/services/matchdetail';

import FBTitle from '@/components/FBTitle';

// import type * as matchService from '@/services/match';

import styles from './index.less';

interface IProps {
  match_id: number;
  match: matchService.MatchDetails;
}
const Stats: React.FC<IProps> = (props) => {
  const { match_id } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<CupmatchListRes>();
  const getCupmatchList = async () => {
    setLoading(true);
    const params: any = {
      match_id,
    };
    const res = await cupmatchList(params);
    if (res.success) {
      setData(res.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCupmatchList();
    // getAwayFutureList();
  }, []);

  return (
    <div className={styles.tabstyle}>
      <Spin style={{ minHeight: 70 }} spinning={loading}>
        {data?.list && (
          <div>
            <FBTitle
              size="18px"
              color="#45494C"
              logo={true}
              title={<FormattedMessage id="key_league_ranking" />}
            />
            <Ranking match={data?.list} matchTypeData={props.match} />
          </div>
        )}

        {data?.cup && (
          <div>
            <FBTitle
              size="18px"
              color="#45494C"
              logo={true}
              title={<FormattedMessage id="key_cup_match_ranking" />}
            />
            <div>
              <CutMatchRank dataSource={data?.cup} matchTypeData={props.match} />
            </div>
          </div>
        )}
      </Spin>
    </div>
  );
};

export default Stats;
