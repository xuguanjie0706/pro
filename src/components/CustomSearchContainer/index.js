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
    // let form = null;
    // if (SearchComponent) {
    const [form] = Form.useForm();
    // }
    const [child, setChild] = useState(null);
    // const [defaultData, setDefaultData] = useState({});

    const onRef = (ref) => {
      setChild(ref);
    };


    const handleSubmit = value => {
      child.initData({ pageNum: 1, ...value });
    };


    return (
      <>
        {AddComponent && <AddComponent />}
        {TableComponent && (
          <Card size="small" style={{ marginBottom: 12 }}>
            {SearchComponent && (<Form
              style={{
                'backgroundColor': 'rgb(244, 244, 244)',
                'padding': '16px 16px 8px',
                'marginBottom': '16px',
              }}
              form={form}
              onFinish={handleSubmit}
              {...formItemLayout}
            >
              <SearchComponent form={form} {...props} />
              {ButtonComponent && (
                <ButtonComponent {...props} />
              )}
            </Form>)}
            <TableComponent form={form} onFatherRef={onRef} {...props} />

          </Card>
        )}

      </>
    );
  };

  return Index;
};

export default CustomSearchContainer;
