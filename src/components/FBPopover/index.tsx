import React, { useEffect } from 'react'
import styles from "./index.less"
type Props = {
    content?: React.ReactElement
    children: React.ReactElement
    ishidden?: boolean
}

const FBPopover = (props: Props) => {
    const { content, children, ishidden } = props

    return (
        <div >

            <div className={styles.popoverbox}>

                <div style={{ display: ishidden == true ? "none" : "block" }}>
                    <div className={styles.popover} >

                        {content}
                    </div>
                </div>


                {

                    children
                }
            </div>
        </div>
    )
}

export default FBPopover