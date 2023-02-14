import React, { useState } from 'react';
import { CascadePicker } from 'antd-mobile';
import IconFont from '@/components/IconFont';
import styles from './index.less';
type Props = {};

const Date = (props: Props) => {
  const { onClick } = props;
  // 弹窗
  const [visible, setVisible] = useState<boolean>(false);
  // 弹窗选中值
  const [pickervalue, setPickerValue] = useState<any>();
  const [yeardata, setyeardata] = useState<any>([]);
  const onCahngeDate = () => {
    setVisible(!visible);
  };
  return (
    <div>
      <div className={styles.data} onClick={onCahngeDate}>
        22-23 <IconFont type="icon-zhankai2" color="#FA5900" size={10} />
      </div>
      <CascadePicker
        options={yeardata}
        value={pickervalue}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        onConfirm={(val, extend) => {
          onClick(val);
        }}
      />
    </div>
  );
};

export default Date;
