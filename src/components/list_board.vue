<template>
  <div :class="containerExpand ? 'list-container expanding' : 'list-container'">
    <div @click="() => { containerExpand = !containerExpand }" class="expand-btn">
      <div v-show="containerExpand"><i class="fas fa-angle-double-down"></i></div>
      <div v-show="!containerExpand"><i class="fas fa-angle-double-up"></i></div>
    </div>
    <div class="tool-bar">
      <SearchBar/>
      <div class="btn-filter">
        <i class="fas fa-sort-amount-down"></i>排序
      </div>
    </div>
    <div class="scroll-container">
      <template v-if="false">
        <BikeSpotCard/>
        <BikeSpotCard/>
        <BikeSpotCard/>
        <BikeSpotCard/>
      </template>
      <template v-if="true">
        <RouteCard/>
        <RouteCard/>
        <RouteCard/>
        <RouteCard/>
      </template>
    </div>
  </div>
</template>

<script>
  import SearchBar from "./search_bar.vue";
  import BikeSpotCard from "./bike_spot_card.vue";
  import RouteCard from "./route_card.vue";

  export default {
    data () {
      return {
        containerExpand: false
      }
    },
    components: {
      SearchBar,
      BikeSpotCard,
      RouteCard
    },
    methods: {
      expandContent() {
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";
  
  .list-container {
    width: $list-board-width;
    height: calc(100% - #{$nav-bar-height} - 72px);
    position: fixed;
    @include pad-up {
      left: 32px;
      top: $nav-bar-m-height + 36px;
    }
    @include screen-up {
      top: $nav-bar-height + 36px;
    }
    @include mobile {
      width: 100%;
      height: 174px;
      bottom: 0;
      padding-bottom: 0;
      &.expanding {
        height: 488px;
      }
    }
    background-color: $grey-100;
    box-shadow: 4px 4px 20px rgba(118, 118, 118, 0.3);
    border-radius: 8px;
    padding: 28px 32px;
    z-index: 5;
    .expand-btn {
      @include expand-btn;
    }
    .tool-bar {
      @include flex-row-space-between-center;
      gap: 10px;
      .btn-filter {
        @include  btn-outline;
        padding: 10px 12px;
        min-width: 71px;
      }
      margin-bottom: 20px;
    }
    .scroll-container {
      overflow: auto;
      height: 87%;
    }
  }
</style>