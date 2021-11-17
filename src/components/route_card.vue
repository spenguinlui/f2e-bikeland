<template>
  <div>
    <div class="card-container">
      <div class="card-title">
        <div class="card-title-text"><span>中正路(南側)中正路(南側)中正路(南側)中正路(南側)</span></div>
        <div class="card-title-msg"><i class="fas fa-map-marker-alt"></i>台北市</div>
      </div>
      <div class="card-content-column">
        <div class="route-line"><img src="../assets/images/route-line.svg" alt="線條"></div>
        <div class="route-container">
          <div class="route-content">
            <div class="column-header">起</div>
            <div class="route-name"><span>承德路5段</span></div>
          </div>
          <div class="route-content">
            <div class="column-header">迄</div>
            <div class="route-name"><span>民生東路民生東路民生東路民生東路民生東路</span></div>
          </div>
        </div>
      </div>
      <div class="card-footer"><i class="fas fa-route"></i>總長3.4公里</div>
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
    .card-title {
      @include flex-row-space-between-center;
      @include card-title;
      .card-title-msg {
        @include font-button;
        color: $grey-400;
        font-weight: 500;
      }
    }
    .card-content-column {
      @include flex-row-center-center;
      width: 100%;
      .route-line {
        img {
          height: 52px;
          margin-right: 4px 
        }
      }
      .route-container {
        @include flex-column-center-center;
        width: 100%;
        padding: 12px 0;
        gap: 12px;
        .route-content {
          @include flex-row-space-between-center;
          @include font-button;
          width: 100%;
          color: $primary-500;
          font-weight: 500;
          .column-header {
            background-color: $primary-100;
            padding: 8px 12px;
            border-radius: 8px;
            margin-right: 12px;
          }
          .route-name {
            background-color: $primary-100;
            padding: 8px 12px;
            border-radius: 8px;
            flex-grow: 1;
            > span {
              text-align: left;
              @include ellipsis-text;
            }
          }
        }
      }
    }
    .card-footer {
      width: 100%;
      @include flex-row-center-center;
      justify-content: flex-end;
      @include font-button;
      color: $grey-500;
    }
  }
</style>