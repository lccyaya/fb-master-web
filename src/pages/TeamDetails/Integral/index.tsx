import React, { useState, useContext, createContext } from 'react';
import Groupmatch from '@/pages/Info/groupmatch/index';
import myContext from '@/utils/createContext';
type Props = {};
const Integral = (props: Props) => {
  const [activeKey, setActiveKey] = useState('1');
  const themes = useContext(myContext);
  // const history = useHistory();
  console.log(themes, 'spspspspsp');
  return (
    <div>
      <Groupmatch
        season_id={themes.season_id}
        competition_id={themes.competition_id}
        type="1"
        integrate="1"
      />
      {themes.season_id}
    </div>
  );
};

export default Integral;
