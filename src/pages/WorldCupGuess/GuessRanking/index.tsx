import React, { useState } from 'react';
import styles from './index.less';
import { FormattedMessage } from 'umi';
import FBWorldCapTab from '@/components/FBWordCopTab';
import Table from './table';
type Props = {};

const GuessRanking = (props: Props) => {
  const [activeKey, setActiveKey] = useState('1');
  const tab = [
    {
      title: <FormattedMessage id={'key_worldcap_guessvalue'} />,
      key: '1',
    },
    {
      title: <FormattedMessage id={'key_worldcap_return'} />,
      key: '2',
    },
  ];

  const data = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
  const onChangetab = (key: string) => {
    setActiveKey(key);
  };
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
      <Table data={data} activeKey={activeKey}></Table>
    </div>
  );
};

export default GuessRanking;
