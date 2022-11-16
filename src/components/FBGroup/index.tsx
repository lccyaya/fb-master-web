import React from 'react';
import styles from './index.less';
import type { listprops, GroupListres } from '@/services/worldcup';
import moment from 'moment';
import { useHistory } from 'umi';
type Props = {
  groupList: GroupListres[];
};

const FBGroup = (props: Props) => {
  const history = useHistory();

  const { groupList } = props;
  // const scrollToAnchor = (anchorName) => {

  //     if (anchorName) {

  //         // 找到锚点

  //         let anchorElement = document.getElementById(anchorName);

  //         // 如果对应id的锚点存在，就跳转到锚点

  //         if (anchorElement) {

  //             anchorElement.scrollIntoView(false);
  //             anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' })
  //         }

  //     }

  // }
  return (
    <div>
      {groupList?.map((item: GroupListres, index) => {
        return (
          <div key={index} id={`activity${item.groupName}`}>
            {/* <div style={{ fontSize: 14 }} onClick={() => {
                        scrollToAnchor(`activity${item.groupName}`)
                    }} >跳转{item.groupName}</div> */}
            <div className={styles.title}>{item.groupName}组</div>

            <div>
              {item?.match.map((items: listprops) => {
                return (
                  <div
                    className={styles.group_list}
                    key={items.MatchId}
                    onClick={() => {
                      history.push(`/zh/details/${items.MatchId}`);
                    }}
                  >
                    <div className={styles.time}>
                      {moment(items.MatchTime * 1000).format('MM-DD HH:mm')}
                    </div>
                    <div className={styles.logo_name} style={{ justifyContent: 'right' }}>
                      {items.HomeTeam.name}
                    </div>
                    <img
                      className={styles.team_logo}
                      src={items.HomeTeam.logo}
                      alt=""
                    />

                    <div>
                      {items.StatusID > 1 ? (
                        <div>
                          {items.HomeScores[0]}:{items.AwayScores[0]}
                        </div>
                      ) : (
                        <div>VS</div>
                      )}
                    </div>
                    <div className={styles.logo_name}>
                      <img
                        className={styles.team_logo}
                        src={items.AwayTeam.logo}
                        alt=""
                      />
                      {items.AwayTeam.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <div style={{ height: 55 }}></div>
    </div>
  );
};

export default FBGroup;
