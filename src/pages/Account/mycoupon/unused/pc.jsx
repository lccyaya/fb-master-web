import Coupon from '@/components/Coupon/pc';
import { Spin } from 'antd';
import React, { useState, useEffect } from 'react';
import { getCouponList } from '@/services/expert';
import Empty from '@/components/Empty';
import BasePagination from '@/components/BasePagination';
import { usePagination } from 'ahooks';
import styles from './pc.module.less';
export default function Unused() {
  const getList = async ({ page, size }) => {
    const res = await getCouponList({
      page,
      size,
      tab: 0,
    });
    if (res.success) {
      return {
        list: res.data.list,
        // list: [
        //   {
        //     gold_coin: 18,
        //     valid_time: '1244444',
        //     name: '新人大礼包',
        //     id: 1,
        //     condition: '支付直减',
        //     checked: true,
        //   },
        // ],
        total: res.data.total,
      };
    }
  };

  const {
    data = {},
    loading,
    pagination,
    run,
    params,
  } = usePagination(
    ({ current, pageSize }) => {
      return getList({
        page: current,
        size: pageSize,
      });
    },
    {
      manual: true,
    },
  );
  useEffect(() => {
    run({
      current: 1,
      pageSize: params[0]?.pageSize || 10,
    });
  }, []);
  return (
    <Spin spinning={loading}>
      {data.list?.length > 0 ? (
        <div className={styles.coupon_wrap}>
          <Coupon list={data.list} type="unused" />
          <BasePagination
            total={data?.total}
            current={pagination.current}
            size={pagination.pageSize}
            onChange={pagination.onChange}
            showSizeChanger={false}
            showQuickJumper
          />
        </div>
      ) : (
        <Empty />
      )}
    </Spin>
  );
}
