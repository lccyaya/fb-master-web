import React, { useEffect, useState } from 'react';
import FBWorldCapTab from '@/components/FBWordCopTab';
import { FormattedMessage } from 'umi';
import FreeSchimport from './freeschemelist';
import HitSchemList from './hitschemelist';
import styles from './index.less';

type Props = {};
const Scheme = (props: Props) => {
  const [activeKey, setActiveKey] = useState('key_wordcap_hit');
  // const [freeSchemeList, setFreeSchemeList] = useState("key_wordcap_hit")
  const tab = [
    {
      title: <FormattedMessage id={'key_wordcap_hit'} />,
      key: 'key_wordcap_hit',
    },
    {
      title: <FormattedMessage id={'key_wordcap_winhit'} />,
      key: 'key_wordcap_winhit',
    },
    {
      title: <FormattedMessage id={'key_wordcap_free'} />,
      key: 'key_wordcap_free',
    },
  ];

  useEffect(() => {}, []);

  const onChangetab = (key: string) => {
    setActiveKey(key);
  };

  return (
    <div className={styles.cap_list}>
      <div style={{ width: '230px', margin: '10px 0' }}>
        <FBWorldCapTab
          mini={true}
          list={tab}
          defaultActiveKey={activeKey}
          onChange={onChangetab}
        ></FBWorldCapTab>
      </div>

      {activeKey == 'key_wordcap_hit' ? (
        <HitSchemList activeKey={activeKey} ten_hit={true}></HitSchemList>
      ) : (
        ''
      )}
      {activeKey == 'key_wordcap_winhit' ? <HitSchemList activeKey={activeKey}></HitSchemList> : ''}
      {activeKey == 'key_wordcap_free' ? <FreeSchimport></FreeSchimport> : ''}
    </div>
  );
};

export default Scheme;
