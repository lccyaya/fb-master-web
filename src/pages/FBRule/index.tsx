import React from 'react';
import { NavBar } from 'antd-mobile';
import { useHistory } from 'umi';
import ScrollView from 'react-custom-scrollbars';
import Iframe from 'react-iframe';
import styles from './index.less';
type Props = {
  url: string;
  title: string;
  location: any;
};

const FBRule = (props: Props) => {
  const { url, title } = props.location.state;

  console.log(props, '9999999');
  const history = useHistory();

  const back = () => {
    history.goBack();
  };
  return (
    <div className={styles.container}>
      <NavBar className={styles.navbar} onBack={back}>
        {title}
      </NavBar>
      {/* <ScrollView> */}
      <Iframe
        url={url}
        // width="100%"
        // height="100%"
        id="myId"
        className={styles.iframe}
        // display="initial"
        position="relative"
      />
      {/* </ScrollView> */}
    </div>
  );
};

export default FBRule;
