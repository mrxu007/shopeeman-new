<template>
  <el-row class="contaniner">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="活动列表" name="list">
        <el-row class="header">
          <ul style="margin-bottom:10px"><storeChoose @changeMallList="changeMallList" /></ul>
          <ul style="margin-left: 20px;">
            <li>
              <span>活动状态：</span>
              <el-select v-model="discountType" :disabled="isDisabled" size="mini" filterable style="width:100px">
                <el-option :value="'all'" label="全部" />
                <el-option v-for="(item,index) in discountTypeList" :key="index" :value="item.value" :label="item.label" />
              </el-select>
            </li>
            <li>
              <el-input v-model="keyword" :disabled="isDisabled" size="mini" style="width:242px" oninput="value=value.replace(/\s+/g,'')" clearable>
                <el-select slot="prepend" v-model="searchType" style="width:100px">
                  <el-option v-for="(item, index) in searchTypeList" :key="index" :label="item.label" :value="item.value" />
                </el-select>
              </el-input>
            </li>
            <li>
              <el-button type="primary" size="mini" :disabled="isDisabled" @click="queryData">搜 索</el-button>
              <el-button type="primary" size="mini" :disabled="isDisabled" @click="activeName='edit'">创建新的活动</el-button>
              <el-button type="primary" size="mini" :disabled="isDisabled">批量结束活动</el-button>
              <el-button type="primary" size="mini" :disabled="isDisabled" @click="restartActivityDia">重新启动已过期的活动</el-button>
              <el-button type="primary" size="mini" :disabled="isDisabled">数据导出</el-button>
              <el-button type="primary" size="mini">清除日志</el-button>
              <el-checkbox v-model="hideEnded" style="margin-left:20px" :disabled="isDisabled">不显示过期活动</el-checkbox>
              <el-checkbox v-model="showConsole">隐藏日志</el-checkbox>
            </li>
          </ul>
        </el-row>
        <el-row id="article">
          <u-table
            ref="plTable"
            :data="tableData"
            use-virtual
            :height="680"
            :row-height="45"
            :data-changes-scroll-top="false"
            :border="false"
            :header-cell-style="{
              textAlign: 'center',
              backgroundColor: '#f5f7fa',
            }"
            @selection-change="handleSelectionChange1"
          >
            <u-table-column align="center" type="selection" width="50" />
            <u-table-column align="center" type="index" label="序号" width="50" />
            <u-table-column align="center" label="店铺" min-width="150" prop="mallName" />
            <u-table-column align="center" label="活动ID" min-width="150" prop="discount_id" />
            <u-table-column align="center" label="活动名称" min-width="150" prop="title" />
            <u-table-column align="center" label="活动状态" min-width="100" prop="statusName">
              <template v-slot="{row}">
                <span :style="statusNameColor[row.statusName] && 'color:' + statusNameColor[row.statusName]">
                  {{ row.statusName }}
                </span>
              </template>
            </u-table-column>
            <u-table-column align="center" label="商品数量" min-width="100" prop="total_product" />
            <u-table-column align="center" label="活动时间" min-width="270">
              <template v-slot="{row}">
                {{ `${$dayjs(row.start_time).format('MM/DD/YYYY HH:mm:ss')} - ${$dayjs(row.end_time).format('MM/DD/YYYY HH:mm:ss')}` }}
              </template>
            </u-table-column>
            <u-table-column align="center" label="操作" min-width="240">
              <template v-slot="{row}">
                <el-button type="primary" size="mini">查看详情</el-button>
                <el-button type="primary" size="mini">复制</el-button>
                <el-button type="primary" size="mini">结束</el-button>
              </template>
            </u-table-column>
          </u-table>
          <!-- 选择时间弹窗 -->
          <el-dialog
            v-if="timeVisible"
            class="time-dialog"
            title="选择时间"
            :visible.sync="timeVisible"
            width="500px"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
          >
            <div class="content">
              <span>折扣促销时间：</span>
              <el-date-picker
                v-model="promotionTime"
                type="datetimerange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="mini"
              />
            </div>
            <div class="footer">
              <el-button size="mini" style="margin-right:20px" @click="timeVisible= false">取 消</el-button>
              <el-button type="primary" size="mini" @click="determineRestart">确 定</el-button>
            </div>
          </el-dialog>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="活动编辑" name="edit">
        <el-row class="header edit">
          <ul style="margin-bottom:10px"><storeChoose @changeMallList="changeMallList" /></ul>
          <ul style="margin:0 0 10px 20px;">
            <li>
              <span>活动名称：</span>
              <el-input size="mini" oninput="value=value.replace(/\s+/g,'')" clearable />
            </li>
            <li>
              <span>商品编号：</span>
              <el-input style="width:180px" size="mini" oninput="value=value.replace(/\s+/g,'')" clearable />
            </li>
            <li>
              <span>活动时间：</span>
              <el-date-picker unlink-panels size="mini" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" />
              <el-button style="margin-left:21px" type="primary" size="mini">搜 索</el-button>
            </li>
          </ul>
          <ul style="margin:0 0 10px 20px;">
            <li style="margin-right:19px">
              <span>活动折扣：</span>
              <el-input size="mini" oninput="value=value.replace(/\s+/g,'')" clearable />%
            </li>
            <li>
              <span>限购数量：</span>
              <el-input style="width:180px" size="mini" oninput="value=value.replace(/\s+/g,'')" clearable />
            </li>
            <li>
              <el-button type="primary" size="mini">搜 索</el-button>
              <el-button type="primary" size="mini">批量修改折扣和限购</el-button>
              <el-button type="primary" size="mini">添加商品</el-button>
              <el-button type="primary" size="mini">创建活动</el-button>
              <el-checkbox v-model="showConsole" style="margin-left:10px">隐藏日志</el-checkbox>
            </li>
          </ul>
          <ul style="margin:0 0 0 20px;">
            <span style="color:red">折扣公式为：折扣价格=商品原价*折扣%。如原价100元的商品，输入80，最后的折扣价格为80元</span>
          </ul>
        </el-row>
        <el-row id="article">
          <u-table
            ref="editPlTable"
            :data="editTableData"
            use-virtual
            :height="620"
            :row-height="68"
            :data-changes-scroll-top="false"
            :border="false"
            :header-cell-style="{
              textAlign: 'center',
              backgroundColor: '#f5f7fa',
            }"
            @selection-change="handleSelectionChange2"
          >
            <u-table-column align="center" type="selection" width="50" />
            <u-table-column align="center" type="index" label="序号" width="50" />
            <u-table-column align="center" label="店铺名称" min-width="150" />
            <u-table-column align="center" label="主图" min-width="150" />
            <u-table-column align="center" label="商品名称" min-width="150" />
            <u-table-column align="center" label="商品编号" min-width="150" />
            <u-table-column align="center" label="商品规格" min-width="150" />
            <u-table-column align="center" label="原价" min-width="150" />
            <u-table-column align="center" label="售价" min-width="150" />
            <u-table-column align="center" label="折扣" min-width="150" />
            <u-table-column align="center" label="购买限制" min-width="150" />
            <u-table-column align="center" label="操作" min-width="150" />
            <u-table-column align="center" label="操作状态" min-width="150" />
          </u-table>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <div class="logging">
      <Logs ref="Logs" v-model="showConsole" clear />
    </div>
  </el-row>
