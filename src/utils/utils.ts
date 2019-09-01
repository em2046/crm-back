import * as crypto from 'crypto';

export default class Utils {
  /**
   * 标识符规则
   */
  static identifierRule = /^[a-zA-Z][\w\-]*$/;

  /**
   * 使用密码和盐生成安全存储字符串
   * @param password 密码
   * @param salt 盐
   */
  static pbkdf2Promise(password: string, salt: string) {
    return new Promise<string>(resolve => {
      crypto.pbkdf2(password, salt, 10000, 128, 'sha512', (err, derivedKey) => {
        if (err) {
          throw err;
        }
        const encrypted: string = derivedKey.toString('hex');
        resolve(encrypted);
      });
    });
  }

  /**
   * 生成随机字符串
   * @param size 结果长度
   */
  static randomBytesPromise(size = 256) {
    return new Promise<string>(resolve => {
      crypto.randomBytes(size / 2, (err, buf) => {
        if (err) {
          throw err;
        }
        const randomBytes = buf.toString('hex');
        resolve(randomBytes);
      });
    });
  }

  /**
   * 获取两数之间的随机整数
   * @param min 含最小值
   * @param max 不含最大值
   */
  static randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
