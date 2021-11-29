<template>
  <el-row class="contaniner">
    <el-row class="header">
      <ul style="margin-bottom: 10px">
        <li>
          <span>商品创建时间：</span>
          <el-date-picker v-model="form.returnCreateTime" unlink-panels size="mini" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
        </li>
        <li>
          <span>商品类目：</span>
          <el-input v-model="form.returnCategory" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" style="width: 377px" />
        </li>
        <li>
          <span>商品状态：</span>
          <el-select v-model="form.returnStatus" placeholder="" size="mini" filterable>
            <el-option label="全部" :value="0" />
            <el-option v-for="(item, index) in returnStatusList" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </li>
      </ul>
      <ul>
        <li>
          <span>商品更新时间：</span>
          <el-date-picker v-model="form.returnUpdateTime" unlink-panels size="mini" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
        </li>
        <li>
          <span>Sku编码：</span>
          <el-input v-model="form.returnSkuId" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
        </li>
        <li>
          <span>商品名称：</span>
          <el-input v-model="form.returnGoodsName" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
        </li>
        <li>
          <span>商品ID：</span>
          <el-input v-model="form.returnGoodsId" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" style="margin-left:12px" />
        </li>
        <li>
          <el-button type="primary" :disabled="Loading1" size="mini" @click="getproductlist">查询</el-button>
          <el-button type="primary" size="mini" :loading="Loading2" @click="DerivedData">导出数据</el-button>
          <el-button type="primary" size="mini" :loading="Loading2" @click="Creategoods">创建商品</el-button>
          <el-upload ref="importRef" style="margin:0 10px" accept=".xls, .xlsx" action="https://" :on-change="importTemplate" :show-file-list="false" :auto-upload="false">
            <el-button :data="importTemplateData" size="mini" :loading="Loading2" type="primary"> 导入商品 </el-button>
          </el-upload>
          <el-button type="primary" size="mini" :loading="Loading2" @click="downloadTemplate">下载导入模板</el-button>
          <el-checkbox
            v-model="showlog"
            style="margin-left:10px"
          >隐藏日志</el-checkbox>
        </li>
      </ul><br>
      <el-table
        ref="plTable"
        v-loading="Loading3"
        header-align="center"
        height="calc(100vh - 205px)"
        :data="tableData"
        :header-cell-style="{
          backgroundColor: '#f5f7fa',
        }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column align="center" type="selection" width="50" />
        <el-table-column align="center" label="商品ID" width="70" prop="product_id" fixed />
        <el-table-column align="center" prop="wid" label="商品名称" width="100" />
        <el-table-column align="center" prop="oversea_order_sn" label="商品类目" width="150" />
        <el-table-column prop="reissue_order_sn" label="商品主图" width="140" align="center" />
        <el-table-column prop="logistic_no" label="商品状态" width="160" align="center" />
        <el-table-column prop="logistic_type" label="价格" width="120" align="center" />
        <el-table-column prop="created_at" label="库存" width="140" align="center" />
        <el-table-column prop="updated_at" label="备注" width="140" align="center" />
        <el-table-column prop="status" label="创建时间" width="100" align="center" />
        <el-table-column prop="sku_list.lastItem.sku_num" label="更新时间" width="100" align="center" />
        <el-table-column label="操作" width="240" align="center">
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini" @click="Eidtgoods(row)">编辑</el-button>
            <el-button type="primary" size="mini" @click="del(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="logging">
        <Logs ref="Logs" v-model="showlog" clear />
      </div>
      <el-dialog title="编辑商品" :visible.sync="eidtVisible" width="70%">
        <el-row>
          <el-col span="1.5" style="padding:5px">
            <span>商品名称</span>
          </el-col>
          <el-col span="19">
            <el-input v-model="x" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
          </el-col>
        </el-row>
        <br>
        <el-row>
          <el-col span="1.5" style="padding:5px">
            <span>商品类目</span>
          </el-col>
          <el-col span="19">
            <el-input v-model="x" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
          </el-col>
        </el-row>
        <el-row>
          <el-col span="6" style="padding:5px">
            <span>商品状态：</span>
            <el-select v-model="y" placeholder="" size="mini" filterable>
              <el-option v-for="(item, index) in returnCreateStatusList" :key="index" :label="item.label" :value="item.value" />
            </el-select>
          </el-col>
          <el-col span="1.5" style="padding:13px">
            <span>备注：</span>
          </el-col>
          <el-col span="13" style="padding-top:5px">
            <el-input v-model="x" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
          </el-col>
        </el-row>
        <br>
        <span>|销售资料</span>
        <br><br><br>
        <div style="height:260px;width:800px">
          <div style="border:1px solid black;width:370px;float: left;">
            <span>规格一</span><br><br>
            <el-row>
              <el-col span="1.5" style="padding:8px">
                <span>规格名称</span>
              </el-col>
              <el-col span="17">
                <el-input v-model="Specifications1" clearable size="mini" placeholder="请输入规格名称，例如：颜色等等" oninput="value=value.replace(/\s+/g,'')" />
              </el-col>
            </el-row>
            <el-row>
              <el-col span="1.5" style="padding-top:90px;padding-left:8px">
                <span>规格选项</span>
              </el-col>
              <el-col span="5" style="padding-top:10px;padding-left:8px">
                <div style="border:1px solid black;width:260px;height:180px" />
              </el-col>
            </el-row>
            <el-button type="primary" size="mini" style="width:260px;margin-left: 64px;margin-top:3px" @click="1">添加规格选项</el-button>
          </div>
          <div style="border:1px solid black;width:370px;float: right;">
            <el-checkbox v-model="showtwo" />
            <span>规格二</span><br><br>
            <el-row>
              <el-col span="1.5" style="padding:8px">
                <span>规格名称</span>
              </el-col>
              <el-col span="17">
                <el-input v-model="Specifications2" :disabled="!showtwo" clearable size="mini" placeholder="请输入规格名称，例如：颜色等等" oninput="value=value.replace(/\s+/g,'')" />
              </el-col>
            </el-row>
            <el-row>
              <el-col span="1.5" style="padding-top:90px;padding-left:8px">
                <span>规格选项</span>
              </el-col>
              <el-col span="5" style="padding-top:10px;padding-left:8px">
                <div style="border:1px solid black;width:260px;height:180px" />
              </el-col>
            </el-row>
            <el-button :disabled="!showtwo" type="primary" size="mini" style="width:260px;margin-left: 64px;margin-top:3px" @click="1">添加规格选项</el-button>
          </div>
        </div><br><br><br>
        <el-row>
          <el-col span="1.5" style="padding:8px">
            <span>规格资讯</span>
          </el-col>
          <el-col span="1.5" style="padding:8px">
            <span>商品价格</span>
          </el-col>
          <el-col span="3">
            <el-input v-model="x" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
          </el-col>
          <el-col span="1.5" style="padding:8px">
            <span>商品数量</span>
          </el-col>
          <el-col span="3">
            <el-input v-model="x" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
          </el-col>
          <el-col span="1.5" style="padding:8px">
            <span>商品货号</span>
          </el-col>
          <el-col span="3">
            <el-input v-model="x" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
          </el-col>
          <el-col span="3">
            <el-button type="primary" size="mini" style="margin-left:20px" @click="1">批量更新</el-button>
          </el-col>
        </el-row><br>
        <el-table
          ref="plTable"
          header-align="center"
          :data="EidittableData"
          :header-cell-style="{
            backgroundColor: '#f5f7fa',
          }"
        >
          <el-table-column align="center" type="selection" width="50" />
          <el-table-column align="center" :label="Specifications1" width="70" prop="" fixed />
          <el-table-column align="center" prop="" :label="Specifications2" width="100" />
          <el-table-column prop="" label="图片" width="140" align="center" />
          <el-table-column prop="logistic_type" label="价格" width="120" align="center" />
          <el-table-column prop="created_at" label="库存" width="140" align="center" />
          <el-table-column prop="updated_at" label="商品货号" width="140" align="center" />
        </el-table><br><br>
        <span>|媒体管理</span><br><br><br>
        <el-row>
          <el-col span="2" style="padding:8px;margin-top:70px">
            <span>轮播图片</span>
          </el-col>
          <el-col span="2" style="padding:8px">
            <el-upload class="avatar-uploader" action="#" :show-file-list="false" list-type="picture-card" :on-change="handleChange">
              <i class="el-icon-plus" />
            </el-upload>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="2" style="padding:8px;margin-top:70px">
            <span>详情图片</span>
          </el-col>
          <el-col span="2" style="padding:8px">
            <el-upload class="avatar-uploader" action="#" :show-file-list="false" list-type="picture-card" :on-change="handleChange">
              <i class="el-icon-plus" />
            </el-upload>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="2" style="padding:8px;margin-top:70px">
            <span>尺寸图片</span>
          </el-col>
          <el-col span="2" style="padding:8px">
            <el-upload class="avatar-uploader" action="#" :show-file-list="false" list-type="picture-card" :on-change="handleChange">
              <i class="el-icon-plus" />
            </el-upload>
          </el-col>
        </el-row><br><br>
        <span>|出库及配送相关</span><br><br><br>
        <el-row>
          <el-col span="1.5" style="padding:8px">
            <span>商品重量</span>
          </el-col>
          <el-col span="3">
            <el-input v-model="x" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
          </el-col>
          <el-col span="1.5" style="padding:8px">
            <span>kg</span>
          </el-col>
          <el-col span="1.5" style="padding:8px">
            <span>长</span>
          </el-col>
          <el-col span="3">
            <el-input v-model="x" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
          </el-col>
          <el-col span="1.5" style="padding:8px">
            <span>cm</span>
          </el-col>
          <el-col span="1.5" style="padding:8px">
            <span>宽</span>
          </el-col>
          <el-col span="3">
            <el-input v-model="x" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
          </el-col>
          <el-col span="1.5" style="padding:8px">
            <span>cm</span>
          </el-col>
          <el-col span="1.5" style="padding:8px">
            <span>高</span>
          </el-col>
          <el-col span="3">
            <el-input v-model="x" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
          </el-col>
          <el-col span="1.5" style="padding:8px">
            <span>cm</span>
          </el-col>
        </el-row><br><br>
        <span>|详细信息</span><br><br><br>
        <span style="padding:8px">商品描述</span><br>
        <input v-model="x" style="margin-left:8px;height:200px;width:100%">
        <el-button type="primary" size="mini" style="margin-left:50%;margin-top:10px;" @click="1">保存</el-button>
      </el-dialog>
      <el-dialog title="创建商品" :visible.sync="CreateVisible" width="70%">
        <el-row>
          <el-col span="1.5" style="padding:5px">
            <span>商品名称</span>
          </el-col>
          <el-col span="19">
            <el-input v-model="x" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
          </el-col>
        </el-row>
        <br>
        <el-row>
          <el-col span="1.5" style="padding:5px">
            <span>商品类目</span>
          </el-col>
          <el-col span="19">
            <el-input v-model="x" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
          </el-col>
        </el-row>
        <el-row>
          <el-col span="6" style="padding:5px">
            <span>商品状态：</span>
            <el-select v-model="y" placeholder="" size="mini" filterable>
              <el-option v-for="(item, index) in returnCreateStatusList" :key="index" :label="item.label" :value="item.value" />
            </el-select>
          </el-col>
          <el-col span="1.5" style="padding:13px">
            <span>备注：</span>
          </el-col>
          <el-col span="13" style="padding-top:5px">
            <el-input v-model="x" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
          </el-col>
        </el-row>
        <br>
        <span>|销售资料</span>
        <br><br><br>
        <div style="height:260px;width:800px">
          <div style="border:1px solid black;width:370px;float: left;">
            <span>规格一</span><br><br>
            <el-row>
              <el-col span="1.5" style="padding:8px">
                <span>规格名称</span>
              </el-col>
              <el-col span="17">
                <el-input v-model="Specifications1" clearable size="mini" placeholder="请输入规格名称，例如：颜色等等" oninput="value=value.replace(/\s+/g,'')" />
              </el-col>
            </el-row>
            <el-row>
              <el-col span="1.5" style="padding-top:90px;padding-left:8px">
                <span>规格选项</span>
              </el-col>
              <el-col span="5" style="padding-top:10px;padding-left:8px">
                <div id="creataddassembly1" style="border:1px solid black;width:260px;height:180px">
                  <div v-for="(items,indexs) in CreatetableData">
                    <el-row>
                      <el-col span="1.5">
                        <el-select v-model="items.Specification1" placeholder="" size="mini" filterable>
                          <el-option v-for="(item, index) in returnStatusList" :key="index" :label="item.label" :value="item.value" />
                        </el-select>
                      </el-col>
                      <el-col span="2"><span>+</span></el-col>
                      <el-col span="1"><el-button type="primary" size="mini" @click="delcreatel(indexs)">删除</el-button></el-col>
                    </el-row>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-button type="primary" size="mini" style="width:260px;margin-left: 64px;margin-top:3px" @click="addassembly">添加规格选项</el-button>
          </div>
          <div style="border:1px solid black;width:370px;float: right;">
            <el-checkbox v-model="showtwo" @change="cancel" />
            <span>规格二</span><br><br>
            <el-row>
              <el-col span="1.5" style="padding:8px">
                <span>规格名称</span>
              </el-col>
              <el-col span="17">
                <el-input v-model="Specifications2" :disabled="!showtwo" clearable size="mini" placeholder="请输入规格名称，例如：颜色等等" oninput="value=value.replace(/\s+/g,'')" />
              </el-col>
            </el-row>
            <el-row>
              <el-col span="1.5" style="padding-top:90px;padding-left:8px">
                <span>规格选项</span>
              </el-col>
              <el-col span="5" style="padding-top:10px;padding-left:8px">
                <div id="creataddassembly2" style="border:1px solid black;width:260px;height:180px">
                  <div v-for="(items,indexs) in CreatetableData">
                    <el-row>
                      <el-col span="1.5">
                        <el-select v-model="items.Specification2" placeholder="" :disabled="!showtwo" size="mini" filterable>
                          <el-option v-for="(item, index) in returnStatusList" :key="index" :label="item.label" :value="item.value" />
                        </el-select>
                      </el-col>
                      <el-col span="1"><el-button type="primary" :disabled="!showtwo" style="margin-left:20px" size="mini" @click="delcreatel2(indexs)">删除</el-button></el-col>
                    </el-row>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-button :disabled="!showtwo" type="primary" size="mini" style="width:260px;margin-left: 64px;margin-top:3px" @click="addassembly2">添加规格选项</el-button>
          </div>
        </div><br><br><br>
        <el-row>
          <el-col span="1.5" style="padding:8px">
            <span>规格资讯</span>
          </el-col>
          <el-col span="1.5" style="padding:8px">
            <span>商品价格</span>
          </el-col>
          <el-col span="3">
            <el-input v-model="createprice" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
          </el-col>
          <el-col span="1.5" style="padding:8px">
            <span>商品数量</span>
          </el-col>
          <el-col span="3">
            <el-input v-model="createnum" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
          </el-col>
          <el-col span="1.5" style="padding:8px">
            <span>商品货号</span>
          </el-col>
          <el-col span="3">
            <el-input v-model="createskuid" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
          </el-col>
          <el-col span="3">
            <el-button type="primary" size="mini" style="margin-left:20px" @click="updateall">批量更新</el-button>
          </el-col>
        </el-row><br>
        <el-table
          ref="plTable"
          header-align="center"
          :data="CreatetableData"
          :header-cell-style="{
            backgroundColor: '#f5f7fa',
          }"
        >
          <el-table-column align="center" type="selection" width="50" />
          <el-table-column align="center" :label="Specifications1" width="70" prop="Specification1" fixed />
          <el-table-column align="center" prop="Specification2" :label="Specifications2" width="100" />
          <el-table-column prop="img" label="图片" width="140" align="center" />
          <el-table-column label="价格" width="120" align="center">
            <template slot-scope="{ row }">
              <el-input v-model="row.price" placeholder="请输入价格" />
            </template>
          </el-table-column>
          <el-table-column label="库存" width="140" align="center">
            <template slot-scope="{ row }">
              <el-input v-model="row.productnum" placeholder="请输入库存" />
            </template>
          </el-table-column>
          <el-table-column label="商品货号" width="140" align="center">
            <template slot-scope="{ row }">
              <el-input v-model="row.skuid" placeholder="请输入商品货号" />
            </template>
          </el-table-column>
        </el-table><br><br>
        <span>|媒体管理</span><br><br><br>
        <el-row>
          <el-col span="2" style="padding:8px;margin-top:70px">
            <span>轮播图片</span>
          </el-col>
          <el-col span="2" style="padding:8px">
            <el-upload class="avatar-uploader" action="#" :show-file-list="false" list-type="picture-card" :on-change="handleChange">
              <i class="el-icon-plus" />
            </el-upload>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="2" style="padding:8px;margin-top:70px">
            <span>详情图片</span>
          </el-col>
          <el-col span="2" style="padding:8px">
            <el-upload class="avatar-uploader" action="#" :show-file-list="false" list-type="picture-card" :on-change="handleChange">
              <i class="el-icon-plus" />
            </el-upload>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="2" style="padding:8px;margin-top:70px">
            <span>尺寸图片</span>
          </el-col>
          <el-col span="2" style="padding:8px">
            <el-upload class="avatar-uploader" action="#" :show-file-list="false" list-type="picture-card" :on-change="handleChange">
              <i class="el-icon-plus" />
            </el-upload>
          </el-col>
        </el-row><br><br>
        <span>|出库及配送相关</span><br><br><br>
        <el-row>
          <el-col span="1.5" style="padding:8px">
            <span>商品重量</span>
          </el-col>
          <el-col span="3">
            <el-input v-model="x" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
          </el-col>
          <el-col span="1.5" style="padding:8px">
            <span>kg</span>
          </el-col>
          <el-col span="1.5" style="padding:8px">
            <span>长</span>
          </el-col>
          <el-col span="3">
            <el-input v-model="x" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
          </el-col>
          <el-col span="1.5" style="padding:8px">
            <span>cm</span>
          </el-col>
          <el-col span="1.5" style="padding:8px">
            <span>宽</span>
          </el-col>
          <el-col span="3">
            <el-input v-model="x" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
          </el-col>
          <el-col span="1.5" style="padding:8px">
            <span>cm</span>
          </el-col>
          <el-col span="1.5" style="padding:8px">
            <span>高</span>
          </el-col>
          <el-col span="3">
            <el-input v-model="x" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
          </el-col>
          <el-col span="1.5" style="padding:8px">
            <span>cm</span>
          </el-col>
        </el-row><br><br>
        <span>|详细信息</span><br><br><br>
        <span style="padding:8px">商品描述</span><br>
        <input v-model="x" style="margin-left:8px;height:200px;width:100%">
        <el-button type="primary" size="mini" style="margin-left:50%;margin-top:10px;" @click="1">保存</el-button>
      </el-dialog>
      <div class="pagination">
        <el-pagination
          style="margin-left:75%"
          background
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="total,sizes, prev, pager, next, jumper"
          :total="total"
          :page-sizes="[20, 50, 100, 200]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-row>
  </el-row>
