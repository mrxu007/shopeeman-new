<!--
 * @Author: your name
 * @Date: 2021-11-18 15:59:48
 * @LastEditTime: 2021-11-18 20:22:44
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \shopeeman-new\src\views\order-manager\components\OrderManagerStoreAdressSet.vue
-->
<template>
  <div class="store-address">
    <!-- tab区 -->
    <div class="tab-box">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="国内仓设置" name="landStore">
          <div class="btn-tool">
            <el-button
              type="primary"
              size="mini"
              class="mar-right"
              @click="homeAddress"
            >添加国内自有仓库地址</el-button>
            <div class="warning-text activeColor">
              <p>温馨提示：1、绑定自有仓库时，订单信息将不会推送至对应站点的系统仓库，如使用软件合作物流，请申请绑定系统仓库！</p>
              <p>温馨提示：2、拍单平台为京喜时，收件人姓名只能由中文和字母组成，且在拍单时，软件不会自动增加买家姓名的拍单标识！</p>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="海外仓设置" name="abroadStore">
          <div class="btn-tool">
            <el-button type="primary" size="mini" class="mar-right">添加国外自有仓库地址</el-button>
            <el-button type="primary" size="mini" class="mar-right">申请系统仓库地址</el-button>
            <div class="warning-text activeColor">
              <p>温馨提示：1、绑定自有仓库时，订单信息将不会推送至对应站点的系统仓库，如使用软件合作物流，请申请绑定系统仓库！</p>
              <p>温馨提示：2、拍单平台为lazada时，收件人姓名不能带有特殊字符，如下划线，加号等，且菲律宾站点不能带有#字符！</p>
              <p>温馨提示：3、收件人姓名请使用当地语言或拼音，尽量不使用中文！</p>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="content">
        <el-table
          ref="multipleTable"
          v-loading="isShowLoading"
          :data="tableData"
          tooltip-effect="dark"
          height="calc(100vh - 195px)"
          :header-cell-style="{
            textAlign: 'center',
            backgroundColor: '#f5f7fa',
          }"
        >
          <el-table-column align="center" type="index" label="序号" min-width="50px" fixed />
          <el-table-column min-width="120px" label="仓库" align="center" fixed prop="warehouse_name" />
          <el-table-column min-width="300px" label="地址" align="center" prop="detail_address" show-overflow-tooltip />
          <el-table-column min-width="120px" label="收件人" align="center" prop="receiving_name" />
          <el-table-column prop="type" label="仓库类型" align="center" min-width="140px">
            <template slot-scope="scope"> {{ warehouseType[scope.row.type] }} </template>
          </el-table-column>
          <el-table-column min-width="120px" label="联系电话" align="center" prop="receiving_tel" />
          <el-table-column min-width="80px" label="邮编" align="center" prop="post_code" />
          <el-table-column min-width="140px" label="是否使用自有手机号" align="center">
            <template slot-scope="scope"> {{ scope.row.is_use_own_phone==="0"?'否':'是' }} </template>
          </el-table-column>
          <el-table-column min-width="140px" label="绑定店铺数量" align="center">
            <template slot-scope="scope"> {{ scope.row.mallInfo.length }} </template>
          </el-table-column>
          <el-table-column min-width="120px" label="对应站点" align="center" prop="country">
            <template slot-scope="scope"> {{ scope.row.country | chineseSite }} </template>
          </el-table-column>
          <el-table-column min-width="120px" label="绑定的店铺" align="center" show-overflow-tooltip>
            <template slot-scope="scope"> {{ bindMallName(scope.row.mallInfo) }} </template>
          </el-table-column>
          <el-table-column prop="created_at" label="操作" align="center" min-width="480px">
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
      </div>
    </div>
    <!--选择地址弹窗-->
    <el-dialog
      class="select-dialog"
      title="选择地址"
      :visible.sync="homeAddressVisible"
      width="310px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form label-position="right" label-width="80px">
        <el-form-item label="仓库类型：">
          <span>国内中转仓</span>
        </el-form-item>
        <el-form-item label="仓库站点：">
          <el-select v-model="addFrom.address.country" placeholder="" size="mini" filterable>
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
        <el-form-item label="归属仓库：">
          <el-select
            v-model="addFrom.address.warehouseId"
            placeholder="请选择"
            size="mini"
          >
            <el-option
              label="不绑定"
              :value="''"
            />
            <el-option
              v-for="(item, index) in warehouseList"
              :key="item.id"
              :label="item.warehouse_name"
              :value="item.wid"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div class="footer">
        <span>
          温馨提示：若新增的自有仓库和系统仓库地址相同,
          请绑定对应的归属仓库,若未绑定归属仓库,仓库无
          法精准匹配,会有无法出库的风险
        </span>
        <el-button
          type="primary"
          size="mini"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import AddressModel from '../../../components/address-model.vue'
import AddressSet from '../../../module-api/order-manager-api/address-set'
export default {
  components: {
    AddressModel
  },
  data() {
    return {
      isShowLoading: false,
      homeAddressVisible: false,
      countries: this.$filters.countries_option,
      AddressSet: new AddressSet(this),
      activeName: 'landStore',
      tableData: [],
      tableDataAll: [],
      warehouseList: [], // 所属仓库数据
      warehouseType: ['国内中转仓', '存储转运仓', '海外存储仓', '海外中转仓'],
      addFrom: {
        warehouseName: '', // 仓库名称
        address: {
          country: 'TH', // 仓库站点
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
      }
    }
  },
  mounted() {
    // 获取数据
    this.getUserWarehouse()
  },
  methods: {
    // 添加国内自有仓库弹窗
    homeAddress() {
      this.homeAddressVisible = true
      this.xzyAllIndex()
    },
    // 获取所属仓库
    async xzyAllIndex() {
      const res = await this.AddressSet.xzyAllIndex()
      if (res.code === 200) {
        this.warehouseList = res.data
      } else {
        this.$message.error(res.data)
      }
    },
    // 绑定的店铺
    bindMallName(list) {
      let name = ''
      list.forEach((item, index) => {
        if (index === 0) {
          name = item.platform_mall_name
        } else {
          name = name + ',' + item.platform_mall_name
        }
      })
      return name
    },
    // 切换tab
    handleClick() {
      if (this.activeName === 'landStore') {
        this.tableData = this.tableDataAll.filter(item => { return item.type === 0 })
      } else {
        this.tableData = this.tableDataAll.filter(item => { return item.type === 2 || item.type === 3 })
      }
    },
    // 获取数据
    async getUserWarehouse() {
      this.isShowLoading = true
      const res = await this.AddressSet.getUserWarehouse()
      if (res.code === 200) {
        this.tableDataAll = res.data
        this.tableData = this.tableDataAll.filter(item => { return item.type === 0 })
      } else {
        this.$message.error(res.data)
      }
      console.log(res)
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
@import '../../../module-less/order-manager-less/address-set.less';
</style>
