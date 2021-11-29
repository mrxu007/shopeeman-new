<!--
 * @Author: your name
 * @Date: 2021-11-25 17:17:34
 * @LastEditTime: 2021-11-26 15:51:53
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \shopeeman-new\src\views\order-manager\components\orderCenter\exportReport.vue
-->
<template>
  <div class="report">
    <div class="report-content">
      <div class="report-box" v-for="(item, index) in tableData" :key="index">
        <div class="title">
          <span class="mar-right">报表生成时间：</span>
          <p>{{ item.updated_at }}</p>
          <span class="mar-right">报表生成人：</span>
          <p></p>
          <span class="mar-right">报表状态：</span>
          <p>{{ exportStatus[item.status] }}</p>
        </div>
        <div class="content">
          <div class="item">
            <span>成团时间：</span>
            <p class="mar-right">{{ item.created_at }}</p>
            -
            <p class="mar-left">{{ item.updated_at }}</p>
          </div>
          <div class="item">
            <span>店铺信息：</span>
            <el-select v-model="mall" placeholder="" multiple collapse-tags size="mini" filterable class="selectBox">
              <el-option v-for="(item, index) in item.sysMallIds" :key="index" :label="changeMallName(item)" :value="item" />
            </el-select>
          </div>
          <div class="item">
            <span>订单状态：</span>
            <p>{{ changeStauts(item.export_params.listOrderType) }}</p>
          </div>
          <div class="item">
            <span>售后状态：</span>
            <p></p>
          </div>
        </div>
        <el-button size="mini" type="primary"><a :href="item.url"  style="color:#fff;" download="订单报表.xlsx"  >下载报表</a></el-button>
      </div>
    </div>
    <div class="pagination">
      <el-pagination
        background
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<script>
import { changeOrderStatus } from './orderCenter'
export default {
  name: 'ExportReport',
  data() {
    return {
      tableData: [],
      total: 0,
      pageSize: 20,
      currentPage: 1,
      exportStatus: ['', '可以下载', '生成中', '上传中', '已下载'],
      mallList: [],
      mall: '',
    }
  },
  mounted() {
    this.getMallList()
    this.getAsyncExportOrder()
  },
  methods: {
    async getMallList() {
        this.mallList = []
        let res = await this.$appConfig.getGlobalCacheInfo('allMallInfo', 'key')
        let mallObject = res && JSON.parse(res)
        if (mallObject) {
          for (const key in mallObject) {
            this.mallList.push(mallObject[key])
          }
        }
        console.log(this.mallList)
    },
    changeMallName(mallID) {
        let obj = this.mallList.find(item=>{
            return item.id == mallID
        })
        return  obj.mall_alias_name || obj.platform_mall_name || ''
    },
    changeStauts(arr) {
      let str = ''
      arr.forEach((item, index) => {
        if (index === 0) {
          str = changeOrderStatus(item)
        } else {
          str = str + ',' + changeOrderStatus(item)
        }
      })
      return str
    },
    async getAsyncExportOrder() {
      let params = {
        page: this.currentPage,
        pageSize: this.pageSize,
      }
      let res = await this.$api.getAsyncExportOrder(params)
      if (res.data.code === 200) {
        this.total = res.data.data.total
        this.tableData = res.data.data.data
      } else {
        this.$message.error(res.data.message)
      }
      console.log(this.tableData)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getAsyncExportOrder()
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.getAsyncExportOrder()
    },
  },
}
</script>

<style lang="less" scoped>
.mar-right {
  margin-right: 10px;
}
.mar-left {
  margin-left: 10px;
}
.report {
  .report-content {
    height: 600px;
    overflow: auto;
    .report-box {
      border: 1px #dcdcdc solid;
      border-radius: 4px;
      padding: 16px;
      .title {
        display: flex;
        align-items: center;
        font-weight: 900;
        font-size: 18px !important;
        span {
          display: inline-block;
          width: 100px;
        }
        p {
          width: 160px;
        }
      }
      .content {
        margin: 20px 0;
        background: #f5f5f5;
        display: flex;
        flex-wrap: wrap;
        .item {
          margin: 10px 0;
          display: flex;
          align-items: center;
          width: 50%;
          span {
            display: inline-block;
            width: 80px;
            text-align: right;
          }
        }
      }
    }
  }
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  height: 35px;
}
</style>