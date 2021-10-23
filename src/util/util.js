import { setTimeout } from 'core-js'
import md5 from 'js-md5'

/**
 *
 * @param {string} str 字符串长度
 * @param {number} len 限制长度
 * @returns
 */
export function subStringLength(str, len) {
  var regexp = /[^\x00-\xff]/g // 正在表达式匹配中文
  // 当字符串字节长度小于指定的字节长度时
  if (str.replace(regexp, 'aa').length <= len) {
    return {
      'firstStr': str,
      'secondStr': ''
    }
  }
  // 假设指定长度内都是中文
  var m = Math.floor(len / 2)
  for (var i = m, j = str.length; i < j; i++) {
    // 当截取字符串字节长度满足指定的字节长度
    if (str.substring(0, i).replace(regexp, 'aa').length >= len) {
      return {
        'firstStr': str.substring(0, i),
        'secondStr': str.substring(i)
      }
    }
  }
  return {
    'firstStr': str,
    'secondStr': ''
  }
}
// 算法生成sku组合
export function cartesianProductOf() {
  return Array.prototype.reduce.call(arguments, (a, b) => {
    var ret = []
    a.forEach((a) => {
      b.forEach((b) => {
        ret.push(a.concat([b]))
      })
    })
    return ret
  }, [
    []
  ])
}
// 延迟
export async function delay(time) {
  return new Promise((resolve) => {
    const timeId = setTimeout(() => {
      // console.log(`延迟${time}s`)
      clearTimeout(timeId)
      resolve(true)
    }, time)
  })
}

