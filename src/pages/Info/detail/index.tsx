import React, { useEffect, useState } from 'react';
import { useHistory } from 'umi';
import * as matchService from '@/services/match';
import { NavBar, Picker } from 'antd-mobile';
import IconFont from '@/components/IconFont';
import * as competitionService from '@/services/competition';
import styles from './index.less';
import FBWorldCapTab from '@/components/FBWordCopTab';
import Groupmatch from '../groupmatch';
import Schedule from '../schedule';
import Ranking from '../ranking';

import { getAccordWithLabel } from '@/utils/match';

type Props = {};

const Detail = (props: Props) => {
  const { id, name } = props.location.query;
  // 年份列表
  const [yeardata, setSeasonList] = useState<any>([]);
  // 年份弹框显示状态
  const [visible, setVisible] = useState(false);
  // 年份选中值状态
  const [curSeasonId, setCurSeasonId] = useState<any>();
  // 积分 赛程 榜单显示状态
  const [tabvisible, setTabVisible] = useState(false);
  // 积分 赛程 榜单状态
  const [picktabvalue, setPicTabValue] = useState('1');

  const [integrate, setIntegrate] = useState<any>('1');
  const [ranking, setRanking] = useState<any>();
  const history = useHistory();
  const picktab = [
    [
      { label: '积分', value: '1' },
      { label: '主场', value: '2' },
      { label: '客场', value: '3' },
    ],
  ];
  const tab = [
    {
      title: (
        <div
          onClick={() => {
            setTabVisible(true);
          }}
        >
          {getAccordWithLabel(picktab, integrate)}
          <IconFont type="icon-zhankai2" color="#fff" size={10} />
        </div>
      ),
      key: '1',
    },
    {
      title: '赛程',
      key: '2',
    },
    {
      title: '榜单',
      key: '3',
    },
  ];

  const init = async (competition_id: number, season_id?: number) => {
    //    setLoading(!hideLoading);
    const result = await competitionService.ranking({ competition_id: competition_id, season_id });

    if (result.success) {
      setRanking(result.data.tables);
    }
  };
  // 赛季年份
  const fetchSeasonData = async (competitionId: any) => {
    const result = await matchService.getSeasonList(competitionId);
    if (result.success) {
      const seasonList = result.data;
      const year = seasonList?.map((item) => {
        return { label: item.year, value: item.ID };
      });
      console.log(year);
      // setCurSeason(year[0].label);
      setCurSeasonId(year[0].value);
      setSeasonList([year]);
    }
  };
  const onChangetab = (value: any) => {
    console.log(value);

    setPicTabValue(value);
  };
  // 表格

  useEffect(() => {
    fetchSeasonData(id);
  }, []);

  useEffect(() => {
    if (curSeasonId) {
      init(id, Number(curSeasonId));
    }
  }, [curSeasonId]);
  return (
    <div className={styles.detail_box}>
      {' '}
      <div className={styles.detail}>
        <div className={styles.detail_year}>
          <NavBar
            style={{ color: '#fff', background: '#FA5900' }}
            onBack={() => {
              history.goBack();
            }}
          >
            {name}
          </NavBar>
          <div className={styles.tabfelx}>
            <div
              onClick={() => {
                setVisible(true);
              }}
            >
              {' '}
              赛季{getAccordWithLabel(yeardata, curSeasonId)}
              <IconFont type="icon-zhankai2" color="#fff" size={12} />
            </div>

            <div className={styles.tab}>
              <FBWorldCapTab
                list={tab}
                defaultActiveKey={picktabvalue}
                mini
                onChange={onChangetab}
              ></FBWorldCapTab>
            </div>
          </div>
        </div>
      </div>
      <Picker
        defaultValue={[curSeasonId]}
        columns={yeardata}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        onConfirm={(val, extend) => {
          console.log('onSelect', val, extend.items);
          // setCurSeason(extend.items[0].label);
          console.log(val, 'value');

          setCurSeasonId(val[0]);
        }}
      />
      <Picker
        defaultValue={[picktabvalue]}
        columns={picktab}
        visible={tabvisible}
        onClose={() => {
          setTabVisible(false);
        }}
        onConfirm={(val) => {
          setTabVisible(false);
          setIntegrate(val[0]);
        }}
      />
      <div className={styles.content}>
        {picktabvalue == '1' && <Groupmatch data={ranking} season_id={curSeasonId}></Groupmatch>}
      </div>
      <div className={styles.content}>
        {picktabvalue == '2' && <Schedule competition_id={id} season_id={curSeasonId}></Schedule>}
      </div>
      <div className={styles.content}>
        {picktabvalue == '3' && <Ranking competition_id={id} season_id={curSeasonId}></Ranking>}
      </div>
    </div>
  );
};

export default Detail;
