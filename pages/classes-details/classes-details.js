import {capitalize} from '../../utils/util';
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
      {
        text: '互动',
        iconPath: '../../images/icons/interaction.png',
        selectedIconPath: '../../images/icons/interaction-selected.png',
        dot: true,
        dataPage: 'interaction',
      },
      {
        text: '成绩',
        iconPath: '../../images/icons/achievement.png',
        selectedIconPath: '../../images/icons/achievement-selected.png',
        dot: true,
        dataPage: 'achievement',
      },
    ],
    scrollHeight: 0,
    showHome: true,
    showDiscuss: false,
    showInteraction: false,
    showAchievement: false,
    triggered: false,
    disTriggered: true,
    item: {
      src: '../../images/index/default.png',
      title: 'C语言教学1班',
      subtitle: '2020-04-01 17:37',
      desc: '我上传的文档',
    },
  },

  tabChange(e) {
    for (let l of this.data.list) {
      if (e.detail.item.dataPage == l.dataPage) {
        wx.setNavigationBarTitle({
          title: l.text,
        }); //点击重新定义navigationBar
        let k = `show${capitalize(l.dataPage, true)}`;
        this.setData({
          [k]: true,
        });
      } else {
        let k = `show${capitalize(l.dataPage, true)}`;
        this.setData({
          [k]: false,
        });
      }
    }
  },
  onReady: function() {
    this.computeScrollViewHeight();
    let result = []
    for (var i = 0, len = 10; i < len; i++) {
        result.push(this.data.item)
    }
    this.setData({itemResult:result})
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
