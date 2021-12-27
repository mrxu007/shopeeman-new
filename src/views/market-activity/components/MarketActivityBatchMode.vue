<!--
 * @Author: your name
 * @Date: 2021-12-27 10:59:26
 * @LastEditTime: 2021-12-27 15:32:09
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \shopeeman-new\src\views\market-activity\components\MarketActivityBatchMode.vue
-->
<template>
  <div class="batch-chat">
    <div class="select-box">
      <div class="select-mall">
        <storeChoose :is-all="true" :span-width="'80px'" :select-width="'180px'" :source="'orderCenter'" @changeMallList="changeMallList" />
        <el-button type="primary" size="mini" @click="chatStart" class="mar-left">开 始</el-button>
        <el-button size="mini" type="primary" @click="clearLog" class="mar-left">清空日志</el-button>
        <el-checkbox v-model="showConsole" class="mar-left">隐藏日志</el-checkbox>
      </div>
      <div class="chat-set-box">
        <div class="base-box left-box">
          <span class="base-title">私聊对象</span>
          <div class="base-item">
            <div class="row-style">
              <el-radio v-model="radio" label="order">订单客户</el-radio>
              <el-radio v-model="radio" label="fans">粉丝用户</el-radio>
            </div>
            <div class="row-style">
              <p><el-checkbox v-model="filterCheck">过滤 </el-checkbox><el-input v-model="filterDays" placeholder="请输入内容" size="mini" style="width: 50px"></el-input> 天以前的订单</p>
            </div>
            <div class="row-style">
              <div class="base-box mar-top">
                <span class="base-title">订单类型选择</span>
                <div class="base-item">
                  <el-checkbox-group v-model="orderType">
                    <el-checkbox v-for="type in orderTypeList" :label="type.value" :key="type.value">{{ type.label }}</el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="base-box center-box mar-left">
          <span class="base-title">私聊内容</span>
          <div class="base-item">
            <div class="row-style">
              <el-input type="textarea" :rows="3" v-model="chatContent" clearable size="mini" style="height: 60px"> </el-input>
              <div class="chat-content-btn">
                <el-button type="primary" size="mini" >添加消息</el-button>
                <el-tooltip class="item" effect="dark" content="若添加多条内容则会随机选择一条发送，建议添加多条不通的内容降低被平台屏蔽风险" placement="right-end">
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </div>
            </div>
            <div class="row-style">
              <div class="chat-content-list"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Logs ref="Logs" v-model="showConsole" clear />
  </div>
</template>

<script>
import storeChoose from '../../../components/store-choose'
export default {
  name: 'BusinessAnalyseStoreSelection',
  components: {
    storeChoose,
  },
  data() {
    return {
      selectMallList: [],
      showConsole: true,
      radio: 'order',
      filterDays: 30,
      filterCheck: false,
      orderType: ['unpaid'],
      orderTypeList: [
        {
          label: '未支付',
          value: 'unpaid',
        },
        {
          label: '待发货',
          value: 'toship',
        },
        {
          label: '已发货',
          value: 'shiped',
        },
        {
          label: '已取消',
          value: 'cancelled',
        },
        {
          label: '已完成',
          value: 'completed',
        },
      ],
      chatContent: '',
    }
  },
  mounted() {},
  methods: {
    chatStart() {},
    clearLog() {
      this.$refs.Logs.consoleMsg = ''
    },
    changeMallList(val) {
      console.log(val)
      this.selectMallList = val.mallList
    },
  },
}
</script>

<style lang="less" scoped >
.batch-chat {
  margin: 10px;
  overflow: hidden;
  background: #fff;
  /deep/.el-dialog__body {
    padding: 10px 20px;
  }
  .tableActive {
    color: red;
    cursor: pointer;
  }
  .copyStyle {
    margin-right: 8px;
    cursor: pointer;
  }
}
.mar-left {
  margin-left: 10px;
}
.mar-top {
  margin-top: 10px;
}
.base-box {
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  padding: 10px;
  position: relative;
  min-width: 160px;
  height: 100%;
  .base-title {
    padding: 0 5px;
    display: inline-block;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background: #fff;
    position: absolute;
    left: 10px;
    top: -10px;
  }
  .base-item {
    /deep/.el-checkbox {
      margin-right: 10px;
    }
  }
}
.row-style {
  display: flex;
  padding-bottom: 8px;
  // align-items: center;
  .chat-content-btn {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 10px;
    i {
      font-size: 16px !important;
      text-align: center;
      cursor: pointer;
    }
  }
  .chat-content-list {
    margin-top: 10px;
    border: 1px solid #dcdcdc;
    height: 100px;
    width: 100%;
  }
}
.select-box {
  margin-top: 10px;
  background: #fff;
  overflow: auto;
  .select-mall {
    display: flex;
    align-items: center;
  }
  .chat-set-box {
    display: flex;
    overflow: auto;
    padding: 16px;
    height: 230px;
    .left-box {
      width: 260px;
    }
    .center-box {
      width: 300px;
    }
  }
}
</style>
