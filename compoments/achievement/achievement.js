// compoments/achievement.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    navData: [
      {
        text: '课程',
      },
      {
        text: '作业',
      },
      {
        text: '测验',
      },
      {
        text: '日常',
      },
      {
        text: '考试',
      }
    ],
    currentTab: 0,
    navScrollLeft: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchNav(event) {
      var cur = event.currentTarget.dataset.current;
      //每个tab选项宽度占1/5
      var singleNavWidth = this.data.windowWidth / 5;
      //tab选项居中
      this.setData({
        navScrollLeft: (cur - 2) * singleNavWidth,
      });
      if (this.data.currentTab == cur) {
        return false;
      } else {
        this.setData({
          currentTab: cur,
        });
      }
    },
    switchTab(event) {
      var cur = event.detail.current;
      var singleNavWidth = this.data.windowWidth / 5;
      this.setData({
        currentTab: cur,
        navScrollLeft: (cur - 2) * singleNavWidth,
      });
    },
  },

  lifetimes: {
    created: function() {
      wx.setNavigationBarTitle({
        title: '成绩',
      }); //动态设置navigationBar文字
    },
    attached: function() {
      // 在组件实例进入页面节点树时执行
      console.log(`======`);

      wx.getSystemInfo({
        success: res => {
          this.setData({
            pixelRatio: res.pixelRatio,
            windowHeight: res.windowHeight,
            windowWidth: res.windowWidth,
          });
        },
      });
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
});
