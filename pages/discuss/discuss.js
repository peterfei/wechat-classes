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
        triggered: false,
      },
    ],
  },
  onLoad: function() {
    this.setData({});
  },
  refreshpulling: function(e) {
    console.log(`-------------`);
    setTimeout(() => {
      this.setData({triggered: false});
    }, 2000);
  },
});
