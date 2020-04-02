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
    categoryItemLists: [
      {
        color:"rgb(1, 185, 248)",
        icon:"kecheng1",
        title: '课程',
        count: 85,
      },
      {
        color:"rgb(51,223,138)",
        icon:"zuoye1",
        title: '作业',
        count: 24,
      },
      {
        color:"rgb(255,109,77)",
        icon:"zuoye1",
        title: '测验',
        count: 75,
      },
      {
        color:"rgb(255,69,126	)",
        icon:"chengji",
        title: '资料',
        count: 75,
      },
      {
        color:"rgb(255,162,111)",
        icon:"chengyuan2",
        title: '成员',
        count: 108,
      },
    ],
    itemDiscuss: {
      title: 'C语言教学1班',
      sign: '置顶',
      created: '2020-04-01 17:37',
      content: '这是我的内容区域',
      contentImageSrc: '../../images/index/default.png',
      looked: 99,
      answered: 0,
    },
  },
  onLoad: function(options) {
    wx.stopPullDownRefresh();
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 3000);
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
    let result = [],
      itemResults = [];
    for (var i = 0, len = 10; i < len; i++) {
      result.push(this.data.item);
      itemResults.push(this.data.itemDiscuss);
    }
    this.setData({itemResult: result, itemDiscussResult: itemResults});
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
    query.select('.category-lists').boundingClientRect();
    query.select('.tabbar').boundingClientRect();
    query.exec(res => {
      let headerHeight = res[0].height;
      let categoryHeight = res[1].height;
      let tabbarHeight = res[2].height;
      let windowHeight = wx.getSystemInfoSync().windowHeight;
      let scrollHeight =
        windowHeight - headerHeight - categoryHeight - tabbarHeight;

      console.log(
        '%c┍--------------------------------------------------------------┑',
        `color:red`,
      );
      console.log(`=====>动态计算ScrollHeight值为=====>`, scrollHeight);

      console.log(
        '%c┕--------------------------------------------------------------┙',
        `color:red`,
      );
      this.setData({scrollHeight: scrollHeight, tabbarHeight: tabbarHeight});
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
