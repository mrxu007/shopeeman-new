<template>
  <div class="product-put-on-popular-selection">
    <div class="category-choose-box">
      <category-choose :level="3" @setCategory="setCategory" />
      <div class="conditions-box">
        <span>出货地点：</span>
        <el-select v-model="deliveryPlace" placeholder="" value="" size="mini" filterable>
          <el-option
            v-for="(item, index) in deliveryPlaceList"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="conditions-box">
        <span>店铺类型：</span>
        <el-select v-model="shopType" placeholder="" value="" size="mini" filterable>
          <el-option
            v-for="(item, index) in shopTypeList"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="conditions-box">
        <span>排行：</span>
        <el-select v-model="sortBy" placeholder="" value="" size="mini" filterable>
          <el-option
            v-for="(item, index) in sortByList"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="conditions-box conditions-input">
        <span>月销量：</span>
        <el-input v-model="minSales" size="mini" />
        <div style="width: 6px;height: 1px;background: #111;margin: 0 5px" />
        <el-input v-model="maxSales" size="mini" />
      </div>
      <div class="conditions-box conditions-input">
        <span>新增点赞数：</span>
        <el-input v-model="minGive" size="mini" />
        <div style="width: 6px;height: 1px;background: #111;margin: 0 5px" />
        <el-input v-model="maxGive" size="mini" />
      </div>
      <div class="conditions-box conditions-input">
        <span>新增评论数：</span>
        <el-input v-model="minComments" size="mini" />
        <div style="width: 6px;height: 1px;background: #111;margin: 0 5px" />
        <el-input v-model="maxComments" size="mini" />
      </div>
      <div class="conditions-box conditions-input">
        <span>价格区间(当地币种)：</span>
        <el-input v-model="minPrice" size="mini" />
        <div style="width: 6px;height: 1px;background: #111;margin: 0 5px" />
        <el-input v-model="maxPrice" size="mini" />
      </div>
      <el-button size="mini" style="margin-bottom: 10px" type="primary" @click="searchShopeeHotGoods">查询</el-button>
      <el-button size="mini" style="margin-bottom: 10px" @click="exportData">导出</el-button>
      <el-button size="mini" style="margin-bottom: 10px" type="primary" @click="fasterToken">一键采集商品</el-button>
      <el-button size="mini" style="margin-bottom: 10px" type="primary" @click="watchDBData">查看电霸数据</el-button>

    </div>
    <div class="content">
      <el-table
        ref="multipleTable"
        v-loading="tableLoading"
        :data="tableData"
        tooltip-effect="dark"
        :height="'calc(100vh - 150px)'"
      >
        <el-table-column align="center" type="index" label="序号" width="50">
          <template slot-scope="scope">{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column width="120px" label="站点" prop="country" align="center">
          <template slot-scope="scope">{{ scope.row.platform | chineseSite }}</template>
        </el-table-column>
        <el-table-column width="120px" label="商品ID" prop="country" align="center">
          <template slot-scope="scope">{{ scope.row.itemid }}</template>
        </el-table-column>
        <el-table-column width="100px" label="商品图片" prop="country" align="center">
          <template slot-scope="scope">
            <el-image
              :src="[scope.row.platform , scope.row.shopid , scope.row.image ]| imageRender"
              :preview-src-list="[scope.row.platform , scope.row.shopid , scope.row.image ,1]| imageRender"
            >
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column min-width="60px" label="商品名称" prop="country" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column width="100px" label="官方店铺" prop="country" align="center">
          <template slot-scope="scope">{{ scope.row.is_official_shop&& '是' || '否' }}</template>
        </el-table-column>
        <el-table-column min-width="60px" label="一级类目" prop="" align="center">
          <template slot-scope="scope">{{
            scope.row.cat_path.split('>')[0] }}({{ scope.row.display_path_cn.split('>')[0] }})
          </template>
        </el-table-column>
        <el-table-column min-width="70px" label="二级类目" prop="" align="center">
          <template slot-scope="scope">{{ scope.row.cat_path.split('>')[1] &&
            (scope.row.cat_path.split('>')[1]+'('+scope.row.display_path_cn.split('>')[1]+')') || '' }}
          </template>
        </el-table-column>
        <el-table-column min-width="80px" label="三级类目" prop="" align="center">
          <template slot-scope="scope">{{ scope.row.cat_path.split('>')[2] &&
            (scope.row.cat_path.split('>')[2]+'('+scope.row.display_path_cn.split('>')[2]+')') || '' }}
          </template>
        </el-table-column>
        <el-table-column width="100px" label="创建时间" prop="created_at" align="center">
          <template slot-scope="scope">{{ $dayjs(scope.row.ctime*1000).format('YYYY-MM-DD') }}</template>
        </el-table-column>
        <el-table-column width="100px" label="近30天销量" prop="warehouse_name" align="center">
          <template slot-scope="scope">{{ scope.row.sold || '' }}
          </template>
        </el-table-column>
        <el-table-column width="80px" label="价格" prop="warehouse_name" align="center">
          <template slot-scope="scope">{{ scope.row.price || '' }}</template>
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
  </div>
</template>
<script>
import CategoryChoose from '../../../components/category-choose.vue'
import { exportExcelDataCommon, dateFormat } from '../../../util/util'
import PopularSelectionApi from '../../../module-api/smart-house-api/popularSelection'
export default {
  components: {
    CategoryChoose
  },
  data() {
    return {
      popularSelectionApiInstance: new PopularSelectionApi(this),
      tableData: [],
      country: '',
      platformId: 0,
      categoryFirst: '',
      categorySecond: '',
      categoryThird: '',
      tableLoading: false,
      deliveryPlaceList: [
        {
          label: '本地',
          value: '-1'
        }, {
          label: '海外',
          value: '-2'
        }],
      shopTypeList: [
        {
          label: '全部',
          value: '2'
        }, {
          label: '官方',
          value: '1'
        }, {
          label: '非官方',
          value: '0'
        }],
      sortByList: [
        {
          label: '飙升',
          value: '1'
        }, {
          label: '热门',
          value: '2'
        }],
      currentPage: 1,
      total: 0,
      pageSize: 20,
      deliveryPlace: '-1',
      shopType: '2',
      sortBy: '1',
      minSales: 0,
      maxSales: 1000,
      minGive: 0,
      maxGive: 1000,
      minComments: 0,
      maxComments: 1000,
      minPrice: 0,
      maxPrice: 1000
    }
  },
  mounted() {
  },
  methods: {
    // 一键采集
    fasterToken() {
      const linkList = []
      this.tableData.forEach(e => {
        const link = `https://xiapi.xiapibuy.com/product/${e.shopid}/${e.itemid}`
        linkList.push(link)
      })
      this.$message.success('链接添加成功，请手动点击采集！')
      // 平台采集模块，商品添加链接部分还没做
      // this.$router.push({
      //   path: '/product-put?activeVal=0',
      //   query: {
      //     goodsLinkList: linkList
      //   }
      // })
    },
    // 查看电霸数据
    async watchDBData() {
      const userInfo = await this.$appConfig.getUserInfo()
      console.log('userinfo', userInfo)
      const params = {
        uid: userInfo.muid,
        phone: userInfo.Phone,
        time: Date.parse(new Date()).toString().substr(0, 10),
        sign: ''
      }
      await window.BaseUtilBridgeService.getDianBaDataSign(params.time).then(res => {
        params.sign = res
      })
      window.BaseUtilBridgeService.openUrl('http://open.dianba6.com/?uid=' + params.uid + '&mobile=' + params.phone + '&platform=shopee&time=' + params.time + '&invite_code=Wr38mSR3&version=1.0&sign=' + params.sign + '&app_key=dbyEOmrAqF7unG2Mxj5L')
    },
    setCategory(select) {
      this.country = select.country
      this.platformId = select.platformId
      this.categoryFirst = select.categoryFirst
      this.categorySecond = select.categorySecond
      this.categoryThird = select.categoryThird
    },
    async searchShopeeHotGoods() {
      debugger
      const price = this.minPrice + '_' + this.maxPrice
      const month_sales = this.minSales + '_' + this.maxSales
      const increment_like_count = this.minGive + '_' + this.maxGive
      const increment_item_rating = this.minComments + '_' + this.maxComments
      const level = this.categoryThird && 3 || this.categorySecond && 2 || this.categoryFirst && 1 || ''
      const catId = this.categoryThird || this.categorySecond || this.categoryFirst || ''
      const params = {
        page: this.currentPage + '',
        page_size: this.pageSize + '',
        platform_id: this.platformId + '',
        cat_id: catId + '',
        level: level + '',
        price: price,
        month_sales: month_sales,
        increment_like_count: increment_like_count,
        increment_item_rating: increment_item_rating,
        location: this.deliveryPlace,
        shopType: this.shopType,
        sortBy: this.sortBy
      }
      this.tableLoading = true
      try {
        const resJson = await this.$commodityService.searchShopeeHotGoods(params)
        const res = JSON.parse(resJson)
        this.tableData = res
        console.log(res)
        this.total = 3000
      } catch (e) {
        this.$message.error('获取爆款选品列表失败')
      } finally {
        this.tableLoading = false
      }
    },
    exportData() {
      if (!this.tableData.length) {
        return this.$message.warning('没有可导出的数据')
      }
      let num = 1
      let str = `<tr>
              <td>编号</td>
              <td>站点</td>
              <td>商品ID</td>
              <td>商品图片</td>
              <td>商品名称</td>
              <td>官方店铺</td>
              <td>一级类目</td>
              <td>二级类目</td>
              <td>三级类目</td>
              <td>创建时间</td>
              <td>近30天销量</td>
              <td>价格</td>
            </tr>`
      for (let i = 0; i < this.tableData.length; i++) {
        const item = this.tableData[i]
        const categoryFirst = item.cat_path && item.cat_path.split('>')[0] &&
            `${item.cat_path.split('>')[0]}(${item.display_path_cn.split('>')[0]})` || ''
        const categorySecond = item.cat_path && item.cat_path.split('>')[1] &&
            `${item.cat_path.split('>')[1]}(${item.display_path_cn.split('>')[1]})` || ''
        const categoryThird = item.cat_path && item.cat_path.split('>')[2] &&
            `${item.cat_path.split('>')[2]}(${item.display_path_cn.split('>')[2]})` || ''
        console.log(this)
        str += `<tr><td>${num++}</td>
                    <td>${this.$filters.chineseSite(item.platform) + '\t'}</td>
                    <td>${(item.itemid || '') + '\t'}</td>
                    <td>${this.$filters.imageRender([item.platform, item.shopid, item.image]) + '\t'}</td>
                    <td>${(item.name) + '\t'}</td>
                    <td>${(item.is_official_shop && '是' || '否') + '\t'}</td>
                    <td>${categoryFirst + '\t'}</td>
                    <td>${categorySecond + '\t'}</td>
                    <td>${categoryThird + '\t'}</td>
                    <td>${dateFormat(item.ctime * 1000, 'yyyy-MM-dd') + '\t'}</td>
                    <td>${item.sold || 0 + '\t'}</td>
                    <td>${item.price || 0 + '\t'}</td>
                </tr>`
      }
      exportExcelDataCommon('爆款选品', str)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.searchShopeeHotGoods()
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.searchShopeeHotGoods()
    }
  }
}
</script>

<style lang="less">
  .product-put-on-popular-selection {
    min-width: 1280px;
    margin: 10px;
    padding: 10px;
    background: #fff;

    .category-choose-box {
      display: flex;
      flex-flow: wrap;

      .el-select, .el-input {
        width: 150px;
      }

      .conditions-box {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        margin-right: 10px;
      }

      .conditions-input {
        .el-input {
          width: 100px;
        }
      }
    }
  }
</style>
