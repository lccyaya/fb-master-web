import { ConnectState } from '@/models/connect';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'umi';
import { webJsBridge } from "@/services/webjsbridge";
import { extendOptionsAuth } from '@/utils/request';
import { timeStorageSet } from '@/utils/timestorage';
import { FOOTBALL_MASTER_TOKEN } from '@/constants';

type Props = {};

const NativeLayout: React.FC<Props> = (props) => {
  const { children } = props;
  const dispatch = useDispatch();
  const isNative = useSelector<ConnectState>((s) => s.native.isNative);

  const initAuthtoken = () => {
    webJsBridge.callHandler("getAuthToken", "", (res: string)=> {
      console.log(res);
      timeStorageSet(FOOTBALL_MASTER_TOKEN, res, 864e5 - 10 * 1000);
      extendOptionsAuth();
      dispatch({
        type: 'user/fetchCurrent',
      });
    })
  };

  useEffect(() => {
    dispatch({
      type: 'native/setNative',
      payload: true,
    });
    initAuthtoken();
  }, []);

  // 设置native标识

  return (
    <>
      {children}
    </>
  );
};

export default NativeLayout;
