<template>
  <div class="detail">
    <div class="condition">
      <div class="condition_item">
        <el-button type="primary" size="mini">新增授权</el-button>
        <el-button type="primary" size="mini">刷新状态</el-button>
        <el-button type="primary" size="mini">下载教程</el-button>
        <el-button type="text" size="mini"> <span class="linkdec">注册淘宝天猫海外平台账号</span> </el-button>
      </div>
      <div class="condition_item">
        <div class="conditon_item_dec">
          <span>账号别名：</span>
          <el-input v-model="query.name" clearable size="mini" style="width:180px" />
        </div>
        <div class="conditon_item_dec">
          <span>账号：</span>
          <el-input v-model="query.account" clearable size="mini" style="width:180px" />
        </div>
        <el-button class="conditon_item_dec" type="primary" size="mini">搜索</el-button>
      </div>
    </div>

    <div class="tabledes">
      <el-table
        height="calc(100vh - 106px)"
        :header-cell-style="{'background': '#f7fafa'}"
        :data="tableList"
      >
        <el-table-column label="账号" prop="" min-width="200px" />
        <el-table-column label="账号别名" prop="" min-width="200px" />
        <el-table-column label="授权状态" prop="" min-width="200px" />
        <el-table-column label="创建时间" prop="" min-width="200px" />
        <el-table-column label="更新时间" prop="" min-width="200px" />
        <el-table-column label="操作" prop="" min-width="200px">
          <el-button type="primary" size="mini">修改账号别名</el-button>
          <el-button type="primary" size="mini">删除账号</el-button>
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableList: '',
      query: {
        name: '', // 账号别名
        account: '' // 账号
      }
    }
  }
}
</script>
<style lang="less" scoped>

 .detail{
     min-width: 1200px;
     padding:10px ;
     .condition_item{
        display: flex;
        margin: 10px 0px;
        .el-button{
            margin-right: 20px;
        }
        .conditon_item_dec{
            margin-right: 20px;
        }
        .linkdec{
            text-decoration: underline;
            color: blue;
        }
        .linkdec:hover{
            text-decoration: underline;
            color: red;
        }
     }
 }
</style>
