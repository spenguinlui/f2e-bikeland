<template>
  <div class="search-type-bar-container">
    <template v-if="targetType === 'bike' || targetType === 'scenicspot'">
    <div class="search-type-bar">
      <div class="ra-block">
        <div class="bg-move"
          :class="{ 
            'on-left': targetType === 'bike' ? sortList[0].on : sortList[2].on,
            'on-right': targetType === 'bike' ? sortList[1].on : sortList[3].on }
        "></div>
        <template v-if="targetType === 'bike'">
          <div @click="toggleBikeDataForRent" class="btn-left" :class="{ active: sortList[0].on, off: !sortList[0].on }"><i class="fas fa-bicycle"></i>找單車</div>
          <div @click="toggleBikeDataForReturn" class="btn-right" :class="{ active: sortList[1].on, off: !sortList[1].on }"><i class="fas fa-parking"></i>找車位</div>
        </template>
        <template v-if="targetType === 'scenicspot'">
          <div @click="toggleSpotData" class="btn-left" :class="{ active: sortList[2].on, off: !sortList[2].on }"><i class="fas fa-umbrella-beach"></i>找景點</div>
          <div @click="toggleRestaurantData" class="btn-right" :class="{ active: sortList[3].on, off: !sortList[3].on }"><i class="fas fa-utensils"></i>找餐廳</div>
        </template>
      </div>
    </div>
    </template>
    <div
      @click="locateCurrent"
      @mouseover="tooltipsShow = true"
      @mouseleave="tooltipsShow = false"
      class="locate-icon">
      <i class="fas fa-crosshairs"></i>
      <div v-show="tooltipsShow" class="locate-tooltips"><img src="../assets/images/tooltips.svg" alt="定位說明icon"></div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    data () {
      return {
        leftBtnOn: true,
        tooltipsShow: false
      }
    },
    computed: {
      ...mapGetters(['targetType', 'sortList', 'bikeDataList', 'spotDataList', 'restaurantDataList'])
    },
    methods: {
      toggleDataType(targetIndex) {
        this.$store.dispatch("changeSortList", targetIndex);
        if (targetIndex === 2 || targetIndex === 3) {
          this.$store.dispatch("getSpotDataList")
        }
      },
      toggleBikeDataForRent() {
        this.$store.dispatch("changeSortList", 0);
        this.$store.dispatch("setBikeRentDataOnMap", this.bikeDataList);
      },
      toggleBikeDataForReturn() {
        this.$store.dispatch("changeSortList", 1);
        this.$store.dispatch("setBikeReTurnDataOnMap", this.bikeDataList);
      },
      toggleSpotData() {
        this.$store.dispatch("changeSortList", 2);
        this.$store.dispatch("setSpotDataOnMap", this.spotDataList);
      },
      toggleRestaurantData() {
        this.$store.dispatch("changeSortList", 3);
        this.$store.dispatch("setRestaurantDataOnMap", this.restaurantDataList);
      },
      locateCurrent() {
        console.log("定位")
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";

  .search-type-bar-container {
    @include flex-row-center-center;
    position: absolute;
    left: $list-board-width + 32px + 20px;
    top: $nav-bar-height + 36px;
    .search-type-bar {
      width: calc((#{$search-type-btn-width} * 2) + (#{$search-type-btn-padding-x} * 2)); // 加上 padding
      height: calc(#{$search-type-btn-height} + (#{$search-type-btn-padding-y} * 2)); // 加上 padding
      padding: $search-type-btn-padding-y $search-type-btn-padding-x;
      box-shadow: $card-show;
      border-radius: 40px;
      background-color: $grey-100;
      .ra-block {
        @include flex-row-center-center;
        position: relative;
        .bg-move {
          position: absolute;
          z-index: 0;
          @include btn(40);
          width: $search-type-btn-width;
          height: $search-type-btn-height;
          background-color: $primary-400;
          transition: all 0.3s ease-in-out;
          &.on-left {
            left: 0;
            top: 0;
          }
          &.on-right {
            left: $search-type-btn-width;
            top: 0;
          }
        }
        .btn-left, .btn-right {
          @include btn(40);
          width: $search-type-btn-width;   // 這邊一定要固定 size
          height: $search-type-btn-height;
          position: absolute;
          z-index: 1;
          color: $primary-400;
          background-color: rgba(0, 0, 0, 0);
          transition: all 0.3s ease-in-out;;
          &.active {
            color: $grey-100;
          }
          &.off {
            color: $primary-400;
          }
        }
        .btn-left {
          left: 0;
          top: 0;
          color: $grey-100;
        }
        .btn-right {
          left: $search-type-btn-width;
          top: 0;
        }
      }
    }
    .locate-icon {
      @include locate-btn;
      @include btn(30);
      margin-left: $search-type-btn-padding-x;
      width: calc(#{$search-type-btn-height} + (#{$search-type-btn-padding-y} * 2));
      height: calc(#{$search-type-btn-height} + (#{$search-type-btn-padding-y} * 2));
      font-size: calc((#{$search-type-btn-height} + (#{$search-type-btn-padding-y} * 2)) / 2);
      position: relative;
      .locate-tooltips {
        position: absolute;
        left: 0;
        top: 65px;
      }
    }
  }

  @include mobile {
    .search-type-bar-container {
      left: calc(50% - (((#{$search-type-btn-m-width} * 2) + (#{$search-type-btn-m-padding-x} * 2)) / 2));
      top: $nav-bar-m-height + 12px;
      .search-type-bar {
        width: calc((#{$search-type-btn-m-width} * 2) + (#{$search-type-btn-m-padding-x} * 2)); // 加上 padding
        height: calc(#{$search-type-btn-m-height} + (#{$search-type-btn-m-padding-y} * 2)); // 加上 padding
        padding: $search-type-btn-m-padding-y $search-type-btn-m-padding-x;
        .ra-block {
          .bg-move, .btn-left, .btn-right {
            width: $search-type-btn-m-width;
            height: $search-type-btn-m-height;
          }
          .bg-move {
            &.on-right {
              left: $search-type-btn-m-width;
              top: 0;
            }
          }
          .btn-right {
            left: $search-type-btn-m-width;
            top: 0;
          }
        }
      }
      .locate-icon {
        display: none;
      }
    }
  }
</style>