import ExpertList from '@/components/ExpertList/mobile';
import React, { useState, useEffect } from 'react';
import { getExpertRanking } from '@/services/expert';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useInfiniteScroll } from 'ahooks';
import { Spin } from 'antd';
import styles from './mobile.module.less';

export default function Glz() {
  const getList = async (page, size) => {
    const res = await getExpertRanking({
      tab: 1,
      page,
      size,
    });
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
    loadMore,
    noMore,
    reload,
    loading,
  } = useInfiniteScroll(
    (d) => {
      const { page = 1 } = d || {};
      return getList(page, 10);
    },
    {
      isNoMore: (data) => {
        if (!data?.list?.length) {
          return true;
        }
        return data?.list?.length >= data?.total;
      },
      manual: true,
    },
  );
  useEffect(() => {
    reload();
  }, []);
  return (
    <Spin spinning={loading}>
      <div className={styles.wrap}>
        <InfiniteScroll
          dataLength={data?.list?.length || 0}
          next={loadMore}
          hasMore={!noMore}
          endMessage={null}
          loader={null}
        >
          <ExpertList list={data?.list || []} type="gmz" />
        </InfiniteScroll>
      </div>
    </Spin>
  );
}
