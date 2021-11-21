<template>
  <div>
    <!-- <l-map ref="myMap" :zoom="zoom" :center="center" :options="options" class="map">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker ref="myLocation" :lat-lng="center">
          <l-icon>
          <div class="headline">
            <img src="./assets/images/user-position.svg" alt="地圖自身位置">
          </div>
          </l-icon>
        <l-popup>
          你的位置
        </l-popup>
      </l-marker>
    </l-map> -->
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import L from "leaflet";

  export default {
    data () {
      return {
        zoom: 13,       // 縮放比例
        center: [25.043827, 121.529629],   // 動態，會抓自身位置
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", // 底圖
        // url: `https://maps.googleapis.com/maps/api/staticmap?key=${process.env.VUE_GOOGLE_API_KEY}&center=24.040478900962096,-238.41722803889473&zoom=8&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0xebe3cd&style=element:labels.text.fill%7Ccolor:0x523735&style=element:labels.text.stroke%7Ccolor:0xf5f1e6&style=feature:administrative%7Celement:geometry.stroke%7Ccolor:0xc9b2a6&style=feature:administrative.land_parcel%7Celement:geometry.stroke%7Ccolor:0xdcd2be&style=feature:administrative.land_parcel%7Celement:labels.text.fill%7Ccolor:0xae9e90&style=feature:landscape.natural%7Celement:geometry%7Ccolor:0xdfd2ae&style=feature:poi%7Celement:geometry%7Ccolor:0xdfd2ae&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x93817c&style=feature:poi.business%7Cvisibility:off&style=feature:poi.park%7Celement:geometry.fill%7Ccolor:0xa5b076&style=feature:poi.park%7Celement:labels.text%7Cvisibility:off&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x447530&style=feature:road%7Celement:geometry%7Ccolor:0xf5f1e6&style=feature:road.arterial%7Celement:geometry%7Ccolor:0xfdfcf8&style=feature:road.highway%7Celement:geometry%7Ccolor:0xf8c967&style=feature:road.highway%7Celement:geometry.stroke%7Ccolor:0xe9bc62&style=feature:road.highway.controlled_access%7Celement:geometry%7Ccolor:0xe98d58&style=feature:road.highway.controlled_access%7Celement:geometry.stroke%7Ccolor:0xdb8555&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x806b63&style=feature:transit.line%7Celement:geometry%7Ccolor:0xdfd2ae&style=feature:transit.line%7Celement:labels.text.fill%7Ccolor:0x8f7d77&style=feature:transit.line%7Celement:labels.text.stroke%7Ccolor:0xebe3cd&style=feature:transit.station%7Celement:geometry%7Ccolor:0xdfd2ae&style=feature:water%7Celement:geometry.fill%7Ccolor:0xb9d3c2&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x92998d&size=480x360`, // 底圖
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
    computed: {
      ...mapGetters(['position'])
    },
    methods: {
      setMap() {
        this.$nextTick(() => {
          const position = this.$store.getters.position;
          this.center = [position.latitude, position.longitude];
          this.$refs.myLocation.mapObject.openPopup();
          // console.log(this.$refs.myMap.setCenter)
        });
      },
      getCurrentPosition() {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition((position) => {
            const currentPosition = {latitude: position.coords.latitude, longitude: position.coords.longitude};
            this.$store.dispatch("setCurrentPosition", currentPosition);
            console.log(this.$refs.myMap.setCenter)
            // update:center
          }, (error) => {
            this.getData();
            console.log("定位失敗", error);  // 做失敗處置
          })
        } else {
          this.getData();
          console.log("無法使用定位") // 做失敗處置
        }
      }
    },
    mounted() {
      // 地圖創完套資料
      this.setMap();
      this.getCurrentPosition()
      console.log(this.$refs)
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