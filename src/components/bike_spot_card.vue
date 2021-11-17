<template>
  <div class="card-container">
    <div class="card-title">
      <div class="card-title-text"><span>太原廣場太原廣場太原廣場太原廣場太原廣場太原廣場</span></div>
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
    @include card-container;
    .card-title {
      @include card-title;
      @include mobile {
        @include flex-row-space-between-center;
      }
      .card-title-text {
        @include mobile {
          max-width: 150px;
          margin-right: 8px;
        }
        @media screen and (max-width: 380px) {
          max-width: 120px;
        }
      }
      .card-m-subtitle {
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
        @include pad-up {
          display: none;
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