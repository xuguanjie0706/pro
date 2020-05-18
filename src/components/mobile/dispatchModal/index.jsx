import { useEffect, useRef, useState, useMemo, Fragment } from 'react';
import { Modal, Flex, List, InputItem, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { rcErrorsToString, copyString } from '@/components/mobile/common';
import styles from './style.less';
import { allocateToUser } from '@/pages/mobile/api';

function isWeiXin() {
  var ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
}

// const inWeiXin = isWeiXin();
// 现在所有情况都提示长按保存
const inWeiXin = true;

// Map定义
const typeMap = {
  1: 'code',
  2: 'link',
  3: 'message',
  6: 'qrcode',
};
// issueTypeMap
const issueTypeMap = {};
Object.keys(typeMap).forEach(key => {
  issueTypeMap[typeMap[key]] = key;
});
// 备注Map
const remarkMap = {
  qrcode: 'remark1',
  code: 'remark2',
  link: 'remark3',
  message: 'remark4',
};

// 分发
const DispatchModal = createForm()(props => {
  const [type, setType] = useState('qrcode');
  const [qrcode, setQrcode] = useState(null);
  const [code, setCode] = useState(null);
  const [link, setLink] = useState(null);

  const {
    getFieldProps,
    getFieldValue,
    validateFields,
    setFieldsValue,
    getFieldError,
    resetFields,
  } = props.form;

  // 记录各个Inputitem的值，因为用了很多判断导致InputItem会移除，那时会取不到值
  const inputValues = useRef({
    remark1: '',
    remark2: '',
    remark3: '',
    remark4: '',
    phone: '',
  });

  // 重发
  const resendInfo = props.resendInfo;
  useEffect(() => {
    if (!resendInfo) {
      return;
    }
    const { issueType, remark, issueMobile } = resendInfo;
    const newType = typeMap[issueType];

    switchType(newType);
    inputValues.current = {
      remark1: remark,
      remark2: remark,
      remark3: remark,
      remark4: remark,
      phone: issueMobile,
    };
    setTimeout(() => {
      setFieldsValue({ [remarkMap[newType]]: remark });
    });
  }, [resendInfo]);

  // 执行重发
  function doReSend(newType) {
    const body = {
      cardBindingRecordId: resendInfo.id,
      chnerUserId: props.user.id,
      issueType: issueTypeMap[newType],
    };
    let callback = () => {};
    switch (newType) {
      case 'qrcode':
        callback = res => {
          setQrcode('data:image/jpeg;base64,' + res.data.qrCode);
          props.onSend();
        };
        break;
      case 'code':
        callback = res => {
          setCode(res.data.cdkey);
          props.onSend();
        };
        break;
      case 'link':
        callback = res => {
          setLink(res.data.receiveUrl);
          props.onSend();
        };
        break;
    }
    allocateToUser({ body }).then(callback);
  }

  // 切换类型
  function switchType(newType) {
    setType(newType);
    // 自动重发
    if (resendInfo) {
      switch (newType) {
        case 'qrcode':
          !qrcode && doReSend(newType);
          break;
        case 'code':
          !code && doReSend(newType);
          break;
        case 'link':
          !link && doReSend(newType);
          break;
        case 'message':
          break;
        default:
          break;
      }
    }
  }

  // 发送
  function send(newType) {
    let body = {
      chnerUserId: props.user.id,
      issueType: issueTypeMap[newType],
      pkgId: props.dispatchId,
      userNickName: props.user.nickName,
      userRealName: props.user.realName,
      remark: getFieldValue(remarkMap[newType]),
    };
    if (body.remark && body.remark.length > 20) {
      Toast.info('备注不能超过20个字', 1, null, false);
      return;
    }
    let callback = () => {};
    switch (newType) {
      case 'qrcode':
        callback = res => {
          setQrcode('data:image/jpeg;base64,' + res.data.qrCode);
          props.onSend();
        };
        break;
      case 'code':
        callback = res => {
          setCode(res.data.cdkey);
          props.onSend();
        };
        break;
      case 'link':
        callback = res => {
          setLink(res.data.receiveUrl);
          props.onSend();
        };
        break;
      case 'message':
        callback = res => {
          // 发送成功
          Toast.info('发送成功', 2, null, false);
          props.onSend();
        };
        break;
    }
    if (newType !== 'message') {
      allocateToUser({ body }).then(callback);
    } else {
      validateFields(['phone', 'remark4'], (errors, values) => {
        if (errors) {
          Toast.info(rcErrorsToString(errors), 2, null, false);
          return;
        }
        props.onClose();
        body.issueMobile = values.phone;
        body.remark = values.remark4;
        // 如果是重发
        if (resendInfo) {
          body = {
            cardBindingRecordId: resendInfo.id,
            chnerUserId: props.user.id,
            issueType: issueTypeMap[newType],
            issueMobile: inputValues.current.phone,
          };
        }
        allocateToUser({ body }).then(callback);
      });
    }
  }

  // 下载图片
  const downloadA = useRef(document.createElement('a'));
  function downloadImg(url, name) {
    let blob = base64ToBlob(url);
    downloadA.current.download = name;
    let evt = document.createEvent('HTMLEvents');
    //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
    evt.initEvent('click', true, true);
    downloadA.current.href = URL.createObjectURL(blob);
    downloadA.current.click();
    downloadA.current.href = '';
    downloadA.current.download = '';
  }
  //base64转blob
  function base64ToBlob(code) {
    let parts = code.split(';base64,');
    let contentType = parts[0].split(':')[1];
    let raw = window.atob(parts[1]);
    let rawLength = raw.length;

    let uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
  }

  const footer = useMemo(() => {
    const cancel = { text: '取消', onPress: props.onClose };
    let r = [cancel];
    switch (type) {
      case 'qrcode':
        r = [cancel, { text: '生成', onPress: () => send('qrcode') }];
        if (qrcode) {
          if (inWeiXin) {
            r = [{ text: '关闭', onPress: props.onClose }];
          } else {
            r[1].text = '下载';
            r[1].onPress = () => {
              downloadImg(qrcode, '权益分发二维码.jpg');
              props.onClose();
            };
          }
        }
        break;
      case 'code':
        r = [cancel, { text: '生成', onPress: () => send('code') }];
        if (code) {
          r[1].text = '复制';
          r[1].onPress = () => {
            copyString(code);
            props.onClose();
          };
        }
        break;
      case 'link':
        r = [cancel, { text: '生成', onPress: () => send('link') }];
        if (link) {
          r[1].text = '复制';
          r[1].onPress = () => {
            copyString(link);
            props.onClose();
          };
        }
        break;
      case 'message':
        r = [cancel, { text: '发送', onPress: () => send('message') }];
        break;
    }
    return r;
  }, [type, qrcode, code, link]);

  function getTips(type) {
    return (
      {
        qrcode: '二维码生成之后无法撤销，请谨慎处理。生成前可添加备注',
        code: '兑换码生成之后无法撤销，请谨慎处理，生成前可添加备注',
        link: '兑换链接生成之后无法撤销，请谨慎处理。生成前可添加备注',
        message: '短信发送之后无法撤销，请谨慎处理。发送前可添加备注',
      }[type] || ''
    );
  }

  function getPanel(type) {
    switch (type) {
      case 'qrcode':
        return (
          <div className={styles.tabPanel}>
            {qrcode ? (
              <div className={styles.dispatchResult}>
                <div className={styles.dispatchResultItem}>
                  <img className={styles.qrcodeImg} src={qrcode} alt="" />
                </div>
                {inWeiXin ? (
                  <div className={styles.saveTips}>长按图片保存</div>
                ) : (
                  ''
                )}
                <div>备注：{inputValues.current[remarkMap[type]]}</div>
              </div>
            ) : (
              <Fragment>
                <List className="noBorder">
                  <div className={styles.modalTitle}>备注</div>
                  <InputItem
                    clear
                    placeholder="请输入备注"
                    className={[styles.modalInput, 'border-all-1px'].join(' ')}
                    labelNumber={0}
                    disabled={resendInfo}
                    maxLength={20}
                    {...getFieldProps(remarkMap[type], {
                      initialValue: inputValues.current[remarkMap[type]],
                      onChange: val =>
                        (inputValues.current[remarkMap[type]] = val),
                    })}
                  ></InputItem>
                </List>
                <div className={styles.tips}>{getTips('qrcode')}</div>
              </Fragment>
            )}
          </div>
        );
      case 'code':
        return (
          <div className={styles.tabPanel}>
            {code ? (
              <div className={styles.dispatchResult}>
                <div className={styles.dispatchResultItem}>兑换码：{code}</div>
                <div>备注：{inputValues.current[remarkMap[type]]}</div>
              </div>
            ) : (
              <Fragment>
                <List className="noBorder">
                  <div className={styles.modalTitle}>备注</div>
                  <InputItem
                    clear
                    placeholder="请输入备注"
                    className={[styles.modalInput, 'border-all-1px'].join(' ')}
                    labelNumber={0}
                    maxLength={20}
                    disabled={resendInfo}
                    {...getFieldProps(remarkMap[type], {
                      initialValue: inputValues.current[remarkMap[type]],
                      onChange: val =>
                        (inputValues.current[remarkMap[type]] = val),
                    })}
                  ></InputItem>
                </List>
                <div className={styles.tips}>{getTips('code')}</div>
              </Fragment>
            )}
          </div>
        );
      case 'link':
        return (
          <div className={styles.tabPanel}>
            {link ? (
              <div className={styles.dispatchResult}>
                <div className={styles.dispatchResultItem}>链接：{link}</div>
                <div>备注：{inputValues.current[remarkMap[type]]}</div>
              </div>
            ) : (
              <Fragment>
                <List className="noBorder">
                  <div className={styles.modalTitle}>备注</div>
                  <InputItem
                    clear
                    placeholder="请输入备注"
                    className={[styles.modalInput, 'border-all-1px'].join(' ')}
                    labelNumber={0}
                    maxLength={20}
                    disabled={resendInfo}
                    {...getFieldProps(remarkMap[type], {
                      initialValue: inputValues.current[remarkMap[type]],
                      onChange: val =>
                        (inputValues.current[remarkMap[type]] = val),
                    })}
                  ></InputItem>
                </List>
                <div className={styles.tips}>{getTips('link')}</div>
              </Fragment>
            )}
          </div>
        );
      case 'message':
        return (
          <div className={styles.tabPanel}>
            <List className="noBorder">
              <div className={styles.modalTitle}>手机号</div>
              <InputItem
                clear
                placeholder="请输入手机"
                className={[styles.modalInput, 'border-all-1px'].join(' ')}
                labelNumber={0}
                maxLength={11}
                disabled={resendInfo && resendInfo.issueMobile}
                {...getFieldProps('phone', {
                  validateTrigger: 'onSubmit',
                  initialValue: inputValues.current.phone,
                  onChange: val => {
                    if (val === '') {
                      resetFields(['phone']);
                    }
                    inputValues.current.phone = val;
                  },
                  rules: [
                    { required: true, message: '手机号不能为空' },
                    {
                      pattern: /^1[3456789]\d{9}$/,
                      message: '手机号格式不正确',
                    },
                  ],
                })}
                error={getFieldError('phone')}
                onErrorClick={() =>
                  Toast.info(getFieldError('phone'), 2, null, false)
                }
              ></InputItem>
              <div className={styles.modalTitle}>备注</div>
              <InputItem
                clear
                placeholder="请输入备注"
                className={[styles.modalInput, 'border-all-1px'].join(' ')}
                labelNumber={0}
                maxLength={20}
                disabled={resendInfo}
                {...getFieldProps(remarkMap[type], {
                  initialValue: inputValues.current[remarkMap[type]],
                  onChange: val => (inputValues.current[remarkMap[type]] = val),
                })}
              ></InputItem>
            </List>
            <div className={styles.tips}>{getTips('message')}</div>
          </div>
        );
    }
  }

  return (
    <Modal
      visible={props.visible}
      transparent
      title="权益分发"
      onClose={props.onClose}
      footer={footer}
      className="dispatchModal"
    >
      <div className={styles.modalTitle}>分发方式</div>
      <Flex className={styles.types} direction="row">
        <div
          className={[
            styles.typeItem,
            type === 'qrcode' ? styles.active : '',
          ].join(' ')}
          onClick={() => switchType('qrcode')}
        >
          二维码
        </div>
        <div
          className={[
            styles.typeItem,
            type === 'code' ? styles.active : '',
          ].join(' ')}
          onClick={() => switchType('code')}
        >
          兑换码
        </div>
        <div
          className={[
            styles.typeItem,
            type === 'link' ? styles.active : '',
          ].join(' ')}
          onClick={() => switchType('link')}
        >
          链接分发
        </div>
        <div
          className={[
            styles.typeItem,
            type === 'message' ? styles.active : '',
          ].join(' ')}
          onClick={() => switchType('message')}
        >
          短信分发
        </div>
      </Flex>
      {getPanel(type)}
    </Modal>
  );
});

export default DispatchModal;
