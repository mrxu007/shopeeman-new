<template>
  <el-row class="contaniner">
    <el-row class="header">
      <ul style="margin-bottom: 10px">
        <li>
          <span>仓库名称：</span>
          <el-select v-model="form.returnWheareHouseName" placeholder="" size="mini" filterable>
            <el-option label="全部" :value="0" />
            <el-option v-for="(item, index) in returnWheareHouseNameList" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </li>
        <li>
          <span>系统商品编号：</span>
          <el-input v-model="form.systemskuid" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
        </li>
        <li>
          <span>商品编号：</span>
          <el-input v-model="form.skuid" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
        </li>
        <li>
          <span>商品规格：</span>
          <el-input v-model="form.sku_name" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
        </li>
        <li>
          <el-checkbox
            v-model="filter"
            @change="flt"
          >过滤0库存</el-checkbox>
        </li>
        <li>
          <el-button type="primary" :disabled="Loading1" size="mini" @click="getoverseaswarehouse">搜索</el-button>
          <el-button type="primary" size="mini" :loading="Loading2" @click="DerivedData">导出数据</el-button>
        </li>
      </ul>
      <el-row id="article">
        <el-table
          ref="plTable"
          v-loading="Loading3"
          header-align="center"
          height="calc(100vh - 205px)"
          :data="tableData"
          :header-cell-style="{
            backgroundColor: '#f5f7fa',
          }"
          @selection-change="handleSelectionChange"
        >
          <el-table-column align="center" type="selection" width="50" />
          <el-table-column align="center" label="序列号" width="70" prop="id" />
          <el-table-column align="center" prop="wid" label="仓库名称" width="110" />
          <el-table-column align="center" prop="sys_sku_id" label="系统商品编号" width="130" />
          <el-table-column prop="sku_id" label="商品编号（SkuId）" width="140" align="center" />
          <el-table-column prop="goods_name" label="商品名称" width="120" align="center" />
          <el-table-column prop="sku_name" label="商品规格" width="150" align="center" />
          <el-table-column prop="stock_num" label="可用库存" width="100" align="center" />
          <el-table-column prop="shared_num" label="共享库存" width="110" align="center" />
          <el-table-column prop="sku_price" label="商品单价（RMB/分）" width="140" align="center" />
          <el-table-column prop="sku_url" label="商品链接" width="150" align="center" />
          <el-table-column prop="real_image_url" label="商品图片" width="100" align="center">
            <!-- <template slot-scope="scope">
              <el-tooltip effect="light" placement="right-end" :visible-arrow="false" :enterable="false" style="width: 56px; height: 56px; display: inline-block">
                <div slot="content">
                  <el-image :src="[scope.row.country, scope.row.platform_id, scope.row.goods_img] | imageRender" style="width: 200px; height: 200px" />
                </div>
                <el-image :src="[scope.row.country, scope.row.platform_id, scope.row.goods_img] | imageRender" style="width: 56px; height: 56px" />
              </el-tooltip>
            </template> -->
          </el-table-column>
          <el-table-column prop="position" label="货架仓位" width="120" align="center" />
          <el-table-column prop="updated_at" label="库存更新时间" width="150" align="center" />
          <el-table-column label="操作" width="200" align="center" fixed>
            <template slot-scope="{ row }">
              <el-button type="primary" size="mini" @click="change(row)">改价</el-button>
              <el-button type="primary" size="mini" @click="share(row)">共享库存</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
          class="edit-group-dialog"
          :visible.sync="changes"
          width="25%"
          title="修改库存价格"
        >
          <el-form>
            <el-row>
              <el-col span="5">
                <el-form-item label="商品名称：" />
              </el-col>
              <el-col span="19">
                <el-input v-model="rowx.goods_name" />
              </el-col>
            </el-row>
            <el-row>
              <el-col span="5">
                <el-form-item label="商品规格：" />
              </el-col>
              <el-col span="19">
                <el-input v-model="rowx.sku_name" />
              </el-col>
            </el-row>
            <el-row>
              <el-col span="5">
                <el-form-item label="skuid：" style="margin-left:19px" />
              </el-col>
              <el-col span="19">
                <el-input v-model="rowx.sku_id" />
              </el-col>
            </el-row>
            <el-row>
              <el-col span="5">
                <el-form-item label="原始价格：" />
              </el-col>
              <el-col span="15">
                <el-input v-model="rowx.sku_price" />
              </el-col>
              <el-col span="4">
                <span>RMB(分)</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="5">
                <el-form-item label="新价格：" style="margin-left:10px" />
              </el-col>
              <el-col span="15">
                <el-input v-model="rowx.newprice" />
              </el-col>
              <el-col span="4">
                <span>RMB(元)</span>
              </el-col>
            </el-row>
            <el-form-item>
              <span style="color: red">温馨提示：价格修改后，会将以当前商品出货但未发货的订单的拍单金额同步成新价格</span>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="margin-left:45%" @click="onsubmit">确定</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <el-dialog
          class="edit-group-dialog"
          :visible.sync="changes1"
          width="25%"
          title="修改共享库存"
        >
          <el-form>
            <el-row>
              <el-col span="5">
                <el-form-item label="商品名称：" />
              </el-col>
              <el-col span="19">
                <el-input v-model="rowy.goods_name" />
              </el-col>
            </el-row>
            <el-row>
              <el-col span="5">
                <el-form-item label="商品规格：" />
              </el-col>
              <el-col span="19">
                <el-input v-model="rowy.sku_name" />
              </el-col>
            </el-row>
            <el-row>
              <el-col span="5">
                <el-form-item label="skuid：" style="margin-left:19px" />
              </el-col>
              <el-col span="19">
                <el-input v-model="rowy.sku_id" />
              </el-col>
            </el-row>
            <el-row>
              <el-col span="5">
                <el-form-item label="可用库存：" />
              </el-col>
              <el-col span="19">
                <el-input v-model="rowy.stock_num" />
              </el-col>
            </el-row>
            <el-row>
              <el-col span="5">
                <el-form-item label="共享库存：" style="margin-left:10px" />
              </el-col>
              <el-col span="19">
                <el-input v-model="rowy.shared_num" />
              </el-col>
            </el-row>
            <el-form-item>
              <el-button type="primary" style="margin-left:45%" @click="onSubmit">确定</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <div class="pagination">
          <el-pagination
            background
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="total,sizes, prev, pager, next, jumper"
            :total="total"
            :page-sizes="[20, 50, 100, 200]"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-row>
    </el-row>
  </el-row>
