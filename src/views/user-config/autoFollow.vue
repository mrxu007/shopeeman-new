<template>
  <div class="detail">
    <ul>
      <!-- row1 -->
      <span>&nbsp; 通用设置 &nbsp;</span>
      <li>
        <div>
          <label>店铺商品上限：</label>
          <el-input v-model="limitgGoods" onkeyup="value=value.replace(/[^\d]/g,0)" style="width:50px" size="mini" />
          <label style="margin-left:180px">最后活跃时间：</label>
          <el-input v-model="lastOnline" onkeyup="value=value.replace(/[^\d]/g,0)" style="width:50px" size="mini" /> &nbsp;天内
        </div>
      </li>
      <!-- row2 -->
      <span>&nbsp;  关注设置 &nbsp;</span>
      <li>
        <!--  -->
        <ul style="margin-top:-10px">
          <span style="margin-left:-20px">&nbsp;  关注对象 &nbsp;</span>
          <li style="width:450px;margin-left:-20px">
            <el-radio-group v-model="followActor">
              <el-radio label="0">店铺粉丝</el-radio>
              <el-radio label="1">店铺评价用户</el-radio>
            </el-radio-group>
          </li>
        </ul>
        <!--  -->
        <div style="margin-bottom:10px">
          <label>关注数量：</label>
          <el-input v-model="followNum" onkeyup="value=value.replace(/[^\d]/g,0)" style="width:80px" size="mini" />
          （0为无限制）
          <label style="margin-left:110px">关注间隔：</label>
          <el-input v-model="interTime" onkeyup="value=value.replace(/[^\d]/g,0)" style="width:50px" size="mini" />
          秒
        </div>
        <!--  -->
        <div>
          <el-checkbox v-model="market" style="margin-bottom:10px">不关注订单评价小于等于
          </el-checkbox>
          <el-input v-model="marketNum" style="width:50px" size="mini" @blur="market=true" />
          的用户
        </div>
        <!--  -->
        <div>
          <el-checkbox v-model="followDay">不关注
          </el-checkbox>
          <el-input v-model="followDayNum" onkeyup="value=value.replace(/[^\d]/g,0)" style="width:75px" size="mini" @blur="followDay=true" />
          天内关注过的用户
        </div>
      </li>
      <!-- row3 -->
      <span>&nbsp; 取关设置  &nbsp;</span>
      <li>
        <div>
          <label>取关数量：</label>
          <el-input v-model="cancerFollowNum" onkeyup="value=value.replace(/[^\d]/g,0)" style="width:80px" size="mini" />
          （0为无限制）
        </div>
      </li>
      <!-- row4 -->
      <span>&nbsp; 自动关注 &nbsp;</span>
      <li class="orderSet">
        <div>
          <el-tooltip class="item" effect="dark" placement="top-start">
            <div slot="content">
              开启任务请前往【爆粉神器】添加执行任务的店铺，随后进行参数设置<br>
              注意：1.关键词不能为空<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.一个站点只能执行一条任务<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.同一个站点的任务保存会替换原来的任务<br>
            </div>
            <el-checkbox v-model="startAddFence">开启定时刷粉</el-checkbox>
          </el-tooltip>
          <label>每日启动时间 &nbsp;</label>
          <el-time-select
            v-model="startTime"
            :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '18:30'
            }"
            style="width:100px"
            placeholder="选择时间"
            size="mini"
          />
          <label style="margin-left:20px">关注关键词：</label>
          <el-input v-model="followKey" style="width:80px" size="mini" />
          <el-checkbox v-model="showlog" style="margin-left:8px">隐藏日志</el-checkbox>
        </div>

      </li>
      <el-button type="primary" size="mini" style="flex:1;margin-left:200px;width:100px;" @click="save()">保存</el-button>
    </ul>
    <Logs ref="Logs" v-model="showlog" clear class="logBox" />
  </div>
</template>

