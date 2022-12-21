import React, { useEffect, useState } from 'react';
import Table from '@/pages/Details/Stats/table';
import IconFont from '@/components/IconFont';
import styles from './index.less';
import type { ColumnsType } from 'antd/es/table';
import * as matchPageService from '@/services/matchPage';
import { getAccordWithLabel } from '@/utils/match';

import moment from 'moment';
// import { Color } from '@/utils/match';
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
        align: 'center',
        render: (text, record) => (
          <div>
            {text}
            <div>{moment(record.match_time * 1000).format('YYYY-MM-DD')}</div>
          </div>
        ),
      },
      {
        // title: '主队',
        dataIndex: 'home_team_name',
        key: 'home',
        width: 80,
        align: 'center',
      },
      //   {
      //     // title: '',
      //     dataIndex: 'home',
      //     key: 'home',
      //     width: 20,
      //     align: 'center',
      //     render: (text, record) => (
      //       <div className={styles.bfstyle}>
      //         <span
      //           style={{
      //             color: Color.numColor(
      //               record?.home?.score > record.away?.score
      //                 ? '赢'
      //                 : record?.home?.score == record.away?.score
      //                 ? '走'
      //                 : '输',
      //             ),
      //           }}
      //         >
      //           {record.home.score}
      //         </span>
      //         :
      //         <span
      //           style={{
      //             color: Color.numColor(
      //               record?.home?.score < record.away?.score
      //                 ? '赢'
      //                 : record?.home?.score == record.away?.score
      //                 ? '走'
      //                 : '输',
      //             ),
      //           }}
      //         >
      //           {record.away.score}
      //         </span>
      //       </div>
      //     ),
      //   },
      {
        // title: '客队',
        dataIndex: 'away_team_name',
        width: 80,
        key: 'away',
        align: 'center',
      },
      //   {
      //     // title: '盘',
      //     dataIndex: 'odds',

      //     align: 'center',
      //     render: (text) => (
      //       <div style={{ color: Color.numColor(text.name) }}>
      //         <div>{text.branch}</div>
      //         {text.name}
      //       </div>
      //     ),
      //   },

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
  //   const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  // 弹窗
  const [visible, setVisible] = useState<boolean>(false);
  const [pickervalue, setPickerValue] = useState<any>(['0', '5']);
  //   const [pickertext, setPickertext] = useState<any>(['0', '5']);

  const yeardata = [
    [
      { label: '分组赛', value: '0' },
      { label: '1/8决赛', value: '1' },
      { label: '1/4决赛', value: '2' },
    ],
    [
      { label: '第1轮', value: '3' },
      { label: '第2轮', value: '4' },
      { label: '第3轮', value: '5' },

      { label: '第4轮', value: '6' },
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
    // const params: AnalysisListParams = {
    //   match_id,
    //   tab: 3, //历史交锋
    //   event: 0,
    //   sameCompetition: 0,
    //   size: 10,
    // };

    // getHistoryRankList(params);
    // // getAwayFutureList();
    init();
  }, [season_id]);
  const onPicker = () => {
    setVisible(true);
  };

  return (
    <div>
      <div className={styles.schedule_table_space}>
        <div className={styles.title}>
          <div className={styles.title_top}>
            <IconFont type="icon-jiantouzuo" color="#000028" size={12} />
            上一轮
          </div>
          <div className={styles.title_top} onClick={onPicker}>
            {' '}
            {getAccordWithLabel(yeardata, pickervalue[0])}{' '}
            {getAccordWithLabel(yeardata, pickervalue[1])}
            <IconFont type="icon-zhankai2" color="#000028" size={12} />
          </div>

          <div className={styles.title_top}>
            下一轮 <IconFont type="icon-jiantouyou" color="#000028" size={12} />
          </div>
        </div>
        {/* <Spin spinning={!props.data?.length}></Spin> */}
        <div style={{ height: 5, background: '#F7F7F7' }} />

        <Table
          loading={loading}
          //   dataText={data?.list && data?.sp}
          rowKey="match_id"
          dataSource={data}
          columns={columns(null)}
        />
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
        }}
      />
    </div>
  );
};

export default Schedule;
