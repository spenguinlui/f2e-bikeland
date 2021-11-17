<template>
  <div class="card-container">
    <div class="card-tilte">
      <div class="card-title-text">太原廣場</div>
      <div class="card-m-subtitle">
        <div class="left-btn unavailable">可借可還</div>
        <div class="right-msg"><i class="fas fa-map-marker-alt"></i>距離25公尺</div>
      </div>
    </div>
    <div class="card-content-row">
      <div class="card-available">
        <div class="icon-text"><i class="fas fa-bicycle"></i>可租借</div>
        <div class="count">43</div>
      </div>
      <div class="card-available focus">
        <div class="icon-text"><i class="fas fa-parking"></i>可停車</div>
        <div class="count">25</div>
      </div>
    </div>
    <div class="card-footer">
      <div class="left-btn unavailable">可借可還</div>
      <div class="right-msg"><i class="fas fa-map-marker-alt"></i>距離25公尺</div>
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
    @include flex-column-center-center;
    padding: 20px 0;
    border-bottom: 1px solid $grey-300;
    .card-tilte {
      width: 100%;
      color: $primary-500;
      text-align: left;
      @include mobile {
        @include flex-row-space-between-center;
      }
      .card-title-text {
        @include font-h5(1);
        @include ellipsis-text(15);
        @include mobile {
          @include ellipsis-text(9);
          margin-right: 8px;
        }
      }
      .card-m-subtitle {
        @include mobile {
          @include flex-row-space-between-center;
          flex-grow: 1;
          .left-btn {
            @include btn-outline(accent);
            padding: 1px 8px;
            border-radius: 4px;
            &.focus {
              @include btn-outline(alert);
              padding: 1px 8px;
              border-radius: 4px;
            }
            &.unavailable {
              @include btn-outline(grey);
              padding: 1px 8px;
              border-radius: 4px;
            }
          }
          .right-msg {
            @include font-caption;
            color: $grey-500;
          }
        }
      }
    }
    .card-content-row {
      @include flex-row-center-center;
      width: 100%;
      padding: 12px 0;
      gap: 21px;
      .card-available {
        @include flex-column-center-center;
        width: 100%;
        border-radius: 8px;
        padding: 8px;
        background-color: $primary-100;
        color: $primary-500;
        &.focus {
          background-color: $alert-100;
          color: $alert-500;
        }
        &.unavailable {
          background-color: $grey-100;
          color: $grey-500;
        }
        .icon-text {
          @include font-button;
          font-weight: 500;
        }
        .count {
          @include font-h4(1);
        }
      }
    }
    .card-footer {
      @include flex-row-space-between-center;
      width: 100%;
      @include mobile {
        display: none;
      }
      .left-btn {
        @include btn-outline(accent);
        &.focus {
          @include btn-outline(alert);
        }
        &.unavailable {
          @include btn-outline(grey);
        }
      }
      .right-msg {
        @include font-button;
        color: $grey-500;
      }
    }
  }
</style>