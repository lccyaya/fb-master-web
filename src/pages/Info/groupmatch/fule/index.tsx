import React from 'react';
import styles from './index.less';

type Props = {};

const Fule = (props: Props) => {
  return (
    <div>
      <div className={styles.fule}>
        <h3 className={styles.title}>赛制说明</h3>
        <div style={{ color: '#000028', fontSize: 16 }}> 美职业联赛积分规则</div>
        <div style={{ height: 10 }}></div>
        <div>
          1.每队胜一场得3分，平一场得1分，负一场得0分（如果所有球队在常规赛结束时的比赛数不相同，那么季后赛的资格将根据平均每场比赛获得的积分来确定。）
        </div>

        <div>2.联赛结束 积分多的队名次列前 </div>
        <div style={{ height: 10 }}></div>
        <div> 3.如果两队或两队以上积分相等，依下列顺序排列名次</div>
        <div>a）总获胜场数</div>
        <div>b）净胜球数 </div>
        <div>c）总进球数</div>
        <div>d）较少的纪律分数</div>
        <div>e）客场净胜球数</div>
        <div>f）客场总进球数</div>
        <div>g）主场净胜球数</div>
        <div>h）主场总进球数</div>
        <div>i）掷硬币或抽签决定</div>
        <div>季后赛资格</div>
        <div>
          来自东部地区的前10支球队和西部地区的前8支球队（共18支俱乐部）将获得季后赛的参赛资格。
        </div>
      </div>
    </div>
  );
};

export default Fule;
