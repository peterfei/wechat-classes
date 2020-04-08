/**
 * @file classes.js
 * @fn 班級網絡請求
 * @author: peterfei
 * @version 1.0
 * @date: 2020-04-08
 */
import request from './request';
import {baseUrl} from '../global';
class classes {
  constructor() {
    // 初始化班级
    this._baseUrl = baseUrl;
    this._request = new request();
    this._request.setErrorHandler(this.errorHandler);
  }

  errorHandler(res) {
    console.log(`%c======>%s`, 'color:red', res);
  }

  /**
   * 请求班级列表
   *
   */
  getClassesLists(obj) {
    return this._request
      .postRequest(
        this._baseUrl + 'UserClasses/myClasses?token=' + obj.token,
        {},
      )
      .then(res => res.data);
  }

  /**
   * 取得班级详情
   *
   */
  getClassesDetail(token, obj, header) {
    return this._request
      .postRequest(
        this._baseUrl + 'Index/ClassesIndex?token=' + token,
        obj,
        header,
      )
      .then(res => res.data);
  }

  /**
   * @fn getClassesInfo
   * @param [] token
   * @param [] obj
   * @param [] header
   */
  getClassesInfo(token, obj, header) {
    return this._request
      .postRequest(
        this._baseUrl + 'ClassesIndex/info?token=' + token,
        obj,
        header,
      )
      .then(res => res.data);
  }
}
export default classes;
