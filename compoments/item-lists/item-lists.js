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
      triggered:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

      console.log('=======onPullDownRefresh in item-lists========')
      setTimeout(() => {
          this.setData({
              triggered:false
          })
      }, 3000);
    },
  },

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
        isObjectNull: this.properties.itemObj == null,
      });
    },
  },
});
