import React, { useEffect, useState } from 'react';
import RightTab from '../Stats/RightTab';
import styles from './index.less';
import Table from './table';
import { FormattedMessage } from 'umi';
import FBTitle from '@/components/FBTitle';
import { statsDetails } from '@/services/matchdetail';
import type { StatsDetailsParams, StatsDetailsRes } from '@/services/matchdetail';

import { Spin } from 'antd';

type Props = {
  match_id: number;
};

const Ranking = (props: Props) => {
  const [data, setData] = useState<StatsDetailsRes>();
  const { match_id } = props;
  const [loading, setLoading] = useState<boolean>(false);

  const getStatsDetails = async (params: StatsDetailsParams) => {
    setLoading(true);

    const res = await statsDetails(params);
    setLoading(false);
    if (res.success) {
      setData(res.data);
    }
  };
  useEffect(() => {
    const params = {
      match_id,
      tab: 0,
      num: 20,
    };
    getStatsDetails(params);
  }, []);

  // 切换按钮
  const onChange = (value: any) => {
    const params: any = {
      match_id,

      tab: value.includes('event') ? 1 : 0,
      sameCompetition: value.includes('sameCompetition') ? 1 : 0,
      // num: value.includes('num') ? 20 : 10,
      num: 20,
    };
    getStatsDetails(params);
  };

  return (
    <div>
      <div className={styles.mobile_stat_title}>
        <FBTitle
          logo={true}
          size="18px"
          color="#45494C"
          title={<FormattedMessage id="key_attack_defenseh" />}
        />
        <div>
          <RightTab options={options} onChange={onChange} />
        </div>
      </div>
      <div className={styles.strength_main}>
        <Spin spinning={loading}>
          <Table data={data} />
        </Spin>

        <div style={{ height: 10 }} />
        <Spin spinning={loading}>
          <Table type="shou" data={data} />
        </Spin>
      </div>
    </div>
  );
};

export default Ranking;
