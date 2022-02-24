<template>
  <div class="detail">
    <ul>
      <!-- row1 -->
      <span>&nbsp;是否自动获取上家物流信息设置&nbsp;</span>
      <li>
        <div>
          <label>获取物流单号间隔时间：</label>
          <el-input v-model="interTime" size="mini" style="width:120px" />小时 (请设置不超过两小时)
        </div>
        <div style="margin-left:47px;margin-top:5px">
          <label>是否自定获取：</label>
          <el-select v-model="isAutoToken" size="mini" style="width:120px">
            <el-option label="不自动获取" value="1" />
            <el-option label="自动获取" value="2" />
          </el-select>
          <el-button type="primary" size="mini" style="margin-left:10px" @click="save1()">保存</el-button>
        </div>
      </li>
      <!-- row2 -->
      <span>&nbsp;支付宝支付账户设置&nbsp;</span>
      <li>
        <div>
          <label>支付宝账号：</label>
          <el-input v-model="accountZFB" size="mini" style="width:120px" />
        </div>
        <div style="margin-left:11px;margin-top:5px">
          <label>支付密码：</label>
          <el-input v-model="psdZFB" type="password" size="mini" style="width:120px" />
          <el-button type="primary" size="mini" style="margin-left:10px">保存</el-button>
        </div>
      </li>
      <!-- row3 -->
      <span>&nbsp;颜色标识设置：&nbsp;</span>
      <li>
        <label>针对于订单列表和售后列表，对订单进行颜色标识</label>
        <el-button type="primary" size="mini" style="margin-left:10px">颜色标识设置</el-button>
      </li>
      <!-- row4 -->
      <span>&nbsp;网页翻译设置&nbsp;</span>
      <li>
        <label>翻译语言：</label>
        <el-select v-model="setLanguage" size="mini" style="width:100px">
          <el-option v-for="tl in transLanguage" :key="tl.value" :label="tl.name" :value="tl.value" />
        </el-select>
      </li>
      <!-- row5 -->
      <span>&nbsp;汇率&nbsp;</span>
      <li>
        <label style="color:red;margin-left: 28px;">以下汇率皆为各站点币种对人民币汇率</label>
        <div class="coinRate">
          <div v-for="cR in coinRate" :key="cR.value">
            <span>{{ cR.name }}&nbsp;:&nbsp;&nbsp;{{ cR.value }}</span>
          </div>
        </div>
      </li>
      <!-- row6 -->
      <span>&nbsp;域名切换&nbsp;</span>
      <li>
        <el-radio-group v-model="changeIp">
          <el-radio label="1">自动切换</el-radio>
          <el-radio label="2">大陆域名</el-radio>
          <el-radio label="3">本土域名</el-radio>
        </el-radio-group>
        <el-button type="primary" size="mini" style="margin-left:10px">保存</el-button>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  components: {

  },
  data() {
    return {
      interTime: '', // 获取物流单号间隔时间
      isAutoToken: '1', // 是否自定获取

      accountZFB: '', // 支付宝账号
      psdZFB: '', // 支付密码

      setLanguage: 'zh-CN',
      transLanguage: [ // 翻译语言
        { name: '英文', value: 'en' },
        { name: '繁体', value: 'zh-TW' },
        { name: '葡萄牙语', value: 'pt' },
        { name: '泰语', value: 'th' },
        { name: '越南语', value: 'vi' },
        { name: '中文', value: 'zh-CN' },
        { name: '印尼语', value: 'id' },
        { name: '马来语', value: 'ms' },
        { name: '西班牙语', value: 'es' },
        { name: '波兰语', value: 'pl' },
        { name: '法语', value: 'fr' }
      ],

      coinRate: [ // 汇率
        { name: '马来站', value: '1.51140000' },
        { name: '新加坡站', value: '4.71780000' },
        { name: '菲律宾站', value: '0.12300000' },
        { name: '泰国站', value: '0.19700000' },
        { name: '印尼站', value: '0.00044380' },
        { name: '台湾站', value: '0.22710000' },
        { name: '越南站', value: '0.00027723' },
        { name: '巴西站', value: '1.22500000' }
      ],
      changeIp: '1'
    }
  },
  created() {

  },
  methods: {
    async save1() {
      const { muid } = this._this.$userInfo // 变量已注入全局

      const param =
      {
        'id': 1,
        'uid': muid,
        'uuid': 0,
        'ori_logistics_interval_time': this.interTime,
        'is_auto_ori_logistics': 1,
        'pay_account': '111',
        'pay_password': 'eyJpdiI6IlU3ci9YUEVmNkhDWkJXWlBuZjBKeUE9PSIsInZhbHVlIjoiQkZZdnB1RHR3di9nVFFzc1RtRTFtQT09IiwibWFjIjoiODE3MWRkMGEwNzU3YzkyNDlmMDQ0MDg4MGIyMjU1YWFlOGMxMGU2NjNhOGU3ZjVlMjhkZWU2ZDllYzdlYTMzYiJ9',
        'translate_language': 'zh-CN',
        'domain_switch': 3,
        'translate_set': 4,
        'language_set': 'zh_CN',
        'is_apply_shopee_logistics': 2,
        'taobao_leave_content': '\u8bf7\u4e0d\u8981\u653e\u4ef7\u683c\u5355',
        'is_taobao_alert_check': 2,
        'ali_leave_content': '\u8bf7\u4e0d\u8981\u653e\u4ef7\u683c\u5355',
        'shot_order_address_label': '1,2,3,4',
        'pdd_shot_order_set': '',
        'auto_sku': 2,
        'auto_pay': 2,
        'auto_next_order': 2,
        'h5_xsec': '',
        'pay_cookie': '',
        'auto_attention_set': null,
        'collect_set': {
          'GoodsDeliveryAddress': 0,
          'MaxLazadaDeliveryDay': 7,
          'MaxShoppeDeliveryDay': 20,
          'MinLazadaDeliveryDay': 0,
          'MinShoppeDeliveryDay': 0,
          'IsFilterLazadaDeliveryDay': true,
          'IsFilterShoppeDeliveryDay': false,
          'IsCollectDescriptionIsNull': false
        },
        'created_at': '2021-12-09 18:29:52',
        'updated_at': '2022-02-23 11:02:25',
        'deleted_at': null
      }
      const res = await this.$BaseUtilService.updateUserConfig(param)
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
        width: 500px;
        padding: 10px;
        padding-top: 20px;
        border-radius: 5px;
        margin-bottom: 10px;
         }
       span{
           position: relative;
    bottom: -5px;
    left: 11px;
    background-color: white;
       }
       .coinRate{
           display: flex;
          flex-wrap: wrap;
          margin-left: 15px;
          div{
              margin-top: 5px;
              width: 150px;
              height: 20px;
          }
       }
     }
 }
</style>

