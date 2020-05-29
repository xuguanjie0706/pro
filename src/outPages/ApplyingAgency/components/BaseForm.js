import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Radio, Modal } from 'antd';
import '../index.less';
import { phoneValidator } from '@/utils/validator';
import api from '@/api';
import CodeButton from './CodeButton';


const layout = {
  labelCol: { sm: 4, md: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const BaseForm = (props) => {
  const { setStep, setAgentType, inviteUid, setDefaultData } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [msgdata, setMsg] = useState('');
  const [visible, setVisible] = useState(false);
  const defaultData = {
    agentType: '1',
    // contact: '18906764747',
    inviteUid
  };

  const handleClick = async (values) => {
    setLoading(true);
    const r = await api.agentApply.applyFirst(values);
    const { code, msg, data } = r;
    if (code === 200) {
      setDefaultData(data);
      setStep(1);
      setLoading(false);
    } else {
      setMsg(msg);
      setVisible(true);
      setLoading(false);
    }
  };

  useEffect(() => {

  }, []);

  const changeRadio = (e) => {
    setAgentType(e.target.value);
  };
  return (
    <>
      <Form {...layout} form={form} onFinish={handleClick} initialValues={defaultData}>
        <div style={{ paddingTop: 32 }}>
          <Form.Item
            label="代理商类型"
            name="agentType"
            rules={[{ required: true }]}
          >
            <Radio.Group onChange={changeRadio}>
              <Radio value="1">个人</Radio>
              <Radio value="2">企业</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            required
            name="contact"
            rules={[{ validator: phoneValidator }]}
            label="联系电话">
            <Input className="width400" />
          </Form.Item>
          <Form.Item label="验证码" required >
            <div>
              <Form.Item noStyle name="code" rules={[{ required: true, message: '请输入验证码' }]}>
                <Input className="width400" />
              </Form.Item>
              <CodeButton request={api.agentApply.sendSmsCode} form={form} delay={5} style={{ position: 'absolute', left: 300 }} />
            </div>
          </Form.Item>
          <Form.Item
            noStyle
            name="inviteUid"
          >
            <Input type="hidden" />
          </Form.Item>
          <Form.Item
            style={{ paddingBottom: 32 }}
            {...tailLayout}>
            <Button loading={loading} htmlType="submit" type="primary">下一步</Button>
          </Form.Item>
        </div>
      </Form >
      <Modal
        title="提示"
        visible={visible}
        footer={[<Button onClick={() => { setVisible(false); }}>确定</Button>]}
      >
        <div className="flex-center">
          <span style={{ textAlign: 'center', whiteSpace: 'pre-line' }}>
            {msgdata}
          </span>
        </div>
      </Modal>
    </>
  );
};


export default BaseForm;
