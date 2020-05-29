import React, { useState } from 'react';
import { Layout } from 'antd';
import './index.less';
import SecondFrom from './components/SecondFrom';
import BaseForm from './components/BaseForm';

const { Header, Content } = Layout;
// const a = { 'id': 14, 'channelCode': 'HALOVE_AGENT', 'channelName': null, 'agentType': 1, 'name': '1', 'contact': '18906764710', 'contactAddr': '132131', 'idCard': '2', 'unifiedCreditCode': null, 'idCardFrontUrl': 'https://image02.halove.com/uploadfiles/2020/5/26/6379e136-5148-4f64-8661-dfe0ea47e164.png#图片名字 (2).png#fileimages/pic.gif', 'idCardBackUrl': 'https://image02.halove.com/uploadfiles/2020/5/26/28746811-0838-41e3-86d4-2239bb2b92d4.png#图片名字 (2).png#fileimages/pic.gif', 'enterpriseBusinessLicense': null, 'bankName': '中国光大银行', 'bankBranch': '321321', 'bankCardNo': '321321', 'bankAccountType': null, 'inviteUid': 158, 'inviteRole': 6, 'status': null, 'statusDesc': null, 'createAt': 1590478467000, 'updateAt': 1590478499000, 'passAgentAreaList': null, 'lastAgentApplyAreaList': [{ 'agentAreaId': '210000-210600-210681', 'agentArea': null, 'agentLevel': 2 }] };
const ApplyingAgency = (props) => {
  // console.log(props);
  // qbqUUte9aXO3tCfAt+aIrA==
  const { match: { params: { inviteUid } } } = props;
  const [step, setStep] = useState(0);
  const [agentType, setAgentType] = useState(1);
  const [defaultData, setDefaultData] = useState({});
  return (
    <Layout className="layout">
      <Header style={{ padding: 0, backgroundColor: '#fff' }}>
        <h1 className="hl-text-center">申请代理</h1>
      </Header>
      <Content style={{ paddingBottom: 100 }}>
        <div className="site-layout-content">
          <p className="content-bar">您正在登记成为微医通渠道代理，相关信息将影响您的审核结果，请如实填写！</p>
          <div className=" hl-margin-t10 site-layout-content-body  hl-padding-10">
            {!step ? <BaseForm setDefaultData={setDefaultData} inviteUid={inviteUid} setAgentType={setAgentType} setStep={setStep} /> : <SecondFrom defaultData={defaultData} agentType={agentType} />}
          </div>
        </div>
      </Content>
      {/* <Footer /> */}
    </Layout>
  );
};


export default ApplyingAgency;
