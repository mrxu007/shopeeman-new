<!--
 * @Author: your name
 * @Date: 2021-10-25 16:40:41
 * @LastEditTime: 2021-11-02 21:21:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\views\smart-house\components\PrivateWarehouse.vue
-->
<template>
  <div class="private-store">
    <!-- btn区 -->
    <div class="tool-bar">
      <div class="tool-row">
         <div class="tool-item mar-right">
          <span style="width:60px;">站点：</span>
          <el-select v-model="countryVal" size="mini" filterable>
            <el-option v-for="(item, index) in countries" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </div>
         <div class="tool-item mar-right">
          <span>商品ID：</span>
          <el-input v-model="goodsID" placeholder="" size="mini" clearable />
        </div>
        <div class="tool-item mar-right">
          <span>查询时间：</span>
          <el-date-picker
            v-model="searchTime"
            size="mini"
            value-format="yyyy-MM-dd"
            type="daterange"
            style="width: 200px"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          />
        </div>
        <el-button type="primary" size="mini" class="mar-right" @click="searchTableList">查 询</el-button>
        <el-button type="primary" size="mini" class="mar-right" @click="insertGoodsVisible = true">新增商品</el-button>
      </div>
    </div>
    <!-- 表格区 -->
    <div class="content">
      <el-table ref="multipleTable" v-loading="tableLoading" :data="tableData" tooltip-effect="dark" max-height="700">
        <el-table-column align="center" type="index" label="序号" width="50">
          <template slot-scope="scope">{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column min-width="120px" label="商品ID" prop="goods_id" align="center" />
        <el-table-column min-width="120px" label="商品名称" prop="goods_name" align="center" show-overflow-tooltip />
        <el-table-column min-width="80" label="商品链接" prop="goods_url" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.goods_url">
              <el-button type="primary" size="mini">查看商品</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="商品图片" width="80">
          <template slot-scope="scope">
            <el-image :src="scope.row.goods_img" style="width: 60px; height: 60px" />
          </template>
        </el-table-column>
        <el-table-column min-width="60px" label="库存" align="center">
          <template slot-scope="scope">{{ totalStock(scope.row.user_stocks_skus) }}</template>
        </el-table-column>
        <el-table-column type="expand" width="120" align="center" label="sku信息详情" header-align="center">
          <template v-slot="{ row, $index }" class="subTable">
            <div class="subTable">
              <el-table
                :data="row.user_stocks_skus"
                style="width: 100%"
                :header-cell-style="{
                  backgroundColor: '#a9a9a9',
                  color: '#fff',
                }"
              >
                <el-table-column label="序号" type="index" align="center" />
                <el-table-column label="SKU图片" width="80" align="center">
                  <template slot-scope="scope">
                    <el-image :src="scope.row.sku_image" style="width: 60px; height: 60px" />
                  </template>
                </el-table-column>
                <el-table-column label="SKU ID" prop="sku_id" align="center" />
                <el-table-column label="SKU名称" prop="sku_name" align="center" />
                <el-table-column label="价格" prop="sku_price" align="center" />
                <el-table-column label="库存" prop="stock_num" align="center" />
                <el-table-column label="操作" width="80" align="center">
                  <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="deleteSku($index, row, scope.row, scope.$index)">删 除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="60px" label="创建时间" prop="created_at" align="center" />
        <el-table-column label="操作" min-width="60px">
          <template slot-scope="scope">
            <div>
              <el-button type="primary" size="mini" class="mar-right" @click="deleteGoods(scope.row)">删 除</el-button>
              <el-button type="primary" size="mini" @click="editGoods(scope.row)">编 辑</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
    <!-- 编辑新增弹窗 -->
    <el-dialog title="自有商品编辑" :visible.sync="insertGoodsVisible" width="1200px" top="5vh" @close="closeDialog">
      <div class="goodsInsert-dialog">
        <div class="header-btn">
          <el-row style="width: 100%">
            <el-col :span="9" class="mar-right">
              <div class="tool-item">
                <span>商品名称：</span>
                <el-input v-model="goodsName" placeholder="" size="mini" clearable style="width: 200px" />
              </div>
              <div class="tool-item">
                <span>商品链接：</span>
                <el-input v-model="goodsUrl" placeholder="" size="mini" clearable style="flex: 1" />
              </div>
              <div class="tool-item">
                <div class="tool-item mar-right">
                  <span>站点：</span>
                  <el-select v-model="goodsCountry" size="mini" filterable style="min-width: 100px; flex: 1">
                    <el-option v-for="(item, index) in countries" :key="index" :label="item.label" :value="item.value" />
                  </el-select>
                </div>
                <div v-if="goodsImage" class="tool-item">
                  <span>商品主图：</span>
                  <el-image :src="goodsImage" style="width: 148px; height: 148px" @click="goodsImage = ''" />
                </div>
                <div v-else class="tool-item">
                  <span>商品主图：</span>
                  <el-upload class="avatar-uploader" action="#" :show-file-list="false" list-type="picture-card" :on-change="handleChange">
                    <i class="el-icon-plus" />
                  </el-upload>
                </div>
              </div>
            </el-col>
            <el-col :span="7" class="mar-right">
              <div class="sku-box">
                <span class="sku-title">规格一</span>
                <div class="sku-item">
                  <div class="tool-item">
                    <span>规格名称</span>
                    <el-input v-model="spec1name" placeholder="" size="mini" clearable />
                  </div>
                  <div class="tool-item">
                    <span>选项</span>
                    <div class="sku-item-box">
                      <div v-for="(item, i) in skuSpec1" :key="i + 'spec1'" class="sku-Spec">
                        <el-input v-model="item.sku_name" placeholder="" size="mini" clearable :disabled="item.sku_disabled" @input="sepcInput($event, i)" />
                        <i class="el-icon-plus" />
                        <el-button type="primary" size="mini" @click="deleteSpec1(i)">删除</el-button>
                      </div>
                    </div>
                  </div>
                  <div class="tool-item">
                    <span />
                    <el-button type="primary" size="mini" style="width: 100%" @click="addSpec1">添加选项</el-button>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="sku-box">
                <div class="sku-title">
                  <el-checkbox v-model="skuSecondCheck">规格二</el-checkbox>
                </div>
                <div class="sku-item">
                  <div class="tool-item">
                    <span>规格名称</span>
                    <el-input v-model="spec2name" placeholder="" size="mini" clearable />
                  </div>
                  <div class="tool-item">
                    <span>选项</span>
                    <div class="sku-item-box">
                      <div v-for="(item, i) in skuSpec2" :key="i + 'spec2'" class="sku-Spec">
                        <el-input v-model="item.sku_name" placeholder="" size="mini" clearable class="mar-right" :disabled="!skuSecondCheck || item.sku_disabled" @input="sepcInput($event, i)" />
                        <el-button type="primary" size="mini" :disabled="!skuSecondCheck" @click="deleteSpec2(i)">删除</el-button>
                      </div>
                    </div>
                  </div>
                  <div class="tool-item">
                    <span />
                    <el-button type="primary" size="mini" style="width: 100%" :disabled="!skuSecondCheck" @click="addSpec2">添加选项</el-button>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row style="width: 100%; display: flex; margin-top: 10px">
            <el-col :span="9" class="mar-right" />
            <el-col :span="14">
              <div class="tool-item">
                <span class="mar-right">规格咨询</span>
                <span>价格</span>
                <el-input v-model="skuPrice" placeholder="" size="mini" clearable class="mar-right" style="width: 100px" @input="setSkuPriceStock" />
                <span>数量</span>
                <el-input v-model="skuStock" placeholder="" size="mini" clearable class="mar-right" style="width: 100px" @input="setSkuPriceStock" />
                <el-button type="primary" size="mini" @click="setSkuPriceStock">批量更新</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="content-table">
          <el-table ref="skuTable" v-loading="tableLoading" :data="skuList" tooltip-effect="dark" height="280">
            <el-table-column align="center" type="index" label="序号" width="50" />
            <el-table-column width="120px" label="规格一" prop="sku_name1" align="center">
              <template slot-scope="scope">{{ scope.row.sku_name1 }}</template>
            </el-table-column>
            <el-table-column width="120px" label="规格二" prop="sku_name" align="center">
              <template slot-scope="scope"> {{ scope.row.sku_name2 }}</template>
            </el-table-column>
            <el-table-column width="120px" label="库存" prop="sku_name" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.stock_num" placeholder="" size="mini" />
              </template>
            </el-table-column>
            <el-table-column width="120px" label="单买价（元）" prop="sku_name" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.sku_price" placeholder="" size="mini" />
              </template>
            </el-table-column>
            <el-table-column width="120px" label="规格备注" prop="sku_name" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.remark" placeholder="" size="mini" />
              </template>
            </el-table-column>
            <el-table-column min-width="60px" label="规格图" prop="platform_mall_name" align="center" />
            <el-table-column width="140px" label="SKU ID" prop="sku_name" align="center">
              <template slot-scope="scope">{{ scope.row.sku_id }}</template>
            </el-table-column>
            <el-table-column width="160px" label="创建时间" prop="sku_name" align="center">
              <template slot-scope="scope">{{ scope.row.created_at }}</template>
            </el-table-column>
          </el-table>
        </div>
        <div class="footer">
          <el-button v-if="editInfo.id" type="primary" size="mini" @click="saveUpdateGoods">保 存</el-button>
          <el-button v-else type="primary" size="mini" @click="saveInsert">新 增</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { randomWord } from '../../../util/util'
