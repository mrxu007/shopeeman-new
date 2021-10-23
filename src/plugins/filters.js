/**
 * 站点转换位中文
 * @param val {String} 国家code
 * @return {String} 站点 | 国家code
 */
let countries = {
  'MY': '马来',
  'TW': '台湾',
  'SG': '新加坡',
  'PH': '菲律宾',
  'TH': '泰国',
  'VN': '越南',
  'ID': '印尼',
  'BR': '巴西'
}
let countries_id = {
  '4': 'TH',
  '5': 'MY',
  '3': 'TW',
  '1': 'SG',
  '7': 'PH',
  '6': 'VN',
  '2': 'ID',
  '8': 'BR'
}
let countries_image = {
  "MY" : "https://cf.shopee.com.my",
  "TW" : "https://s-cf-tw.shopeesz.com",
  "VN" : "https://cf.shopee.vn",
  "ID" : "https://cf.shopee.co.id",
  "PH" : "https://cf.shopee.ph",
  "TH" : "https://cf.shopee.co.th",
  "SG" : "https://cf.shopee.sg",
  "BR" : "https://cf.shopee.com.br",
  "MX" : "https://cf.shopee.com.mx",
  "CO" : "https://cf.shopee.com.co",
  "CL" : "https://cf.shopee.cl",
  "PL" : "https://cf.shopee.pl",
}

var chineseSite = function(val) {
  let attribute = val && (val+'').toLocaleUpperCase() || val
  attribute = countries_id[attribute] || attribute
  return countries[attribute] || attribute
}
var imageRender = function(data) {
  let country = data[0]
  let shop_id = data[1]
  let image_value = data[2]
  let attribute = country && (country+'').toLocaleUpperCase() || country
  attribute = countries_id[attribute] || attribute
  return countries_image[attribute] && (countries_image[attribute] + '/file/' + shop_id + '/' + image_value) || ''
}
export { chineseSite,imageRender }
