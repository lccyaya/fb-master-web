import React from 'react';
// import FBWorldCapTab from '@/components/FBWordCopTab';
import { FormattedMessage } from 'umi';
import RightTab from '../../Stats/RightTab';
import OddsType from '../OddsType';
import IconFont from '@/components/IconFont';
import styles from './index.less';
// import { Button, Space } from 'antd-mobile';

type Props = {};


const GoalLost = (props: Props) => {

  return (
    <div>
      <div className={styles.mobile_stat_title}>
        <div className={styles.mobile_stat_title_list}>
          <div className={styles.title_logo}></div>
          <FormattedMessage id="key_schedule_before" />
        </div>

        <div>
          <div className={styles.getmore}>
            查看更多
            <IconFont
              className={styles.icon}
              size={10}
              type="icon-jiantouyou"
            />
          </div>
        </div>
      </div>
      <div className={styles.goallost_match_tab}>
        <OddsType />
        {/* <div>xxxx</div> */}

      </div>
    </div>

  );
};

export default GoalLost;
