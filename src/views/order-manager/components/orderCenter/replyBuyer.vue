<!--
 * @Author: your name
 * @Date: 2021-11-26 11:02:21
 * @LastEditTime: 2021-11-29 14:27:37
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \shopeeman-new\src\views\order-manager\components\orderCenter\replayBuyer.vue
-->
<template>
  <div class="reply-buyer">
    <div class="reply-box">
      <div class="reply-item" v-for="(item,index) in replyData" :key="index">
        <div class="item">
          <span>{{item.countryLabel}}</span>
        </div>
        <div class="item box-center mar-right">
          <p>评论：</p>
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="item.replyText"> </el-input>
        </div>
        <div class="item box-right">
          <p>星级</p>
          <el-rate v-model="item.rate" class="rateSize"></el-rate>
        </div>
      </div>
    </div>
    <div class="reply-btn">
      <el-button type="primary" size="mini" @click="setReplyData">确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReplyBuyer',
  data() {
    return {
      textarea:'',
      value1:5,
      replyData:[],
      country:this.$filters.countries_option
    }
  },
  props: {
    chooseData: {
      type: Array,
      default: [],
    },
  },
  mounted(){
    console.log("country",this.country)
    this.getReplyData()
  },
  methods: {
    async getReplyData(){
      let res = await this.$api.getUserInfo()
      console.log(res,"fd")
      if(res.data.code === 200 && res.data.data.evaluate_order_buyer_config && JSON.parse(res.data.data.evaluate_order_buyer_config).length>0){
        let data = JSON.parse(res.data.data.evaluate_order_buyer_config)
        this.replyData = data
      }else{
        let list = []
        this.country.forEach(item => {
          let obj = {
            country: item.value,
            countryLabel: item.label,
            replyText:"",
            rate:0,
          }
          list.push(obj)
        });
        this.replyData = list
      }
    },
    async setReplyData(){
      let params = {
        evaluateOrderBuyerConfig:JSON.stringify(this.replyData)
      }
      let res = await this.$api.saveUserConfig(params)
      if(res.data.code===200){
        this.$message.success('设置成功')
      }else{
        this.$message.error(`设置失败，${res.data.message}`)
      }
      console.log(res,"57587")
    }
  }
}
</script>

<style lang="less" scoped>
.mar-right{
  margin-right:20px;
}
.reply-buyer {
  .reply-box {
    height: 500px;
    overflow: auto;
    .reply-item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .box-center{
        flex: 6;
      }
      .box-right{
        flex:3;
      }
      .item{
        p{
          width:50px;
        }
        span{
          display: inline-block;
          width:60px;
        }
        .rateSize{
          font-size:16px !important;
        }
        display: flex;
        align-items: center;
      }
    }
  }
  .reply-btn{
    display:flex;
    justify-content: center;
  }
}
</style>