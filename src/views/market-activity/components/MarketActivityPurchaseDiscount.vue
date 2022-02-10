<template>
  <div class="detail">
    <div class="condetion" style="background-color: white;padding:8px">
      <div class="row1">
        <storeChoose style="margin-left:-20px" :show-mall-all="true" @changeMallList="changeMallList" />
        <div style="margin-left:20px">
          <label>状态：</label>
          <el-select v-model="activeType" placeholder="请选择" size="mini" style="width:120px">
            <el-option label="全部" value="0" />
            <el-option label="进行中" value="1" />
            <el-option label="接下来有活动" value="2" />
            <el-option label="活动已过期" value="3" />
          </el-select>
        </div>
        <el-button size="mini" type="primary" style="margin-left:20px" @click="getTableList">搜索</el-button>
        <el-button size="mini" type="primary" style="margin-left:20px" @click="stopSearch">停止搜索</el-button>
      </div>

      <div class="row2" style="margin-top:8px">
        <!-- <el-button size="mini" type="primary" @click="stopSearch">取消查询</el-button> -->
        <el-button size="mini" type="primary" @click="createTestVisile">创建加购促销活动</el-button>
        <el-button size="mini" type="primary" @click="MallvoucherDelMul">批量删除/结束活动</el-button>
        <el-button size="mini" type="primary" @click="clearLog">清除日志</el-button>
        <el-checkbox v-model="showlog" style="margin-left:8px">隐藏日志</el-checkbox>
        <el-checkbox v-model="isShowPast" style="margin-left:-10px">不显示过期活动</el-checkbox>
      </div>
    </div>
    <Logs ref="Logs" v-model="showlog" clear />
    <div class="tableDetail" style="margin-top: 8px;">
      <u-table
        ref="multipleTable"
        v-loading="tableLoading"
        :data="tableList"
        height="800px"
        use-virtual
        :border="false"
        :header-cell-style="{ background: '#f7fafa' }"
        @selection-change="handleSelectionChange"
      >
        <u-table-column type="selection" width="55" fixed />
        <u-table-column type="index" fixed label="序号" min-width="50px" />
        <!-- <u-table-column prop="" label="站点" align="center" min-width="50px" fixed>
          <template v-slot="{row}">{{ row.country | chineseSite }}</template>
        </u-table-column> -->
        <u-table-column prop="mallName" label="店铺" align="center" min-width="150px" />
        <u-table-column prop="add_on_deal_name" label="活动名称" align="center" min-width="150px" />
        <u-table-column prop="sub_type" label="活动类型" align="center" min-width="100px">
          <template v-slot="{row}">{{ Number(row.sub_type)===1?'消费满赠':'加购折扣' }}</template>
        </u-table-column>
        <u-table-column prop="voucher_status" label="活动状态" align="center" min-width="100px">
          <template v-slot="{row}">
            <span v-if="row.voucher_status==='进行中'" style="color:#0ad10a">{{ row.voucher_status }}</span>
            <span v-if="row.voucher_status==='即将开始'" style="color:orange">{{ row.voucher_status }}</span>
            <span v-if="row.voucher_status==='已过期'">{{ row.voucher_status }}</span>
          </template>
        </u-table-column>
        <u-table-column prop="" label="促销期间" align="center" min-width="200px">
          <template v-slot="{row}">
            <div style="display:flex;flex-flow: column;">
              <span>{{ row.formStartime }}-{{ row.formEndtime }}</span>
            </div>
          </template>
        </u-table-column>
        <u-table-column prop="min_spend" label="操作" align="center" min-width="180px">
          <template v-slot="{row}">
            <div style="display:flex">
              <el-button v-if="row.voucher_status==='进行中'" size="mini" type="primary" @click="MallvoucherStopFun(row)">停止</el-button>
              <el-button v-if="row.voucher_status==='即将开始'" size="mini" type="primary" @click="MallvoucherDelFun(row)">删除</el-button>
              <el-button v-if="row.voucher_status==='进行中'|| row.voucher_status==='即将开始'" size="mini" type="primary" @click="editGoods(row)">编辑商品</el-button>
              <el-button size="mini" type="primary" @click="copyActive(row)">复制活动</el-button>
            </div>
          </template>
        </u-table-column>
      </u-table>
    </div>
    <!-- 加购优惠 -->
    <el-dialog
      class="edit-group-dialog"
      :visible.sync="proVisible"
      width="1280px"
      height="600px"
      top="5vh"
      title="加购优惠"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :close="getTableList"
    >
      <ul>
        <!-- 基本资料 -->
        <li>
          <div style="margin-left: 10px;margin-bottom: 5px;">基本资料</div>
          <ul style="border: 1px solid #d4d1d1;padding: 10px;border-radius: 8px;">
            <!-- row1 -->
            <li style="display: flex;margin-bottom:10px">
              <div>
                操作店铺
                <el-select v-model="optionMall" placeholder="请选择" size="mini" style="width:120px">
                  <el-option label="全部" value="" />
                  <el-option v-for="mall in selectMallList" :key="mall.id" :disabled="disSelect" :label="mall.mall_alias_name || mall.platform_mall_name" :value="mall.platform_mall_id" />
                </el-select>
              </div>

              <div style="margin-left:50px">
                <!-- 保存之后就不可选了 -->
                <el-radio-group v-model="discountType">
                  <el-radio :disabled="unchangeRadio" label="0">折扣优惠</el-radio>
                  <el-radio :disabled="unchangeRadio" label="1">赠品满最低消费</el-radio>
                </el-radio-group>
                <span v-if="discountType==='0'" style="margin-left: 16px;">
                  加购限制
                  <!-- 必须在1-100 -->
                  <el-tooltip class="item" effect="dark" content="买家在同一个订单里最多加购的商品数量是(1-100)" placement="top-start">
                    <el-input v-model="addLimit" size="mini" style="width:100px" onkeyup="value=value.replace(/[^\d]/g,0)" />
                  </el-tooltip>
                </span>
                <span v-if="discountType==='1'" style="margin-left: 16px;">
                  赠品规则 消费<el-input v-model="costNum" size="mini" style="width:100px" onkeyup="value=value.replace(/[^\d]/g,0)" />
                  以获得
                  <el-tooltip class="item" effect="dark" content="赠品的数量应在(1-50)内" placement="top-start">
                    <el-input v-model="sendNum" size="mini" style="width:100px" onkeyup="value=value.replace(/[^\d]/g,0)" />
                  </el-tooltip>
                  个赠品
                </span>
              </div>
            </li>
            <!-- row2 -->
            <li style="display: flex;">
              <div>
                促销名称 <el-input v-model="proName" size="mini" style="width:120px" maxlength="24" />
              </div>
              <div style="margin-left:50px">
                活动时间
                <el-tooltip class="item" effect="dark" content="开始时间必须比当前时间晚一个小时;结束时间必须比开始时间晚一个小时" placement="top-start">
                  <el-date-picker
                    v-model="proTime"
                    style="width:330px;"
                    size="mini"
                    value-format="timestamp"
                    type="datetimerange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                  />
                </el-tooltip>
              </div>
              <!-- 请求保存活动接口 -->
              <el-button size="mini" type="primary" style="margin-left:10px" @click="saveActiveInfo">保存活动</el-button>
              <el-button size="mini" type="primary" @click="clearLog">清除日志</el-button>
              <el-checkbox v-model="showlog" style="margin-left:8px;margin-top:5px">隐藏日志</el-checkbox>
            </li>
          </ul>
        </li>
        <!-- 主要商品  加购商品 -->
        <li style="display:flex;margin-top:10px">
          <!-- 主要商品-->
          <div class="masterGoods">
            <div style="margin-left: 10px;margin-bottom: 5px;">主要商品</div>
            <ul style="border: 1px solid #d4d1d1;padding: 10px;border-radius: 8px;">
              <!-- row1 -->
              <li style="margin-bottom:5px">
                <el-button size="mini" type="primary" @click="openShowMul(1)">开启</el-button>
                <el-button size="mini" type="primary" @click="openShowMul(2)">关闭</el-button>
                <el-button size="mini" type="primary" @click="delMasterMulFun">删除</el-button>
                <!-- 先保存活动信息 -->
                <el-button size="mini" type="primary" style="margin-left: 65px" @click="addMasterGoods">添加主要商品</el-button>
              </li>
              <!-- row2 -->
              <li>
                <el-table
                  :data="masterGoodslist"
                  :header-cell-style="{ background: '#f7fafa' }"
                  style="width: 400px"
                  height="400px"
                  @selection-change="MasterSelectionChange"
                >
                  <el-table-column align="center" type="selection" width="50" fixed />
                  <!-- <el-table-column align="center" type="index" label="序号" width="50" /> -->
                  <el-table-column prop="mallName" label="店铺" align="center" min-width="120px" />
                  <el-table-column prop="item_id" label="商品" align="center" min-width="100px" />
                  <el-table-column prop="statusShow" label="状态" align="center" min-width="50px">
                    <template slot-scope="scope">
                      <div><el-switch v-model="scope.row.statusShow" active-color="#13ce66" @change="changeShow(scope.row,scope.$index,'master')" /></div>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" align="center" min-width="80px" fixed="right">
                    <template slot-scope="scope"><span><el-button size="mini" type="primary" @click="delMasterFun(scope.row,scope.$index,'master')">删除</el-button></span></template>
                  </el-table-column>
                </el-table>
              </li>
            </ul>
          </div>
          <!-- 加购商品 -->
          <div class="addGoods" style="margin-left:10px">
            <div style="margin-left: 10px;margin-bottom: 5px;">加购商品</div>
            <ul style="border: 1px solid #d4d1d1;padding: 10px;border-radius: 8px;">
              <li style="display:flex;margin-bottom:5px">
                <div>折扣：<el-input v-model="addGoodsDiscount" size="mini" style="width:50px" maxlength="2" onkeyup="value=value.replace(/[^\d]/g,0)" />%</div>
                <el-button size="mini" type="primary" style="margin-left:10px" @click="changePriceMul">批量更新</el-button>
                <el-button size="mini" type="primary" @click="otherGoodsOpenMul(1)">开启</el-button>
                <el-button size="mini" type="primary" @click="otherGoodsOpenMul(2)">关闭</el-button>
                <el-button size="mini" type="primary" @click="otherGoodsDelMul">删除</el-button>
                <!-- 先保存主要商品信息 -->
                <el-button size="mini" type="primary" style="margin-left: 200px" @click="addOtherGoodsFun">添加加购商品</el-button>
              </li>
              <li>
                <el-table
                  :data="addGoodsList"
                  :header-cell-style="{ background: '#f7fafa' }"
                  height="400px"
                  @selection-change="otherSelectionChange"
                >
                  <el-table-column align="center" type="selection" width="50" fixed />
                  <el-table-column prop="mallName" label="店铺" align="center" min-width="120px" fixed />
                  <el-table-column prop="itemid" label="商品" align="center" min-width="100px" />
                  <el-table-column prop="price" label="原价" align="center" min-width="100px" />
                  <el-table-column v-if="othertableType==='0'" label="折扣" align="center" min-width="100px">
                    <template slot-scope="scope">
                      <!-- <div> -->
                      <el-input v-model="scope.row.discount" size="mini" style="width:62px" maxlength="2" onkeyup="value=value.replace(/[^\d]/g,0)" @blur="changePrice(scope.row)" />%
                      <!-- </div> -->
                    </template>
                  </el-table-column>
                  <el-table-column prop="addPrice" label="加购价格" align="center" min-width="100px">
                    <template v-slot="{row}">{{ (Number(row.price)*(100-Number(row.discount))*0.01) }}</template>
                  </el-table-column>
                  <el-table-column v-if="othertableType==='0'" prop="addStatus" label="加购显示" align="center" min-width="50px">
                    <template slot-scope="scope">
                      <div><el-switch v-model="scope.row.addStatus" active-color="#13ce66" @change="buyShow(scope.row,scope.$index)" /></div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="showStatus" label="状态" align="center" min-width="50px">
                    <template slot-scope="scope">
                      <div><el-switch v-model="scope.row.showStatus" active-color="#13ce66" @change="otherGoodsOpen(scope.row,scope.row.showStatus?1:2)" /></div>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" align="center" min-width="100px" fixed="right">
                    <template v-slot="{row}"><span><el-button size="mini" type="primary" @click="otherGoodsDel(row)">删除</el-button></span></template>
                  </el-table-column>
                </el-table>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </el-dialog>
    <div class="on_new_dialog">
      <el-dialog
        :visible.sync="goodsItemSelectorVisible"
        top="7vh"
        title="商品选择"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        width="1280px"
      >
        <goodsItemSelector v-if="goodsItemSelectorVisible" :is-need-filter-act="true" :mall="selectMallList" @changeGoodsItem="changeGoodsItem" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import storeChoose from '../../../components/store-choose'
