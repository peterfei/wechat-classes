import {contentType, token} from '../../global';
import regeneratorRuntime from '../../regenerator-runtime/runtime.js';
const app = getApp();
// pages/show-videos/show-videos.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isShowVideoFooter: true,
    navData: [
      {
        text: '章节',
        children: [
          {
            name: '111',
          },
          {
            name: '111',
          },
          {
            name: '111',
          },
          {
            name: '111',
          },
          {
            name: '111',
          },
          {
            name: '111',
          },
          {
            name: '111',
          },
          {
            name: '111',
          },
          {
            name: '111',
          },
          {
            name: '111',
          },
          {
            name: '111',
          },
        ],
      },
      {
        text: '笔记',
      },
      {
        text: '评价',
      },
    ],
    tabsHeight: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    this.computeTabsHeight();
    let video_id = options.video_id;
    let classes_id = options.id;
    const videoInfo = await app.initClassPromise.showVideoInfo(
      token,
      {video_id: video_id, classes_id: classes_id},
      contentType,
    );
    console.log(
      `%c===videoInfo Obj===%s`,
      'color:#888',
      JSON.stringify(videoInfo),
    );
    this.setData({
      url: videoInfo.result_data.url,
        videoInfo:videoInfo.result_data
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
          delay: 0
        })
      anim.translateX(-this.data.tabsHeight).step();
      this.setData({
        isShowVideoFooter: false,

        videoBodyHeight: this.data.videoBodyHeight + event.scrollTop,
        tabbarContentHeight: this.data.tabsHeight,
        menuAnim: anim.export()
      });
    } else if (event.scrollTop == 0) {

      let anim = wx.createAnimation({
          timingFunction: 'ease-in-out',
          duration: 200,
          delay: 0
        })
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
