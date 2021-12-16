<template>
  <el-row class="contaniner">
    <el-row class="header">
      <ul style="margin-bottom: 10px">
        <li>
          <span>站点：</span>
          <el-select v-model="site" size="mini" filterable>
            <el-option v-for="(item,index) in siteList" :key="index" :value="item.value" :label="item.label" />
          </el-select>
        </li>
        <li>
          <span>店铺分组：</span>
          <el-select v-model="group" placeholder="请选择分组" multiple collapse-tags clearable size="medium" filterable>
            <el-option v-if="selectall" label="全部" :value="0" />
            <el-option v-if="!selectall" label="全部" :value="-2" />
            <el-option v-for="(item, index) in gruopList" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </li>
        <li>
          <span>店铺：</span>
          <el-select v-model="mall" placeholder="请选择店铺" multiple collapse-tags clearable size="medium" filterable>
            <el-option v-if="selectall1" label="全部" :value="0" />
            <el-option v-if="!selectall1" label="全部" :value="-2" />
            <el-option v-for="(item, index) in mallList" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </li>
        <li>
          <span>统计时间：</span>
          <el-select v-model="Statisticaltime" placeholder="" size="mini" filterable>
            <el-option v-for="(item, index) in returnStatisticaltime" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </li>
        <li>
          <span>订单类型：</span>
          <el-select v-model="Status" placeholder="" size="mini" filterable>
            <el-option v-for="(item, index) in returnStatusList" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </li>
        <li>
          <el-button type="primary" :disabled="Loading1" size="mini" @click="getallinfo">搜索</el-button>
        </li>
      </ul><br>
      <div style="border:1px solid black;width:100%">
        <span style="margin-left:20px">客服数据</span>
        <el-table
          ref="plTable"
          v-loading="Loading3"
          style="margin-top:10px"
          header-align="center"
          height="calc(100vh - 140px)"
          :data="tableData1"
          :header-cell-style="{
            backgroundColor: '#f5f7fa',
          }"
        >
          <el-table-column align="center" label="店铺名称" width="280" prop="mallname" sortable />
          <el-table-column align="center" prop="buyers" label="买家总数" width="280" sortable>
            <template slot-scope="{ row }">
              <div v-html="row.buyers" />
            </template>
          </el-table-column>
          <el-table-column align="center" prop="new_buyers" label="新买家数量" width="280" sortable>
            <template slot-scope="{ row }">
              <div v-html="row.new_buyers" />
            </template>
          </el-table-column>
          <el-table-column prop="existing_buyers" label="现有买家" width="280" align="center" sortable>
            <template slot-scope="{ row }">
              <div v-html="row.existing_buyers" />
            </template>
          </el-table-column>
          <el-table-column prop="potential_buyers" label="潜在买家" width="280" align="center" sortable>
            <template slot-scope="{ row }">
              <div v-html="row.potential_buyers" />
            </template>
          </el-table-column>
          <el-table-column prop="repeat_purchase_rate" label="重复购买率" width="280" align="center" sortable>
            <template slot-scope="{ row }">
              <div v-html="row.repeat_purchase_rate" />
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-row>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      Loading1: false,
      Loading3: false,
      selectall: true, // 分组全选和取消全选选项控制
      selectall1: true, // 店铺全选和取消全选选项控制
      allgroupid: [],
      allmallid: [],
      tableData1: [],
      errmall: [],
      Status: 'palced',
      total: 0,
      Statisticaltime: 'real_time',
      site: 'TH', // 站点
      siteList: this.$filters.countries_option, // 所有站点
      group: 0, // 分组
      gruopList: [],
      mall: [], // 店铺
      mallList: [],
      start_time: 1634659200,
      end_time: 1634695200,
      returnStatisticaltime: [
        { value: 'real_time', label: '实时' },
        { value: 'yesterday', label: '昨日' },
        { value: 'past7days', label: '近7天' },
        { value: 'past30days', label: '近30天' }
      ],
      returnStatusList: [
        { value: 'palced', label: '下单' },
        { value: 'confirmed', label: '确认订单' },
        { value: 'paid', label: '付费订单' }
      ]
    }
  },
  watch: {
    group(val, oldVal) {
      this.mall = []
      for (let i = 0; i < val.length; i++) {
        if (val[i] === 0) {
          this.group = this.allgroupid
          this.mall = [].concat(this.allmallid)
          this.selectall = false
        } else if (val[i] === -2) {
          this.group = []
          this.mall = []
          this.selectall = true
        } else {
          for (let j = 0; j < this.mallList.length; j++) {
            if (val[i] === this.mallList[j].group_id) {
              this.mall.push(this.mallList[j].value)
            }
          }
        }
      }
    },
    mall(val, oldVal) {
      for (let i = 0; i < val.length; i++) {
        if (val[i] === 0) {
          this.mall = this.allmallid
          this.selectall1 = false
        }
        if (val[i] === -2) {
          this.mall = []
          this.selectall1 = true
        }
      }
    },
    Statisticaltime(val, oldVal) {
      if (val === 'real_time') {
        this.start_time = 1634659200
        this.end_time = 1634695200
      } else if (val === 'yesterday') {
        this.start_time = 1634054400
        this.end_time = 1634659200
      } else if (val === 'past7days') {
        this.start_time = 1634054400
        this.end_time = 1634659200
      } else if (val === 'past30days') {
        this.start_time = 1632067200
        this.end_time = 1634659200
      }
    },
    site(val, oldVal) {
      this.mall = []
      this.group = []
      this.getInfo()
    }
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    // 分组信息查找
    async getInfo() {
      const params = {
        country: this.site,
        mallGroupIds: this.group
      }
      const res = await this.$api.ddMallGoodsGetMallList(params)
      this.mallList = []; this.gruopList = []; this.allgroupid = []; this.allmallid = []
      // console.log('1111111111111111111111', res.data)
      if (res.data.code === 200) {
        res.data.data.forEach(el => {
          if (el.group_id) {
            this.gruopList.push({ label: el.group_name, value: el.group_id })
          }
          if (el.id) {
            this.mallList.push({ label: el.mall_alias_name ? el.mall_alias_name : el.platform_mall_name, value: el.platform_mall_id, group_id: el.group_id })
          }
        })
        for (let i = 0; i < this.gruopList.length - 1; i++) {
          for (let j = i + 1; j < this.gruopList.length; j++) {
            if (this.gruopList[i].value === this.gruopList[j].value) {
              this.gruopList.splice(j, 1)
            }
          }
        }
        for (let i = 0; i < this.gruopList.length; i++) {
          this.allgroupid.push(this.gruopList[i].value)
        }
        for (let i = 0; i < this.mallList.length; i++) {
          this.allmallid.push(this.mallList[i].value)
        }
      } else {
        this.$message.warning('店铺列表获取失败！')
      }
    },
    async getallinfo() {
      this.Loading1 = true
      this.Loading3 = true
      this.tableData1 = []
      this.errmall = []
      if (this.mall.length > 0) {
        for (let i = 0; i < this.mall.length; i++) {
          const params = {
            start_time: this.start_time,
            end_time: this.end_time,
            period: this.Statisticaltime,
            orderType: this.Status,
            // group: this.group,
            mallId: this.mall[i],
            fetag: 'fetag',
            limit: 5
          }
          console.log('this is my parmas', params)
          let mallname
          for (let j = 0; j < this.mallList.length; j++) {
            if (this.mallList[j].value === this.mall[i]) {
              mallname = this.mallList[j].label
            }
          }
          let res = await this.$shopeemanService.getCustomers(this.site, params, { headers: { 'Content-Type': 'application/json; charset=utf-8' }})
          res = JSON.parse(res)
          res.data = JSON.parse(res.data)
          console.log('this is res.data', res)
          if (res.status === 200) {
            if (this.Statisticaltime === 'real_time') {
              for (const item in res.data) {
                if (item === 'buyers') {
                  let arrow = ''
                  if (res.data['buyers_change'] > 0) {
                    arrow = '↑'
                  } else if (res.data['buyers_change'] < 0) {
                    arrow = '↓'
                  }
                  res.data[item] = `<pre>${res.data[item]}
vs 00:00 - 13:00 ${Math.abs(res.data['buyers_change'] * 100).toFixed(2)}% ${arrow}</pre>`
                }
                if (item === 'new_buyers') {
                  let arrow = ''
                  if (res.data['new_buyers_rate'] > 0) {
                    arrow = '↑'
                  } else if (res.data['new_buyers_rate'] < 0) {
                    arrow = '↓'
                  }
                  res.data[item] = `<pre>${res.data[item]}
vs 00:00 - 13:00 ${Math.abs(res.data['new_buyers_rate'] * 100).toFixed(2)}% ${arrow}</pre>`
                }
                if (item === 'existing_buyers') {
                  let arrow = ''
                  if (res.data['existing_buyers_rate'] > 0) {
                    arrow = '↑'
                  } else if (res.data['existing_buyers_rate'] < 0) {
                    arrow = '↓'
                  }
                  res.data[item] = `<pre>${res.data[item]}
vs 00:00 - 13:00 ${Math.abs(res.data['existing_buyers_rate'] * 100).toFixed(2)}% ${arrow}</pre>`
                }
                if (item === 'potential_buyers') {
                  let arrow = ''
                  if (res.data['potential_buyers_change'] > 0) {
                    arrow = '↑'
                  } else if (res.data['potential_buyers_change'] < 0) {
                    arrow = '↓'
                  }
                  res.data[item] = `<pre>${res.data[item]}
vs 00:00 - 13:00 ${Math.abs(res.data['potential_buyers_change'] * 100).toFixed(2)}% ${arrow}</pre>`
                }
                if (item === 'repeat_purchase_rate') {
                  let arrow = ''
                  if (res.data['repeat_purchase_rate_change'] > 0) {
                    arrow = '↑'
                  } else if (res.data['repeat_purchase_rate_change'] < 0) {
                    arrow = '↓'
                  }
                  res.data[item] = `<pre>${(res.data[item] * 100).toFixed(2)}%
vs 00:00 - 13:00 ${Math.abs(res.data['repeat_purchase_rate_change'] * 100).toFixed(2)}% ${arrow}</pre>`
                }
              }
            }
            if (this.Statisticaltime === 'yesterday') {
              for (const item in res.data) {
                if (item === 'buyers') {
                  let arrow = ''
                  if (res.data['buyers_change'] > 0) {
                    arrow = '↑'
                  } else if (res.data['buyers_change'] < 0) {
                    arrow = '↓'
                  }
                  res.data[item] = `<pre>${res.data[item]}
vs 前一天 ${Math.abs(res.data['buyers_change'] * 100).toFixed(2)}% ${arrow}</pre>`
                }
                if (item === 'new_buyers') {
                  let arrow = ''
                  if (res.data['new_buyers_rate'] > 0) {
                    arrow = '↑'
                  } else if (res.data['new_buyers_rate'] < 0) {
                    arrow = '↓'
                  }
                  res.data[item] = `<pre>${res.data[item]}
vs 前一天 ${Math.abs(res.data['new_buyers_rate'] * 100).toFixed(2)}% ${arrow}</pre>`
                }
                if (item === 'existing_buyers') {
                  let arrow = ''
                  if (res.data['existing_buyers_rate'] > 0) {
                    arrow = '↑'
                  } else if (res.data['existing_buyers_rate'] < 0) {
                    arrow = '↓'
                  }
                  res.data[item] = `<pre>${res.data[item]}
vs 前一天 ${Math.abs(res.data['existing_buyers_rate'] * 100).toFixed(2)}% ${arrow}</pre>`
                }
                if (item === 'potential_buyers') {
                  let arrow = ''
                  if (res.data['potential_buyers_change'] > 0) {
                    arrow = '↑'
                  } else if (res.data['potential_buyers_change'] < 0) {
                    arrow = '↓'
                  }
                  res.data[item] = `<pre>${res.data[item]}
vs 前一天 ${Math.abs(res.data['potential_buyers_change'] * 100).toFixed(2)}% ${arrow}</pre>`
                }
                if (item === 'repeat_purchase_rate') {
                  let arrow = ''
                  if (res.data['repeat_purchase_rate_change'] > 0) {
                    arrow = '↑'
                  } else if (res.data['repeat_purchase_rate_change'] < 0) {
                    arrow = '↓'
                  }
                  res.data[item] = `<pre>${(res.data[item] * 100).toFixed(2)}%
vs 前一天 ${Math.abs(res.data['repeat_purchase_rate_change'] * 100).toFixed(2)}% ${arrow}</pre>`
                }
              }
            }
            if (this.Statisticaltime === 'past7days') {
              for (const item in res.data) {
                if (item === 'buyers') {
                  let arrow = ''
                  if (res.data['buyers_change'] > 0) {
                    arrow = '↑'
                  } else if (res.data['buyers_change'] < 0) {
                    arrow = '↓'
                  }
                  res.data[item] = `<pre>${res.data[item]}
vs 前7天 ${Math.abs(res.data['buyers_change'] * 100).toFixed(2)}% ${arrow}</pre>`
                }
                if (item === 'new_buyers') {
                  let arrow = ''
                  if (res.data['new_buyers_rate'] > 0) {
                    arrow = '↑'
                  } else if (res.data['new_buyers_rate'] < 0) {
                    arrow = '↓'
                  }
                  res.data[item] = `<pre>${res.data[item]}
vs 前7天 ${Math.abs(res.data['new_buyers_rate'] * 100).toFixed(2)}% ${arrow}</pre>`
                }
                if (item === 'existing_buyers') {
                  let arrow = ''
                  if (res.data['existing_buyers_rate'] > 0) {
                    arrow = '↑'
                  } else if (res.data['existing_buyers_rate'] < 0) {
                    arrow = '↓'
                  }
                  res.data[item] = `<pre>${res.data[item]}
vs 前7天 ${Math.abs(res.data['existing_buyers_rate'] * 100).toFixed(2)}% ${arrow}</pre>`
                }
                if (item === 'potential_buyers') {
                  let arrow = ''
                  if (res.data['potential_buyers_change'] > 0) {
                    arrow = '↑'
                  } else if (res.data['potential_buyers_change'] < 0) {
                    arrow = '↓'
                  }
                  res.data[item] = `<pre>${res.data[item]}
vs 前7天 ${Math.abs(res.data['potential_buyers_change'] * 100).toFixed(2)}% ${arrow}</pre>`
                }
                if (item === 'repeat_purchase_rate') {
                  let arrow = ''
                  if (res.data['repeat_purchase_rate_change'] > 0) {
                    arrow = '↑'
                  } else if (res.data['repeat_purchase_rate_change'] < 0) {
                    arrow = '↓'
                  }
                  res.data[item] = `<pre>${(res.data[item] * 100).toFixed(2)}%
vs 前7天 ${Math.abs(res.data['repeat_purchase_rate_change'] * 100).toFixed(2)}% ${arrow}</pre>`
                }
              }
            }
            if (this.Statisticaltime === 'past30days') {
              for (const item in res.data) {
                if (item === 'buyers') {
                  let arrow = ''
                  if (res.data['buyers_change'] > 0) {
                    arrow = '↑'
                  } else if (res.data['buyers_change'] < 0) {
                    arrow = '↓'
                  }
                  res.data[item] = `<pre>${res.data[item]}
vs 前30天 ${Math.abs(res.data['buyers_change'] * 100).toFixed(2)}% ${arrow}</pre>`
                }
                if (item === 'new_buyers') {
                  let arrow = ''
                  if (res.data['new_buyers_rate'] > 0) {
                    arrow = '↑'
                  } else if (res.data['new_buyers_rate'] < 0) {
                    arrow = '↓'
                  }
                  res.data[item] = `<pre>${res.data[item]}
vs 前30天 ${Math.abs(res.data['new_buyers_rate'] * 100).toFixed(2)}% ${arrow}</pre>`
                }
                if (item === 'existing_buyers') {
                  let arrow = ''
                  if (res.data['existing_buyers_rate'] > 0) {
                    arrow = '↑'
                  } else if (res.data['existing_buyers_rate'] < 0) {
                    arrow = '↓'
                  }
                  res.data[item] = `<pre>${res.data[item]}
vs 前30天 ${Math.abs(res.data['existing_buyers_rate'] * 100).toFixed(2)}% ${arrow}<pre>`
                }
                if (item === 'potential_buyers') {
                  let arrow = ''
                  if (res.data['potential_buyers_change'] > 0) {
                    arrow = '↑'
                  } else if (res.data['potential_buyers_change'] < 0) {
                    arrow = '↓'
                  }
                  res.data[item] = `<pre>${res.data[item]}
vs 前30天 ${Math.abs(res.data['potential_buyers_change'] * 100).toFixed(2)}% ${arrow}</pre>`
                }
                if (item === 'repeat_purchase_rate') {
                  let arrow = ''
                  if (res.data['repeat_purchase_rate_change'] > 0) {
                    arrow = '↑'
                  } else if (res.data['repeat_purchase_rate_change'] < 0) {
                    arrow = '↓'
                  }
                  res.data[item] = `<pre>${(res.data[item] * 100).toFixed(2)}%
vs 前30天 ${Math.abs(res.data['repeat_purchase_rate_change'] * 100).toFixed(2)}% ${arrow}</pre>`
                }
              }
            }
            res.data['mallname'] = mallname
            this.tableData1.push(res.data)
          } else if (res.data.errcode === 2) {
            this.errmall.push(mallname)
          }
        }
      } else {
        this.$message({
          message: '请先选择店铺',
          type: 'warning'
        })
      }
      if (this.errmall.length > 0) {
        this.$message.error(`店铺【${this.errmall}】未登录`)
      }
      this.Loading1 = false
      this.Loading3 = false
    }
  }
}
</script>
<!-- 引入less -->
<style lang="less" scoped>
@import '../../../module-less/business-analysis-less/data-screening.less';
</style>
