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
          <el-button type="primary" size="mini" style="margin-left:10px" @click="save()">保存</el-button>
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
          <el-button type="primary" size="mini" style="margin-left:10px" @click="save()">保存</el-button>
        </div>
      </li>
      <!-- row3 -->
      <!-- <span>&nbsp;颜色标识设置：&nbsp;</span>
      <li>
        <label>针对于订单列表和售后列表，对订单进行颜色标识</label>
        <el-button type="primary" size="mini" style="margin-left:10px">颜色标识设置</el-button>
      </li> -->
      <!-- row4 -->
      <span>&nbsp;网页翻译设置&nbsp;</span>
      <li>
        <label>翻译语言：</label>
        <el-select v-model="setLanguage" size="mini" style="width:100px" @change="save()">
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
        <el-button type="primary" size="mini" style="margin-left:10px" @click="save()">保存</el-button>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  components: {

  },
  props: ['userInfo'],
  data() {
    return {
      userID: '', // 用户ID
      uid: '', // 用户ID

      interTime: '2', // 获取物流单号间隔时间
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
    this.getUserinfo()
  },
  methods: {
    // 初始化用户信息
    getUserinfo() {
      const data = this.userInfo
      this.userID = data.id // 用户信息
      this.uid = data.uid // 用户信息
      this.interTime = data.ori_logistics_interval_time // 获取物流单号间隔时间：
      this.isAutoToken = data.is_auto_ori_logistics.toString() // 是否自定获取：
      this.accountZFB = data.pay_account// 支付宝账号：
      this.psdZFB = data.pay_password // 支付密码：
      this.setLanguage = data.translate_language// 翻译语言
      this.changeIp = data.domain_switch.toString() // 域名切换
    },
    async save() {
      if (Number(this.interTime) < 2) {
        this.$message.warning('获取物流单号间隔时间不能少于2小时')
        return
      }
      const param = {
        content: {
          id: this.userID,
          uid: this.uid,
          uuid: 0,
          ori_logistics_interval_time: this.interTime, // 获取物流单号间隔时间
          is_auto_ori_logistics: this.isAutoToken, // 是否自定获取
          pay_account: this.accountZFB, // 支付宝账号
          pay_password: this.psdZFB, // 支付密码
          translate_language: this.setLanguage, // 翻译语言
          domain_switch: this.changeIp // 域名切换
        },
        type: 1
      }
      console.log(JSON.stringify(param))
      try {
        const res = await this.$BaseUtilService.updateUserConfig(JSON.stringify(param))
        if (res) {
          this.$message.success('信息修改成功！')
        } else {
          this.$message.warning('信息修改失败！')
        }
        console.log('137', res)
      } catch (error) {
        console.log(`139line-${error}`)
      }
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

