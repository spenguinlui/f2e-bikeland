<template>
  <div>
    <div class="card-container">
      <div class="card-title">
        <div class="card-title-text"><span>{{ data.RouteName }}</span></div>
        <div class="card-title-msg"><i class="fas fa-map-marker-alt"></i>{{ data.City }}</div>
      </div>
      <div class="card-content-column">
        <div class="route-line"><img src="../assets/images/route-line.svg" alt="線條"></div>
        <div class="route-container">
          <div class="route-content">
            <div class="column-header">起</div>
            <div class="route-name"><span>{{ data.RoadSectionStart || '無資料' }}</span></div>
          </div>
          <div class="route-content">
            <div class="column-header">迄</div>
            <div class="route-name"><span>{{ data.RoadSectionEnd || '無資料' }}</span></div>
          </div>
        </div>
      </div>
      <div class="card-footer"><i class="fas fa-route"></i>總長{{ distanceZh(data.CyclingLength) }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['data'],
    data () {
      return {
        
      }
    },
    methods: {
      distanceZh(dist) {
        const distStr = dist >= 1000 ? `${dist / 1000}公里` : `${dist}公尺`
        return distStr;
      }
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