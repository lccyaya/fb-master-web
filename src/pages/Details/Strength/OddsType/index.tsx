import React, { useState } from 'react';
import { Picker } from 'antd-mobile';
import { FormattedMessage } from 'umi';
import IconFont from '@/components/IconFont';

import styles from './index.less';

type Props = {};

const OddsType = (props: Props) => {
  // 是否展示
  const [visible, setVisible] = useState(false);
  // 选中的值
  const [value, setValue] = useState<(string | null)[]>(['Mon']);
  const [lable, setLabel] = useState<(string | null)[]>(['周一']);

  const basicColumns = [
    [
      { label: '周一', value: 'Mon' },
      { label: '周二', value: 'Tues' },
      { label: '周三', value: 'Wed' },
      { label: '周四', value: 'Thur' },
      { label: '周五', value: 'Fri' },
    ],
  ];
  return (
    <div className={styles.oddstype_main}>
      <div className={styles.oddstype_box}>
        <div
          className={styles.oddstype_box_left}
          onClick={() => {
            setVisible(true);
          }}
        >
          <div className={styles.oddstype_title}>
            {lable}
            <IconFont
              color="#848494"
              className={styles.icon}
              size={10}
              type="icon-biaoqianjiantou"
            />
          </div>

          <div className={styles.oddstype}>
            <div>
              <FormattedMessage id="key_1x2" />
            </div>
            <div>
              {' '}
              <FormattedMessage id="key_handicap" />
            </div>
            <div>
              {' '}
              <FormattedMessage id="key_over_under" />
            </div>
          </div>
        </div>
        <div className={styles.oddstype_box_right}>
          <div className={styles.oddstype_title}>
            {' '}
            <FormattedMessage id="key_inital" />始
          </div>

          <div className={styles.oddstype}>
            <div className={styles.oddstype_inital}>
              <div>
                12
              </div>
              <div>
                13
              </div>
              <div>
                14
              </div>
            </div>
            <div className={styles.oddstype_inital}>
              <div>
                12
              </div>
              <div>
                13
              </div>
              <div>
                14
              </div>
            </div>
            <div className={styles.oddstype_inital}>
              <div>
                12
              </div>
              <div>
                13
              </div>
              <div>
                14
              </div>
            </div>
          </div>




        </div>
        <div className={styles.oddstype_box_right}>
          <div className={styles.oddstype_title}>
            {' '}
            <FormattedMessage id="key_spot" />时
          </div>
          <div className={styles.oddstype}>
            <div className={styles.oddstype_inital}>
              <div>
                1.23
              </div>
              <div>
                1.34
              </div>
              <div>
                1.41
              </div>
            </div>
            <div className={styles.oddstype_inital}>
              <div>
                1.24
              </div>
              <div>
                13
              </div>
              <div>
                14
              </div>
            </div>
            <div className={styles.oddstype_inital}>
              <div>
                12
              </div>
              <div>
                13
              </div>
              <div>
                14
              </div>
            </div>
          </div>



        </div>
      </div>

      <Picker
        columns={basicColumns}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        defaultValue={value}
        // value={value}
        onConfirm={(v, extend: any) => {
          // const { item } = extend;
          setLabel(extend.items[0].label);
          setValue(v);
        }}
      />
    </div>
  );
};

export default OddsType;
