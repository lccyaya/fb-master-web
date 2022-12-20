import React, { useEffect, useState } from 'react';
import { BracketList } from '@/services/worldcup';
import type { eliminateList } from '@/services/worldcup';
import type { Datares } from '@/services/worldcup';
import Eliminate from '@/pages/WorldCup/Schedule/eliminate';
type Props = {
  season_id: number;
};

const EliminatePage = (props: Props) => {
  const { season_id } = props;
  console.log(season_id, 'kkkkkkk');

  const [eliminateList, setEliminateList] = useState<eliminateList>();
  const getBracketList = async () => {
    let data = {
      season_id: season_id,
    };
    let res: Datares = await BracketList(data);
    // if (res.success) {
    //   console.log(res, '淘汰赛99999999');

    //   let newdata = res.data.tables;
    //   let data = newparams(newdata);
    //   setEliminateList(data);
    // }
  };
  //   function newparams(newdata: any) {
  //     let onelist = [];
  //     let twolist = [];

  //     for (let i = 0; i < newdata.length; i++) {
  //       let num;
  //       if (newdata[i].matchUps.length > 1) {
  //         num = newdata[i].matchUps.length / 2;
  //         onelist.push(newdata[i].matchUps.slice(0, num));

  //         twolist.push(newdata[i].matchUps.slice(num, newdata[i].matchUps.length));
  //       } else {
  //         if (i == newdata.length - 1) {
  //           twolist.push(newdata[i].matchUps);
  //         }
  //         if (i == newdata.length - 2) {
  //           onelist.push(newdata[i].matchUps);
  //         }
  //       }
  //     }

  //     let obj = {
  //       onelist,
  //       twolist,
  //     };

  //     return obj;
  //   }
  useEffect(() => {
    getBracketList();
  }, []);
  return (
    <div>
      <Eliminate eliminateList={eliminateList}></Eliminate>
    </div>
  );
};

export default EliminatePage;
