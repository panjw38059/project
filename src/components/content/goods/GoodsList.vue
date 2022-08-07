<template>
  <div class="goods-list">
    <goods-list-item v-for="(item,index) in goods"
                     :key="item.link"
                     :goodsItem="item"
                     @click.native= toDetail(item.iid) />
  </div>
</template>

<script>
import GoodsListItem from "components/content/goods/GoodsListItem";

export default {
  name: "GoodsList",
  components: {GoodsListItem},
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods:{
    toDetail(iid){
      console.log(iid)
      this.$router.push({
        path:"/detail",
        query:{
          iid
        }
      })
    }
  }

}
</script>

<style scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2px;
}
</style>
