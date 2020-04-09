// compoments/achievement.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    navData: {
      type: Array,
    },
      containerHeight:{
          type:Number,
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentTab: 0,
    navScrollLeft: 0,
    tabBoxHeight:0,
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
    computeViewHeight() {
      let that = this;
      let query = wx.createSelectorQuery().in(this);
      query.select('.container').boundingClientRect();
      query.select('.nav').boundingClientRect();
      query.exec(res => {
        let containerHeight = res[0].height;
        if (containerHeight==0) {
            containerHeight = this.properties.containerHeight
        }
        let navHeight = res[1].height;
        let windowHeight = wx.getSystemInfoSync().windowHeight;
        let tabBoxHeight =
          containerHeight - navHeight;

        console.log(
          '%c┍--------------------------------------------------------------┑',
          `color:red`,
        );
        console.log(`=====>动态计算ScrollHeight值为=====>`,tabBoxHeight);

        console.log(
          '%c┕--------------------------------------------------------------┙',
          `color:red`,
        );
          this.setData({tabBoxHeight:tabBoxHeight});
      });
    },
    switchTab(event) {
      var cur = event.detail.current;
      var singleNavWidth = this.data.windowWidth / 5;
      this.setData({
        currentTab: cur,
        navScrollLeft: (cur - 2) * singleNavWidth,
      });
    },
    onMyAchieve: function(e) {
      console.log(`<====Achievenment's onMyAchieve=====>`, e);
      this.triggerEvent('myclsachieve', {id: e.detail.id}, {});
    },
  },

  lifetimes: {
      ready: function() {

          this.computeViewHeight()
      },
    attached: function() {
      // 在组件实例进入页面节点树时执行

      wx.getSystemInfo({
        success: res => {
          console.log(
            '%c┍--------------------------------------------------------------┑',
            `color:red`,
          );
          console.log(
            `%c======>windowWidth====>`,
            'color:blue',
            res.windowWidth,
          );

          console.log(
            '%c┕--------------------------------------------------------------┙',
            `color:red`,
          );
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
