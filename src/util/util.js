import {
  setTimeout
} from 'core-js'
import md5 from 'js-md5'
import Vue from 'vue'
import XLSX from 'xlsx'

const instance = new Vue()

// 匹配对象数组值(店铺绑定--系统)
export function MallgetValue(arr, label, id, relID) {
  let data = ''
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    if (item[id] === Number(relID)) {
      data = item[label]
      break
    }
  }
  return data
}
// 匹配对象数组值(商品店铺绑定)
export function GoodsMallgetValue(arr, label, value, relID) {
  let data = ''
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    if (Number(item[value]) === Number(relID)) {
      data = item[label]
      break
    }
  }
  return data
}
// 获取店铺信息
export async function getMalls() {
  // await instance.$api.logFun()
  const shopList = []
  try {
    const {
      data
    } = await instance.$api.ddMallGoodsGetMallList()
    // if (data.data.length) {
    //   localStorage.setItem('mallList', JSON.stringify(data.data))
    // }
    for (let index = 0; index < data.data.length; index++) {
      const item = data.data[index]
      const obj = {}
      obj.label = item.mall_alias_name ? item.mall_alias_name : item.platform_mall_name
      obj.value = item.platform_mall_id
      obj.country = item.country
      obj.id = item.id
      shopList.push(obj)
    }
    return shopList
  } catch (err) {
    return []
  }
}

// 获取店铺信息
export async function MallList() {
  const param = {
    country: '',
    mallGroupIds: ''
  }
  const res = await instance.$api.ddMallGoodsGetMallList(param)
  // console.log('res', res)
  if (res.data.code === 200) {
    const arr = res.data.data
    const blist = []
    arr.forEach(e => {
      blist.push({
        'label': e.platform_mall_name,
        'id': e.id
      })
    })
    return blist
  } else {
    this.$message.error('获取分组、店铺列表失败')
  }
}

// 获取颜色列表
export async function colorLabelList() {
  const colorList = []
  try {
    const data = await instance.$api.colorLabelList()
    for (let index = 0; index < data.data.data.length; index++) {
      const item = data.data.data[index]
      const obj = {}
      obj.label = item.color_name
      obj.id = item.id
      obj.color = `color:${item.color}`
      obj.name = item.name
      colorList.push(obj)
    }
    return colorList
  } catch (err) {
    return []
  }
}

// 设置日期选择器默认时间
export function creatDate(i) {
  const base = new Date()
  const baseVal = [base.getFullYear(), base.getMonth() + 1, base.getDate()].join('-')
  const oneDay = 24 * 3600 * 1000
  const now = new Date(base - oneDay * i)
  const nowVal = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-')
  return [nowVal, baseVal]
}

// 匹配对象数组值
export function getValue(arr, label, value, relValue) {
  let data = ''
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    if (item[value] === relValue) {
      data = item[label]
      break
    }
  }
  return data
}

