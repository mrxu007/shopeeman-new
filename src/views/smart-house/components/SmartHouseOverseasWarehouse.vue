<template>
  <el-row class="contaniner">
    <el-row class="header">
      <ul style="margin: 5px 0px;">
        <li class="wareName">
          <span>仓库名称：</span>

          <el-select v-model="form.returnWheareHouseName" placeholder="" size="mini" filterable>
            <el-option label="全部" :value="'0'" />
            <el-option v-for="(item, index) in wherehouseNameList" :key="index" :label="item.warehouse_name" :value="item.id" />
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
    </el-row>
    <el-row id="article" style="margin-top: 10px;
    padding: 4px;">
      <el-table
        ref="plTable"
        v-loading="Loading3"
        header-align="center"
        height="calc(100vh - 160px)"
        style="margin-top: 20px;"
        :data="tableData"
        :header-cell-style="{
          backgroundColor: '#f5f7fa',
        }"
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column align="center" type="selection" width="50" fixed /> -->
        <el-table-column align="center" label="序列号" width="100px" type="index" fixed />
        <el-table-column align="center" prop="warehouse_name" label="仓库名称" min-width="150px" fixed />
        <el-table-column align="center" prop="sys_sku_id" label="系统商品编号" min-width="130px" />
        <el-table-column prop="sku_id" label="商品编号（SkuId）" min-width="140px" align="center" />
        <el-table-column prop="goods_name" label="商品名称" min-width="150px" align="center" show-overflow-tooltip/>
        <el-table-column prop="sku_name" label="商品规格" min-width="150px" align="center" show-overflow-tooltip/>
        <el-table-column prop="stock_num" label="可用库存" min-width="100px" align="center" />
        <el-table-column prop="shared_num" label="共享库存" min-width="110px" align="center" />
        <el-table-column prop="sku_price" label="商品单价（RMB）" min-width="140px" align="center" />
        <el-table-column prop="sku_url" label="商品链接" min-width="150px" align="center">
          <template slot-scope="{row}"><el-button type="primary" size="mini" @click="open(row.sku_url)">查看商品链接</el-button> </template>
        </el-table-column>
        <el-table-column prop="real_image_url" label="商品图片" min-width="100px" align="center">
          <template slot-scope="{row}">
            <el-tooltip
              v-if="row.real_image_url"
              effect="light"
              placement="right-end"
              :visible-arrow="false"
              :enterable="false"
              style="width: 50px; height: 50px"
            >
              <div slot="content">
                <el-image
                  style="width: 400px; height: 400px"
                  :src="row.real_image_url"
                >
                  <div slot="error" class="image-slot" />
                </el-image>
              </div>
              <el-image
                style="width: 40px; height: 40px"
                :src="row.real_image_url"
              >
                <div slot="error" class="image-slot" />
              </el-image>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="position" label="货架仓位" min-width="120" align="center" />
        <el-table-column prop="updated_at" label="库存更新时间" min-width="150" align="center" />
        <el-table-column label="操作" min-width="200" align="center" fixed="right">
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini" @click="change(row)">改价</el-button>
            <el-button type="primary" size="mini" @click="share(row)">共享库存</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        class="edit-group-dialog"
        :visible.sync="changes"
        width="330px"
        title="修改库存价格"
         :close-on-click-modal="false"
         :close-on-press-escape="false"
      >
        <el-form  label-position="right" label-width="80px">
        
              <el-form-item label="商品名称：" >
                {{rowx.goods_name}}
              <!-- <el-input v-model="rowx.goods_name" size="mini" disabled/> -->
              </el-form-item>
         
              <el-form-item label="商品规格：" >
                {{rowx.sku_name}}
              <!-- <el-input v-model="rowx.sku_name" size="mini" disabled/> -->
              </el-form-item>
          
              <el-form-item label="skuid：">
                {{rowx.sku_id}}
              <!-- <el-input v-model="rowx.sku_id" size="mini" disabled/> -->
              </el-form-item>
           
              <el-form-item label="原始价格：" >
              <!-- <el-input v-model="rowx.sku_price" size="mini" style="width:100px"  disabled/> -->
              <span style="font-weight: 600;font-family: sans-serif; margin-right: 2px;">{{rowx.sku_price}}</span>
              <span style="color:#969393;">RMB</span>
              </el-form-item>
          
              <el-form-item label="新价格：" style="margin-bottom: 10px;">
              <el-input v-model="rowx.newprice" size="mini" style="width:100px" onkeyup="value=value.replace(/[^\d]/g,0)"/>
              <span style="color:#969393;">RMB</span>
              </el-form-item>
           
            <div style="color: red;line-height: 18px;margin-left: 20px;
           width: 235px;">温馨提示：价格修改后，会将以当前商品出货但未发货的订单的拍单金额同步成新价格</div>
          <el-form-item style="margin-top: 10px;">
            <el-button type="primary" size="mini" style="margin-left:10px;width:100px" @click="changePrice">确 定</el-button>
          </el-form-item>
            
            
         
        </el-form>
      </el-dialog>
      <el-dialog
        class="edit-group-dialog"
        :visible.sync="changes1"
        width="330px"
        title="修改共享库存"
      >
        <el-form label-position="right" label-width="80px">
         
              <el-form-item label="商品名称：" >
                {{rowy.goods_name}}
              <!-- <el-input v-model="rowy.goods_name" size="mini"/> -->
              </el-form-item>
          
              <el-form-item label="商品规格：" >
                {{rowy.sku_name}}
              <!-- <el-input v-model="rowy.sku_name" size="mini"/> -->
              </el-form-item>
  
              <el-form-item label="skuid：">
                {{rowy.sku_id}}
              <!-- <el-input v-model="rowy.sku_id" size="mini"/> -->
              </el-form-item>
         
              <el-form-item label="可用库存：" >
                {{rowy.stock_num}}
              <!-- <el-input v-model="rowy.stock_num" size="mini"/> -->
              </el-form-item>
      
              <el-form-item label="共享库存：" >
              <el-input v-model="primarynum" size="mini" style="width:150px" onkeyup="value=value.replace(/[^\d]/g,0)" clearable/>
                
              <!-- <el-input v-model="rowy.shared_num" size="mini" style="width:150px" onkeyup="value=value.replace(/[^\d]/g,0)" clearable/> -->
              </el-form-item>
         
          <el-form-item>
            <el-button type="primary" size="mini" style="margin-left:10px;width:100px"  @click="shareStock">确定</el-button>
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
          :page-sizes="[100, 200]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-row>
  </el-row>
