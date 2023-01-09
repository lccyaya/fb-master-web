import React, { useEffect, useState } from 'react';
import Table from '@/pages/Details/Stats/table';
import IconFont from '@/components/IconFont';
import styles from './index.less';
import type { ColumnsType } from 'antd/es/table';
import * as matchPageService from '@/services/matchPage';
import { getMatchDataList } from '@/services/matchPage';
import { getPickerList, getNextList, getUpList, getMatchStatusDes, getFirst, getlabel, geMatchLastList } from "@/utils/match"
import useWindowSize from '@/hooks/useWindowSize';
import { useThrottleFn, useDebounceFn } from 'ahooks';
import { Spin } from 'antd';
import Empty from '@/components/Empty';


import moment from 'moment';
import { Color } from '@/utils/match';
import { CascadePicker } from 'antd-mobile';
import type { analysisType } from '@/services/matchdetail';
import { array } from '@umijs/deps/compiled/yargs';

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
        width: 70,
        className: "first_columns",
        align: 'center',
        render: (text, record) => (
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          <div id={initialize == record?.MatchId ? `match_${record?.MatchId}` : ""}>
            <div>{moment(text * 1000).format('MM-DD')}</div>
            <div>{moment(text * 1000).format('HH:mm')}</div>
          </div>
        ),
      },
      {
        // title: '主队',
        dataIndex: 'HomeTeam',
        key: 'home',
        width: 100,
        align: 'right',
        render: (text, record) => (
          <div className={styles.namestyle}>{text.name}</div>
        )
      },
      {
        // title: '',
        dataIndex: 'StatusID',
        key: 'StatusID',
        width: 40,
        align: 'center',
        render: (text, record) => (
          <div className={styles.bfstyle}>
            {text > 1 && text < 9 ? <div>
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
            </div> : text > 8 ? <div style={{ fontSize: "13px" }}>
              {getMatchStatusDes(text)}

            </div> : <div style={{ color: "#848494" }}>VS</div>}


          </div>
        ),
      },
      {
        // title: '客队',
        dataIndex: 'AwayTeam',
        width: 100,
        key: 'away',
        className: "last_columns",
        align: 'left',
        render: (text) => (
          <div className={styles.namestyle}>{text.name}</div>
        )
      },
      {
        // title: '角球',
        dataIndex: '',
        width: 70,
        align: 'center',
        render: (text, record) => (
          <div>
            {record.StatusID > 1 && record.StatusID < 9 ? <div>
              <div style={{ color: "#000028" }}>
                {record.HomeScores[4] + record.AwayScores[4]}
              </div>
              {record.HomeScores[4]}-{record.AwayScores[4]}
            </div> : "-"}

          </div>
        ),
      },
    ];
  };
  const { height } = useWindowSize();
  const { competition_id, season_id } = props;
  // 表格数据
  const [data, setData] = useState<any>();
  // 弹窗
  const [visible, setVisible] = useState<boolean>(false);
  // 弹窗选中值
  const [pickervalue, setPickerValue] = useState<any>();
  const [yeardata, setyeardata] = useState<any>([]);
  // const [showlast, setShowLast] = useState<any>(false);
  //是否显示上一轮按钮
  const [showfirst, setShowFirst] = useState<any>(true);
  // 赛程高度
  const [innerHeight, setInnerHeight] = useState<number>(0);
  const [initialize, setInitialize] = useState<any>();


  const [loading, setLoading] = useState<boolean>(false);
  const { run, cancel } = useThrottleFn(
    async () => {
      const arr = await onThrottleFn()
      const boolen = await getFirst(yeardata, arr);

      setShowFirst(boolen)
      setPickerValue(arr)
    },
    { wait: 600 },
  );
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
      // if (result.data[0].round_count > 0) {
      //   setPickerValue([result.data[0].stage, result.data[0].round_count])

      // } else {
      //   setPickerValue([result.data[0].stage, null])
      // }
      setPickerValue([result.data[0].stage, result.data[0].round_count])

      if (geMatchLastList(result.data)) {
        setInitialize(geMatchLastList(result.data))
        scrollToAnchor(`match_${geMatchLastList(result.data)}`)

      }

    }
  };

  // 下一轮
  const onNext = () => {
    const next_yeardata: any = getNextList(yeardata, pickervalue);

    if (next_yeardata) {
      if (next_yeardata[1]) {
        scrollToAnchor(`activity_${next_yeardata[0]}_${next_yeardata[1]}`);
      } else {
        scrollToAnchor(`activity_${next_yeardata[0]}_0`);
      }
    }
  };
  // 上一轮
  const onUpList = () => {
    const next_yeardata: any = getUpList(yeardata, pickervalue);
    if (next_yeardata[1]) {
      scrollToAnchor(`activity_${next_yeardata[0]}_${next_yeardata[1]}`);
    } else {
      scrollToAnchor(`activity_${next_yeardata[0]}_0`);
    }
  };
  function onThrottleFn() {
    const activity_info_md = document.querySelectorAll(".activity_info_md")
    const activity_info_box = document.getElementById("activity_info_box")
    const top = activity_info_box?.scrollTop
    const arr = []
    for (let i = 0; i < activity_info_md.length; i++) {
      const stagenum = activity_info_md[i].getAttribute("data-stagenum");
      const roundname = activity_info_md[i].getAttribute("data-roundname");
      const heighttop = activity_info_md[i].offsetTop;//距离父元素的top
      const heightlast = activity_info_md[i + 1]?.offsetTop;

      if (top + 60 >= heighttop && top + 60 < heightlast) {
        arr.push(Number(stagenum), Number(roundname))
        return arr
      }

    }
    const one = activity_info_md[activity_info_md.length - 1].getAttribute("data-stagenum");
    const two = activity_info_md[activity_info_md.length - 1].getAttribute("data-roundname");
    arr.push(Number(one), Number(two))
    return arr

  }
  const onScroll = () => {
    run()
  }
  useEffect(() => {

    const height1 = height - 145;
    setInnerHeight(height1);
  }, [height]);

  useEffect(() => {
    init();

  }, [season_id]);
  // 显示弹框按钮事件
  const onPicker = () => {
    setVisible(true);

  };
  return (
    <div>
      <Spin spinning={loading}>
        {data ?
          <div>
            <div className={styles.schedule_table_space}>
              <div className={styles.title}>
                <div className={styles.title_next} onClick={onUpList}>
                  {!showfirst && <div>   <IconFont type="icon-jiantouzuo" color="#848494" size={10} />上一轮 </div>
                  }
                </div>
                <div style={{ fontSize: 14 }} >     <div className={styles.title_top} onClick={onPicker}>
                  {' '}
                  {/* {pickertext} */}
                  {yeardata && pickervalue && <div>
                    {getlabel(yeardata, pickervalue)}
                  </div>}
                  <IconFont type="icon-zhankai2" color="#000028" size={12} />
                </div></div>
                <div className={styles.title_next} onClick={onNext}>
                  <div>  下一轮 <IconFont type="icon-jiantouyou" color="#848494" size={10} /></div>

                </div>
              </div>
              <div id='activity_info_box' style={{ height: `${innerHeight}px`, overflow: "auto" }} onScroll={onScroll}>
                {data?.map((item_stage) => {
                  return <div key={item_stage.stage}>
                    {item_stage.rounds.map((item_rounds, index) => {
                      return <div key={index} className='activity_info_md' data-stagenum={item_rounds.round_data.stage_num}
                        data-roundname={item_rounds.round_data.round_name} id={`activity_${item_rounds.round_data.stage_num}_${item_rounds.round_data.round_name}`} key={index}>
                        <div className={styles.title_next_activity}>
                          {item_rounds.round_data.show_name}
                        </div>
                        <Table
                          loading={loading}
                          rowKey="MatchId"
                          dataSource={item_rounds.match_list}
                          columns={columns()}

                        />
                        <div style={{ height: 2, width: '100%', background: '#F7F7F7' }} />

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
                setPickerValue(val);
                if (val[1]) {
                  scrollToAnchor(`activity_${val[0]}_${val[1]}`)
                } else {
                  scrollToAnchor(`activity_${val[0]}_0`)

                }
              }}

            />
          </div> : <Empty message="加载中" />
        }
      </Spin>
    </div>
  );
};

export default Schedule;
