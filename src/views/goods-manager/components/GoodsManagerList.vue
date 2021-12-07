<template>
  <el-row class="contaniner">
    <el-row class="header">
      <ul style="margin-bottom:5px">
        <storeChoose @changeMallList="changeMallList" />
        <el-button
          type="primary"
          size="mini"
          @click="isFold = !isFold"
        >{{ isFold?'折叠':'展开' }}</el-button>
      </ul>
      <ul v-if="isFold" style="margin-bottom:5px">
        <li class="data">
          <el-card shadow="never">
            <div slot="header" class="clearfix">
              <span>商品数据相关</span>
            </div>
            <ul style="margin-bottom:3px">
              <li class="data-input">
                <el-form label-position="right" label-width="60px">
                  <el-form-item label="销售量：">
                    <el-input size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />-
                    <el-input size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />
                  </el-form-item>
                  <el-form-item label="访客量：">
                    <el-input size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />-
                    <el-input size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />
                  </el-form-item>
                  <el-form-item label="价格：">
                    <el-input size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />-
                    <el-input size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />
                  </el-form-item>
                  <el-form-item label="商品数量：">
                    <el-input size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />-
                    <el-input size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />
                  </el-form-item>
                  <el-form-item label="评星数：">
                    <el-input size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />-
                    <el-input size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />
                  </el-form-item>
                </el-form>
              </li>
              <li>
                <el-form label-position="right" label-width="60px">
                  <el-form-item label="是否售空：">
                    <el-select
                      v-model="sellStatus"
                      size="mini"
                      filterable
                    >
                      <el-option :value="0" label="全部" />
                      <el-option
                        v-for="(item,index) in sellStatusList"
                        :key="index"
                        :value="item.value"
                        :label="item.label"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="商品状态：">
                    <el-select
                      v-model="goodsStatus"
                      size="mini"
                      filterable
                      multiple
                      collapse-tags
                      @change="changeSelect($event, 'goodsStatus')"
                    >
                      <el-option
                        :value="0"
                        label="全部"
                        @click.native="selectAll('goodsStatus', goodsStatusList)"
                      />
                      <el-option
                        v-for="(item,index) in goodsStatusList"
                        :key="index"
                        :value="item.value"
                        :label="item.label"
                      />
                    </el-select>

                  </el-form-item>
                  <el-form-item label="上家来源：">
                    <el-select
                      v-model="source"
                      size="mini"
                      filterable
                      multiple
                      collapse-tags
                      @change="changeSelect($event, 'source')"
                    >
                      <el-option
                        :value="0"
                        label="全部"
                        @click.native="selectAll('source', sourceList)"
                      />
                      <el-option
                        v-for="(item,index) in sourceList"
                        :key="index"
                        :value="item.value"
                        :label="item.label"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="更新时间：">
                    <el-date-picker
                      unlink-panels
                      size="mini"
                      type="daterange"
                      range-separator="-"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                    />
                  </el-form-item>
                  <el-form-item label="创建时间：">
                    <el-date-picker
                      unlink-panels
                      size="mini"
                      type="daterange"
                      range-separator="-"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                    />
                  </el-form-item>
                </el-form>
              </li>
            </ul>
            <ul style="margin-bottom:3px">
              <li>
                <el-checkbox
                  v-model="checked"
                  style="margin-right:3px"
                >单店查询商品数量</el-checkbox>
                <el-input
                  size="mini"
                  style="width:105px"
                  onkeyup="value=value.replace(/[^\d]/g,'')"
                />
              </li>
              <li class="data-goods">
                <el-input
                  size="mini"
                  class="input-with-select"
                  clearable
                >
                  <el-select
                    slot="prepend"
                    v-model="goodsTypeSelect"
                  >
                    <el-option
                      v-for="(item, index) in goodsTypeSelectList"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-input>
              </li>
            </ul>
            <ul style="margin-bottom:3px">
              <el-button
                type="primary"
                size="mini"
                style="margin-right:3px"
                @click="categoryVisible = true"
              >选择类目</el-button>
              <el-input
                size="mini"
                style="width:455px"
                onkeyup="value=value.replace(/[^\d]/g,'')"
              />
            </ul>
            <ul style="margin-bottom:3px">
              <el-button
                type="primary"
                size="mini"
              >一键查询100小时以上无流量商品</el-button>
              <el-button type="primary" size="mini">一键查询200小时以上无流量商品</el-button>
              <el-button type="primary" size="mini" :disabled="true">商品一键翻新1</el-button>
            </ul>
            <ul>
              <el-button type="primary" size="mini" :disabled="true">同步上家库存1</el-button>
              <el-button type="primary" size="mini" :disabled="true">商品搬迁1</el-button>
              <el-button type="primary" size="mini">批量确认</el-button>
              <el-button
                type="primary"
                size="mini"
                :loading="queryLoding"
                @click="queryData"
              >查询数据</el-button>
              <el-checkbox
                v-model="showConsole"
                style="margin-left:10px"
              >隐藏日志</el-checkbox>
            </ul>
          </el-card>
        </li>
        <li class="operation">
          <el-card shadow="never">
            <div slot="header" class="clearfix">
              <span>操作选项</span>
            </div>
            <ul style="margin-bottom:3px">
              <el-button type="primary" size="mini">批量删除</el-button>
              <el-button type="primary" size="mini">批量下架</el-button>
              <el-button type="primary" size="mini">批量编辑标题</el-button>
              <el-button type="primary" size="mini">取消操作</el-button>
              <el-button type="primary" size="mini">批量修改类目属性</el-button>
            </ul>
            <ul style="margin-bottom:3px">
              <el-button type="primary" size="mini">货源查找</el-button>
              <el-button type="primary" size="mini">批量上架</el-button>
              <el-button type="primary" size="mini">批量编辑描述</el-button>
              <el-button type="primary" size="mini">导出数据</el-button>
              <el-button type="primary" size="mini">一键查询禁卖商品</el-button>
            </ul>
            <ul>
              <li class="operation-input">
                <el-form label-position="right" label-width="60px">
                  <el-form-item label="商品库存：">
                    <el-input size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />
                  </el-form-item>
                  <el-form-item label="商品价格：">
                    <el-input class="mini-input" size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" /> % +
                    <el-input class="mini-input" size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />
                  </el-form-item>
                  <el-form-item label="发货天数：">
                    <el-input size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />
                  </el-form-item>
                  <el-form-item label="物流方式：">
                    <!-- <el-select
                      size="mini"
                      filterable
                    >
                      <el-option value="" label="全部" />
                      <el-option
                        v-for="(item,index) in 4"
                        :key="index"
                      />
                    </el-select> -->
                  </el-form-item>
                  <el-form-item label="商品重量：">
                    <el-input style="width:102px" size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" />
                    <span class="red-span" style="margin-left:3px">kg</span>
                  </el-form-item>
                  <div>
                    <el-radio v-model="radio" label="1">免运</el-radio>
                    <el-radio v-model="radio" label="2">运费由买家承担</el-radio>
                  </div>
                  <el-form-item label="商品尺寸：">
                    <el-input class="mini-input item" size="mini" placeholder="长" onkeyup="value=value.replace(/[^\d]/g,'')" />*
                    <el-input class="mini-input item" size="mini" placeholder="宽" onkeyup="value=value.replace(/[^\d]/g,'')" />*
                    <el-input class="mini-input item" size="mini" placeholder="高" onkeyup="value=value.replace(/[^\d]/g,'')" />
                  </el-form-item>
                </el-form>
              </li>
              <li class="operation-but">
                <ul style="margin-bottom:3px">
                  <el-button type="primary" size="mini">批量更新库存</el-button>
                  <span class="red-span">（0，表示库存设置为0）</span>
                </ul>
                <ul style="margin-bottom:3px">
                  <el-button type="primary" size="mini">批量更新价格</el-button>
                  <span class="red-span">（加价公式：原价+原价*百分比+数值）</span>
                </ul>
                <ul style="margin-bottom:3px">
                  <el-button type="primary" size="mini">批量更新天数</el-button>
                  <span class="red-span">（最长30天）</span>
                </ul>
                <ul style="margin-bottom:3px">
                  <el-popover placement="right" width="400" trigger="click">
                    aa
                    <el-button slot="reference" type="primary" size="mini">批量更新物流方式</el-button>
                  </el-popover>
                  <span class="red-span">（请先至商家后台开启对应物流方式）</span>
                </ul>
                <ul style="margin-bottom:3px">
                  <el-button type="primary" size="mini">批量更新重量</el-button>
                  <span class="red-span">（必须大于0kg）</span>
                </ul>
                <ul style="margin-bottom:3px">
                  <el-button type="primary" size="mini">批量更新运费</el-button>
                  <span class="red-span">（只能更改当前商品已开启的物流）</span>
                </ul>
                <ul>
                  <el-button type="primary" size="mini">批量修改商品尺寸</el-button>
                </ul>
              </li>
            </ul>
          </el-card>
        </li>
        <li class="progress">
          <el-card shadow="never">
            <div slot="header" class="clearfix">
              <span>操作进度相关</span>
            </div>
            <ul>
              <el-progress :text-inside="true" :stroke-width="24" :percentage="100" status="success" />
            </ul>
            <ul>
              <li>
                <el-form label-position="right" label-width="60px">
                  <el-form-item label="查询数量：">
                    <!-- {{}} -->
                  </el-form-item>
                  <el-form-item label="更新数量：">
                    <!-- {{}} -->
                  </el-form-item>
                  <el-form-item label="成功数量：">
                    <!-- {{}} -->
                  </el-form-item>
                  <el-form-item label="失败数量：">
                    <!-- {{}} -->
                  </el-form-item>
                </el-form>
              </li>
            </ul>
          </el-card>
        </li>
      </ul>
      <ul v-if="isFold">
        <span class="red-span">说明：库存公式：设置后的库存 = 原库存 +（填写的库存）；如果填写的库存为零将会把商品的库存置为0； 价格公式：设置后的价格 = 原价 +（原价*填写的百分比）+（填写的价格）</span>
      </ul>
    </el-row>
    <el-row id="article">
      <el-table
        ref="plTable"
        v-loading="isShowLoading"
        height="calc(100vh - 440px)"
        :data="tableData"
        :header-cell-style="{
          backgroundColor: '#f5f7fa',
        }"
      >
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="50"
        />
        <el-table-column align="center" min-width="120" label="站点">
          <template v-slot="{row}">
            {{ row.country | chineseSite }}
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="120" label="店铺名" prop="mallName" />
        <el-table-column align="center" min-width="120" label="主图" />
        <el-table-column align="center" min-width="120" label="上家类型" />
        <el-table-column align="center" min-width="120" label="上家链接" />
        <el-table-column align="center" min-width="120" label="itemID" />
        <el-table-column align="center" min-width="120" label="价格" />
        <el-table-column align="center" min-width="120" label="库存" />
        <el-table-column align="center" min-width="120" label="标题" />
        <el-table-column align="center" min-width="120" label="状态" />
        <el-table-column align="center" min-width="120" label="创建时间" />
        <el-table-column align="center" min-width="120" label="更新时间" />
        <el-table-column align="center" min-width="120" label="销售量" />
        <el-table-column align="center" min-width="120" label="访客量" />
        <el-table-column align="center" min-width="120" label="评星数" />
        <el-table-column align="center" min-width="120" label="粉丝量" />
        <el-table-column align="center" min-width="120" label="操作状态" />
      </el-table>
    </el-row>
    <div class="logging">
      <Logs ref="Logs" v-model="showConsole" clear />
    </div>
    <!-- 类目映射弹窗 -->
    <el-dialog
      v-if="categoryVisible"
      class="category-dialog"
      title="类目映射"
      :visible.sync="categoryVisible"
      width="800px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <category-choose ref="goodsCategory" :level="3" :is-column="false" @setCategory="setCategory" />
    </el-dialog>
  </el-row>
