
<template>
  <div class="store-address">
    <!-- tab区 -->
    <div class="tab-box">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="国内仓设置" name="landStore">
          <div class="btn-tool">
            <el-button type="primary" size="mini" class="mar-right" @click="homeAddress">添加国内自有仓库地址</el-button>
            <el-button v-if="isHomeApplyAddress" type="primary" size="mini" class="mar-right" @click="sysApplyAddress()">申请系统仓库地址</el-button>
            <div class="warning-text activeColor">
              <p>温馨提示：1、绑定自有仓库时，订单信息将不会推送至对应站点的系统仓库，如使用软件合作物流，请申请绑定系统仓库！</p>
              <p>温馨提示：2、拍单平台为京喜时，收件人姓名只能由中文和字母组成，且在拍单时，软件不会自动增加买家姓名的拍单标识！</p>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="海外仓设置" name="abroadStore">
          <div class="btn-tool">
            <el-button type="primary" size="mini" class="mar-right" @click="oversearAddress">添加国外自有仓库地址</el-button>
            <el-button v-if="isOverseasApplyAddress" type="primary" size="mini" class="mar-right" @click="sysApplyAddress()">申请系统仓库地址</el-button>
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
          :data="tableData"
          tooltip-effect="dark"
          height="calc(100vh - 206px)"
          :header-cell-style="{
            backgroundColor: '#f5f7fa',
          }"
        >
          <el-table-column type="index" label="序号" min-width="50px" align="center" fixed />
          <el-table-column min-width="140px" label="仓库" fixed prop="warehouse_name" />
          <el-table-column min-width="300px" label="地址" prop="full_address" show-overflow-tooltip>
            <template slot-scope="{ row }">
              <div>{{ row.full_address }}</div>
            </template>
          </el-table-column>
          <el-table-column min-width="120px" label="收件人" prop="receiving_name" />
          <el-table-column prop="type" label="仓库类型" min-width="100px">
            <template slot-scope="scope"> {{ typeObj[scope.row.type] }} </template>
          </el-table-column>
          <el-table-column min-width="100px" label="联系电话" prop="receiving_tel" show-overflow-tooltip />
          <el-table-column min-width="130px" label="自有手机号" prop="own_phone">
            <template slot-scope="{ row }">
              <div v-if="row.isUser === 0">
                <el-input v-if="row.isPhone" v-model="row.own_phone" v-fo size="mini" @blur="updateOwnPhone(row)" />

                <span v-else @click="isShowPhone(row)">
                  <el-input v-model="row.own_phone" :disabled="!row.isPhone" size="mini" />
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column min-width="80px" label="邮编" prop="post_code" />
          <el-table-column min-width="140px" label="是否开启自有手机号" align="center">
            <template slot-scope="{ row }">
              <el-switch v-model="row.is_use_own_phone" :disabled="row.isUser === 1 || row.own_phone === ''" active-color="#13ce66" inactive-color="#ff4949" @change="updateOwnPhone(row)" />
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
          <el-table-column label="操作" min-width="360px">
            <template slot-scope="{ row }">
              <el-button type="primary" size="mini" @click="updateBindMall(row)">修改绑定店铺</el-button>
              <el-button v-if="row.isUser === 1" type="primary" size="mini" @click="updateItself(row, flag4 ? 1 : 2)">修改自有仓库地址</el-button>
              <el-button v-if="row.isUser === 1" type="primary" size="mini" @click="deleteOwnStore(row)">删除仓库</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!--选择地址弹窗-->
    <el-dialog
      v-if="itselfAddressVisible"
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
          <span>{{ flag4 ? '国内中转仓' : '海外中转仓' }}</span>
        </el-form-item>
        <el-form-item label="仓库站点：" v-if="flag4">
          <el-select v-model="itselfCountry" :disabled="!flag3" placeholder="" size="mini" filterable @change="handlerChange3">
            <el-option v-for="(item, index) in countries" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="仓库站点：" v-else>
          <el-select v-model="itselfCountry" :disabled="!flag3" placeholder="" size="mini" filterable @change="handlerChange3">
            <el-option v-for="(item, index) in countriesAbroad" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="仓库名称：">
          <el-input v-model="itselfWarehouseName" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
        </el-form-item>
        <div v-if="flag4">
          <address-model ref="addressModel" @sendData="sendData" :country="itselfCountry" />
        </div>
        <div v-else>
          <div v-if="!isSG">
            <el-form label-position="right" label-width="80px">
              <el-form-item label="收货省：">
                <el-select
                  v-model="itselfProvinceId"
                  filterable
                  placeholder="请选择"
                  size="mini"
                  @change="
                    flag5 = false
                    handlerChange1()
                  "
                >
                  <el-option v-for="(item, index) in provinceList" :key="index" :label="item.Province" :value="item.ProvinceId" />
                </el-select>
              </el-form-item>
              <el-form-item label="收货市：">
                <el-select
                  v-model="itselfCityId"
                  :disabled="itselfProvinceId ? false : true"
                  placeholder="请选择"
                  size="mini"
                  @change="
                    flag5 = false
                    handlerChange2()
                  "
                >
                  <el-option v-for="(item, index) in cityList" :key="index" :label="item.City" :value="item.CityId" />
                </el-select>
              </el-form-item>
              <el-form-item label="收货区：">
                <el-select v-model="itselfDistrictId" :disabled="itselfCityId ? false : true" placeholder="请选择" size="mini" @change="flag5 = false">
                  <el-option v-for="(item, index) in distinctList" :key="index" :label="item.District" :value="item.DistrictId" />
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <div v-else>
            <el-form-item label="邮政编码：">
              <el-input v-model="itselfPostCode" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
            </el-form-item>
          </div>
        </div>
        <el-form-item label="详细地址：">
          <el-input v-model="itselfDetailAddress" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
        </el-form-item>
        <el-form-item label="收件人：">
          <el-input v-model="itselfReceivingName" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
        </el-form-item>
        <el-form-item label="电话号码：">
          <el-input v-model="itselfReceivingTel" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
        </el-form-item>
        <el-form-item label="归属仓库：">
          <el-select v-model="itselfWarehouseId" placeholder="请选择" size="mini">
            <el-option label="不绑定" :value="0" />
            <el-option v-for="(item, index) in warehouseList" :key="index" :label="item.warehouse_name" :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <div class="footer">
        <span> 温馨提示：若新增的自有仓库和系统仓库地址相同, 请绑定对应的归属仓库,若未绑定归属仓库,仓库无 法精准匹配,会有无法出库的风险 </span>
        <span v-if="!flag4">
          1：收件人尽量不要有特殊字符,如#,+,_,@等<br />
          2：海外菲律宾仓的买家姓名至少包含2个英文单词, 如：(China Boy)<br />
          3：海外新加坡仓地址必须带楼层单元号并以#隔开且 置于最后,如(1 SoonLeeStreet,Industrial Cres,#01-02)
        </span>
        <el-button type="primary" size="mini" @click="itselfUpdate(flag3 ? 1 : 2)">确 定</el-button>
      </div>
    </el-dialog>
    <!--系统仓库地址弹窗-->
    <el-dialog :close-on-click-modal="false" class="sys-store-dialog" :title="flag1 ? '申请系统仓库地址' : '修改仓库地址信息'" width="1000px" :visible.sync="sysAdderssVisible" @close="handleClose2">
      <div class="dialog-left">
        <!--?-->
        <div v-if="!flag4 && flag1" class="header">
          <el-button type="primary" size="mini"><a :href="downloadExcelUrl" style="color: #fff" download="海外仓地址设置指南">下载海外仓地址设置指南</a></el-button>
          <p>使用海外仓服务前，请先下载使用指南查看</p>
        </div>
        <el-form label-position="right" label-width="80px">
          <el-form-item label="仓库类型:">
            <span>{{ flag1 ? '系统仓库' : flag2 ? '系统仓库' : '自有仓库' }}</span>
          </el-form-item>
          <el-form-item label="仓库名称:">
            <el-select v-if="flag1" v-model="sysWarehouseId" placeholder="请选择" size="mini" @change="sysWarehouseChange">
              <el-option v-for="(item, index) in warehouseData" :key="index" :value="item.id" :label="item.warehouse_name" />
            </el-select>
            <el-input v-if="!flag1" v-model="warehouseName" :disabled="flag2" size="mini" clearable oninput="value=value.replace(/\s+/g,'')" />
          </el-form-item>
          <el-form-item label="地址全称:" class="addressFull">
            <el-input v-model="warehouseAddress" :disabled="true" size="mini" type="textarea" resize="none" :autosize="{ minRows: 2, maxRows: 4 }" clearable oninput="value=value.replace(/\s+/g,'')" />
          </el-form-item>
          <el-form-item label="收件人：">
            <el-input v-model="receivingName" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
          </el-form-item>
          <el-form-item label="联系电话：">
            <el-input v-model="wareHouseTel" :disabled="flag1 || flag2" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
          </el-form-item>
        </el-form>
        <div class="footer">
          <el-button v-if="flag1" :loading="butLoading" type="primary" size="mini" @click="addXzyStore">新增仓库</el-button>
          <el-button v-else :loading="butLoading" type="primary" size="mini" @click="updateWarehouse">修改仓库</el-button>
        </div>
      </div>
      <div class="dialog-right">
        <div style="display: flex">
          <store-choose-mall :key="changeIndex" :is-all="true" :show-mall="false" @changeMallList="changeMallList" />
          <el-button style="margin-left: 15px" type="primary" size="mini" @click="getBindMall">查 询</el-button>
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
          <el-table-column type="selection" align="center" min-width="45" :reserve-selection="true" />
          <el-table-column prop="country" align="center" label="站点" min-width="90">
            <template slot-scope="{ row }">
              {{ row.country | chineseSite }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="店铺名称" min-width="120">
            <template slot-scope="{ row }">
              {{ row.mallAliasName ? row.mallAliasName : row.platformMallName }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="绑定国内仓" min-width="120">
            <template slot-scope="{ row }">
              {{ row.address.warehouse_name }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="绑定海外仓" min-width="120">
            <template slot-scope="{ row }">
              {{ row.overseas_address.warehouse_name }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <!--Shopee地址设置弹窗-->
    <el-dialog v-if="shopeeAddressVisible" class="shopee-dialog" title="Shopee地址设置" :visible.sync="shopeeAddressVisible" width="310px" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form label-position="right" label-width="80px">
        <el-form-item label="仓库站点：">
          <span>{{ itselfCountry | chineseSite }}</span>
        </el-form-item>
        <el-form label-position="right" label-width="80px">
          <el-form-item label="收货省：">
            <el-select v-model="sProvince" filterable placeholder="请选择" size="mini" @change="handlerChange4()">
              <el-option
                v-for="(item, index) in sProvinceList"
                :key="index"
                :value="item.id"
                :label="item.translated_name == item.division_name ? item.division_name : item.division_name + '/' + item.translated_name"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="收货市：">
            <el-select v-model="sCity" :disabled="sProvince ? false : true" placeholder="请选择" size="mini" @change="handlerChange5()">
              <el-option
                v-for="(item, index) in sCityList"
                :key="index"
                :value="item.id"
                :label="item.translated_name == item.division_name ? item.division_name : item.division_name + '/' + item.translated_name"
              />
            </el-select>
          </el-form-item>
           <el-form-item label="邮编：" v-if="itselfCountry==='MY'">
            <el-input size="mini" v-model="sPDistinctInput"></el-input>
          </el-form-item>
          <el-form-item label="收货区：" v-else>
            <el-select v-model="sPDistinct" :disabled="sCity ? false : true" placeholder="请选择" size="mini" @change="handlerChange6()">
              <el-option v-for="(item, index) in sDistinctList" :key="index" :value="item.id" :label="item.translated_name == item.division_name ? item.division_name : item.division_name + '/' + item.translated_name" />
            </el-select>
          </el-form-item>
           <el-form-item label="收货街道：" v-if="itselfCountry==='PH'">
            <el-select v-model="sStreet" :disabled="sCity ? false : true" placeholder="请选择" size="mini">
              <el-option v-for="(item, index) in sStreetList" :key="index" :value="item.id" :label="item.division_name" />
            </el-select>
          </el-form-item>
        </el-form>
        <div class="footer">
          <el-button type="primary" size="mini" @click="addAbroadAddress">确 定</el-button>
        </div>
      </el-form></el-dialog
    >
  </div>
</template>

<script>
import AddressModel from '../../../components/address-model.vue'
import AddressSet from '../../../module-api/order-manager-api/address-set'
import StoreChooseMall from '../../../components/store-choose-mall.vue'
export default {
  components: {
    AddressModel,
    StoreChooseMall,
  },
  data() {
    return {
      downloadExcelUrl: 'https://shopeeman.oss-cn-shenzhen.aliyuncs.com/files/shopeemanFiles/appFiles/20211224/2021122418063161c59ba7e66a0.xlsx',
      isShowLoading: false,
      butLoading: false,
      itselfAddressVisible: false,
      sysAdderssVisible: false,
      shopeeAddressVisible: false,
      isHomeApplyAddress: false,
      isOverseasApplyAddress: false,
      flag1: true, // 系统仓库地址 新增/修改
      flag2: true, // 系统/自有
      flag3: true, // 自有仓库地址 新增/修改
      flag4: true, // 国内/海外
      flag5: false, // 是否change
      countries: this.$filters.countries_option_sub,
      countriesAbroad: this.$filters.countries_option_sub_abroad,
      AddressSet: new AddressSet(this),
      activeName: 'landStore',
      changeIndex: 0,
      tableData: [],
      tableDataAll: [],
      multipleSelection: [],
      mallList: [], // 店铺分组数据
      typeObj: ['国内中转仓', '存储转运仓', '海外存储仓', '海外中转仓'],

      warehouseLoading: false,
      warehouseData: [], // 仓库数据
      bindMallData: [], // 店铺列表数据
      sysWarehouseId: '', // 仓库名ID
      warehouseAddress: '', // 地址全称
      warehouseName: '', // 仓库名称
      wareHouseTel: '', // 联系电话
      receivingName: '', // 收件人
      itemData: {}, // 修改绑定店铺item

      itselfWarehouseName: '', // 仓库名称
      itselfCountry: 'TH', // 仓库站点
      itselfProvinceId: '', // 收货ID
      itselfProvinceText: '', // 收货省
      itselfCityId: '', // 收货市ID
      itselfCityText: '', // 收货市
      itselfDistrictId: '', // 收货区ID
      itselfDistinctText: '', // 收货区
      itselfDetailAddress: '', // 详细地址
      itselfFullAddress: '', // 全部地址
      itselfReceivingName: '', // 收件人
      itselfReceivingTel: '', // 电话号码
      itselfWarehouseId: 0, // 所属仓库
      itselfShopeeMapId: '17312', // 海外ShopeeMapId
      warehouseList: [], // 所属仓库数据
      itselfItemId: null, // 修改自有仓库地址ID
      itselfPostCode: '', // 新加坡邮编

      provinceList: [],
      cityList: [],
      distinctList: [],
      addressData: [], // 海外地址数据
      mallId: [],
      isSG: false,

      // shopee地址
      sProvince: '',
      sCity: '',
      sPDistinct: '',
      sPDistinctInput:'',
      sProvinceList: [],
      sCityList: [],
      sDistinctList: [],
      sStreet:'',
      sStreetList:'',

      abroadAddressParams: {},
      itselfUpdateType: '',
    }
  },
  mounted() {
    this.getUserWarehouse()
    // 获取系统仓库，用来判断是否显示申请系统仓库地址
    this.xzyIndex([0, 3])
    // 获取所属仓库
    this.xzyAllIndex()
  },
  methods: {
    address(str) {
      let aa = str.split(' ')
      console.log(aa, str)
    },
    // 修改自有仓库弹窗
    async updateItself(row, type) {
      this.itselfWarehouseId = 0
      this.itselfItemId = row.id
      this.flag3 = false
      this.flag5 = true
      this.itselfAddressVisible = true
      this.itselfWarehouseName = row.warehouse_name
      this.itselfDetailAddress = row.detail_address
      this.itselfReceivingName = row.receiving_name
      this.itselfReceivingTel = row.receiving_tel
      this.itselfCountry = row.country
      row.mallInfo.forEach((item) => {
        this.mallId.push(item.id)
      })
      // 1、国内修改自有仓库 2、海外修改自有仓库
      if (type === 1) {
        this.$nextTick(() => {
          this.$refs.addressModel.update(row.province_id, row.city_id, row.distinct_id)
        })
      } else {
        if (this.itselfCountry === 'SG') {
          this.isSG = true
          this.itselfPostCode = row.post_code
          return
        }
        try {
          this.itselfProvinceId = 'R' + row.province_id
          await this.getLazadaDetailAddress('', this.itselfCountry, 'provinceList', 'ProvinceId')
          this.itselfCityId = 'R' + row.city_id
          await this.getLazadaDetailAddress(this.itselfProvinceId, this.itselfCountry, 'cityList', 'CityId')
          this.itselfDistrictId = 'R' + row.distinct_id
          await this.getLazadaDetailAddress(this.itselfCityId, this.itselfCountry, 'distinctList', 'DistrictId')
        } catch (error) {
          console.log(error)
          this.itselfProvinceId = ''
          this.itselfCityId = ''
        }
      }
      // this.xzyAllIndex()
    },
    // 修改自有仓库
    async updateItselfData(params) {
      params['id'] = this.itselfItemId
      params['warehouseId'] = this.itselfWarehouseId
      params['mallId'] = this.mallId.toString()
      if (this.isSG) {
        params['address']['post_code'] = this.itselfPostCode
      }
      await this.updateData(params)
      this.itselfAddressVisible = false
    },
    // 修改绑定店铺弹窗
    async updateBindMall(row) {
      this.itemData = row
      this.flag1 = false
      this.flag2 = row.isUser === 0
      this.sysAdderssVisible = true
      this.warehouseName = row.warehouse_name
      this.warehouseAddress = row.full_address
      this.receivingName = row.receiving_name
      this.wareHouseTel = row.receiving_tel
      await this.getBindMall()
      this.$nextTick(() => {
        this.bindMallData.forEach((item1) => {
          row.mallInfo.forEach((item2) => {
            if (item2.id === item1.sysMallId) {
              this.$refs.bindMallDataRef.toggleRowSelection(item1)
            }
          })
        })
      })
    },
    // 修改仓库
    async updateWarehouse() {
      if (!this.warehouseName) return this.$message('仓库名不能为空')
      if (!this.receivingName) return this.$message('收件人不能为空')
      if (!this.wareHouseTel) return this.$message('电话号码不能为空')
      if (this.flag2) {
        if (!this.multipleSelection.every((item) => item.country === this.itemData.country)) {
          return this.$message(`当前仓库只能绑定${this.$filters.chineseSite(this.itemData.country)}的店铺，请重新选择`)
        }
      }
      const params = {
        mallId: [],
        address: {},
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
      this.multipleSelection.forEach((item) => {
        params['mallId'].push(item.sysMallId)
      })
      this.butLoading = true
      await this.updateData(params)
      await this.getBindMall()
      this.butLoading = false
    },
    // 修改数据
    async updateData(params) {
      const res = await this.AddressSet.updateData(params)
      if (res.code === 200) {
        await this.$appConfig.updateWarehouseInfo()
        this.$message.success('修改成功')
        this.itselfUpdateType = ''
        if (this.itselfAddressVisible) {
          this.getUserWarehouse()
        }
      } else {
        this.$message.error(res.data)
      }
    },
    // 新增仓库
    async addXzyStore() {
      let sysNewData = []
      const sysMallId = []
      if (!this.receivingName) return this.$message('收件人不能为空')
      sysNewData = this.warehouseData.filter((item) => {
        return item.id === this.sysWarehouseId
      })
      if (!this.multipleSelection.every((item) => item.country === sysNewData[0].country)) {
        return this.$message(`当前仓库只能绑定${this.$filters.chineseSite(sysNewData[0].country)}的店铺，请重新选择`)
      }
      this.multipleSelection.forEach((item) => {
        sysMallId.push(item.sysMallId)
      })
      const params = {
        id: this.sysWarehouseId,
        receivingName: this.receivingName,
        mallId: sysMallId.toString(),
      }
      this.butLoading = true
      const res = await this.AddressSet.addXzyStore(params)
      if (res.code === 200) {
        await this.$appConfig.updateWarehouseInfo()
        this.$message.success('新增系统仓库成功')
        this.getBindMall()
      } else {
        this.$message.error(res.data)
      }
      this.butLoading = false
    },
    // 仓库名称Change
    sysWarehouseChange() {
      let arr = {}
      this.warehouseData.forEach((item) => {
        if (item.id === this.sysWarehouseId) arr = item
      })
      this.warehouseAddress = arr.full_address
      this.wareHouseTel = arr.receiving_tel
    },
    // 申请系统仓库地址
    sysApplyAddress() {
      this.flag1 = true
      this.sysAdderssVisible = true
      this.getBindMall()
    },
    // 绑定店铺、申请仓库的店铺列表
    async getBindMall() {
      this.warehouseLoading = true
      const groupIds = new Set()
      this.mallList.forEach((item) => {
        groupIds.add(item.group_id)
      })
      const params = {
        id: this.sysWarehouseId,
        country: this.mallList.country || '',
        groupIds: [...groupIds].toString(),
      }
      console.log(params, '-----------')
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
        id: row.id,
      }
      const res = await this.AddressSet.deleteOwnStore(params)
      if (res.code === 200) {
        await this.$appConfig.updateWarehouseInfo()
        this.$message.success('删除成功')
        this.getUserWarehouse()
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
        ownPhone: row.own_phone,
      }
      const res = await this.AddressSet.updateOwnPhone(params)
      if (res.code === 200) {
        this.$message.success('更新成功')
      } else {
        this.$message.error(res.data)
      }
    },
    itselfUpdate(type) {
      this.itselfUpdateType = type
      let arr = {}
      if (!this.itselfWarehouseName) return this.$message('仓库名称不能为空')
      if (!this.itselfDetailAddress) return this.$message('详细地址不能为空')
      if (!this.itselfReceivingName) return this.$message('收件人不能为空')
      if (!this.itselfReceivingTel) return this.$message('请输入电话号码')
      if (this.isSG) {
        if (this.itselfDetailAddress.indexOf('#') === -1) return this.$message('新加坡站点详细地址缺少#字符，请以#字符隔出楼层单元号')
        if (!this.itselfPostCode) return this.$message('新加坡的邮政编码不能为空')
      }
      this.$confirm('请确认当前仓库是否和系统仓库地址相同，若相同，请务必绑定对应的归属仓库，避免因未能准确匹配仓库造成的无法出库的风险?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        if (this.itselfWarehouseId !== 0) {
          this.warehouseList.forEach((item) => {
            if (this.itselfWarehouseId === item.id) arr = item
          })
          if (!this.isSG) {
            if (
              this.itselfProvinceText !== arr.province_text ||
              this.itselfCityText !== arr.city_text ||
              this.itselfDistinctText !== arr.distinct_text ||
              this.itselfDetailAddress.indexOf(arr.detail_address) === -1
            ) {
              this.$message('自有出库地址与归属出库地址省份信息不匹配')
              return
            }
          }
          if (this.itselfDetailAddress === arr.detail_address) return this.$message('自有仓库地址不能和系统仓库地址完全相同')
          // 如果是海外仓设置则还需判断站点是否相同
          if (!this.flag4) {
            if (this.itselfCountry !== arr.country) {
              this.$message('自有出库站点与归属出库地址站点信息不匹配')
              return
            }
            if (this.itselfDetailAddress.indexOf(arr.detail_address) === -1) {
              this.$message('新加坡自有出库地址与归属出库地址详细信息不匹配')
              return
            }
          }
        }
        const params = {
          address: {},
        }
        // flag4 = true：国内 false：海外
        if (this.flag4) {
          this.itselfFullAddress = this.itselfProvinceText + ' ' + this.itselfCityText + ' ' + this.itselfDistinctText + ' ' + this.itselfDetailAddress
        } else {
          if (this.isSG) {
            this.itselfProvinceId = '1'
            this.itselfCityId = '1'
            this.itselfDistrictId = '1'
            this.itselfFullAddress = this.itselfDetailAddress
          } else {
            this.provinceList.forEach((item) => {
              if (item.ProvinceId === this.itselfProvinceId) {
                this.addressData['province_text'] = item.Province
              }
            })
            this.cityList.forEach((item) => {
              if (item.CityId === this.itselfCityId) {
                this.addressData['city_text'] = item.City
              }
            })
            this.distinctList.forEach((item) => {
              if (item.DistrictId === this.itselfDistrictId) {
                this.addressData['distinct_text'] = item.District
                // 海外获取邮编
                this.addressData['post_code'] = item.DistrictId
              }
            })
            this.itselfFullAddress =
              this.itselfDetailAddress + ' ' + (this.addressData.province_text.split('/')[1]
                ? this.addressData.province_text.split('/')[1].trim()
                : this.addressData.province_text) + ' ' +( this.addressData.city_text.split('/')[1]
                ? this.addressData.city_text.split('/')[1].trim()
                : this.addressData.city_text )+ ' ' + (this.addressData.distinct_text.split('/')[1]
                ? this.addressData.distinct_text.split('/')[1].trim()
                : this.addressData.distinct_text)
            // 获取虾皮地址
            if (!this.flagAbroad) {
              this.shopeeAddressVisible = true
            }
            try {
              await this.getShopeeAddress('0', 'sProvinceList', 'sProvince')
              await this.handlerChange4()
            } catch (error) {
              console.log(error)
            }
          }
        }
        console.log(this.itselfProvinceId,"444444444444444444444444444444")
        params['warehouseName'] = this.itselfWarehouseName
        params['address']['province_id'] = this.itselfCountry == 'TW'?1:this.itselfProvinceId.replace('R', '')
        params['address']['province_text'] = this.itselfProvinceText || this.addressData.province_text
        params['address']['city_id'] = this.itselfCountry == 'TW'?1:this.itselfCityId.replace('R', '')
        params['address']['city_text'] = this.itselfCityText || this.addressData.city_text
        params['address']['distinct_id'] = this.itselfCountry == 'TW'?1:this.itselfDistrictId.replace('R', '')
        params['address']['distinct_text'] = this.itselfDistinctText || this.addressData.distinct_text
        params['address']['detail_address'] = this.itselfDetailAddress
        params['address']['full_address'] = this.itselfFullAddress
        params['address']['receiving_name'] = this.itselfReceivingName
        params['address']['receiving_tel'] = this.itselfReceivingTel
        params['address']['type'] = this.flag4 ? 0 : 3 // 国内/海外
        if (!this.flag4) {
          this.abroadAddressParams = params
          console.log(this.abroadAddressParams, '5445465465')
          return
        }
        if (this.flag4) {
          switch (type) {
            case 1:
              this.adduserStore(params)
              break
            case 2:
              this.updateItselfData(params)
              break
          }
        }
      })
    },
    // 添加自有仓库
    async adduserStore(params) {
      params['id'] = 0
      params['address']['country'] = this.itselfCountry
      params['address']['warehouseId'] = this.itselfWarehouseId
      // params['address']['shopee_map_id'] = this.itselfShopeeMapId
      if (this.isSG) {
        params['address']['post_code'] = this.itselfPostCode
      } else if(this.itselfCountry == 'MY'){
        params['address']['post_code'] = this.sPDistinctInput
      }
      else {
        params['address']['post_code'] = this.flag4 ? 0 : this.addressData['post_code']
      }
      if(this.itselfCountry == 'TW'){
        params['address']['shopee_map_id'] = this.itselfCityId
      }
      const res = await this.AddressSet.adduserStore(params)
      if (res.code === 200) {
        this.$message.success('添加自有仓库成功')
        this.getUserWarehouse()
        this.itselfAddressVisible = false
        this.itselfUpdateType = ''
      } else {
        this.$message.error(res.data)
      }
    },
    // 添加自有仓库弹窗
    homeAddress() {
      this.handleClose1()
      this.itselfAddressVisible = true
      this.flag3 = true
      this.$nextTick(() => {
        this.$refs.addressModel.init()
      })
      // this.xzyAllIndex()
    },
    // 添加海外自有仓库弹窗
    async oversearAddress() {
      this.itselfAddressVisible = true
      this.flag3 = true
      this.flag5 = false
      this.handleClose1()
      await this.handlerChange3()
      // await this.xzyAllIndex()
    },
    // 获取海外地址信息
    async getLazadaDetailAddress(id, list, val) {
      const res = await this.$BaseUtilService.getLazadaDetailAddress(id, this.itselfCountry)
      console.log(' this.itselfCountry', this.itselfCountry)
      this[list] = res
      this['itself' + val] = this.flag5 ? this['itself' + val] : this[list][0][val]
      console.log(list, this[list])
    },
    // 获取所属仓库
    async xzyAllIndex() {
      const res = await this.AddressSet.xzyAllIndex()
      if (res.code === 200) {
        this.warehouseList = res.data
        console.log('warehouseList', this.warehouseList)
      } else {
        this.$message.error(res.data)
      }
    },
    // 绑定的店铺
    bindMallName(list) {
      const arr = []
      list.forEach((item) => {
        const name = item.mall_alias_name ? item.mall_alias_name : item.platform_mall_name
        arr.push(name)
      })
      return arr.toString()
    },
    // 切换tab
    handleClick() {
      if (this.activeName === 'landStore') {
        this.flag4 = true
        this.tableData = this.tableDataAll.filter((item) => {
          return item.type === 0
        })
      } else {
        this.flag4 = false
        this.tableData = this.tableDataAll.filter((item) => {
          return item.type === 2 || item.type === 3
        })
      }
      console.log(this.tableData, 'this.tableData')
    },
    // 获取系统仓库，用来判断是否显示申请系统仓库地址
    async xzyIndex(typeLists) {
      let resData = []
      const typeList = typeLists || [0, 3]
      for (let index = 0; index < typeList.length; index++) {
        const type = typeList[index]
        const res = await this.AddressSet.xzyIndex(type)
        if (res.code === 200) {
          resData = resData.concat(res)
        } else {
          this.$message.error(res.data)
        }
      }
      console.log('sysWarehouseData', resData)
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
        if (resData[1] && resData[1].data?.length > 0) {
          this.isOverseasApplyAddress = true
          this.warehouseData = resData[1].data
          this.sysWarehouseId = resData[1].data[0].id
          this.warehouseAddress = resData[1].data[0].full_address
          this.wareHouseTel = resData[1].data[0].receiving_tel
        } else {
          this.isOverseasApplyAddress = false
        }
      }
    },
    // 获取数据
    async getUserWarehouse() {
      this.isShowLoading = true
      const res = await this.AddressSet.getUserWarehouse()
      if (res.code === 200) {
        this.tableDataAll = res.data
        this.tableDataAll.map((item) => {
          item.is_use_own_phone = item.is_use_own_phone === '1'
        })
        this.handleClick()
      } else {
        this.$message.error(res.data)
      }
      console.log('tableDataAll', res)
      this.isShowLoading = false
    },
    addAbroadAddress() {
      console.log(this.sCity, this.sPDistinct,this.sStreet,'sPDistinct')
      if (!this.sPDistinct && (!this.sCity) && !this.sStreet) {
        return this.$message.warning('请先进行shopee地址设置')
      }
      let shopee_map_id = this.itselfCountry === 'MY'?this.sCity:(this.itselfCountry === 'PH'?this.sStreet:this.sPDistinct )
      this.abroadAddressParams['address']['shopee_map_id'] = shopee_map_id
      this.shopeeAddressVisible = false
      switch (this.itselfUpdateType) {
        case 1:
          this.adduserStore(this.abroadAddressParams)
          break
        case 2:
          this.updateItselfData(this.abroadAddressParams)
          break
      }
    },
    // 获取虾皮地址
    async getShopeeAddress(id, list, val) {
      const platform = this.$filters.sitePlatform(this.itselfCountry)
      console.log(platform, '1', id.toString())
      const res = await this.$commodityService.getShopeeAddress(platform, '1', id)
      console.log(res, 'getShopeeAddress')
      const jsonData = this.isJsonString(res)
      // console.log(jsonData)
      this[list] = jsonData
      this[val] = this[list][0]?this[list][0].id :''
    },
    async handlerChange4() {
      await this.getShopeeAddress(this.sProvince, 'sCityList', 'sCity')
      await this.handlerChange5()
    },
    async handlerChange5() {
      await this.getShopeeAddress(this.sCity, 'sDistinctList', 'sPDistinct')
      await this.handlerChange6()
    },
    async handlerChange6(){
      if(this.itselfCountry === 'PH'){
        await this.getShopeeAddress(this.sPDistinct, 'sStreetList', 'sStreet')
      }
    },
    // 判断能否转JSON
    isJsonString(str) {
      if (typeof str === 'string') {
        try {
          JSON.parse(str)
          return JSON.parse(str)
        } catch (e) {
          return str
        }
      } else {
        return str
      }
    },
    changeMallList(val) {
      this.mallList = val
      console.log('changeMallList', val)
    },
    handleClose1() {
      // this.getUserWarehouse()
      this.itselfWarehouseName = ''
      this.itselfCountry = 'TH'
      this.itselfProvinceId = ''
      this.itselfProvinceText = ''
      this.itselfCityId = ''
      this.itselfCityText = ''
      this.itselfDistrictId = ''
      this.itselfDistinctText = ''
      this.itselfDetailAddress = ''
      this.itselfFullAddress = ''
      this.itselfReceivingName = ''
      this.itselfReceivingTel = ''
      this.itselfWarehouseId = 0
      this.itselfShopeeMapId = ''
      this.isSG = false
      this.itselfPostCode = ''
    },
    handleClose2() {
      let type = this.flag4 ? [0] : [3]
      this.xzyIndex(type)
      this.getUserWarehouse()
      this.receivingName = ''
      this.$refs.bindMallDataRef.clearSelection()
      this.changeIndex++
    },
    async handlerChange1() {
      await this.getLazadaDetailAddress(this.itselfProvinceId, 'cityList', 'CityId')
      await this.handlerChange2()
    },
    async handlerChange2() {
      await this.getLazadaDetailAddress(this.itselfCityId, 'distinctList', 'DistrictId')
    },
    async handlerChange3() {
      if (!this.flag4) {
        if (this.itselfCountry === 'SG') {
          this.isSG = true
          return
        } else {
          this.isSG = false
        }
        try {
          // if (this.itselfCountry === 'TW') {
          //   console.log('545454654654654654654')
          //   await this.getShopeeAddress('0', 'provinceList', 'ProvinceId')
          // } else {
          //   await this.getLazadaDetailAddress('', 'provinceList', 'ProvinceId')
          // }
          await this.getLazadaDetailAddress('', 'provinceList', 'ProvinceId')
          await this.handlerChange1()
        } catch (error) {
          console.log(error)
          this.$message(`没有该站点的信息，已为您重新选择`)
          this.itselfCountry = 'TH'
          await this.getLazadaDetailAddress('', 'provinceList', 'ProvinceId')
          await this.handlerChange1()
        }
      }
    },
    sendData(val) {
      console.log('addressData', val)
      this.itselfProvinceId = val.province_id
      this.itselfProvinceText = val.province_text
      this.itselfCityId = val.city_id 
      this.itselfCityText = val.city_text
      this.itselfDistrictId = this.itselfCountry === 'TW'?1:val.distinct_id
      this.itselfDistinctText = this.itselfCountry === 'TW'?'':val.distinct_text
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 记住所选项
    getRowKey(row) {
      return row.sysMallId
    },
  },
}
</script>

<style lang="less" scoped>
@import '../../../module-less/order-manager-less/address-set.less';
</style>
