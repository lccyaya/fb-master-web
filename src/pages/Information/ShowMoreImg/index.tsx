import React from 'react'
import styles from "./index.less"

type Props = {}

const ShowMoreImg = (props: Props) => {
  return (
    <div>
              <div>
                <div className={styles.imgflex}>
                    <div>tupian</div>
                    <div>tupian</div>
                    <div>tupian</div>
                </div>
            </div>
            <div className={styles.minText}>
                <div> <span style={{ marginRight: 12 }}> zuqiu</span>
                    <span>25万人</span></div>
                <div>2小时</div>
            </div>
        </div>
  )
}

export default ShowMoreImg