</template>

<script>
import GoodsList from '../../../module-api/goods-manager-api/goods-list'
import StoreChoose from '../../../components/store-choose'
import CategoryChoose from '../../../components/category-choose.vue'
import { exportExcelDataCommon } from '../../../util/util'
import { batchOperation } from '../../../util/util'
export default {
  components: {
    StoreChoose,
    CategoryChoose
  },
  data() {
    return {
      isFold: true,
      isShowLoading: false,
      showConsole: true,
      categoryVisible: false,
      queryLoding: false,
      radio: '',
      checked: false,
      GoodsList: new GoodsList(this),

      selectMallList: '', // 选择的店铺分组数据
      tableData: [], // 表格数据

      pageNumber: 1,
      pageSize: 48,

      sellStatus: 0, // 是否售空
      goodsStatus: 0, // 商品状态
      goodsTypeSelect: 1, //
      source: 0, // 上家来源
      sellStatusList: [
        { value: 1, label: '售空' },
        { value: 2, label: '非售空' }
      ],
      goodsStatusList: [
        { value: 1, label: '正常' },
        { value: 2, label: '审核中' },
        { value: 3, label: '禁卖下架' },
        { value: 4, label: '已售完' },
        { value: 5, label: '待上架' },
        { value: 6, label: '禁卖shopee官方删除' },
        { value: 7, label: '已压制' }
      ],
      goodsTypeSelectList: [
        { value: 1, label: '商品名称' },
        { value: 2, label: '主商品货号' },
        { value: 3, label: '商品规格货号' },
        { value: 4, label: '商品编号' },
        { value: 5, label: '上家商品ID' }
      ],
      sourceList: [
        { value: 1, label: '拼多多' },
        { value: 2, label: '淘宝' },
        { value: 3, label: '天猫' },
        { value: 5, label: '自有' },
        { value: 8, label: '1688' },
        { value: 9, label: 'Lazada' },
        { value: 10, label: '京喜' },
        { value: 11, label: 'Shopee' },
        { value: 12, label: 'aliexpress' },
        { value: 13, label: '天猫淘宝海外平台' },
        { value: 15, label: '货老板海外' }
      ]
    }
  },
  async mounted() {
    this.selectAll('goodsStatus', this.goodsStatusList)
    this.selectAll('source', this.sourceList)
  },
  methods: {
    // 查询数据
    async queryData() {
      if (!this.selectMallList.length) {
        return this.$message.warning('请选择店铺')
      }
      this.tableData = []
      this.$refs.Logs.consoleMsg = ''
      this.queryLoding = true
      this.showConsole = false
      this.$refs.Logs.writeLog(`开始查询...`, true)
      // for (let i = 0; i < this.selectMallList.length; i++) {
      //   const element = this.selectMallList[i]
      //   const mallData = element
      //   const pageNumber = 1
      //   const pageSize = 48
      //   await this.getMpskuList(pageNumber, pageSize, mallData)
      // }
      const res = await batchOperation(this.selectMallList, this.getMpskuList)
      this.queryLoding = false
      this.$refs.Logs.writeLog(`查询完成`, true)
    },
    async getMpskuList(item, count = { count: 1 }) {
      const mallName = item.mall_alias_name || item.platform_mall_name
      try {
        console.log(this.queryLoding)
        const res = await this.GoodsList.getMpskuList(this.pageNumber, this.pageSize, item)
        if (res.code === 200) {
          res.data.list.map(listItem => {
            listItem.country = item.country
            listItem.mallName = mallName
            this.tableData.push(listItem)
          })
          console.log('list', res.data.list)
          this.$refs.Logs.writeLog(`查询店铺【${mallName}】第【${this.pageNumber}】页数据：${res.data.list.length}`, true)
          if (res.data.list.length >= this.pageSize) {
            this.pageNumber++
            await this.getMpskuList(item, count = { count: 1 })
          }
        } else if (res.code === 403) {
          this.$refs.Logs.writeLog(`店铺【${mallName}】未登录，请登录后再查询`, false)
        } else if (res.code === 0) {
          this.$refs.Logs.writeLog(`店铺【${mallName}】异常，请检查代理`, false)
        } else {
          this.$refs.Logs.writeLog(`店铺【${mallName}】，${res.data}`, false)
        }
      } catch (e) {
        this.$refs.refs.writeLog(`店铺【${mallName}】数据获取异常`, false)
      } finally {
        count.count--
      }
    },
    // 获取数据
    // async getMpskuList(pageNumber, pageSize, mallData) {
    //   console.log(this.queryLoding)
    //   const mallName = mallData.mall_alias_name || mallData.platform_mall_name
    //   const res = await this.GoodsList.getMpskuList(pageNumber, pageSize, mallData)
    //   if (res.code === 200) {
    //     res.data.list.map(item => {
    //       item.country = mallData.country
    //       item.mallName = mallName
    //       this.tableData.push(item)
    //     })
    //     console.log('list', res.data.list)
    //     this.$refs.Logs.writeLog(`查询店铺【${mallName}】第【${pageNumber}】页数据：${res.data.list.length}`, true)
    //     if (res.data.list.length >= pageSize) {
    //       pageNumber++
    //       await this.getMpskuList(pageNumber, pageSize, mallData)
    //     }
    //   } else if (res.code === 403) {
    //     this.$refs.Logs.writeLog(`店铺【${mallName}】未登录，请登录后再查询`, false)
    //   } else if (res.code === 0) {
    //     this.$refs.Logs.writeLog(`店铺【${mallName}】异常，请检查代理`, false)
    //   } else {
    //     this.$refs.Logs.writeLog(`店铺【${mallName}】，${res.data}`, false)
    //   }
    // },
    // 全选
    selectAll(key, baseData) {
      if (this[key].length < baseData.length) {
        this[key] = []
        this[key].push(0)
        baseData.map((item) => {
          this[key].push(item.value)
        })
      } else {
        this[key] = []
      }
    },
    changeSelect(val, key) {
      if (!val.includes(0) && val.length === this[key].length) {
        console.log('')
      } else if (val.includes(0) && val.length - 1 < this[key].length) {
        this[key] = this[key].filter((item) => {
          return item !== 0
        })
      }
    },
    // 打开外部链接
    async openUrl(url) {
      try {
        await this.$BaseUtilService.openUrl(url)
      } catch (error) {
        this.$message.error(`打开链接【${url}】失败`)
      }
    },
    setCategory(val) {
      console.log(val)
    },
    changeMallList(val) {
      this.selectMallList = val
      console.log('changeMallList', val)
    },
    handleSizeChange(val) {
      this.page = 1
      this.pageSize = val
      // this.getStock()
    },
    handleCurrentChange(val) {
      this.page = val
      // this.getStock()
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../module-less/goods-manager-less/goods-list.less';
</style>
