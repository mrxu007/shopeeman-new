<template>
  <div class="detail">
    <ul>
      <!-- row1 -->
      <li>
        <storeChoose style="margin-left:-2px" @changeMallList="changeMallList" />
        <el-button type="primary" size="mini" @click="clearLog">清除日志</el-button>
        <el-button type="primary" size="mini" @click="setQurey">参数设置</el-button>
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
                  <el-button type="primary" size="mini" style="margin-left: 10px;margin-bottom: 5px;" @click="addCancerMall">添加关注店铺</el-button>
                  <el-button type="primary" size="mini">清空店铺信息</el-button>
                </div>
              </li>
              <!-- row2.2 -->
              <li style="margin-left: 80px;">
                <el-button type="primary" size="mini" @click="startCancer">开始关注</el-button>
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
          <el-table-column type="index" label="序列号" min-width="100px" align="center" />
          <el-table-column prop="" label="站点" min-width="150px" align="center">
            <template v-slot="{row}">{{ row.country | chineseSite }}</template>
          </el-table-column>
          <el-table-column prop="" label="店铺名" min-width="150px" align="center">
            <template v-slot="{row}">{{ row.mall_alias_name || row.platform_mall_name }}</template>
          </el-table-column>
          <el-table-column prop="following" label="关注中" min-width="150px" align="center" />
          <el-table-column prop="fence" label="粉丝" min-width="150px" align="center" />
          <el-table-column prop="newFollow" label="新增关注数量" min-width="150px" align="center" />
          <el-table-column prop="cancerFollow" label="取关数量" min-width="150px" align="center" />
          <el-table-column prop="state" label="操作状态" min-width="150px" align="center" />
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
          <el-button type="primary" size="mini" style="margin-left:30px" @click="searchMall">搜索</el-button>
          <el-button type="primary" size="mini" @click="addTargetMall">添加勾选店铺</el-button>
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
    <!-- 用户设置 -->
    <el-dialog
      title="用户设置"
      :visible.sync="dialog_userInfo"
      width="700px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      class="dialog_mall"
    >
      <autoFollow :user-info="userInfo" @isSave="setSave" />
    </el-dialog>
    <Logs ref="Logs" v-model="showlog" clear />
  </div>
</template>

<script>
import StoreChoose from '../../../components/store-choose'
import autoFollow from '@/views/user-config/autoFollow.vue'
import MallManagerAPI from '@/module-api/market-activity-api/ai-addFence'
export default {
  name: 'BusinessAnalyseGoodsDiscount',
  components: {
    StoreChoose,
    autoFollow
  },
  data() {
    return {
      MallAPIInstance: new MallManagerAPI(this),
      selmallList: [],
      // 参数设置
      isSave: false, // 是否保存
      // 弹窗--用户设置
      dialog_userInfo: false,
      userInfo: '',

      mallIDinfo: '', // 店铺ID信息
      showlog: false,
      tableList: [], // 表格
      // 弹窗-店铺搜索
      dialog_mallSearch: false, // 弹窗
      keyword: '', // 关键词
      minComment: '50', // 评论数
      maxComment: '5000',
      minLike: '100', // 点赞数
      maxLike: '10000',
      minScore: '4.5', // 评分数
      maxScore: '5',
      mallNum: '10', // 店铺数
      mallSearchList: [], // 弹窗列表
      sel_mallSearchList: [] // 多选店铺
    }
  },
  created() {
    this.getUserinfo() // 获取用户设置数据
  },
  methods: {
    // 添加关注店铺--弹窗
    addCancerMall() {
      if (!this.tableList.length) {
        this.$message.warning('请先设置参数')
        return
      }
      this.dialog_mallSearch = true
    },
    // 添加关注店铺--获取关注店铺ID
    async searchMall(item) {
      console.log(this.userInfo)
      if (!this.keyword) {
        this.$message.warning('请输入关键字')
        return
      }
      const params = {}
      params['country'] = item.country
      params['mallId'] = item.mallId
      params['by'] = 'relevancy'
      params['keyword'] = this.keyword
      params['limit'] = 50
      params['newest'] = 0
      params['order'] = 'desc'
      params['page_type'] = 'search'
      const res = await this.MallManagerAPI.addCancerMall(params)
      let array = res.data.data || []
      // 控制店铺商品上限
      while (array.length < Number(this.userInfo.auto_attention_set.ProductMax)) {
        params['newest'] += 50
        const res = await this.MallManagerAPI.addCancerMall(params)
        array = array.concat(array)
      }
      this.mallSearchList = res.data.data
    },
    // 添加关注店铺--目标店铺--赋值给mallIDinfo
    addTargetMall(val) {
      const mallIDList = []
      this.sel_mallSearchList.forEach(el => {
        mallIDList.push(el.mallID)
      })
      const str = mallIDList.toString().replace(',', '\n')
      this.mallIDinfo = str
    },
    // 开始关注
    startCancer() {

    },
    // 获取用户数据
    async getUserinfo() {
      this.showlog = true
      const res = await this.$api.userSet()
      if (res.data.code === 200) {
        this.userInfo = res.data.data
      } else {
        this.$message.warning(`信息获取失败！${res.data.data.message}`)
      }
    },
    // 参数设置保存
    setSave(val) {
      this.tableList = []
      console.log('199', this.selmallList)
      if (val) {
        this.selmallList.forEach(el => {
          const obj = { ...el }
          obj['following'] = 0
          obj['fence'] = 0
          obj['newFollow'] = 0
          obj['cancerFollow'] = 0
          obj['state'] = '-'
          this.tableList.push(obj)
        })
      }
      this.dialog_userInfo = false
    },
    // 参数设置
    async setQurey() {
      this.dialog_userInfo = true
    },
    // 清除日志
    clearLog() {
      this.$refs.Logs.consoleMsg = ''
    },
    // 选择的店铺
    changeMallList(val) {
      this.selmallList = val
    },
    // 多选
    handleSelectionChange(val) {
      this.sel_mallSearchList = val
    }
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
