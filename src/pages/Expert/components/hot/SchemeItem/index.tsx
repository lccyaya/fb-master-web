import FBExpertTag, { FBTagType } from '@/components/FBExpertTag';
import { Avatar } from 'antd';
import { Divider, Space } from 'antd-mobile';
import React from 'react';
import styles from './index.less';

type Props = {
  scheme: any;
};

const SchemeItem: React.FC<Props> = (props) => {
  const { scheme } = props;
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.expert_box}>
          <Avatar src={scheme.avatar} size={42} />
          <div className={styles.nickname_box}>
            <div className={styles.nickname}>{scheme.nickname}</div>
            <Space>
              {scheme.hit_tag ? (
                <FBExpertTag type={FBTagType.HitRate} tag={scheme.hit_tag} />
              ) : null}
              {scheme.continuous_tag ? (
                <FBExpertTag type={FBTagType.Continue} tag={scheme.continuous_tag} />
              ) : null}
            </Space>
          </div>
        </div>
        <div className={styles.hit_info_box}>
          <div className={styles.hit_rate}>
            <span className={styles.rate}>{scheme.hit_rate}</span>
            <span className={styles.rate_flag}>%</span>
          </div>
          <div className={styles.rate_des}>近期命中率</div>
        </div>
      </div>
      <div className={styles.title_box}>{scheme.describe}</div>
      <div className={styles.match_box}>
        <div className={styles.match_info}>
          <span>{scheme.competition_name}</span>
          <Divider direction="vertical" style={{ margin: '0px 10px', color: '#CFD0D8' }} />
          <span>{scheme.home_name}</span>
          <span>vs</span>
          <span>{scheme.away_name}</span>
        </div>
      </div>
    </div>
  );
};

export default SchemeItem;
