// compoments/item-lists/item-lists.js
import {baseUrl, baseImageUrl} from '../../global';
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
    isColumn: {
      // 列表横排或顺排
      type: Boolean,
      value: true,
    },
    isDiyLabel: {
      //自定义Label, 如考勤
      type: Boolean,
      value: false,
    },
    showDefaultSubIcon: {
      type: Boolean,
      value: false,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    isObjectNull: true,
    triggered: false,
    baseUrl: '',
    baseImageUrl: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
      console.log('=======onPullDownRefresh in item-lists========');
      setTimeout(() => {
        this.setData({
          triggered: false,
        });
      }, 3000);
    },

    onItemData: function(e) {
      console.log(`<======item-lists showClsItems==========>`, e);
      this.triggerEvent('myachieve', {id: e.currentTarget.id}, {});
    },
  },

  lifetimes: {
    attached: function() {
      console.log(
        '%c┍--------------------------------------------------------------┑',
        `color:red`,
      );
      console.log(`itemResult's`, JSON.stringify(this.properties));

      console.log(
        '%c┕--------------------------------------------------------------┙',
        `color:red`,
      );
      this.setData({
        isObjectNull: this.properties.itemObj == null,
        baseUrl: baseUrl,
        baseImageUrl: baseImageUrl,
      });
    },
  },
});
