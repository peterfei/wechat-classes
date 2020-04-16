/**
 * @file classes.js
 * @fn 班級網絡請求
 * @author: peterfei
 * @version 1.0
 * @date: 2020-04-08
 */
import request from './request';
import {baseUrl} from '../global';
import {logMethodAsync} from '../utils/util';
class classes {
  constructor() {
    // 初始化班级
    this._baseUrl = baseUrl;
    //this._request = new request();
    this._request = new Proxy(new request(), {
      get: function(target, key) {
        let value = target[key];
        console.group('%c实例化后调用的方法', 'color:blue');
        console.log(`value is ${value}`);
        console.groupEnd();
        console.log(`key is ${key}`);
        return function(...args) {
          logMethodAsync('当前异步产生的实例参数为:', JSON.stringify(args));
          return Reflect.apply(value, target, args);
        };
      },
    });
    this._request.setErrorHandler(this.errorHandler);
  }

  errorHandler(res) {
    wx.showToast({
      title: '网络加载出错',
      icon: 'fail',
      mask: true,
      duration: 2000,
    });
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

  /**
   * @fn showClassesArticleInfo
   * @param [] token
   * @param [] header
   */
  showClassesArticleInfo(token, obj, header) {
    return this._request
      .postRequest(
        this._baseUrl + '/ClassesArticle/info?token=' + token,
        obj,
        header,
      )
      .then(res => res.data);
  }

  /**
   * @fn showVideoInfo 视频基本信息
   * @param [] token
   * @param [] obj
   * @param [] header
   */
  showVideoInfo(token, obj, header) {
    return this._request
      .postRequest(this._baseUrl + 'Video/info?token=' + token, obj, header)
      .then(res => res.data);
  }

  /**
   * @fn showVideoLists 视频Relevant列表
   * @param [] token
   * @param [] obj
   * @param [] header
   */
  showVideoRelevantLists(token, obj, header) {
    return this._request
      .postRequest(this._baseUrl + 'Video/relevant?token=' + token, obj, header)
      .then(res => res.data);
  }

  /**
   * @fn showNoteLists 视频>笔记列表
   * @param [] token
   * @param [] obj
   * @param [] header
   */
  showNoteLists(token, obj, header) {
    return this._request
      .postRequest(this._baseUrl + 'Video/notes?token=' + token, obj, header)
      .then(res => res.data);
  }

  /**
   * @fn showCommentsList 视频>评论列表
   * @param [] token
   * @param [] obj
   * @param [] header
   */
  showCommentLists(token, obj, header) {
    return this._request
      .postRequest(this._baseUrl + 'Video/comment?token=' + token, obj, header)
      .then(res => res.data);
  }

  /**
   * @fn showVideoLists video列表
   * @param [] token
   * @param [] obj
   * @param [] header
   */
  showVideoLists(token, obj, header) {
    return this._request
      .postRequest(
        this._baseUrl + 'ClassesVideo/lists?token=' + token,
        obj,
        header,
      )
      .then(res => res.data);
  }

  /**
   * @fn showTaskLists 作业列表
   * @param [] token
   * @param [] obj
   * @param [] header
   */
  showTaskLists(token, obj, header) {
    return this._request
      .postRequest(
        this._baseUrl + 'ClassesTask/listsV2?token=' + token,
        obj,
        header,
      )
      .then(res => res.data);
  }

  /**
   * @fn showSurveyLists survey 测验列表
   * @param [] token
   * @param [] obj
   * @param [] header
   */
  showSurveyLists(token, obj, header) {
    return this._request
      .postRequest(
        this._baseUrl + 'ClassesSurvey/listsV2?token=' + token,
        obj,
        header,
      )
      .then(res => res.data);
  }

  /**
   * @fn showArticleLists 资料列表
   * @param [] token
   * @param [] obj
   * @param [] header
   */
  showArticleLists(token, obj, header) {
    return this._request
      .postRequest(
        this._baseUrl + 'ClassesArticle/lists?token=' + token,
        obj,
        header,
      )
      .then(res => res.data);
  }

  /**
   * @fn showUserLists 用户列表
   * @param [] token
   * @param [] obj
   * @param [] header
   */
  showUserLists(token, obj, header) {
    return this._request
      .postRequest(
        this._baseUrl + 'ClassesUser/lists?token=' + token,
        obj,
        header,
      )
      .then(res => res.data);
  }
}
export default classes;
