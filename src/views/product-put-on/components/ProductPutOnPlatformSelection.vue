<template>
  <div class="contaniner">
    <header>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="关键词采集" name="first">
          <div class="keyword-container">
            <div class="keyword-banner-bar">
              <div v-for="item in keyworBar" :key="item.value" class="barChilren" :class="{ active: currentKeywordPlatform === item.value }" @click="switchPlatform(item)">{{ item.label }}</div>
            </div>
            <div class="keyword-banner-content">
              <div class="con-sub-1">
                <!-- 公共属性 -->
                <div class="item">
                  <p>开始页码:</p>
                  <el-input v-model="commonAttr.StartPage" size="mini" />
                  <p>总页码:</p>
                  <el-input v-model="commonAttr.EndPage" size="mini" />
                </div>
                <div class="item">
                  <p>销售区间:</p>
                  <el-input v-model="commonAttr.StartSales" size="mini" />
                  <p>-</p>
                  <el-input v-model="commonAttr.EndSales" size="mini" />
                </div>
                <div class="item">
                  <p>价格区间:</p>
                  <el-input v-model="commonAttr.StartPrice" size="mini" />
                  <p>-</p>
                  <el-input v-model="commonAttr.EndPrice" size="mini" />
                </div>
                <!-- 虾皮 -->
                <div class="item">
                  <p>站点:</p>
                  <el-select v-model="commonAttr.shopeeSiteCode" placeholder="" size="mini" @change="getShopeeGoodsPlace">
                    <el-option v-for="(item, index) in commonAttr.shopeeSite" :key="index" :label="item.label" :value="item.value" />
                  </el-select>
                  <p>站点2:</p>
                  <el-select v-model="commonAttr.lazadaSiteCode" placeholder="" size="mini" @change="getShopeeGoodsPlace">
                    <el-option v-for="(item, index) in commonAttr.lazadaSite" :key="index" :label="item.label" :value="item.value" />
                  </el-select>
                  <p>排序方式:</p>
                  <el-select v-model="commonAttr.shopeeSortTypeVal" placeholder="" size="mini">
                    <el-option v-for="(item, index) in commonAttr.shopeeSortType" :key="index" :label="item.label" :value="item.value" />
                  </el-select>
                  <p>排序方式alibaba:</p>
                  <el-select v-model="commonAttr.alibabaSortTypeVal" placeholder="" size="mini">
                    <el-option v-for="(item, index) in commonAttr.alibabaSortType" :key="index" :label="item.label" :value="item.value" />
                  </el-select>
                </div>
                <div v-for="(item, itemKey, index) in commonAttr.lazadaPlace" :key="index" class="item">
                  <p>{{ itemKey }}</p>
                  <el-select v-model="commonAttr.lazadaPlaceVal[index]" placeholder="" size="mini" multiple collapse-tags @change="selectPlaceValEvent2(index)">
                    <el-checkbox v-model="isSelectAll2[index]" label="全部" @change="selectAllEvent2(index)" />
                    <el-option v-for="(subItem, subIndex) in item" :key="subIndex" :label="subItem.label" :value="subItem.value" />
                  </el-select>
                </div>

                <div class="item">
                  <p>出货地点:</p>
                  <el-select v-model="commonAttr.placeVal" placeholder="" size="mini" multiple collapse-tags @change="selectPlaceValEvent">
                    <el-checkbox v-model="isSelectAll" label="全部" @change="selectAllEvent" />
                    <el-option v-for="(item, index) in commonAttr.placeOrigin" :key="index" :label="item.label" :value="item.value" />
                  </el-select>
                </div>
                <div class="item">
                  <p>创建时间:</p>
                  <el-input size="mini" />
                </div>
              </div>
              <div class="con-sub-2">
                <div class="item">
                  <p>关键词(一行一个)</p>
                  <el-input v-model="key" size="mini" type="textarea" :rows="8" resize="none" />
                </div>
                <div class="item">
                  <p>过滤关键词(一行一个)</p>
                  <el-input v-model="commonAttr.keyFilter" size="mini" type="textarea" :rows="8" resize="none" />
                </div>
              </div>
              <!-- 复用操作按钮 -->
              <div class="con-sub-3">
                <div class="item">
                  <el-button type="primary" size="mini" @click="StartCollection">开始采集</el-button>
                  <el-button type="primary" size="mini">取消采集</el-button>
                </div>
                <div class="item">
                  <p>起:</p>
                  <el-input size="mini" placeholder="" />
                  <p>止:</p>
                  <el-input size="mini" placeholder="" />
                </div>
                <div class="item">
                  <el-button type="primary" size="mini">收藏商品</el-button>
                  <el-button type="primary" size="mini">编辑上新</el-button>
                </div>
                <div class="item">
                  <el-button type="primary" size="mini">插件采集</el-button>
                  <el-button type="primary" size="mini">清理全部</el-button>
                </div>
                <div class="item">
                  <el-button type="primary" size="mini">导出数据</el-button>
                  <el-button type="primary" size="mini">批量删除</el-button>
                </div>
              </div>
              <div class="con-sub-4">
                <div class="con-sub5-log" v-html="consoleMsg" />
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="商品链接采集" name="second" />
        <el-tab-pane label="整店采集" name="third" />
        <el-tab-pane label="定时任务补偿" name="fourth" />
      </el-tabs>
    </header>
    <article>
      <u-table
        ref="plTable"
        :max-height="Height"
        use-virtual
        :data-changes-scroll-top="false"
        :header-cell-style="{
          backgroundColor: '#f5f7fa',
        }"
        row-key="id"
        :big-data-checkbox="true"
        :border="false"
        @selection-change="handleSelectionChange"
      >
        <u-table-column align="center" type="selection" />
        <u-table-column align="center" type="index" label="序号" />
        <u-table-column align="center" label="主图">
          <template v-slot="{ row }">
            <div style="justify-content: center; display: flex">
              <img :src="row.Image" style="width: 56px; height: 56px" />
            </div>
          </template>
        </u-table-column>
        <u-table-column align="center" label="上家ID" prop="GoodsId" />
        <u-table-column align="center" label="标题" prop="Title" width="500px" fit>
          <template v-slot="{ row }">
            <p style="white-space: normal">{{ row.Title }}</p>
          </template>
        </u-table-column>
        <u-table-column align="center" label="类目" prop="CategoryName">
          <template v-slot="{ row }">
            <p style="white-space: normal">{{ row.CategoryName }}</p>
          </template>
        </u-table-column>
        <u-table-column align="center" label="价格" prop="Price" />
        <u-table-column align="center" label="销量" prop="Sales" />
        <u-table-column align="center" label="发货地" />
        <u-table-column align="center" label="来源" prop="Origin" />
        <u-table-column align="center" label="操作" />
        <u-table-column align="center" label="操作结果" />
      </u-table>
    </article>
  </div>
