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

const axiousObjsct = ({ dataType, query }) => {
  switch (dataType) {
    case "Bike/Station/NearBy":
      console.log("1")
      break;
    case "Bike/Availability/NearBy":
      console.log("2")
      break;
    case "Tourism/ScenicSpot":
      console.log("2")
      break;
    case "Tourism/Restaurant":
      console.log("2")
      break;
    default:
      console.log("錯誤的資料請求")
      break;
  }
  const queryStr = query; // 待處理
  const url = `https://ptx.transportdata.tw/MOTC/v2/${dataType}?${queryStr}&$format=JSON`
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

export default axiousObjsct();