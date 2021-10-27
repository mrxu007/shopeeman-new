<template>
  <div class="content">
    <div class="all_condition">
      <div class="condition_item">
        <storeChoose @changeMallList="changeMallList" />
      </div>

      <div class="condition_item">
        <span>过期时间：</span>
        <el-date-picker
          v-model="cloumn_date"
          size="mini"
          style="width: 310px"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="-"
          :picker-options="pickerOptions"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </div>

      <div class="condition_item">
        <span>状态：</span>
        <el-select v-model="query.statius" size="mini" width="150px" placeholder="站点">
          <el-option value="" label="全部" />
          <el-option value="1" label="已分配" />
          <el-option value="2" label="已解绑" />
          <el-option value="3" label="已过期" />
          <el-option value="4" label="未分配" />
        </el-select>
      </div>

      <div class="condition_item">
        <span>IP区域：</span>
        <el-input v-model="query.ip_address" clearable size="mini" style="width:180px" />
      </div>

      <div class="condition_item">
        <span>渠道商：</span>
        <el-input v-model="query.supplier_info" clearable size="mini" style="width:180px" />
      </div>

      <div class="condition_item">
        <span>IP来源：</span>
        <el-select v-model="query.source" size="mini" width="150px" placeholder="IP来源">
          <el-option value="" label="全部" />
          <el-option value="1" label="系统" />
          <el-option value="2" label="用户" />
        </el-select>
      </div>

      <div class="condition_item">
        <span>主体名称：</span>
        <el-input v-model="query.ip_alias" clearable placeholder="主体名称" size="mini" style="width:180px" />
      </div>

      <div class="condition_item">
        <el-button size="mini" type="primary" @click="search">搜索</el-button>
      </div>
    </div>
    <div class="base_option_button" style="margin: 10px;">
      <el-button size="mini" type="primary" @click="(Typeis='ipMaster',dialogvisible=true,dialog_title='新增公司主体')">新增公司主体</el-button>
      <!-- <el-button size="mini" type="primary">解绑主体IP</el-button> -->
      <!-- <el-button size="mini" type="primary">绑定主体IP</el-button> -->
      <el-button size="mini" type="primary" @click="clearIP()">清除IP缓存</el-button>
      <el-button size="mini" type="primary" @click="(Typeis='ipPerson',dialogvisible=true,dialog_title='新增自有IP公司主体')">新增自有IP公司主体</el-button>
      <el-button size="mini" type="primary" @click="timeToMonth(1)">续费一个月</el-button>
      <el-button size="mini" type="primary" @click="timeToMonth(2)">续费三个月</el-button>
    </div>

    <div style="margin:10px">
      <span
        style="font-size: smaller;
        color: rebeccapurple;"
      >
        温馨提示：1.因为IP为实时购买，所以购买后不会立即生成IP信息。IP信息会在三分钟内生成
        2.一个主体IP最多绑定10个店铺 3.若状态为【已绑定，已分配店铺】，但绑定店铺为空，则表示
        店铺不存在此账号
      </span>
    </div>
    <div class="table_clo">
      <div class="data_table" style="height: 100%;background-color:white">
        <el-table
          ref="multipleTable"
          height="calc(100vh - 262px)"
          :data="tableListEnd"
          :row-style="{ height: '50px' }"
          style="width: 100%;height: calc(100vh - 262px)"
          :header-cell-style="{ background: '#f7fafa' }"
          :row-key="generateUUID"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            min-width="55px"
            align="center"
          />
          <el-table-column label="序号" type="index" align="center" :index="indexMethod" fixed />
          <el-table-column prop="main_order_sn" label="订单号" align="center" min-width="200px" fixed />
          <el-table-column prop="uid" label="主体ID" align="center" min-width="100px" />
          <el-table-column prop="ip_alias" label="主体名称" align="center" min-width="200px" />
          <!-- 需要解析 -->
          <el-table-column prop="poxyIP" label="代理IP" align="center" min-width="150px" />
          <!-- <el-table-column prop="" label="IP渠道" align="center" /> -->
          <el-table-column prop="source" label="IP来源" align="center" min-width="80px" />
          <!-- <el-table-column prop="" label="是否预售IP" align="center" /> -->
          <el-table-column prop="status" label="状态" align="center" min-width="150px" />
          <el-table-column prop="expiration_time" label="有效日期" align="center" min-width="200px" />
          <el-table-column prop="" label="绑定店铺" align="center" min-width="100px">
            <template slot-scope="{ row }">
              <!-- 临时取id -->
              {{ row.target_mall_info && row.target_mall_info.mall_id }}
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作" align="center" min-width="250px" fixed="right">
            <template slot-scope="{ row }">
              <div>
                <el-button size="mini" type="primary" @click="openSoft(row.poxyIP,row.poxyID)">打开代理浏览器</el-button>
                <el-button size="mini" type="primary" @click="showupdateVisible(row.id)">修改绑定店铺</el-button>
              <!-- <el-button size="mini" type="primary" @click="del(row.uid)">删除</el-button> -->
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">

          <el-pagination
            background
            :current-page.sync="page"
            :page-sizes="[20, 50, 100, 200]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
    <!-- dialog 新增公司主体-->
    <div class="dialog_addip">
      <el-dialog
        :title="dialog_title"
        :visible.sync="dialogvisible"
        width="1200px"
        height="600px"
        top="2vh"
      >
        <div class="left">
          <!-- 修改绑定店铺信息 -->
          <!-- <div v-if="Typeis==='updataMall'">
            <div class="left_item">
              ip区域：
              <el-select v-model="updata_Params.uid" size="mini">
                <el-option v-for="(item,index) in region_ipList" :key="'region'+index" :label="item.value" :value="item.id" />
              </el-select>
            </div>
            <div class="left_item">
              主体名称：
              <el-input v-model="updata_Params.ipName" clearable style="width:200px" size="mini" />
            </div>
            <div class="left_item">
              代理ip：
              <el-input v-model="updata_Params.ipName" clearable style="width:200px" size="mini" />
            </div>
            <div class="left_item">
              端口号：
              <el-input v-model="updata_Params.ipName" clearable style="width:200px" size="mini" />
            </div>
            <div class="left_item">
              有效日期：
              <el-date-picker
                v-model="updata_Params.time_date"
                type="datetime"
                placeholder="选择日期时间"
              />
            </div>
            <div class="left_item">
              <el-button size="mini" type="primary" @click="updataMall()">确认绑定店铺信息</el-button>
            </div>
          </div> -->
          <!--新增公司主体  -->
          <div v-if="Typeis==='ipMaster'">
            <div class="left_item">
              ip区域：
              <el-select v-model="ipMaster_params.lineId" size="mini">
                <el-option v-for="(item,index) in region_ipList" :key="'region'+index" :label="item.value" :value="item.id" />
              </el-select>
            </div>
            <div class="left_item">
              ip周期：
              <el-select v-model="ipMaster_params.period" size="mini">
                <el-option v-for="(item,index) in time_ipList" :key="'time'+index" :label="item.value" :value="item.id" />
              </el-select>
            </div>
            <div class="left_item">
              是否预售：
              <el-radio-group v-model="ipMaster_params.isPresale" size="mini">
                <el-radio label="1">是</el-radio>
                <el-radio label="2">否</el-radio>
              </el-radio-group>
            </div>
            <div class="left_item">
              主体名称：<el-input v-model="ipMaster_params.ipAlias" clearable style="width:180px" size="mini" />
              <!-- <span v-show="ipMaster_params.ipAlias===''" style="color:red">(必填)</span> -->
              <span style="color:red">(必填)</span>

            </div>
            <div class="left_item">
              <el-button size="mini" type="primary" @click="addMaster()">确定</el-button>
            </div>
          </div>
          <!-- 新增自有IP公司主体 -->
          <div v-if="Typeis==='ipPerson'">
            <el-form
              ref="query_person"
              :model="query_person"
              :rules="httpRules"
              label-width="100px"
            >
              <el-form-item prop="region_name">
                <span slot="label">区域名</span>
                <el-input
                  v-model="query_person.region_name"
                  placeholder="请输入备注"
                  size="mini"
                  style="width: 200px"
                  clearable
                />
              </el-form-item>

              <el-form-item prop="ip_address">
                <span slot="label">IP地址：</span>
                <el-input
                  v-model="query_person.ip_address"
                  placeholder="请输入IP"
                  size="mini"
                  style="width: 200px"
                  clearable
                />
              </el-form-item>
              <el-form-item prop="ip_port">
                <span slot="label">端口号：</span>
                <el-input
                  v-model="query_person.ip_port"
                  placeholder="请输入端口"
                  size="mini"
                  style="width: 200px"
                  clearable
                />
              </el-form-item>
              <el-form-item prop="ip_agency">
                <span slot="label">代理方式：</span>
                <el-select
                  v-model="query_person.ip_agency"
                  placeholder="请选择"
                  size="mini"
                  style="width: 200px"
                >
                  <el-option
                    v-for="item in ipTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item prop="ip_alias">
                <span slot="label">主体名称：</span>
                <el-input
                  v-model="query_person.ip_alias"
                  placeholder="主体名称"
                  size="mini"
                  style="width: 200px"
                  clearable
                />
              </el-form-item>
              <!-- <el-form-item prop="map_ip_address">
                <span slot="label">映射IP</span>
                <el-input
                  v-model="query_person.map_ip_address"
                  placeholder="请输入映射IP"
                  size="mini"
                  style="width: 200px"
                  clearable
                />
              </el-form-item>
              <el-form-item prop="map_ip_port">
                <span slot="label">	映射端口</span>
                <el-input
                  v-model="query_person.map_ip_port"
                  placeholder="请输入映射端口"
                  size="mini"
                  style="width: 200px"
                  clearable
                />
              </el-form-item> -->
              <!-- <el-form-item prop="mappingIp">
                  <span slot="label">映射IP：</span>
                  <el-input
                    v-model="query_person.mappingIp"
                    placeholder="请输入映射IP"
                    size="mini"
                    style="width: 200px"
                    clearable
                  />
                </el-form-item>
                <el-form-item prop="mappingPort">
                  <span slot="label">映射端口：</span>
                  <el-input
                    v-model="query_person.mappingPort"
                    placeholder="请输入映射端口"
                    size="mini"
                    style="width: 200px"
                    clearable
                  />
                </el-form-item> -->
              <el-form-item prop="username">
                <span slot="label">用户名：</span>
                <el-input
                  v-model="query_person.username"
                  placeholder="请输入用户名"
                  size="mini"
                  style="width: 200px"
                  clearable
                />
              </el-form-item>
              <el-form-item prop="password">
                <span slot="label">密码：</span>
                <el-input
                  v-model="query_person.password"
                  placeholder="请输入密码"
                  size="mini"
                  style="width: 200px"
                  clearable
                />
              </el-form-item>
              <el-form-item prop="encryption">
                <span slot="label">加密方式：</span>
                <el-select
                  v-model="query_person.encryption"
                  placeholder="请选择"
                  style="width: 200px"
                  size="mini"
                >
                  <el-option
                    v-for="item in encryptionList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item prop="protocol">
                <span slot="label">协议：</span>
                <el-select
                  v-model="query_person.protocol"
                  placeholder="请选择"
                  size="mini"
                  clearable
                  style="width: 200px"
                >
                  <el-option
                    v-for="item in protocolList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item prop="parameter">
                <span slot="label">协议参数：</span>
                <el-input
                  v-model="query_person.parameter"
                  placeholder="请输入协议参数"
                  size="mini"
                  style="width: 200px"
                  clearable
                />
              </el-form-item>
              <el-form-item prop="confuse">
                <span slot="label">混淆：</span>
                <el-select
                  v-model="query_person.confuse"
                  placeholder="请选择"
                  clearable
                  size="mini"
                  style="width: 200px"
                >
                  <el-option
                    v-for="item in confuseList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item prop="argument">
                <span slot="label">混淆参数：</span>
                <el-input
                  v-model="query_person.argument"
                  placeholder="请输入协议参数"
                  size="mini"
                  style="width: 200px"
                  clearable
                />
              </el-form-item>
              <!-- <el-form-item prop="ip_agency">
                  <span slot="label">代理方式</span>
                  <el-input
                    v-model="query_person.ip_agency"
                    placeholder="请输入备注"
                    size="mini"
                    style="width: 200px"
                    clearable
                  />
                </el-form-item> -->

              <!-- <el-form-item prop="area_name">
                <span slot="label">地区名</span>
                <el-input
                  v-model="query_person.area_name"
                  placeholder="请输入备注"
                  size="mini"
                  style="width: 200px"
                  clearable
                />
              </el-form-item> -->
              <!-- <el-form-item>
                <el-button
                  type="primary"
                  size="mini"
                  @click="addMallMainAndBind"
                >保存</el-button>
              </el-form-item>
            </el-form> -->
            </el-form>

            <div
              class="item"
              style="
                display: flex;
                justify-content: center;"
            >
              <el-button
                type="primary"
                size="mini"
                @click="addMallMainAndBind"
              >保存</el-button>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="right_condition">
            <div
              style=" display: flex;
                    margin: 4px 0px;"
            >
              <storeChoose @changeMallList="changeMallList" />
              <el-button type="primary" size="mini" @click="dialog_search_IPMall">查询</el-button>
            </div>
            <el-checkbox v-model="showUserIP" style="margin: 4px 0px;" @click.native="bindedMall()">显示已绑定ip店铺</el-checkbox>
            <div class="right_table" style="border:1px solid #C0C4CC">
              <el-table
                ref="multipleTable_dialog"
                height="400px"
                :header-cell-style="{'background': '#f7fafa'}"
                :row-key="generateUUID"
                :data="isBingedList"
                @selection-change="handleSelectionChangeDialog"
              >
                <el-table-column
                  type="selection"
                  width="55"
                />
                <el-table-column type="index" label="序号" />
                <el-table-column prop="country" label="站点" />
                <el-table-column prop="platform_mall_name" label="店铺名称" />
                <el-table-column prop="main_name" label="已绑定公司主体名称" />
              </el-table>
            </div>
            <div style="display:flex;justify-content: center;margin-top:5px">
              <el-button type="primary" size="mini" @click="updataMallList()">绑定店铺</el-button>
            </div>
          </div>
        </div>

      </el-dialog>
    </div>
  </div>
