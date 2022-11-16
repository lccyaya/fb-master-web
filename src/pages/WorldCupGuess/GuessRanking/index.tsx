import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { FormattedMessage } from 'umi';
import FBWorldCapTab from '@/components/FBWordCopTab';
import Table from './table';
import { GuessRank } from '@/services/worldcup';
type Props = {};

const GuessRanking = (props: Props) => {
  const [activeKey, setActiveKey] = useState('0');
  const [data, setData] = useState(null);
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
  const getGuessRankList = async (tab: number): Promise<any> => {
    let data: any = {
      tab,
      page: 1,
      size: 100,
    };
    const result: any = await GuessRank(data);
    console.log(result);

    if (result.success == true) {
      setData(result.data.list);
    }
  };

  useEffect(() => {
    getGuessRankList(Number(activeKey));
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

      <div>
        <Table data={data} activeKey={activeKey}></Table>
      </div>
    </div>
  );
};

export default GuessRanking;
