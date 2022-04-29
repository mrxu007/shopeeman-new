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
          <el-input v-model="psdZFB" :type="passwordType" size="mini" style="width:120px" >
            <i slot="suffix" class="el-input__icon el-icon-view" style="color:#000;cursor:pointer;" @click="changePayType"></i>
          </el-input>
          <el-button type="primary" size="mini" style="margin-left:10px" @click="save()">保存</el-button>
        </div>
      </li>
      <!-- row3 -->
      <span>&nbsp;颜色标识设置：&nbsp;</span>
      <li>
        <label>针对于订单列表和售后列表，对订单进行颜色标识</label>
        <el-button type="primary" size="mini" style="margin-left:10px" @click="setColor">颜色标识设置</el-button>
      </li>
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
    <!-- 批量标记颜色弹窗 -->
    <el-dialog
      title="标记颜色标识"
      class="dialog-color"
      width="400px"
      top="6vh"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :visible.sync="colorVisible"
    >
      <el-table
        :header-cell-style="{ background: '#f7fafa' }"
        :data="colorLogoList"
        :row-style="{ height: '50px' }"
        max-height="400"
      >

        <el-table-column prop="color_name" label="颜色" min-width="100px" align="center">
          <template v-slot="{row}">
            <div :style="'width:100px;height:28px;background-color:'+row.color+';margin:0px auto'" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="标识名称" min-width="150px" align="center">
          <template v-slot="{row}">
            <el-input v-model="row.name" size="mini" style="width:120px" />
          </template>
        </el-table-column>
      </el-table>
      <el-button
        type="primary"
        size="mini"
        style="width: 120px;
    margin-top: 5px;
    margin-left: 111px;"
        @click="updateColor"
      >保存</el-button>
    </el-dialog>

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

      // 弹窗
      colorVisible: false,
      colorLogoList: [],
      colorLabelId1: '', // 标记弹窗选择颜色标识

      interTime: '', // 获取物流单号间隔时间
      isAutoToken: '', // 是否自定获取

      accountZFB: '', // 支付宝账号
      psdZFB: '', // 支付密码

      setLanguage: '',
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
      changeIp: '',
      passwordType: 'password'
    }
  },
  async mounted() {
    await waitStart(() => {
      return this.userInfo && this.userInfo.id
    })
    await this.getUserinfo()
    await this.getcolorList()
  },
  methods: {
    changePayType(){
      if(this.passwordType === 'password'){
        this.passwordType = 'text'
      }else if(this.passwordType === 'text'){
        this.passwordType = 'password'
      }
    },
    // 颜色标识
    async getcolorList() {
      const res = await this.$api.getcolorList()
      if (res.data.code === 200) {
        this.colorLogoList = res.data.data
      } else {
        this.$message.warning(`颜色标识获取失败！${res.data.data.message}`)
      }
    },
    // 颜色修改
    async updateColor() {
      const param = {
        lists: []
      }
      this.colorLogoList.forEach(el => {
        const obj = {
          id: el.id,
          color_name: el.color_name,
          color: el.color,
          Color: el.color,
          name: el.name,
          Name: el.name,
          status: '1',
          'IsSelected': false
        }
        param.lists.push(obj)
      })
      const res = await this.$api.updataColorList(param)
      if (res.data.code === 200) {
        this.$message.success('修改成功')
      } else {
        this.$message.warning(`修改失败${res.data.data.message}`)
      }
    },
    //
    setColor() {
      this.colorVisible = true
      this.getcolorList()
    },
    // 初始化用户信息
    async getUserinfo() {
      console.log(this.userInfo)
      this.userID = this.userInfo.id // 用户信息
      this.uid = this.userInfo.uid // 用户信息
      this.interTime = this.userInfo.ori_logistics_interval_time // 获取物流单号间隔时间：
      this.isAutoToken = this.userInfo.is_auto_ori_logistics.toString() // 是否自定获取：
      this.accountZFB = this.userInfo.pay_account// 支付宝账号：
      this.psdZFB = await window.ConfigBridgeService.getAesDecrypt(this.userInfo.pay_password) || ''// 支付密码：
      this.setLanguage = this.userInfo.translate_language// 翻译语言
      this.changeIp = this.userInfo.domain_switch.toString() // 域名切换
    },
    async save() {
      if (Number(this.interTime) > 2) {
        this.$message.warning('获取物流单号间隔时间不能少于2小时')
        return
      }
      const param = {
        content: {
          oriLogisticsIntervalTime: this.interTime, // 获取物流单号间隔时间
          isAutoOriLogistics: this.isAutoToken, // 是否自定获取
          payAccount: this.accountZFB, // 支付宝账号
          payPassword: await window.ConfigBridgeService.getAesEecrypt(this.psdZFB) || '', // 支付密码
          translateLanguage: this.setLanguage, // 翻译语言
          domainSwitch: this.changeIp // 域名切换
        },
        type: 1
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

