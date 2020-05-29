import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import Icon, { CloudUploadOutlined } from '@ant-design/icons';
import xlsx from 'xlsx';
import api from '@/api';
import iconFile from './assets/icon_file.png';
import deleteIcon from './assets/btn_trashbin.png';

import './index.less';

const iconFileImg = () => {
  return (
    <> <img src={iconFile} alt="" /></>
  );
};

const deleteIconImg = () => {
  return (
    <> <img src={deleteIcon} alt="" /></>
  );
};


const UploadEXCEL = (props) => {

  const { value, onChange, targetUrl } = props;
  const [url, setUrl] = useState(value);
  const [len, setLen] = useState(0);
  // const [lenList, setLenList] = useState([]);
  const deleteItem = () => {
    setUrl('');
  };
  const beforeUpload = (file) => {
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = event => {
      const { result } = event.target;
      const workbook = xlsx.read(result, { type: 'binary' });
      const data = xlsx.utils.sheet_to_json(workbook.Sheets.Sheet1);
      setLen(data.length);
      if (data.length > 10000) {
        message.error('单次上传最多导入10000条数据!');
        return false;
      }
      return true;
    };
  };

  const upload = async (e) => {
    const { file } = e;
    try {
      const formData = new FormData();
      formData.append('file', file);
      const r = await api.file.upload({ data: formData });

      if (r) {
        const { absoluteUrl } = r;
        await setUrl(absoluteUrl);
        onChange(absoluteUrl);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  // useEffect(() => {

  // }, [url]);


  return (
    <div className="upload-excel">
      <div className="upload-excel-header">
        <Upload
          accept=".xlsx"
          customRequest={upload}
          showUploadList={false}
          beforeUpload={beforeUpload}
        >
          <Button type="primary" ghost>
            <CloudUploadOutlined />
          上传文件
        </Button>
        </Upload>
        <a href={targetUrl} target="_blank">下载模板</a>
        <span className="star">单次上传最多导入1万条记录</span>
      </div>
      {url &&
        <div className="upload-excel-body " >
          <div className="upload-excel-body-cell">
            <Icon component={iconFileImg} />
            <span className="upload-title">{url}</span>
            <Icon onClick={deleteItem} component={deleteIconImg} />
            <span className="star" style={{ marginLeft: 'auto' }}>识别到{len}条记录</span>
          </div>
        </div>
      }
    </div>
  );
};

export default UploadEXCEL;
