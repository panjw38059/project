<template>
<div>
  <div class="home-recommend">
    <div v-for="item in reconmend" :key = 'item.link' class="recommend-item">
      <a :href="item.link">
        <img :src="item.image">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "HomeReconmend",
  props:{
    reconmend:{
      type:Array,
      default(){
        return []
      }
    }
  },
  created() {
    //console.log(this.reconmend);
  }
}
</script>

<style scoped>
.home-recommend{
  display: flex;
  width: 100%;
  font-size: 14px;
  text-align: center;
  padding: 5px 0 5px;
  border-bottom: 5px solid #eee;
}
.recommend-item{
  flex: 1;
}
.recommend-item img{
  width: 75px;
  height: 75px;
  margin-bottom: 10px;
}
</style>
