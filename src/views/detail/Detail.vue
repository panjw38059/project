<template>
  <div id="detail">
    <detail-nav-bar class="nav-bar-detail" @titleClick="titleClick" ref="detailNecv"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="Goods"></detail-base-info>
      <detail-shop-info :shop="Shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :paramInfo="paramsInfo" ref="params"></detail-param-info>
      <detail-comment-info :comment-info="commemtInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommendInfo" :is-recommend="true" ref="recommend"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar></detail-bottom-bar>
  </div>
</template>


<script>
import {getDetailData} from "network/detail"
import DetailNavBar from "./children/DetailNavBar";
import DetailSwiper from "@/views/detail/children/DetailSwiper";
import {getRecommend, GoodsInfo, GoodsParam, Shop} from "@/network/detail";
import DetailBaseInfo from "@/views/detail/children/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/children/DetailShopInfo";
import Scroll from "@/components/common/scroll/Scroll";
import DetailGoodsInfo from "@/views/detail/children/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/children/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/children/DetailCommentInfo";
import GoodsList from "@/components/content/goods/GoodsList";
import {debounce} from "@/common/utils";
import DetailBottomBar from "@/views/detail/children/DetailBottomBar";
import BackTop from "@/components/content/backtop/BackTop";

export default {
  name: "Detail",
  components: {
    BackTop,
    DetailBottomBar,
    GoodsList,
    DetailCommentInfo,
    DetailParamInfo, DetailGoodsInfo, Scroll, DetailShopInfo, DetailBaseInfo, DetailSwiper, DetailNavBar
  },
  data() {
    return {
      iid: null,
      topImages: [],
      Goods: {},
      Shop: {},
      detailInfo: {},
      paramsInfo: {},
      commemtInfo: {},
      recommendInfo: [],
      itemImageListener: null,
      themTopY: [0, 0, 0, 0],
      getThemTopY: null,
      currentIndex: 0,
      isShowBackTop:false
    }
  },
  created() {
    this.iid = this.$route.query.iid
    getDetailData(this.iid).then((res) => {
      const data = res.result
      this.topImages = res.result.itemInfo.topImages
      this.Goods = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services)
      this.Shop = new Shop(data.shopInfo)
      this.detailInfo = data.detailInfo
      this.paramsInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      if (data.rate.cRate != 0) {
        this.commemtInfo = data.rate.list[0]
      }
      getRecommend().then(res => {
        this.recommendInfo = res.data.list
      })
      // this.$nextTick(()=>{
      //   this.$set(this.themTopY,1,this.$refs.params.$el.offsetTop)
      //   this.$set(this.themTopY,2,this.$refs.comment.$el.offsetTop)
      //   this.$set(this.themTopY,3,this.$refs.recommend.$el.offsetTop)
      //   console.log(this.themTopY);
      // })
      this.getThemTopY = debounce(() => {
        this.$set(this.themTopY, 1, this.$refs.params.$el.offsetTop)
        this.$set(this.themTopY, 1, this.$refs.params.$el.offsetTop)
        this.$set(this.themTopY, 2, this.$refs.comment.$el.offsetTop)
        this.$set(this.themTopY, 3, this.$refs.recommend.$el.offsetTop)
        console.log(this.themTopY);
      },)
    })
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
      this.getThemTopY()
    },
    titleClick(index) {
      this.$refs.scroll.scrollToXY(0, -this.themTopY[index], 50)
    },
    contentScroll(position) {
      const y = -position.y
      for (let i = 0; i < this.themTopY.length; i++) {
        if (this.currentIndex != i && ((i < this.themTopY.length - 1 && y >= this.themTopY[i] && y < this.themTopY[i + 1]) || (i == this.themTopY.length - 1 && y > this.themTopY[i]))) {
          this.currentIndex = i
          this.$refs.detailNecv.currentIndex = this.currentIndex
        }
      }
      this.isShowBackTop = (-position.y) > 1000
    },
    backClick() {
      this.$refs.scroll.scrollToTop();
    },
  },
  mounted() {
    this.itemImageListener = () => {
      if (this.$refs.scroll) {
        // 图片加载完了
        //console.log("图片加载完了")
        debounce(this.$refs.scroll.refresh(), 50)
      }
    }
    this.$bus.$on("itemImageLoad", this.itemImageListener)
  },
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImageListener)
  },
  updated() {

  },
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.content {
  height: calc(100% - 44px);
  /*position: relative;*/
  /*z-index: 9;*/
  /*background-color: #fff;*/
}

.nav-bar-detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>
