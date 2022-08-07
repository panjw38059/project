<template>
  <div class="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners='banners'></home-swiper>
      <home-reconmend :reconmend='reconmend'></home-reconmend>
      <home-feature></home-feature>
      <tab-control :titles='titles' class="tabcontrol" @tabClick=tabClick></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import homeSwiper from "./children/HomeSwiper";
import HomeReconmend from "./children/HomeReconmend";
import HomeFeature from "./children/HomeFeature";
import TabControl from "components/content/tabcontrol/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backtop/BackTop";

import {getHomeGoodsData, getHomeMultidata} from "network/homejs";


export default {
  name: "Home",
  components: {
    GoodsList,
    NavBar,
    homeSwiper,
    HomeReconmend,
    HomeFeature,
    TabControl,
    Scroll,
    BackTop
  },
  data() {
    return {
      result: null,
      banners: [],
      reconmend: [],
      titles: ['流行', '精选', '新款'],
      types: ['pop', 'new', 'sell'],
      currentType: 'pop',
      goods: {
        "pop": {page: 0, list: []},
        "new": {page: 0, list: []},
        "sell": {page: 0, list: []}
      },
      isShowBackTop: false
    }
  },
  created() {
    this.loadHomeMultidata();
    this.loadHomeGoodsData('pop');
    this.loadHomeGoodsData('new');
    this.loadHomeGoodsData('sell');
  },
  methods: {
    tabClick(index) {
      this.currentType = this.types[index];
    },
    contentScroll(position) {
      //console.log(position);
      // 1.判断BackTop是否显示
      this.isShowBackTop = (-position.y) > 1000

      // 2.决定tabControl是否吸顶(position: fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore() {
      this.loadHomeGoodsData(this.currentType)
      console.log("底部")
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    backClick() {
      this.$refs.scroll.scrollToTop();
    },
    loadHomeMultidata() {
      getHomeMultidata().then(res => {
        this.result = res
        this.banners = res.data.banner.list
        this.reconmend = res.data.recommend.list
      })
    },
    loadHomeGoodsData(type) {
      const currentPage = this.goods[type].page + 1
      getHomeGoodsData({"type": type, "page": currentPage}).then(res => {
        console.log(res);
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        this.$refs.scroll.finishPullUp();
      })
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  }
}
</script>

<style scoped>
.home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #f6f6f6;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;

}

.tabcontrol {
  position: relative;
  z-index: 9;
}

/*.content{*/
/*  height: calc(100% -93px);*/
/*  overflow: hidden;*/
/*  margin-top: 44px;*/
/*}*/
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
