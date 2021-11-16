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
                  <el-input size="mini" />
                  <p>总页码:</p>
                  <el-input size="mini" />
                </div>
                <div class="item">
                  <p>销售区间:</p>
                  <el-input size="mini" />
                  <p>-</p>
                  <el-input size="mini" />
                </div>
                <div class="item">
                  <p>价格区间:</p>
                  <el-input size="mini" />
                  <p>-</p>
                  <el-input size="mini" />
                </div>
              </div>
              <div class="con-sub-2">
                <div class="item">
                  <p>关键词(一行一个)</p>
                  <el-input size="mini" type="textarea" :rows="8" resize="none" />
                </div>
                <div class="item">
                  <p>过滤关键词(一行一个)</p>
                  <el-input size="mini" type="textarea" :rows="8" resize="none" />
                </div>
              </div>
              <div class="con-sub-3">
                <el-button type="primary" size="mini">开始采集</el-button>
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
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
    </header>
    <article>456</article>
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

      // keyWord search
      currentKeywordPlatform: 1
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
      console.log(tab, event)
    },
    selectPlatform(row) { // 关键词选择平台
      this.currentKeywordPlatform = row.value
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../module-less/product-put-less/platform-selection.less';
</style>
