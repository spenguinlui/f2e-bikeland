<template>
  <div class="search-type-bar-container">
    <div class="search-type-bar">
      <div class="ra-block">
        <div class="bg-move" :class="{ 'on-left': leftBtnOn, 'on-right': !leftBtnOn }"></div>
        <div @click="toggleDataType('找單車')" class="btn-left" :class="{ active: leftBtnOn, off: !leftBtnOn }"><i class="fas fa-bicycle"></i>找單車</div>
        <div @click="toggleDataType('找車位')" class="btn-right" :class="{ active: !leftBtnOn, off: leftBtnOn }"><i class="fas fa-parking"></i>找車位</div>
      </div>
    </div>
    <div @click="locateCurrent" class="locate-icon"><i class="fas fa-crosshairs"></i></div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        leftBtnOn: true
      }
    },
    methods: {
      toggleDataType(target) {
        this.leftBtnOn = !this.leftBtnOn;
        console.log(target)
        // ..
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