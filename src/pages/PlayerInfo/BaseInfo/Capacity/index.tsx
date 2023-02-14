import React, { useRef } from 'react';
import styles from './index.less';
import ReactECharts from 'echarts-for-react'; // or var ReactECharts = require('echarts-for-react');
import { FormattedMessage } from 'umi';
import FBTitle from '@/components/FBTitle';

const Capacity = (props: Props) => {
  const option = {
    legend: {
      show: false,
    },
    radar: {
      // shape: 'circle',
      indicator: [
        // { name: '进攻', max: 6500 },
        // { name: '技术', max: 16000 },
        // { name: '战术', max: 30000 },
        // { name: '防守', max: 38000 },
        // { name: '意识', max: 52000 },
        // { name: '创造力', max: 25000 },
        { name: '进攻' },
        { name: '技术' },
        { name: '战术' },
        { name: '防守' },
        { name: '意识' },
        { name: '创造力' },
      ],
      splitLine: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          width: 0,
        },
      },
      splitArea: {
        areaStyle: {
          color: ['#BDCBEC', '#E5EAF2', '#EFF2F7', '#F5F6F9', '#FAFAFC'],
        },
      },
      nameGap: 2,
      // center: ['75%', '50%'],
      radius: 90,
      axisName: {
        formatter: (text, item) => {
          return [, `{a|${text}}`, '{b|50}'].join('\n');
        },

        rich: {
          a: {
            color: '#333333',
            lineHeight: 14,
            fontSize: 14,
          },
          b: {
            with: 50,
            align: 'center',
            // backgroundColor: '#FE2222',
            color: '#FE2222',
            fontSize: 14,
          },
        },
      },
    },

    series: [
      {
        name: 'Budget vs spending',
        type: 'radar',
        symbolSize: 5,
        color: '#5985FF',

        lineStyle: {
          width: 1.5,
          splitArea: {
            show: false,
          },
        },

        data: [
          {
            value: [4200, 3000, 13500, 3500, 50000, 18000],
            // name: 'Allocated Budget',
            areaStyle: {
              color: 'rgba(89, 133, 255, 0.22)',
            },
          },
        ],
      },
    ],
  };

  return (
    <div>
      <FBTitle logo={true} title={<FormattedMessage id="key_baseInfo" />} />
      <div className={styles.player_info_capacity}>
        <ReactECharts className={styles.chart} option={option} />
      </div>
    </div>
  );
};

export default Capacity;
