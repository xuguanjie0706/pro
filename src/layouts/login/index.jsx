import React, { Component } from 'react';
import { connect } from 'umi';
import { Form, Input, Button } from 'antd';
import md5 from 'js-md5';
import styles from './index.less';


@connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))
export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    isForget: false,
  };


  componentDidMount() {
    // console.log(this.props);
  }

  login = async (form) => {
    const { dispatch } = this.props;
    const value = { ...form };
    if (value.userName && value.password) {
      value.userName = value.userName.trim();
      value.password = md5(value.userName + value.password);
      try {
        dispatch({
          type: 'login/login',
          payload: { params: value }
        });
      } catch (error) {
        console.log(error);
      }

      //   http
      //     .postRequestParam('/login_by_pwd', {
      //       userName: value.username,
      //       password: md5(value.username + value.password),
      //     })
      //     .then((res) => {
      //       const {
      //         userName,
      //         realName,
      //         mobile,
      //         nickName,
      //         role,
      //         userTags,
      //         channelCode,
      //         channelName,
      //         remark,
      //         createAt,
      //         channelTag,
      //       } = res.data;
      //       localStorage.setItem('userName', userName);
      //       localStorage.setItem('realName', realName);
      //       localStorage.setItem('mobile', mobile);
      //       localStorage.setItem('nickName', nickName);
      //       localStorage.setItem('role', role);
      //       localStorage.setItem('createAt', createAt);
      //       localStorage.setItem('userTags', userTags);
      //       localStorage.setItem('channelCode', channelCode);
      //       localStorage.setItem('channelName', channelName);
      //       localStorage.setItem('channelTag', channelTag);
      //       localStorage.setItem('remark', remark);
      //       history.push('/dashboard/index');
      //     });
    }
  };

  forgetPass = () => {
    this.setState({ isForget: true });
  };

  render() {
    return (
      <div className={styles.main}>
        <div className={styles.loginImg} />
        <div className={styles.loginForm}>
          <div className={styles.loginLogo} />
          <Form
            name="basic"
            initialValues={{ remember: true }}
            labelCol={{
              span: 6,
            }}
            onFinish={this.login}
          >
            <Form.Item name="userName" rules={[{ required: true, message: '用户名' }, {
              max: 16, message: '用户名不得超过16个字符'
            }]}>
              <Input
                size="large"
                placeholder="用户名"
                onChange={(e) => this.setState({ userName: e.target.value })}
                style={{ borderRadius: 4 }}
                prefix={<div className={styles.iconPhone} />}
              />
            </Form.Item>
            {this.state.isForget === true && (
              <div className={`${styles.codeLayout} ant-form-item`}>
                <Form.Item
                  noStyle
                  name="confirm"
                  rules={[{ required: true, message: '请输入验证码' }]}
                >
                  <Input
                    size="large"
                    placeholder="验证码"
                    prefix={<div className={styles.iconCode} />}
                  />
                </Form.Item>
                <Button size="large" type="default" onClick={() => { }} style={{ marginLeft: 10 }}>
                  获取验证码
                </Button>
              </div>
            )}

            <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
              <Input.Password
                size="large"
                maxLength={16}
                onChange={(e) => this.setState({ password: e.target.value })}
                style={{ borderRadius: 4 }}
                placeholder="密码"
                prefix={<div className={styles.iconPassword} />}
              />
            </Form.Item>
            {this.state.isForget === true && (
              <Form.Item name="password1" rules={[{ required: true, message: '请再次输入密码' }]}>
                <Input.Password
                  size="large"
                  style={{ borderRadius: 4 }}
                  placeholder="确认密码"
                  prefix={<div className={styles.iconPassword} />}
                />
              </Form.Item>
            )}

            {/* <Form.Item>
              <div className={styles.spaceBetween}>
                <Checkbox>记住我</Checkbox>
                <a onClick={this.forgetPass.bind(this)}>忘记密码</a>
              </div>
            </Form.Item> */}
            <Form.Item>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                disabled={!this.state.userName || !this.state.password}
                className={styles.loginSubmit}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
