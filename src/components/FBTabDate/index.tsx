import React, { useState, useEffect } from 'react';
import { CascadePicker } from 'antd-mobile';
import IconFont from '@/components/IconFont';
import styles from './index.less';
import { Picker } from 'antd-mobile';
import * as matchService from '@/services/match';
import { getAccordWithLabel } from '@/utils/match';

type Props = {
  competition_id: number;
  season_id: any;
  setSeasonId: Function;
};

const Date = (props: Props) => {
  const { onClick, competition_id, setSeasonId, season_id } = props;
  // 弹窗
  const [visible, setVisible] = useState<boolean>(false);
  const [yeardata, setSeasonList] = useState<any>([]);
  // 年份 选中值状态
  // const [season_id, setSeasonId] = useState<any>();

  const onCahngeDate = () => {
    setVisible(!visible);
  };
  // 赛季年份
  const fetchSeasonData = async (competitionId: string) => {
    const result = await matchService.getSeasonList(competitionId);
    if (result.success) {
      const seasonList: any = result.data;
      const year = seasonList?.map((item: { year: number; ID: number }) => {
        return { label: item.year, value: item.ID };
      });
      setSeasonId(year[0]?.value);
      setSeasonList([year]);
    }
  };
  // 表格
  useEffect(() => {
    fetchSeasonData(competition_id);
  }, []);
  return (
    <div>
      <div className={styles.data} onClick={onCahngeDate}>
        <div className={styles.tabfelx}>
          {/* 左侧时间 */}
          <div>
            {season_id && (
              <div
                onClick={() => {
                  setVisible(true);
                }}
              >
                {getAccordWithLabel(yeardata, season_id)}
                <IconFont type="icon-zhankai2" color="#FA5900" size={10} />
              </div>
            )}
          </div>
        </div>
      </div>

      <Picker
        defaultValue={[season_id]}
        columns={yeardata}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        onConfirm={(val, extend) => {
          setSeasonId(val[0]);
        }}
      />
    </div>
  );
};

export default Date;
