<template>
  <div class="detail">
    <ul>
      <!-- row1 -->
      <li>
        <storeChoose style="margin-left:-2px" @changeMallList="changeMallList" />
        <el-button type="primary" size="mini" @click="clearLog">清除日志</el-button>
        <el-button type="primary" size="mini">参数设置</el-button>
        <el-checkbox v-model="showlog" style="margin-top:5px;margin-left:5px">隐藏日志</el-checkbox>
      </li>
      <!-- row2 -->
      <span class="Follow">关注用户</span>
      <span class="cancerFollow">取关用户</span>
      <li class="row2">
        <el-row :gutter="25">
          <el-col :span="15">
            <ul>
              <!-- row2.1 -->
              <li style="align-items: center;margin-bottom: 5px;">
                <label style="width: 128px;">店铺ID信息：</label>
                <el-input v-model="mallIDinfo" type="textarea" :rows="3" placeholder="请输入内容" />
                <div>
                  <el-button type="primary" size="mini" style="margin-left: 10px;margin-bottom: 5px;">添加店铺信息</el-button>
                  <el-button type="primary" size="mini">清空店铺信息</el-button>
                </div>
              </li>
              <!-- row2.2 -->
              <li style="margin-left: 80px;">
                <el-button type="primary" size="mini">开始关注</el-button>
                <el-button type="primary" size="mini">取消操作</el-button>
              </li>
            </ul>
          </el-col>
          <el-col :span="9"><div class="grid-content bg-purple" />
            <ul>
              <!-- row2.1 -->
              <li>
                <el-button type="primary" size="mini" style="width:105px">开始取关</el-button>
                <el-button type="primary" size="mini">取消操作</el-button>
              </li>
              <!-- row2.2 -->
              <li>
                <el-button type="primary" size="mini">取关所有用户</el-button>
                <el-button type="primary" size="mini">取关未关注我的用户</el-button>
              </li>
              <li style="height:30px" />
            </ul>
          </el-col>
        </el-row>
      </li>
      <!-- row3 -->
      <li style="color:red">温馨提示：关注用户或者取关啊用户后，获取到的关注用户量和粉丝量可能不准确，有缓存（shopee官网缓存），请稍后查看。</li>
      <!-- row4 -->
      <li>
        <el-table
          :header-cell-style="{ background: '#f7fafa' }"
          :data="tableList"
          :row-style="{ height: '50px' }"
          height="calc(100vh - 220px)"
        >
          <el-table-column prop="" label="序列号" min-width="100px" align="center" />
          <el-table-column prop="" label="站点" min-width="150px" align="center" />
          <el-table-column prop="" label="店铺名" min-width="150px" align="center" />
          <el-table-column prop="" label="关注中" min-width="150px" align="center" />
          <el-table-column prop="" label="粉丝" min-width="150px" align="center" />
          <el-table-column prop="" label="新增关注数量" min-width="150px" align="center" />
          <el-table-column prop="" label="取关数量" min-width="150px" align="center" />
          <el-table-column prop="" label="操作状态" min-width="150px" align="center" />
        </el-table>
      </li>
    </ul>
    <el-dialog
      title="店铺搜索"
      :visible.sync="dialog_mallSearch"
      width="950px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      class="dialog_mall"
    >
      <ul>
        <!-- row1 -->
        <li>
          <label>关键词</label>
          <el-input v-model="keyword" size="mini" style="width:100px" clearable />
          <label>评论数</label>
          <el-input v-model="minComment" onkeyup="value=value.replace(/[^\d]/g,0)" style="width:80px" size="mini" />-
          <el-input v-model="maxComment" onkeyup="value=value.replace(/[^\d]/g,0)" style="width:80px" size="mini" />
          <label>点赞数</label>
          <el-input v-model="minLike" onkeyup="value=value.replace(/[^\d]/g,0)" style="width:80px" size="mini" />-
          <el-input v-model="maxLike" onkeyup="value=value.replace(/[^\d]/g,0)" style="width:80px" size="mini" />
        </li>
        <!-- row3 -->
        <li>
          <label>评分数</label>
          <el-input v-model="minScore" onkeyup="value=value.replace(/[^\d]/g,0)" style="width:80px" size="mini" />-
          <el-input v-model="maxScore" onkeyup="value=value.replace(/[^\d]/g,0)" style="width:80px" size="mini" />
          <label style="margin-left:50px">店铺数</label>
          <el-input v-model="mallNum" onkeyup="value=value.replace(/[^\d]/g,0)" style="width:80px" size="mini" />
          <el-button type="primary" size="mini" style="margin-left:30px">搜索</el-button>
          <el-button type="primary" size="mini">添加勾选店铺</el-button>
          <el-button type="primary" size="mini">关闭弹窗</el-button>
        </li>
        <!-- row2 -->
        <li>
          <el-table
            :header-cell-style="{ background: '#f7fafa' }"
            :data="mallSearchList"
            :row-style="{ height: '50px' }"
            max-height="400"
            @selection-change="handleSelectionChange"
          >
            <el-table-column align="center" width="55" type="selection" />
            <el-table-column prop="" label="店铺ID" min-width="100px" align="center" />
            <el-table-column prop="" label="产品标题" min-width="150px" align="center" />
            <el-table-column prop="" label="主图" min-width="100px" align="center" fixed="right" />
            <el-table-column prop="" label="点赞数" min-width="100px" align="center" fixed="right" />
            <el-table-column prop="" label="评论数" min-width="100px" align="center" fixed="right" />
            <el-table-column prop="" label="产品评分" min-width="100px" align="center" fixed="right" />
            <el-table-column prop="" label="操作" min-width="100px" align="center" fixed="right">
              <template>
                <el-button type="primary" size="mini">查看产品</el-button>
                <el-button type="primary" size="mini">添加店铺</el-button>
              </template>
            </el-table-column>
          </el-table>
        </li>

      </ul>
    </el-dialog>
    <Logs ref="Logs" v-model="showlog" clear />
  </div>
