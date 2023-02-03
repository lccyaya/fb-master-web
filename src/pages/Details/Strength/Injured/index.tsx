import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'umi';
import styles from './index.less';
import FBTitle from '@/components/FBTitle';
import { injury } from '@/services/matchdetail';
import type { InjuryListRes } from '@/services/matchdetail';

import { Spin } from 'antd';

import Tabel from './tabel';

type Props = {
  match_id: number;
};

const Injured = (props: Props) => {
  const { match_id } = props;
  const [data, setData] = useState<InjuryListRes>();
  const [loading, setLoading] = useState<boolean>(false);

  const getInjury = async () => {
    setLoading(true);
    const params = {
      match_id,
    };
    const res = await injury(params);
    setLoading(false);
    if (res.success) {
      setData(res.data);
    }
  };
  useEffect(() => {
    getInjury();
  }, []);
  return (
    <div>
      {data?.home?.injury.length > 0 && data?.away?.injury.length > 0 && (
        <div>
          <FBTitle
            logo={true}
            size="18px"
            color="#45494C"
            title={<FormattedMessage id="key_Injured_defenseh" />}
          />
          <div>
            <Spin spinning={loading}>
              <Tabel data={data?.home} />
            </Spin>
            <Spin spinning={loading}>
              <Tabel data={data?.away} />
            </Spin>
          </div>
        </div>
      )}
    </div>
  );
};

export default Injured;
