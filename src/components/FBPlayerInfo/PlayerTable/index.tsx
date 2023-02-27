import React, { useState, useEffect, useRef } from 'react';
import FBShadowTab from '@/components/FBShadowTab';
import styles from './index.less';
import { SideBar } from 'antd-mobile';
import { Table, ConfigProvider } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { PlayerGoalListParams } from '@/services/worldcup';
import avatarImg from '@/assets/mine/avatar.png';

import Empty from '@/components/Empty';

import useWindowSize from '@/hooks/useWindowSize';
import { PlayerGoalList } from '@/services/worldcup';
type Props = {
  loading: boolean;
  data: any;
  tab: any;
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
        <img
          style={{ width: 25, height: 25, marginRight: 5 }}
          src={record.logo ? record.logo : avatarImg}
          alt=""
        />

        <div
          style={{
            textAlign: 'left',
            // width: 150,
            // overflow: "hidden",
            // whiteSpace: "nowrap",
            // textOverflow: "ellipsis"
          }}
        >
          {text}
        </div>
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
        <img
          style={{ width: 25, height: 25, marginRight: 5 }}
          src={record.team_logo ? record.team_logo : avatarImg}
          alt=""
        />
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

const PlayerTable = (props: Props) => {
  const { loading, data, tab } = props;
  const [activeKey, setActiveKey] = useState('key_teamplayers');
  const [columns, setColumns] = useState(teamplayer_columns);
  const [innerHeight, setInnerHeight] = useState<number>(0);
  const { height } = useWindowSize();

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

  useEffect(() => {
    const height1 = height - 205;
    setInnerHeight(height1);
  }, [height]);

  return (
    <div className={styles.match_cap_list}>
      {/* <div style={{ background: "#FAFBFD", width: "100%", height: 45 }}> */}
      <div style={{ background: '#FAFBFD', width: '100%' }}>
        <div className={styles.tab}>
          <FBShadowTab tab={tab} activeKey={activeKey} onChangeTab={onChangetab} />
        </div>
      </div>
      <div className={styles.tab_team}>
        <SideBar
          activeKey="goal"
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

export default PlayerTable;
