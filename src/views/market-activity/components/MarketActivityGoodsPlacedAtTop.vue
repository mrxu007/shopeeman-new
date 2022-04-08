<template>
  <div class="detail">
    <div class="row" style="display:flex;margin-top:25px;background-color: white;padding:15px 4px;overflow: auto;">
      <div class="row2_left" style="border: 1px solid rgb(220, 228, 218);border-radius: 5px;width:748px">
        <span
          style="
          margin-top: -7px;
          display: block;
          margin-left: 14px;
          background-color: white;
          text-align: center;
          width: 85px;"
        >基础数据配置</span>
        <ul>
          <li>
            <storeChoose style="margin-left:-20px;width: 730px;" :show-mall-all="true" @changeMallList="changeMallList" />
          </li>
          <li style="margin-top:20px;align-items: center;">
            <el-button size="mini" type="primary" @click="getTopTestTable">搜索任务</el-button>
            <el-button size="mini" type="primary" @click="delTeskFun('')">批量删除任务</el-button>
            <el-button size="mini" type="primary" @click="stopdTesk">停止创建任务</el-button>
            <el-button size="mini" type="primary" @click="clearLog">清除日志</el-button>
            <el-checkbox
              v-model="showlog"
              style="margin-left:10px"
            >隐藏日志</el-checkbox>
            <el-button size="mini" type="primary" @click="aaa">aaa</el-button>
          </li>
          <li>
            <span style="color:red;display:block;margin-top:5px">提示：每个店铺可置顶商品数量大为5个，置顶时间为4小时</span>
          </li>
        </ul>
      </div>

      <div class="row2_right" style="border: 1px solid rgb(220, 228, 218);border-radius: 5px;margin-left:20px;width:507px">
        <span
          style="
          margin-top: -7px;
          display: block;
          margin-left: 14px;
          background-color: white;
         text-align: center;
          width: 85px;"
        >置顶任务操作</span>
        <ul style="width:505px">
          <li>
            <div>
              置顶时间设置：
              <el-radio-group v-model="set_time">
                <el-radio label="1">当前时间</el-radio>
                <el-radio label="2" style="margin-left:11px">
                  <el-date-picker
                    v-model="cloumn_date"
                    size="mini"
                    style="width: 180px"
                    type="datetime"
                    value-format="timestamp"
                    :picker-options="pickerOptions"
                    placeholder="选择日期时间"
                  />
                </el-radio>
              </el-radio-group>
            </div>
          </li>
          <li>
            <div>
              置顶维度设置：
              <el-radio-group v-model="otherConditon">
                <el-radio label="1">自定义商品</el-radio>
                <el-radio label="2">
                  <el-select v-model="saleType" placeholder="请选择" size="mini" style="width:120px">
                    <el-option label="默认排序" value="2" />
                    <el-option label="销量从低往高" value="3" />
                    <el-option label="销量从高往低" value="4" />
                    <el-option label="价格从低往高" value="5" />
                    <el-option label="价格从高往低" value="6" />
                  </el-select>
                </el-radio>
              </el-radio-group>
              <!-- 选择自定商品时 -->
              <el-button v-if="otherConditon==='1'" size="mini" type="primary" @click="addGoods">添加商品</el-button>
            </div>
          </li>
          <li style="align-items: baseline;">
            <div>循环置顶商品个数：
              <el-input v-model="loopGoodsNum" size="mini" onkeyup="value=value.replace(/[^\d.]/g,0)" style="width:60px" />
              <el-button size="mini" type="primary" style="margin-left:32px" @click="createTeskFun">创建任务</el-button>
              <el-button size="mini" type="primary" @click="refreshTopGoods">重新获取置顶商品</el-button>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="tableDetail" style="margin-top: 8px;">
      <el-table
        v-loading="loading"
        :data="tableList"
        height="calc(100vh - 232px)"
        :header-cell-style="{ background: '#f7fafa' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" fixed />
        <el-table-column type="index" fixed label="序号" />
        <el-table-column prop="country" label="站点" align="center" min-width="150px" fixed>
          <template v-slot="{row}">{{ row.country | chineseSite }}</template>
        </el-table-column>
        <el-table-column prop="mall_name" label="店铺名称" align="center" min-width="150px" />
        <el-table-column prop="sort_type" label="置顶维度" align="center" min-width="150px">
          <template v-slot="{row}"><span>{{ top_typeList[row.sort_type.toString()] }}</span></template>
        </el-table-column>
        <el-table-column prop="top_total_count" label="置顶商品总数" align="center" min-width="100px" />
        <el-table-column prop="toped_count" label="已置顶商品数" align="center" min-width="100px" />
        <el-table-column prop="created_at" label="任务创建时间" align="center" min-width="150px" />
        <el-table-column prop="next_top_time" label="下次置顶时间" align="center" min-width="150px" />
        <el-table-column prop="topping_goods_ids" label="置顶商品" align="center" min-width="180px" show-overflow-tooltip>
          <!-- <template slot-scope="{ row }">
            <el-tooltip v-if="row.all_good_ids" effect="dark" placement="top-start">
              <div slot="content" style="max-width: 200px; height: auto">{{ row.all_good_ids }}</div>
              <span type="text" class="bindmallclass">{{ row.all_good_ids }}</span>
            </el-tooltip>
          </template> -->
        </el-table-column>
        <el-table-column prop="message" label="操作结果" align="center" min-width="180px" show-overflow-tooltip />
        <el-table-column prop="" label="历史记录" align="center" min-width="150px">
          <template v-slot="{row}"><el-button size="mini" type="primary" @click="checkRecord(row)">查看置顶记录</el-button></template></el-table-column>
        <el-table-column prop="" label="操作" align="center" min-width="100px" fixed="right">
          <template v-slot="{row}"><el-button size="mini" type="primary" @click="delTeskFun(row)">删除</el-button></template></el-table-column>
      </el-table>
      <div class="pagination" style="display: flex; justify-content: flex-end">
        <el-pagination
          background
          :current-page.sync="page"
          :page-sizes="[15, 50, 100, 200]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <el-dialog
      title="置顶记录"
      top="3vh"
      :visible.sync="dialogRecord"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="600px"
    >
      <div>
        <el-table
          :data="recordList"
          :header-cell-style="{ background: '#f7fafa' }"
          :row-style="{
            color: 'black',
            height: '50px',
          }"
          max-height="400px"
        >
          <el-table-column type="index" label="序号" width="55" />
          <el-table-column prop="log_time" label="记录时间" min-width="150" sortable />
          <el-table-column prop="log_message" label="历史信息" min-width="280" show-overflow-tooltip="" />
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="dialogRecord = false">关 闭</el-button>
      </span>
    </el-dialog>
    <Logs ref="Logs" v-model="showlog" clear />
    <div class="on_new_dialog">
      <el-dialog
        :visible.sync="goodsItemSelectorVisible"
        top="7vh"
        title="商品选择"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        width="1280px"
      >
        <goodsItemSelector v-if="goodsItemSelectorVisible" :is-need-filter-act="true" :mall="selectMalllist" @changeGoodsItem="changeGoodsItem" />
      </el-dialog>
    </div>
  </div>
