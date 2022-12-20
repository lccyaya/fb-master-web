import React, { useState } from 'react';
import styles from './index.less';
import FBWorldCapTab from '@/components/FBWordCopTab';
import Table from '@/pages/WorldCup/Schedule/table';
import type { ColumnsType } from 'antd/es/table';
import type { cupmatchListType, cupmatchTypeList } from '@/services/matchdetail';
import { MatchRanking } from '@/utils/match';
import Fule from './fule';
import Group from './group';
import Eliminate from './eliminate';
type Props = {
  data: any;
  season_id: number;
};

const Groupmatch = (props: Props) => {
  const { data, season_id } = props;
  const [active, setActive] = useState('0');
  const tab = [
    {
      title: '分组赛',
      key: '0',
    },
    {
      title: '淘汰赛',
      key: '1',
    },
  ];
  console.log(season_id, 'kkkkl');

  const onChangetab = (value) => {
    setActive(value);
  };
  // const columns = (name: string): ColumnsType<cupmatchListType> => {
  //   return [
  //     {
  //       title: (
  //         <div className={styles.wrapnamestyle} style={{ fontWeight: 600, color: '#000028' }}>
  //           {name}
  //         </div>
  //       ),
  //       dataIndex: 'label',
  //       key: 'label',
  //       align: 'center',
  //       width: 80,
  //       render: (text) => <div>{MatchRanking(text)}</div>,
  //     },

  //     {
  //       title: '赛',
  //       dataIndex: 'played',
  //       key: 'played',
  //       align: 'center',
  //       // render: (text, record, index) => <div>{text}</div>,
  //     },
  //     {
  //       title: '胜/平/负',
  //       dataIndex: 'won',

  //       key: 'won',
  //       align: 'center',
  //       render: (text, record) => (
  //         <div>
  //           {text}/{record.drawn}/{record.lost}
  //         </div>
  //       ),
  //     },
  //     {
  //       title: '进/失/净',
  //       dataIndex: 'goals',

  //       align: 'center',
  //       render: (text, record) => (
  //         <div>
  //           {text}/{record.against}/{record.diff}
  //         </div>
  //       ),
  //     },
  //     {
  //       title: '积分',
  //       dataIndex: 'pts',

  //       align: 'center',
  //     },
  //     {
  //       title: '排名',
  //       dataIndex: 'position',
  //       align: 'center',
  //       // render: (text, record, index) => <div style={{ color: '#7E1132' }}>{text}</div>,
  //     },
  //   ];
  // };
  return (
    <div className={styles.groupmatch}>
      <div className={styles.tab}>
        <FBWorldCapTab list={tab} defaultActiveKey={active} mini onChange={onChangetab} />
      </div>
      {active == '0' && (
        <div className={styles.table}>
          <div className={styles.logoshu}></div>
          <Table data={data?.away} group={1} />
        </div>
      )}
      {active == '1' && <Eliminate season_id={season_id}></Eliminate>}

      {/* 判断是否显示规则 */}
      <Fule></Fule>
    </div>
  );
};

export default Groupmatch;
