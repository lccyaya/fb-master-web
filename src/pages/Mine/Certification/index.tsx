import React, { memo, useMemo, useState } from 'react';
import { history } from 'umi';
import { Spin } from 'antd';
import { NavBar, Form, Input, Button, Checkbox } from 'antd-mobile';

import styles from './index.module.less';


const Certification = () => {
  const [agreeToADeal, setAgreeToADeal] = useState(false);
  const [form] = Form.useForm();
  const realNameValue = Form.useWatch('realName', form)
  const cardNumberValue = Form.useWatch('cardNumber', form)


  const canSubmit = useMemo(() => {
    return agreeToADeal && !!realNameValue && !!cardNumberValue
  }, [agreeToADeal, realNameValue, cardNumberValue])

  const back = () => {
    history.goBack();
  }

  const handleChange = (value: boolean) => {
    setAgreeToADeal(value)
  }

  const handleProtocolClick = () => {
    history.push(`/zh/rule`, {
      title: "用户协议",
      url: `${window.publicPath}privacy.html`
    })
  }

  const handleSubmit = () => {
    form.getFieldsValue()
      .then((values: {
        realName?: string;
        cardNumber?: string;
      }) => {
        console.log(values)
      })
  }

  return (
    <div className={styles.certification_page}>
      <NavBar className={styles.navbar} onBack={back}>
        实名认证
      </NavBar>
      <Spin spinning={false}>
        <div className={styles.tips}>请您如实准确填写本人信息</div>
        <Form
          form={form}
          layout='horizontal'
        >
          <Form.Item
            label='真实姓名' name='realName'

          >
            <Input
              autoComplete='off'
              placeholder='您账户重要信息，认证成功后不可修改'
              clearable
            />
          </Form.Item>
          <Form.Item
            label='身份证号' name='cardNumber'
          >
            <Input
              autoComplete='off'
              placeholder='您账户重要信息，认证成功后不可修改'
              clearable
            />
          </Form.Item>
        </Form>
        <div className={styles.desc}>实名认证不涉及财产账户，信息将严格保密，认证通过后方可正常使用
          发帖、发布攻略、提款、获得活动奖励等重要操作</div>

      </Spin>
      <div className={styles.btnWrapper}>
        <Button className={styles.submitBtn} disabled={!canSubmit } onClick={handleSubmit}>提交</Button>
        <Checkbox
          block
          className={styles.checkBox}
          onChange={handleChange}
        >
          我已阅读并同意
          <span onClick={handleProtocolClick}>《34体育用户协议》</span>
        </Checkbox>
      </div>
    </div>
  );
};

export default memo(Certification);
