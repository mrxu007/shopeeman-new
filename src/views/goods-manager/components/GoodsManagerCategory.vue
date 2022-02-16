<template>
  <div v-loading="loading" class="detail">
    <div class="conditon" style="background-color: white; padding:8px 4px">
      <!-- row1 -->
      <div class="row">
        <storeChoose :spanWidth="'60px'" :source="'true'" @changeMallList="changeMallList" :is-a-shop="true"/>
        <el-button style="margin-left:8px" size="mini" type="primary" :loading="searchLoading" @click="search">搜 索</el-button>
        <!-- <el-button size="mini" type="primary" @click="search">刷新</el-button> -->
      </div>
      <!-- row2 -->
      <div class="row">
        <div style="display:flex;align-items: baseline;margin-left: 19px;margin-right: 10px;">
          <label style="width: 80px;">分类名称：</label> <el-input v-model="addtypeName" size="mini" />
        </div>
        <el-button size="mini" type="primary" @click="addCatorgry">添加</el-button>
        <el-button size="mini" type="primary" @click="delCategory('2',null)">批量删除</el-button>
        <el-button size="mini" type="primary" @click="startShow('start')">批量开启知名度</el-button>
        <el-button size="mini" type="primary" @click="startShow('close')">批量关闭知名度</el-button>
        <el-button size="mini" type="primary" @click="closelogData">清除日志</el-button>
        <el-checkbox v-model="showlog" style="margin: 4px">隐藏日志</el-checkbox>

      </div>
    </div>
    <Logs ref="autoReplyLogs" v-model="showlog" clear />
    <div class="tableDetail">
      <el-table
        height="calc(100vh - 70px)"
        :data="tableList_master"
        :header-cell-style="{ background: '#f7fafa' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" fixed />
        <el-table-column type="index" label="序号" width="55" fixed />
        <el-table-column prop="name" label="分类名称" align="center" min-width="100px" fixed />
        <el-table-column prop="id" label="分类名称ID" align="center" min-width="100px" />
        <el-table-column prop="type" label="属性" align="center" min-width="100px">
          <template slot-scope="{ row }"><div>{{ row.type==="customized"?'自定义':row.type==='on_sale'?'Shopee|促销中':'Shopee|新上架' }}</div></template>
        </el-table-column>
        <el-table-column prop="product_count" label="商品数量" align="center" min-width="100px" />
        <el-table-column prop="status" label="知名度" align="center" min-width="100px">
          <!-- 根据商品数量进行操作，数量为0不能开启 -->
          <template slot-scope="scope"><div><el-switch v-model="scope.row.isShow" active-color="#13ce66" :disabled="scope.row.product_count===0" @change="changeShow(scope.row,scope.$index)" /></div></template>
        </el-table-column>
        <el-table-column prop="" label="操作" align="center" min-width="100px">
          <template slot-scope="scope">
            <div style="display: flex;">
              <!-- 商品数量>0时 -->
              <el-button v-if=" scope.row.product_count>0" size="mini" type="primary" @click="checkDetail(scope.row,scope.$index),selDate=scope.row">查看详情</el-button>
              <!-- 商品数量=0时 -->
              <el-button v-if=" scope.row.product_count===0" size="mini" type="primary" @click="goodsItemSelectorVisible = true,selDate=scope.row">添加商品</el-button>
              <!-- 属性为自定义时 -->
              <el-button v-if="scope.row.type=='customized'" size="mini" type="primary" @click.native="delCategory('1',scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 查看详情 -->
    <el-dialog
      title="编辑分类"
      :visible.sync="dialogVisible_detail"
      width="1000px"
      top="5vh"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      class="dialogVisible_detail"
      @closed="clearDialog"
    >
      <div class="detail_conditon" style="display:flex;align-items: center;">
        <div style="display:flex;align-items: baseline;margin-right: 10px;">
          <label style="width: 80px;">分类名称：</label> <el-input v-model="uptypeName" size="mini" />
        </div>
        <el-button size="mini" type="primary" @click="updataNameDetailGoods">重新命名</el-button>
        <el-button v-if="selDate.type==='customized'" size="mini" type="primary" @click="goodsItemSelectorVisible = true">添加商品</el-button>
        <el-button v-if="selDate.type==='customized'" size="mini" type="primary" @click="delDetailGoodsFun('2',null)">批量删除</el-button>
        <!-- 选中行 isshow=true -->
        <!-- <span style="margin: 4px;">次分类目前已在shoppe页面展示</span> -->
        <!-- 选中行 isshow=false -->
        <span style="margin: 4px;">此分类目前已在Shopee页面中显示</span>
        <el-switch v-model="detailGoodsShow" active-color="#13ce66" @change="detailchangeShow" />
      </div>
      <div class="detail_table">
        <el-table
          ref="goodstable"
          v-loading="detailLoading"
          :data="tableDataCut"
          height="calc(100vh - 236px)"
          :header-cell-style="{ background: '#f7fafa' }"
          @selection-change="DetailSelectionChange"
        >
          <el-table-column type="selection" width="55" fixed />
          <el-table-column type="index" width="55" label="序号" fixed />
          <el-table-column prop="itemid" label="商品ID" align="center" min-width="100px" fixed />
          <el-table-column prop="images" label="商品图片" align="center" min-width="100px">
            <template slot-scope="scope">
              <el-tooltip effect="light" placement="right-end" :visible-arrow="false" :enterable="false" style="width: 56px; height: 56px; display: inline-block">
                <div slot="content">
                  <el-image :src="[ scope.row.images[0]] | imageRender" style="width: 400px; height: 400px" />
                </div>
                <el-image :src="[scope.row.images[0],true] | imageRender" style="width: 56px; height: 56px" />
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="标题" show-overflow-tooltip="" align="center" min-width="100px" />
          <el-table-column prop="minPrice" label="价格" align="center" min-width="100px">
            <template v-slot="{row}"><span>{{ mallinfo.country | siteCoin }}{{ row.minPrice }}</span></template>
          </el-table-column>
          <el-table-column prop="stock" label="数量" align="center" min-width="100px" />
          <el-table-column prop="" label="操作" align="center" min-width="100px">
            <template v-slot="{row}">
              <div>
                <el-button v-if="selDate.type==='customized'" size="mini" type="primary" @click="delDetailGoodsFun('1',row.itemid)">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination" style="margin-left: 376px; margin-top: 10px;display: flex;justify-content: flex-end;">
          <el-pagination
            :current-page.sync="currentPage"
            :page-sizes="[20, 50, 100, 200]"
            :page-size="pageSize"
            :pager-count="5"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </el-dialog>
    <!-- 添加商品 -->
    <div class="on_new_dialog">
      <el-dialog
        :visible.sync="goodsItemSelectorVisible"
        top="7vh"
        title="商品选择"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        width="1280px"
      >
        <goodsItemSelector v-if="goodsItemSelectorVisible" :mall="selectMalllist" @changeGoodsItem="changeGoodsItem" />
      </el-dialog>
    </div>
  </div>
