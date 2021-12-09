<template>
  <div class="detail">
    <div class="row" style="display:flex;margin-top:25px;background-color: white;padding:15px 4px;overflow: auto;">
      <div class="row2_left" style="border: 1px solid rgb(220, 228, 218);border-radius: 5px;">
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
            <storeChoose style="margin-left:-20px" :is-all="true" :show-mall-all="true" @changeMallList="changeMallList" />
          </li>
          <li style="margin-top:20px">
            <el-button size="mini" type="primary">搜索任务</el-button>
            <el-button size="mini" type="primary">批量删除任务</el-button>
          </li>
          <li>
            <span style="color:red;display:block;margin-top:5px">提示：每个店铺可置顶商品数量大为5个，置顶时间为4小时</span>
          </li>
        </ul>
      </div>

      <div class="row2_right" style="border: 1px solid rgb(220, 228, 218);border-radius: 5px;margin-left:20px;">
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
              <el-radio-group v-model="radio">
                <el-radio :label="3">当前时间</el-radio>
                <el-radio :label="6" style="margin-left:11px">
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
              <el-radio-group v-model="radio">
                <el-radio :label="3">自定义商品</el-radio>
                <el-radio :label="6">
                  <el-select v-model="saleType" placeholder="请选择" size="mini" style="width:120px">
                    <el-option label="默认排序" value="1" />
                    <el-option label="销量从低往高" value="2" />
                    <el-option label="销量从高往低" value="3" />
                    <el-option label="价格从低往高" value="4" />
                    <el-option label="价格从高往低" value="5" />
                  </el-select>
                </el-radio>
              </el-radio-group>
              <!-- 选择自定商品时 -->
              <el-button size="mini" type="primary">添加商品</el-button>
            </div>
          </li>
          <li style="align-items: baseline;">
            <div>循环置顶商品个数：
              <el-input v-model="unlikeCreateMinDay" size="mini" onkeyup="value=value.replace(/[^\d]/g,0)" style="width:60px" />
              <el-button size="mini" type="primary" style="margin-left:72px">创建任务</el-button>
              <el-button size="mini" type="primary">重新获取置顶商品</el-button>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="tableDetail" style="margin-top: 8px;">
      <el-table
        :data="tableList"
        height="calc(100vh - 200px)"
        :header-cell-style="{ background: '#f7fafa' }"
      >
        <el-table-column type="selection" width="55" fixed />
        <el-table-column type="index" fixed />
        <el-table-column prop="" label="店铺名称" align="center" min-width="150px" fixed />
        <el-table-column prop="" label="置顶维度" align="center" min-width="150px" />
        <el-table-column prop="" label="置顶商品总数" align="center" min-width="100px" />
        <el-table-column prop="" label="置顶商品数" align="center" min-width="100px" />
        <el-table-column prop="" label="任务创建时间" align="center" min-width="100px" />
        <el-table-column prop="" label="下次置顶时间" align="center" min-width="100px" />
        <el-table-column prop="" label="正在置顶商品" align="center" min-width="100px" />
        <el-table-column prop="" label="操作结果" align="center" min-width="100px" />
        <el-table-column prop="" label="历史记录" align="center" min-width="100px" />
        <el-table-column prop="" label="操作" align="center" min-width="100px" fixed="right" />
      </el-table>
    </div>
  </div>
</template>
<script>
import storeChoose from '../../../components/store-choose'

export default {
  components: {
    storeChoose
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < (new Date().getTime() - 3600 * 1000 * 24)
        }
      },
      // cloumn_date: '',
      radio: '',
      saleType: '',
      unlikeCreateMinDay: '',
      tableList: []
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
  },
  methods: {
    changeMallList() {}
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
