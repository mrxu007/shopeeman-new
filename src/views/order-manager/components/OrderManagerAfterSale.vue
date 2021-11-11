<template>
  <div v-loading="loading" class="detai">
    <div class="condition">
      <!-- 第一行 -->
      <div class="row">
        <storeChoose :is-all="true" :show-mall="true" @changeMallList="changeMallList" />
        <div class="row_item">
          <label>创建时间：</label>
          <el-date-picker
            v-model="cloumn_date1"
            size="mini"
            style="width: 324px"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="-"
            :picker-options="pickerOptions"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>
      </div>

      <div class="row">
        <div class="row_item">
          <label>售后状态：</label>
          <el-select v-model="query.shotOrderStatus" size="mini" style="width:100px">
            <el-option label="全部" value="" />
            <el-option label="取消中" value="5" />
            <el-option label="已取消" value="6" />
            <el-option label="退货退款中" value="7" />
            <el-option label="退款成功" value="9" />
            <el-option label="退款失败" value="10" />
          </el-select>
        </div>

        <div class="row_item">
          <label>采购状态：</label>
          <el-select v-model="query.refundStatus" size="mini" style="width: 180px;">
            <el-option label="全部" value="" />
            <el-option label="待拍单" value="1" />
            <el-option label="拍单中" value="2" />
            <el-option label="拍单成功" value="3" />
            <el-option label="拍单失败" value="4" />
          </el-select>
        </div>

        <div class="row_item">
          <label>颜色标识：</label>
          <el-select v-model="query.colorLabelId" size="mini" style="width: 180px;">
            <el-option label="全部" value="" />
            <el-option v-for="item in colorLogoList" :key="item.id" :label="item.label" :value="item.id" :style="item.color" />
          </el-select>
        </div>

        <div class="row_item">
          <label>申请时间：</label>
          <el-date-picker
            v-model="cloumn_date2"
            size="mini"
            style="width: 324px"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="-"
            :picker-options="pickerOptions"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>
      </div>
      <div class="row">
        <div class="row_item">
          <el-select v-model="selType" size="mini" style="width:120px;margin-right:3px" @change="inputDes=''">
            <el-option label="订单编号" value="1" />
            <el-option label="采购物流单号" value="2" />
            <el-option label="采购单号" value="3" />
          </el-select>
          <el-input v-model="inputDes" size="mini" style="width:180px" clearable />
        </div>
        <div class="row_item">
          <el-button size="mini" type="primary" style="margin-right:10px" @click="search">搜索</el-button>
          <!-- <el-checkbox v-model="shoeLog">隐藏日志</el-checkbox> -->
        </div>
      </div>
      <div class="row" style="margin-top:10px">
        <div class="row_item">

          <el-button size="mini" type="primary">采购状态变更</el-button>
          <el-button size="mini" type="primary">批量拒绝买家取消订单</el-button>
          <el-button size="mini" type="primary">批量标记颜色标识</el-button>
          <el-button size="mini" type="primary">批量接受买家取消订单</el-button>
          <el-button size="mini" type="primary">导出数据</el-button>
          <el-button size="mini" type="primary">售后同步</el-button>
          <el-checkbox v-model="mall_compare" class="row_item">全店同步</el-checkbox>
          <el-checkbox v-model="shoeLog">隐藏日志</el-checkbox>

        </div>
      </div>
    </div>

    <div class="table-form">
      <el-table
        width="100%"
        height="calc(100vh - 213px)"
        :data="tableList"
        :header-cell-style="{ background: '#f7fafa' }"
      >
        <el-table-column label="站点" prop="country" min-width="100px" fixed align="center">
          <template slot-scope="{row}"><span>{{ row.mall_info.country | chineseSite }}</span></template> </el-table-column>
        <el-table-column label="店铺名称" prop="mall_info.platform_mall_name" min-width="120px" fixed align="center" />
        <!-- <el-table-column label="店铺分组" prop="" min-width="120px" align="center" /> -->
        <!-- <el-table-column label="颜色标识" prop="color_id" min-width="100px" align="center" /> -->
        <el-table-column label="颜色标识" prop="colorName" min-width="100px" align="center" />
        <!-- <el-table-column label="标识名称" prop="" min-width="120px" align="center" /> -->
        <el-table-column label="订单编号" prop="order_sn" min-width="180px" align="center" />
        <el-table-column label="退款金额" prop="refund_amount" min-width="100px" align="center" />
        <el-table-column label="售后状态" prop="status" min-width="100px" align="center" />
        <el-table-column label="申请时间" prop="update_time" min-width="180px" align="center" />
        <el-table-column label="售后原因" prop="after_reason" min-width="100px" align="center" />
        <el-table-column label="本地备注" prop="remark" min-width="100px" align="center" />
        <el-table-column label="商品ID" prop="goods_info.goods_id" min-width="150px" align="center" />
        <el-table-column label="商品数量" prop="goods_info.goods_count" min-width="150px" align="center" />
        <el-table-column label="商品图片" prop="goods_info.goods_img" min-width="300px" align="center" />
        <el-table-column label="商品类目" prop="goods_info.goods_category_id" min-width="100px" align="center" />
        <el-table-column label="商品规格" prop="goods_info.goods_spec" min-width="100px" align="center" />
        <el-table-column label="采购商品ID" prop="" min-width="180px" align="center" />
        <el-table-column label="采购订单号" prop="shot_order_info.shot_status" min-width="180px" align="center" />
        <el-table-column label="采购状态" prop="shot_order_info.buy_account" min-width="100px" align="center" />
        <!-- <el-table-column label="采购价" prop="" min-width="100px" align="center" /> -->
        <el-table-column label="采购时间" prop="shot_order_info.shotted_at" min-width="180px" align="center" />
        <el-table-column label="采购物流单号" prop="shot_order_info.shot_tracking_number" min-width="180px" align="center" />
        <el-table-column label="采购账号" prop="shot_order_info.buy_account" min-width="180px" align="center" />
        <el-table-column label="订单创建时间" prop="after_created_at" min-width="180px" align="center" />
        <el-table-column label="订单截止发货时间" prop="" min-width="180px" align="center" />
        <el-table-column label="退货物流号" prop="return_tracking_number" min-width="180px" align="center" />
        <!-- <el-table-column label="退件发货地址" prop="return_delivery_time" min-width="200px" align="center" /> -->
        <el-table-column label="退货地址" prop="return_address" min-width="200px" align="center" />
        <el-table-column label="退货邮寄地址" prop="return_pickup_address" min-width="200px" align="center" />
        <el-table-column label="操作状态" prop="" min-width="150px" fixed="right" align="center">
          <template v-slot="{ row }">
            <el-dropdown style="width: 100px;margin-left: 10px;">
              <el-button style="width: 100px;" size="mini" plain type="primary">
                更多操作<i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><div class="dropdownItem"> 删除商品</div></el-dropdown-item>
                <el-dropdown-item><div class="dropdownItem"> 下架商品</div></el-dropdown-item>
                <el-dropdown-item><div class="dropdownItem"> 修改采购状态</div></el-dropdown-item>
                <el-dropdown-item><div class="dropdownItem"> 同步此店铺售后订单</div></el-dropdown-item>
                <el-dropdown-item><div class="dropdownItem"> 订单颜色标识</div></el-dropdown-item>

              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination" style="display:flex;justify-content: flex-end;">
        <el-pagination
          background
          :current-page.sync="query.page"
          :page-sizes="[20, 50, 100, 200]"
          :page-size="query.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>

