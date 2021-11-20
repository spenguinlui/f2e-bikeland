<template>
  <div>
    <nav>
      <div class="nav-brand">
        <img src="../assets/images/brand-light.png" alt="logo-icon">
      </div>
      <div class="nav-block">
        <div class="btn-outline btn-text-icon" :class="{ active: targetType === 'bike' }" @click="checkoutBikeMap"><i class="fas fa-bicycle"></i>找單車</div>
        <div class="btn-outline btn-text-icon" :class="{ active: targetType === 'route' }" @click="checkoutRouteMap"><i class="fas fa-route"></i>找路線</div>
        <div class="btn-outline btn-text-icon" :class="{ active: targetType === 'scenicspot' }" @click="checkoutSpotMap"><i class="fas fa-umbrella"></i>找景點</div>
      </div>
      <div class="nav-m-trigger" @click="() => { mobileNavbarShow = !mobileNavbarShow }">
        <i class="fas fa-bars"></i>
      </div>
    </nav>
    <div class="nav-m-menu" v-show="mobileNavbarShow">
      <div class="nav-m-content">
        <div class="nav-m-block" @click="checkoutBikeMap"><div class="btn-text-icon" :class="{ active: targetType === 'bike' }"><i class="fas fa-bicycle"></i>找單車</div></div>
        <div class="nav-m-block" @click="checkoutRouteMap"><div class="btn-text-icon"><i class="fas fa-route" :class="{ active: targetType === 'route' }"></i>找路線</div></div>
        <div class="nav-m-block" @click="checkoutSpotMap"><div class="btn-text-icon" :class="{ active: targetType === 'scenicspot' }"><i class="fas fa-umbrella"></i>找景點</div></div>
      </div>
      <div class="nav-m-connect btn-text-icon"><i class="fas fa-phone-alt"></i>聯絡單車客服</div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    data () {
      return {
        mobileNavbarShow: false
      }
    },
    computed: {
      ...mapGetters(['targetType'])
    },
    methods: {
      checkoutBikeMap() {
        this.$store.dispatch("checkoutTargetType", "bike");
        this.$store.dispatch("getDataList");
      },
      checkoutRouteMap() {
        this.$store.dispatch("checkoutTargetType", "route");
        this.$store.dispatch("getRouteDataList");
      },
      checkoutSpotMap() {
        this.$store.dispatch("checkoutTargetType", "scenicspot");
        this.$store.dispatch("getSpotDataList");
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";

  nav {
    background-color: $primary-400;
    @include flex-row-space-between-center;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: $nav-bar-m-height;
    padding: 0 20px;
    @include pad {
      padding: 0 20px;
    }
    @include screen-up {
      height: $nav-bar-height;
      padding: 0 40px;
    }
    @include full-screen {
      padding: 0 72px;
    }
    .nav-brand {
      height: 16px;
      @include pad-up {
        height: 20px;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    .nav-block {
      display: none;
      @include screen-up {
        @include flex-row-center-center;
        gap: 16px;
      }
      .btn-outline {
        @include  btn-outline;
      }
    }
    .nav-m-trigger {
      display: flex;
      color: $grey-100;
      cursor: pointer;
      @include screen-up {
        display: none;
      }
    }
  }

  .nav-m-menu {
    width: 100%;
    position: fixed;
    left: 0;
    top: $nav-bar-m-height;
    cursor: pointer;
    z-index: 10;
    @include screen-up {
      display: none;
    }
    @include flex-column-center-center;
    .nav-m-content {
      @include flex-row-center-center;
      width: 100%;
      background-color: $primary-100;
      .nav-m-block {
        @include flex-col(4);
        @include flex-row-center-center;
        margin: 8px 0;
        height: 50px;
        color: $primary-400;
        border-left: 1px solid $primary-300;
      }
    }
    .nav-m-connect {
      width: 100%;
      @include font-caption($b: 1);
      padding: 8px 0;
      background-color: $accent-100;
      color: $accent-600;
    }
  }

</style>