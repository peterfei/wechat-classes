import {capitalize, logMethodAsync} from '../../utils/util';
import regeneratorRuntime from '../../regenerator-runtime/runtime.js';
import {token, contentType} from '../../global';
const app = getApp();
const DEFAULT_PAGE = 0;
Page({
  startPageX: 0,
  currentView: DEFAULT_PAGE,
  /**
   * 页面的初始数据
   */
  data: {
    surveyResults: [],
    navScrollLeft: 0,
    toView: `s_${DEFAULT_PAGE}`,
  },

  touchStart(e) {
    this.startPageX = e.changedTouches[0].pageX;
  },
  prev(e) {
    this.currentView = this.currentView !== 0 ? this.currentView - 1 : 0;
    this.setData({
      toView: `s_${this.currentView}`,
      currentPage: this.currentView,
    });
  },
  next(e) {
    logMethodAsync('next事件:', e);
    const maxPage = this.data.surveyResults.length - 1;
    this.currentView =
      this.currentView !== maxPage ? this.currentView + 1 : maxPage;
    this.setData({
      toView: `s_${this.currentView}`,
      currentPage: this.currentView,
    });
  },
  touchEnd(e) {
    logMethodAsync('touchEnd事件:', e);
    const moveX = e.changedTouches[0].pageX - this.startPageX;
    const maxPage = this.data.surveyResults.length - 1;
    if (Math.abs(moveX) >= 20) {
      if (moveX > 0) {
        this.currentView = this.currentView !== 0 ? this.currentView - 1 : 0;
      } else {
        this.currentView =
          this.currentView !== maxPage ? this.currentView + 1 : maxPage;
      }
    }
    this.setData({
      toView: `s_${this.currentView}`,
      currentPage: this.currentView,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    let {survey_id, id} = options;

    let systemInfo = await wx.getSystemInfo();
    this.setData({
      survey_id: survey_id,
      classes_id: id,
      windowWidth: systemInfo.windowWidth,
      currentPage: this.currentView,
    });
    this.loadData();
    /**
     * TODO 切换至下一题时,更改title 标题
     *
     */
  },

  loadData: async function() {
    let _data = {
      survey_id: this.data.survey_id,
      classes_id: this.data.classes_id,
      is_rand: 1,
    };
    const result = await app.initClassPromise.userSurvey(
      token,
      _data,
      contentType,
    );
    logMethodAsync('当前获取到的列表', result);
    this.setData({
      surveyResults: result.result_data.question,
      totalPage: result.result_data.question.length - 1,
    });
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
});
