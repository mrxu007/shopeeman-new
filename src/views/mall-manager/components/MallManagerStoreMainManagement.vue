<template>
  <div v-loading="loading" class="content">
    <div class="all_condition">
      <div class="condition_item">
        <storeChoose :is-all="true" @changeMallList="changeMallList" />
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
        <el-input v-model="query.ip_address" clearable size="mini" style="width:200px" />
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
        <el-input v-model="query.ip_alias" clearable placeholder="主体名称" size="mini" style="width:200px" />
      </div>

      <div class="condition_item">
        <el-button size="mini" type="primary" @click="search">搜索</el-button>
      </div>
    </div>
    <div class="base_option_button" style="margin: 10px;">
      <el-button size="mini" type="primary" @click="(Typeis='ipMaster',dialogvisible=true,showButton=false,dialog_title='新增公司主体')">新增公司主体</el-button>
      <el-button size="mini" type="primary" @click="lostIP">解绑主体IP</el-button>
      <!-- <el-button size="mini" type="primary">绑定主体IP</el-button> -->
      <el-button size="mini" type="primary" @click="clearIP()">清除IP缓存</el-button>
      <el-button size="mini" type="primary" @click="(Typeis='ipPerson',dialogvisible=true,showButton=false,dialog_title='新增自有IP公司主体')">新增自有IP公司主体</el-button>
      <el-button size="mini" type="primary" @click="timeToMonth(1)">续费一个月</el-button>
      <el-button size="mini" type="primary" @click="timeToMonth(3)">续费三个月</el-button>
    </div>

    <div style="margin:10px">
      <div
        style="font-size: smaller;
        color: rebeccapurple;"
      >
        温馨提示：1.因为IP为实时购买，所以购买后不会立即生成IP信息。IP信息会在三分钟内生成
        2.一个主体IP最多绑定10个店铺 3.若状态为【已绑定，已分配店铺】，但绑定店铺为空，则表示
        店铺不存在此账号
      </div>
      <div
        style="font-size: smaller;
        color: rebeccapurple;margin-left:60px"
      >
        3.对于系统的香港IP（非香港名称），IP过期后，将无法进行续费，请在IP有效期内续费。
        4、系统的香港IP（非香港名称）过期后，会被自动回收，回收后将不在显示代理IP信息
      </div>
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
          <el-table-column prop="uid" label="主体ID" align="center" min-width="100px" fixed />
          <el-table-column prop="ip_alias" label="主体名称" align="center" min-width="200px" />
          <!-- 需要解析 -->
          <el-table-column prop="poxyIP" label="代理IP" align="center" min-width="150px" />
          <el-table-column prop="" label="IP渠道" align="center">
            <template slot-scope="{row}">
              <span>{{ row.data_ipinfor && row.data_ipinfor.region_name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="source" label="IP来源" align="center" min-width="80px" />
          <!-- <el-table-column prop="" label="是否预售IP" align="center" /> -->
          <el-table-column prop="status" label="状态" align="center" min-width="150px" />
          <el-table-column prop="main_order_sn" label="订单号" align="center" min-width="200px" />
          <el-table-column prop="expiration_time" label="有效日期" align="center" min-width="200px" />
          <el-table-column prop="mall_alias_name" label="绑定店铺" align="center" min-width="100px" />
          <el-table-column prop="" label="操作" align="center" min-width="330px" fixed="right">
            <template slot-scope="{ row }">
              <div>
                <el-button size="mini" type="primary" @click="openSoft(row.poxyIP,row.id)">打开代理浏览器</el-button>
                <el-button size="mini" type="primary" @click="showupdateVisible(row.id,row)">修改绑定店铺</el-button>
                <el-button size="mini" type="primary" @click="delInfor(row.id)">删除</el-button>
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
        v-loading="loading"
        :title="dialog_title"
        :visible.sync="dialogvisible"
        width="1200px"
        height="600px"
        top="2vh"
        :class="{'changeVisible': Typeis===''}"
        @closed="closeDialog1"
      >
        <div class="left">
          <!--新增公司主体  -->
          <div v-if="Typeis==='ipMaster'">
            <div class="left_item">
              ip区域：
              <el-select v-model="ipMaster_params.lineId" size="mini" @change="getPrice(),ipMaster_params.period=''">
                <el-option v-for="(item,index) in region_ipList" :key="'region'+index" :label="item.value" :value="item.id" />
              </el-select>
            </div>
            <div class="left_item">
              ip周期：
              <el-select v-model="ipMaster_params.period" size="mini">
                <el-option v-for="(item,index) in time_ipList" :key="'time'+index" :label="item.period+'个月'" :value="item.period" />
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
          <!-- 新增自有IP公司主体-->
          <div v-if="Typeis==='ipPerson'">
            <el-form
              ref="query_person"
              :model="query_person"
              :rules="httpRules"
              label-width="120px"
            >
              <el-form-item prop="region_name">
                <span slot="label" style="color:red;margin-right:3px">*</span>
                <span slot="label">IP区域</span>
                <el-select v-model="query_person.region_name" size="mini">
                  <el-option v-for="(item,index) in region_ipListSelf" :key="'region'+index" :label="item.value" :value="item.value" />
                </el-select>
                <!-- <el-input
                  v-model="query_person.region_name"
                  placeholder="请输入备注"
                  size="mini"
                  style="width: 200px"
                  clearable
                /> -->
              </el-form-item>
              <el-form-item prop="ip_alias">
                <span slot="label" style="color:red;margin-right:3px">*</span>
                <span slot="label">主体名称：</span>
                <el-input
                  v-model="query_person.ip_alias"
                  placeholder="主体名称"
                  size="mini"
                  style="width: 200px"
                  clearable
                />
              </el-form-item>

              <el-form-item prop="ip_agency">

                <span slot="label">自有IP类型：</span>
                <!-- <el-select
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
                </el-select> -->

                <el-radio-group v-model="query_person.ip_agency" style="width: 200px">
                  <el-radio
                    v-for="item in ipTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-radio-group>
              </el-form-item>
              <el-form-item v-show="query_person.ip_agency!=='链接'" key="ip_address" prop="ip_address">
                <span slot="label" style="color:red;margin-right:3px">*</span>
                <span slot="label">服务器IP：</span>
                <el-input
                  v-model="query_person.ip_address"
                  placeholder="请输入IP"
                  size="mini"
                  style="width: 200px"
                  clearable
                />
              </el-form-item>
              <el-form-item v-show="query_person.ip_agency!=='链接'" key="ip_port" prop="ip_port">
                <span slot="label" style="color:red;margin-right:3px">*</span>
                <span slot="label">服务器端口：</span>
                <el-input
                  v-model="query_person.ip_port"
                  placeholder="请输入端口"
                  size="mini"
                  style="width: 200px"
                  clearable
                />
              </el-form-item>
              <el-form-item v-show="query_person.ip_agency!=='链接'" key="password" prop="password">
                <span slot="label" style="color:red;margin-right:3px">*</span>
                <span slot="label">密码：</span>
                <el-input
                  v-model="query_person.password"
                  placeholder="请输入密码"
                  size="mini"
                  style="width: 200px"
                  clearable
                />
              </el-form-item>

              <el-form-item
                v-show="query_person.ip_agency==='SSR' || query_person.ip_agency==='SS'"
                key="encryption"
                prop="encryption"
              >
                <span slot="label" style="color:red;margin-right:3px">*</span>
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
              <div v-show="query_person.ip_agency==='SSR'">
                <el-form-item key="protocol" prop="protocol">
                  <span slot="label" style="color:red;margin-right:3px">*</span>
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
                <el-form-item key="confuse" prop="confuse">
                  <span slot="label" style="color:red;margin-right:3px">*</span>
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
              </div>
              <el-form-item v-show="query_person.ip_agency==='HTTP'" prop="username">
                <span slot="label" style="color:red;margin-right:3px">*</span>
                <span slot="label">用户名：</span>
                <el-input
                  v-model="query_person.username"
                  placeholder="请输入用户名"
                  size="mini"
                  style="width: 200px"
                  clearable
                />
              </el-form-item>

              <el-form-item v-show="query_person.ip_agency==='链接'" label="链接">
                <span slot="label" style="color:red;margin-right:3px">*</span>
                <span slot="label">链接</span>
                <el-input v-model="query_person.IPLink" type="textarea" rows="5" />
              </el-form-item>
            </el-form>
            <div
              class="item"
              style="
                display: flex;
                justify-content: center;
                margin-top:2px"
            >
              <!-- 新增-->
              <el-button
                type="primary"
                size="mini"
                @click="addMallMainAndBind"
              >保存</el-button>
            </div>
          </div>

          <!-- 修改绑定店铺 -->
          <div v-if="Typeis==='updataMall'">
            <el-form
              ref="query_person"
              :model="query_person"
              :rules="httpRules"
              label-width="120px"
            >
              <el-form-item prop="region_name">
                <span slot="label" style="color:red;margin-right:3px">*</span>
                <span slot="label">IP区域</span>
                <el-select v-model="query_person.region_name" size="mini" :disabled="source1">
                  <el-option v-for="(item,index) in region_ipListSelf" :key="'region'+index" :label="item.value" :value="item.value" />
                </el-select>
                <!-- <el-input
                  v-model="query_person.region_name"
                  placeholder="请输入备注"
                  size="mini"
                  style="width: 200px"
                  clearable
                /> -->
              </el-form-item>
              <el-form-item prop="ip_alias">
                <span slot="label" style="color:red;margin-right:3px">*</span>
                <span slot="label">主体名称：</span>
                <el-input
                  v-model="query_person.ip_alias"
                  placeholder="主体名称"
                  size="mini"
                  style="width: 200px"
                  clearable
                />
              </el-form-item>

              <el-form-item v-if="query_person.ip_agency!=='链接'" key="ip_address" prop="ip_address">
                <span slot="label" style="color:red;margin-right:3px">*</span>

                <span slot="label">服务器IP：</span>
                <el-input
                  v-model="query_person.ip_address"
                  placeholder="请输入IP"
                  size="mini"
                  style="width: 200px"
                  :disabled="source1"
                  clearable
                />
              </el-form-item>
              <el-form-item v-if="query_person.ip_agency!=='链接'" key="ip_port" prop="ip_port">
                <span slot="label" style="color:red;margin-right:3px">*</span>

                <span slot="label">服务器端口：</span>
                <el-input
                  v-model="query_person.ip_port"
                  :disabled="source1"
                  placeholder="请输入端口"
                  size="mini"
                  style="width: 200px"
                  clearable
                />
              </el-form-item>
              <div v-if="query_person.ip_agency==='SS' || query_person.ip_agency==='SSR'">
                <el-form-item key="password" prop="password">

                  <span slot="label" style="color:red;margin-right:3px">*</span>
                  <span slot="label">密码：</span>
                  <el-input
                    v-model="query_person.password"
                    placeholder="请输入密码"
                    size="mini"
                    style="width: 200px"
                    clearable
                  />
                </el-form-item>

                <el-form-item

                  key="encryption"
                  prop="encryption"
                >
                  <span slot="label" style="color:red;margin-right:3px">*</span>

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
                <el-form-item key="protocol" prop="protocol">
                  <span slot="label" style="color:red;margin-right:3px">*</span>

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
                <el-form-item key="confuse" prop="confuse">
                  <span slot="label" style="color:red;margin-right:3px">*</span>

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
              </div>

              <el-form-item v-if="query_person.ip_agency==='HTTP' || query_person.ip_agency==='链接'" prop="username">
                <span slot="label" style="color:red;margin-right:3px">*</span>

                <span slot="label">用户名：</span>
                <el-input
                  v-model="query_person.username"
                  placeholder="请输入用户名"
                  size="mini"
                  style="width: 200px"
                  clearable
                />
              </el-form-item>

              <el-form-item label="有效日期">
                <el-date-picker
                  v-model="query_person.dataTime"
                  type="datetime"
                  placeholder="选择日期时间"
                  size="mini"
                  :disabled="true"
                />
              </el-form-item>
            </el-form>
            <div
              class="item"
              style="
                display: flex;
                justify-content: center;
                margin-top:2px"
            >
              <el-button
                type="primary"
                size="mini"
                @click="updataDesc()"
              >更改绑定店铺</el-button>
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
            <!-- <el-checkbox v-model="showUserIP" style="margin: 4px 0px;" @click.native="bindedMall()">显示已绑定ip店铺</el-checkbox> -->
            <div class="right_table" style="border:1px solid #C0C4CC">
              <el-table
                ref="multipleTable_dialog"
                height="400px"
                :header-cell-style="{'background': '#f7fafa'}"
                :row-key="generateUUID"
                :data="dialog_mallList"
                @selection-change="handleSelectionChangeDialog"
              >
                <el-table-column
                  type="selection"
                  width="55"
                />
                <el-table-column type="index" label="序号" align="center" />
                <el-table-column prop="country" label="站点" align="center" />
                <el-table-column prop="mall_alias_name" label="店铺名称" align="center" />
                <!-- <el-table-column prop="main_name" label="已绑定公司主体名称" /> -->
              </el-table>
            </div>
            <div style="display:flex;justify-content: center;margin-top:5px">
              <el-button v-show="showButton" type="primary" size="mini" @click="updataMallList()">绑定店铺</el-button>
            </div>
          </div>
        </div>

      </el-dialog>
    </div>
  </div>
</template>
<script>
import ShopeeConfig from '@/services/shopeeman-config'
import storeChoose from '../../../components/store-choose'
import { getMalls, MallgetValue, getValue } from '../../../util/util'
import { encryptionList, ipTypeList, protocolList, confuseList, region_ipListSelf } from '../../../util/MallManagerStoredata'
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
      region_ipListSelf: region_ipListSelf,
      // shopeeConfig: new ShopeeConfig(),
      loading: false,
      showButton: false,
      targetId: '', // 修改店铺绑定仓库id
      dialog_selectMallList: [], // dialog表格多选
      // isBingedList: [],
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
      encryptionList: encryptionList,
      ipTypeList: ipTypeList,
      updata_Params: {
        uid: '', // 账号uid
        targetId: '', // 代理系统id
        mallIds: ''// 系统店铺id
      },
      httpRules: {
        // name: [{ required: true, message: '店铺主体不能为空', trigger: 'blur' }],
        // ip_alias: [{ required: true, message: 'IP别名不能为空', trigger: 'blur' }],
        // ip_address: [{ required: true, message: 'IP不能为空', trigger: 'blur' }, { validator: validZipCode, trigger: 'blur' }],
        // ip_port: [{ required: true, message: 'PORT不能为空', trigger: 'blur' }, { validator: validPort, trigger: 'blur' }],
        // map_ip_address: [{ validator: validZipCode, trigger: 'blur' }],
        // map_ip_port: [{ validator: validPort, trigger: 'blur' }],
        // encryption: [{ required: true, message: '加密方式不能为空', trigger: 'blur' }],
        // protocol: [{ required: true, message: '协议方式不能为空', trigger: 'blur' }],
        // confuse: [{ required: true, message: '混淆不能为空', trigger: 'blur' }],
        // username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        // password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      },
      // ipPsdMethodList: [
      //   {
      //     label: 'rc4-md5',
      //     value: 'rc4-md5'
      //   },
      //   {
      //     label: 'aes-128-ctr',
      //     value: 'aes-128-ctr'
      //   },
      //   {
      //     label: 'aes-192-ctr',
      //     value: 'aes-192-ctr'
      //   },
      //   {
      //     label: 'aes-256-ctr',
      //     value: 'aes-256-ctr'
      //   },
      //   {
      //     label: 'aes-128-cfb',
      //     value: 'aes-128-cfb'
      //   },
      //   {
      //     label: 'aes-192-cfb',
      //     value: 'aes-192-cfb'
      //   },
      //   {
      //     label: 'aes-256-cfb',
      //     value: 'aes-256-cfb'
      //   },
      //   {
      //     label: 'chacha20',
      //     value: 'chacha20'
      //   },
      //   {
      //     label: 'rc4',
      //     value: 'rc4'
      //   }
      // ],
      // protocolList: [
      //   {
      //     label: 'auth_sha1_v4',
      //     value: 'auth_sha1_v4'
      //   },
      //   {
      //     label: 'auth_aes128_md5',
      //     value: 'auth_aes128_md5'
      //   },
      //   {
      //     label: 'auth_aes128_sha1',
      //     value: 'auth_aes128_sha1'
      //   },
      //   {
      //     label: 'auth_chain_a',
      //     value: 'auth_chain_a'
      //   },
      //   {
      //     label: 'auth_chain_b',
      //     value: 'auth_chain_b'
      //   },
      //   {
      //     label: 'auth_chain_c',
      //     value: 'auth_chain_c'
      //   },
      //   {
      //     label: 'auth_chain_d',
      //     value: 'auth_chain_d'
      //   }
      // ],
      protocolList: protocolList,
      confuseList: confuseList,
      source1: false,
      query_person: {
        username: '', // 用户名
        password: '', // 密码
        ip_address: '', // IP地址
        ip_port: '', //	端口号
        ip_alias: '', // IP别名（主体名称）
        ip_agency: 'SSR', // 代理方式
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
        map_ip_port: '', // 代理端口
        IPLink: '', // 链接
        dataTime: '' // 有效日期
      },
      dialog_mallList: [],
      showUserIP: false,
      ipName: '', // 主体名称
      // time_ipList: [
      //   { id: 1, value: '1个月' },
      //   { id: 2, value: '3个月' }
      // ],
      time_ipList: [],
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
      showLog: true,
      shopAccountList: []
    }
  },
  created() {
    this.getInfo() // 获取店铺信息
    // this.getTableList()// tableList
    this.initDate()
    this.GetCloudIPAreaList()// 获取IP区域列表
    this.getMallList()// 初始化店铺列表
  },
  methods: {
    // IP解绑
    lostIP() {
      if (this.mulSelect.length <= 0 || this.mulSelect.length > 1) {
        this.$message.warning('请选择一个解绑的主体')
        return
      }
      this.$confirm('确定要解绑1个主体的IP吗？，解绑之后可能存在店铺IP关联的风险和台湾站点不能回粉操作', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.lostIPFun()
      })
    },
    async lostIPFun() {
      this.loading = true
      const mallids = []
      const des = this.mulSelect[0].target_mall_info
      if (des && des.length > 0) {
        des.forEach(item => {
          mallids.push(item.mall_id)
        })
      }
      const target_id = this.mulSelect[0].id.toString()
      try {
        const res = await this.$YipService.BusinessunbindiP(target_id)
        this.loading = false
        const data = JSON.parse(res)
        console.log(data)
        if (data.code === 200) {
          this.$notify({
            type: 'success',
            message: '解绑成功'
          })
        } else {
          this.$notify({
            type: 'error',
            message: data.message
          })
        }
        // 清空数据
        this.$refs.multipleTable.clearSelection()
      } catch (error) {
        console.log(error)
      }
    },

    // 关闭弹窗清除
    closeDialog1() {
      this.query_person = {
        username: '', // 用户名
        password: '', // 密码
        ip_address: '', // IP地址
        ip_port: '', //	端口号
        ip_alias: '', // IP别名（主体名称）
        ip_agency: 'SSR', // 代理方式
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
        map_ip_port: '', // 代理端口
        IPLink: '', // 链接
        dataTime: '' // 有效日期
      }
      this.ipMaster_params = {
        lineId: '', // 线路ID
        uid: '', // 主账号ID
        uuid: '', // 子账号ID
        ipAlias: '', // 主体名称）（默认IP）
        num: '1', // 购买数量 默认1
        period: '', // 购买时长
        isPresale: ''// 是否预售
      }

      this.showUserIP = false
      this.$refs.multipleTable_dialog.clearSelection()
    },
    // 删除
    async delInfor(val) {
      const targetId = val.toString()
      this.loading = true
      const res = await this.$YipService.delInfor(targetId)
      this.loading = false
      const data = JSON.parse(res)
      if (data.code === -1) {
        this.$notify({
          title: '删除',
          type: 'error',
          message: data.message
        })
      } else {
        this.$notify({
          title: '删除',
          type: 'success',
          message: '删除成功'
        })
      }
      this.getTableList()
    },
    async getInfo() {
      getMalls().then(res => {
        this.shopAccountList = res
        this.getTableList()
      })
    },
    // 展示修改绑定店铺信息
    showupdateVisible(val, d) {
      this.showButton = true
      this.dialogvisible = true
      this.dialog_title = '修改绑定店铺'
      this.Typeis = 'updataMall'
      this.targetId = val
      // 列表渲染
      this.$nextTick(() => {
        if (this.$refs.multipleTable_dialog) {
          this.$refs.multipleTable_dialog.clearSelection()
        }
      })
      // const tempMall = []
      if (d.target_mall_info && d.target_mall_info.length > 0) {
        d.target_mall_info.forEach(item => {
          const index = this.dialog_mallList.findIndex(mall => {
            return Number(mall.id) === Number(item.mall_id)
          })
          if (index > -1) {
            // tempMall.push(this.dialog_mallList[index])
            this.$nextTick(() => {
              this.$refs.multipleTable_dialog.toggleRowSelection(this.dialog_mallList[index], true)
            })
          }
        })
      }
      // 表格渲染
      const row = d
      this.query_person = {
        target_id: d.id,
        source: d.source === '系统' ? 1 : 2, // 1 2
        region_name: row.data_ipinfor.region_name, // 区域名
        ip_address: row.data_ipinfor.ip_address, // 1
        ip_port: row.data_ipinfor.port, // 1
        ip_agency: row.data_ipinfor.ip_agency, // 1
        ip_alias: row.ip_alias,
        username: row.data_ipinfor.username, // 1
        password: row.data_ipinfor.password, // 1
        encryption: row.data_ipinfor.encryption, // 1
        protocol: row.data_ipinfor.protocol, // 1
        parameter: row.data_ipinfor.parameter,
        confuse: row.data_ipinfor.confuse, // 1
        argument: row.data_ipinfor.argument, //
        dataTime: '2030-01-01 00:00:00'
      }

      if (Number(this.query_person.source) === 1) { // 系统自定 设置某些选择不可更改
        this.source1 = true
      }
      // this.updataDesc()
    },
    // 修改绑定店铺数据
    async updataDesc() {
      // const params = this.query_person

      // 验证  source=2
      if (this.query_person.ip_agency === 'SS' || this.query_person.ip_agency === 'SSR') {
        if (this.query_person.ip_alias === '' ||
            this.query_person.ip_address === '' ||
            this.query_person.ip_port === '' ||
           this.query_person.password === '' ||
           this.query_person.encryption === '' ||
           this.query_person.protocol === '' ||
           this.query_person.confuse === ''
        ) {
          this.$message.warning('必填信息不能为空')
          return
        }
      }
      if (this.query_person.ip_agency === 'HTTP' || this.query_person.ip_agency === '链接') {
        if (this.query_person.ip_alias === '' ||
            this.query_person.ip_address === '' ||
            this.query_person.ip_port === '' ||
           this.query_person.username === ''
        ) {
          this.$message.warning('必填信息不能为空')
          return
        }
      }
      // 验证 source=1
      if (Number(this.query_person.source) === 1 && this.query_person.ip_alias === '') {
        this.$message.warning('主体名称不能为空')
        return
      }
      try {
        this.loading = true
        const res = await this.$YipService.UpdateSelfIP(JSON.stringify(this.query_person))
        this.loading = false
        const data = JSON.parse(res)
        console.log('updataDesc', data)
        if (data.code === 200) {
          this.$notify({
            title: '修改IP信息',
            type: 'success',
            message: '修改成功'
          })
        } else {
          this.$notify({
            title: '修改IP信息',
            type: 'error',
            message: data.message
          })
        }
        // 关闭弹窗 清空数据 刷新数据
        this.dialogvisible = false
        this.getTableList()
        this.$refs.multipleTable_dialog.clearSelection()
        this.query_person = {
          username: '', // 用户名
          password: '', // 密码
          ip_address: '', // IP地址
          ip_port: '', //	端口号
          ip_alias: '', // IP别名（主体名称）
          ip_agency: 'SSR', // 代理方式
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
          map_ip_port: '', // 代理端口
          IPLink: '', // 链接
          dataTime: '' // 有效日期
        }
      } catch (error) {
        console.log('udpata', error)
      }
    },

    // 初始化店铺列表
    async getMallList() {
      const params = {
        country: '',
        mallGroupIds: ''
      }
      const res = await this.$api.ddMallGoodsGetMallList(params)
      if (res.data.code === 200) {
        this.dialog_mallList = res.data.data
        // this.isBingedList = this.dialog_mallList
      } else {
        this.$message.warning('网络异常！')
      }
    },
    // 绑定用户信息
    async  updataMallList() {
      const userInfo = await this.$appConfig.getUserInfo()
      const uid = userInfo.muid.toString()
      const targetId = this.targetId.toString()
      const mallIds = this.dialog_selectMallList.toString() || ''

      try {
        this.loading = true
        const res = await this.$commodityService.newBangdingMall(uid, targetId, mallIds)
        this.loading = false
        const data = JSON.parse(res)

        if (data.code !== 200) {
          this.$notify({
            title: '绑定店铺',
            type: 'error',
            message: data.message
          })
        } else {
          this.$notify({
            title: '绑定店铺',
            type: 'success',
            message: '绑定成功'
          })
        }
      } catch (error) {
        console.log('店铺绑定', error)
      }
      this.dialogvisible = false
      this.getTableList()
      this.$refs.multipleTable_dialog.clearSelection()
    },
    // 获取dialog 店铺列表
    getDialogMallList() {

    },
    // 显示已绑定ip店铺
    // bindedMall() {
    //   if (this.showUserIP === false) {
    //     this.isBingedList = this.dialog_mallList
    //   } else {
    //     this.isBingedList = this.dialog_mallList2
    //   }
    // },
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
    async openSoft(poxyIP, ID) {
      const proxy = {
        proxy_ip: poxyIP,
        proxy_id: ID
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
      this.loading = true
      const data = await this.$BaseUtilService.UpdateProxy()
      this.loading = false
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
      // this.$refs.query_person.validate(async(valid) => {
      // if (!valid) return
      // 验证
      if (this.query_person.region_name === '' ||
            this.query_person.ip_alias === '' ||
            this.query_person.ip_address === '' ||
            this.query_person.ip_port === ''
      ) {
        this.$message.warning('必填信息不能为空')
        return
      }
      // IP类型 分类验证
      if (this.query_person.ip_agency === 'SSR') {
        if (
          this.query_person.password === '' ||
           this.query_person.encryption === '' ||
           this.query_person.protocol === '' ||
           this.query_person.confuse === ''
        ) {
          this.$message.warning('必填信息不能为空')
          return
        }
      }
      if (this.query_person.ip_agency === 'SS') {
        if (this.query_person.password === '' ||
           this.query_person.encryption === ''
        ) {
          this.$message.warning('必填信息不能为空')
          return
        }
      }

      if (this.query_person.ip_agency === 'HTTP') {
        if (this.query_person.password === '' ||
           this.query_person.username === '') {
          this.$message.warning('必填信息不能为空')
          return
        }
      }

      if (this.query_person.ip_agency === '链接') {
        if (this.query_person.IPLink === '') {
          this.$message.warning('链接不能为空')
          return
        }
      }

      const userInfo = await this.$appConfig.getUserInfo()
      this.query_person.uid = userInfo.muid
      const ipAlias = this.randomWord(true, 10, 32)
      this.query_person.ip_alias = ipAlias
      this.query_person.uuid = 0
      // 新增
      this.loading = true
      const res = await this.$YipService.AddSelfIP(JSON.stringify(this.query_person))
      this.loading = false
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
        // 附加店铺绑定
        this.targetId = resMsg.data
        if (this.dialog_selectMallList.length > 0) {
          this.updataMallList()
        }
        //
        this.getTableList()
        this.dialogvisible = false
      }
      // })
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
        this.loading = true
        const userInfo = await this.$appConfig.getUserInfo()
        this.loading = false
        var list = []
        this.mulSelect.forEach(item => {
          // if (item.target_mall_info != null) {
          //   // list.push(item.target_mall_info[0].ip_target_id)
          //   list.push(item.id)
          //   // console.log('2222', item.id)
          // } else {
          //   this.$message.error('续费ip信息有误')
          // }
          list.push(item.id)
        })
        const targetId = list.toString() || ''
        const uid = String(userInfo.muid)
        const uuid = '0'
        this.loading = true

        const res = await this.$YipService.RenewIP(targetId, uid, uuid, String(period))
        this.loading = false
        // this.$message.error(JSON.parse(data).message)
        const data = JSON.parse(res)
        if (data.code === -1) {
          this.$message.error(data)
        } else {
          this.$message.success('续费成功')
        }
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
      // this.$message.warning('数据请求中.......')
      const userInfo = await this.$appConfig.getUserInfo()
      this.ipMaster_params.uid = userInfo.muid
      this.ipMaster_params.uuid = 0
      const params = this.ipMaster_params
      this.loading = true
      const data = await this.$commodityService.addIPMaster(params)
      const resMsg = JSON.parse(data)
      this.loading = false
      if (resMsg.code === '-1') {
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
        // 附加店铺绑定
        this.targetId = resMsg.data
        if (this.dialog_selectMallList.length > 0) {
          this.updataMallList()
        }
        this.getTableList()
        this.dialogvisible = false
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
      this.mulSelect = val
      // val.forEach(e => {
      //   this.mulSelect.push(e.uid)
      // })

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
          //  e.channel_list[0].lineid  路线id
          //  e.name  区域名
          this.region_ipList.push({ id: e.channel_list[0].lineid, value: e.name })
        })
      })
    },
    // 获取价格
    async getPrice() {
      const parmas = {
        line_id: this.ipMaster_params.lineId.toString() || '',
        is_renewal: '0'
      }
      try {
        const res = await this.$YipService.getprice(parmas.line_id, parmas.is_renewal)
        const data = JSON.parse(res)
        if (data.code === 200) {
          this.time_ipList = data.data.period_info
        } else {
          this.$message.warning(data.message)
        }
      } catch (error) {
        console.log('getPrice.error', error)
      }
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
      try {
        this.loading = true
        const res = await this.$YipService.GetIpList(JSON.stringify(params))
        this.loading = false
        const data = JSON.parse(res)
        this.tableList = []
        if (data.code === 200 && data.data.length > 0 && this.shopAccountList.length > 0) {
          data.data.forEach((item, index) => {
            // 获取店铺名称
            if (item.target_mall_info && item.target_mall_info.length > 0) {
              const mall = []
              item.target_mall_info.forEach(i => {
                mall.push(MallgetValue(this.shopAccountList, 'label', 'id', i.mall_id))
              })
              item.mall_alias_name = mall.toString()
            }
            // 解析ip
            item.poxyIP = ''
            item.poxyID = ''
            this.$YipService.GetIPinfor(item.ip_info).then(res => {
              const data_ipinfor = JSON.parse(res)
              item.poxyID = data_ipinfor.id
              item.poxyIP = data_ipinfor.map_ip_address
              item.data_ipinfor = data_ipinfor // 修改获取数据
              // console.log('item', item)
            })
            this.tableList.push(item)
          })
          // 分页
          this.chang()
        }
      } catch (error) {
        this.loading = false
        console.log('error', error)
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
    .el-input--mini{
      margin-bottom: 2px;
    }
    .el-form-item__error{
      line-height: 0;
      padding-top: 0px;
    }
    .changeVisible{
      .el-dialog{
        width:900px !important
      }
    }
}

    @media screen and (min-width: 1200px){
       .el-dialog{
        margin-top: 10vh !important;
      }
    }
</style>
