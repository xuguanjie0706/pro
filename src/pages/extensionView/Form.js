import React from 'react';
import { Input, Message } from 'antd';
import CustomModalContainer from '@/components/CustomModalContainer';
import QRCode from 'qrcode.react';
import copy from 'copy-to-clipboard';
import './index.less';

const { Search } = Input;
const CustomForm = ({ defaultData, form, ledgerStatusType }) => {
  const { code = '1232' } = defaultData;
  // const { getFieldDecorator, setFieldsValue, getFieldValue } = form;
  const downloadCode = (e) => {
    e.preventDefault();
    const Qr = document.getElementById('qrid');
    const data = Qr.toDataURL('image/png');
    const a = document.createElement('a'); // 创建一个a节点插入的document
    const event = new MouseEvent('click'); // 模拟鼠标click点击事件
    a.download = '二维码'; // 设置a节点的download属性值
    a.href = data; // 将图片的src赋值给a节点的href
    a.dispatchEvent(event);
  };

  const InputSearch = () => {
    if (copy(code)) {
      Message.success('复制成功');
    } else {
      Message.error('复制失败');
    }
  };
  return (
    <div className="ext-form">
      <p className="star"> 复制下方推广链接或下载二维码，邀请您的渠道代理商进行申请</p>
      <div className="action-room">
        <span className="action-room-title">推广链接：</span>
        <Search value={code} enterButton="复制" onSearch={InputSearch} />
      </div>

      <div className="code-room">
        <QRCode
          id='qrid'
          value={code} // value参数为生成二维码的链接
          size={110} // 二维码的宽高尺寸
          fgColor="#000000" // 二维码的颜色
        />
        <a onClick={downloadCode}>下载二维码</a>
      </div>
    </div>
  );
};

export default CustomModalContainer(CustomForm);
