<template>
  <div>
    <l-map ref="myMap" :zoom="zoom" :center="center" :options="options" class="map">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker ref="location" :lat-lng="center">
          <l-icon>
          <div class="headline">
            {{ '99' }}
          </div>
          </l-icon>
        <l-popup>
          你的位置
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        zoom: 13,       // 縮放比例
        center: [25.043827, 121.529629],   // 動態，會抓自身位置
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", // 底圖
        attribution: `© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors`, // 底圖資訊
        options: {
          zoomControl: false    // 控制列
        },
        icon: {
          type: {
            black:
              "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png",
            gold:
              "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png"
          },
          shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
          iconSize: [25, 41],    // Marker 的大小
          iconAnchor: [12, 41],  // Marker 相對位置
          popupAnchor: [1, -34], // popup 訊息相對位置
          shadowSize: [41, 41]   // 陰影大小
        }
      }
    },
    methods: {
      setMap() {
        this.$nextTick(() => {
          navigator.geolocation.getCurrentPosition(position => {
            const p = position.coords;
            this.center = [p.latitude, p.longitude];
            this.$refs.location.mapObject.openPopup();
          })
        });
      }
    },
    mounted() {
      // 地圖創完套資料
      // this.setMap();
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";

  .map {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: -1;
    opacity: .7;
  }
</style>