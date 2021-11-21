<template>
  <div class="list-container">
    <div @click="locateCurrent" class="locate-icon"><i class="fas fa-crosshairs"></i></div>
    <div class="tool-bar">
      <SearchBar/>
      <div class="btn-filter">
        <i class="fas fa-sort-amount-down"></i>排序
      </div>
    </div>
    <div class="scroll-row-container" >
      <template v-if="sortList[2].on">
        <template v-for="(spotData, index) in spotDataList">
          <ImgCard :key="spotData.ID" :index="index" :data="spotData"/>
        </template>
      </template>
      <template v-if="sortList[3].on">
        <template v-for="(restaurantData, index) in restaurantDataList">
          <ImgCard :key="restaurantData.ID" :index="index" :data="restaurantData"/>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  import SearchBar from "./search_bar.vue";
  import ImgCard from "./img_card.vue";

  export default {
    data () {
      return {
        
      }
    },
    computed: {
      ...mapGetters(['sortList', 'spotDataList', 'restaurantDataList'])
    },
    components: {
      SearchBar,
      ImgCard
    },
    methods: {
      locateCurrent() {
        console.log("定位")
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";

  .list-container {
    position: fixed;
    width: $list-board-width;
    height: calc(100% - #{$nav-bar-height} - 72px);
    // @include pad-up {
      //   top: $nav-bar-m-height + 36px;
    // }
    @include screen-up {
      left: 32px;
      top: $nav-bar-height + 36px;
    }
    // @include mobile {
    //   width: 100%;
    //   height: $list-img-board-m-height;
    //   bottom: 0;
    //   padding-bottom: 0;
    // }
    @include pad-m {
      width: 100%;
      height: $list-img-board-m-height;
      bottom: 0;
      padding-bottom: 0;
    }
    background-color: $grey-100;
    box-shadow: $card-show;
    border-radius: 8px;
    padding: 28px 32px;
    z-index: 5;
    .tool-bar {
      @include flex-row-space-between-center;
      gap: 10px;
      .btn-filter {
        @include  btn-outline;
        padding: 10px 12px;
        min-width: 71px;
      }
    }
    .scroll-row-container {
      overflow: auto;
      height: 87%;
      @include pad-m {
        @include flex-row-start-center;
        height: auto;
        gap: 10px;
      }
    }
    .locate-icon {
      @include locate-btn;
      @include btn(18);
      width: calc(#{$search-type-btn-m-height} + (#{$search-type-btn-m-padding-y} * 2));
      height: calc(#{$search-type-btn-m-height} + (#{$search-type-btn-m-padding-y} * 2));
      font-size: calc((#{$search-type-btn-m-height} + (#{$search-type-btn-m-padding-y} * 2)) / 2);
      position: absolute;
      right: 28px;
      top: -48px; // 高 + 12px
      @include screen-up {
        display: none;
      }
    }
  }
</style>