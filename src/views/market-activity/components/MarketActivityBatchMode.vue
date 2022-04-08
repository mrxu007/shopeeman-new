<template>
  <div class="batch-chat">
    <div class="select-box">
      <div class="select-mall">
        <storeChoose :is-all="true" :span-width="'80px'" :select-width="'180px'" :source="'orderCenter'" @changeMallList="changeMallList" />
        <el-button v-if="!btnLoading" type="primary" size="mini" class="mar-left" @click="chatStart">开 始</el-button>
        <el-button v-else type="primary" size="mini" class="mar-left" @click="cancel">停 止</el-button>
        <el-button size="mini" type="primary" class="mar-left" @click="clearLog">清空日志</el-button>
        <el-checkbox v-model="showConsole" class="mar-left">隐藏日志</el-checkbox>
      </div>
      <div class="chat-set-box">
        <div class="base-box left-box">
          <span class="base-title">私聊对象</span>
          <div class="base-item">
            <div class="row-style">
              <el-radio-group v-model="radio" @change="changeUserType">
                <el-radio label="order">订单客户</el-radio>
                <el-radio label="fans">粉丝用户</el-radio>
              </el-radio-group>
              <!-- <el-radio v-model="radio" label="order">订单客户</el-radio>
              <el-radio v-model="radio" label="fans">粉丝用户</el-radio> -->
            </div>
            <div class="row-style">
              <p>
                <el-checkbox v-model="filterCheck" :disabled="radio === 'fans'">过滤 </el-checkbox><el-input v-model="filterDays" :disabled="radio === 'fans'" placeholder="请输入内容" size="mini" style="width: 50px" /> 天以前的订单
              </p>
            </div>
            <div class="row-style">
              <div class="base-box mar-top">
                <span class="base-title">订单类型选择</span>
                <div class="base-item">
                  <el-checkbox-group v-model="orderType" :disabled="radio === 'fans' || btnLoading">
                    <el-checkbox v-for="type in orderTypeList" :key="type.value" :label="type.value">{{ type.label }}</el-checkbox>
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
              <el-input v-model="sendText" type="textarea" resize="none" :rows="3" clearable size="mini" style="height: 60px" />
              <div class="chat-content-btn">
                <el-button type="primary" size="mini" :disabled="btnLoading" @click="addMessage">添加消息</el-button>
                <el-tooltip class="item" effect="dark" content="若添加多条内容则会随机选择一条发送，建议添加多条不通的内容降低被平台屏蔽风险" placement="right-end">
                  <i class="el-icon-question" />
                </el-tooltip>
              </div>
            </div>
            <div class="row-style">
              <div class="chat-content-list">
                <div v-for="(text, index) in messageList" :key="index" class="chat-content-item">
                  <el-button type="primary" size="mini" :disabled="btnLoading" @click="deleteMessage(index)">删除</el-button>
                  <span class="mar-left">{{ text }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right-box mar-left">
          <div class="base-box mar-top">
            <span class="base-title">
              <el-checkbox v-model="isSendDiscount" class="mar-left" :disabled="btnLoading">是否发送优惠券</el-checkbox>
            </span>
            <div class="base-item">
              <el-radio v-model="radioDiscountType" label="random" :disabled="btnLoading">随机优惠券</el-radio>
              <el-radio v-model="radioDiscountType" label="fixed" :disabled="btnLoading">固定优惠券</el-radio>
              <el-input v-model="discountName" size="mini" style="width: 180px" :disabled="btnLoading" />
              <el-tooltip class="item" effect="dark" content="请输入固定优惠券的名称，多个店铺可以通过名称找到相应的优惠券" placement="right-end">
                <i class="el-icon-question" />
              </el-tooltip>
            </div>
          </div>
          <div class="base-box mar-top">
            <span class="base-title">
              <el-checkbox v-model="isSendGoods" class="mar-left" :disabled="btnLoading">是否发送商品</el-checkbox>
            </span>
            <div class="base-item">
              <el-radio v-model="radioGoodsType" label="random" :disabled="btnLoading">随机商品</el-radio>
              <el-radio v-model="radioGoodsType" label="fixed" :disabled="btnLoading">固定商品</el-radio>
              <el-input v-model="GoodsId" size="mini" style="width: 180px; margin-left: 24px" :disabled="btnLoading" />
              <el-tooltip class="item" effect="dark" content="请输入固定商品ID，固定商品只在商品所在店铺下有效" placement="right-end">
                <i class="el-icon-question" />
              </el-tooltip>
            </div>
          </div>
          <div class="base-box mar-top">
            <span class="base-title">发送设置</span>
            <div class="base-item">
              发送私聊数量<el-input v-model="sendNum" size="mini" style="width: 50px" />（0标表示无限制）发送间隔 <div v-model="sendTime" size="mini" style="width: 50px" />秒
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <u-table ref="multipleTable" :data="tableData" :header-cell-style="{ background: '#f7fafa' }" height="520px">
        <u-table-column align="center" type="index" label="序号" width="50">
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </u-table-column>
        <u-table-column width="80px" label="站点" prop="country" align="center">
          <template slot-scope="{ row }">
            {{ row.country | chineseSite }}
          </template>
        </u-table-column>
        <u-table-column width="120px" label="店铺名称" align="center" show-overflow-tooltip>
          <template slot-scope="{ row }">
            {{ row.mallInfo.mall_alias_name || row.mallInfo.platform_mall_name }}
          </template>
        </u-table-column>
        <u-table-column align="center" prop="userName" label="私聊用户" width="120" show-overflow-tooltip />
        <u-table-column align="center" prop="userType" label="用户类型" width="120">
          <template slot-scope="{ row }">
            {{ userType[row.userType] }}
          </template>
        </u-table-column>
        <u-table-column align="center" prop="chatMessage" label="私聊内容" width="300" />
        <u-table-column prop="chatDiscount" label="发送优惠券" align="center" width="120px" />
        <u-table-column align="center" prop="chatGoods" label="发送商品" width="100" />
        <u-table-column align="center" prop="remark" label="操作信息" min-width="400" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.remark }}</template>
        </u-table-column>
      </u-table>
    </div>
    <Logs ref="Logs" v-model="showConsole" clear />
  </div>
