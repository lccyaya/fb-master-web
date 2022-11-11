import React from 'react';
import styles from './index.less';
import Fire from '@/assets/worldcup/fire.png';
import { useHistory } from 'umi';
type Props = {
  sharelist: any;
  backgroundImage: string;
};

const FBGuessShare = (props: Props) => {
  const { sharelist, backgroundImage } = props;
  const history = useHistory();
  return (
    <div
      className={styles.share_main}
      style={{
        backgroundImage: backgroundImage,
      }}
      onClick={() => {
        console.log(sharelist.app);

        if (!sharelist.app) {
          history.push('/zh/expert/rank');
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
        style={{ background: sharelist.app ? '8D5523' : '#963A36' }}
      >
        {sharelist.action}
      </div>
    </div>
  );
};

export default FBGuessShare;
