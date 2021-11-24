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
            <el-button
              v-if="isHomeApplyAddress"
              type="primary"
              size="mini"
              class="mar-right"
              @click="sysApplyAddress()"
            >申请系统仓库地址</el-button>
            <div class="warning-text activeColor">
              <p>温馨提示：1、绑定自有仓库时，订单信息将不会推送至对应站点的系统仓库，如使用软件合作物流，请申请绑定系统仓库！</p>
              <p>温馨提示：2、拍单平台为京喜时，收件人姓名只能由中文和字母组成，且在拍单时，软件不会自动增加买家姓名的拍单标识！</p>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="海外仓设置" name="abroadStore">
          <div class="btn-tool">
            <el-button type="primary" size="mini" class="mar-right">添加国外自有仓库地址</el-button>
            <el-button
              v-if="isOverseasApplyAddress"
              type="primary"
              size="mini"
              class="mar-right"
            >申请系统仓库地址</el-button>
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
            backgroundColor: '#f5f7fa',
          }"
        >
          <el-table-column
            type="index"
            label="序号"
            min-width="50px"
            align="center"
            fixed
          />
          <el-table-column min-width="120px" label="仓库" fixed prop="warehouse_name" />
          <el-table-column min-width="300px" label="地址" prop="full_address" show-overflow-tooltip />
          <el-table-column min-width="120px" label="收件人" prop="receiving_name" />
          <el-table-column prop="type" label="仓库类型" min-width="100px">
            <template slot-scope="scope"> {{ typeObj[scope.row.type] }} </template>
          </el-table-column>
          <el-table-column
            min-width="100px"
            label="联系电话"
            prop="receiving_tel"
          />
          <el-table-column
            min-width="130px"
            label="自有手机号"
            prop="own_phone"
          >
            <template slot-scope="{row}">
              <div v-if="row.isUser === 0">
                <el-input
                  v-if="row.isPhone"
                  v-model="row.own_phone"
                  v-fo
                  size="mini"
                  @blur="updateOwnPhone(row)"
                />

                <span
                  v-else
                  @click="isShowPhone(row)"
                >
                  <el-input
                    v-model="row.own_phone"
                    :disabled="!row.isPhone"
                    size="mini"
                  />
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column min-width="80px" label="邮编" prop="post_code" />
          <el-table-column
            min-width="140px"
            label="是否使用自有手机号"
            align="center"
          >
            <template slot-scope="{row}">
              <el-switch
                v-model="row.is_use_own_phone"
                :disabled="row.isUser === 1 || row.own_phone === ''"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="updateOwnPhone(row)"
              />
            </template>
          </el-table-column>
          <el-table-column min-width="100px" label="绑定店铺数量">
            <template slot-scope="scope"> {{ scope.row.mallInfo.length }} </template>
          </el-table-column>
          <el-table-column min-width="90px" label="对应站点" prop="country">
            <template slot-scope="scope"> {{ scope.row.country | chineseSite }} </template>
          </el-table-column>
          <el-table-column min-width="120px" label="绑定的店铺" show-overflow-tooltip>
            <template slot-scope="scope"> {{ bindMallName(scope.row.mallInfo) }} </template>
          </el-table-column>
          <el-table-column
            label="操作"
            min-width="360px"
          >
            <template slot-scope="{row}">
              <el-button
                type="primary"
                size="mini"
                @click="updateBindMall(row)"
              >修改绑定店铺</el-button>
              <el-button
                v-if="row.isUser === 1"
                type="primary"
                size="mini"
                @click="updateItself(row)"
              >修改自有仓库地址</el-button>
              <el-button
                v-if="row.isUser === 1"
                type="primary"
                size="mini"
                @click="deleteOwnStore(row)"
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
      :visible.sync="itselfAddressVisible"
      width="310px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="handleClose1"
    >
      <el-form label-position="right" label-width="80px">
        <el-form-item label="仓库类型：">
          <span>国内中转仓</span>
        </el-form-item>
        <el-form-item label="仓库站点：">
          <el-select v-model="itselfCountry" placeholder="" size="mini" filterable>
            <el-option v-for="(item, index) in countries" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="仓库名称：">
          <el-input
            v-model="itselfWarehouseName"
            clearable
            size="mini"
            oninput="value=value.replace(/\s+/g,'')"
          />
        </el-form-item>
        <address-model ref="addressModel" @sendData="sendData" />
        <el-form-item label="详细地址：">
          <el-input
            v-model="itselfDetailAddress"
            clearable
            size="mini"
            oninput="value=value.replace(/\s+/g,'')"
          />
        </el-form-item>
        <el-form-item label="收件人：">
          <el-input
            v-model="itselfReceivingName"
            clearable
            size="mini"
            oninput="value=value.replace(/\s+/g,'')"
          />
        </el-form-item>
        <el-form-item label="电话号码：">
          <el-input
            v-model="itselfReceivingTel"
            clearable
            size="mini"
            oninput="value=value.replace(/\s+/g,'')"
          />
        </el-form-item>
        <el-form-item label="归属仓库：">
          <el-select
            v-model="itselfWarehouseId"
            placeholder="请选择"
            size="mini"
          >
            <el-option
              label="不绑定"
              :value="0"
            />
            <el-option
              v-for="(item, index) in warehouseList"
              :key="item.id"
              :label="item.warehouse_name"
              :value="item.id"
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
          @click="adduserStore"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!--系统仓库地址弹窗-->
    <el-dialog
      :close-on-click-modal="false"
      class="sys-store-dialog"
      title="申请系统仓库地址"
      width="1000px"
      :visible.sync="sysAdderssVisible"
      @close="handleClose2"
    >
      <div class="dialog-left">
        <el-form label-position="right" label-width="80px">
          <el-form-item label="仓库类型:">
            <span>{{ flag?'系统仓库':flag2?'系统仓库':'自有仓库' }}</span>
          </el-form-item>
          <el-form-item label="仓库名称:">
            <el-select
              v-if="flag"
              v-model="sysWarehouseId"
              placeholder="请选择"
              size="mini"
              @change="sysWarehouseChange"
            >
              <el-option
                v-for="(item, index) in warehouseData"
                :key="index"
                :value="item.id"
                :label="item.warehouse_name"
              />
            </el-select>
            <el-input
              v-if="!flag"
              v-model="warehouseName"
              :disabled="flag2"
              size="mini"
              clearable
              oninput="value=value.replace(/\s+/g,'')"
            />
          </el-form-item>
          <el-form-item label="地址全称:" class="addressFull">
            <el-input
              v-model="warehouseAddress"
              :disabled="true"
              size="mini"
              type="textarea"
              resize="none"
              :autosize="{ minRows: 2, maxRows: 4 }"
              clearable
              oninput="value=value.replace(/\s+/g,'')"
            />
          </el-form-item>
          <el-form-item label="收件人：">
            <el-input
              v-model="receivingName"
              clearable
              size="mini"
              oninput="value=value.replace(/\s+/g,'')"
            />
          </el-form-item>
          <el-form-item label="联系电话：">
            <el-input
              v-model="wareHouseTel"
              :disabled="flag || flag2"
              clearable
              size="mini"
              oninput="value=value.replace(/\s+/g,'')"
            />
          </el-form-item>
        </el-form>
        <div class="footer">
          <el-button
            v-if="flag"
            type="primary"
            size="mini"
            @click="addXzyStore"
          >新增仓库</el-button>
          <el-button
            v-else
            type="primary"
            size="mini"
            @click="updateWarehouse"
          >修改仓库</el-button>
        </div>
      </div>
      <div class="dialog-right">
        <div style="display:flex">
          <store-choose-mall :key="changeIndex" :is-all="true" :show-mall="false" @changeMallList="changeMallList" />
          <el-button
            style="margin-left: 15px"
            type="primary"
            size="mini"
            @click="getBindMall"
          >查 询</el-button>
        </div>
        <el-table
          ref="bindMallDataRef"
          v-loading="warehouseLoading"
          :data="bindMallData"
          stripe
          style="min-width: 240px"
          max-height="450"
          :row-key="getRowKey"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            align="center"
            min-width="45"
            :reserve-selection="true"
          />
          <el-table-column
            prop="country"
            align="center"
            label="站点"
            min-width="90"
          >
            <template slot-scope="{row}">
              {{ row.country | chineseSite }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="店铺名称"
            min-width="120"
            prop="platformMallName"
          />
          <el-table-column
            align="center"
            label="绑定国内仓"
            min-width="120"
          >
            <template slot-scope="{row}">
              {{ row.address.warehouse_name }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="绑定海外仓"
            min-width="120"
          >
            <template slot-scope="{row}">
              {{ row.overseas_address.warehouse_name }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import AddressModel from '../../../components/address-model.vue'
import AddressSet from '../../../module-api/order-manager-api/address-set'
import StoreChooseMall from '../../../components/store-choose-mall.vue'
export default {
  components: {
    AddressModel,
    StoreChooseMall
  },
  data() {
    return {
      isShowLoading: false,
      itselfAddressVisible: false,
      sysAdderssVisible: false,
      isHomeApplyAddress: false,
      isOverseasApplyAddress: false,
      flag: true, // 新增/修改
      flag2: true, // 系统/自有
      countries: this.$filters.countries_option,
      AddressSet: new AddressSet(this),
      activeName: 'landStore',
      changeIndex: 0,
      tableData: [],
      tableDataAll: [],
      multipleSelection: [],
      bindMallData: [], // 店铺列表数据
      mallList: [],
      typeObj: ['国内中转仓', '存储转运仓', '海外存储仓', '海外中转仓'],

      warehouseLoading: false,
      warehouseData: [], // 仓库数据
      warehouseType: 0,
      sysWarehouseId: '',
      warehouseAddress: '', // 地址全称
      warehouseName: '', // 仓库名称
      wareHouseTel: '', // 联系电话
      receivingName: '', // 收件人
      itemData: {},

      itselfId: 0, // ?
      itselfWarehouseName: '', // 仓库名称
      itselfCountry: 'TH', // 仓库站点
      itselfProvinceId: '',
      itselfProvinceText: '', // 收货省
      itselfPityId: '',
      itselfCityText: '', // 收货市
      itselfDistinctId: '',
      itselfDistinctText: '', // 收货区
      itselfDetailAddress: '', // 详细地址
      itselfFullAddress: '', // 全部地址
      itselfReceivingName: '', // 收件人
      itselfReceivingTel: '', // 电话号码
      itselfWarehouseId: 0, // 所属仓库
      itselfShopeeMapId: '',
      itselfType: 0, // ?
      warehouseList: [] // 所属仓库数据
    }
  },
  mounted() {
    // 获取数据
    this.getUserWarehouse()
    // 获取系统仓库，用来判断是否显示申请系统仓库地址
    this.xzyIndex()
  },
  methods: {
    // 修改自有仓库弹窗
    async updateItself(row) {
      console.log(row)
      this.itselfAddressVisible = true
      this.$nextTick(() => {
        this.$refs.addressModel.update(row.province_id, row.city_id, row.distinct_id)
      })
      console.log(this.itselfProvinceText)
      console.log(this.itselfCityText)
      console.log(this.itselfDistinctText)
    },
    // 修改绑定店铺弹窗
    async updateBindMall(row) {
      this.itemData = row
      this.flag = false
      this.flag2 = row.isUser === 0
      this.sysAdderssVisible = true
      this.warehouseName = row.warehouse_name
      this.warehouseAddress = row.full_address
      this.receivingName = row.receiving_name
      this.wareHouseTel = row.receiving_tel
      await this.getBindMall()
      this.$nextTick(() => {
        this.bindMallData.forEach(item1 => {
          row.mallInfo.forEach(item2 => {
            if (item2.id === item1.sysMallId) {
              this.$refs.bindMallDataRef.toggleRowSelection(item1)
            }
          })
        })
      })
    },
    // 修改仓库
    updateWarehouse() {
      if (!this.warehouseName) return this.$message('仓库名不能为空')
      if (!this.receivingName) return this.$message('收件人不能为空')
      if (!this.wareHouseTel) return this.$message('电话号码不能为空')
      if (this.flag2) {
        if (!this.multipleSelection.every(item => item.country === this.itemData.country)) {
          return this.$message(`当前仓库只能绑定${this.$filters.chineseSite(this.itemData.country)}的店铺，请重新选择`)
        }
      }
      const params = {
        mallId: [],
        address: {}
      }
      params['id'] = this.itemData.id
      params['warehouseName'] = this.warehouseName
      params['address']['city_id'] = this.itemData.city_id
      params['address']['city_text'] = this.itemData.city_text
      params['address']['detail_address'] = this.itemData.detail_address
      params['address']['distinct_id'] = this.itemData.distinct_id
      params['address']['distinct_text'] = this.itemData.distinct_text
      params['address']['full_address'] = this.itemData.full_address
      params['address']['province_id'] = this.itemData.province_id
      params['address']['province_text'] = this.itemData.province_text
      params['address']['receiving_name'] = this.receivingName
      params['address']['receiving_tel'] = this.wareHouseTel

      this.multipleSelection.forEach(item => {
        params['mallId'].push(item.sysMallId)
      })
      this.updateData(params)
    },
    // 修改数据
    async updateData(params) {
      const res = await this.AddressSet.updateData(params)
      if (res.code === 200) {
        this.$message.success('修改成功')
      } else {
        this.$message.error(res.data)
      }
    },
    // 新增仓库
    async addXzyStore() {
      let sysNewData = []
      const sysMallId = []
      if (!this.receivingName) return this.$message('收件人不能为空')
      sysNewData = this.warehouseData.filter(item => { return item.id === this.sysWarehouseId })
      if (!this.multipleSelection.every(item => item.country === sysNewData[0].country)) {
        return this.$message(`当前仓库只能绑定${this.$filters.chineseSite(sysNewData[0].country)}的店铺，请重新选择`)
      }
      this.multipleSelection.forEach(item => {
        sysMallId.push(item.sysMallId)
      })
      const params = {
        id: this.sysWarehouseId,
        receivingName: this.receivingName,
        mallId: sysMallId.toString()
      }
      const res = await this.AddressSet.addXzyStore(params)
      if (res.code === 200) {
        this.sysAdderssVisible = false
        this.$message.success('新增系统仓库成功')
      } else {
        this.$message.error(res.data)
      }
    },
    // 仓库名称Change
    sysWarehouseChange() {
      let arr = {}
      this.warehouseData.forEach(item => {
        if (item.id === this.sysWarehouseId) {
          arr = item
        }
      })
      this.warehouseAddress = arr.full_address
      this.wareHouseTel = arr.receiving_tel
    },
    // 申请系统仓库地址
    sysApplyAddress() {
      this.flag = true
      this.sysAdderssVisible = true
      this.getBindMall()
    },
    // 绑定店铺、申请仓库的店铺列表
    async getBindMall() {
      this.warehouseLoading = true
      const groupIds = []
      this.mallList.forEach(item => {
        groupIds.push(item.group_id)
      })
      const params = {
        id: this.sysWarehouseId,
        country: this.mallList.country,
        groupIds: groupIds.toString()
      }
      const res = await this.AddressSet.getBindMall(params)
      if (res.code === 200) {
        this.bindMallData = res.data
        console.log('bindMallData', this.bindMallData)
      } else {
        this.$message.error(res.data)
      }
      this.warehouseLoading = false
    },
    isShowPhone(row) {
      this.$set(row, 'isPhone', true)
    },
    // 删除自有仓库
    async deleteOwnStore(row) {
      const params = {
        id: row.id
      }
      const res = await this.AddressSet.deleteOwnStore(params)
      if (res.code === 200) {
        this.$message.success('删除成功')
        this.tableData.splice(this.tableData.findIndex(item => item.id === row.id), 1)
      } else {
        this.$message.error(res.data)
      }
    },
    // 配置手机号码
    async updateOwnPhone(row) {
      this.$set(row, 'isPhone', false)
      const params = {
        id: row.id,
        isUseOwnPhone: row.is_use_own_phone ? 1 : 0,
        ownPhone: row.own_phone
      }
      const res = await this.AddressSet.updateOwnPhone(params)
      if (res.code === 200) {
        this.$message.success('更新成功')
      } else {
        this.$message.error(res.data)
      }
    },
    // 添加国内自有仓库
    async adduserStore() {
      let arr = {}
      const params = {
        address: {}
      }
      const reg = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/
      if (!this.itselfWarehouseName) return this.$message('仓库名称不能为空')
      if (!this.itselfDetailAddress) return this.$message('详细地址不能为空')
      if (!this.itselfReceivingName) return this.$message('收件人不能为空')
      if (!this.itselfReceivingTel || !reg.test(this.itselfReceivingTel)) {
        return this.$message('电话号码格式有误')
      }
      this.$confirm('请确认当前仓库是否和系统仓库地址相同，若相同，请务必绑定对应的归属仓库，避免因未能准确匹配仓库造成的无法出库的风险?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        if (this.itselfWarehouseId !== 0) {
          this.warehouseList.forEach(item => {
            if (this.itselfWarehouseId === item.id) {
              arr = item
            }
          })
          if (this.itselfProvinceText !== arr.province_text ||
              this.itselfCityText !== arr.city_text ||
              this.itselfDistinctText !== arr.distinct_text ||
              this.itselfDetailAddress.indexOf(arr.detail_address) === -1) {
            this.$message('自有出库地址与归属出库地址省份信息不匹配')
            return
          }
        }
        this.itselfFullAddress =
        this.itselfProvinceText + ' ' +
        this.itselfCityText + ' ' +
        this.itselfDistinctText + ' ' +
        this.itselfDetailAddress
        params['id'] = this.itselfId
        params['warehouseName'] = this.itselfWarehouseName
        params['address']['country'] = this.itselfCountry
        params['address']['province_id'] = this.itselfProvinceId
        params['address']['province_text'] = this.itselfProvinceText
        params['address']['city_id'] = this.itselfPityId
        params['address']['city_text'] = this.itselfCityText
        params['address']['distinct_id'] = this.itselfDistinctId
        params['address']['distinct_text'] = this.itselfDistinctText
        params['address']['detail_address'] = this.itselfDetailAddress
        params['address']['full_address'] = this.itselfFullAddress
        params['address']['receiving_name'] = this.itselfReceivingName
        params['address']['receiving_tel'] = this.itselfReceivingTel
        params['address']['warehouseId'] = this.itselfWarehouseId
        params['address']['shopee_map_id'] = this.itselfShopeeMapId
        params['address']['type'] = this.itselfType
        console.log(params)
        const res = await this.AddressSet.adduserStore(params)
        if (res.code === 200) {
          this.$message.success('添加国内自有仓库成功')
          this.itselfAddressVisible = false
        } else {
          this.$message.error(res.data)
        }
      })
    },
    // 添加国内自有仓库弹窗
    homeAddress() {
      this.itselfAddressVisible = true
      this.$nextTick(() => {
        this.$refs.addressModel.init()
      })
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
    // 获取系统仓库，用来判断是否显示申请系统仓库地址
    async xzyIndex() {
      let resData = []
      const typeList = [0, 3]
      for (let index = 0; index < typeList.length; index++) {
        const type = typeList[index]
        const res = await this.AddressSet.xzyIndex(type)
        if (res.code === 200) {
          resData = resData.concat(res)
        } else {
          this.$message.error(res.data)
        }
      }
      console.log('resData', resData)
      if (resData?.length) {
        if (resData[0].data?.length > 0) {
          this.isHomeApplyAddress = true
          this.warehouseData = resData[0].data
          this.sysWarehouseId = resData[0].data[0].id
          this.warehouseAddress = resData[0].data[0].full_address
          this.wareHouseTel = resData[0].data[0].receiving_tel
        } else {
          this.isHomeApplyAddress = false
        }
        this.isOverseasApplyAddress = resData[1].data?.length > 0
      }
    },
    // 获取数据
    async getUserWarehouse() {
      this.isShowLoading = true
      const res = await this.AddressSet.getUserWarehouse()
      if (res.code === 200) {
        this.tableDataAll = res.data
        this.tableDataAll.map(item => {
          item.is_use_own_phone = item.is_use_own_phone === '1'
        })
        this.tableData = this.tableDataAll.filter(item => { return item.type === 0 })
      } else {
        this.$message.error(res.data)
      }
      console.log(res)
      this.isShowLoading = false
    },
    changeMallList(val) {
      this.mallList = val
    },
    handleClose1() {
      this.getUserWarehouse()
      this.itselfId = 0
      this.itselfWarehouseName = ''
      this.itselfCountry = 'TH'
      this.itselfProvinceId = ''
      this.itselfProvinceText = ''
      this.itselfPityId = ''
      this.itselfCityText = ''
      this.itselfDistinctId = ''
      this.itselfDistinctText = ''
      this.itselfDetailAddress = ''
      this.itselfFullAddress = ''
      this.itselfReceivingName = ''
      this.itselfReceivingTel = ''
      this.itselfWarehouseId = 0
      this.itselfShopeeMapId = ''
      this.itselfType = 0
    },
    handleClose2() {
      this.xzyIndex()
      this.getUserWarehouse()
      this.receivingName = ''
      this.$refs.bindMallDataRef.clearSelection()
      this.changeIndex++
    },
    sendData(val) {
      console.log('addressData', val)
      this.itselfProvinceId = val.province_id
      this.itselfProvinceText = val.province_text
      this.itselfPityId = val.city_id
      this.itselfCityText = val.city_text
      this.itselfDistinctId = val.distinct_id
      this.itselfDistinctText = val.distinct_text
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 记住所选项
    getRowKey(row) {
      return row.sysMallId
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../module-less/order-manager-less/address-set.less';
</style>
