import React from 'react';
import { Table } from 'antd';
import { FormattedMessage, useIntl } from 'umi';
import moment from 'moment';
import classnames from 'classnames';
import ScrollView from 'react-custom-scrollbars';
import Empty from '@/components/Empty';
import type { ColumnProps } from 'antd/es/table';
import Mark from '@/components/Mark';

import type * as matchService from '@/services/match';

import styles from './index.less';

const hasInit = (record: matchService.OddsItem) => {
  if (record) return true;
};

interface IProps {
  data: matchService.OddsCompanyType[];
  // name: string;
}
const Ranking: React.FC<IProps> = (props) => {
  // const intl = useIntl()
  const { data: dataSource } = props;

  const columns: ColumnProps<matchService.OddsItem>[] = [
    // {
    //   title: <FormattedMessage id="key_company" />,
    //   dataIndex: 'name',
    //   key: 'name',
    //   width: '10%',
    //   render: () => {

    //     return (
    //       <div className={classnames(styles.title)}>
    //         <Mark className={styles.mark} text={intl.formatMessage({ id: 'key_hot' })} color="red" textColor="#fff" />
    //         <span className={styles.name}>{props.name}</span>
    //       </div>
    //     );
    //   },
    // },
    // {
    //   title: 'Type',
    //   dataIndex: 'type',
    //   key: 'type',
    //   render: (_, record) => {
    //     return (
    //       <div className={styles.company}>
    //         <div>Spot</div>
    //         <div>Initial</div>
    //       </div>
    //     )
    //   }
    // },
    {
      // title: <FormattedMessage id="key_home" />,
      dataIndex: 'home',
      key: 'home',
      align: "center",
      width: '23%',
      render: (_, record, index) => {
        if (!hasInit(record)) return null;
        return (
          <div className={classnames(styles.company, styles.home)} >
            {/* <div className={styles.spot}>{record!.home}</div> */}
            <div
              style={{ color: record!.home == dataSource[index + 1]?.home ? "" : record!.home > dataSource[index + 1]?.home ? "#FE2222" : "#39906A" }}
            >{record!.home}</div>
            {/* <div >{record!.home > dataSource[index].home ? "1" : 0}{index}</div> */}
          </div>
        );
      },
    },
    {
      // title: <FormattedMessage id="key_draw" />,
      dataIndex: 'draw',
      key: 'draw',
      align: "center",
      width: '23%',
      render: (_, record, index) => {
        if (!hasInit(record)) return '-';
        return (
          <div className={classnames(styles.company, styles.draw)}>
            {/* <div className={styles.spot}>{record!.draw}</div> */}
            <div
              style={{ color: record!.draw == dataSource[index + 1]?.draw ? "" : record!.draw > dataSource[index + 1]?.draw ? "#FE2222" : "#39906A" }}>{record!.draw}
            </div>
          </div>
        );
      },
    },
    {
      // title: <FormattedMessage id="key_away" />,
      dataIndex: 'away',
      key: 'away',
      align: "center",
      width: '23%',
      render: (_, record, index) => {
        if (!hasInit(record)) return '-';
        return (
          <div className={classnames(styles.company, styles.away)}>
            {/* <div className={styles.spot}>{record!.away}</div> */}
            <div style={{ color: record!.away == dataSource[index + 1]?.away ? "" : record!.away > dataSource[index + 1]?.away ? "#FE2222" : "#39906A" }}
            >{record!.away}</div>
          </div>
        );
      },
    },
    {
      // title: <FormattedMessage id="key_time" />,
      dataIndex: 'time',
      key: 'time',
      align: "center",
      width: '41%',
      render: (_, record) => {
        if (!hasInit(record)) return '-';
        return (
          <div className={styles.company} style={{ color: "#666666" }}>
            {/* <div>{moment(new Date(record!.updated_at * 1000)).format('DD MMM HH:mm a')}</div> */}
            <div>
              {moment(new Date(Number(record!.updated_at) * 1000)).format('MM-DD HH:mm')}
            </div>
            {/* <div>
              {moment(new Date(Number(record!.updated_at) * 1000)).format('')}
            </div> */}
            {/* <div>
              {moment(new Date(Number(record!.updated_at) * 1000)).format('HH:mm a')}
            </div> */}
          </div>
        );
      },
    },
  ];
  return (

    <div style={{ height: "100%" }}>
      <div style={{ fontSize: 14, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        <div className={styles.table_title} style={{ width: "25%" }}>
          <FormattedMessage id="key_home" />
        </div>
        <div className={styles.table_title} style={{ width: "25%" }}>
          <FormattedMessage id="key_draw" />
        </div>

        <div className={styles.table_title} style={{ width: "25%" }}>  <FormattedMessage id="key_away" /></div>

        <div className={styles.table_title} style={{ width: "35%", borderRadius: "0 8px 0 0" }}>    <FormattedMessage id="key_time" /></div>
      </div>

      <ScrollView
        autoHeight

        autoHeightMin={300}
        autoHeightMax={675}

      >
        <div className={styles.stats}>


          {
            // @ts-ignore
            <Table
              height="100%"
              locale={{ emptyText: <Empty /> }}
              dataSource={dataSource}
              pagination={false}
              columns={columns}
            />
          }
        </div>
      </ScrollView>
    </div>
  );
};

export default Ranking;
