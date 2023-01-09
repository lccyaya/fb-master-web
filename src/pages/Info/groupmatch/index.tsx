import React, { useState, useEffect } from 'react';
import styles from './index.less';
import FBWorldCapTab from '@/components/FBWordCopTab';
import { getMatchStageList, getMatchStagidList, getMatchRuleList } from '@/services/matchPage';
import { Spin } from 'antd';


import Fule from './fule';
import Group from './group';
type Props = {
  season_id: number;
  competition_id: number;
  integrate: any;
  type: string
};

const Groupmatch = (props: Props) => {
  const { competition_id, season_id, integrate, type } = props;
  const [active, setActive] = useState();
  const [cuptab, setCuptab] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [rule, setRule] = useState<any>();

  const getdatalist = async (activekey: any) => {
    const resultlist = await getMatchStagidList({ stage_id: activekey })
    if (resultlist.success) {
      setData(resultlist.data.list)
    }
  }
  const init = async () => {
    if (season_id) {
      setLoading(true)
      const params = {
        competition_id: competition_id,
        season_id: season_id,
      }
      const result = await getMatchStageList(params);
      setLoading(false)

      if (result.success && result?.data) {
        // console.log([result?.data[0]]);

        const arr = result?.data.map((item, index) => {
          return { title: item.name, key: item.stage_id }
        })

        setActive(result?.data[0].stage_id)
        setCuptab(arr)
        getdatalist(result?.data[0].stage_id)

      }
      const resultrule = await getMatchRuleList(params);
      if (resultrule.success) {
        const ruledata = resultrule?.data?.text.split("\n")
        setRule(ruledata)

      }
    }

  };

  useEffect(() => {
    init();
  }, [season_id]);

  const onChangetab = (value: any) => {
    setActive(value);
    getdatalist(value)
  };

  return (
    <div className={styles.groupmatch}>
      {active &&
        <div> <div style={{ background: "#FAFBFD", width: "100%" }}>
          <div className={styles.tab} >
            <FBWorldCapTab
              list={cuptab}
              activeKey={active?.toString()}
              mini
              onChange={onChangetab}
            />
          </div>
        </div>
          <Spin spinning={loading}>

            <Group scoresList={data} type={type} integrate={integrate} />




          </Spin>
        </div>
      }

      {/* 判断是否显示规则 */}
      <div style={{ background: "#fff", paddingTop: "20px" }}>
        <Fule rule={rule} />
      </div>

    </div>
  );
};

export default Groupmatch;
