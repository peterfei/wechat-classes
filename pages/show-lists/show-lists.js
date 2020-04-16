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

    this.setNavigationName(type);
  },

  setNavigationName: function(type) {
    switch (type) {
      case 'video':
        wx.setNavigationBarTitle({
          title: '视频列表',
        });
        break;
      case 'survey':
        wx.setNavigationBarTitle({
          title: '测验列表',
        });
        break;
      case 'user':
        wx.setNavigationBarTitle({
          title: '成员列表',
        });
        break;
      case 'article':
        wx.setNavigationBarTitle({
          title: '资料列表',
        });
        break;
      case 'task':
        wx.setNavigationBarTitle({
          title: '作业列表',
        });
        break;
      default:
    }
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
    let newResult = [];
    if (result.result_data != 20001) {
      try {
        if (result.result_data.length > 0) {
          logMethodAsync('当前列表数据', result);
          result.result_data.forEach((_data, _index) => {
            let newData = _data;
            newData['type'] = this.data.type; //组装新属性
            newData['class_type'] = `${this.data.type}s`;
            newResult.push(newData);
          });
          this.setData({
            result_data: [...this.data.result_data, ...newResult],
          });
        }
      } catch (e) {
        this.setData({
          loaded: true,
        });
      }
    }
  },
  async changeItem(e) {
    /**
     * 动态跳转页面
     *
     */
    /*'../show-videos/show-videos?id=' +
        this.data.id +
        '&video_id=' +
        e.detail.item.id,*/
    wx.navigateTo({
      url: `../show-${e.detail.item.type}s/show-${e.detail.item.type}s?id=${this.data.id}&${e.detail.item.type}_id=${e.detail.id}`,
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
