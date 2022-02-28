<template>
  <div class="detail">
    <ul>
      <li>
        历史公告
      </li>
      <li>
        <el-table
          :header-cell-style="{ background: '#f7fafa' }"
          :data="tableList"
          :row-style="{ height: '50px' }"
        >
          <el-table-column prop="" label="标题" min-width="100px" align="center" />
          <el-table-column prop="" label="发布时间" min-width="150px" align="center" />
        </el-table>
      </li>
    </ul>
  </div>
</template>

<script>

export default {

  data() {
    return {
      tableList: []
    }
  },
  created() {
  },
  methods: {

  }
}

</script>
<style lang="less" scoped>
.detail{
   width: 100%;
   height: 100%;
   background-color: white;
   padding: 10px;
    ul{
        width: 500px;
        li{
          margin-bottom: 10px;
          h2{
              margin-bottom: 5px;
          }
        }
}
    }
</style>
