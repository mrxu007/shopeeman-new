<template>
  <el-row class="contaniner">
    <el-row class="header">
      <ul>
        <li>
          <span>仓库名称：</span>
          <el-select
            v-model="form.wid"
            size="mini"
            filterable
          >
            <el-option :value="'0'" label="全部" />
            <el-option
              v-for="(item, index) in widList"
              :key="index"
              :value="item.id"
              :label="item.warehouse_name"
            />
          </el-select>
        </li>
        <li class="status">
          <span>商品状态：</span>
          <el-select
            v-model="form.status"
            size="mini"
            filterable
          >
            <el-option :value="''" label="全部" />
            <el-option
              v-for="(item, index) in statusList"
              :key="index"
              :value="item.value"
              :label="item.label"
            />
          </el-select>
        </li>
        <li>
          <span>系统商品编号：</span>
          <el-input
            v-model="form.sys_sku_id"
            clearable
            size="mini"
            oninput="value=value.replace(/\s+/g,'')"
          />
        </li>
        <li>
          <el-button
            type="primary"
            size="mini"
            @click="
              page =1
              stockSharedList()"
          >搜 索</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="exportTableData"
          >导出数据</el-button>
        </li>
      </ul>
    </el-row>
    <el-row id="article">
      <el-table
        ref="plTable"
        v-loading="isShowLoading"
        height="calc(100vh - 165px)"
        :data="tableData"
        :header-cell-style="{
          backgroundColor: '#f5f7fa',
        }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          align="center"
          type="selection"
          width="50"
        />
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="50"
        />
        <el-table-column
          label="仓库名称"
          align="center"
          min-width="130"
          prop="warehouse_name"
        />
        <el-table-column
          prop="sys_sku_id"
          label="系统商品编号"
          min-width="120"
          align="center"
        />
        <el-table-column
          label="商品编号(SkuId)"
          align="center"
          min-width="120"
        >
          <template slot-scope="{row}">
            {{ row.stock && row.stock.sku_id?row.stock.sku_id:'' }}
          </template>
        </el-table-column>
        <el-table-column
          label="商品名称"
          align="center"
          min-width="140"
          show-overflow-tooltip
        >
          <template slot-scope="{row}">
            {{ row.stock && row.stock.goods_name?row.stock.goods_name:'' }}
          </template>
        </el-table-column>
        <el-table-column
          label="商品规格"
          align="center"
          min-width="140"
          show-overflow-tooltip
        >
          <template slot-scope="{row}">
            {{ row.stock && row.stock.sku_name?row.stock.sku_name:'' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          align="center"
          min-width="90"
        >
          <template slot-scope="{row}">
            <span :style="colorObj[row.status] && 'color:'+colorObj[row.status]">{{ row.status ?statusObj[row.status]:'' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="shared_num"
          label="共享库存"
          align="center"
          min-width="70"
        />
        <el-table-column
          prop="consume_num"
          label="可使用库存"
          align="center"
          min-width="80"
        />
        <el-table-column
          label="商品单价(RMB)"
          align="center"
          min-width="110"
        >
          <template slot-scope="{row}">
            {{ row.stock &&row.stock.sku_price ?row.stock.sku_price/100:'' }}
          </template>
        </el-table-column>
        <el-table-column
          width="80"
          align="center"
          label="商品图片"
        >
          <template slot-scope="{row}">
            <el-tooltip
              v-if="row.stock.sku_image || row.stock.real_image_url"
              effect="light"
              placement="right-end"
              :visible-arrow="false"
              :enterable="false"
              style="width: 50px; height: 50px"
            >
              <div slot="content">
                <el-image
                  style="width: 400px; height: 400px"
                  :src="row.stock.sku_image || row.stock.real_image_url"
                >
                  <div slot="error" class="image-slot" />
                </el-image>
              </div>
              <el-image
                style="width: 40px; height: 40px"
                :src="row.stock.sku_image || row.stock.real_image_url"
              >
                <div slot="error" class="image-slot" />
              </el-image>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          label="绑定用户"
          align="center"
          min-width="130"
        >
          <template slot-scope="{row}">
            <el-button
              size="mini"
              type="primary"
              @click="getSharedUserList(row)"
            >查看绑定用户</el-button>
          </template>
        </el-table-column>
        <el-table-column
          min-width="130"
          align="center"
          label="商品链接"
        >
          <template slot-scope="{row}">
            <el-button
              v-if="row.stock.sku_url"
              type="primary"
              size="mini"
              @click="openUrl(row.stock.sku_url)"
            >查看商品链接</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          min-width="170"
        >
          <template slot-scope="{row}">
            <div v-if="row.status===1">
              <el-button
                size="mini"
                type="primary"
                @click="bindUser(row)"
              >绑定用户</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="delSharedInventory(row)"
              >撤 销</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          :current-page="page"
          :page-sizes="[30, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-row>
    <!-- 共享库存绑定用户弹窗 -->
    <el-dialog
      class="shared-user-dialog"
      title="共享库存绑定用户"
      :visible.sync="sharedUserVisible"
      width="550px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-table
        v-loading="sharedUserLoading"
        height="420"
        :data="sharedUserData"
        :header-cell-style="{
          backgroundColor: '#f5f7fa',
        }"
        :row-style="{
          color: 'black',
          height: '50px',
        }"
      >
        <el-table-column
          width="50"
          align="center"
          type="index"
          label="序号"
        />
        <el-table-column
          prop="platform_id"
          width="150"
          align="center"
          label="平台名称"
        >
          <template slot-scope="{row}">
            {{ row.platform_id?platformObj[row.platform_id]:'' }}
          </template>
        </el-table-column>
        <el-table-column
          width="150"
          align="center"
          label="用户名称"
          prop="username"
        />
        <el-table-column
          width="150"
          align="center"
          label="操作"
          prop="sku_id"
        >
          <template slot-scope="{row}">
            <el-button
              type="primary"
              size="mini"
              @click="delbindUser(row)"
            >删除用户</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 添加共享库存绑定用户弹窗 -->
    <el-dialog
      class="bind-user-dialog"
      title="添加共享库存绑定用户"
      :visible.sync="bindUserVisible"
      width="300px"
      :show-close="!addBindUserLoading"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="bindUserClose"
    >
      <ul>
        <li style="margin-bottom: 15px;">
          <span>共享平台：</span>
          <el-select
            v-model="platformUserFrom.platform_ids"
            size="mini"
            filterable
          >
            <el-option
              value=""
              label="请选择平台"
            />
            <el-option
              v-for="(item,index) in platformList"
              :key="index"
              :value="item.value"
              :label="item.label"
            />
          </el-select>
        </li>
        <li style="margin-bottom: 15px;">
          <span>用户名称：</span>
          <el-input
            v-model="platformUserFrom.username"
            clearable
            size="mini"
            oninput="value=value.replace(/\s+/g,'')"
          />
        </li>
        <li>
          <el-button
            type="primary"
            size="mini"
            :loading="addBindUserLoading"
            @click="addSharedBindUser"
          >添 加</el-button>
        </li>
      </ul>
    </el-dialog>
  </el-row>
</template>

<script>
import ShareBroadStock from '../../../module-api/smart-house-api/share-broad-stock'
import { exportExcelDataCommon } from '../../../util/util'
export default {
  data() {
    return {
      isShowLoading: false,
      sharedUserLoading: false,
      addBindUserLoading: false,
      sharedUserVisible: false,
      bindUserVisible: false,
      ShareBroadStock: new ShareBroadStock(this),

      total: 0,
      pageSize: 30,
      page: 1,

      tableData: [], // 表格数据
      multipleSelection: [], // 选择数据
      widList: [], // 仓库数据
      sharedUserData: [], // 共享库存绑定用户数据

      form: { // 条件搜索
        wid: '0', // 仓库ID
        sys_sku_id: '', // sku
        status: '' // 1正常 2已完成 3弃用
      },
      platformUserFrom: { // 查询平台用户
        username: '',
        platform_ids: ''
      },
      addBindUserFrom: {
        shared_id: '',
        userList: []
      },
      delBindUserFrom: {
        shared_id: '',
        app_uid_list: []
      },
      platformList: [
        {
          value: '1',
          label: '莱赞'
        },
        {
          value: '2',
          label: 'ShopeeMan'
        },
        {
          value: '14',
          label: '店梯货代'
        }
      ],
      statusList: [
        {
          value: 1,
          label: '正常'
        },
        {
          value: 2,
          label: '已完成'
        },
        {
          value: 3,
          label: '弃用'
        }
      ],

      statusObj: {
        1: '正常',
        2: '已完成',
        3: '弃用'
      },
      platformObj: {
        '1': '莱赞',
        '2': 'ShopeeMan',
        '14': '店梯货代'
      },
      colorObj: {
        1: 'green',
        3: 'red'
      }
    }
  },
  async mounted() {
    // 获取仓库
    await this.getOverseasWarehouse()
    // 获取数据
    await this.stockSharedList()
  },
  methods: {
    // 打开外部链接
    async openUrl(url) {
      try {
        await this.$BaseUtilService.openUrl(url)
      } catch (error) {
        this.$message.error(`打开链接【${url}】失败`)
      }
    },
    // 撤销共享库存
    async delSharedInventory(row) {
      const { id, wid, app_uid } = row
      const parmas = {}
      parmas['app_uid'] = app_uid
      parmas['shared_id'] = id
      parmas['wid'] = wid
      const res = await this.ShareBroadStock.delSharedInventory(parmas)
      if (res.code === 200) {
        this.$message.success('撤销成功')
        this.stockSharedList()
      } else {
        this.$message.error(res.data)
      }
    },
    // 删除绑定用户
    async delbindUser(row) {
      this.delBindUserFrom['app_uid_list'] = []
      const { app_uid, platform_id, username } = row
      const obj = {
        app_uid: app_uid,
        platform_id: platform_id,
        username: username
      }
      this.delBindUserFrom['app_uid_list'].push(obj)
      const res = await this.ShareBroadStock.delbindUser(this.delBindUserFrom)
      if (res.code === 200) {
        this.$message.success('删除成功')
        this.sharedUserData = this.sharedUserData.splice(this.sharedUserData.findIndex(item => item.app_uid === app_uid && item.username === username), -1)
      } else {
        this.$message.error(res.data)
      }
    },
    // 绑定用户
    bindUser(row) {
      this.bindUserVisible = true
      this.addBindUserFrom['shared_id'] = row.id
    },
    // 添加绑定用户
    async addSharedBindUser() {
      this.addBindUserFrom['userList'] = []
      if (!this.platformUserFrom.platform_ids) return this.$message('请先选择共享平台')
      if (!this.platformUserFrom.username) return this.$message('请输入用户名称')
      this.addBindUserLoading = true
      // 查询平台用户
      const res1 = await this.ShareBroadStock.getBindUser(this.platformUserFrom)
      if (res1.code === 200) {
        if (res1.data?.length > 0) {
          const parmas = {
            app_uid: res1.data[0].app_uid,
            platform_id: this.platformUserFrom.platform_ids,
            username: this.platformUserFrom.username
          }
          this.addBindUserFrom['userList'].push(parmas)
          const res2 = await this.ShareBroadStock.addSharedBindUser(this.addBindUserFrom)
          if (res2.code === 200) {
            this.$message.success('绑定成功')
          } else {
            this.$message.error(res2.data)
          }
        } else {
          this.$message('未查询到用户')
        }
      } else {
        this.$message.error(res1.data)
      }
      this.addBindUserLoading = false
    },
    // 查看绑定用户
    async getSharedUserList(row) {
      this.sharedUserVisible = true
      this.sharedUserLoading = true
      const { id, app_uid } = row
      this.delBindUserFrom['shared_id'] = id
      const obj = {
        shared_id: id,
        app_uid: app_uid
      }
      const res = await this.ShareBroadStock.getSharedUserList(obj)
      if (res.code === 200) {
        this.sharedUserData = res.data
        console.log('sharedUserData', this.sharedUserData)
      } else {
        this.$message.error(res.data)
      }
      this.sharedUserLoading = false
    },
    // 获取数据
    async stockSharedList() {
      this.isShowLoading = true
      this.form.page = this.page
      this.form.page_num = this.pageSize
      const res = await this.ShareBroadStock.stockSharedList(this.form)
      if (res.code === 200) {
        this.tableData = res.data.data
        this.total = res.data.total
        for (let index = 0; index < this.tableData.length; index++) {
          const element = this.tableData[index]
          // 获取海外仓库中文名
          const resName = await this.ShareBroadStock.overseasWh(element.wid)
          if (resName.code === 200) {
            this.$set(element, 'warehouse_name', resName.data)
          }
        }
        console.log('tableData', this.tableData)
      } else {
        this.$message.error(res.data)
      }
      this.isShowLoading = false
    },
    // 获取仓库
    async getOverseasWarehouse() {
      const myMap = new Map()
      const res = await this.ShareBroadStock.getOverseasWarehouse()
      if (res.code === 200) {
        res.data.forEach(item => {
          this.widList = this.widList.concat(item.child)
        })
      } else {
        this.$message.error(res.data)
      }
      this.widList = this.widList.filter((item) => !myMap.has(item.id) && myMap.set(item.id, 1))
    },
    // 导出数据
    async exportTableData() {
      if (this.total === 0) return this.$message('暂无导出数据')
      this.isShowLoading = true
      const exportData = []
      const params = this.form
      params.pageSize = this.pageSize
      params.page = 1
      while (exportData.length < this.total) {
        const res = await this.ShareBroadStock.stockSharedList(params)
        if (res.code === 200) {
          const resData = res.data.data
          resData.forEach(async item => {
            const resName = await this.ShareBroadStock.overseasWh(item.wid)
            if (resName.code === 200) {
              item.warehouse_name = resName.data
            }
            exportData.push(item)
          })
          params.page++
        } else {
          this.$message.error('导出数据错误', res.data)
          this.isShowLoading = false
          break
        }
      }
      let str = `<tr>
          <td>仓库名称</td>
          <td>系统商品编号</td>
          <td>商品编号</td>
          <td>商品名称</td>
          <td>商品规格</td>
          <td>状态</td>
          <td>共享库存</td>
          <td>可使用库存</td>
          <td>商品单价(RMB)</td>
          <td>商品图片</td>
          <td>商品链接</td>
        </td>`
      exportData.forEach(async item => {
        str += `<tr>
        <td>${item.warehouse_name ? item.warehouse_name : '' + '\t'}</td>
        <td>${item.sys_sku_id ? item.sys_sku_id : '' + '\t'}</td>
        <td>${item.stock && item.stock.sku_id ? item.stock.sku_id : '' + '\t'}</td>
        <td>${item.stock && item.stock.goods_name ? item.stock.goods_name : '' + '\t'}</td>
        <td>${item.stock && item.stock.sku_name ? item.stock.sku_name : '' + '\t'}</td>
        <td>${this.statusObj[item.status] ? this.statusObj[item.status] : '' + '\t'}</td>
        <td>${item.shared_num ? item.shared_num : '' + '\t'}</td>
        <td>${item.consume_num ? item.consume_num : '' + '\t'}</td>
        <td>${item.stock && item.stock.sku_price ? item.stock.sku_price / 100 : '' + '\t'}</td>
        <td>${item.stock.sku_image || item.stock.real_image_url + '\t'}</td>
         <td>${item.stock && item.stock.sku_url ? item.stock.sku_url : '' + '\t'}</td>
        </tr>`
      })
      this.isShowLoading = false
      exportExcelDataCommon('海外共享库存管理数据', str)
    },
    handleSizeChange(val) {
      this.page = 1
      this.pageSize = val
      this.stockSharedList()
    },
    handleCurrentChange(val) {
      this.page = val
      this.stockSharedList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    bindUserClose() {
      this.platformUserFrom['username'] = ''
      this.platformUserFrom['platform_ids'] = ''
      this.addBindUserFrom['shared_id'] = ''
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../module-less/smart-house-less/share-broad-stock.less';
</style>
