import React from 'react';
import styles from './mobile.module.less';
import Iconfont from '@/components/IconFont';
import Achievements from '@/components/achievements/mobile';
import Tags from '@/components/Tags/mobile';
import Watch from '@/components/Watch/mobile';
import moment from 'moment';
import Avatar from '@/components/avatar';
import { formatTime } from '@/utils/utils';
import { toShortLangCode } from '@/utils/utils';
import { locale } from '@/app';
import { history } from 'umi';
import { handleReport } from '@/utils/report';
import Collect from '@/components/collect/mobile';
import FBExpertTag, { FBTagType } from '@/components/FBExpertTag';

const ExpertBlock = ({ expert, describe, published_at, id, collected }) => {
  return (
    <div className={styles.expert_block}>
   <div className={styles.expertinfo} style={{marginBottom:15}}>    <div className={styles.expert}>
        <div className={styles.left_box}>

          <Avatar
            src={expert.avatar}
            size={36}
            className={styles.avatar}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleReport({
                action: 'expert_enter',
                tag: undefined,
              });
              const lang = toShortLangCode(locale.getLocale());
              history.push(`/${lang}/expert-detail?id=${expert.id}`);
            }}
          />
          <div className={styles.mid}>
            <div
              className={styles.nickname}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleReport({
                  action: 'expert_enter',
                  tag: undefined,
                });
                const lang = toShortLangCode(locale.getLocale());
                history.push(`/${lang}/expert-detail?id=${expert.id}`);
              }}
            >
              {expert.nickname}
            </div>
            <div style={{ display: "flex" }}>
            {expert.hit_tag?<div>  <FBExpertTag type={0} tag={expert.hit_tag} /></div>:""}
            
              <div style={{ width: 5 }}></div>
              {expert.continuous_tag?<div> <FBExpertTag  tag={expert.continuous_tag.split("连")[0]} /></div>:""}
        </div>
            
          
            {/* <Tags list={[expert.continuous_tag, expert.hit_tag]} className={styles.tags} /> */}
          </div>
        </div>
        <div style={{margin:"10px 0"}}>
          <Watch id={expert.id} followed={expert.followed} />
        </div>
      </div>

      <Achievements records={expert.recent_record} />
      <div className={styles.expert_desc}>{expert.introduce}</div>
</div>
      <div className={styles.expertinfoa}>
           <div className={styles.desc}>
          <span>{describe}</span>
          
        {/* <Collect id={id} collected={collected} /> */}
      </div>
      <div className={styles.publish_at}>
        {published_at ? `${formatTime(published_at)}发布` : ''}
      </div>
      </div>
    </div>
  );
};

export default ExpertBlock;
