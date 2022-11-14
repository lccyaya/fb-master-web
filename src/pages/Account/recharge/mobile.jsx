import styles from './mobile.module.less';
import GoldIcon from '@/assets/gold_icon.png';
import { Button, message, Modal, Form } from 'antd';
import cls from 'classnames';
import { getCoinScheme, coinCharger } from '@/services/expert';
import { toShortLangCode } from '@/utils/utils';
import { locale } from '@/app';
import { history, useDispatch } from 'umi';
import React, { useState, useEffect } from 'react';
import BaseModal from '@/components/BaseModal/mobile';
import { handleReport } from '@/utils/report';
import { urlencode } from '@/utils/utils';

const Recharge = ({ coin }) => {
  const [payChannels, setPayChannels] = useState([]);
  const [schemes, setSchemes] = useState([]);
  const [channel, setChannel] = useState('');
  const [schemeId, setSchemeId] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [channelItem, setChannelItem] = useState({});

  const dispatch = useDispatch();

  const fetchData = async () => {
    const resp = await getCoinScheme();
    if (resp.success) {
      const pay_channels = resp.data.pay_channels || [];
      const schemes = resp.data.schemes || [];
      if (pay_channels.length) {
        setChannel(pay_channels[0].channel);
        setChannelItem(pay_channels[0]);
      }
      if (schemes.length) {
        setSchemeId(schemes[0].ID);
      }
      setPayChannels(pay_channels);
      setSchemes(schemes);
    }
  };
  const submit = async () => {
    setLoading(true);
    const resp = await coinCharger({
      coin_scheme_id: schemeId,
      channel: channel,
    });
    setLoading(false);

    if (resp.success) {
      const url = urlencode('https://www.34sport.cn');
      // window.open(resp.data.param+"&redirect_url="+url, '_blank');
      window.open(resp.data.param, '_blank');
      setVisible(true);
    } else {
      message.error(resp.message);
    }
  };
  useEffect(() => {
    handleReport({
      action: 'recharge_coin_display',
    });
    fetchData();
  }, []);

  const onCancel = () => {
    setVisible(false);
  };

  const refreshUserInfo = () => {
    dispatch({
      type: 'user/fetchCurrent',
    });
    setVisible(false);
  }

  return (
    <div className={styles.recharge}>
      <div className={styles.section}>
        <div className={styles.label}>
          我的金币：
          <span
            className={styles.record}
            onClick={() => {
              const lang = toShortLangCode(locale.getLocale());
              history.push(`/${lang}/account/recharge-record`);
              handleReport({
                action: 'recharge_record',
              });
            }}
          >
            交易记录
          </span>
        </div>
        <div className={styles.content}>
          <div className={styles.total}>
            <span className={styles.value}>{coin}</span>
            <span className={styles.tip}>（不可提现或退款）</span>
          </div>
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.label}>金币充值：</div>
        <div className={styles.content}>
          <div className={styles.select_box}>
            {schemes.map((item) => {
              return (
                <div
                  className={cls(styles.item, schemeId === item.ID ? styles.active : null)}
                  key={item.ID}
                  onClick={() => {
                    setSchemeId(item.ID);
                    handleReport({
                      action: item.coin,
                    });
                  }}
                >
                  <div className={styles.gold_icon}>
                    <img src={GoldIcon} alt="" />
                    <span className={styles.gold_coin_val}>{item.coin}</span>
                    {item.giving_coin ? (
                      <span className={styles.give_away}>+{item.giving_coin}</span>
                    ) : null}
                  </div>
                  <div className={styles.price}>{item.price}元</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.label}>支付方式：</div>
        <div className={styles.content}>
          <div className={styles.select_box}>
            {payChannels.map((item) => {
              return (
                <div
                  className={cls(
                    styles.item,
                    styles.item_row,
                    channel === item.channel ? styles.active : null,
                  )}
                  key={item.channel}
                  onClick={() => {
                    setChannel(item.channel);
                    setChannelItem(item);
                    handleReport({
                      action: item.channel === 1 ? 'alipay' : 'wechat',
                    });
                  }}
                >
                  {item.logo ? <img src={item.logo} alt="" className={styles.icon} /> : null}
                  {item.name}
                </div>
              );
            })}
          </div>
          <Button
            type="primary"
            loading={loading}
            className={styles.btn}
            onClick={() => {
              submit();
              handleReport({
                action: 'pay',
              });
            }}
          >
            去支付
          </Button>
          <div className={styles.agreement}>
            支付即代表您同意了<a href="/recharge-document.html">《34 体育用户充值协议》</a>
          </div>
        </div>
      </div>
      {/* <BaseModal
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
        title="请确认支付是否已完成"
      >
        <div className={styles.modal_content}>
          <div className={styles.success}>支付成功</div>
          <div className={styles.fail}>支付遇到问题，重新支付</div>
        </div>
      </BaseModal> */}
      <Modal
        destroyOnClose
        visible={visible}
        footer={null}
        closable={false}
        centered
        wrapClassName={styles.modal}
        // onCancel={onCancel}
      >
        <div className={styles.modal_content}>
          <div className={styles.modal_title}>请确认支付宝支付是否已完成</div>
          <div className={styles.modal_icon}>
            <img src={channelItem?.logo} alt="" className={styles.icon} />
          </div>
          <div>
            <div className={styles.modal_note}>
              1.如果已在{channelItem?.name}内支付成功，请点击“已完成付款“按钮 ;
            </div>
            <div className={styles.modal_note}>
              2.如果支付遇到问题，未支付成功，请选择"关闭”,重新提交支付 ;
            </div>
          </div>
        </div>
        <div className={styles.modal_buttons}>
          <div onClick={onCancel} className={styles.modal_cancel}>取消</div>
          <div onClick={refreshUserInfo} className={styles.modal_done}>已完成支付</div>
        </div>
      </Modal>
    </div>
  );
};
export default Recharge;
