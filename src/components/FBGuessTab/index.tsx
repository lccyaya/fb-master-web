import React, { useEffect, useState } from 'react';
import IconFont from '@/components/IconFont';
import styles from './index.less';
import { useHistory } from 'umi';
import TabFirstImg from '@/assets/worldcup/guess_tab_first.png';
import TabTwoImg from '@/assets/worldcup/guess_tab_two.png';
import TabThreeImg from '@/assets/worldcup/guess_tab_three.png';
import { FormattedMessage } from 'umi';

type itemparms = {
  label: string;
  key: string;
  children?: string;
};
type Props = {
  item: itemparms[];
  ativeKey: string;
  onChange: Function;
  list: any;
};

const FBGuessTab = (props: Props) => {
  const history = useHistory();
  const { item, ativeKey, onChange, list } = props;
  const onChangetab = (key: string) => {
    onChange(key);
  };
  const ongoMore = () => {
    history.push(`/zh/worldcup_guess`);
  };

  useEffect(() => {
    console.log(list, 'ssssss');
  }, [ativeKey]);
  return (
    <div className={styles.guess_main}>
      <div className={styles.guess_tab}>
        <div style={{ display: 'flex' }}>
          {item.map((items) => {
            return (
              <div
                onClick={() => {
                  onChangetab(items.key);
                }}
                className={
                  ativeKey == items.key ? styles.guess_ativeKey_tab : styles.guess_default_tab
                }
                key={items.key}
              >
                {items.label}
              </div>
            );
          })}
        </div>
        <div className={styles.more} onClick={ongoMore}>
          更多 <IconFont className={styles.star} type="icon-jiantouyou" size={10} />
        </div>
      </div>

      <div className={styles.card_content_box}>
        <div key={list[1]?.user_id} className={styles.card_content}>
          <div className={styles.card_content_name}>
            <div className={styles.card_content_nameleft}>
              <img className={styles.rank} src={TabTwoImg} alt="" />
            </div>
            <div>
              <div style={{ color: '#7E1132', textAlign: 'center' }}>{list[1]?.nickname}</div>

              <div className={styles.guess_num}>{list[1]?.energy_num}</div>
            </div>
          </div>
          <div className={styles.card_content_return}>
            {Math.trunc(list[1]?.reward_rate)}%
            {/* <FormattedMessage id={'key_worldcap_guessvalue'} /> */}
          </div>
        </div>
        <div key={list[0]?.user_id} className={styles.card_content} style={{ marginTop: -25 }}>
          <div className={styles.card_content_name}>
            <div className={styles.card_content_nameleft}>
              <img className={styles.rank} src={TabTwoImg} alt="" />
            </div>
            <div>
              <div style={{ color: '#7E1132', textAlign: 'center' }}>{list[2]?.nickname}</div>

              <div className={styles.guess_num}>{list[0]?.energy_num}</div>
            </div>
          </div>
          <div className={styles.card_content_return}>
            {Math.trunc(list[0]?.reward_rate)}%
            {/* <FormattedMessage id={'key_worldcap_guessvalue'} /> */}
          </div>
        </div>
        <div key={list[2]?.user_id} className={styles.card_content}>
          <div className={styles.card_content_name}>
            <div className={styles.card_content_nameleft}>
              <img className={styles.rank} src={TabTwoImg} alt="" />
            </div>
            <div>
              <div style={{ color: '#7E1132', textAlign: 'center' }}>{list[2]?.nickname}</div>

              <div className={styles.guess_num}>{list[2]?.energy_num}</div>
            </div>
          </div>
          <div className={styles.card_content_return}>
            {Math.trunc(list[2]?.reward_rate)}%
            {/* <FormattedMessage id={'key_worldcap_guessvalue'} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default FBGuessTab;
