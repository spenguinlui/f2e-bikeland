import jsSHA from "jssha";

const authorizationHeader = () => {
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

const urlQueryStr = (dataType, query = null) => {
  let queryStr = "";
  if (query.position) {
    if (dataType === "Tourism/ScenicSpot" || dataType === "Tourism/Restaurant") {
      queryStr += `&$spatialFilter=nearby(Position, ${query.position.latitude},${query.position.longitude},1000)`;
    } else {
      queryStr += `&$spatialFilter=nearby(${query.position.latitude},${query.position.longitude},1000)`;
    }
    // if (query.select) {
    //   queryStr += '&$select=';
    //   query.select.map((s) => queryStr += `${s},`);
    // }
  }

  if (query.top) queryStr += `&$top=${query.top}`;

  // ..其他的參數在這處理
  const url = encodeURI(`https://ptx.transportdata.tw/MOTC/v2/${dataType}?$format=JSON${queryStr}`);
  return url
}

export default { authorizationHeader, urlQueryStr };