<template>
  <div :class="containerExpand ? 'list-container expanding' : 'list-container'">
    <div @click="() => { containerExpand = !containerExpand }" class="expand-btn">
      <div v-show="containerExpand"><i class="fas fa-angle-double-down"></i></div>
      <div v-show="!containerExpand"><i class="fas fa-angle-double-up"></i></div>
    </div>
    <div @click="locateCurrent" class="locate-icon">
      <i class="fas fa-crosshairs"></i>
    </div>
    <div class="tool-bar">
      <SearchBar/>
      <div class="btn-filter" @click="sortBlock = !sortBlock">
        <div>
          <i class="fas fa-sort-amount-down"></i>排序
        </div>
        <template v-if="targetType === 'bike'">
          <div class="filter-select-block" v-show="sortBlock">
            <div class="filter-select" @click.prevent.stop="sortByDistace">距離較近</div>
            <div class="filter-select" @click.prevent.stop="sortByRent">可借車數</div>
            <div class="filter-select" @click.prevent.stop="sortByReturn">可還車數</div>
          </div>
        </template>
        <template v-if="targetType === 'route'">
          <div class="filter-select-block" v-show="sortBlock">
            <div class="filter-select" @click.prevent.stop="sortByRouteLength">路線長度</div>
          </div>
        </template>
      </div>
    </div>
    <div class="scroll-container">
      <div class="card-outsid-container" v-if="targetType === 'bike'">
        <template v-for="bikedata in bikeDataList">
          <BikeSpotCard :key="bikedata.StationUID" :data="bikedata"/>
        </template>
      </div>
      <div class="card-outsid-container" v-if="targetType === 'route'">
        <template v-for="routedata in routeDataList">
          <RouteCard :key="routedata.RouteName" :data="routedata"/>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  import SearchBar from "./search_bar.vue";
  import BikeSpotCard from "./bike_spot_card.vue";
  import RouteCard from "./route_card.vue";

  export default {
    props: ['getCurrentPosition', 'setPosition', 'getData'],
    data () {
      return {
        containerExpand: false,
        sortBlock: false
      }
    },
    computed: {
      ...mapGetters(['targetType', 'bikeDataList', 'routeDataList', 'isLoading'])
    },
    components: {
      SearchBar,
      BikeSpotCard,
      RouteCard
    },
    methods: {
      locateCurrent() {
        this.getCurrentPosition();
      },
      sortByDistace() {
        this.$store.commit("SORT_BY_DISTANCE");
        this.sortBlock = false;
      },
      sortByRent() {
        this.$store.commit("SORT_BY_RENT");
        this.sortBlock = false;
      },
      sortByReturn() {
        this.$store.commit("SORT_BY_RETURN");
        this.sortBlock = false;
      },
      sortByRouteLength(){
        this.$store.commit("SORT_BY_ROUTE_LENGTH");
        this.sortBlock = false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";
  
  .list-container {
    position: fixed;
    background-color: $grey-100;
    box-shadow: $card-show;
    border-radius: 8px;
    padding: 28px 32px;
    z-index: 5;
    @include pad-m {
      width: 100%;
      height: $list-board-m-height;
      bottom: 0;
      padding-bottom: 0;
      &.expanding {
        height: 488px;
      }
    }
    @include screen-up {
      width: $list-board-width;
      height: calc(100% - #{$nav-bar-height} - 72px);
      left: 32px;
      top: $nav-bar-height + 36px;
    }
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
        position: relative;
        .filter-select-block {
          @include flex-column-center-center;
          position: absolute;
          left: 0;
          top: 40px;
          padding: 11px;
          border: 1px solid #A4B375;
          box-shadow: $card-show;
          border-radius: 8px;
          background: $grey-100;
          width: max-content;
          cursor: pointer;
          .filter-select {
            padding: 8px 0;
            &:nth-child(1), &:nth-child(2) {
              border-bottom: 1px solid $grey-300;
            }
          }
        }
      }
      margin-bottom: 20px;
    }
    .scroll-container {
      overflow: auto;
      height: 87%;
      .card-outsid-container {
        margin-top: -20px;
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