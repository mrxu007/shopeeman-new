<template>
  <el-row class="contaniner">
    <el-row class="header">
      <div class="on_new_dialog_box" style="margin-bottom: 10px;">
        <div>店铺站点：</div>
        <el-select v-model="countryOption" size="mini" filterable style="width: 140px">
          <el-option v-for="(item, index) in countriesOption" :key="index" :label="item.label" :value="item.value"/>
        </el-select>
        <div style="margin-left: 20px;">任务名称：</div>
        <el-input size="mini" v-model="taskName" style="width: 140px;"></el-input>
        <div style="margin-left: 20px;">任务状态：</div>
        <el-select value="" v-model="status" size="mini">
          <el-option v-for="(item,index) in statusList" :key="index" :value="item.value"
                     :label="item.label"></el-option>
        </el-select>
        <div style="margin-left: 20px;">任务日期：</div>
        <el-date-picker v-model="taskTimeStart" type="date" size="mini" placeholder="选择开始日期"
                        style="width: 140px"></el-date-picker>
        <div style="width: 6px;height: 1px;background: #1a1a1a;margin: 0 7px;"></div>
        <el-date-picker v-model="taskTimeEnd" type="date" size="mini" placeholder="选择结束日期"
                        style="width: 140px"></el-date-picker>
      </div>
      <div class="on_new_dialog_box" style="margin-bottom: 10px;">
        <el-button size="mini" type="primary" @click="searchTask">搜索任务</el-button>
        <el-button size="mini" type="primary" @click="startTask">启动任务</el-button>
        <el-button size="mini" @click="cancelTask">取消任务</el-button>
        <el-button size="mini" type="primary" @click="deleteTask">删除任务</el-button>
      </div>
    </el-row>
    <u-table :data="taskTable" @selection-change="handleSelectionChange"
             use-virtual :data-changes-scroll-top="false"
             :header-cell-style="{backgroundColor: '#f5f7fa',height:'50px'}"
             row-key="id" :border="false" :big-data-checkbox="true" height="680">
      <u-table-column align="left" type="selection" width="50"/>
      <u-table-column align="left" label="序列号" type="index" width="60">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </u-table-column>
      <u-table-column align="left" label="任务名称" width="120" show-overflow-tooltip>
        <template slot-scope="{ row }">
          {{ row.task_name }}
        </template>
      </u-table-column>
      <u-table-column align="left" label="店铺名称" min-width="120" show-overflow-tooltip>
        <template v-slot="{ row }">
          <div class="goodsTableLine">
            {{ row.mall_names }}
          </div>
        </template>
      </u-table-column>
      <u-table-column align="left" label="店铺站点" width="120">
        <template slot-scope="{ row }">
          {{ countryOption | chineseSite }}
        </template>
      </u-table-column>
      <u-table-column align="left" label="店铺分组" width="120">
        <template slot-scope="{ row }">全部
        </template>
      </u-table-column>
      <u-table-column align="left" label="执行时间" width="140">
        <template slot-scope="{ row }">
          {{ row.exec_time }}
        </template>
      </u-table-column>
      <u-table-column align="left" label="商品总数" width="100">
        <template slot-scope="{ row }">
          {{ row.goods_count }}
        </template>
      </u-table-column>
      <u-table-column align="left" label="上新成功数" width="120" prop="category_name">
        <template slot-scope="{ row }">
          {{ row.success_count }}
        </template>
      </u-table-column>
      <u-table-column align="left" label="上新失败数" width="120" prop="categoryName" show-overflow-tooltip>
        <template slot-scope="{row}">
          {{ row.fail_count }}
        </template>
      </u-table-column>
      <u-table-column align="left" label="执行状态" width="120" prop="price">
        <template slot-scope="{ row }">
          {{ statusShow[Number(row.status)] }}
        </template>
      </u-table-column>
      <u-table-column align="left" label="任务详情" width="120" prop="sys_label_name" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="viewTask(scope.row)">查看</el-button>
        </template>
      </u-table-column>
      <u-table-column align="left" label="启动任务" width="120" prop="sourceName">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="startTask(scope.row)">启动</el-button>
        </template>
      </u-table-column>
    </u-table>
    <div class="on_new_dialog">
      <el-dialog title="定时上新商品列表" width="1500px" top="10vh" :close-on-click-modal="false"
                 :visible.sync="taskSetTimeVisible">
        <u-table :data="taskSetTimeTable" @selection-change="handleSelectionChange"
                 use-virtual :data-changes-scroll-top="false" ref="taskSetTimeTable"
                 :header-cell-style="{backgroundColor: '#f5f7fa',height:'50px'}"
                 row-key="id" :border="false" :big-data-checkbox="true" height="500">
          <u-table-column align="left" type="selection" width="50"/>
          <u-table-column align="left" label="序列号" type="index" width="60">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </u-table-column>
          <u-table-column align="left" label="任务名称" width="100" show-overflow-tooltip>
            <template slot-scope="{ row }">
              {{ row.task_name }}
            </template>
          </u-table-column>
          <u-table-column align="left" label="店铺名称" width="100" show-overflow-tooltip>
            <template v-slot="{ row }">
              <div class="goodsTableLine">
                {{ row.mall_names }}
              </div>
            </template>
          </u-table-column>
          <u-table-column align="left" label="店铺站点" width="120">
            <template slot-scope="{ row }">
              {{ countryOption | chineseSite }}
            </template>
          </u-table-column>
          <u-table-column align="left" label="商品主图" width="80">
            <template slot-scope="{ row }">
              <el-tooltip effect="light" placement="right-end" :visible-arrow="false" :enterable="false"
                          style="width: 56px; height: 56px; display: inline-block">
                <div slot="content">
                  <el-image :src=" row.image " style="width: 400px; height: 400px"/>
                </div>
                <el-image :src="{url:row.image,source:row.source} | changeImgSizeFilter"
                          style="width: 56px; height: 56px"/>
              </el-tooltip>
            </template>
          </u-table-column>
          <u-table-column align="left" label="上家商品Id" width="130">
            <template v-slot="{ row }">
              <div style="display: flex; align-items: center;">
                <el-button type="text" class="copyIcon" @click="copy(row.goods_id)">
                  <i class="el-icon-document-copy"/></el-button>
                <span class="goToGoods" @click.stop="goToGoods(row)">{{ row.goods_id }}</span>
              </div>
            </template>
          </u-table-column>
          <u-table-column align="left" label="shopee-Id" width="130">
            <template slot-scope="{ row }">
              <div style="display: flex; align-items: center;">
                <el-button v-if="row.product_id" type="text" class="copyIcon" @click="copy(row.product_id)">
                  <i class="el-icon-document-copy"/></el-button>
                <span class="goToGoods" @click.stop="goToGoods(row,1)">{{ row.product_id || '' }}</span>
              </div>
            </template>
          </u-table-column>
          <u-table-column align="left" label="标题" min-width="120">
            <template slot-scope="{ row }">
              <div class="goodsTableLine">
                {{ row.title }}
              </div>
            </template>
          </u-table-column>
          <u-table-column align="left" label="类目" prop="category_name" width="100" show-overflow-tooltip/>
          <u-table-column align="left" label="shopee类目" show-overflow-tooltip prop="categoryName" width="100">
            <template slot-scope="scope">
              <el-button type="text" @click="enterCategory(0,scope.row)">
                {{ scope.row.categoryName || '请选择类目' }}
              </el-button>
            </template>
          </u-table-column>
          <u-table-column align="left" label="价格" prop="price" width="80"/>
          <u-table-column align="left" label="销量" prop="sales" width="80"/>
          <u-table-column align="left" label="来源" prop="sourceName" width="80"/>
          <u-table-column align="left" label="状态" width="100">
            <template slot-scope="{ row }">
              <div class="goodsTableLine">
                {{ row.message }}
              </div>
            </template>
          </u-table-column>
        </u-table>
      </el-dialog>
      <el-dialog title="类目映射" width="700px" top="25vh" :close-on-click-modal="false" :visible.sync="categoryVisible">
        <categoryMapping v-if="categoryVisible" :country="countryOption" :goods-current="goodsCurrent" @categoryChange="categoryChange"/>
      </el-dialog>
    </div>
  </el-row>
