<template>
  <div v-loading="loading" class="detail">
    <div class="conditon">
      <!-- row1 -->
      <div class="row">
        <GoodsChoose @getmall="getmall" />
        <el-button style="margin-left:8px" size="mini" type="primary" :loading="searchLoading" @click="search">搜 索</el-button>
        <el-button size="mini" type="primary">刷新</el-button>
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
      </div>
    </div>

    <div class="tableDetail">
      <el-table
        height="calc(100vh - 70px)"
        :data="tableList_master"
        :header-cell-style="{ background: '#f7fafa' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" fixed />
        <el-table-column prop="name" label="分类名称" align="center" min-width="100px" fixed />
        <el-table-column prop="id" label="分类名称ID" align="center" min-width="100px" />
        <el-table-column prop="type" label="属性" align="center" min-width="100px">
          <template slot-scope="{ row }"><div>{{ row.type==="customized"?'自定义':row.type==='on_sale'?'Shopee|促销中':'Shopee|新上架' }}</div></template>
        </el-table-column>
        <el-table-column prop="product_count" label="商品数量" align="center" min-width="100px" />
        <el-table-column prop="status" label="知名度" align="center" min-width="100px">
          <!-- 根据商品数量进行操作，数量为0不能开启 -->
          <template slot-scope="scope"><div><el-switch v-model="scope.row.isShow" :disabled="scope.row.product_count===0" @change="changeShow(scope.row,scope.$index)" /></div></template>
        </el-table-column>
        <el-table-column prop="" label="操作" align="center" min-width="100px">
          <template slot-scope="{row}">
            <div style="display: flex;">
              <!-- 商品数量>0时 -->
              <el-button v-if=" row.product_count>0" size="mini" type="primary" @click="checkDetail">查看详情</el-button>
              <!-- 商品数量=0时 -->
              <el-button v-if=" row.product_count===0" size="mini" type="primary" @click="addGoods">添加商品</el-button>
              <!-- 属性为自定义时 -->
              <el-button v-if="row.type=='customized'" size="mini" type="primary" @click.native="delCategory('1',row)">删除</el-button>
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
      class="dialogVisible_detail"
      @closed="clearDialog"
    >
      <div class="detail_conditon" style="display:flex;align-items: center;">
        <div style="display:flex;align-items: baseline;margin-right: 10px;">
          <label style="width: 80px;">分类名称：</label> <el-input v-model="uptypeName" size="mini" />
        </div>
        <el-button size="mini" type="primary">重新命名</el-button>
        <el-button size="mini" type="primary" @click="dialogVisible_addGoods=true">添加商品</el-button>
        <el-button size="mini" type="primary">批量删除</el-button>
        <!-- 选中行 isshow=true -->
        <!-- <span style="margin: 4px;">次分类目前已在shoppe页面展示</span> -->
        <!-- 选中行 isshow=false -->
        <span style="margin: 4px;">点选显示，让买家看到此分类</span>
        <el-switch v-model="isShow_master" active-color="#13ce66" inactive-color="#ff4949" />
      </div>
      <div class="detail_table">
        <el-table
          :data="tableList_detail"
          height="calc(100vh - 202px)"
          :header-cell-style="{ background: '#f7fafa' }"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" fixed />
          <el-table-column prop="" label="商品ID" align="center" min-width="100px" fixed />
          <el-table-column prop="" label="商品图片" align="center" min-width="100px" />
          <el-table-column prop="" label="标题" align="center" min-width="100px" />
          <el-table-column prop="" label="价格" align="center" min-width="100px" />
          <el-table-column prop="" label="数量" align="center" min-width="100px" />
          <el-table-column prop="" label="操作" align="center" min-width="100px">
            <template>
              <div>
                <el-button size="mini" type="primary">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <!-- 添加商品 -->
    <el-dialog
      title="添加商品"
      :visible.sync="dialogVisible_addGoods"
      width="1100px"
      top="5vh"
      class="dialogVisible_add"
      @closed="clearDialog"
    >
      <div class="detail_conditon" style="display:flex;flex-wrap: wrap;">
        <!-- row1 -->
        <div class="row">
          <category-choose :level="3" :is-select="true" :country-val="mallinfo.country" @setCategory="setCategory" />
        </div>
        <!-- row2 -->
        <div class="row">
          <div>
            <el-select v-model="searchType" style="width:100px" size="mini">
              <el-option label="关键字" value="1" />
              <el-option label="商品编号" value="2" />
            </el-select>
            <el-input v-model="searchContent" size="mini" style="width:115px" clearable />
          </div>

          <div style="margin-left: 33px">
            <label>排序：</label>
            <el-select v-model="orderType" style="width:180px;" size="mini">
              <el-option label="默认排序" value="1" />
              <el-option label="销量从低往高" value="2" />
              <el-option label="销量从高往低" value="3" />
              <el-option label="价格从低往高" value="4" />
              <el-option label="价格从高往低" value="5" />
            </el-select>
          </div>

          <div style="margin-left: 8px;">
            <label>价格区间：</label>
            <el-input v-model="price_min" onkeyup="value=value.replace(/[^\d]/g,0)" size="mini" style="width:84px" clearable />
            -
            <el-input v-model="price_max" onkeyup="value=value.replace(/[^\d]/g,0)" size="mini" style="width:84px" clearable />
          </div>

          <el-checkbox v-model="showfit" style="margin-left: 8px;">仅显示适用商品</el-checkbox>
          <el-checkbox v-model="showlog" style="margin-left:-18px;">隐藏日志</el-checkbox>
        </div>
        <!-- row3 -->
        <div class="row" style="align-items: center;">
          <div>
            <label>每个店铺商品数量：</label>
            <el-input v-model="mall_goodsNum" onkeyup="value=value.replace(/[^\d]/g,0)" size="mini" style="width:85px" clearable />
          </div>

          <div style="margin-left: 8px;">
            <label>过滤商品编号：</label>
            <el-input v-model="mall_goodsID" onkeyup="value=value.replace(/[^\d]/g,0)" size="mini" style="width:180px" clearable />
          </div>

          <div style="margin-left: 8px;">
            <label>销量区间：</label>
            <el-input v-model="sale_min" onkeyup="value=value.replace(/[^\d]/g,0)" size="mini" style="width:84px" clearable />
            -
            <el-input v-model="sale_max" onkeyup="value=value.replace(/[^\d]/g,0)" size="mini" style="width:84px" clearable />
          </div>

          <el-button size="mini" type="primary" style="margin-left: 8px;">查询商品</el-button>
          <el-button size="mini" type="primary">取消操作</el-button>
          <el-button size="mini" type="primary">添加已选商品</el-button>

        </div>

      </div>
      <div class="detail_table">
        <el-table
          :data="tableList_add"
          height="calc(100vh - 312px)"
          :header-cell-style="{ background: '#f7fafa' }"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" fixed />
          <el-table-column prop="" label="店铺名称" align="center" min-width="100px" fixed />
          <el-table-column prop="" label="类目" align="center" min-width="100px" />
          <el-table-column prop="" label="主图" align="center" min-width="100px" />
          <el-table-column prop="" label="商品ID" align="center" min-width="100px" />
          <el-table-column prop="" label="商品标题" align="center" min-width="100px" />
          <el-table-column prop="" label="库存" align="center" min-width="100px" />
          <el-table-column prop="" label="销量" align="center" min-width="100px" />
          <el-table-column prop="" label="价格" align="center" min-width="100px" />
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import GoodsChoose from '../../../components/goods-choose.vue'
import categoryChoose from '../../../components/category-choose.vue'
import GoodsManagerAPI from '../../../module-api/goods-manager-api/goods-data'

