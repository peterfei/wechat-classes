// compoments/item-lists/item-lists.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemResult: {
      type: Array,
    },
    itemObj: {
      type: Object,
      value: null,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    isObjectNull: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {},

  lifetimes: {
    attached: function() {
      console.log(
        '%c┍--------------------------------------------------------------┑',
        `color:red`,
      );
      console.log(`itemResult's`, JSON.stringify(this.properties.itemObj));

      console.log(
        '%c┕--------------------------------------------------------------┙',
        `color:red`,
      );
      this.setData({
            isObjectNull:(this.properties.itemObj==null)
        })
    },
  },
});
