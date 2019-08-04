/**
 * 接口返回值
 */
export class HttpResult<T> {
  /**
   * 返回代号
   */
  code: T;

  /**
   * 返回信息
   */
  message: string;

  /**
   * 返回数据
   */
  data?: any;
}
