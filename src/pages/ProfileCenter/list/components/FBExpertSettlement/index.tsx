import IconFont from '@/components/IconFont';
import { ConnectState } from '@/models/connect';
import { expertDetail } from '@/services/expert';
import { UserInfoType } from '@/services/user';
import { Col, Row, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'umi';
import styles from './index.less';

type Props = {};

const FBExpertSettlement: React.FC<Props> = (props) => {
  const user = useSelector<ConnectState, UserInfoType | null | undefined>(
    (s) => s.user.currentUser,
  );
  const [detailLoading, setDetailLoading] = useState(false);
  const [detail, setDetail] = useState<any>(undefined);

  const getExpertDetail = async (expertId?: string) => {
    setDetailLoading(true);
    const resp = await expertDetail({
      id: expertId,
    });
    setDetailLoading(false);
    if (resp.success) {
      setDetail(resp.data);
    }
  };

  useEffect(() => {
    getExpertDetail(user?.expert.id);
  }, [user]);

  return (
    <div className={styles.container}>
      <Row gutter={16}>
        <Col span={12}>
          <div className={styles.amount_box}>
            <div className={styles.amount_info}>
              <div className={styles.value}>¥ {detail?.record?.amount}</div>
              <div className={styles.note}>可结算</div>
            </div>
            <div className={styles.amount_bottom_box}>
              <div className={styles.flex_row} style={{ marginRight: 80 }}>
                <img
                  className={styles.bottom_icon}
                  src={require('@/assets/expert/shopping_card.png')}
                  alt=""
                />
                <div className={styles.amount_info}>
                  <div className={styles.value2}>{detail?.expert?.paid_num}</div>
                  <div className={styles.note2}>累计售出</div>
                </div>
              </div>
              <div className={styles.flex_row}>
                <img
                  className={styles.bottom_icon}
                  src={require('@/assets/expert/wallet_icon.png')}
                  alt=""
                />
                <div className={styles.amount_info}>
                  <div className={styles.value2}>{detail?.record?.amount}</div>
                  <div className={styles.note2}>累计收益</div>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col span={4}>
          <div className={styles.item_box}>
            <div className={styles.icon_box}>
              <IconFont type="icon-gonglve" color='#FA5900' size={40}/>
            </div>
            <div className={styles.value}>{detail?.expert?.scheme_num}</div>
            <div className={styles.note}>已发布攻略</div>
          </div>
        </Col>
        <Col span={4}>
          <div className={styles.item_box}>
            <div className={styles.icon_box}>
              <IconFont type="icon-mingzhongshuai" color='#FA5900' size={40}/>
            </div>
            <div className={styles.value}>{detail?.record?.hit_rate}%</div>
            <div className={styles.note}>命中率</div>
          </div>
        </Col>
        <Col span={4}>
          <div className={styles.item_box}>
            <div className={styles.icon_box}>
              <IconFont type="icon-fensi" color='#FA5900' size={40}/>
            </div>
            <div className={styles.value}>{detail?.expert?.fans_num}</div>
            <div className={styles.note}>粉丝</div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default FBExpertSettlement;