</template>

<script>
import StoreChoose from '../../../components/store-choose'
export default {
  name: 'BusinessAnalyseGoodsDiscount',
  components: {
    StoreChoose
  },
  data() {
    return {
      mallIDinfo: '', // 店铺ID信息
      showlog: false,
      // 弹窗
      dialog_mallSearch: true,
      keyword: '', // 关键词
      minComment: '50', // 评论数
      maxComment: '5000',
      minLike: '100', // 点赞数
      maxLike: '10000',
      minScore: '4.5', // 评分数
      maxScore: '5',
      mallNum: '10', // 店铺数
      mallSearchList: [] // 弹窗列表
    }
  },
  methods: {
    // 清除日志
    clearLog() {
      this.$refs.Logs.consoleMsg = ''
    },
    // 选择的店铺
    changeMallList() {},
    // 多选
    handleSelectionChange() {}
  }
}
</script>

<style scoped lang='less'>
.detail{
  width: 100%;
  height: 100%;
  padding: 5px;
  background-color: white;
  .dialog_mall{
    label:not(:first-child){
        margin-left: 30px;
      }
    .el-input{
        margin:0px 5px;
    }

  }
    li{
     display: flex;
     margin-bottom: 5px;
     align-items: center;
    }

    .row2{
      ul{
        border: 1px solid #dcdedc;
        padding: 10px;
        border-radius: 5px;
        margin-top: 10px;
      }
    }
    .Follow{
      position: absolute;
    padding: 5px;
    background-color: white;
    z-index: 999;
    left: 16px;
    top: 35px;
    }
    .cancerFollow{
    position: absolute;
    padding: 5px;
    background-color: white;
    z-index: 999;
    left: 560px;
    top: 35px;

    }

  }

</style>
