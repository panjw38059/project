<template>
  <div id="detail">
    <detail-nav-bar class="nav-bar-detail"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods = "Goods"></detail-base-info>
      <detail-shop-info :shop="Shop"></detail-shop-info>
      <detail-goods-info :detailInfo = "detailInfo" @imageLoad = "imageLoad"></detail-goods-info>
      <detail-param-info :paramInfo = "paramsInfo"></detail-param-info>
    </scroll>
  </div>
</template>


<script>
import {getDetailData} from "network/detail"
import DetailNavBar from "./children/DetailNavBar";
import DetailSwiper from "@/views/detail/children/DetailSwiper";
import {GoodsInfo, GoodsParam, Shop} from "@/network/detail";
import DetailBaseInfo from "@/views/detail/children/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/children/DetailShopInfo";
import Scroll from "@/components/common/scroll/Scroll";
import DetailGoodsInfo from "@/views/detail/children/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/children/DetailParamInfo";

export default {
  name: "Detail",
  components: {DetailParamInfo, DetailGoodsInfo, Scroll, DetailShopInfo, DetailBaseInfo, DetailSwiper, DetailNavBar},
  data() {
    return {
      iid: null,
      topImages:[],
      Goods:{},
      Shop:{},
      detailInfo:{},
      paramsInfo:{},
    }
  },
  created() {
    this.iid = this.$route.query.iid
    getDetailData(this.iid).then((res) => {
      const data = res.result
      this.topImages = res.result.itemInfo.topImages
      this.Goods = new GoodsInfo(data.itemInfo,data.columns,data.shopInfo.services)
      this.Shop = new Shop(data.shopInfo)
      this.detailInfo =data.detailInfo
      this.paramsInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
    })
  },
  methods:{
    imageLoad(){
      this.$refs.scroll.refresh()
    }
  }
}
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content{
  height: calc(100% - 44px);
}
.nav-bar-detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>
