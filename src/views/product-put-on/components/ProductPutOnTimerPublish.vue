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
        <div style="margin-left: 20px;">任务日期：</div>
        <el-date-picker v-model="taskTimeStart" type="date" size="mini" placeholder="选择开始日期" style="width: 140px"></el-date-picker>
        <div style="width: 6px;height: 1px;background: #1a1a1a;margin: 0 7px;"></div>
        <el-date-picker v-model="taskTimeEnd" type="date" size="mini" placeholder="选择结束日期" style="width: 140px"></el-date-picker>
      </div>
      <div class="on_new_dialog_box" style="margin-bottom: 10px;">
        <el-button size="mini" type="primary">搜索任务</el-button>
        <el-button size="mini" type="primary">启动任务</el-button>
        <el-button size="mini" >取消任务</el-button>
        <el-button size="mini" type="primary">删除任务</el-button>
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
      <u-table-column align="left" label="任务名称" min-width="120" show-overflow-tooltip>
        <template slot-scope="{ row }">
        </template>
      </u-table-column>
      <u-table-column align="left" label="店铺名称" min-width="120" show-overflow-tooltip>
        <template v-slot="{ row }">
        </template>
      </u-table-column>
      <u-table-column align="left" label="店铺站点" width="120">
        <template slot-scope="{ row }">{{countryOption | chineseSite}}</template>
      </u-table-column>
      <u-table-column align="left" label="店铺分组" width="100">
        <template slot-scope="{ row }">
          <div class="goodsTableLine">
            {{ row.title }}
          </div>
        </template>
      </u-table-column>
      <u-table-column align="left" label="执行时间" width="140">
        <template slot-scope="{ row }">{{ row.mallName || '' }}
        </template>
      </u-table-column>
      <u-table-column align="left" label="商品总数" width="100">
        <template slot-scope="{ row }">
          <div class="goodsTableLine">
            {{ row.statusName }}
          </div>
        </template>
      </u-table-column>
      <u-table-column align="left" label="上新成功数" prop="category_name" width="120">
        <template slot-scope="{ row }">{{ row.mallName || '' }}
        </template>
      </u-table-column>
      <u-table-column align="left" label="上新失败数" prop="categoryName" width="120" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="text" @click="enterCategory(0,scope.row)">
            {{ scope.row.categoryName || goodsClassName[scope.row.category_id] || '请选择类目' }}
          </el-button>
        </template>
      </u-table-column>
      <u-table-column align="left" label="执行状态" prop="price" width="120">
        <template slot-scope="{ row }">{{ row.mallName || '' }}
        </template>
      </u-table-column>
      <u-table-column align="left" label="任务详情" prop="sys_label_name" width="120" show-overflow-tooltip>
        <template slot-scope="{ row }">{{ row.mallName || '' }}
        </template>
      </u-table-column>
      <u-table-column align="left" label="启动任务" prop="sourceName" width="120">
        <template slot-scope="{ row }">{{ row.mallName || '' }}
        </template>
      </u-table-column>
    </u-table>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      countriesOption: this.$filters.countries_option,
      countryOption: 'TH',
      taskName:'',
      taskTimeStart:new Date(new Date().getTime() - 3600 * 1000 * 24 * 2),
      taskTimeEnd:new Date(new Date().getTime()),
      taskTable:[],
      taskSelectTable: []
    }
  },
  methods:{
    handleSelectionChange(val){
      this.taskSelectTable = val
    }
  }

}
</script>