import React, { useEffect, useState } from 'react';
import { useHistory } from 'umi';
import * as matchService from '@/services/match';
import { NavBar, Picker } from 'antd-mobile';
import IconFont from '@/components/IconFont';

import styles from './index.less';
import FBWorldCapTab from '@/components/FBWordCopTab';
import Groupmatch from '../groupmatch';
import Schedule from '../schedule';
import Ranking from '../ranking';

import { getAccordWithLabel } from '@/utils/match';

type Props = { location: any };

const Detail = (props: Props) => {
  const { id, name, type } = props.location.query;
  // 年份 列表
  const [yeardata, setSeasonList] = useState<any>([]);
  // 年份 弹框显示状态
  const [visible, setVisible] = useState(false);
  // 年份 选中值状态
  const [curSeasonId, setCurSeasonId] = useState<any>();
  // 积分 赛程 榜单显示状态
  const [tabvisible, setTabVisible] = useState(false);
  // 积分 赛程 榜单选中值
  const [picktabvalue, setPicTabValue] = useState('1');
  // 积分 弹框列表选中值
  const [integrate, setIntegrate] = useState<any>('1');
  const history = useHistory();
  // 右侧积分tab弹框列表
  const picktab = [
    [
      { label: '积分', value: '1' },
      { label: '主场', value: '2' },
      { label: '客场', value: '3' },
    ],
  ];
  // 右侧tab列表
  const tab = [
    {
      title: (
        <div
          onClick={() => {
            if (picktabvalue == "1" && type == 1) {
              setTabVisible(true);
            }
          }}
        >
          {getAccordWithLabel(picktab, integrate)}
          {type == 1 && <IconFont
            type="icon-zhankai2"
            color={picktabvalue == '1' ? '#FA5900' : '#848494'}
            size={10}
          />}

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

  // 赛季年份
  const fetchSeasonData = async (competitionId: string) => {
    const result = await matchService.getSeasonList(competitionId);
    if (result.success) {
      const seasonList: any = result.data;
      const year = seasonList?.map((item: { year: number, ID: number }) => {
        return { label: item.year, value: item.ID };
      });
      console.log(year);
      // setCurSeason(year[0].label);
      setCurSeasonId(year[0]?.value);
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

  return (
    <div className={styles.detail_box}>
      {' '}
      <div className={styles.detail}>
        <div className={styles.detail_year}>
          <NavBar
            className={styles.navbar}
            onBack={() => {
              history.goBack();
            }}
          >
            {name}
          </NavBar>
        </div>
      </div>
      {/* 时间弹框 */}
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
      {/* tab积分弹框 */}
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
        <div className={styles.tabfelx}>
          {/* 左侧时间 */}
          <div>
            {curSeasonId && <div
              onClick={() => {
                setVisible(true);
              }}
            >
              {' '}
              {getAccordWithLabel(yeardata, curSeasonId)}
              <IconFont type="icon-zhankai2" color="#000028" size={12} />
            </div>}
          </div>
          {/*右侧 积分 赛程 榜单 */}
          <div className={styles.tab}>
            <FBWorldCapTab
              list={tab}
              defaultActiveKey={picktabvalue}
              mini
              onChange={onChangetab}
            />
          </div>
        </div>
        <div className={styles.content_list}>
          {/* 积分 */}
          {picktabvalue == '1' && (
            <Groupmatch competition_id={id} season_id={curSeasonId} integrate={integrate} type={type} />
          )}
          {/* 赛程 */}
          {picktabvalue == '2' && <Schedule competition_id={id} season_id={curSeasonId} />}
          {/* 榜单 */}
          {picktabvalue == '3' && <Ranking competition_id={id} season_id={curSeasonId} />}
        </div>
      </div>

    </div>
  );
};

export default Detail;