export default {
  name: 'PrivateWarehouse',
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      goodsID: '',
      countryVal: 'TH',
      searchTime: [],
      countries:this.$filters.countries_option,
      pageSize: 20, // 页码
      currentPage: 1, // 页码
      total: 0, // 表格总数
      tableData: [],
      tableLoading: false,
      insertGoodsVisible: false,
      editInfo: {},
      goodsName: '',
      goodsUrl: '',
      goodsCountry: 'TH',
      goodsImage: '',
      skuSecondCheck: false,
      skuList: [],
      skuSpec1: [],
      skuSpec2: [],
      skuPrice: 0,
      skuStock: 0,
      spec1name: '规格一',
      spec2name: '规格二',
      skuListCopy: []
    }
  },
  mounted() {
    const end = new Date().getTime()
    const start = end - 30 * 24 * 60 * 60 * 1000
    this.searchTime = [this.$dayjs(start).format('YYYY-MM-DD'), this.$dayjs(end).format('YYYY-MM-DD')]
    this.searchTableList()
  },
  methods: {
    // 保存新增
    async saveInsert() {
      if (!this.skuList.length) {
        return this.$message.warning('缺少sku信息！')
      }
      const userStocksSkus = []
      this.skuSpec1.forEach((item1) => {
        this.skuSpec2.forEach((item2) => {
          userStocksSkus.push({
            sku_id: 0,
            id: 0,
            sku_name: item2.sku_name ? item1.sku_name + ',' + item2.sku_name : item1.sku_name,
            stock_num: 0,
            sku_price: 0,
            sku_image: '',
            remark: '',
            created_at: null
          })
        })
      })
      if (!this.goodsName) {
        return this.$message.warning('商品名称不能为空！')
      }
      const params = {
        country: this.goodsCountry,
        goodsName: this.goodsName,
        goodsUrl: this.goodsUrl,
        goodsImg: this.goodsImage,
        userStocksSkus: JSON.stringify(userStocksSkus)
      }
      const res = await this.$api.insertUserGoods(params)
      if (res.data.code === 200) {
        this.$message.success('保存成功!')
        this.insertGoodsVisible = false
        this.searchTableList()
      } else {
        this.$message.error(res.data.message)
      }
      console.log(res, 'saveInsert')
    },
    // 保存编辑
    async saveUpdateGoods() {
      const userStocksSkus = []
      this.skuList.forEach((item) => {
        userStocksSkus.push({
          sku_id: item.sku_id,
          id: item.id,
          sku_name: item.sku_name2 ? item.sku_name1 + ',' + item.sku_name2 : item.sku_name1,
          stock_num: item.stock_num,
          sku_price: item.sku_price,
          sku_image: item.sku_image,
          remark: item.remark,
          created_at: item.created_at
        })
      })
      const params = {
        country: this.goodsCountry,
        id: this.editInfo.id,
        goodsId: this.editInfo.goodsId,
        goodsName: this.goodsName,
        goodsImg: this.goodsImage,
        userStocksSkus: JSON.stringify(userStocksSkus)
      }
      const res = await this.$api.updataUserGoods(params)
      if (res.data.code === 200) {
        this.$message.success('保存成功!')
        this.insertGoodsVisible = false
        this.searchTableList()
      } else {
        this.$message.error(res.data.message)
      }
      console.log(res, 'saveUpdateGoods')
    },
    // 删除sku
    async deleteSku(faIndex, faRow, row, index) {
      console.log(faIndex, faRow, row, index)
      const params = {
        id: faRow.id,
        skuIdList: JSON.stringify([row.id])
      }
      const res = await this.$api.deleteUserSku(params)
      if (res.data.code === 200) {
        this.$message.success('删除成功!')
        this.tableData[faIndex].user_stocks_skus.splice(index, 1)
      } else {
        this.$message.error(res.data.message)
      }
      console.log(res)
    },
    // 设置sku价格库存
    setSkuPriceStock() {
      if (!this.skuList.length) {
        return
      }
      this.skuList.forEach((item) => {
        item.stock_num = this.skuStock
        item.sku_price = this.skuPrice
      })
    },
    // 添加spec1
    addSpec1() {
      const params = {
        sku_name: ''
      }
      this.skuSpec1.push(params)
      this.createSkuList()
    },
    // 添加spec2
    addSpec2() {
      const params = {
        sku_name: ''
      }
      this.skuSpec2.push(params)
      this.createSkuList()
    },
    async deleteEditSku(deleteSkus) {
      let goodsId = ''
      const skuIds = []
      deleteSkus.forEach((item) => {
        if (item.sys_stock_id) {
          goodsId = item.sys_stock_id
          skuIds.push(item.id)
        }
      })
      if (goodsId && skuIds.length) {
        const params = {
          id: goodsId,
          skuIdList: JSON.stringify(skuIds)
        }
        const res = await this.$api.deleteUserSku(params)
        if (res.data.code === 200) {
          this.$message.success('删除成功!')
        } else {
          this.$message.error(res.data.message)
        }
      }
    },
    // 删除spec1
    deleteSpec1(i) {
      const baseSKU = JSON.parse(JSON.stringify(this.skuList))
      this.skuList = baseSKU.filter((n) => {
        return n.sku_name1 !== this.skuSpec1[i].sku_name
      })
      const deleteSkus = baseSKU.filter((n) => {
        return n.sku_name1 === this.skuSpec1[i].sku_name
      })
      if (deleteSkus) {
        this.deleteEditSku(deleteSkus)
      }
      this.skuSpec1.splice(i, 1)
    },
    // 删除spec2
    deleteSpec2(i) {
      const baseSKU = JSON.parse(JSON.stringify(this.skuList))
      this.skuList = baseSKU.filter((n) => {
        return n.sku_name1 !== this.skuSpec2[i].sku_name
      })
      const deleteSkus = baseSKU.filter((n) => {
        return n.sku_name1 === this.skuSpec2[i].sku_name
      })
      if (deleteSkus) {
        this.deleteEditSku(deleteSkus)
      }
      this.skuSpec2.splice(i, 1)
    },
    sepcInput(val, i) {
      const spec = this.skuList.find((n) => {
        return n.sku_name1 === val || n.sku_name2 === val
      })
      if (spec) {
        return this.$message.warning('此规格已存在')
      }
      this.createSkuList()
    },
    // 生成sku列表
    createSkuList() {
      this.skuList = []
      if (this.skuSpec1.length === 0 && this.skuSpec2.length === 0) {
        this.skuList = []
      }
      if (this.skuSpec1.length > 0 && this.skuSpec2.length === 0) {
        this.skuList = this.skuSpec1.map((item) => {
          const obj = this.skuListCopy.find((n) => {
            return n.sku_name1 === item.sku_name
          })
          if (obj) {
            return {
              sys_stock_id: obj.sys_stock_id,
              sku_id: obj.sku_id,
              id: obj.id,
              sku_name1: obj.sku_name1,
              sku_name2: '',
              stock_num: obj.stock_num,
              sku_price: obj.sku_price,
              sku_image: obj.sku_image,
              remark: obj.remark,
              created_at: obj.created_at
            }
          } else {
            return {
              sku_id: 0,
              id: 0,
              sku_name1: item.sku_name,
              sku_name2: '',
              stock_num: 0,
              sku_price: 0,
              sku_image: '',
              remark: '',
              created_at: null
            }
          }
        })
      }
      if (this.skuSpec1.length === 0 && this.skuSpec2.length > 0) {
        return this.$message.warning('规格一必填！')
      }
      if (this.skuSpec1.length > 0 && this.skuSpec2.length > 0) {
        this.skuSpec1.forEach((item1) => {
          this.skuSpec2.forEach((item2) => {
            const obj = this.skuListCopy.find((n) => {
              return n.sku_name1 === item1.sku_name && n.sku_name2 === item2.sku_name
            })
            if (obj) {
              this.skuList.push({
                sku_id: obj.sku_id,
                id: obj.id,
                sku_name1: obj.sku_name1,
                sku_name2: obj.sku_name2,
                stock_num: obj.stock_num,
                sku_price: obj.sku_price,
                sku_image: obj.sku_image,
                remark: obj.remark,
                created_at: obj.created_at
              })
            } else {
              this.skuList.push({
                sku_id: 0,
                id: 0,
                sku_name1: item1.sku_name,
                sku_name2: item2.sku_name,
                stock_num: 0,
                sku_price: 0,
                sku_image: '',
                remark: '',
                created_at: null
              })
            }
          })
        })
      }
    },
    // 列表
    async searchTableList() {
      const params = {
        country: this.countryVal,
        goodsId: this.goodsID,
        createTime: ''
      }
      params.createTime = this.$dayjs(this.searchTime[0]).format('YYYY-MM-DD') + ' 00:00:00' + '/' + this.$dayjs(this.searchTime[1]).format('YYYY-MM-DD') + ' 23:59:59'
      this.tableLoading = true
      const res = await this.$api.getUserStore(params)
      if (res && res.data.code === 200) {
        this.total = res.data.data.total
        this.tableData = res.data.data.data
      } else {
        this.$message.error(res.data.message)
      }
      console.log(this.tableData)
      this.tableLoading = false
    },
    // 上传图片
    async handleChange(file) {
      const that = this
      const localFile = file.raw
      const reader = new FileReader()
      reader.readAsDataURL(localFile)
      reader.onload = async() => {
        that.imgData = reader.result
        const name = randomWord(false, 32) + '_' + new Date().getTime()
        const res = await this.$ossService.uploadFile(that.imgData, name)
        this.goodsImage = res
      }
    },
    // 删除商品
    async deleteGoods(row) {
      const params = {
        id: row.id
      }
      const res = await this.$api.deleteUserGoods(params)
      if (res.data.code === 200) {
        this.$message.success('删除成功')
        this.searchTableList()
      } else {
        this.$message.error(res.data.message)
      }
      console.log(res)
    },
    closeDialog() {
      this.countryVal = 'TH'
      this.goodsName = ''
      this.goodsUrl = ''
      this.goodsImage = ''
      this.skuList = []
      this.skuSpec1 = []
      this.skuSpec2 = []
      this.editInfo = {}
    },
    // 编辑商品
    editGoods(row) {
      this.insertGoodsVisible = true
      this.editInfo = row
      this.goodsCountry = row.country
      this.goodsName = row.goods_name
      this.goodsUrl = row.goods_url
      this.goodsImage = row.goods_img
      row.user_stocks_skus.forEach((item, index) => {
        const specArr = item.sku_name.split(',') || []
        if (specArr.length == 1) {
          item.sku_name1 = specArr[0]
          const params = {
            sku_name: specArr[0],
            sku_disabled: true
          }
          const obj = this.skuSpec1.find((item) => {
            return item.sku_name === specArr[0]
          })
          if (!obj) {
            this.skuSpec1.push(params)
          }
        } else if (specArr.length >= 2) {
          item.sku_name1 = specArr[0]
          item.sku_name2 = specArr[1]
          const params1 = {
            sku_name: specArr[0],
            sku_disabled: true
          }
          const params2 = {
            sku_name: specArr[1],
            sku_disabled: true
          }
          const obj1 = this.skuSpec1.find((item) => {
            return item.sku_name === specArr[0]
          })
          if (!obj1) {
            this.skuSpec1.push(params1)
          }
          const obj2 = this.skuSpec2.find((item) => {
            return item.sku_name === specArr[1]
          })
          if (!obj2) {
            this.skuSpec2.push(params2)
          }
        }
      })
      this.skuListCopy = JSON.parse(JSON.stringify(row.user_stocks_skus))
      this.skuList = row.user_stocks_skus
      console.log('row', row, this.skuSpec1, this.skuSpec2, this.skuList)
    },
    // 计算总库存
    totalStock(data) {
      let stock = 0
      for (let i = 0; i < data.length; i++) {
        stock += data[i].stock_num
      }
      return stock
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.searchTableList()
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.searchTableList()
    }
  }
}
</script>

