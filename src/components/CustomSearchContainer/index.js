import React, { useState } from 'react';
import { Form, Card } from 'antd';

/**
 * @description: TableComponent  Table组件 WrappedComponent2  查询表单   CustomComponent 按钮表单
 * @param {type}
 * @return:
 */
const CustomSearchContainer = (
  TableComponent,
  SearchComponent,
  ButtonComponent,
  AddComponent
) => {
  const Index = (props) => {
    console.log(12);

    // const defaultProps = {
    //   dafaultData: {},
    //   formItemLayout: {
    //     labelCol: { span: 7 },
    //     wrapperCol: { span: 14 }
    //   },
    //   title: '数据新增',
    //   width: 520
    // };

    const { formItemLayout } = props;
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [child, setChild] = useState(null);
    const [defaultData, setDefaultData] = useState({});

    const onRef = (ref) => {
      setChild(ref);
    };


    const handleSubmit = value => {
      child.initData({ page: 0, ...value });
    };


    return (
      <>
        {SearchComponent && (
          <Card size="small" style={{ marginBottom: 12 }}>
            {AddComponent && <AddComponent />}
            <Form
              style={{
                'backgroundColor': 'rgb(244, 244, 244)',
                'padding': '16px 16px 8px',
                'marginBottom': '16px',
              }}
              form={form}
              onFinish={handleSubmit}
              {...formItemLayout}
            >
              <SearchComponent defaultData={defaultData} form={form} {...props} />
              {ButtonComponent && (
                <ButtonComponent {...props} />
              )}
            </Form>
            {TableComponent && (
              <TableComponent onFatherRef={onRef} {...props} />
            )}
          </Card>
        )}

      </>
    );
  };

  return Index;
};

export default CustomSearchContainer;
