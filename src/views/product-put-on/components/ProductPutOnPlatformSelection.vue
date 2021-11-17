<template>
  <div class="contaniner">
    <header>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="关键词采集" name="first" class="keyword">
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
                <el-button type="primary" size="mini" @click="StartCollection">开始采集</el-button>
                <el-button type="primary" size="mini">取消采集</el-button>
                <div class="item">
                  <p>起:</p>
                  <el-input size="mini" placeholder="" />
                  <p>止:</p>
                  <el-input size="mini" placeholder="" />
                </div>
                <el-button type="primary" size="mini">收藏商品</el-button>
                <el-button type="primary" size="mini">编辑上新</el-button>
                <el-button type="primary" size="mini">插件采集</el-button>
                <el-button type="primary" size="mini">清理全部</el-button>
                <el-button type="primary" size="mini">导出数据</el-button>
                <el-button type="primary" size="mini">批量删除</el-button>
              </div>
              <div class="con-sub-4">
                <div class="con-sub5-log" />
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="商品链接采集" name="second" />
        <el-tab-pane label="整店采集" name="third" />
        <el-tab-pane label="定时任务补偿" name="fourth" />
      </el-tabs>
    </header>
    <article>123</article>
  </div>
</template>

<script>
import CollectKeyWordApI from './collection-keyword-api'
import getPlatform from './collection-platformId'
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
      activeName: 'first',
      CollectKeyWordApInstance: new CollectKeyWordApI(this),

      // button
      buttonStatus: {
        keyword: false
      },
      // keyWord search
      currentKeywordPlatform: 1,
      commonAttr: {
        StartPage: 1,
        EndPage: 20,
        StartSales: 0,
        EndSales: 0,
        StartPrice: 0,
        EndPrice: 999999999,
        keyFilter: '',
        consoleMsg: ''
      },
      key: '',
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
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event)
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
        const data = [[]]
        let index = 0
        keyword.map(item => { // 分组
          if (data[index].length >= num) {
            index++
            data[index] = []
          }
          data[index].push(item)
        })
        keyword = null
        return { code: 200, data }
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
      this.CollectKeyWordApInstance._initKeyWord(platForm, this.commonAttr)
      for (let i = 0; i < keyLen; i++) {
        const keyItem = key[i]
        const res = await this.CollectKeyWordApInstance.keywordSearch(keyItem)

        debugger
      }
      key = null
      this.buttonStatus.keyword = false
    },
    linksSearch() {
    },
    entireMallSearch() {
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../module-less/product-put-less/platform-selection.less';
</style>
