import React, { useState, useEffect } from 'react';
import Table from './table';
import RightTab from '../RightTab';
import styles from './index.less';
import type { ColumnsType } from 'antd/es/table';
import { analysisList } from '@/services/matchdetail';
import type { AnalysisListRes, analysisType, AnalysisListParams } from '@/services/matchdetail';

type Props = {
  match_id: number;
};

const CutMatchRank = (props: Props) => {
  useEffect(() => {
    // getFutureList();
  }, []);
  return (
    <div>
      <div className={styles.table_space}>
        <Table match_id={props.match_id} />
      </div>
    </div>
  );
};

export default CutMatchRank;
