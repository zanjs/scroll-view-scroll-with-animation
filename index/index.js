const app = getApp()

Page({
  data: {
      tabList: ["测试1", "测试2", "测试3", "测试4", "测试5", "测试6"],
      selectTabIndex: 0,
      toScrollLeft: 0,
      itemInfo: {
          scrollLeft: 0,
          left: 0,
          screenWidth: 0,
          width: 0
      }
  },
  onLoad: function () {
      let _this = this;
      wx.getSystemInfo({
          success(res) {
              _this.data.itemInfo.screenWidth = res.screenWidth;
          }
      })
  },
    switchTab: function(e) {
        let {
            index
        } = e.target.dataset;
        if (index != undefined) {
            this.setData({
                selectTabIndex: index
            });
            this.getItemInfo(`#item${index}`);
        }
    },
    getItemInfo: function (item) {
        const query = wx.createSelectorQuery();
        let _this = this;
        query.select(item).boundingClientRect(function (res) {
            let { left, width } = res;
            _this.data.itemInfo.left = left;
            _this.data.itemInfo.width = width;
            _this.scrollTo();
        }).exec();
    },
    onScroll: function (e) {
        this.data.itemInfo.scrollLeft = e.detail.scrollLeft;
    },
    scrollTo: function () {
        let { scrollLeft, left, screenWidth, width } = this.data.itemInfo;
        let dis = left + width / 2 - screenWidth / 2;
        this.setData({
            toScrollLeft: scrollLeft + dis
        });
    }
})
