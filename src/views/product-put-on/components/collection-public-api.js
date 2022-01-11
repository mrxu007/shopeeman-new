export default class CollectionPublicApi {
    _this = null // vue 实例
    constructor(that) {
      this._this = that
    }
    async setGoodsData(item, data) {
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
        return { code: -2, data: `商品描述不能为空` }
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
          if (totalStock) {
            return { code: -2, data: `收藏失败：此商品库存为0` }
          }
        }
        // 4：SKU数量-----是否舍弃超出shopee支持的sku个数，IsDefaultFilterSkuCount此配置在平台选品库----采集设置中，默认为true
        if (this._this.IsDefaultFilterSkuCount) {
          goodsData = this.DealGoodsSkuCount(item, goodsData)
        }
        // Lazada平台需要设置额外信息：站点
        if (item.Platform === 9) {
          goodsData.CollectGoodsData.GoodsExtraInfo['site'] = item.Site.toUpperCase()
        }
        // 天猫淘宝跨境平台：需要设置额外信息：店铺ID
        if (item.Platform === 2) {
          goodsData.CollectGoodsData.GoodsExtraInfo['UserId'] = item.ShopId.toString()
        }
        // 5：过滤特殊字符：标题、短标题、描述、过滤Emoji字符串
        await this.FilterSpecialSymbol(goodsData, item)
        // 6：对类目进行处理
        if (item.CategoryName === '未匹配到类目' && item.OriginCategoryId !== 0) {
          const cat = await this._this.$collectService.getGoodsCat(item.OriginCategoryId, item.Platform, item.Site)
          item.CategoryName = cat.split('|')[0] || ''
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
        const buildgoods = buildgoodsRes.data
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
          return { code: -2, data: `收藏失败` }
        }
      } catch (error) {
        console.log(error)
        return { code: -2, data: `收藏异常${error}` }
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
    BuildGoodsData(goodsData, goodsBulkInfo, item) {
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
        buildGoods['goods_id'] = goods.GoodsId// 商品ID
        buildGoods['category_id'] = goods.CategoryId// 商品类目
        buildGoods['category_name'] = goodsData.ListItem[0].CategoryName// 类目名称
        buildGoods['language'] = (goods.Platform === 9 || goods.Platform === 11 || goods.Platform === 2) ? 'en' : 'zh-Hans' // 语种
        buildGoods['title'] = goods.Platform === 12 ? this.GetAliExpressTitle(goods.Title) : goods.Title// 标题
        buildGoods['short_title'] = goods.ShortTitle// 短标题
        buildGoods['description'] = goods.GoodsDesc// 描述
        // const key = goods.GoodsId + '+' + goods.Platform
        // // 组装商品的重量、体积信息
        // const infoKeys = Object.keys(goodsBulkInfo)
        // if (infoKeys.includes(key)) {
        //   const dic = goodsBulkInfo[key]
        //   goods.Weight = Number(dic['Weight'])
        //   goods.Length = Number(dic['Length'])
        //   goods.Width = Number(dic['Width'])
        //   goods.Height = Number(dic['Height'])
        // }
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
        const buildSkuRes = this.BuildSkuDatas(item, goodsData, goods.GoodsType, goods.VaCount, goods.Platform)
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
    BuildSkuDatas(item, goodsData, platformId) {
      try {
        let skuDatas = goodsData.CollectGoodsSkus
        const list = []
        for (const key in skuDatas) {
          if (skuDatas[key].image) {
            list.push(skuDatas[key].image)
          }
        }
        const distinctImg = [...new Set(list)]
        const skuListOne = this.GetVaAndSizeList(item, goodsData, goodsData.CollectGoodsData.GoodsType)
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
          let skuStr = newSkuDirDatas['sku_spec1'].toString()
          if (newSkuDirDatas['sku_spec2']) {
            skuStr = skuStr + '+' + newSkuDirDatas['sku_spec2']
          }
          skuStrList.push(skuStr)
          newSkuDirDatas['sku_sn'] = skuData.sku
          newSkuDirDatas['sku_price'] = skuData.price
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
    DealGoodsSkuCount(item, goodsData) {
      // const goodsData = JSON.parse(JSON.stringify(data))
      let i = 0
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
            const skuList = this.GetVaAndSizeList(item, goodsData, goodsData.CollectGoodsData.GoodsType)// 根据规格数量组装SKU
            let vaList = skuList[0]
            let sizeList = skuList[1]
            const allSkuCount = Object.keys(goodsData.CollectGoodsSkus).length// 采集返回的所有的SKU列表
            const realSkuCount = vaList.length * sizeList.length// 组装出来的SKU列表
            if (realSkuCount > 50 || vaList.length > 50 || sizeList.length > 50 || realSkuCount !== allSkuCount) {
              // 需要判断单个规格的数量和组装后的SKU的数量，都不能超过50个，如果超过50个，需要随机去除，只保留到50个的SKU数量
              let maxCount = 50
              if (vaList.length > 50) {
                vaList = this.getRandomArrayElements(vaList, 50)
              }
              if (sizeList.length > 50) {
                sizeList = this.getRandomArrayElements(sizeList, 50)
              }
              if (Object.keys(goodsData.CollectGoodsSkus).length > 50) {
                maxCount = 50 / sizeList.length
              }
              if (maxCount > 50) {
                maxCount = 50
              }
              if (vaList.length > maxCount) {
                vaList = this.getRandomArrayElements(vaList, parseInt(maxCount))
              }
              const skuKeys = Object.keys(goodsData.CollectGoodsSkus)
              for (const key of skuKeys) {
                const item = goodsData.CollectGoodsSkus[key]
                const name1 = item.originProps[0] && item.originProps[0].name || ''
                const name2 = item.originProps[1] && item.originProps[1].name || ''
                if (vaList.includes(name1) && sizeList.includes(name2)) {
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
          }
          if (goodsData.CollectGoodsData.GoodsType > 2) {
            const newSkuDic = {}
            const skuList = this.GetVaAndSizeList(item, goodsData, goodsData.CollectGoodsData.GoodsType)
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
          console.log('DealGoodsSkuCount', error)
          break
        }
      }
      console.log('DealGoodsSkuCount', goodsData)
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
    GetVaAndSizeList(item, goodsData, goodsType) {
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
      const shuffled = arr.slice(0)
      let i = arr.length
      const min = i - count
      let temp; let index
      while (i-- > min) {
        index = Math.floor((i + 1) * Math.random())
        temp = shuffled[index]
        shuffled[index] = shuffled[i]
        shuffled[i] = temp
      }
      return shuffled.slice(min)
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
