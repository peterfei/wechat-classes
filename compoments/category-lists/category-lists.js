// compoments/category-lists/category-lists.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    categoryItemLists: {
      type: Array,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    onShowList: function(e) {
      console.log(e);
      this.triggerEvent(
        'onShowList',
        {item: e.currentTarget.dataset.item},
        {},
      );
    },
  },
});
