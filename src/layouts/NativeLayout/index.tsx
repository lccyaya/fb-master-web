import { ConnectState } from '@/models/connect';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'umi';

type Props = {};

const NativeLayout: React.FC<Props> = (props) => {
  const { children } = props;
  const dispatch = useDispatch();
  const isNative = useSelector<ConnectState>((s) => s.native.isNative);

  useEffect(() => {
    dispatch({
      type: 'native/changeNoticeReadState',
      payload: true,
    });
  }, []);

  // 设置native标识

  return (
    <>
      <div>is{isNative}</div>
      {children}
    </>
  );
};

export default NativeLayout;