</template>

<script>
import { batchOperation, delay, terminateThread } from '@/util/util'
import StoreChoose from '../../../components/store-choose'
import GoodsDiscount from '../../../module-api/market-activity-api/goods-discount'
export default {
  components: {
    StoreChoose
  },
  data() {
    return {
      activeName: 'list',
      GoodsDiscount: new GoodsDiscount(this),

      showConsole: true, // 日志

      // list
      promotionTime: [], // 折扣促销时间
      timeVisible: false, // 选择时间弹窗
      hideEnded: false, // 隐藏过期活动
      limit: 100,
      isDisabled: false,
      keyword: '',
      searchType: 'promotion_name',
      discountType: 'all', // 活动状态
      selectMallList: [], // 店铺选择数据
      tableData: [], // 表格数据
      multipleSelection: [], // 选择数据
      endedActivityData: [], // 重启已过期活动
      discountTypeList: [
        { value: 'ongoing', label: '进行中' },
        { value: 'upcoming', label: '接下来有活动' },
        { value: 'ended', label: '活动已过期' }
      ],
      searchTypeList: [
        { value: 'promotion_name', label: '活动名称' },
        { value: 'item_name', label: '商品名称' },
        { value: 'item_id', label: '商品ID' }
      ],
      statusNameColor: {
        '进行中': 'green',
        '即将开始': 'orangered'
      },
      // edit
      editTableData: [], // 表格数据
      editMultipleSelection: []// 选择数据
    }
  },
  methods: {
    // 重新启动已过期的活动弹窗
    restartActivityDia() {
      this.endedActivityData = []
      for (let i = 0; i < this.multipleSelection?.length; i++) {
        const item = this.multipleSelection[i]
        if (item.statusName === '已过期') {
          this.endedActivityData.push(item)
        }
      }
      if (!this.endedActivityData.length) return this.$message('请选择已过期活动执行此操作')
      this.timeVisible = true
      this.promotionTime = [new Date(), new Date().getTime() + 3600 * 1000]
    },
    // 确定重启
    async determineRestart() {
      if (!this.promotionTime?.length) return this.$message('请选择折扣促销时间')
      this.timeVisible = false
      const start_time = this.promotionTime[0].getTime().toString().substr(0, 10)
      const end_time = this.promotionTime[1].toString().substr(0, 10)
      this.isDisabled = true
      this.$refs.Logs.writeLog(`开始重启已过期的活动`, true)
      this.endedActivityData.forEach(item => {
        item.offset = 0
        item.mList = []
      })
      await batchOperation(this.endedActivityData, this.restartActivity)
      this.isDisabled = false
    },
    // 重新启动已过期的活动
    async restartActivity(item, count = { count: 1 }) {
      const params = {}
      try {
        // 1、查询折扣活动详情
        params['item'] = item
        const nominateRes = await this.GoodsDiscount.getDiscountNominate(params)
        console.log('nominateRes', nominateRes)
        if (nominateRes.code !== 200) {
          return this.$refs.Logs.writeLog(`获取【${item.title}】【${item.discount_id}】错误：${nominateRes.data}`, false)
        }
        this.$refs.Logs.writeLog(`获取【${item.title}】【${item.discount_id}】详情结束，共${nominateRes.data.item_info.length}件商品`, true)
      } catch (error) {

      } finally {
        --count.count
      }
    },
    // 搜索
    async queryData() {
      if (!this.selectMallList.length) return this.$message('请选择店铺')
      this.isDisabled = true
      this.showConsole = false
      this.tableData = []
      this.$refs.Logs.writeLog(`开始查询`, true)
      this.selectMallList.forEach(item => {
        item.offset = 0
        item.mList = []
      })
      await batchOperation(this.selectMallList, this.getDiscountList)
      this.$refs.Logs.writeLog(`查询结束`, true)
      this.isDisabled = false
    },
    // 获取折扣列表数据
    async getDiscountList(mItem, count = { count: 1 }) {
      let mallName = ''
      let total_count = 0
      let res = ''
      mallName = mItem.mall_alias_name || mItem.platform_mall_name
      const params = {}
      params['mItem'] = mItem
      params['discountType'] = this.discountType
      params['limit'] = this.limit
      try {
        const promotionid = []
        // 输入条件查询 1、查询promotionid
        if (this.keyword) {
          params['keyword'] = this.keyword
          params['searchType'] = this.searchType
          const idRes = await this.GoodsDiscount.getDiscountStandardSearch(params)
          if (idRes.code !== 200) {
            return this.$refs.Logs.writeLog(`店铺【${mallName}】：${idRes.data}`, false)
          }
          if (!idRes.data?.hits || idRes.data?.hits?.length <= 0) {
            return this.$refs.Logs.writeLog(`店铺【${mallName}】共查询到【0】条数据`, true)
          }
          idRes.data.hits.forEach(item => {
            promotionid.push(item.promotionid)
          })
        }
        do {
          if (this.keyword && promotionid?.length > 0) {
            // 输入条件查询 2、查询列表数据
            params['promotionid'] = promotionid
            res = await this.GoodsDiscount.getByDiscountids(params)
          } else {
            // 未输入条件时查询
            res = await this.GoodsDiscount.getDiscountList(params)
          }
          if (res.code === 200) {
            total_count = res.data.total_count
            for (let i = 0; i < res.data.discount_list.length; i++) {
              const item = res.data.discount_list[i]
              item.mallName = mallName
              item.start_time = item.start_time * 1000
              item.end_time = item.end_time * 1000
              item.country = mItem.country
              item.platform_mall_id = mItem.platform_mall_id
              const nowTime = new Date().getTime()
              if (item.start_time > nowTime) {
                item.statusName = '即将开始'
              } else if (item.end_time < nowTime) {
                item.statusName = '已过期'
              } else {
                item.statusName = '进行中'
              }
            }
            mItem.mList = mItem.mList.concat(res.data.discount_list)
            const newData = this.filterData(res.data.discount_list)
            this.tableData = this.tableData.concat(newData)
          } else {
            this.$refs.Logs.writeLog(`店铺【${mallName}】：${res.data}`, false)
          }
          mItem.offset += this.limit
        } while (mItem.mList.length < total_count && total_count !== 0)
        this.$refs.Logs.writeLog(`查询店铺【${mallName}】共${mItem.mList.length}条数据`, true)
        console.log('tableData', this.tableData)
      } catch (error) {
        this.$refs.Logs.writeLog(`店铺【${mallName}】异常：${error}`, false)
      } finally {
        --count.count
      }
    },
    filterData(data) {
      const fData = []
      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        if (this.hideEnded && item.statusName === '已过期') {
          continue
        }
        fData.push(item)
      }
      return fData
    },
    handleClick(tab, event) {

    },
    handleSelectionChange1(val) {
      this.multipleSelection = val
    },
    handleSelectionChange2(val) {
      this.editMultipleSelection = val
    },
    changeMallList(val) {
      this.selectMallList = val
      this.country = val.country
      console.log('changeMallList', val)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../module-less/market-activity-less/goods-discount.less';
</style>
