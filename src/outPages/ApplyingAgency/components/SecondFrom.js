import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import '../index.less';
import AgentArea from '@/components/CustomFormItem/AgentArea';
import CardRoom from './CardRoom';
import PeopleCardUpload from './PeopleCardUpload';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const { Option } = Select;
const { TextArea } = Input;
const SecondFrom = (props) => {
  const { agentType } = props;
  console.log(agentType);

  const [form] = Form.useForm();
  const handleClick = (values) => {
    console.log(values);
  };

  return (
    <Form {...layout} form={form} onFinish={handleClick}>
      <CardRoom title="个人信息">
        {agentType === 1 ? <> <Form.Item
          label="姓名"
          name="name1"
          rules={[{ required: true, message: '请填写姓名' }]}
        >
          <Input className="width400" />
        </Form.Item> <Form.Item
          label="身份证"
          name="name2"
          rules={[{ required: true, message: '请填写身份证' }]}
        >
            <Input className="width400" />
          </Form.Item>
          <Form.Item
            name="name3"
            label="请上传清晰的个人身份证"
            rules={[{ required: true, message: '请上传清晰的个人身份证' }]}
          >
            <div className="hl-layout-h">
              <Form.Item noStyle>
                <PeopleCardUpload />
              </Form.Item>
              <Form.Item noStyle>
                <PeopleCardUpload />
              </Form.Item>
            </div>
          </Form.Item> </>
          : <>
            <Form.Item
              label="企业名称"
              name="name3232"
              rules={[{ required: true, message: '请填写姓名' }]}
            >
              <Input className="width400" />
            </Form.Item>
            <Form.Item
              label="社会统一信用代码/营业执照号"
              name="name2"
              rules={[{ required: true, message: '请填写身份证' }]}
            >
              <Input className="width400" />
            </Form.Item>
            <Form.Item
              name="name3"
              colon={false}
              // label="请上传清晰的营业执照"
              label={
                <div style={{ marginTop: 20 }}>
                  <span className="label" style={{ lineHeight: 1.4 }}>请上传清晰的营业执照</span>
                  <br />
                  <span className="label-desc">上传图片大小不超过2M &nbsp;</span>

                </div>
              }
              rules={[{ required: true, message: '请上传清晰的个人身份证' }]}
            >
              <Form.Item noStyle>
                <PeopleCardUpload style={{ height: 160, width: 160 }} desc="营业执照" />
              </Form.Item>
            </Form.Item>
          </>}
        <Form.Item
          name="name4"
          label="联系地址"
          rules={[{ required: true, message: '请填写联系地址' }]}
        >
          <TextArea className="width400" />
        </Form.Item>
      </CardRoom>
      <CardRoom title="银行卡信息">
        <Form.Item
          name="name5"
          label="银行卡号"
          rules={[{ required: true, message: '请填写银行卡信息' }]}
        >
          <Input className="width400" />
        </Form.Item>
        <Form.Item
          name="name6"
          label="开户银行"
          rules={[{ required: true, message: '请选择开户银行' }]}
        >
          <Select style={{ width: 400 }} >
            <Option />
          </Select>
        </Form.Item>
        <Form.Item
          label="支行名称"
          name="name7"
          rules={[{ required: true, message: '请填写支行名称' }]}
        >
          <Input className="width400" />
        </Form.Item>
      </CardRoom>

      <CardRoom title="代理信息">
        <Form.Item
          label="代理区域"
          name="name8"
          rules={[{ required: true, message: '请添加至少一个代理信息' }]}
        >
          <AgentArea className="width400" />
        </Form.Item>
        <Form.Item
          style={{ paddingBottom: 32 }}
          {...tailLayout}
        >
          <Button htmlType="submit" type="primary"> 确认提交</Button>
        </Form.Item>
      </CardRoom>
    </Form>
  );
};


export default SecondFrom;
