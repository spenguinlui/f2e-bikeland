<template>
  <div class="content-container" :class="{ hide: !expandMContent }">
    <div @click="toggleMContent" class="expand-btn">
      <div v-show="expandMContent"><i class="fas fa-angle-double-down"></i></div>
      <div v-show="!expandMContent"><i class="fas fa-angle-double-up"></i></div>
    </div>
    <div class="content-block">
      <div class="content-title">{{ mContentData.Name }}</div>
      <div class="content-msg">
        <div class="content-location"><i class="fas fa-map-marker-alt"></i>{{ mContentData.Address || '無資料' }}</div>
        <div class="content-opentime"><i class="fas fa-clock"></i>{{ mContentData.OpenTime || '無資料' }}</div>
        <div class="content-phone"><i class="fas fa-phone-alt"></i>{{ mContentData.Phone || '無資料' }}</div>
      </div>
      <div class="content-text">{{ mContentData.Description }}</div>
    </div>
    <div class="content-img">
      <template v-if="mContentData.Picture && Object.keys(mContentData.Picture).length !== 0">
        <img :src="mContentData.Picture.PictureUrl1" :alt="mContentData.Picture.PictureDescription1">
      </template>
      <template v-else>
        <div class="brand"><img src="../assets/images/brand-dark.png" alt="找不到圖片"></div>
      </template>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    data () {
      return {
        contentExpand: false
      }
    },
    computed: {
      ...mapGetters(['expandMContent', 'mContentData'])
    },
    methods: {
      toggleMContent() {
        this.$store.dispatch("toggleMContent", !this.expandMContent);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";

  .content-container {
    @include flex-row-space-between-center;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 1;
    transition: all .5s ease;
    &.hide {
      bottom: -$content-height;
    }
    width: 100%;
    height: $content-height;
    background-color: $grey-100;
    box-shadow: $card-show;
    border-radius: 8px;
    padding: 28px 36px;
    .expand-btn {
      @include expand-btn(1);
    }
    .content-block {
      @include flex-column-center-baseline;
      margin-left: $list-board-width + 64px - 36px;
      flex-grow: 1;
      height: 100%;
      overflow: hidden;
      .content-title {
        @include font-h3(1);
        color: $primary-500;
        margin-bottom: 8px;
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
    .content-img {
      @include card-img;
      min-width: 150px;
      min-width: 180px;
      margin-left: 20px;
      width: 50%;
      .brand {
        > img {
          width: 80%;
        }
      }
    }
  }
  @include pad-m {
    .content-container {
      display: none;
    }
  }
</style>