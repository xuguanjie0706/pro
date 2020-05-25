import React, { useState } from 'react';
import { Layout, Form, Input, Button } from 'antd';
import './index.less';
import SecondFrom from './components/SecondFrom';
import BaseForm from './components/BaseForm';

const { Header, Content } = Layout;

const ApplyingAgency = () => {
  const [step, setStep] = useState(1);
  const [agentType, setAgentType] = useState(2);
  return (
    <Layout className="layout">
      <Header style={{ padding: 0, backgroundColor: '#fff' }}>
        <h1 className="hl-text-center">申请代理</h1>
      </Header>
      <Content style={{ paddingBottom: 100 }}>
        <div className="site-layout-content">
          <p className="content-bar">您正在登记成为微医通渠道代理，相关信息将影响您的审核结果，请如实填写！</p>
          <div className=" hl-margin-t10 site-layout-content-body">
            {!step ? <BaseForm setAgentType={setAgentType} setStep={setStep} /> : <SecondFrom agentType={agentType} />}
          </div>
        </div>
      </Content>
      {/* <Footer /> */}
    </Layout>
  );
};


export default ApplyingAgency;
