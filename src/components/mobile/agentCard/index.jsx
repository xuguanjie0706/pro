import { Flex } from 'antd-mobile';
import styles from './style.less';

export default function(props) {
  let agentCardClassName = styles.agentCard;
  if (props.color === 2) {
    agentCardClassName += ' ' + styles.bgColor2;
  }
  return (
    <div className={agentCardClassName}>
      <Flex direction="row" justify="between" align="stretch">
        <div>
          <Flex direction="row">
            <div className={styles.agentName}>{props.info.name}</div>
            {props.toSubAgent ? (
              <div className={styles.toSubAgentWrap}>
                <span className={styles.toSubAgent} onClick={props.toSubAgent}>
                  下级代理
                </span>
                <span className={styles.rightNav}></span>
              </div>
            ) : (
              ''
            )}
          </Flex>
          <div className={styles.joinDate}>加入时间：{props.info.createAt}</div>
        </div>
        {props.logout ? (
          <div>
            <button className={styles.logout} onClick={props.logout}>
              退出
            </button>
          </div>
        ) : (
          ''
        )}
      </Flex>
      <div className={styles.splitLine}></div>
      <Flex direction="row">
        {[
          {
            name: '今日分发',
            value: props.info.issuingToday,
            justify: 'start',
          },
          {
            name: '累计分发',
            value: props.info.issuingTotal,
            justify: 'center',
          },
          { name: '未领取', value: props.info.unaccalimed, justify: 'end' },
        ].map(item => (
          <Flex key={item.name} style={{ flex: 1 }} justify={item.justify}>
            <div>
              <div className={styles.dataName}>{item.name}</div>
              <div className={styles.dataValue}>{item.value}</div>
            </div>
          </Flex>
        ))}
      </Flex>
    </div>
  );
}