// 匹配对象数组值(颜色)
export function getColorinfo(arr, id) {
  let data = ''
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    if (item.id === id) {
      data = item
      break
    }
  }
  return data
}

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
                <meta charset="gbk2312">
                </head><body><table>${str}</table></body></html>`
  // 下载模板
  // let template = templates.replace(/<td/g,`<td style="mso-number-format:'\@';"`)
  // const blob = new Blob([template], {
  //   type: 'html',
  //   name: worksheet
  // })
  const blob = new Blob([template], {
    type: 'application/vnd.ms-excel;charset=gbk2312',
    name: worksheet
  })
  const a = document.createElement('a')
  document.body.appendChild(a)
  // a.href = uri + this.base64(template)
  console.log(URL.createObjectURL(blob))
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
  const blob = new Blob(['\ufeff' + str.join('\n')], {
    type: 'text/csv,charset=UTF-8'
  })
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
  return function() {
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

// randomWord 产生任意长度随机字母数字组合
// randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
export function randomWord(randomFlag, min, max) {
  let str = ''
  let range = min
  const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  // 随机产生
  if (randomFlag) { // 生成3-32位随机串
    range = Math.round(Math.random() * (max - min)) + min
  }
  for (let i = 0; i < range; i++) {
    const pos = Math.round(Math.random() * (arr.length - 1))
    str += arr[pos]
  }
  return str
}

/**
 * 线程批量
 * @param array // 数组（参数）
 * @param method // 请求函数
 * @param count // 线程数
 * @returns {Promise<any>}
 */
export function batchOperation(array, method, count = 5) {
  const number = array.length
  const threadRunCountJson = localStorage.getItem('threadRunCount') || ''
  const threadRunCountRes = threadRunCountJson && JSON.parse(threadRunCountJson) || {}
  const methodName = method.name
  threadRunCountRes[methodName] = true
  console.log('线程开始', methodName, array)
  localStorage.setItem('threadRunCount', JSON.stringify(threadRunCountRes))
  return new Promise(resolve => {
    const countObj = {
      count: number
    }
    let submitCount = 0
    let setIn = setInterval(() => {
      const threadRunCountJson = localStorage.getItem('threadRunCount') || ''
      const threadRunCountRes = threadRunCountJson && JSON.parse(threadRunCountJson) || {}
      const num = countObj.count
      if (num === 0 || !threadRunCountRes[methodName]) {
        let success = '完成'
        if (!threadRunCountRes[methodName]) {
          success = '终止'
        }
        clearInterval(setIn)
        setIn = null
        console.log('线程停止：', methodName, '线程剩余数：', num)
        resolve(success)
      } else {
        manage(number - num)
      }
    }, 1000)
    async function manage(completeCount) {
      for (;
        (submitCount - completeCount) < count && submitCount < number; ++submitCount) {
        const item = array[submitCount]
        method(item, countObj)
      }
    }
  })
}

/**
 * 取消线程
 * @param method 方法
 */
export function terminateThread(method) {
  let threadRunCount = ''
  if (method) {
    const threadRunCountJson = localStorage.getItem('threadRunCount') || ''
    const threadRunCountRes = threadRunCountJson && JSON.parse(threadRunCountJson) || {}
    const methodName = method.name
    delete threadRunCountRes[methodName]
    threadRunCount = JSON.stringify(threadRunCountRes)
  }
  localStorage.setItem('threadRunCount', threadRunCount)
}

// 时间转换
export function formatDuring(mss) {
  const hours = parseInt(mss / 60 / 60)
  const minutes = parseInt((mss - hours * 69 * 60) / 60)
  const seconds = (mss - hours * 69 * 60 - minutes * 60)
  return hours + ':' + minutes + ':' + seconds.toFixed(0)
}

/**
 *
 * @param tableData Array ['商品','订单号']
 * @param jsonData Array[Array] [['goods1','id']]
 * @param workName String 'name'默认时间戳
 * @returns {Promise<void>}
 */

export async function importOrder(tableData, jsonData, workName = '') {
  const arr = []
  arr.push(tableData)
  jsonData.forEach(item => {
    arr.push(item)
  })
  const worksheet = XLSX.utils.aoa_to_sheet(arr)
  console.log(fitToColumn(arr))
  worksheet['!cols'] = fitToColumn(arr)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, workName || (new Date(Date.now() + 8 * 3600 * 1000).toISOString().slice(0, 10)))
  XLSX.writeFile(workbook, `${workName}${new Date(Date.now() + 8 * 3600 * 1000).toISOString().slice(0, 10)}.xlsx`)

  function fitToColumn(arrayOfArray) {
    return arrayOfArray[0].map((a, i) => ({
      wch: Math.max(...arrayOfArray.map(a2 => a2[i] ? a2[i].toString().length : 10)) * 1.5
    }))
  }
}

export async function waitStart(prepare, num = 500) {
  let count = 0
  const number = num && parseInt(num) || 500
  return new Promise((resolve, reject) => {
    const ing = setInterval(() => {
      ++count
      if (prepare() || count >= number) {
        console.log('等待成功', prepare)
        clearInterval(ing)
        resolve(prepare())
      }
    }, 200)
  })
}
export async function selfAliYunTransImage(imgUrl, command, account, that) {
  account.login_info = account.login_info || JSON.parse(account.loginInfo)
  const _csrf = account.login_info.find(item => {
    return item.Name == 'XSRF-TOKEN'
  })
  const url = `https://www.alifanyi.com/api/imagetranslate/submitOfflineImageTask?_csrf=${_csrf.Value}`
  const data1 = await that.$api.jdRequest.post(url, {
    'platform': 'ae',
    'sourceLanguage': command.fromLanguage,
    'targetLanguage': command.toLanguage,
    'offlineImageBOList': [{
      'groupName': '全部图片',
      'imageUrls': [imgUrl]
    }]
  }, {
    headers: {
      cookies: account.login_info
    }
  })
  console.log(data1)
  if (data1.status == 200 && data1.data.code == 200) {
    const url = `https://www.alifanyi.com/api/imagetranslate/composeDetail/${data1.data.data}/1?_csrf=${_csrf.Value}`
    const data2 = await that.$api.jdRequest.post(url, {}, {
      headers: {
        cookies: account.login_info
      }
    })
    console.log(data2)
    let res = ''
    if (data2.data.data) {
      res = data2.data
    } else {
      res = JSON.parse(data2.data.replace(/\\/g, '').replace(/"\{/g, '{').replace(/\}"/g, '}'))
    }

    if (res.code == 200 && res.data.finalImageUrl) {
      return res.data.finalImageUrl
    } else {
      that.$message.error('图片翻译', '阿里图片翻译失败,请确认翻译图片数量是否到达上限', 'warning')
    }
  } else {
    that.$message.error('图片翻译', '阿里图片翻译失败,请确认阿里账号是否掉线', 'warning')
  }
}

