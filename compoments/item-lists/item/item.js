// compoments/item-lists/item/item.js
import {baseUrl, baseImageUrl} from '../../../global';
Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    itemObj: {type: Object},
    isHeader:{type:Boolean}
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {},
  lifetimes: {
    attached: function() {
      this.setData({
        baseUrl: baseUrl,
        baseImageUrl: baseImageUrl,
      });
    },
  },
});
