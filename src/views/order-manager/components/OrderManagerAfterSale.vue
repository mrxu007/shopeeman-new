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
          <el-select v-model="selType" size="mini" style="width:120px;margin-right:3px">
            <el-option label="订单编号" value="1" />
            <el-option label="采购物流单号" value="2" />
            <el-option label="采购单号" value="3" />
          </el-select>
          <el-input v-model="inputDes" size="mini" style="width:180px" clearable />
        </div>
        <div class="row_item">
          <el-button size="mini" type="primary" style="margin-right:10px">搜索</el-button>
          <el-checkbox v-model="shoeLog">隐藏日志</el-checkbox>
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
        <el-table-column label="站点" prop="country" min-width="100px" fixed align="center" />
        <el-table-column label="店铺名称" prop="" min-width="120px" fixed align="center" />
        <el-table-column label="店铺分组" prop="" min-width="120px" align="center" />
        <el-table-column label="颜色标识" prop="" min-width="100px" align="center" />
        <el-table-column label="标识名称" prop="" min-width="120px" align="center" />
        <el-table-column label="订单编号" prop="" min-width="180px" align="center" />
        <el-table-column label="退款金额" prop="" min-width="100px" align="center" />
        <el-table-column label="售后状态" prop="" min-width="100px" align="center" />
        <el-table-column label="申请时间" prop="" min-width="180px" align="center" />
        <el-table-column label="售后原因" prop="" min-width="100px" align="center" />
        <el-table-column label="本地备注" prop="" min-width="100px" align="center" />
        <el-table-column label="商品ID" prop="" min-width="150px" align="center" />
        <el-table-column label="商品数量" prop="" min-width="150px" align="center" />
        <el-table-column label="商品图片" prop="" min-width="300px" align="center" />
        <el-table-column label="商品类目" prop="" min-width="100px" align="center" />
        <el-table-column label="商品规格" prop="" min-width="100px" align="center" />
        <el-table-column label="采购商品ID" prop="" min-width="180px" align="center" />
        <el-table-column label="采购订单号" prop="" min-width="180px" align="center" />
        <el-table-column label="采购状态" prop="" min-width="100px" align="center" />
        <el-table-column label="采购价" prop="" min-width="100px" align="center" />
        <el-table-column label="采购时间" prop="" min-width="180px" align="center" />
        <el-table-column label="采购物流单号" prop="" min-width="180px" align="center" />
        <el-table-column label="采购账号" prop="" min-width="180px" align="center" />
        <el-table-column label="订单创建时间" prop="" min-width="180px" align="center" />
        <el-table-column label="订单截止发货时间" prop="" min-width="180px" align="center" />
        <el-table-column label="退货物流号" prop="" min-width="180px" align="center" />
        <el-table-column label="退件发货地址" prop="" min-width="200px" align="center" />
        <el-table-column label="退货地址" prop="" min-width="200px" align="center" />
        <el-table-column label="退货邮寄地址" prop="" min-width="200px" align="center" />
        <el-table-column label="操作状态" prop="" min-width="150px" fixed="right" align="center">
          <el-dropdown>
            <el-button type="primary" size="mini">
              更多<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>删除商品</el-dropdown-item>
              <el-dropdown-item>下架商品</el-dropdown-item>
              <el-dropdown-item>修改采购状态</el-dropdown-item>
              <el-dropdown-item>同步此店铺售后订单</el-dropdown-item>
              <el-dropdown-item>标记颜色标识</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
import { colorLabelList, getMalls } from '../../../util/util'

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
        applyTime: '', // 申请时间
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
    this.getInfo()// 获取颜色
  },
  methods: {
    async getInfo() {
      colorLabelList().then((res) => {
        // console.log('color', res)
        this.colorLogoList = res
      })

      getMalls().then(res => {
        this.shopAccountList = res
        this.query.sysMallIds = [] // 初始化systemMallids
        this.shopAccountList.forEach(item => {
          this.query.sysMallIds.push(item.id)
        })
        this.getTableList()// 初始化数据
      })
    },
    changeMallList(val) {
      console.log(val)
    },
    // 初始化数据 查询
    async getTableList(params) {
      const res = await this.$api.aftermarket(params)
      console.log(res)
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

