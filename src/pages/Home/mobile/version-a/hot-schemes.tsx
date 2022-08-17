import styles from './hot-schemes.less';
import { useHistory, FormattedMessage } from 'umi';
import Hot from '@/pages/Expert/components/hot/mobile';

export default function HotSchemes() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.left}>热门分析</div>
      </div>
      <div className={styles.body}>
        <Hot play={'0'} />
      </div>
    </div>
  );
}