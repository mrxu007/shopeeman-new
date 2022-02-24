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
              <el-radio label="1">店铺粉丝</el-radio>
              <el-radio label="2">店铺评价用户</el-radio>
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
        <el-checkbox v-model="market" style="margin-bottom:10px">不关注订单评价小于等于
          <el-input v-model="marketNum" onkeyup="value=value.replace(/[^\d]/g,0)" style="width:50px" size="mini" />
          的用户
        </el-checkbox>
        <!--  -->
        <el-checkbox v-model="followDay">不关注
          <el-input v-model="followDayNum" onkeyup="value=value.replace(/[^\d]/g,0)" style="width:75px" size="mini" />
          天内关注过的用户
        </el-checkbox>
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
          <el-input v-model="followKey" onkeyup="value=value.replace(/[^\d]/g,0)" style="width:50px" size="mini" />
          <el-checkbox v-model="showlog" style="margin-left:30px">隐藏日志</el-checkbox>
        </div>

      </li>
      <el-button type="primary" size="mini" style="flex:1;margin-left:200px;width:100px ;">保存</el-button>
    </ul>
    <Logs ref="Logs" v-model="showlog" clear class="logBox" />
  </div>
</template>

<script>

export default {
  components: {

  },
  data() {
    return {
      limitgGoods: '5', // 店铺商品上限
      lastOnline: '1', // 最后活跃时间

      followActor: '1', // 关注对象
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
  created() {

  },
  methods: {

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

