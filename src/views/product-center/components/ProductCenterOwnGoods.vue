<template>
  <el-row class="contaniner">
    <el-row class="header">
      <ul style="margin-bottom: 10px">
        <li>
          <span>商品创建时间：</span>
          <el-date-picker
            v-model="form.returnCreateTime"
            unlink-panels
            size="mini"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </li>
        <li>
          <span>商品类目：</span>
          <product-choose ref="isClean" @CateId="CateId" />
        </li>
        <li style="margin-left:19px">
          <span>商品状态：</span>
          <el-select v-model="form.returnStatus" placeholder="" size="mini" filterable>
            <el-option label="全部" :value="-1" />
            <el-option v-for="(item, index) in returnStatusList" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </li>
      </ul>
      <ul>
        <li>
          <span>商品更新时间：</span>
          <el-date-picker
            v-model="form.returnUpdateTime"
            unlink-panels
            size="mini"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
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
          <el-button type="primary" :disabled="Loading1" size="mini" @click="getProductList">查询</el-button>
          <el-button type="primary" size="mini" @click="DerivedData">导出数据</el-button>
          <el-button type="primary" size="mini" @click="Creategoods">创建商品</el-button>
          <el-upload ref="importRef" style="margin:0 10px" accept=".xls, .xlsx" action="https://jsonplaceholder.typicode.com/posts/" :on-change="importTemplate" :show-file-list="false" :auto-upload="false">
            <el-button :data="importTemplateData" size="mini" type="primary"> 导入商品 </el-button>
          </el-upload>
          <el-button type="primary" size="mini" @click="downloadTemplate">下载导入模板</el-button>
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
        <el-table-column align="center" label="商品ID" width="100" prop="product_id" fixed />
        <el-table-column align="center" prop="product_name" label="商品名称" width="100" />
        <el-table-column v-if="false" align="center" prop="weight" label="商品重量" width="100" />
        <el-table-column v-if="false" align="center" prop="volume" label="体积" width="100" />
        <el-table-column v-if="false" align="center" prop="uid" label="uid" width="100" />
        <el-table-column v-if="false" align="center" prop="cate_id" label="商品类目id" width="150" />
        <el-table-column align="center" prop="cate_name" label="商品类目" width="150" />
        <el-table-column
          width="90"
          align="center"
          label="商品主图"
        >
          <template slot-scope="{row}">
            <el-tooltip
              v-if="row.image_url"
              effect="light"
              placement="right-end"
              :visible-arrow="false"
              :enterable="false"
              style="width: 90px; height: 50px"
            >
              <div slot="content">
                <img
                  :src="row.image_url"
                  width="400px"
                  height="280px"
                >
              </div>
              <el-image
                style="width: 40px; height: 40px"
                :src="row.image_url"
              />
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="商品状态" width="160" align="center" />
        <el-table-column prop="price" label="价格" width="120" align="center" />
        <el-table-column prop="stock" label="库存" width="140" align="center" />
        <el-table-column prop="remark" label="备注" width="140" align="center" />
        <el-table-column prop="created_at" label="创建时间" width="90" align="center" />
        <el-table-column prop="updated_at" label="更新时间" width="90" align="center" />
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
      <el-dialog title="编辑商品" :visible.sync="eidtVisible" :before-close="bfClose" :close-on-click-modal="false" :close-on-press-escape="false" width="70%">
        <el-row>
          <el-col :span="1.5" style="padding:5px">
            <span>商品名称：</span>
          </el-col>
          <el-col :span="19">
            <el-input v-model="eiditgoodname" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
          </el-col>
        </el-row>
        <br>
        <el-row>
          <el-col :span="1.5" style="padding:5px">
            <span>商品类目：</span>
          </el-col>
          <el-col :span="19">
            <el-input :value="eiditcatename" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" @focus="clickhere" />
            <!-- <product-choose ref="isClean" @CateId="EiditCateId" /> -->
          </el-col>
        </el-row>
        <el-row v-if="showcatechoose" style="margin-top:10px">
          <el-col :span="1.5" style="padding:5px">
            <span>商品类目选择：</span>
          </el-col>
          <el-col :span="19">
            <product-choose ref="isClean" @CateId="EiditCateId" />
          </el-col>
        </el-row>
        <el-row style="margin-top:7px">
          <el-col :span="6" style="padding:5px">
            <span>商品状态： </span>
            <el-select v-model="eiditstatus" placeholder="" size="mini" filterable>
              <el-option v-for="(item, index) in returnCreateStatusList" :key="index" :label="item.label" :value="item.value" />
            </el-select>
          </el-col>
          <el-col :span="1.5" style="padding:13px">
            <span>备注：</span>
          </el-col>
          <el-col :span="13" style="padding-top:5px">
            <el-input v-model="eiditremark" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
          </el-col>
        </el-row>
        <br>
        <span>|销售资料</span>
        <br><br><br>
        <div style="height:260px;width:800px">
          <div style="border:1px solid black;width:370px;float: left;">
            <span>规格一</span><br><br>
            <el-row>
              <el-col :span="1.5" style="padding:8px">
                <span>规格名称</span>
              </el-col>
              <el-col :span="17">
                <el-input v-model="eiditSpecification1" clearable size="mini" placeholder="请输入规格名称，例如：颜色等等" oninput="value=value.replace(/\s+/g,'')" />
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="1.5" style="padding-top:90px;padding-left:8px">
                <span>规格选项</span>
              </el-col>
              <el-col span="5" style="padding-top:10px;padding-left:8px">
                <div id="creataddassembly1" style="border:1px solid black;width:260px;height:180px">
                  <div v-for="(items,indexs) in EidittableData" :key="indexs">
                    <el-row>
                      <el-col :span="1.5">
                        <el-select v-model="items.eiditSpecification1" placeholder="" size="mini" filterable>
                          <el-option v-for="(item, index) in skucode" :key="index" :label="item.zh_name" :value="item.code" />
                        </el-select>
                      </el-col>
                      <el-col :span="2" style="width:10px">
                        <el-upload class="avatar-uploader" action="#" :show-file-list="false" :on-change="uploadeiditmainimg">
                          <i class="el-icon-plus" style="padding-top:50%;margin-left:4px" @click="uploadeiditindex(indexs)" />
                        </el-upload>
                      </el-col>
                      <el-col :span="1"><el-button type="primary" style="margin-left:12px" size="mini" @click="deleidit(indexs)">删除</el-button></el-col>
                    </el-row>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-button type="primary" size="mini" style="width:260px;margin-left: 64px;margin-top:3px" @click="addeiditassembly">添加规格选项</el-button>
          </div>
          <div style="border:1px solid black;width:370px;float: right;">
            <el-checkbox v-model="eiditshowtwo" @change="canceleidit" />
            <span>规格二</span><br><br>
            <el-row>
              <el-col :span="1.5" style="padding:8px">
                <span>规格名称</span>
              </el-col>
              <el-col :span="17">
                <el-input v-model="eiditSpecification2" :disabled="!eiditshowtwo" clearable size="mini" placeholder="请输入规格名称，例如：颜色等等" oninput="value=value.replace(/\s+/g,'')" />
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="1.5" style="padding-top:90px;padding-left:8px">
                <span>规格选项</span>
              </el-col>
              <el-col :span="5" style="padding-top:10px;padding-left:8px">
                <div id="creataddassembly2" style="border:1px solid black;width:260px;height:180px">
                  <div v-for="(items,indexs) in EidittableData" :key="indexs">
                    <el-row>
                      <el-col :span="1.5">
                        <el-select v-model="items.eiditSpecification2" placeholder="" :disabled="!eiditshowtwo" size="mini" filterable>
                          <el-option v-for="(item, index) in skucode" :key="index" :label="item.zh_name" :value="item.code" />
                        </el-select>
                      </el-col>
                      <el-col :span="1"><el-button type="primary" :disabled="!eiditshowtwo" style="margin-left:20px" size="mini" @click="deleidit2(indexs)">删除</el-button></el-col>
                    </el-row>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-button :disabled="!eiditshowtwo" type="primary" size="mini" style="width:260px;margin-left: 64px;margin-top:3px" @click="addeiditassembly2">添加规格选项</el-button>
          </div>
        </div><br><br><br>
        <el-row>
          <el-col :span="1.5" style="padding:8px">
            <span>规格资讯</span>
          </el-col>
          <el-col :span="1.5" style="padding:8px">
            <span>商品价格</span>
          </el-col>
          <el-col :span="3">
            <el-input v-model="bindeiditprice" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
          </el-col>
          <el-col :span="1.5" style="padding:8px">
            <span>商品数量</span>
          </el-col>
          <el-col :span="3">
            <el-input v-model="bindeiditnum" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
          </el-col>
          <el-col :span="1.5" style="padding:8px">
            <span>商品货号</span>
          </el-col>
          <el-col :span="3">
            <el-input v-model="bindeiditskuid" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
          </el-col>
          <el-col :span="3">
            <el-button type="primary" size="mini" style="margin-left:20px" @click="updateeiditall">批量更新</el-button>
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
          <el-table-column align="center" :label="eiditSpecification1" width="100" prop="eiditSpecification1" fixed />
          <el-table-column align="center" prop="eiditSpecification2" :label="eiditSpecification2" width="100" />
          <el-table-column
            width="80"
            align="center"
            label="规格图"
          >
            <template slot-scope="{row}">
              <el-tooltip
                v-if="row.img"
                effect="light"
                placement="right-end"
                :visible-arrow="false"
                :enterable="false"
                style="width: 50px; height: 50px"
              >
                <div slot="content">
                  <img
                    :src="row.img"
                    width="200px"
                    height="200px"
                  >
                </div>
                <el-image
                  style="width: 100px; height: 100px"
                  :src="row.img"
                />
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="价格" width="120" align="center">
            <template slot-scope="{ row }">
              <el-input v-model="row.price" placeholder="请输入价格" />
            </template>
          </el-table-column>
          <el-table-column label="库存" width="140" align="center">
            <template slot-scope="{ row }">
              <el-input v-model="row.stock" placeholder="请输入库存" />
            </template>
          </el-table-column>
          <el-table-column label="商品货号" width="140" align="center">
            <template slot-scope="{ row }">
              <el-input v-model="row.productid" placeholder="请输入商品货号" />
            </template>
          </el-table-column>
        </el-table><br><br>
        <span>|媒体管理</span><br><br><br>
        <el-row>
          <el-col :span="2" style="padding:8px;margin-top:70px">
            <span>轮播图片</span>
          </el-col>
          <el-col v-for="(item,index) in eiditRotationimg" :key="index" :span="3" style="padding:8px;">
            <el-image :src="item" style="width: 148px; height: 148px;margin-right:40px" @click="eiditRotationimg.splice(index,1)" />
          </el-col>
          <el-col :span="2" style="padding:8px;margin-left:10px">
            <el-upload class="avatar-uploader" action="#" :show-file-list="false" list-type="picture-card" :on-change="uploadeiditRotationimg">
              <i class="el-icon-plus" />
            </el-upload>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2" style="padding:8px;margin-top:70px">
            <span>详情图片</span>
          </el-col>
          <el-col v-for="(item,index) in eiditDetailsimg" :key="index" :span="3" style="padding:8px;">
            <el-image :src="item" style="width: 148px; height: 148px" @click="eiditDetailsimg.splice(index,1)" />
          </el-col>
          <el-col :span="2" style="padding:8px;margin-left:10px">
            <el-upload class="avatar-uploader" action="#" :show-file-list="false" list-type="picture-card" :on-change="uploadeiditDetailsimg">
              <i class="el-icon-plus" />
            </el-upload>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2" style="padding:8px;margin-top:70px">
            <span>尺寸图片</span>
          </el-col>
          <el-col v-for="(item,index) in eiditsizeimg" :key="index" :span="3" style="padding:8px;">
            <el-image :src="item" style="width: 148px; height: 148px;margin-right:40px" @click="eiditsizeimg.splice(index,1)" />
          </el-col>
          <el-col :span="2" style="padding:8px;margin-left:10px">
            <el-upload class="avatar-uploader" action="#" :show-file-list="false" list-type="picture-card" :on-change="uploadeiditsizeimg">
              <i class="el-icon-plus" />
            </el-upload>
          </el-col>
        </el-row><br><br>
        <span>|出库及配送相关</span><br><br><br>
        <el-row>
          <el-col :span="1.5" style="padding:8px">
            <span>商品重量</span>
          </el-col>
          <el-col :span="3">
            <el-input v-model="eiditweight" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
          </el-col>
          <el-col :span="1.5" style="padding:8px">
            <span>kg</span>
          </el-col>
          <el-col :span="1.5" style="padding:8px">
            <span>长</span>
          </el-col>
          <el-col :span="3">
            <el-input v-model="eiditx" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
          </el-col>
          <el-col :span="1.5" style="padding:8px">
            <span>cm</span>
          </el-col>
          <el-col :span="1.5" style="padding:8px">
            <span>宽</span>
          </el-col>
          <el-col :span="3">
            <el-input v-model="eidity" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
          </el-col>
          <el-col :span="1.5" style="padding:8px">
            <span>cm</span>
          </el-col>
          <el-col :span="1.5" style="padding:8px">
            <span>高</span>
          </el-col>
          <el-col :span="3">
            <el-input v-model="eiditz" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
          </el-col>
          <el-col :span="1.5" style="padding:8px">
            <span>cm</span>
          </el-col>
        </el-row><br><br>
        <span>|详细信息</span><br><br><br>
        <span style="padding:8px">商品描述</span><br>
        <input v-model="eiditdescribe" style="margin-left:8px;height:200px;width:100%">
        <el-button type="primary" size="mini" style="margin-left:50%;margin-top:10px;" @click="eiditsave">保存</el-button>
      </el-dialog>
      <el-dialog title="创建商品" :visible.sync="CreateVisible" :before-close="bfClose" :close-on-click-modal="false" :close-on-press-escape="false" width="70%">
        <el-row>
          <el-col :span="1.5" style="padding:5px">
            <span>商品名称：</span>
          </el-col>
          <el-col :span="19">
            <el-input v-model="newform.product_name" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
          </el-col>
        </el-row>
        <br>
        <el-row>
          <el-col :span="1.5" style="padding:5px">
            <span>商品类目：</span>
          </el-col>
          <el-col :span="19">
            <product-choose ref="isClean" @CateId="CreatCateId" />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" style="padding:5px">
            <span>商品状态： </span>
            <el-select v-model="newform.status" placeholder="" size="mini" filterable>
              <el-option v-for="(item, index) in returnCreateStatusList" :key="index" :label="item.label" :value="item.value" />
            </el-select>
          </el-col>
          <el-col :span="1.5" style="padding:13px">
            <span>备注：</span>
          </el-col>
          <el-col :span="13" style="padding-top:5px">
            <el-input v-model="newform.remark" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
          </el-col>
        </el-row>
        <br>
        <span>|销售资料</span>
        <br><br><br>
        <div style="height:260px;width:800px">
          <div style="border:1px solid black;width:370px;float: left;">
            <span>规格一</span><br><br>
            <el-row>
              <el-col :span="1.5" style="padding:8px">
                <span>规格名称</span>
              </el-col>
              <el-col :span="17">
                <el-input v-model="Specifications1" clearable size="mini" placeholder="请输入规格名称，例如：颜色等等" oninput="value=value.replace(/\s+/g,'')" />
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="1.5" style="padding-top:90px;padding-left:8px">
                <span>规格选项</span>
              </el-col>
              <el-col span="5" style="padding-top:10px;padding-left:8px">
                <div id="creataddassembly1" style="border:1px solid black;width:260px;height:180px">
                  <div v-for="(items,indexs) in CreatetableData" :key="indexs">
                    <el-row>
                      <el-col :span="1.5">
                        <el-select v-model="items.Specification1" placeholder="" size="mini" filterable>
                          <el-option v-for="(item, index) in skucode" :key="index" :label="item.zh_name" :value="item.code" />
                        </el-select>
                      </el-col>
                      <el-col :span="2" style="width:10px">
                        <el-upload class="avatar-uploader" action="#" :show-file-list="false" :on-change="uploadmainimg">
                          <i class="el-icon-plus" style="padding-top:50%;margin-left:4px" @click="uploadindex(indexs)" />
                        </el-upload>
                      </el-col>
                      <el-col :span="1"><el-button type="primary" style="margin-left:12px" size="mini" @click="delcreatel(indexs)">删除</el-button></el-col>
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
              <el-col :span="1.5" style="padding:8px">
                <span>规格名称</span>
              </el-col>
              <el-col :span="17">
                <el-input v-model="Specifications2" :disabled="!showtwo" clearable size="mini" placeholder="请输入规格名称，例如：颜色等等" oninput="value=value.replace(/\s+/g,'')" />
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="1.5" style="padding-top:90px;padding-left:8px">
                <span>规格选项</span>
              </el-col>
              <el-col :span="5" style="padding-top:10px;padding-left:8px">
                <div id="creataddassembly2" style="border:1px solid black;width:260px;height:180px">
                  <div v-for="(items,indexs) in CreatetableData" :key="indexs">
                    <el-row>
                      <el-col :span="1.5">
                        <el-select v-model="items.Specification2" placeholder="" :disabled="!showtwo" size="mini" filterable>
                          <el-option v-for="(item, index) in skucode" :key="index" :label="item.zh_name" :value="item.code" />
                        </el-select>
                      </el-col>
                      <el-col :span="1"><el-button type="primary" :disabled="!showtwo" style="margin-left:20px" size="mini" @click="delcreatel2(indexs)">删除</el-button></el-col>
                    </el-row>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-button :disabled="!showtwo" type="primary" size="mini" style="width:260px;margin-left: 64px;margin-top:3px" @click="addassembly2">添加规格选项</el-button>
          </div>
        </div><br><br><br>
        <el-row>
          <el-col :span="1.5" style="padding:8px">
            <span>规格资讯</span>
          </el-col>
          <el-col :span="1.5" style="padding:8px">
            <span>商品价格</span>
          </el-col>
          <el-col :span="3">
            <el-input v-model="createprice" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
          </el-col>
          <el-col :span="1.5" style="padding:8px">
            <span>商品数量</span>
          </el-col>
          <el-col :span="3">
            <el-input v-model="createnum" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
          </el-col>
          <el-col :span="1.5" style="padding:8px">
            <span>商品货号</span>
          </el-col>
          <el-col :span="3">
            <el-input v-model="createskuid" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
          </el-col>
          <el-col :span="3">
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
          <el-table-column align="center" :label="Specifications1" width="120" prop="Specification1" fixed />
          <el-table-column align="center" prop="Specification2" :label="Specifications2" width="120" />
          <el-table-column
            width="100"
            align="center"
            label="规格图"
          >
            <template slot-scope="{row}">
              <el-tooltip
                v-if="row.img"
                effect="light"
                placement="right-end"
                :visible-arrow="false"
                :enterable="false"
                style="width: 50px; height: 50px"
              >
                <div slot="content">
                  <img
                    :src="row.img"
                    width="200px"
                    height="200px"
                  >
                </div>
                <el-image
                  style="width: 100px; height: 100px"
                  :src="row.img"
                />
              </el-tooltip>
            </template>
          </el-table-column>
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
          <el-col :span="2" style="padding:8px;margin-top:70px">
            <span>轮播图片</span>
          </el-col>
          <el-col v-for="(item,index) in newRotationimg" :key="index" :span="3" style="padding:8px;">
            <el-image :src="item" style="width: 148px; height: 148px;margin-right:40px" @click="newRotationimg.splice(index,1)" />
          </el-col>
          <el-col :span="2" style="padding:8px;margin-left:10px">
            <el-upload class="avatar-uploader" action="#" :show-file-list="false" list-type="picture-card" :on-change="uploadnewRotationimg">
              <i class="el-icon-plus" />
            </el-upload>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2" style="padding:8px;margin-top:70px">
            <span>详情图片</span>
          </el-col>
          <el-col v-for="(item,index) in newDetailsimg" :key="index" :span="3" style="padding:8px;">
            <el-image :src="item" style="width: 148px; height: 148px" @click="newDetailsimg.splice(index,1)" />
          </el-col>
          <el-col :span="2" style="padding:8px;margin-left:10px">
            <el-upload class="avatar-uploader" action="#" :show-file-list="false" list-type="picture-card" :on-change="uploadnewDetailsimg">
              <i class="el-icon-plus" />
            </el-upload>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2" style="padding:8px;margin-top:70px">
            <span>尺寸图片</span>
          </el-col>
          <el-col v-for="(item,index) in newsizeimg" :key="index" :span="3" style="padding:8px;">
            <el-image :src="item" style="width: 148px; height: 148px;margin-right:40px" @click="newsizeimg.splice(index,1)" />
          </el-col>
          <el-col :span="2" style="padding:8px;margin-left:10px">
            <el-upload class="avatar-uploader" action="#" :show-file-list="false" list-type="picture-card" :on-change="uploadnewsizeimg">
              <i class="el-icon-plus" style="width:10px" />
            </el-upload>
          </el-col>
        </el-row><br><br>
        <span>|出库及配送相关</span><br><br><br>
        <el-row>
          <el-col :span="1.5" style="padding:8px">
            <span>商品重量</span>
          </el-col>
          <el-col :span="3">
            <el-input v-model="newform.weight" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
          </el-col>
          <el-col :span="1.5" style="padding:8px">
            <span>kg</span>
          </el-col>
          <el-col :span="1.5" style="padding:8px">
            <span>长</span>
          </el-col>
          <el-col :span="3">
            <el-input v-model="x" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
          </el-col>
          <el-col :span="1.5" style="padding:8px">
            <span>cm</span>
          </el-col>
          <el-col :span="1.5" style="padding:8px">
            <span>宽</span>
          </el-col>
          <el-col :span="3">
            <el-input v-model="y" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
          </el-col>
          <el-col :span="1.5" style="padding:8px">
            <span>cm</span>
          </el-col>
          <el-col :span="1.5" style="padding:8px">
            <span>高</span>
          </el-col>
          <el-col :span="3">
            <el-input v-model="z" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
          </el-col>
          <el-col :span="1.5" style="padding:8px">
            <span>cm</span>
          </el-col>
        </el-row><br><br>
        <span>|详细信息</span><br><br><br>
        <span style="padding:8px">商品描述</span><br>
        <input v-model="newform.product_desc" style="margin-left:8px;height:200px;width:100%">
        <el-button type="primary" size="mini" style="margin-left:50%;margin-top:10px;" @click="newsave">保存</el-button>
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
import { exportExcelDataCommon, randomWord } from '../../../util/util'
import StrockUpForegin from '../../../module-api/product-center-api/owngoods-api'
import XLSX from 'xlsx'
import ProductChoose from '../../../components/product-choose-product-center.vue'
export default {
  components: {
    ProductChoose
  },
  data() {
    return {
      exportdata: [],
      ress: '',
      creatidx: '',
      eiditidx: '',
      eiditcatename: '',
      showcatechoose: false,
      skulist1: [],
      skulist2: [],
      eiditgoodname: '',
      importzh_name1: '',
      importzh_name2: '',
      zh_name1: '',
      zh_name2: '',
      eiditsp1: '',
      eiditsp2: '',
      eiditzh_name1: '',
      eiditzh_name2: '',
      creatzh_name1: '',
      creatzh_name2: '',
      creatstock: '',
      eiditcateid: '',
      eiditstatus: '',
      eiditremark: '',
      eiditSpecification1: '规格一',
      eiditSpecification2: '规格二',
      eiditmainimg: '',
      eiditprice: '',
      eiditstock: '',
      eiditproductid: '',
      eiditimg1: '',
      eiditimg2: '',
      eiditimg3: '',
      eiditweight: '',
      eiditx: '',
      eidity: '',
      eiditz: '',
      eiditdescribe: '',
      eiditskuid: '',
      bindeiditprice: '',
      bindeiditnum: '',
      bindeiditskuid: '',
      bindeiditmainimg: '',
      x: 0,
      y: 0,
      z: 0,
      foreignData: [],
      imgData: '',
      newform: {
        product_id: '',
        product_name: '',
        price: 0,
        stock: '',
        status: '',
        weight: 0,
        volume: '',
        cate_id: '',
        carousel_gallery: [],
        detail_gallery: [],
        size_gallery: [],
        product_desc: '',
        remark: '',
        image_url: '',
        sku_list: [
          {
            sku_id: 'this.newform.product_id',
            price: 'this.newform.price',
            sku_name: 'this.newform.product_name',
            image_url: '',
            stock: 'this.newform.stock',
            weight: 'this.newform.weight',
            volume: 'this.newform.volume',
            status: 'this.newform.status',
            sku_spec: [
              {
                spec_id: '',
                spec_name: '规格一',
                spec_value: ''
              }, {
                spec_id: '',
                spec_name: '规格二',
                spec_value: ''
              }
            ]
          }
        ]
      },
      newRotationimg: [],
      newDetailsimg: [],
      newsizeimg: [],
      eiditRotationimg: [],
      eiditDetailsimg: [],
      eiditsizeimg: [],
      StrockUpForegin: new StrockUpForegin(this),
      cantshow: false,
      createskuid: '',
      createnum: 0,
      createprice: 0,
      importTemplateData: '', // 批量导入数据
      isnull: true,
      eidtVisible: false,
      EidittableData: [],
      demonstration: [{ // 导出模板示例数据
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
        sizeimg: 'http://pkg.91cyt.com/tmp/1638518612974.png'
      }, {
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
        sizeimg: 'http://pkg.91cyt.com/tmp/1638518612974.png'
      }, {
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
        sizeimg: 'http://pkg.91cyt.com/tmp/1638518612974.png'
      }, {
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
        sizeimg: 'http://pkg.91cyt.com/tmp/1638518612974.png'
      }, {
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
        sizeimg: 'http://pkg.91cyt.com/tmp/1638518612974.png'
      }, {
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
        sizeimg: 'http://pkg.91cyt.com/tmp/1638518612974.png'
      }, {
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
        sizeimg: 'http://pkg.91cyt.com/tmp/1638518612974.png'
      }, {
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
        sizeimg: 'http://pkg.91cyt.com/tmp/1638518612974.png'
      }],
      CreatetableData: [],
      Specifications1: '规格一',
      Specifications2: '规格二',
      eiditSpecifications1: '规格一',
      eiditSpecifications2: '规格二',
      showtwo: false,
      eiditshowtwo: false,
      showlog: true,
      Loading1: false,
      currentData: [],
      Loading3: false,
      CreateVisible: false,
      currentPage: 1,
      tableData: [],
      skucode: [],
      catecode: [],
      total: 0,
      pageSize: 50,
      mainimg: '',
      page: 1,
      form: {
        returnCreateTime: [new Date().getTime() - 3600 * 1000 * 24 * 30, new Date()], // 商品创建时间
        returnCategory: '', // 商品类目
        returnStatus: -1, // 商品状态
        returnUpdateTime: [new Date().getTime() - 3600 * 1000 * 24 * 30, new Date()], // 商品更新时间
        returnSkuId: '', // sku编码
        returnGoodsName: '', // 商品名称
        returnGoodsId: '' // 商品ID
      },
      returnStatusList: [
        { value: 0, label: '在售' },
        { value: 1, label: '已下架' }
      ],
      returnCreateStatusList: [
        { value: 0, label: '在售' },
        { value: 1, label: '已下架' }
      ]
    }
  },
  mounted() {
    this.getProductList()
    this.getskucode()
    this.getcatecode()
  },
  methods: {
    // 获取产品类目
    async getcatecode() {
      try {
        const res = await this.$commodityService.getCategoryInfo(0)
        const jsonData = JSON.parse(res)
        if (jsonData.status_code === 200) {
          this.catecode = jsonData.data
          console.log(this.catecode)
          return
        }
      } catch (error) {
        this.$message.error(`获取产品类目失败`)
        return
      }
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
          return
        }
      } catch (error) {
        this.$message.error(`获取sku配置失败`)
        return
      }
    },
    // 创建商品点击保存
    async newsave() {
      this.creatzh_name1 = ''
      this.creatzh_name2 = ''
      this.skulist2 = []
      this.creatstock = 0
      for (let i = 0; i < this.CreatetableData.length; i++) {
        if (this.showtwo === true) {
          for (let j = 0; j < this.skucode.length; j++) {
            if (this.CreatetableData[i].Specification1 === this.skucode[j].code) {
              this.creatzh_name1 = this.skucode[j].zh_name
              console.log(this.creatzh_name1)
            }
            if (this.EidittableData[i].Specification2 === this.skucode[j].code) {
              this.creatzh_name2 = this.skucode[j].zh_name
              console.log(this.creatzh_name2)
            }
          }
          this.creatstock += this.CreatetableData[i].productnum
          this.skulist2.push({
            sku_id: this.CreatetableData[i].skuid,
            sku_name: `${this.creatzh_name1}/${this.creatzh_name2}`,
            price: Number(this.CreatetableData[i].price),
            image_url: this.CreatetableData[i].img,
            out_sku_id: this.CreatetableData[i].skuid,
            stock: this.CreatetableData[i].productnum,
            weight: this.newform.weight,
            volume: this.x * this.y * this.z,
            status: this.newform.status,
            sku_spec: [{
              spec_id: this.CreatetableData[i].Specification1,
              spec_name: this.Specifications1,
              spec_value: this.creatzh_name1
            }, {
              spec_id: this.CreatetableData[i].Specification2,
              spec_name: this.Specifications2,
              spec_value: this.creatzh_name2
            }]
          })
        } else {
          for (let j = 0; j < this.skucode.length; j++) {
            if (this.CreatetableData[i].Specification1 === this.skucode[j].code) {
              this.creatzh_name1 = this.skucode[j].zh_name
              console.log(this.creatzh_name1)
            }
          }
          this.creatstock += this.CreatetableData[i].productnum
          this.skulist2.push({
            sku_id: this.CreatetableData[i].skuid,
            sku_name: this.creatzh_name1,
            price: Number(this.CreatetableData[i].price),
            image_url: this.CreatetableData[i].img,
            out_sku_id: this.CreatetableData[i].skuid,
            stock: this.CreatetableData[i].productnum,
            weight: this.newform.weight,
            volume: this.x * this.y * this.z, // this.x * this.y * this.z,
            status: this.newform.status,
            sku_spec: [{
              spec_id: this.CreatetableData[i].Specification1,
              spec_name: this.Specifications1,
              spec_value: this.creatzh_name1
            }]
          })
        }
      }
      const parmas = {
        product_id: this.CreatetableData[0].skuid,
        product_name: this.newform.product_name,
        status: this.newform.status,
        weight: this.newform.weight,
        stock: this.creatstock,
        image_url: this.newRotationimg[0],
        volume: `${this.x}*${this.y}*${this.z}`, // this.x * this.y * this.z,`${this.x}*${this.y}*${this.z}`
        price: this.CreatetableData[0].price,
        cate_id: this.newform.cate_id,
        carousel_gallery: this.newRotationimg,
        detail_gallery: this.newDetailsimg,
        size_gallery: this.newsizeimg,
        product_desc: this.newform.product_desc,
        remark: this.newform.remark,
        sku_list: this.skulist2
      }
      if (!parmas.product_name) {
        this.$message.error(`商品名称为空`)
        return
      }
      if (!parmas.product_id) {
        this.$message.error(`商品ID为空`)
        return
      }
      if (!parmas.image_url) {
        this.$message.error(`商品主图为空`)
        return
      }
      for (let i = 0; i < this.skulist2.length; i++) {
        if (this.showtwo === true) {
          if (!this.skulist2[i].sku_spec[0].spec_id) {
            this.$message.error(`规格一为空`)
            return
          }
          if (!this.skulist2[i].sku_spec[1].spec_id) {
            this.$message.error(`规格二为空`)
            return
          }
          if (!this.skulist2[i].image_url) {
            this.$message.error(`规格图为空`)
            return
          }
        } else {
          if (!this.skulist2[i].sku_spec[0].spec_id) {
            this.$message.error(`规格一为空`)
            return
          }
          if (!this.skulist2[i].image_url) {
            this.$message.error(`规格图为空`)
            return
          }
        }
      }
      console.log(parmas)
      const res = await this.StrockUpForegin.SaveProduct(parmas)
      if (res.code === 200) {
        this.$message.success('数据保存成功')
        this.$refs.Logs.writeLog('数据保存成功', true)
      } else {
        this.$message.error(`数据保存失败${res.data}`)
        this.$refs.Logs.writeLog(`数据保存失败,失败类型：${res.data}`, false)
      }
    },
    // 编辑商品点击保存
    async eiditsave() {
      this.eiditzh_name1 = ''
      this.eiditzh_name2 = ''
      this.skulist1 = []
      this.eiditstock = 0
      for (let i = 0; i < this.EidittableData.length; i++) {
        if (this.eiditshowtwo === true) {
          for (let j = 0; j < this.skucode.length; j++) {
            if (this.EidittableData[i].eiditSpecification1 === this.skucode[j].code) {
              this.eiditzh_name1 = this.skucode[j].zh_name
              console.log(this.eiditzh_name1)
            }
            if (this.EidittableData[i].eiditSpecification2 === this.skucode[j].code) {
              this.eiditzh_name2 = this.skucode[j].zh_name
              console.log(this.eiditzh_name2)
            }
          }
          this.eiditstock += this.EidittableData[i].stock
          this.skulist1.push({
            sku_id: this.EidittableData[i].productid,
            sku_name: `${this.eiditzh_name1}/${this.eiditzh_name2}`,
            price: Number(this.EidittableData[i].price),
            image_url: this.EidittableData[i].img,
            out_sku_id: this.EidittableData[i].productid,
            stock: this.EidittableData[i].stock,
            weight: this.eiditweight,
            volume: this.eiditx * this.eidity * this.eiditz,
            status: this.eiditstatus,
            sku_spec: [{
              spec_id: this.EidittableData[i].eiditSpecification1,
              spec_name: this.eiditSpecifications1,
              spec_value: this.eiditzh_name1
            }, {
              spec_id: this.EidittableData[i].eiditSpecification2,
              spec_name: this.eiditSpecifications2,
              spec_value: this.eiditzh_name2
            }]
          })
        } else {
          for (let j = 0; j < this.skucode.length; j++) {
            if (this.EidittableData[i].eiditSpecification1 === this.skucode[j].code) {
              this.eiditzh_name1 = this.skucode[j].zh_name
              console.log(this.eiditzh_name1)
            }
          }
          this.eiditstock += this.EidittableData[i].stock
          this.skulist1.push({
            sku_id: this.EidittableData[i].productid,
            sku_name: this.eiditzh_name1,
            price: Number(this.EidittableData[i].price),
            image_url: this.EidittableData[i].img,
            out_sku_id: this.EidittableData[i].productid,
            stock: this.EidittableData[i].stock,
            weight: this.eiditweight,
            volume: `${this.eiditx}*${this.eidity}*${this.eiditz}`, // this.eiditx * this.eidity * this.eiditz,
            status: this.eiditstatus,
            sku_spec: [{
              spec_id: this.EidittableData[i].eiditSpecification1,
              spec_name: this.eiditSpecifications1,
              spec_value: this.eiditzh_name1
            }]
          })
        }
      }
      console.log('-------------', this.skulist1)
      const parmas = {
        product_id: this.eiditskuid,
        product_name: this.eiditgoodname,
        status: this.eiditstatus,
        weight: this.eiditweight,
        stock: this.eiditstock,
        image_url: this.eiditRotationimg[0],
        volume: `${this.eiditx}*${this.eidity}*${this.eiditz}`, // this.eiditx * this.eidity * this.eiditz,
        price: this.EidittableData[0].price,
        cate_id: this.eiditcateid,
        carousel_gallery: this.eiditRotationimg,
        detail_gallery: this.eiditDetailsimg,
        size_gallery: this.eiditsizeimg,
        product_desc: this.eiditdescribe,
        remark: this.eiditremark,
        sku_list: this.skulist1
      }
      if (!parmas.product_name) {
        this.$message.error(`商品名称为空`)
        return
      }
      if (!parmas.product_id) {
        this.$message.error(`商品ID为空`)
        return
      }
      if (!parmas.image_url) {
        this.$message.error(`商品主图为空`)
        return
      }
      for (let i = 0; i < this.skulist1.length; i++) {
        if (this.eiditshowtwo === true) {
          if (!this.skulist1[i].sku_spec[0].spec_id) {
            this.$message.error(`规格一为空`)
            return
          }
          if (!this.skulist1[i].sku_spec[1].spec_id) {
            this.$message.error(`规格二为空`)
            return
          }
          if (!this.skulist1[i].image_url) {
            this.$message.error(`商品主图为空`)
            return
          }
        } else {
          if (!this.skulist1[i].sku_spec[0].spec_id) {
            this.$message.error(`规格一为空`)
            return
          }
          if (!this.skulist1[i].image_url) {
            this.$message.error(`商品主图为空`)
            return
          }
        }
      }
      console.log(parmas)
      const res = await this.StrockUpForegin.SaveProduct(parmas)
      if (res.code === 200) {
        this.$message.success('数据保存成功')
        this.$refs.Logs.writeLog('数据保存成功', true)
      } else {
        this.$message.error(`数据保存失败${res.data}`)
        this.$refs.Logs.writeLog(`数据保存失败,失败类型：${res.data}`, false)
      }
    },
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
    // 批量更新编辑商品
    async updateeiditall() {
      if (this.bindeiditskuid === '') {
        this.$message.error(`商品货号为空，请输入商品货号！`)
        return
      }
      if (this.EidittableData.length === 0) {
        this.$message.error(`此时没有数据，请插入数据后重试！`)
        return
      }
      if (this.bindeiditprice === '') {
        this.$message.error(`价格格式不正确！`)
        return
      }
      if (this.bindeiditnum === '') {
        this.$message.error(`数量格式不正确！`)
        return
      }
      for (let i = 0; i < this.EidittableData.length; i++) {
        if (this.EidittableData[i].productid === this.bindeiditskuid) {
          this.EidittableData[i].stock = this.bindeiditnum
          this.EidittableData[i].price = this.bindeiditprice
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
    // 编辑规格二取消打勾
    canceleidit() {
      if (this.eiditshowtwo === false) {
        for (let i = 0; i < this.EidittableData.length; i++) {
          this.EidittableData[i].eiditSpecification2 = ''
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
      if (this.CreatetableData[index].eiditSpecification1 === '') {
        this.CreatetableData.splice(index, 1)
      } else {
        this.CreatetableData[index].eiditSpecification2 = ''
      }
    },
    // 删除编辑商品规格一
    async deleidit(index) {
      if (this.EidittableData[index].eiditSpecification2 === '') {
        this.EidittableData.splice(index, 1)
      } else {
        this.EidittableData[index].eiditSpecification1 = ''
      }
    },
    // 删除编辑商品规格二
    async deleidit2(index) {
      if (this.EidittableData[index].eiditSpecification1 === '') {
        this.EidittableData.splice(index, 1)
      } else {
        this.EidittableData[index].eiditSpecification2 = ''
      }
    },
    // 添加主图时传入index赋值
    uploadindex(index) {
      this.creatidx = index
    },
    // 添加编辑主图时传入index赋值
    async uploadeiditindex(index) {
      this.eiditidx = index
    },
    // 添加主图
    async uploadmainimg(file) {
      const that = this
      const localFile = file.raw
      const reader = new FileReader()
      reader.readAsDataURL(localFile)
      reader.onload = async() => {
        that.imgData = reader.result
        const name = randomWord(false, 32) + '_' + new Date().getTime()
        const res = await this.$ossService.uploadFile(that.imgData, name)
        this.mainimg = res
        this.CreatetableData[this.creatidx].img = this.mainimg
      }
    },
    // 添加编辑页面主图
    async uploadeiditmainimg(file) {
      const that = this
      const localFile = file.raw
      const reader = new FileReader()
      reader.readAsDataURL(localFile)
      reader.onload = async() => {
        that.imgData = reader.result
        const name = randomWord(false, 32) + '_' + new Date().getTime()
        const res = await this.$ossService.uploadFile(that.imgData, name)
        this.bindeiditmainimg = res
        this.EidittableData[this.eiditidx].img = this.bindeiditmainimg
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
    // 添加编辑规格选项一
    async addeiditassembly() {
      this.EidittableData.push({
        eiditSpecification1: '',
        eiditSpecification2: '',
        img: '',
        price: 0,
        stock: 0,
        productid: ''
      })
    },
    // 添加编辑规格选项二
    async addeiditassembly2() {
      if (this.EidittableData.length > 0) {
        this.isnull = true
        for (let i = 0; i < this.EidittableData.length; i++) {
          if (this.EidittableData[i].eiditSpecification2 === '') {
            this.isnull = false
          }
        }
      }
      if (this.EidittableData.length === 0 || this.isnull) {
        this.EidittableData.push({
          eiditSpecification1: '',
          eiditSpecification2: '',
          img: '',
          price: 0,
          stock: 0,
          productid: ''
        })
      }
    },
    // 创建商品
    async Creategoods() {
      this.CreateVisible = true
    },
    // 编辑商品
    async Eidtgoods(val) {
      this.eiditsp1 = ''
      let data = await this.$commodityService.getdetails({
        priductid: val.product_id,
        language: ''
      })
      data = JSON.parse(data)
      const dtl = data.data.detail
      const skulist = data.data.sku_list
      this.EidittableData = []
      for (let i = 0; i < skulist.length; i++) {
        if (skulist[i].Sku_spec[1]) {
          for (let j = 0; j < this.skucode.length; j++) {
            if (this.skucode[j].zh_name === skulist[i].Sku_spec[0].Spec_value) {
              this.eiditsp1 = this.skucode[j].code
            }
            if (this.skucode[j].zh_name === skulist[i].Sku_spec[1].Spec_value) {
              this.eiditsp2 = this.skucode[j].code
            }
          }
          this.EidittableData.push({
            eiditSpecification1: this.eiditsp1,
            eiditSpecification2: this.eiditsp2,
            img: skulist[i].Image_url,
            price: skulist[i].Price,
            stock: skulist[i].Stock,
            productid: skulist[i].Out_sku_id
          })
        } else {
          for (let j = 0; j < this.skucode.length; j++) {
            if (this.skucode[j].zh_name === skulist[i].Sku_spec[0].Spec_value) {
              this.eiditsp1 = this.skucode[j].code
            }
          }
          this.EidittableData.push({
            eiditSpecification1: this.eiditsp1,
            eiditSpecification2: '',
            img: skulist[i].Image_url,
            price: skulist[i].Price,
            stock: skulist[i].Stock,
            productid: skulist[i].Out_sku_id
          })
        }
      }
      if (this.EidittableData[0].eiditSpecification2.length > 0) {
        this.eiditshowtwo = true
      } else {
        this.eiditshowtwo = false
      }
      this.eiditgoodname = val.product_name
      this.eiditskuid = val.product_id
      this.eiditcatename = val.cate_name
      this.eiditcateid = val.cate_id
      // this.eiditcateid1 = 'ces'
      // this.eiditcateid2 = 'ces'
      // this.eiditcateid3 = 'ces'
      // for (let i = 0; i < this.catecode.length; i++) {
      //   if (this.catecode[i].id === this.eiditcateid) {
      //     switch (this.catecode[i].level) {
      //       case 1:
      //         this.eiditcateid1 = this.eiditcateid
      //         break
      //       case 2:
      //         this.eiditcateid1 = this.catecode[i].parent_id
      //         this.eiditcateid2 = this.eiditcateid
      //         break
      //       case 3:
      //         this.eiditcateid2 = this.catecode[i].parent_id
      //         this.eiditcateid3 = this.eiditcateid
      //         for (let j = 0; j < this.catecode.length; j++) {
      //           if (this.catecode[j].id === this.catecode[i].parent_id) {
      //             this.eiditcateid1 = this.catecode[j].parent_id
      //           }
      //         }
      //     }
      //   }
      // }
      this.eidtVisible = true
      this.eiditremark = val.remark
      this.eiditstatus = val.status
      this.eiditRotationimg = dtl.carousel_gallery
      this.eiditDetailsimg = dtl.detail_gallery
      this.eiditsizeimg = dtl.size_gallery
      this.eiditweight = val.weight
      this.eiditx = val.volume.split('*')[0]
      this.eidity = val.volume.split('*')[1]
      this.eiditz = val.volume.split('*')[2]
      this.eiditdescribe = dtl.product_desc
    },
    // 删除功能
    async del(val) {
      this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        let res = await this.$commodityService.delgoods({
          productId: val.product_id,
          productUid: val.uid
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
    // 上传新建轮播图
    async uploadnewRotationimg(file) {
      const that = this
      const localFile = file.raw
      const reader = new FileReader()
      reader.readAsDataURL(localFile)
      reader.onload = async() => {
        that.imgData = reader.result
        const name = randomWord(false, 32) + '_' + new Date().getTime()
        const res = await this.$ossService.uploadFile(that.imgData, name)
        this.newRotationimg.push(res)
      }
    },
    // 上传新建详情图
    async uploadnewDetailsimg(file) {
      const that = this
      const localFile = file.raw
      const reader = new FileReader()
      reader.readAsDataURL(localFile)
      reader.onload = async() => {
        that.imgData = reader.result
        const name = randomWord(false, 32) + '_' + new Date().getTime()
        const res = await this.$ossService.uploadFile(that.imgData, name)
        this.newDetailsimg.push(res)
      }
    },
    // 上传新建尺寸图
    async uploadnewsizeimg(file) {
      const that = this
      const localFile = file.raw
      const reader = new FileReader()
      reader.readAsDataURL(localFile)
      reader.onload = async() => {
        that.imgData = reader.result
        const name = randomWord(false, 32) + '_' + new Date().getTime()
        const res = await this.$ossService.uploadFile(that.imgData, name)
        this.newsizeimg.push(res)
      }
    },
    // 上传编辑轮播图
    async uploadeiditRotationimg(file) {
      const that = this
      const localFile = file.raw
      const reader = new FileReader()
      reader.readAsDataURL(localFile)
      reader.onload = async() => {
        that.imgData = reader.result
        const name = randomWord(false, 32) + '_' + new Date().getTime()
        const res = await this.$ossService.uploadFile(that.imgData, name)
        this.eiditRotationimg.push(res)
      }
    },
    // 上传编辑详情图
    async uploadeiditDetailsimg(file) {
      const that = this
      const localFile = file.raw
      const reader = new FileReader()
      reader.readAsDataURL(localFile)
      reader.onload = async() => {
        that.imgData = reader.result
        const name = randomWord(false, 32) + '_' + new Date().getTime()
        const res = await this.$ossService.uploadFile(that.imgData, name)
        this.eiditDetailsimg.push(res)
      }
    },
    // 上传编辑尺寸图
    async uploadeiditsizeimg(file) {
      const that = this
      const localFile = file.raw
      const reader = new FileReader()
      reader.readAsDataURL(localFile)
      reader.onload = async() => {
        that.imgData = reader.result
        const name = randomWord(false, 32) + '_' + new Date().getTime()
        const res = await this.$ossService.uploadFile(that.imgData, name)
        this.eiditsizeimg.push(res)
      }
    },
    // 表格导入
    importTemplate(file) {
      const files = { 0: file.raw }
      if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
        this.$refs.Logs.writeLog('格式错误,请上传xls、xlsx格式的文件', false)
        this.showlog = false
        return
      }
      if (files.length <= 0) {
        this.$refs.Logs.writeLog('表格为空', false)
        this.showlog = false
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
    // 批量Excel导入
    async batchImport() {
      const dataSum = this.importTemplateData.length
      if (dataSum <= 0) {
        this.$refs.Logs.writeLog('表格数据为空', false)
        this.showlog = false
        return
      }
      this.showlog = false
      this.$refs.Logs.writeLog('开始读取数据...', true)
      const data = []
      this.foreignData = []
      const myMap = new Map()
      for (let index = 0; index < dataSum; index++) {
        const element = this.importTemplateData[index]
        const goodsname = element['商品名称(必填)']
        const skuid = element['商品类目ID(必填，请复制程序中的类目ID,可在类目窗口进行选择)']
        const goodsweight = element['商品净重(kg)(选填)']
        const goodsvolume = element['商品体积(cm)(选填，格式 长*宽*高)']
        const Details = element['详情信息(选填)']
        const Specification1 = element['规格一(必填，一行一个)']
        const Specification2 = element['规格二(选填，一行一个)']
        const Specificationsimg = element['规格图(必填，一行一张)']
        const skuprice = element['SKU价格(必填，一行一个价格)']
        const skunum = element['SKU库存(必填，一行一个库存)']
        const Rotationimg = element["轮播图(选填，同一商品名称，只需要填写一次，使用英文逗号隔开(','),默认第一张为主图)"]
        const Detailsimg = element["详情图片(选填，同一商品名称，只需要填写一次，使用英文逗号隔开(','))"]
        const sizeimg = element["尺寸图片(选填，同一商品名称，只需要填写一次，使用英文逗号隔开(','))"]
        const status = element['商品状态(必填)']
        if (!goodsname) {
          this.$refs.Logs.writeLog(`【${index + 1}】商品名称为空`, false)
          continue
        }
        if (!skuid) {
          this.$refs.Logs.writeLog(`【${index + 1}】商品编号(sku)为空`, false)
          continue
        }
        if (!Specification1) {
          this.$refs.Logs.writeLog(`【${index + 1}】规格一为空`, false)
          continue
        }
        if (!Specificationsimg) {
          this.$refs.Logs.writeLog(`【${index + 1}】规格图为空`, false)
          continue
        }
        if (!skuprice) {
          this.$refs.Logs.writeLog(`【${index + 1}】SKU价格为空`, false)
          continue
        }
        if (!skunum) {
          this.$refs.Logs.writeLog(`【${index + 1}】SKU库存为空`, false)
          continue
        }
        if (Specification2) {
          this.importzh_name1 = ''
          this.importzh_name2 = ''
          for (let i = 0; i < this.skucode.length; i++) {
            if (Specification1 === this.skucode[i].code) {
              this.importzh_name1 = this.skucode[i].zh_name
            }
            if (Specification2 === this.skucode[i].code) {
              this.importzh_name2 = this.skucode[i].zh_name
            }
          }
          const obj = {
            product_id: skuid,
            product_name: goodsname,
            price: skuprice,
            stock: skunum,
            status: status,
            weight: goodsweight,
            volume: goodsvolume,
            cate_id: skuid,
            carousel_gallery: [Rotationimg],
            detail_gallery: [Detailsimg],
            size_gallery: [sizeimg],
            product_desc: Details,
            image_url: Rotationimg,
            sku_list: [
              {
                sku_id: skuid,
                price: skuprice,
                sku_name: goodsname,
                image_url: Specificationsimg,
                stock: skunum,
                weight: goodsweight,
                volume: goodsvolume,
                status: status,
                sku_spec: [
                  {
                    spec_id: Specification1,
                    spec_name: '规格一',
                    spec_value: this.importzh_name1
                  }, {
                    spec_id: Specification2,
                    spec_name: '规格二',
                    spec_value: this.importzh_name2
                  }
                ]
              }
            ]
          }
          data.push(obj)
        } else {
          this.importzh_name1 = ''
          for (let i = 0; i < this.skucode.length; i++) {
            if (Specification1 === this.skucode[i].code) {
              this.importzh_name1 = this.skucode[i].zh_name
            }
          }
          const obj = {
            product_id: skuid,
            product_name: goodsname,
            price: skuprice,
            stock: skunum,
            status: status,
            weight: goodsweight,
            volume: goodsvolume,
            image_url: Rotationimg,
            cate_id: skuid,
            carousel_gallery: [Rotationimg],
            detail_gallery: [Detailsimg],
            size_gallery: [sizeimg],
            product_desc: Details,
            sku_list: [
              {
                sku_id: skuid,
                price: skuprice,
                sku_name: goodsname,
                image_url: Specificationsimg,
                stock: skunum,
                weight: goodsweight,
                volume: goodsvolume,
                status: status,
                sku_spec: [
                  {
                    spec_id: Specification1,
                    spec_name: '规格一',
                    spec_value: this.importzh_name1
                  }
                ]
              }
            ]
          }
          data.push(obj)
        }
      }
      data.map(item => {
        if (!myMap.has(item.sku_list[0].sku_id)) {
          myMap.set(item.sku_list[0].sku_id)
          this.foreignData.push(item)
        } else {
          this.$refs.Logs.writeLog(`过滤重复商品编号(SKU)【${item.sku_list[0].sku_id}】`, false)
        }
      })
      this.foreignData.map(async item => {
        const res = await this.StrockUpForegin.SaveProduct(item)
        if (res.code === 200) {
          this.$message.success('数据导入成功')
          this.$refs.Logs.writeLog('数据导入成功', true)
          this.showlog = false
        } else {
          this.$message.error(`数据导入失败${res.data}`)
          this.$refs.Logs.writeLog(`数据导入失败${res.data}`, false)
          this.showlog = false
        }
      })
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
    // 获取产品中心列表数据
    async getProductList() {
      this.Loading1 = true
      this.Loading3 = true
      const returnCreateStartTime = this.form.returnCreateTime ? `${this.$dayjs(this.form.returnCreateTime[0]).format('YYYY-MM-DD HH:mm:ss')}` : ''
      const returnCreateEndTime = this.form.returnCreateTime ? `${this.$dayjs(this.form.returnCreateTime[1]).format('YYYY-MM-DD HH:mm:ss')}` : ''
      const returnUpdateStartTime = this.form.returnUpdateTime ? `${this.$dayjs(this.form.returnUpdateTime[0]).format('YYYY-MM-DD HH:mm:ss')}` : ''
      const returnUpdateEndTime = this.form.returnUpdateTime ? `${this.$dayjs(this.form.returnUpdateTime[1]).format('YYYY-MM-DD HH:mm:ss')}` : ''
      const parmas = { // 产品中心条件搜索
        CateId: 0, // 类目ID
        ProductName: '', // 商品名称
        ProductId: '', // 商品编码
        SkuId: '', // SKU编码
        Status: '-1', // 商品状态
        StartTime: returnCreateStartTime, // 商品创建时间
        EndTime: returnCreateEndTime, // 商品创建结束时间
        UpdateStartTime: returnUpdateStartTime, // 商品更新开始时间
        UpdateEndTime: returnUpdateEndTime // 商品更新结束时间
      }
      parmas.CateId = Number(this.form.returnCategory)
      parmas.ProductName = this.form.returnGoodsName
      parmas.ProductId = this.form.returnGoodsId
      parmas.SkuId = this.form.returnSkuId
      parmas.Status = this.form.returnStatus
      const res = await this.StrockUpForegin.getProductList(parmas)
      if (res.code !== 200) {
        this.$message.error(res.data)
      }
      this.total = res.data.total
      this.tableData = res.data.data
      this.exportdata = res.data.data
      console.log('tableData', this.tableData)
      this.Loading1 = false
      this.Loading3 = false
    },
    // 数据导出功能
    async DerivedData() {
      if (this.exportdata.length) {
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
        this.exportdata.map((item) => {
          msg += `
        <tr>
          <td style="text-align:left;">${item.product_id || ''}</td>
          <td style="text-align:left;">${item.product_name || ''}</td>
          <td style="text-align:left;">${item.cate_id || ''}</td>
          <td style="text-align:left;">${item.image_url || ''}</td>
          <td style="text-align:left;">${item.status || ''}</td>
          <td style="text-align:left;">${item.price}</td>
          <td style="text-align:left;">${item.stock}</td>
          <td style="text-align:left;">${item.remark || ''}</td>
          <td style="text-align:left;">${item.created_at || ''}</td>
          <td style="text-align:left;">${item.updated_at || ''}</td>
        </tr>
        `
        })
        exportExcelDataCommon('自有商品信息', msg)
      } else {
        return this.$message.warning('没有可以导出的商品')
      }
    },
    bfClose(done) {
      this.form.returnCreateTime = [new Date().getTime() - 3600 * 1000 * 24 * 30, new Date()]
      this.form.returnUpdateTime = [new Date().getTime() - 3600 * 1000 * 24 * 30, new Date()]
      this.getProductList()
      this.showcatechoose = false
      done()
    },
    CateId(val) {
      this.form.returnCategory = val
    },
    CreatCateId(val) {
      this.newform.cate_id = val
    },
    EiditCateId(val) {
      this.eiditcateid = val
    },
    handleSizeChange(val) {
      this.page = 1
      this.pageSize = val
      this.getProductList()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getProductList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    clickhere() {
      this.showcatechoose = true
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../../module-less/product-center-less/own-goods.less';
</style>
