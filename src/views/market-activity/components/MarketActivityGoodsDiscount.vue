<template>
  <el-row class="contaniner">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="活动列表" name="list">
        <el-row class="header">
          <ul style="margin-bottom: 10px">
            <storeChoose @changeMallList="changeMallList" />
          </ul>
          <ul style="margin-left: 20px">
            <li>
              <span>活动状态：</span>
              <el-select v-model="discountType" :disabled="isDisabled" size="mini" filterable style="width: 100px">
                <el-option :value="'all'" label="全部" />
                <el-option v-for="(item, index) in discountTypeList" :key="index" :value="item.value" :label="item.label" />
              </el-select>
            </li>
            <li>
              <el-input v-model="keyword" :disabled="isDisabled" size="mini" style="width: 242px" oninput="value=value.replace(/\s+/g,'')" clearable>
                <el-select slot="prepend" v-model="searchType" style="width: 100px">
                  <el-option v-for="(item, index) in searchTypeList" :key="index" :label="item.label" :value="item.value" />
                </el-select>
              </el-input>
            </li>
            <li>
              <el-button type="primary" size="mini" :disabled="isDisabled" @click="queryData">搜 索</el-button>
              <el-button type="primary" size="mini" :disabled="isDisabled" @click="createNewActive">创建新的活动</el-button>
              <el-button type="primary" size="mini" :disabled="isDisabled" @click="batchStopActive">批量结束活动</el-button>
              <el-button type="primary" size="mini" :disabled="isDisabled" @click="restartActivityDia">重新启动已过期的活动</el-button>
              <el-button type="primary" size="mini" :disabled="isDisabled" @click="exportData">数据导出</el-button>
              <el-button type="primary" size="mini" @click="clearLog">清除日志</el-button>
              <el-checkbox v-model="hideEnded" style="margin-left: 20px" :disabled="isDisabled">不显示过期活动</el-checkbox>
              <el-checkbox v-model="showConsole">隐藏日志</el-checkbox>
            </li>
          </ul>
        </el-row>
        <el-row id="article">
          <u-table
            ref="plTable"
            :data="tableData"
            use-virtual
            :height="660"
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
              <template v-slot="{ row }">
                <span :style="statusNameColor[row.statusName] && 'color:' + statusNameColor[row.statusName]">
                  {{ row.statusName }}
                </span>
              </template>
            </u-table-column>
            <u-table-column sortable align="center" label="商品数量" min-width="100" prop="total_product" />
            <u-table-column align="center" label="活动时间" min-width="270">
              <template v-slot="{ row }">
                {{ `${$dayjs(row.start_time).format('MM/DD/YYYY HH:mm:ss')} - ${$dayjs(row.end_time).format('MM/DD/YYYY HH:mm:ss')}` }}
              </template>
            </u-table-column>
            <u-table-column align="center" label="操作" min-width="240">
              <template v-slot="{ row, $index }">
                <el-button type="primary" size="mini" @click="searchDiscountDetail(row)">查看详情</el-button>
                <el-button type="primary" size="mini" @click="copyAndOpen(row.platform_mall_id, row.discount_id)">复制</el-button>
                <el-button v-if="row.statusName === '进行中'" type="primary" size="mini" @click="stopActiveSingle(row, $index, 'stop')">结束</el-button>
                <el-button v-if="row.statusName === '即将开始'" type="primary" size="mini" @click="stopActiveSingle(row, $index, 'delete')">删除</el-button>
              </template>
            </u-table-column>
          </u-table>
          <!-- 选择时间弹窗 -->
          <el-dialog v-if="timeVisible" class="time-dialog" title="选择时间" :visible.sync="timeVisible" width="500px" :close-on-click-modal="false" :close-on-press-escape="false">
            <div class="content">
              <span>折扣促销时间：</span>
              <el-date-picker v-model="promotionTime" type="datetimerange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" size="mini" />
            </div>
            <div class="footer">
              <el-button size="mini" style="margin-right: 20px" @click="timeVisible = false">取 消</el-button>
              <el-button type="primary" size="mini" @click="determineRestart">确 定</el-button>
            </div>
          </el-dialog>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="活动编辑" name="edit">
        <el-row class="header edit">
          <ul v-if="!activeRow.discount_id" style="margin-bottom: 10px">
            <storeChoose @changeMallList="changeMallListEdit" />
          </ul>
          <ul style="margin: 0 0 10px 20px">
            <li>
              <span>活动名称：</span>
              <el-input v-model="activeDicountName" size="mini" clearable />
            </li>

            <li>
              <span>活动时间：</span>
              <el-date-picker
                v-model="activeDate"
                format="yyyy-MM-dd HH:mm:ss"
                size="mini"
                type="datetimerange"
                unlink-panels
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </li>
            <li>
              <span>商品编号：</span>
              <el-input v-model="activeProductId" style="width: 180px" size="mini" oninput="value=value.replace(/\s+/g,'')" clearable />
              <el-button style="margin-left: 21px" type="primary" size="mini" :disabled="btnLoading" @click="searchDetail">搜 索</el-button>
            </li>
          </ul>
          <ul style="margin: 0 0 10px 20px">
            <li style="margin-right: 19px">
              <span>活动折扣：</span>
              <el-input v-model="activeDiscount" size="mini" oninput="value=value.replace(/\s+/g,'')" clearable />%
            </li>
            <li>
              <span>限购数量：</span>
              <el-input v-model="limitNum" style="width: 180px" size="mini" oninput="value=value.replace(/\s+/g,'')" clearable />
            </li>
            <li>
              <!-- <el-button type="primary" size="mini">搜 索</el-button> -->
              <el-button type="primary" size="mini" :disabled="btnLoading" @click="batchUpdateDiscount">批量修改折扣和限购</el-button>
              <el-button v-if="activeRow.discount_id" type="primary" size="mini" :disabled="btnLoading" @click="changeDiscountInfo">修改活动信息</el-button>
              <el-button type="primary" size="mini" :disabled="btnLoading" @click="addGoods">添加商品</el-button>
              <el-button v-if="activeRow.discount_id" type="primary" size="mini" :disabled="btnLoading" @click="addActiveTo">添加商品到已有活动</el-button>
              <el-button v-if="activeRow.discount_id" type="primary" size="mini" :disabled="btnLoading" @click="searchDiscountDetail(activeRow)">获取活动已有物品</el-button>
              <el-button v-if="!activeRow.discount_id" type="primary" size="mini" :disabled="btnLoading" @click="createActive">创建活动</el-button>
              <el-checkbox v-model="showConsole" style="margin-left: 10px">隐藏日志</el-checkbox>
            </li>
          </ul>
          <ul style="margin: 0 0 0 20px">
            <span style="color: red">折扣公式为：折扣价格=商品原价*折扣%。如原价100元的商品，输入80，最后的折扣价格为80元</span>
          </ul>
        </el-row>
        <el-row id="article">
          <u-table
            ref="editPlTable"
            v-loading="loading"
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
            <u-table-column align="center" label="店铺名称" min-width="150" prop="platform_mall_name">
              <template slot-scope="scope">
                {{ scope.row.mall_alias_name || scope.row.platform_mall_name }}
              </template>
            </u-table-column>
            <u-table-column align="center" label="主图" min-width="150">
              <template slot-scope="scope">
                <el-tooltip effect="light" placement="right-end" :visible-arrow="false" :enterable="false" style="width: 32px; height: 32px; display: inline-block">
                  <div slot="content">
                    <el-image :src="[scope.row.image] | imageRender" style="width: 400px; height: 400px" />
                  </div>
                  <el-image :src="[scope.row.image, true] | imageRender" style="width: 32px; height: 32px" />
                </el-tooltip>
              </template>
            </u-table-column>
            <u-table-column align="center" label="商品名称" min-width="150" prop="name" show-overflow-tooltip />
            <u-table-column align="center" label="商品编号" min-width="150" prop="itemid" />
            <u-table-column align="center" label="商品规格" min-width="150" prop="skuName" show-overflow-tooltip />
            <u-table-column align="center" label="原价" width="120" prop="normal_price" />
            <u-table-column align="center" label="售价" width="120" prop="promotion_price" />
            <u-table-column align="center" label="折扣" width="120" prop="discount">
              <template v-slot="{row}"> <span>{{ Number(row.discount).toFixed(2) }}</span> </template>
            </u-table-column>
            <u-table-column align="center" label="购买限制" min-width="150" prop="user_item_limit" />
            <u-table-column align="center" label="操作" min-width="150">
              <template slot-scope="scope">
                <el-button v-if="scope.row.editStatus === 1" type="primary" size="mini" @click="deleteEditGoods(scope.row, scope.$index)">删 除</el-button>
                <el-button v-if="scope.row.deleteStatus" type="primary" size="mini" @click="deleteActiveGoods(scope.row, scope.$index)">删除活动商品</el-button>
              </template>
            </u-table-column>
            <!-- <u-table-column align="center" label="操作状态" min-width="150" /> -->
          </u-table>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <div class="logging">
      <Logs ref="Logs" v-model="showConsole" clear />
    </div>
    <el-dialog :visible.sync="goodsItemSelectorVisible" top="7vh" title="商品选择" :close-on-click-modal="false" :close-on-press-escape="false" width="1280px">
      <goodsItemSelector v-if="goodsItemSelectorVisible" :is-need-filter-act="true" :mall="selectMallListEdit" @changeGoodsItem="changeGoodsItem" />
    </el-dialog>
  </el-row>