</template>
<script>
import storeChoose from '../../../components/store-choose.vue'
import { colorLabelList, getMalls, getValue } from '../../../util/util'

export default {
  components: {
    storeChoose
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      colorLogoList: [],
      mall_compare: false, // 全店同步
      shoeLog: false, // 隐藏日志
      selType: '1', // 订单编号 采购物流单号 采购单号
      inputDes: '',
      cloumn_date1: '',
      cloumn_date2: '',
      query: {
        sysMallIds: '', // 店铺ids
        cerateTime: '', // 创建时间
        saleStatus: '', // 售后状态
        refundStatus: '', // 采购状态
        color: '', // 颜色标识
        orderSn: '', // 订单编号
        trackingNumber: '', // 采购物流单号
        shotOrderSn: '', // 采购单号
        shotOrderStatus: '', // 拍单状态
        afterApplyTime: '', // 申请时间
        createdTime: '', // 创建时间
        colorLabelId: '', // 颜色标识id
        page: 1,
        pageSize: 20
      },
      total: 0,
      tableList: [],
      loading: false
    }
  },
  created() {
    this.getInfo()//
  },
  methods: {
    async getInfo() {
      colorLabelList().then((res) => {
        this.colorLogoList = res
      })
      // 初始化systemMallids
      getMalls().then(res => {
        this.shopAccountList = res
        this.query.sysMallIds = []
        this.shopAccountList.forEach(item => {
          this.query.sysMallIds.push(item.id)
        })
        this.search()
      })
    },
    changeMallList(val) {
      console.log(val)
    },
    // 搜索
    search() {
      this.query.orderSn = ''
      this.query.trackingNumber = ''
      this.query.trackingNumber = ''
      if (Number(this.selType) === 1) {
        this.query.orderSn = this.inputDes
      }
      if (Number(this.selType) === 2) {
        this.query.trackingNumber = this.inputDes
      }
      if (Number(this.selType) === 3) {
        this.query.trackingNumber = this.inputDes
      }
      this.query.createdTime = this.cloumn_date1 && this.cloumn_date1.length > 0 ? this.cloumn_date1.join('/').toString() : ''
      this.query.afterApplyTime = this.cloumn_date2 && this.cloumn_date2.length > 0 ? this.cloumn_date2.join('/').toString() : ''
      const params = this.query
      params.sysMallIds = this.query.sysMallIds.toString() || ''
      console.log('123', params)
      this.getTableList(params)
    },
    // 初始化数据 查询
    async getTableList(params) {
      this.loading = true
      this.tableList = []
      try {
        const res = await this.$api.aftermarket(params)
        console.log('2', res)
        if (res.data.code === 200) {
          const list = res.data.data.data || []
          list.forEach(i => {
            i.colorName = getValue(this.colorLogoList, 'label', 'value', i.color_id)
          })
          this.tableList = list
          this.query.page = res.data.data.current_page
          this.total = res.data.data.total
        } else {
          this.$message.error('数据请求失败')
        }
        this.loading = false
      } catch (error) {
        console.log('初始化', error)
        this.loading = false
      }
    },
    // 分页
    handleSizeChange(val) { this.query.pageSize = val },
    handleCurrentChange(val) { this.query.page = val },
    // 复制
    copy(attr) {
      const target = document.createElement('div')
      target.id = 'tempTarget'
      target.style.opacity = '0'
      target.innerText = attr
      document.body.appendChild(target)
      try {
        const range = document.createRange()
        range.selectNode(target)
        window.getSelection().removeAllRanges()
        window.getSelection().addRange(range)
        document.execCommand('copy')
        window.getSelection().removeAllRanges()
        this.$message.success('复制成功')
      } catch (e) {
        // console.log('复制失败')
      }
      target.parentElement.removeChild(target)
    }
  }
}
</script>
<style lang="less">

    .detai{
        min-width: 1280px;
        padding: 10px;
        .condition{
            display: flex;
            align-items: flex-start;
            flex-flow: column;

            // .condition—item{
            //     margin-right: 15px;
            // }
            .row{
               display: flex;
               margin-bottom: 5px;
               .row_item{
                 margin-left: 20px;
                 margin-right: 10px;
               }
            }
        }
        .table-form{
            border: 0.5px solid rgb(224, 224, 224);
            margin-top: 10px;
        }
    }
</style>

