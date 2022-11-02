import React, { useState } from 'react';
import styles from './index.less';
import IconFont from '@/components/IconFont';
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
    let id = e.target.getAttribute('data-id');
    let newiswin = e.target.getAttribute('data-iswin');

    if (id == selectId && newiswin == iswin) {
      setSelectId(null);
      setIswint(null);

      let data = { index, id: null, newiswin: null };

      onClickbtn(data);
    } else {
      setSelectId(id);
      setIswint(newiswin);
      let data = { id, newiswin, index };
      onClickbtn(data);
    }
  };

  return (
    <div className={styles.guess_center_main}>
      <div
        className={styles.guess_center_team}
        style={
          {
            //   alignItems: 'center',
          }
        }
      >
        <div>周四 001</div>
        <div className={styles.guess_center_teamimg}>
          <div style={{ display: 'flex', color: '#7E1132' }}>
            <div className={styles.guess_center_teamlog}>图片</div>
            占位
          </div>
          <IconFont className={styles.star} type="icon-VS" color="#7E1132" size={18} />
          <div style={{ display: 'flex', color: '#45494C' }}>
            <div className={styles.guess_center_teamlog}>图片</div>
            占位
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
          <div>19:00</div>
        </div>
        <div>
          <div className={styles.button_box}>
            <div className={styles.buttonnum}>0</div>

            <div
              className={styles.onbutton}
              onClick={(e) => {
                onGuessClick(e);
              }}
            >
              <div
                className={selectId == data.id && iswin == 'win' ? styles.selectId : styles.button}
                data-id={data.id}
                data-iswin="win"
              >
                胜
              </div>
              <div
                className={selectId == data.id && iswin == 'flat' ? styles.selectId : styles.button}
                data-id={data.id}
                data-iswin="flat"
              >
                平
              </div>
              <div
                className={
                  selectId == data.id && iswin == 'guest' ? styles.selectId : styles.button
                }
                data-id={data.id}
                data-iswin="guest"
              >
                客
              </div>
            </div>
          </div>
          <div className={styles.button_box}>
            <div className={styles.buttonnum}>0</div>
            <div
              className={styles.onbutton}
              onClick={(e) => {
                onGuessClick(e);
              }}
            >
              <div
                className={
                  selectId == data.away && iswin == 'win' ? styles.selectId : styles.button
                }
                data-id={data.away}
                data-iswin="win"
              >
                胜
              </div>
              <div
                className={
                  selectId == data.away && iswin == 'flat' ? styles.selectId : styles.button
                }
                data-id={data.away}
                data-iswin="flat"
              >
                平
              </div>
              <div
                className={
                  selectId == data.away && iswin == 'guest' ? styles.selectId : styles.button
                }
                data-id={data.away}
                data-iswin="guest"
              >
                客
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FBGuessCenter;
