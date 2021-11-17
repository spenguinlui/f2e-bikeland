<template>
  <div>
    <div class="card-container">
      <div class="card-img">
        <!-- <img src="" alt=""> -->
        <div class="brand"><img src="../assets/images/brand-dark.png" alt="找不到圖片"></div>
      </div>
      <div class="card-title">
        <div class="card-title-text"><span>國立中正紀念堂國立中正紀念堂國立中正紀念堂國立中正紀念堂</span></div>
        <div class="card-title-msg"><i class="fas fa-map-marker-alt"></i>台北市</div>
      </div>
      <div class="card-footer">
        <div class="card-tag-container">
          <div class="card-tag">都會公園類</div>
          <div class="card-tag">自然類</div>
        </div>
        <div class="card-web-btn"><i class="fas fa-globe-americas"></i></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        
      }
    },
    methods: {
      
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
</style>