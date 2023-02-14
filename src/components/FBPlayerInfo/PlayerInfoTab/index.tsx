import React from 'react';
import styles from './index.less';
import cls from 'classnames';

type Props = {
  tab?: any;
  active?: number | string;
  onClick?: any;
};

const PlayerInfoTab = (props: Props) => {
  const { tab, active, onClick } = props;
  return (
    <div className={styles.player_info_tab}>
      {tab?.map((item) => {
        return (
          <div
            onClick={() => {
              onClick(item.key);
            }}
            className={cls(
              styles.icon_button,

              active == item.key ? styles.one_no_active : styles.no_active,
            )}
            key={item.key}
          >
            {item.label}
          </div>
        );
      })}
    </div>
  );
};

export default PlayerInfoTab;
