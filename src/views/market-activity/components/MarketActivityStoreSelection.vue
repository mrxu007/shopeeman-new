<template>
  <el-row class="contaniner">
    <el-row class="header">
      <ul>
        <li>
          <div class="base-box">
            <span class="base-title">店铺分组</span>
            <div class="base-item">
              <storeChoose @changeMallList="changeMallList" />
            </div>
            <div class="base-item" style="margin-left:18px">
              <el-checkbox v-model="isStatus" :disabled="isDisabled">只查询已启用的精选组</el-checkbox>
              <el-checkbox :disabled="isDisabled" style="margin-left: 17px;">每隔 <el-input :disabled="isDisabled" size="mini" class="input" clearable /> 小时循环启用精选组</el-checkbox>
            </div>
            <div style="margin-left:18px">
              <el-button :disabled="isDisabled" type="primary" size="mini" @click="queryData">查询精选组</el-button>
              <el-button :disabled="isDisabled" type="primary" size="mini" @click="singleAdd">添加单个精选组</el-button>
              <el-button :disabled="isDisabled" type="primary" size="mini" @click="deleteSelection(multipleSelection,2)">批量删除精选组</el-button>
              <el-button
                :disabled="isDisabled"
                type="primary"
                size="mini"
                @click="queryIsOpen(multipleSelection,2)"
              >批量关闭精选组</el-button>
              <el-checkbox v-model="showConsole" style="margin:0 10px">隐藏日志</el-checkbox>
              <el-button type="primary" size="mini" @click="$refs.Logs.consoleMsg = ''">清除日志</el-button>
            </div>
          </div>
        </li>
        <li>
          <div class="base-box" style="padding-left:20px">
            <span class="base-title">添加精选组参数数据</span>
            <div class="base-item" style="margin-top:5px">
              <span>每个店铺添加 <el-input :disabled="isDisabled" size="mini" class="input" clearable /> 组精选商品<span class="red-span">（最大10组）</span></span>
              <span>每组精选添加 <el-input :disabled="isDisabled" size="mini" class="input" clearable /> 个商品<span class="red-span">（最少4个，最多8个）</span></span>
            </div>
            <div class="base-item">
              <span>精选商品排序 </span>
              <el-select
                v-model="goodsSort"
                size="mini"
                filterable
                :disabled="isDisabled"
              >
                <el-option
                  v-for="(item,index) in goodsSortList"
                  :key="index"
                  :value="item.value"
                  :label="item.label"
                />
              </el-select>
              <el-button :disabled="isDisabled" type="primary" size="mini">开始批量添加</el-button>
              <el-button :disabled="isDisabled" type="primary" size="mini">停止添加</el-button>
            </div>
            <span class="red-span">批量添加：精选名称自动生成，默认开启第一组精选商品</span>
          </div>
        </li>
      </ul>
    </el-row>
    <el-row id="article">
      <u-table
        ref="plTable"
        :data="tableData"
        use-virtual
        :height="700"
        :row-height="68"
        :data-changes-scroll-top="false"
        :border="false"
        :header-cell-style="{
          textAlign: 'center',
          backgroundColor: '#f5f7fa',
        }"
        @selection-change="handleSelectionChange"
      >
        <u-table-column align="center" type="selection" min-width="50" />
        <u-table-column align="center" type="index" label="序号" min-width="50" />
        <u-table-column align="center" label="店铺名称" min-width="100" prop="mallName" />
        <u-table-column align="center" label="精选名称" min-width="100" prop="name" />
        <u-table-column align="center" label="商品详情" min-width="400">
          <template v-slot="{row}">
            <div style="display:flex">
              <div v-for="(item,i) in row.images" :key="i">
                <el-tooltip
                  v-if="item"
                  effect="light"
                  placement="right-end"
                  :visible-arrow="false"
                  :enterable="false"
                  style="width: 50px; height: 50px"
                >
                  <div slot="content">
                    <el-image
                      :src="[row.country ,row.platform_mall_id , item] | imageRender"
                      style="width: 400px; height: 400px"
                    >
                      <div slot="error" class="image-slot" />
                      <div slot="placeholder" class="image-slot">
                        加载中<span class="dot">...</span>
                      </div>
                    </el-image>
                  </div>
                  <el-image
                    style="width: 40px; height: 40px"
                    :src="[row.country ,row.platform_mall_id , item] | imageRender"
                  >
                    <div slot="error" class="image-slot" />
                    <div slot="placeholder" class="image-slot">
                      加载中<span class="dot">...</span>
                    </div>
                  </el-image>
                </el-tooltip>
              </div>
            </div>
          </template>
        </u-table-column>
        <u-table-column align="center" label="启用状态" min-width="100">
          <template v-slot="{row}">
            <el-switch v-model="row.status" active-color="#13ce66" inactive-color="#ff4949" @change="queryIsOpen(row,1)" />
          </template>
        </u-table-column>
        <u-table-column align="center" label="操作" min-width="150">
          <template v-slot="{row}">
            <el-button type="primary" size="mini" @click="editData(row)">编辑</el-button>
            <el-button type="primary" size="mini" :disabled="row.status" @click="deleteSelection(row,1)">删除</el-button>
          </template>
        </u-table-column>
      </u-table>
    </el-row>
    <div class="logging">
      <Logs ref="Logs" v-model="showConsole" clear />
    </div>
    <!--编辑精选组详情弹窗-->
    <el-dialog
      v-if="detailsVisible"
      class="details-dialog"
      title="编辑精选组详情"
      :visible.sync="detailsVisible"
      width="1000px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <ul style="margin-bottom:10px">
        <li><span>店铺名称：{{ detailsData.mallName }}</span></li>
        <li><span style="width:113px">精选组名称：</span><el-input v-model="detailsData.name" style="width:150px" clearable size="mini" /></li>
        <li><span>启用状态：{{ detailsData.status?'已启用':'未启用' }}</span></li>
        <li>
          <el-button type="primary" size="mini" :loading="queryProductLoading" @click="productSelector">添加商品</el-button>
          <el-button
            type="primary"
            size="mini"
            :disabled="detailsData.status"
            @click="saveSelectionGroup(true)"
          >保存并启用</el-button>
          <el-button type="primary" size="mini" @click="saveSelectionGroup(false)">保存</el-button>
        </li>
      </ul>
      <ul style="margin-bottom:10px">
        <el-input v-model="productId" size="mini" /><span class="red-span" style="width:270px" clearable>添加多个商品，请以英文逗号（,）隔开</span>
      </ul>
      <ul>
        <u-table
          ref="plTable"
          :data="detailsData.graphqlData"
          use-virtual
          :height="385"
          :row-height="68"
          :data-changes-scroll-top="false"
          :border="false"
          :header-cell-style="{
            textAlign: 'center',
            backgroundColor: '#f5f7fa',
          }"
        >
          <u-table-column align="center" type="index" label="序号" min-width="50" />
          <u-table-column align="center" label="商品ID" min-width="100" prop="itemid" />
          <u-table-column align="center" label="商品图片" min-width="80">
            <template v-slot="{row}">
              <el-tooltip
                v-if="row.images[0]"
                effect="light"
                placement="right-end"
                :visible-arrow="false"
                :enterable="false"
                style="width: 50px; height: 50px"
              >
                <div slot="content">
                  <el-image
                    :src="[row.country ,row.platform_mall_id , row.images[0]] | imageRender"
                    style="width: 400px; height: 400px"
                  >
                    <div slot="error" class="image-slot" />
                    <div slot="placeholder" class="image-slot">
                      加载中<span class="dot">...</span>
                    </div>
                  </el-image>
                </div>
                <el-image
                  style="width: 40px; height: 40px"
                  :src="[row.country ,row.platform_mall_id , row.images[0]] | imageRender"
                >
                  <div slot="error" class="image-slot" />
                  <div slot="placeholder" class="image-slot">
                    加载中<span class="dot">...</span>
                  </div>
                </el-image>
              </el-tooltip>
            </template>
          </u-table-column>
          <u-table-column align="center" label="商品名称" min-width="300" prop="name" show-overflow-tooltip />
          <u-table-column align="center" label="商品价格" min-width="100" prop="price" />
          <u-table-column align="center" label="销量" min-width="80" prop="sold" />
          <u-table-column align="center" label="操作" min-width="100">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="detailsData.graphqlData.splice(scope.$index, 1)">删除</el-button>
            </template>
          </u-table-column>
        </u-table>
      </ul>
    </el-dialog>
  </el-row>