// 格式化时间
export function dateFormat(Time, fmt) {
  const time = new Date(Time)
  var o = {
    'M+': time.getMonth() + 1, // 月份
    'd+': time.getDate(), // 日
    'h+': time.getHours(), // 小时
    'm+': time.getMinutes(), // 分
    's+': time.getSeconds(), // 秒
    'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
    S: time.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (time.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1
          ? o[k]
          : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}
// 获取base64图片大小，返回kb数字
export function showSize(img) {
  // 把头部去掉
  var str = img.replace('data:image/png;base64,', '')
  // 找到等号，把等号也去掉
  var equalIndex = str.indexOf('=')
  if (str.indexOf('=') > 0) {
    str = str.substring(0, equalIndex)
  }
  // 原来的字符流大小，单位为字节
  var strLength = str.length
  // 计算后得到的文件流大小，单位为字节
  var fileLength = parseInt(strLength - (strLength / 8) * 2)
  // 由字节转换为kb
  var size = ''
  size = (fileLength / 1024).toFixed(2)
  var sizeStr = size + '' // 转成字符串
  var index = sizeStr.indexOf('.') // 获取小数点处的索引
  var dou = sizeStr.substr(index + 1, 2) // 获取小数点后两位的值
  if (dou === '00') {
    // 判断后两位是否为00，如果是则删除00
    return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
  }
  return size
}
export function getImgMd5(img) {
  const number = md5(img)
  return number
}
// 切割整合cookie
export function splitCookie(mallInfo, str) {
  //   let obj = {
  //       "Comment": "",
  //       "CommentUri": null,
  //       "Discard": false,
  //       "Domain": ".taobao.com",
  //       "Expired": false,
  //       "Expires": "1970-01-01T00:00:00.000Z",
  //       "HttpOnly": false,
  //       "Name": "_samesite_flag_",
  //       "Path": "/",
  //       "Port": "",
  //       "Secure": false,
  //       "TimeStamp": "2021-03-30T12:04:06.448Z",
  //       "Value": "true",
  //       "Version": 0
  //   }
  // let str = '_uab_collina=161638405566706446584603; x-gpf-render-trace-id=212b052b16168258437137079e912b; cookie2=1508ea79cd65fa24025a83b160ad81cd; t=137fd8863ae6a2d72746c7bc279a8d5f; _tb_token_=e3865533dee3; _samesite_flag_=true; _bl_uid=eykhRmjgk0a1g08Ltqm1t77nOpOk; XSRF-TOKEN=1d8c1234-9c03-4675-9480-7e8561891c0d; _utk=VocP@qJyn^AtWdm; xlly_s=1; _m_h5_tk=e52b1037c0f768ce3e1c720b57264e39_1616827939697; _m_h5_tk_enc=1babc5aaf6230313f7cddb646ab669b7; unb=2209963306639; sn=%E5%88%9D%E6%97%B6%E4%BB%A3%E5%AE%B6%E5%BA%AD%E6%B8%85%E6%B4%81%3A%E5%B8%85%E5%B8%85; csg=dce75ff8; skt=8e7eeba8b0a2c59a; _cc_=URm48syIZQ%3D%3D; cna=5tTEGKt8WR4CAQ7Xhs42+Hnq; uc1=cookie21; l=eBrb3V94jugn2KuXBOfwnurza77tTIRfguPzaNbMiOCPObfp5GglW6wFnzL9CnGVnsJ9R3yEBP-7B7Y_aPUshwt-nVEUTYog4dTh.; isg=BJGRzQTFlf7S2_noU5JQDnrPoJ0r_gVwjDTwVnMm29h3GrBsu0wtQp88vO78Ep2o; tfstk=cn8GBg_E-hS_HjSHVV_61IUfEoidZZaVEE8B8Ev6gRRWbF8FiwrU4rDStOvMko1..'
  const arr = str.split(';')
  const cookies = []
  arr.map(item => {
    const template = JSON.parse(JSON.stringify(mallInfo.web_login_info[0]))
    const name = item.substring(0, item.indexOf('=')).replace(/\s/, '')
    const value = item.substring(item.indexOf('=') + 1)
    template['Name'] = `${name}`
    template['Value'] = `${value}`
    cookies.push(template)
  })
  // // console.log('cookies', cookies)
  return cookies
}
// sleep函数
export function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}
// 导出excel
export function exportExcelDataCommon(fileName, str) {
  // Worksheet名
  const worksheet = `${fileName}${new Date(Date.now() + 8 * 3600 * 1000).toISOString().slice(0, 10)}`
  const uri = 'data:application/vnd.ms-excel;base64,'

  // 下载的表格模板数据
  const template = `<html xmlns:o="urn:schemas-microsoft-com:office:office"
                xmlns:x="urn:schemas-microsoft-com:office:excel"
                xmlns="http://www.w3.org/TR/REC-html40">
                <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
                <x:Name>${worksheet}</x:Name>
                <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
                </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
                </head><body><table>${str}</table></body></html>`
  // 下载模板
  // let template = templates.replace(/<td/g,`<td style="mso-number-format:'\@';"`)
  const blob = new Blob([template], {
    type: 'html',
    name: worksheet
  })
  const a = document.createElement('a')
  document.body.appendChild(a)
  // a.href = uri + this.base64(template)
  a.href = URL.createObjectURL(blob)
  a.download = `${fileName}${new Date(Date.now() + 8 * 3600 * 1000).toISOString().slice(0, 10)}.xls`
  a.click()
  document.body.removeChild(a)
}
// 导出csv
export function exportCsvDataCommon(fileName, str) {
  /**
   * const header = [
          '统计日期',
          '充值金额（收入）',
          '翻译金额（消费）',
          '采购商品金额（消费）',
          '仓库发货金额（消费）',
          '退件金额（消费）',
          '采购商品退回金额（收入）',
          '主体IP消费金额（消费）',
          '异常赔付金额（收入）',
          '其它金额（消费）',
          '用户当天消费总金额',
          '用户当天收入总金额'
          ]
          const data = [header.join(',')].concat(this.statisticsDetailData.map(item => {
          return [
              `${item.stat_date ? item.stat_date : 0}`,
              `"${item.recharge ? item.recharge : 0}"`,
              `"${item.translation ? item.translation : 0}"`,
              `"${item.purchase_goods ? item.purchase_goods : 0}"`,
              `"${item.warehouse_ship ? item.warehouse_ship : 0}"`,
              `"${item.return ? item.return : 0}"`,
              `"${item.purchase_goods_return ? item.purchase_goods_return : 0}"`,
              `"${item.mall_main ? item.mall_main : 0}"`,
              `"${item.abnormal_payment ? item.abnormal_payment : 0}"`,
              `"${item.other ? item.other : 0}"`,
              `"${item.income_amount_total ? item.income_amount_total : 0}"`,
              `"${item.consum_amount_total ? item.consum_amount_total : 0}"`
          ].join(',')
        }))
        // str = str.replace(/<[^>]+>/gim,' ')
        // data.join('\n')
        exportCsvDataCommon('dsf',data)
   */
  const blob = new Blob(['\ufeff' + str.join('\n')], { type: 'text/csv,charset=UTF-8' })
  const a = document.createElement('a')
  document.body.appendChild(a)
  // a.href = uri + this.base64(template)
  a.href = URL.createObjectURL(blob)
  a.download = `${fileName}${new Date(Date.now() + 8 * 3600 * 1000).toISOString().slice(0, 10)}.csv`
  a.click()
  document.body.removeChild(a)
}

export function debounce(fun, wait, immediate) {
  let timeout = null
  let result = null
  return function () {
    const context = this
    const args = arguments
    if (timeout) {
      clearTimeout(timeout)
    }
    if (immediate) {
      const rightNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      if (rightNow) result = fun.apply(context, args)
    } else {
      timeout = setTimeout(() => {
        result = result = fun.apply(context, args)
      }, wait)
    }
  }
}

export function changeCountryName(val) {
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
export function changeImageUrl(data) {
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
    let country = data[0]
    let shop_id = data[1]
    let image_value = data[2]
    let attribute = country && (country+'').toLocaleUpperCase() || country
    attribute = countries_id[attribute] || attribute
    return countries_image[attribute] && (countries_image[attribute] + '/file/' + shop_id + '/' + image_value) || ''
}

