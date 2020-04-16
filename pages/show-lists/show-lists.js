import {capitalize, logMethodAsync} from '../../utils/util';
import regeneratorRuntime from '../../regenerator-runtime/runtime.js';
import {token, contentType} from '../../global';
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    itemResults: [],
    currentPage: 1,
    pageSize: 20,
    result_data: [],
    loaded: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let {id, type} = options;
    this.setData({
      id: id,
      type: type,
    });
    this.loadData();
  },

  /**
   * 上拉加载更多
   *
   */
  loadMoreData: async function(e) {
    logMethodAsync('加载更多', e);

    this.setData({currentPage: this.data.currentPage + 1});
    this.loadData();
  },

  async loadData() {
    let _data = {
      id: this.data.id,
      page: this.data.currentPage,
      page_size: this.data.pageSize,
    };
    let result = await app.initClassPromise[
      `show${capitalize(this.data.type, true)}Lists`
    ](token, _data, contentType);
    let newResult = result.result_data;
    if (result.result_data != 20001) {
      try {
        if (result.result_data.length > 0) {
          logMethodAsync('当前列表数据', result);
          this.setData({
            result_data: [...this.data.result_data, ...newResult],
          });
        }
      } catch (e) {
          this.setData({
              loaded:true
          })
      }
    }
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
