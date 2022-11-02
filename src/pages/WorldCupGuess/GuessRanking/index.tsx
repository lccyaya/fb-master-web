import React, { useState } from 'react';
import styles from './index.less';
import { FormattedMessage } from 'umi';
import FBWorldCapTab from '@/components/FBWordCopTab';
import Table from './table';
type Props = {};

const GuessRanking = (props: Props) => {
  const [activeKey, setActiveKey] = useState('key_worldcap_guessvalue');
  const tab = [
    {
      title: <FormattedMessage id={'key_worldcap_guessvalue'} />,
      key: 'key_worldcap_guessvalue',
    },
    {
      title: <FormattedMessage id={'key_worldcap_return'} />,
      key: 'key_worldcap_return',
    },
  ];
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
      <Table></Table>
    </div>
  );
};

export default GuessRanking;
