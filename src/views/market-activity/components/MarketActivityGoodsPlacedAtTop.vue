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
            <el-button size="mini" type="primary">搜索任务</el-button>
            <el-button size="mini" type="primary" @click="delTesk()">批量删除任务</el-button>
            <el-checkbox
              v-model="showlog"
              style="margin-left:10px"
            >隐藏日志</el-checkbox>
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
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :picker-options="pickerOptions"
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
              <el-button v-if="otherConditon==='1'" size="mini" type="primary">添加商品</el-button>
            </div>
          </li>
          <li style="align-items: baseline;">
            <div>循环置顶商品个数：
              <el-input v-model="loopGoodsNum" size="mini" onkeyup="value=value.replace(/[^\d]/g,0)" style="width:60px" />
              <el-button size="mini" type="primary" style="margin-left:32px" @click="createTeskFun">创建任务</el-button>
              <el-button size="mini" type="primary">重新获取置顶商品</el-button>
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
      >
        <el-table-column type="selection" width="55" fixed />
        <el-table-column type="index" fixed label="序号" />
        <el-table-column prop="mallName" label="店铺名称" align="center" min-width="150px" fixed />
        <el-table-column prop="top_type" label="置顶维度" align="center" min-width="150px">
          <template v-slot="{row}"><span>{{ top_typeList[row.top_type] }}</span></template>
        </el-table-column>
        <el-table-column prop="top_total_count" label="置顶商品总数" align="center" min-width="100px" />
        <el-table-column prop="toped_count" label="已置顶商品数" align="center" min-width="100px" />
        <el-table-column prop="created_at" label="任务创建时间" align="center" min-width="150px" />
        <el-table-column prop="next_top_time" label="下次置顶时间" align="center" min-width="150px" />
        <el-table-column prop="toppingGoodsID" label="正在置顶商品" align="center" min-width="100px" />
        <el-table-column prop="result" label="操作结果" align="center" min-width="100px" />
        <el-table-column prop="" label="历史记录" align="center" min-width="100px">
          <template><el-button size="mini" type="primary">查看置顶记录</el-button></template></el-table-column>
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
    <Logs ref="Logs" v-model="showlog" clear />
  </div>
