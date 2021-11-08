<template>
  <div v-loading="loading" class="detai">
    <div class="condition">
      <!-- 第一行 -->
      <div class="row">
        <storeChoose :is-all="true" :show-mall="true" @changeMallList="changeMallList" />
        <div class="row_item">
          <label>创建时间：</label>
          <el-date-picker
            v-model="cloumn_date"
            size="mini"
            style="width: 180px"
            type="date"
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
          <el-select v-model="query.saleStatus" size="mini" style="width:100px">
            <el-option label="">全部</el-option>
          </el-select>
        </div>

        <div class="row_item">
          <label>采购状态：</label>
          <el-select v-model="query.buyStatus" size="mini">
            <el-option label="">全部</el-option>
          </el-select>
        </div>

        <div class="row_item">
          <label>颜色标识：</label>
          <el-select v-model="query.color" size="mini">
            <el-option label="">全部</el-option>
          </el-select>
        </div>

        <div class="row_item">
          <label>申请时间：</label>
          <el-date-picker
            v-model="cloumn_date"
            size="mini"
            style="width: 180px"
            type="date"
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
          <el-button size="mini" type="primary">搜索</el-button>
          <el-checkbox v-model="shoeLog">隐藏日志</el-checkbox>
        </div>
      </div>
      <div class="row">
        <el-button class="row_item" size="mini" type="primary">采购状态变更</el-button>
        <el-button class="row_item" size="mini" type="primary">批量拒绝买家取消订单</el-button>
        <el-button class="row_item" size="mini" type="primary">批量标记颜色标识</el-button>
        <el-button class="row_item" size="mini" type="primary">批量接受买家取消订单</el-button>
        <el-button class="row_item" size="mini" type="primary">导出数据</el-button>
        <el-button class="row_item" size="mini" type="primary">售后同步</el-button>
        <el-checkbox v-model="mall_compare" class="row_item">全店同步</el-checkbox>
      </div>
    </div>

    <div class="table-form">
      <el-table
        height="calc(100vh - 90px)"
        :data="tableList"
        :header-cell-style="{ background: '#f7fafa' }"
      >
        <el-table-column label="站点" prop="order_sn" min-width="300px" fixed />
        <el-table-column label="店铺名称" prop="order_sn" min-width="300px" fixed />
        <el-table-column label="店铺分组" prop="order_sn" min-width="300px" />
        <el-table-column label="颜色标识" prop="order_sn" min-width="300px" />
        <el-table-column label="标识名称" prop="order_sn" min-width="300px" />
        <el-table-column label="订单编号" prop="order_sn" min-width="300px" />
        <el-table-column label="退款金额" prop="order_sn" min-width="300px" />
        <el-table-column label="售后状态" prop="order_sn" min-width="300px" />
        <el-table-column label="申请时间" prop="order_sn" min-width="300px" />
        <el-table-column label="售后原因" prop="order_sn" min-width="300px" />
        <el-table-column label="本地备注" prop="order_sn" min-width="300px" />
        <el-table-column label="商品ID" prop="order_sn" min-width="300px" />
        <el-table-column label="商品数量" prop="order_sn" min-width="300px" />
        <el-table-column label="商品图片" prop="order_sn" min-width="300px" />
        <el-table-column label="商品类目" prop="order_sn" min-width="300px" />
        <el-table-column label="商品规格" prop="order_sn" min-width="300px" />
        <el-table-column label="采购商品ID" prop="order_sn" min-width="300px" />
        <el-table-column label="采购订单号" prop="order_sn" min-width="300px" />
        <el-table-column label="采购状态" prop="order_sn" min-width="300px" />
        <el-table-column label="采购价" prop="order_sn" min-width="300px" />
        <el-table-column label="采购时间" prop="order_sn" min-width="300px" />
        <el-table-column label="采购物流单号" prop="order_sn" min-width="300px" />
        <el-table-column label="采购账号" prop="order_sn" min-width="300px" />
        <el-table-column label="订单创建时间" prop="order_sn" min-width="300px" />
        <el-table-column label="订单截止发货时间" prop="order_sn" min-width="300px" />
        <el-table-column label="退货物流号" prop="order_sn" min-width="300px" />
        <el-table-column label="退件发货地址" prop="order_sn" min-width="300px" />
        <el-table-column label="退货地址" prop="order_sn" min-width="300px" />
        <el-table-column label="退货邮寄地址" prop="order_sn" min-width="300px" />
        <el-table-column label="操作状态" prop="order_sn" min-width="300px" fixed="right" />
      </el-table>
      <div class="pagination" style="display:flex;justify-content: flex-end;">
        <el-pagination
          background
          :current-page.sync="page"
          :page-sizes="[20, 50, 100, 200]"
          :page-size="pageSize"
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

export default {
  components: {
    storeChoose
  },
  data() {
    return {
      mall_compare: false, // 全店同步
      shoeLog: false, // 隐藏日志
      selType: '1', // 订单编号 采购物流单号 采购单号
      inputDes: '',
      cloumn_date: '',
      query: {
        mallIds: '', // 店铺ids
        cerateTime: '', // 创建时间
        saleStatus: '', // 售后状态
        buyStatus: '', // 采购状态
        color: '', // 颜色标识
        applyTime: '', // 申请时间
        orderId: '', // 订单编号
        packageId: '', // 采购物流单号
        buyid: ''// 采购单号
      },
      total: 0,
      tableList: [],
      loading: false
    }
  },
  created() {
    this.getTableList()// 初始化数据
    this.query.goodsTime = new Date()
  },
  methods: {
    changeMallList() {},
    // 初始化数据 查询
    async getTableList() {
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
                 margin-left: 23px;
               }
            }
        }
        .table-form{
            border: 0.5px solid rgb(224, 224, 224);
            margin-top: 10px;
        }
    }
</style>

