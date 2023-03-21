import React, { useState, useContext } from 'react';
import Groupmatch from '@/pages/Info/groupmatch/index';
import myContext from '@/utils/createContext';
type Props = {};
const Integral = (props: Props) => {
  // const [activeKey, setActiveKey] = useState('1');
  const { season_id, competition_id } = useContext(myContext);
  // const history = useHistory();
  return (
    <div>
      <Groupmatch season_id={season_id} competition_id={competition_id} type="1" integrate="1" />
      {/* {themes.season_id} */}
    </div>
  );
};

export default Integral;
