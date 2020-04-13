import {contentType, token} from '../../global';
import regeneratorRuntime from '../../regenerator-runtime/runtime.js';
import '../../utils/lodash';
import {arraySort, renameKeys} from '../../utils/util';
let _ = require('lodash');
const app = getApp();
// pages/show-videos/show-videos.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isShowVideoFooter: true,
    tabsHeight: 0,
    navData: [
      {text: '章节', key: 'Video', children: []},
      {text: '笔记', key: 'Note', children: []},
      {text: '评价', key: 'Comment', children: []},
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    this.computeTabsHeight();
    let video_id = options.video_id;
    let classes_id = options.id;
    this.setData({
      video_id: video_id,
      classes_id: classes_id,
    }); //video_id 和 classes_id 存放入data里,方便调用.2020-04-13 10:36 by peterfei
    const videoInfo = await app.initClassPromise.showVideoInfo(
      token,
      {video_id: video_id, classes_id: classes_id},
      contentType,
    );
    const handler = {
      get: (target, key) => {
        if (key in target && key == 'name') {
          /*substr(0,text.length-lastLen-lastTwoLen-2)*/
          if (target[key].length >= 10) {
            return target[key].substr(0, 10) + '...';
          } else {
            return target[key];
          }
        }
      },
    };
      const proxy = new Proxy(videoInfo.result_data, handler); //使用拦截器Proxy对属性title进行处理:2020-04-13 15:55,By peterfei,Proxy 具体使用见:(Link)[https://es6.ruanyifeng.com/#docs/proxy]

    wx.setNavigationBarTitle({
      title: proxy.name,
    });

    const videoList = await app.initClassPromise.showVideoLists(
      token,
      {
        video_id: video_id,
        classes_id: classes_id,
        page: 1,
        page_size: 20,
      },
      contentType,
    );
    const videoInfoResult = videoInfo.result_data;
    /*videoInfoResult['children'] = videoList.result_data;*/
    console.log(
      `%c===videoInfo Obj===%s`,
      'color:#888',
      JSON.stringify(videoInfoResult),
    );
    /*const videoListResult = videoInfoResult.result_data*/
    const videoListResult = videoList.result_data.sort(
      //排序
      arraySort('oper_type'),
    );

    let _navData = this.data.navData;
    _navData[0]['children'] = videoListResult;
    this.setData({
      url: videoInfo.result_data.url,
      videoInfo: videoInfoResult,
      navData: _navData,
    });
  },

  onSwitchTab: async function(e) {
    console.log(`on Listen Switch tab `, JSON.stringify(e));
    let _opt_key = e.detail.key;
    console.log(`opt_key is ==> ${_opt_key}`);
    let _lists = {};
    let _pass_data = {
      video_id: this.data.video_id,
      page: 1,
      page_size: 20, //TODO 这里有分页数据, 需要完成上拉加载
    };
    if (_opt_key == 'Video') {
      _pass_data['classes_id'] = this.data.classes_id;
    }
    /**
     * Refactor 视频|评论|笔记列表
     * e.g. showNoteLists |showVideoLists|showCommentsLists
     * 2020-04-13 By peterfei
     */

    _lists = await app.initClassPromise[`show${_opt_key}Lists`](
      token,
      _pass_data,
      contentType,
    );
    console.log(`showNoteLists is  ${JSON.stringify(_lists)}`);
    let _navData = this.data.navData;
    let newResult = [];
    if (_lists.error_code != 20001) {
      _lists.result_data.forEach((_result, i) => {
        let newData = renameKeys(_result, {info: 'name'});
        newResult.push(newData);
      });
      let _inx = _navData.findIndex(x => x.key == _opt_key);
      console.log('index 下标目前为:', _inx);
      console.log('更新键值后的新对象:', JSON.stringify(newResult));
      _navData[_inx]['children'] = newResult;
      this.setData({
        navData: _navData,
      });
    }

    /*}*/
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},

  computeTabsHeight() {
    let that = this;
    let query = wx.createSelectorQuery().in(this);
    query.select('.video-body').boundingClientRect();
    query.select('.video-footer').boundingClientRect();
    query.exec(res => {
      let videoBodyHeight = res[0].height;
      let videoFooterHeight = res[1].height;
      console.log(`videoFooter height ${videoFooterHeight}`);
      let windowHeight = wx.getSystemInfoSync().windowHeight;
      let tabsHeight = windowHeight - videoBodyHeight - videoFooterHeight;

      console.log(
        '%c┍--------------------------------------------------------------┑',
        `color:red`,
      );
      console.log(`=====>动态计算tabsHeight值为=====>`, tabsHeight);

      console.log(
        '%c┕--------------------------------------------------------------┙',
        `color:red`,
      );
      this.setData({
        videoBodyHeight: videoBodyHeight,
        tabsHeight: tabsHeight,
        videosHeight: videoBodyHeight,
        videoFooterHeight: videoFooterHeight,
        tabbarContentHeight: tabsHeight + videoFooterHeight,
      });
    });
  },
  onPageScroll: function(event) {
    if (event.scrollTop >= this.data.videoFooterHeight) {
      console.log(
        `%c====>onScroll===>%s`,
        'color:green',
        JSON.stringify(event),
      );
      let anim = wx.createAnimation({
        timingFunction: 'ease-in-out',
        duration: 200,
        delay: 0,
      });
      let windowHeight = wx.getSystemInfoSync().windowHeight;
      anim.translateX(windowHeight).step();
      this.setData({
        isShowVideoFooter: false,

        videoBodyHeight: this.data.videoBodyHeight + event.scrollTop,
        tabbarContentHeight: this.data.tabsHeight,
        menuAnim: anim.export(),
      });
    } else if (event.scrollTop == 0) {
      let anim = wx.createAnimation({
        timingFunction: 'ease-in-out',
        duration: 200,
        delay: 0,
      });
      anim.translateX(0).step();
      this.setData({
        menuAnim: anim.export(),
        isShowVideoFooter: true,
        videoBodyHeight: this.data.videoBodyHeight - 55,

        tabbarContentHeight: this.data.tabsHeight + this.data.videoFooterHeight,
      });
    }
  },
});
