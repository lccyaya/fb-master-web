import React, { useState } from 'react';
import { Picker } from 'antd-mobile';
type Props = {};

const OddsType = (props: Props) => {
  // 是否展示
  const [visible, setVisible] = useState(false);
  // 选中的值
  const [value, setValue] = useState<(string | null)[]>(['M']);
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
    <div>
      <div
        onClick={() => {
          setVisible(true);
        }}
      >
        点击
      </div>
      <Picker
        columns={basicColumns}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        value={value}
        onConfirm={(v) => {
          setValue(v);
        }}
      />
    </div>
  );
};

export default OddsType;
