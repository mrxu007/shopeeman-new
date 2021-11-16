<template>
  <div class="contaniner">
    <header>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="关键词采集" name="first" class="keyWord">
          <ul class="keyword-banner-bar">
            <li v-for="item in keyworBar" :key="item.value" :class="{ active: currentKeywordPlatform === item.value }" @click="selectPlatform(item)">{{ item.label }}</li>
          </ul>
          <ul class="keyword-banner-content">
            <li class="con-sub-1">
              <div>
                <p>开始页码：</p>
                <el-input size="mini" />
              </div>
            </li>
            <li class="con-sub-2">2</li>
            <li class="con-sub-3">3</li>
          </ul>
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