</template>
<script>
import { exportExcelDataCommon } from '../../../util/util'
export default {
  data() {
    return {
      currentPage: 1,
      newform: [],
      data1: [],
      tableData: [],
      data2: [],
      total: 0,
      pageSize: 50,
      page: 1,
      Loading1: false,
      Loading2: false,
      Loading3: false,
      filter: false,
      changes: false,
      changes1: false,
      primarynum: '',
      sharedtype: '',
      rowx: {
        goods_name: '',
        sku_name: '',
        sku_id: '',
        sku_price: 1,
        newprice: 0
      },
      rowy: {
        goods_name: '',
        sku_name: '',
        sku_id: '',
        stock_num: 1,
        shared_num: 2,
        id: '',
        wid: ''
      },
      form: {
        app_uid: '',
        skuid: '',
        returnWheareHouseName: 17, // 仓库名称
        systemskuid: '', // 系统商品编号
        sku_name: ''
      },
      returnWheareHouseNameList: [
        { value: 17, label: '泰国存储仓' },
        { value: 27, label: '星卓越菲律宾存储仓' },
        { value: 28, label: '星卓越马来存储仓' },
        { value: 75, label: '超世代（越南仓海外仓）' },
        { value: 110, label: '锦汐越南海外仓' }
      ]
    }
  },
  mounted() {
    this.getoverseaswarehouse()
    this.test()
  },
  methods: {
    // 改价点击确定
    async onsubmit() {
      this.changes = false
      const parmas = {
        sku_id: this.rowx.sku_id,
        app_uid: '',
        price: Number(this.rowx.newprice)
      }
      console.log(parmas)
      try {
        let data = await this.$XzyNetMessageService.post('xzy.stock.editPrice', parmas)
        data = JSON.parse(data)
        data.data = JSON.parse(data.data)
        if (data.status === 200) {
          this.$message.success(`改价成功`)
        } else {
          this.$message.error(`改价失败${data.data.message}`)
        }
      } catch (error) {
        console.log(error)
      }
      this.getoverseaswarehouse()
    },
    // 测试
    async test() {
      const parmas = {
        app_uid: '',
        wid: this.form.returnWheareHouseName,
        uid: ''
      }
      try {
        let data = await this.$XzyNetMessageService.post('xzy.getSharedIndex', parmas)
        data = JSON.parse(data)
        data.data = JSON.parse(data.data)
        console.log(data)
        if (data.data.code === 200) {
          this.$message.success(`测试数据查询成功`)
        } else {
          this.$message.error(`测试数据查询失败${data.data.message}`)
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 共享库存点击确定
    async onSubmit() {
      this.changes1 = false
      if (this.rowy.shared_num > Number(this.primarynum)) {
        this.sharedtype = 1
      } else {
        this.sharedtype = 2
      }
      const parmas = {
        shared_id: this.rowy.id,
        shared_num: this.rowy.shared_num,
        app_uid: '',
        type: this.sharedtype
      }
      console.log(parmas)
      try {
        let data = await this.$XzyNetMessageService.post('xzy.addSharedInventoryStock', parmas)
        data = JSON.parse(data)
        data.data = JSON.parse(data.data)
        if (data.code === 200) {
          this.$message.success(`数据共享成功`)
        } else {
          this.$message.error(`数据共享失败${data.data.message}`)
        }
      } catch (error) {
        console.log(error)
      }
      this.getoverseaswarehouse()
    },
    // 改价功能
    async change(val) {
      this.changes = true
      this.rowx.goods_name = val.goods_name
      this.rowx.sku_name = val.sku_name
      this.rowx.sku_id = val.sku_id
      this.rowx.sku_price = val.sku_price
    },
    // 共享功能
    async share(val) {
      this.changes1 = true
      this.rowy.goods_name = val.goods_name
      this.rowy.sku_name = val.sku_name
      this.rowy.sku_id = val.sku_id
      this.rowy.stock_num = val.stock_num
      this.rowy.shared_num = val.shared_num
      this.primarynum = val.shared_num
      this.rowy.id = val.id
      this.rowy.wid = val.wid
    },
    // 过滤功能
    async flt() {
      if (this.filter === true) {
        this.tableData = this.data2
      } else {
        this.tableData = this.data1
      }
    },
    // 搜索功能
    async getoverseaswarehouse() {
      this.Loading1 = true
      this.Loading3 = true
      const parmas = {
        app_uid: '',
        wid: this.form.returnWheareHouseName,
        sku_id: this.form.skuid,
        sys_sku_id: this.form.systemskuid,
        sku_name: ''
      }
      console.log('parmas', parmas)
      try {
        let data = await this.$XzyNetMessageService.post('xzy.stock.index', parmas)
        data = JSON.parse(data)
        data.data = JSON.parse(data.data)
        this.data1 = data.data.data.data
        const data2 = []
        // console.log(this.data1[0].stock_num)
        if (data.data.code === 200) {
          for (let i = 0; i < this.data1.length - 1; i++) {
            if (this.data1[i].stock_num !== 0) {
              data2.push(this.data1[i])
            }
          }
          this.data2 = data2
          this.total = data.data.data.total
          if (this.filter === true) {
            this.tableData = data2
          } else {
            this.tableData = this.data1
          }
        } else {
          this.$message.error('数据获取失败', data.message)
        }
      } catch (error) {
        console.log(error)
      }
      this.Loading1 = false
      this.Loading3 = false
    },
    // 数据导出功能
    async DerivedData() {
      this.Loading2 = true
      if (this.tableData.length) {
        let msg = `<tr>
        <td style="width: 200px; text-align:left;">序列号</td>
        <td style="width: 200px; text-align:left;">仓库名称</td>
        <td style="width: 200px; text-align:left;">系统商品编号</td>
        <td style="width: 200px; text-align:left;">商品编号（SkuId）</td>
        <td style="width: 200px; text-align:left;">商品名称</td>
        <td style="width: 200px; text-align:left;">商品规格</td>
        <td style="width: 200px; text-align:left;">可用库存</td>
        <td style="width: 200px; text-align:left;">共享库存</td>
        <td style="width: 200px; text-align:left;">商品单价（RMB/分）</td>
        <td style="width: 200px; text-align:left;">商品链接</td>
        <td style="width: 200px; text-align:left;">货架仓位</td>
        <td style="width: 200px; text-align:left;">库存更新时间</td>
      </tr>`
        this.tableData.map((item) => {
          msg += `
        <tr>
          <td style="text-align:left;">${item.id || ''}</td>
          <td style="text-align:left;">${item.wid || ''}</td>
          <td style="text-align:left;">${item.sys_sku_id || ''}</td>
          <td style="text-align:left;">${item.sku_id || ''}</td>
          <td style="text-align:left;">${item.goods_name || ''}</td>
          <td style="text-align:left;">${item.sku_name || ''}</td>
          <td style="text-align:left;">${item.stock_num}</td>
          <td style="text-align:left;">${item.shared_num}</td>
          <td style="text-align:left;">${item.sku_price || ''}</td>
          <td style="text-align:left;">${item.sku_url || ''}</td>
          <td style="text-align:left;">${item.position || ''}</td>
          <td style="text-align:left;">${item.updated_at || ''}</td>
        </tr>
        `
        })
        exportExcelDataCommon('海外仓库存信息', msg)
        this.Loading2 = false
      } else {
        this.Loading2 = false
        return this.$notify({
          title: '订单信息',
          type: 'warning',
          message: `没有可以导出的订单`
        })
      }
    },
    handleSizeChange(val) {
      this.page = 1
      this.pageSize = val
      this.getoverseaswarehouse()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getoverseaswarehouse()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../../module-less/smart-house-less/foreign-warehouseshare.less';
</style>
