import React, { useEffect, useState } from 'react';
// import FBWorldCapTab from '@/components/FBWordCopTab';
import { FormattedMessage } from 'umi';
import RightTab from '../../Stats/RightTab';
import type { GoalDistributionListRes } from '@/services/matchdetail';
import styles from './index.less';
import Table from './table';
import FBTitle from '@/components/FBTitle';
import { goalDistribution } from '@/services/matchdetail';

type Props = {
  match_id: number;
};

const GoalLost = (props: Props) => {
  const { match_id } = props;
  const [titleType, setTitleType] = useState(1);
  const [data, setData] = useState<GoalDistributionListRes>();

  const options = [
    { label: '同主客', value: 'event' },
    { label: '上季赛', value: 'sameCompetition' },
  ];
  const getGoalDistributio = async () => {
    const params = {
      match_id,
      tab: titleType,
    };
    const res = await goalDistribution(params);
    if (res.success) {
      setData(res.data);
    }
    console.log(res, '失球分布');
  };
  // 进球分布
  const onGoal = () => {
    setTitleType(1);
  };
  // 失球分布
  const onLost = () => {
    setTitleType(2);
  };
  useEffect(() => {
    getGoalDistributio();
  }, [titleType]);

  return (
    <div>
      {data?.home?.name && data?.away.name && (
        <div>
          <div className={styles.mobile_stat_title}>
            <div className={styles.mobile_stat_flex}>
              <FBTitle logo={true} title={<FormattedMessage id="key_schedule_goal" />} />
            </div>
            <div className={styles.mobile_goal_flex}>
              <div className={titleType == 1 ? styles.active : styles.no_active} onClick={onGoal}>
                进球
              </div>
              <div className={titleType == 2 ? styles.active : styles.no_active} onClick={onLost}>
                失球
              </div>
            </div>
          </div>
          <div className={styles.goallost_match_tab}>
            <Table data={data} />
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalLost;
