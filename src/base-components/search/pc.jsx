import React from 'react';
import { Input } from 'antd';
import { useIntl } from 'umi';
import styles from './pc.module.less';
import IconFont from '@/components/IconFont';
import cls from 'classnames';

const Search = ({ width = '100%', className, value, onChange = () => {}, onEnter = () => {} }) => {
  return <div style={{ width }} className={cls(styles.search, className)}>
    <Input
      placeholder={useIntl().formatMessage({ id: 'key_search_for_leagues' })}
      className={cls(styles.input)}
      value={value}
      onPressEnter={() => onEnter(value)}
      onChange={(v) => onChange(v.target.value)}
    />
    <IconFont type='icon-sousuo' className={styles.SearchOutlined} size={22}/>
  </div>
};

export default Search;