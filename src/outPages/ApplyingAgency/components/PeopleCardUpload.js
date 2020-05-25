import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import './peopleCardUpload.less';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
const PeopleCardUpload = (props) => {
  const { desc = '身份证正面', style = { width: 222, height: 140 } } = props;
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(false);
  const [depiction, setDepiction] = useState(desc);
  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, image => {
        setImageUrl(image);
        setDepiction('重新上传');
      });

    }
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };
  return (
    <Upload
      showUploadList={false}
      onChange={handleChange}
      beforeUpload={beforeUpload}>
      <div className="people-card-upload" style={style}>
        {imageUrl && <img src={imageUrl} alt="avatar" style={{ width: '100%', height: '100%' }} />}
        <div className={`people-card-upload-modal ${imageUrl ? 'done' : ''}`} >
          <div className="icon-r">
            {imageUrl ? <ReloadOutlined /> : <PlusOutlined />}
          </div>
          <p >{depiction}</p>
        </div>
      </div>
    </Upload>
  );
};


export default PeopleCardUpload;