</template>
<script>
import storeChoose from '../../../components/store-choose'
export default {
  components: { storeChoose },

  data() {
    var validPort = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入端口号'))
      } else if (value > 0 && value < 65535) {
        callback()
      } else {
        callback(new Error('端口号格式不正确'))
      }
    }
    var validZipCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入IP'))
      } else if (!/^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d?)\.((25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d?|0)\.){2}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d?)$/.test(value)) {
        callback(new Error('请输入正确的IP'))
      } else {
        callback()
      }
    }
    return {
      showButton: false,
      targetId: '', // 修改店铺绑定仓库id
      dialog_selectMallList: [], // dialog表格多选
      isBingedList: [],
      dialog_mallList2: [],
      ipMaster_params: {
        lineId: '', // 线路ID
        uid: '', // 主账号ID
        uuid: '', // 子账号ID
        ipAlias: '', // 主体名称）（默认IP）
        num: '1', // 购买数量 默认1
        period: '', // 购买时长
        isPresale: ''// 是否预售
      },
      dialog_title: '',
      Typeis: '',
      mulSelect: [],
      dialogvisible: false,
      encryptionList: [
        {
          label: 'rc4-md5',
          value: 'rc4-md5'
        },
        {
          label: 'aes-128-ctr',
          value: 'aes-128-ctr'
        },
        {
          label: 'aes-192-ctr',
          value: 'aes-192-ctr'
        },
        {
          label: 'aes-256-ctr',
          value: 'aes-256-ctr'
        },
        {
          label: 'aes-128-cfb',
          value: 'aes-128-cfb'
        },
        {
          label: 'aes-192-cfb',
          value: 'aes-192-cfb'
        },
        {
          label: 'aes-256-cfb',
          value: 'aes-256-cfb'
        },
        {
          label: 'chacha20',
          value: 'chacha20'
        },
        {
          label: 'rc4',
          value: 'rc4'
        }
      ],
      ipTypeList: [
        {
          value: '',
          label: '无'
        },
        {
          value: 'SSR',
          label: 'SSR'
        },
        {
          value: 'HTTP',
          label: 'HTTP'
        }
      ],
      updata_Params: {
        uid: '', // 账号uid
        targetId: '', // 代理系统id
        mallIds: ''// 系统店铺id
      },
      httpRules: {
        // name: [{ required: true, message: '店铺主体不能为空', trigger: 'blur' }],
        ip_alias: [{ required: true, message: 'IP别名不能为空', trigger: 'blur' }],
        ip_address: [{ required: true, message: 'IP不能为空', trigger: 'blur' }, { validator: validZipCode, trigger: 'blur' }],
        ip_port: [{ required: true, message: 'PORT不能为空', trigger: 'blur' }, { validator: validPort, trigger: 'blur' }],
        map_ip_address: [{ validator: validZipCode, trigger: 'blur' }],
        map_ip_port: [{ validator: validPort, trigger: 'blur' }]
      },
      ipPsdMethodList: [
        {
          label: 'rc4-md5',
          value: 'rc4-md5'
        },
        {
          label: 'aes-128-ctr',
          value: 'aes-128-ctr'
        },
        {
          label: 'aes-192-ctr',
          value: 'aes-192-ctr'
        },
        {
          label: 'aes-256-ctr',
          value: 'aes-256-ctr'
        },
        {
          label: 'aes-128-cfb',
          value: 'aes-128-cfb'
        },
        {
          label: 'aes-192-cfb',
          value: 'aes-192-cfb'
        },
        {
          label: 'aes-256-cfb',
          value: 'aes-256-cfb'
        },
        {
          label: 'chacha20',
          value: 'chacha20'
        },
        {
          label: 'rc4',
          value: 'rc4'
        }
      ],
      protocolList: [
        {
          label: 'auth_sha1_v4',
          value: 'auth_sha1_v4'
        },
        {
          label: 'auth_aes128_md5',
          value: 'auth_aes128_md5'
        },
        {
          label: 'auth_aes128_sha1',
          value: 'auth_aes128_sha1'
        },
        {
          label: 'auth_chain_a',
          value: 'auth_chain_a'
        },
        {
          label: 'auth_chain_b',
          value: 'auth_chain_b'
        },
        {
          label: 'auth_chain_c',
          value: 'auth_chain_c'
        },
        {
          label: 'auth_chain_d',
          value: 'auth_chain_d'
        }
      ],
      confuseList: [
        {
          label: 'http_simple',
          value: 'http_simple'
        },
        {
          label: 'http_post',
          value: 'http_post'
        },
        {
          label: 'random_head',
          value: 'random_head'
        },
        {
          label: 'tls1.2_ticket_auth',
          value: 'tls1.2_ticket_auth'
        },
        {
          label: 'tls1.2_ticket_fastauth',
          value: 'tls1.2_ticket_fastauth'
        }
      ],
      query_person: {
        username: '', // 用户名
        password: '', // 密码
        ip_address: '', // IP地址
        ip_port: '', //	端口号
        ip_alias: '', // IP别名（主体名称）
        ip_agency: '', // 代理方式
        encryption: '', // 加密方式
        protocol: '', // 协议类型
        confuse: '', // 混淆方式
        uid: '', // 用户主账号ID
        uuid: '', // 用户子账号ID
        channel_code: '', // 渠道代号
        channel_name: '', // 渠道名称
        region_name: '', //	区域名
        area_name: '', // 地区名
        parameter: '', // 协议参数
        argument: '', // 混淆参数
        map_ip_address: '', // 代理IP
        map_ip_port: '' // 代理端口
      },
      dialog_mallList: [],
      showUserIP: false,
      ipName: '', // 主体名称
      time_ipList: [
        { id: 1, value: '1个月' },
        { id: 2, value: '3个月' }
      ],
      time_ip: '1',
      region_ip: '',
      region_ipList: [
        { id: 1, value: '新加坡' },
        { id: 2, value: '泰国-曼谷' },
        { id: 3, value: '菲律宾-预售' }
      ],
      tableList: [],
      tableListEnd: [],
      page: 1,
      pageSize: 20,
      total: 0,
      siteList: [
        { id: 1, value: '美国' },
        { id: 2, value: '中国' },
        { id: 3, value: '英国' }
      ],
      query: {
        mall_ids: '',
        expiration_dates: '',
        statius: '',
        ip_address: '',
        supplier_info: '',
        source: '',
        ip_alias: ''
      },
      cloumn_date: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      showRMB: true,
      showLog: true
    }
  },
  created() {
    this.initDate()
    this.getTableList()// tableList
    this.GetCloudIPAreaList()// 获取IP区域列表
    this.getMallList()// 初始化店铺列表
  },
  methods: {
    // 展示修改绑定店铺弹窗
    showupdateVisible(val) {
      this.dialogvisible = true
      this.Typeis = 'updataMall'
      this.dialog_title = '修改绑定店铺'
      this.targetId = val
    },
    // 初始化店铺列表
    async getMallList() {
      const params = {
        country: '',
        mallGroupIds: ''
      }
      const res = await this.$api.ddMallGoodsGetMallList(params)
      if (res.data.code === 200) {
        // 全部
        this.dialog_mallList = res.data.data
        // 部分
        this.dialog_mallList2 = this.dialog_mallList.filter(item => {
          return item.main_name === ''
        })
        // 初始化dialog列表
        this.isBingedList = this.dialog_mallList2
      } else {
        this.$message.warning('网络异常！')
      }
    },
    //
    async  updataMallList() {
      const userInfo = await this.$appConfig.getUserInfo()
      const uid = userInfo.muid.toString()
      const targetId = this.targetId.toString()
      const mallIds = this.dialog_selectMallList.toString() || ''
      console.log('====', targetId)
      const res = await this.$commodityService.newBangdingMall(uid, targetId, mallIds)
      const data = JSON.parse(res)
      if (data.code === -1) {
        this.$notify({
          title: '绑定店铺',
          type: 'error',
          message: data.message
        })
      } else {
        this.$notify({
          title: '绑定店铺',
          type: 'success',
          message: data.message
        })
      }
      console.log('-----', data)
      this.$refs.multipleTable_dialog.clearSelection()
    },
    // 获取dialog 店铺列表
    getDialogMallList() {

    },
    // 显示已绑定ip店铺
    bindedMall() {
      if (this.showUserIP === false) {
        this.isBingedList = this.dialog_mallList
      } else {
        this.isBingedList = this.dialog_mallList2
      }
    },
    // dialog多选
    handleSelectionChangeDialog(val) {
      // 清空多选
      this.dialog_selectMallList = []
      val.forEach(e => {
        this.dialog_selectMallList.push(e.id)
      })
      // this.$refs.multipleTable_dialog.clearSelection()
    },
    // 打开代理浏览器
    async openSoft(poxyIP, poxyID) {
      const proxy = {
        proxy_ip: poxyIP,
        proxy_id: poxyID
      }
      const data = await this.$BaseUtilService.OpenProxyWeb(JSON.stringify(proxy))
      if (data === null) {
        //
      } else {
        this.$message.error('网络错误')
      }
    },
    // 清除IP缓存
    async clearIP() {
      const data = await this.$BaseUtilService.UpdateProxy()
      if (data === null) {
        this.$message.success('清理成功')
      }
    },
    // 确认绑定店铺信息
    updataMall() {

    },
    // 随机数
    randomWord(randomFlag, min, max) {
      let str = ''
      let range = min
      const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
      // 随机产生
      if (randomFlag) { // 生成3-32位随机串
        range = Math.round(Math.random() * (max - min)) + min
      }
      for (let i = 0; i < range; i++) {
        const pos = Math.round(Math.random() * (arr.length - 1))
        str += arr[pos]
      }
      return str
    },
    // 新增自有ip公司主体
    async addMallMainAndBind() {
      this.$refs.query_person.validate(async(valid) => {
        if (!valid) return
        const userInfo = await this.$appConfig.getUserInfo()
        this.query_person.uid = userInfo.muid
        const ipAlias = this.randomWord(true, 10, 32)
        this.query_person.ip_alias = ipAlias
        this.query_person.uuid = 0
        // 新增
        const res = await this.$YipService.AddSelfIP(JSON.stringify(this.query_person))
        const resMsg = JSON.parse(res)

        if (resMsg.code !== 200) {
          this.$notify({
            title: '新增自有IP公司主体',
            type: 'error',
            message: resMsg.message
          })
        } else {
          this.$notify({
            title: '新增自有IP公司主体',
            type: 'success',
            message: `IP保存成功`
          })
          this.getTableList()
          this.dialogVisible = false
        }
      })
    },
    // 删除
    del(ids) {
    },
    //
    search() {
      this.getTableList()
    },
    // 续费一个月
    async timeToMonth(period) {
      // period=1 一个月 2一季度
      if (this.mulSelect.length <= 0) {
        this.$message.warning('请选择要续费的主体')
      } else {
        const userInfo = await this.$appConfig.getUserInfo()
        const targetId = this.mulSelect.toString()
        const uid = String(userInfo.muid)
        const uuid = '0'
        const data = await this.$YipService.RenewIP(targetId, uid, uuid, String(period))

        this.$message.error(JSON.parse(data).message)
        // 清空多选
        this.$refs.multipleTable.clearSelection()
      }
    },
    // 获取ip价格
    async GetIPPrice() {
      const lineId = '' // 所选ip区域的id
      const data = await this.$YipService.GetIPPrice(lineId)
    },
    // 新增自有主体---提交
    // async submit_IpPersion() {
    //   // 提交 && 绑定
    //   if (this.query_person.ip_alias === '' ||
    //      this.query_person.ip_address === '' ||
    //      this.query_person.ip_port === '' ||
    //      this.query_person.encryption === '' ||
    //      this.query_person.protocol === '' ||
    //      this.query_person.confuse === '' ||
    //      this.query_person.argument === '') {
    //     this.$message.warning('请输入必填项内容！')
    //     return false
    //   }
    //   const userInfo = await this.$appConfig.getUserInfo()
    //   this.query_person.uid = userInfo.muid
    //   const res = await this.$YipService.AddSelfIP(JSON.stringify(this.query_person))
    // },
    // 新增公司主体---提交
    async addMaster() {
      if (this.ipMaster_params.ipAlias === '') {
        this.$message.warning('主体名称不能为空！')
        return false
      }
      this.$message.warning('数据请求中.......')
      const userInfo = await this.$appConfig.getUserInfo()
      this.ipMaster_params.uid = userInfo.muid
      this.ipMaster_params.uuid = 0
      const params = this.ipMaster_params
      const data = await this.$commodityService.addIPMaster(params)
      const resMsg = JSON.parse(data)
      if (resMsg.code !== 200) {
        this.$notify({
          title: '新增公司主体',
          type: 'error',
          message: resMsg.message
        })
      } else {
        this.$notify({
          title: '新增公司主体',
          type: 'success',
          message: `新增成功`
        })
        this.getTableList()
        this.dialogVisible = false
      }
      console.log('新增公司主体', resMsg)
      // 附加绑定店铺
      if (this.dialog_selectMallList.length > 0) {
        this.targetId = this.ipMaster_params.lineId // 代理ip_ID
        this.updataMallList()
      }
    },
    // dialog 多选
    // 方法
    generateUUID() {
      var d = new Date().getTime()
      if (window.performance && typeof window.performance.now === 'function') {
        d += performance.now() // use high-precision timer if available
      }
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function(c) {
          var r = (d + Math.random() * 16) % 16 | 0
          d = Math.floor(d / 16)
          return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
        }
      )
      return uuid
    },

    // 多选
    handleSelectionChange(val) {
      this.mulSelect = []
      val.forEach(e => {
        this.mulSelect.push(e.uid)
      })

      // 获取参数
    },
    // 新增ip 店铺查询
    dialog_search_IPMall() {},
    // 获取IP区域列表
    async GetCloudIPAreaList() {
      const data = await this.$YipService.GetCloudIPAreaList()
      const resMsg = JSON.parse(data)
      this.region_ipList = []
      resMsg.data.forEach(item => {
        item.area_list.forEach(e => {
          //  e.channel_list[0].lineid   路线id
          //  e.name  区域名
          this.region_ipList.push({ id: e.channel_list[0].lineid, value: e.name })
        })
      })
    },
    // 获取店铺信息
    changeMallList(val) {
      this.query.mall_ids = []
      this.site = Object.assign(val)
      this.site.forEach(e => {
        this.query.mall_ids.push(e.id)
      })
    },
    // ip- tableList
    async getTableList() {
      const params = {}
      const userInfo = await this.$appConfig.getUserInfo()
      params.uid = userInfo.muid
      params.uuid = ''
      params.mall_ids = this.query.mall_ids.toString() || ''
      params.ip_alias = this.query.ip_alias
      params.source = this.query.source
      params.ip_address = this.query.ip_address
      params.supplier_info = this.query.supplier_info
      params.expiration_dates = this.cloumn_date && this.cloumn_date.length > 0 ? this.cloumn_date.join('/').toString() : ''
      params.ip_id = ''
      params.statius = this.query.statius
      const res = await this.$YipService.GetIpList(JSON.stringify(params))
      const data = JSON.parse(res)
      this.tableList = []
      if (data.code === 200 && data.data.length > 0) {
        // 解析ip
        data.data.forEach(item => {
          this.$YipService.GetIPinfor(item.ip_info).then(res => {
            const data_ipinfor = JSON.parse(res)
            item.poxyID = data_ipinfor.id
            item.poxyIP = data_ipinfor.map_ip_address
          })
          this.tableList.push(item)
          console.log('tableList', this.tableList)
        })
        this.chang()
      } else {
        this.$message.warning('信息获取失败')
      }
    },
    // 分页
    chang() {
      this.total = this.tableList.length
      this.page = 1
      this.tableListEnd = this.tableList.slice((this.page - 1) * this.pageSize, this.page * this.pageSize)
    },
    // 分页递增
    indexMethod(index) {
      index = (index + 1) + (this.page - 1) * this.pageSize
      return index
    },
    // 初始化时间
    initDate() {
      const d = new Date()
      const d1 =
        d.getFullYear() +
        '-' +
        (d.getMonth() + 1) +
        '-' +
        d.getDate() +
        ' 23:59:59'
      const d2 =
        d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate() + ' 23:59:59'
      this.cloumn_date = [d2, d1]
      this.cloumn_date && this.cloumn_date.length > 0
        ? this.cloumn_date.join('/').toString()
        : ''
    },
    handleSizeChange: function(pageSize) {
      // 每页条数切换
      this.pageSize = pageSize
      this.handleCurrentChange(this.page)
    },
    handleCurrentChange: function(page) {
      // 页码切换
      this.page = page
      this.currentChangePage(this.tableList, page)
    },
    // 分页方法（重点）
    currentChangePage(list, page) {
      let from = (page - 1) * this.pageSize
      const to = page * this.pageSize
      this.tableDataEnd = []
      for (; from < to; from++) {
        if (list[from]) {
          this.tableListEnd.push(list[from])
        }
      }
    }
  }
}
</script>
<style lang="less">

.content{
    min-width: 1200px;
    // padding: 5px;
    // margin: 10px;
    // margin-right:10px ;
    .all_condition, .table_clo{
    background-color: white;
    padding: 5px;
    margin: 10px;
    border-radius: 10px;
    }
     .table_clo{
     border-radius: 0px;
     padding: 2px;
     .pagination{
    display: flex;
    justify-content: flex-end;
    margin: 4px 0px;
     }
    }
    .all_condition{
    display: flex;
    flex-wrap: wrap;
    // justify-content:center;
    // margin-bottom: 30px;
    align-items: center;
    .condition_item {
      width: auto;
      display: inline-block !important;
      display: inline;
      // margin-bottom: 8px;
      margin: 4px 0px;
      margin-right: 10px;
      span {
        margin-right: 5px;
      }
    }
    }
    .dialog_addip{
      .el-dialog{
        .el-dialog__body{
          display: flex;
          align-items: center;
          justify-content: center;
          .left{
            padding: 5px;
            margin-right: 10px;
            .left_item{
              margin-bottom: 10px;
            }
          }
        }
      }
    }
    .el-form-item{
      margin-bottom: 0px;
    }
}
</style>
