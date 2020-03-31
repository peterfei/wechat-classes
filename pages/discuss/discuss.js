const app = getApp();
Page({
  data: {
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
  },
  onLoad: function() {
    this.setData({});
  },
  tabChange(e) {
    console.log('tab change', e);
    if (e.detail.item.dataPage == 'home') {
      wx.redirectTo({
        url: '../classes-details/classes-details',
      });
    }
  },
});
