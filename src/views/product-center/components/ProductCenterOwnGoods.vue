
<template>
  <div class="product-center">
    <div class="selectBox">
      <div class="select-row">
        <div class="item-box">
          <span style="width: 80px">商品创建时间:</span>
          <el-date-picker
            v-model="form.returnCreateTime"
            value-format="yyyy-MM-dd"
            unlink-panels
            size="mini"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 220px"
          />
        </div>
        <div class="item-box">
          <product-choose ref="isClean" @CateId="CateId" class="mar-left" />
        </div>
        <div class="item-box mar-left">
          <span>商品状态：</span>
          <el-select v-model="form.returnStatus" placeholder="" size="mini" filterable>
            <el-option label="全部" :value="-1" />
            <el-option v-for="(item, index) in returnStatusList" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </div>
      </div>
      <div class="select-row">
        <div class="item-box">
          <span style="width: 80px">商品更新时间:</span>
          <el-date-picker
            v-model="form.returnUpdateTime"
            value-format="yyyy-MM-dd"
            unlink-panels
            size="mini"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 220px"
          />
        </div>
        <!-- <div class="item-box">
          <span class="mar-left">Sku编码：</span>
          <el-input v-model="form.returnSkuId" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" style="width: 178px" />
        </div> -->
        <div class="item-box">
          <span class="mar-left">商品名称：</span>
          <el-input v-model="form.returnGoodsName" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" style="width: 178px" />
        </div>
        <div class="item-box">
          <span>商品ID：</span>
          <el-input v-model="form.returnGoodsId" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" style="width: 178px" />
        </div>
        <el-button type="primary" size="mini" @click="getProductList" class="mar-left">查询</el-button>
        <el-button type="primary" size="mini" @click="exportData">导出数据</el-button>
        <el-button type="primary" size="mini" @click="createVisible = true">创建商品</el-button>
        <el-upload style="margin-left: 20px" class="upload-demo" ref="upload" accept=".xlsx,.xls" :on-change="uploadShip" action="" :show-file-list="false" :auto-upload="false">
          <el-button type="primary" size="mini">导入商品</el-button>
        </el-upload>
        <el-button type="primary" size="mini" @click="downloadTemplate" class="mar-left">下载导入模板</el-button>
        <el-checkbox v-model="showlog" style="margin-left: 10px">隐藏日志</el-checkbox>
      </div>
    </div>
    <div class="content">
      <el-table
        ref="plTable"
        v-loading="tableLoading"
        header-align="center"
        height="calc(100vh - 183px)"
        :data="tableData"
        :header-cell-style="{
          backgroundColor: '#f5f7fa',
        }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column align="center" type="selection" width="50" />
        <el-table-column align="center" label="商品ID" width="100" prop="product_id" fixed />
        <el-table-column align="center" prop="product_name" label="商品名称" width="120" show-overflow-tooltip />
        <el-table-column v-if="false" align="center" prop="weight" label="商品重量" width="100" />
        <el-table-column v-if="false" align="center" prop="volume" label="体积" width="100" />
        <el-table-column v-if="false" align="center" prop="uid" label="uid" width="100" />
        <el-table-column v-if="false" align="center" prop="cate_id" label="商品类目id" width="150" />
        <el-table-column align="center" prop="cate_name" label="商品类目" width="200" />
        <el-table-column width="90" align="center" label="商品主图">
          <template slot-scope="{ row }">
            <el-tooltip v-if="row.image_url" effect="light" placement="right-end" :visible-arrow="false" :enterable="false" style="width: 90px; height: 50px">
              <div slot="content">
                <img :src="row.image_url" width="400px" height="280px" />
              </div>
              <el-image style="width: 40px; height: 40px" :src="row.image_url" />
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="商品状态" width="160" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.status == 0 ? '在售' : '已下架' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="价格" width="120" align="center" />
        <el-table-column prop="stock" label="库存" width="140" align="center" />
        <el-table-column prop="remark" label="备注" width="140" align="center" />
        <el-table-column prop="created_at" label="创建时间" width="140" align="center" />
        <el-table-column prop="updated_at" label="更新时间" width="140" align="center" />
        <el-table-column label="操作" align="center">
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini" @click="editGoods(row)">编辑</el-button>
            <el-button type="primary" size="mini" @click="deleteProduct(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          :page-sizes="[20, 50, 100]"
          :page-size="pageSize"
          :current-page.sync="currentPage"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
    <Logs ref="Logs" v-model="showlog" clear />
    <el-dialog :visible.sync="createVisible" v-if="createVisible" :close-on-click-modal="false" :close-on-press-escape="false" width="1200px" @close="closeDialog">
      <div slot="title">{{ activeRow.product_id ? '编辑商品' : '创建商品' }}</div>
      <div class="create-product-style">
        <div class="item-box">
          <span>商品名称：</span>
          <el-input v-model="goodsName" size="mini" maxlength="255" show-word-limit placeholder="请输入商品名称" style="width: 80%"></el-input>
        </div>
        <div class="item-box mar-top">
          <product-choose ref="isClean" :isAll="true" :cataInfo="editCateIds" @CateId="cataInfo" />
        </div>
        <div class="item-box mar-top">
          <div class="item-box">
            <span>商品状态：</span>
            <el-select v-model="goodStatus" placeholder="" size="mini" filterable style="width: 120px">
              <el-option v-for="(item, index) in returnStatusList" :key="index" :label="item.label" :value="item.value" />
            </el-select>
          </div>
          <div class="item-box mar-left">
            <span>备注：</span>
            <el-input v-model="goodsRemark" size="mini" style="width: 200px"></el-input>
          </div>
        </div>
        <div class="item-box mar-top">
          <span class="span-label"></span>
          <span>销售资料</span>
        </div>
        <el-row class="mar-top">
          <el-col :span="8">
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
                      <el-select v-model="item.sku_name" placeholder="" size="mini" filterable :allow-create="true" @change="sepcInput($event, i)">
                        <el-option v-for="(item, index) in skucode" :key="index" :label="item.zh_name" :value="item.zh_name" />
                      </el-select>
                      <div v-if="item.sku_image" style="width: 42px; height: 42px">
                        <el-image :src="item.sku_image" style="width: 100%; height: 100%" @click="item.sku_image = ''" />
                      </div>
                      <div v-else>
                        <el-upload class="sku-image-uploader" action="#" :show-file-list="false" :on-progress="successFile">
                          <i class="el-icon-plus avatar-uploader-icon" @click="setImgFlag('sku', i)"></i>
                        </el-upload>
                        <!-- <el-upload class="sku-image-uploader" action="#" :auto-upload="false" :show-file-list="false" list-type="picture-card" :on-progress="successFile">
                          <i class="el-icon-plus" @click="setImgFlag('sku', i)" />
                        </el-upload> -->
                      </div>
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
          <el-col :span="8" class="mar-left">
            <div class="sku-box">
              <div class="sku-title">
                <el-checkbox v-model="skuSecondCheck">规格二</el-checkbox>
              </div>
              <div class="sku-item">
                <div class="tool-item">
                  <span>规格名称</span>
                  <el-input v-model="spec2name" placeholder="" size="mini" clearable :disabled="!skuSecondCheck" />
                </div>
                <div class="tool-item">
                  <span>选项</span>
                  <div class="sku-item-box">
                    <div v-for="(item, i) in skuSpec2" :key="i + 'spec2'" class="sku-Spec">
                      <el-select v-model="item.sku_name" placeholder="" size="mini" filterable :allow-create="true" @change="sepcInput($event, i)">
                        <el-option v-for="(item, index) in skucode" :key="index" :label="item.zh_name" :value="item.zh_name" />
                      </el-select>
                      <!-- <el-input v-model="item.sku_name" placeholder="" size="mini" clearable class="mar-right" :disabled="!skuSecondCheck || item.sku_disabled" @input="sepcInput($event, i)" /> -->
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
        <el-row class="item-box mar-top">
          <span>规格资讯</span>
          <div class="item-box">
            <span>商品价格</span>
            <el-input v-model="goodsPrice" size="mini" style="width: 120px"></el-input>
          </div>
          <div class="item-box mar-left">
            <span>商品数量</span>
            <el-input v-model="goodsNum" size="mini" style="width: 120px"></el-input>
          </div>
          <div class="item-box mar-left">
            <span>商品货号</span>
            <el-input v-model="goodsNo" size="mini" style="width: 120px"></el-input>
          </div>
          <el-button size="mini" type="primary" class="mar-left" @click="batchChangeSku">批量更新</el-button>
        </el-row>
        <div class="item-box mar-top">
          <el-table ref="skuTable" :data="skuList" tooltip-effect="dark" height="280">
            <el-table-column align="center" type="index" label="序号" width="50" />
            <el-table-column width="120px" label="规格一" prop="sku_name1" align="center">
              <template slot-scope="scope">{{ scope.row.sku_name1 }}</template>
            </el-table-column>
            <el-table-column width="120px" label="规格二" prop="sku_name" align="center">
              <template slot-scope="scope"> {{ scope.row.sku_name2 }}</template>
            </el-table-column>
            <el-table-column width="120px" label="库存" prop="stock_num" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.stock_num" placeholder="" size="mini" />
              </template>
            </el-table-column>
            <el-table-column width="120px" label="价格" prop="sku_price" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.sku_price" placeholder="" size="mini" />
              </template>
            </el-table-column>
            <el-table-column min-width="60px" label="规格图" prop="sku_image" align="center">
              <template slot-scope="scope">
                <el-image :src="scope.row.sku_image" style="width: 42px; height: 42px">
                  <div slot="error" class="image-slot" />
                </el-image>
              </template>
            </el-table-column>
            <el-table-column width="140px" label="商品货号" prop="sku_name" align="center">
              <template slot-scope="scope">{{ scope.row.sku_no }}</template>
            </el-table-column>
          </el-table>
        </div>
        <div class="item-box mar-top">
          <span class="span-label"></span>
          <span>媒体管理</span>
        </div>
        <div class="item-box mar-top">
          <span>轮播图片</span>
          <div class="img-box">
            <div class="image-item" v-for="(item, index) in slideImageList" :key="index">
              <img :src="item" />
              <div class="form-item">
                <div class="btn2" @click="replaceImage('slide', index)">替换</div>
                <div class="btn2" @click="deleteImage('slide', index)">删除</div>
              </div>
            </div>
            <el-upload class="avatar-uploader" action="#" :show-file-list="false" :on-progress="successFile">
              <i class="el-icon-plus avatar-uploader-icon" @click="setImgFlag('slide')"></i>
            </el-upload>
          </div>
        </div>
        <div class="item-box mar-top">
          <span>详情图片</span>
          <div class="img-box">
            <div class="image-item" v-for="(item, index) in detailImageList" :key="index">
              <img :src="item" />
              <div class="form-item">
                <div class="btn2" @click="replaceImage('detail', index)">替换</div>
                <div class="btn2" @click="deleteImage('detail', index)">删除</div>
              </div>
            </div>
            <el-upload class="avatar-uploader" action="#" :show-file-list="false" :on-progress="successFile">
              <i class="el-icon-plus avatar-uploader-icon" @click="setImgFlag('detail')"></i>
            </el-upload>
          </div>
        </div>
        <div class="item-box mar-top">
          <span>尺寸图片</span>
          <div class="img-box">
            <div class="image-item" v-for="(item, index) in sizeImageList" :key="index">
              <img :src="item" />
              <div class="form-item">
                <div class="btn2" @click="replaceImage('size', index)">替换</div>
                <div class="btn2" @click="deleteImage('size', index)">删除</div>
              </div>
            </div>
            <el-upload class="avatar-uploader" action="#" :show-file-list="false" :on-progress="successFile">
              <i class="el-icon-plus avatar-uploader-icon" @click="setImgFlag('size')"></i>
            </el-upload>
          </div>
        </div>
        <div class="item-box mar-top">
          <span class="span-label"></span>
          <p>出库及配送相关</p>
        </div>
        <div class="item-box mar-top">
          <span>商品重量</span>
          <el-input v-model="goodsWeight" size="mini" style="width: 120px"></el-input>kg
          <div class="mar-left">长<el-input v-model="goodsLength" size="mini" style="width: 120px"></el-input>cm</div>
          <div class="mar-left">宽<el-input v-model="goodsWidth" size="mini" style="width: 120px"></el-input>cm</div>
          <div class="mar-left">高<el-input v-model="goodsHeight" size="mini" style="width: 120px"></el-input>cm</div>
        </div>
        <div class="item-box mar-top">
          <span class="span-label"></span>
          <p>出库及配送相关</p>
        </div>
        <div class="item-box mar-top">
          <span>商品描述</span>
          <el-input type="textarea" resize="none" :rows="10" v-model="goodsDes" clearable size="mini"> </el-input>
        </div>
        <!-- <div class="item-box mar-top" style="justify-content: center">
          <el-button size="mini" type="primary" @click="saveProduct">保 存</el-button>
        </div> -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="saveProduct">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ProductChoose from '../../../components/product-choose-product-center.vue'
