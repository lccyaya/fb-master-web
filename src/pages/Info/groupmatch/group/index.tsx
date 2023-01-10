import React, { useEffect, useState } from 'react';
import Table from '@/pages/WorldCup/Schedule/table';
import styles from './index.less';
import Empty from '@/components/Empty';
// import { TypeList } from "./tabsconfig"
// import FBTableType from "@/components/FBTableType"




const Group = (props: Props) => {
  const { scoresList, type, integrate } = props

  return (
    <div>
      {/* 判断什么时候显示 联赛/分组赛淘汰赛*/}
      {scoresList.length ? <div className={styles.match_cap_list}>

        {scoresList?.map((item, index: any) => {
          return (
            <div className={styles.title_left} key={item.groups}>
              <div className={styles.title_left_img} />
              <Table integrate={integrate} data={integrate == "1" ? item.all : integrate == "2" ? item.home : item.away}
                titletext={item.groupName.length ? item.groupName : item.groups > 0 ? item.groups : "联赛"} />

              <div style={{ height: 2, width: '100%', background: '#F7F7F7' }} />
            </div>
          );
        })}
      </div> : <Empty message="暂无数据" />}

    </div>
  );
};

export default Group;