</template>

<script>
import CollectKeyWordApI from './collection-keyword-api'
import { getPlatform, platformObj, getSitePlace, getSiteRelation, getLazadaSitePlace } from './collection-platformId'
import testData from './testData'
export default {
  props: {
    baseConfig: {
      type: Object,
      required: false,
      default: () => {
        return {
          keywordConfig: [1, 2, 11, 8, 1.2, 10, 12, 9] // 关键词采集配置
          // linkConfig: { // 链接采集配置
          // },
          // entireMallConfig: { // 整店采集配置
          // }
        }
      }
    }
  },
  data() {
    return {
      Height: 650,
      activeName: 'first',
      CollectKeyWordApInstance: new CollectKeyWordApI(this),
      // table attr
      multipleSelection: [],
      goodsList: [],

      // button
      buttonStatus: {
        keyword: false
      },
      // keyWord search
      currentKeywordPlatform: 11,
      commonAttr: {
        // 拼多多 淘宝 参数
        StartPage: 1,
        EndPage: 2,
        StartSales: 0,
        EndSales: 999999999,
        StartPrice: 0,
        EndPrice: 999999999,
        // shopee参数
        shopeeSortType: [
          { label: '价格从低到高', value: 'price,asc' },
          { label: '价格从高到低', value: 'price,desc' },
          { label: '销量从低到高', value: 'sales,asc' },
          { label: '销量从高到低', value: 'sales,desc' }
        ],
        shopeeSortTypeVal: 'price,asc',
        placeOrigin: '',
        placeVal: [],
        shopeeSite: [],
        lazadaSite: [],
        shopeeSiteCode: 'TW',
        lazadaSiteCode: 'ID',
        // 1688 参数
        alibabaSortType: [
          { label: '综合排序', value: 'pop' },
          { label: '价格从低到高', value: 'price_fale' },
          { label: '价格从高到低', value: 'price_true' },
          { label: '销量从低到高', value: 'booked_false' },
          { label: '销量从高到低', value: 'booked_true' }
        ],
        alibabaSortTypeVal: 'pop',

        // Lazada
        lazadaPlace: {},
        lazadaPlaceVal: [[], []]
      },
      // 基础参数
      key: '',
      keyFilter: '',
      isSelectAll: false,
      isSelectAll2: [
        false, false
      ],
      consoleMsg: ''
    }
  },
  computed: {
    keyworBar() {
      const value = getPlatform(this.baseConfig.keywordConfig)
      return value
    }

  },
  created() {
    this.getShopeeGoodsPlace()
    this.getSite()
    // this.getLazadaGoodsPlace()
  },
  mounted() {
    // this.goodsList = testData.data
    // this.$refs.plTable.reloadData(this.goodsList)
    // console.log('this.goodsList', this.goodsList)
  },
  methods: {
    selectPlaceValEvent() { // 出货地点全选事件
      if (this.commonAttr.placeOrigin.length === this.commonAttr.placeVal.length) {
        this.isSelectAll = true
      } else {
        this.isSelectAll = false
      }
    },
    selectAllEvent() { // 出货地点全选事件
      if (this.isSelectAll) {
        this.commonAttr.placeOrigin.map(item => {
          this.commonAttr.placeVal.push(item.value)
        })
      } else {
        this.commonAttr.placeVal = []
      }
    },
    selectPlaceValEvent2(index) { // lazada地点全选事件
      console.log('index', index)
      console.log('this.commonAttr.lazadaPlaceVal', this.commonAttr.lazadaPlaceVal)

      // if (this.commonAttr.placeOrigin.length === this.commonAttr.lazadaPlaceVal.length) {
      //   this.isSelectAll[index] = true
      // } else {
      //   this.isSelectAll[index] = false
      // }
    },
    selectAllEvent2(index) { // lazada出货地点全选事件
      // if (this.isSelectAll[index]) {
      //   this.commonAttr.placeOrigin.map(item => {
      //     this.commonAttr.placeVal.push(item.value)
      //   })
      // } else {
      //   this.commonAttr.placeVal = []
      // }
    },
    getSite() { // 获取站点
      const value = getSiteRelation(this.currentKeywordPlatform)
      // if (this.currentKeywordPlatform === 11) {
      this.commonAttr.site = value
      this.commonAttr.siteCode = value[0]?.value || '' // 站点的值
    },
    getShopeeGoodsPlace() { // 出货地点
      this.isSelectAll = false
      this.commonAttr.placeOrigin = []
      if (this.currentKeywordPlatform === 11) {
        this.commonAttr.placeOrigin = getSitePlace(this.commonAttr.siteCode)
      } else if (this.currentKeywordPlatform === 9) {
        this.commonAttr.lazadaPlaceVal[0] = []
        this.commonAttr.lazadaPlaceVal[1] = []
        this.getLazadaGoodsPlace()
      }
    },
    getLazadaGoodsPlace() { // 获取Lazada站点地点
      const value = getLazadaSitePlace(this.commonAttr.siteCode)
      debugger
      this.commonAttr.lazadaPlace = value
    },
    handleClick(tab, event) {
      // console.log(tab, event)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    switchPlatform(row) { // 关键词选择平台
      this.currentKeywordPlatform = row.value
      this.commonAttr.placeVal = [] // 选择的出货地点
      if (this.currentKeywordPlatform === 11) {
        this.getSite()
        this.commonAttr.lazadaPlace = {}
        this.commonAttr.lazadaPlaceVal = [[], []]
        this.getShopeeGoodsPlace()
      } else if (this.currentKeywordPlatform === 9) {
        this.getSite()
        this.commonAttr.placeOrigin = []
        this.getLazadaGoodsPlace()
      }
    },
    // 开始采集
    StartCollection() {
      switch (this.activeName) {
        case 'first': // 关键字采集
          this['keywordSearch']()
          break
        case 'second': // 链接采集
          this['linksSearch']()
          break
        case 'third': // 整店采集
          this['entireMallSearch']()
          break
        default:
          this.$message.error('采集操作非法！！！！')
          break
      }
    },
    handleKeyFactory(num = 3) {
      try {
        let keyword = this.key.trim()
        if (!keyword) {
          return { code: -3, data: '参数不能为空' }
        }
        keyword = this.key.replace(/\s/g, ';').split(';')
        // const data = [[]]
        // let index = 0
        // keyword.map(item => { // 分组
        //   if (data[index].length >= num) {
        //     index++
        //     data[index] = []
        //   }
        //   data[index].push(item)
        // })
        // keyword = null
        return { code: 200, data: keyword }
      } catch (error) {
        return { code: -2, data: `关键词格式不规范：${error}` }
      }
    },
    async keywordSearch() {
      const res = this.handleKeyFactory() // 处理关键词
      if (res.code !== 200) {
        return res.code === -2 ? this.$message.error('') : undefined
      }
      let key = res.data
      const keyLen = res.data.length
      const platForm = this.currentKeywordPlatform
      this.buttonStatus.keyword = true
      this.consoleMsg = ''
      this.goodsList = []
      this.$refs.plTable.reloadData(this.goodsList)
      this.CollectKeyWordApInstance._initKeyWord(platForm, this.commonAttr)
      this.writeLog('开始采集搜索........', true)
      this.writeLog(`开始采集${platformObj[platForm]}的商品.......`, true)

      for (let i = 0; i < keyLen; i++) {
        const item = key[i]
        // this.writeLog(`采集关键字：${item}`, true)
        const res2 = await this.CollectKeyWordApInstance.keywordSearch(item)
        if (res2.code !== 200) {
          continue
        }
        this.goodsList.push(...res2.data)
      }
      if (platForm === 1) { // 如果当前平台为拼多多需额外调用 拼多多补充接口  1.1-------------------------
        for (let i = 0; i < keyLen; i++) {
          const item = key[i]
          // this.writeLog(`采集关键字：${item}`, true)
          const res2 = await this.CollectKeyWordApInstance.keywordSearchTwo(item)
          if (res2.code !== 200) {
            continue
          }
          this.goodsList.push(...res2.data)
        }
      }
      this.writeLog(`${platformObj[platForm]}：共采集：${this.goodsList.length}条`, true)
      this.writeLog(`${platformObj[platForm]}的商品采集完毕........`, true)
      key = null
      this.buttonStatus.keyword = false
    },

    linksSearch() {
    },
    entireMallSearch() {
    },
    // 辅助-----------------------------
    writeLog(msg, success = true) {
      if (this.consoleMsg === undefined) {
        return
      }
      if (!msg) { return }
      const color = success ? 'green' : 'red'
      const time = this.dateFormat(new Date(Date.now()), 'hh:mm:ss')
      this.consoleMsg += `<p style="color:${color}; margin-top: 5px;">${time}:${msg}</p>`
    },
    dateFormat(time, fmt) {
      var o = {
        'M+': time.getMonth() + 1, // 月份
        'd+': time.getDate(), // 日
        'h+': time.getHours(), // 小时
        'm+': time.getMinutes(), // 分
        's+': time.getSeconds(), // 秒
        'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
        'S': time.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length)) }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
      }
      return fmt
    },
    async delay(time) {
      return new Promise(resolve => {
        const timeId = setTimeout(() => {
          clearTimeout(timeId)
          resolve(true)
        }, time)
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../module-less/product-put-less/platform-selection.less';
</style>
