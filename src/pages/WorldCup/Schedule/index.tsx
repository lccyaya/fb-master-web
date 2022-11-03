import React, { useEffect, useState } from 'react';
import { useHistory } from 'umi';
import FBWorldCapTab from '@/components/FBWordCopTab';
import FBGroup from '@/components/FBGroup';
import Table from './table';
import styles from './index.less';
import { GroupList, ScoresList, BracketList } from '@/services/worldcup';
import type { GroupListres, scoresListprops, Datares } from '@/services/worldcup';
import Eliminate from './eliminate';
import type { eliminateList } from '@/services/worldcup';

type Props = {};
const Scheme = (props: Props) => {
  const history = useHistory();
  const [activeKey, setActiveKey] = useState('0');
  const [grouList, setGroupList] = useState<GroupListres[]>([]);
  const [scoresList, setScoresList] = useState<scoresListprops[]>();
  const [eliminateList, setEliminateList] = useState<eliminateList>();

  const tab = [
    {
      title: '小组赛',
      key: '0',
    },
    {
      title: '积分榜',
      key: '1',
    },
    {
      title: '淘汰赛',
      key: '2',
    },
  ];

  const onChangetab = (key: string) => {
    // console.log(key, "ppooiuytre");
    if (key == '0') {
      getGroupList();
    } else if (key == '1') {
      getScoresList();
    } else {
      getBracketList();
    }

    setActiveKey(key);
  };
  const getGroupList = async () => {
    let data = {
      competition_id: 1,
      season_id: 10810,
    };
    let res: Datares = await GroupList(data);
    if (res.success) {
      setGroupList(res.data.list);
    }
  };
  const getScoresList = async () => {
    let data = {
      competition_id: 1,
      season_id: 10810,
    };
    let res: Datares = await ScoresList(data);
    if (res.success) {
      console.log(res, '积分榜收拾收拾宿舍');

      setScoresList(res.data.list);
    }
  };

  const getBracketList = async () => {
    let data = {
      season_id: 10810,
    };
    let res: Datares = await BracketList(data);
    if (res.success) {
      console.log(res, '淘汰赛99999999');

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

  const goRule = () => {
    history.push(`/zh/rule`, {
      title: '世界杯赛制说明',
      url: `${window.publicPath}worldcup_rules.html`,
    });
  };
  useEffect(() => {
    getGroupList();
  }, []);
  return (
    <div className={styles.cap_list}>
      <div className={styles.tab_box}>
        <div className={styles.tab}>
          <FBWorldCapTab
            mini={true}
            list={tab}
            defaultActiveKey={activeKey}
            onChange={onChangetab}
          ></FBWorldCapTab>
        </div>
        <div style={{ color: '#848494' }} onClick={goRule}>
          赛制说明
        </div>
      </div>
      {activeKey == '0' ? <FBGroup groupList={grouList}></FBGroup> : ''}
      {activeKey == '1' ? (
        <div>
          {scoresList?.map((item, index: any) => {
            return (
              <div className={styles.title_left} key={item.team_id}>
                <div className={styles.title_left_img}></div>
                <div style={{ height: 10, width: '100%', background: '#F7F7F7' }}></div>

                <Table data={item.all} group={item.groups - 1}></Table>
              </div>
            );
          })}
          <div style={{ height: 55 }}></div>
        </div>
      ) : (
        ''
      )}

      {activeKey == '2' ? <Eliminate eliminateList={eliminateList}></Eliminate> : ''}
    </div>
  );
};

export default Scheme;
