<template>
  <div>
    <div class="card-container" @click="showMContent">
      <div class="card-img">
        <template v-if="data.Picture && Object.keys(data.Picture).length !== 0">
          <img :src="data.Picture.PictureUrl1" :alt="data.Picture.PictureDescription1">
        </template>
        <template v-else>
          <div class="brand"><img src="../assets/images/brand-dark.png" alt="找不到圖片"></div>
        </template>
      </div>
      <div class="card-title">
        <div class="card-title-text"><span>{{ data.Name }}</span></div>
        <div class="card-title-msg"><i class="fas fa-map-marker-alt"></i>{{ data.City }}</div>
      </div>
      <div class="card-footer">
        <div class="card-tag-container">
          <div class="card-tag" v-if="data.Class1">{{ data.Class1 }}</div>
          <div class="card-tag" v-if="data.Class2">{{ data.Class2 }}</div>
          <div class="card-tag m-hide" v-if="data.Class3">{{ data.Class3 }}</div>
          <!-- mobile 第三張卡要隱藏 -->
          <div class="card-tag" v-if="!data.Class1">其他</div>
        </div>
        <a :href="data.WebsiteUrl" target="_blank" class="card-web-btn"><i class="fas fa-globe-americas"></i></a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['data', 'index'],
    data () {
      return {
        contentShow: false
      }
    },
    methods: {
      showMContent() {
        this.$store.dispatch("toggleMContent", true);
        this.$store.commit("CHECKOUT_M_CONTENT", this.index);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";

  .card-container {
    @include card-container;
    .card-img {
      @include card-img;
    }
    .card-title {
      @include flex-row-space-between-center;
      width: 100%;
      color: $primary-500;
      text-align: left;
      .card-title-text {
        max-width: 240px;
        margin-top: 8px;
        @include mobile {
          max-width: 185px;
        }
        > span {
          @include font-h5(1);
          @include ellipsis-text;
        }
      }
      .card-title-msg {
        @include font-button;
        color: $grey-400;
        font-weight: 500;
      }
    }
    .card-footer {
      @include flex-row-space-between-center;
      width: 100%;
      .card-tag-container {
        @include flex-row-start-center;
        flex-grow: 1;
        gap: 4px;
        .card-tag {
          @include font-caption(1);
          color: $grey-100;
          background-color: $primary-400;
          border-radius: 20px;
          padding: 4px 12px;
          cursor: pointer;
          &:hover {
            background-color: $primary-500;
          }
          &:focus {
            border: 2px solid $primary-300;
          }
          &.m-hide {
            @include mobile {
              display: none;
            }
          }
        }
      }
      .card-web-btn {
        border: 1px solid $primary-300;
        padding: 5px;
        border-radius: 50%;
        color: $primary-300;
        cursor: pointer;
        > svg {
          margin: 0;
        }
        &:hover {
          background-color: $primary-300;
          color: $grey-100;
        }
        &:focus {
          border: 2px solid $primary-200;
        }
        &:disabled {
          border: 1px solid $grey-300;
          color: $grey-300;
        }
      }
    }
  }

  @include mobile {
    .card-container {
      @include card-container;
      border-bottom: 0px;
      width: 154px;
      height: 123px;
      margin-top: 20px;
      .card-img {
        width: 100%;
        height: $card-img-m-height;
        .brand {
          @include flex-row-center-center;
          border: 1px solid $primary-400;
          border-radius: 8px;
          width: 100%;
          height: inherit;
          &:hover {
            background-color: $primary-100;
          }
          > img {
            width: 80%;
          }
        }
      }
      .card-title {
        @include flex-row-space-between-center;
        width: 100%;
        color: $primary-500;
        text-align: left;
        .card-title-text {
          margin-top: 2px;
          max-width: 98px;
          > span {
            @include font-caption(1);
            @include ellipsis-text;
          }
        }
        .card-title-msg {
          font-size: 10px;
          line-height: 18px;
          color: $grey-400;
          font-weight: 500;
        }
      }
      .card-footer {
        @include flex-row-space-between-center;
        width: 100%;
        .card-tag-container {
          @include flex-row-start-center;
          flex-grow: 1;
          gap: 2px;
          .card-tag {
            font-size: 9px;
            line-height: 15px;
            font-weight: 500;
            color: $grey-100;
            background-color: $primary-400;
            border-radius: 20px;
            padding: 4px 12px;
            cursor: pointer;
            &:hover {
              background-color: $primary-500;
            }
            &:focus {
              border: 2px solid $primary-300;
            }
          }
        }
        .card-web-btn {
          display: none;
        }
      }
    }
  }
</style>