import MarketManagerAPI from '../../../module-api/market-manager-api/market-data'
import GoodsManagerAPI from '../../../module-api/goods-manager-api/goods-data'
import { GoodsMallgetValue, getMalls, batchOperation, terminateThread } from '../../../util/util'
import goodsItemSelector from '../../../components/goods-item-selector'
import { forEach } from 'jszip'
import { flatten } from 'cheerio/lib/options'
import { number } from 'echarts/lib/export'
export default {
  components: {
    storeChoose, goodsItemSelector
  },
  data() {
    return {
      copyData: '', // 复制当前行的数据
      isCopy: false, // 触发复制按钮
      unchangeRadio: false, // 折扣优惠不能选
      GoodsManagerAPIInstance: new GoodsManagerAPI(this),
      currentDate: false, // 编辑时当前选择的商品
      disSelect: false, // 基本资料选择框
      // masterGoodsAdd: false, // ture masterGoodslist增加数据 false:单个修改数据[开启 关闭 删除]
      othertableType: '0', // 添加加购商品列表类型
      masterGoods: false, // 添加主要商品
      otherGoods: false, // 添加加购商品
      goodsItemSelectorVisible: false,
      // 搜索条件筛选
      arrList: [],
      willList: [],
      doingList: [],
      pastList: [],
      // 弹窗
      addGoodsDiscount: '', // 添加折扣
      addGoodsList: [], // 加购商品
      masterGoodslist: [], // 主要商品
      sendNum: 0, // 获得赠品
      costNum: 0, // 消费金额
      addLimit: 0,
      optionMall: '',
      //
      discountType: '0', // 加购类型
      proTime: [], // 促销时间
      proName: '', // 促销名称
      isShowPast: true,
      tableLoading: false,
      MarketManagerAPIInstance: new MarketManagerAPI(this),
      showlog: true,
      activeType: '0', // 活动时间类型
      tableList: [], // 主表数据
      proVisible: false, // 弹窗
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < (new Date().getTime() - 3600 * 1000 * 24)
        }
      },
      shopAccountMallList: [], // 所有的店铺信息
      selectMallList: [], // 选择的店铺
      stoptoping: false,
      mallTableSelect: [], // 列表多选
      goodsMasterTableSelect: [], // 主要商品多选
      otherMasterTableSelect: [], // 附加商品多选
      getTable: [],
      getcreateNewTest: [], // 获取创建的新任务ID
      saveActive: false // 保存活动是否成功
    }
  },
  // computed:{
  //   discountType(){

  //   }
  // },
  created() {
    // this.initMall()
    this.inittime()
  },
  methods: {
    // 复制商品
    async copyActive(val) {
      this.isCopy = true
      this.unchangeRadio = true
      this.getcreateNewTest = []
      this.proVisible = true
      this.currentDate = val // 当前行
      console.log(val)
      // 基本资料
      const index = this.selectMallList.findIndex(el => { return el.mall_alias_name === val.mallName || el.platform_mall_name === val.mallName })
      this.optionMall = this.selectMallList[index].platform_mall_id
      this.disSelect = true
      this.discountType = val.sub_type.toString()
      this.othertableType = val.sub_type.toString()
      this.addLimit = val.sub_item_limit
      this.costNum = val.purchase_min_spend
      this.sendNum = val.per_gift_num
      this.proName = ''
      this.proTime = [Number(val.start_time) * 1000, Number(val.end_time) * 1000]
      // 主要商品列表
      const params = {
        country: val.country,
        mallId: val.platform_mall_id,
        add_on_deal_id: val.add_on_deal_id
      }
      this.$refs.Logs.writeLog(`正在请求主要商品`)
      const res1 = await this.MarketManagerAPIInstance.getMasterGoods(params)
      if (res1.ecode === 0) {
        this.$refs.Logs.writeLog(`主要商品数据加载成功`, true)
        const array = res1.data.data.main_item_list
        array.forEach(el => {
          el.mallName = val.mallName
          el.statusShow = el.status === 1
        })
        this.masterGoodslist = array
      } else {
        this.$refs.Logs.writeLog(`主要商品请求失败：${res1.message}`, false)
      }
      // 附加商品列表
      this.$refs.Logs.writeLog(`正在请求附加商品`)
      const res2 = await this.MarketManagerAPIInstance.getOtherGoods(params)
      if (res2.ecode === 0) {
        this.$refs.Logs.writeLog(`附加商品数据加载成功`, true)
        const array = res2.data.data.item_info
        const mList = res2.data.data.model_info
        const priceList = res2.data.data.sub_item_list
        array.forEach(el => {
          el.mallName = val.mallName
          // modelinfo
          el.modelinfo = mList[el.itemid]
          // 获取折扣价格
          const index = priceList.findIndex(ol => { return Number(ol.item_id) === Number(el.itemid) })
          el.addPrice = priceList[index].input_sub_item_price
          // 获取折扣 (415/519).toFixed(2)*100
          el.discount = 100 - (Number(el.addPrice) / Number(el.price)).toFixed(2) * 100
          // 加购显示
          const isBuyshow = this.currentDate.sub_item_priority.findIndex(ol => { return Number(ol) === Number(el.itemid) })
          el.addStatus = isBuyshow >= 0
          // 状态显示
          const isClose = priceList.findIndex(ol => { return Number(ol.item_id) === Number(el.itemid) && Number(ol.status) === 2 })
          // const ishave = this.currentDate.sub_item_priority.findIndex(al => { return al === Number(el.itemid) })
          el.showStatus = isClose < 0
        })
        this.addGoodsList = array
      } else {
        this.$refs.Logs.writeLog(`附加商品请求失败：${res2.message}`, false)
      }

      this.copyData = this.currentDate
      this.currentDate = ''
    },
    // 编辑商品
    async editGoods(val) {
      this.isCopy = false
      this.unchangeRadio = true
      this.getcreateNewTest = []
      this.proVisible = true
      this.currentDate = val // 当前行
      // 基本资料
      const index = this.selectMallList.findIndex(el => { return el.mall_alias_name === val.mallName || el.platform_mall_name === val.mallName })
      this.optionMall = this.selectMallList[index].platform_mall_id
      this.disSelect = true
      this.discountType = val.sub_type.toString()
      this.othertableType = val.sub_type.toString()
      this.addLimit = val.sub_item_limit
      this.costNum = val.purchase_min_spend
      this.sendNum = val.per_gift_num
      this.proName = val.add_on_deal_name
      this.proTime = [Number(val.start_time) * 1000, Number(val.end_time) * 1000]
      // 主要商品列表
      const params = {
        country: val.country,
        mallId: val.platform_mall_id,
        add_on_deal_id: val.add_on_deal_id
      }
      this.$refs.Logs.writeLog(`正在请求主要商品`)
      const res1 = await this.MarketManagerAPIInstance.getMasterGoods(params)
      if (res1.ecode === 0) {
        this.$refs.Logs.writeLog(`主要商品数据加载成功`, true)
        const array = res1.data.data.main_item_list
        array.forEach(el => {
          el.mallName = val.mallName
          el.statusShow = el.status === 1
        })
        this.masterGoodslist = array
      } else {
        this.$refs.Logs.writeLog(`主要商品请求失败：${res1.message}`, false)
      }
      // 附加商品列表
      this.$refs.Logs.writeLog(`正在请求附加商品`)
      const res2 = await this.MarketManagerAPIInstance.getOtherGoods(params)

      if (res2.ecode === 0) {
        this.$refs.Logs.writeLog(`附加商品数据加载成功`, true)
        const array = res2.data.data.item_info
        const mList = res2.data.data.model_info
        const priceList = res2.data.data.sub_item_list
        array.forEach(el => {
          el.mallName = val.mallName
          // modelinfo
          el.modelinfo = mList[el.itemid]
          // 获取折扣价格
          const index = priceList.findIndex(ol => { return Number(ol.item_id) === Number(el.itemid) })
          el.addPrice = priceList[index].input_sub_item_price
          // 获取折扣 (415/519).toFixed(2)*100
          el.discount = 100 - (Number(el.addPrice) / Number(el.price)).toFixed(2) * 100
          // 加购显示
          const isBuyshow = this.currentDate.sub_item_priority.findIndex(ol => { return Number(ol) === Number(el.itemid) })
          el.addStatus = isBuyshow >= 0
          // 状态显示
          const isClose = priceList.findIndex(ol => { return Number(ol.item_id) === Number(el.itemid) && Number(ol.status) === 2 })
          // const ishave = this.currentDate.sub_item_priority.findIndex(al => { return al === Number(el.itemid) })
          el.showStatus = isClose < 0
        })
        this.addGoodsList = array
        console.log('222', array)
      } else {
        this.$refs.Logs.writeLog(`附加商品请求失败：${res2.message}`, false)
      }
    },
    // 附加商品-价格批量更新
    changePriceMul() {
      if (!this.saveActive && !this.getcreateNewTest.length && !this.currentDate) {
        this.$message.warning('请先保存活动')
        return
      }
      if (!this.addGoodsDiscount) {
        this.$message.warning('请输入正确的折扣信息')
        return
      }
      if (!this.otherMasterTableSelect.length) {
        this.$message.warning('请选择要更新的商品')
        return
      }
      for (let i = 0; i < this.otherMasterTableSelect.length; i++) {
        this.$set(this.otherMasterTableSelect[i], 'discount', this.addGoodsDiscount)
        this.changePriceFun(this.otherMasterTableSelect[i])
      }
    },
    // 附加商品-加购价格
    changePrice(val) {
      if (!val.discount) {
        this.$message.warning('请输入正确的折扣信息')
        return
      }
      this.changePriceFun(val)
    },
    async changePriceFun(val) {
      this.showlog = false
      if (this.getcreateNewTest.length) { // 创建时修改价格
        for (let index = 0; index < this.getcreateNewTest.length; index++) {
          const element = this.getcreateNewTest[index]
          const params = {
            country: element.country,
            mallId: element.platform_mall_id,
            add_on_deal_id: element.add_on_deal_id,
            sub_item_list: []
          }
          val.modelinfo.forEach(el => {
            const obj = {
              item_id: el.itemid,
              model_id: el.modelid,
              status: 1,
              sub_item_price: Number(val.price) * (100 - Number(val.discount)) * 0.01,
              sub_item_limit: 1
            }
            params.sub_item_list.push(obj)
          })
          const res2 = await this.MarketManagerAPIInstance.changeDiscount(params)
          if (res2.ecode !== 0) {
            this.$refs.Logs.writeLog(`价格修改失败${res2.message}`, false)
          }
        }
        this.$refs.Logs.writeLog(`价格修改成功`, true)
      } else { // 编辑时修改价格
        const params = {
          country: this.currentDate.country,
          mallId: this.currentDate.platform_mall_id,
          add_on_deal_id: this.currentDate.add_on_deal_id,
          sub_item_list: []
        }
        val.modelinfo.forEach(el => {
          const obj = {
            item_id: el.itemid,
            model_id: el.modelid,
            status: 1,
            sub_item_price: Number(val.price) * (100 - Number(val.discount)) * 0.01,
            sub_item_limit: 1
          }
          params.sub_item_list.push(obj)
        })
        const res2 = await this.MarketManagerAPIInstance.changeDiscount(params)
        console.log(res2)
        if (res2.ecode === 0) {
          this.$refs.Logs.writeLog(`价格修改成功`, true)
        } else {
          this.$refs.Logs.writeLog(`价格修改失败${res2.message}`, false)
        }
      }
    },
    // 附加商品-加购显示
    async buyShow(val, index) {
      if (!this.saveActive && !this.getcreateNewTest.length && !this.currentDate) {
        this.$message.warning('请先保存活动')
        return
      }
      if (!val.showStatus) {
        this.$message.warning('请先开启状态')
        return
      }
      const showlist = []
      this.addGoodsList.forEach(el => {
        if (el.addStatus) {
          showlist.push(el.itemid)
        }
      })
      if (this.getcreateNewTest.length) { // 创建任务是的操作
        for (let index = 0; index < this.getcreateNewTest.length; index++) {
          const element = this.getcreateNewTest[index]
          const params = {
            country: element.country,
            mallId: element.mallId,
            add_on_deal_id: element.add_on_deal_id,
            add_on_deal_name: element.add_on_deal_name,
            start_time: element.start_time,
            end_time: element.end_time,
            sub_type: element.sub_type,
            sub_item_limit: element.sub_item_limit,
            sub_item_priority: showlist
          }
          const res = await this.MarketManagerAPIInstance.changeBuyShow(params)
          if (res.ecode === 0) {
            this.$refs.Logs.writeLog(`加购状态修改成功`, true)
          } else {
            this.$refs.Logs.writeLog(`加购修改失败${res.message}`, false)
          }
        }
        this.getTableList() // 刷新任务
      } else { // 编辑时处理
        const params = {
          country: this.currentDate.country,
          mallId: this.currentDate.platform_mall_id,
          add_on_deal_id: this.currentDate.add_on_deal_id,
          add_on_deal_name: this.currentDate.add_on_deal_name,
          start_time: this.currentDate.start_time,
          end_time: this.currentDate.end_time,
          sub_type: this.currentDate.sub_type,
          sub_item_limit: this.currentDate.sub_item_limit,
          sub_item_priority: showlist
        }
        const res = await this.MarketManagerAPIInstance.changeBuyShow(params)
        if (res.ecode === 0) {
          this.$refs.Logs.writeLog(`加购状态修改成功`, true)
          this.getTableList() // 刷新任务
        } else {
          this.$refs.Logs.writeLog(`加购修改失败${res.message}`, false)
        }
      }
    },
    // 附加商品-批量开启/关闭 1开启 2关闭
    otherGoodsOpenMul(val) {
      if (!this.saveActive && !this.getcreateNewTest.length && !this.currentDate) {
        this.$message.warning('请先保存活动')
        return
      }
      if (!this.otherMasterTableSelect.length) {
        this.$message.warning('请选择商品')
        return
      }
      for (let i = 0; i < this.otherMasterTableSelect.length; i++) {
        this.otherGoodsOpen(this.otherMasterTableSelect[i], val)
      }
    },
    async otherGoodsOpen(item, val) {
      if (!item.discount) {
        this.$set(item, 'showStatus', !item.showStatus)
        this.$message.warning('请输入正确的折扣信息')
        return
      }
      this.showlog = false
      if (this.getcreateNewTest.length) { // 创建时修改状态
        for (let index = 0; index < this.getcreateNewTest.length; index++) {
          const element = this.getcreateNewTest[index]
          const params = {
            country: element.country,
            mallId: element.platform_mall_id,
            add_on_deal_id: element.add_on_deal_id,
            sub_item_list: []
          }
          item.modelinfo.forEach(el => {
            const obj = {
              item_id: el.itemid,
              model_id: el.modelid,
              status: val,
              sub_item_price: Number(item.price) * (100 - Number(item.discount)) * 0.01,
              sub_item_limit: 1
            }
            params.sub_item_list.push(obj)
          })
          if (val === 1) {
            this.$set(item, 'showStatus', true)
          } else {
            this.$set(item, 'showStatus', false)
          }
          const res2 = await this.MarketManagerAPIInstance.changeDiscount(params)
          if (res2.ecode === 0) {
            this.$refs.Logs.writeLog(`状态修改成功`, true)
          } else {
            this.$refs.Logs.writeLog(`状态修改失败${res2.message}`, false)
          }
        }
      } else { // 编辑时修改
        const params = {
          country: this.currentDate.country,
          mallId: this.currentDate.platform_mall_id,
          add_on_deal_id: this.currentDate.add_on_deal_id,
          sub_item_list: []
        }
        item.modelinfo.forEach(el => {
          const obj = {
            item_id: el.itemid,
            model_id: el.modelid,
            status: val,
            sub_item_price: Number(item.price) * (100 - Number(item.discount)) * 0.01,
            sub_item_limit: 1
          }
          params.sub_item_list.push(obj)
        })
        if (val === 1) {
          this.$set(item, 'showStatus', true)
        } else {
          this.$set(item, 'showStatus', false)
        }
        const res2 = await this.MarketManagerAPIInstance.changeDiscount(params)
        if (res2.ecode === 0) {
          this.$refs.Logs.writeLog(`状态修改成功`, true)
        } else {
          this.$refs.Logs.writeLog(`状态修改失败${res2.message}`, false)
        }
      }
    },
    // 附加商品-删除
    async otherGoodsDelMul() {
      if (!this.saveActive && !this.getcreateNewTest.length && !this.currentDate) {
        this.$message.warning('请先保存活动')
        return
      }
      if (!this.otherMasterTableSelect.length) {
        this.$message.warning('请选择商品')
        return
      }
      this.$confirm('您确定要删除这些商品吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        for (let i = 0; i < this.otherMasterTableSelect.length; i++) {
          this.otherGoodsDelFun(this.otherMasterTableSelect[i])
        }
      })
    },
    otherGoodsDel(item) {
      if (!this.saveActive && !this.getcreateNewTest.length && !this.currentDate) {
        this.$message.warning('请先保存活动')
        return
      }
      this.$confirm('您确定要删除改商品吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        this.otherGoodsDelFun(item)
      })
    },
    async otherGoodsDelFun(item) {
      if (this.getcreateNewTest.length) {
        for (let index = 0; index < this.getcreateNewTest.length; index++) {
          const element = this.getcreateNewTest[index]
          const params = {
            country: element.country,
            mallId: element.platform_mall_id,
            add_on_deal_id: element.add_on_deal_id,
            sub_item_list: []
          }
          item.modelinfo.forEach(el => {
            const obj = {
              item_id: el.itemid,
              model_id: el.modelid,
              status: 0,
              sub_item_price: Number(item.price) * (100 - Number(item.discount)) * 0.01,
              sub_item_limit: 1
            }
            params.sub_item_list.push(obj)
          })
          const res2 = await this.MarketManagerAPIInstance.changeDiscount(params)
          console.log(res2)
          if (res2.ecode === 0) {
            const index = this.addGoodsList.findIndex(ol => { return ol.itemid === item.itemid })
            this.addGoodsList.splice(index, 1)
            this.$refs.Logs.writeLog(`【${item.itemid}】删除成功`, true)
          } else {
            this.$refs.Logs.writeLog(`删除失败${res2.message}`, false)
          }
        }
      } else { // 编辑时删除
        this.showlog = false
        const params = {
          country: this.currentDate.country,
          mallId: this.currentDate.platform_mall_id,
          add_on_deal_id: this.currentDate.add_on_deal_id,
          sub_item_list: []
        }
        item.modelinfo.forEach(el => {
          const obj = {
            item_id: el.itemid,
            model_id: el.modelid,
            status: 0,
            sub_item_price: Number(item.price) * (100 - Number(item.discount)) * 0.01,
            sub_item_limit: 1
          }
          params.sub_item_list.push(obj)
        })
        const res2 = await this.MarketManagerAPIInstance.changeDiscount(params)
        console.log(res2)
        if (res2.ecode === 0) {
          const index = this.addGoodsList.findIndex(ol => { return ol.itemid === item.itemid })
          this.addGoodsList.splice(index, 1)
          this.$refs.Logs.writeLog(`【${item.itemid}】删除成功`, true)
        } else {
          this.$refs.Logs.writeLog(`删除失败${res2.message}`, false)
        }
      }
    },
    // 初始化时间
    inittime() {
      const d1 = new Date().getTime() + 5 * 60 * 1000
      const d2 = d1 + 3600 * 1000
      this.proTime = [d1, d2]
    },
    // 取消查询
    stopSearch() {
      terminateThread()
      this.stoptoping = true
      this.$refs.Logs.writeLog(`正在停止查询`)
    },
    // 创建加购优惠
    createTestVisile() {
      this.isCopy = false
      this.unchangeRadio = false
      this.showlog = true
      if (!this.selectMallList.length) {
        this.$message.warning('请选择店铺')
        return
      }
      this.addGoodsList = [] // 附加商品列表
      this.masterGoodslist = [] // 主要商品列表
      this.getcreateNewTest = [] // 获取创建的新任务ID
      this.masterGoods = false // 添加主要商品
      this.otherGoods = false // 添加加购商品
      this.proVisible = true
      this.currentDate = ''
      this.clearInfo() // 清空弹窗
    },
    // 清除弹窗信息
    clearInfo() {
      this.discountType = '0'
      this.addLimit = '0'
      this.sendNum = '0'
      this.costNum = '0'
      this.proName = ''
      this.proTime = []
      this.masterGoodslist = []
      this.addGoodsDiscount = ''
      this.addGoodsList = []
    },
    // 保存活动
    async  saveActiveInfo() {
      this.saveActive = false
      if (this.discountType === '0' && (Number(this.addLimit) === 0 || Number(this.addLimit) > 100)) {
        this.$message.warning('请输入加购限制,加购限制范围在1-100')
        return
      }
      if (this.discountType === '1' && (!this.costNum || Number(this.sendNum) === 0 || Number(this.sendNum) > 50)) {
        this.$message.warning('请输入消费数量以及赠品数量,赠品限制范围在1-50')
        return
      }
      if (!this.proName.length || this.proName.length > 24) {
        this.$message.warning('请输入促销名称，名称长不可超过24个字符')
        return
      }
      const cTime = new Date().getTime()
      if (cTime > Number(this.proTime[0])) {
        this.$message.warning('请输入比当前较晚的开始时间')
        return
      }
      if (Number(this.proTime[1] - Number(this.proTime[0]) < 3600 * 1000)) {
        this.$message.warning('结束时间至少比开始时间晚一个小时')
        return
      }
      // 复制活动
      if (this.isCopy) {
        const params = {
          country: this.copyData.country,
          platform_mall_id: this.copyData.platform_mall_id,
          mall_alias_name: this.copyData.mallName
        }
        // 1、保存活动
        await this.saveActiveInfoFun(params) // 获取this.getcreateNewTest[]
        // 2、添加主要商品
        const item = {
          country: this.getcreateNewTest[0].country,
          mallId: this.getcreateNewTest[0].mallId,
          add_on_deal_id: this.getcreateNewTest[0].add_on_deal_id,
          main_item_list: []
        }
        this.masterGoodslist.forEach(el => {
          item.main_item_list.push({ item_id: el.item_id, status: el.status })
        })
        const res = await this.saveActiveMasterGoods(item) // 执行
        this.$refs.Logs.writeLog(`${this.copyData.mallName}主要商品请求成功`, true)
        if (res.ecode !== 0) {
          this.$refs.Logs.writeLog(`【${this.copyData.mallName}】商品添加请求失败,${res.message}`, false)
        } else {
          // 遍历商品结果
          let mes = ''
          res.data.data.main_item_list.forEach(el => {
            if (el.err_code !== 0) {
              if (el.err_code === 3450015) {
                mes = '商品不能重复参与同一时段的活动，该商品正在参与其他活动'
              }
              this.$refs.Logs.writeLog(`${this.copyData.mallName}【${el.item_id}】主要商品添加失败,${mes || el.err_code}`, false)
            } else {
              this.$refs.Logs.writeLog(`${this.copyData.mallName}【${el.item_id}】主要商品添加成功`, true)
            }
          })
        }
        // 3、添加加购商品
        const itemlist = []// 商品id
        console.log(this.addGoodsList)
        this.addGoodsList.forEach(el => {
          itemlist.push(el.itemid)
        })
        const params2 = {
          country: this.getcreateNewTest[0].country,
          mallId: this.getcreateNewTest[0].mallId,
          add_on_deal_id: this.getcreateNewTest[0].add_on_deal_id,
          item_list: itemlist
        }
        const res2 = await this.MarketManagerAPIInstance.AddotherGooods(params2)
        this.$refs.Logs.writeLog(`${this.copyData.mallName}附加请求成功`, true)
        if (res2.ecode === 0) { // 遍历失败结果
          this.$refs.Logs.writeLog(`【${this.copyData.mallName}】商品请求成功`, true)
          if (res2.data.data.fail_items.length) {
            res2.data.data.fail_items.forEach(el => {
              this.$refs.Logs.writeLog(`${this.copyData.mallName}【${el}】商品添加失败,${res.message}`, false)
            })
          }
        } else {
          this.$refs.Logs.writeLog(`【${this.copyData.mallName}】附加商品请求异常,添加失败,${res.message}`, false)
        }
        // 4、开启状态
        for (let i = 0; i < this.addGoodsList.length; i++) {
          const item = this.addGoodsList[i]
          const params3 = {
            country: this.getcreateNewTest[0].country,
            mallId: this.getcreateNewTest[0].mallId,
            add_on_deal_id: this.getcreateNewTest[0].add_on_deal_id,
            sub_item_list: []
          }
          item.modelinfo.forEach(el => {
            const obj = {
              item_id: el.itemid,
              model_id: el.modelid,
              status: 1,
              sub_item_price: Number(item.price) * (100 - Number(item.discount)) * 0.01,
              sub_item_limit: 1
            }
            params3.sub_item_list.push(obj)
          })
          debugger
          const res3 = await this.MarketManagerAPIInstance.changeDiscount(params3)
          debugger
          if (res3.ecode === 0) {
            this.$refs.Logs.writeLog(`状态开启成功`, true)
          } else {
            this.$refs.Logs.writeLog(`状态开启失败${res3.message}`, false)
          }
        }
      } else { // 创建活动
        for (let i = 0; i < this.selectMallList.length; i++) {
          await this.saveActiveInfoFun(this.selectMallList[i])
        }
      }
    },
    async saveActiveInfoFun(val) {
      try {
        this.showlog = false
        const params = {
          country: val.country,
          mallId: val.platform_mall_id,
          add_on_deal_name: this.proName,
          start_time: Math.floor(this.proTime[0] / 1000),
          end_time: Math.floor(this.proTime[1] / 1000),
          sub_type: this.discountType,
          sub_item_limit: this.addLimit,
          purchase_min_spend: this.costNum,
          per_gift_num: this.sendNum
        }
        const res = await this.MarketManagerAPIInstance.saveActiveAddondeal(params)
        if (res.ecode === 0) {
          this.$refs.Logs.writeLog(`------【${val.mall_alias_name || val.platform_mall_name}】创建成功------`, true)
          this.saveActive = true
          const item = res.data.data
          item.country = val.country
          item.mallId = val.platform_mall_id
          item.mallname = val.mall_alias_name || val.platform_mall_name
          this.getcreateNewTest.push(item)
          this.othertableType = this.discountType // 加购商品列表类型 1 折扣类型 2 满减类型
        } else {
          this.$refs.Logs.writeLog(`【${val.mall_alias_name || val.platform_mall_name}】创建失败,${res.message}`, false)
        }
      } catch (error) {
        this.$refs.Logs.writeLog(`【${val.mall_alias_name || val.platform_mall_name}】创建失败--catch,${error}`, false)
      }
    },
    // 添加主要商品--预先限制
    addMasterGoods() {
      if (!this.saveActive && !this.getcreateNewTest.length && !this.currentDate) {
        this.$message.warning('请先保存活动')
        return
      }
      this.goodsItemSelectorVisible = true
      this.masterGoods = true // 主要商品列表
      this.otherGoods = false // 附加商品
    },
    // 获取添加的商品信息
    async  changeGoodsItem(val) {
      console.log(val)
      if (!val.goodsList.length) {
        this.$message.warning('请先选择商品')
        return
      }
      if (this.getcreateNewTest.length) { // 创建任务时的处理
        // 获取主要商品
        if (this.masterGoods) {
          for (let i = 0; i < this.getcreateNewTest.length; i++) { // 遍历任务
            const element = this.getcreateNewTest[i]
            const item = {
              country: element.country,
              mallId: element.mallId,
              add_on_deal_id: element.add_on_deal_id,
              main_item_list: []
            }
            val.goodsList.forEach(el => { // 获取商品
              el.status = 1
              item.main_item_list.push({ item_id: el.itemid, status: el.status, platform_mall_id: el.platform_mall_id })
            })
            const res = await this.saveActiveMasterGoods(item)
            if (res.ecode !== 0) {
              this.$refs.Logs.writeLog(`请求异常,商品添加失败`, true)
            } else {
              const sucList = [] // 添加成功的商品
              let mes = ''
              res.data.data.main_item_list.forEach(al => {
                if (al.err_code === 0) {
                  sucList.push(al.item_id)
                } else {
                  if (al.err_code === 3450015) {
                    mes = '商品不能重复参与同一时段的活动，该商品正在参与其他活动'
                    this.$refs.Logs.writeLog(`${element.mallname}【${al.item_id}】商品不能重复参与同一时段的活动，该商品正在参与其他活动`, false)
                  }
                }
              })
              item.main_item_list.forEach(el => {
                el.statusShow = el.status === 1
                el.mallName = element.mallname
                const sucIndex = sucList.findIndex(ol => { return el.item_id === ol })
                const index = this.masterGoodslist.findIndex(ol => { return element.mallId === ol.platform_mall_id && ol.item_id === el.item_id }) // 过滤重复数据
                if (index < 0 && sucIndex >= 0) {
                  this.masterGoodslist.push(el)
                } else {
                  // this.$refs.Logs.writeLog(`------【${element.mallname}】已过滤重复数组------`, true)
                }
              })
              console.log(res)
              this.$refs.Logs.writeLog(`【${element.mallname}】添加${sucList.length}个商品`, true)
            }
          }
        }
        // 获取附加商品
        if (this.otherGoods) {
          // 根据任务列表 sub_item_limit 限制获取商品的长度

          // 附加商品与主商品添加统一商品检测
          val.goodsList.forEach(el => {
            const index = this.masterGoodslist.findIndex(ol => { return Number(ol.item_id) === Number(el.itemid) })
            if (index >= 0) {
              this.$message.warning('附加商品不能与主商品相同')
            }
          })
          // 添加商品去重
          const goodsList2 = []
          const skuList = []
          val.goodsList.forEach(el => {
            const index = this.addGoodsList.findIndex(ol => { return Number(ol.item_id) === Number(el.itemid) })
            if (index < 0) {
              goodsList2.push(el)
              skuList.push(el.itemid.toString())
            } else {
              this.$refs.Logs.writeLog(`已过滤重复商品`, true)
            }
          })
          this.getcreateNewTest.forEach(el => { // 添加商品到任务中
            el.item_list = goodsList2
          })
          // 获取每个商品的molderinfo
          for (let i = 0; i < this.getcreateNewTest.length; i++) {
            const params = {
              country: this.getcreateNewTest[i].country,
              mallId: this.getcreateNewTest[i].mallId,
              productIds: skuList
            }
            const modelres = await this.getModelinfo(params)
            if (modelres) {
            // item_list匹配對應的modelList
              this.getcreateNewTest[i].item_list.forEach(al => {
                modelres.forEach(gl => {
                  if (Number(al.itemid) === Number(gl.itemid)) {
                    al.modelinfo = gl.modelList
                  }
                })
              })
              this.getcreateNewTest[i].platform_mall_id = this.getcreateNewTest[i].mallId
              this.addOtherGoods(this.getcreateNewTest[i])
            }
          }
        }
      } else { // 编辑的处理
        // 添加主商品
        if (this.masterGoods) {
          const item = {
            country: this.currentDate.country,
            mallId: this.currentDate.platform_mall_id,
            add_on_deal_id: this.currentDate.add_on_deal_id,
            main_item_list: []
          }
          val.goodsList.forEach(el => {
            el.status = 1
            item.main_item_list.push({ item_id: el.itemid, status: el.status })
          })
          const res = await this.saveActiveMasterGoods(item) // 执行
          if (res.ecode !== 0) {
            this.$refs.Logs.writeLog(`【${this.currentDate.mallName}】商品添加失败,${res.message}`, false)
          } else {
            item.main_item_list.forEach(el => {
              el.statusShow = el.status === 1
              el.mallName = this.currentDate.mallName
              const index = this.masterGoodslist.findIndex(ol => { return ol.item_id === el.item_id }) // 过滤重复数据
              if (index < 0) {
                this.masterGoodslist.push(el)
              } else {
                this.$refs.Logs.writeLog(`------【${this.currentDate.mallName}】已过滤重复数组------`, true)
              }
            })
            this.$refs.Logs.writeLog(`【${this.currentDate.mallName}】商品添加成功`, true)
          }
        }
        // 添加附加商品
        if (this.otherGoods) {
          // 根据任务列表 sub_item_limit 限制获取商品的长度
          // 附加商品与主商品添加统一商品检测
          val.goodsList.forEach(el => {
            const index = this.masterGoodslist.findIndex(ol => { return Number(ol.item_id) === Number(el.itemid) })
            if (index >= 0) {
              this.$message.warning('附加商品不能与主商品相同')
            }
          })
          const goodsList2 = []
          const skuList = []
          val.goodsList.forEach(el => {
            const index = this.addGoodsList.findIndex(ol => { return Number(ol.item_id) === Number(el.itemid) })
            if (index < 0) {
              goodsList2.push(el)
              skuList.push(el.itemid.toString())
            } else {
              this.$refs.Logs.writeLog(`已过滤重复商品`, true)
            }
          })
          this.currentDate.item_list = goodsList2
          // 获取molderinfo
          const params = {
            country: this.currentDate.country,
            mallId: this.currentDate.platform_mall_id,
            productIds: skuList
          }
          const modelres = await this.getModelinfo(params)
          if (modelres) {
            // this.currentDate.item_list匹配對應的modelList
            this.currentDate.item_list.forEach(al => {
              modelres.forEach(gl => {
                if (Number(al.itemid) === Number(gl.itemid)) {
                  al.modelinfo = gl.modelList
                }
              })
            })
            this.addOtherGoods(this.currentDate)
          } else {
            this.$refs.Logs.writeLog(`商品无法添加`, false)
          }
        }
      }
    },
    // 获取商品model
    async getModelinfo(val) {
      const params = {
        country: val.country,
        mallId: val.mallId,
        productIds: val.productIds }
      const res = await this.GoodsManagerAPIInstance.getshopGoodsDetail(params)
      if (res.ecode === 0) {
        const arr = res.data.products.items
        return arr
      } else {
        this.$refs.Logs.writeLog(`商品sku获取失败`, false)
        return null
      }
    },
    // 执行主要商品任务[添加、展示、删除]
    async saveActiveMasterGoods(val) {
      try {
        this.showlog = false
        const params = {
          country: val.country,
          mallId: val.mallId,
          add_on_deal_id: val.add_on_deal_id,
          main_item_list: val.main_item_list
        }
        const res = await this.MarketManagerAPIInstance.ActiveAddMasterGooods(params)
        this.goodsItemSelectorVisible = false
        return res
      } catch (error) {
        this.$refs.Logs.writeLog(`【${val.mallname}】操作添加失败--catch,${error}`, false)
      }
    },
    // 多选-主要商品信息
    MasterSelectionChange(val) {
      this.goodsMasterTableSelect = val
    },
    // 多选-附加商品信息
    otherSelectionChange(val) {
      this.otherMasterTableSelect = val
    },
    // 批量开启/关闭知名度
    async openShowMul(val) {
      if (!this.saveActive && !this.getcreateNewTest.length && !this.currentDate) {
        this.$message.warning('请先保存活动')
        return
      }
      // val 1 开启 2 关闭 getcreateNewTest=[](是创建任务)
      if (!this.goodsMasterTableSelect.length) {
        this.$message.warning('请先选择商品信息!')
        return
      }
      if (this.getcreateNewTest.length) { // 初始化创建时的修改
        for (let i = 0; i < this.getcreateNewTest.length; i++) { // 获取任务
          const item = {
            country: this.getcreateNewTest[i].country,
            mallId: this.getcreateNewTest[i].mallId,
            add_on_deal_id: this.getcreateNewTest[i].add_on_deal_id,
            main_item_list: []
          }
          for (let i = 0; i < this.goodsMasterTableSelect.length; i++) {
            const el = this.goodsMasterTableSelect[i]
            if (val === 1) {
              this.$set(el, 'statusShow', true)
            } else {
              this.$set(el, 'statusShow', false)
            }
            el.status = val
            item.main_item_list.push({ status: el.status, item_id: el.item_id })
          }
          const res = await this.saveActiveMasterGoods(item) // 执行
          if (res.ecode !== 0) {
            this.$refs.Logs.writeLog(`【${this.getcreateNewTest[i].mallName}】商品状态修改失败,${res.message}`, false)
          } else {
            this.$refs.Logs.writeLog(`【${this.getcreateNewTest[i].mallName}】商品状态修改成功`, true)
          }
        }
      } else {
        const item = {
          country: this.currentDate.country,
          mallId: this.currentDate.platform_mall_id,
          add_on_deal_id: this.currentDate.add_on_deal_id,
          main_item_list: []
        }
        for (let i = 0; i < this.goodsMasterTableSelect.length; i++) {
          const el = this.goodsMasterTableSelect[i]
          if (val === 1) {
            this.$set(el, 'statusShow', true)
          } else {
            this.$set(el, 'statusShow', false)
          }
          el.status = val
          item.main_item_list.push({ status: el.status, item_id: el.item_id })
        }
        const res = await this.saveActiveMasterGoods(item) // 执行
        if (res.ecode !== 0) {
          this.$refs.Logs.writeLog(`【${this.currentDate.mallName}】商品状态修改失败,${res.message}`, false)
        } else {
          this.$refs.Logs.writeLog(`【${this.currentDate.mallName}】商品状态修改成功`, true)
        }
      }
    },
    // 单个开启/关闭知名度
    async changeShow(row, index, goodsType) {
      if (!this.saveActive && !this.getcreateNewTest.length && !this.currentDate) {
        this.$message.warning('请先保存活动')
        return
      }
      // 初始创建需要
      if (this.getcreateNewTest.length) {
        if (goodsType === 'master') { // 主要商品
          for (let index = 0; index < this.getcreateNewTest.length; index++) {
            const element = this.getcreateNewTest[index]
            const item = {
              country: element.country,
              mallId: element.mallId,
              add_on_deal_id: element.add_on_deal_id,
              main_item_list: []
            }
            if (row.statusShow) { // status 1 开启 2 关闭
              item.main_item_list = [{ status: 1, item_id: row.item_id }]
            } else {
              item.main_item_list = [{ status: 2, item_id: row.item_id }]
            }
            const res = await this.saveActiveMasterGoods(item) // 执行
            if (res.ecode !== 0) {
              this.$refs.Logs.writeLog(`【${element.mallName}】商品状态修改失败,${res.message}`, false)
            } else {
              this.$refs.Logs.writeLog(`【${element.mallName}】商品状态修改成功`, true)
            }
          }
        }
      } else { // 编辑的处理
        if (goodsType === 'master') { // 主要商品
          const item = {
            country: this.currentDate.country,
            mallId: this.currentDate.platform_mall_id,
            add_on_deal_id: this.currentDate.add_on_deal_id,
            main_item_list: []
          }
          if (row.statusShow) { // status 1 开启 2 关闭
            item.main_item_list = [{ status: 1, item_id: row.item_id }]
          } else {
            item.main_item_list = [{ status: 2, item_id: row.item_id }]
          }
          const res = await this.saveActiveMasterGoods(item) // 执行
          if (res.ecode !== 0) {
            this.$refs.Logs.writeLog(`【${this.currentDate.mallName}】商品状态修改失败,${res.message}`, false)
          } else {
            this.$refs.Logs.writeLog(`【${this.currentDate.mallName}】商品状态修改成功`, true)
          }
        }
        if (goodsType === 'other') { // 附加商品

        }
      }
    },
    // 批量删除
    delMasterMulFun() {
      if (!this.saveActive && !this.getcreateNewTest.length && !this.currentDate) {
        this.$message.warning('请先保存活动')
        return
      }
      if (!this.masterGoodslist.length) {
        this.$message.warning('请先选择商品信息')
        return
      }
      this.$confirm('您确定要删除这些商品吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        this.delMasterMul()
      })
    },
    async delMasterMul() {
      if (this.getcreateNewTest.length) { // 初始创建的任务,删除
        for (let i = 0; i < this.getcreateNewTest.length; i++) {
          const item = {
            country: this.getcreateNewTest[i].country,
            mallId: this.getcreateNewTest[i].mallId,
            add_on_deal_id: this.getcreateNewTest[i].add_on_deal_id,
            main_item_list: []
          }
          for (let i = 0; i < this.goodsMasterTableSelect.length; i++) {
            const el = this.goodsMasterTableSelect[i]
            el.status = 0
            item.main_item_list.push({ status: el.status, item_id: el.item_id })
          }
          const res = await this.saveActiveMasterGoods(item) // 执行
          if (res.ecode !== 0) {
            this.$refs.Logs.writeLog(`【${this.getcreateNewTest[i].mallname}】商品删除修改失败,${res.message}`, false)
          } else {
            this.goodsMasterTableSelect.forEach(el => {
              const index = this.masterGoodslist.findIndex(al => { return al.item_id === el.item_id })
              this.masterGoodslist.splice(index, 1)
            })
            debugger
            this.$refs.Logs.writeLog(`【${this.getcreateNewTest[i].mallname}】商品删除成功`, true)
          }
        }
      } else { // 编辑，删除
        const item = {
          country: this.currentDate.country,
          mallId: this.currentDate.platform_mall_id,
          add_on_deal_id: this.currentDate.add_on_deal_id,
          main_item_list: []
        }
        for (let i = 0; i < this.goodsMasterTableSelect.length; i++) {
          const el = this.goodsMasterTableSelect[i]
          el.status = 0
          item.main_item_list.push({ status: el.status, item_id: el.item_id })
        }
        const res = await this.saveActiveMasterGoods(item) // 执行
        if (res.ecode !== 0) {
          this.$refs.Logs.writeLog(`【${this.currentDate.mallName}】商品删除修改失败,${res.message}`, false)
        } else {
          this.goodsMasterTableSelect.forEach(el => {
            const index = this.masterGoodslist.findIndex(al => { return al.item_id === el.item_id })
            this.masterGoodslist.splice(index, 1)
          })
          this.$refs.Logs.writeLog(`【${this.currentDate.mallName}】商品删除成功`, true)
        }
      }
    },
    // 单个删除
    delMasterFun(row, index, goodsType) {
      if (!this.saveActive && !this.getcreateNewTest.length && !this.currentDate) {
        this.$message.warning('请先保存活动')
        return
      }
      this.$confirm('您确定要删除该商品吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        this.delMaster(row, index, goodsType)
      })
    },
    async delMaster(row, index, goodsType) {
      // 创建处理--主要商品删除
      if (this.getcreateNewTest.length) {
        for (let i = 0; i < this.getcreateNewTest.length; i++) {
          const item = {
            country: this.getcreateNewTest[i].country,
            mallId: this.getcreateNewTest[i].mallId,
            add_on_deal_id: this.getcreateNewTest[i].add_on_deal_id,
            main_item_list: [{ status: 0, item_id: row.item_id }]
          }
          const res = await this.saveActiveMasterGoods(item)
          if (res.ecode !== 0) {
            this.$refs.Logs.writeLog(`【${this.getcreateNewTest[i].mallname}】商品删除修改失败,${res.message}`, false)
          } else {
            this.masterGoodslist.splice(index, 1)
            this.$refs.Logs.writeLog(`【${this.getcreateNewTest[i].mallname}】商品删除成功`, true)
          }
        }
      } else { // 编辑时--主要商品删除
        // if (goodsType === 'master') {
        const item = {
          country: this.currentDate.country,
          mallId: this.currentDate.platform_mall_id,
          add_on_deal_id: this.currentDate.add_on_deal_id,
          main_item_list: [{ status: 0, item_id: row.item_id }]
        }
        const res = await this.saveActiveMasterGoods(item)
        if (res.ecode !== 0) {
          this.$refs.Logs.writeLog(`【${this.currentDate.mallName}】商品删除修改失败,${res.message}`, false)
        } else {
          this.masterGoodslist.splice(index, 1)
          this.$refs.Logs.writeLog(`【${this.currentDate.mallName}】商品删除成功`, true)
        }
        // }
      }
    },
    // 添加加购商品--预先限制
    addOtherGoodsFun() {
      if (!this.saveActive && !this.getcreateNewTest.length && !this.currentDate) {
        this.$message.warning('请先保存活动')
        return
      }
      if (!this.masterGoodslist.length) {
        this.$message.warning('请至少选择一个主要商品')
        return
      }
      // 加购限制---待定
      this.goodsItemSelectorVisible = true
      this.otherGoods = true // 附加商品
      this.masterGoods = false// 主要商品列表
    },
    // 添加加购商品
    async addOtherGoods(val) {
      try {
        this.showlog = false
        const itemlist = []// 商品id
        val.item_list.forEach(el => {
          itemlist.push(el.itemid)
        })
        const params = {
          country: val.country,
          mallId: val.platform_mall_id,
          add_on_deal_id: val.add_on_deal_id,
          item_list: itemlist
        }
        const res = await this.MarketManagerAPIInstance.AddotherGooods(params)
        if (res.ecode === 0) {
          this.$refs.Logs.writeLog(`商品数据请求成功`, true)
          const sucList = []// 添加成功的商品
          if (res.data.data.succ_items.length) {
            res.data.data.succ_items.forEach(ol => {
              sucList.push(ol.item_id)
            })
          }
          console.log(val)
          this.$refs.Logs.writeLog(`【${val.mallname}】添加${sucList.length}个商品`, true)
          // 组装addGoodsList数据
          val.item_list.forEach(el => {
            const sucIndex = sucList.findIndex(ol => { return el.itemid === ol })
            if (sucIndex >= 0) {
              if (val.sub_type === 0) { // 折扣类型
                el.mallName = val.mallname
                // el.discount = 0 // 折扣
                this.$set(el, 'discount', 0)
                el.addPrice = el.discount ? el.price : el.price * (Number(el.discount))// 加购价格
                // el.addStatus = false // 加购状态
                // el.showStatus = false// 状态
                this.$set(el, 'addStatus', false)
                this.$set(el, 'showStatus', false)
              } else { // 满减类型
                el.addPrice = 0
                el.showStatus = true
              }
              this.addGoodsList.push(el)
            }
          })
        } else {
          this.$refs.Logs.writeLog(`【${val.mallName || val.mallname}】商品请求异常,添加失败,${res.message}`, false)
        }
        this.goodsItemSelectorVisible = false
      } catch (error) {
        this.$refs.Logs.writeLog(`【${val.mallName || val.mallname}】加购商品添加失败--catch,${error}`, false)
      }
    },
    // // 初始化店铺信息
    // initMall() {
    //   getMalls(res => {
    //     this.shopAccountMallList = res
    //   })
    // },
    // 清除日志
    clearLog() {
      this.$refs.Logs.consoleMsg = ''
    },
    // 多选
    handleSelectionChange(val) {
      this.mallTableSelect = val
    },
    // 批量删除/停止
    MallvoucherDelMul() {
      if (!this.mallTableSelect.length) {
        this.$message.warning('请选择要操作的数据')
        return
      }
      this.$confirm('确定要删除或停止这些活动吗？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        for (let i = 0; i < this.mallTableSelect.length; i++) {
          const item = this.mallTableSelect[i]
          if (item.voucher_status === '即将开始') { // 删除
            await this.MallvoucherDel(item)
          }
          if (item.voucher_status === '进行中') { // 停止
            await this.MallvoucherStop(item)
          }
        }
        this.getTableList()
      })
    },
    // 停止
    MallvoucherStopFun(val) {
      this.$confirm('确定要停止该活动吗？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await this.MallvoucherStop(val)
        this.getTableList()
      })
    },
    async  MallvoucherStop(val) {
      const params = {
        country: val.country,
        mallId: val.platform_mall_id,
        add_on_deal_id: val.add_on_deal_id
      }
      try {
        this.showlog = false
        const res = await this.MarketManagerAPIInstance.stopOndealList(params)
        if (res.ecode === 0) {
          this.$refs.Logs.writeLog(`------成功停止【${val.add_on_deal_name}】优惠活动------`, true)
        } else {
          this.$refs.Logs.writeLog(`停止【${val.add_on_deal_name}】优惠活动,${res.message}`, false)
        }
      } catch (error) {
        this.$refs.Logs.writeLog(`停止【${val.add_on_deal_name}】--catch,${error}`, false)
      }
    },
    // 删除
    MallvoucherDelFun(val) {
      this.$confirm('确定要删除该活动吗？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await this.MallvoucherDel(val)
        this.getTableList()
      })
    },
    async  MallvoucherDel(val) {
      const params = {
        country: val.country,
        mallId: val.platform_mall_id,
        add_on_deal_id: val.add_on_deal_id
      }
      try {
        this.showlog = false
        const res = await this.MarketManagerAPIInstance.delondealList(params)
        if (res.ecode === 0) {
          this.$refs.Logs.writeLog(`------成功删除【${val.add_on_deal_name}】优惠活动------`, true)
        } else {
          let mes = ''
          if (res.message === 'only upcoming campaign can delete') {
            mes = '只有即将进行的活动才能删除'
          }
          this.$refs.Logs.writeLog(`删除【${val.add_on_deal_name}】优惠活动,${mes || res.message}`, false)
        }
      } catch (error) {
        this.$refs.Logs.writeLog(`删除【${val.add_on_deal_name}】--catch,${error}`, false)
      }
      // if (this.singerStop) {
      // this.getTableList()
      // }
      // this.singerStop = false
    },
    // 停止创建活动
    stopCreate() {
      terminateThread()
      this.$refs.Logs.writeLog(`已停止创建`)
    },
    // 时间格式转换
    add0(m) { return m < 10 ? '0' + m : m },
    formatTime(val) {
      var time = new Date(val)
      var y = time.getFullYear()
      var m = time.getMonth() + 1
      var d = time.getDate()
      var h = time.getHours()
      var mm = time.getMinutes()
      var s = time.getSeconds()
      return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s)
    },
    // 店铺选择
    changeMallList(val) {
      this.selectMallList = val
    },
    // 获取折扣信息
    async  getInfo(item, count = { count: 1 }) {
      try {
        const params = {
          country: item.country,
          mallId: item.platform_mall_id,
          offset: item.offset,
          count: 50
        }
        const res = await this.MarketManagerAPIInstance.getAddondealList(params)
        if (res.ecode !== 0) {
          let message = ''
          if (res.message === 'token not found') {
            message = '店铺未登录'
          }
          this.$refs.Logs.writeLog(`【${item.mall_alias_name || item.platform_mall_name}】数据请求失败,${message || res.message}`, false)
          return
        }
        let promotionsList = res.ecode === 0 ? res.data.data.add_on_deal_list : []
        if (!promotionsList.length) {
          this.$refs.Logs.writeLog(`【${item.mall_alias_name || item.platform_mall_name}】暂无数据`)
          return
        }
        while (promotionsList.length) {
          if (this.stoptoping) {
            return
          }
          // 列表数据处理
          for (let i = 0; i < promotionsList.length; i++) {
            if (this.stoptoping) {
              return
            }
            const el = promotionsList[i]
            el.platform_mall_id = item.platform_mall_id
            el.country = item.country
            el.mallName = item.mall_alias_name || item.platform_mall_name
            el.formStartime = this.formatTime(el.start_time * 1000)
            el.formEndtime = this.formatTime(el.end_time * 1000)
            // 时间筛选
            if (Number(el.status) === 1) {
              el.voucher_status = '即将开始'
              this.willList.push(el)
            } else if (Number(el.status) === 2) {
              el.voucher_status = '进行中'
              this.doingList.push(el)
            } else {
              el.voucher_status = '已过期'
              this.pastList.push(el)
            }
            this.arrList.push(el)
          }
          this.$refs.Logs.writeLog(`【${item.mall_alias_name || item.platform_mall_name}】,正在请求第【${(params.offset / params.count) + 1}】页`, true)
          if (promotionsList.length < params.count) {
            promotionsList.length = []
          } else {
            params.offset = params.offset + params.count
            const res = await this.MarketManagerAPIInstance.logisticsPromotion(params)
            promotionsList = res.data.code === 0 ? res.data.data.add_on_deal_list : []
          }
        }
        // 条件筛选
        if (this.isShowPast) {
          if (this.activeType === '0') {
            this.getTable = this.willList.concat(this.doingList)
          } else if (this.activeType === '1') {
            this.getTable = this.doingList
          } else if (this.activeType === '2') {
            this.getTable = this.willList
          } else {
            this.getTable = []
          }
        } else {
          if (this.activeType === '1') { this.getTable = this.doingList }
          if (this.activeType === '2') { this.getTable = this.willList }
          if (this.activeType === '3') { this.getTable = this.pastList }
          if (this.activeType === '0') { this.getTable = this.arrList }
        }
      } catch (error) {
        this.$refs.Logs.writeLog(`【${item.mall_alias_name || item.platform_mall_name}】--catch，${error}`, false)
      } finally {
        count.count--
      }
    },
    // 获取优惠券详情
    async getPrizeDetail(item, count = { count: 1 }) {
      try {
        const params = {
          country: item.country,
          mallId: item.platform_mall_id,
          campaign_id: item.campaign_id
        }
        const res1 = await this.MarketManagerAPIInstance.FollowPrizeDetail(params)
        if (res1.data.code === 0) {
          const data = res1.data.data
          let discountInfo = null
          let topNum = null
          const min_spend = data.min_spend
          // 折扣
          if (Number(data.reward_type) === 0) {
            if (data.discount.value) { // 折扣金额
              discountInfo = data.discount.value
              topNum = ''
            } else { // 折扣
              discountInfo = `${(100 - Number(data.discount.percentage)) / 10}折`
              topNum = data.discount.cap === '0.00' ? '无限制' : data.discount.cap
            }
          }
          // shoppB
          if (Number(data.reward_type) === 1) {
            discountInfo = `${data.coin_cash_back.percentage}%折扣,(Shopee币回扣)`
            topNum = data.coin_cash_back.cap === '0.00' ? '无限制' : data.coin_cash_back.cap + '(Shopee币)'
          }
          this.$set(item, 'discountInfo', discountInfo)
          this.$set(item, 'topNum', topNum)
          this.$set(item, 'min_spend', min_spend)
        } else {
          this.$refs.Logs.writeLog(`【${item.mall_alias_name || item.platform_mall_name}】,${res1.message}`, false)
        }
      } catch (error) {
        this.$refs.Logs.writeLog(`Detailcatch，${error}`, false)
      } finally {
        count.count--
      }
    },
    // 初始化
    async getTableList() {
      this.disSelect = false// 弹窗多选框可选
      this.$refs.multipleTable.clearSelection()// 清空多选
      // this.clearLog()
      this.selectMallList.forEach(el => {
        el.offset = 0
      })
      this.getTable = []
      this.arrList = []
      this.willList = []
      this.doingList = []
      this.pastList = []
      this.showlog = false
      this.tableLoading = true
      this.$refs.Logs.writeLog(`正在请求数据......`, true)
      const res1 = await batchOperation(this.selectMallList, this.getInfo)
      this.$refs.Logs.writeLog(`请求数据结束`)
      this.tableLoading = false
      this.tableList = this.getTable
      console.log(this.tableList)
    }
  }
}
</script>
<style lang="less" scoped>
 .detail{
   min-width: 1200px;
     .row1,.row2{
       display: flex;
       align-items: center;
     }

  .edit-group-dialog {
  /deep/.el-dialog__body {
    // padding: 24px 15px;
        padding-top: 0px;
  }
  /deep/.el-form-item {
    margin-bottom: 0px;

  }
  /deep/.discountitem{
    .el-form-item__content{
          display: flex;
    }
  }
}
  /deep/.goodstable{
    .el-table__header-wrapper{
      .el-table__header{
        /deep/.has-gutter{
          .el-table__cell{
            padding: 0px 0px;
          }
        }
      }
    }
  }

 }
 .freightType{
       display: flex;
    align-items: baseline;
 }
</style>