</template>

<script>
import { sha256 } from 'js-sha256'
import storeChoose from '../../../components/store-choose'
import StoreSelection from '../../../module-api/market-activity-api/store-selection'
import { sleep, batchOperation, delay, terminateThread, exportExcelDataCommon } from '../../../util/util'
export default {
  name: 'BusinessAnalyseStoreSelection',
  components: {
    storeChoose
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
          value: 'unpaid'
        },
        {
          label: '待发货',
          value: 'toship'
        },
        {
          label: '已发货',
          value: 'shipping'
        },
        {
          label: '已取消',
          value: 'cancelled'
        },
        {
          label: '已完成',
          value: 'completed'
        }
      ],
      userType: {
        unpaid: '未支付订单',
        toship: '待发货订单',
        shipping: '已发货订单',
        cancelled: '已取消订单',
        completed: '已完成订单',
        fans: '粉丝用户'
      },
      chatContent: '',
      sendNum: 0,
      sendTime: 10,
      radioDiscountType: 'random',
      radioGoodsType: 'random',
      discountName: '',
      GoodsId: '',
      isSendDiscount: false,
      isSendGoods: false,
      messageList: [], // 私聊内容
      sendText: '',
      tableData: [],
      findChatList: [],
      StoreSelection: new StoreSelection(this),
      btnLoading: false,
      isStop: false
    }
  },
  mounted() {},
  methods: {
    cancel() {
      this.isStop = true
      this.btnLoading = false
      terminateThread()
      this.$refs.Logs.writeLog(`停止操作,可能需要一些时间！`, false)
      this.$alert('正在停止操作，可能需要一些时间！', '提示', {
        confirmButtonText: '确定'
      })
    },
    changeUserType() {
      if (this.radio === 'fans') {
        this.$confirm(
          '批量私聊粉丝用户操作违反shopee官方政策，可能会被shopee官方冻结台湾站店铺发送消息大于1000个后，会被官方禁言24小时，因批量私聊粉丝用户导致店铺被封，后果自行承担，请谨慎使用',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
          .then(() => {
            // this.chatStart()
          })
          .catch(() => {
            this.radio = 'order'
          })
      }
    },
    async orderBatchMessage(mall, count = { count: 5 }) {
      try {
        if (this.isStop) {
          this.btnLoading = false
          return
        }
        let mallOrderList = []
        let status = ''
        for (let i = 0; i < this.orderType.length; i++) {
          // 同步状态
          status = this.orderType[i]
          mallOrderList = (await this.getOrderUser(mall, status)) || []
        }

        if (mallOrderList.length) {
          // let fi = mallOrderList.slice(0, 1)
          let filterList = mallOrderList
          if (this.sendNum > 0) {
            if (this.sendNum >= mallOrderList.length) {
              filterList = mallOrderList
            } else {
              filterList = await this.getRandomArrayElements(mallOrderList, this.sendNum)
            }
          }
          this.$refs.Logs.writeLog(`店铺【${mall.mall_alias_name || mall.platform_mall_name}】获取到订单用户${filterList.length}条`, true)
          await this.batchSendMessage(filterList, mall, status)
          await delay(this.sendTime * 1000)
        } else {
          this.$refs.Logs.writeLog(`店铺【${mall.mall_alias_name || mall.platform_mall_name}】未获取到订单用户，聊天结束`, true)
        }
      } catch (error) {
      } finally {
        --count.count
      }
    },
    async fansBatchMessage(mall, count = { count: 5 }) {
      try {
        if (this.isStop) {
          this.btnLoading = false
          return
        }
        const status = 'fans'
        const fansList = await this.getFansAll(mall)
        console.log(fansList, 'fansList')
        if (fansList.length) {
          // let fi = fansList.slice(0, 2)
          let filterList = fansList
          if (this.sendNum > 0) {
            if (this.sendNum >= fansList.length) {
              filterList = fansList
            } else {
              filterList = await this.getRandomArrayElements(fansList, this.sendNum)
            }
          }
          this.$refs.Logs.writeLog(`店铺【${mall.mall_alias_name || mall.platform_mall_name}】获取到粉丝用户${filterList.length}条`, true)
          await this.batchSendMessage(filterList, mall, status)
          await delay(this.sendTime * 1000)
        } else {
          this.$refs.Logs.writeLog(`店铺【${mall.mall_alias_name || mall.platform_mall_name}】未获取到粉丝用户，聊天结束`, true)
        }
      } catch (error) {
      } finally {
        --count.count
      }
    },
    async chatStart() {
      this.tableData = []
      try {
        this.isStop = false
        if (!this.selectMallList.length) {
          return this.$message.warning('请选择店铺！')
        }
        if (this.radio === 'order') {
          if (!this.orderType.length) {
            return this.$message.warning('请至少选择一种订单类型！')
          }
        }
        if (
          !this.messageList.length &&
          (!this.isSendDiscount || (this.isSendDiscount && this.radioDiscountType == 'fixed' && !this.discountName)) &&
          (!this.isSendGoods || (this.isSendGoods && this.radioGoodsType == 'fixed' && !this.GoodsId))
        ) {
          return this.$message.warning('无可发送内容！')
        }
        this.btnLoading = true
        this.showConsole = false
        if (this.isStop) {
          this.btnLoading = false
          return
        }
        if (this.radio == 'order') {
          await batchOperation(this.selectMallList, this.orderBatchMessage)
        } else {
          await batchOperation(this.selectMallList, this.fansBatchMessage)
        }
        this.btnLoading = false
      } catch (error) {
        this.btnLoading = false
        console.log(error)
        this.$alert('出现错误，已停止执行', '提示', {
          confirmButtonText: '确定',
          callback: (action) => {}
        })
      }
    },
    // 取随机数组
    async getRandomArrayElements(arr, count) {
      const shuffled = arr.slice(0)
      let i = arr.length
      const min = i - count
      let temp
      let index
      while (i-- > min) {
        index = Math.floor((i + 1) * Math.random())
        temp = shuffled[index]
        shuffled[index] = shuffled[i]
        shuffled[i] = temp
      }
      return shuffled.slice(min)
    },
    async getFansAll(mall) {
      let page = 1
      const limit = 40
      let fansList = []
      let array = await this.getFans(mall, page, limit)
      while (array.length) {
        if (this.isStop) {
          break
        }
        fansList = fansList.concat(array)
        if (array.length < limit) {
          array = []
        } else {
          page++
          array = await this.getFans(mall, page, limit)
        }
      }
      console.log(fansList, 'fansList')
      return fansList
    },
    // 获取粉丝列表
    async getFans(mall, page, limit) {
      if (this.isStop) {
        this.btnLoading = false
        return
      }
      const arrList = []
      const url = await this.$shopeemanService.getWebUrl(mall.country)
      const api = url + '/shop/' + mall.platform_mall_id + '/followers/'
      const offset = (page - 1) * limit
      console.log(offset, 'offset', page, limit, typeof page, typeof limit)
      const params = {
        offset: offset,
        limit: limit,
        offset_of_offset: 0,
        _: new Date().getTime(),
        __classic__: 1
      }
      const res = await window['NetMessageBridgeService'].get(
        api,
        JSON.stringify({
          params: params,
          headers: {
            isGBK: false
          }
        })
      )
      const resObj = JSON.parse(res)
      const str = resObj.data
      const shoparr = str.match(/<li\s*data-follower-shop-id=.(\d+).\s*data-follower[^>]+>[\s\t\n]+<a[^>]+username='([^>]+)'\s*userid=.([0-9]+).\s*?class=.shop-href.>/g)
      if (shoparr && shoparr.length) {
        shoparr.forEach((item) => {
          const shopId = item.match(/data-follower-shop-id=.(\d+)/)[1]
          const username = item.match(/username='(\w+)'/) ? item.match(/username='(\w+)'/)[1] : ''
          if (username !== '') {
            const userid = item.match(/userid='(\d+)'/)[1]
            const obj = {
              shopId: shopId,
              username: username,
              user_id: userid
            }
            arrList.push(obj)
          }
        })
      }
      return arrList
    },
    async batchSendMessage(mallOrderList, mall, status) {
      if (this.isStop) {
        this.btnLoading = false
        return
      }
      try {
        const mallInfo = await window['ConfigBridgeService'].getGlobalCacheInfo('mallInfo', mall.platform_mall_id)
        const mallInfoObj = mallInfo && JSON.parse(mallInfo)
        const ShopeeUid = mallInfoObj.web_login_info.ShopeeUid
        console.log(mallInfoObj, 'mallInfoObj')
        // 登录客服系统
        const params = {
          params: {
            _uid: `0-${ShopeeUid}`,
            _v: '5.8.0',
            _ts: Math.round(new Date().getTime() / 1000)
          }
        }
        const data = {
          shop_id: mall.platform_mall_id
        }
        const loginRes = await this.$shopeemanService.loginMessage(mall.country, data, params)
        const token = loginRes.data.token
        let oldMsg = ''
        for (let i = 0; i < mallOrderList.length; i++) {
          if (this.isStop) {
            this.btnLoading = false
            return
          }
          const order = mallOrderList[i]
          const userName = order.buyer_user ? order.buyer_user.user_name.trim() : order.username.trim()
          const userId = Number(order.user_id)
          if (!token) {
            continue
          }
          // text
          if (this.messageList.length) {
            const index = this.tableData.findIndex((n) => n.userName == userName)
            if (index < 0) {
              const params = {
                country: mall.country,
                mallInfo: mall,
                userName: userName,
                userType: status,
                chatMessage: '',
                chatDiscount: '',
                chatGoods: '',
                remark: ''
              }
              this.tableData.push(params)
            }
            let msg = ''
            if (this.messageList.length == 1) {
              msg = this.messageList[0]
            } else {
              const filterArr = this.messageList.filter((n) => n !== oldMsg)
              const randomIndex = Math.floor(Math.random() * filterArr.length)
              msg = filterArr[randomIndex]
            }
            const timestamp = new Date().getTime()
            const msgRes = await this.sendMessage('text', msg, {}, userId, Number(mall.platform_mall_id), token, mall.country, timestamp, ShopeeUid)
            const indexA = this.tableData.findIndex((n) => n.userName == userName)
            if (msgRes.code === 200) {
              oldMsg = msg
              this.$set(this.tableData[indexA], 'remark', `${this.tableData[indexA].remark}【消息发送成功】`)
              this.$set(this.tableData[indexA], 'chatMessage', msg)
            } else {
              this.$set(
                this.tableData[indexA],
                'remark',
                `${this.tableData[indexA].remark}【消息发送失败  ${msgRes.data.message.includes('user_is_forbiddenUser is forbidden for this action') ? '该用户禁止发送消息' : ''}】`
              )
            }
            console.log(msgRes, 'msgRes')
          }
          // 发优惠券
          if (this.isSendDiscount) {
            const vouchers = await this.sendDiscount(mall.country, mall.platform_mall_id)
            const index = this.tableData.findIndex((n) => n.userName == userName)
            if (index < 0) {
              const params = {
                country: mall.country,
                mallInfo: mall,
                userName: userName,
                userType: status,
                chatMessage: '',
                chatDiscount: '',
                chatGoods: '',
                remark: ''
              }
              this.tableData.push(params)
            }
            let voucherInfo = null
            let note = ''
            if (!vouchers.length) {
              voucherInfo = null
              note = '【没有可以使用的优惠券】'
            } else {
              if (this.radioDiscountType === 'random') {
                const randomIndex = Math.floor(Math.random() * vouchers.length)
                voucherInfo = vouchers[randomIndex]
              } else {
                voucherInfo = vouchers.find((n) => n.name == this.discountName.trim())
                if (!voucherInfo) {
                  note = `【没有找到名为${this.discountName}】的优惠券`
                }
              }
            }
            const indexA = this.tableData.findIndex((n) => n.userName == userName)
            if (!voucherInfo) {
              this.$set(this.tableData[indexA], 'remark', `${this.tableData[indexA].remark}${note}`)
            } else {
              const timestamp = new Date().getTime()
              const voucherRes = await this.sendMessage('voucher', '', voucherInfo, userId, Number(mall.platform_mall_id), token, mall.country, timestamp, ShopeeUid)
              if (voucherRes.code === 200) {
                this.$set(this.tableData[indexA], 'remark', `${this.tableData[indexA].remark}【优惠券发送成功】`)
                this.$set(this.tableData[indexA], 'chatDiscount', `${voucherInfo.name}`)
              } else {
                this.$set(this.tableData[indexA], 'remark', `${this.tableData[indexA].remark}【消息发送失败  ${voucherRes.data.message.includes('user_is_forbiddenUser is forbidden for this action') ? '该用户禁止发送消息' : ''}】`)
              }
            }
            console.log(vouchers, 'vouchers')
          }
          // 发送商品
          if (this.isSendGoods) {
            const index = this.tableData.findIndex((n) => n.userName == userName)
            if (index < 0) {
              const params = {
                country: mall.country,
                mallInfo: mall,
                userName: userName,
                userType: status,
                chatMessage: '',
                chatDiscount: '',
                chatGoods: '',
                remark: ''
              }
              this.tableData.push(params)
            }
            let goodsInfo = null
            let note = ''
            const params = {
              offset: 0,
              limit: 100,
              need_brand: 0,
              need_item_model: 0,
              is_ads: 0,
              platform_mall_id: mall.platform_mall_id,
              country: mall.country
            }
            if (this.radioGoodsType == 'random') {
              const res = await this.StoreSelection.productSelector(params)
              if (res.code == 200 && res.data.length) {
                const randomIndex = Math.floor(Math.random() * res.data.length)
                goodsInfo = res.data[randomIndex]
              } else {
                note = '【没有可以发送的商品】'
              }
            } else {
              params['id'] = this.GoodsId
              const res = await this.StoreSelection.productSelector(params)
              if (res.code == 200 && res.data.length) {
                goodsInfo = res.data[0]
              } else note = `【没有找到商品ID为${this.GoodsId}的商品】`
            }
            const indexA = this.tableData.findIndex((n) => n.userName == userName)
            if (!goodsInfo) {
              this.$set(this.tableData[indexA], 'remark', `${this.tableData[indexA].remark}${note}`)
            } else {
              const timestamp = new Date().getTime()
              const voucherRes = await this.sendMessage('product', '', goodsInfo, userId, Number(mall.platform_mall_id), token, mall.country, timestamp, ShopeeUid)
              if (voucherRes.code === 200) {
                this.$set(this.tableData[indexA], 'remark', `${this.tableData[indexA].remark}【商品发送成功】`)
                this.$set(this.tableData[indexA], 'chatGoods', `${goodsInfo.itemid}`)
              } else {
                this.$set(this.tableData[indexA], 'remark', `${this.tableData[indexA].remark}【消息发送失败  ${voucherRes.data.message.includes('user_is_forbiddenUser is forbidden for this action') ? '该用户禁止发送消息' : ''}】`)
              }
            }
          }
          const indexE = this.tableData.findIndex((n) => n.userName == userName)
          this.$set(this.tableData[indexE], 'remark', `${this.tableData[indexE].remark}【操作结束】`)
          await delay(this.sendTime * 1000)
          // sleep(this.sendTime)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async sendDiscount(country, mallID) {
      const params = {
        offset: 0,
        limit: 40,
        promotion_type: 1,
        shop_id: mallID
      }
      let vouchersList = []
      const res = await this.$shopeemanService.getVouchers(country, params)
      let { voucher_list } = res.data
      while (voucher_list.length) {
        if (this.isStop) {
          this.btnLoading = false
          break
        }
        vouchersList = vouchersList.concat(voucher_list)
        if (voucher_list.length < 40) {
          voucher_list = []
        } else {
          params.promotion_type++
          const resMore = await this.$shopeemanService.getVouchers(country, params)
          voucher_list = (resMore && resMore.data && resMore.data.voucher_list) || []
        }
      }
      return vouchersList
    },
    async sendMessage(type, msg, obj, userId, mallId, token, country, timestamp, uid) {
      // 发送消息
      let contentInfo = {}
      if (type == 'text') {
        contentInfo = {
          text: msg
        }
      }
      if (type == 'product') {
        contentInfo = {
          product_id: obj.itemid,
          shop_id: mallId
        }
      }
      if (type == 'voucher') {
        contentInfo = {
          voucher_code: obj.voucher_code,
          voucher_id: obj.voucher_id
        }
      }
      const message = {
        request_id: guid(),
        to_id: userId,
        type: type,
        content: contentInfo,
        chat_send_option: {
          force_send_cancel_order_warning: false,
          comply_cancel_order_warning: false
        },
        device_id: guid(),
        shop_id: mallId
      }
      const apiToMd5 = this.sha256('/webchat/api/v1.2/messages', message, timestamp, uid)
      const query = {
        headers: {
          referer: '/webchat/conversations',
          'Content-Type': 'text/plain;charset=UTF-8',
          'x-s': apiToMd5,
          'x-v': 1,
          Authorization: `Bearer ${token}`
        },
        params: {
          _uid: `0-${uid}`,
          _ts: timestamp,
          _v: '6.1.1'
        }
      }
      const res = await this.$shopeemanService.sendMessage(country, message, query)
      return res
      function guid() {
        return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4()
      }
      function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
      }
    },
    // 采用sha256加密
    sha256(api, message, timestamp, uid) {
      const isVer = api.match(/v\d+(.\d+)*/)[0] // 匹配当前版本号
      const key = '396c15ad-6d3e-4018-98be-cef58cb45cd0'
      const plat = '6.1.1'
      const ver = isVer
      const fromID = uid
      const reqID = message['request_id']
      const toID = message['to_id']
      const type = message['type']
      let strinput = ''
      if (type === 'text') {
        strinput = message.content.text
      }
      const url = `key=${key}&plat=${plat}&ver=${ver}&fromID=${fromID}&reqID=${reqID}&toID=${toID}&timestamp=${timestamp}&type=${type}&strinput=${strinput}`
      const pass = `${url}`
      // console.log('strinput================', strinput)
      // pass = "key=396c15ad-6d3e-4018-98be-cef58cb45cd0&plat=6.0.0&ver=v1.2&fromID=326400&reqID=cea10e5b-d3e2-4e75-87c6-9778b63029df&toID=286289059&timestamp=1632908715539&type=text&strinput=hello"
      // console.log('sha256加密原文==========', pass)
      const passResult = sha256(pass)
      // console.log('sha256加密密文==========', passResult)
      return passResult
    },
    // 获取订单用户
    async getOrderUser(mall, status) {
      let resList = []
      if (status == 'shipping') {
        const params = {
          page_size: 40,
          page_number: 1,
          total: 0,
          sort_by: 'confirmed_date_desc',
          shop_id: mall.platform_mall_id
        }
        const res = await this.$shopeemanService.getToShipOrderIdList(mall.country, params)
        console.log(res, 'toShip')
        if (res.code === 200) {
          let { package_list, total } = res.data
          while (package_list.length) {
            if (this.isStop) {
              this.btnLoading = false
              break
            }
            // orderLen-a<5
            let orderDetailListFa = []
            for (let a = 0; a < package_list.length; a = a + 5) {
              const orderArr = package_list.slice(a, a + 5)
              const resDetail = await this.$shopeemanService.getDetailsByOrderIds(mall.country, {
                from_seller_data: false,
                orders: this.changeParams(orderArr),
                shop_id: mall.platform_mall_id
              })
              console.log(resDetail, 'resDetail')
              if (resDetail.code === 200) {
                const orderDetailList = (resDetail.data && resDetail.data.orders) || []
                orderDetailListFa = orderDetailListFa.concat(resDetail.data.orders)
                if (orderDetailList && orderDetailList.length) {
                  // 过滤不是今天的订单 new Date().getTime()-item.create_time*1000 < 1*24*60*60*1000
                  if (this.filterCheck) {
                    const orderDetailListFilter = orderDetailList.filter((item) => {
                      return new Date().getTime() - item.create_time * 1000 < this.filterDays * 24 * 60 * 60 * 1000
                    })
                    resList = resList.concat(orderDetailListFilter)
                  } else {
                    resList = resList.concat(orderDetailList)
                  }
                  // this.findChatList = this.findChatList.concat(orderDetailListFilter)
                }
              }
            }
            // 自动翻页
            let lastTime = ''
            lastTime = orderDetailListFa[orderDetailListFa.length - 1].create_time
            console.log(lastTime, 'lastTime', new Date().getTime() - lastTime * 1000 > this.filterDays * 24 * 60 * 60 * 1000)
            if (package_list.length < 40 || (lastTime && new Date().getTime() - lastTime * 1000 > this.filterDays * 24 * 60 * 60 * 1000)) {
              package_list = []
            } else {
              console.log('toShip翻页--------------------')
              params.page_number++
              params.total = total
              const pageUp = await this.$shopeemanService.getToShipOrderIdList(this.mall.country, params)
              package_list = (pageUp && pageUp.data && pageUp.data.package_list) || []
            }
          }
        } else if (res.code === 403) {
          return this.$refs.Logs.writeLog(`店铺【${mall.mall_alias_name || mall.platform_mall_name}】未登录`, false)
        } else {
          return this.$refs.Logs.writeLog(`店铺【${mall.mall_alias_name || mall.platform_mall_name}】${res.code}-${res.data}`, false)
        }
      } else {
        const params = {
          from_page_number: 1,
          source: status,
          page_size: 40,
          page_number: 1,
          total: 0,
          is_massship: false,
          // sort_by: 'create_date_desc',
          shop_id: mall.platform_mall_id
        }
        const res = await this.$shopeemanService.getOrderIdList(mall.country, params)
        console.log(res, 'res-first')
        if (res.code === 200) {
          let { orders, page_info } = res.data
          while (orders.length) {
            if (this.isStop) {
              this.btnLoading = false
              break
            }
            // orderLen-a<5
            let orderDetailListFa = []
            for (let a = 0; a < orders.length; a = a + 5) {
              const orderArr = orders.slice(a, a + 5)
              const resDetail = await this.$shopeemanService.getDetailsByOrderIds(mall.country, {
                from_seller_data: false,
                orders: orderArr,
                shop_id: mall.platform_mall_id
              })
              console.log(resDetail, 'resDetail')
              if (resDetail.code === 200) {
                const orderDetailList = (resDetail.data && resDetail.data.orders) || []
                orderDetailListFa = orderDetailListFa.concat(resDetail.data.orders)
                if (orderDetailList && orderDetailList.length) {
                  // 过滤不是60天的订单 new Date().getTime()-item.create_time*1000 < 1*24*60*60*1000
                  if (this.filterCheck) {
                    const orderDetailListFilter = orderDetailList.filter((item) => {
                      return new Date().getTime() - item.create_time * 1000 < this.filterDays * 24 * 60 * 60 * 1000
                    })
                    console.log(orderDetailListFilter, '过滤')
                    resList = resList.concat(orderDetailListFilter)
                  } else {
                    resList = resList.concat(orderDetailList)
                  }
                  // this.findChatList = this.findChatList.concat(orderDetailListFilter)
                }
              }
            }
            // 自动翻页
            let lastTime = ''
            console.log('自动翻页', orderDetailListFa, orderDetailListFa[orderDetailListFa.length - 1])
            lastTime = orderDetailListFa[orderDetailListFa.length - 1].create_time
            console.log(lastTime, 'lastTime', new Date().getTime() - lastTime * 1000 > this.filterDays * 24 * 60 * 60 * 1000)
            if (orders.length < 40 || (lastTime && new Date().getTime() - lastTime * 1000 > this.filterDays * 24 * 60 * 60 * 1000)) {
              orders = []
            } else {
              console.log('other翻页--------------------')
              params.page_number++
              params.total = page_info.total
              const pageUp = await this.$shopeemanService.getOrderIdList(mall.country, params)
              orders = (pageUp && pageUp.data && pageUp.data.orders) || []
            }
          }
        } else if (res.code === 403) {
          return this.$refs.Logs.writeLog(`店铺【${mall.mall_alias_name || mall.platform_mall_name}】未登录`, false)
        } else {
          return this.$refs.Logs.writeLog(`店铺【${mall.mall_alias_name || mall.platform_mall_name}】${res.code}-${res.data}`, false)
        }
      }
      return resList
    },
    // 转换请求参数
    changeParams(array) {
      const params = []
      array.forEach((item) => {
        const par = {
          order_id: item.order_id,
          region_id: item.region_id || item.region,
          shop_id: item.shop_id
        }
        params.push(par)
      })
      return params
    },
    // 添加消息
    addMessage() {
      if (this.sendText == '') {
        return
      }
      if (this.messageList.indexOf(this.sendText.trim()) > -1) {
        return this.$message.warning('请不要添加重复信息!')
      }
      this.messageList.push(this.sendText)
    },
    deleteMessage(index) {
      console.log(index, 'deleteMessage')
      this.messageList.splice(index, 1)
    },
    clearLog() {
      this.$refs.Logs.consoleMsg = ''
    },
    changeMallList(val) {
      console.log(val)
      this.selectMallList = val.mallList
    }
  }
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
  i {
    font-size: 16px !important;
    text-align: center;
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
  min-width: 240px;
  // height: 100%;
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
    // min-width:200px;
    padding: 3px 0;
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
    overflow: auto;
    .chat-content-item {
      display: flex;
      // justify-content: space-between;
      align-items: center;
      margin-top: 5px;
      span {
        white-space: nowrap;
      }
    }
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
      width: 440px;
    }
    .right-box {
      width: 460px;
    }
  }
}
.content {
  margin: 10px;
  // padding: 16px;
  // margin-top: 20px;
}
</style>