export function getArraySrcLengthSort(arr, type) {
  const sort = []
  for (let i = 0; i < arr.length; i++) {
    let index = 0
    for (let j = 0; j < arr.length; j++) {
      if (arr[i].length > arr[j].length) {
        ++index
      }
    }
    while (sort[index] || sort[index] === 0) {
      ++index
    }
    sort[index] = i
  }
  return type && sort || sort.reverse()
}

export function getDaysBetween(startDate, endDate) {
  var days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000)
  return days
}

// 拼接链接
export function getGoodsUrl(platform, data) {
  try {
    const platformData = {}
    switch (platform) {
      case 1:
        platformData['url'] = `http://mobile.yangkeduo.com/goods.html?goods_id=${data['productId']}`
        platformData['platformTypeStr'] = '拼多多'
        break
      case 2:
        platformData['url'] = `https://item.taobao.com/item.htm?id=${data['productId']}`
        platformData['platformTypeStr'] = '淘宝'
        break
      case 3:
        platformData['url'] = `https://detail.tmall.com/item.htm?id=${data['productId']}`
        platformData['platformTypeStr'] = '天猫'
        break
      case 5:
        platformData['url'] = ''
        platformData['platformTypeStr'] = '自有产品'
        break
      case 6:
        platformData['url'] = `http://gh.ppxias.com/goods/${data['productId']}.html`
        platformData['platformTypeStr'] = '皮皮虾供货平台'
        break
      case 15:
      case 7:
        platformData['url'] = `http://www.17hyj.com/detail?goodsid=${data['productId']}`
        platformData['platformTypeStr'] = '货老板'
        break
      case 8:
        platformData['url'] = `https://detail.1688.com/offer/${data['productId']}.html`
        platformData['platformTypeStr'] = '1688'
        break
      case 11:
        platformData['url'] = `${instance.$filters.countryShopeebuyCom(data['site'])}/product/${data['shopId']}/${data['productId']}`
        platformData['platformTypeStr'] = 'Shopee'
        break
      case 12:
        platformData['url'] = `https://www.aliexpress.com/item/${data['productId']}.html`
        platformData['platformTypeStr'] = '速卖通'
        break
      case 9:
        platformData['url'] = `${instance.$filters.lazadaGoodsUrl(data['site'])}${data['productId']}.html`
        platformData['platformTypeStr'] = 'Lazada'
        break
      case 10:
        platformData['url'] = `https://item.m.jd.com/product/${data['productId']}.html`
        platformData['platformTypeStr'] = '京喜'
        break
      case 13:
        platformData['url'] = `https://distributor.taobao.global/apps/product/detail?mpId=${data['productId']}`
        platformData['platformTypeStr'] = '天猫淘宝海外平台'
        break
    }
    // console.log(instance.$filters)
    return platformData
  } catch (error) {
    console.log('拼接链接异常', error)
  }
}

/**
   * @name :
   * @param {*} oriGoodsId 上家商品ID
   * @param {*} oriPlatformId 上家平台ID
   * @param {*} shopMallId shopee店铺ID
   * @param {*} shopGoodsId shopee商品ID
   * @param {*} country 站点
   * @param {*} orderSn 订单号传null
   * @param {*} writeLog 日志函数
   */
