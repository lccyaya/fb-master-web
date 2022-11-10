import React, { useEffect, useState } from 'react';
import styles from './index.less';
import IconFont from '@/components/IconFont';
import moment from 'moment';
import { Toast } from 'antd-mobile';
import { useHistory } from 'umi';
import type { guessMatchList, guessMatch, AddGuessParams } from '@/services/worldcup';

type Props = {
  onClickbtn: Function;
  data: any;
  itemsData: any;
};

const FBGuessCenter = (props: Props) => {
  // const [selectId, setSelectId] = useState(null);
  // const [isSelect, setIsSelectId] = useState(false)
  // const [iswin, setIswint] = useState(null);
  const history = useHistory();
  const { onClickbtn, data } = props;
  useEffect(() => {}, []);
  const onGuessClick = (items: any, item: any) => {
    let match_id = item.match_id; //唯一
    let odd_scheme_id = item.odd_scheme_id;
    let tag = items.tag;
    let odd = items.odd;
    let scheme_title = item.scheme_title;
    let value = { match_id, tag, odd_scheme_id, odd, scheme_title };

    onClickbtn(value, data.match);

    // }
    console.log(Number(odd));
  };

  return (
    <div className={styles.guess_center_main}>
      <div
        className={styles.guess_center_team}
        onClick={() => {
          history.push(`/zh/details/${data.match.match_id}`);
        }}
      >
        <div>{data.match?.issue}</div>
        <div className={styles.guess_center_teamimg}>
          <div style={{ display: 'flex', color: '#7E1132' }}>
            {/* <div className={styles.guess_center_teamlog}></div> */}
            <div>{data.match.home_team_name}</div>
            {}
          </div>
          <IconFont className={styles.star} type="icon-VS" color="#7E1132" size={18} />
          <div style={{ display: 'flex', color: '#45494C' }}>
            {/* <div className={styles.guess_center_teamlog}></div> */}
            <div> {data.match.away_team_name}</div>
          </div>
        </div>

        <div>
          {' '}
          <IconFont className={styles.star} type="icon-jiantouyou" size={10} />
        </div>
      </div>
      <div className={styles.guess_center_team}>
        <div>
          {data.match.competition_name}
          <div> {moment(new Date(Number(data?.match?.match_time) * 1000)).format('HH:mm')}</div>
        </div>
        <div>
          {data?.odds?.map((item: any, index: number) => {
            return (
              <div key={index}>
                {data?.odds?.length > 1 ? (
                  ''
                ) : (
                  <div className={styles.nostart}>
                    <div className={styles.nostart_buttonnum}>0</div>
                    <div className={styles.nostart_text}>未开始</div>
                  </div>
                )}
                <div className={styles.button_box} key={index}>
                  <div
                    className={styles.buttonnum}
                    style={{
                      background:
                        item.scheme_title == '0'
                          ? '#F3F4F6'
                          : item.scheme_title >= '1'
                          ? '#F2E7EA'
                          : '#E7F1ED',
                      color:
                        item.scheme_title == '0'
                          ? '#45494C'
                          : item.scheme_title >= '1'
                          ? '#7E1132'
                          : '#39906A',
                    }}
                  >
                    {item.scheme_title >= '1' ? `+${item.scheme_title}` : item.scheme_title}
                    {/* {item.scheme_title >= 1 ? `+${item.scheme_title}` : item.scheme_title} */}
                  </div>

                  {/* <div>{item.scheme_title < 0 && '未开始'}</div> */}
                  {item?.odds?.map((items: guessMatch, oddsindex: number) => {
                    return (
                      <div key={oddsindex}>
                        <div className={styles.onbutton} key={oddsindex}>
                          <div
                            className={
                              Number(items.odd) < 1.4
                                ? styles.noodd
                                : items.selected
                                ? styles.selectId
                                : styles.button
                            }
                            onClick={(e) => {
                              if (Number(items.odd) >= 1.4) {
                                onGuessClick(items, item);
                              } else {
                                Toast.show({
                                  content: '当前选项不支持竞猜',
                                });
                              }
                            }}
                            data-match_id={item?.match_id}
                            data-odd_scheme_id={item?.odd_scheme_id}
                            data-tag={items.tag}
                            data-odd={items?.odd}
                            data-scheme_title={item.scheme_title}
                          >
                            {items.title}
                            {items.odd}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FBGuessCenter;
