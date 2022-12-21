import React, { useEffect, useState } from 'react';
import { ScoresList } from '@/services/worldcup';
import type { scoresListprops, Datares } from '@/services/worldcup';
import Table from '@/pages/WorldCup/Schedule/table';
import styles from './index.less';
import * as competitionService from '@/services/competition';
import { Spin } from 'antd';
import { getAccordWithLabel } from '@/utils/match';
import type { ColumnsType } from 'antd/es/table';


type Props = {
  competition_id: number;
  season_id: number;
  integrate: any;
};
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
}

const Group = (props: Props) => {
  const [scoresList, setScoresList] = useState<scoresListprops[] | scoresListprops>();
  const [loading, setLoading] = useState<boolean>(false);
  const { competition_id, season_id, integrate } = props;
  // 世界杯
  console.log(integrate, '8888888');
  // 联赛 columns
  const columns: ColumnsType<DataType> = [
    {
      title: (
        <div className={styles.title}>
          {/* {grouplist[props.group] ? `${grouplist[props.group]}组` : '排名'} */}
          2222
        </div>
      ),
      dataIndex: 'team_name',
      key: 'team_name',
      // width: 150,
      // align: "center",
      render: (text, record, index) => (
        <div style={{ display: 'flex' }}>
          <div style={{ margin: ' 0 5px' }}>{record.position}</div>
          <img
            style={{ width: 20, height: 20, margin: ' 0 5px', objectFit: 'contain' }}
            src={record.team_logo}
            alt=""
          />
          {text}
        </div>
      ),
    },
    {
      title: '赛',
      dataIndex: 'team',
      key: 'team',
      // width: 100,
      align: 'center',
      render: (text, record, index) => <div>{record.played}</div>,
    },
    {
      title: '胜/平/负',
      dataIndex: 'won',
      key: 'won',
      align: 'center',
      render: (text, record, index) => (
        <div>
          {record.won}/{record.drawn}/{record.lost}
        </div>
      ),
    },
    {
      title: '进/失/净',
      dataIndex: 'num',
      key: 'address',
      align: 'center',
      render: (text, record, index) => (
        <div>
          {record.goals}/{record.against}/{record.diff}
        </div>
      ),
    },
    {
      title: '积分',
      dataIndex: 'pts',
      key: 'pts',
      align: 'center',
    },
  ];
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

  // 联赛接口
  // const init = async () => {
  //   //    setLoading(!hideLoading);
  //   const result = await competitionService.ranking({
  //     competition_id: competition_id,
  //     season_id:season_id,
  //   });

  //   if (result.success) {
  //     setRanking(result.data.tables);
  //   }
  // };
  useEffect(() => {
    getScoresList();
  }, [season_id]);

  return (
    <div className={styles.cap_list}>
      {' '}
      <Spin spinning={loading}>
        {/* 判断什么时候显示 联赛/分组赛淘汰赛*/}
        {scoresList?.length ? (
          <div>
            {' '}
            {scoresList?.map((item, index: any) => {
              return (
                <div className={styles.title_left} key={item.team_id}>
                  <div className={styles.title_left_img}></div>
                  <div style={{ padding: "10px 0" }}> <Table data={item.all} group={item.groups - 1} /></div>
                  <div style={{ height: 10, width: '100%', background: '#F7F7F7' }}></div>


                </div>
              );
            })}
          </div>
        ) : (
          <div>
            {integrate == 1 && (
              <div>
                <Table propscolumns={competition_id == 1 ? null : columns} data={scoresList?.all} />
                <div style={{ height: 10, width: '100%', background: '#F7F7F7' }} />
              </div>
            )}
            {integrate == 2 && (
              <div>
                <Table propscolumns={competition_id == 1 ? null : columns} data={scoresList?.home} />
                <div style={{ height: 10, width: '100%', background: '#F7F7F7' }} />
              </div>
            )}
            {integrate == 3 && (
              <div>
                <Table propscolumns={competition_id == 1 ? null : columns} data={scoresList?.away} />
              </div>
            )}
          </div>
        )}
      </Spin>
    </div>
  );
};

export default Group;
