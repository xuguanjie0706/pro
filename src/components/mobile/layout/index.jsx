import styles from './style.less';
import { Flex, WingBlank } from 'antd-mobile';

export default props => {
  return (
    <Flex
      direction="column"
      align="stretch"
      style={{ ...props.style, height: '100%' }}
    >
      {props.nav}
      <Flex.Item className={styles.scrollContainer}>
        <WingBlank style={props.contentStyle}>{props.children}</WingBlank>
      </Flex.Item>
    </Flex>
  );
};
