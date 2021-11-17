<template>
  <div>
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
        <template v-if="true"><BikeSpotCard/></template>
        <template v-if="true"><BikeSpotCard/></template>
        <template v-if="true"><BikeSpotCard/></template>
        <template v-if="true"><BikeSpotCard/></template>
        <template v-if="true"><RouteCard/></template>
        <template v-if="true"><ImgCard/></template>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchBar from "./search_bar.vue";
  import BikeSpotCard from "./bike_spot_card.vue";
  import RouteCard from "./route_card.vue";
  import ImgCard from "./img_card.vue";

  export default {
    data () {
      return {
        containerExpand: true
      }
    },
    components: {
      SearchBar,
      BikeSpotCard,
      RouteCard,
      ImgCard
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
    width: 425px;
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
      bottom: -45%;
      &.expanding {
        bottom: -20%;
      }
    }
    background-color: $grey-100;
    box-shadow: 4px 4px 20px rgba(118, 118, 118, 0.3);
    border-radius: 8px;
    padding: 28px 32px;
    .expand-btn {
      @include flex-row-center-center;
      position: absolute;
      top: -16px;
      left: calc(50% - 24px);
      width: 48px;
      height: 16px;
      font-size: 10px;
      text-align: center;
      background-color: $grey-100;
      box-shadow: 0px -2px 4px rgba(118, 118, 118, 0.3);
      border-radius: 6px 6px 0px 0px;
      cursor: pointer;
      > svg {
        margin: 0;
      }
      @include pad-up {
        display: none;
      }
    }
    .tool-bar {
      @include flex-row-space-between-center;
      gap: 10px;
      .btn-filter {
        @include  btn-outline;
        padding: 10px 12px;
        min-width: 70px;
      }
    }
    .scroll-container {
      overflow: auto;
      height: 87%;
      margin-top: 28px;
    }
  }
</style>