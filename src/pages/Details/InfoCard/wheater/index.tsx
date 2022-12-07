import React, { useState } from 'react';
import { Weather } from '@/utils/match';
import styles from './index.less';
import classnames from 'classnames';
import Temperature from '@/assets/match/temperature.png';
import AtmosphericPressure from '@/assets/match/atmospheric_pressure.png';
import WindSpeed from '@/assets/match/wind_speed.png';
import Humidity from '@/assets/match/humidity.png';

type Props = {
  data: any;
};

const WeatherPage = (props: Props) => {
  // const weathertype = eather('1').text;
  const { data } = props;
  return (
    <div>
      {data?.weather && (
        <div className={classnames(styles.weather_main, styles[Weather(data?.weather).img])}>
          <div className={styles.weather_left}>{Weather(data?.weather).text}</div>
          <div className={styles.weather_right}>
            <div className={styles.weather_right_box}>
              <div>
                <img className={styles.right_img} src={Temperature} alt="" />
                温度：{data?.temperature}
              </div>

              <div>
                {' '}
                <img className={styles.right_img} src={WindSpeed} alt="" />
                风速：{data?.wind}
              </div>
            </div>
            <div className={styles.weather_right_box}>
              <div>
                {' '}
                <img className={styles.right_img} src={AtmosphericPressure} alt="" />
                气压：{data?.pressure}
              </div>

              <div>
                {' '}
                <img className={styles.right_img} src={Humidity} alt="" />
                湿度：{data?.humidity}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherPage;
