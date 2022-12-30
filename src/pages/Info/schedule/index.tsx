import React, { useEffect, useState } from 'react';
import Table from '@/pages/Details/Stats/table';
import IconFont from '@/components/IconFont';
import styles from './index.less';
import type { ColumnsType } from 'antd/es/table';
import * as matchPageService from '@/services/matchPage';
import { getAccordWithLabel } from '@/utils/match';

import moment from 'moment';
import { Color } from '@/utils/match';
import { Picker } from 'antd-mobile';
// import type {
//   AnalysisListRes,
//   analysisType,
//   AnalysisListParams,
//   spType,
// } from '@/services/matchdetail';

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

interface IProps {
  competitionId: number;
  seasonId?: number;
}

const Schedule = (props: Props) => {
  const columns = (sp: spType | undefined): ColumnsType<analysisType> => {
    return [
      {
        // title: '赛事',
        dataIndex: 'competition_name',
        key: 'competition_name',
        // width: 40,
        className: "first_columns",
        align: 'center',
        render: (text, record) => (
          <div >
            {/* {text} */}
            <div>{moment(record.match_time * 1000).format('MM-DD')}</div>
            <div>{moment(record.match_time * 1000).format('HH:mm')}</div>

          </div>
        ),
      },
      {
        // title: '主队',
        dataIndex: 'home_team_name',
        key: 'home',
        width: 80,
        align: 'center',
        render: (text, record) => (
          <div className={styles.namestyle}>{text}</div>
        )

      },
      {
        // title: '',
        dataIndex: 'status',
        key: 'status',
        width: 20,
        align: 'center',
        render: (text, record) => (
          <div className={styles.bfstyle}>
            {text > 1 ? <div>
              <div style={{
                color: Color.numColor(
                  record.final_scores.home > record.final_scores.away
                    ? '赢'
                    : record.final_scores.home == record.final_scores.away
                      ? '走'
                      : '输',
                ),
              }}>
                {record.final_scores.home}:{record.final_scores.away}
              </div>
              <div className={styles.first_half_score}>
                ({record.final_scores.first_half_home}:{record.final_scores.first_half_away})
              </div>
            </div> : <div style={{ color: "#848494" }}>VS</div>}
            {/* <span
              style={{
                color: Color.numColor(
                  record?.home?.score > record.away?.score
                    ? '赢'
                    : record?.home?.score == record.away?.score
                      ? '走'
                      : '输',
                ),
              }}
            >
              {record.home.score}
            </span>
            :
            <span
              style={{
                color: Color.numColor(
                  record?.home?.score < record.away?.score
                    ? '赢'
                    : record?.home?.score == record.away?.score
                      ? '走'
                      : '输',
                ),
              }}
            >
              {record.away.score}
            </span> */}
          </div>
        ),
      },
      {
        // title: '客队',
        dataIndex: 'away_team_name',
        width: 80,
        key: 'away',
        className: "last_columns",

        align: 'center',
        render: (text, record) => (
          <div className={styles.namestyle}>{text}</div>
        )
      },
      {
        // title: '盘',
        dataIndex: 'odds',

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
  const [data, setData] = useState<any>();
  // 弹窗
  const [visible, setVisible] = useState<boolean>(false);
  const [pickervalue, setPickerValue] = useState<any>(['one', '1']);
  //   const [pickertext, setPickertext] = useState<any>(['0', '5']);

  const yeardata = [
    [
      { label: '分组赛', value: 'one' },
      { label: '1/8决赛', value: 'two' },
      { label: '1/4决赛', value: 'three' },
    ],
    [
      { label: '第1轮', value: '1' },
      { label: '第2轮', value: '2' },
      { label: '第3轮', value: '3' },

      { label: '第4轮', value: '4' },
    ],
  ];
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
  const init = async () => {
    setLoading(true);
    const result = await matchPageService.fetchMatchListForInfo({
      tab_type: 0,
      competition_id: competition_id,
      timestamp: 0,
      asc: true,
      season_id: season_id,
    });
    setLoading(false);
    if (result.success) {
      const { matches } = result.data;
      console.log(matches);

      if (matches) {
        setData(matches);
      } else {
        setMatchList([]);
      }
    }
  };
  useEffect(() => {

    init();
  }, [season_id]);
  const onPicker = () => {
    setVisible(true);
  };
  const scrollToAnchor = (anchorName) => {

    if (anchorName) {

      // 找到锚点

      const anchorElement = document.getElementById(anchorName);

      // 如果对应id的锚点存在，就跳转到锚点

      if (anchorElement) {
        anchorElement.scrollIntoView();

        // anchorElement.scrollIntoView({ behavior: "instant", block: "end", inline: "nearest" });
      }

    }

  }
  return (
    <div>
      <div className={styles.schedule_table_space}>
        <div className={styles.title}>
          <div className={styles.title_next}>
            <IconFont type="icon-jiantouzuo" color="#848494" size={10} />
            上一轮
          </div>
          <div style={{ fontSize: 14 }} >     <div className={styles.title_top} onClick={onPicker}>
            {' '}
            {getAccordWithLabel(yeardata, pickervalue[0])}{' '}
            {getAccordWithLabel(yeardata, pickervalue[1])}
            <IconFont type="icon-zhankai2" color="#000028" size={12} />
          </div></div>


          <div className={styles.title_next}>
            下一轮 <IconFont type="icon-jiantouyou" color="#848494" size={10} />
          </div>
        </div>
        <div style={{ height: "500px", overflow: "auto" }}>

          <div id="activity_1">
            <div className={styles.title_next_activity}>
              {getAccordWithLabel(yeardata, pickervalue[0])}{' '}
              111       </div>
            <Table
              loading={loading}
              rowKey="match_id"
              dataSource={data}
              columns={columns(null)}
            />
          </div>
          {/* <div id="activity_2">
            <div className={styles.title_next}>
              {getAccordWithLabel(yeardata, pickervalue[0])}{' '}
              222         </div>
            <Table
              loading={loading}
              rowKey="match_id"
              dataSource={data}
              columns={columns(null)}
            />
          </div>
          <div id="activity_3">
            <div className={styles.title_next}>
              {getAccordWithLabel(yeardata, pickervalue[0])}{' '}
              3333        </div>
            <Table
              loading={loading}
              rowKey="match_id"
              dataSource={data}
              columns={columns(null)}
            />
          </div>
          <div id="activity_4">
            <div className={styles.title_next}>
              {getAccordWithLabel(yeardata, pickervalue[0])}{' '}
              444444      </div>
            <Table
              loading={loading}
              rowKey="match_id"
              dataSource={data}
              columns={columns(null)}
            />
          </div> */}
        </div>
      </div>
      <Picker
        defaultValue={pickervalue}
        columns={yeardata}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        onConfirm={(val, extend) => {
          console.log('onSelect', val, extend.items);
          setPickerValue(val);

          scrollToAnchor(`activity_${val[1]}`)

        }}
      />
    </div>
  );
};

export default Schedule;
