<template>
  <div class="list-container">
    <div class="tool-bar">
      <SearchBar/>
      <div class="btn-filter">
        <i class="fas fa-sort-amount-down"></i>排序
      </div>
    </div>
    <div v-if="true" class="scroll-row-container" >
      <ImgCard/>
      <ImgCard/>
      <ImgCard/>
      <ImgCard/>
    </div>
  </div>
</template>

<script>
  import SearchBar from "./search_bar.vue";
  import ImgCard from "./img_card.vue";

  export default {
    data () {
      return {
        
      }
    },
    components: {
      SearchBar,
      ImgCard
    },
    methods: {
      
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";

  .list-container {
    width: $list-board-width;
    height: calc(100% - #{$nav-bar-height} - 72px);
    position: fixed;
    @include pad-up {
      left: 32px;
      top: $nav-bar-m-height + 36px;
    }
    @include screen-up {
      top: $nav-bar-height + 36px;
    }
    @include mobile {
      width: 100%;
      height: 233px;
      bottom: 0;
      padding-bottom: 0;
    }
    background-color: $grey-100;
    box-shadow: 4px 4px 20px rgba(118, 118, 118, 0.3);
    border-radius: 8px;
    padding: 28px 32px;
    z-index: 5;
    .tool-bar {
      @include flex-row-space-between-center;
      gap: 10px;
      .btn-filter {
        @include  btn-outline;
        padding: 10px 12px;
        min-width: 71px;
      }
    }
    .scroll-row-container {
      overflow: auto;
      height: 87%;
      @include mobile {
        @include flex-row-start-center;
        height: auto;
        gap: 10px;
      }
    }
  }
</style>