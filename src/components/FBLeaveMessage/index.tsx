import React, { useState } from 'react'
import { Input } from 'antd-mobile';
import styles from "./index.less"
type Props = {

}

const FBLeaveMessage: React.FC<Props> = (props: Props) => {
    const [inputValue, setInputValue] = useState("")
    const onChangeInputValue = (value: any): void => {
        console.log(value);

        setInputValue(value)
    }
    return (
        <div>
            <div className={styles.leaveMessage}>
                <Input
                    className={styles.inputStyle}

                    placeholder='请输入评论内容'
                    value={inputValue}
                    onChange={onChangeInputValue}

                />
                <div className={styles.collection}>
                    <div >收藏</div>
                    <div>点赞</div>
                </div>
            </div>
        </div>
    )
}

export default FBLeaveMessage