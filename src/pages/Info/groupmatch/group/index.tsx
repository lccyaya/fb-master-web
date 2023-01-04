import React, { useEffect, useState } from 'react';
import { ScoresList } from '@/services/worldcup';
import type { scoresListprops, Datares } from '@/services/worldcup';
import Table from '@/pages/WorldCup/Schedule/table';
import styles from './index.less';
import * as competitionService from '@/services/competition';
import { Spin } from 'antd';
import { getAccordWithLabel } from '@/utils/match';
import { TypeList } from "./tabsconfig"
import FBTableType from "@/components/FBTableType"


type Props = {
  competition_id: number;
  season_id: number;
  integrate: any;
};

const Group = (props: Props) => {
  const [scoresList, setScoresList] = useState<scoresListprops[] | scoresListprops>();
  const [loading, setLoading] = useState<boolean>(false);
  const { competition_id, season_id, integrate } = props;


  // 世界杯
  // 联赛 columns

  const getScoresList = async () => {
    setLoading(true);
    const data = {
      competition_id: competition_id,
      season_id: season_id,
    };
    const res: any =
      competition_id == 1 ? await ScoresList(data) : await competitionService.ranking(data);
    console.log('oooooooo');

    if (res.success) {
      setLoading(false);

      setScoresList(res.data?.list ? res.data?.list : res.data?.tables);
    }
  };


  useEffect(() => {
    getScoresList();
  }, [season_id]);

  return (
    <div className={styles.match_cap_list}>

      <Spin spinning={loading}>
        {/* 判断什么时候显示 联赛/分组赛淘汰赛*/}
        {scoresList?.length ? (
          <div>
            {' '}
            {scoresList?.map((item, index: any) => {
              return (
                <div className={styles.title_left} key={item.team_id}>
                  <div className={styles.title_left_img}></div>
                  <Table data={item.all} group={item.groups - 1} />
                  <div style={{ height: 2, width: '100%', background: '#F7F7F7' }} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className={styles.title_left}>
            {integrate == 1 && (
              <div >
                <div className={styles.title_left_img}></div>
                <Table titletext="排名" data={scoresList?.all} />
                <FBTableType TypeList={TypeList} />
                <div style={{ height: 2, width: '100%', background: '#F7F7F7' }} />
              </div>
            )}
            {integrate == 2 && (
              <div>
                <div className={styles.title_left_img}></div>
                <Table titletext="排名" data={scoresList?.home} />
                <div style={{ height: 2, width: '100%', background: '#F7F7F7' }} />
              </div>
            )}
            {integrate == 3 && (
              <div>
                <div className={styles.title_left_img} />
                <Table titletext="排名" data={scoresList?.away} />
              </div>
            )}
          </div>
        )}
      </Spin>

    </div>
  );
};

export default Group;
