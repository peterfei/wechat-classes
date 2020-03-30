//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    src: '../../images/index/default.png',
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    showMoreBtn: false,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs',
    });
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      });
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        });
      };
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
          });
        },
      });
    }
  },
  getUserInfo: function(e) {
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    });
  },
  showOtherBtns: function(e) {
    //点击Header后显示更多级按钮
    this.setData({
      showMoreBtn: true,
    });
  },

  //////
  // 班级搜索 //
  //////

  searchCls: function(e) {
    this.setData({
      showMoreBtn: false,
    });
  },
  //////
  // 创建班级 //
  //////

  createCls: function(e) {
    this.setData({
      showMoreBtn: false,
    });
  },
  //////
  // 班级排序 //
  //////

  sortCls: function(e) {
    this.setData({
      showMoreBtn: false,
    });
  },

  touchmoveHandler: function(e) {
    console.log("点击空白"+e);
    this.setData({ //点击空白时触发
      showMoreBtn: false,
    });
  },

    showClsItems:function(e){
        wx.navigateTo({url:"../classes-details/classes-details"})
    }
});
