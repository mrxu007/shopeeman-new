
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
const countries_option_sub = [
  { label: '泰国站', value: 'TH' },
  { label: '马来站', value: 'MY' },
  { label: '台湾站', value: 'TW' },
  { label: '新加坡站', value: 'SG' },
  { label: '菲律宾站', value: 'PH' },
  { label: '越南站', value: 'VN' },
  { label: '印尼站', value: 'ID' }
]
const countries_option_sub_abroad = [
  { label: '泰国站', value: 'TH' },
  { label: '马来站', value: 'MY' },
  { label: '新加坡站', value: 'SG' },
  { label: '菲律宾站', value: 'PH' },
  { label: '越南站', value: 'VN' },
  { label: '印尼站', value: 'ID' }
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

// 各站点平台
const site_platform = {
  'MY': '0',
  'TW': '1',
  'VN': '2',
  'ID': '3',
  'PH': '4',
  'TH': '5',
  'SG': '6',
  'BR': '7'
}
// 各站点shoppeman商品ID跳转页面http前缀
const site_http_com = {
  'MY': 'https://my.xiapibuy.com',
  'TW': 'https://xiapi.xiapibuy.com',
  'VN': 'https://vn.xiapibuy.com',
  'ID': 'https://id.xiapibuy.com',
  'PH': 'https://ph.xiapibuy.com',
  'TH': 'https://th.xiapibuy.com',
  'SG': 'https://sg.xiapibuy.com',
  'BR': 'https://br.xiapibuy.com',
  'MX': 'https://mx.xiapibuy.com',
  'CO': 'https://co.xiapibuy.com', // 暂时无效
  'CL': 'https://cl.xiapibuy.com', // 暂时无效
  'PL': 'https://pl.xiapibuy.com', // 暂时无效
  'FR': 'https://fr.xiapibuy.com', // 暂时无效
  'ES': 'https://es.xiapibuy.com' // 暂时无效
}

// lazada各站点链接
const lazada_goods_url = {
  'TH': 'https://www.lazada.co.th/products/i',
  'MY': 'https://www.lazada.com.my/products/i', // 马来西亚
  'VN': 'https://www.lazada.vn/products/i', // 越南
  'ID': 'https://www.lazada.co.id/products/i', // 印度尼西亚
  'PH': 'https://www.lazada.com.ph/products/i', // 菲律宾
  'SG': 'https://www.lazada.sg/products/i'
}

const special_characters = [
  '♞', '♘', '♙', '♟', '♕', '♛', '☬', '♝', '☫', '♚', '☃', '☸', '♗', '☊', '☋', '❡', '๑', '♨', '❖', '☇', '☈', '۞', '۩', '♤',
  '♠', '♧', '♣', '◇', '◆', '▧', '◘', '▩', '▣', '◙', '▨', '▤', '▥', '▦', '✠', '☜', '☞', '☎', '☏', '♂', '♀', '☼', '♈',
  '☄', 'ﺴ', '◈', '♦', '◊', '₪', '✌', '☃', 'ↂ', '☁', '☂', '¤', '☽', '☾', '✙', '✈', '✉', '✁', '㍿', '№', '✎', '✐', '◎', '○',
  '●', '⊕', '⊙', '◕', '◑', '◐', '™', '℗', 'ஐ', '℡', '✔', '☑', '☒', '☢', '▪', '▫', '□', '■', '❈', '❉', '❧', '❦', '❁',
  '❀', '✳', '✲', '✱', '❈', '❃', '❂', '❁', '❀', '✿', '✾', '✽', '✼', '✻', '✺', '✹', '✸', '✷', '✶', '✵', '✴', '❄', '❅', '❆',
  '❇', '┋', '┇', '┅', '﹉', '﹊', '﹍', '﹍', '∈', '∋', '∏', '▬', '☍', '△', '▽', '▲', '▼', '►', '◄', '卍', '卐', '☌', '❣',
  '✆', '✇', '✑', '✒', '✓', '✕', '✖', '✢', '✣', '✤', '✥', '✟', '✧', '❍', '❏', '❐', '❒', '✗', '✘', '✚', '✜', '✝']

var chineseSite = function(val) {
  let attribute = val && (val + '').toLocaleUpperCase() || val
  attribute = countries_id[attribute] || attribute
  return countries[attribute] || attribute
}
var imageRender = function(data) {
  const country = data[0]
  const shop_id = data[1]
  const image_value = data[2]
  const isArr = data[3] || ''
  let attribute = country && (country + '').toLocaleUpperCase() || country
  attribute = countries_id[attribute] || attribute
  const url = countries_image[attribute] && (countries_image[attribute] + '/file/' + shop_id + '/' + image_value) || ''
  return isArr && [url] || url
}
var siteCoin = function(val) {
  let attribute = val && (val + '').toLocaleUpperCase() || val
  attribute = countries_id[attribute] || attribute
  return site_coin_symbol[attribute] || attribute
}
var sitePlatform = function(val) {
  let attribute = val && (val + '').toLocaleUpperCase() || val
  attribute = site_platform[attribute] || attribute
  return site_platform[attribute] || attribute
}
var countryShopeebuyCom = function(val) {
  let attribute = val && (val + '').toLocaleUpperCase() || val
  attribute = site_http_com[attribute] || attribute
  return site_http_com[attribute] || attribute
}

var lazadaGoodsUrl = function(val) {
  let attribute = val && (val + '').toLocaleUpperCase() || val
  attribute = lazada_goods_url[attribute] || attribute
  return lazada_goods_url[attribute] || attribute
}

var imageRenderhaventID = function(data) { // 第二个参数传任意传
  const country = data[0]
  // const shop_id = data[1]
  const image_value = data[2]
  const isArr = data[3] || ''
  let attribute = country && (country + '').toLocaleUpperCase() || country
  attribute = countries_id[attribute] || attribute
  const url = countries_image[attribute] && (countries_image[attribute] + '/file/' + image_value) || ''
  return isArr && [url] || url
}

export { chineseSite, imageRender, imageRenderhaventID, siteCoin, sitePlatform, countryShopeebuyCom, lazadaGoodsUrl, countries_option, countries_site,countries_option_sub,countries_option_sub_abroad }