export async function dealwithOriginGoodsNum(oriGoodsId, oriPlatformId, shopMallId, shopGoodsId, country, orderSn, writeLog, oriShopMallId, oriSite, that, shopeeItem) {
  let msg = ''
  let flag = false
  const _that = that
  try {
    // 1、同步shopee库存
    const params = {
      product_id: shopGoodsId,
      version: '3.2.0',
      shop_id: shopMallId
    }
    let shopeeSkuList = []
    let shopeeGoodsInfo = null

    // 获取shopee平台商品详情
    const shopeeGoods = await instance.$shopeemanService.searchProductDetail(country, params)
    if (shopeeGoods.code === 200 && shopeeGoods.data) {
      const logistics_channels = await dealwithLogisi(shopGoodsId, shopMallId, country)
      if (!logistics_channels.length) {
        if (orderSn) {
          return writeLog(`订单【${orderSn}】同步上家失败，未获取到物流信息！`, false)
        } else {
          _that.failNum++
          return _that.batchStatus(shopeeItem, `同步上家失败，未获取到物流信息`, false)
        }
      }
      shopeeGoodsInfo = shopeeGoods.data
      shopeeSkuList = shopeeGoods.data.model_list || [] // shopee规格list
      const params = {
        GoodsId: oriGoodsId,
        ShopId: oriShopMallId
      }
      if (oriPlatformId == 9) {
        params['Site'] = oriSite
      } else if (oriPlatformId == 11) {
        params['ShopId'] = oriShopMallId
        params['Site'] = oriSite
      } else if (oriPlatformId == 13) {
        // params['ShopId'] = shopMallId
        params['AccessToken'] = ''
      }

      console.log(Number(oriPlatformId), params, false)
      // 获取上家平台商品详情
      const res = await instance.$collectService.queryDetailById(Number(oriPlatformId), params, false)
      console.log(res, '----------')
      msg = res
      console.log(Number(oriPlatformId), params, '4654689')
      const resObj = res && isJsonString(res)
      console.log('shopeeSkuList', shopeeSkuList)
      console.log(resObj, '----------')
      let totalStock = 0
      const dealWithSkuList = []
      if (resObj && resObj.Code === 200) {
        const {
          CollectGoodsSkus,
          CollectGoodsData
        } = resObj
        if (JSON.stringify(CollectGoodsSkus) === '{}') {
          if (shopeeSkuList.length === 1) {
            shopeeSkuList.forEach((item) => {
              totalStock += item.stock
              const subItem = {
                id: item.id,
                sku: item.sku,
                tier_index: item.tier_index,
                is_default: item.is_default,
                name: item.name,
                item_price: '',
                stock: CollectGoodsData.TotalQuantity
              }
              dealWithSkuList.push(subItem)
            })
            // totalStock = CollectGoodsData.TotalQuantity
            totalStock = CollectGoodsData.TotalQuantity
          } else {
            if (orderSn) {
              return writeLog(`订单【${orderSn}】同步库存失败，获取到上家规格为空，未匹配到相同的规格信息！`, false)
            } else {
              _that.failNum++
              return _that.batchStatus(shopeeItem, `获取到上家规格为空，未匹配到相同的规格信息`, false)
            }
          }
        } else {
          for (const key in CollectGoodsSkus) {
            const skuInfo = CollectGoodsSkus[key]
            // console.log(skuInfo, 'skuInfo')
            let skuName = ''
            // ---------------------处理skuName--------------------------------//
            if ((skuInfo.PddProps && !skuInfo.originProps) || (skuInfo.PddProps && skuInfo.originProps && skuInfo.PddProps.length >= skuInfo.originProps.length)) {
              if (skuInfo.PddProps.length === 1) {
                skuName = skuInfo.PddProps[0].spec_name
              } else if (skuInfo.PddProps.length >= 2) {
                skuName = skuInfo.PddProps[0].spec_name + ',' + skuInfo.PddProps[1].spec_name
              } else {
                skuName = ''
              }
            } else if ((!skuInfo.PddProps && skuInfo.originProps) || (skuInfo.PddProps && skuInfo.originProps && skuInfo.PddProps.length <= skuInfo.originProps.length)) {
              if (skuInfo.originProps.length === 1) {
                skuName = skuInfo.originProps[0].name
              } else if (skuInfo.originProps.length >= 2) {
                skuName = skuInfo.originProps[0].name + ',' + skuInfo.originProps[1].name
              } else {
                skuName = ''
              }
            } else {
              skuName = ''
            }
            // ----------------------------------------------------------------//
            const spIndex = shopeeSkuList.findIndex((n) => n.sku.replace('=|=', ',') == skuName)
            if (spIndex > -1) {
              flag = true
              shopeeSkuList[spIndex].stock = Number(skuInfo.quantity)
            }
          }
          // -----------判断是否更新并组装数据--------------//
          if (!flag) {
            if (orderSn) {
              return writeLog(`订单【${orderSn}】同步库存失败，未匹配到相同的规格信息！`, false)
            } else {
              _that.failNum++
              return _that.batchStatus(shopeeItem, `未匹配到相同的规格信息`, false)
            }
          }
          shopeeSkuList.forEach((item) => {
            totalStock += item.stock
            const subItem = {
              id: item.id,
              sku: item.sku,
              tier_index: item.tier_index,
              is_default: item.is_default,
              name: item.name,
              item_price: '',
              stock: item.stock
            }
            dealWithSkuList.push(subItem)
          })
        }

        const attributes = []
        shopeeGoodsInfo.attributes.forEach(item => {
          const obj = {
            attribute_id: item.attribute_id,
            attribute_value_id: item.attribute_value_id
          }
          attributes.push(obj)
        })
        console.log(attributes, 'attributes')
        // 组装数据
        const editParams = {
          id: shopeeGoodsInfo.id,
          name: shopeeGoodsInfo.name,
          brand_id: shopeeGoodsInfo.brand_id,
          images: shopeeGoodsInfo.images,
          description: shopeeGoodsInfo.description,
          model_list: dealWithSkuList, // sku
          category_path: shopeeGoodsInfo.category_path,
          attributes: shopeeGoodsInfo.attributes,
          parent_sku: shopeeGoodsInfo.parent_sku,
          wholesale_list: shopeeGoodsInfo.wholesale_list,
          installment_tenures: shopeeGoodsInfo.installment_tenures,
          weight: shopeeGoodsInfo.weight,
          dimension: shopeeGoodsInfo.dimension,
          pre_order: shopeeGoodsInfo.pre_order,
          days_to_ship: shopeeGoodsInfo.days_to_ship,
          condition: shopeeGoodsInfo.condition,
          size_chart: shopeeGoodsInfo.size_chart,
          video_list: shopeeGoodsInfo.video_list,
          tier_variation: shopeeGoodsInfo.tier_variation,
          add_on_deal: shopeeGoodsInfo.add_on_deal,
          // dangerous_goods: shopeeGoodsInfo.dangerous_goods,
          enable_model_level_dts: shopeeGoodsInfo.enable_model_level_dts,
          price: shopeeGoodsInfo.price,
          stock: totalStock, // 总库存
          logistics_channels: logistics_channels || [],
          ds_cat_rcmd_id: '',
          category_recommend: shopeeGoodsInfo.category_recommend,
          ds_attr_rcmd_id: shopeeGoodsInfo.ds_attr_rcmd_id || '',
          unlisted: shopeeGoodsInfo.unlisted || false
        }
        const data = {
          mallId: shopMallId
        }
        const editRes = await instance.$shopeemanService.handleProductEdit(country, data, [editParams])
        if (editRes.code === 200) {
          if (orderSn) {
            return writeLog(`同步库存成功，订单【${orderSn}】同步库存成功！`, true)
          } else {
            _that && _that.successNum++
            _that.$nextTick(() => {
              _that.$refs.plTable.toggleRowSelection([{ row: shopeeItem, selected: false }])
            })
            return _that.batchStatus(shopeeItem, `同步库存成功！`, true)
          }
        } else {
          if (orderSn) {
            return writeLog(`订单【${orderSn}】同步库存失败，${instance.$filters.errorMsg(editRes.data)}！`, false)
          } else {
            _that.failNum++
            return _that.batchStatus(shopeeItem, `${instance.$filters.errorMsg(editRes.data)}`, false)
          }
        }
      } else {
        if (orderSn) {
          return writeLog(`订单【${orderSn}】上家平台${resObj}！`, false)
        } else {
          _that.failNum++
          return _that.batchStatus(shopeeItem, `上家平台${resObj}`, false)
        }
      }
    } else {
      if (shopeeGoods.code === 403) {
        if (orderSn) {
          return writeLog(`同步库存失败，店铺【${shopMallId}】未登录！`, false)
        } else {
          _that.failNum++
          return _that.batchStatus(shopeeItem, `店铺未登录`, false)
        }
      }
      if (orderSn) {
        return writeLog(`同步库存失败，订单【${orderSn}】未获取到shopee商品信息！`, false)
      } else {
        _that.failNum++
        return _that.batchStatus(shopeeItem, `未获取到shopee商品信息`, false)
      }
    }
  } catch (error) {
    console.log('catch', error)
    if (orderSn) {
      return writeLog(`订单【${orderSn}】同步上家库存失败，${msg}！`, false)
    } else {
      _that.failNum++
      return _that.batchStatus(shopeeItem, `${msg}`, false)
    }
  }
}

