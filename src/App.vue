<template>
  <div id="app">
    <!-- <l-map ref="myMap" :zoom="zoom" :center="center" :options="options" style="height: 100vh;">
      <l-tile-layer :url="url" :attribution="attribution">
        <l-marker ref="location" :lat-lng="center">
          <l-popup>
            現在位置
          </l-popup>
        </l-marker>
      </l-tile-layer>
    </l-map> -->
  </div>
</template>

<script>
import axios from 'axios';
import jsSHA from "jssha";

const GetAuthorizationHeader = () => {
  const APP_ID = process.env.VUE_APP_APP_ID;
  const APP_KEY = process.env.VUE_APP_APP_KEY;

  const GMTString = new Date().toGMTString();
  let ShaObj = new jsSHA('SHA-1', 'TEXT');
  ShaObj.setHMACKey(APP_KEY, 'TEXT');
  ShaObj.update('x-date: ' + GMTString);
  const HMAC = ShaObj.getHMAC('B64');
  const Authorization = 'hmac username="' + APP_ID + '", algorithm="hmac-sha1", headers="x-date", signature="' + HMAC + '"';

  return { 'Authorization': Authorization, 'X-Date': GMTString };
}

export default {
  name: 'App',
  data() {
    return {

    }
  },
  methods: {
    getData() {
      const url = "https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$top=30&$format=JSON";
      axios({
        method: 'get',
        url: url,
        headers: GetAuthorizationHeader()
      })
      .then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  components: {

  },
  created() {
    this.getData();
  }
}

</script>

<style lang="scss">
@import "@/assets/scss/main.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 300px;
  height: 300px;
  background-color: $header;
}
</style>
