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
      },
      {
        text: '讨论',
        iconPath: '../../images/icons/talk.png',
        selectedIconPath: '../../images/icons/talk-selected.png',
        dot: true,
      },
    ],
  },

  tabChange(e) {
    console.log('tab change', e);
  },
});