</template>
<script>
import { exportExcelDataCommon } from '../../../util/util'
export default {
  data() {
    return {
     is_zero_filter:0,
      // ALLDdata:[],
      // Partdata:[],
      currentPage: 1,
      newform: [],
      data1: [],
      tableData: [],
      data2: [],
      total: 0,
      pageSize: 100,
      page: 1,
      Loading1: false,
      Loading2: false,
      Loading3: false,
      filter: false,
      changes: false,
      changes1: false,
      primarynum: 0,
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
        // returnWheareHouseName: 17, // 仓库名称
        systemskuid: '', // 系统商品编号
        sku_name: ''
      },
      // returnWheareHouseNameList: [
      //   { value: 17, label: '泰国存储仓' },
      //   { value: 27, label: '星卓越菲律宾存储仓' },
      //   { value: 28, label: '星卓越马来存储仓' },
      //   { value: 75, label: '超世代（越南仓海外仓）' },
      //   { value: 110, label: '锦汐越南海外仓' }
      // ]
      wherehouseNameList: []
    }
  },
  async mounted() {
    await this.getOverseasList()
    await this.getoverseaswarehouse()
    // this.test()
  },
  methods: {
    // 获取仓库 --- 壳
    async getOverseasList() {
      const myMap = new Map()
      try {
        const res = await this.$appConfig.getGlobalCacheInfo('allWh', '')
        const jsonData = this.isJsonString(res)
        if (jsonData?.length) {
          jsonData.forEach(item => {
            this.wherehouseNameList = this.wherehouseNameList.concat(item.child)
          })
          this.wherehouseNameList = this.wherehouseNameList.filter((item) => !myMap.has(item.id) && myMap.set(item.id, 1))
        } else {
          this.$message.error(`仓库列表为空`)
        }
      } catch (error) {
        this.$message.error(`获取仓库列表异常： ${error}`)
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
    // 查看商品链接
    open(val) {
      if (!val) {
        this.$message.warning('暂无商品链接')
      }
      window.BaseUtilBridgeService.openUrl(val)
    },
    // 改价点击确定
    async changePrice() {
      this.changes = false
      const parmas = {
        sku_id: this.rowx.sku_id,
        app_uid: '',
        price: Number(this.rowx.newprice),
       
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
    // async test() {
    //   const parmas = {
    //     app_uid: '',
    //     wid: this.form.returnWheareHouseName,
    //     uid: ''
    //   }
    //   try {
    //     let data = await this.$XzyNetMessageService.post('xzy.getSharedIndex', parmas)
    //     data = JSON.parse(data)
    //     data.data = JSON.parse(data.data)
    //     console.log(data)
    //     if (data.data.code === 200) {
    //       this.$message.success(`测试数据查询成功`)
    //     } else {
    //       this.$message.error(`测试数据查询失败${data.data.message}`)
    //     }
    //   } catch (error) {
    //     console.log(error)
    //   }
    // },
    // 共享库存点击确定
    async shareStock() {
       if (Number(this.primarynum)>Number(this.rowy.stock_num) || Number(this.primarynum)<0) {
        this.$message.warning('请输入有效库存数')
        return
      }
      // if (Number(this.rowy.shared_num) > Number(this.primarynum)) { //减少
      //   this.sharedtype = 1
      // } else { //增多
      //   this.sharedtype = 2
      // }
      const parmas = {
        wid: this.rowy.wid,
        shared_num: this.primarynum,
        sys_sku_id:this.rowy.sys_sku_id
        // app_uid: '',
     
      }
      console.log(parmas)
      try {
        let data = await this.$XzyNetMessageService.post('xzy.addSharedInventory', parmas)
        data = JSON.parse(data)
        const res = JSON.parse(data.data)
        if (res.code === 200) {
          this.$message.success(`数据共享成功`)
        } else {
          this.$message.error(`${res.message}`)
        }
      } catch (error) {
        console.log(`${error}`)
      }
      this.getoverseaswarehouse()
      this.changes1 = false
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
      this.primarynum = Number(val.shared_num)
      this.rowy.id = val.id
      this.rowy.wid = val.wid
      this.rowy.sys_sku_id=val.sys_sku_id
    },
    // 过滤功能
    async flt() {
      if (this.filter === true) {
        this.is_zero_filter=1
        this.getoverseaswarehouse()
        // this.tableData = this.Partdata
      } else {
        this.is_zero_filter=0
        this.getoverseaswarehouse()
        // this.tableData = this.ALLDdata
      }
    },
    // 搜索功能
    async getoverseaswarehouse() {
      this.Loading1 = true
      this.Loading3 = true
      const parmas = {
        page_num:this.pageSize,
        page:this.page,
        wid: this.form.returnWheareHouseName,
        sys_sku_id: this.form.systemskuid,
        sku_id: this.form.skuid,
        sku_name: this.form.sku_name,
        is_zero_filter:this.is_zero_filter,
        type:'query',
        app_uid: '',
      }
      console.log('parmas', parmas)
      try {
        let data = await this.$XzyNetMessageService.post('xzy.stock.index', parmas)
        data = JSON.parse(data)
        const res=JSON.parse(data.data)
        if (res.code!==200) {
          this.$message.error(res.message)
        }else{
          const getdata=res.data.data ? res.data.data :[]
          this.total = res.data.total
          for (let i = 0; i < getdata.length; i++) {
            //价格处理
            getdata[i].sku_price=getdata[i].sku_price/100
            //获取仓库名称
            const wareinfo = await this.$appConfig.getGlobalCacheInfo('overseasWh', Number(getdata[i].wid))
            if (JSON.parse(wareinfo).warehouse_name) {
              getdata[i].warehouse_name=  JSON.parse(wareinfo).warehouse_name          
            }else{
              this.$message.error('仓库名称获取失败')
              return
            }
          }
          this.tableData=getdata
        }
        // data.data = JSON.parse(data.data)
        // const data2 = []
        // this.data1 = data.data.data.data
        // console.log(this.data1[0].stock_num)
        // if (data.data.code === 200) {
        //   for (let i = 0; i < this.data1.length - 1; i++) {
        //     const wareinfo = await this.$appConfig.getGlobalCacheInfo('transferWarehouse', this.data1[i].wid)
        //     this.data1[i].warehouse_name=wareinfo.warehouse_name
        //     if (this.data1[i].stock_num !== 0) {
        //       data2.push(this.data1[i])
        //     }
        //   }
        //   this.data2 = data2
        //   this.total = data.data.data.total
        //   if (this.filter === true) {
        //     this.tableData = data2
        //   } else {
        //     this.tableData = this.data1
        //   }
        // } else {
        //   this.$message.error('数据获取失败:' +data.data.message)
        // }
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
        <td style="width: 200px; text-align:left;">商品单价（RMB）</td>
        <td style="width: 200px; text-align:left;">商品链接</td>
        <td style="width: 200px; text-align:left;">货架仓位</td>
        <td style="width: 200px; text-align:left;">库存更新时间</td>
      </tr>`
        this.tableData.map((item) => {
          msg += `
        <tr>
          <td style="text-align:left;">${item.id || ''}</td>
          <td style="text-align:left;">${item.warehouse_name || ''}</td>
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
