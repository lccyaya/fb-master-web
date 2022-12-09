import React, { useState } from 'react';
import styles from './index.less';
import { Selector } from 'antd-mobile';

type Props = {
  options: any;
  // value: number;
  // activekey: boolean;
  onChange: Function;
};

const RightTab = (props: Props) => {
  const { options, onChange } = props;
  return (
    <div className={styles.right_tab}>
      <Selector
        style={{
          '--border-radius': '100px',
          '--border': 'solid #848494 1px',
          '--checked-border': 'solid #FA5900 1px',
          '--padding': '0 5px',
          '--checked-color': '#fff',
          '--color': '#fff',
          '--text-color': '#848494',
        }}
        showCheckMark={false}
        multiple
        options={options}
        onChange={(value) => {
          onChange(value);
        }}
      />
    </div>
  );
};

export default RightTab;
