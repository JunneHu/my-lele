<template>
    <div class="home-page">
        <div class="search_box">
            <van-icon name="add-o" @click="showPopup" />
            <form action="">
                <van-icon name="search" />
                <input type="search" class="" placeholder="搜索商品" @keypress="selectGoods" v-model.trim="searchValue" />
            </form>
            <van-icon name="envelop-o" @click="pushPath('/message')"><span v-if="msgNum" class="msg-num">{{msgNum}}</span></van-icon>
        </div>
        <van-swipe :autoplay="3000" indicator-color="white" class="benner-bg">
            <van-swipe-item v-for="(item,index) in indexProduct.banners" :key="index">
                <a :href="item.url"><img :src="item.img" /></a>
            </van-swipe-item>
        </van-swipe>
        <div class="notice-bg">
            <span class="left-icon">
                <img src="../../assets/images/home/notice_icon.png" alt="" />
            </span>
            <div class="notice-list">
                <van-swipe :autoplay="3000" vertical :show-indicators="false" :height="30">
                    <van-swipe-item v-for="(item,index) in indexProduct.notices" :key="index">
                        {{item.noticeTitle}}
                    </van-swipe-item>
                </van-swipe>
            </div>
        </div>
        <div class="mall_classify">
            <ul>
                <li v-for="(item,index) in classifyList" v-if="index<10" @click="pushPath(item.path)" :key="index">
                    <div class="img-bg"><img :src="item.classifyImg" alt=""></div>
                    <div class="class-info">{{item.classifyName}}</div>
                </li>
            </ul>
        </div>
        <van-list
            v-model="loading"
            v-if="productList.length > 0"
            :finished="finished"
            finished-text="--我是有底线的--"
            :offset="70"
            @load="loadMore"
        >
            <ul class="product-list">
                <li v-for="item in productList" :key="item.id" @click="pushPath('/productDetail/'+item.id)">
                    <img :src="item.productImg" />
                    <div class="pro-name text_hide_two">{{item.productName}}</div>
                    <div class="pro-info">
                        <span class="pro-price">￥{{item.productPrice}}</span>
                        <span class="pro-sale">已售：{{item.productSale}}</span>
                    </div>
                </li>
            </ul>
        </van-list>
        <div class="no_data" v-show="isLoad&&productList.length==0">
          <van-icon name="bulb-o" />
          <div>暂无数据</div>
        </div>
        <!--显示左上角功能弹窗-->
        <van-popup class="pop-page" v-model="showPop" position="bottom">
            <ul>
                <template v-for="(item,index) in popList">
                    <li v-if="item.path === 'first'" @click="mallPopup=false" :key="index">
                        <img :src="item.url" alt="">
                        <span>{{item.name}}</span>
                    </li>
                    <li v-else-if="item.path === null" @click="location.reload()" :key="index">
                        <img :src="item.url" alt="">
                        <span>{{item.name}}</span>
                    </li>
                    <li v-else @click="pushPath(item.path)" :key="index">
                        <img :src="item.url" alt="">
                        <span>{{item.name}}</span>
                    </li>
                </template>
            </ul>
        </van-popup>
    </div>
