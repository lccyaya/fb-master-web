import React, { useEffect } from 'react';
import styles from './index.less';

type Props = {
  rule: any
};

const Fule = (props: Props) => {

  return (
    <div>
      <div className={styles.fule}>

        <h3 className={styles.title}>赛制说明</h3>

        {props.rule?.map((item, index) => {
          return <div key={index} className={index == 0 ? styles.title_rule : ""}>
            {item}
          </div>
        })}

      </div>
    </div>
  );
};

export default Fule;
