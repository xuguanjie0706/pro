import React, { Component } from 'react';
import { history } from 'umi';
import http from '@/utils/http';

import { Form, Input, Button } from 'antd';
import md5 from 'js-md5';
import styles from './index.less';

export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    isForget: false,
  };

  login = (form) => {
    if (form.username && form.password) {
      form.username = form.username.trim();
      http
        .postRequestParam('/login_by_pwd', {
          userName: form.username,
          password: md5(form.username + form.password),
        })
        .then((res) => {
          console.log(res, 231);
          const {
            userName,
            realName,
            mobile,
            nickName,
            role,
            userTags,
            channelCode,
            channelName,
            remark,
            createAt,
            channelTag,
          } = res.data;
          localStorage.setItem('userName', userName);
          localStorage.setItem('realName', realName);
          localStorage.setItem('mobile', mobile);
          localStorage.setItem('nickName', nickName);
          localStorage.setItem('role', role);
          localStorage.setItem('createAt', createAt);
          localStorage.setItem('userTags', userTags);
          localStorage.setItem('channelCode', channelCode);
          localStorage.setItem('channelName', channelName);
          localStorage.setItem('channelTag', channelTag);
          localStorage.setItem('remark', remark);
          history.push('/dashboard/index');
        });
    }
  };

  componentDidMount() {
    console.log(this.$http);
  }

  forgetPass = () => {
    this.setState({ isForget: true });
  };

  render() {
    const formItems = [];
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
            <Form.Item name="username" rules={[{ required: true, message: '用户名' }]}>
              <Input
                size="large"
                placeholder="用户名"
                onChange={(e) => this.setState({ username: e.target.value })}
                style={{ borderRadius: 4 }}
                maxLength={16}
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
                <Button size="large" type="default" onClick={() => {}} style={{ marginLeft: 10 }}>
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
                disabled={!this.state.username || !this.state.password}
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
