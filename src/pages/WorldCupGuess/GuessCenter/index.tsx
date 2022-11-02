import React, { useState } from 'react';
import styles from './index.less';
import { ConnectState } from '@/models/connect';
import { UserInfoType } from '@/services/user';
import { datafilter } from '@/utils/guess';
import FBGuessCenter from '@/components/FBGuessCenter';
import FBGuessEnergy from '@/components/FBGuessEnergy';
import { useSelector, useHistory } from 'umi';
import { Modal } from 'antd-mobile';
type Props = {};

const GuessCenter = (props: Props) => {
  const [selectvalue, setSelectvalue]: any = useState([]);
  const user = useSelector<ConnectState, UserInfoType | null | undefined>(
    (s) => s.user.currentUser,
  );
  const history = useHistory();

  const onbutton = (data: any) => {
    //  现在只有这一个点击事件
    // 只能拿到一个对象

    // console.log(data);
    let arr = datafilter(selectvalue, data);
    setSelectvalue(arr);
  };

  const guesslist = [
    { id: 1, away: 2 },
    {
      id: 3,
      away: 4,
    },
    {
      id: 5,
      away: 6,
    },
    {
      id: 5,
      away: 6,
    },
    {
      id: 5,
      away: 6,
    },
    {
      id: 5,
      away: 6,
    },
    {
      id: 5,
      away: 6,
    },
    {
      id: 5,
      away: 6,
    },
  ];

  const content = (
    <div>
      <div className="guess_contentbox">
        <div>
          队阵球队
          <div style={{ color: '#848494' }}>巴西vs阿根廷</div>
        </div>
        <div>
          竞猜序号
          <div style={{ color: '#848494' }}>周五 004</div>
        </div>
        <div>
          开赛时间
          <div style={{ color: '#848494' }}>11-21 21:00</div>
        </div>
      </div>
      <div
        style={{
          borderTop: '1px solid #EEEEEE',
          borderBottom: '1px solid #EEEEEE',
          padding: '5px 0',
        }}
      >
        <div className="guess_play">
          <div> 竞猜玩法</div>
          <div className="guess_playbg">让球胜平负</div>
        </div>

        <div className="guess_play">
          竞猜选项
          <div className="guess_playbg">让球胜平负</div>
        </div>
        <div className="guess_play">
          过关方式 <div className="guess_playbg">让球胜平负</div>
        </div>
        <div className="guess_play">
          能量消耗 <div className="guess_playbg">让球胜平负</div>
        </div>
        <div className="guess_play">
          最高奖励 <div className="guess_playbg">让球胜平负</div>
        </div>
      </div>
    </div>
  );
  const onSrue = (value: number | string) => {
    Modal.show({
      title: '竞猜信息',
      content: content,
      showCloseButton: true,
      bodyClassName: 'modal_team',

      actions: [
        {
          key: '1',
          text: '确认竞猜',
          style: { color: '#7E1132' },
        },
      ],
      closeOnAction: true,
      onAction: () => {
        console.log(value, selectvalue, 'sssssss');
      },
    });
  };

  return (
    <div className={styles.guesscenter_info}>
      <div className={styles.tip}>购彩请到线下实体销售网点，34体育不支持任何形式的线上购彩</div>

      <div className={styles.guesscenter_list}>
        <div className={styles.guesscenter_time}>2022.11.22 星期四 2场比赛</div>
        {guesslist.map((item, index) => {
          return <FBGuessCenter data={item} onClickbtn={onbutton} index={index}></FBGuessCenter>;
        })}
      </div>
      <div style={{ height: '57px' }}></div>

      <div className={styles.guesscenter_bottom_box}>
        {!user ? (
          <div className={styles.select_login_box}>
            沉浸式免费体验世界杯
            <div
              className={styles.login}
              onClick={() => {
                history.push('/zh/mine');
              }}
            >
              立即登录
            </div>
          </div>
        ) : selectvalue.length ? (
          <FBGuessEnergy onOk={onSrue}></FBGuessEnergy>
        ) : (
          <div className={styles.select_team}>请选择一场比赛</div>
        )}
      </div>
    </div>
  );
};

export default GuessCenter;