export default {
  components: {
    GoodsChoose,
    categoryChoose
  },
  data() {
    return {
      selectList: [],
      loading: false,
      searchLoading: false,
      mallinfo: '', // 店铺集合
      GoodsManagerAPIInstance: new GoodsManagerAPI(this),
      mall_goodsID: '', // 过滤商品编号
      mall_goodsNum: '', // 每个店铺商品数量
      showlog: false, // 显示日志
      showfit: false, // 适用商品
      sale_min: '', // 销量区间
      sale_max: '', // 销量区间
      price_min: '', // 价格区间
      price_max: '', // 价格区间
      orderType: '1', // 排序
      searchType: '1', // 添加商品--按商品类别搜索商品
      searchContent: '', // 添加商品--搜索商品
      tableList_add: [], // 添加商品列表
      dialogVisible_addGoods: true, // 添加商品
      dialogVisible_detail: false, // 查看详情弹窗
      tableList_master: [],
      isShow_master: true, // 是否展示,
      addtypeName: '', // 添加分类名称
      uptypeName: '', // 修改分类名称
      tableList_detail: [] // 编辑分类列表
    }
  },
  created() {
  },
  methods: {
    // 搜索
    search() {
      this.gettableList()
      this.getaddGoodsList()// 获取添加商品列表
    },
    // 查看详情
    checkDetail() {
      this.dialogVisible_detail = true
      // 1 商品列表获取
      // 3 添加商品 弹窗显示 添加后的商品与 商品列表同步更新【在1的基础上叠加】
      // 2 分类名称获取and 重新命名
      // 4 是否展示知名度 【调用现有功能】 this.$set
      // 5.展示商品详情 【不勾选】
      // 6.删除商品 批量删除商品
      // 7. 更新master商品列表 gettablelist
    },
    // 添加商品
    addGoods() {
      this.dialogVisible_addGoods = true
      // 1、 添加商品列表展示
      // 2、检索类目获取，与master站点联动
      // 3、 查询商品：检索条件 关键字 排序 价格区间 每个店铺商品数量 过滤商品编号 销量区间 ，取消操作
      // 4、 添加已选商品 最后要刷新列表
      // 5、 隐藏日志显示
      // 6、仅显示适用商品
    },
    async getaddGoodsList() {
      const param = {
        country: this.mallinfo.country,
        mallId: this.mallinfo.mallID,
        page_number: 1,
        page_size: 24,
        list_type: ''
      }
      const res = await this.GoodsManagerAPIInstance.getMpskuList(param)
      console.log('addtablelist', res)
    },
    // 添加商品列表获取

    // 批量开启/关闭知名度
    async startShow(type) {
      if (!this.selectList.length) {
        this.$message.warning('请选择要操作的数据')
        return
      }
      this.loading = true
      const unlist = [] // 开启失败的店铺
      try {
        for (let i = 0; i < this.selectList.length; i++) {
          if (this.selectList[i].product_count > 0) {
            const param = {
              status: type === 'start' ? 'active' : 'inactive', // active开启 inactive关闭
              id: this.selectList[i].id,
              country: this.mallinfo.country,
              mallId: this.mallinfo.mallID
            }
            await this.GoodsManagerAPIInstance.updateShopCollection(param).then(res => {
              console.log('show', res)
            })
          } else {
            // this.$message.warning(this.selectList[i].name + '数量不足无法开启')
            unlist.push('【' + this.selectList[i].name + '】')
            continue
          }
        }
        if (unlist.length > 0) {
          this.$message.warning(unlist.toString(`、`) + '分组，数量不足无法开启')
        }
        this.loading = false
      } catch (error) {
        this.$message.error(error)
        this.loading = false
      }
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
        list.push(...this.selectList)
      }
      this.loading = true
      try {
        for (let i = 0; i < list.length; i++) {
          const param = {
            id: list[i].id,
            country: this.mallinfo.country,
            mallId: this.mallinfo.mallID
          }
          await this.GoodsManagerAPIInstance.delShopCollection(param).then(res => {
          })
        }
        this.loading = true
      } catch (error) {
        this.loading = false
        this.$message.error(error)
      }
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
      console.log(res)
      this.loading = false
      if (res.ecode === 0) {
        // this.$message.success('添加成功~')
      } else {
        this.$message.error(res.message)
      }
      this.gettableList()
      this.addtypeName = ''
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
      this.loading = true
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
        this.loading = false
        console.log('status', error)
      }
    },
    // 多选
    handleSelectionChange(val) { this.selectList = []; this.selectList = val },
    // 类别选择
    setCategory() {},
    // 店铺选择
    getmall(val) { this.mallinfo = val },
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
      this.searchLoading = true
      const res = await this.GoodsManagerAPIInstance.getcollectionlist(params)
      // console.log('mall-res', res)
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
}
</style>
