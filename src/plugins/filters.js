/**
 * 站点转换位中文
 * @param val {String} 国家code
 * @return {String} 站点 | 国家code
 */
var chineseSite = function(val) {
  let countries = {
    'MY': '马来站',
    'TW': '台湾站',
    'SG': '新加坡站',
    'PH': '菲律宾站',
    'TH': '泰国站',
    'VN': '越南站',
    'ID': '印尼站',
    'BR': '巴西站'
  }
  let attribute = val.toLocaleUpperCase()
  let site = countries[attribute] || attribute
  return site
}

export { chineseSite }
