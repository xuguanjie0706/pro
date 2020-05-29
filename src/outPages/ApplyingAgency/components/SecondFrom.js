import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import '../index.less';
import AgentArea from '@/components/CustomFormItem/AgentArea';
import { connect } from 'umi';
import api from '@/api';
import PeopleCardUpload from '@/components/CustomApiFormItem/PeopleCardUpload';
import CardRoom from './CardRoom';
// import PeopleCardUpload from './PeopleCardUpload';

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
  const { agentType, bankList = [], dispatch, defaultData } = props;
  const [loading, setLoading] = useState(false);
  defaultData.agentApplyAreaList = defaultData.lastAgentApplyAreaList;
  console.log(defaultData);
  const [form] = Form.useForm();
  const handleClick = async (values) => {
    setLoading(true);
    try {
      const r = await api.agentApply.apply(values);
      if (r)
        setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      dispatch({
        type: 'base/getBankList'
      });
    } catch (error) {
      console.log(error);
    }
    form.setFieldsValue(defaultData);
  }, []);

  return (
    <Form {...layout} form={form} onFinish={handleClick}>
      <CardRoom title="个人信息">
        {agentType === 1 ? <> <Form.Item
          label="姓名"
          name="name"
          rules={[{ required: true, message: '请填写姓名' }]}
        >
          <Input className="width400" />
        </Form.Item> <Form.Item
          label="身份证"
          name="idCard"
          rules={[{ required: true, message: '请填写身份证' }]}
        >
            <Input className="width400" />
          </Form.Item>
          <Form.Item
            required
            label="请上传清晰的个人身份证"
          >
            <div className="hl-layout-h">
              <Form.Item noStyle name="idCardFrontUrl" rules={[{ required: true, message: '请上传清晰的个人身份证正面' }]}>
                <PeopleCardUpload />
              </Form.Item>
              <Form.Item noStyle name="idCardBackUrl" rules={[{ required: true, message: '请上传清晰的个人身份证背面' }]}>
                <PeopleCardUpload />
              </Form.Item>
            </div>
          </Form.Item> </>
          : <>
            <Form.Item
              label="企业名称"
              name="name"
              rules={[{ required: true, message: '请填写姓名' }]}
            >
              <Input className="width400" />
            </Form.Item>
            <Form.Item
              label="社会统一信用代码/营业执照号"
              name="unifiedCreditCode"
              rules={[{ required: true, message: '请填写身份证' }]}
            >
              <Input className="width400" />
            </Form.Item>
            <Form.Item
              name="enterpriseBusinessLicense"
              colon={false}
              label={
                <div style={{ marginTop: 20 }}>
                  <span className="label" style={{ lineHeight: 1.4 }}>请上传清晰的营业执照</span>
                  <br />
                  <span className="label-desc">上传图片大小不超过2M &nbsp;</span>

                </div>
              }
              rules={[{ required: true, message: '请上传清晰的营业执照' }]}
            >
              <Form.Item noStyle>
                <PeopleCardUpload style={{ height: 160, width: 160 }} desc="营业执照" />
              </Form.Item>
            </Form.Item>
          </>}
        <Form.Item
          name="contactAddr"
          label="联系地址"
          rules={[{ required: true, message: '请填写联系地址' }]}
        >
          <TextArea className="width400" />
        </Form.Item>
      </CardRoom>
      <CardRoom title="银行卡信息">
        <Form.Item
          name="bankCardNo"
          label="银行卡号"
          rules={[{ required: true, message: '请填写银行卡信息' }]}
        >
          <Input className="width400" />
        </Form.Item>
        <Form.Item
          name="bankName"
          label="开户银行"
          rules={[{ required: true, message: '请选择开户银行' }]}
        >
          <Select style={{ width: 400 }} >
            {bankList.map(item => <Option key={item.name} value={item.name}>{item.name}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item
          label="支行名称"
          name="bankBranch"
          rules={[{ required: true, message: '请填写支行名称' }]}
        >
          <Input className="width400" />
        </Form.Item>
        <Form.Item
          noStyle
          name="id"
        >
          <Input type="hidden" className="width400" />
        </Form.Item>
      </CardRoom>

      <CardRoom title="代理信息">
        <Form.Item
          label="代理区域"
          name="agentApplyAreaList"
          rules={[{ required: true, message: '请添加至少一个代理信息' }]}
        >
          <AgentArea fieldNames={{ label: 'agentAreaId', value: 'agentLevel' }} className="width400" />
        </Form.Item>
        <Form.Item
          style={{ paddingBottom: 32 }}
          {...tailLayout}
        >
          <Button loading={loading} htmlType="submit" type="primary"> 确认提交</Button>
        </Form.Item>
      </CardRoom>
    </Form>
  );
};

export default connect(({ base }) => ({
  bankList: base.bankList,
}))(SecondFrom);
