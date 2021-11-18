<template>
  <div class="contaniner">
    <header>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="关键词采集" name="first">
          <div class="keyword-container">
            <div class="keyword-banner-bar">
              <div v-for="item in keyworBar" :key="item.value" class="barChilren" :class="{ active: currentKeywordPlatform === item.value }" @click="selectPlatform(item)">{{ item.label }}</div>
            </div>
            <div class="keyword-banner-content">
              <div class="con-sub-1">
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
            <p style="height: 56px; white-space: normal">{{ row.Title }}</p>
          </template>
        </u-table-column>
        <u-table-column align="center" label="类目" prop="CategoryName">
          <template v-slot="{ row }">
            <p style="height: 56px; white-space: normal">{{ row.CategoryName }}</p>
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
import { getPlatform, platformObj } from './collection-platformId'
import testData from './testData'
export default {
  props: {
    baseConfig: {
      type: Object,
      required: false,
      default: () => {
        return {
          keywordConfig: [1, 1.2, 2, 8, 9, 10, 11, 12] // 关键词采集配置
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
      currentKeywordPlatform: 1,
      commonAttr: {
        StartPage: 1,
        EndPage: 2,
        StartSales: 0,
        EndSales: 999999999,
        StartPrice: 0,
        EndPrice: 999999999,
        keyFilter: ''
      },
      key: '',
      consoleMsg: '',
      keywordAttr: {
      }
    }
  },
  computed: {
    keyworBar() {
      const value = getPlatform(this.baseConfig.keywordConfig)
      return value
    }
  },
  created() {

  },
  mounted() {
    // this.goodsList = testData.data
    // this.$refs.plTable.reloadData(this.goodsList)
    // console.log('this.goodsList', this.goodsList)
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    selectPlatform(row) { // 关键词选择平台
      this.currentKeywordPlatform = row.value
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
        this.writeLog(`采集关键字：${item}`, true)
        const res2 = await this.CollectKeyWordApInstance.keywordSearch(item)
        if (res2.code !== 200) {
          continue
        }
        this.goodsList.push(...res2.data)
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