</template>
<script>
import storeChoose from '../../../components/store-choose'
import GoodsManagerAPI from '../../../module-api/goods-manager-api/goods-data'
import goodsItemSelector from '../../../components/goods-item-selector'
import { GoodsMallgetValue, getMalls } from '../../../util/util'
export default {
  components: {
    storeChoose,
    goodsItemSelector
  },
  data() {
    return {
      selectMalllist: [],
      selDate: '',
      goodsItemSelectorVisible: false,
      detailGoodsShow: false, // 弹窗知名度
      currentIndex: '', // 当前下标
      detailLoading: false,
      collection_ids: [], // 分类id  查看详情赋值 全局使用
      selectList: [],
      loading: false,
      loading_table: false,
      searchLoading: false,
      mallinfo: '', // 店铺信息
      GoodsManagerAPIInstance: new GoodsManagerAPI(this),
      mall_goodsID: '', // 过滤商品编号
      showlog: true, // 显示日志
      showfit: false, // 适用商品
      orderType: '1', // 排序
      tableList_add: [], // 添加商品列表
      dialogVisible_addGoods: false, // 添加商品
      dialogVisible_detail: false, // 查看详情弹窗
      tableList_master: [],
      addtypeName: '', // 添加分类名称
      uptypeName: '', // 修改分类名称
      tableList_detail: [], // 编辑分类列表
      add_query: {
        searchType: '1', // 添加商品--按商品类别搜索商品
        // mall_goodsNum: 10, // 每个店铺商品数量
        stock_max: 9999,
        stock_min: 0,
        searchContent: '', // 添加商品--搜索商品
        sale_min: 0, // 销量区间
        sale_max: 99999, // 销量区间
        price_min: 0, // 价格区间
        price_max: 99999, // 价格区间
        selcategory_id: '', // dialogVisible_addGoods--搜索
        pageSize: 20, // dialogVisible_addGoods--分页
        page: 1, // dialogVisible_addGoods--分页
        cursor: ''
      },
      currentPage: 1,
      pageSize: 20,
      total: 0, // dialogVisible_addGoods--分页
      selectdetailgoods: [],
      tableDataCut: []
    }
  },
  created() {
  },
  methods: {
    // 获取选择的商品
    async changeGoodsItem(val) {
      if (val.goodsList.length) {
        const itemidList = []
        val.goodsList.forEach(el => {
          itemidList.push(Number(el.itemid))
        })
        const params = {
          country: this.mallinfo.country,
          mallId: this.mallinfo.mallID,
          collection_id: Number(this.selDate.id), // 分类id
          product_id_list: itemidList // 商品id
        }
        try {
          const res = await this.GoodsManagerAPIInstance.addCollectionGoods(params)
          if (res.ecode === 0) {
            this.$set(this.selDate, 'product_count', Number(this.selDate.product_count) + itemidList.length)
            this.$message.success('添加成功')
          } else {
            this.$message.warning(`添加失败${res.message}`)
          }
        } catch (error) {
          this.$message.warning(`商品添加--catch${error}`)
        }
      } else {
        this.$message.warning('请选择要添加的商品')
        return
      }
      this.goodsItemSelectorVisible = false
      if (this.dialogVisible_detail) { // 重新详情加载列表
        this.getDetailGoodsList()
        this.showlog = false
      }
    },
    // 清空日志
    closelogData() {
      this.$refs.autoReplyLogs.consoleMsg = ''
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val
      if (this.selDate.type === 'customized') { // 自定义
        this.dataCut()
      } else { // shopp官方
        this.getShoppeGoodsIDList()
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val
      if (this.selDate.type === 'customized') { // 自定义
        this.dataCut()
      } else { // shopp官方
        this.getShoppeGoodsIDList()
      }
    },
    // 获取店铺名称
    async getinfo() {
      getMalls().then(res => {
        this.mallinfo.mallName = GoodsMallgetValue(res, 'label', 'value', this.mallinfo.mallID)
      })
    },
    // 搜索
    async search() {
      await this.gettableList()
    },
    // 详情多选
    DetailSelectionChange(val) {
      this.selectdetailgoods = val
    },
    // 查看详情
    checkDetail(row, index) {
      this.dialogVisible_detail = true
      this.uptypeName = row.name
      this.collection_ids = row.id
      this.currentIndex = row
      this.detailGoodsShow = row.isShow
      if (row.type === 'customized') { // 自定义
        this.getDetailGoodsList()
      } else {
        this.getShoppeGoodsIDList()
      }
      // 1 商品列表获取
      // 3 添加商品 弹窗显示 添加后的商品与 商品列表同步更新【在1的基础上叠加】
      // 2 分类名称获取and 重新命名
      // 4 是否展示知名度 【调用现有功能】 this.$set
      // 5.展示商品详情 【不勾选】
      // 6.删除商品 批量删除商品
      // 7. 更新master商品列表 gettablelist
    },
    // 获取商品详情列表 1.获取id 2.获取详细信息[shoppe官方]
    async getShoppeGoodsIDList() {
      const params = {
        country: this.mallinfo.country,
        mallId: this.mallinfo.mallID,
        collection_ids: this.collection_ids,
        page_size: this.pageSize,
        page_number: this.currentPage }
      const res = await this.GoodsManagerAPIInstance.getshopGoodsid(params)
      if (res.ecode === 0) {
        this.total = res.data.page_info.total
        const productIds = []
        res.data.list.forEach(el => {
          productIds.push(el.toString())
        })
        if (productIds) {
          await this.getShoppeGoodsListDetail(productIds)
          this.detailLoading = false
        }
      } else {
        this.$message.warning(`${res.message}`)
      }
    },
    async getShoppeGoodsListDetail(productIds) {
      const params = {
        country: this.mallinfo.country,
        mallId: this.mallinfo.mallID,
        productIds: productIds }
      const res = await this.GoodsManagerAPIInstance.getshopGoodsDetail(params)
      if (res.ecode === 0) {
        this.tableDataCut = []
        const arr = res.data.products.items
        // 获取最小价格
        let minprice = null
        for (let i = 0; i < arr.length; i++) {
          for (let j = 0; j < arr[i].modelList.length; j++) {
            minprice = arr[i].modelList[0].inputOriginPrice || arr[i].modelList[0].originPrice
            const olprice = arr[i].modelList[j].inputOriginPrice || arr[i].modelList[j].originPrice
            if (minprice > olprice) {
              minprice = olprice
            }
          }
          arr[i].minPrice = minprice
        }
        this.tableDataCut = arr
      }
    },
    // 获取商品详情列表 1.获取id 2.获取详细信息[自有商品]
    async getDetailGoodsList() {
      const params = {
        collection_ids: this.collection_ids,
        country: this.mallinfo.country,
        mallId: this.mallinfo.mallID
      }
      try {
        this.detailLoading = true
        const res = await this.GoodsManagerAPIInstance.getGoodsDetail(params)
        if (res.ecode === 0) {
          const getproductIds = res.data.list[0].product_id_list || ''
          const productIds = []
          getproductIds.forEach(el => {
            productIds.push(el.toString())
          })
          if (productIds) {
            await this.getDetailGoodsListFun(productIds)
            this.detailLoading = false
          }
        }
      } catch (error) {
        this.$message.error(error)
      }
    },
    // 拿到id，获取商品信息
    async getDetailGoodsListFun(productIds) {
      const productparams = {
        country: this.mallinfo.country,
        mallId: this.mallinfo.mallID,
        productIds: productIds,
        collection_ids: this.collection_ids
      }
      try {
        const res = await this.GoodsManagerAPIInstance.getGoodsDetailList(productparams)
        if (res.ecode === 0) {
          this.tableList_detail = []
          const arr = res.data.products.items
          // 获取最小价格
          let minprice = null
          for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].modelList.length; j++) {
              minprice = arr[i].modelList[0].inputOriginPrice || arr[i].modelList[0].originPrice
              const olprice = arr[i].modelList[j].inputOriginPrice || arr[i].modelList[j].originPrice
              if (minprice > olprice) {
                minprice = olprice
              }
            }
            arr[i].minPrice = minprice
          }
          this.tableList_detail = arr
          this.total = this.tableList_detail.length
          this.dataCut()
        }
      } catch (error) {
        this.$message.error(`${error}`)
      }
    },
    // 分页设置
    dataCut() {
      this.tableDataCut = this.tableList_detail.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    },
    // 修改名称
    async updataNameDetailGoods() {
      if (!this.uptypeName) {
        this.$message.warning('分类名称不能为空！')
      }
      const params = {
        country: this.mallinfo.country,
        mallId: this.mallinfo.mallID,
        name: this.uptypeName,
        collection_ids: this.collection_ids
      }
      try {
        const res = await this.GoodsManagerAPIInstance.getGoodsDetailListUpdateName(params)
        if (res.ecode === 0) {
          this.$message.success('修改成功')
        } else {
          this.$message.error(res.message)
        }
      } catch (error) {
        this.$message.error(`${error}`)
      }
    },

    delDetailGoodsFun(type, data) {
      this.$confirm('确定要删除该商品吗？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delDetailGoods(type, data)
      }).catch(() => {
      })
    },
    // 批量删除商品详情
    async delDetailGoods(type, data) {
      // 1 单个删除 2 多个删除
      const list = []
      if (type === '1') {
        list.push(Number(data))
      }
      if (type === '2') {
        if (!this.selectdetailgoods.length) {
          this.$message.warning('请选择要删除的数据')
          return
        }
        this.selectdetailgoods.forEach(el => {
          list.push(Number(el.itemid))
        })
      }
      const params = {
        country: this.mallinfo.country,
        mallId: this.mallinfo.mallID,
        product_id_list: list,
        collection_ids: this.collection_ids
      }
      this.detailLoading = true
      // this.$message.success('请耐心等待几秒~')
      try {
        const res = await this.GoodsManagerAPIInstance.getGoodsDetailListdel(params)
        this.detailLoading = false
        if (res.ecode === 0) {
          const productIds = []
          res.data.product_id_list.forEach(el => {
            productIds.push(el.toString())
          })
          this.getDetailGoodsListFun(productIds)
        } else {
          this.$message.error(res.message)
        }
      } catch (error) {
        this.$message.error(`${error}`)
      }
    },
    // 添加商品
    addGoods() {
      // this.dialogVisible_addGoods = true
      // this.$nextTick(() => {
      //   this.$refs.goodsCategory.chageSite(this.mallinfo.country) // 联动dialogVisible_addGoods 品类选择组件
      // })
      // // 0、 获取列表
      // this.search_addGoods()
      // // 1、 添加商品列表展示
      // // 2、检索类目获取，与master站点联动
      // // 3、 查询商品：检索条件 关键字 排序 价格区间 每个店铺商品数量 过滤商品编号 销量区间 ，取消操作
      // // 4、 添加已选商品 最后要刷新列表
      // // 5、 隐藏日志显示
      // // 6、仅显示适用商品 true-- list_type:all false--list_type:live
    },
    // 查询商品
    async search_addGoods() {
      if (this.add_query.price_max <= 0 || this.add_query.price_max === '' &&
         this.add_query.price_max === '' &&
          this.add_query.sale_max <= 0 || this.add_query.sale_max === '' &&
        this.add_query.sale_min === '') {
        this.$message.warning('价格区间、销量区间必须是大于0的整数')
        return
      }
      if (this.add_query.stock_min === '' ||
      this.add_query.stock_max === 0 || this.add_query.stock_max === '') {
        this.$message.warning('请输入有效库存数量')
        return
      }
      const param = {
        country: this.mallinfo.country,
        mallId: this.mallinfo.mallID,
        search_type: Number(this.add_query.searchType) === 1 ? 'name' : 'id',
        keyword: this.add_query.searchContent,
        stock_max: this.add_query.stock_max,
        stock_min: this.add_query.stock_min,
        sold_max: this.add_query.sale_max,
        sold_min: this.add_query.sale_min,
        category_id: this.add_query.selcategory_id,
        list_type: this.showfit ? 'live' : 'all',
        page_number: this.add_query.page,
        page_size: this.add_query.pageSize,
        cursor: this.add_query.cursor
      }
      console.log('cursor1', this.add_query.cursor)
      this.loading_table = true
      const res = await this.GoodsManagerAPIInstance.searchList(param)
      this.loading_table = false
      console.log('addtablelist', res)
      this.tableList_add = []
      if (res.ecode === 0) {
        this.add_query.page = res.data.page_info.page_number
        this.add_query.page_size = res.data.page_info.page_size
        this.total = res.data.page_info.total
        this.add_query.cursor = res.data.page_info.cursor
        console.log('cursor2', this.add_query.cursor)
        const arr = res.data.list
        for (let i = 0; i < arr.length; i++) {
          try {
            // 获取类目名称'
            const index = arr[i].category_path.length
            const categoryID = arr[i].category_path[index - 1]
            const fes = await window.CommodityBridgeService.callCategoryFunction('GetCategoryInfo', this.mallinfo.country, categoryID.toString(), '0', '')
            const des = JSON.parse(fes)
            if (des.code === 200) {
              arr[i].categoryName = des.data.categories[0].category_name
              // 获取stock price
              const modelList = arr[i].model_list
              let stock = 0
              let minPrice = 0
              let sale = 0
              modelList.forEach((el, index) => {
                stock = stock + Number(el.stock_info.normal_stock) // 累计库存
                sale = sale + Number(el.sold) // 累计销量
                if (index === 0) { // 获取最小价格
                  minPrice = Number(el.price_info.normal_price)
                } else {
                  minPrice = minPrice > Number(el.price_info.normal_price) ? Number(el.price_info.normal_price) : minPrice
                }
              })
              arr[i].totalStock = stock
              arr[i].minprice = minPrice
              arr[i].totSale = sale
              arr[i].isSel = false // 默认没有被选
              this.tableList_add.push(arr[i])
            }
          } catch (error) {
            console.log('获取类目名称', error)
            continue
          }
        }
      } else {
        this.$message.error(res.message)
      }
    },

    // 批量开启/关闭知名度
    async startShow(type) {
      if (!this.selectList.length) {
        this.$message.warning('请选择要操作的数据')
        return
      }
      // this.loading = true
      // const unlist = [] // 开启失败的店铺
      // try {
      this.showlog = false
      for (let i = 0; i < this.selectList.length; i++) {
        if (this.selectList[i].product_count > 0) {
          const param = {
            status: type === 'start' ? 'active' : 'inactive', // active开启 inactive关闭
            id: this.selectList[i].id,
            country: this.mallinfo.country,
            mallId: this.mallinfo.mallID
          }
          try {
            const res = await this.GoodsManagerAPIInstance.updateShopCollection(param)
            if (res.ecode === 0) {
              this.$refs.autoReplyLogs.writeLog(`【${this.selectList[i].name}】操作成功`, true)
            } else {
              this.$refs.autoReplyLogs.writeLog(`【${this.selectList[i].name}】操作失败`, false)
            }
          } catch (error) {
            this.$refs.autoReplyLogs.writeLog(`【${this.selectList[i].name}】操作失败,${error}`, false)
          }
        } else {
          this.$refs.autoReplyLogs.writeLog(`数量不足无法开启`, false)
          // this.$message.warning(this.selectList[i].name + '数量不足无法开启')
          // unlist.push('【' + this.selectList[i].name + '】')
          // continue
        }
      }
      this.$refs.autoReplyLogs.writeLog(`操作结束`)
      // if (unlist.length > 0) {
      //   this.$message.warning(unlist.toString(`、`) + '分组，数量不足无法开启')
      // }
      // this.loading = false
      // } catch (error) {
      //   this.$message.error(error)
      //   this.loading = false
      // }
      this.gettableList()
    },
    // 删除
    async delCategory(type, data) {
      // 1 单行删除 2 多行删除
      const list = []
      if (type === '1') {
        list.push(data)
      }
      if (type === '2') {
        const index = this.selectList.findIndex(el => { el.type !== 'customized' })
        if (index >= 0) {
          this.$message.warning('只能删除自定义分类')
          return
        }
        list.push(...this.selectList)
      }
      // this.loading = true
      this.showlog = false
      for (let i = 0; i < list.length; i++) {
        const param = {
          id: list[i].id,
          country: this.mallinfo.country,
          mallId: this.mallinfo.mallID
        }
        try {
          this.$refs.autoReplyLogs.writeLog(`开始删除分组...`, true)
          const res = await this.GoodsManagerAPIInstance.delShopCollection(param)
          if (res.ecode === 0) {
            this.$refs.autoReplyLogs.writeLog(`【${list[i].name}】删除成功`, true)
          } else {
            this.$refs.autoReplyLogs.writeLog(`【${list[i].name}删除失败】,${res.message}`, false)
          }
        } catch (error) {
          this.$refs.autoReplyLogs.writeLog(`【${list[i].name}删除失败】,${error}`, false)
          continue
        }
      }
      this.$refs.autoReplyLogs.writeLog(`操作结束`)
      // this.loading = true

      this.gettableList()
    },
    // 添加分类
    async addCatorgry() {
      if (this.addtypeName === '') {
        this.$message.warning('分类名称不能为空！')
        return
      }
      if (this.mallinfo.mallID === '') {
        this.$message.warning('店铺不能为空！')
        return
      }
      const params = {
        country: this.mallinfo.country,
        mallId: this.mallinfo.mallID,
        name: this.addtypeName
      }
      this.loading = true
      const res = await this.GoodsManagerAPIInstance.createShopCollection(params)
      this.loading = false
      if (res.ecode === 0) {
        // this.$message.success('添加成功~')
      } else {
        this.$message.error(res.message)
      }
      this.gettableList()
      this.addtypeName = ''
    },
    // 改变知名度--弹窗
    async  detailchangeShow() {
      const param = {
        status: this.detailGoodsShow ? 'active' : 'inactive', // active开启 inactive关闭
        id: this.collection_ids,
        country: this.mallinfo.country,
        mallId: this.mallinfo.mallID
      }
      // this.tableDataCut[this.currentIndex].isShow = this.detailGoodsShow
      this.$set(this.currentIndex, 'isShow', this.detailGoodsShow)
      try {
        await this.GoodsManagerAPIInstance.updateShopCollection(param).then(res => {
          console.log('show', res)
          if (res.ecode === 0) {
            this.$message.success('操作成功~')
          } else {
            this.$message.error(res.message)
          }
        })
      } catch (error) {
        console.log('status', error)
      }
      this.dialogVisible_detail = true
    },
    // 改变知名度
    async  changeShow(row, index) {
      // if (row.product_count < 0) {
      //   this.$message.warning('商品数量不足，无法开启')
      //   return
      // }
      const param = {
        status: row.isShow ? 'active' : 'inactive', // active开启 inactive关闭
        id: row.id,
        country: this.mallinfo.country,
        mallId: this.mallinfo.mallID
      }
      // this.loading = true
      try {
        await this.GoodsManagerAPIInstance.updateShopCollection(param).then(res => {
          this.loading = false
          console.log('show', res)
          if (res.ecode === 0) {
            this.$message.success('操作成功~')
          } else {
            this.$message.error(res.message)
          }
        })
      } catch (error) {
        // this.loading = false
        console.log('status', error)
      }
    },
    // 多选
    handleSelectionChange(val) { this.selectList = []; this.selectList = val },
    // 类别选择
    setCategory(val) {
      this.add_query.selcategory_id = val.categoryList.length && val.categoryList[val.categoryList.length - 1].toString() || ''
    },
    // 店铺选择
    // getmall(val) {
      //{mallID: 309056854, country: "TH"}s
      // console.log('getmall',val)
      // this.mallinfo = val
    // },
    // changeMall(val) {
    //   console.log(val) // [mall]
    //   this.selectMalllist = val
    // },
    changeMallList(val){
      console.log('changeMallList',val)
      this.mallinfo = {
        mallID : val.searchAll,
        country : val.country,
      }
      this.selectMalllist = val.mallList
    },
    // 关闭弹窗
    clearDialog() {},
    // 初始化数据
    async gettableList() {
      if (this.mallinfo.mallID === '') {
        this.$message.warning('请选择要查询的店铺')
        return
      }
      this.tableList_master = []
      const params = {
        country: this.mallinfo.country,
        mallId: this.mallinfo.mallID
      }
      this.getinfo()// 获取店铺名称
      this.searchLoading = true
      const res = await this.GoodsManagerAPIInstance.getcollectionlist(params)
      this.searchLoading = false
      if (res.ecode === 0) {
        res.data.list.forEach(el => {
          el.isShow = el.status === 'active'
          this.tableList_master.push(el)
        })
      } else {
        this.$message.warning('当前店铺暂无信息')
      }
    }
  }

}

</script>
<style lang="less" scoped>
.detail{
  min-width: 1280px;
  padding-top: 10px;
  .row{
    display: flex;
    margin-bottom: 10px;
  }
  .dialogVisible_detail{
    /deep/.el-dialog__body{
      padding: 10px 20px;
      .detail_conditon{
        margin-bottom: 10px;

        .el-dialog{
          height: 500px;
        }
      }
    }
  }
  .dialogVisible_add{
    /deep/.el-dialog__body{
      padding-bottom: 10px;
    }
  }
}
</style>
