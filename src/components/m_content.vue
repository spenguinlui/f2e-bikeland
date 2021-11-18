<template>
  <div :class="contentExpand ? 'm-content-container' : 'm-content-container hide'">
    <div @click="() => { contentExpand = false }" v-if="contentExpand" class="expand-btn">
      <div v-show="contentExpand"><i class="fas fa-angle-double-down"></i></div>
    </div>
    <div class="content-img">
      <!-- <img src="" alt=""> -->
      <div class="brand"><img src="../assets/images/brand-dark.png" alt="找不到圖片"></div>
    </div>
    <div class="content-title">國立中正紀念堂</div>
    <div class="content-msg">
      <div class="content-location"><i class="fas fa-map-marker-alt"></i>100台北市中正區中山南路21號</div>
      <div class="content-opentime"><i class="fas fa-clock"></i>紀念堂開放時間：am09:00-pm06:00（星期一不休館）</div>
      <div class="content-phone"><i class="fas fa-phone-alt"></i>886-2-23431100</div>
    </div>
    <div class="content-text">白牆藍瓦，70公尺高聳立在紀念公園的中央，不論從哪個角度看過去，都很宏偉。國外觀光客來到臺灣，不論行程如何排，都一定會到這裡來參觀一下。紀念堂的下方有陳列和展覽，也有紀念品販售。紀念堂是為了紀念中華民國第一任總統蔣介石，他於1975年逝世，次年行政院就破土開建中正紀念堂，設計師是設計圓山大飯店的楊卓成。紀念堂原址是陸軍總部，當時是臺北市區內最大的軍區，據說從大陸運過來的黃金，就曾經存放在這個地方。紀念堂採用的藍白兩色，是國旗上面主要的顏色，紀念堂頂部天穹的裝飾是青天白日12道光芒，銅像朝西面對總統府和中國大陸，其中都有特殊的意義。隨著民主演進思想開放，紀念堂前的廣場 已成了民主運動的集會場。</div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        contentExpand: false
      }
    },
    methods: {
      
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";

  .m-content-container {
    @include pad-up {
      display: none;
    }
    @include flex-column-center-baseline;
    position: fixed;
    width: 100%;
    height: 233px;
    bottom: 0;
    padding-bottom: 0;
    background-color: $grey-100;
    box-shadow: 4px 4px 20px rgba(118, 118, 118, 0.3);
    border-radius: 8px;
    padding: 28px 32px;
    z-index: 5;
    transition: all .5s ease;
    &.hide {
      bottom: -233px;
    }
    .expand-btn {
      @include expand-btn;
    }
    .content-img {
      @include card-img;
      .brand {
        > img {
          width: 80%;
        }
      }
    }
    .content-title {
      @include font-h3(1);
      color: $primary-500;
      margin: 8px 0;
      text-align: left;
    }
    .content-msg {
      @include flex-column-center-baseline;
      @include font-button;
      gap: 4px;
      font-weight: 500;
      color: $grey-400;
      > div {
        text-align: left;
      }
    }
    .content-text {
      margin-top: 16px;
      @include font-caption;
      font-weight: 500;
      color: $grey-500;
      text-align: left;
      overflow: scroll;
    }
  }
</style>