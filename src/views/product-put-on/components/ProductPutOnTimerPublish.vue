<template>
  <el-row class="contaniner">
    <el-row class="header">
      <div class="on_new_dialog_box" style="margin-bottom: 10px;">
        <div>店铺站点：</div>
        <el-select v-model="countryOption" size="mini" filterable style="width: 140px">
          <el-option v-for="(item, index) in countriesOption" :key="index" :label="item.label" :value="item.value"/>
        </el-select>
        <div style="margin-left: 20px;">任务名称：</div>
        <el-input size="mini" v-model="taskName" style="width: 140px;"></el-input>
        <div style="margin-left: 20px;">任务状态：</div>
        <el-select value="" v-model="status" size="mini">
          <el-option v-for="(item,index) in statusList" :key="index" :value="item.value" :label="item.label"></el-option>
        </el-select>
        <div style="margin-left: 20px;">任务日期：</div>
        <el-date-picker v-model="taskTimeStart" type="date" size="mini" placeholder="选择开始日期"
                        style="width: 140px"></el-date-picker>
        <div style="width: 6px;height: 1px;background: #1a1a1a;margin: 0 7px;"></div>
        <el-date-picker v-model="taskTimeEnd" type="date" size="mini" placeholder="选择结束日期"
                        style="width: 140px"></el-date-picker>
      </div>
      <div class="on_new_dialog_box" style="margin-bottom: 10px;">
        <el-button size="mini" type="primary" @click="searchTask">搜索任务</el-button>
        <el-button size="mini" type="primary" @click="startTask">启动任务</el-button>
        <el-button size="mini" @click="cancelTask">取消任务</el-button>
        <el-button size="mini" type="primary" @click="deleteTask">删除任务</el-button>
      </div>
    </el-row>
    <u-table :data="taskTable" @selection-change="handleSelectionChange"
             use-virtual :data-changes-scroll-top="false"
             :header-cell-style="{backgroundColor: '#f5f7fa',height:'50px'}"
             row-key="id" :border="false" :big-data-checkbox="true" height="680">
      <u-table-column align="left" type="selection" width="50"/>
      <u-table-column align="left" label="序列号" type="index" width="60">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </u-table-column>
      <u-table-column align="left" label="任务名称" width="120" show-overflow-tooltip>
        <template slot-scope="{ row }">
          {{row.task_name}}
        </template>
      </u-table-column>
      <u-table-column align="left" label="店铺名称" min-width="120" show-overflow-tooltip>
        <template v-slot="{ row }">
          <div class="goodsTableLine">
            {{row.mall_names}}
          </div>
        </template>
      </u-table-column>
      <u-table-column align="left" label="店铺站点" width="120">
        <template slot-scope="{ row }">
          {{ countryOption | chineseSite }}
        </template>
      </u-table-column>
      <u-table-column align="left" label="店铺分组" width="120">
        <template slot-scope="{ row }">全部
        </template>
      </u-table-column>
      <u-table-column align="left" label="执行时间" width="140">
        <template slot-scope="{ row }">
          {{ row.exec_time}}
        </template>
      </u-table-column>
      <u-table-column align="left" label="商品总数" width="100">
        <template slot-scope="{ row }">
            {{ row.goods_count }}
        </template>
      </u-table-column>
      <u-table-column align="left" label="上新成功数" width="120" prop="category_name">
        <template slot-scope="{ row }">
          {{ row.success_count}}
        </template>
      </u-table-column>
      <u-table-column align="left" label="上新失败数" width="120" prop="categoryName" show-overflow-tooltip>
        <template slot-scope="{row}">
          {{ row.fail_count}}
        </template>
      </u-table-column>
      <u-table-column align="left" label="执行状态" width="120" prop="price">
        <template slot-scope="{ row }">
          {{ statusShow[Number(row.status)] }}
        </template>
      </u-table-column>
      <u-table-column align="left" label="任务详情" width="120" prop="sys_label_name" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="viewTask(scope)">查看</el-button>
        </template>
      </u-table-column>
      <u-table-column align="left" label="启动任务" width="120" prop="sourceName">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="startTask(scope)">启动</el-button>
        </template>
      </u-table-column>
    </u-table>
  </el-row>
</template>
<script>
import MallListAPI from '@/module-api/mall-manager-api/mall-list-api'
import GoodsManagerAPI from '@/module-api/goods-manager-api/goods-data'
import GoodsDiscount from '@/module-api/market-activity-api/goods-discount'

export default {
  data() {
    return {
      mallListAPIInstance: new MallListAPI(this),
      GoodsManagerAPIInstance: new GoodsManagerAPI(this),
      GoodsDiscount: new GoodsDiscount(this),
      countriesOption: this.$filters.countries_option,
      countryOption: 'TH',
      taskName: '',
      taskTimeStart: new Date(new Date().getTime() - 3600 * 1000 * 24 * 2),
      taskTimeEnd: new Date(new Date().getTime() + 3600 * 1000 * 24),
      taskTable: [],
      taskSelectTable: [],
      statusList: [
        { value: '', label: '全部' },
        { value: 1, label: '已执行' },
        { value: 2, label: '部分失败' },
        { value: 3, label: '待执行' },
        { value: 4, label: '待启动' }
      ],
      statusShow: {
        1:'已执行',
        2:'部分失败',
        3:'待执行',
        4:'待启动',
      },
      status:'',
    }
  },
  methods: {
    async searchTask() {
      this.taskTable = []
      let country = this.countryOption
      let status = this.status
      let name = this.taskName
      let startTime = Math.floor(this.taskTimeStart.getTime() / 1000)
      let endTime = Math.floor(this.taskTimeEnd.getTime() / 1000)
      console.log(country, '', name, startTime, endTime)
      let getConfig = await this.$collectService.getCronPublishTask(country, status+'', name, startTime, endTime)
      this.taskTable = getConfig
      console.log('getConfig', getConfig)
    },
    startTask(row) {
      if (this.taskSelectTable.length === 0) {
        this.$message.error('请选择一个定时任务')
        return
      }
    },
    cancelTask() {
      if (this.taskSelectTable.length === 0) {
        this.$message.error('请选择一个定时任务')
        return
      }

    },
    async deleteTask() {
      if (this.taskSelectTable.length === 0) {
        this.$message.error('请选择一个定时任务')
        return
      }
      let ids = this.taskSelectTable.map(son=>son.id)
      let res = await this.$collectService.deleteCronPublishTask(ids)
      if (Number(res.code) === 200){
        this.$message.success('删除成功')
        for (let i =0;i<ids.length;i++){
          await this.$collectService.deleteCronPublishConfig(ids[i])
          await this.$collectService.deleteCronPublishGoods(ids[i] + '')
          let index = this.taskTable.findIndex(son=>son.id === ids[i])
          this.taskTable.splice(index,1)
        }
      }else{
        this.$message.error('删除失败')
      }
      console.log(res)
    },
    viewTask(data){

    },
    handleSelectionChange(val) {
      this.taskSelectTable = val
    }
  }

}
</script>