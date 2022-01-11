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
            <el-button size="mini" type="primary" @click="delTeskFun">批量删除任务</el-button>
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
              <el-input v-model="loopGoodsNum" size="mini" onkeyup="value=value.replace(/[^\d]/g,0)" style="width:60px" />
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
        <el-table-column prop="mallName" label="店铺名称" align="center" min-width="150px" />
        <el-table-column prop="top_type" label="置顶维度" align="center" min-width="150px">
          <template v-slot="{row}"><span>{{ top_typeList[row.top_type] }}</span></template>
        </el-table-column>
        <el-table-column prop="top_total_count" label="置顶商品总数" align="center" min-width="100px" />
        <el-table-column prop="toped_count" label="已置顶商品数" align="center" min-width="100px" />
        <el-table-column prop="created_at" label="任务创建时间" align="center" min-width="150px" />
        <el-table-column prop="next_top_time" label="下次置顶时间" align="center" min-width="150px" />
        <el-table-column prop="all_good_ids" label="置顶商品" align="center" min-width="100px">
          <template slot-scope="{ row }">
            <el-tooltip v-if="row.all_good_ids" effect="dark" placement="top-start">
              <div slot="content" style="max-width: 200px; height: auto">{{ row.all_good_ids }}</div>
              <span type="text" class="bindmallclass">{{ row.all_good_ids }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="result" label="操作结果" align="center" min-width="100px" />
        <el-table-column prop="" label="历史记录" align="center" min-width="150px">
          <template v-slot="{row}"><el-button size="mini" type="primary" @click="checkRecord(row.id)">查看置顶记录</el-button></template></el-table-column>
        <el-table-column prop="" label="操作" align="center" min-width="100px" fixed="right">
          <template v-slot="{row}"><el-button size="mini" type="primary" @click="delTesk(row.id)">删除</el-button></template></el-table-column>
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
      <!-- <span>这是一段信息</span> -->
      <div>
        <el-table
          :data="recordList"
          :header-cell-style="{ background: '#f7fafa' }"
          height="calc(100vh - 233px)"
          :row-style="{
            color: 'black',
            height: '50px',
          }"
        >
          <el-table-column type="index" label="序号" width="55" />
          <el-table-column prop="created_at" label="记录时间" min-width="150" sortable />
          <el-table-column prop="top_history_msg" label="历史信息" min-width="280" />
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
        <goodsItemSelector v-if="goodsItemSelectorVisible" :mall="selectMallList" @changeGoodsItem="changeGoodsItem" />
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
import { forEach } from 'jszip'
export default {
  components: {
    storeChoose, goodsItemSelector
  },
  data() {
    return {
      goodsItemSelectorVisible: false,
      dialogRecord: false,
      stoptoping: false,
      createDel: false,
      MarketManagerAPIInstance: new MarketManagerAPI(this),
      loading: false,
      GoodsList: new GoodsList(this),
      top_typeList: {
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
      shopAccountList: [],
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
    await this.getInfo()
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
        this.couponGoodslist = val.goodsList
      }
      this.goodsItemSelectorVisible = false
    },
    // 清除日志
    clearLog() {
      this.$refs.Logs.consoleMsg = ''
    },
    // 重新获取置顶信息
    refreshTopGoods() {
      if (!this.selectTable.length) {
        this.$message.warning('请选择需要操作的数据!')
      }
      // 选择商品
      if (this.otherConditon === '1') {
        // goodsID=NULL
        this.$message.warning('商品ID不能为空！')
      }
      // 其他维度
      if (this.otherConditon === '0') {
      }
    },
    // 查看置顶记录
    async checkRecord(val) {
      this.dialogRecord = true
      const param = {
        topTaskId: val
      }
      const res = await this.$api.getTopHistory(param)
      if (res.data.code === 200) {
        this.recordList = res.data.data.data
      } else {
        this.$refs.Logs.writeLog(`置顶记录获取失败`)
      }
    },
    // 初始化任务列表
    async getTopTestTable() {
      this.showlog = false
      this.$refs.Logs.writeLog(`正在获取列表信息......`, true)
      const params = {
        country: this.selectMalllist[0]?.country || 'TH',
        pageSize: this.pageSize,
        page: this.page
      }
      const res = await this.$api.topTask(params)
      if (res.data.code === 200) {
        this.page = res.data.data.current_page
        this.total = res.data.data.total
        const list = res.data.data.data
        list.forEach(el => {
          el.mallName = GoodsMallgetValue(this.shopAccountList, 'label', 'value', el.sys_mall_id)
        })
        this.tableList = list
        this.$refs.Logs.writeLog(`获取列表信息完毕`, true)
      } else {
        this.$message.error(`列表获取失败--${res.message}`, false)
      }
    },
    // 初始化获取置顶任务---会执行一次置顶
    async getTopTest() {
      this.showlog = false
      this.$refs.Logs.writeLog(`正在获取置顶任务......`)
      const res = await this.$api.topTask()
      if (res.data.code === 200) {
        this.$refs.Logs.writeLog(`获取置顶任务成功`, true)
        this.page = res.data.data.current_page
        this.total = res.data.data.total
        const list = res.data.data.data
        await batchOperation(list, this.checkMall)// 检测店铺--执行置顶
        await this.getTopTestTable()
      } else {
        this.$message.error(`任务获取失败--${res.message}`, false)
      }
    },
    // 校验店铺
    async checkMall(item, count = { count: 1 }) {
      try {
        const mallName = GoodsMallgetValue(this.shopAccountList, 'label', 'value', item.sys_mall_id)
        // 店铺校验
        if (!mallName) {
          this.$refs.Logs.writeLog(`【${item.sys_mall_id}】店铺不存在`, false)
          this.topHistoryMsg.push({ topHistoryMsg: '店铺不存在' })
          return
        }
        const nextTopTime = new Date(item.next_top_time).getTime()
        const currentTime = new Date().getTime()
        // 时间校验
        if (nextTopTime > currentTime && !this.createTag) {
          this.$refs.Logs.writeLog(`【${mallName}】店铺,未到置顶时间`, true)
          // this.topHistoryMsg.push({ topHistoryMsg: '未到置顶时间，下次置顶时间为' + item.next_top_time })
          return
        }
        // 商品校验
        if (Number(item.top_total_count) <= Number(item.toped_count)) {
          this.$refs.Logs.writeLog(`【${mallName}】店铺,已置顶完所有商品`)
          this.topHistoryMsg.push({ topHistoryMsg: '已置顶完所有商品' })
          return
        }
        // 通过其他维度获取商品-置顶
        if (Number(item.top_type) !== 1) {
          item.page = 1
          item.mallName = mallName
          await this.getMallTopGoods(item)// 获取置顶商品
        }
        // 通过商品ID置顶
        if (Number(item.top_type) === 1) {

        }
      } catch (error) {
        this.$refs.Logs.writeLog(`catch--【${item.sys_mall_id}】,${error}`, false)
      } finally {
        count.count--
      }
    },
    // 获取置顶商品
    getMallTopGoods(val) {
      return new Promise(async rej => {
        const mItem = {
          country: val.country,
          pageNumber: val.page,
          platform_mall_id: val.sys_mall_id
        }
        const params = {
          mItem: mItem,
          pageSize: 48,
          listType: 'all'
        }
        if (val.top_type === '3') {
          params.listOrderType = 'sales_asc'
        }
        if (val.top_type === '4') {
          params.listOrderType = 'sales_dsc'
        }
        if (val.top_type === '5') {
          params.listOrderType = 'price_asc'
        }
        if (val.top_type === '6') {
          params.listOrderType = 'price_dsc'
        }
        // 获取商品数据
        this.$refs.Logs.writeLog(`【${val.mallName}】获取商品数据`, true)
        const loop = Number(val.top_total_count) <= 48 ? 1 : Math.floor(Number(val.top_total_count) / 48) + 1
        const resultList = []
        for (let i = 0; i < loop; i++) {
          params.mItem.pageNumber = i + 1
          try {
            const res = await this.GoodsList.getMpskuList(params)
            if (res.code === 200) {
              if (!res.data.list?.length) {
                this.$refs.Logs.writeLog(`【${val.mallName}】暂无商品数据`)
                rej()
              }
              resultList.push(...res.data.list)
            } else {
              this.$refs.Logs.writeLog(`获取店铺【${val.mallName}】商品数据获取失败,${res.data}`, false)
              rej()
            }
          } catch (error) {
            this.$refs.Logs.writeLog(`获取店铺【${val.mallName}】商品数据获取失败,catch---${error}`, false)
            rej()
          }
        }
        let loopGoodsNum = [] // 置顶的商品数
        resultList.forEach(el => {
          el.country = val.country
          el.sys_mall_id = val.sys_mall_id
          el.topTaskId = val.id
          el.mallName = val.mallName
          el.top_total_count = val.top_total_count
          el.toped_count = val.toped_count
        })
        // 上报所有置顶商品
        const topGoods = []
        loopGoodsNum = resultList.splice(0, val.top_total_count)// 截取需要上报的商品
        loopGoodsNum.forEach(al => {
          topGoods.push({ goodsId: al.id.toString(), isTop: 0 })
        })
        this.$refs.Logs.writeLog(`【${val.mallName}】获取置顶商品【${loopGoodsNum.length}】条`, true)
        const topServiceQuery = {
          list: [{
            topTaskId: val.id.toString(),
            topGoods: topGoods
          }]
        }
        const res2 = await this.$api.uploadTopGood(topServiceQuery)
        if (res2.data.code !== 200) {
          this.$refs.Logs.writeLog(`【${val.mallName}】商品上报失败，${res2.data.data.errors}`, false)
        }
        this.$refs.Logs.writeLog(`【${val.mallName}】商品上报成功`, true)
        // 执行首次五个置顶
        for (let i = 0; i < 5; i++) {
          if (loopGoodsNum[i]) {
            await this.topAction(loopGoodsNum[i])
          }
        }
        // 更新置顶信息
        const params4 = [{
          id: val.id.toString(),
          topTotalCount: val.top_total_count,
          topedCount: val.toped_count + this.topok
        }]
        debugger
        const res4 = await this.$api.topTaskUpdate(params4)
        if (res4.code === 200) {
          this.$refs.Logs.writeLog(`店铺【${val.mallName}】商品置顶更新成功`, true)
        } else {
          this.$refs.Logs.writeLog(`店铺【${val.mallName}】商品置顶更新失败${res4.message}`, false)
        }
        this.topok = 0
        rej()
      })
    },
    // 置顶步骤
    async topAction(item) {
      try {
        // 置顶商品
        const query = {
          country: item.country,
          mallId: item.sys_mall_id,
          goodsID: item.id
        }
        const res1 = await this.MarketManagerAPIInstance.topGoods(query)
        const topServiceQuery = {
          list: [{
            topTaskId: item.topTaskId.toString(),
            topGoods: [{
              goodsId: item.id.toString(),
              isTop: 0
            }]
          }]
        }
        if (res1.ecode === 0) {
          topServiceQuery.list[0].topGoods[0].isTop = 1
          this.topok++
          this.$refs.Logs.writeLog(`店铺【${item.mallName}】商品【${item.id}】置顶成功`, true)
          this.topHistoryMsg.push({ topHistoryMsg: `商品【${item.id}】置顶成功` })
        } else {
          this.$refs.Logs.writeLog(`店铺【${item.mallName}】商品【${item.id}】置顶失败${res1.message}`, false)
          this.topHistoryMsg.push({ topHistoryMsg: `商品【${item.id}】置顶失败${res1.message}` })
        }

        // 上报置顶商品
        const res2 = await this.$api.uploadTopGood(topServiceQuery)
        if (res2.data.code !== 200) {
          this.$refs.Logs.writeLog(`【商品${item.id}】上报失败，${res2.data.data.errors}`, false)
        }
        this.$refs.Logs.writeLog(`【商品${item.id}】上报成功`, true)
        // 上报置顶商品历史记录
        const params3 = {
          list: [{
            topTaskId: item.topTaskId.toString(),
            topHistory: this.topHistoryMsg
          }]
        }
        const res3 = await this.$api.uploadTopHistory(params3)
        if (res3.data.code !== 200) {
          this.$refs.Logs.writeLog(`【商品${item.id}】历史记录上传失败，${res3.data.message}`, false)
        } else {
          this.$refs.Logs.writeLog(`【商品${item.id}】历史记录上传成功`, true)
        }
      } catch (error) {
        this.$refs.Logs.writeLog(`【商品${item.id}】操作失败----catch${error}`, false)
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
    delTeskFun() {
      if (!this.selectTable.length) {
        this.$message.warning('请选择要操作的数据！')
        return
      }
      this.$confirm(`确定删除这些任务吗`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        this.delTesk()
      })
    },
    async  delTesk(val) {
      const list = []
      if (val) { // 单个删除
        list.push(val)
      } else { // 批量删除
        this.selectTable.forEach(el => {
          list.push(el.id)
        })
      }
      const param = {
        ids: list.toString()
      }
      try {
        const res = await this.$api.topTaskdel(param)
        if (res.data.code === 200) {
          // if (!this.createDel) { // 创建删除为假
          //   this.$message.success('删除成功')
          // }
          this.$message.success('删除成功')
        } else {
          const list = res.data.data
          list.forEach(el => {
            this.$refs.Logs.writeLog(`【${el}】`, false)
          })
        }
      } catch (error) {
        this.$refs.Logs.writeLog(`【${error}】`, false)
      }
      this.getTopTestTable()
    },
    // 获取店铺信息
    async getInfo() {
      getMalls().then(res => {
        this.shopAccountList = res // 所有店铺
        // this.getTeskInfo()// 获取上报任务
        // this.getTopTest()
      })
    },
    // 分页
    handleSizeChange(val) { this.pageSize = val; this.getTopTestTable() },
    handleCurrentChange(val) { this.page = val; this.getTopTestTable() },
    // 获取选择的店铺
    changeMallList(val) {
      this.selectMalllist = val
    },
    // // 获取当前时间
    // timeinfo() {
    //   const d = new Date()
    //   const d1 = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours() >= 10 ? d.getHours() : 0 + d.getHours()}:${d.getMinutes() >= 10 ? d.getMinutes() : 0 + d.getMinutes()}:${d.getSeconds() >= 10 ? d.getSeconds() : 0 + d.getSeconds()}`
    //   return d1
    // },
    // 创建任务
    createTeskFun() {
      if (!this.selectMalllist.length) {
        this.$message.warning('请选择要执行的任务的店铺')
        return
      }
      if (this.set_time === '2' && !this.cloumn_date) {
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
      this.createTesk()// 创建任务
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
      const goodsinfo = {
        country: 'TH',
        mallId: '213693788',
        goodsID: 10053264472
      }
      const res = await this.MarketManagerAPIInstance.topGoods(goodsinfo)
      debugger
    },
    // 创建任务
    // 1.删除原任务--创建新任务
    // 2.是否执行当前任务
    // 3.搜索商品
    // 4.置顶
    // 5.上报置顶商品
    // 6.上报置顶记录
    async createTesk() {
      if (this.set_time !== '1' && this.cloumn_date < new Date().getTime()) {
        this.$message.warning('请选择正确的创建任务时间')
        return
      }
      //  删除原任务
      this.createDel = true
      for (let i = 0; i < this.tableList.length; i++) {
        const num = this.selectMalllist.findIndex(ol => { return this.tableList[i].sys_mall_id === Number(ol.platform_mall_id) })
        if (num >= 0) {
          await this.delTesk(this.tableList[i].id)
        }
      }
      // 创建新任务
      this.createTag = true
      const arr = []
      this.selectMalllist.forEach(el => {
        const item = {
          country: el.country,
          sysMallId: el.platform_mall_id,
          topType: this.otherConditon === '1' ? this.otherConditon : this.saleType,
          topTotalCount: this.loopGoodsNum,
          topedCount: '0', // 从上报服务获取
          nextTopTime: this.set_time === '1' ? this.formatTime(new Date().getTime() + 4 * 60 * 60 * 1000) : this.formatTime(this.cloumn_date + 4 * 60 * 60 * 1000), // 从上报服务获取
          result: ''
        }
        arr.push(item)
      })
      const params = { list: arr }
      try {
        this.showlog = false
        this.$refs.Logs.writeLog(`正在创建任务......,请耐心等待几秒`, true)
        const res = await this.$api.topTaskadd(params)
        if (res.data.code === 200) {
          this.$refs.Logs.writeLog(`任务创建成功`, true)
          const top_tasks = res.data.data.top_tasks || ''
          const success = res.data.data.success || ''
          const errorlist = res.data.data.error || ''
          if (success?.length) {
            errorlist.forEach(el => {
              this.$refs.Logs.writeLog(`${el}`, true)
            })
          }
          await this.getTopTest()// 获取置顶任务
          this.createDel = false
        } else {
          this.$refs.Logs.writeLog(`任务创建--请求失败:${res.data.message}`, false)
        }
      } catch (error) {
        this.$refs.Logs.writeLog(`任务创建--请求失败--catch${error}`, false)
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