</template>
<script>
import { exportExcelDataCommon } from '../../../util/util'
export default {
  data() {
    return {
      x: '',
      y: 1,
      cantshow: false,
      createskuid: '',
      createnum: 0,
      createprice: 0,
      importTemplateData: '', // 批量导入数据
      isnull: true,
      eidtVisible: false,
      EidittableData: [],
      demonstration: [{
        goodsname: '导入测试鞋子类目',
        skuid: 438,
        goodsweight: 1,
        goodsvolume: '2 * 2 * 2',
        Details: '详情信息选填',
        Specifications1: 'A',
        Specifications2: '',
        Specificationsimg: 'C:\Users\Administrator\Desktop\test1.png',
        skuprice: 19,
        skunum: 222,
        Rotationimg: 'D:\商品图片\test1.png,D:\商品图片\test2.png,D:\商品图片\test3.png',
        Detailsimg: 'D:\商品图片\test1.png,D:\商品图片\test2.png,D:\商品图片\test3.png',
        sizeimg: 'D:\商品图片\test1.png,D:\商品图片\test2.png,D:\商品图片\test3.png'
      }, {
        goodsname: '导入测试鞋子类目',
        skuid: 438,
        goodsweight: 1,
        goodsvolume: '2 * 2 * 2',
        Details: '详情信息选填',
        Specifications1: 'B',
        Specifications2: '',
        Specificationsimg: 'C:\Users\Administrator\Desktop\test1.png',
        skuprice: 19,
        skunum: 222,
        Rotationimg: 'D:\商品图片\test1.png,D:\商品图片\test2.png,D:\商品图片\test3.png',
        Detailsimg: 'D:\商品图片\test1.png,D:\商品图片\test2.png,D:\商品图片\test3.png',
        sizeimg: 'D:\商品图片\test1.png,D:\商品图片\test2.png,D:\商品图片\test3.png'
      }, {
        goodsname: '导入测试鞋子类目',
        skuid: 438,
        goodsweight: 1,
        goodsvolume: '2 * 2 * 2',
        Details: '详情信息选填',
        Specifications1: 'c',
        Specifications2: '',
        Specificationsimg: 'C:\Users\Administrator\Desktop\test1.png',
        skuprice: 19,
        skunum: 222,
        Rotationimg: 'D:\商品图片\test1.png,D:\商品图片\test2.png,D:\商品图片\test3.png',
        Detailsimg: 'D:\商品图片\test1.png,D:\商品图片\test2.png,D:\商品图片\test3.png',
        sizeimg: 'D:\商品图片\test1.png,D:\商品图片\test2.png,D:\商品图片\test3.png'
      }, {
        goodsname: '导入测试鞋子类目',
        skuid: 438,
        goodsweight: 1,
        goodsvolume: '2 * 2 * 2',
        Details: '详情信息选填',
        Specifications1: 'D',
        Specifications2: '',
        Specificationsimg: 'C:\Users\Administrator\Desktop\test1.png',
        skuprice: 19,
        skunum: 222,
        Rotationimg: 'D:\商品图片\test1.png,D:\商品图片\test2.png,D:\商品图片\test3.png',
        Detailsimg: 'D:\商品图片\test1.png,D:\商品图片\test2.png,D:\商品图片\test3.png',
        sizeimg: 'D:\商品图片\test1.png,D:\商品图片\test2.png,D:\商品图片\test3.png'
      }, {
        goodsname: '导入测试鞋子类目',
        skuid: 438,
        goodsweight: 1,
        goodsvolume: '2 * 2 * 2',
        Details: '详情信息选填',
        Specifications1: 'E',
        Specifications2: '',
        Specificationsimg: 'C:\Users\Administrator\Desktop\test1.png',
        skuprice: 19,
        skunum: 222,
        Rotationimg: 'D:\商品图片\test1.png,D:\商品图片\test2.png,D:\商品图片\test3.png',
        Detailsimg: 'D:\商品图片\test1.png,D:\商品图片\test2.png,D:\商品图片\test3.png',
        sizeimg: 'D:\商品图片\test1.png,D:\商品图片\test2.png,D:\商品图片\test3.png'
      }, {
        goodsname: '导入测试鞋子类目',
        skuid: 438,
        goodsweight: 1,
        goodsvolume: '2 * 2 * 2',
        Details: '详情信息选填',
        Specifications1: 'F',
        Specifications2: '',
        Specificationsimg: 'C:\Users\Administrator\Desktop\test1.png',
        skuprice: 19,
        skunum: 222,
        Rotationimg: 'D:\商品图片\test1.png,D:\商品图片\test2.png,D:\商品图片\test3.png',
        Detailsimg: 'D:\商品图片\test1.png,D:\商品图片\test2.png,D:\商品图片\test3.png',
        sizeimg: 'D:\商品图片\test1.png,D:\商品图片\test2.png,D:\商品图片\test3.png'
      }, {
        goodsname: '导入测试鞋子类目',
        skuid: 438,
        goodsweight: 1,
        goodsvolume: '2 * 2 * 2',
        Details: '详情信息选填',
        Specifications1: 'G',
        Specifications2: '',
        Specificationsimg: 'C:\Users\Administrator\Desktop\test1.png',
        skuprice: 19,
        skunum: 222,
        Rotationimg: 'D:\商品图片\test1.png,D:\商品图片\test2.png,D:\商品图片\test3.png',
        Detailsimg: 'D:\商品图片\test1.png,D:\商品图片\test2.png,D:\商品图片\test3.png',
        sizeimg: 'D:\商品图片\test1.png,D:\商品图片\test2.png,D:\商品图片\test3.png'
      }, {
        goodsname: '导入测试鞋子类目',
        skuid: 438,
        goodsweight: 1,
        goodsvolume: '2 * 2 * 2',
        Details: '详情信息选填',
        Specifications1: 'H',
        Specifications2: '',
        Specificationsimg: 'C:\Users\Administrator\Desktop\test1.png',
        skuprice: 19,
        skunum: 222,
        Rotationimg: 'D:\商品图片\test1.png,D:\商品图片\test2.png,D:\商品图片\test3.png',
        Detailsimg: 'D:\商品图片\test1.png,D:\商品图片\test2.png,D:\商品图片\test3.png',
        sizeimg: 'D:\商品图片\test1.png,D:\商品图片\test2.png,D:\商品图片\test3.png'
      }],
      CreatetableData: [],
      Specifications1: '规格一',
      Specifications2: '规格二',
      showtwo: false,
      showlog: true,
      Loading1: false,
      currentData: [],
      Loading3: false,
      CreateVisible: false,
      currentPage: 1,
      tableData: [],
      total: 0,
      pageSize: 50,
      page: 1,
      form: {
        returnCreateTime: [new Date().getTime() - 3600 * 1000 * 24 * 30, new Date()], // 商品创建时间
        returnCategory: '', // 商品类目
        returnStatus: 0, // 商品状态
        returnUpdateTime: [new Date().getTime() - 3600 * 1000 * 24 * 30, new Date()], // 商品更新时间
        returnSkuId: '', // sku编码
        returnGoodsName: '', // 商品名称
        returnGoodsId: '' // 商品ID
      },
      returnStatusList: [
        { value: 1, label: '在售' },
        { value: 2, label: '已下架' }
      ],
      returnCreateStatusList: [
        { value: 1, label: '在售' },
        { value: 2, label: '已下架' }
      ]
    }
  },
  mounted() {
    this.getproductlist()
  },
  methods: {
    // 批量更新
    async updateall() {
      if (this.createskuid === '') {
        this.$message.error(`商品货号为空，请输入商品货号！`)
        return
      }
      if (this.CreatetableData.length === 0) {
        this.$message.error(`此时没有数据，请插入数据后重试！`)
        return
      }
      if (this.createprice === '') {
        this.$message.error(`价格格式不正确！`)
        return
      }
      if (this.createnum === '') {
        this.$message.error(`数量格式不正确！`)
        return
      }
      for (let i = 0; i < this.CreatetableData.length; i++) {
        if (this.CreatetableData[i].skuid === this.createskuid) {
          this.CreatetableData[i].productnum = this.createnum
          this.CreatetableData[i].price = this.createprice
          this.$message.success(`批量修改成功！`)
        } else {
          this.$message.error(`无匹配商品货号，请输入正确的商品货号！`)
        }
      }
      return
    },
    // 规格二取消打勾
    cancel() {
      if (this.showtwo === false) {
        for (let i = 0; i < this.CreatetableData.length; i++) {
          this.CreatetableData[i].Specification2 = ''
        }
      }
    },
    // 删除创建商品规格一
    async delcreatel(index) {
      if (this.CreatetableData[index].Specification2 === '') {
        this.CreatetableData.splice(index, 1)
      } else {
        this.CreatetableData[index].Specification1 = ''
      }
    },
    // 删除创建商品规格二
    async delcreatel2(index) {
      if (this.CreatetableData[index].Specification1 === '') {
        this.CreatetableData.splice(index, 1)
      } else {
        this.CreatetableData[index].Specification2 = ''
      }
    },
    // 添加规格选项一
    async addassembly() {
      this.CreatetableData.push({
        Specification1: '',
        Specification2: '',
        img: '',
        price: 0,
        productnum: 0,
        skuid: ''
      })
    },
    // 添加规格选项二
    async addassembly2() {
      if (this.CreatetableData.length > 0) {
        this.isnull = true
        for (let i = 0; i < this.CreatetableData.length; i++) {
          if (this.CreatetableData[i].Specification2 === '') {
            this.isnull = false
          }
        }
      }
      if (this.CreatetableData.length === 0 || this.isnull) {
        this.CreatetableData.push({
          Specification1: '',
          Specification2: '',
          img: '',
          price: 0,
          productnum: 0,
          skuid: ''
        })
      }
    },
    // 创建商品
    async Creategoods() {
      this.CreateVisible = true
    },
    // 编辑商品
    async Eidtgoods(val) {
      this.EidtVisible = true
    },
    // 删除功能
    async del(val) {
      this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const { data } = await this.$api.deleteproduct({
          product_id: val.product_id,
          uid: ''
        })
        if (data.message === 'success') {
          this.$message.success(`删除成功`)
        } else {
          this.$message.error(`删除失败${data.message}`)
        }
        this.getoverseaslupplementlist()
      })
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
    // 表格导入
    importTemplate(file) {
      const files = { 0: file.raw }
      if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
        this.$refs.Logs.writeLog('格式错误,请上传xls、xlsx格式的文件', false)
        this.showConsole = false
        return
      }
      if (files.length <= 0) {
        this.$refs.Logs.writeLog('表格为空', false)
        this.showConsole = false
        return
      }
      const fileReader = new FileReader()
      fileReader.onload = ev => {
        const data = ev.target.result
        const workbook = XLSX.read(data, {
          type: 'binary'
        })
        const wsname = workbook.SheetNames[0] // 取第一张表
        let ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]) // 生成Json表格
        this.importTemplateData = ws
        this.batchImport()
        ws = null
        this.$refs.importRef.value = ''
      }
      fileReader.readAsBinaryString(files[0])
    },
    // 下载模板
    downloadTemplate() {
      // 下载修改店铺水印模板
      let template = `<tr>
      <td style="width: 200px; text-align:left;">商品名称<span style="color:red">(必填)</span></td>
      <td style="width: 200px; text-align:left;">商品类目ID<span style="color:red">(必填，请复制程序中的类目ID,可在类目窗口进行选择)</span></td>
      <td style="width: 200px; text-align:left;">商品净重(kg)<span style="color:red">(选填)</span></td>
      <td style="width: 200px; text-align:left;">商品体积(cm)<span style="color:red">(选填，格式 长*宽*高)</span></td>
      <td style="width: 200px; text-align:left;">详情信息<span style="color:red">(选填)</span></td>
      <td style="width: 200px; text-align:left;">规格一<span style="color:red">(必填，一行一个)</span></td>
      <td style="width: 200px; text-align:left;">规格二<span style="color:red">(选填，一行一个)</span></td>
      <td style="width: 200px; text-align:left;">规格图<span style="color:red">(必填，一行一张)</span></td>
      <td style="width: 200px; text-align:left;">SKU价格<span style="color:red">(必填，一行一个价格)</span></td>
      <td style="width: 200px; text-align:left;">SKU库存<span style="color:red">(必填，一行一个库存)</span></td>
      <td style="width: 200px; text-align:left;">轮播图<span style="color:red">(选填，同一商品名称，只需要填写一次，使用英文逗号隔开(','),默认第一张为主图)</span></td>
      <td style="width: 200px; text-align:left;">详情图片<span style="color:red">(选填，同一商品名称，只需要填写一次，使用英文逗号隔开(','))</span></td>
      <td style="width: 200px; text-align:left;">尺寸图片<span style="color:red">(选填，同一商品名称，只需要填写一次，使用英文逗号隔开(','))</span></td>
      </tr>`
      this.demonstration.map((item) => {
        template += `
        <tr>
          <td style="text-align:left;">${item.goodsname}</td>
          <td style="text-align:left;">${item.skuid}</td>
          <td style="text-align:left;">${item.goodsweight || ''}</td>
          <td style="text-align:left;">${item.goodsvolume || ''}</td>
          <td style="text-align:left;">${item.Details || ''}</td>
          <td style="text-align:left;">${item.Specifications1}</td>
          <td style="text-align:left;">${item.Specifications2 || ''}</td>
          <td style="text-align:left;">${item.Specificationsimg}</td>
          <td style="text-align:left;">${item.skuprice}</td>
          <td style="text-align:left;">${item.skunum}</td>
          <td style="text-align:left;">${item.Rotationimg || ''}</td>
          <td style="text-align:left;">${item.Detailsimg || ''}</td>
          <td style="text-align:left;">${item.sizeimg || ''}</td>
        </tr>
        `
      })
      exportExcelDataCommon('自有商品模板', template)
    },
    // 查询功能
    async getproductlist() {
      this.Loading1 = true
      this.Loading3 = true
      const returnstart_time = this.form.returnCreateTime ? `${this.$dayjs(this.form.returnCreateTime[0]).format('YYYY-MM-DD HH:mm:ss')}` : ''
      const returnend_time = this.form.returnCreateTime ? `${this.$dayjs(this.form.returnCreateTime[1]).format('YYYY-MM-DD HH:mm:ss')}` : ''
      const returnupdatestart_time = this.form.returnUpdateTime ? `${this.$dayjs(this.form.returnUpdateTime[0]).format('YYYY-MM-DD HH:mm:ss')}` : ''
      const returnupdateend_time = this.form.returnUpdateTime ? `${this.$dayjs(this.form.returnUpdateTime[1]).format('YYYY-MM-DD HH:mm:ss')}` : ''
      const parmas = {
        start_time: returnstart_time, // 商品创建开始时间
        end_time: returnend_time, // 商品创建结束时间
        cate_id: this.form.returnCategory, // 商品类目
        status: Number(this.form.returnStatus), // 商品状态
        update_start_time: returnupdatestart_time, // 商品更新开始时间
        update_end_time: returnupdateend_time, // 商品更新结束时间
        sku_id: this.form.returnSkuId, // SkuId
        product_name: this.form.returnGoodsName, // 产品名称
        product_id: this.form.returnGoodsId // 产品id
      }
      console.log('parmas', parmas)
      try {
        const { data } = await this.$api.getproductlist(parmas)
        // console.log(data)
        // console.log(data.data.data.lastItem.sku_list.lastItem.sku_num)
        if (data.code === 200) {
          this.tableData = data.data.data
          console.log(this.tableData)
          this.total = data.data.total
        } else {
          this.$message.error(`数据获取失败${data.message}`)
        }
      } catch (error) {
        console.log(error)
      }
      this.Loading1 = false
      this.Loading3 = false
    },
    // 数据导出功能
    async DerivedData() {
      this.Loading2 = true
      if (this.tableData.length) {
        let msg = `<tr>
        <td style="width: 200px; text-align:left;">商品ID</td>
        <td style="width: 200px; text-align:left;">商品名称</td>
        <td style="width: 200px; text-align:left;">商品类目</td>
        <td style="width: 200px; text-align:left;">商品主图</td>
        <td style="width: 200px; text-align:left;">商品状态</td>
        <td style="width: 200px; text-align:left;">价格</td>
        <td style="width: 200px; text-align:left;">库存</td>
        <td style="width: 200px; text-align:left;">备注</td>
        <td style="width: 200px; text-align:left;">创建时间</td>
        <td style="width: 200px; text-align:left;">更新时间</td>
      </tr>`
        this.tableData.map((item) => {
          msg += `
        <tr>
          <td style="text-align:left;">${item.product_id || ''}</td>
          <td style="text-align:left;">${item.wid || ''}</td>
          <td style="text-align:left;">${item.sys_sku_id || ''}</td>
          <td style="text-align:left;">${item.sku_id || ''}</td>
          <td style="text-align:left;">${item.goods_name || ''}</td>
          <td style="text-align:left;">${item.sku_name || ''}</td>
          <td style="text-align:left;">${item.stock_num || ''}</td>
          <td style="text-align:left;">${item.shared_num || ''}</td>
          <td style="text-align:left;">${item.sku_price || ''}</td>
          <td style="text-align:left;">${item.sku_url || ''}</td>
        </tr>
        `
        })
        exportExcelDataCommon('自有商品信息', msg)
        this.Loading2 = false
      } else {
        this.Loading2 = false
        return this.$notify({
          title: '商品信息',
          type: 'warning',
          message: `没有可以导出的商品`
        })
      }
    },
    handleSizeChange(val) {
      this.page = 1
      this.pageSize = val
      this.getoverseaslupplementlist()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getoverseaslupplementlist()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../../module-less/product-center-less/own-goods.less';
</style>