</template>

<script>
import { batchOperation } from '@/util/util'
import StoreChoose from '../../../components/store-choose'
import StoreSelection from '../../../module-api/market-activity-api/store-selection'
export default {
  components: {
    StoreChoose
  },
  data() {
    return {
      isStatus: false,
      isDisabled: false,
      detailsVisible: false,
      queryProductLoading: false,
      StoreSelection: new StoreSelection(this),

      productId: '10053264472,14819733964,14019733891,15519732902', // 添加商品ID
      goodsSort: 0, // 排序
      showConsole: true, // 日志
      country: '', // 站点

      selectMallList: [], // 店铺选择数据
      tableData: [], // 表格数据
      multipleSelection: [], // 选择数据
      detailsData: {
        graphqlData: []
      }, // 详情数据

      goodsSortList: [
        { value: 0, label: '最热销' },
        { value: 1, label: '最近更新' },
        { value: 2, label: '价格（从低至高）' },
        { value: 3, label: '价格（从高至低）' }
      ]
    }
  },
  methods: {
    // 批量/删除精选组
    async deleteSelection(val, type) {
      if (type === 1) {
        await this.deleteSelectionGroup(val)
      } else {
        if (!this.multipleSelection.length) return this.$message('请选择数据后操作')
        for (let i = 0; i < this.multipleSelection.length; i++) {
          const item = this.multipleSelection[i]
          this.deleteSelectionGroup(item)
        }
      }
    },
    // 删除精选组
    async deleteSelectionGroup(val) {
      const params = {}
      params['plan_id'] = val.id
      params['platform_mall_id'] = val.platform_mall_id
      params['country'] = val.country
      const res = await this.StoreSelection.markeHotSalePlan(params, 'deleteChinese')
      if (res.code === 200) {
        this.$refs.Logs.writeLog(`【${val.mallName}】下【${val.name}】删除成功`, true)
        this.tableData.splice(this.tableData.findIndex(item => { return item.id === val.id }), 1)
      } else {
        this.$refs.Logs.writeLog(`【${val.mallName}】下【${val.name}】删除失败：${res.data}`, false)
      }
    },
    // 设置精选组
    async queryIsOpen(val, type) {
      if (type === 1) {
        this.$refs.Logs.writeLog(`正在设置精选组状态...`, true)
        const newData = this.tableData.filter(item => {
          return item.status === true && item.platform_mall_id === val.platform_mall_id && val.id !== item.id
        })
        if (newData?.length > 0) {
          newData[0].status = false
          await this.setSelectionGroup(...newData)
        }
        await this.setSelectionGroup(val)
      } else {
        if (!this.multipleSelection.length) return this.$message('请选择数据后操作')
        const newData = this.multipleSelection.filter(item => {
          return item.status === true
        })
        console.log('newData', newData)
        if (!this.newData?.length <= 0) return this.$message('没有可关闭的数据')
        this.$refs.Logs.writeLog(`正在设置精选组状态...`, true)
        for (let i = 0; i < newData.length; i++) {
          const item = newData[i]
          item.status = false
          await this.setSelectionGroup(item)
        }
      }
    },
    async setSelectionGroup(val) {
      console.log('设置精选组', val)
      const params = {}
      params['name'] = val.name
      params['plan_id'] = val.id
      params['status'] = val.status ? 1 : 0
      params['platform_mall_id'] = val.platform_mall_id
      params['country'] = val.country
      params['item_id_list'] = val.item_id_list.map(item => {
        return Number(item)
      })
      const res = await this.StoreSelection.markeHotSalePlan(params, 'putChinese')
      if (res.code === 200) {
        this.$refs.Logs.writeLog(`【${val.mallName}】下【${val.name}】${val.status ? '开启' : '关闭'}成功`, true)
        this.$set(val, 'status', val.status)
      } else {
        this.$refs.Logs.writeLog(`【${val.mallName}】下【${val.name}】${val.status ? '开启' : '关闭'}失败：${res.data}`, false)
        this.$set(val, 'status', !val.status)
      }
    },
    // 保存精选组
    async saveSelectionGroup(type) {
      try {
        if (!this.detailsData.name) return this.$message('精选组名不能为空')
        if (this.detailsData.graphqlData.length < 4 || !this.detailsData.graphqlData.length || this.detailsData.graphqlData.length > 8) return this.$message('商品数量不能小于4')
        const params = {}
        const ids = []
        this.detailsData.graphqlData.forEach(item => { ids.push(item.itemid) })
        params['item_id_list'] = ids
        params['name'] = this.detailsData.name
        params['country'] = this.detailsData.country
        params['platform_mall_id'] = this.detailsData.platform_mall_id
        const res = await this.StoreSelection.markeHotSalePlan(params, 'postChineseReferer')
        if (res.code === 200) {
          this.detailsVisible = false
          await this.queryData()
          if (type) {
            params['id'] = res.data.id
            params['status'] = true
            params['mallName'] = this.detailsData.mallName
            await this.queryIsOpen(params, 1)
          }
        } else {
          this.$message.error(`保存精选组失败：${res.data}`)
        }
      } catch (error) {
        this.$message.error(`保存精选组异常：${error}`)
      }
    },
    // 添加商品
    async productSelector() {
      try {
        if (!this.productId) return this.$message('商品ID不能为空')
        const myMap = new Map()
        const params = {}
        params['id'] = this.productId.toString()
        params['platform_mall_id'] = this.detailsData.platform_mall_id
        params['country'] = this.detailsData.country
        this.queryProductLoading = true
        const res = await this.StoreSelection.productSelector(params)
        if (res.code === 200) {
          if (!res.data.length) {
            this.queryProductLoading = false
            this.$message('商品查询数据为空')
            return
          }
          res.data.map(item => {
            item.images = item.images.split(',')
            item.country = this.detailsData.country
            item.platform_mall_id = this.detailsData.platform_mall_id
          })
          this.detailsData.graphqlData = this.detailsData.graphqlData.concat(res.data)
          this.detailsData.graphqlData = this.detailsData.graphqlData.filter((item) => !myMap.has(item.itemid) && myMap.set(item.itemid, 1))
          console.log('detailsData', this.detailsData)
          this.$forceUpdate()
        } else {
          this.$message.error(`${res.data}`)
        }
        console.log('productSelector', res)
      } catch (error) {
        this.$message.error(`添加商品异常：${error}`)
      }
      this.queryProductLoading = false
    },
    // 添加单个精选组
    singleAdd() {
      if (this.selectMallList.length > 2 || !this.selectMallList.length) return this.$message('添加单个精选组，只能选择一个店铺')
      this.detailsVisible = true
      this.detailsData.name = ''
      this.detailsData.graphqlData = []
      this.productId = []
      this.detailsData.mallName = this.selectMallList[0].mall_alias_name || this.selectMallList[0].platform_mall_name
      this.detailsData.platform_mall_id = this.selectMallList[0].platform_mall_id
      this.detailsData.country = this.selectMallList[0].country
    },
    // 编辑弹窗
    editData(row) {
      this.detailsVisible = true
      row.graphqlData.map(item => {
        item.country = row.country
        item.platform_mall_id = row.platform_mall_id
      })
      this.detailsData = row
      console.log('detailsData', this.detailsData)
    },
    // 获取数据
    async queryData() {
      if (!this.selectMallList.length) return this.$message('请选择店铺')
      this.showConsole = false
      this.isDisabled = true
      this.tableData = []
      this.$refs.Logs.writeLog(`开始查询精选组...`, true)
      await batchOperation(this.selectMallList, this.getSelectionGroup)
      this.$refs.Logs.writeLog(`查询精选组结束`, true)
      this.isDisabled = false
    },
    async getSelectionGroup(mItem, count = { count: 1 }) {
      let mallName = ''
      mallName = mItem.mall_alias_name || mItem.platform_mall_name
      try {
        // 1、查询列表数据
        const res = await this.StoreSelection.markeHotSalePlanList(mItem)
        if (res.code === 200) {
          this.$refs.Logs.writeLog(`查询店铺【${mallName}】【${res.data.length}】条数据`, true)
          if (res.data?.length > 0) {
            for (let i = 0; i < res.data.length; i++) {
              const item = res.data[i]
              item.status = item.status === 1
              item.country = mItem.country
              item.platform_mall_id = mItem.platform_mall_id
              item.mallName = mallName
              item.item_id_list = item.item_id_list.map(listItem => {
                return listItem.toString()
              })
              // 2、查询详情数据
              const graphqlRes = await this.StoreSelection.getGraphql(item)
              if (graphqlRes.code !== 200) {
                continue
              }
              item.graphqlData = graphqlRes.data
              const images = []
              item.graphqlData.map(gItem => {
                images.push(gItem.images[0])
              })
              item.images = images
            }
            const newData = this.filterData(res.data)
            this.tableData = this.tableData.concat(newData)
          }
          console.log('tableData', this.tableData)
        } else {
          this.$refs.Logs.writeLog(`店铺【${mallName}】${res.data}`, false)
        }
      } catch (error) {
        console.log(error)
        this.$refs.Logs.writeLog(`店铺【${mallName}】获取数据异常：${error}`, false)
      } finally {
        --count.count
      }
    },
    filterData(data) {
      const fData = []
      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        if (this.isStatus && !item.status) {
          continue
        }
        fData.push(item)
      }
      return fData
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
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
@import '../../../module-less/market-activity-less/store-selection.less';
</style>
