
import React from 'react'

type Props = {
  oddsInfo: any,
  selectOdds: Function,
}

const OddsCell: React.FC<Props> = (props) => {
  const {oddsInfo, selectOdds} = props;
  return (
    <div>{oddsInfo.scheme_title}</div>
  )
}

export default OddsCell