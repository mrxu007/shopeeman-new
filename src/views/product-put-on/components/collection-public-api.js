export default class CollectionPublicApi {
  _this = null // vue 实例
  constructor(that) {
    this._this = that
    this.PddSkuKeyMatch = ['颜色', '款式', '型号']
    this.tbSkuKeyMatch = ['颜色', '款式']
  }

  // 收藏商品
  async setGoodsData(item, data) {
    let buildgoods = {}
    let goodsData = JSON.parse(JSON.stringify(data))
    // 1：描述组装处理 PddPlatform
    let goodsProperty = ''
    if (item.Platform === 1 && goodsData.CollectGoodsData?.GoodsProperty && Object.keys(goodsData.CollectGoodsData.GoodsProperty).length > 0) {
      const keys = Object.keys(goodsData.CollectGoodsData.GoodsProperty)
      for (const key of keys) {
        goodsProperty += `${key}：${goodsData.CollectGoodsData.GoodsProperty[key].join('\r\n')}\r\n`
      }
    }
    // 2：出货地点 ShopeePlatform
    if (item.Platform === 11 && this._this.GoodsDeliveryAddress !== 0) {
      const location = this._this.shopeeGoodsDeliveryAddressDic[item.Site.toUpperCase()] ? this._this.shopeeGoodsDeliveryAddressDic[item.Site.toUpperCase()] : ''
      if ((this._this.GoodsDeliveryAddress === 2 && goodsData.CollectGoodsData.Location === location) || (this._this.GoodsDeliveryAddress === 1 && goodsData.CollectGoodsData.Location !== location)) {
        return { code: -2, data: `商品发货地不符合条件` }
      }
    }
    item.Description = goodsData.CollectGoodsData.GoodsDesc ? goodsData.CollectGoodsData.GoodsDesc + goodsProperty : goodsProperty// 商品描述
    goodsData.CollectGoodsData.GoodsDesc = item.Description
    item.OriginCategoryId = Number(goodsData.CollectGoodsData.CategoryId) // 源商品的类目ID
    if (!this._this.IsCollectDescriptionIsNull && !item.Description) {
      return { code: -2, data: `商品描述为空` }
    }
    this._this.StatusName(item, `组装产品信息`, true)
    try {
      // 3：库存数量
      const totalStock = goodsData.CollectGoodsData.TotalQuantity // 总库存数量
      if (Object.keys(goodsData.CollectGoodsSkus).length > 0) {
        // 此处获取每一个Sku的库存数量
        const stockList = []
        const keys = Object.keys(goodsData.CollectGoodsSkus)
        for (const key of keys) {
          stockList.push(goodsData.CollectGoodsSkus[key].quantity)
        }
        if (stockList.length <= 0) {
          return { code: -2, data: `收藏失败：此商品库存为0` }
        }
      } else {
        if (Number(totalStock) <= 0) {
          return { code: -2, data: `收藏失败：此商品库存为0` }
        }
      }
      // 4：SKU数量-----是否舍弃超出shopee支持的sku个数，IsDefaultFilterSkuCount此配置在平台选品库----采集设置中，默认为true
      if (this._this.IsDefaultFilterSkuCount) {
        goodsData = this.DealGoodsSkuCount(goodsData)
      }
      // Lazada平台需要设置额外信息：站点
      if (item.Platform === 9) {
        goodsData.CollectGoodsData.GoodsExtraInfo['site'] = item.Site.toUpperCase()
      }
      // 天猫淘宝跨境平台：需要设置额外信息：店铺ID
      if (item.platformId === 13) {
        goodsData.CollectGoodsData.GoodsExtraInfo['UserId'] = item.UserId.toString()
      }
      // 5：过滤特殊字符：标题、短标题、描述、过滤Emoji字符串
      await this.FilterSpecialSymbol(goodsData, item)
      console.log('CategoryName', item)
      // 6：对类目进行处理
      if ((!item.CategoryName || item.CategoryName.includes('未匹配')) && item.OriginCategoryId !== 0) {
        console.log(item.OriginCategoryId, item.Platform, item.Site)
        const cat = await this._this.$collectService.getGoodsCat(item.OriginCategoryId, item.Platform, item.Site)
        item.CategoryName = cat.split('|')[0] || item.CategoryName
      }
      // 7:组装上报的SKU数据
      const goodsBulkInfo = {} // 商品链接采集-链接导入设置数据
      if (item?.isLink) {
        goodsBulkInfo['Weight'] = item.Weight
        goodsBulkInfo['Length'] = item.Length
        goodsBulkInfo['Width'] = item.Width
        goodsBulkInfo['Height'] = item.Height
      }
      const buildgoodsRes = this.BuildGoodsData(goodsData, goodsBulkInfo, item)
      if (buildgoodsRes.code !== 200) {
        return { code: buildgoodsRes.code, data: buildgoodsRes.data }
      }
      buildgoods = buildgoodsRes.data
      // 8：商品价格校验
      if (buildgoods['price'].toString() === '0' && goodsData.CollectGoodsData.OriData?.data?.data?.mockData) {
        const skuCord = goodsData.CollectGoodsData.OriData['data']['data']['mockData']
        const tempPrice = skuCord || 0
        item.Price = tempPrice
        buildgoods['price'] = item.Price
      } else {
        item.Price = Number(buildgoods['price'])
      }
      buildgoods['image'] = item.Image
      this._this.StatusName(item, `开始收藏`, true)
      console.log('组装收藏数据', buildgoods)
      const res = await this._this.$commodityService.uploadCollectGoods(buildgoods)
      const jsonData = this.isJsonString(res)
      if (jsonData.code === 200) {
        buildgoods['id'] = jsonData.data.id
        return { code: 200, data: buildgoods }
      } else {
        return { code: -2, data: buildgoods, msg: `收藏失败` }
      }
    } catch (error) {
      console.log(error)
      return { code: -2, data: buildgoods, msg: `收藏异常${error}` }
    }
  }

  async FilterSpecialSymbol(goodsData, item) {
    if (item.Platform === 9 || item.Platform === 11 || item.Platform === 12) {
      goodsData.CollectGoodsData.Title = this.FilterEmojoStr(goodsData.CollectGoodsData.Title)
      goodsData.CollectGoodsData.ShortTitle = this.FilterEmojoStr(goodsData.CollectGoodsData.ShortTitle)
      goodsData.CollectGoodsData.GoodsDesc = this.FilterEmojoStr(goodsData.CollectGoodsData.GoodsDesc)
    }
    if (item.CategoryName === '未匹配到类目' && item.OriginCategoryId !== 0) {
      const cat = await this._this.$collectService.getGoodsCat(item.OriginCategoryId, item.Platform, item.Site)
      item.CategoryName = cat.split('|')[0] || ''
    }
  }

  // 过滤Emoji字符
  FilterEmojoStr(str) {
    const reg = /[\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g
    let a = ''
    for (let i = 0; i < str.length; i++) {
      const item = str.charAt(i)
      if (!this._this.$filters.special_characters.includes(item)) {
        a += item
      }
    }
    a = a.replaceAll(reg, '')
    return a
  }

  // 组装上报的SKU数据
  BuildGoodsData(goodsData, goodsBulkInfo) {
    try {
      const goods = goodsData.CollectGoodsData
      const sku = goodsData.CollectGoodsSkus
      // 如果为Lazada平台，需要过滤发货天数，IsFilterLazadaDeliveryDay
      if (goods.Platform === 9 && this._this.IsFilterLazadaDeliveryDay) {
        const keys = Object.keys(sku)
        if (keys.length > 0) {
          let flag = false
          for (const key of keys) {
            const data = sku[key]
            const duringTimeArray = data.duringTime.split('-')
            const dayList = []
            let minNum = 0
            let maxNum = 0
            if (duringTimeArray.length > 0) {
              for (let i = 0; i < duringTimeArray.length; i++) {
                const day = duringTimeArray[i]
                dayList.push(Number(...day.match(/\d+/g)))
              }
              if (dayList.length === 1) {
                maxNum = minNum = dayList[0]
              } else if (dayList.length === 2) {
                minNum = dayList[0]
                maxNum = dayList[1]
              }
              if (minNum < Number(this._this.MinLazadaDeliveryDay) || maxNum > Number(this._this.MaxLazadaDeliveryDay) || minNum > Number(this._this.MaxLazadaDeliveryDay)) {
                flag = true
              }
            }
          }
          if (flag) {
            return { code: -2, data: `此商品发货天数不符合【采集设置】中设置的发货天数范围` }
          }
        } else {
          return { code: -2, data: `此商品部分sku发货天数为空` }
        }
      }
      // 如果为Shopee平台，需要过滤发货天数，IsFilterShopeeDeliveryDay
      if (goods.Platform === 11 && this._this.IsFilterShopeeDeliveryDay) {
        const deliveryDay = Number(goods.EstimatedDays) || 0
        if (deliveryDay < Number(this._this.MinShoppeDeliveryDay) || deliveryDay > Number(this._this.MaxShoppeDeliveryDay)) {
          return { code: -2, data: `此商品发货天数不符合【采集设置】中设置的发货天数范围` }
        }
      }
      const buildGoods = {}
      buildGoods['source'] = goods.Platform// 源平台
      buildGoods['goods_id'] = goods.GoodsId.toString()// 商品ID
      buildGoods['category_id'] = goods.CategoryId// 商品类目
      buildGoods['category_name'] = goods.CategoryName || goodsData.ListItem && goodsData.ListItem[0].CategoryName || '未匹配到类目'// 类目名称
      buildGoods['language'] = (goods.Platform === 9 || goods.Platform === 11 || goods.Platform === 12) ? 'en' : 'zh-Hans' // 语种
      buildGoods['title'] = goods.Platform === 12 ? this.GetAliExpressTitle(goods.Title) : goods.Title// 标题
      buildGoods['short_title'] = goods.ShortTitle || ''// 短标题
      buildGoods['description'] = goods.GoodsDesc || ''// 描述
      const infoKeys = Object.keys(goodsBulkInfo)
      if (infoKeys.length > 0) {
        goods.Weight = Number(goodsBulkInfo['Weight'])
        goods.Length = Number(goodsBulkInfo['Length'])
        goods.Width = Number(goodsBulkInfo['Width'])
        goods.Height = Number(goodsBulkInfo['Height'])
      }
      buildGoods['weight'] = goods.Weight// 重量
      buildGoods['long'] = goods.Length// 长度
      buildGoods['width'] = goods.Width// 宽度
      buildGoods['height'] = goods.Height// 高度
      buildGoods['spec1'] = 'Variation'// 规格一名称
      buildGoods['spec2'] = 'Size'// 规格二名称
      buildGoods['sales'] = goods.Sales// 销量
      buildGoods['stock'] = goods.TotalQuantity// 库存
      buildGoods['descImages'] = goods.DetailGallery// 详情图
      let skuData = {}
      // 处理规格列表
      const buildSkuRes = this.BuildSkuDatas(goodsData, goods.GoodsType, goods.VaCount, goods.Platform)
      if (buildSkuRes.code !== 200) {
        return { code: buildSkuRes.code, data: buildSkuRes.data }
      }
      skuData = buildSkuRes.data
      if (goods.Platform === 11) {
        let language = ''
        if (goods.Site.toLowerCase() === 'tw') {
          language = 'zh-Hant'
          buildGoods['spec1'] = '規格'
          buildGoods['spec2'] = '尺寸'
        } else {
          language = 'en'
        }
        buildGoods['language'] = language
        if (Object.keys(sku).length === 0) {
          const skuData = {}
          skuData['skuList'] = []
          skuData['minPrice'] = goods.Price
          skuData['options'] = []
          skuData['skuStrList'] = []
        }
      } else if (goods.Platform === 12) {
        buildGoods['language'] = 'en'
      }
      if (goods.Images?.length === 0) {
        return { code: -2, data: `图片为空` }
      }
      const minPrice = skuData['minPrice'] || 0
      buildGoods['skus'] = skuData['skuList']
      if (minPrice <= 0) {
        skuData['minPrice'] = goodsData.ListItem[0].Price
      }
      buildGoods['price'] = skuData['minPrice']
      buildGoods['images'] = this.BuildImages(goods.Images)
      buildGoods['skuStrList'] = skuData['skuStrList']
      buildGoods['goodsExtraInfo'] = goods.GoodsExtraInfo
      return { code: 200, data: buildGoods }
    } catch (error) {
      console.log(error)
      return { code: -2, data: `BuildGoodsData-error${error}` }
    }
  }

  // 组装图片信息
  BuildImages(images) {
    const imageList = []
    const md5HsImage = []
    for (let index = 0; index < images.length; index++) {
      const item = images[index]
      if (imageList.includes(item) || item.indexOf('www.youtube.com/watch') > -1) {
        continue
      }
      if (md5HsImage.includes(item.toString())) {
        continue
      }
      md5HsImage.push(item.toString())
      imageList.push(item.toString())
    }
    return imageList
  }

  // 处理规格列表
  BuildSkuDatas(goodsData, platformId) {
    try {
      let skuDatas = goodsData.CollectGoodsSkus
      const list = []
      for (const key in skuDatas) {
        if (skuDatas[key].image) {
          list.push(skuDatas[key].image)
        }
      }
      const distinctImg = [...new Set(list)]
      const skuListOne = this.GetVaAndSizeList(goodsData, goodsData.CollectGoodsData.GoodsType)
      let vaList = []
      if (skuListOne.length > 0) {
        vaList = skuListOne[0]
      }
      // 采集设置：规格图重复时，删除所有sku图
      if (distinctImg.length !== vaList.length && this.IsDeleteRepeatSkuImg) {
        for (const key in skuDatas) {
          skuDatas[key].image = ''
        }
      }
      // 判断sku信息
      const checkSkuData = this.CheckSkuIsSingle(skuDatas)
      if (checkSkuData['isSkuSingle'].toString() === '1') {
        return { code: 200, data: checkSkuData }
      }
      let checkData = {}
      try {
        // 检查sku图片是否有重复的
        checkData = this.CheckSkuInvalidImages(skuDatas, platformId)
      } catch (error) {
        return { code: -2, data: `组装sku图片失败，或图片不符合规格` }
      }
      const skuImageMapp = checkData['imageBool']
      skuDatas = checkData['skuList']
      // 判断sku的数量
      skuDatas = this.CkeckSkuNumV2(skuDatas)
      const skuList = []
      const optinList1 = []
      const optinList2 = []
      const option1ToImage = {}
      const skuStrList = []
      const giveUpOptionList = []
      // 判断图片重复的问题
      let minPrice = 0
      let currenPrice = 0
      for (const key in skuDatas) {
        const skuData = skuDatas[key]
        currenPrice = skuData.price
        if (minPrice === 0) {
          minPrice = skuData.price
        }
        const nameList = []
        const newSkuDirDatas = {}
        newSkuDirDatas['sku_spec1'] = ''
        newSkuDirDatas['sku_spec2'] = ''
        let isContinue = 1
        for (let i = 0; i < skuData.originProps.length; i++) {
          const originProp = skuData.originProps[i]
          const name = originProp.name
          nameList.push(name)
          if (i === 0) {
            // 废弃options
            if (giveUpOptionList.includes(name)) {
              isContinue = 0
              break
            }
            // 判断数量optinList1
            if (optinList1.length >= 100 && !optinList1.includes(name)) {
              isContinue = 0
              break
            }
            // 图片重复
            const value = JSON.stringify(option1ToImage).match(RegExp(/(?<=:").*?(?=")/g)) || []
            if (!Object.keys(option1ToImage).includes(name) && value.includes(skuData.image)) {
              isContinue = 0
              giveUpOptionList.push(name)
              break
            }
            if (!optinList1.includes(name)) {
              optinList1.push(name)
            }
            newSkuDirDatas['sku_spec1'] = name
            if (!Object.keys(option1ToImage).includes(name) && skuData.image) {
              option1ToImage[name] = skuData.image
            }
            if (Object.keys(option1ToImage).includes(name) && skuImageMapp) {
              if (option1ToImage[name].indexOf('http:') <= -1 && option1ToImage[name].indexOf('https:') <= -1) {
                newSkuDirDatas['sku_image'] = 'http:' + option1ToImage[name]
              } else {
                newSkuDirDatas['sku_image'] = option1ToImage[name]
              }
            } else {
              newSkuDirDatas['sku_image'] = ''
            }
          }
          if (i === 1) {
            // 判断数量optinList2
            if (optinList2.length >= 100 && !optinList2.includes(name)) {
              isContinue = 0
              break
            }
            if (!optinList2.includes(name)) {
              optinList2.push(name)
            }
            newSkuDirDatas['sku_spec2'] = name
          }
        }
        // 规格超出限制 舍
        if (isContinue === 0) {
          continue
        }
        if (currenPrice < minPrice) {
          minPrice = currenPrice
        }
        let quantity = skuData.quantity
        quantity = quantity > 5000 ? 5000 : quantity
        let skuStr = newSkuDirDatas['sku_spec1']?.toString()
        if (newSkuDirDatas['sku_spec2']) {
          skuStr = skuStr + '+' + newSkuDirDatas['sku_spec2']
        }
        skuStrList.push(skuStr)
        newSkuDirDatas['sku_sn'] = skuData.sku
        newSkuDirDatas['sku_price'] = Number(skuData.price)
        newSkuDirDatas['sku_stock'] = quantity
        skuList.push(newSkuDirDatas)
      }
      const options = []
      if (optinList1.length > 0) {
        options.push(optinList1)
      }
      if (optinList2.length > 0) {
        options.push(optinList2)
      }
      const returnData = {}
      returnData['skuList'] = skuList
      returnData['minPrice'] = minPrice
      returnData['options'] = options
      returnData['skuStrList'] = skuStrList
      return { code: 200, data: returnData }
    } catch (error) {
      console.log('BuildSkuDatas', error)
      return { code: -2, data: `BuildSkuDatas-error${error}` }
    }
  }

  CheckSkuInvalidImages(sku) {
    const checkData = {}
    const haveImageOption = {}
    const notHaveImageOption = []
    const optionAll = [] // 储存所有尺码规格
    // 1.先判断是否有sku主图
    for (const key in sku) {
      const skuData = sku[key]
      if (skuData.originProps.length <= 0) {
        continue
      }
      const originProps = skuData.originProps[0]
      const optionName = originProps.name
      if (optionAll.includes(optionName)) {
        continue
      }
      optionAll.push(optionName)
      if (!skuData.image) {
        notHaveImageOption.push(optionName)
      } else {
        haveImageOption[optionName] = skuData.image
      }
    }
    // console.log('notHaveImageOption', notHaveImageOption)
    // console.log('haveImageOption', haveImageOption)
    // 如果没有图片的规格,多于有图片的规格
    if (notHaveImageOption.length > Object.keys(haveImageOption).length) {
      for (const key in sku) {
        sku[key].image = ''
      }
      checkData['imageBool'] = false
      checkData['skuList'] = sku
      return checkData
    }
    // 2.判断规格图片是否重复 重复删除规格
    const clearOption = []
    const md5HsImage = []
    const dealOptionName = []
    const imgList = []
    const keys = Object.keys(sku)
    for (const key of keys) {
      const skuData = sku[key]
      if (skuData.originProps.length <= 0) {
        continue
      }
      const originProps = skuData.originProps
      const originProp = originProps[0]
      const optionName = originProp.name
      if (dealOptionName.includes(optionName)) {
        continue
      }
      dealOptionName.push(optionName)
      try {
        const isRepeat = md5HsImage.includes(skuData.image)
        imgList.push(skuData.image)
        if (isRepeat) {
          clearOption.push(key)
          continue
        }
        md5HsImage.push(skuData.image)
      } catch (error) {
        clearOption.push(optionName)
        console.log(error)
        continue
      }
    }
    for (let i = 0; i < clearOption.length; i++) {
      delete sku[clearOption[i]]
    }
    checkData['imageBool'] = true
    for (const key in sku) {
      if (!sku[key].image) {
        console.log('无图', sku[key])
        delete sku[key]
      }
    }
    checkData['skuList'] = sku
    return checkData
  }

  // 判断sku数量
  CkeckSkuNumV2(skuDatas) {
    const clearSkuList = []
    const option1ToOption2List = []
    for (const key in skuDatas) {
      const skuData = skuDatas[key]
      let twoOptionStr = ''
      for (let i = 0; i < skuData.originProps.length; i++) {
        const originProp = skuData.originProps[i]
        const name = originProp.name
        if (i === 0) {
          twoOptionStr = name
        }
        if (i === 1) {
          twoOptionStr = twoOptionStr + '-' + name
        }
      }
      if (option1ToOption2List.includes(twoOptionStr)) {
        clearSkuList.push(skuData.sku)
        continue
      }
      option1ToOption2List.push(twoOptionStr)
    }
    if (clearSkuList.length > 0) {
      for (let i = 0; i < clearSkuList.length; i++) {
        delete skuDatas[clearSkuList[i]]
      }
    }
    return skuDatas
  }

  getBase64(url) {
    return new Promise((res, rej) => {
      var Img = new Image()
      var dataURL = ''
      Img.src = url + '?v=' + Math.random()
      Img.setAttribute('crossOrigin', 'Anonymous')
      Img.onload = function() {
        var canvas = document.createElement('canvas')
        var width = Img.width
        var height = Img.height
        canvas.width = width
        canvas.height = height
        canvas.getContext('2d').drawImage(Img, 0, 0, width, height)
        dataURL = canvas.toDataURL('image/jpeg')
        res(dataURL || null)
      }
      Img.onerror = async() => {
        let base64Value = await this.$BaseUtilService.imageToBase64String(this.imageUrl)
        let base64 = 'data:image/png;base64,' + base64Value
        res(base64 || null)
      }
    })
  }

  /**
   * 获取各个平台的缩略图路径；货老板暂不考虑，货老板可能包含拼多多淘宝1688
   * shopee/ 速卖通缩略图不支持自定义
   */
  GetSmallImageUrl(imageUrl, platform) {
    switch (platform) {
      case 1:
        return imageUrl + '?imageView2/2/w/20/q/20/format/webp'// 20为图片大小
      case 2:
      case 8:
        if (imageUrl.indexOf('460x460xz.jpg') > -1) {
          imageUrl = imageUrl.replace('460x460xz.jpg', '20x20.jpg')
          return imageUrl
        }
        return imageUrl + '_20x20.jpg'
      case 11:
        return imageUrl + '_tn'
      case 13:
        return imageUrl + '_50x50.jpg'
      case 9:
        return imageUrl + '_20x20q20.jpg_.webp'
    }
    return imageUrl
  }

  // 检查是否是单规格
  CheckSkuIsSingle(skuDatas) {
    const returnData = {}
    let minPrice = 100000
    let isSkuSingle = 0
    const len = Object.keys(skuDatas).length
    if (len === 1) {
      for (const key in skuDatas) {
        const originProps = skuDatas[key].originProps
        if (originProps.length === 0) {
          isSkuSingle = 1
          minPrice = skuDatas[key].price
        }
      }
    } else if (len === 0) {
      minPrice = 0
      isSkuSingle = 1
    }
    returnData['isSkuSingle'] = isSkuSingle
    returnData['skuList'] = {}
    returnData['minPrice'] = minPrice
    returnData['options'] = []
    returnData['skuStrList'] = []
    return returnData
  }

  // 分配sku长度
  DealGoodsSkuCount(goodsData) {
    // const goodsData = JSON.parse(JSON.stringify(data))
    console.log('DealGoodsSkuCount - state', JSON.stringify(goodsData))
    let i = 0
    let skuMaxCount = 50
    while (true) {
      i++
      try {
        if (goodsData.CollectGoodsData.GoodsType === 1) {
          // 直接获取SKU数量。如果大于50个，随机移除超过规格，只留下50个
          const keys = Object.keys(goodsData.CollectGoodsSkus)
          if (keys.length > 50) {
            const ranKeys = this.getRandomArrayElements(keys, 50)
            const newSku = {}
            for (const key of ranKeys) {
              newSku[key] = goodsData.CollectGoodsSkus[key]
            }
            goodsData.CollectGoodsSkus = newSku
          }
        }
        if (goodsData.CollectGoodsData.GoodsType === 2) {
          // 通过sku.OriginProps 组装Sku数量（即通过两个规格组合，获取到所有的Sku数量）
          const newSkuDic = {}
          const skuList = this.GetVaAndSizeList(goodsData, goodsData.CollectGoodsData.GoodsType)// 根据规格数量组装SKU
          let vaList = skuList[0]
          let sizeList = skuList[1]
          const allSkuCount = Object.keys(goodsData.CollectGoodsSkus).length// 采集返回的所有的SKU列表
          const realSkuCount = vaList.length * sizeList.length// 组装出来的SKU列表
          console.log(allSkuCount, vaList, sizeList)
          if (realSkuCount > skuMaxCount || allSkuCount > skuMaxCount) {
            if (!vaList.length) {
              sizeList = this.getRandomArrayElements(sizeList, skuMaxCount)
            } else if (!sizeList.length) {
              vaList = this.getRandomArrayElements(vaList, skuMaxCount)
            } else {
              if (vaList.length > (skuMaxCount / 3)) {
                if (sizeList.length > 2) {
                  let minCount = Math.floor(skuMaxCount / 3)
                  vaList = this.getRandomArrayElements(vaList, minCount)
                } else if (sizeList.length === 2) {
                  let minCount = Math.floor(skuMaxCount / 2)
                  vaList = this.getRandomArrayElements(vaList, minCount)
                } else {
                  vaList = this.getRandomArrayElements(vaList, skuMaxCount)
                }
              }
              let sizeCount = Math.floor(skuMaxCount / vaList.length) || 1
              sizeList = this.getRandomArrayElements(sizeList, sizeCount)
              console.log('sizeCount', sizeCount, sizeList)
            }
            const skuKeys = Object.keys(goodsData.CollectGoodsSkus)
            for (const key of skuKeys) {
              const item = goodsData.CollectGoodsSkus[key]
              let isPass1 = true
              let isPass2 = true
              const name1 = item.originProps[0] && item.originProps[0].name || ''
              const name2 = item.originProps[1] && item.originProps[1].name || ''
              if (vaList.length) {
                isPass1 = vaList.includes(name1)
              }
              if (sizeList.length) {
                isPass2 = sizeList.includes(name2)
              }
              if (isPass1 && isPass2) {
                newSkuDic[key] = item
              } else {
                let i = 0
                const sku = this.GetVaRelativeSku(goodsData.CollectGoodsSkus, name1, name2, i++)
                if (sku) {
                  const skuKeys = Object.keys(sku)
                  for (const key of skuKeys) {
                    newSkuDic[key] = sku[key]
                  }
                }
              }
            }
            goodsData.CollectGoodsSkus = newSkuDic
          }
          // if (realSkuCount > 50 || vaList.length > 50 || sizeList.length > 50 || realSkuCount !== allSkuCount) {
          //   // 需要判断单个规格的数量和组装后的SKU的数量，都不能超过50个，如果超过50个，需要随机去除，只保留到50个的SKU数量
          //   let maxCount = 50
          //   if (vaList.length > 50) {
          //     vaList = this.getRandomArrayElements(vaList, 50)
          //   }
          //   if (sizeList.length > 50) {
          //     sizeList = this.getRandomArrayElements(sizeList, 50)
          //   }
          //   if (Object.keys(goodsData.CollectGoodsSkus).length > 50) {
          //     maxCount = 50 / sizeList.length
          //   }
          //   if (maxCount > 50) {
          //     maxCount = 50
          //   }
          //   if (vaList.length > maxCount) {
          //     vaList = this.getRandomArrayElements(vaList, parseInt(maxCount))
          //   }
          //   const skuKeys = Object.keys(goodsData.CollectGoodsSkus)
          //   for (const key of skuKeys) {
          //     const item = goodsData.CollectGoodsSkus[key]
          //     const name1 = item.originProps[0] && item.originProps[0].name || ''
          //     const name2 = item.originProps[1] && item.originProps[1].name || ''
          //     if (vaList.includes(name1) && sizeList.includes(name2)) {
          //       newSkuDic[key] = item
          //     } else {
          //       let i = 0
          //       const sku = this.GetVaRelativeSku(goodsData.CollectGoodsSkus, name1, name2, i++)
          //       if (sku) {
          //         const skuKeys = Object.keys(sku)
          //         for (const key of skuKeys) {
          //           newSkuDic[key] = sku[key]
          //         }
          //       }
          //     }
          //   }
          //   goodsData.CollectGoodsSkus = newSkuDic
          // }
        }
        if (goodsData.CollectGoodsData.GoodsType > 2) {
          const newSkuDic = {}
          const skuList = this.GetVaAndSizeList(goodsData, goodsData.CollectGoodsData.GoodsType)
          for (const key in skuList) {
            if (skuList[key].length > 50) {
              skuList[key] = this.getRandomArrayElements(skuList[key], 50)
            }
          }
          const newSizeDic = {}
          let newList = []
          const oriList = skuList[2]
          if (Object.keys(skuList).length === 4) {
            for (let i = 0; i < skuList[3].length; i++) {
              const name = skuList[3][i]
              for (let j = 0; j < skuList[2].length; j++) {
                const oriName = oriList[j]
                const newName = oriName + '+' + name
                newList.push(newName)
              }
            }
          } else {
            newList = skuList[2]
          }
          for (let i = 0; i < newList.length; i++) {
            const size = newList[i]
            if (Object.keys(newSizeDic).length >= 50) {
              break
            }
            for (let j = 0; j < skuList[1].length; j++) {
              const name = skuList[1][j]
              const newName = name + '+' + size
              const list = []
              list.push(name)
              list.push(size)
              newSizeDic[newName] = list
              if (Object.keys(newSizeDic).length >= 50) {
                break
              }
            }
          }
          if ((skuList[0].length * Object.keys(newSizeDic).length) > 50) {
            let maxCount = 50
            maxCount = parseInt(50 / Object.keys(newSizeDic).length)
            if (maxCount > 50) {
              maxCount = 50
            }
            if (maxCount < skuList[0].length) {
              skuList[0] = this.getRandomArrayElements(skuList[0], skuList[0].length - maxCount)
            }
          }
          let isReverse = false
          for (let j = 0; j < skuList[0].length; j++) {
            const skuName = skuList[0][j]
            const keys = Object.keys(newSizeDic)
            for (const key of keys) {
              const sizeData = newSizeDic[key]
              const sizes = sizeData.join('+')
              const names = skuName + '+' + sizes
              let nameList = []
              const skuKeys = Object.keys(goodsData.CollectGoodsSkus)
              for (const skuKey of skuKeys) {
                const newSku = goodsData.CollectGoodsSkus[skuKey]
                const list = JSON.stringify(newSku.originProps).match(RegExp(/(?<="name":").*?(?=")/g))
                const name = list.join('+')
                if (names === name) {
                  nameList = list
                  const skuNameList = JSON.stringify(newSku.originProps).match(RegExp(/(?<="sku_name":").*?(?=")/g))
                  if (skuNameList.toString().indexOf('颜色') > -1 || skuNameList.toString().indexOf('款式') > -1) {
                    isReverse = true
                    const newProps = []
                    newProps.push(newSku.originProps[0])
                    const originPropsModel = {}
                    originPropsModel['parent_id'] = 0
                    originPropsModel['vid'] = ''
                    originPropsModel['name'] = sizes
                    newProps.push(originPropsModel)
                    if (isReverse) {
                      // newProps.reverse()
                      newSku.originProps = newProps
                      newSkuDic[skuKey] = newSku
                      break
                    }
                  }
                }
              }
              if (nameList.length < 1) {
                const newDic = this.GetVaRelativeSku(goodsData.CollectGoodsSkus, skuName, key, Object.keys(newSkuDic).length)
                if (newDic) {
                  const newDicKeys = Object.keys(newDic)
                  for (const key of newDicKeys) {
                    if (isReverse) {
                      // newDic[key].originProps.reverse()
                    }
                    newSkuDic[key] = newDic[key]
                  }
                }
              }
            }
          }
          goodsData.CollectGoodsSkus = newSkuDic
        }
        if (Object.keys(goodsData.CollectGoodsSkus).length <= 50 || i > 50) {
          break
        }
      } catch (error) {
        console.log('DealGoodsSkuCount - error', error)
        break
      }
    }
    console.log('DealGoodsSkuCount - end', goodsData)
    return goodsData
  }

  GetVaRelativeSku(skus, va, size, count) {
    const allSkus = JSON.parse(JSON.stringify(skus))
    const sku = {}
    try {
      for (const key of Object.keys(allSkus)) {
        const item = allSkus[key]
        const name1 = item.originProps[0] && item.originProps[0].name || ''
        if (name1 === va && Object.keys(sku).length < 1) {
          sku[key] = allSkus[key]
        }
      }
      const pddGoodsSku = {}
      pddGoodsSku['parent_id'] = 0
      pddGoodsSku['vid'] = ''
      pddGoodsSku['name'] = size
      const key = Object.keys(sku)[0]
      if (key) {
        sku[key].originProps[1] = pddGoodsSku
        const oriList = []
        const oriOne = sku[key].originProps[0]
        const oriTwo = {}
        oriTwo['parent_id'] = 0
        oriTwo['vid'] = ''
        oriTwo['name'] = size
        oriList[0] = oriOne
        oriList[1] = oriTwo
        sku[key].originProps = oriList
        const newKey = key + count.toString()
        sku[key].sku = newKey
        sku[key].quantity = 0
        const data = {}
        data[Number(newKey)] = sku[key]
        return data
      }
    } catch (error) {
      console.log('GetVaRelativeSku', error)
    }
  }

  GetVaAndSizeList(goodsData, goodsType) {
    const allList = {}
    let flag = false
    for (let i = 0; i < goodsType; i++) {
      allList[i] = []
    }
    for (const i in goodsData.CollectGoodsSkus) {
      const sku = goodsData.CollectGoodsSkus[i]
      for (let j = 0; j < sku.originProps.length; j++) {
        const name = sku.originProps[j].name
        if (j >= allList.length) {
          if (sku.platform === 9 && j > 1) {
            continue
          } else {
            flag = true
          }
        }
        if (name && !allList[j].includes(name)) {
          allList[j].push(name)
        }
      }
    }
    if (flag) {
      console.log(`数据处理异常`)
      return
    }
    return allList
  }

  // 剪切速买通标题
  GetAliExpressTitle(title) {
    const list = title.split('|')
    if (list.length > 3) {
      // 去一头二尾
      list.shift()
      list.pop()
      list.pop()
      return list.join('|')
    }
    if (list.length === 3) {
      return list[0]
    }
    return title
  }// 随机取值
  getRandomArrayElements(arr, count) {
    let i = arr.length
    const min = (i - count > 0) && i - count || 0
    let tempList = []
    let indexList = []
    while (i > min && min) {
      let index = Math.floor(arr.length * Math.random())
      if (!indexList.includes(index)) {
        tempList[index] = arr[index]
        indexList.push(index)
        --i
      }
    }
    let setList =new Set( tempList.length && tempList || arr)
    setList.delete(undefined)
    return [...setList]
  }

  // 判断能否转JSON
  isJsonString(str) {
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

  // 监听PDD关键词采集推送数据
  async pddGoodsKeyword(data) {
    let catData = ''
    // 进行数据组装
    let jsonData = []
    try {
      data = data.match(RegExp(/(?<=resultData=).*?(?=&searchKey)/g))[0]
      data = data.toString().replaceAll(/\\\"/g, '"').replaceAll(/"([\{\[]["]*)/g, '$1').replaceAll(/(["]*[\}\]])"/g, '$1')
      jsonData = JSON.parse(data)
      console.log('PDD关键词采集推送数据', jsonData)
    } catch (error) {
      jsonData = []
      console.log('PDD关键词采集推送数据', data)
    }
    if (jsonData.length > 0) {
      for (const item of jsonData) {
        // 商品ID
        const goods = {}
        goods.GoodsId = item.goodsID && item.goodsID !== null && item.goodsID || item.goods_id && item.goods_id !== null && item.goods_id || ''
        if (!goods.GoodsId) {
          continue
        }
        // 销量
        goods.Sales = item.salesTip && item.salesTip !== null && this.InitPddSales(item.salesTip) || item.sales && item.sales !== null && item.sales || 0
        // 主图
        goods.Image = item.imgUrl && item.imgUrl !== null && item.imgUrl || item.hd_thumb_url && item.hd_thumb_url !== null && item.hd_thumb_url || ''
        // 标题
        goods.Title = item.goodsName && item.goodsName !== null && item.goodsName || item.goods_name && item.goods_name !== null && item.goods_name || ''
        // 来源
        goods.Origin = '拼多多'
        // 目前发现的数据中price_info 存在时数据是页面显示价格price则是扩大了100倍的数据；不存在price_info时pric价格正常
        goods.Price = item.price_info && item.price_info !== null && Number(item.price_info) || item.price && item.price !== null && Number(item.price) || 0
        // 选择状态
        goods.IsSelected = true
        // 类目ID
        goods.CategoryId = item.logData && item.logData !== null && this.GetPddCatId(item.logData) || ''
        // // 源类目ID
        goods.OriginCategoryId = goods.CategoryId !== 0 && item.p_search && item.p_search.gin_cat_id_3 && item.p_search.gin_cat_id_3 !== null && Number(item.p_search.gin_cat_id_3) || goods.CategoryId
        // 类目名称的获取
        catData = goods.CategoryId === '' ? '' : await this._this.$collectService.getGoodsCat(goods.CategoryId, 1, '')
        goods.CategoryName = catData && catData.split('|')[0] || ''
        // 平台ID
        goods.Platform = 1
        // 商品链接
        goods.Url = `http://mobile.yangkeduo.com/goods.html?goods_id=${goods.GoodsId}`
        if (JSON.stringify(this._this.goodsList).indexOf(goods.GoodsId) === -1) {
          this._this.goodsList.push(goods)
          this._this.$nextTick(() => {
            this._this.$refs.plTable.toggleRowSelection([{ row: goods }])
          })
        }
      }
    }
  }

  // 监听PDD详情采集数据
  async pddGoodsDetail(data) {
    let catData = ''
    // 进行数据组装
    let jsonData = {}
    try {
      data = data.match(RegExp(/(?<=resultData=).*?(?=&goodsId)/g))[0]
      data = data.replaceAll(/"jumpUrl":"(((?!(\")).)*)\"/g, '"jumpUrl":""')
      data = data.toString().replaceAll(/\\\"/g, '"').replaceAll(/"([\{\[]["]*)/g, '$1').replaceAll(/(["]*[\}\]])"/g, '$1')
      jsonData = JSON.parse(data)
      console.log('PDD详情采集数据', jsonData)
    } catch (error) {
      jsonData = {}
      console.log('PDD详情采集数据', data)
    }
    if (JSON.stringify(jsonData) !== '{}') {
      const goodsInfo = jsonData
      const item = goodsInfo.goods
      // 商品ID
      const goods = {}
      goods.GoodsId = item.goodsID && item.goodsID !== null && item.goodsID || item.goods_id && item.goods_id !== null && item.goods_id || ''
      if (!goods.GoodsId) {
        return
      }
      // 销量
      goods.Sales = item.sideSalesTip && item.sideSalesTip !== null && this.InitPddSales(item.sideSalesTip) || item.side_sales_tip && item.side_sales_tip !== null && this.InitPddSales(item.side_sales_tip) || 0
      // 主图
      goods.Image = item.hdThumbUrl && item.hdThumbUrl !== null && item.hdThumbUrl || item.hd_thumb_url && item.hd_thumb_url !== null && item.hd_thumb_url || ''
      // 标题
      goods.Title = item.goodsName && item.goodsName !== null && item.goodsName || item.goods_name && item.goods_name !== null && item.goods_name || ''
      // 来源
      goods.Origin = '拼多多'
      // 价格
      goods.Price = item.minGroupPrice && item.minGroupPrice !== null && Number(item.minGroupPrice) || item?.price?.min_group_price && item?.price?.min_group_price !== null && Number(item?.price?.min_group_price) / 100 || 0
      // 选择状态
      goods.IsSelected = true
      // 类目ID
      goods.CategoryId = item.catID && item.catID !== null && Number(item.catID) || item.cat_id && item.cat_id !== null && Number(item.cat_id) || 0
      // 源类目ID
      goods.OriginCategoryId = 0
      // 类目名称的获取
      catData = goods.CategoryId === '' ? '' : await this._this.$collectService.getGoodsCat(goods.CategoryId, 1, '')
      goods.CategoryName = catData && catData.split('|')[0] || ''
      // 平台ID
      goods.Platform = 1
      // 商品链接
      goods.Url = `http://mobile.yangkeduo.com/goods.html?goods_id=${goods.GoodsId}`
      // 过滤重复ID
      if (JSON.stringify(this._this.goodsList).indexOf(goods.GoodsId) === -1) {
        this._this.goodsList.push(goods)
        this._this.$nextTick(() => {
          this._this.$refs.plTable.toggleRowSelection([{ row: goods }])
        })
        if (this._this.goodsList.length > 0) {
          this._this.StatusName(goods, `开始收藏`, true)
          const res = await this.DoPddPlugin(item, goods)
          if (res.code === 200) {
            this._this.StatusName(goods, `收藏成功`, true)
            this._this.$nextTick(() => {
              this._this.$refs.plTable.toggleRowSelection([{ row: goods, selected: false }])
            })
          } else {
            this._this.StatusName(goods, res.data, false)
          }
        }
      }
    }
  }

  // TB关键词采集推送数据
  async tbGoodsKeyword(data) {
    let jsonData = []
    try {
      data = data.match(RegExp(/(?<=resultData=).*?(?=&searchkey=)/g))[0]
      data = data.toString().replaceAll(/\\\"/g, '"').replaceAll(/"([\{\[]["]*)/g, '$1').replaceAll(/(["]*[\}\]])"/g, '$1')
      jsonData = JSON.parse(data)
      console.log('TB关键词采集推送数据', jsonData)
    } catch (error) {
      jsonData = []
      console.log('TB关键词采集推送数据', data)
    }
    if (jsonData?.length > 0) {
      let catData = ''
      // 进行数据组装
      for (const item of jsonData) {
        const goods = {}
        // 类目ID
        goods.CategoryId = Number(item.category) || ''
        // 发货地
        goods.DeliverPlace = ''
        if (item.location) {
          goods.DeliverPlace = item.location.split(' ')[0]
        }
        // 商品ID
        goods.GoodsId = item.item_id || 0
        if (!goods.GoodsId) continue
        // 价格
        goods.Price = item.price || 0
        // 标题
        goods.Title = item.title || ''
        // 主图
        goods.Image = item.uprightImg || ''
        goods.Platform = 3
        goods.Origin = '天猫'
        goods.Url = `https://detail.tmall.com/item.htm?id=${goods.GoodsId}`
        if (item.platform === 'tb') {
          goods.Platform = 2
          goods.Origin = '淘宝'
          goods.Url = `https://item.taobao.com/item.htm?id=${goods.GoodsId}`
        }
        // 类目名称
        catData = goods.CategoryId === '' ? '' : await this._this.$collectService.getGoodsCat(goods.CategoryId, goods.Platform, '')
        goods.CategoryName = catData && catData.split('|')[0] || ''
        if (JSON.stringify(this._this.goodsList).indexOf(goods.GoodsId) === -1) {
          this._this.goodsList.push(goods)
          this._this.$nextTick(() => {
            this._this.$refs.plTable.toggleRowSelection([{ row: goods }])
          })
        }
      }
    }
  }

  // TB详情采集推送数据
  async tbGoodsDetail(data) {
    let jsonData = {}
    let description = {}
    let platform = ''
    let goodsId = ''
    let catData = ''
    try {
      let resultData = data.match(RegExp(/(?<=resultData=).*?(?=&goodsId)/g))[0]
      resultData = resultData.replaceAll(/\\\"/g, '"')
      resultData = resultData.replaceAll(/\"(\"[\/\}\]]+)/g, '$1')
      resultData = resultData.replaceAll(/\:\"\}/g, ':""}')
      resultData = resultData.replaceAll(/"([\{\[]["]*)/g, '$1').replaceAll(/(["]*[\}\]])"/g, '$1')
      console.log('resultData', resultData)
      jsonData = JSON.parse(resultData)
      description = data.match(RegExp(/(?<=&description=).*/g))[0]
      description = JSON.parse(description)
      platform = data.match(RegExp(/(?<=platform=).*?(?=&resultData=)/g))[0]
      goodsId = data.match(RegExp(/(?<=&goodsId=).*?(?=&description)/g))[0]
      console.log('TB详情采集推送数据', jsonData)
    } catch (error) {
      jsonData = {}
      description = {}
      console.log('TB详情采集推送数据', data)
    }
    if (JSON.stringify(jsonData) !== '{}') {
      const goods = {}
      const model = {}
      // 淘宝插件采集数据详情(DetailData)
      model.DetailData = jsonData
      model.GoodsId = goodsId
      model.Platform = platform
      model.DescInfo = description
      goods.GoodsId = jsonData?.itemDO?.itemId || jsonData?.ItemDO?.ItemId || 0
      if (!goods.GoodsId) return
      goods.Platform = 3
      goods.Origin = '天猫'
      goods.Url = `https://detail.tmall.com/item.htm?id=${goods.GoodsId}`
      if (platform === 'tb') {
        goods.Platform = 2
        goods.Origin = '淘宝'
        goods.Url = `https://item.taobao.com/item.htm?id=${goods.GoodsId}`
      }
      goods.Sales = jsonData?.skuBase?.sold || jsonData?.SkuBase?.Sold || 0
      goods.Image = jsonData?.itemDO?.imgVedioPic || jsonData?.ItemDO?.ImgVedioPic || ''
      goods.Title = jsonData?.itemDO?.title || jsonData?.ItemDO?.Title || ''
      goods.Price = jsonData?.itemDO?.reservePrice && Number(jsonData.itemDO.reservePrice) || jsonData?.ItemDO?.ReservePrice && Number(jsonData.ItemDO.ReservePrice) || 0
      goods.IsSelected = true
      goods.CategoryId = jsonData?.itemDO?.categoryId && Number(jsonData.itemDO.categoryId) || jsonData?.ItemDO?.CategoryId && Number(jsonData.itemDO.categoryId) || ''
      catData = goods.CategoryId === '' ? '' : await this._this.$collectService.getGoodsCat(goods.CategoryId, goods.Platform, '')
      goods.CategoryName = catData && catData.split('|')[0] || ''
      goods.OriginCategoryId = 0
      if (JSON.stringify(this._this.goodsList).indexOf(goods.GoodsId) === -1) {
        this._this.goodsList.push(goods)
        this._this.$nextTick(() => {
          this._this.$refs.plTable.toggleRowSelection([{ row: goods }])
        })
        if (this._this.goodsList.length > 0) {
          this._this.StatusName(goods, `开始收藏`, true)
          const res = await this.DoTbPlugin(model, goods)
          if (res.code === 200) {
            this._this.StatusName(goods, `收藏成功`, true)
            this._this.$nextTick(() => {
              this._this.$refs.plTable.toggleRowSelection([{ row: goods, selected: false }])
            })
          } else {
            this._this.StatusName(goods, res.data, false)
          }
        }
      }
    }
  }

  // 淘宝插件采集收藏
  async DoTbPlugin(model, goods) {
    try {
      const detailResp = model.DetailData
      const collectGoods = {}
      collectGoods.GoodsId = goods.GoodsId
      collectGoods.Title = goods.Title
      collectGoods.ShortTitle = goods.Title
      collectGoods.CategoryId = goods.CategoryId.toString()
      collectGoods.CategoryName = goods.CategoryName
      collectGoods.Images = []
      collectGoods.GoodsExtraInfo = {}
      if (model.DescInfo && model.DescInfo !== null) {
        collectGoods.GoodsDesc = {}
        collectGoods.DetailGallery = []
        try {
          const imageList = model.DescInfo['images']
          if (imageList && imageList !== null && imageList.length > 0) {
            for (const img of imageList) {
              if (img.indexOf('https:') > -1 && img.indexOf('.gif') > -1) {
                collectGoods.DetailGallery.push(img)
              }
            }
          }
          const attributeList = model.DescInfo['attributes']
          if (attributeList && attributeList !== null && attributeList.length > 0) {
            const descList = {}
            for (const brand of attributeList) {
              descList[brand['name']] = brand['value'].trim()
            }
            collectGoods.GoodsDesc = descList
          }
        } catch (error) {
          return { code: -2, data: `收藏失败，描述处理异常` }
        }
        if (JSON.stringify(collectGoods.GoodsDesc) === '{}') {
          return { code: -2, data: `收藏失败，描述为空` }
        }
        const lunboPicDic = detailResp.propertyPics || detailResp.PropertyPics || {}
        if (JSON.stringify(lunboPicDic) !== '{}' && lunboPicDic.default && lunboPicDic.default !== null) {
          const picList = lunboPicDic.default
          for (const pic of picList) {
            if (pic) {
              collectGoods.Images.push(this.RepairImageUrl(pic))
            }
          }
          if (collectGoods.Images.length <= 0) {
            return { code: -2, data: `收藏失败，轮播图没有数据` }
          }
        } else {
          return { code: -2, data: `收藏失败，轮播图没有数据` }
        }
      } else {
        return { code: -2, data: `收藏失败，轮播图没有数据` }
      }
      const skuBase = detailResp.skuBase || detailResp.SkuBase || null
      const props = skuBase.props || skuBase.Props || null
      collectGoods.GoodsType = props && props !== null && props.length || 0
      let CollectGoodsSkus = {}
      const skuBaseData = this.InitTbSkuData(detailResp, goods.GoodsId)
      if (skuBase !== null) {
        // 获取规格数量
        if (props !== null) {
          for (const prop of props) {
            const name = prop.name || prop.Name || ''
            const values = prop.values || prop.Vlues || []
            if (name && this.tbSkuKeyMatch.includes(name)) {
              collectGoods.VaCount = values.length
              break
            }
          }
        }
      } else {
        collectGoods.VaCount = 0
      }
      const skuCore = detailResp?.valItemInfo?.skuMap && detailResp.valItemInfo.skuMap || detailResp?.ValItemInfo?.SkuMap && detailResp.ValItemInfo.SkuMap || ''
      const skus = await this.InitTbGoodsSkuData(goods.GoodsId, skuCore, skuBaseData, goods.Platform)
      CollectGoodsSkus = skus
      collectGoods.TotalQuantity = detailResp?.itemDO?.quantity && Number(detailResp?.itemDO?.quantity) || detailResp?.ItemDO?.Quantity && Number(detailResp?.ItemDO?.Quantity) || 0
      if (collectGoods.TotalQuantity < 1) {
        return { code: -2, data: `收藏失败，商品总库存为0` }
      }
      collectGoods.Platform = goods.Platform
      collectGoods.SysGoodsNo = await this._this.$collectService.createSysGoodsNo(goods.GoodsId, goods.Platform) || ''
      collectGoods.IsOnSale = 1
      goods.Sales = goods.Sales.replace('+', '')
      if (goods.Sales.indexOf('万')) {
        goods.Sales = goods.Sales.replace('万', '0000')
      }
      collectGoods.Sales = goods.Sales ? Number(goods.Sales) : 0
      collectGoods.Price = goods.Price
      collectGoods.Weight = 0
      collectGoods.Length = 0
      collectGoods.Width = 0
      collectGoods.Height = 0
      collectGoods.OriData = detailResp
      // 库存判断
      const totalStock = collectGoods.TotalQuantity
      if (JSON.stringify(CollectGoodsSkus) !== '{}') {
        let flag = false
        for (const key in CollectGoodsSkus) {
          if (CollectGoodsSkus[key]['quantity'] > 0) {
            flag = true
            break
          }
        }
        if (!flag) {
          return { code: -2, data: `收藏失败：此商品库存为0` }
        }
      } else {
        if (totalStock <= 0) {
          return { code: -2, data: `收藏失败：此商品库存为0` }
        }
      }
      let GoodsData = {
        CollectGoodsData: collectGoods,
        CollectGoodsSkus: CollectGoodsSkus
      }
      if (this._this.IsDefaultFilterSkuCount) {
        GoodsData = this.DealGoodsSkuCount(GoodsData)
      }
      console.log('GoodsData', GoodsData)
      const buildgoodsRes = this.BuildGoodsData(GoodsData, {})
      if (buildgoodsRes.code !== 200) {
        return { code: buildgoodsRes.code, data: buildgoodsRes.data }
      }
      const buildgoods = buildgoodsRes.data
      if (buildgoods['price'].toString() === '0' && GoodsData.CollectGoodsData.OriData?.data?.data?.mockData) {
        const skuCord = GoodsData.CollectGoodsData.OriData['data']['data']['mockData']
        const tempPrice = skuCord || 0
        goods.Price = tempPrice
        buildgoods['price'] = Number(goods.Price)
      } else {
        goods.Price = Number(buildgoods['price'])
      }
      buildgoods['price'] = Number(buildgoods.price)
      buildgoods['image'] = goods.Image
      console.log('buildgoods', buildgoods)
      const res = await this._this.$commodityService.uploadCollectGoods(buildgoods)
      const jsonData = this.isJsonString(res)
      if (jsonData.code === 200) {
        buildgoods['id'] = jsonData.data.id
        return { code: 200, data: buildgoods }
      } else {
        return { code: -2, data: `收藏失败` }
      }
    } catch (error) {
      console.log(error)
      return { code: -2, data: `收藏异常${error}` }
    }
  }

  // 拼多多插件采集收藏
  async DoPddPlugin(item, goods) {
    try {
      // 进行收藏收据组装
      const collectGoods = {}
      collectGoods.GoodsId = goods.GoodsId
      collectGoods.Title = goods.Title
      collectGoods.ShortTitle = goods.Title
      collectGoods.CategoryId = goods.CategoryId.toString()
      collectGoods.CategoryName = goods.CategoryName
      collectGoods.GoodsDesc = item.shareDesc && item.shareDesc !== null && item.shareDesc.toString() || ''
      collectGoods.Images = []
      collectGoods.DetailGallery = []
      const topGallery = item.topGallery || item.gallery
      if (!topGallery || topGallery === null) {
        return { code: -2, data: `收藏失败,轮播图没有数据` }
      }
      if (!item.detailGallery || item.detailGallery === null) {
        return { code: -2, data: `收藏失败，没有数据` }
      }
      let CollectGoodsSkus = {}
      const SkuData = await this.InitPddSkuData(item.skus, goods.GoodsId)
      CollectGoodsSkus = SkuData['collectSkuInfo']
      const jArray = topGallery
      if (jArray.length > 0) {
        for (const data of jArray) {
          if (JSON.stringify(data).indexOf('url') > -1 && data['url']) {
            collectGoods.Images.push(data['url'])
          }
        }
      }
      if (collectGoods.Images.length > 0) {
        collectGoods.Images.reverse()
      }
      collectGoods.TotalQuantity = SkuData['totalQuantity']
      collectGoods.Platform = 1
      collectGoods.SysGoodsNo = await this._this.$collectService.createSysGoodsNo(goods.GoodsId, goods.Platform) || ''
      for (const item of item.detailGallery) {
        collectGoods.DetailGallery.push(item['url'])
      }
      collectGoods.IsOnSale = 1
      collectGoods.Sales = goods.Sales && Number(goods.Sales) || 0
      collectGoods.Price = goods.Price
      collectGoods.Weight = 0
      collectGoods.Length = 0
      collectGoods.Width = 0
      collectGoods.Height = 0
      collectGoods.VaCount = SkuData['vaCount']
      collectGoods.GoodsType = item?.skus[0]?.specs && item?.skus[0]?.specs !== null && item?.skus[0]?.specs.length || 0
      collectGoods.GoodsProperty = item.goodsProperty && item.goodsProperty !== null && this.GetPddGoodsProperty(item.goodsProperty) || {}
      collectGoods.OriData = item
      collectGoods.GoodsExtraInfo = { videoUrl: '[]' }
      if (JSON.stringify(collectGoods.GoodsProperty) === '{}') {
        return { code: -2, data: `收藏失败，商品属性缺少` }
      }
      // 描述组装处理
      let goodsProperty = ''
      if (JSON.stringify(collectGoods.GoodsProperty) !== '{}') {
        for (const item in collectGoods.GoodsProperty) {
          goodsProperty += item + ':' + collectGoods.GoodsProperty[item].join('\r\n') + '\r\n'
        }
        collectGoods.GoodsDesc = collectGoods.GoodsDesc + goodsProperty
        // 库存判断
        const totalStock = collectGoods.TotalQuantity
        if (JSON.stringify(CollectGoodsSkus) !== '{}') {
          let flag = false
          for (const key in CollectGoodsSkus) {
            if (CollectGoodsSkus[key]['quantity'] > 0) {
              flag = true
              break
            }
          }
          if (!flag) {
            return { code: -2, data: `收藏失败：此商品库存为0` }
          }
        } else {
          if (totalStock <= 0) {
            return { code: -2, data: `收藏失败：此商品库存为0` }
          }
        }
      }
      let GoodsData = {
        CollectGoodsData: collectGoods,
        CollectGoodsSkus: CollectGoodsSkus
      }
      if (this._this.IsDefaultFilterSkuCount) {
        GoodsData = this.DealGoodsSkuCount(GoodsData)
      }
      console.log('GoodsData', GoodsData)
      const buildgoodsRes = this.BuildGoodsData(GoodsData, {})
      if (buildgoodsRes.code !== 200) {
        return { code: buildgoodsRes.code, data: buildgoodsRes.data }
      }
      const buildgoods = buildgoodsRes.data
      if (buildgoods['price'].toString() === '0' && GoodsData.CollectGoodsData.OriData?.data?.data?.mockData) {
        const skuCord = GoodsData.CollectGoodsData.OriData['data']['data']['mockData']
        const tempPrice = skuCord || 0
        goods.Price = tempPrice
        buildgoods['price'] = Number(goods.Price)
      } else {
        goods.Price = Number(buildgoods['price'])
      }
      buildgoods['price'] = Number(buildgoods.price)
      buildgoods['image'] = goods.Image
      console.log('buildgoods', buildgoods)
      const res = await this._this.$commodityService.uploadCollectGoods(buildgoods)
      const jsonData = this.isJsonString(res)
      if (jsonData.code === 200) {
        buildgoods['id'] = jsonData.data.id
        return { code: 200, data: buildgoods }
      } else {
        return { code: -2, data: `收藏失败` }
      }
    } catch (error) {
      console.log(error)
      return { code: -2, data: `收藏异常${error}` }
    }
  }

  GetPddGoodsProperty(jArray) {
    const dic = {}
    for (const jToken of jArray) {
      const key = jToken['key']
      const valueList = jToken['values']
      if (!Object.keys(dic).includes(key)) {
        dic[key] = valueList
      }
    }
    return dic
  }

  // 初始化拼多多Sku数据
  async InitPddSkuData(goodsSku, goodsId) {
    const collectSkuInfo = {}
    let totalQuantity = 0
    let count = 0
    const hs = []
    const specHs = []
    const sizeHs = []
    const vaHs = []
    let existSkuId = ''
    for (const sku of goodsSku) {
      const id = sku['skuID']?.toString()
      const specs = sku['specs']
      try {
        const skuDic = this.GetAllSpecInfo(specs)
        if (JSON.stringify(skuDic) !== '{}') {
          specHs.push(skuDic['specStr'])
          sizeHs.push(skuDic['sizeStr'])
          vaHs.push(skuDic['vaStr'])
          existSkuId = id
        }
      } catch (error) {
        // error
      }
    }
    for (const sku of goodsSku) {
      const collectSku = {}
      let quantity = sku['quantity'] === -1 ? 0 : sku['quantity']
      const skuId = sku['skuID']?.toString()
      const specs = sku['specs']
      collectSku.originGoodsId = goodsId.toString()
      collectSku.sku = skuId.toString()
      collectSku.platform = 1
      collectSku.sysSkuNo = await this._this.$collectService.createSysSkuNo(goodsId, collectSku.Sku, collectSku.Platform)
      collectSku.image = sku['thumbUrl']?.toString()
      collectSku.marketPrice = sku['normalPrice']
      collectSku.price = sku['groupPrice']
      try {
        const vaDic = this.GetAllSpecInfo(specs)
        const vaStr = vaDic['vaStr']
        if (!vaHs.includes(vaStr)) continue
      } catch (error) {
        // error
      }
      existSkuId = collectSku.Sku
      collectSku.originProps = this.DealPddOriginProp(specs)
      collectSku.isOnSale = sku['isOnsale']
      if (quantity < 0) quantity = 0
      collectSku.quantity = quantity
      totalQuantity += quantity
      collectSkuInfo[skuId] = collectSku
      // console.log('collectSku', collectSku)
    }
    count = hs.length
    try {
      const oneSkuInfo = JSON.parse(JSON.stringify(collectSkuInfo[existSkuId]))
      const newCollectSku = await this.setFullSku(oneSkuInfo, specHs, sizeHs, vaHs, Object.keys(collectSkuInfo).length, goodsId)
      if (JSON.stringify(newCollectSku) !== '{}') {
        for (const key in newCollectSku) {
          collectSkuInfo[key] = newCollectSku[key]
        }
      }
    } catch (error) {
      // error
    }
    const obj = {}
    obj['totalQuantity'] = totalQuantity
    obj['collectSkuInfo'] = collectSkuInfo
    obj['vaCount'] = count
    return obj
  }

  // 初始化淘宝sku数据
  async InitTbGoodsSkuData(goodsId, skuInfos, skuBaseData, platform) {
    const skus = {}
    let existSkuId = ''
    let skuBaseInfo = {}
    const specHs = []
    const sizeHs = []
    const vaHs = []
    for (const item in skuInfos) {
      const skuInfo = skuInfos[item]
      if (!skuInfo.skuId || skuInfo.skuId === null) continue
      const id = skuInfo['skuId'].toString()
      const sku = id === '0' ? goodsId : id
      let arrayList = []
      if (id !== '0') {
        skuBaseInfo = skuBaseData[sku]
        const list = skuBaseInfo['origin_props']
        arrayList = this.DealTbProp(list)
      }
      const skuDic = this.TbSkuDeal(arrayList)
      if (JSON.stringify(skuDic) !== '{}') {
        specHs.push(skuDic['specStr'])
        sizeHs.push(skuDic['sizeStr'])
        vaHs.push(skuDic['vaStr'])
        existSkuId = id
      }
      const collectSku = {}
      const price = Number(skuInfo['price'])
      collectSku.sku = sku
      collectSku.originGoodsId = goodsId
      collectSku.price = price
      collectSku.marketPrice = collectSku.Price
      collectSku.quantity = Number(skuInfo['stock'])
      collectSku.platform = platform
      collectSku.image = id === '0' ? '' : this.RepairImageUrl(skuBaseInfo['image'])
      collectSku.originProps = arrayList
      const vaStr = skuDic['vaStr']
      if (!vaHs.includes(vaStr)) continue
      collectSku.originGoodsId = goodsId
      collectSku.isOnSale = 1
      collectSku.sysSkuNo = await this._this.$collectService.createSysSkuNo(goodsId, collectSku.Sku, collectSku.Platform)
      skus[id] = collectSku
    }
    const newCollectSku = await this.setFullSku(skus[existSkuId], specHs, sizeHs, vaHs, Object.keys(skus).length, goodsId)
    if (JSON.stringify(newCollectSku) !== '{}') {
      for (const key in newCollectSku) {
        skus[key] = newCollectSku[key]
      }
    }
    return skus
  }

  TbSkuDeal(originProps) {
    const skuDic = {}
    let vaStr = ''
    let sizeStr = ''
    let specStr = ''
    for (let i = 0; i < originProps.length; i++) {
      const dic = originProps[i]
      const specValue = dic.name
      if (i === 0) {
        specStr = specValue
      } else {
        sizeStr = specValue
      }
      if (originProps.length === 1 && i === 0) {
        vaStr = specValue
      }
      if (originProps.length === 2 && i === 0) {
        const dic1 = originProps[1]
        vaStr = dic.name + '||' + dic1.name
      }
    }
    skuDic['vaStr'] = vaStr
    skuDic['sizeStr'] = sizeStr
    skuDic['specStr'] = specStr
    return skuDic
  }

  DealTbProp(list) {
    const model = []
    if (list?.length > 0) {
      for (const variable of list) {
        const parentId = variable.parent_id || variable.parentId
        const obj = {}
        obj['name'] = variable.name.toString()
        obj['parent_id '] = parentId
        obj['vid'] = variable.vid.toString()
        obj['skuName'] = variable.skuName.toString()
        model.push(obj)
      }
    }
    return model
  }

  InitTbSkuData(detailResp, goodsId) {
    const skuInfo = {}
    const parentInfo = {}
    const vidInfos = {}
    let count = 0
    let flag = true
    const skuBase = detailResp.skuBase || detailResp.SkuBase || null
    if (skuBase !== null) {
      // 判断是否包含关键字，若不包含关键字，则规格与尺寸是反着的，将数组逆序调整规格与尺寸的顺序
      const props = skuBase.props || skuBase.Props || null
      if (props !== null && props.length > 0) {
        for (const prop of props) {
          const name = prop.name || prop.Name || ''
          const pid = prop.pid || prop.Pid || ''
          const values = prop.values || prop.Vlues || []
          if (count === 0) {
            if (name && this.tbSkuKeyMatch.includes(name)) {
              flag = false
            }
          }
          count++
          parentInfo[pid] = name
          for (const value of values) {
            const vid = value.vid || value.Vid || ''
            vidInfos[vid] = value
          }
        }
      }
      const skuMap = skuBase.skuMap || skuBase.SkuMap || null
      if (skuMap !== null) {
        for (const sku of skuMap) {
          const skuId = sku.skuID || sku.SkuID || ''
          const propPath = sku.pvs && sku.pvs.split(';') || sku.Pvs && sku.Pvs.split(';') || []
          const originProps = []
          let skuImage = ''
          for (const prop of propPath) {
            const propArr = prop.split(':')
            const parentId = propArr[0]
            const vid = propArr[1]
            const vidInfo = vidInfos[vid]
            const skuName = parentInfo[parentId]
            const obj = {}
            obj['parent_id'] = parentId
            obj['vid'] = vid
            obj['name'] = vidInfo.name || vidInfo.Name
            obj['skuName'] = skuName
            originProps.push(obj)
            const image = vidInfo.image || vidInfo.Image || null
            if (image !== null) {
              skuImage = this.RepairImageUrl(image)
            }
          }
          if (flag) {
            originProps.reverse()
          }
          const obj = {}
          obj['image'] = skuImage
          obj['origin_props'] = originProps
          obj['skuId'] = skuId
          skuInfo[skuId] = obj
        }
      }
    }
    return skuInfo
  }

  // 修复图片路径
  RepairImageUrl(imgUrl) {
    let url = ''
    if (imgUrl) {
      if (imgUrl.indexOf('https:') > -1) {
        url = imgUrl.match(RegExp(/(?=https:).*/g))[0]
      } else {
        url = 'https:' + imgUrl
      }
    }
    return url
  }

  async setFullSku(oneCollectSku, specHs, sizeHs, vaHs, count, goodsId) {
    const newCollectSku = {}
    const actualCount = specHs.length * sizeHs.length
    let index = 0
    if (count < actualCount) {
      for (const spec of specHs) {
        for (const size of sizeHs) {
          const va = spec + '||' + size
          if (vaHs.includes(va)) continue
          vaHs.push(va)
          const id = Math.floor(Math.random() * (100 - 999999999) + 999999999)
          const collectSku = JSON.parse(JSON.stringify(oneCollectSku))
          const skuId = id.toString() + index
          collectSku.Sku = skuId
          collectSku.SysSkuNo = await this._this.$collectService.createSysSkuNo(goodsId, collectSku.Sku, collectSku.Platform)
          collectSku.IsOnSale = 0
          collectSku.Quantity = 0
          const originProps = [
            { vid: '', name: spec, parentId: 0, skuName: null },
            { vid: '', name: size, parentId: 0, skuName: null }
          ]
          collectSku.OriginProps = originProps
          newCollectSku[skuId] = collectSku
          index++
        }
      }
    }
    return newCollectSku
  }

  // 处理规格属性名
  DealPddOriginProp(specs) {
    const pddSpecList = this._this.$shopeeManConfig.getPddSpecList()
    const originProps = []
    let flag = true
    let count = 0
    if (specs.length <= 0) return originProps
    for (const spec of specs) {
      let parentId = 0
      const specKey = spec['spec_key']?.toString()
      const vid = spec['spec_value_id']?.toString()
      if (count === 0) {
        for (const str in this.PddSkuKeyMatch) {
          if (specKey !== null && specKey.indexOf(this.PddSkuKeyMatch[str]) > -1) {
            flag = false
            break
          }
        }
      }
      count++
      if (pddSpecList[specKey] != null) {
        parentId = pddSpecList[specKey]['parent_spec_id']
      }
      const obj = {}
      obj['vid'] = vid
      obj['name'] = spec['spec_value']?.toString()
      obj['parentId'] = parentId
      obj['specKey'] = specKey
      originProps.push(obj)
    }
    if (flag) {
      originProps.reverse()
    }
    return originProps
  }

  GetAllSpecInfo(specs) {
    let vaStr = ''
    let specStr = ''
    let sizeStr = ''
    const dic = {}
    let flag = true
    for (let i = 0; i < specs.length; i++) {
      const jObject = specs[i]
      if (!jObject['spec_value']) continue
      const specValue = jObject['spec_value']?.toString() || ''
      const specKey = jObject['spec_key']?.toString() || ''
      if (!specValue) continue
      if (i === 0) {
        for (const str of this.PddSkuKeyMatch) {
          if (specKey.indexOf(str) > -1) {
            flag = false
            break
          }
        }
      }
      if (flag) {
        if (i === 0) {
          sizeStr = specValue
        } else {
          specStr = specValue
        }
      } else {
        if (i === 0) {
          specStr = specValue
        } else {
          sizeStr = specValue
        }
        if (specs.length === 1 && i === 0) {
          vaStr = specValue
        }
        if (specs.length === 2 && i === 0) {
          vaStr = specs[0]['spec_value'].toString() + '||' + specs[1]['spec_value'].toString()
        }
      }
    }
    dic['specStr'] = specStr
    dic['vaStr'] = vaStr
    dic['sizeStr'] = sizeStr
    return dic || {}
  }

  // 获取拼多多的类目ID
  GetPddCatId(pddCatInfo) {
    if (!pddCatInfo && JSON.stringify(pddCatInfo) === '{}') {
      return 0
    }
    if (!pddCatInfo['p_search']) {
      return 0
    }
    const pddCat = pddCatInfo['p_search']
    let catId = 0
    if (pddCat['cat_id'] && pddCat['cat_id'] !== null) {
      catId = Number(pddCat.cat_id)
      return catId
    }
    if (pddCat['gin_cat_id_3'] && pddCat['gin_cat_id_3'] !== null) {
      catId = Number(pddCat.gin_cat_id_3)
      return catId
    }
    return catId
  }

  // 获取PDD价格
  InitPddSales(SalesTips) {
    let Sales = 0
    try {
      if (!SalesTips) {
        return Sales
      }
      const result = SalesTips.match(/\d+/g)
      Sales = Number(result)
      if (SalesTips.indexOf('万') > -1) {
        Sales = Sales * 10000
      }
    } catch (error) {
      return Sales
    }
    return Sales
  }

  // 处理文本域输入框
  handleKey(key) {
    return key
      .split('\n')
      .map(item => {
        return item.replace(/(^\s*)|(\s*$)/g, '')
      })
      .filter(item => {
        return item !== ''
      })
  }

  // 处理标题过滤字段
  filterLinkKeyWord(tData, fKeyArr) {
    const title = tData
    let result = false
    const keyword = []
    for (let index = 0; index < fKeyArr.length; index++) {
      const element = fKeyArr[index]
      var reg = RegExp(element.replace(/^[^\w^\s^\u4e00-\u9fa5]/i, '')) // 先替换开头的特殊字符
      result = reg.test(title)
      if (result) {
        keyword.push(element)
        break
      }
    }
    return keyword.join(',')
  }

  // 处理标题过滤限制方法
  handleKeyFilter(arr) {
    console.log(arr, '处理数据')
    if (Array.isArray(arr)) {
      if (arr.length > 1000) {
        arr = arr.slice(0, 1000)
        this.notify('标题过滤设置', '请输入小于1000组以内的关键词', 'warning')
      }
    } else {
      arr = arr.split('\n')
      if (arr.length > 1000) {
        arr = arr.slice(0, 1000)
        this.notify('标题过滤设置', '请输入小于1000组以内的关键词', 'warning')
      }
    }
    return arr
  }
}