</template>
<script>
import GoodsList from '../../../module-api/goods-manager-api/goods-list'
import storeChoose from '../../../components/store-choose'
import goodsItemSelector from '../../../components/goods-item-selector'
import { GoodsMallgetValue, getMalls, waitStart, batchOperation, terminateThread } from '../../../util/util'
import MarketManagerAPI from '../../../module-api/market-manager-api/market-data'
import MallManagerAPI from '@/module-api/market-activity-api/ai-addFence'
export default {
  components: {
    storeChoose, goodsItemSelector
  },
  data() {
    return {
      MallAPIInstance: new MallManagerAPI(this),
      goodsItemSelectorVisible: false,
      dialogRecord: false,
      stoptoping: false,
      createDel: false,
      MarketManagerAPIInstance: new MarketManagerAPI(this),
      loading: false,
      GoodsList: new GoodsList(this),
      top_typeList: {
        '0': '自定义商品',
        '1': '商品ID',
        '2': '默认排序',
        '3': '销量从低往高',
        '4': '销量从高往低',
        '5': '价格从低往高',
        '6': '价格从高往低'
      },
      // 分页
      page: 1,
      pageSize: 15,
      total: 0,
      //
      showlog: true,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < (new Date().getTime() - 3600 * 1000 * 24)
        }
      },
      cloumn_date: '',
      set_time: '1', // 时间设置 1当前时间 2自定义时间
      otherConditon: '2', // 1 自定义商品id 2.商品其他顺序
      saleType: '2', // 筛选商品条件
      loopGoodsNum: '',
      tableList: [],
      selectMalllist: [], // 选择店铺
      // shopAccountList: [],
      selectTable: [], // 表格多选
      topHistoryMsg: [], // 历史记录
      recordList: [],
      currentDate: '', // 当前行
      createTag: false,
      couponGoodslist: [], // 选择的商品
      topok: 0 // 置顶成功数
    }
  },
  async mounted() {
    // await this.getInfo()
  },
  methods: {
    // 添加商品
    addGoods() {
      if (this.selectMalllist.length > 1) {
        this.$message.warning('选择自定义商品时,只能选择一个店铺')
        return
      }
      this.goodsItemSelectorVisible = true
    },
    // 获取选择的商品
    changeGoodsItem(val) {
      if (val) {
        this.loopGoodsNum = val.goodsList.length
        console.log(val)
        this.couponGoodslist = val.goodsList.map(el => { return el.itemid })
      }
      console.log(this.couponGoodslist)
      this.goodsItemSelectorVisible = false
    },
    // 清除日志
    clearLog() {
      this.$refs.Logs.consoleMsg = ''
    },
    // 重新获取置顶信息
    async refreshTopGoods() {
      this.showlog = false
      if (!this.selectTable.length) {
        this.$message.warning('请选择需要操作的数据!')
        return
      }
      if (this.set_time === '2' && !this.cloumn_date) {
        if (this.cloumn_date < new Date().getTime()) {
          this.$message.warning('置顶时间不能晚于当前时间')
          return
        }
        this.$message.warning('请设置任务执行时间')
        return
      }
      // 自定义商品
      if (this.otherConditon === '1' && !this.couponGoodslist.length) {
        this.$message.warning('请选择自定义商品')
        return
      }

      if (this.otherConditon === '2' && !this.loopGoodsNum) {
        this.$message.warning('请设置任务执行的商品个数')
        return
      }
      console.log('this.selectMalllist', this.selectMalllist)
      console.log('this.selectTable', this.selectTable)
      const mallList = []
      for (const mall of this.selectTable) {
        const index = this.selectMalllist.findIndex(el => { return el.platform_mall_id === Number(mall.mall_id) })
        if (index >= 0) {
          mallList.push(this.selectMalllist[index])
        }
      }
      this.$refs.Logs.writeLog(`正在重新获取任务`, true)
      await batchOperation(mallList, this.createTesk)
      this.$refs.Logs.writeLog(`任务获取完成`, true)
      this.getTopTestTable()
    },
    // 查看置顶记录
    async checkRecord(val) {
      this.dialogRecord = true
      const res = await window.BaseUtilBridgeService.getTopGoodsHistory(val.mall_id)
      this.recordList = res
      if (!res) {
        this.$message.warning('置顶历史数据获取失败')
      }
    },
    // 初始化任务列表
    async getTopTestTable() {
      console.log('----------')
      this.tableList = []
      this.showlog = false
      this.$refs.Logs.writeLog(`正在获取列表信息......`, true)
      const params = this.selectMalllist.map(item => item['platform_mall_id']).toString()
      const alltest = await window.BaseUtilBridgeService.getTopGoodsTask(params)
      console.log('任务列表', alltest)
      if (!alltest.length) {
        this.$refs.Logs.writeLog(`当前暂无置顶任务`, true)
      }
      this.tableList = alltest
      this.$refs.Logs.writeLog(`列表信息获取结束`, true)
    },
    // 获取置顶商品
    async getMallTopGoods(mall, loopGoodsNum) {
      const mItem = {
        country: mall.country,
        pageNumber: 0,
        platform_mall_id: mall.platform_mall_id
      }
      const params = {
        mItem: mItem,
        pageSize: 48,
        listType: 'all'
      }
      if (mall.top_type === '3') {
        params.listOrderType = 'sales_asc'
      }
      if (mall.top_type === '4') {
        params.listOrderType = 'sales_dsc'
      }
      if (mall.top_type === '5') {
        params.listOrderType = 'price_asc'
      }
      if (mall.top_type === '6') {
        params.listOrderType = 'price_dsc'
      }
      const flag = true
      const willtopGoodsList = []
      while (flag) {
        mItem['pageNumber']++
        const res = await this.GoodsList.getMpskuList(params)
        if (res.code === 200) {
          if (!res.data.list?.length) {
            this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】暂无商品数据`)
            return []
          }
          const resGoodsList = res.data.list
          for (const Goods of resGoodsList) {
            const item = {}
            item['mall_id'] = mall.platform_mall_id.toString()
            item['goods_id'] = Goods.id.toString()
            item['is_top'] = '0'
            const push_res = await window.BaseUtilBridgeService.saveTopGoods(item) // 上报置顶商品表
            console.log('---', push_res)
            if (push_res.code !== '200') {
              this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】${Goods.id}上报失败`, false)
              this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】任务创建失败`, false)
              return []
            }
            willtopGoodsList.push({ id: Goods.id })
            if (willtopGoodsList.length >= loopGoodsNum) return willtopGoodsList
          }
        } else {
          return []
        }
      }
      return willtopGoodsList
    },
    // 置顶商品
    async topAction(item) {
      const query = {
        country: item.country,
        mallId: item.sys_mall_id,
        goodsID: item.id
      }
      console.log('置顶', item)
      const res = await this.MarketManagerAPIInstance.topGoods(query)
      if (res.ecode === 0) {
        // 上报历史记录
        const res_record = await window.BaseUtilBridgeService.saveTopGoodsHistory({
          'country': item.country,
          'mall_name': item.mallName,
          'mall_id': item.sys_mall_id,
          'log_time': this.formatTime(new Date().getTime()),
          'log_message': '商品置顶成功'
        })
        this.$refs.Logs.writeLog(`店铺【${item.mallName}】商品【${item.id}】置顶成功`, true)
        return true
      } else {
        // 上报历史记录
        const res_record = await window.BaseUtilBridgeService.saveTopGoodsHistory({
          'country': item.country,
          'mall_name': item.mallName,
          'mall_id': item.sys_mall_id,
          'log_time': this.formatTime(new Date().getTime()),
          'log_message': `商品【${item.id}】置顶失败${res.message}`
        })
        this.$refs.Logs.writeLog(`店铺【${item.mallName}】商品【${item.id}】置顶失败${res.message}`, false)
        return false
      }
    },

    // 停止
    stopdTesk() {
      terminateThread()
      this.stoptoping = true
      this.$refs.autoReplyLogs.writeLog(`正在停止创建任务`)
    },
    // 多选
    handleSelectionChange(val) {
      this.selectTable = val
    },
    // 删除
    delTeskFun(val) {
      if (!val) {
        if (!this.selectTable.length) {
          this.$message.warning('请选择要操作的数据！')
          return
        }
      }
      this.$confirm(`确定删除这些任务吗`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        if (val) {
          await this.delTesk(val)
          this.getTopTestTable()
        } else {
          for (let i = 0; i < this.selectTable.length; i++) {
            await this.delTesk(this.selectTable[i])
          }
          this.getTopTestTable()
        }
      })
    },
    async  delTesk(val) {
      const res1 = await window.BaseUtilBridgeService.deleteTopGoodsTask(val.mall_id)// 删除置顶任务
      const res2 = await window.BaseUtilBridgeService.deleteTopGoods(val.mall_id)// 删除置顶商品表
      const res3 = await window.BaseUtilBridgeService.deleteTopGoodsHistory(val.mall_id)// 删除商品置顶历史记录
      console.log(res1, res2, res3)
      if (res1.code === '200' && res2.code === '200' && res3.code === '200') {
        this.$refs.Logs.writeLog(`${val.mall_name}删除成功`, true)
      } else {
        this.$refs.Logs.writeLog(`删除失败:${res1.msg || res2.msg || res3.msg}`, false)
      }
    },
    // 判断用户是否登录
    async isLogin(mall) {
      const res = await this.MallAPIInstance.isLogin(mall)
      if (res.code === 200 && res.data) {
        return true
      } else {
        this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】店铺未登录`, false)
        return false
      }
    },
    // 分页
    handleSizeChange(val) { this.pageSize = val; this.getTopTestTable() },
    handleCurrentChange(val) { this.page = val; this.getTopTestTable() },
    // 获取选择的店铺
    changeMallList(val) {
      this.selectMalllist = val
    },
    // 创建任务
    async createTeskFun() {
      if (!this.selectMalllist.length) {
        this.$message.warning('请选择要执行的任务的店铺')
        return
      }
      if (this.set_time === '2' && !this.cloumn_date) {
        if (this.cloumn_date < new Date().getTime()) {
          this.$message.warning('置顶时间不能晚于当前时间')
          return
        }
        this.$message.warning('请设置任务执行时间')
        return
      }
      // 自定义商品
      if (this.otherConditon === '1' && !this.couponGoodslist.length) {
        this.$message.warning('请选择自定义商品')
        return
      }

      if (this.otherConditon === '2' && !this.loopGoodsNum) {
        this.$message.warning('请设置任务执行的商品个数')
        return
      }
      this.showlog = false
      // 创建任务
      this.$refs.Logs.writeLog(`正在创建任务`, true)
      await batchOperation(this.selectMalllist, this.createTesk)
      this.$refs.Logs.writeLog(`任务创建结束`, true)
      this.getTopTestTable()
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
    async aaa() {
      // console.log(this.cloumn_date)
      const goodsinfo = {
        country: 'TH',
        mallId: '213693788',
        goodsID: 10053264472
      }
      // const res = await window.BaseUtilBridgeService.getTopGoods('213693788', '10053264472', 'true')
      const res = await window.BaseUtilBridgeService.saveTopGoods({ // 上报置顶商品表_更新
        mall_id: '227301094',
        goods_id: 11091517446,
        is_top: '1'
      })
      console.log(res)
    },
    // 创建任务-instance
    async createTesk(mall, count = { count: 1 }) {
      // 判断店铺是否登录
      const islogin = await this.isLogin(mall)
      if (!islogin) {
        return
      }
      try {
        // 查询该店铺是否存在任务
        const gettesk = await window.BaseUtilBridgeService.getTopGoodsTask(mall.platform_mall_id)
        // 存在立即删除原任务
        if (gettesk.length) {
          this.$refs.Logs.writeLog(`任务更新`, true)
          await this.delTesk({ mall_id: mall.platform_mall_id, mall_name: mall.mall_alias_name || mall.platform_mall_name })
        }
        // 上报置顶商品表
        let topGoods = []
        if (this.otherConditon === '1') {
          for (const item of this.couponGoodslist) {
            const query = {}
            query['mall_id'] = (mall.platform_mall_id).toString()
            query['goods_id'] = item.toString()
            query['is_top'] = '0'
            const push_res = await window.BaseUtilBridgeService.saveTopGoods(query)
            if (push_res.code !== '200') {
              this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】${item.id}上报置顶商品表失败:${push_res.message}`, false)
              this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】任务创建失败`, false)
              return
            }
            topGoods.push({ id: item })
          }
        } else {
          topGoods = await this.getMallTopGoods(mall, this.loopGoodsNum)
          if (!topGoods) return
        }
        console.log('置顶商品表', topGoods)
        // 上报历史记录_置顶商品表
        await window.BaseUtilBridgeService.saveTopGoodsHistory({
          'country': mall.country,
          'mall_name': mall.mall_alias_name || mall.platform_mall_name,
          'mall_id': mall.platform_mall_id,
          'log_time': this.formatTime(new Date().getTime()),
          'log_message': `置顶商品表:${topGoods.map(el => { return el.id })}`
        })
        // 置顶
        const topedGoodsList = []
        if (this.set_time === '1') { // 立即执行
          for (let i = 0; i < topGoods.length; i++) {
            Object.assign(topGoods[i], {
              country: mall.country,
              sys_mall_id: mall.platform_mall_id,
              mallName: mall.mall_alias_name || mall.platform_mall_name
            })

            // 商品表状态更新
            console.log('.-.-.-.--.-', (topGoods[i].id).toString())
            const res_saveTopGoods = await window.BaseUtilBridgeService.saveTopGoods({
              mall_id: (mall.platform_mall_id).toString(),
              goods_id: (topGoods[i].id).toString(),
              is_top: '1'
            })
            console.log('............', res_saveTopGoods)
            if (res_saveTopGoods.code !== '200') {
              this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】更新置顶商品表失败:${res_saveTopGoods.message}`, false)
              this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】任务创建失败`, false)
              return
            }
            await this.topAction(topGoods[i])
            topedGoodsList.push(topGoods[i])
            if (i >= 4) break
          }
        } else { // 约定时间执行
          // 上报历史记录_置顶商品表
          await window.BaseUtilBridgeService.saveTopGoodsHistory({
            'country': mall.country,
            'mall_name': mall.mall_alias_name || mall.platform_mall_name,
            'mall_id': mall.platform_mall_id,
            'log_time': this.formatTime(new Date().getTime()),
            'log_message': `未到执行时间`
          })
        }
        // 已经置顶的商品
        const TopedGoods = await window.BaseUtilBridgeService.getTopGoods(mall.platform_mall_id.toString(), '1')
        // 置顶记录
        const recordeList = await window.BaseUtilBridgeService.getTopGoodsHistory(mall.platform_mall_id)
        // 上报壳里--创建任务
        const currentTime = new Date().getTime()
        const runTeskTime = this.set_time === '1' ? currentTime : this.cloumn_date
        const param = {
          'country': mall.country,
          'mall_name': mall.mall_alias_name || mall.platform_mall_name,
          'mall_id': mall.platform_mall_id,
          'top_task_type': gettesk ? 2 : 1, // 1 新建 2 重建
          'top_total_count': topGoods.length,
          'toped_count': TopedGoods.length,
          'sort_type': this.otherConditon === '1' ? '0' : this.saleType,
          'next_top_time': this.formatTime(runTeskTime + 3600 * 1000 * 4),
          'topping_goods_ids': topedGoodsList.map(el => { return el.id }).toString(),
          'message': recordeList[recordeList.length - 1]?.log_message,
          'created_at': this.formatTime(currentTime),
          'updated_at': this.formatTime(runTeskTime)
        }
        const newTesk = await window.BaseUtilBridgeService.saveTopGoodsTask(param)
        if (newTesk.code !== '200') {
          this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】任务创建失败`, false)
          this.$set(mall, '')
          return
        } else {
          this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】任务创建成功`, true)
        }
      } catch (error) {
        this.$refs.Logs.writeLog(`【${error}】`, false)
      } finally {
        --count.count
      }
    }
  }
}
</script>
<style lang="less" scoped>
 .detail{
   min-width: 1200px;
    .row2_left{
     li{
       display: flex;
       margin: 8px;
       .el-input{
         margin-right: 4px;
       }
       div{
         margin-right: 20px;
       }
     }
   }
   .row2_right{
     li{
       display: flex;
       margin: 8px;
        .el-input{
         margin-right: 4px;
       }
       div{
         margin-right: 20px;
       }
     }
   }
 }
</style>
