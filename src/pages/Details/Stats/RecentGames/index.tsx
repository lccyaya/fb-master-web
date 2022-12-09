import React, { useEffect, useState } from 'react';
import HomeHistory from './homehistory';
import AwayHistory from './awayhistory';
type Props = {
  match_id: number;
};

const Ranking = (props: Props) => {
  const { match_id } = props;
  return (
    <div>
      <HomeHistory match_id={match_id} />
      <div style={{ height: 12 }} />
      <AwayHistory match_id={match_id} />
    </div>
  );
};

export default Ranking;
