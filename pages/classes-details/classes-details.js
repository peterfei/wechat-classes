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
      {
        text: '互动',
        iconPath: '../../images/icons/interaction.png',
        selectedIconPath: '../../images/icons/interaction-selected.png',
        dot: true,
        dataPage: 'interaction',
      },
    ],
    scrollHeight: 0,
    showHome: true,
    showDiscuss: false,
    showInteraction: false,
    triggered: false,
    disTriggered: true,
  },

  tabChange(e) {
    console.log('tab change', e);

    if (e.detail.item.dataPage == 'discuss') {
      this.setData({
        showHome: false,
        showDiscuss: true,
        showInteraction: false,
      });
    } else if (e.detail.item.dataPage == 'interaction') {
      this.setData({
        showInteraction: true,
        showHome: false,
        showDiscuss: false,
      });
    } else {
      this.setData({
        showHome: true,
        showDiscuss: false,
        showInteraction: false,
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

  refreshpulling: function(e) {
    console.log(`======下拉刷新2=======`);
    setTimeout(() => {
      this.setData({
        triggered: false,
        disTriggered: false,
      });
    }, 3000);
  },
});