</template>
<script>
import GoodsList from '../../../module-api/goods-manager-api/goods-list'
import storeChoose from '../../../components/store-choose'
import { GoodsMallgetValue, getMalls, waitStart } from '../../../util/util'
import { forbidTHData } from '@/views/order-manager/components/orderCenter/orderCenter'
export default {
  components: {
    storeChoose
  },
  data() {
    return {
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
      // cloumn_date: '',
      set_time: '1', // 时间设置 1当前时间 2自定义时间
      otherConditon: '2', // 1 自定义商品id 2.商品其他顺序
      saleType: '2', // 筛选商品条件
      loopGoodsNum: '',
      tableList: [],
      selectMalllist: [], // 选择店铺
      shopAccountList: []
    }
  },
  computed: {
    cloumn_date() {
      const d = new Date()
      return `${d.getFullYear()}-${(d.getMonth() + 1)}- ${d.getDate()}  ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    }
  },
  mounted() {
    // this.cloumn_date = new Date().getTime()
    this.getInfo()
  },
  methods: {
    delTeskFun() {
      if (!this.selectMalllist.length) {
        this.$message.warning('请选择要操作的数据！')
        return
      }
      this.delTesk()
    },
    // 删除
    async  delTesk(val) {
      const list = []
      if (val) { // 单个删除
        list.push(val)
      } else { // 批量删除
        this.selectMalllist.forEach(el => {
          list.push(el.id)
        })
      }
      debugger
      const param = {
        ids: list.toString()
      }
      const res = await this.$api.topTaskdel(param)
      debugger
      // if (res.code===200) {
      //   this.$message.warning
      // }
    },
    // 获取商品信息
    async getMallList(val) {
      const mItem = {
        country: val.country,
        pageNumber: val.page,
        platform_mall_id: val.sys_mall_id
      }
      const params = {
        mItem: mItem,
        pageSize: 48,
        listType: 'all'
        // listOrderType: ''
      }
      if (this.saleType === '3' && val.type === 'create') {
        params.listOrderType = 'sales_asc'
      }
      if (this.saleType === '4' && val.type === 'create') {
        params.listOrderType = 'sales_dsc'
      }
      if (this.saleType === '5' && val.type === 'create') {
        params.listOrderType = 'price_asc'
      }
      if (this.saleType === '6' && val.type === 'create') {
        params.listOrderType = 'price_dsc'
      }
      const res = await this.GoodsList.getMpskuList(params)
      if (res.code === 200) {
        if (res.data.list?.length) {
          return res.data.list
        }
      } else {
        this.showlog = false
        this.$refs.Logs.writeLog(`【${val.sys_mall_id}】商品获取失败${res.data}`, false)
        return null
      }
    },
    // 获取店铺信息
    async getInfo() {
      getMalls().then(res => {
        this.shopAccountList = res // 所有店铺
      })
      this.loading = true
      await waitStart(() => {
        return this.selectMallList && this.selectMallList[0] // 当前选择的店铺
      }, 50)
      this.getTeskInfo()// 获取上报任务
    },
    // 分页
    handleSizeChange(val) { this.pageSize = val; this.getTeskInfo() },
    handleCurrentChange(val) { this.page = val; this.getTeskInfo() },

    changeMallList(val) {
      this.selectMalllist = val
    },
    timeinfo() {
      const d = new Date()
      const d1 = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours() >= 10 ? d.getHours() : 0 + d.getHours()}:${d.getMinutes() >= 10 ? d.getMinutes() : 0 + d.getMinutes()}:${d.getSeconds() >= 10 ? d.getSeconds() : 0 + d.getSeconds()}`
      return d1
    },
    createTeskFun() {
      if (!this.selectMalllist.length) {
        this.$message.warning('请选择要执行的任务的店铺')
        return
      }
      if (this.set_time === '2' && !this.cloumn_date) {
        this.$message.warning('请设置任务执行时间')
        return
      }
      // 暂时没做
      // if (this.otherConditon==='1' && !this.goodsid.length) {
      //   this.$message.warning('请选择自定义商品信息')
      // }
      if (!this.loopGoodsNum) {
        this.$message.warning('请设置任务执行的商品个数')
        return
      }
      this.createTesk()
    },
    // 获取任务
    async getTeskInfo() {
      try {
        const params = {
          country: this.selectMalllist[0].country || 'TH' || '',
          pageSize: this.pageSize,
          page: this.page
        }
        this.tableList = []
        const res = await this.$api.topTask(params)
        this.loading = false
        if (res.data.code === 200) {
          this.page = res.data.data.current_page
          this.total = res.data.data.total
          const list = res.data.data.data
          for (let i = 0; i < list?.length; i++) {
            // 获取店铺名称
            list[i].mallName = GoodsMallgetValue(this.shopAccountList, 'label', 'value', list[i].sys_mall_id)
            // 置顶所需商品ID
            if (list[i].top_total_count) {
              const pageSize = Math.floor(list[i].top_total_count / 48) + 1
              const totalmall = []
              for (let j = 0; j < pageSize; j++) {
                const obj = {
                  country: params.country,
                  page: j + 1,
                  sys_mall_id: list[i].sys_mall_id }
                const goodsList = await this.getMallList(obj)
                if (!goodsList) { break }
                totalmall.push(goodsList)
              }
              list[i].toppingGoodsID = []
              const toppingGoodsList = totalmall.splice(list[i].toped_count, 5)
              // debugger
              toppingGoodsList.forEach(ol => {
                list[i].toppingGoodsID.push(ol.id)
              })
            }
            this.tableList.push(list[i])
          }
        } else {
          this.$message.error(`列表数据请求失败${res.message}`)
        }
      } catch (error) {
        this.$message.error(`列表数据请求失败-catch:${error}`)
      }
    },
    // 获取店铺商品信息
    // async getgoodsinfo() {

    //   for (let i = 0; i < this.selectMalllist.length; i++) {
    //     const goodsinfo = {
    //       country: item.country,
    //       page_number: item.page,
    //       mallId: item.platform_mall_id,
    //       page_size: 48
    //     }
    //     const res = await this.GoodsManagerAPIInstance.getSkuList(goodsinfo)
    //     if (res.ecode === 0) {

    //     } else {

    //     }
    //     this.loopGoodsNum
    //   }
    // },
    // 创建任务
    async createTesk() {
      const arr = []
      if (this.selectMalllist.length) {
        this.selectMalllist.forEach(el => {
          const obj = {
            country: el.country,
            sysMallId: el.platform_mall_id,
            topType: this.otherConditon === '1' ? this.otherConditon : this.saleType,
            topTotalCount: this.loopGoodsNum,
            topedCount: '0', // 从上报服务获取
            nextTopTime: this.set_time === '1' ? this.timeinfo() : this.cloumn_date, // 从上报服务获取
            result: ''
          }
          arr.push(obj)
        })
      }
      const params = { list: arr }
      try {
        this.showlog = false
        this.$refs.Logs.writeLog(`开始创建任务`, true)
        const res = await this.$api.topTaskadd(params)
        if (res.data.code === 200) {
          const top_tasks = res.data.data.top_tasks || ''
          const success = res.data.data.success || ''
          const errorlist = res.data.data.error || ''
          // 成功
          // if (success) {

          // }
          // 失败
          if (errorlist?.length) {
            errorlist.forEach(el => {
              this.$refs.Logs.writeLog(`${el}`, false)
            })
          }
        } else {
          this.$refs.Logs.writeLog(`任务创建--请求失败:${res.data.message}`, false)
        }
        this.$refs.Logs.writeLog(`创建任务结束`, true)
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
