import React, { useState, useEffect } from 'react';
import styles from './index.less';
import FBShadowTab from '@/components/FBShadowTab';
import { getMatchStageList, getMatchStagidList, getMatchRuleList } from '@/services/matchPage';
import { Spin } from 'antd';

import Fule from './fule';
import Group from './group';
type Props = {
  season_id: number;
  competition_id: number;
  integrate: any;
  type: string;
};

const Groupmatch = (props: Props) => {
  const { competition_id, season_id, integrate, type } = props;
  const [active, setActive] = useState();
  const [cuptab, setCuptab] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [rule, setRule] = useState<any>();

  const getdatalist = async (activekey: any) => {
    const resultlist = await getMatchStagidList({ stage_id: activekey });
    if (resultlist.success) {
      setData(resultlist.data.list);
    }
  };
  const init = async () => {
    if (season_id) {
      setLoading(true);
      const params = {
        competition_id: competition_id,
        season_id: season_id,
      };
      const result = await getMatchStageList(params);
      setLoading(false);
      if (result.success && result?.data) {
        const arr = result?.data.map((item, index) => {
          return { title: item.name, key: item.stage_id };
        });
        setActive(result?.data[0].stage_id);
        setCuptab(arr);
        getdatalist(result?.data[0].stage_id);
      }
      const resultrule = await getMatchRuleList(params);
      if (resultrule.success) {
        if (resultrule?.data?.text.length) {
          const ruledata = resultrule?.data?.text.split('\n');
          setRule(ruledata);
        }
      }
    }
  };

  useEffect(() => {
    init();
  }, [season_id]);

  const onChangetab = (value: any) => {
    setActive(value);
    getdatalist(value);
  };

  return (
    <div className={styles.groupmatch}>
      <div>
        <div style={{ background: '#FAFBFD', width: '100%' }}>
          {active && (
            <div>
              <FBShadowTab tab={cuptab} activeKey={active.toString()} onChangeTab={onChangetab} />
            </div>
          )}
        </div>

        <Spin spinning={loading}>
          <Group scoresList={data} type={type} integrate={integrate} />
        </Spin>

        {/* <Empty message="暂无数据" /> */}
      </div>

      {/* 判断是否显示规则 */}
      {rule && (
        <div style={{ background: '#fff', paddingTop: '20px' }}>
          <Fule rule={rule} />
        </div>
      )}
    </div>
  );
};

export default Groupmatch;
