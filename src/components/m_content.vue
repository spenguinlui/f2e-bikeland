<template>
  <div class="m-content-container" :class="{ hide: !expandMContent }">
    <div @click="hideMContent" v-show="expandMContent" class="expand-btn">
      <div><i class="fas fa-angle-double-down"></i></div>
    </div>
    <div class="content-container">
      <div class="content-img">
        <template v-if="mContentData.Picture && Object.keys(mContentData.Picture).length !== 0">
          <img :src="mContentData.Picture.PictureUrl1" :alt="mContentData.Picture.PictureDescription1">
        </template>
        <template v-else>
          <div class="brand"><img src="../assets/images/brand-dark.png" alt="找不到圖片"></div>
        </template>
      </div>
      <div class="content-title">{{ mContentData.Name }}</div>
      <div class="content-msg">
        <div class="content-location"><i class="fas fa-map-marker-alt"></i>{{ mContentData.Address || '無資料' }}</div>
        <div class="content-opentime"><i class="fas fa-clock"></i>{{ mContentData.OpenTime || '無資料' }}</div>
        <div class="content-phone"><i class="fas fa-phone-alt"></i>{{ mContentData.Phone || '無資料' }}</div>
      </div>
      <div class="content-text">{{ mContentData.Description }}</div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters(['expandMContent', 'mContentData'])
    },
    methods: {
      hideMContent() {
        this.$store.dispatch("toggleMContent", false);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";

  .m-content-container {
    @include screen-up {
      display: none;
    }
    position: fixed;
    width: 100%;
    height: 233px;
    bottom: 0;
    padding-bottom: 0;
    background-color: $grey-100;
    box-shadow: $card-show;
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
    .content-container {
      @include flex-column-center-baseline;
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
  }
</style>