import React, { ReactElement, useEffect, useState } from 'react';
import { Table, ConfigProvider } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Empty from '@/components/Empty';
import RankingOne from '@/assets/worldcup/Ranking_1.png';
import RankingTwo from '@/assets/worldcup/Ranking_2.png';
import RankingThree from '@/assets/worldcup/Ranking_3.png';
import { useHistory } from 'umi';
import GuessAvatar from '@/assets/worldcup/guess_avatar.png';
import FBTitle from '@/components/FBTitle';
import { Color } from '@/utils/match';
// import { ScoresList } from "@/services/worldcup"

import styles from './index.less';
interface DataType {
  key: string;
  ranking: string;
  num: number;
  team: string;
  teamplay: string;
  team_logo: string;
  position: number;
  played: number;
  won: number;
  against: number;
  drawn: number;
  goals: number;
  diff: number;
  lost: number;
  team_id: number;
  avatar: string;
}
type Props = {
  group?: string | number;
  data?: any;
  activeKey?: string;
  addRight?: ReactElement;
  columns?: ColumnsType<DataType>;
  dataText?: boolean;
  dataTitle?: boolean;
};
const customizeRenderEmpty = () => (
  <div style={{ textAlign: 'center' }}>
    <Empty style={{ fontSize: 20 }} />
  </div>
);
const TablePage = (props: Props) => {
  const history = useHistory();

  const { addRight, dataText, dataTitle } = props;
  return (
    <div className={styles.tab_teamtable_rank}>
      <div style={{ padding: '0 10px' }}>
        <div className={styles.rank_title}>
          {dataTitle ? <FBTitle title="西甲" /> : <FBTitle title="" />}

          <div>{addRight}</div>
        </div>

        {dataText && (
          <div className={styles.data_text}>
            <div>
              近12场交战 卡塔尔
              <span style={{ color: Color.numColor('win') }}> 2胜</span>
              <span style={{ color: Color.numColor('draw') }}>2平</span>
              <span style={{ color: Color.numColor('lost') }}> 0负</span>
            </div>

            <div className={styles.data_text_rate}>胜率50% 赢率37.5% 大率75%备份</div>
          </div>
        )}
      </div>

      <ConfigProvider renderEmpty={customizeRenderEmpty}>
        <Table
          pagination={false}
          columns={props.columns}
          dataSource={props.data}
          rowKey="user_id"
          // onRow={record => {
          //     return {
          //         onClick: event => {
          //             console.log(record, "pppp");

          //             history.push(`/zh/teamdetails/${record.team_id}`)
          //         }, // 点击行

          //     };
          // }}
        />
      </ConfigProvider>
    </div>
  );
};

export default TablePage;
