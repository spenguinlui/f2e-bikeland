# 作品說明

The F2E 自行車道地圖資訊整合網，串接交通部 PTX 資料，達到找尋公用自行車站點等相關資訊。
作品為 RWD 環境

## 網站 Demo
[https://spenguinlui.github.io/f2e-bikeland/](https://spenguinlui.github.io/f2e-bikeland/)

## 設計稿來源

UI/UX 設計師：Shiaohan

[figma 連結](https://www.figma.com/file/TbGIzJq0BU1DvUDrphrcWl/The-F2E-Week-02?node-id=2%3A3)

[系列相關設計連結](https://2021.thef2e.com/users/6296427084285739387)

[作品集連結](https://www.behance.net/hsiaohan)

# 功能項目

- 以自身定位搜尋附近公用自行車站點
- 顯示可租借車輛數量
- 顯示可還車位置數量
- 以自身距離排序資料
- 搜尋當前城市下政府開放自行車路線
- 以自身定位搜尋附近景點、餐廳
- 站點、路線等投射於地圖上

# 系統說明

系統以 Vue 2 環境建立，並以 scss 編寫樣式。

系統運行方式:
```
yarn install
yarn run serve
```


# 資料夾說明

* assets/images - 圖片與 icon
* assets/scss - scss 引用檔
* components - vue 元件
* help - 引用 js function
* store.js - vuex 資料存放

# 使用技術、套件、第三方服務

* Vue Cli
* Vuex
* Axios
* JsSHA
* Leaflet
* ESlint
* SCSS
* fontawesome

# 串接 API 資料

PTX (https://ptx.transportdata.tw/MOTC/v2/)

```
取得指定[位置,範圍]的全臺公共自行車租借站位資料
- Bike/Station/NearBy
取得指定[位置,範圍]的全臺公共自行車即時車位資料
- Bike/Availability/NearBy
取得指定縣市之自行車道路網圖資
- Cycling/Shape/{City}
取得所有觀光餐飲資料
- Tourism/ScenicSpot
取得所有觀光景點資料
- Tourism/Restaurant
```