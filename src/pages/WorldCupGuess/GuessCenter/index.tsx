import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { ConnectState } from '@/models/connect';
import { UserInfoType } from '@/services/user';
import FBGuessCenter from '@/components/FBGuessCenter';
import FBGuessEnergy from '@/components/FBGuessEnergy';
import { useSelector, useHistory } from 'umi';
import { Modal, Toast } from 'antd-mobile';
import type {
  guessMatchList,
  guessMatch,
  AddGuessParams,
  GuessMatchListRes,
  GuessMatchListParams,
} from '@/services/worldcup';
import { GuessMatchList, AddGuess } from '@/services/worldcup';
import { guessSelect, guessTimeMatch } from '@/utils/guess';
import moment from 'moment';
import { OddTags, GoalTagsAll } from '@/utils/guess';
import { Spin } from 'antd';
type Props = {};

const GuessCenter = (props: Props) => {
  const [data, setData] = useState<guessMatchList[]>();
  const [modalData, setModalData] = useState<guessMatch>();
  const [loading, setLoading] = useState<boolean>(true);

  const user = useSelector<ConnectState, UserInfoType | null | undefined>(
    (s) => s.user.currentUser,
  );

  const [energy_num, setEnergy_num] = useState<number>(
    useSelector((s) => s.guessUser.guessUserState?.energy_num),
  );
  const history = useHistory();
  const onbutton = (value: any, matchdata: any) => {
    setData([...guessSelect(data, value)]);
    setModalData({ ...modalData, ...matchdata, ...value });
    console.log({ ...modalData, ...matchdata, ...value });
  };

  const content = (
    <div>
      <div>
        <div className="guess_contentbox">
          <div>
            队阵球队
            <div style={{ color: '#848494' }}>
              {modalData?.home_team_name}VS{modalData?.away_team_name}
            </div>
          </div>
          <div>
            竞猜序号
            <div style={{ color: '#848494' }}>{modalData?.issue}</div>
          </div>
          <div>
            开赛时间
            <div style={{ color: '#848494' }}>
              {moment(new Date(Number(modalData?.match_time) * 1000)).format('MM-DD HH:mm')}
            </div>
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
            <div className="guess_playbg">
              {modalData?.scheme_title == '0' ? '胜平负' : '让球胜平负'}
            </div>
          </div>

          <div className="guess_play">
            竞猜选项
            <div className="guess_playbg">
              {modalData?.scheme_title == '0' ? (
                <div>
                  【{OddTags.title(modalData?.tag)}】@{modalData?.odd}
                </div>
              ) : (
                <div>
                  {modalData?.scheme_title}【{GoalTagsAll.goaltitleAll(modalData?.tag)}】@
                  {modalData?.odd}
                </div>
              )}
            </div>
          </div>
          <div className="guess_play">
            过关方式 <div className="guess_playbg">单关</div>
          </div>
          <div className="guess_play">
            能量消耗
            <div className="guess_playbg">{modalData?.energy_coin}</div>
          </div>
          <div className="guess_play">
            最高奖励{' '}
            <div className="guess_playbg">
              {' '}
              {modalData?.energy_coin ? (modalData?.energy_coin * modalData?.odd).toFixed(0) : 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  const onSrue = async () => {
    // console.log(modalData, '“poiuytre');

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
        const { odd_scheme_id, odd, energy_coin, tag, match_id }: any = modalData;
        let data = {
          odd_scheme_id: Number(odd_scheme_id),
          odd,
          energy_coin: Number(energy_coin),
          tag,
          match_id: Number(match_id),
          published_at: Math.round(new Date().getTime() / 1000),
        };

        // setEnergy_num(energy_num - data.energy_coin < 0 ? 0 : energy_num - data.energy_coin);
        getAddGuess(data);
      },
    });
  };

  const getMyGuessList = async (): Promise<any> => {
    let data: GuessMatchListParams = {
      page: 1,
      size: 150,
    };
    const result: GuessMatchListRes = await GuessMatchList(data);

    if (result.success == true) {
      setLoading(false);
      let newlist = guessTimeMatch(result.data.list);
      setData(newlist);
    }
  };

  const getAddGuess = async (data: AddGuessParams) => {
    const result: any = await AddGuess(data);

    if (result.success == true) {
      setEnergy_num(energy_num - data.energy_coin < 0 ? 0 : energy_num - data.energy_coin);
      Toast.show({
        content: '竞猜成功',
      });
    }
  };

  useEffect(() => {
    getMyGuessList();
  }, []);
  return (
    <div className={styles.guesscenter_info}>
      <div className={styles.tip}>购彩请到线下实体销售网点，34体育不支持任何形式的线上购彩</div>

      <div className={styles.guesscenter_list}>
        <Spin spinning={loading}>
          {data?.map((item: guessMatchList, index: number) => {
            return (
              <div key={index}>
                <div className={styles.guesscenter_time}>
                  {item.match_time} <span> </span>
                  {item.match.length}场比赛
                </div>
                {/* <Spin spinning={loading}> */}

                {item?.match?.map((items, index_i) => {
                  return (
                    <div key={index_i}>
                      {' '}
                      <FBGuessCenter data={items} onClickbtn={onbutton}></FBGuessCenter>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </Spin>
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
        ) : modalData?.tag ? (
          <FBGuessEnergy
            onOk={onSrue}
            setModalData={setModalData}
            modalData={modalData}
            energy_num={energy_num}
          ></FBGuessEnergy>
        ) : (
          <div className={styles.select_team}>请选择一场比赛</div>
        )}
      </div>
    </div>
  );
};

export default GuessCenter;
