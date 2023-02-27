import React, { useState } from 'react';
import Group from '@/pages/Info/groupmatch/group';
import Groupmatch from '@/pages/Info/groupmatch/index';
import Fule from '@/pages/Info/groupmatch/fule';
import FBShadowTab from '@/components/FBShadowTab';
import styles from './index.less';
type Props = {};

const Integral = (props: Props) => {
  const [activeKey, setActiveKey] = useState('1');
  const { competition_id, season_id } = props;
  // const history = useHistory();

  return (
    <div>
      {/* <div className={styles.tab}>
        <FBShadowTab tab={tab} onChangeTab={onChangeTab} activeKey={activeKey}></FBShadowTab>
      </div>

      <Group scoresList={data} integrate="1" />
      <Group scoresList={data} integrate="1" />
      <Group scoresList={data} integrate="1" />
      <Group scoresList={data} integrate="1" />
      <Group scoresList={data} integrate="1" />
      <Group scoresList={data} integrate="1" /> */}
      <Groupmatch season_id={season_id} competition_id={competition_id} type="1" integrate="1" />
      {/* {rule && (
        <div style={{ background: '#fff', paddingTop: '20px' }}>
          <Fule rule={rule} />
        </div>
      )} */}
    </div>
  );
};

export default Integral;