export async function dealwithLogisi(productID, mallID, country) {
  // 获取物流
  const parmas = {}
  parmas['product_id'] = productID
  parmas['mallId'] = mallID
  const res = await instance.$shopeemanService.getLogistics(country, parmas)
  console.log(res, 'dealwithLogisi')
  // 处理物流方式
  let logModelList = []
  const logisticsJarray = res.data.list || []
  if (res.code === 200) {
    logModelList = await getLogisticsInfo(logisticsJarray, true, mallID, country)
  }
  return logModelList
}
export async function getLogisticsInfo(logisticsJarray, isUseProductChannel, mallID, country) {
  const logModelList = []
  let idDatas = []
  if (logisticsJarray.length > 0) {
    const params = {
      platform_mall_id: mallID
    }
    // 获取商家后台的物流方式
    let res = await instance.$shopeemanService.getChinese(country, '/api/v3/logistics/get_channel_list/?', params)
    res = JSON.parse(JSON.parse(res).data)
    if (res.data.list) {
      idDatas = res.data.list
    }
    const a = JSON.parse(JSON.stringify(idDatas))
    console.log(a, 'idDatas')
    // 过滤无效物流
    logisticsJarray = await filterLogistics(logisticsJarray, a, isUseProductChannel)
    console.log(logisticsJarray, 'logisticsJarray222')
  }
  for (let i = 0; i < logisticsJarray.length; i++) {
    const logistics = logisticsJarray[i]
    const obj = {}
    obj.channelid = Number(logistics.channel_id)
    obj.price = logistics.price ? logistics.price.toString() : '0.00'
    obj.enabled = JSON.parse(logistics.enabled)
    obj.cover_shipping_fee = JSON.parse(logistics.cover_shipping_fee)
    obj.sizeid = Number(logistics.size_id)
    obj.size = Number(logistics.size)
    obj.parent_channel_id = Number(logistics.parent_channel_id)
    logModelList.push(obj)
  }
  console.log(logModelList, 'logModelList')
  return logModelList
}
// 过滤无效物流
export async function filterLogistics(logisticsJarray, idDatas, isUseProductChannel) {
  console.log(logisticsJarray, idDatas, '33333')
  const newLogisticsJarray = []
  for (let i = 0; i < idDatas.length; i++) {
    const channels = idDatas[i]
    const channelId = channels.channel_id.toString()
    const parentChannelId = 'parent_channel_id' in channels ? channels.parent_channel_id.toString() : '0'
    if (parentChannelId !== '0') {
      continue
    }
    if (!JSON.parse(channels.is_mask_channel) && !JSON.parse(channels.enabled)) {
      continue
    }
    let isAddToNewArray = false
    for (let j = 0; j < logisticsJarray.length; j++) {
      const logistics = logisticsJarray[j]
      if (logistics.channel_id.toString() === channelId) {
        if (!isUseProductChannel) {
          logistics.enabled = channels.enabled.toString()
        }
        if (!logistics.default_price) {
          logistics.default_price = '0.00'
        }
        newLogisticsJarray.push(logistics)
        isAddToNewArray = true
        break
      }
    }
    if (!isAddToNewArray) {
      channels.price = channels.default_price ? channels.default_price.toString() : '0.00'
      channels.cover_shipping_fee = !((channels.cover_shipping_fee.toString() === '0' || channels.cover_shipping_fee.toString() === 'false'))
      channels.size_id = 0
      channels.size = 0
      newLogisticsJarray.push(channels)
    }
  }
  return newLogisticsJarray
}

