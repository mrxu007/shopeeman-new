<!--
 * @Author: your name
 * @Date: 2021-11-26 11:02:21
 * @LastEditTime: 2021-12-15 18:37:24
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \shopeeman-new\src\views\order-manager\components\orderCenter\replayBuyer.vue
-->
<template>
  <div class="reply-buyer">
    <div class="reply-box">
      <div v-for="(item, index) in replyData" :key="index" class="reply-item">
        <div class="item">
          <span>{{ item.countryLabel }}</span>
        </div>
        <div class="item box-center mar-right">
          <p>评论：</p>
          <el-input v-model="item.replyText" type="textarea" :rows="2" resize="none" placeholder="请输入内容" />
        </div>
        <div class="item box-right">
          <p>星级</p>
          <el-rate v-model="item.rate" class="rateSize" />
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
  props: {
    chooseData: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      textarea: '',
      value1: 5,
      replyData: [],
      country: this.$filters.countries_option,
      key: ''
    }
  },
  mounted() {
    console.log('country', this.country)
    this.getReplyData()
  },
  methods: {
    async getReplyData() {
      const userInfo = await window['ConfigBridgeService'].getUserInfo()
      this.key = userInfo.Usernam + '_replyconfig'
      const info = await window['ConfigBridgeService'].temporaryCacheInfo('get', this.key, '')
      if (info == '{}') {
        console.log('6456')
        const res = await this.$api.getUserInfo()
        if (res.data.code === 200 && res.data.data.evaluate_order_buyer_config && JSON.parse(res.data.data.evaluate_order_buyer_config).length > 0) {
          const data = JSON.parse(res.data.data.evaluate_order_buyer_config)
          this.replyData = data
        } else {
          const list = []
          this.country.forEach((item) => {
            const obj = {
              country: item.value,
              countryLabel: item.label,
              replyText: '',
              rate: 0
            }
            list.push(obj)
          })
          this.replyData = list
        }
      } else {
        this.replyData = JSON.parse(info)
      }
    },
    async setReplyData() {
      const params = {
        evaluateOrderBuyerConfig: JSON.stringify(this.replyData)
      }
      await window['ConfigBridgeService'].temporaryCacheInfo('save', this.key, this.replyData)
      const res = await this.$api.saveUserConfig(params)
      if (res.data.code === 200) {
        this.$message.success('设置成功')
        await this.getReplyData()
        await this.replyOrderBuyer()
        this.$emit('close')
      } else {
        this.$message.error(`设置失败，${res.data.message}`)
      }
    },
    async replyOrderBuyer() {
      this.$parent.$parent.showConsole = false // 打开日志
      this.$parent.$parent.$refs.Logs.consoleMsg = ''
      for (let i = 0; i < this.chooseData.length; i++) {
        const item = this.chooseData[i]
        const replyInfo = this.replyData.find((n) => {
          return n.country === item.country
        })
        const params = {
          order_id: item.order_id,
          rate_star: replyInfo.rate,
          rate_comment: replyInfo.replyText,
          shop_id: item.mall_info.platform_mall_id
        }
        const res = await this.$shopeemanService.rateOrder(item.country, params)
        if (res.code === 200) {
          this.$parent.$parent.$refs.Logs.writeLog(`【${item.order_sn}】回复成功`, true)
        } else {
          this.$parent.$parent.$refs.Logs.writeLog(`【${item.order_sn}】，${res.data}`, false)
        }
      }
      this.$parent.$parent.$refs.Logs.writeLog(`回复结束，请至客服聊聊查看回复信息`, true)
    }
  }
}
</script>

<style lang="less" scoped>
.mar-right {
  margin-right: 20px;
}
.reply-buyer {
  .reply-box {
    height: 500px;
    overflow: auto;
    .reply-item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .box-center {
        flex: 6;
      }
      .box-right {
        flex: 3;
      }
      .item {
        p {
          width: 50px;
        }
        span {
          display: inline-block;
          width: 60px;
        }
        .rateSize {
          font-size: 16px !important;
        }
        display: flex;
        align-items: center;
      }
    }
  }
  .reply-btn {
    display: flex;
    justify-content: center;
  }
}
</style>
