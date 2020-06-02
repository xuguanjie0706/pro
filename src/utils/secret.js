/* eslint-disable no-param-reassign */
const CryptoJS = require('crypto-js');
// import { JSEncrypt } from './jsencrypt.js'
const { JSEncrypt } = window;
function getRandomStr(n) {
  const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  let ramdomStr = '';
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < n; i++) {
    const id = Math.ceil(Math.random() * 35);
    ramdomStr += arr[id];
  }
  return ramdomStr;
}

function aesEncrypt(str, randomStr) {
  const key = CryptoJS.enc.Utf8.parse(randomStr);
  const iv = CryptoJS.enc.Utf8.parse(randomStr);
  const encryptedData = CryptoJS.AES.encrypt(str, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encryptedData.toString();
}

function jsonMD5UpperCase(params) {
  const jsonStr = JSON.stringify(params);
  const MD5Str = CryptoJS.MD5(jsonStr).toString();
  return MD5Str.toUpperCase();
}

// RSA加密
// crypto无RSA加密，用jsencrypt进行RSA加密
// jsencrypt做了浏览器兼容，在小程序上报错，对源码进行了修改，参见同目录下jsencrypt.js文件标注
function rsaEncrypt(str) {
  const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCJn6dgFzRoxe+Q89nLaKyBKeN1BAc8bRbrZ2ADhQg/Y6nN93u4xGjrHp073xpVL/WfhpE7zCM3whEcMziMdrDLkSKV1mV8HDa/OQuM+Qm0P420TctU+355DdWTyNpDsVhB9TinkCooKHrXZoz5m3+JTE/hClGqnPQMhqfD8Eu4DwIDAQAB';
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  const encrypted = encrypt.encrypt(str);
  return encrypted;
}

function handleParams(params, randomStr) {
  if (params.mobile) params.mobile = aesEncrypt(params.mobile, randomStr);
  if (params.contact) params.contact = aesEncrypt(params.contact, randomStr);
  if (params.truename) params.truename = aesEncrypt(params.truename, randomStr);
  if (params.name) params.name = aesEncrypt(params.name, randomStr);
  if (params.idCard) params.idCard = aesEncrypt(params.idCard, randomStr);
  if (params.cdKey) params.cdKey = aesEncrypt(params.cdKey, randomStr);
  if (params.unifiedCreditCode) params.unifiedCreditCode = aesEncrypt(params.unifiedCreditCode, randomStr);
  // if (params.idCard) params.idCard = aesEncrypt(params.idCard, randomStr);
  if (params.bankCardNo) params.bankCardNo = aesEncrypt(params.bankCardNo, randomStr);
  return params;
}

// 加密规则
// 1.生成16位数字加字母随机数(得到敏感字段加密密钥randomStr)
// 2.AES对敏感字段加密(得到加密后的json)
// 3.对加密后的json再次MD5加密并转大写(得到digest)
// 4.使用公钥(服务端提供)RSA加密digest(得到sign，需要放到请求头中)
// 5.使用公钥(服务端提供)RSA加密randomStr(得到randomKey，需要放到请求头中)
export function handlePost(params) {
  const randomStr = getRandomStr(16);
  const timestamp = aesEncrypt(`${new Date().getTime()}`, randomStr);
  const postBodyJson = handleParams(params, randomStr);
  const digest = jsonMD5UpperCase(postBodyJson);
  const sign = rsaEncrypt(digest);
  const randomKey = rsaEncrypt(randomStr);
  return {
    postBodyJson,
    sign,
    randomKey,
    timestamp,
  };
}