</template>
<script>
export default {
  name: "home",
  data() {
    return {
      showPop: false,
      msgNum: 12,
      indexData: {},
      indexProduct: {},
      productList: [],
      isLoad: false,
      loading: false,
      finished: true,
      searchData: {
        //分页属性
        pageNo: 1, //当前页
        pageSize: 10, //每页10条
        productType: "",
        orderType: 2
      },
      classifyList: [
        {
          classifyImg: require("../../assets/images/home/classify_1.png"),
          classifyName: "淘宝",
          path: "/hyperlink/tb"
        },
        {
          classifyImg: require("../../assets/images/home/classify_2.png"),
          classifyName: "天猫",
          path: "/hyperlink/tm"
        },
        {
          classifyImg: require("../../assets/images/home/classify_3.png"),
          classifyName: "京东",
          path: "/hyperlink/jd"
        },
        {
          classifyImg: require("../../assets/images/home/classify_5.png"),
          classifyName: "拼多多",
          path: "/hyperlink/pdd"
        },
        {
          classifyImg: require("../../assets/images/home/classify_10.png"),
          classifyName: "商圈",
          path: "/tradingArea"
        },
        {
          classifyImg: require("../../assets/images/home/classify_6.png"),
          classifyName: "大笨象",
          path: "/allClassify"
        },
        {
          classifyImg: require("../../assets/images/home/classify_7.png"),
          classifyName: "VIP专区",
          path: "/mallOthers/1"
        },
        {
          classifyImg: require("../../assets/images/home/classify_8.png"),
          classifyName: "享豆商城",
          path: "/mallOthers/3"
        },
        {
          classifyImg: require("../../assets/images/home/classify_9.png"),
          classifyName: "商城合伙人",
          path: "/merchantService"
        },
        {
          classifyImg: require("../../assets/images/home/classify_11.png"),
          classifyName: "APP下载",
          path: "/downloadApp"
        }
      ],
      popList: [
        {
          url: require("../../assets/images/home/mall_popup_1.png"),
          path: "first",
          name: "商城首页"
        },
        {
          url: require("../../assets/images/home/mall_popup_2.png"),
          path: "/center",
          name: "个人中心"
        },
        {
          url: require("../../assets/images/home/mall_popup_3.png"),
          path: "/awardRecord",
          name: "奖励记录"
        },
        {
          url: require("../../assets/images/home/mall_popup_4.png"),
          path: "/myAssets",
          name: "我的享豆"
        },
        {
          url: require("../../assets/images/home/mall_popup_5.png"),
          path: "/popularize",
          name: "推广二维码"
        },
        {
          url: require("../../assets/images/home/mall_popup_6.png"),
          path: null,
          name: "扫一扫"
        },
        {
          url: require("../../assets/images/home/mall_popup_7.png"),
          path: "reload",
          name: "清除缓存"
        },
        {
          url: require("../../assets/images/home/mall_popup_8.png"),
          path: "reload",
          name: "刷新"
        }
      ]
    };
  },
  computed: {
    searchValue: {
      get() {
        return this.$store.state.searchValue;
      },
      set(newValue) {
        this.$store.state.searchValue = newValue;
      }
    }
  },
  mounted() {
    this.getIndexData();
    this.selectIndexProduct();
    this.selectMallProductList();
    this.$store.commit("updateNeedShowFooter", true);
    this.$store.commit("updateSelected", 0);
  },
  methods: {
    showPopup() {
      this.showPop = true;
    },
    getIndexData() {
      this.$axios(this.$api.getIndexData).then(res => {
        if (res.code == 0) {
          this.indexData = res.data;
          this.$store.commit("updateIndexData", res.data);
        }
      });
    },
    selectIndexProduct() {
      this.$axios(this.$api.selectIndexProduct).then(res => {
        if (res.code == 0) {
          this.indexProduct = res.data;
        }
      });
    },
    selectMallProductList() {
      this.searchData.pageNo = 1;
      this.isLoad = false;
      this.$axios(this.$api.selectMallProductList, this.searchData).then(
        res => {
          this.isLoad = true;
          this.loading = false;
          if (res.code == 0) {
            if (res.data.list && res.data.list.length > 0) {
              this.productList = res.data.list;
              this.finished = this.searchData.pageNo == res.data.pageCount;
            } else {
              this.productList = [];
            }
          }
        }
      );
    },
    loadMore() {
      this.searchData.pageNo += 1;
      this.$axios(this.$api.selectMallProductList, this.searchData).then(
        res => {
          this.loading = false;
          if (res.code === 0) {
            if (res.data.list && res.data.list.length > 0) {
              this.productList = this.productList.concat(res.data.list);
              this.finished = this.searchData.pageNo == res.data.pageCount;
            }
          }
        }
      );
    },
    selectGoods() {
      if (event.keyCode == "13") {
        event.preventDefault();
        if (this.searchValue == "") {
          Toast({ message: "请输入您要搜索的内容", position: "bottom" });
        } else {
          this.$router.push("/productList");
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.home-page {
    padding-top: 50px;
  .search_box {
    background: #ff6b3f;
    position: fixed;
    height: 50px;
    width: 100%;
    padding: 10px 3% 6px;
    box-sizing: border-box;
    z-index: 10;
    display: flex;
    align-items: center;
    top: 0;
    left: 0;
    & > .van-icon {
      position: relative;
      flex: 1;
      max-width: 30px;
      font-size: 28px;
      text-align: center;
      color: #fff;
      .msg-num {
        position: absolute;
        top: -8px;
        right: -8px;
        width: 20px;
        height: 20px;
        color: #ff6b3f;
        z-index: 11;
        font-size: 10px;
        background: #fff;
        border-radius: 50%;
        line-height: 18px;
        text-align: center;
        overflow: hidden;
      }
    }
    form {
      flex: 1;
      height: 100%;
      margin: 0 10px;
      border-radius: 4px;
      padding: 0 5px;
      box-sizing: border-box;
      background: #f5f6f6;
      display: flex;
      input {
        margin-left: 5px;
        flex: 1;
        height: 100%;
        background: #f5f6f6;
        border: none;
        color: #999;
      }
      .van-icon {
        max-width: 20px;
        min-width: 20px;
        margin-left: 5px;
        flex: 1;
        font-size: 20px;
        line-height: 34px;
        text-align: center;
        color: #999;
      }
    }
  }
}
.pop-page {
  ul {
    overflow: hidden;
    background-color: #fff;
    padding-bottom: 10px;
    li {
      float: left;
      width: 25%;
      text-align: center;
      padding: 10px 0;
      img {
        width: 6vw;
        display: block;
        margin: 10px auto;
      }
    }
  }
}
.benner-bg {
  img {
    width: 100%;
    vertical-align: middle;
    pointer-events: none;
    max-height: 139px;
  }
}
.notice-bg {
  display: flex;
  padding: 5px 10px;
  align-items: center;
  background: #fff;
  .left-icon {
    flex: 1;
    max-width: 40px;
    padding-right: 10px;
    border-right: 1px solid #ddd;
  }
  .notice-list {
    width: 100%;
    height: 30px;
    line-height: 30px;
    letter-spacing: 1px;
    background-color: #fff;
    overflow: hidden;
    color: #666;
    flex: 1;
    padding-left: 10px;
    font-size: 14px;
  }
}
.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  line-height: 20px;
  li {
    flex: 1;
    max-width: 50%;
    min-width: 40%;
    margin-top: 5px;
    margin-right: 5px;
    padding: 10px;
    box-sizing: border-box;
    background: #fff;
    &:nth-of-type(2n) {
      margin-right: 0;
    }
    .pro-name {
      margin-top: 10px;
      display: block;
      color: #666;
    }
    .pro-info {
      display: flex;
      margin-top: 10px;
      .pro-price {
        width: 40%;
        color: #ff6b3f;
        font-size: 16px;
      }
      .pro-sale {
        width: 60%;
        color: #ccc;
        font-size: 14px;
        text-align: right;
      }
    }
  }
}
.mall_classify {
  margin-top: 5px;
  overflow: hidden;
  background: #fff;
  padding-bottom: 10px;
  li {
    float: left;
    width: 20%;
    text-align: center;
    padding-top: 10px;
    .img-bg {
      display: block;
      padding: 5px 5px 0;
      width: 75px;
      height: 75px;
    }
    .class-info {
      color: #666;
      font-size: 14px;
    }
  }
}
</style>