<style lang="less" scoped>
.private-store {
  min-width: 1280px;
  margin: 10px;
  /deep/.el-dialog__body {
    padding: 10px 20px;
  }
}
.mar-right {
  margin-right: 10px;
}
.tool-bar {
  height: 60px;
  background: #fff;
  .tool-row {
    padding: 16px 16px 0 16px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .tool-item {
      display: flex;
      align-items: center;
      span {
        display: inline-block;
        width: 80px;
      }
    }
  }
}
.content {
  margin: 20px 0;
  background: #fff;
  height: calc(100vh - 110px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .subTable {
    width: 60%;
    margin: 0 auto;
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    height: 35px;
  }
}
.goodsInsert-dialog {
  .tool-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    cursor: pointer;
    span {
      display: inline-block;
      width: 80px;
    }
  }
  .header-btn {
    // display: flex;
    .sku-box {
      border: 1px solid #dcdcdc;
      border-radius: 4px;
      padding: 16px;
      position: relative;
      .sku-title {
        padding: 0 5px;
        display: inline-block;
        height: 20px;
        line-height: 20px;
        text-align: center;
        background: #fff;
        position: absolute;
        left: 10px;
        top: -10px;
      }
      .sku-item {
        display: flex;
        flex-direction: column;
        .sku-item-box {
          height: 180px;
          width: 100%;
          border: 1px solid #dcdcdc;
          overflow-y: auto;
          .sku-Spec {
            display: flex;
            align-items: center;
            margin: 10px;
            i {
              font-size: 20px;
              margin: 0 10px;
            }
          }
          &::-webkit-scrollbar {
            width: 5px;
            height: 10px;
          }
          &::-webkit-scrollbar-track {
            background: rgb(239, 239, 239);
            border-radius: 2px;
          }
          &::-webkit-scrollbar-thumb {
            background: #bfbfbf;
            border-radius: 10px;
          }
        }
        span {
          display: inline-block;
        }
      }
    }
  }
  .content-table {
    margin-top: 20px;
  }
  .footer {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
