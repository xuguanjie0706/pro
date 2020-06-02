/* 手机号验证 */
export const phoneValidator = (rule, value) => {
  if (!/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(value)) {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject('请输入正确的手机号');
  }
  return Promise.resolve();

};


/* 手机号验证 */
export const peopleCardValidator = (rule, value) => {
  return new Promise((resolve, reject) => {
    if (
      !/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
        value
      )
    ) {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('请输入正确的身份证');
    }
    resolve();
  });
};
