<template>
<div class="tab-control">
  <div v-for="(item,index) in titles"
       class="tab-control-item"
       :class="{active:index === currentSelectIndex}"
       @click ="itemClick(index)" >
    <span>{{item}}</span>
  </div>
</div>
</template>

<script>
export default {
  name: "TabControl",
  props:{
    titles:{
      type:Array,
      default(){
        return[]
      }
    }
  },
  data(){
    return{
      currentSelectIndex:0
    }
  },
  methods:{
    itemClick(index){
      this.currentSelectIndex = index
      this.$emit("tabClick",index)
    }
  }
}
</script>

<style scoped>
.tab-control{
  display: flex;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
}
.tab-control-item{
  flex: 1;
  text-align: center;
}
.tab-control-item span{
  padding: 4px;
}
.active{
  color: var(--color-high-text);

}
.active span{
  border-bottom: 3px solid var(--color-tint);
}
</style>
