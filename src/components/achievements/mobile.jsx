import React from 'react';
import styles from './mobile.module.less';

const Achievements = ({ records = [] }) => {
  let newrecords
  if (records.length === 0) {
    return null;
  }
  if (records.length > 10) {
    newrecords = records.slice(10);
  } else {
    newrecords = records
  }

  const rednum = newrecords.filter((item) => {
    return item == "1"
  })
  console.log(records, "kankananannana");
  return (
    <div >
      {/* <div className={styles.label}>近期战绩：</div> */}
      <div className={styles.item}>
        <div className={styles.achievements}>

          {records ? <div style={{ fontSize: 16, margin: "5px 0" }}>
            <div > 红</div>
            <div>黑</div>
          </div> : ""}

          {newrecords.map((item, index) => {
            return +item ? (

              <div style={{ margin: "9px 0 0 5px", fontSize: 16 }}>
                <div className={styles.red} key={index}>

                </div>
                <div style={{ width: 18, height: 18, background: "#fff", }}>

                </div>
              </div>
            ) : (

              <div style={{ margin: "15px 0 0 5px", fontSize: 16 }}>

                <div style={{
                  width: 18, height: 18, background: "#fff",
                }}>
                </div>
                <div className={styles.black} key={index}>

                </div>
              </div>

            );
          })}
        </div>
      </div>
      <div style={{ color: "#848494", fontSize: 14, textAlign: "right" }}>近{newrecords.length}单攻略走势
        <span style={{ color: "#FA5900" }}>  {rednum.length}红</span>

        {newrecords.length - rednum.length}黑</div>
    </div>
  );
};

export default Achievements;
