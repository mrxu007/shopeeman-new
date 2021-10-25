<template>
  <el-row class="contaniner">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="自动回复" name="autoReply">
        <el-row class="header">
          <el-col class="header-top">
            <storeChoose @changeMallList="changeMallList" />
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
            <storeChoose :is-all="true" @changeMallList="changeMallList" />
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
            <ul>
              <li>
                <span>站点：</span>
                <el-select v-model="countryVal" placeholder="" size="mini" filterable>
                  <el-option v-for="(item, index) in countries" :key="index" :label="item.label" :value="item.value" />
                </el-select>
              </li>
              <li>
                <span>店铺分组：</span>
                <el-select v-model="groupId" placeholder="" size="mini" filterable>
                  <el-option label="全部" :value="0" />
                  <el-option label="无分组" :value="-1" />
                  <el-option v-for="(item, index) in 4" :key="index" :label="item" :value="item" />
                </el-select>
              </li>
              <li>
                <span>店铺：</span>
                <el-select v-model="site" placeholder="" size="mini" filterable>
                  <el-option v-for="(item, index) in 4" :key="index" :label="item" :value="item" />
                </el-select>
              </li>
            </ul>
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
      countryVal: 'TH',
      countries: [
        { label: '泰国站', value: 'TH' },
        { label: '马来站', value: 'MY' },
        { label: '台湾站', value: 'TW' },
        { label: '新加坡站', value: 'SG' },
        { label: '菲律宾站', value: 'PH' },
        { label: '越南站', value: 'VN' },
        { label: '印尼站', value: 'ID' },
        { label: '巴西站', value: 'BR' }
      ],
      groupId: '',
      site: ''

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
    changeMallList(val) {
      this.site = Object.assign(val)
      console.log('changeMallList', this.site)
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
