<template>
  <div>
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods = "Goods"></detail-base-info>
  </div>
</template>


<script>
import {getDetailData} from "network/detail"
import DetailNavBar from "./children/DetailNavBar";
import DetailSwiper from "@/views/detail/children/DetailSwiper";
import {GoodsInfo} from "@/network/detail";
import DetailBaseInfo from "@/views/detail/children/DetailBaseInfo";

export default {
  name: "Detail",
  components: {DetailBaseInfo, DetailSwiper, DetailNavBar},
  data() {
    return {
      iid: null,
      topImages:[],
      Goods:{}
    }
  },
  created() {
    this.iid = this.$route.query.iid
    getDetailData(this.iid).then((res) => {
      const data = res.result
      this.topImages = res.result.itemInfo.topImages
      this.Goods = new GoodsInfo(data.itemInfo,data.columns,data.shopInfo.services)
    })
  }
}
</script>

<style scoped>

</style>
