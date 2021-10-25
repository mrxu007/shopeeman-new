<template>
  <el-row class="contaniner">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="自动回复" name="autoReply">
        <el-row class="header">
          <el-col class="header-top">
            <storeChoose :source="'autoReply'" style="margin-bottom: 10px;" @changeMallList="changeMallList" />
            <el-col :span="24" class="header-two-top">
              <el-button type="primary" size="mini">批量设置预设自动回复</el-button>
              <el-button type="primary" size="mini">批量开启预设自动回复</el-button>
              <el-button type="" size="mini">批量关闭预设自动回复</el-button>
              <el-button type="primary" size="mini">批量设置离线自动回复</el-button>
              <el-button type="primary" size="mini">批量开启离线自动回复</el-button>
              <el-button type="" size="mini">批量关闭离线自动回复</el-button>
              <el-button type="primary" size="mini" @click="searchAutoReplyTable">搜索</el-button>
              <el-checkbox v-model="isShowLog" size="mini" style="margin-left: 5px;">显示日志</el-checkbox>
            </el-col>
          </el-col>
        </el-row>
        <el-row class="article">
          <el-col :span="isShowLog && 20 || 24">
            <u-table
              ref="plTable"
              :height="height"
              :data="tableDataAutoReply"
              use-virtual
              :data-changes-scroll-top="false"
              :row-height="rowHeight"
              :border="false"
              @table-body-scroll="tableScroll"
            >
              <u-table-column align="center" type="selection" width="50" />
              <u-table-column align="center" type="index" label="序列号" width="100" />
              <u-table-column align="center" label="店铺名称">1</u-table-column>
              <u-table-column align="center" label="预设自动回复">1</u-table-column>
              <u-table-column align="center" label="离线自动回复">1</u-table-column>
            </u-table>
          </el-col>
          <el-col v-if="isShowLog" :span="4">
            <div class="log-show" :style="`height:${height}px`" />
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="常见问题助理" name="FAQAssistant">
        <el-row class="header">
          <el-col class="header-top">
            <storeChoose :source="'FAQAssistant'" @changeMallList="changeMallList" />
            <el-col :span="24" class="header-two-top">
              <el-button type="primary" size="mini">批量开启</el-button>
              <el-button type="" size="mini">批量关闭</el-button>
              <el-button type="primary" size="mini">批量添加常见问题</el-button>
              <el-button type="" size="mini">批量删除常见问题</el-button>
              <el-button type="primary" size="mini">搜索</el-button>
              <el-checkbox v-model="isShowLog" size="mini" style="margin-left: 5px;">显示日志</el-checkbox>
            </el-col>
          </el-col>
        </el-row>
        <el-row class="article">
          <el-col :span="isShowLog && 20 || 24">
            <u-table
              ref="plTable"
              :height="height"
              use-virtual
              :data-changes-scroll-top="false"
              :row-height="rowHeight"
              :border="false"
              @table-body-scroll="tableScroll"
            >
              <u-table-column align="center" type="selection" width="50" />
              <u-table-column align="center" type="index" label="序列号" width="100" />
              <u-table-column align="center" label="店铺名称">1</u-table-column>
              <u-table-column align="center" label="分组名称">1</u-table-column>
              <u-table-column align="center" label="问候语">1</u-table-column>
              <u-table-column align="center" label="常见问题助理">1</u-table-column>
              <u-table-column align="center" label="操作">1</u-table-column>
            </u-table>
          </el-col>
          <el-col v-if="isShowLog" :span="4">
            <div class="log-show" :style="`height:${height}px`" />
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="讯息快捷" name="messageQuickly">
        <el-row class="header">
          <el-col class="header-top">
            <storeChoose :source="'messageQuickly'" @changeMallList="changeMallList" />
            <el-col :span="24" class="header-two-top">
              <el-button type="primary" size="mini">批量开启</el-button>
              <el-button type="" size="mini">批量关闭</el-button>
              <el-button type="primary" size="mini">批量添加</el-button>
              <el-button type="" size="mini">批量删除</el-button>
              <el-button type="primary" size="mini">搜索</el-button>
              <el-checkbox v-model="isShowLog" size="mini" style="margin-left: 5px;">显示日志</el-checkbox>
            </el-col>
          </el-col>
        </el-row>
        <el-row class="article">
          <el-col :span="isShowLog && 20 || 24">
            <u-table
              ref="plTable"
              :height="height"
              use-virtual
              :data-changes-scroll-top="false"
              :row-height="rowHeight"
              :border="false"
              @table-body-scroll="tableScroll"
            >
              <u-table-column align="center" type="selection" width="50" />
              <u-table-column align="center" type="index" label="序列号" width="100" />
              <u-table-column align="center" label="店铺名称">1</u-table-column>
              <u-table-column align="center" label="分组名称">1</u-table-column>
              <u-table-column align="center" label="分组状态">1</u-table-column>
              <u-table-column align="center" label="讯息内容">1</u-table-column>
              <u-table-column align="center" label="操作">1</u-table-column>
            </u-table>
          </el-col>
          <el-col v-if="isShowLog" :span="4">
            <div class="log-show" :style="`height:${height}px`" />
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-row>
</template>

<script>
import storeChoose from '../../../components/store-choose'

export default {
  components: { storeChoose },
  data() {
    return {
      activeName: 'autoReply',
      isShowLog: true,
      height: 300,
      rowHeight: 50,
      SiteList: {
        autoReply: null,
        FAQAssistant: null,
        messageQuickly: null
      },
      tableDataAutoReply: [],
      tableDataFAQAssistant: [],
      tableDataMessageQuickly: []
    }
  },
  mounted() {

  },
  created() {
    this.resizeHeight()
    window.addEventListener('resize', (event) => {
      this.resizeHeight()
    })
  },
  methods: {
    resizeHeight() {
      const offerHeight = window.innerHeight
      this.height = offerHeight - 190
    },
    changeMallList(data) {
      this.SiteList[data.source] = data.mallList
      console.log('changeMallList', this.SiteList)
    },
    async searchAutoReplyTable() {
      this.tableDataAutoRepl = []
      const mallList = this.SiteList.autoReply || []
      mallList.forEach(async item => {
        const resOfflineJson = await this.$shopeemanService.scOfflineReply(item.country, { shop_id: item.platform_mall_id })
        const resChatJson = await this.$shopeemanService.scChatSetting(item.country, { shop_id: item.platform_mall_id })
        const temp = {}
        try {
          const resOffline = JSON.parse(resOfflineJson)
          console.log('offlineRes', resOffline)
          if (resOffline.status === 200) {

          } else {

          }
        } catch (e) {

        }
        try {
          const resChat = JSON.parse(resChatJson)
          console.log('resChatJson', resChat)
          if (resChat.status === 200) {

          } else {

          }
        } catch (e) {

        }
      })
    },

    handleClick() {

    },
    tableScroll() {

    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../../module-less/mall-manager-less/mall-chat.less';
</style>
