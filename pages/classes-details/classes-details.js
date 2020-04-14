import {capitalize, logMethodAsync} from '../../utils/util';
import regeneratorRuntime from '../../regenerator-runtime/runtime.js';
import {token, contentType} from '../../global';
import '../../utils/lodash';
let _ = require('lodash');
const app = getApp();

Page({
  data: {
    interfaceData: ['Detail', 'Info'],
    navData: [
      {
        text: '课程',
        children: [
          {
            id: 1,
            title: '课程介绍',
            status: '未学习',
          },
          {
            id: 2,
            title: '课程介绍',
            status: '未学习',
          },
          {
            id: 3,
            title: '课程介绍',
            status: '未学习',
          },
          {
            id: 4,
            title: '课程介绍',
            status: '未学习',
          },
          {
            id: 5,
            title: '课程介绍',
            status: '未学习',
          },
          {
            id: 6,
            title: '课程介绍',
            status: '未学习',
          },
          {
            id: 7,
            title: '课程介绍',
            status: '未学习',
          },
          {
            id: 8,
            title: '课程介绍',
            status: '未学习',
          },
        ],
      },
      {
        text: '作业',
        children: [
          {
            title: '作业介绍',
            status: '未学习',
          },
        ],
      },
      {
        text: '测验',
        children: [
          {
            title: '测验介绍',
            status: '未学习',
          },
        ],
      },
      {
        text: '日常',
        children: [
          {
            title: '日常介绍',
            status: '未学习',
          },
        ],
      },
      {
        text: '考试',
        children: [
          {
            title: '考试介绍',
            status: '未学习',
          },
        ],
      },
    ],
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
      {
        text: '考勤',
        iconPath: '../../images/icons/records.png',
        selectedIconPath: '../../images/icons/records-selected.png',
        dot: true,
        dataPage: 'records',
      },
    ],
    scrollHeight: 0,
    showHome: true,
    showDiscuss: false, // 讨论
    showInteraction: false, //互动
    showAchievement: false, //成绩
    showRecords: false, //考勤
    triggered: false,
    disTriggered: true,
    item: {
      id: 0,
      avatar: '../../images/index/default.png',
      name: '',
      subtitle: '',
      desc: '',
    },
    categoryItemLists: [
      {
        color: 'rgb(1, 185, 248)',
        icon: 'kecheng1',
        title: '课程',
        count: 85,
      },
      {
        color: 'rgb(51,223,138)',
        icon: 'zuoye1',
        title: '作业',
        count: 24,
      },
      {
        color: 'rgb(255,109,77)',
        icon: 'zuoye1',
        title: '测验',
        count: 75,
      },
      {
        color: 'rgb(255,69,126	)',
        icon: 'chengji',
        title: '资料',
        count: 75,
      },
      {
        color: 'rgb(255,162,111)',
        icon: 'chengyuan2',
        title: '成员',
        count: 108,
      },
    ],
    itemDiscuss: {
      id: 999,
      title: 'C语言教学1班',
      sign: '置顶',
      created: '2020-04-01 17:37',
      content: '这是我的内容区域',
      contentImageSrc: '../../images/index/default.png',
      looked: 99,
      answered: 0,
    },
    itemRecords: [
      {
        title: '2020-04-03 14:43 考勤',
        label1: '发起时间',
        label1Value: '2020-04-03 14:45',
        label2: '类型',
        label2Value: '二维码考勤',
      },
      {
        title: '2020-04-03 14:43 考勤',
        label1: '发起时间',
        label1Value: '2020-04-03 14:45',
        label2: '类型',
        label2Value: '二维码考勤',
      },
      {
        title: '2020-04-03 14:43 考勤',
        label1: '发起时间',
        label1Value: '2020-04-03 14:45',
        label2: '类型',
        label2Value: '二维码考勤',
      },
      {
        title: '2020-04-03 14:43 考勤',
        label1: '发起时间',
        label1Value: '2020-04-03 14:45',
        label2: '类型',
        label2Value: '二维码考勤',
      },
      {
        title: '2020-04-03 14:43 考勤',
        label1: '发起时间',
        label1Value: '2020-04-03 14:45',
        label2: '类型',
        label2Value: '二维码考勤',
      },
    ],
    classRecords: [
      {
        count: 0,
        name: '考勤',
      },
      {
        count: 0,
        name: '出勤',
      },
      {
        count: 0,
        name: '出勤率',
      },
      {
        count: 0,
        name: '迟到',
      },
      {
        count: 0,
        name: '旷课',
      },
      {
        count: 0,
        name: '请假',
      },
      {
        count: 0,
        name: '早退',
      },
    ],
    id: 0,
  },
  onLoad: function(options) {
    wx.stopPullDownRefresh();
    this.setData({
      id: options.id,
    });
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.loadData();
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 100);
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
      /*result.push(this.data.item);*/
      itemResults.push(this.data.itemDiscuss);
    }
    this.setData({itemDiscussResult: itemResults});

    console.log(`====> id <====`, this.data.id);
    this.loadData();
  },
  loadData() {
    const handler = {
      apply: async function(target, ctx, args) {
        let _that = args[1];
        let _d = {id: +_that.data.id};
        let data = await app.initClassPromise[`getClasses${args[0]}`](
          token,
          _d,
          contentType,
        );
        if (data.result_data.length > 0) {
          console.group('得到的班级信息列表数据');
          console.log(data);
          console.groupEnd();
          _that.setData({
            itemResult: data.result_data,
          });
        } else {
          _that.setData({
            item: data.result_data,
          });
        }
      },
    };
    /*
     * 动态调用函数
     * e.g.
     * this.getClassesInfo()
     * this.getClassesIndex()
     */
    this.data.interfaceData.forEach(func => {
      //this[`getClasses${func}`]();
      const _p = new Proxy(() => {}, handler);
      _p(func, this);
    });
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
      this.setData({
        scrollHeight: scrollHeight,
        tabbarHeight: tabbarHeight,
        windowHeight: windowHeight,
      });
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

  onMyClsAchieve: function(e) {
    console.log(`<====on ClassDetail Achievenment's onMyAchieve=====>`, e);
    console.log(`==>当前点击ID <==`, e.detail.id);
  },

  onMyInteraction: function(e) {
    console.log(`==>当前点击ID <==`, e.detail.id);
    console.group(`当前打印的值:`);
    console.log(`%c%s`, 'color:blue', JSON.stringify(e.detail.item));
    console.groupEnd();
    if (e.detail.item.class_type) {
      let showPage = `show-${e.detail.item.class_type}`;
      let classTypeToSubS = e.detail.item.class_type.substring(
        0,
        e.detail.item.class_type.length - 1,
      ); //去除末尾s
      wx.navigateTo({
        url: `../${showPage}/${showPage}?id=${this.data.id}&${classTypeToSubS}_id=${e.detail.item.id}`,
      });
    }
  },
});
