import React, { useEffect, useState } from 'react';
import { BracketList } from '@/services/worldcup';
import type { eliminateList } from '@/services/worldcup';
import type { Datares } from '@/services/worldcup';
import Eliminate from '@/pages/WorldCup/Schedule/eliminate';
import styles from './index.less';
import { Spin } from 'antd';
import Empty from '@/components/Empty';
type Props = {
  season_id: number;
};

const EliminatePage = (props: Props) => {
  const { season_id } = props;
  console.log(season_id, 'kkkkkkk');
  const [loading, setLoading] = useState<boolean>(false);
  const [eliminateList, setEliminateList] = useState<eliminateList>();
  const getBracketList = async () => {
    setLoading(true);
    let data = {
      season_id: season_id,
    };
    let res: Datares = await BracketList(data);
    if (res.success) {
      console.log(res, '淘汰赛99999999');
      setLoading(false);
      let newdata = res.data.tables;
      let data = newparams(newdata);
      setEliminateList(data);
    }
  };
  function newparams(newdata: any) {
    let onelist = [];
    let twolist = [];

    for (let i = 0; i < newdata.length; i++) {
      let num;
      if (newdata[i].matchUps.length > 1) {
        num = newdata[i].matchUps.length / 2;
        onelist.push(newdata[i].matchUps.slice(0, num));

        twolist.push(newdata[i].matchUps.slice(num, newdata[i].matchUps.length));
      } else {
        if (i == newdata.length - 1) {
          twolist.push(newdata[i].matchUps);
        }
        if (i == newdata.length - 2) {
          onelist.push(newdata[i].matchUps);
        }
      }
    }

    let obj = {
      onelist,
      twolist,
    };

    return obj;
  }
  useEffect(() => {
    getBracketList();
  }, [season_id]);
  return (
    <div className={styles.eliminateList}>
      <Spin spinning={loading}>
        {eliminateList?.onelist.length && eliminateList?.twolist.length ? (
          <Eliminate eliminateList={eliminateList}></Eliminate>
        ) : (
          <Empty style={{ fontSize: 20 }} />
        )}
      </Spin>
    </div>
  );
};

export default EliminatePage;
