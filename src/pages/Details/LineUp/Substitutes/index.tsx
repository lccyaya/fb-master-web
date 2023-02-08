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
      <FBTitle logo={true} title={<FormattedMessage id="key_bench_lineup" />} />
      <PlayerInfo match={match} data={data} />

      {data?.home_absence?.length > 0 || data?.away_absence?.length > 0 ? (
        <div>
          <FBTitle logo={true} title={<FormattedMessage id="key_absence_db" />} />
          <PlayerInjured match={match} data={data} />
        </div>
      ) : null}
    </div>
  );
};

export default Substitutes;
