<template>
  <div class="detail-swiper">
    <swiper class="swiper-index">
      <SwiperItem class="swiper-item" v-for="item in topImages">
        <img :src="item">
      </SwiperItem>
    </swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from "components/common/swiper";
export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.swiper-index{
 height: 300px;
  overflow: hidden;
}
</style>
