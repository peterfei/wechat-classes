const app = getApp();

Page({
  data: {
    src: '../../images/index/default.png',
    list: [
      {
        text: '首页',
        iconPath: '../../images/icons/home.png',
        selectedIconPath: '../../images/icons/home-selected.png',
        dot: true,
        dataPage: 'home',
      },
      {
        text: '讨论',
        iconPath: '../../images/icons/talk.png',
        selectedIconPath: '../../images/icons/talk-selected.png',
        dot: true,
        dataPage: 'discuss',
      },
    ],
    scrollHeight: 0,
    showHome: true,
    showDiscuss: false,
  },

  tabChange(e) {
    console.log('tab change', e);

    if (e.detail.item.dataPage == 'discuss') {
      this.setData({
        showHome: false,
        showDiscuss: true,
      });
    } else {
      this.setData({
        showHome: true,
        showDiscuss: false,
      });
    }
  },
  onReady: function() {
    this.computeScrollViewHeight();
  },

  /**
   * 动态计算ScrollView 的Height 值；
   * 2020-03-31 10:09
   * by peterfeispace@gmail.com
   */

  computeScrollViewHeight() {
    let that = this;
    let query = wx.createSelectorQuery().in(this);
    query.select('.header').boundingClientRect();
    query.select('.category').boundingClientRect();
    query.exec(res => {
      let headerHeight = res[0].height;
      let categoryHeight = res[1].height;
      let windowHeight = wx.getSystemInfoSync().windowHeight;
      let scrollHeight = windowHeight - headerHeight - categoryHeight - 10 - 40;

      console.log(
        '%c┍--------------------------------------------------------------┑',
        `color:red`,
      );
      console.log(`=====>动态计算ScrollHeight值为=====>`, scrollHeight);

      console.log(
        '%c┕--------------------------------------------------------------┙',
        `color:red`,
      );
      this.setData({scrollHeight: scrollHeight});
    });
  },
});
