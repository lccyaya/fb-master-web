import React from 'react';
import styles from './index.less';
import FBTitle from '@/components/FBTitle';
import { FormattedMessage } from 'umi';
import PlayerInfo from '@/components/FBPlayerInfo/PlayerInfo';
import PlayerInjured from '@/components/FBPlayerInfo/PlayerInjured';

type Props = {
  match: any;
  data: any;
};

const Substitutes = (props: Props) => {
  const { data, match } = props;
  console.log(data, ';s;s;s;s;s;s;');

  return (
    <div className={styles.substitutes}>
      <FBTitle
        logo={true}
        size="18px"
        color="#45494C"
        title={<FormattedMessage id="key_bench_lineup" />}
      />
      <PlayerInfo match={match} data={data} />
      <FBTitle
        logo={true}
        size="18px"
        color="#45494C"
        title={<FormattedMessage id="key_absence_db" />}
      />
      <PlayerInjured match={match} data={data} />
    </div>
  );
};

export default Substitutes;
