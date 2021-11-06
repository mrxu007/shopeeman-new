/*
 * @Author: your name
 * @Date: 2021-10-22 11:28:33
 * @LastEditTime: 2021-11-06 11:07:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\plugins\filters.js
 */
/**
 * 站点转换位中文
 * @param val {String} 国家code
 * @return {String} 站点 | 国家code
 */
const countries = {
  'MY': '马来',
  'TW': '台湾',
  'SG': '新加坡',
  'PH': '菲律宾',
  'TH': '泰国',
  'VN': '越南',
  'ID': '印尼',
  'BR': '巴西',
  'MX': '墨西哥',
  'CO': '哥伦比亚',
  'CL': '智利',
  'PL': '波兰'
}
const countries_id = {
  '4': 'TH',
  '5': 'MY',
  '3': 'TW',
  '1': 'SG',
  '7': 'PH',
  '6': 'VN',
  '2': 'ID',
  '8': 'BR',
  '9': 'MX',
  '10': 'CO',
  '11': 'CL',
  '12': 'PL'
}
const countries_image = {
  'MY': 'https://cf.shopee.com.my',
  'TW': 'https://s-cf-tw.shopeesz.com',
  'VN': 'https://cf.shopee.vn',
  'ID': 'https://cf.shopee.co.id',
  'PH': 'https://cf.shopee.ph',
  'TH': 'https://cf.shopee.co.th',
  'SG': 'https://cf.shopee.sg',
  'BR': 'https://cf.shopee.com.br',
  'MX': 'https://cf.shopee.com.mx',
  'CO': 'https://cf.shopee.com.co',
  'CL': 'https://cf.shopee.cl',
  'PL': 'https://cf.shopee.pl'
}
const countries_option = [
  { label: '泰国站', value: 'TH' },
  { label: '马来站', value: 'MY' },
  { label: '台湾站', value: 'TW' },
  { label: '新加坡站', value: 'SG' },
  { label: '菲律宾站', value: 'PH' },
  { label: '越南站', value: 'VN' },
  { label: '印尼站', value: 'ID' },
  { label: '巴西站', value: 'BR' },
  { label: '墨西哥站', value: 'MX' },
  { label: '哥伦比亚站', value: 'CO' },
  { label: '智利站', value: 'CL' },
  { label: '波兰站', value: 'PL' }
]
const countries_site = {
  '马来站': 'MY',
  '马来': 'MY',
  '台湾站': 'TW',
  '台湾': 'TW',
  '新加坡站': 'SG',
  '新加坡': 'SG',
  '菲律宾站': 'PH',
  '菲律宾': 'PH',
  '泰国站': 'TH',
  '泰国': 'TH',
  '越南站': 'VN',
  '越南': 'VN',
  '印尼站': 'ID',
  '印尼': 'ID',
  '巴西站': 'BR',
  '巴西': 'BR',
  '墨西哥站': 'MX',
  '墨西哥': 'MX',
  '哥伦比亚站': 'CO',
  '哥伦比亚': 'CO',
  '智利站': 'CL',
  '智利': 'CL',
  '波兰站': 'PL',
  '波兰': 'PL'
}
// 各站点货币符号
const site_coin_symbol = {
  'MY': 'RM',
  'TW': '$',
  'VN': '₫',
  'ID': 'Rp',
  'PH': '₱',
  'TH': '฿',
  'SG': '$',
  'BR': 'R$',
  'MX': 'MX$',
  'CO': '$',
  'CL': '$',
  'PL': 'zł'
}

var chineseSite = function(val) {
  let attribute = val && (val + '').toLocaleUpperCase() || val
  attribute = countries_id[attribute] || attribute
  return countries[attribute] || attribute
}
var imageRender = function(data) {
  let country = data[0]
  let shop_id = data[1]
  let image_value = data[2]
  let isArr = data[3] || ''
  let attribute = country && (country + '').toLocaleUpperCase() || country
  attribute = countries_id[attribute] || attribute
  let url = countries_image[attribute] && (countries_image[attribute] + '/file/' + shop_id + '/' + image_value) || ''
  return isArr && [url] || url
}
var siteCoin = function(val) {
  let attribute = val && (val + '').toLocaleUpperCase() || val
  attribute = countries_id[attribute] || attribute
  return site_coin_symbol[attribute] || attribute
}
export { chineseSite, imageRender, siteCoin, countries_option, countries_site }