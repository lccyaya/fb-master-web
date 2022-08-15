import React, { useState, createRef, useEffect } from 'react';
import styles from './mobile.module.less';
import cls from 'classnames';
import { Calendar, Badge } from 'antd';
import moment from 'moment';
import { useIntl } from 'umi';
import IconFont from '@/components/IconFont';
import { formatDateMMMYYYY } from '@/utils/utils';
import { getCalendar } from '@/services/matchPage';

const CalendarCom = ({ 
  className, show, onChange = () => {}, onClose = () => {}, params = {}
}) => {
  const timeRef = createRef();
  const intl = useIntl();
  const [value, setValue] = useState(moment());
  const [data, setData] = useState({});
  const { param_value } = params;
  const [realValue, setRealValue] = useState(moment());

  // 获取日历信息
  const getCalendarData = async(value) => {
    const month = value.format('YYYY-MM');
    setData({});
    const { data = {} } = await getCalendar({
      zone: params.zone,
      [params.param_key]: params.param_value,
      month,
      // competition_ids: params.competition_ids
    });
    data.month = month;
    setData(data);
  }

  useEffect(() => {
    if (show === true) {
      console.log('日历参数', params)
      getCalendarData(value);
    } else {
      setTimeout(() => { setValue(realValue); }, 300); // 渐隐动画消失了在处理
    }
  }, [show])

  // 表示切换了左侧菜单，需要初始化
  useEffect(() => {
    setValue(moment());
  }, [param_value])

  const onSelect = (v) => {
    // console.log(moment(v.format('YYYY-MM-DD')), moment(v.format('YYYY-MM-DD')) / 1000, 'onSelect', v, v / 1000)
    onChange(v);
    setValue(moment(v.format('YYYY-MM-DD')));
    setRealValue(moment(v.format('YYYY-MM-DD')));
  }

  const onDateChange = (type) => {
    let [year, month, day] = value.format('YYYY-MM-DD').split('-');
    year = +year;
    month = +month;
    day = +day;
    if (type === 'prev') {
      if (month === 1) {
        month = month = 12;
        year -= 1;
      } else {
        month = month - 1
      }
    } else {
      if (month === 12) {
        month = 1;
        year += 1;
      } else {
        month = month + 1
      }
    }
    const lastDay = moment(year + '-' + month).endOf('month').format("DD");
    day = day > +lastDay ? lastDay : day;
    setValue(moment(year + '-' + month + '-' + day));
  }

  const dateCellRender = (value) => {
    const day = value.date();
    let info = data[day] || null;
    return info ? (
      <div className={styles.label}>
        {info.match_num}
        { info.contains_subscribe ? <IconFont className={styles.star} type="icon-shoucang1" size={15} /> : null }
      </div>
    ) : null;
  };

  // 自定义头部组件
  const HeaderCom = () => {
    const time = formatDateMMMYYYY(value / 1000);
    // moment(date * 1000).format('MMM,MM/DD YYYY');
    return <>
      <div className={styles.header}>
        <span className={styles.today} onClick={() => {
          onSelect(moment());
        }}>
          <IconFont className={styles.arrow} type="icon-jiantouzuo" size={12} />
          {intl.formatMessage({id: "key_today",defaultMessage: "key_today"})}
        </span>
        <h5>{intl.formatMessage({id: "key_match_calendar",defaultMessage: "key_match_calendar"})}</h5>
        <IconFont onClick={onClose} className={styles.close} type="icon-yuanquanguanbi" size={20} />
      </div>
      <div className={styles.switch}>
        <IconFont className={styles.switch_icon} onClick={() => onDateChange('prev')} type="icon-jiantouzuo" size={20} />
        <span>{time}</span>
        <IconFont className={styles.switch_icon} onClick={() => onDateChange('next')} type="icon-jiantouyou" size={20} />
      </div>
    </>
  }

  // 是否有选中的样式 切到其它月份时，是不能选中的
  const noActive = realValue.format('MM') !== value.format('MM') ? styles.noActive : null;
  return (
    <div className={cls(styles.calender, show ? styles.show : null, className, noActive)}>
      <i className={styles.bg} onClick={onClose}></i>
      <Calendar 
        value={value} ref={timeRef}
        dateCellRender={dateCellRender} fullscreen={false}
        headerRender={HeaderCom}
        disabledDate={current => {
          if (params.param_value === 3) { return current > moment().startOf('day'); }
          if (params.param_value === 2) { return current < moment().subtract(1, 'days'); }
          return false;
        }}
        onSelect={onSelect}
      />

      {/* 提示 */}
      <div className={styles.tip}>
        <IconFont className={styles.tip_icon} type="icon-shoucang1" size={16} />
        {intl.formatMessage({id: "key_have_followed_matches",defaultMessage: "key_have_followed_matches"})}
      </div>
    </div>
  );
};

export default CalendarCom;


