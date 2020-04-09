// pages/show-videos/show-videos.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navData: [
      {
        text: '章节',
      },
      {
        text: '笔记',
      },
      {
        text: '评价',
      },
    ],
    tabsHeight:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function(options) {
        this.computeTabsHeight()
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
    query.select('.page-videos').boundingClientRect();
    query.exec(res => {
      let videosHeight = res[0].height;
      let windowHeight = wx.getSystemInfoSync().windowHeight;
      let tabsHeight =
        windowHeight - videosHeight;

      console.log(
        '%c┍--------------------------------------------------------------┑',
        `color:red`,
      );
      console.log(`=====>动态计算tabsHeight值为=====>`, tabsHeight);

      console.log(
        '%c┕--------------------------------------------------------------┙',
        `color:red`,
      );
        this.setData({tabsHeight:tabsHeight});
    });
  },
});
