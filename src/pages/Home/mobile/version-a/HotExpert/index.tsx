import IconFont from '@/components/IconFont';
import { getExpertRanking } from '@/services/expert';
import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'umi';
import HotExpertItem from './HotExpertItem';
import styles from './index.less';

type Props = {};

const HotExpert: React.FC<Props> = (props) => {
  const [list, setList] = useState([]);
  const history = useHistory();

  const getList = async () => {
    const res = await getExpertRanking({
      tab: 0,
      page: 1,
      size: 5,
    });
    if (res.err) {
      message.error(res.message);
    }
    if (res.success) {
      setList(res.data.list);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const toRank = () => {
    history.push('/zh/expert/rank');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.left}>专家热门</div>
        <div className={styles.right} onClick={toRank}>
          更多
          <IconFont
            className={styles.arrow_icon}
            type="icon-jiantouyou"
            color="#848494"
            size={10}
          ></IconFont>
        </div>
      </div>
      <div className={styles.body}>
        {list.map((listItem) => (
          <HotExpertItem expert={listItem} />
        ))}
      </div>
    </div>
  );
};

export default HotExpert;
