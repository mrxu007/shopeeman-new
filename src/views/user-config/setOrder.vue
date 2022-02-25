<template>
  <div class="detail">
    <ul>
      <!-- row1 -->
      <span>&nbsp; 申请虾皮物流单号设置 &nbsp;</span>
      <li>
        <label style="color:red;margin-bottom:10px;">温馨提示：请谨慎选择（应用于虾皮发货）</label>
        <el-radio-group v-model="set_AutoApply" @change="save()">
          <el-radio label="1">开启自动申请</el-radio>
          <el-radio label="2">关闭自动申请</el-radio>
        </el-radio-group>
      </li>
      <!-- row2 -->
      <span>&nbsp;  淘宝相关设置 &nbsp;</span>
      <li>
        <label style="color:red;margin-bottom:10px;">温馨提示：应用于淘宝</label>
        <div>
          <el-input v-model="taobaoLeave" placeholder="请不要放价格单" type="textarea" :rows="3" size="mini" style="width:400px" />
          <el-button type="primary" size="mini" style="margin-left:10px" @change="save()">保存</el-button>
        </div>
        <el-checkbox v-model="checked">淘宝物流同步异常(需要滑块验证)时，启用弹窗验证</el-checkbox>
      </li>
      <!-- row3 -->
      <span>&nbsp; 1688自定义留言设置  &nbsp;</span>
      <li>
        <label style="color:red;margin-bottom:10px;">温馨提示：应用于1688拍单</label>
        <div>
          <el-input v-model="aliLeave" placeholder="请不要放价格单" type="textarea" :rows="3" size="mini" style="width:400px" />
          <el-button type="primary" size="mini" style="margin-left:10px" @change="save()">保存</el-button>
        </div>
      </li>
      <!-- row4 -->
      <span>&nbsp; 拍单地址标识设置 &nbsp;</span>
      <li class="orderSet">
        <label style="color:red;margin-bottom:5px;">温馨提示：此设置只针对于自有仓库用户，若拍单发货至系统仓库，请勿取消勾选！</label>
        <label style="color:red;margin-bottom:5px;">温馨提示：由于部分拍单平台的买家姓名不能含有特殊字符，请以实际买家姓名为准！</label>
        <div style="height:8px" />
        <el-checkbox v-model="orderset_1" @change="save()">拍单时买家姓名自动增加软件用户名称标识（拼多多平台将放在详细地址末尾）</el-checkbox>
        <el-checkbox v-model="orderset_2" @change="save()">拍单时买家姓名自动增加拍单日期标识（拼多多平台将放在详细地址末尾）</el-checkbox>
        <el-checkbox v-model="orderset_3" @change="save()">拍单时买家姓名自动增加SPM字样标识（拼多多平台将放在详细地址末尾）</el-checkbox>
        <el-checkbox v-model="orderset_4" @change="save()">拍单时自动增加买家地址标识</el-checkbox>
        <el-checkbox v-model="orderset_5" @change="save()">拍单时买家姓名自动增加订单后6位</el-checkbox>
        <el-checkbox v-model="orderset_6" @change="save()">拍单时买家地址自动增加订单后6位</el-checkbox>

      </li>
      <!-- row5 -->
      <span>&nbsp; 拼多多拍单 &nbsp;</span>
      <li>
        <el-checkbox v-model="PDDset_defail" @change="save()">默认使用拼多多快捷拍单</el-checkbox>
        <el-checkbox v-model="PDDset_other" @change="save()">使用拼多多聚合拍单</el-checkbox>
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

      set_AutoApply: '1', // 开启 关闭自动申请
      taobaoLeave: '', // 淘宝相关设置
      checked: false, // 滑块验证
      aliLeave: '', // 1688自定义留言设置
      // 拍单标识设置
      orderset_1: false,
      orderset_2: false,
      orderset_3: false,
      orderset_4: false,
      orderset_5: false,
      orderset_6: false,
      // 拼多多拍单
      PDDset_defail: false, // 默认使用拼多多快捷拍单
      PDDset_other: false // 使用拼多多聚合拍单
    }
  },
  mounted() {
    this.getUserinfo()
  },
  methods: {
    // 初始化用户信息
    getUserinfo() {
      if (this.userInfo) {
        console.log(this.userInfo)
        const data = this.userInfo
        this.userID = data.id // 用户信息
        this.uid = data.uid // 用户信息
        this.set_AutoApply = data.is_apply_shopee_logistics.toString() // 申请虾皮物流单号设置
        this.taobaoLeave = data.taobao_leave_content // 淘宝相关设置
        this.checked = data.is_taobao_alert_check === 1 // 需要滑块验证
        this.aliLeave = data.ali_leave_content // 1688自定义留言设置
        // 拍单设置
        const orderSetList = data.shot_order_address_label.split(',') || []
        orderSetList.forEach(el => {
          switch (el) {
            case '1':
              this.orderset_1 = true
              break
            case '2':
              this.orderset_2 = true
              break
            case '3':
              this.orderset_3 = true
              break
            case '4':
              this.orderset_4 = true
              break
            case '5':
              this.orderset_5 = true
              break
            case '6':
              this.orderset_6 = true
              break
          }
        })
        // 拍单设置
        if (data.pdd_shot_order_set) {
          Number(data.pdd_shot_order_set) === 1 ? this.PDDset_defail = true : this.PDDset_other = true
        }
      }
    },
    async save() {
      const param = {
        content: {
          id: this.userID,
          uid: this.uid,
          uuid: 0,
          isApplyShopeeLogistics: this.set_AutoApply, // 自动申请
          taobaoLeaveContent: this.taobaoLeave, // 淘宝相关设置
          isTaobaoAlertCheck: this.checked ? '1' : '2', // 需要滑块验证
          aliLeaveContent: this.aliLeave, // 1688自定义留言设置
          shotOrderAddressLabel: '', // 拍单地址标识
          pddShotOrderSet: '' // 拼多多拍单
        },
        type: 3
      }
      // 拍单
      const shotOrderList = []
      if (this.orderset_1) {
        shotOrderList.push('1')
      }
      if (this.orderset_2) {
        shotOrderList.push('2')
      }
      if (this.orderset_3) {
        shotOrderList.push('3')
      }
      if (this.orderset_4) {
        shotOrderList.push('4')
      }
      if (this.orderset_5) {
        shotOrderList.push('5')
      }
      if (this.orderset_6) {
        shotOrderList.push('6')
      }
      param.content.shotOrderAddressLabel = shotOrderList.toString() || ''
      // pdd 拍单
      const pddShotOrderList = []
      if (this.PDDset_defail) {
        pddShotOrderList.push('1')
      }
      if (this.PDDset_other) {
        pddShotOrderList.push('2')
      }
      param.content.pddShotOrderSet = pddShotOrderList.toString() || ''
      console.log(JSON.stringify(param))
      try {
        const res = await this.$BaseUtilService.updateUserConfig(JSON.stringify(param))
        if (res) {
          this.$message.success('信息修改成功！')
        } else {
          this.$message.warning('信息修改失败！')
        }
        console.log('183', res)
      } catch (error) {
        this.$message.warning(`信息修改失败！${error}`)
        console.log(`185line-${error}`)
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

