<template>
  <div id="app">
    <Navbar/>
    <!-- <l-map ref="myMap" :zoom="zoom" :center="center" :options="options" style="width: 100vw; height: 100vh;">
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
    </l-map> -->
  </div>
</template>

<script>
import Navbar from "./components/navbar.vue"



export default {
  name: 'App',
  data() {
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
    getData() {
      console.log("準備要資料")
    },
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
  components: {
    Navbar
  },
  created() {
    // 創立元件要資料
    // this.getData();
  },
  mounted() {
    // 地圖創完套資料
    // this.setMap();
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
}
</style>


<!--

[
    {
        "StationUID": "TPE0047",
        "StationID": "0047",
        "AuthorityID": "TPE",
        "StationName": {
            "Zh_tw": "YouBike1.0_捷運忠孝新生站(4號出口)",
            "En": "YouBike1.0_MRT Zhongxiao Xinsheng Sta.(Exit 4)"
        },
        "StationPosition": {
            "PositionLon": 121.533939,
            "PositionLat": 25.042275,
            "GeoHash": "wsqqmwf3f"
        },
        "StationAddress": {
            "Zh_tw": "忠孝東路三段 / 新生南路一段口 東北側(鄰近國立台北科技大學)",
            "En": "The intersection of Sec. 3, Zhongxiao E. Rd. & Ln. 10, Sec. 3, Zhongxiao E. Rd."
        },
        "BikesCapacity": 32,
        "ServiceType": 1,
        "SrcUpdateTime": "2021-11-16T13:45:41+08:00",
        "UpdateTime": "2021-11-16T13:46:25+08:00"
    },
    {
        "StationUID": "TPE0053",
        "StationID": "0053",
        "AuthorityID": "TPE",
        "StationName": {
            "Zh_tw": "YouBike1.0_八德市場",
            "En": "YouBike1.0_Bade Market"
        },
        "StationPosition": {
            "PositionLon": 121.536609,
            "PositionLat": 25.044781,
            "GeoHash": "wsqqmxk22"
        },
        "StationAddress": {
            "Zh_tw": "建國南路一段/市民大道交叉口(北側) (鄰近國立台北科技大學)",
            "En": "The intersection of Sec.1, Jianguo S. Rd. & Civic Blvd."
        },
        "BikesCapacity": 26,
        "ServiceType": 1,
        "SrcUpdateTime": "2021-11-16T13:45:35+08:00",
        "UpdateTime": "2021-11-16T13:46:25+08:00"
    },
    {
        "StationUID": "TPE0056",
        "StationID": "0056",
        "AuthorityID": "TPE",
        "StationName": {
            "Zh_tw": "YouBike1.0_仁愛林森路口",
            "En": "YouBike1.0_Renai & Linsen Intersection"
        },
        "StationPosition": {
            "PositionLon": 121.522334,
            "PositionLat": 25.038954,
            "GeoHash": "wsqqmq1y7"
        },
        "StationAddress": {
            "Zh_tw": "林森南路/仁愛路一段路口(東北側)(鄰近臺北市青少年發展處/中正親子館)",
            "En": "The N.E. side of Linsen S. Rd & Sec. 1, Ren’ai Rd.(42)"
        },
        "BikesCapacity": 42,
        "ServiceType": 1,
        "SrcUpdateTime": "2021-11-16T13:45:41+08:00",
        "UpdateTime": "2021-11-16T13:46:25+08:00"
    },
    {
        "StationUID": "TPE0058",
        "StationID": "0058",
        "AuthorityID": "TPE",
        "StationName": {
            "Zh_tw": "YouBike1.0_捷運善導寺站(1號出口)",
            "En": "YouBike1.0_MRT Shandao Temple Sta(Exit 1)"
        },
        "StationPosition": {
            "PositionLon": 121.5222,
            "PositionLat": 25.045267,
            "GeoHash": "wsqqmr3g2"
        },
        "StationAddress": {
            "Zh_tw": "天津街/忠孝東路一段(東北側)(鄰近台北國際藝術村/蝴蝶宮昆蟲博物館/台北希望廣場)",
            "En": "The N.E. side of Tianjin St. & Sec. 1, Zhongxiao E. Rd."
        },
        "BikesCapacity": 28,
        "ServiceType": 1,
        "SrcUpdateTime": "2021-11-16T13:45:33+08:00",
        "UpdateTime": "2021-11-16T13:46:25+08:00"
    },
    {
        "StationUID": "TPE0072",
        "StationID": "0072",
        "AuthorityID": "TPE",
        "StationName": {
            "Zh_tw": "YouBike1.0_新生長安路口",
            "En": "YouBike1.0_Xinsheng & Changan Intersection"
        },
        "StationPosition": {
            "PositionLon": 121.529346,
            "PositionLat": 25.048611,
            "GeoHash": "wsqqmryyx"
        },
        "StationAddress": {
            "Zh_tw": "新生北路一段/長安東路二段交叉口(北側)",
            "En": "The intersection of Sec. 1, Xinsheng N. Rd. & Sec. 2, Chang’an E. Rd."
        },
        "BikesCapacity": 26,
        "ServiceType": 1,
        "SrcUpdateTime": "2021-11-16T13:45:22+08:00",
        "UpdateTime": "2021-11-16T13:46:25+08:00"
    },
    {
        "StationUID": "TPE0100",
        "StationID": "0100",
        "AuthorityID": "TPE",
        "StationName": {
            "Zh_tw": "YouBike1.0_金山市民路口",
            "En": "YouBike1.0_Jinshen & Civic Blvd. Intersection"
        },
        "StationPosition": {
            "PositionLon": 121.530697,
            "PositionLat": 25.045753,
            "GeoHash": "wsqqmrryn"
        },
        "StationAddress": {
            "Zh_tw": "金山北路/市民大道三段(南側)(鄰近華山文化創意產業園區/光華數位新天地(光華商場)/三創生活園區)",
            "En": "The S. side of Jinshan N. Rd. & Sec. 3, Civic Blvd."
        },
        "BikesCapacity": 40,
        "ServiceType": 1,
        "SrcUpdateTime": "2021-11-16T13:45:28+08:00",
        "UpdateTime": "2021-11-16T13:46:25+08:00"
    },
    {
        "StationUID": "TPE0101",
        "StationID": "0101",
        "AuthorityID": "TPE",
        "StationName": {
            "Zh_tw": "YouBike1.0_華山文創園區",
            "En": "YouBike1.0_Huashan 1914‧Creative Park"
        },
        "StationPosition": {
            "PositionLon": 121.528487,
            "PositionLat": 25.043668,
            "GeoHash": "wsqqmrn3f"
        },
        "StationAddress": {
            "Zh_tw": "忠孝東路二段41號前(鄰近華山文化創意產業園區/光華數位新天地(光華商場)/三創生活園區)",
            "En": "Front of No.41, Sec. 2, Zhongxiao E. Rd."
        },
        "BikesCapacity": 50,
        "ServiceType": 1,
        "SrcUpdateTime": "2021-09-13T05:07:58+08:00",
        "UpdateTime": "2021-11-16T13:46:25+08:00"
    },
    {
        "StationUID": "TPE0173",
        "StationID": "0173",
        "AuthorityID": "TPE",
        "StationName": {
            "Zh_tw": "YouBike1.0_捷運松江南京站(7號出口)",
            "En": "YouBike1.0_MRT Songjiang Nanjing Sta. (Exit 7)"
        },
        "StationPosition": {
            "PositionLon": 121.533211,
            "PositionLat": 25.052181,
            "GeoHash": "wsqqt89g9"
        },
        "StationAddress": {
            "Zh_tw": "松江路/南京東路二段(東北側)(鄰近四平陽光商圈)",
            "En": "Sec. 2, Nanjing E. Rd./Sec. 2, Nanjing E. Rd."
        },
        "BikesCapacity": 38,
        "ServiceType": 1,
        "SrcUpdateTime": "2021-11-16T13:45:22+08:00",
        "UpdateTime": "2021-11-16T13:46:25+08:00"
    },
    {
        "StationUID": "TPE0194",
        "StationID": "0194",
        "AuthorityID": "TPE",
        "StationName": {
            "Zh_tw": "YouBike1.0_市民林森路口",
            "En": "YouBike1.0_Civic Blvd Linsen Intersection"
        },
        "StationPosition": {
            "PositionLon": 121.524388,
            "PositionLat": 25.047958,
            "GeoHash": "wsqqmrg6g"
        },
        "StationAddress": {
            "Zh_tw": "市民大道二段/林森北路(東北側)(鄰近台北國際藝術村/台北希望廣場)",
            "En": "Sec. 2, Civic Blvd./Linsen N. Rd."
        },
        "BikesCapacity": 30,
        "ServiceType": 1,
        "SrcUpdateTime": "2021-11-16T13:45:33+08:00",
        "UpdateTime": "2021-11-16T13:46:25+08:00"
    },
    {
        "StationUID": "TPE0271",
        "StationID": "0271",
        "AuthorityID": "TPE",
        "StationName": {
            "Zh_tw": "YouBike1.0_伊通長安路口",
            "En": "YouBike1.0_Yitong & Chang'an Intersection"
        },
        "StationPosition": {
            "PositionLon": 121.534693,
            "PositionLat": 25.048334,
            "GeoHash": "wsqqmxfv5"
        },
        "StationAddress": {
            "Zh_tw": "伊通街/長安東路二段(交叉口西南側路側)(鄰近袖珍博物館/樹火紀念紙博物館)",
            "En": "Yitong St./Sec. 2, Chang’an E. Rd. intersection(Southwest)"
        },
        "BikesCapacity": 16,
        "ServiceType": 1,
        "SrcUpdateTime": "2021-11-16T13:45:21+08:00",
        "UpdateTime": "2021-11-16T13:46:25+08:00"
    },
    {
        "StationUID": "TPE0281",
        "StationID": "0281",
        "AuthorityID": "TPE",
        "StationName": {
            "Zh_tw": "YouBike1.0_松江公園",
            "En": "YouBike1.0_Songjiang Park"
        },
        "StationPosition": {
            "PositionLon": 121.532725,
            "PositionLat": 25.050245,
            "GeoHash": "wsqqt832m"
        },
        "StationAddress": {
            "Zh_tw": "松江路/松江路84巷(西北側路側)(鄰近樹火紀念紙博物館)",
            "En": "Songjiang Rd./Ln. 84, Songjiang Rd. intersecton"
        },
        "BikesCapacity": 20,
        "ServiceType": 1,
        "SrcUpdateTime": "2021-11-16T13:45:32+08:00",
        "UpdateTime": "2021-11-16T13:46:25+08:00"
    },
    {
        "StationUID": "TPE0288",
        "StationID": "0288",
        "AuthorityID": "TPE",
        "StationName": {
            "Zh_tw": "YouBike1.0_濟南紹興路口",
            "En": "YouBike1.0_Jinan & Shaosing Intersection"
        },
        "StationPosition": {
            "PositionLon": 121.524591,
            "PositionLat": 25.041928,
            "GeoHash": "wsqqmqexb"
        },
        "StationAddress": {
            "Zh_tw": "濟南路一段/紹興南街口東南側(鄰近蝴蝶宮昆蟲博物館/國立台北商業技術學院)",
            "En": "Sec. 1, Jinan Rd / Shaoxing S. St. ( Southeast )"
        },
        "BikesCapacity": 54,
        "ServiceType": 1,
        "SrcUpdateTime": "2021-11-16T13:45:47+08:00",
        "UpdateTime": "2021-11-16T13:46:25+08:00"
    },
    {
        "StationUID": "TPE0311",
        "StationID": "0311",
        "AuthorityID": "TPE",
        "StationName": {
            "Zh_tw": "YouBike1.0_捷運忠孝新生站(2號出口)",
            "En": "YouBike1.0_MRT Zhongxiao Xinsheng Sta.(Exit.2)"
        },
        "StationPosition": {
            "PositionLon": 121.532229,
            "PositionLat": 25.042392,
            "GeoHash": "wsqqmwc4d"
        },
        "StationAddress": {
            "Zh_tw": "忠孝東路二段123號對面(捷運忠孝新生站2號出口)(鄰近光華數位新天地(光華商場))",
            "En": "No.123, Sec. 2, Zhongxiao E. Rd.(oppsite)"
        },
        "BikesCapacity": 16,
        "ServiceType": 1,
        "SrcUpdateTime": "2021-11-16T13:45:39+08:00",
        "UpdateTime": "2021-11-16T13:46:25+08:00"
    },
    {
        "StationUID": "TPE0313",
        "StationID": "0313",
        "AuthorityID": "TPE",
        "StationName": {
            "Zh_tw": "YouBike1.0_光華商場",
            "En": "YouBike1.0_Guang Hua Computer Market"
        },
        "StationPosition": {
            "PositionLon": 121.532738,
            "PositionLat": 25.04515,
            "GeoHash": "wsqqmx36w"
        },
        "StationAddress": {
            "Zh_tw": "市民大道三段/新生北路一段路口西南側人行道(光華商場)(鄰近光華數位新天地(光華商場)/三創生活園區)",
            "En": "Sec. 3, Civic Blvd. / Sec. 1, Xinsheng N. Rd. intersection"
        },
        "BikesCapacity": 38,
        "ServiceType": 1,
        "SrcUpdateTime": "2021-11-16T13:45:18+08:00",
        "UpdateTime": "2021-11-16T13:46:25+08:00"
    },
    {
        "StationUID": "TPE0354",
        "StationID": "0354",
        "AuthorityID": "TPE",
        "StationName": {
            "Zh_tw": "YouBike1.0_建國濟南路口",
            "En": "YouBike1.0_Jianguo & Jinan Intersection"
        },
        "StationPosition": {
            "PositionLon": 121.538084,
            "PositionLat": 25.040033,
            "GeoHash": "wsqqmwmkf"
        },
        "StationAddress": {
            "Zh_tw": "建國南路一段/濟南路三段口(東南側)",
            "En": "Sec. 1, Jianguo S. Rd. / Sec. 3, Jinan Rd. intersection"
        },
        "BikesCapacity": 28,
        "ServiceType": 1,
        "SrcUpdateTime": "2021-11-16T13:45:26+08:00",
        "UpdateTime": "2021-11-16T13:46:25+08:00"
    },
    {
        "StationUID": "TPE0401",
        "StationID": "0401",
        "AuthorityID": "TPE",
        "StationName": {
            "Zh_tw": "YouBike1.0_南京新生路口",
            "En": "YouBike1.0_Nanjing & Xinsheng Intersection"
        },
        "StationPosition": {
            "PositionLon": 121.527661,
            "PositionLat": 25.051944,
            "GeoHash": "wsqqt2tdp"
        },
        "StationAddress": {
            "Zh_tw": "新生北路一段 / 南京東路一段口(橋墩下方)(鄰近林森公園/康樂公園)",
            "En": "Sec. 1, Xinsheng N. Rd. / Sec. 1, Nanjing E. Rd."
        },
        "BikesCapacity": 24,
        "ServiceType": 1,
        "SrcUpdateTime": "2021-11-16T13:45:28+08:00",
        "UpdateTime": "2021-11-16T13:46:25+08:00"
    },
    {
        "StationUID": "TPE500101127",
        "StationID": "500101127",
        "AuthorityID": "TPE",
        "StationName": {
            "Zh_tw": "YouBike2.0_台北科技大學億光大樓",
            "En": "YouBike2.0_National Taipei University of Technology (Everlight Building)"
        },
        "StationPosition": {
            "PositionLon": 121.53833,
            "PositionLat": 25.04177,
            "GeoHash": "wsqqmwtwb"
        },
        "StationAddress": {
            "Zh_tw": "忠孝東路三段81號",
            "En": "No. 81, Sec. 3, Zhongxiao E. Rd."
        },
        "BikesCapacity": 46,
        "ServiceType": 2,
        "SrcUpdateTime": "2021-11-16T13:46:11+08:00",
        "UpdateTime": "2021-11-16T13:46:25+08:00"
    },
    {
        "StationUID": "TPE500101128",
        "StationID": "500101128",
        "AuthorityID": "TPE",
        "StationName": {
            "Zh_tw": "YouBike2.0_新生南路一段119巷口",
            "En": "YouBike2.0_Ln. 119, Sec. 1, Xinsheng S. Rd Intersection"
        },
        "StationPosition": {
            "PositionLon": 121.53299,
            "PositionLat": 25.04003,
            "GeoHash": "wsqqmw3se"
        },
        "StationAddress": {
            "Zh_tw": "新生南路一段113號",
            "En": "No. 113, Ln. 119, Sec. 1, Xinsheng S. Rd."
        },
        "BikesCapacity": 33,
        "ServiceType": 2,
        "SrcUpdateTime": "2021-11-16T13:22:34+08:00",
        "UpdateTime": "2021-11-16T13:46:25+08:00"
    },
    {
        "StationUID": "TPE500101129",
        "StationID": "500101129",
        "AuthorityID": "TPE",
        "StationName": {
            "Zh_tw": "YouBike2.0_幸安國小(仁愛路)",
            "En": "YouBike2.0_Xing'an Elementary School (Ren'ai Rd)"
        },
        "StationPosition": {
            "PositionLon": 121.53523,
            "PositionLat": 25.03753,
            "GeoHash": "wsqqmtgq0"
        },
        "StationAddress": {
            "Zh_tw": "仁愛路三段22號",
            "En": "No. 22, Sec. 3, Ren'ai Rd."
        },
        "BikesCapacity": 16,
        "ServiceType": 2,
        "SrcUpdateTime": "2021-11-16T13:46:11+08:00",
        "UpdateTime": "2021-11-16T13:46:25+08:00"
    },
    {
        "StationUID": "TPE500101142",
        "StationID": "500101142",
        "AuthorityID": "TPE",
        "StationName": {
            "Zh_tw": "YouBike2.0_八德市場",
            "En": "YouBike2.0_Bade Traditional Market"
        },
        "StationPosition": {
            "PositionLon": 121.53665,
            "PositionLat": 25.04463,
            "GeoHash": "wsqqmxhr9"
        },
        "StationAddress": {
            "Zh_tw": "市民大道三段170號",
            "En": "No. 170, Sec. 3, Civic Blvd."
        },
        "BikesCapacity": 30,
        "ServiceType": 2,
        "SrcUpdateTime": "2021-11-16T13:42:09+08:00",
        "UpdateTime": "2021-11-16T13:46:25+08:00"
    },
    {
        "StationUID": "TPE500101143",
        "StationID": "500101143",
        "AuthorityID": "TPE",
        "StationName": {
            "Zh_tw": "YouBike2.0_昌隆公園",
            "En": "YouBike2.0_Changlong Park"
        },
        "StationPosition": {
            "PositionLon": 121.53946,
            "PositionLat": 25.04448,
            "GeoHash": "wsqqmxnqd"
        },
        "StationAddress": {
            "Zh_tw": "市民大道三段206號西側",
            "En": "No. 206, Sec. 3, Civic Blvd. (West)"
        },
        "BikesCapacity": 16,
        "ServiceType": 2,
        "SrcUpdateTime": "2021-11-16T13:46:11+08:00",
        "UpdateTime": "2021-11-16T13:46:25+08:00"
    },
    {
        "StationUID": "TPE500101149",
        "StationID": "500101149",
        "AuthorityID": "TPE",
        "StationName": {
            "Zh_tw": "YouBike2.0_捷運忠孝新生站(6號出口)",
            "En": "YouBike2.0_MRT Zhongxiao Xinsheng Sta. (Exit 6)"
        },
        "StationPosition": {
            "PositionLon": 121.53295,
            "PositionLat": 25.04091,
            "GeoHash": "wsqqmw99f"
        },
        "StationAddress": {
            "Zh_tw": "新生南路一段101號",
            "En": "No. 101, Sec. 1, Xinsheng S. Rd."
        },
        "BikesCapacity": 15,
        "ServiceType": 2,
        "SrcUpdateTime": "2021-11-16T13:41:00+08:00",
        "UpdateTime": "2021-11-16T13:46:25+08:00"
    },
    {
        "StationUID": "TPE500101152",
        "StationID": "500101152",
        "AuthorityID": "TPE",
        "StationName": {
            "Zh_tw": "YouBike2.0_捷運忠孝新生站(3號出口)",
            "En": "YouBike2.0_MRT Zhongxiao Xinsheng Sta. (Exit 3)"
        },
        "StationPosition": {
            "PositionLon": 121.53376,
            "PositionLat": 25.04189,
            "GeoHash": "wsqqmwdpt"
        },
        "StationAddress": {
            "Zh_tw": "忠孝東路三段與10巷口",
            "En": "Sec. 3, Zhongxiao E. Rd & Ln. 10, Sec. 3, Zhongxiao E. Rd Intersection"
        },
        "BikesCapacity": 23,
        "ServiceType": 2,
        "SrcUpdateTime": "2021-11-16T13:46:11+08:00",
        "UpdateTime": "2021-11-16T13:46:25+08:00"
    },
    {
        "StationUID": "TPE500106042",
        "StationID": "500106042",
        "AuthorityID": "TPE",
        "StationName": {
            "Zh_tw": "YouBike2.0_華山文創園區",
            "En": "YouBike2.0_Huashan 1914 Creative Park"
        },
        "StationPosition": {
            "PositionLon": 121.52849,
            "PositionLat": 25.04367,
            "GeoHash": "wsqqmrn3g"
        },
        "StationAddress": {
            "Zh_tw": "忠孝東路二段41號",
            "En": "No. 41, Sec. 2, Zhongxiao E. Rd."
        },
        "BikesCapacity": 39,
        "ServiceType": 2,
        "SrcUpdateTime": "2021-11-16T13:46:11+08:00",
        "UpdateTime": "2021-11-16T13:46:25+08:00"
    },
    {
        "StationUID": "TPE500106043",
        "StationID": "500106043",
        "AuthorityID": "TPE",
        "StationName": {
            "Zh_tw": "YouBike2.0_捷運善導寺站(1號出口)",
            "En": "YouBike2.0_MRT Shandao Temple Sta (Exit 1)"
        },
        "StationPosition": {
            "PositionLon": 121.5222,
            "PositionLat": 25.04527,
            "GeoHash": "wsqqmr3g2"
        },
        "StationAddress": {
            "Zh_tw": "忠孝東路一段7號",
            "En": "No. 7, Sec. 1, Zhongxiao E. Rd."
        },
        "BikesCapacity": 17,
        "ServiceType": 2,
        "SrcUpdateTime": "2021-11-16T13:43:10+08:00",
        "UpdateTime": "2021-11-16T13:46:25+08:00"
    },
    {
        "StationUID": "TPE500106044",
        "StationID": "500106044",
        "AuthorityID": "TPE",
        "StationName": {
            "Zh_tw": "YouBike2.0_濟南紹興路口",
            "En": "YouBike2.0_Jinan Rd & Shaoxing S. St Intersection"
        },
        "StationPosition": {
            "PositionLon": 121.52459,
            "PositionLat": 25.04193,
            "GeoHash": "wsqqmqexb"
        },
        "StationAddress": {
            "Zh_tw": "濟南紹興路口東南側",
            "En": "Jinan Rd & Shaoxing S. St Intersection. (Southeast)"
        },
        "BikesCapacity": 20,
        "ServiceType": 2,
        "SrcUpdateTime": "2021-11-16T13:44:10+08:00",
        "UpdateTime": "2021-11-16T13:46:25+08:00"
    },
    {
        "StationUID": "TPE500106046",
        "StationID": "500106046",
        "AuthorityID": "TPE",
        "StationName": {
            "Zh_tw": "YouBike2.0_林森仁愛路口",
            "En": "YouBike2.0_Linsen S. Rd & Sec 1, Ren'ai Rd Intersection"
        },
        "StationPosition": {
            "PositionLon": 121.52163,
            "PositionLat": 25.03915,
            "GeoHash": "wsqqmq1re"
        },
        "StationAddress": {
            "Zh_tw": "林森南路與仁愛路一段西北側",
            "En": "Linsen S. Rd & Section 1, Ren'ai Rd Intersection. (Northwest)"
        },
        "BikesCapacity": 13,
        "ServiceType": 2,
        "SrcUpdateTime": "2021-11-16T13:41:00+08:00",
        "UpdateTime": "2021-11-16T13:46:25+08:00"
    },
    {
        "StationUID": "TPE500106049",
        "StationID": "500106049",
        "AuthorityID": "TPE",
        "StationName": {
            "Zh_tw": "YouBike2.0_捷運善導寺站(3號出口)",
            "En": "YouBike2.0_MRT Shandao Temple Sta (Exit 3)"
        },
        "StationPosition": {
            "PositionLon": 121.52336,
            "PositionLat": 25.04428,
            "GeoHash": "wsqqmr4te"
        },
        "StationAddress": {
            "Zh_tw": "林森南路1號南側",
            "En": "No. 21, Linsen S. Rd. (South)"
        },
        "BikesCapacity": 20,
        "ServiceType": 2,
        "SrcUpdateTime": "2021-11-16T13:42:10+08:00",
        "UpdateTime": "2021-11-16T13:46:25+08:00"
    },
    {
        "StationUID": "TPE500106057",
        "StationID": "500106057",
        "AuthorityID": "TPE",
        "StationName": {
            "Zh_tw": "YouBike2.0_市民金山路口",
            "En": "YouBike2.0_Civic Blvd & Jinshan N. Rd Intersection"
        },
        "StationPosition": {
            "PositionLon": 121.53068,
            "PositionLat": 25.0459,
            "GeoHash": "wsqqmrryy"
        },
        "StationAddress": {
            "Zh_tw": "金山市民大道口南側",
            "En": "Jinshan N. Rd & Civic Blvd Intersection. (South)"
        },
        "BikesCapacity": 18,
        "ServiceType": 2,
        "SrcUpdateTime": "2021-11-16T13:44:10+08:00",
        "UpdateTime": "2021-11-16T13:46:25+08:00"
    },
    {
        "StationUID": "TPE500106070",
        "StationID": "500106070",
        "AuthorityID": "TPE",
        "StationName": {
            "Zh_tw": "YouBike2.0_光華商場",
            "En": "YouBike2.0_Guang Hua Computer Market"
        },
        "StationPosition": {
            "PositionLon": 121.53274,
            "PositionLat": 25.04478,
            "GeoHash": "wsqqmx32q"
        },
        "StationAddress": {
            "Zh_tw": "新生北路一段/市民大道三段口(西側)",
            "En": "Sec. 1, Sinsheng N. Rd. & Sec. 3, Civic Blvd. Intersection (West)"
        },
        "BikesCapacity": 15,
        "ServiceType": 2,
        "SrcUpdateTime": "2021-11-16T13:44:10+08:00",
        "UpdateTime": "2021-11-16T13:46:25+08:00"
    }
]

-->