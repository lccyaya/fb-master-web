import React, { useEffect } from 'react'
import styles from './index.less';
type Informationimg = {
    content: React.ReactNode;
    title: string;
    showLine?: boolean;
}

const FBInformationImg: React.FC<Informationimg> = (props) => {
    useEffect(() => {
        console.log(props.content);

    }, [])
    return (
        <div className={props.showLine ? styles.main : styles.isShowLine}>
            <div>
                {props.title}
            </div>
            {props.content}
        </div>
    )
}

export default FBInformationImg