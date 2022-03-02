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

          <el-checkbox v-model="startAddFence">开启定时刷粉</el-checkbox>
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
  props: ['userInfo'],
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
      followKey: ''// 关注关键词
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
      const cTime = this.startTime.split(':')
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
      console.log(JSON.stringify(param))
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

