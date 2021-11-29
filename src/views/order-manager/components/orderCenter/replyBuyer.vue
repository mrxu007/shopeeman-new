<!--
 * @Author: your name
 * @Date: 2021-11-26 11:02:21
 * @LastEditTime: 2021-11-26 11:28:05
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \shopeeman-new\src\views\order-manager\components\orderCenter\replayBuyer.vue
-->
<template>
  <div class="reply-buyer">
    <div class="reply-box">
      <div class="reply-item" v-for="(item,index) in replyData" :key="index">
        <div class="item">
          <span>马来站</span>
        </div>
        <div class="item box-center mar-right">
          <p>评论：</p>
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input>
        </div>
        <div class="item box-right">
          <p>星级</p>
          <el-rate v-model="value1" class="rateSize"></el-rate>
        </div>
      </div>
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
      replyData:[0,0]
    }
  },
  props: {
    chooseData: {
      type: Array,
      default: [],
    },
  },
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
}
</style>