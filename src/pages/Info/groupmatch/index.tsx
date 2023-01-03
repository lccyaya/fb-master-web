import React, { useState } from 'react';
import styles from './index.less';
import FBWorldCapTab from '@/components/FBWordCopTab';
// import Table from '@/pages/WorldCup/Schedule/table';
// import type { ColumnsType } from 'antd/es/table';
// import type { cupmatchListType, cupmatchTypeList } from '@/services/matchdetail';
// import { MatchRanking } from '@/utils/match';
import Fule from './fule';
import Group from './group';
import Eliminate from './eliminate';
type Props = {
  season_id: number;
  competition_id: number;
  integrate: any;
  type: string
};

const Groupmatch = (props: Props) => {
  const { competition_id, season_id, integrate, type } = props;
  const [active, setActive] = useState('0');

  const cuptab = [
    {
      title: '分组赛',
      key: '0',
    },
    {
      title: '淘汰赛',
      key: '1',
    },
  ];
  const tabmatch = [
    {
      title: '联赛',
      key: '0',
    },
  ];

  const onChangetab = (value: string) => {
    setActive(value);
  };

  return (
    <div className={styles.groupmatch}>
      <div style={{ background: "#FAFBFD", width: "100%" }}>

        <div className={styles.tab} style={{ width: type == "2" ? '180px' : '100px' }}>
          <FBWorldCapTab
            list={type == "2" ? cuptab : tabmatch}
            defaultActiveKey={active}
            mini
            onChange={onChangetab}
          />
        </div>
      </div>
      {active == '0' && (
        <Group competition_id={competition_id} season_id={season_id} integrate={integrate} />
      )}
      {active == '1' && <Eliminate season_id={season_id} />}

      {/* 判断是否显示规则 */}
      <div style={{ background: "#fff", paddingTop: "20px" }}>
        <Fule />
      </div>

    </div>
  );
};

export default Groupmatch;
