import React from 'react';
import styles from './index.less';
import IconFont from '@/components/IconFont';
import { useHistory } from 'umi';

type Props = {};

const InfoHeader = (props: Props) => {
  const { configs, data } = props;
  const history = useHistory();
  const onGoPlayer = () => {
    history.push(`/zh/player/${1}`);
  };
  return (
    <div className={styles.player_info_card}>
      <div className={styles.player_info_card_flex}>
        <div className={styles.player_info_card_left}>
          <img className={styles.avatar} src="" alt="" />
          <div>
            <div className={styles.name} onClick={onGoPlayer}>
              维尼修斯·儒尼奥尔 <IconFont type="icon-jiantouyou" size={12} color="#333" />
            </div>
            <div>国际米兰/22</div>
            <div>前锋/左脚</div>
          </div>
        </div>

        <div className={styles.player_info_card_right}>
          <div className={styles.rate_num}>7.8</div>

          <div className={styles.rate}>本场评分</div>
        </div>
      </div>
    </div>
  );
};

export default InfoHeader;