</template>

<script>
import goodsItemSelector from '../../../components/goods-item-selector'
import { batchOperation, delay, terminateThread, exportExcelDataCommon, sleep } from '@/util/util'
import StoreChoose from '../../../components/store-choose'
import GoodsDiscount from '../../../module-api/market-activity-api/goods-discount'
export default {
  components: {
    StoreChoose,
    goodsItemSelector
  },
  data() {
    return {
      activeName: 'list',
      GoodsDiscount: new GoodsDiscount(this),

      showConsole: true, // 日志

      // list
      promotionTime: [], // 折扣促销时间
      timeVisible: false, // 选择时间弹窗
      hideEnded: true, // 隐藏过期活动
      limit: 100,
      isDisabled: false,
      keyword: '',
      searchType: 'promotion_name',
      discountType: 'all', // 活动状态
      selectMallList: [], // 店铺选择数据
      selectMallListEdit: [],
      tableData: [], // 表格数据
      multipleSelection: [], // 选择数据
      endedActivityData: [], // 重启已过期活动
      discountTypeList: [
        { value: 'ongoing', label: '进行中' },
        { value: 'upcoming', label: '即将开始' },
        { value: 'ended', label: '已过期' }
      ],
      searchTypeList: [
        { value: 'promotion_name', label: '活动名称' },
        { value: 'item_name', label: '商品名称' },
        { value: 'item_id', label: '商品ID' }
      ],
      statusNameColor: {
        进行中: 'green',
        即将开始: 'orangered'
      },
      // edit
      editTableData: [], // 表格数据
      editTableDataCopy: [],
      editMultipleSelection: [], // 选择数据
      activeDicountName: '', // 活动名称
      activeProductId: '', // 商品编号
      activeDate: '', // 活动时间
      activeRow: {},
      loading: false,
      activeDiscount: '', // 活动折扣
      limitNum: '', // 限购数量
      goodsItemSelectorVisible: false,
      selectGoods: [], // 选择的商品
      btnLoading: false
      // selectGoodsType:''
    }
  },
  methods: {
    // 删除活动商品
    async deleteActiveGoods(row, index) {
      console.log(row, 'deleteActiveGoods')
      const params = {
        discount_id: this.activeRow.discount_id,
        itemid: row.itemid,
        mallId: this.activeRow.platform_mall_id
      }
      const res = await this.$shopeemanService.deleteChinese(this.activeRow.country, '/api/marketing/v3/discount/nominate/', params, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const resObj = JSON.parse(res)
      if (resObj.status === 200) {
        const data = JSON.parse(resObj.data)
        if (data && data.code === 0) {
          this.$message.success('删除成功')
          this.editTableData = this.editTableData.filter((n) => {
            return n.itemid !== row.itemid
          })
        } else {
          return this.$message.warning(`删除商品失败,${data.message}`)
        }
      } else if (resObj.status === 403) {
        return this.$message.warning('删除商品失败，店铺未登录！')
      } else {
        return this.$message.warning('删除商品失败！')
      }
      console.log(resObj, 'resObj')
    },
    async deleteEditGoods(row, index) {
      this.editTableData.splice(index, 1)
      const indexC = this.editTableDataCopy.findIndex((n) => n.itemid === row.itemid)
      this.editTableDataCopy.splice(indexC, 1)
    },
    // 添加商品到已有活动
    async addActiveTo() {
      const arrFilter = this.editTableData.filter((n) => n.editStatus === 1)
      if (!arrFilter.length) {
        return this.$message.warning(`没有可添加的商品！`)
      }
      this.showConsole = false
      const discount_id = this.activeRow.discount_id
      this.loading = true
      // arrFilter.forEach(async(good) => {
      for (const good of arrFilter) {
        const skuList = await this.searchProductDetail(good.itemid, good.platform_mall_id, good.country)
        if (skuList.length) {
          const result = await this.setModelActive(skuList, good.platform_mall_id, good.country, good.itemid, discount_id, good.platform_mall_name)
          if (result) {
            const index = this.editTableData.findIndex((n) => n.itemid == good.itemid)
            const indexC = this.editTableDataCopy.findIndex((n) => n.itemid == good.itemid)
            this.$set(this.editTableData[index], 'editStatus', 2)
            this.$set(this.editTableDataCopy[indexC], 'editStatus', 2)
            console.log(this.editTableData[index], this.editTableDataCopy[indexC])
            this.$nextTick(() => {
              this.$refs.editPlTable.toggleRowSelection([
                {
                  row: this.editTableData[index],
                  selected: false
                }
              ])
            })
          }
        }
      }
      this.loading = false
    },
    // 复制
    async copyAndOpen(shopId, discountId) {
      const reqStr = {
        type: 'route',
        shopId: shopId,
        route: `https://seller.th.shopee.cn/portal/marketing/discount/create?from=${discountId}`
      }
      this.$BaseUtilService.getOrderDetailInfo(shopId, JSON.stringify(reqStr))
    },
    // 添加商品
    async addGoods() {
      this.$refs.editPlTable.clearSelection()
      if (!this.activeDiscount || !this.limitNum) {
        return this.$message.warning('请先填写活动折扣和限购数量！')
      }
      if (this.activeDiscount < 0 || this.activeDiscount > 100 || this.limitNum < 0 || this.activeDiscount % 1 !== 0) {
        return this.$message.warning('折扣信息或限购数量有误！')
      }
      if (!this.activeDicountName) {
        return this.$message.warning('活动名称不能为空')
      }
      console.log(this.activeDate, 'this.activeDate')
      if (!this.activeDate || !this.activeDate.length) {
        return this.$message.warning('请选择活动时间')
      }
      this.goodsItemSelectorVisible = true
    },
    // 创建活动
    async createActive() {
      if (!this.activeDiscount || !this.limitNum) {
        return this.$message.warning('请先填写活动折扣和限购数量！')
      }
      if (this.activeDiscount < 0 || this.activeDiscount > 100 || this.limitNum < 0 || this.activeDiscount % 1 !== 0) {
        return this.$message.warning('折扣信息或限购数量有误！')
      }
      if (!this.selectGoods.length) {
        return this.$message.warning('请先选择商品！')
      }
      if (!this.activeDate || !this.activeDate.length) {
        return this.$message.warning('请先选择活动时间！')
      }
      this.showConsole = false
      this.btnLoading = true
      this.$refs.Logs.writeLog('开始创建活动', true)
      // this.selectMallListEdit.forEach(async(mall, index) => {
      for (let index = 0; index < this.selectMallListEdit.length; index++) {
        const mall = this.selectMallListEdit[index]
        const start = Math.round(new Date(this.activeDate[0]).getTime() / 1000)
        const end = Math.round(new Date(this.activeDate[1]).getTime() / 1000)
        try {
          const params = {
            fe_status: 'upcoming',
            highlight: '',
            title: this.activeDicountName,
            start_time: start,
            end_time: end,
            status: 1,
            mallId: mall.platform_mall_id
          }
          const res = await this.GoodsDiscount.createActive(mall.country, params)
          console.log('res', res)
          if (res.code === 200) {
            this.$refs.Logs.writeLog(`店铺【${mall.mall_alias_name || mall.platform_mall_name}】,创建活动【${this.activeDicountName}】成功`, true)
            const discount_id = res.data.discount_id
            const filterArr = this.selectGoods.filter((n) => n.platform_mall_id === mall.platform_mall_id)
            // filterArr.forEach(async(good) => {
            for (const good of filterArr) {
              const skuList = await this.searchProductDetail(good.itemid, good.platform_mall_id, good.country)
              if (skuList.length) {
                const result = await this.setModelActive(skuList, mall.platform_mall_id, mall.country, good.itemid, discount_id, mall.platform_mall_name)
                if (result) {
                  const index = this.editTableData.findIndex((n) => n.itemid === good.itemid)
                  const indexC = this.editTableDataCopy.findIndex((n) => n.itemid === good.itemid)
                  this.$set(this.editTableData[index], 'editStatus', 2)
                  this.$set(this.editTableDataCopy[indexC], 'editStatus', 2)
                  this.$nextTick(() => {
                    this.$refs.editPlTable.toggleRowSelection([
                      {
                        row: this.editTableData[index],
                        selected: false
                      }
                    ])
                  })
                }
              }
            }
          } else if (res.code === 403) {
            this.$refs.Logs.writeLog(`店铺【${mall.mall_alias_name || mall.platform_mall_name}】创建活动失败,店铺未登录`, false)
          } else {
            this.$refs.Logs.writeLog(`店铺【${mall.mall_alias_name || mall.platform_mall_name}】创建活动失败,${res.data}`, false)
          }
        } catch (error) {
          this.btnLoading = false
          console.log(error, 'joiuoi')
        }
        if (index === this.selectMallListEdit.length - 1) {
          this.btnLoading = false
        }
      }
      this.$refs.Logs.writeLog('活动创建结束', true)
      // this.btnLoading = false
    },
    async setModelActive(skuList, mallId, country, goodsId, discount_id, mallName) {
      const paramsList = []
      skuList.forEach((sku) => {
        const obj = {
          discount: 100 - this.activeDiscount,
          itemid: goodsId,
          model_name: sku.name,
          modelid: sku.id,
          price_before_discount: Number(sku.price),
          promotion_price: Number(((sku.price * this.activeDiscount) / 100).toFixed(16)),
          promotionid: discount_id,
          selected: true,
          shopid: Number(mallId),
          status: 1,
          total_item_limit: 0,
          user_item_limit: this.limitNum
        }
        paramsList.push(obj)
      })
      const creatParams = {
        discount_id: discount_id,
        discount_model_list: paramsList,
        mallId: mallId
      }
      const creatRes = await this.GoodsDiscount.putModelActive(country, creatParams)
      if (creatRes.code === 200) {
        const index = this.editTableData.findIndex((n) => n.itemid == goodsId)
        this.$set(this.editTableData[index], 'discount', 1 - this.activeDiscount / 100)
        this.$set(this.editTableData[index], 'promotion_price_after_tax', Number(((this.activeDiscount / 100) * this.editTableData[index].price).toFixed(1)))
        this.$set(this.editTableData[index], 'user_item_limit', this.limitNum)
        this.$refs.Logs.writeLog(`店铺【${mallName}】,商品【${goodsId}】创建活动成功`, true)
        return true
      } else {
        if (creatRes.data.indexOf('some item has participated in promotion') > -1) {
          this.$refs.Logs.writeLog(`店铺【${mallName}】,添加商品【${goodsId}】至活动失败,商品已参加活动不能再此参加`, true)
        } else {
          this.$refs.Logs.writeLog(`店铺【${mallName}】,添加商品【${goodsId}】至活动失败,${creatRes.data ? creatRes.data : ''}`, false)
        }
        return false
      }
    },
    // 查询商品详情
    async searchProductDetail(shopGoodsId, shopMallId, country) {
      const params = {
        product_id: shopGoodsId,
        version: '3.2.0',
        shop_id: shopMallId
      }
      const res = await this.$shopeemanService.searchProductDetail(country, params)
      if (res.code === 200) {
        return res.data.model_list
      } else {
        return []
      }
    },
    // 商品选择
    changeGoodsItem(val) {
      this.selectGoods = val.goodsList
      val.goodsList.forEach((item) => {
        item.promotion_price = (item.price * (this.activeDiscount / 100)).toFixed(2)
        item.discount = (1 - this.activeDiscount / 100).toFixed(2)
        item.image = item.images.split(',')[0]
        item.editStatus = 1
        item.normal_price = item.price
      })
      this.editTableData = val.goodsList.concat(this.editTableData)
      sleep(1000)

      val.goodsList.forEach((item) => {
        this.$nextTick(() => {
          this.$refs.editPlTable.toggleRowSelection([
            {
              row: item,
              selected: true
            }
          ])
        })
        // this.$refs.editPlTable.toggleRowSelection(item, true)
      })
      console.log(this.editMultipleSelection, '3333333333')
      this.editMultipleSelection = val.goodsList
      this.editTableDataCopy = JSON.parse(JSON.stringify(this.editTableData))
      console.log('changeGoodsItem', this.editTableData, val)
      this.goodsItemSelectorVisible = false
    },
    // 批量修改折扣和限购
    async batchUpdateDiscount() {
      if (!this.activeDiscount || !this.limitNum) {
        return this.$message.warning('请先填写活动折扣和限购数量！')
      }
      if (this.activeDiscount < 0 || this.activeDiscount > 100 || this.limitNum < 0 || this.activeDiscount % 1 !== 0) {
        return this.$message.warning('折扣信息或限购数量有误！')
      }
      if (!this.editMultipleSelection.length) {
        return this.$message.warning('请先勾选数据！')
      }
      this.$message.success('正在修改信息....')
      // this.editMultipleSelection.forEach((item) => {
      for (const item of this.editMultipleSelection) {
        this.$delete(item, 'discount')
        this.$set(item, 'discount', (1 - this.activeDiscount / 100).toFixed(2))
        this.$delete(item, 'promotion_price')
        this.$set(item, 'promotion_price', Number(((this.activeDiscount / 100) * item.normal_price).toFixed(1)))
        this.$delete(item, 'user_item_limit')
        this.$set(item, 'user_item_limit', this.limitNum)
        const index = this.editTableData.findIndex((n) => n.modelid === item.modelid)
        const indexC = this.editTableDataCopy.findIndex((n) => n.modelid === item.modelid)
        if (index > -1) {
          // this.$set(this.editTableData[index], 'discount', (1 - this.activeDiscount / 100).toFixed(2))
          // this.$set(this.editTableData[index], 'promotion_price', Number(((this.activeDiscount / 100) * item.normal_price).toFixed(1)))
          // this.$set(this.editTableData[index], 'user_item_limit', this.limitNum)
        }
        if (indexC > -1) {
          this.editTableDataCopy[indexC].discount = (1 - this.activeDiscount / 100).toFixed(2)
          this.editTableDataCopy[indexC].promotion_price = Number(((this.activeDiscount / 100) * item.normal_price).toFixed(1))
          this.editTableDataCopy[indexC].user_item_limit = this.limitNum
        }
      }
      this.$message.success('修改完成')
    },
    async updateDiscount() {
      if (!this.editMultipleSelection.length) {
        this.$refs.Logs.writeLog(`没有要修改的折扣信息`, true)
        return
      }
      const objArr = []
      this.editMultipleSelection.forEach((item) => {
        const obj = {
          itemid: item.itemid,
          modelid: item.modelid,
          promotion_price: Number(((this.activeDiscount / 100) * item.normal_price).toFixed(1)),
          user_item_limit: Number(this.limitNum),
          status: item.status
        }
        objArr.push(obj)
      })
      const params = {
        discount_id: this.activeRow.discount_id,
        discount_model_list: objArr,
        mallId: this.activeRow.platform_mall_id
      }
      this.showConsole = false
      const res = await this.GoodsDiscount.putModelActive(this.activeRow.country, params)
      if (res.code === 200) {
        this.$refs.Logs.writeLog(`修改折扣信息成功`, true)
        this.$refs.editPlTable.clearSelection()
      } else {
        this.$refs.Logs.writeLog(`修改折扣信息失败：${res.data}`, false)
      }
    },
    // 修改活动信息 只修改名称和日期和折扣
    async changeDiscountInfo() {
      console.log(this.activeDate)
      const start = new Date(this.activeDate[0]).getTime()
      const end = new Date(this.activeDate[1]).getTime()
      if (start < this.activeRow.start_time || start > this.activeRow.end_time) {
        this.$alert(`开始时间要晚于${this.$dayjs(this.activeRow.start_time).format('YYYY-MM-DD HH:mm:ss')}，早于${this.$dayjs(this.activeRow.end_time).format('YYYY-MM-DD HH:mm:ss')}`, '提示', {
          confirmButtonText: '确定'
        })
      }
      if (end < this.activeRow.start_time || end > this.activeRow.end_time) {
        this.$alert(`结束时间要早于${this.$dayjs(this.activeRow.start_time).format('YYYY-MM-DD HH:mm:ss')}`, '提示', {
          confirmButtonText: '确定'
        })
      }
      if ((end - start) / 1000 / 60 / 60 < 1) {
        this.$alert(`活动时间不得小于1小时`, '提示', {
          confirmButtonText: '确定'
        })
      }
      const params = {
        status: this.activeRow.status,
        title: this.activeDicountName,
        start_time: Math.round(start / 1000),
        discount_id: this.activeRow.discount_id,
        source: this.activeRow.source,
        end_time: Math.round(end / 1000),
        mallId: this.activeRow.platform_mall_id
      }
      const res = await this.GoodsDiscount.putActive(this.activeRow.country, params)
      if (res.code === 200) {
        this.$refs.Logs.writeLog(`修改活动信息成功`, true)
      } else {
        this.$refs.Logs.writeLog(`修改活动信息失败：${res.data}`, false)
      }
      this.updateDiscount()
    },
    createNewActive() {
      const startTime = new Date().getTime() + 1000 * 60 * 10
      const endTime = startTime + 2 * 60 * 60 * 1000
      this.activeName = 'edit'
      this.activeRow = {}
      this.editTableData = []
      this.editTableDataCopy = []
      this.activeDicountName = ''
      this.selectGoods = []
      this.activeDate = [this.$dayjs(startTime).format('YYYY-MM-DD HH:mm:ss'), this.$dayjs(endTime).format('YYYY-MM-DD HH:mm:ss')]
    },
    // 根据商品编号搜索
    searchDetail() {
      if (this.activeProductId) {
        this.editTableData = this.editTableDataCopy.filter((n) => {
          return n.itemid == this.activeProductId
        })
      } else {
        this.editTableData = this.editTableDataCopy
      }
    },
    // 查看活动详情
    async searchDiscountDetail(row) {
      this.activeName = 'edit'
      this.activeRow = row
      this.activeDicountName = row.title
      this.activeDate = [this.$dayjs(row.start_time).format('YYYY-MM-DD HH:mm:ss'), this.$dayjs(row.end_time).format('YYYY-MM-DD HH:mm:ss')]
      this.activeDiscount = ''
      this.limitNum = ''
      this.editTableData = []
      this.selectMallListEdit = [
        {
          country: row.country,
          platform_mall_name: row.platform_mall_name,
          platform_mall_id: row.platform_mall_id,
          id: row.mallId,
          mall_alias_name: row.mall_alias_name,
          group_id: 0,
          group_name: '',
          mall_type: 1
        }
      ]
      this.btnLoading = true
      await this.getDiscountDetail(row)
      this.btnLoading = false
    },
    // 查询折扣详情
    async getDiscountDetail(val) {
      console.log(val, 'val')
      this.loading = true
      try {
        const limit = 100
        const params = {
          limit: limit,
          offset: 0,
          discount_id: val.discount_id,
          platform_mall_id: val.platform_mall_id,
          country: val.country
        }
        const res = await this.GoodsDiscount.getDiscountNominate({ item: params })
        let array = (res.code === 200 && res.data.item_info) || []
        let model_info = res.data.model_info || {}
        let discount_item_list = res.data.discount_item_list || []
        let price_stock_info = res.data.price_stock_info || []
        while (array.length) {
          // console.log('array', JSON.stringify(array), res)
          array.forEach((item) => {
            if (model_info[item.itemid] && model_info[item.itemid].length) {
              model_info[item.itemid].forEach((subItem) => {
                const itemC = JSON.parse(JSON.stringify(item))
                const objDiscount = discount_item_list.find((n) => n.itemid === item.itemid && n.modelid === subItem.modelid)
                const obj = price_stock_info.find((n) => n.item_id === item.itemid)
                const discountPriceInfo = obj.sku_stock_price_list.find((n) => n.model_id === subItem.modelid)
                const obj2 = Object.assign(itemC, subItem, objDiscount, discountPriceInfo.price_info)
                obj2.price = subItem.price
                obj2.name = item.name
                obj2.skuName = subItem.name
                obj2.image = item.images.split(',')[0]
                obj2.platform_mall_name = val.mallName
                obj2.country = val.country
                obj2.platform_mall_id = val.platform_mall_id
                obj2.promotion_price = objDiscount ? objDiscount.promotion_price : 0
                obj2.discount = discountPriceInfo && discountPriceInfo.price_info ? (1 - obj2.promotion_price / obj2.normal_price).toFixed(2) : ''
                const index = this.editTableData.findIndex((n) => n.deleteStatus && obj2.itemid === n.itemid)
                if (index < 0) {
                  obj2.deleteStatus = true
                }
                this.editTableData.push(obj2)
              })
            } else {
              // let obj = res.data.discount_item_list.find((n) => n.itemid === item.itemid)
              // let itemC = JSON.parse(JSON.stringify(item))
              // let obj2 = Object.assign(itemC, obj, val)
              // // console.log(item,item.image,"222")
              // obj2.image = item.images.length ? item.images[0] : item.images.split(',')[0]
              // obj2.platform_mall_name = val.mallName
              // obj2.country = val.country
              // obj2.platform_mall_id = val.platform_mall_id
              // obj2.discount = obj2.promotion_price_after_tax && obj2.price ? (obj2.promotion_price_after_tax / obj2.price).toFixed(2) :''
              // this.editTableData.push(obj2)
            }
          })
          if (array.length < 100) {
            array = []
          } else {
            params.offset += limit
            const res = await this.GoodsDiscount.getDiscountNominate({ item: params })
            array = (res.code === 200 && res.data.item_info) || []
            model_info = (res.code === 200 && res.data.model_info) || {}
            discount_item_list = (res.code === 200 && res.data.discount_item_list) || []
            price_stock_info = (res.code === 200 && res.data.price_stock_info) || []
          }
        }
        this.editTableDataCopy = JSON.parse(JSON.stringify(this.editTableData))
        // console.log('editTableData', this.editTableData, this.editTableDataCopy)
        this.$refs.Logs.writeLog(`获取详情结束,${this.editTableData.length}条`, true)
        this.loading = false
      } catch (error) {
        console.log(error)
        this.loading = false
      }
    },
    // 批量停止活动
    async batchStopActive() {
      if (!this.multipleSelection.length) {
        return this.$message.warning('请先选择数据！')
      }
      this.showConsole = false
      this.$refs.Logs.consoleMsg = ''
      this.$refs.Logs.writeLog(`请在执行操作，请稍等`, true)
      this.multipleSelection.forEach(async(item) => {
        if (new Date().getTime() - item.start_time < 1000 * 60 * 60 * 1) {
          this.$refs.Logs.writeLog(`活动【${item.title}-${item.discount_id}】结束活动失败：折扣活动开始一小时后才能结束！`, false)
        } else {
          const res = await this.GoodsDiscount.stopActive(item, 'stop')
          if (res.code === 200) {
            const index = this.tableData.findIndex((n) => n.discount_id == item.discount_id)
            this.$set(this.tableData[index], 'statusName', '已过期')
            this.$refs.Logs.writeLog(`活动【${item.title}-${item.discount_id}】结束活动成功`, true)
          } else {
            this.$refs.Logs.writeLog(`活动【${item.title}-${item.discount_id}】结束活动失败：${res.data}`, false)
          }
        }
      })
    },
    async stopActiveSingle(row, index, actionType) {
      if (actionType === 'stop') {
        if (new Date().getTime() - row.start_time < 1000 * 60 * 60 * 1) {
          return this.$message.warning(`折扣活动开始一小时后才能结束！`)
        }
      }
      console.log(row, 'row')
      this.showConsole = false
      this.$refs.Logs.writeLog(`请在执行操作，请稍等`, true)
      const res = await this.GoodsDiscount.stopActive(row, actionType)
      if (res.code === 200) {
        if (actionType === 'delete') {
          this.tableData.splice(index, 1)
        } else {
          this.$set(this.tableData[index], 'statusName', '已过期')
        }
        this.$refs.Logs.writeLog(`活动【${row.title}-${row.discount_id}】【${actionType === 'delete' ? '删除' : '结束'}】活动成功`, true)
      } else {
        this.$refs.Logs.writeLog(`活动【${row.title}-${row.discount_id}】【${actionType === 'delete' ? '删除' : '结束'}】活动失败：${res.data}`, false)
      }
    },
    // 导出数据
    exportData() {
      if (!this.multipleSelection.length) {
        return this.$message.warning('请选择要导出的数据！')
      }
      let num = 1
      let str = `<tr>
            <td>编号</td>
            <td>店铺</td>
            <td>活动ID</td>
            <td>活动名称</td>
            <td>活动状态</td>
            <td>商品数量</td>
            <td>活动时间</td>
            </tr>`
      this.multipleSelection.forEach((item) => {
        str += `<tr><td>${num++}</td>
        <td>${item.mallName ? `${item.country}-${item.mallName}` : '' + '\t'}</td>
        <td>${item.discount_id ? item.discount_id : '' + '\t'}</td>
        <td>${item.title ? item.title : '' + '\t'}</td>
        <td>${item.statusName ? item.statusName : '' + '\t'}</td>
        <td>${item.total_product ? item.total_product : '' + '\t'}</td>
        <td>${item.start_time && item.end_time ? `${this.$dayjs(item.start_time).format('MM/DD/YYYY HH:mm:ss')} - ${this.$dayjs(item.end_time).format('MM/DD/YYYY HH:mm:ss')}` : '' + '\t'}</td>
        </tr>
        `
      })
      exportExcelDataCommon('商品折扣活动数据', str)
    },
    // 清空日志
    clearLog() {
      this.$refs.Logs.consoleMsg = ''
    },
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
      this.promotionTime = [new Date().getTime() + 30 * 60 * 1000, new Date().getTime() + 90 * 60 * 1000]
    },
    // 确定重启
    async determineRestart() {
      if (!this.promotionTime?.length) return this.$message.warning('请选择折扣促销时间')
      this.timeVisible = false
      this.isDisabled = true
      this.$refs.Logs.writeLog(`开始重启已过期的活动，请耐心等待！`, true)
      this.endedActivityData.forEach((item) => {
        item.offset = 0
        item.mList = []
      })
      this.showConsole = false
      await batchOperation(this.endedActivityData, this.restartActivity)
      // this.queryData()
      this.isDisabled = false
    },
    // 重新启动已过期的活动
    async restartActivity(item, count = { count: 1 }) {
      const start_time = Math.round(new Date(this.promotionTime[0]).getTime() / 1000)
      const end_time = Math.round(new Date(this.promotionTime[1]).getTime() / 1000)
      let discount_id = null
      try {
        // 1、查询折扣活动详情
        const paramsA = {}
        paramsA['item'] = item
        const nominateRes = await this.GoodsDiscount.getDiscountNominate(paramsA)
        if (nominateRes.code !== 200) {
          return this.$refs.Logs.writeLog(`获取【${item.title}】【${item.discount_id}】错误：${nominateRes.data}`, false)
        }
        let Item_info = nominateRes.data.item_info
        let discount_item_list = nominateRes.data.discount_item_list
        let model_info = nominateRes.data.model_info
        let discount_item_list_array = []
        let Item_info_array = []
        let model_info_obj = {}
        console.log('nominateRe---------------', nominateRes)
        while (Item_info.length) {
          Item_info_array = Item_info_array.concat(Item_info)
          discount_item_list_array = discount_item_list_array.concat(discount_item_list)
          model_info_obj = Object.assign(model_info_obj, model_info)
          if (Item_info.length < 100) {
            Item_info = []
          } else {
            paramsA.item.offset += 100
            const resMore = await this.GoodsDiscount.getDiscountNominate(paramsA)
            Item_info = resMore.code === 200 ? resMore.data.item_info : []
            discount_item_list = resMore.code === 200 ? resMore.data.discount_item_list : []
            model_info = resMore.code === 200 ? resMore.data.model_info : {}
          }
        }
        this.$refs.Logs.writeLog(`获取【${item.title}】【${item.discount_id}】详情结束，共${Item_info_array.length}件商品`, true)
        // 过滤活动商品
        const itemFilter = Item_info_array.filter((n) => n.status === 1)
        const itemIds = []
        itemFilter.forEach((item) => {
          itemIds.push(item.itemid)
        })
        const params = {
          end_time: end_time,
          item_id_list: itemIds,
          start_time: start_time,
          mallId: item.platform_mall_id
        }
        const res = await this.$shopeemanService.overlapDiscount(item.country, params)
        if (res.code === 200) {
          console.log(res, 'res--overlap')
          if (res.data.fail_main_items.length) {
            const masItem = []
            res.data.fail_main_items.forEach((item) => {
              masItem.push(item.item_id)
            })
            this.$refs.Logs.writeLog(`活动【${item.title}】,商品【${masItem.join(',')}】已经参加了活动，不能再重复参加`, true)
          }
          if (res.data.succ_main_items.length) {
            const createParams = {
              discount_id: null,
              end_time: end_time,
              start_time: start_time,
              source: 0,
              status: 1,
              title: item.title,
              mallId: item.platform_mall_id
            }
            const resC = await this.GoodsDiscount.createActive(item.country, createParams)
            console.log('resC', resC)
            if (resC.code === 200) {
              discount_id = resC.data.discount_id
              this.$refs.Logs.writeLog(`店铺【${item.mallName}】,创建活动【${item.title}】成功，开始添加活动商品`, true)
            } else {
              return this.$refs.Logs.writeLog(`店铺【${item.mallName}】,创建活动【${item.title}】失败,${resC.data}`, true)
            }
            const modelList = []
            res.data.succ_main_items.forEach((mainItem) => {
              const skuList = model_info_obj[mainItem.item_id]
              for (let i = 0; i < skuList.length; i++) {
                const sku = skuList[i]
                const discountInfo = discount_item_list_array.find((n) => n.itemid === mainItem.item_id && n.modelid === sku.modelid)
                if (!discountInfo) {
                  continue
                }
                const obj = {
                  is_stock_insufficient: false,
                  status: 1,
                  itemid: mainItem.item_id.toString(),
                  user_item_limit: discountInfo ? discountInfo.user_item_limit : 0,
                  promotion_price: discountInfo ? discountInfo.promotion_price.toString() : '0',
                  promotion_price_after_tax: discountInfo ? discountInfo.promotion_price_after_tax.toString() : '0',
                  promotion_stock: discountInfo ? discountInfo.promotion_stock.toString() : '0',
                  modelid: sku.modelid.toString()
                }
                modelList.push(obj)
              }
            })
            const putModelParams = {
              discount_id: discount_id,
              discount_model_list: modelList,
              mallId: item.platform_mall_id
            }
            const putModelRes = await this.GoodsDiscount.putModelActive(item.country, putModelParams)
            if (putModelRes.code === 200) {
              this.$refs.Logs.writeLog(`活动【${item.title}】,重启成功，添加商品成功`, true)
            } else {
              this.$refs.Logs.writeLog(`活动【${item.title}】重启失败,重启添加商品失败${putModelRes.data}`, true)
            }
            console.log('putModelRes', putModelRes)
          } else {
            this.$refs.Logs.writeLog(`活动【${item.title}】重启失败,无可重启商品`, true)
          }
        } else {
          const createParams = {
            discount_id: null,
            end_time: end_time,
            start_time: start_time,
            source: 0,
            status: 1,
            title: item.title,
            mallId: item.platform_mall_id
          }
          const resC = await this.GoodsDiscount.createActive(item.country, createParams)
          console.log('resC', resC)
          if (resC.code === 200) {
            discount_id = resC.data.discount_id
            this.$refs.Logs.writeLog(`店铺【${item.mallName}】,创建活动【${item.title}】成功，开始添加活动商品`, true)
          } else {
            return this.$refs.Logs.writeLog(`店铺【${item.mallName}】,创建活动【${item.title}】失败,${resC.data}`, true)
          }
          const modelList = []
          Item_info_array.forEach((mainItem) => {
            const skuList = model_info_obj[mainItem.itemid]
            for (let i = 0; i < skuList.length; i++) {
              const sku = skuList[i]
              const discountInfo = discount_item_list_array.find((n) => n.itemid === mainItem.itemid && n.modelid === sku.modelid)
              console.log(discountInfo, 'discountInfo')
              if (!discountInfo) {
                continue
              }
              const obj = {
                is_stock_insufficient: false,
                status: 1,
                itemid: mainItem.itemid.toString(),
                user_item_limit: discountInfo ? discountInfo.user_item_limit : 0,
                promotion_price: discountInfo ? discountInfo.promotion_price.toString() : '0',
                promotion_price_after_tax: discountInfo ? discountInfo.promotion_price_after_tax.toString() : '0',
                promotion_stock: discountInfo ? discountInfo.promotion_stock.toString() : '0',
                modelid: sku.modelid.toString()
              }
              modelList.push(obj)
            }
          })
          const putModelParams = {
            discount_id: discount_id,
            discount_model_list: modelList,
            mallId: item.platform_mall_id
          }
          const putModelRes = await this.GoodsDiscount.putModelActive(item.country, putModelParams)
          if (putModelRes.code === 200) {
            this.$refs.Logs.writeLog(`活动【${item.title}】,重启成功，添加商品成功`, true)
          } else {
            this.$refs.Logs.writeLog(`活动【${item.title}】,重启添加商品失败${putModelRes.data}`, true)
          }
          console.log('putModelRes', putModelRes)
        }
      } catch (error) {
        // this.$refs.Logs.writeLog(`活动【${item.title}】,重启出现错误${error}`, false)
        console.log(error, 'error')
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
      this.$refs.Logs.consoleMsg = ''
      this.$refs.Logs.writeLog(`开始查询`, true)
      this.selectMallList.forEach((item) => {
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
          idRes.data.hits.forEach((item) => {
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
              ;(item.mall_alias_name = mItem.mall_alias_name), (item.platform_mall_name = mItem.platform_mall_name)
              item.mallId = mItem.id
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
            // const newData = this.filterData(res.data.discount_list)
            let newData = res.data.discount_list
            if (this.hideEnded) {
              newData = res.data.discount_list.filter((n) => n.statusName !== '已过期')
            }
            this.tableData = this.tableData.concat(newData)
          } else {
            this.$refs.Logs.writeLog(`店铺【${mallName}】：${res.data}`, false)
          }
          mItem.offset += this.limit
        } while (mItem.mList.length < total_count && total_count !== 0)
        this.$refs.Logs.writeLog(`查询店铺【${mallName}】活动数据结束`, true)
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
      if (this.activeName === 'edit') {
        const startTime = new Date().getTime() + 1000 * 60 * 10
        const endTime = startTime + 2 * 60 * 60 * 1000
        this.activeDate = [this.$dayjs(startTime).format('YYYY-MM-DD HH:mm:ss'), this.$dayjs(endTime).format('YYYY-MM-DD HH:mm:ss')]
      }
    },
    handleSelectionChange1(val) {
      this.multipleSelection = val
    },
    handleSelectionChange2(val) {
      this.editMultipleSelection = val
    },
    changeMallListEdit(val) {
      this.selectMallListEdit = val
      this.country = val.country
    },
    changeMallList(val) {
      this.selectMallList = val
      this.country = val.country
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../module-less/market-activity-less/goods-discount.less';
</style>
