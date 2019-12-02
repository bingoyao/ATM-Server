/**
 * 错误信息统一格式
 */
class TransError extends Error {

  constructor(code, message) {
    super(message);
    this.statusCode = code;
  }

}
// 余额不足错误
TransError.INSUFFICIENT_BALANCE = new TransError(412, '余额不足');

// 验证失败错误
TransError.AUTHENTICATION_FAIL = new TransError(403, '验证失败');

// 信用不足错误
TransError.INSUFFICIENT_CREDITS = new TransError(400, '信用积分不足');

// 事务超时错误
TransError.TIMEOUT = new TransError(408, '请求超时');

module.exports = TransError;