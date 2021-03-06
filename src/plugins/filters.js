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

/** *
 * 虾皮各站点
 */
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

// lazada各网址对应站点
const lazada_goods_site = {
  'http://www.lazada.co.th/': 'TH',
  'https://www.lazada.co.th/': 'TH',
  'http://www.lazada.com.my/': 'MY', // 马来西亚
  'https://www.lazada.com.my/': 'MY', // 马来西亚
  'http://www.lazada.vn/': 'VN', // 越南
  'https://www.lazada.vn/': 'VN', // 越南
  'http://www.lazada.co.id/': 'ID', // 印度尼西亚
  'https://www.lazada.co.id/': 'ID', // 印度尼西亚
  'http://www.lazada.com.ph/': 'PH', // 菲律宾
  'https://www.lazada.com.ph/': 'PH', // 菲律宾
  'http://www.lazada.sg/': 'SG', // 新加坡
  'https://www.lazada.sg/': 'SG' // 新加坡
}

const special_characters = [
  '♞', '♘', '♙', '♟', '♕', '♛', '☬', '♝', '☫', '♚', '☃', '☸', '♗', '☊', '☋', '❡', '๑', '♨', '❖', '☇', '☈', '۞', '۩', '♤',
  '♠', '♧', '♣', '◇', '◆', '▧', '◘', '▩', '▣', '◙', '▨', '▤', '▥', '▦', '✠', '☜', '☞', '☎', '☏', '♂', '♀', '☼', '♈',
  '☄', 'ﺴ', '◈', '♦', '◊', '₪', '✌', '☃', 'ↂ', '☁', '☂', '¤', '☽', '☾', '✙', '✈', '✉', '✁', '㍿', '№', '✎', '✐', '◎', '○',
  '●', '⊕', '⊙', '◕', '◑', '◐', '™', '℗', 'ஐ', '℡', '✔', '☑', '☒', '☢', '▪', '▫', '□', '■', '❈', '❉', '❧', '❦', '❁',
  '❀', '✳', '✲', '✱', '❈', '❃', '❂', '❁', '❀', '✿', '✾', '✽', '✼', '✻', '✺', '✹', '✸', '✷', '✶', '✵', '✴', '❄', '❅', '❆',
  '❇', '┋', '┇', '┅', '﹉', '﹊', '﹍', '﹍', '∈', '∋', '∏', '▬', '☍', '△', '▽', '▲', '▼', '►', '◄', '卍', '卐', '☌', '❣',
  '✆', '✇', '✑', '✒', '✓', '✕', '✖', '✢', '✣', '✤', '✥', '✟', '✧', '❍', '❏', '❐', '❒', '✗', '✘', '✚', '✜', '✝']

const chineseSite = function(val) {
  if (val instanceof Array) {
    let countries = []
    for (let i = 0; i < val.length; i++) {
      countries.push(chineseSite(val[i]))
    }
    return countries.toString()
  } else {
    let attribute = val && (val + '').toLocaleUpperCase() || val
    attribute = countries_id[attribute] || attribute
    return countries[attribute] || attribute
  }
}
const imageRender = function(data) {
  const image_value = data[0]
  const mini = data[1] && '_tn' || ''
  const isArr = data[2] || ''
  const url = 'https://s-cf-tw.shopeesz.com/file/' + image_value + mini
  return isArr && [url] || url
}
const siteCoin = function(val) {
  // console.log(val)
  let attribute = val && (val + '').toLocaleUpperCase() || val
  attribute = countries_id[attribute] || attribute
  return site_coin_symbol[attribute] || attribute
}
const sitePlatform = function(val) {
  let attribute = val && (val + '').toLocaleUpperCase() || val
  attribute = site_platform[attribute] || attribute
  return site_platform[attribute] || attribute
}
const countryShopeebuyCom = function(val) {
  let attribute = val && (val + '').toLocaleUpperCase() || val
  attribute = site_http_com[attribute] || attribute
  return site_http_com[attribute] || attribute
}

const lazadaGoodsUrl = function(val) {
  let attribute = val && (val + '').toLocaleUpperCase() || val
  attribute = lazada_goods_url[attribute] || attribute
  return lazada_goods_url[attribute] || attribute
}

const lazadaGoodsSite = function(val) {
  let attribute = val && (val + '').toLocaleLowerCase() || val
  attribute = lazada_goods_site[attribute] || attribute
  return lazada_goods_site[attribute] || attribute
}

const currencyShow = function(data) {
  let temp = ''
  switch (data) {
    case 'MY':
      temp = 'RM'
      break
    case 'PH':
      temp = '₱'
      break
    case 'ID':
      temp = 'Rp'
      break
    case 'VN':
      temp = '₫'
      break
    case 'TH':
      temp = '฿'
      break
    case 'BR':
      temp = 'R$'
      break
    case 'MX':
      temp = 'MX$'
      break
    case 'PL':
      temp = 'zł'
      break
    default :
      temp = '$'
  }
  return temp
}

