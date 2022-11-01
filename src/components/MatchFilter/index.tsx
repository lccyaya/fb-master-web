import React, { memo, useEffect, useState } from 'react';
import { IndexBar, Button } from 'antd-mobile';
import MatchItem from "@/components/MatchFilter/MatchItem";
import IconFont from '@/components/IconFont';
import classNames from 'classnames';

import styles from './index.module.less';

interface ItemProps {
  name: string;
  competitions: {
    id: number;
    logo: string;
    name: string;
  }[]
}

interface IMatchFilterProps {
  title?: React.ReactNode;
  visible: boolean;
  onClose: () => void;
  onOk: (ids: number[]) => void;
  data: ItemProps[];
  typeChange?: (id: number) => void;
}



const MatchFilter = ({title = '', visible = false, onClose, onOk, data, typeChange}: IMatchFilterProps) => {

  const [selectedList, setSelectList] = useState<number[]>([]);
  const [optionSelected, setOptionSelected] = useState<number>();
  // const [actionSelected, setActionSelected] = useState<number>();
  useEffect(() => {
    setOptionSelected(undefined)
    // setActionSelected(undefined)
  }, [visible])
  const flatId = (source: ItemProps[]) => {
    const resultList: number[] = [];
    source.forEach(item => {
      if(item?.competitions) {
        item.competitions.forEach(competition => {
          resultList.push(competition.id)
        })
      }
    })
    return resultList;
  }
  useEffect(() => {
    const idList = flatId(data);
    setSelectList(idList)
  }, [data])
  const handleClose = () => {
    onClose()
  }
  const optionList = [{
    id: 1,
    name: '重要'
  }, {
    id: 2,
    name: '竞彩'
  }, {
    id: 3,
    name: '北单'
  }, {
    id: 4,
    name: '攻略'
  }];
  const actionList = [{
    id: 1,
    name: '全选'
  }, {
    id: 2,
    name: '反选'
  }]
  const handleItemClick = (id: number) => {
    const hasId = selectedList.includes(id);
    if(hasId) {
      setSelectList((prevState) => prevState.filter(x => x !== id))
    } else {
      setSelectList((prevState) => [...prevState, id])
    }
  }
  const handleOptionClick = (id: number) => {
    if(optionSelected !== id) {
      setOptionSelected(id);
      setSelectList([])
      if(typeChange) typeChange(id)
    }
  }
  const handleActionClick = (id: number) => {
    const idList = flatId(data);
    if(id === 1) {
      // 全选
      setSelectList(idList)
    } else if(id === 2) {
      // 反选
      const filterList = idList.filter(x => !selectedList.includes(x))
      setSelectList(filterList)
    }
  }

  const handleOk = () => {
    onOk(selectedList)
  }

  return (
    <div
      className={classNames(styles.matchFilterWrapper, {
        [styles.show]: visible
      })}
    >
      <div className={classNames(styles.inner)}>
        <div className={styles.headerWrapper}>
          <span className={styles.title}>{title}</span>
          <IconFont type='icon-guanbi' onClick={handleClose}/>
        </div>
        <div className={styles.container}>
          <IndexBar>
            {
              data.map(item => {
                const {name, competitions} = item;
                return (
                  <IndexBar.Panel
                    index={name}
                    title={name}
                    key={name}
                  >
                    {
                      (competitions || []).map((child: { name: string, id: number }) => {
                        return (
                          <MatchItem
                            key={child.id}
                            id={child.id}
                            name={child.name}
                            selectedList={selectedList}
                            handleClick={handleItemClick}
                          />
                        )
                      })
                    }
                  </IndexBar.Panel>
                )
              })
            }
          </IndexBar>
        </div>
        <div className={styles.footerWrapper}>
          <div className={styles.optionList}>
            {
              optionList.map(option => (
                <MatchItem
                  className={classNames(styles.option)}
                  key={option.id}
                  id={option.id}
                  name={option.name}
                  selectedList={optionSelected ? [optionSelected] : []}
                  handleClick={handleOptionClick}
                  allBg
                />
              ))
            }
          </div>
          <div className={styles.actionWrapper}>
            <div className={styles.actionLeft}>
              {
                actionList.map(action => (
                  <MatchItem
                    className={styles.actionBtn}
                    key={action.id}
                    id={action.id}
                    name={action.name}
                    handleClick={handleActionClick}
                  />
                ))
              }
            </div>
            <div className={styles.actionRight}>
              <Button color='primary' className={styles.btn} onClick={handleOk}>确定</Button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default memo(MatchFilter);
