import Vue from 'vue';
import App from './App.vue';

import Vuex from 'vuex';
import { storeObject } from './store';

import { LMap, LTileLayer, LMarker, LPopup, LIcon } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.use(Vuex);
const store = new Vuex.Store(storeObject);

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.component("l-popup", LPopup);
Vue.component("l-icon", LIcon);


// 如果 icon 失效，就加上這個
import { Icon } from "leaflet";
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