<script>
import { waitStart } from '@/util/util'
export default {
  components: {

  },
  props: ['userInfo', 'mall'],
  data() {
    return {
      userID: '', // 用户ID
      uid: '', // 用户ID

      showlog: true, // 日志
      limitgGoods: '5', // 店铺商品上限
      lastOnline: '1', // 最后活跃时间

      followActor: '0', // 关注对象
      followNum: '100', // 关注数量
      interTime: '10', // 关注间隔
      market: true, // 不关注订单评价小于等于
      marketNum: '4.5', // 分数
      followDay: true, // 不关注xx天
      followDayNum: '30', // 不关注xx天

      cancerFollowNum: 100, // 取关数量
      startAddFence: false, // 开启定时刷粉
      startTime: '10:00', // 每日启动时间
      followKey: '' // 关注关键词
    }
  },
  async mounted() {
    await waitStart(() => {
      return this.userInfo && this.userInfo.id
    })
    await this.getUserinfo() // 用户信息
  },
  methods: {
    getUserinfo() {
      if (this.userInfo && this.userInfo.auto_attention_set) {
        const data = this.userInfo
        console.log('124', data.autoAttentionSet)
        this.limitgGoods = this.userInfo.auto_attention_set.ProductMax // 店铺商品上限
        this.lastOnline = this.userInfo.auto_attention_set.LastLoginDay // 最后活跃时间
        this.followActor = this.userInfo.auto_attention_set.FollowType.toString() // 关注对象
        this.followNum = this.userInfo.auto_attention_set.FollowNumber // 关注数量
        this.interTime = this.userInfo.auto_attention_set.FollowInterval// 关注间隔
        this.marketNum = this.userInfo.auto_attention_set.MinOrderEvaluation // //不关注订单评价小于等于
        this.market = this.userInfo.auto_attention_set.IsNotFollowMinOrderEvaluation // 是否不关注订单评价小于等于最小值的卖家
        this.followDayNum = this.userInfo.auto_attention_set.FollowedDay // 天内关注过的用户
        this.followDay = this.userInfo.auto_attention_set.IsNotFollowFollowedDay // 是否不关注一定天数内已关注的卖家
        this.cancerFollowNum = this.userInfo.auto_attention_set.CancelFollowNumber // 取关数量：
        this.startAddFence = this.userInfo.auto_attention_set.IsOpenTimerBrushFans // 开启定时刷粉
        this.startTime = (this.userInfo.auto_attention_set.OpenHour) + ':' + (this.userInfo.auto_attention_set.OpenMinute) // 每日启动时间
        console.log(this.startTime)
        this.followKey = this.userInfo.auto_attention_set.KeyWord // 关注关键词
      }
    },
    async save() {
      // 自动刷粉
      if (this.startAddFence && !this.mall) {
        this.$message.warning('请前往【爆粉神器】设置需要执行的任务的店铺')
        return
      }
      debugger
      if (this.startAddFence && !this.followKey) {
        this.$message.warning('关键词不能为空')
        return
      }
      const cTime = this.startTime.split(':')
      // 自动刷粉-任务
      if (this.startAddFence) {
        // 查看当前站点是否有过任务
        const mallTest = await window.BaseUtilBridgeService.getAttentionUserTask(this.mall[0].country)
        // 删除原任务
        if (mallTest) {
          const delMallTest = await window.BaseUtilBridgeService.deleteAttentionUserTask(mallTest.id)
        }
        // 添加新任务
        const params = {
          'country': this.mall[0].country,
          'mall_ids': this.mall.map(item => item['platform_mall_id']).toString(),
          'mall_names': this.mall.map(item => item['mall_alias_name'] || item['platform_mall_name']).toString(),
          'product_max': this.limitgGoods,
          'last_login_day': this.lastOnline,
          'open_hour': cTime[0],
          'open_minute': cTime[1],
          'key_word': this.followKey,
          'follow_number': this.followNum,
          'follow_interval': this.interTime,
          'is_not_follow_min_order_evaluation': this.market,
          'min_order_evaluation': this.marketNum,
          'is_not_follow_followed_day': this.followDay,
          'followed_day': this.followDayNum,
          'followed_type': this.followActor,
          'cancel_follow_number': this.cancerFollowNum,
          'cancel_follow_sort_type': 0
        }
        const aa = params
        debugger
        return
        const addTest = await window.BaseUtilBridgeService.saveAttentionUserTask()
      }
      // 保存设置
      const content = {
        ProductMax: this.limitgGoods, // 店铺商品上限
        LastLoginDay: this.lastOnline, // 最后活跃时间
        FollowType: this.followActor, // 关注对象
        FollowNumber: this.followNum, // 关注数量
        FollowInterval: this.interTime, // 关注间隔
        MinOrderEvaluation: this.marketNum, // //不关注订单评价小于等于
        IsNotFollowMinOrderEvaluation: this.market, //
        FollowedDay: this.followDayNum, // 天内关注过的用户
        IsNotFollowFollowedDay: this.followDay, //
        CancelFollowNumber: this.cancerFollowNum, // 取关数量：
        IsOpenTimerBrushFans: this.startAddFence, // 开启定时刷粉
        OpenHour: cTime[0],
        OpenMinute: cTime[1],
        KeyWord: this.followKey, // 关注关键词
        IsNotFollowCrossBorderSeller: false, // 是否不关注跨境卖家
        CancelFollowSortType: '0' // 取消关注排序
      }
      const param = {
        content: {
          autoAttentionSet: JSON.stringify(content)
        },
        type: 4
      }
      // console.log(JSON.stringify(param))
      try {
        const res = await this.$api.setUserinfo(JSON.stringify(param))
        if (res.data.code === 200) {
          this.$message.success('信息修改成功！')
        } else {
          this.$message.warning(`信息修改失败！${res.data.message}`)
        }
        console.log('137', res)
      } catch (error) {
        console.log(`139line-${error}`)
      }
      this.$emit('isSave', true)
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
        width: 600px;
        padding: 10px;
        padding-top: 20px;
        padding-left: 20px;
        border-radius: 5px;
        margin-bottom: 10px;
            display: flex;
        flex-direction: column;
         }
       span{
           position: relative;
    bottom: -5px;
    left: 11px;
    background-color: white;
       }

     }
     .orderSet{
       .el-checkbox{
         margin-bottom: 5px;
       }
     }

 }
</style>

