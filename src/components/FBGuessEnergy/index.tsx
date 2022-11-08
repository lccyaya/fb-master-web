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

  const [sum, setSum] = useState(200);

  return (
    <div>
      {unfold && (
        <div className={styles.unfold}>
          <div style={{ display: 'flex' }}>
            总能量 <span style={{ color: '#7E1132', marginLeft: 5 }}>188.00</span>
          </div>
          <div
            className={styles.unfoldbtn_box}
            onClick={(e: any) => {
              if (
                e.target.getAttribute('data-value') <= sum ||
                e.target.getAttribute('data-value') == 'all in'
              ) {
                setUnfoldValue(e.target.getAttribute('data-value'));
              }
            }}
          >
            <div
              className={unfoldValue == 100 ? styles.select_unfoldbtn : styles.unfoldbtn}
              style={{ background: sum < 100 ? '#EEEEEE' : '' }}
              data-value={100}
            >
              100
            </div>
            <div
              data-value={200}
              style={{ background: sum < 200 ? '#EEEEEE' : '' }}
              className={unfoldValue == 200 ? styles.select_unfoldbtn : styles.unfoldbtn}
            >
              200
            </div>
            <div
              data-value={500}
              style={{ background: sum < 500 ? '#EEEEEE' : '' }}
              className={unfoldValue == 500 ? styles.select_unfoldbtn : styles.unfoldbtn}
            >
              500
            </div>
            <div
              data-value="all in"
              className={unfoldValue == 'all in' ? styles.select_unfoldbtn : styles.unfoldbtn}
            >
              ALL IN
            </div>
          </div>
        </div>
      )}

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
        {sum < 100 ? (
          <FBPopover
            // ishidden={hidden}
            content={<div className={styles.content}>能量值不足，可通过分享和购买攻略获取</div>}
          >
            <div
              className={styles.nounfold}
              onClick={() => {
                // setHidden(!hidden);
              }}
            >
              {' '}
              能量值不足
            </div>
          </FBPopover>
        ) : (
          <div
            className={styles.onOk}
            onClick={() => {
              let num = unfoldValue == 'all in' ? sum : unfoldValue;

              onOk(Number(num));
            }}
          >
            确定
          </div>
        )}
      </div>
    </div>
  );
};

export default FBGuessEnergy;