/**
   * @name :区间随机值
   * @param {*} minVal 最小
   * @param {*} maxVal 最大
   * @param {*} fixed 小数位
   * */
export async function getSectionRandom(minVal, maxVal, fixed = 0) {
  minVal = (minVal < maxVal && minVal || maxVal) * 1
  maxVal = (minVal < maxVal && maxVal || minVal) * 1
  const gap = maxVal - minVal
  const random = 1 * (Math.random() * gap).toFixed(fixed)
  return minVal + random
}

/** *
 * @name :图片上传
 * @param {*} mall 店铺
 * @param {*} imageList 图片列表
 * @param {*} that this
 * @param {*} thread 线程数
 */

export function imageCompressionUpload(mall, imageList, that, thread = 3) {
  const newImage = {}
  return new Promise(async(resolve) => {
    const params = []
    imageList.forEach(item => {
      params.push(Object.assign({ url: item }, mall))
    })
    await batchOperation(params, imageUpload, thread)
    resolve(newImage)
  })
  async function imageUpload(item, count = { count: 1 }) {
    try {
      let imageUrl = item.url || ''
      if (imageUrl && !imageUrl.includes('http://') && !imageUrl.includes('https://')) {
        imageUrl = that.$filters.imageRender([imageUrl])
      }
      const base64File = await getBase64file(imageUrl)
      const country = that.country || mall.country
      const imageFileJSON = await that.$shopeemanService.upload_image(country, { mallId: item.platform_mall_id }, '', base64File)
      const imageFileRes = JSON.parse(imageFileJSON)
      const imageFileData = JSON.parse(imageFileRes.data)
      newImage[item.url] = imageFileData?.data?.resource_id || ''
    } catch (e) {
      console.log(e)
    } finally {
      --count.count
    }
  }
  function getBase64file(url, width, height) {
    return new Promise(async(resolve) => {
      const image = new Image()
      image.setAttribute('crossOrigin', 'anonymous')
      image.src = url
      image.onload = async function() {
        image.width = width || image.width
        image.height = height || image.height
        const canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        const context = canvas.getContext('2d')
        context.drawImage(image, 0, 0, image.width, image.height)
        let base64 = canvas.toDataURL('image/png')
        const base64Size = showSize(base64)
        if (base64Size > 1024) {
          const width = Math.floor(image.width / 3 * 2)
          const height = Math.floor(image.height / 3 * 2)
          base64 = await getBase64file(base64, width, height)
        }
        resolve(base64)
      }
    })
  }
  function showSize(base64url) {
    // 把头部去掉
    let str = base64url.replace('data:image/png;base64,', '')
    // 找到等号，把等号也去掉
    const equalIndex = str.indexOf('=')
    if (str.indexOf('=') > 0) {
      str = str.substring(0, equalIndex)
    }
    // 原来的字符流大小，单位为字节
    const strLength = str.length
    // 计算后得到的文件流大小，单位为字节
    const fileLength = parseInt(strLength - (strLength / 8) * 2)
    // 由字节转换为kb
    let size = ''
    size = (fileLength / 1024).toFixed(2)
    const sizeStr = size + '' // 转成字符串
    const index = sizeStr.indexOf('.') // 获取小数点处的索引
    const dou = sizeStr.substr(index + 1, 2) // 获取小数点后两位的值
    if (dou == '00') { // 判断后两位是否为00，如果是则删除00
      return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
    }
    return size
  }
}
// 判断能否转JSON
export function isJsonString(str) {
  if (typeof str === 'string') {
    try {
      JSON.parse(str)
      return JSON.parse(str)
    } catch (e) {
      return str
    }
  } else {
    return str
  }
}
// 用于判断采集链接
function shopeeBuyerAllDomain() {
  const data = {}
  // 国外域名
  data['MY'] = 'https://shopee.com.my'
  data['TW'] = 'https://shopee.tw'
  data['VN'] = 'https://shopee.vn'
  data['ID'] = 'https://shopee.co.id'
  data['PH'] = 'https://shopee.ph'
  data['TH'] = 'https://shopee.co.th'
  data['SG'] = 'https://shopee.sg'
  data['BR'] = 'https://shopee.com.br'
  data['MX'] = 'https://shopee.com.mx'
  data['CO'] = 'https://shopee.com.co'
  data['CL'] = 'https://shopee.cl'
  data['PL'] = 'https://shopee.pl'
  data['FR'] = 'https://shopee.fr'
  data['ES'] = 'https://shopee.es'
  // 国内域名
  data['my'] = 'https://my.xiapibuy.com'
  data['tw'] = 'https://xiapi.xiapibuy.com'
  data['vn'] = 'https://vn.xiapibuy.com'
  data['id'] = 'https://id.xiapibuy.com'
  data['ph'] = 'https://ph.xiapibuy.com'
  data['th'] = 'https://th.xiapibuy.com'
  data['sg'] = 'https://sg.xiapibuy.com'
  data['br'] = 'https://br.xiapibuy.com'
  data['mx'] = 'https://mx.xiapibuy.com'
  data['co'] = 'https://co.xiapibuy.com/'
  data['cl'] = 'https://cl.xiapibuy.com/'
  data['pl'] = 'https://pl.xiapibuy.com/'
  data['fr'] = 'https://fr.xiapibuy.com/'
  data['es'] = 'https://es.xiapibuy.com/'
  return data
}
// 分割一段链接，获取里面的参数
function getRequestParameters(row) {
  try {
    if (!row) return null
    const getRow = row.split('?')
    const getRequest = getRow[getRow.length - 1]
    const kvs = getRequest.split('&')
    const newKvs = [...new Set(kvs)]
    let enumerable = {}
    if (newKvs.length > 0) {
      for (const item of newKvs) {
        enumerable[item.split('=')[0]] = item.split('=')[1]
      }
    } else {
      enumerable = null
    }
    return enumerable
  } catch (error) {
    return `传入的店铺链接存在非法信息${error}`
  }
}
// 链接判断
export function getGoodLinkModel(link) {
  console.log(link)
  const execPlatform = /(yangkeduo)|(taobao)|(aliexpress)|(jd)|(jx)|(1688)|(detail.tmall)|(pinduoduo)|(lazada)|(xiapibuy)|(shopee)|(distributor.taobao.global)/g
  const platform = link.match(execPlatform)
  if (!platform) return { code: 201, data: `链接${link}识别平台失败` }
  const data = {}
  switch (platform[0]) {
    case 'yangkeduo':
    case 'pinduoduo':
      data['GoodsId'] = link.match(/goods_id=(\d+)/)[1]
      data['platformId'] = 1
      break
    case 'taobao':
      data['GoodsId'] = link.match(/id=(\d+)/)[1]
      data['platformId'] = 2
      break
    case 'detail.tmall':
      data['GoodsId'] = link.match(/id=(\d+)/)[1]
      data['platformId'] = 3
      break
    case 'jx':
    case 'jd': {
      const newLink = link.split('/')
      for (const linkString of newLink) {
        if (linkString.toLocaleLowerCase().indexOf('.html') === -1) continue
        const index = linkString.toLocaleLowerCase().indexOf('.html')
        data['GoodsId'] = linkString.substr(0, index)
        break
      }
      if (!data['GoodsId']) {
        const jxMatch = getRequestParameters(link)
        const keys = Object.keys(jxMatch)
        if (keys.includes('sku')) {
          const skuId = jxMatch['sku']
          data['GoodsId'] = skuId
        }
      }
      data['Site'] = link.toLocaleLowerCase().indexOf('jd') !== -1 ? 'jd' : 'jx'
      data['platformId'] = data.Site === 'jd' ? 4 : 10
      break
    }
    case '1688':
      data['GoodsId'] = link.match(/offer\/(\d+)/)[1]
      data['platformId'] = 8
      break
    case 'jinritemai':
      data['GoodsId'] = link.match(/id=(\d+)/)[1]
      data['platformId'] = 14
      break
    case 'aliexpress': {
      const newLink = link.split('/')
      for (const linkString of newLink) {
        if (linkString.toLocaleLowerCase().indexOf('.html') === -1) continue
        const index = linkString.toLocaleLowerCase().indexOf('.html')
        data['GoodsId'] = linkString.substr(0, index)
        break
      }
      data['platformId'] = 12
      break
    }
    case 'lazada': {
      const match = link.match(/^((http:\/\/)|(https:\/\/))?([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}(\/)/)[0]
      const url = match.toUpperCase()
      data['Site'] = instance.$filters.lazadaGoodsSite(url)
      console.log('Site', data['Site'])
      const index = link.toLocaleLowerCase().indexOf('.html')
      link = link.substr(0, index)
      let firstIndex = link.lastIndexOf('-')
      const iIndex = link.toLocaleLowerCase().lastIndexOf('i')
      const charIndex = link.toLocaleLowerCase().lastIndexOf('-')
      if (charIndex < iIndex) firstIndex = link.length
      const lastIndex = link.lastIndexOf('i') + 1
      const goodsId = link.substr(lastIndex, firstIndex - lastIndex)
      data['GoodsId'] = goodsId
      data['platformId'] = 9
      break
    }
    case 'shopee':
    case 'xiapibuy': {
      // 确定站点
      const shopeeAllDomain = shopeeBuyerAllDomain()
      const keys = Object.keys(shopeeAllDomain)
      for (const key of keys) {
        if (link.indexOf(shopeeAllDomain[key].replace('https://', '')) === -1) continue
        data['Site'] = key
        break
      }
      console.log('Site', data['Site'])
      // https://shopee.co.th/product/166615622/7918020675
      if (link.indexOf('/product/') > -1) {
        const newLink = link.split('/')
        data['GoodsId'] = newLink[newLink.length - 1]
        data['ShopId'] = newLink[newLink.length - 2]
      } else {
        // https://shopee.co.th/%E0%B9%80%E0%B8%84%E0%B8%A-i.144175763.3115159607
        const arr = link.split('.')
        const goodsIdStr = arr[arr.length - 1]
        const length = goodsIdStr.indexOf('?')
        if (length > -1) {
          data['GoodsId'] = goodsIdStr.substr(0, length)
        } else {
          data['GoodsId'] = goodsIdStr
        }
        data['ShopId'] = arr[arr.length - 2]
      }
      data['platformId'] = 11
      break
    }
    case 'distributor.taobao.global': // 天猫淘宝海外平台
      data['GoodsId'] = link.match(/mpId=(\d+)/)[1]
      data['platformId'] = 13
      break
  }
  if (!data.GoodsId) return { code: 201, data: `链接:${link}识别商品ID失败` }
  return { code: 200, data }
}
