import React, { useState, useEffect, useRef } from 'react';
import FBWorldCapTab from '@/components/FBWordCopTab';
import styles from './index.less';
import { SideBar } from 'antd-mobile';
import { Table, ConfigProvider } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { PlayerGoalListParams } from '@/services/worldcup';

import Empty from '@/components/Empty';

import useWindowSize from '@/hooks/useWindowSize';
import { PlayerGoalList } from '@/services/worldcup';
type Props = {
  season_id: number
  competition_id: number
};
interface DataType {
  key: string;
  ranking: string;
  num: number;
  team: string;
  teamplay: string;
  team_logo: string;
}
const team_columns: ColumnsType<DataType> = [
  {
    title: '排名',
    dataIndex: 'ranking',
    key: 'ranking',
    align: 'center',
    // render: text => <a>{text}</a>,
  },
  {
    title: '球队',
    dataIndex: 'team',
    key: 'team',
    // width: 100,
    align: 'center',
  },
  {
    title: '总数',
    dataIndex: 'num',
    key: 'address',
    align: 'center',
  },
];
const teamplayer_columns: ColumnsType<DataType> = [
  {
    title: '排名',
    dataIndex: 'position',
    key: 'position',
    align: 'center',
    width: 40,

    // render: text => <a>{text}</a>,
  },
  {
    title: '球员',
    dataIndex: 'name',
    key: 'name',
    // width: 100,
    // align: 'center',
    // ellipsis: true,
    render: (text, record, index) => (
      <div className={styles.logo}>
        <img style={{ width: 25, height: 25, marginRight: 5 }} src={record.logo} alt="" />

        <div style={{
          textAlign: "left",
          // width: 150,
          // overflow: "hidden",
          // whiteSpace: "nowrap",
          // textOverflow: "ellipsis"
        }}>{text}</div>
      </div>
    ),
  },
  {
    title: '球队',
    dataIndex: 'team_name',
    key: 'team_name',
    align: 'center',
    // ellipsis: true
    render: (text, record, index) => (
      <div className={styles.team_logo}>
        <img style={{ width: 25, height: 25, marginRight: 5 }} src={record.team_logo} alt="" />

      </div>
    ),

  },
  {
    title: '总数',
    dataIndex: 'goal',
    key: 'goal',
    align: 'center',
    width: 50,
  },
];

const Rankinglist = (props: Props) => {
  const { competition_id, season_id } = props
  const [activeKey, setActiveKey] = useState('key_teamplayers');
  const [columns, setColumns] = useState(teamplayer_columns);
  const [loading, setLoading] = useState<boolean>(false);

  const [innerHeight, setInnerHeight] = useState<number>(0);
  const [data, setData] = useState([]);
  const tabref = useRef<any>();
  const { height } = useWindowSize();
  const tab = [
    //     {
    //     title: "球队",
    //     key: "key_team",
    // },
    {
      title: '球员',
      key: 'key_teamplayers',

    },
  ];
  const customizeRenderEmpty = () => (
    <div style={{ textAlign: 'center' }}>
      <Empty style={{ fontSize: 20 }} />
    </div>
  );

  const onChangetab = (key: string) => {
    // console.log(key, "ppooiuytre");
    setActiveKey(key);
    if (key == 'key_teamplayers') {
      setColumns(teamplayer_columns);
    } else {
      setColumns(team_columns);
    }
  };

  const getPlayerGoalList = async (): Promise<any> => {
    setLoading(true);

    let data: PlayerGoalListParams = {
      competition_id: competition_id,
      season_id: season_id,
    };
    const result: any = await PlayerGoalList(data);

    if (result.success == true) {
      setLoading(false);

      setData(result.data);
    }
  };

  useEffect(() => {
    getPlayerGoalList();
    const height1 = height - tabref.current?.clientHeight - 170;
    setInnerHeight(height1);
  }, [height, season_id]);

  return (
    <div className={styles.match_cap_list}>
      {/* <div style={{ background: "#FAFBFD", width: "100%", height: 45 }}> */}
      <div style={{ background: "#FAFBFD", width: "100%" }}>

        <div className={styles.tab} ref={tabref}>
          <FBWorldCapTab
            mini={true}
            list={tab}
            defaultActiveKey={activeKey}
            onChange={onChangetab}
          />
        </div>
      </div>
      <div className={styles.tab_team}>
        <SideBar
          style={{
            '--width': '70px',
            '--height': `${innerHeight + 54}px`,
            '--item-border-radius': '0px',
            '--background-color': '#FAFBFD',
          }}
        >
          <SideBar.Item key="goal" title="进球" />
        </SideBar>
        <div className={styles.tab_teamtable}>
          <ConfigProvider renderEmpty={customizeRenderEmpty}>
            <Table
              scroll={{ y: innerHeight }}
              loading={loading}
              rowKey="position"
              pagination={false}
              columns={columns}
              dataSource={data}
            />
          </ConfigProvider>
          {/* <div style={{ height: 55 }}></div> */}
        </div>
      </div>
    </div>
  );
};

export default Rankinglist;
