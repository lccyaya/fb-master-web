import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { FormattedMessage } from 'umi';
import FBWorldCapTab from '@/components/FBWordCopTab';
import Table from './table';
import { GuessRank } from '@/services/worldcup';
import { InfiniteScroll } from 'antd-mobile';
import { useInfiniteScroll } from 'ahooks';
import type { GuessRankingParams } from '@/services/worldcup';

import { Spin } from 'antd';
type Props = {};

const GuessRanking = (props: Props) => {
  const [activeKey, setActiveKey] = useState('0');
  const tab = [
    {
      title: <FormattedMessage id={'key_worldcap_guessvalue'} />,
      key: '0',
    },
    {
      title: <FormattedMessage id={'key_worldcap_return'} />,
      key: '1',
    },
  ];

  const onChangetab = (key: string) => {
    setActiveKey(key);
  };
  const getGuessRankList = async (page: number, size: number, tab: number): Promise<any> => {
    let data: GuessRankingParams = {
      page,
      size,
      tab,
    };
    const result: any = await GuessRank(data);
    console.log(result);

    if (result.success == true) {
      return {
        list: result.data.list,
        total: result.data.list.length >= 10,
        page: page + 1,
      };
    }
  };

  const {
    data = () => {},
    loading,
    loadMoreAsync,
    reload,
    noMore,
  } = useInfiniteScroll(
    (d) => {
      const { page = 1 } = d || {};

      let tab = activeKey == '1' ? 1 : 0;
      return getGuessRankList(page, 10, tab);
    },
    {
      // target: ref,
      isNoMore: (data) => {
        if (!data?.list?.length) {
          return true;
        }
        return !data?.total;
      },
      manual: true,
    },
  );

  useEffect(() => {
    reload();
  }, [activeKey]);
  return (
    <div className={styles.guess_rank_info}>
      <div className={styles.guess_rank}>
        <div className={styles.guess_rank_tab}>
          {' '}
          <FBWorldCapTab
            mini={true}
            list={tab}
            defaultActiveKey={activeKey}
            onChange={onChangetab}
          ></FBWorldCapTab>
        </div>
      </div>
      <div style={{ height: '17px' }}></div>

      <Spin spinning={loading}>
        <div>
          <Table data={data} activeKey={activeKey}></Table>
          <InfiniteScroll
            loadMore={async (isRetry) => {
              await loadMoreAsync();
            }}
            hasMore={!noMore}
          />
        </div>
      </Spin>
    </div>
  );
};

export default GuessRanking;
