// compoments/sub-icons/sub-icons.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    iconType: {
      type: String,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    icon: {
      color: 'rgb(1, 185, 248)',
      icon: 'kecheng1',
      title: '课程',
      count: 85,
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {},

  lifetimes: {
    attached: function() {
      /**
       * @fn 根据icon type 类型来区别不同的图标
       * @param [] this.properties.iconType
       */
      switch (this.properties.iconType) {
        case 'surveys':
          this.setData({
            icon: {
              color: 'rgb(255,109,77)',
              icon: 'zuoye1',
            },
          });
          break;
        case 'videos':
          this.setData({
            icon: {
              color: 'rgb(1, 185, 248)',
              icon: 'kecheng1',
            },
          });
        case 'tasks':
          this.setData({
            icon: {
              color: 'rgb(51,223,138)',
              icon: 'zuoye1',
            },
          });
        default:
      }
    },
  },
});
