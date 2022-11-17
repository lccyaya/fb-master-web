import React, { useState } from 'react';
import styles from './index.less';
import IconFont from '@/components/IconFont';
import FBPopover from '@/components/FBPopover';

type Props = {
  onOk: Function;
  setModalData: any;
  modalData: any;
  energy_num?: any;
};

const FBGuessEnergy = (props: Props) => {
  const { onOk, setModalData, modalData, energy_num } = props;
  const [unfold, setUnfold] = useState(false);
  const [unfoldValue, setUnfoldValue] = useState<number | string>(energy_num >= 100 ? 100 : 0);

  return (
    <div>
      {unfold && (
        <div className={styles.unfold}>
          <div style={{ display: 'flex' }}>
            总能量 <span style={{ color: '#7E1132', marginLeft: 5 }}>{energy_num}</span>
          </div>
          <div
            className={styles.unfoldbtn_box}
            onClick={(e: any) => {
              const data_value = e.target.getAttribute('data-value');
              if (energy_num >= 600 && data_value == 'all in') {
              } else {
                if (data_value <= energy_num || data_value == 'all in') {
                  setUnfoldValue(data_value);

                  const num = data_value == 'all in' ? energy_num : data_value;
                  const obj = {
                    energy_coin: num,
                  };
                  setModalData({ ...modalData, ...obj });
                  setUnfold(false);
                }
              }
            }}
          >
            <div
              className={
                unfoldValue == 100 && energy_num >= 100 ? styles.select_unfoldbtn : styles.unfoldbtn
              }
              style={{
                background: energy_num < 100 ? '#EEEEEE' : '',
                color: energy_num < 100 ? '#999999' : '',
              }}
              data-value={100}
            >
              100
            </div>
            <div
              data-value={200}
              style={{
                background: energy_num < 200 ? '#EEEEEE' : '',
                color: energy_num < 200 ? '#999999' : '',
              }}
              className={
                unfoldValue == 200 && energy_num >= 200 ? styles.select_unfoldbtn : styles.unfoldbtn
              }
            >
              200
            </div>
            <div
              data-value={500}
              style={{
                background: energy_num < 500 ? '#EEEEEE' : '',
                color: energy_num < 500 ? '#999999' : '',
              }}
              className={
                unfoldValue == 500 && energy_num >= 500 ? styles.select_unfoldbtn : styles.unfoldbtn
              }
            >
              500
            </div>
            <div
              data-value="all in"
              style={{
                background: energy_num >= 600 ? '#EEEEEE' : '',
                color: energy_num >= 600 ? '#999999' : '',
              }}
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
              {unfoldValue == 'all in' ? energy_num : unfoldValue}
              <IconFont
                className={styles.star}
                type={unfold ? 'icon-zhankai2' : 'icon-shouqi'}
                color="#7E1132"
                size={8}
              />
            </div>
          </div>
          <div>
            最高得
            <span className={styles.guesscenter_value}>
              {unfoldValue == 'all in'
                ? (energy_num * modalData.odd).toFixed(0)
                : (unfoldValue * modalData.odd).toFixed(0)}
            </span>{' '}
          </div>
        </div>
        {energy_num < 100 ? (
          <FBPopover
            content={<div className={styles.content}>能量值不足，可通过分享和购买攻略获取</div>}
          >
            <div className={styles.nounfold} onClick={() => {}}>
              {' '}
              能量值不足
            </div>
          </FBPopover>
        ) : (
          <div
            className={styles.onOk}
            style={{
              background: !unfoldValue || energy_num < unfoldValue ? '#F3F4F6' : '#7E1132',
              color: !unfoldValue || energy_num < unfoldValue ? '#848494' : '#fff',
            }}
            onClick={() => {
              console.log(energy_num, unfoldValue, 'unfoldValue');

              if (!unfoldValue || energy_num < unfoldValue) {
              } else {
                onOk();
              }
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
