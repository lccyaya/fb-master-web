import React, { useEffect, useState } from 'react';
import styles from './index.less';
import IconFont from '@/components/IconFont';
import moment from 'moment';
type Props = {
  onClickbtn: Function;
  data: any;
  index: number;
};

const FBGuessCenter = (props: Props) => {
  const [selectId, setSelectId] = useState(null);
  // const [isSelect, setIsSelectId] = useState(false)
  const [iswin, setIswint] = useState(null);

  const { onClickbtn, data, index } = props;

  const onGuessClick = (e: any) => {
    let match_id = e.target.getAttribute('data-match_id');
    let odd_scheme_id = e.target.getAttribute('data-odd_scheme_id');

    let newiswin = e.target.getAttribute('data-iswin');
    console.log(odd_scheme_id, newiswin);

    if (match_id == selectId && newiswin == iswin) {
      setSelectId(null);
      setIswint(null);

      let data = { index, id: null, newiswin: null };

      onClickbtn(data);
    } else {
      setSelectId(odd_scheme_id);
      setIswint(newiswin);
      let data = { match_id, newiswin, index };
      onClickbtn(data);
    }
  };

  return (
    <div className={styles.guess_center_main} key={data?.match?.match_id}>
      <div
        className={styles.guess_center_team}
        style={
          {
            //   alignItems: 'center',
          }
        }
      >
        <div>{data.match?.issue}</div>
        <div className={styles.guess_center_teamimg}>
          <div style={{ display: 'flex', color: '#7E1132' }}>
            <div className={styles.guess_center_teamlog}></div>
            <div>{data.match.home_team_name}</div>
            {}
          </div>
          <IconFont className={styles.star} type="icon-VS" color="#7E1132" size={18} />
          <div style={{ display: 'flex', color: '#45494C' }}>
            <div className={styles.guess_center_teamlog}></div>
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
          世界杯
          <div>
            {' '}
            {moment(new Date(Number(data?.match?.match_time) * 1000)).format('YYYY-MM-DD HH:mm')}
          </div>
        </div>
        <div>
          {data?.odds?.map((item, index) => {
            return (
              <div className={styles.button_box} key={index}>
                <div className={styles.buttonnum}>0</div>
                {item?.odds?.map((items) => {
                  return (
                    <div
                      className={styles.onbutton}
                      onClick={(e) => {
                        onGuessClick(e);
                      }}
                    >
                      <div
                        className={
                          selectId == item?.odd_scheme_id && iswin == items.tag
                            ? styles.selectId
                            : styles.button
                        }
                        data-match_id={item?.match_id}
                        data-odd_scheme_id={item?.odd_scheme_id}
                        data-iswin={items.tag}
                      >
                        {items.title}
                        {items.odd}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FBGuessCenter;