</template>
<script>
import MallListAPI from '@/module-api/mall-manager-api/mall-list-api'
import GoodsManagerAPI from '@/module-api/goods-manager-api/goods-data'
import GoodsDiscount from '@/module-api/market-activity-api/goods-discount'
import { copyText, getGoodsUrl } from '@/util/util'
import categoryMapping from '@/components/category-mapping'

export default {
  data() {
    return {
      mallListAPIInstance: new MallListAPI(this),
      GoodsManagerAPIInstance: new GoodsManagerAPI(this),
      GoodsDiscount: new GoodsDiscount(this),
      countriesOption: this.$filters.countries_option,
      countryOption: 'TH',
      taskName: '',
      taskTimeStart: new Date(new Date().getTime() - 3600 * 1000 * 24 * 2),
      taskTimeEnd: new Date(new Date().getTime() + 3600 * 1000 * 24),
      taskTable: [],
      taskSelectTable: [],
      statusList: [
        { value: '', label: '全部' },
        { value: 1, label: '已执行' },
        { value: 2, label: '部分失败' },
        { value: 3, label: '待执行' },
        { value: 4, label: '待启动' }
      ],
      statusShow: {
        1: '已执行',
        2: '部分失败',
        3: '待执行',
        4: '待启动'
      },
      status: '',
      taskSetTimeVisible: false,
      taskSetTimeTable: [],
      goodsCurrent: null,
      categoryVisible: false,
      goodsClassName: {},
      isRefreshTable: true
    }
  },
  components: { categoryMapping },
  methods: {
    async searchTask() {
      this.taskTable = []
      let country = this.countryOption
      let status = this.status
      let name = this.taskName
      let startTime = Math.floor(this.taskTimeStart.getTime() / 1000)
      let endTime = Math.floor(this.taskTimeEnd.getTime() / 1000)
      console.log(country, '', name, startTime, endTime)
      let getConfig = await this.$collectService.getCronPublishTask(country, status + '', name, startTime, endTime)
      this.taskTable = getConfig
      console.log('getConfig', getConfig)
    },
    startTask(row) {
      if (this.taskSelectTable.length === 0) {
        this.$message.error('请选择一个定时任务')
        return
      }
    },
    cancelTask() {
      if (this.taskSelectTable.length === 0) {
        this.$message.error('请选择一个定时任务')
        return
      }

    },
    async deleteTask() {
      if (this.taskSelectTable.length === 0) {
        this.$message.error('请选择一个定时任务')
        return
      }
      let ids = this.taskSelectTable.map(son => son.id)
      let res = await this.$collectService.deleteCronPublishTask(ids)
      if (Number(res.code) === 200) {
        this.$message.success('删除成功')
        for (let i = 0; i < ids.length; i++) {
          await this.$collectService.deleteCronPublishConfig(ids[i])
          await this.$collectService.deleteCronPublishGoods(ids[i] + '')
          let index = this.taskTable.findIndex(son => son.id === ids[i])
          this.taskTable.splice(index, 1)
        }
      } else {
        this.$message.error('删除失败')
      }
      console.log(res)
    },
    async viewTask(data) {
      console.log('viewTask', data)
      let goodsRes = await this.$collectService.getCronPublishGoods(data.id + '')
      let goodsList = JSON.parse(JSON.stringify(goodsRes))
      this.taskSetTimeTable = goodsList.map(son => {
        return Object.assign(son, JSON.parse(son.goods_info))
      })
      this.taskSetTimeVisible = true
      console.log('goodsRes', this.taskSetTimeTable)
    },
    handleSelectionChange(val) {
      this.taskSelectTable = val
    },
    goToGoods(item, type) {
      if (type) {
        try {
          const url = this.$filters.countryShopeebuyCom(item.country)
          this.$BaseUtilService.openUrl(`${url}/product/${item.mallId}/${item.product_id}`)
        } catch (error) {
          this.$message.error(`打开失败`)
        }
      } else {
        let extra_info = item.extra_info && JSON.parse(item.extra_info) || {}
        let temp = Object.assign({ productId: item.goods_id }, extra_info)
        let goods = getGoodsUrl(item.source, temp)
        this.$BaseUtilService.openUrl(goods.url)
      }
    },
    copy(str) {
      copyText(str)
    },
    async enterCategory(type = 0, row = null) {
      this.goodsCurrent = row
      this.categoryVisible = true
    },
    categoryChange(val) {
      console.log('categoryChange', val, this.goodsCurrent)
      if (val) {
        let categoryList = val.categoryList
        let category = categoryList[categoryList.length - 1]
        let categoryName = category && `${category.category_name}(${category.category_cn_name})` || ''
        if (this.goodsCurrent && this.goodsCurrent.id) {
          let index = this.taskSetTimeTable.findIndex(son => son.id === this.goodsCurrent.id)
          this.taskSetTimeTable[index]['categoryName'] = categoryName
          this.$set(this.taskSetTimeTable[index], 'categoryName', categoryName)
          this.goodsClassName[this.taskSetTimeTable[index].category_id] = categoryName
        }
      }
      let tableDom = this.$refs.taskSetTimeTable
      let scrollTop = tableDom && tableDom.scrollTop
      this.isRefreshTable = false
      this.$nextTick(() => {
        this.isRefreshTable = true
        this.$nextTick(() => {
          let tableDom = this.$refs.taskSetTimeTable
          tableDom.scrollTop = scrollTop
        })
      })
      this.categoryVisible = false
    }
  }

}
</script>

<style lang="less" scoped>
.goToGoods {
  display: block;
  width: 90px;
  white-space: nowrap;
  cursor: pointer;
  line-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    color: #ff0000;
  }
}

</style>