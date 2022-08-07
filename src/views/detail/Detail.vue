<template>
  <div>
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
  </div>
</template>


<script>
import {getDetailData} from "network/detail"
import DetailNavBar from "./children/DetailNavBar";
import DetailSwiper from "@/views/detail/children/DetailSwiper";

export default {
  name: "Detail",
  components: {DetailSwiper, DetailNavBar},
  data() {
    return {
      iid: null,
      topImages:[],

    }
  },
  created() {
    this.iid = this.$route.query.iid
    getDetailData(this.iid).then((res) => {
      this.topImages = res.result.itemInfo.topImages
    })
  }
}
</script>

<style scoped>

</style>
