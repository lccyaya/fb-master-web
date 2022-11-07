import React, { useMemo, useState, useEffect } from 'react';
import { history, connect } from 'umi';
import type { Dispatch } from 'umi';
import { Spin } from 'antd';
import { NavBar, Form, Input, Button, Checkbox, Dialog } from 'antd-mobile';
import { nameAuth } from '@/services/user';
import type { ConnectState } from '@/models/connect';
import type { UserInfoType } from '@/services/user';
import cls from 'classnames';
// import type { NameAuthProps } from '@services/user';

import styles from './index.module.less';

interface ICertificationProps {
  currentUser: UserInfoType;
  dispatch: Dispatch
}

const Certification: React.FC<ICertificationProps> = ({ currentUser, dispatch }) => {
  const [agreeToADeal, setAgreeToADeal] = useState(false);
  const [form] = Form.useForm();
  const realNameValue = Form.useWatch('name', form)
  const cardNumberValue = Form.useWatch('idCard', form)
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
    const values = form.getFieldsValue();
    nameAuth({
      ...values
    }).then(res => {
      if(res.data.authcode === 0) {
        Dialog.alert({
          content: res.data.info,
          confirmText: "确认"
        })
      } else {
        dispatch({
          type: 'user/saveCurrentUser',
          payload: {
            data: {
              ...currentUser,
              user_info: {
                is_real: 1,
                name: values.name
              }
            }
          },
        });
        Dialog.alert({
          content: res.data.info,
          confirmText: "确认",
        })
      }
    })
  }

  const itemProps = useMemo(() => {
    if(currentUser?.user_info?.is_real) {
      return {
        readOnly: true,
      }
    }
    return {
      placeholder: '您账户重要信息，认证成功后不可修改',
    }
  }, [currentUser?.user_info?.is_real])

  const formItemProps = useMemo(() => {
    if(currentUser?.user_info?.is_real) {
      return {
        extra: <div className={styles.verify}>已认证</div>
      }
    }
    return null
  }, [currentUser?.user_info?.is_real])

  // 隐藏名称
  function formatName(str: string = '') {
    return `${new Array(str.length).join('*')}${str.substr(-1)}`
  }
  useEffect(() => {
    form.resetFields()
  }, [currentUser?.user_info?.name])
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
          initialValues={{
            name: formatName(currentUser?.user_info?.name),
          }}
        >
          <Form.Item
            label='真实姓名' name='name'
          >
            <Input
              autoComplete='off'
              clearable
              {...itemProps}
            />
          </Form.Item>
          <Form.Item
            label='身份证号' name='idCard'
            {...formItemProps}
          >
            <Input
              autoComplete='off'
              clearable
              {...itemProps}
            />
          </Form.Item>
        </Form>
        <div className={styles.desc}>实名认证不涉及财产账户，信息将严格保密，认证通过后方可正常使用
          发帖、发布攻略、提款、获得活动奖励等重要操作</div>

      </Spin>
      <div
        className={cls(styles.btnWrapper, {
          [styles.hidden]: currentUser?.user_info?.is_real
        })}
      >
        <div
          className={styles.btnInner}
        >
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
    </div>
  );
};
export default connect(({ user, loading }: ConnectState) => ({
  currentUser: user.currentUser || {},
  loading: loading.models.user,
}))(Certification);

