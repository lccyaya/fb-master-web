import React, { useState } from 'react';
import styles from './index.less';
import IconFont from '@/components/IconFont';
import FBPopover from '@/components/FBPopover';

type Props = {
  onOk: Function;
};

const FBGuessEnergy = (props: Props) => {
  const { onOk } = props;
  const [unfold, setUnfold] = useState(false);
  const [unfoldValue, setUnfoldValue] = useState(null);

  return (
    <div>
      {unfold ? (
        <div className={styles.unfold}>
          <div style={{ display: 'flex' }}>
            总能量 <span style={{ color: '#7E1132', marginLeft: 5 }}>188.00</span>
          </div>
          <div
            className={styles.unfoldbtn_box}
            onClick={(e: any) => {
              setUnfoldValue(e.target.innerText);
            }}
          >
            <div
              className={unfoldValue == 100 ? styles.select_unfoldbtn : styles.unfoldbtn}
              style={{ background: '#EEEEEE' }}
            >
              100
            </div>
            <div className={unfoldValue == 200 ? styles.select_unfoldbtn : styles.unfoldbtn}>
              200
            </div>
            <div className={unfoldValue == 500 ? styles.select_unfoldbtn : styles.unfoldbtn}>
              500
            </div>
            <div className={unfoldValue == 'ALL IN' ? styles.select_unfoldbtn : styles.unfoldbtn}>
              ALL IN
            </div>
          </div>
        </div>
      ) : null}

      <div className={styles.guess_energy} style={{ borderTop: unfold ? '1px solid #eee' : '' }}>
        <div className={styles.guesscenter_bottom}>
          <div style={{ display: 'flex' }}>
            能量值
            <div
              className={styles.guesscenter_value}
              onClick={() => {
                setUnfold(!unfold);
              }}
            >
              100
              <IconFont
                className={styles.star}
                type={unfold ? 'icon-zhankai2' : 'icon-shouqi'}
                color="#7E1132"
                size={8}
              />
            </div>
          </div>
          <div>
            最高得<span className={styles.guesscenter_value}>100</span>{' '}
          </div>
        </div>

        {/* <FBPopover ishidden={hidden} content={<div className={styles.content} >能量值不足，可通过分享和购买攻略获取</div>}>
                    <div className={styles.nounfold} onClick={() => {
                        setHidden(!hidden)

                    }}>   能量值不足</div>

                </FBPopover> */}

        {/* <div className={styles.onOk} onClick={() => {

                    // onOk(unfoldValue)
                }}>做任务得能量</div> */}
        <div
          className={styles.onOk}
          onClick={() => {
            onOk(unfoldValue);
          }}
        >
          确定
        </div>
      </div>
    </div>
  );
};

export default FBGuessEnergy;