const changeImgSizeFilter = (value) => {
  const source = Number(value.source)
  const url = value.url
  const width = value.width || 60
  if (!url) {
    return '#'
  }
  if (/pinxiaoe.oss-cn-shenzhen.aliyuncs.com/g.test(url)) {
    return url
  }
  if (/ap-guangzhou.myqcloud.com/g.test(url)) {
    return url
  }
  let resUrl = ''
  switch (source) {
    case 1: // 拼多多
    case 7:
      resUrl = url + '?imageView2/2/w/' + width + '/q/80/format/webp'
      break
    case 2: // 淘宝
    case 3:
      resUrl = url + '_' + width + 'x' + width + '.jpg'
      break
    case 5:
    case 8: // 1688
      if (url.indexOf('.search.jpg') > -1) {
        resUrl = url.replace('.search.jpg', '.' + width + 'x' + width + '.jpg')
      } else if ((/[0-9]*x[0-9]*/).test(url)) { // 存在缩略图的情况判断
        resUrl = url.replace(/\.[0-9]*x[0-9]*/, '.' + width + 'x' + width)
      } else {
        const mm = url.split('.jpg')
        resUrl = mm && mm[0] ? mm[0] + '.' + width + 'x' + width + '.jpg' : url
      }
      break
    case 4: // 京东
    case 10: // 京喜
      if (/\/s\d{1,}x\d{1,}_jfs\//g.test(url)) {
        resUrl = url.replace(/\/s\d{1,}x\d{1,}_jfs\//g, '/s' + width + 'x' + width + '_jfs/')
      } else {
        resUrl = url.replace('popWaterMark', 'n5')
      }
      break
    default:
      break
  }
  return resUrl || url
}

const errorMsg = function(userMessage) {
  let msg = ''
  try {
    if (userMessage.indexOf('reached the product upload limit') > -1) {
      msg = '店铺产品已上满，请选择其他店铺上新'
    } else if (userMessage.indexOf('product count has reached upper limit') > -1) {
      msg = '店铺产品已上满，请选择其他店铺上新'
    } else if (userMessage.indexOf('You have reached the product upload limit') > -1) {
      msg = '店铺产品已上满，请选择其他店铺上新'
    } else if (userMessage.indexOf('The product is duplicated with another') > -1) {
      msg = '检查到商品已经刊登'
    } else if (userMessage.indexOf('options count does not match with models count') > -1) {
      msg = '数据格式异常，请联系客服'
    } else if (userMessage.indexOf('at least one channel') > -1) {
      msg = '请至商家后台【商店设定】中开启物流方式'
    } else if (userMessage.indexOf('param is invalid') > -1) {
      msg = '上新数据无效，请联系客服'
    } else if (userMessage.indexOf('create product failed') > -1) {
      msg = '商品创建失败'
    } else if (userMessage.indexOf('product is duplicated') > -1) {
      msg = '检查到商品已经刊登'
    } else if (userMessage.indexOf('Failed to create product with invalid param') > -1) {
      msg = '请检查商品的属性是否正确'
    } else if (userMessage.indexOf('The product\'s category is invalid') > -1) {
      msg = '类目无效，请重新选择类目'
    } else if (userMessage.indexOf('Create product too fast') > -1) {
      msg = '上新频率太快，请调整上新时间间隔'
    } else if (userMessage.indexOf('product has invalid logistics config') > -1) {
      msg = '请检查物流配置是否开启'
    } else if (userMessage.indexOf('product\'s logistics config is invalid') > -1) {
      msg = '物流配置无效，请检查物流配置是否正常'
    } else if (userMessage.indexOf('not enough logistics channel') > -1) {
      msg = '未设置物流，请商家后台至少开启一种物流方式'
    } else if (userMessage.indexOf('product has invalid weight') > -1) {
      msg = '产品重量无效请设置重量或调整重量后再试'
    } else if (userMessage.includes('brand is mandatory')) {
      msg = '未能创建产品:品牌是必须的'
    } else if (userMessage.includes('tier variation option duplicated')) {
      msg = '未能创建产品:层变体选项重复'
    } else if (userMessage.includes('image not exists')) {
      msg = '未能创建产品:图片不存在'
    } else if (userMessage.includes('dimension is mandatory : width or height or length is empty or 0')) {
      msg = '未能创建产品:尺寸是强制性的:宽度、高度或长度为空或0'
    } else if (userMessage.includes('discount is end')) {
      msg = '该折扣已结束'
    } else if (userMessage.includes('item upload controller price of the most expensive sku divided by the price of the cheapest sku no pass : actual_value')) {
      msg = '价格最高价与最低价差距过大，请做适当调整，或在SKU价格上勾选删除最高价或最低阶'
    } else {
      msg = userMessage
    }
  } catch (error) {
    msg = userMessage
  }
  return msg
}

const onNewDictionary = (country) => {
  let temp = 2
  country = country?.toLocaleUpperCase() || ''
  switch (country) {
    case 'SG':
    case 'TW':
    case 'VN':
    case 'BR':
    case 'PH':
    case 'TH':
    case 'MX':
      temp = 5
      break
    case 'MY':
    case 'ID':
      temp = 7
      break
    case 'CO':
    case 'CL':
    case 'PL':
      temp = 9
      break
    case 'FR':
    case 'ES':
      temp = 10000
      break
    default:
      break
  }
  return temp
}
export {
  special_characters, countries_option_sub_abroad, countries_option_sub, countries_site, countries_option,
  chineseSite, imageRender, siteCoin, sitePlatform, countryShopeebuyCom, changeImgSizeFilter,
  lazadaGoodsUrl, currencyShow, errorMsg, lazadaGoodsSite, onNewDictionary
}
