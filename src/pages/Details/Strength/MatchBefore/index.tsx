import React, { useEffect, useState } from 'react';
// import FBWorldCapTab from '@/components/FBWordCopTab';
import { FormattedMessage } from 'umi';
import RightTab from '../../Stats/RightTab';
import OddsType from '../OddsType';
import IconFont from '@/components/IconFont';
import styles from './index.less';
// import { Button, Space } from 'antd-mobile';
import FBTitle from '@/components/FBTitle';
import { oddsDetails } from '@/services/matchdetail';

type Props = {
  match_id: number;
};
const GoalLost = (props: Props) => {
  const [data, setData] = useState<any>();
  const { match_id, setDetailType } = props;

  const getOddsDetails = async () => {
    const params = {
      match_id,
    };
    const res = await oddsDetails(params);
    if (res.success) {
      setData(res.data);
    }
    console.log(res, 'sp');
  };
  useEffect(() => {
    getOddsDetails();
  }, []);
  return (
    <div>
      <div>
        <div className={styles.mobile_stat_title}>
          <FBTitle
            logo={true}
            size="18px"
            color="#45494C"
            title={<FormattedMessage id="key_schedule_before" />}
          />
          <div>
            <div
              className={styles.getmore}
              onClick={() => {
                setDetailType('index');
              }}
            >
              查看更多
              <IconFont className={styles.icon} size={10} type="icon-jiantouyou" />
            </div>
          </div>
        </div>
        <div className={styles.goallost_match_tab}>
          <OddsType data={data} />
          {/* <div>xxxx</div> */}
        </div>
      </div>
    </div>
  );
};

export default GoalLost;
