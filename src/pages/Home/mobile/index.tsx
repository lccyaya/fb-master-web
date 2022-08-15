import type { ConnectState } from '@/models/connect';
import { Spin } from 'antd';
import { useSelector } from 'umi';
import styles from './index.less';
import VersionA from './version-a';
import VersionB from './version-b';

export default function MobileHome() {
  const abVersion = useSelector<ConnectState, ConnectState['abtest']['version']>(
    (state) => state.abtest.version,
  );
  const content = { A: <VersionA />, B: <VersionB />, '': null }[abVersion];
  return (
    <Spin spinning={!abVersion}>
      <div className={styles.wrapper}>{content}</div>
    </Spin>
  );
}