import { creatDate, exportExcelDataCommon, randomWord } from '../../../util/util'
import XLSX from 'xlsx'
export default {
  components: {
    ProductChoose,
  },
  data() {
    return {
      form: {
        returnCreateTime: [], // 商品创建时间
        returnCategory: '', // 商品类目
        returnStatus: -1, // 商品状态,
        returnUpdateTime: [], // 商品更新时间
        // returnSkuId: '', // sku编码
        returnGoodsName: '', // 商品名称
        returnGoodsId: '', // 商品ID
      },
      showlog: true,
      tableLoading: false,
      multipleSelection: [],
      tableData: [],
      pageSize: 20, // 分页
      currentPage: 1, // 分页
      total: 0, // 分页
      returnStatusList: [
        { value: 0, label: '在售' },
        { value: 1, label: '已下架' },
      ],
      createVisible: false,
      goodsName: '', //商品名
      goodStatus: 0, //商品状态
      goodsRemark: '', //商品备注
      skuSecondCheck: false, //规格二
      spec1name: '规格一',
      spec2name: '规格二',
      goodsPrice: '', //商品价格,
      goodsNum: '', //商品数量
      goodsNo: '', //商品货号
      slideImageList: [], //轮播图
      detailImageList: [], //详情图
      sizeImageList: [], //尺寸图
      goodsWeight: 0, //商品重量
      goodsLength: 0, //商品长
      goodsWidth: 0, //商品宽
      goodsHeight: 0, //商品高
      goodsDes: '', //商品描述
      imgFlage: '', //
      skuSpec1: [],
      skuSpec2: [],
      skuList: [],
      skuImgIndex: 0,
      skuListCopy: [],
      skucode: [],
      spec1: '',
      createCateInfo: {},
      activeRow: {},
      editCateIds: [],
      demonstration: [
        {
          // 导出模板示例数据
          goodsname: '导入测试鞋子类目',
          skuid: 438,
          goodsweight: 1,
          goodsvolume: '2 * 2 * 2',
          Details: '详情信息选填',
          status: 1,
          Specifications1: 'SB',
          Specifications2: '',
          Specificationsimg: 'http://pkg.91cyt.com/tmp/1638518612974.png',
          skuprice: 19,
          skunum: 222,
          Rotationimg: 'http://pkg.91cyt.com/tmp/1638518612974.png',
          Detailsimg: 'http://pkg.91cyt.com/tmp/1638518612974.png',
          sizeimg: 'http://pkg.91cyt.com/tmp/1638518612974.png',
        },
        {
          goodsname: '导入测试鞋子类目',
          skuid: 438,
          goodsweight: 1,
          goodsvolume: '2 * 2 * 2',
          Details: '详情信息选填',
          status: 1,
          Specifications1: 'R',
          Specifications2: '',
          Specificationsimg: 'http://pkg.91cyt.com/tmp/1638518612974.png',
          skuprice: 19,
          skunum: 222,
          Rotationimg: 'http://pkg.91cyt.com/tmp/1638518612974.png',
          Detailsimg: 'http://pkg.91cyt.com/tmp/1638518612974.png',
          sizeimg: 'http://pkg.91cyt.com/tmp/1638518612974.png',
        },
        {
          goodsname: '导入测试鞋子类目',
          skuid: 438,
          goodsweight: 1,
          goodsvolume: '2 * 2 * 2',
          Details: '详情信息选填',
          status: 1,
          Specifications1: 'PD',
          Specifications2: '',
          Specificationsimg: 'http://pkg.91cyt.com/tmp/1638518612974.png',
          skuprice: 19,
          skunum: 222,
          Rotationimg: 'http://pkg.91cyt.com/tmp/1638518612974.png',
          Detailsimg: 'http://pkg.91cyt.com/tmp/1638518612974.png',
          sizeimg: 'http://pkg.91cyt.com/tmp/1638518612974.png',
        },
        {
          goodsname: '导入测试鞋子类目',
          skuid: 438,
          goodsweight: 1,
          goodsvolume: '2 * 2 * 2',
          Details: '详情信息选填',
          status: 1,
          Specifications1: 'DGR',
          Specifications2: '',
          Specificationsimg: 'http://pkg.91cyt.com/tmp/1638518612974.png',
          skuprice: 19,
          skunum: 222,
          Rotationimg: 'http://pkg.91cyt.com/tmp/1638518612974.png',
          Detailsimg: 'http://pkg.91cyt.com/tmp/1638518612974.png',
          sizeimg: 'http://pkg.91cyt.com/tmp/1638518612974.png',
        },
        {
          goodsname: '导入测试鞋子类目',
          skuid: 438,
          goodsweight: 1,
          goodsvolume: '2 * 2 * 2',
          Details: '详情信息选填',
          status: 1,
          Specifications1: 'PU',
          Specifications2: '',
          Specificationsimg: 'http://pkg.91cyt.com/tmp/1638518612974.png',
          skuprice: 19,
          skunum: 222,
          Rotationimg: 'http://pkg.91cyt.com/tmp/1638518612974.png',
          Detailsimg: 'http://pkg.91cyt.com/tmp/1638518612974.png',
          sizeimg: 'http://pkg.91cyt.com/tmp/1638518612974.png',
        },
        {
          goodsname: '导入测试鞋子类目',
          skuid: 438,
          goodsweight: 1,
          goodsvolume: '2 * 2 * 2',
          Details: '详情信息选填',
          status: 1,
          Specifications1: 'B',
          Specifications2: '',
          Specificationsimg: 'http://pkg.91cyt.com/tmp/1638518612974.png',
          skuprice: 19,
          skunum: 222,
          Rotationimg: 'http://pkg.91cyt.com/tmp/1638518612974.png',
          Detailsimg: 'http://pkg.91cyt.com/tmp/1638518612974.png',
          sizeimg: 'http://pkg.91cyt.com/tmp/1638518612974.png',
        },
        {
          goodsname: '导入测试鞋子类目',
          skuid: 438,
          goodsweight: 1,
          goodsvolume: '2 * 2 * 2',
          Details: '详情信息选填',
          status: 1,
          Specifications1: 'BL',
          Specifications2: '',
          Specificationsimg: 'http://pkg.91cyt.com/tmp/1638518612974.png',
          skuprice: 19,
          skunum: 222,
          Rotationimg: 'http://pkg.91cyt.com/tmp/1638518612974.png',
          Detailsimg: 'http://pkg.91cyt.com/tmp/1638518612974.png',
          sizeimg: 'http://pkg.91cyt.com/tmp/1638518612974.png',
        },
        {
          goodsname: '导入测试鞋子类目',
          skuid: 438,
          goodsweight: 1,
          goodsvolume: '2 * 2 * 2',
          Details: '详情信息选填',
          status: 1,
          Specifications1: 'Y',
          Specifications2: '',
          Specificationsimg: 'http://pkg.91cyt.com/tmp/1638518612974.png',
          skuprice: 19,
          skunum: 222,
          Rotationimg: 'http://pkg.91cyt.com/tmp/1638518612974.png',
          Detailsimg: 'http://pkg.91cyt.com/tmp/1638518612974.png',
          sizeimg: 'http://pkg.91cyt.com/tmp/1638518612974.png',
        },
      ],
      excelImportData: [],
    }
  },
  mounted() {
    // let end = this.$dayjs(new Date().getTime()).format('YYYY-MM-DD')
    // let start = this.$dayjs(new Date().getTime() - 1 * 24 * 60 * 60 * 1000).format('YYYY-MM-DD')
    // this.form.returnCreateTime = [start, end]
    this.getProductList()
    this.getskucode()
  },
  methods: {
    filterSelect(val, index, key) {
      this[key][index].sku_name = val
      console.log('filterSelect', val)
    },
    //导出数据
    async exportData() {
      let exportData = []
      if (this.multipleSelection.length) {
        exportData = this.multipleSelection
      } else {
        const returnCreateStartTime = this.form.returnCreateTime && this.form.returnCreateTime.length ? `${this.form.returnCreateTime[0]} 00:00:00` : ''
        const returnCreateEndTime = this.form.returnCreateTime && this.form.returnCreateTime.length ? `${this.form.returnCreateTime[1]} 23:59:59}` : ''
        const returnUpdateStartTime = this.form.returnUpdateTime && this.form.returnUpdateTime.length ? `${this.form.returnUpdateTime[0]} 00:00:00` : ''
        const returnUpdateEndTime = this.form.returnUpdateTime && this.form.returnUpdateTime.length ? `${this.form.returnUpdateTime[1]} 23:59:59}` : ''
        let params = {
          // 产品中心条件搜索
          CateId: Number(this.form.returnCategory), // 类目ID
          ProductName: this.form.returnGoodsName, // 商品名称
          ProductId: this.form.returnGoodsId, // 商品编码
          // SkuId: this.form.returnSkuId, // SKU编码
          Status: this.form.returnStatus, // 商品状态
          StartTime: returnCreateStartTime, // 商品创建时间
          EndTime: returnCreateEndTime, // 商品创建结束时间
          UpdateStartTime: returnUpdateStartTime, // 商品更新开始时间
          UpdateEndTime: returnUpdateEndTime, // 商品更新结束时间
        }
        params['page'] = this.currentPage
        params['page_size'] = this.pageSize
        this.tableLoading = true
        const res = await this.$commodityService.getProductList(params)
        let resObj = res && JSON.parse(res)
        let array = resObj && resObj.status_code ? resObj.data.data : []
        while (array.length) {
          exportData = exportData.concat(array)
          if (array.length < this.pageSize) {
            array = []
          } else {
            params['page']++
            const res = await this.$commodityService.getProductList(params)
            let resObj = res && JSON.parse(res)
            array = resObj && resObj.status_code ? resObj.data.data : []
          }
        }
        this.tableLoading = false
        console.log(resObj, 'resObj')
      }
      this.exportDetail(exportData)
    },
    async exportDetail(exportData) {
      if (!exportData.length) {
        return this.$message.warning('没有可导出的数据！')
      }
      let str = `<tr>
        <td>商品ID</td>
        <td>商品名称</td>
        <td>商品类目</td>
        <td>商品主图</td>
        <td>SKU名称</td>
        <td>颜色</td>
        <td>尺寸</td>
        <td>长</td>
        <td>宽</td>
        <td>高</td>
        <td>重量</td>
        <td>商品状态</td>
        <td>价格</td>
        <td>库存</td>
        <td>备注</td>
        <td>创建时间</td>
        <td>更新时间</td>
    </tr>`
      for (let i = 0; i < exportData.length; i++) {
        let row = exportData[i]
        let res = await this.$commodityService.getdetails({
          priductid: row.product_id,
          language: '',
        })
        let resObj = res && JSON.parse(res)
        if (resObj.status_code === 200) {
          row = resObj.data
        }
        if (row.sku_list && row.sku_list.length) {
          row.sku_list.forEach((skuInfo) => {
            str += `<tr><td>${row.product_id ? row.product_id : '' + '\t'}</td>
                    <td>${row.product_name ? row.product_name : '' + '\t'}</td>
                    <td>${row.cate_name ? row.cate_name : '' + '\t'}</td>
                    <td>${row.image_url ? row.image_url : '' + '\t'}</td>
                    <td>${skuInfo.Sku_name ? skuInfo.Sku_name : '' + '\t'}</td>
                    <td>${skuInfo.Sku_spec.length ? skuInfo.Sku_spec[0].Spec_value : '' + '\t'}</td>
                    <td>${skuInfo.Sku_spec.length == 2 ? skuInfo.Sku_spec[1].Spec_value : '' + '\t'}</td>
                    <td>${row.volume && row.volume.split('*')[0] ? row.volume.split('*')[0] : '' + '\t'}</td>
                    <td>${row.volume && row.volume.split('*')[1] ? row.volume.split('*')[1] : '' + '\t'}</td>
                    <td>${row.volume && row.volume.split('*')[2] ? row.volume.split('*')[2] : '' + '\t'}</td>
                    <td>${row.weight ? row.weight : '' + '\t'}</td>
                    <td>${row.status === 0 ? '在售' : '已下架' + '\t'}</td>
                     <td>${skuInfo.Price ? skuInfo.Price : '' + '\t'}</td>
                     <td>${skuInfo.Stock ? skuInfo.Stock : '' + '\t'}</td>
                     <td>${row.created_at ? row.created_at : '' + '\t'}</td>
                     <td>${row.updated_at ? row.updated_at : '' + '\t'}</td>
                </tr>`
          })
        } else {
          str += `<tr><td>${row.product_id ? row.product_id : '' + '\t'}</td>
                    <td>${row.product_name ? row.product_name : '' + '\t'}</td>
                    <td>${row.cate_name ? row.cate_name : '' + '\t'}</td>
                    <td>${row.image_url ? row.image_url : '' + '\t'}</td>
                    <td>${'' + '\t'}</td>
                    <td>${'' + '\t'}</td>
                    <td>${'' + '\t'}</td>
                    <td>${row.volume && row.volume.split('*')[0] ? row.volume.split('*')[0] : '' + '\t'}</td>
                    <td>${row.volume && row.volume.split('*')[1] ? row.volume.split('*')[1] : '' + '\t'}</td>
                    <td>${row.volume && row.volume.split('*')[2] ? row.volume.split('*')[2] : '' + '\t'}</td>
                    <td>${row.weight ? row.weight : '' + '\t'}</td>
                    <td>${row.status === 0 ? '在售' : '已下架' + '\t'}</td>
                     <td>${row.price ? row.price : '' + '\t'}</td>
                     <td>${row.stock ? row.stock : '' + '\t'}</td>
                     <td>${row.created_at ? row.created_at : '' + '\t'}</td>
                     <td>${row.updated_at ? row.updated_at : '' + '\t'}</td>
                </tr>`
        }
        console.log(row, resObj, 'resObj')
      }
      exportExcelDataCommon('产品中心数据', str)
    },
    //导入数据
    uploadShip(file, fileList) {
      let files = { 0: file.raw }
      this.readExcel(files)
    },
    async readExcel(files) {
      this.showlog = false
      // this.tableData = []
      this.$refs.Logs.writeLog(`读取文件开始`, true)
      if (files.length <= 0) {
        //如果没有文件名
        return false
      } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
        this.$message.error('上传格式不正确，请上传xls或者xlsx格式')
        return false
      }
      const fileReader = new FileReader()
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result
          const workbook = XLSX.read(data, {
            type: 'binary',
          })
          const wsname = workbook.SheetNames[0] //取第一张表
          console.log(wsname, 'wsname')
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]) //生成json表格内容
          console.log(ws, 'ws')
          let sour = ws
          let length = sour.length
          // this.writeLog(`共读取到${length}条数据`, true)
          console.log(length, 'length')
          if (length === 0) {
            this.$message.error('导入信息不能为空')
            return
          }
          let excelData = []
          sour.forEach(async (item) => {
            const productName = item['商品名称(必填)']
            const cateId = item['商品类目ID(必填，请复制程序中的类目ID,可在类目窗口进行选择)']
            const productWeight = item['商品净重(kg)(选填)']
            const productVolume = item['商品体积(cm)(选填，格式 长*宽*高)']
            const productDesc = item['详情信息(选填)']
            const productStatus = item['商品状态(必填)']
            const spec1 = item['规格一(必填，一行一个)']
            const spec2 = item['规格二(选填，一行一个)']
            const skuImage = item['规格图(必填，一行一张)']
            const skuPrice = item['SKU价格(必填，一行一个价格)']
            const skuStock = item['SKU库存(必填，一行一个库存)']
            const slideImage = item["轮播图(选填，同一商品名称，只需要填写一次，使用英文逗号隔开(','),默认第一张为主图)"]
            const detailImage = item["详情图片(选填，同一商品名称，只需要填写一次，使用英文逗号隔开(','))"]
            const sizeImage = item["尺寸图片(选填，同一商品名称，只需要填写一次，使用英文逗号隔开(','))"]

            // let newdata = JSON.parse(
            //   JSON.stringify(item)
            //     .replace('商品名称(必填)', 'productName')
            //     .replace('商品类目ID(必填，请复制程序中的类目ID,可在类目窗口进行选择)', 'cateId')
            //     .replace('商品净重(kg)(选填)', 'productWeight')
            //     .replace('商品体积(cm)(选填，格式 长*宽*高)', 'productVolume')
            //     .replace('详情信息(选填)', 'productDesc')
            //     .replace('商品状态(必填)', 'productStatus')
            //     .replace('规格一(必填，一行一个)', 'spec1')
            //     .replace('规格二(选填，一行一个)', 'spec2')
            //     .replace('规格图(必填，一行一张)', 'skuImage')
            //     .replace('SKU价格(必填，一行一个价格)', 'skuPrice')
            //     .replace('SKU库存(必填，一行一个库存)', 'skuStock')
            //     .replace('轮播图(选填，同一商品名称，只需要填写一次，使用英文逗号隔开(','),默认第一张为主图)', 'slideImage')
            //     .replace('详情图片(选填，同一商品名称，只需要填写一次，使用英文逗号隔开(','))', 'detailImage')
            //     .replace('尺寸图片(选填，同一商品名称，只需要填写一次，使用英文逗号隔开(','))', 'sizeImage')
            // )
            if (productName && cateId && spec1 && skuImage) {
              let params = {
                productName: productName,
                cateId: cateId,
                productWeight: productWeight,
                productVolume: productVolume,
                productDesc: productDesc,
                productStatus: productStatus,
                spec1: spec1,
                spec2: spec2,
                skuImage: skuImage,
                skuPrice: skuPrice,
                skuStock: skuStock,
                slideImage: slideImage,
                detailImage: detailImage,
                sizeImage: sizeImage,
              }
              excelData.push(params)
            }
          })
          this.dealWithExcelData(excelData)
        } catch (error) {
          console.log(error)
        }
      }
      fileReader.readAsBinaryString(files[0])
    },
    //处理导入数据
    dealWithExcelData(excelData) {
      console.log(excelData, 'excelData')
      for (let i = 0; i < excelData.length; i++) {
        let item = excelData[i]
        let hasIndex = this.excelImportData.findIndex((n) => n.productName === item.productName)
        if (hasIndex < 0) {
          let spec1 = {
            sku_name: item.spec1,
            sku_image: item.skuImage,
            sku_price: item.skuPrice,
            sku_stock: item.skuStock,
          }
          let specList1 = [spec1]
          let specList2 = []
          if (item.spec2) {
            let spec2 = {
              sku_name: item.spec2,
            }
            specList2 = [spec2]
          }
          let obj = {
            productName: item.productName,
            productVolume: item.productVolume,
            productDesc: item.productDesc,
            productStatus: item.productStatus,
            cateId: item.cateId,
            specList1: specList1,
            specList2: specList2,
            slideImage: item.slideImage ? item.slideImage.split(',') : [],
            detailImage: item.detailImage ? item.detailImage.split(',') : [],
            sizeImage: item.sizeImage ? item.sizeImage.split(',') : [],
          }
          this.excelImportData.push(obj)
        } else {
          let hasObj = this.excelImportData[hasIndex]
          let specIndex = hasObj.specList1.findIndex((n) => n.sku_name == item.spec1)
          if (specIndex < 0) {
            let spec1 = {
              sku_name: item.spec1,
              sku_image: item.skuImage,
              sku_price: item.skuPrice,
              sku_stock: item.skuStock,
            }
            this.excelImportData[hasIndex].specList1.push(spec1)
          }
          if (item.spec2) {
            let specIndex2 = hasObj.specList2.findIndex((n) => n.sku_name == item.spec2)
            if (specIndex2 < 0) {
              let spec2 = {
                sku_name: item.spec2,
              }
              this.excelImportData[hasIndex].specList2.push(spec2)
            }
          }
        }
      }
      console.log(this.excelImportData, 'this.excelImportData')
      this.$refs.Logs.writeLog(`共导入有效商品【${this.excelImportData.length}】条，开始创建商品`, true)
      this.createImportProduct(this.excelImportData)
    },
    async createImportProduct(productList) {
      for (let i = 0; i < productList.length; i++) {
        let product = productList[i]
        product.specList1 = product.specList1.sort((a, b) => {
          return a.sku_price - b.sku_price
        })
        let skuListParams = []
        let allStock = 0
        if (product.specList1.length > 0 && product.specList2.length == 0) {
          product.specList1.forEach((item) => {
            allStock += item.sku_stock
            let spec = {
              spec_id: '999',
              spec_name: '规格一',
              spec_value: item.sku_name,
            }
            let sku_spec = [spec]
            let obj = {
              sku_id: null,
              sku_name: item.sku_name,
              price: item.sku_price,
              market_price: null,
              cost_price: null,
              image_url: item.sku_image,
              out_sku_id: '',
              stock: item.sku_stock,
              available_stock: null,
              weight: null,
              volume: null,
              purchase_platform_id: null,
              purchase_goods_id: null,
              purchase_goods_url: null,
              sort: '0',
              status: '1',
              sku_spec: sku_spec,
            }
            skuListParams.push(obj)
          })
        } else if (product.specList1.length > 0 && product.specList2.length > 0) {
          product.specList1.forEach((item1) => {
            allStock += item1.sku_stock
            product.specList2.forEach((item2) => {
              let spec1 = {
                spec_id: '999',
                spec_name: '规格一',
                spec_value: item1.sku_name,
              }
              let spec2 = {
                spec_id: '999',
                spec_name: '规格二',
                spec_value: item2.sku_name,
              }
              let sku_spec = [spec1, spec2]
              let obj = {
                sku_id: null,
                sku_name: item1.sku_name + '/' + item2.sku_name,
                price: item1.sku_price,
                market_price: null,
                cost_price: null,
                image_url: item1.sku_image,
                out_sku_id: '',
                stock: item1.sku_stock,
                available_stock: null,
                weight: null,
                volume: null,
                purchase_platform_id: null,
                purchase_goods_id: null,
                purchase_goods_url: null,
                sort: '0',
                status: '1',
                sku_spec: sku_spec,
              }
              skuListParams.push(obj)
            })
          })
        }
        let params = {
          product_id: new Date().getTime(),
          product_name: product.productName,
          cate_id: product.cateId,
          cate_name: '',
          brand_id: '0',
          goods_type: product.productStatus,
          price: product.specList1[0].sku_price,
          market_price: null,
          cost_price: null,
          product_url: null,
          image_url: product.specList1[0].sku_image,
          out_product_id: null,
          stock: allStock,
          available_stock: null,
          weight: product.productWeight,
          volume: '',
          unit: null,
          remark: '',
          sort: null,
          audit_status: null,
          status: '1',
          product_desc: product.productDesc,
          // uid: 213791,
          // uuid: 0,
          // app_id: 7,
          sku_list: skuListParams,
          detail_gallery: product.detailImage,
          carousel_gallery: product.slideImage,
          size_gallery: product.sizeImage,
        }
        let res = await this.$commodityService.saveProduct(params)
        let resObj = JSON.parse(res)
        console.log(resObj, 'resObj')
        if (resObj.status_code === 200) {
          if (i === productList.length - 1) {
            this.getProductList()
            this.$refs.Logs.writeLog(`导入商品结束`, true)
          }
          this.$refs.Logs.writeLog(`创建商品【${product.productName}】,成功`, true)
        } else {
          this.$refs.Logs.writeLog(`创建商品【${product.productName}】失败`, false)
        }
      }
    },
    // 下载模板
    downloadTemplate() {
      let template = `<tr>
      <td style="width: 200px; text-align:left;">商品名称<span style="color:red">(必填)</span></td>
      <td style="width: 200px; text-align:left;">商品类目ID<span style="color:red">(必填，请复制程序中的类目ID,可在类目窗口进行选择)</span></td>
      <td style="width: 200px; text-align:left;">商品净重(kg)<span style="color:red">(选填)</span></td>
      <td style="width: 200px; text-align:left;">商品体积(cm)<span style="color:red">(选填，格式 长*宽*高)</span></td>
      <td style="width: 200px; text-align:left;">详情信息<span style="color:red">(选填)</span></td>
      <td style="width: 200px; text-align:left;">商品状态<span style="color:red">(必填)</span></td>
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
          <td style="text-align:left;">${item.status}</td>
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
    // 删除功能
    async deleteProduct(val) {
      this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        console.log(val, val.product_id, val.uid)
        let res = await this.$commodityService.delgoods({
          productId: val.product_id,
          productUid: val.uid,
        })
        res = JSON.parse(res)
        if (res.status_code === 200) {
          this.$message.success(`删除成功`)
          this.$refs.Logs.writeLog('删除商品成功', true)
        } else {
          this.$message.error(`删除失败${res.message}`)
          this.$refs.Logs.writeLog('删除商品失败', false)
        }
        this.getProductList()
      })
    },
    //编辑商品
    async editGoods(row) {
      console.log(row)
      this.activeRow = row
      let res = await this.$commodityService.getdetails({
        priductid: row.product_id,
        language: '',
      })
      let resObj = res && JSON.parse(res)
      console.log(resObj, 'resObj')
      if (resObj.status_code === 200) {
        if (resObj.data.cate.cat_id_1) {
          this.editCateIds[0] = resObj.data.cate.cat_id_1
        }
        if (resObj.data.cate.cat_id_2) {
          this.editCateIds[1] = resObj.data.cate.cat_id_2
        }
        if (resObj.data.cate.cat_id_3) {
          this.editCateIds[2] = resObj.data.cate.cat_id_3
        }
        this.createVisible = true
        this.goodsName = resObj.data.product_name
        this.goodsRemark = resObj.data.remark
        this.slideImageList = resObj.data.detail.carousel_gallery //轮播图
        this.detailImageList = resObj.data.detail.detail_gallery //详情图
        this.sizeImageList = resObj.data.detail.size_gallery //尺寸图
        this.goodsWeight = resObj.data.weight //商品重量
        let arr = resObj.data.volume.split('*')
        this.goodsLength = arr.length ? arr[0] : 0 //商品长
        this.goodsWidth = arr.length ? arr[1] : 0 //商品宽
        this.goodsHeight = arr.length ? arr[2] : 0 //商品高
        this.goodsDes = resObj.data.detail.product_desc //商品描述
        this.goodStatus = resObj.data.status
        //处理sku
        resObj.data.sku_list.forEach((sku) => {
          let obj = {
            sku_no: sku.Out_sku_id,
            sku_id: sku.Sku_id,
            id: sku.Id,
            sku_name1: sku.Sku_name.split('/')[0],
            sku_name2: sku.Sku_name.split('/')[1] || null,
            stock_num: sku.Stock,
            sku_price: sku.Price,
            sku_image: sku.Image_url,
          }
          this.dealWithSpec(sku.Sku_spec, sku.Image_url)
          this.skuList.push(obj)
        })
        this.skuListCopy = JSON.parse(JSON.stringify(this.skuList))
      } else {
        return this.$message.error('获取商品详情失败')
      }
    },
    dealWithSpec(specList, img) {
      let list = specList || []
      if (list.length) {
        this.spec1name = list[0].Spec_Name
        let index = this.skuSpec1.findIndex((n) => n.sku_name == list[0].Spec_value)
        if (index < 0) {
          let obj = {
            sku_name: list[0].Spec_value,
            sku_image: img,
          }
          this.skuSpec1.push(obj)
        }
        if (list[1]) {
          this.spec2name = list[1].Spec_Name
          let index = this.skuSpec2.findIndex((n) => n.sku_name == list[1].Spec_value)
          if (index < 0) {
            let obj = {
              sku_name: list[1].Spec_value,
            }
            this.skuSpec2.push(obj)
          }
        }
      }
    },
    closeDialog() {
      this.spec1name = '规格一'
      this.spec2name = '规格二'
      this.skuSpec1 = []
      this.skuSpec2 = []
      this.goodsPrice = ''
      this.goodsNum = '' //商品数量
      this.goodsNo = '' //商品货号
      this.slideImageList = [] //轮播图
      this.detailImageList = [] //详情图
      this.sizeImageList = [] //尺寸图
      this.goodsWeight = 0 //商品重量
      this.goodsLength = 0 //商品长
      this.goodsWidth = 0 //商品宽
      this.goodsHeight = 0 //商品高
      this.goodsDes = '' //商品描述
      this.skuList = []
      this.skuListCopy = []
      this.goodsName = '' //商品名
      this.goodStatus = 0 //商品状态
      this.goodsRemark = '' //商品备注
      this.skuSecondCheck = false //规格二
      this.getProductList()
    },
    //保存新增
    async saveProduct() {
      let arr = this.skuList.filter((n) => {
        return !n.sku_image
      })
      if (arr.length) {
        return this.$message.warning('请上传规格图！')
      }
      let cateName = this.createCateInfo.name.join('>')
      let allStock = 0
      this.skuList.sort(function (a, b) {
        return a.sku_price - b.sku_price
      })
      console.log(this.skuList)
      let skuListParams = []
      this.skuList.forEach((item) => {
        allStock += Number(item.stock_num)
        let spec = {
          spec_id: '999',
          spec_name: this.spec1name,
          spec_value: item.sku_name1,
        }
        let sku_spec = [spec]
        if (item.sku_name2) {
          let spec2 = {
            spec_id: '999',
            spec_name: this.spec2name,
            spec_value: item.sku_name2,
          }
          sku_spec.push(spec2)
        }
        let obj = {
          sku_id: item.sku_id,
          sku_name: item.sku_name2 ? `${item.sku_name1}/${item.sku_name2}` : item.sku_name1,
          price: item.sku_price,
          market_price: null,
          cost_price: null,
          image_url: item.sku_image,
          out_sku_id: item.sku_no,
          stock: item.stock_num,
          available_stock: null,
          weight: null,
          volume: null,
          purchase_platform_id: null,
          purchase_goods_id: null,
          purchase_goods_url: null,
          sort: '0',
          status: '1',
          sku_spec: sku_spec,
        }
        skuListParams.push(obj)
      })

      let params = {
        product_id: this.activeRow.product_id || new Date().getTime(),
        product_name: this.goodsName,
        cate_id: this.createCateInfo.id,
        cate_name: cateName,
        brand_id: '0',
        goods_type: this.goodStatus,
        price: this.skuList[0].sku_price,
        market_price: null,
        cost_price: null,
        product_url: null,
        image_url: this.slideImageList[0],
        out_product_id: null,
        stock: allStock,
        available_stock: null,
        weight: this.goodsWeight,
        volume: `${this.goodsLength}*${this.goodsWidth}*${this.goodsHeight}`,
        unit: null,
        remark: this.goodsRemark,
        sort: null,
        audit_status: null,
        status: this.goodStatus,
        product_desc: this.goodsDes,
        // uid: 213791,
        // uuid: 0,
        // app_id: 7,
        sku_list: skuListParams,
        detail_gallery: this.detailImageList,
        carousel_gallery: this.slideImageList,
        size_gallery: this.sizeImageList,
      }
      let res = await this.$commodityService.saveProduct(params)
      let resObj = JSON.parse(res)
      console.log(resObj, 'resObj')
      if (resObj.status_code === 200) {
        return this.$message.success('保存商品成功！')
      } else {
        return this.$message.error(`保存商品失败，${resObj.message}`)
      }
    },
    cataInfo(val) {
      console.log('val', val)
      this.createCateInfo = val
    },
    //批量更新规格信息
    batchChangeSku() {
      this.skuList.forEach((item) => {
        item.stock_num = this.goodsNum
        item.sku_price = this.goodsPrice
        item.sku_no = this.goodsNo
      })
    },
    //删除规格
    deleteSpec1(i) {
      this.skuSpec1.splice(i, 1)
      this.createSkuList()
    },
    // 删除spec2
    deleteSpec2(i) {
      this.skuSpec2.splice(i, 1)
      this.createSkuList()
    },
    // 获取skucode
    async getskucode() {
      try {
        const res = await this.$commodityService.getskucode()
        const jsonData = JSON.parse(res)
        // console.log(jsonData)
        if (jsonData.status_code === 200) {
          this.skucode = jsonData.data
          console.log(this.skucode)
        }
      } catch (error) {
        this.$message.error(`获取sku配置失败`)
        return
      }
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
    // 添加spec1
    addSpec1() {
      const params = {
        sku_name: '',
        sku_image: '',
      }
      this.skuSpec1.push(params)
      this.createSkuList()
    },
    // 添加spec2
    addSpec2() {
      const params = {
        sku_name: '',
      }
      this.skuSpec2.push(params)
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
              sku_no: obj.sku_no,
              sku_id: obj.sku_id,
              id: obj.id,
              sku_name1: obj.sku_name1,
              sku_name2: '',
              stock_num: obj.stock_num,
              sku_price: obj.sku_price,
              sku_image: item.sku_image,
              remark: obj.remark,
              created_at: obj.created_at,
            }
          } else {
            return {
              sku_no: this.goodsNo,
              sku_id: null,
              id: 0,
              sku_name1: item.sku_name,
              sku_name2: '',
              stock_num: this.goodsNum,
              sku_price: this.goodsPrice,
              sku_image: item.sku_image,
              remark: '',
              created_at: null,
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
            console.log(item1, item2, this.skuListCopy, '11111')
            const obj = this.skuListCopy.find((n) => {
              return n.sku_name1 === item1.sku_name && n.sku_name2 === item2.sku_name
            })
            console.log(obj, '222')
            if (obj) {
              this.skuList.push({
                sku_no: obj.sku_no,
                sku_id: obj.sku_id,
                id: obj.id,
                sku_name1: obj.sku_name1,
                sku_name2: obj.sku_name2,
                stock_num: obj.stock_num,
                sku_price: obj.sku_price,
                sku_image: item1.sku_image,
                remark: obj.remark,
                created_at: obj.created_at,
              })
            } else {
              this.skuList.push({
                sku_no: this.goodsNo,
                sku_id: null,
                id: 0,
                sku_name1: item1.sku_name,
                sku_name2: item2.sku_name,
                stock_num: this.goodsNum,
                sku_price: this.goodsPrice,
                sku_image: item1.sku_image,
                remark: '',
                created_at: null,
              })
            }
          })
        })
      }
    },
    //删除
    deleteImage(type, index) {
      if (type === 'slide') {
        this.slideImageList.splice(index, 1)
      } else if (type === 'detail') {
        this.detailImageList.splice(index, 1)
      } else if (type === 'size') {
        this.sizeImageList.splice(index, 1)
      }
    },
    // 替换
    replaceImage(type, index) {
      const input = document.createElement('input')
      input.type = 'file'
      input.onchange = () => {
        const fileData = input.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(fileData)
        reader.onload = async (e) => {
          const base64Str = reader.result
          const name = randomWord(false, 32) + '_' + new Date().getTime()
          const res = await this.$ossService.uploadFile(base64Str, name)
          if (type === 'slide') {
            this.$set(this.slideImageList, index, res)
          } else if (type === 'detail') {
            this.$set(this.detailImageList, index, res)
          } else if (type === 'size') {
            this.$set(this.sizeImageList, index, res)
          }
        }
      }
      const event = new MouseEvent('click')
      input.dispatchEvent(event)
    },
    setImgFlag(type, index) {
      this.imgFlage = type
      this.skuImgIndex = index
    },
    // async handleChange(file) {
    //   const that = this
    //   const localFile = file.raw
    //   if (!/\.(jpg|jpeg|png|webp)$/.test(localFile.name.toLowerCase())) {
    //     this.$message('上传格式不对,请上传jpg、jpeg、png、webp格式的图片')
    //     return
    //   }
    //   const reader = new FileReader()
    //   reader.readAsDataURL(localFile)
    //   reader.onload = async () => {
    //     that.imgData = reader.result
    //     const name = randomWord(false, 32) + '_' + new Date().getTime()
    //     const res = await this.$ossService.uploadFile(that.imgData, name)
    //     this.skuSpec1[this.skuImgIndex].sku_image = res
    //     this.createSkuList()
    //   }
    // },
    // 上传图片
    async successFile(res, file) {
      console.log(res, 'file111', file)
      const that = this
      const localFile = file.raw
      if (!/\.(jpg|jpeg|png|webp)$/.test(localFile.name.toLowerCase())) {
        this.$message('上传格式不对,请上传jpg、jpeg、png、webp格式的图片')
        return
      }
      const reader = new FileReader()
      reader.readAsDataURL(localFile)
      reader.onload = async () => {
        let imgData = reader.result
        const name = randomWord(false, 32) + '_' + new Date().getTime()
        const res = await this.$ossService.uploadFile(imgData, name)
        if (this.imgFlage === 'slide') {
          this.slideImageList.push(res)
        } else if (this.imgFlage === 'detail') {
          this.detailImageList.push(res)
        } else if (this.imgFlage === 'size') {
          this.sizeImageList.push(res)
        } else if (this.imgFlage === 'sku') {
          this.skuSpec1[this.skuImgIndex].sku_image = res
          this.createSkuList()
          console.log(this.skuSpec1, 'this.skuSpec1')
        }
      }
    },
    // 获取产品中心列表数据
    async getProductList() {
      const returnCreateStartTime = this.form.returnCreateTime && this.form.returnCreateTime.length ? `${this.form.returnCreateTime[0]} 00:00:00` : ''
      const returnCreateEndTime = this.form.returnCreateTime && this.form.returnCreateTime.length ? `${this.form.returnCreateTime[1]} 23:59:59` : ''
      const returnUpdateStartTime = this.form.returnUpdateTime && this.form.returnUpdateTime.length ? `${this.form.returnUpdateTime[0]} 00:00:00` : ''
      const returnUpdateEndTime = this.form.returnUpdateTime && this.form.returnUpdateTime.length ? `${this.form.returnUpdateTime[1]} 23:59:59` : ''
      let params = {
        // 产品中心条件搜索
        CateId: Number(this.form.returnCategory), // 类目ID
        ProductName: this.form.returnGoodsName, // 商品名称
        ProductId: this.form.returnGoodsId, // 商品编码
        // SkuId: this.form.returnSkuId, // SKU编码
        Status: this.form.returnStatus, // 商品状态
        StartTime: returnCreateStartTime, // 商品创建时间
        EndTime: returnCreateEndTime, // 商品创建结束时间
        UpdateStartTime: returnUpdateStartTime, // 商品更新开始时间
        UpdateEndTime: returnUpdateEndTime, // 商品更新结束时间
      }
      params['page'] = this.currentPage
      params['page_size'] = this.pageSize
      this.tableLoading = true
      const res = await this.$commodityService.getProductList(params)
      let resObj = res && JSON.parse(res)
      if (resObj && resObj.status_code === 200) {
        this.total = resObj.data.total
        this.tableData = resObj.data.data
      } else {
        this.tableLoading = false
        return this.$message.warning(`查询失败，${resObj.message}`)
      }
      this.tableLoading = false
      console.log(resObj, 'resObj')
    },
    CateId(val) {
      console.log(val, 'val')
      this.form.returnCategory = val
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    handleSizeChange(size) {
      this.currentPage = 1
      this.pageSize = size
    },
  },
}
</script>

<style lang="less" scoped>
.product-center {
  margin: 10px;
  overflow: hidden;
  /deep/.el-dialog__body {
    padding: 10px 20px;
  }
}
.mar-left {
  margin-left: 10px;
}
.mar-top {
  margin-top: 10px;
}
.selectBox {
  padding: 16px;
  display: flex;
  flex-direction: column;
  background: #fff;
  overflow: auto;
  .select-row {
    display: flex;
    margin: 5px 0;
  }
}
.item-box {
  display: flex;
  align-items: center;
  span {
    display: inline-block;
    width: 60px;
    text-align: right;
  }
  .span-label {
    display: inline-block;
    height: 26px;
    width: 8px;
    border-radius: 4px;
    background: red;
  }
}
.content {
  padding: 0 16px;
  background: #fff;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 133px);
  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    height: 35px;
  }
}
.create-product-style {
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  max-height: 560px;
  overflow: auto;
  margin-bottom: 20px;
}
.dialog-footer{
  display:flex;
  justify-content: center;
  align-items: center;
}


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
    .tool-item {
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      span {
        display: inline-block;
        width: 60px;
      }
    }
    .sku-item-box {
      height: 180px;
      width: 100%;
      border: 1px solid #dcdcdc;
      overflow-y: auto;
      .sku-Spec {
        display: flex;
        align-items: center;
        margin: 10px;
        justify-content: space-between;
        .sku-image-uploader {
          border: 1px dashed #d9d9d9;
          /deep/.el-upload--picture-card {
            width: 42px !important;
            height: 42px !important;
            margin: 1px !important;
            line-height: 40px !important;
          }
          /deep/.el-icon-plus {
            width: 42px;
            height: 42px;
            line-height: 42px;
            margin: 0px 0px;
          }
        }
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
.img-box {
  display: flex;
  flex-wrap: wrap;
  .image-item {
    position: relative;
    margin: 0 20px 20px 0;
    img {
      width: 120px;
      height: 120px;
    }
    &:hover .form-item {
      opacity: 0.6;
    }
    .form-item {
      display: flex;
      position: absolute;
      background-color: #000;
      justify-content: space-between;
      margin: 0;
      opacity: 0;
      width: 120px;
      .btn2 {
        height: 23px;
        line-height: 23px;
        color: #fff;
        cursor: pointer;
        padding: 0 4px;
      }
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
    border: 1px dashed #d9d9d9;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
}
</style>