import { getOddsList } from '@/services/scheme';
import { PageContainer } from '@ant-design/pro-layout';
import { useAntdTable, useInfiniteScroll } from 'ahooks';
import { Button, Card, Form, message, Radio, Select, Spin, Table } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { ColumnsType } from 'antd/lib/table';
import dayjs from 'dayjs';
import { useHistory, useLocation } from 'umi';
import OddButton from '../OddButton';
import styles from './index.less';
import ScrollView from 'react-custom-scrollbars';
import MatchCell from '@/pages/SchemeCenter/Create/MatchCell';
import { InfiniteScroll } from 'antd-mobile';
import { handlerList } from '@/pages/SchemeCenter/Create/tools';
import moment from 'moment';

type Props = {};

interface PageParam {
  current: number;
  pageSize: number;
}

export interface OddInfo {
  odd_scheme_id: string;
  match_id: string;
  tag: string;
  odd: string;
  home_team_name: string;
  away_team_name: string;
  scheme_title: string;
}
type ParamsInfo = OddInfo & { type_id?: number; gold_coin: number };

const SchemeCreate = (props: Props) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const location = useLocation<ParamsInfo | undefined>();
  const { state } = location;

  const [selectOdd, setSelectOdd] = useState<OddInfo | undefined>(state);
  const [typeId, setTypeId] = useState<number>(state?.type_id ?? 1);

  const columns: ColumnsType<{}> = [
    {
      title: '联赛',
      width: 100,
      render: (record: any) => {
        return record.match.competition_name;
      },
      onCell: (record: any) => {
        return { rowSpan: record.rowSpan };
      },
    },
    // {
    //   title: '比赛时间',
    //   width: 80,
    //   render: (record: any) => {
    //     return dayjs(record.match.match_time * 1000).format('MM-DD HH:mm');
    //   },
    //   onCell: (record: any) => {
    //     return { rowSpan: record.rowSpan };
    //   },
    // },
    // {
    //   title: '比赛队伍',
    //   width: 160,
    //   render: (record: any) => {
    //     return `[主]${record.match.home_team_name} VS ${record.match.away_team_name}`;
    //   },
    //   onCell: (record: any) => {
    //     return { rowSpan: record.rowSpan };
    //   },
    // },
    // {
    //   title: '竞猜种类',
    //   width: 100,
    //   render: (record: any) => {
    //     return <div>{record.odd.scheme_title}</div>;
    //   },
    // },
    // {
    //   title: '主胜',
    //   width: 100,
    //   className: styles.cell_box,
    //   render: (record: any) => {
    //     const odd = record.odd.odds[0];
    //     return (
    //       <OddButton
    //         selected={
    //           record.odd.odd_scheme_id == selectOdd?.odd_scheme_id && odd.tag == selectOdd?.tag
    //         }
    //         disabled={odd.odd<1.4 && record.typeId === 1}
    //       >{`${odd.title} ${odd.odd}`}</OddButton>
    //     );
    //   },
    //   onCell: (record: any) => {
    //     const odd = record.odd.odds[0];
    //     return {
    //       onClick: () => {
    //         if (odd.odd < 1.4 && record.typeId === 1) {
    //           return;
    //         }
    //         setSelectOdd({
    //           odd_scheme_id: record.odd.odd_scheme_id,
    //           match_id: record.match.match_id,
    //           tag: odd.tag,
    //           home_team_name: record.match.home_team_name,
    //           away_team_name: record.match.away_team_name,
    //           scheme_title: record.odd.scheme_title,
    //           odd: odd.odd,
    //         });
    //       },
    //     };
    //   },
    // },
    // {
    //   title: '平',
    //   width: 100,
    //   className: styles.cell_box,
    //   render: (record: any) => {
    //     if (record.typeId !== 1) {
    //       return <div style={{width: '100%', height: '100%', textAlign: 'center', color: '#999'}}>平局</div>
    //     }
    //     const odd = record.odd.odds[1];
    //     return (
    //       <OddButton
    //         selected={
    //           record.odd.odd_scheme_id == selectOdd?.odd_scheme_id && odd.tag == selectOdd?.tag
    //         }
    //         disabled={odd.odd<1.4 && record.typeId === 1}
    //       >{`${odd.title} ${odd.odd}`}</OddButton>
    //     );
    //   },
    //   onCell: (record: any) => {
    //     if (record.typeId !== 1) {
    //       return {}
    //     }
    //     const odd = record.odd.odds[1];
    //     return {
    //       onClick: () => {
    //         if (odd.odd < 1.4 && record.typeId === 1) {
    //           return;
    //         }
    //         setSelectOdd({
    //           odd_scheme_id: record.odd.odd_scheme_id,
    //           match_id: record.match.match_id,
    //           tag: odd.tag,
    //           home_team_name: record.match.home_team_name,
    //           away_team_name: record.match.away_team_name,
    //           scheme_title: record.odd.scheme_title,
    //           odd: odd.odd,
    //         });
    //       },
    //     };
    //   },
    // },
    // {
    //   title: '客胜',
    //   width: 100,
    //   className: styles.cell_box,
    //   render: (record: any) => {
    //     let odd = record.odd.odds[1];
    //     if (record.typeId === 1) {
    //       odd = record.odd.odds[2];
    //     }
    //     return (
    //       <OddButton
    //         selected={
    //           record.odd.odd_scheme_id == selectOdd?.odd_scheme_id && odd.tag == selectOdd?.tag
    //         }
    //         disabled={odd.odd<1.4 && record.typeId === 1}
    //       >{`${odd.title} ${odd.odd}`}</OddButton>
    //     );
    //   },
    //   onCell: (record: any) => {
    //     let odd = record.odd.odds[1];
    //     if (record.typeId === 1) {
    //       odd = record.odd.odds[2];
    //     }
    //     return {
    //       onClick: () => {
    //         if (odd.odd < 1.4 && record.typeId === 1) {
    //           return;
    //         }
    //         setSelectOdd({
    //           odd_scheme_id: record.odd.odd_scheme_id,
    //           match_id: record.match.match_id,
    //           tag: odd.tag,
    //           home_team_name: record.match.home_team_name,
    //           away_team_name: record.match.away_team_name,
    //           scheme_title: record.odd.scheme_title,
    //           odd: odd.odd,
    //         });
    //       },
    //     };
    //   },
    // },
  ];

  // const getTableData = async ({ current, pageSize }: PageParam, formData: any) => {
  //   const params = {
  //     page: current,
  //     size: pageSize,
  //     ...formData,
  //   };

  //   const result = await getOddsList(params);
  //   if (result.err) {
  //     return {
  //       total: 0,
  //       list: [],
  //     };
  //   }
  //   let list = result.data.list as Array<any>;
  //   list = list.flatMap((value) => {
  //     const odds = value.odds as Array<any>;
  //     return odds.map((item, index) => {
  //       let rowSpan = 1;
  //       if (odds.length > 1) {
  //         rowSpan = index == 0 ? 2 : 0;
  //       }
  //       return {
  //         match: value.match,
  //         odd: item,
  //         rowSpan,
  //         typeId: formData.type_id,
  //       };
  //     });
  //   });
  //   console.log("list: " + list.length);
  //   return {
  //     total: result.data.total,
  //     list: list,
  //   };
  // };

  // const { tableProps, search, refresh } = useAntdTable(getTableData, {
  //   defaultPageSize: 50,
  //   form,
  //   manual: true,
  // });

  // useEffect(() => {
  //   search.reset();
  // }, []);

  const getList = async (page: number, size: number, lotteryType: number) => {
    const params = {
      page: page,
      size: size,
      type_id: lotteryType,
    };
    const res = await getOddsList(params);
    if (res.success) {
      return {
        list: res.data.list,
        total: res.data.total,
        page: page + 1,
      };
    }
  };

  const {
    data = {},
    loadMoreAsync,
    noMore,
    reload,
    loading,
    loadingMore,
  } = useInfiniteScroll(
    async (d) => {
      const page = d?.page ?? 1;
      return await getList(page, 50, typeId);
    },
    {
      isNoMore: (data) => {
        const total = data?.list.reduce((pre, item) => {
          return pre + item?.odds?.length ?? 0;
        }, 0);
        if (!data?.list?.length) {
          return true;
        }
        return total >= data?.total;
      },
      // manual: true,
      reloadDeps: [typeId],
    },
  );

  // useEffect(() => {
  //   reload();
  // }, [typeId]);

  const newList = useMemo(() => {
    const list = data?.list as Array<any>;
    list?.map((item: any) => {
      item.time = moment(item.match.match_time * 1000).format('YY-MM-DD ddd');
    });
    const newList = handlerList(list?.sort((a, b) => a.match.match_time - b.match.match_time));
    // const newList = handlerList(list);
    return newList;
  }, [data]);

  const nextStep = (values: any) => {
    if (selectOdd == null) {
      message.warning('请选择一场比赛');
      return;
    }
    console.log(values);
    const typeValue = form.getFieldsValue();
    history.push('/zh/profile/center/create/step2', { ...selectOdd, ...typeValue, ...values });
  };

  const changeType = (values: any) => {
    setSelectOdd(undefined);
    setTypeId(values.type_id);
  };

  const onSelectOdds = (info: OddInfo) => {
    setSelectOdd(info);
  };

  return (
    <PageContainer>
      <Card>
        <Spin spinning={loading || loadingMore}>
          <Form
            form={form}
            layout="inline"
            initialValues={{ type_id: state?.type_id ?? 1 }}
            onValuesChange={changeType}
            style={{ marginBottom: 16 }}
          >
            <Form.Item label="彩种选择" name="type_id">
              <Radio.Group value={state?.type_id ?? 1}>
                <Radio value={1}> 竞彩 </Radio>
                <Radio value={2}> 北单-胜负过关 </Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
          {/* <Table
          bordered
          showHeader={false}
          columns={columns}
          {...tableProps}
          scroll={{ x: 'max-content', y: 560 }}
          rowKey={(record) => record.match.match_id}
        /> */}
          <div className={styles.scroll_container}>
            <ScrollView>
              {newList?.map((item: any, index: number) => (
                <div key={item.time}>
                  <div className={styles.time_box}>{`${item.time} ${item.list.length}场比赛`}</div>
                  {item.list?.map((match: any, matchindex: number) => (
                    <div key={`${match.match.match_id}${matchindex}`} className={styles.match_cell}>
                      <MatchCell
                        match={match}
                        typeId={typeId}
                        onSelected={onSelectOdds}
                        selectOdds={selectOdd}
                      />
                    </div>
                  ))}
                </div>
              ))}
              {/* {data?.list?.map((match: any, matchindex: number) => (
                <div key={match.match.match_id} className={styles.match_cell}>
                  <MatchCell
                    match={match}
                    typeId={typeId}
                    onSelected={onSelectOdds}
                    selectOdds={selectOdd}
                  />
                </div>
              ))} */}
              <InfiniteScroll
                loadMore={async (isRetry: boolean) => {
                  await loadMoreAsync();
                }}
                hasMore={!noMore}
              />
            </ScrollView>
          </div>
          <Form layout="inline" initialValues={state} style={{ marginTop: 16 }} onFinish={nextStep}>
            <Form.Item label="场次选择">1</Form.Item>
            <Form.Item label="过关玩法">单关</Form.Item>
            <Form.Item label="注数">1</Form.Item>
            <Form.Item
              label="定价"
              style={{ flex: 1 }}
              name="gold_coin"
              rules={[{ required: true }]}
            >
              <Select placeholder="请选择查看攻略定价">
                <Select.Option value={0}>免费</Select.Option>
                <Select.Option value={8}>8金豆</Select.Option>
                <Select.Option value={18}>18金豆</Select.Option>
                <Select.Option value={28}>28金豆</Select.Option>
                <Select.Option value={38}>38金豆</Select.Option>
                <Select.Option value={58}>58金豆</Select.Option>
                <Select.Option value={88}>88金豆</Select.Option>
                <Select.Option value={128}>128金豆</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                下一步
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Card>
    </PageContainer>
  );
};

export default SchemeCreate;
