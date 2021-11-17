<template>
  <div class="search-bar">
    <input v-model="keyword" @keyup.enter="goSearch" type="text" placeholder="搜尋站點與鄰近地點">
    <div @click="goSearch"><i class="fas fa-search"></i></div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        keyword: ""
      }
    },
    methods: {
      goSearch() {
        console.log("開始搜尋")
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";
  
  .search-bar {
    @include flex-row-space-between-center;
    @include font-caption;
    width: 100%;
    background-color: $grey-200;
    color: $grey-500;
    border-radius: 8px;
    padding: 9px 20px;
    input {
      width: 100%;
      background-color: inherit;
    }
    svg {
      font-size: 20px;
      cursor: pointer;
    }
  }

</style>