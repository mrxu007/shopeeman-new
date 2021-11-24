<template>
  <el-row class="contaniner">
    <el-row class="header">
      <div class="wrap">
        <ul>
          <li>
            <el-button
              type="primary"
              size="mini"
              @click="selectAddressVisible = true"
            >添加国内自有仓库地址</el-button>
            <el-button
              type="primary"
              size="mini"
            >申请系统仓库地址</el-button>
          </li>
        </ul>
        <p>
          温馨提示：1、绑定自有仓库时，订单信息将不会推送至对应站点的系统仓库，如使用软件合作物流，请申请绑定系统仓库！
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、排单平台为京喜时，收件人姓名只能由中文和字母组成，且在拍单时，软件不会自动增加买家姓名的拍单标识
        </p>
      </div>
    </el-row>
    <el-row id="article">
      <el-table
        ref="plTable"
        v-loading="isShowLoading"
        height="calc(100vh - 125px)"
        :data="tableData"
        :header-cell-style="{
          backgroundColor: '#f5f7fa',
        }"
      >
        <el-table-column
          label="仓库"
          align="center"
          min-width="130"
          prop="warehouse_name"
        />
        <el-table-column
          label="地址"
          align="center"
          min-width="250"
          prop="full_address"
        />
        <el-table-column
          label="收件人"
          align="center"
          min-width="100"
          prop="receiving_name"
        />
        <el-table-column
          label="仓库类型"
          align="center"
          min-width="150"
          prop="type"
        />
        <el-table-column
          label="联系电话"
          align="center"
          min-width="150"
          prop="receiving_tel"
        />
        <el-table-column
          label="邮编"
          align="center"
          min-width="100"
          prop="post_code"
        />
        <el-table-column
          label="是否使用自有手机号"
          align="center"
          min-width="130"
          prop="is_use_own_phone"
        />
        <el-table-column
          label="绑定店铺数量"
          align="center"
          min-width="100"
          prop="bindMallNum"
        />
        <el-table-column
          label="对应站点"
          align="center"
          min-width="100"
          prop="country"
        >
          <template slot-scope="{row}">
            {{ row.country | chineseSite }}
          </template>
        </el-table-column>
        <el-table-column
          label="绑定的店铺"
          align="center"
          min-width="110"
        />
        <el-table-column
          min-width="480"
          align="center"
          label="操作"
        >
          <template slot-scope="{row}">
            <el-button
              type="primary"
              size="mini"
            >修改绑定店铺</el-button>
            <el-button
              type="primary"
              size="mini"
            >配置手机号</el-button>
            <el-button
              type="primary"
              size="mini"
            >修改自有仓库地址</el-button>
            <el-button
              type="primary"
              size="mini"
            >删除仓库</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!--选择地址弹窗-->
    <el-dialog
      class="select-dialog"
      title="选择地址"
      :visible.sync="selectAddressVisible"
      width="620px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form label-position="right" label-width="80px">
        <el-form-item label="仓库类型：">
          <span>国内中转仓</span>
        </el-form-item>
        <el-form-item label="仓库站点：">
          <el-select v-model="addFrom.address.country" placeholder="" size="mini" filterable>
            <el-option label="全部" :value="0" />
            <el-option v-for="(item, index) in countries" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="仓库名称：">
          <el-input
            v-model="addFrom.warehouseName"
            clearable
            size="mini"
            oninput="value=value.replace(/\s+/g,'')"
          />
        </el-form-item>
        <address-model @addressData="addressData" />
        <el-form-item label="收件人：">
          <el-input
            v-model="addFrom.address.receiving_name"
            clearable
            size="mini"
            oninput="value=value.replace(/\s+/g,'')"
          />
        </el-form-item>
        <el-form-item label="电话号码：">
          <el-input
            v-model="addFrom.address.receiving_tel"
            clearable
            size="mini"
            oninput="value=value.replace(/\s+/g,'')"
          />
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-row>
</template>

<script>
import ReceivingAddress from '../../../module-api/order-manager-api/receiving-address'
import AddressModel from '../../../components/address-model.vue'
export default {
  components: {
    AddressModel
  },
  data() {
    return {
      isShowLoading: false,
      selectAddressVisible: true,
      ReceivingAddress: new ReceivingAddress(this),
      countries: this.$filters.countries_option,

      addFrom: {
        warehouseName: '', // 仓库名称
        address: {
          country: '', // 仓库站点
          province_id: '',
          province_text: '', // 收货省
          city_id: '',
          city_text: '', // 收货市
          distinct_id: '',
          distinct_text: '', // 收货区
          detail_address: '', // 详细地址
          receiving_name: '', // 收件人
          receiving_tel: '', // 电话号码
          warehouseId: '' // 所属仓库
        }
      },
      tableData: [] // 表格数据
    }
  },
  async mounted() {
    // 获取数据
    await this.warehouseAddress()
  },
  methods: {
    // 获取数据
    async warehouseAddress() {
      this.isShowLoading = true
      const res = await this.ReceivingAddress.warehouseAddress()
      if (res.code === 200) {
        this.tableData = res.data
        console.log('tableData', this.tableData)
      } else {
        this.$message.error(res.data)
      }
      this.isShowLoading = false
    },
    addressData(val) {
      this.addFrom.address['province_id'] = val.province_id
      this.addFrom.address['province_text'] = val.province_text
      this.addFrom.address['city_id'] = val.city_id
      this.addFrom.address['city_text'] = val.city_text
      this.addFrom.address['distinct_id'] = val.distinct_id
      this.addFrom.address['distinct_text'] = val.distinct_text
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../module-less/order-manager-less/receiving-address.less';
</style>
