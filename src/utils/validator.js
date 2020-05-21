export const phoneValidator = (rule, value, callback) => {
  if (!/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(value)) {
    callback('请输入正确的手机号');
  } else {
    callback();
  }
};
