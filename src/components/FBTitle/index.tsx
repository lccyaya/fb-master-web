import React from 'react'
import styles from "./index.less"
type Props = {
  title: string;
  size?: string;
}

const FBTitlex = (props: Props) => {
  return (
    <div className={styles["font_size"]} style={{ fontSize: props.size ? props.size : "" }}>{props.title}</div>
  )
}
export default FBTitlex