import React from 'react';
import { Row, Col } from 'antd';
import { RightSuit } from '@/components';
import styles from '../index.less';

const DetailCard = (props) => {
  const { sendData, history } = props;
  return (
    <>
      <div className={styles.box}>
        <div className={styles.boxContainer}>
          <div className={styles.sendername}>
            {history.location.query.name}
          </div>
          <div className={styles.senderdate}>
            加入时间：{history.location.query.createat}
          </div>
        </div>
        <div className={styles.boxContainer}>
          <Row gutter={[16, 0]}>
            <Col span={8}>
              <div className={styles.databox}>
                <div className={styles.title}>今日分发</div>
                <div className={styles.bignum}>
                  {sendData.issuingToday}
                </div>
              </div>
            </Col>
            <Col span={8}>
              <div className={styles.databox}>
                <div className={styles.title}>累计分发</div>
                <div className={styles.bignum}>
                  {sendData.issuingTotal}
                </div>
              </div>
            </Col>
            <Col span={8}>
              <div className={styles.databox}>
                <div className={styles.title}>未领取</div>
                <div className={styles.bignum}>
                  {sendData.unaccalimed}
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <RightSuit id={history.location.query.id} title={false} />
      </div>
    </>
  );
};

export default DetailCard;
