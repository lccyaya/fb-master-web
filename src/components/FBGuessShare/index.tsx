import React from 'react';
import styles from './index.less';
import Fire from '@/assets/worldcup/fire.png';
import { useHistory, useSelector } from 'umi';
import { webJsBridge } from "@/services/webjsbridge";
import { ConnectState } from '@/models/connect';

type Props = {
  sharelist: any;
  backgroundImage: string;
};

const FBGuessShare = (props: Props) => {
  const { sharelist, backgroundImage } = props;
  const history = useHistory();
  const isNative = useSelector<ConnectState>((s) => s.native.isNative);
  
  return (
    <div
      className={styles.share_main}
      style={{
        backgroundImage: backgroundImage,
      }}
      onClick={() => {
        if (isNative) {
          if (!sharelist.app) {
            webJsBridge.callHandler("showExpertRank", "", (res: string)=> {
              console.log(res);
            })
          } else {
            webJsBridge.callHandler("showShare", "", (res: string)=> {
              console.log(res);
            })
          }
        }else {
          if (!sharelist.app) {
            history.push('/zh/expert/rank');
          } else {
            history.push('/zh/home', { activekey: 'app' });
          }
        }
      }}
    >
      <div className={styles.share_main_left}>
        <div>
          {sharelist.title} {sharelist.app}
          <span style={{ color: '#7E1132', fontSize: 18 }}>+50</span>
          <img style={{ width: 16, height: 16, marginTop: -3 }} src={Fire} alt="" />
        </div>
        <div style={{ color: '#5A5A5A', fontSize: 13 }}>{sharelist.content}</div>
      </div>
      <div
        className={styles.share_main_riight}
        style={{ background: sharelist.app ? '#8D5523' : '#963A36' }}
      >
        {sharelist.action}
      </div>
    </div>
  );
};

export default FBGuessShare;
