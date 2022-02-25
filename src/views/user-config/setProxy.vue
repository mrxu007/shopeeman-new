<template>
  <div class="detail">
    <ul>
      <!-- row1 -->
      <span>&nbsp;翻译设置&nbsp;</span>
      <li>
        <el-radio-group v-model="selTrans" @change="save()">
          <el-radio label="1">阿里翻译（付费翻译，推荐使用0.000085元/字符）</el-radio>
          <el-radio label="2">有道翻译（免费翻译，接口调用频繁容易封IP，只支持英文）</el-radio>
          <el-radio label="3">谷歌翻译</el-radio>
          <el-radio label="4">私有翻译（需要自己提供百度或者必应翻译API信息）
            <el-button type="primary" size="mini" style="margin-left:10px" @click="checkApi">添加/查看API信息</el-button>
          </el-radio>
        </el-radio-group>
      </li>
      <!-- row2 -->
      <span>&nbsp;语言设置&nbsp;</span>
      <li>
        <el-radio-group v-model="setLanguage" @change="save()">
          <el-radio label="1">简体中文</el-radio>
          <el-radio label="2">English</el-radio>
        </el-radio-group>
      </li>
    </ul>
    <!-- 对话框 -->
    <el-dialog
      title="添加/查看翻译"
      :visible.sync="dialog_compareData"
      width="950px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <!-- <el-dialog title="同步数据至仓库" :visible.sync="dialog_compareData" width="950px" @closed="closeDialog3"> -->
      <div class="compareData_allItem">
        <div class="compareData_item">
          <label>APP类别：</label>
          <el-select v-model="typeAPP" size="mini" style="width:120px">
            <el-option label="百度APP" value="1" />
            <el-option label="必应APP" value="2" />
          </el-select>

          <label>APPid：</label>
          <el-input v-model="APPid" size="mini" style="width:200px" />

          <label>APPKey：</label>
          <el-input v-model="APPKey" size="mini" style="width:200px" />

          <el-button type="primary" size="mini" style="margin-left:10px">添加</el-button>
        </div>

        <div>
          <el-table
            :header-cell-style="{ background: '#f7fafa' }"
            :data="tableList"
            :row-style="{ height: '50px' }"
            max-height="400"
          >
            <el-table-column prop="type" label="APP类别" min-width="100px" align="center">
              <template v-slot="{row}">{{ row.type===1?'百度APP':'必应APP' }}</template>
            </el-table-column>
            <el-table-column prop="appid" label="APPid" min-width="150px" align="center" />
            <el-table-column prop="appkey" label="APPKey" min-width="150px" align="center" />
            <el-table-column prop="" label="状态" min-width="80px" align="center">
              <template v-slot="{row}">{{ row.state===1?'正常':'异常' }}</template>
            </el-table-column>
            <el-table-column prop="comment" label="备注" min-width="100px" align="center" fixed="right" />
            <el-table-column prop="" label="操作" min-width="100px" align="center" fixed="right">
              <template> <el-button type="primary" size="mini">重置状态</el-button> </template>
            </el-table-column>
            <el-table-column prop="" label="删除" min-width="100px" align="center" fixed="right">
              <template> <el-button type="primary" size="mini">删除</el-button> </template>
            </el-table-column>

          </el-table>
        </div>

      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  components: {

  },
  props: ['userInfo'],
  data() {
    return {
      userID: '', // 用户ID
      uid: '', // 用户ID

      selTrans: '1',
      setLanguage: '1',
      // 弹窗
      dialog_compareData: false,
      typeAPP: '1', // APP类别
      APPid: '', // APPid
      APPKey: '', // APPKey
      tableList: []// 表格
    }
  },
  mounted() {
    this.getUserinfo()
    // this.getAppList()
  },
  methods: {
    // 获取applist
    async getAppList() {
      const res = await this.$api.getAppList()
      if (res.status === 1) {
        this.tableList = res.data
      } else {
        this.$message.warning('APP类别获取失败！')
      }
    },
    // 初始化用户信息
    getUserinfo() {
      const data = this.userInfo
      if (data) {
        console.log(this.userInfo)
        this.userID = data.id // 用户信息
        this.uid = data.uid // 用户信息
        this.selTrans = data.translate_set.toString() // 翻译
        this.setLanguage = data.language_set === 'zh_CN' ? '1' : '2' // 语言
      // 翻译配置信息---
      }
    },
    checkApi() {

    },
    async save() {
      const param = {
        content: {
          id: this.userID,
          uid: this.uid,
          uuid: 0,
          ori_logistics_interval_time: this.interTime, // 翻译
          is_auto_ori_logistics: this.isAutoToken // 语言
          // api信息
        },
        type: 2
      }
      console.log(JSON.stringify(param))
      try {
        const res = await this.$BaseUtilService.updateUserConfig(JSON.stringify(param))
        if (res) {
          this.$message.success('信息修改成功！')
        } else {
          this.$message.warning('信息修改失败！')
        }
        console.log('137', res)
      } catch (error) {
        console.log(`139line-${error}`)
      }
    }
  }
}

</script>
<style lang="less" scoped>
 .detail{

     background-color: white;
     ul{
         margin-left: 20px;
         li{
        border: 1px solid #dadada;
        width: 500px;
        padding: 10px;
        padding-top: 20px;
        border-radius: 5px;
        margin-bottom: 10px;
         }
       span{
           position: relative;
    bottom: -5px;
    left: 11px;
    background-color: white;
       }
       .el-radio{
        //  margin-bottom: 10px;
            line-height: 28px;
       }
     }
     .compareData_allItem {
    .compareData_item {
      display: flex;
      font-size: smaller;
      align-items: center;
      margin-bottom: 30px;
      label{
        margin-left:20px
      }
      span {
        margin-bottom: 5px;
      }
    }
  }
 }
</style>

