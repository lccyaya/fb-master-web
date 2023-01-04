import React, { useEffect, useState } from 'react';
import Table from '@/pages/Details/Stats/table';
import IconFont from '@/components/IconFont';
import styles from './index.less';
import type { ColumnsType } from 'antd/es/table';
import * as matchPageService from '@/services/matchPage';
import { getMatchDataList } from '@/services/matchPage';
import { getPickerList, getNextList, getUpList } from "@/utils/match"

import { getAccordWithLabel } from '@/utils/match';
import moment from 'moment';
import { Color } from '@/utils/match';
import { CascadePicker } from 'antd-mobile';
import type { analysisType } from '@/services/matchdetail';

type Props = {
  competition_id: number;
  season_id: number;
};
export type MatchDateFormatDataItem = {
  key: string;
  month: string;
  day: string;
  data: matchPageService.matchType[];
};


const Schedule = (props: Props) => {
  const columns = (): ColumnsType<analysisType> => {
    return [
      {
        // title: '赛事',
        dataIndex: 'MatchTime',
        key: 'match_time',
        // width: 40,
        className: "first_columns",
        align: 'center',
        render: (text, record) => (
          <div >
            {/* {text} */}
            <div>{moment(text * 1000).format('MM-DD')}</div>
            <div>{moment(text * 1000).format('HH:mm')}</div>
          </div>
        ),
      },
      {
        // title: '主队',
        dataIndex: 'HomeTeam',
        key: 'home',
        width: 80,
        align: 'right',
        render: (text, record) => (
          <div className={styles.namestyle}>{text.name}</div>
        )
      },
      {
        // title: '',
        dataIndex: 'StatusID',
        key: 'StatusID',
        width: 20,
        align: 'center',
        render: (text, record) => (
          <div className={styles.bfstyle}>
            {text > 1 ? <div>
              <div style={{
                color: Color.numColor(
                  record.HomeScores[0] > record.AwayScores[0]
                    ? '赢'
                    : record.HomeScores[0] == record.AwayScores[0]
                      ? '走'
                      : '输',
                ),
              }}>
                {record.HomeScores[0]}:{record.AwayScores[0]}
              </div>
              <div className={styles.first_half_score}>
                ({record.HomeScores[1]}:{record.AwayScores[1]})
              </div>
            </div> : <div style={{ color: "#848494" }}>VS</div>}
          </div>
        ),
      },
      {
        // title: '客队',
        dataIndex: 'AwayTeam',
        width: 80,
        key: 'away',
        className: "last_columns",
        align: 'center',
        render: (text) => (
          <div className={styles.namestyle}>{text.name}</div>
        )
      },
      {
        // title: '盘',
        dataIndex: '',

        align: 'center',
        render: (text) => (
          <div style={{ color: Color.numColor(text.name) }}>
            wwww
          </div>
        ),
      },

      //   {
      //     // title: '进球',
      //     dataIndex: 'bs',

      //     align: 'center',
      //     render: (text, record) => (
      //       <div style={{ color: Color.numColor(text.name) }}>
      //         <div>{text.branch}</div>
      //         {text.name}
      //       </div>
      //     ),
      //   },
      //   {
      //     // title: '角球',
      //     dataIndex: 'cr',

      //     align: 'center',
      //     render: (text) => (
      //       <div>
      //         <div>{text.branch}</div>
      //         <div> {text.name}</div>
      //       </div>
      //     ),
      //   },
    ];
  };

  const { competition_id, season_id } = props;
  // 表格数据
  const [data, setData] = useState<any>();
  // 弹窗
  const [visible, setVisible] = useState<boolean>(false);
  // 弹窗选中值
  const [pickervalue, setPickerValue] = useState<any>();
  const [yeardata, setyeardata] = useState<any>([]);

  // const [pickertext, setPickerText] = useState<any>("");

  const [loading, setLoading] = useState<boolean>(false);

  //   const [matchList, setMatchList] = useState<MatchDateFormatDataItem[]>([]);
  //   function formatMatchData(list: matchPageService.matchType[]) {
  //     const _list: MatchDateFormatDataItem[] = [];
  //     list.forEach((i) => {
  //       const key = moment(new Date(i.match_time * 1000)).format('YYYY-MM-DD');
  //       if (_list.filter((_l) => _l.key === key).length > 0) {
  //         _list.forEach((_i) => {
  //           if (_i.key === key) {
  //             _i.data.push(i);
  //           }
  //         });
  //       } else {
  //         const _item: MatchDateFormatDataItem = {
  //           key: moment(new Date(i.match_time * 1000)).format('YYYY-MM-DD'),
  //           month: moment(new Date(i.match_time * 1000)).format('MM'),
  //           day: moment(new Date(i.match_time * 1000)).format('DD'),
  //           data: [i],
  //         };
  //         _list.push(_item);
  //       }
  //     });
  //     return _list;
  //   }
  // 跳转对应锚点链接
  const scrollToAnchor = (anchorName: string) => {
    if (anchorName) {
      // 找到锚点
      const anchorElement = document.getElementById(anchorName);
      // 如果对应id的锚点存在，就跳转到锚点
      if (anchorElement) {
        anchorElement.scrollIntoView();
      }
    }
  }
  const init = async () => {
    setLoading(true);
    const result = await getMatchDataList({
      competition_id: competition_id,
      season_id: season_id,
    });
    setLoading(false);
    if (result.success) {
      setData(result.data);
      const picker_data = getPickerList(result.data)
      setyeardata(picker_data)
      // 第一轮
      // setPickerValue([picker_data[0].value, picker_data[0].children[0].value])

      const rounds = picker_data[0].children.length ? picker_data[0].children[0].value : null

      console.log(rounds);
      if (rounds) {
        scrollToAnchor(`activity_${picker_data[0].value}_${rounds}`)
      } else {
        scrollToAnchor(`activity_${picker_data[0].value}_0`)

      }
      setPickerValue([picker_data[0].value, rounds])
    }
  };
  // 下一轮
  const onNext = () => {


    const next_yeardata: any = getNextList(yeardata, pickervalue)
    console.log(next_yeardata, "kekekekekeekkekeke");
    setPickerValue(next_yeardata)
    if (next_yeardata[1]) {
      scrollToAnchor(`activity_${next_yeardata[0]}_${next_yeardata[1]}`)
    } else {
      scrollToAnchor(`activity_${next_yeardata[0]}_0`)

    }

  }
  const onUpList = () => {
    const next_yeardata: any = getUpList(yeardata, pickervalue)
    console.log(next_yeardata, "kekekekekeekkekeke");
    setPickerValue(next_yeardata)
    if (next_yeardata[1]) {
      scrollToAnchor(`activity_${next_yeardata[0]}_${next_yeardata[1]}`)
    } else {
      scrollToAnchor(`activity_${next_yeardata[0]}_0`)

    }

  }

  useEffect(() => {
    init();
  }, [season_id]);
  // 显示弹框按钮事件
  const onPicker = () => {
    setVisible(true);

  };

  return (
    <div>
      <div className={styles.schedule_table_space}>
        <div className={styles.title}>
          <div className={styles.title_next} onClick={onUpList}>
            <IconFont type="icon-jiantouzuo" color="#848494" size={10} />
            上一轮
          </div>
          <div style={{ fontSize: 14 }} >     <div className={styles.title_top} onClick={onPicker}>
            {' '}
            {/* {pickertext} */}
            <IconFont type="icon-zhankai2" color="#000028" size={12} />
          </div></div>
          <div className={styles.title_next} onClick={onNext}>
            下一轮 <IconFont type="icon-jiantouyou" color="#848494" size={10} />
          </div>
        </div>
        <div style={{ height: "700px", overflow: "auto" }}>
          {data?.map((item_stage) => {

            return <div key={item_stage.stage}>

              {item_stage.rounds.map((item_rounds, index) => {
                return <div id={`activity_${item_rounds.round_data.stage_num}_${item_rounds.round_data.round_name}`} key={index}>
                  <div className={styles.title_next_activity}>
                    {item_rounds.round_data.show_name}
                  </div>

                  <Table
                    loading={loading}
                    rowKey="match_id"
                    dataSource={item_rounds.match_list}
                    columns={columns()}
                  />
                </div>
              })}

            </div>
          })}

        </div>
      </div>
      <CascadePicker
        options={yeardata}
        value={pickervalue}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        onConfirm={(val, extend) => {
          console.log('onSelect', val, extend.items);
          setPickerValue(val);

          if (val[1]) {

            scrollToAnchor(`activity_${val[0]}_${val[1]}`)
          } else {
            scrollToAnchor(`activity_${val[0]}_0`)

          }
        }}
        onSelect={val => {
          console.log('onSelect', val)
        }}
      />
    </div>
  );
};

export default Schedule;
