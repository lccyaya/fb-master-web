import { Avatar } from 'antd';
import React from 'react';
import { useHistory } from 'umi';
import styles from './index.less';

type Props = {
  expert: any;
};

const HotExpertItem: React.FC<Props> = (props) => {
  const { expert } = props;
  const history = useHistory();
  const toExpert = () => {
    history.push(`/zh/expert-detail?id=${expert.expert_id}`);
  };
  return (
    <div className={styles.container} onClick={toExpert}>
      <Avatar src={expert.avatar} size={45} />
      <span className={styles.nickname}>{expert.nickname}</span>
      <div className={styles.score_box}>
        <div className={styles.hit}>{expert.max_hit}</div>
        <div className={styles.score}>连红</div>
      </div>
    </div>
  );
};

export default HotExpertItem;
