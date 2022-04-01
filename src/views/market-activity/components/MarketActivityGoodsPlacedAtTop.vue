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
      const params = this.selectMalllist.map(item => item['platform_mall_id']).toString()
      const alltest = await window.BaseUtilBridgeService.getTopGoodsTask(params)
      if (!alltest.length) {
        this.$refs.Logs.writeLog(`当前暂无置顶任务`, true)
      }
      this.$refs.Logs.writeLog(`列表信息获取结束`, true)
    },
    // 初始化获取置顶任务---会执行一次置顶
    async getTopTest() {
      this.showlog = false
      this.$refs.Logs.writeLog(`正在获取置顶任务......`)
      const res = await window.BaseUtilBridgeService.getTopGoodsTask()
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
    // 获取置顶商品 (top_total_count 需要计算)
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
      let flag = true
      const willtopGoodsIdNum = 0
      const willtopGoodsList = []
      while (flag) {
        mItem['pageNumber']++
        const res = await this.GoodsList.getMpskuList(params)
        if (res.code === 200) {
          if (!res.data.list?.length) {
            this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】暂无商品数据`)
            flag = false
            break
          }
          const resgoodsList = res.data.list
        } else {
          flag = false
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
      const res = await this.MarketManagerAPIInstance.topGoods(query)
      if (res.ecode === 0) {
        this.$refs.Logs.writeLog(`店铺【${item.mallName}】商品【${item.id}】置顶成功`, true)
        return true
      } else {
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
    async createTeskFun() {
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
      // 创建任务
      this.$refs.Logs.writeLog(`正在创建任务`, true)
      await batchOperation(this.selectMalllist, this.createTesk)
      this.$refs.Logs.writeLog(`任务创建结束`, true)
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
      const res = await window.BaseUtilBridgeService.getTopGoods('1', '213693788')
      console.log(res)
    },
    // 创建任务
    // 1.删除原任务--创建新任务
    // 2.是否执行当前任务
    // 3.搜索商品
    // 4.置顶
    // 5.上报置顶商品
    // 6.上报置顶记录
    async createTesk(mall, count = { count: 1 }) {
      try {
        // 查询该店铺是否存在任务
        const gettesk = await window.BaseUtilBridgeService.getTopGoodsTask(mall.platform_mall_id)
        // 存在立即删除原任务
        if (gettesk) {
          await window.BaseUtilBridgeService.deleteTopGoodsTask(mall.platform_mall_id)
        }
        // 上报置顶商品表
        const top_total_count = 0 // 需要置顶商品数
        if (this.otherConditon === '1') { // 自定义商品
          //  this.couponGoodslist.map(el => {
          for (const item of this.couponGoodslist) {
            item['mall_id'] = mall.platform_mall_id
            item['goods_id'] = item.id
            item['is_top'] = 'false'
            await window.BaseUtilBridgeService.saveTopGoods(item)
          }
        } else {
          // top_total_count = this.loopGoodsNum
          topGoods = await this.getMallTopGoods(mall, this.loopGoodsNum)
        }
        // 获取置顶商品
        let topGoods = []
        if (this.otherConditon === '1') { // 自定义商品
          topGoods = this.couponGoodslist
        } else {
          mall['top_type'] = this.saleType
          topGoods = await this.getMallTopGoods(mall, top_total_count)
        }
        // 置顶
        for (const goods of topGoods) {
          Object.assign(goods, {
            country: mall.country,
            sys_mall_id: mall.platform_mall_id
          })
          await this.topAction(goods)
        }
        // 上报壳里--创建任务
        const currentTime = new Date().getTime()
        const param = {
          'country': mall.country,
          'mall_name': mall.mall_alias_name || mall.platform_mall_name,
          'mall_id': mall.platform_mall_id,
          'top_task_type': gettesk ? 2 : 1, // 1 新建 2 重建
          'top_total_count': top_total_count,
          'toped_count': gettesk.toped_count || 0,
          'next_top_time': this.formatTime(currentTime + 3600 * 1000 * 4),
          'topping_goods_ids': top_total_count,
          'message': '任务创建成功',
          'created_at': this.formatTime(currentTime),
          'updated_at': this.formatTime(currentTime)
        }
        debugger
        const newTesk = await window.BaseUtilBridgeService.saveTopGoodsTask(param)
        if (newTesk.code !== 200) {
          this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】创建失败`, false)
          return
        }

        // const currentTime = new Date().getTime()
        // // 创建
        // const param = {
        //   'country': mall.country,
        //   'mall_name': mall.mall_alias_name || mall.platform_mall_name,
        //   'mall_id': mall.platform_mall_id,
        //   'top_task_type': isCreatedtesk, // 1 新建 2 重建
        //   'top_total_count': top_total_count,
        //   'toped_count': gettesk.toped_count || 0,
        //   'next_top_time': this.formatTime(currentTime + 3600 * 1000 * 4),
        //   'topping_goods_ids': top_total_count,
        //   'message': '任务创建成功',
        //   'created_at': this.formatTime(currentTime),
        //   'updated_at': this.formatTime(currentTime)
        // }
        // debugger
        // const newTesk = await window.BaseUtilBridgeService.saveTopGoodsTask(param)
        // if (newTesk.code !== 200) {
        //   this.$refs.Logs.writeLog(`【${mall.mall_alias_name || mall.platform_mall_name}】创建失败`, false)
        //   return
        // }
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
