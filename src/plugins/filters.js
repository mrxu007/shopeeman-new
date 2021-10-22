/**
 * 站点转换位中文
 * @param val {String} 国家code
 * @return {String} 站点 | 国家code
 */
var chineseSite = function(val) {
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
  let attribute = val && (val+'').toLocaleUpperCase() || val
  let site = countries[attribute] || countries[countries_id[attribute]] || ''
  return site
}

export { chineseSite }
