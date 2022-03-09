<template>
  <el-row class="editor_on_new_goods contaniner" style="margin: 0;padding: 0;min-width: 1000px;">
    <div v-show="isNoFoldShow" class="nowrapBox" style="display: flex;">
      <div class="basisInstall width_470" style="padding: 10px;">
        <div class="basisInstall-title">功能区</div>
        <div class="basisInstall-box">
          <div class="button_mini_box">
            <el-button class="button_mini" size="mini" type="primary" disabled @click="batchDealWith(1)">收藏数据
            </el-button>
            <el-button
              class="button_mini"
              size="mini"
              type="primary"
              :disabled="isCollectShow"
              @click="batchDealWith(2,1)"
            >翻译数据
            </el-button>
          </div>
          <el-button
            style="flex: 1;margin-left: 10px;"
            size="mini"
            type="primary"
            :disabled="isCollectShow"
            @click="batchDealWith(3)"
          >批量编辑标题/描述
          </el-button>
          <el-button style="flex: 1" size="mini" type="primary" :disabled="isCollectShow" @click="batchDealWith(4)">
            批量添加尺寸图
          </el-button>
        </div>
        <div class="basisInstall-box">
          <el-button style="flex: 1" size="mini" type="primary" :disabled="isCollectShow" @click="batchDealWith(5)">
            一件组装数据到上新
          </el-button>
          <el-button style="flex: 1" size="mini" type="primary" :disabled="isCollectShow" @click="batchDealWith(6)">
            产品到上新
          </el-button>
          <el-button style="flex: 1" size="mini" type="primary" :disabled="isCollectShow" @click="batchDealWith(7)">
            批量删除尺寸图
          </el-button>
        </div>
        <div class="basisInstall-box">
          <el-button
            style="flex: 1"
            size="mini"
            type="primary"
            :disabled="!isCollect || isCollectShow"
            @click="batchDealWith(8)"
          >收藏失败产品重试
          </el-button>
          <el-button style="flex: 1" size="mini" type="primary" @click="batchDealWith(9)">取消操作</el-button>
          <el-button style="flex: 1" size="mini" type="primary" :disabled="isCollectShow" @click="batchDealWith(10)">
            标记商品标签
          </el-button>
        </div>
        <div class="basisInstall-box">
          <el-button style="flex: 1" size="mini" type="primary" :disabled="isCollectShow" @click="batchDealWith(11)">
            翻译失败产品重试
          </el-button>
          <el-button style="flex: 1" size="mini" type="primary" :disabled="isCollectShow" @click="batchDealWith(12)">
            标题首字母大写
          </el-button>
          <el-button style="flex: 1" size="mini" type="primary" :disabled="isCollectShow" @click="batchDealWith(13)">
            取消商品标签
          </el-button>
        </div>
        <div class="basisInstall-box">
          <el-button style="flex: 1" size="mini" type="primary" :disabled="isCollectShow" @click="batchDealWith(14)">
            批量映射虾皮类目
          </el-button>
          <el-button style="flex: 1" size="mini" type="primary" :disabled="isCollectShow" @click="batchDealWith(15)">
            翻译图片
          </el-button>
          <el-button style="flex: 1" size="mini" type="primary" :disabled="isCollectShow" @click="batchDealWith(16)">
            批量设置重量/体积
          </el-button>
        </div>
        <div class="basisInstall-box">
          <el-button style="flex: 1" size="mini" type="primary" :disabled="isCollectShow" @click="batchDealWith(17)">
            批量删除
          </el-button>
        </div>
        <el-upload
          v-if="uploadImgAdd"
          v-show="false"
          style="margin-right: 10px"
          action="#"
          :drag="true"
          :show-file-list="false"
          :limit="1"
          :auto-upload="false"
          :on-change="imageUpload"
        >
          <el-button ref="uploadImg" size="mini" type="primary">选择图片</el-button>
        </el-upload>
      </div>
      <div class="basisInstall width_600" style="padding: 10px 10px 5px;">
        <div class="basisInstall-title">功能区</div>
        <div class="basisInstall-box" style="color: red">
          <div>温馨提示：</div>
          使用【翻译数据】【一键组装数据到上新】功能前，先配置以下信息
        </div>
        <div class="basisInstall-box">
          <div>标签列表：</div>
          <el-select
            v-model="configLabel"
            value=""
            size="mini"
            filterable
            allow-create
            style="width: 120px;margin-right: 5px;"
            :disabled="isCollectShow"
          >
            <el-option v-for="(item,index) in configLabelList" :key="index" :value="item">
              <div style="display: flex;justify-content: space-between;align-items: center">
                <div>{{ item }}</div>
                <i class="el-icon-circle-close close-right" @click.stop="deleteConfigClick(item,index)" />
              </div>
            </el-option>
          </el-select>
          <el-button size="mini" type="primary" :disabled="isCollectShow" @click.native="saveConfigLabel">保存配置信息
          </el-button>
          <el-button size="mini" type="primary" :disabled="isCollectShow" @click.native="selectDescribe(0)">选择模板
          </el-button>
          <!--          <el-button size="mini" type="primary" @click.native="loginAliTranslation">登录阿里翻译</el-button>-->
        </div>
        <div class="basisInstall-box">
          <div>商品描述：</div>
          <el-radio v-model="goodsDescribeRadio" :label="0" :disabled="isCollectShow">自定义+SKU描述</el-radio>
          <el-radio v-model="goodsDescribeRadio" :label="1" :disabled="isCollectShow">原描述</el-radio>
          <el-radio v-model="goodsDescribeRadio" :label="2" :disabled="isCollectShow">原描述+自定义</el-radio>
          <el-radio v-model="goodsDescribeRadio" :label="3" :disabled="isCollectShow">原描述+SKU描述</el-radio>
          <el-radio v-model="goodsDescribeRadio" :label="4" :disabled="isCollectShow">自定义</el-radio>
        </div>
        <div class="basisInstall-box">
          <div>翻译配置：</div>
          <el-checkbox v-model="translationConfig.titleChecked" size="mini" :disabled="isCollectShow">翻译标题</el-checkbox>
          <el-checkbox v-model="translationConfig.specChecked" size="mini" :disabled="isCollectShow">翻译规格信息
          </el-checkbox>
          <el-checkbox v-model="translationConfig.describeChecked" size="mini" :disabled="isCollectShow">翻译描述
          </el-checkbox>
          <el-tooltip class="item" effect="dark" content="如果选择付费翻译描述，将会产生大量扣费" placement="top">
            <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;" /></el-button>
          </el-tooltip>
        </div>
        <div class="basisInstall-box">
          <div>翻译语种：</div>
          <el-select
            v-model="translationConfig.languages"
            size="mini"
            style="width: 80px;"
            value=""
            :disabled="isCollectShow"
          >
            <el-option
              v-for="item in languagesList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <div style="margin-left: 10px;">失败类型：</div>
          <el-select
            v-model="translationConfig.failureType"
            size="mini"
            style="width: 110px;"
            value=""
            :disabled="isCollectShow"
          >
            <el-option :label="'全部'" :value="0" />
            <el-option :label="'文字翻译失败'" :value="'3'" />
            <el-option :label="'图片翻译失败'" :value="'5'" />
          </el-select>
          <div style="margin-left: 10px;">线程数量：</div>
          <el-input
            v-model="threadNumber"
            size="mini"
            style="width: 40px;margin-right: 10px;"
            :disabled="isCollectShow"
          />
          <el-checkbox v-model="filterSimplifiedChecked" size="mini" :disabled="isCollectShow">上新过滤简体数据</el-checkbox>
        </div>
        <div class="basisInstall-box">
          <div>图片类型：</div>
          <el-checkbox v-model="pictureConfig.specChecked" size="mini" :disabled="isCollectShow">翻译规格图</el-checkbox>
          <el-checkbox v-model="pictureConfig.shuffleChecked" size="mini" :disabled="isCollectShow">翻译轮播图</el-checkbox>
          <div>删除条件：</div>
          <el-checkbox v-model="pictureConfig.deleteGoodsChecked" size="mini" :disabled="isCollectShow">删除库存低于设定值的商品
          </el-checkbox>
          <el-input v-model="pictureConfig.inventoryNumber" size="mini" style="width: 80px;" :disabled="isCollectShow" />
        </div>
        <div class="basisInstall-box">
          <div style="display: flex;align-items: center">
            <div>图片翻译：</div>
            <!--          <el-radio v-model="pictureConfig.typeRadio" :label="0">阿里免费翻译</el-radio>-->
            <el-radio v-model="pictureConfig.typeRadio" style="margin-right: 0;" :label="1" :disabled="isCollectShow">
              阿里付费翻译
            </el-radio>
            <el-tooltip style="margin-right: 10px;" class="item" effect="dark" content="0.06元一张图片" placement="top">
              <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;" /></el-button>
            </el-tooltip>
            <el-radio v-model="pictureConfig.typeRadio" :label="2" :disabled="isCollectShow">云图像翻译</el-radio>
          </div>
          <div style="display: flex;align-items: center">
            <div>图片翻译：</div>
            <el-select v-model="translationConfig.before" size="mini" style="width: 100px;" value="">
              <el-option label="不翻译" :value="'no'" />
              <el-option label="中文" :value="1" />
              <el-option label="英文" :value="2" />
            </el-select>
            <div style="width: 10px;height: 1px;background-color: #333333;margin: 0 5px;" />
            <el-select
              v-if="translationConfig.before === 'no'"
              size="mini"
              style="width: 100px;"
              value=""
              disabled
              placeholder="不翻译"
            />
            <el-select v-else v-model="translationConfig.after" size="mini" style="width: 100px;" value="">
              <el-option
                v-for="item in pictureLanguagesList"
                v-show="(pictureConfig.typeRadio !== 0 || translationConfig.before !==2) || item.free"
                v-if="item.isShow.indexOf(translationConfig.before)>=0"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div v-if="false && !pictureConfig.typeRadio" style="display: flex;">
            <div style="margin-left: 5px;">图片翻译检验：</div>
            <el-radio v-model="pictureConfig.checkedRadio" :label="1" :disabled="isCollectShow">检验</el-radio>
            <el-radio v-model="pictureConfig.checkedRadio" :label="0" :disabled="isCollectShow">不检验</el-radio>
          </div>
        </div>
        <!--        <div class="basisInstall-box">-->
        <!--          <div style="display: flex;align-items: center">-->
        <!--            <div>图片翻译：</div>-->
        <!--            <el-select v-model="translationConfig.before" size="mini" style="width: 100px;" value="">-->
        <!--              <el-option label="不翻译" :value="'no'"/>-->
        <!--              <el-option label="中文" :value="1"/>-->
        <!--              <el-option label="英文" :value="2"/>-->
        <!--            </el-select>-->
        <!--            <div style="width: 10px;height: 1px;background-color: #333333;margin: 0 5px;"/>-->
        <!--            <el-select v-if="translationConfig.before === 'no'" size="mini" style="width: 100px;" value="" disabled placeholder="不翻译">-->
        <!--            </el-select>-->
        <!--            <el-select v-else v-model="translationConfig.after" size="mini" style="width: 100px;" value="">-->
        <!--              <el-option-->
        <!--                  v-for="item in pictureLanguagesList"-->
        <!--                  v-show="(pictureConfig.typeRadio !== 0 || translationConfig.before !==2) || item.free"-->
        <!--                  v-if="item.isShow.indexOf(translationConfig.before)>=0"-->
        <!--                  :key="item.value"-->
        <!--                  :label="item.label"-->
        <!--                  :value="item.value"-->
        <!--              />-->
        <!--            </el-select>-->
        <!--          </div>-->
        <!--          <div v-if="!pictureConfig.typeRadio" style="display: flex;align-items: center;margin-left: 10px;">-->
        <!--            <div>阿里翻译账号：</div>-->
        <!--            <el-select v-model="aLiUsername" class="select-right-30" size="mini" style="width: 120px;" value="">-->
        <!--              <el-option v-for="item in aLiUsernameList" :key="item.id" :label="item.name" :value="item.name">-->
        <!--                <span>{{ item.name }}</span>-->
        <!--                <span class="span-but" @click.stop="deleteAliTranslation(item.id)">X</span>-->
        <!--              </el-option>-->
        <!--            </el-select>-->
        <!--            <el-button size="mini" style="margin-left: 5px" @click="joinAliTranslation">账号个人中心</el-button>-->
        <!--          </div>-->
        <!--        </div>-->
        <div style="color: red;display: flex; justify-content: space-between;margin-top: -5px;">
          马来站和菲律宾的部分类目需要设置体积和重量后才能上新
        </div>
      </div>
      <div class="basisInstall" style="padding: 10px;">
        <div class="basisInstall-title">日志区</div>
        <div class="basisInstall-box loose">
          <div class="keepRight">商品总数：</div>
          <span style="margin-left: 5px">{{ statistics.count }}</span>
        </div>
        <div class="basisInstall-box loose">
          <div class="keepRight">收藏成功总数：</div>
          <span style="margin-left: 5px">{{ statistics.scSuccess }}</span>
        </div>
        <div class="basisInstall-box loose">
          <div class="keepRight">翻译成功总数：</div>
          <span style="margin-left: 5px">{{ statistics.fySuccess }}</span>
        </div>
      </div>
    </div>
    <u-table
      ref="mallTableRef"
      :data="mallTable"
      use-virtual
      :data-changes-scroll-top="false"
      :header-cell-style="{backgroundColor: '#f5f7fa',}"
      row-key="id"
      :border="false"
      :big-data-checkbox="true"
      :height="isNoFoldShow && 430 || 680"
      @selection-change="handleSelectionChange"
    >
      <u-table-column align="center" show-overflow-tooltip width="55" type="selection" />
      <u-table-column align="left" show-overflow-tooltip type="index" width="55" label="序号" />
      <u-table-column align="left" show-overflow-tooltip label="主图" width="80" prop="Sales">
        <template v-slot="{ row }">
          <el-tooltip
            effect="light"
            placement="right-end"
            :visible-arrow="false"
            :enterable="false"
            style="width: 56px; height: 56px; display: inline-block"
          >
            <div slot="content">
              <el-image :src="row.image " style="width: 400px; height: 400px" />
            </div>
            <el-image :src="{url:row.image,source:row.source} | changeImgSizeFilter" style="width: 56px; height: 56px" />
          </el-tooltip>
        </template>
      </u-table-column>
      <u-table-column align="left" show-overflow-tooltip width="80" label="标签">
        <template v-slot="{ row }">
          <p style="white-space: normal">{{ getLabelName(row.sys_label_id) }}</p>
        </template>
      </u-table-column>
      <u-table-column align="left" label="商品编码" width="130" :show-overflow-tooltip="true">
        <template v-slot="{ row }">
          <span class="goToGoods" @click.stop="goToGoods(row)" style="color: red;cursor: pointer">{{ row.goods_id }}</span>
          <el-button type="text" class="copyIcon" @click="copy(row.goods_id)">
            <i class="el-icon-document-copy" /></el-button>
        </template>
      </u-table-column>
      <u-table-column align="left" label="采购来源" width="70">
        <template v-slot="{ row }">
          <p style="white-space: normal;overflow: hidden">{{ sourceObj[row.source + ''] }}</p>
        </template>
      </u-table-column>
      <u-table-column align="left" label="标题" width="140">
        <template v-slot="{ row }">
          <el-input
            v-model="row.title"
            resize="none"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 4}"
            placeholder="请输入标题"
            @blur="goodsListUpdate(row)"
          />
        </template>
      </u-table-column>
      <u-table-column align="left" show-overflow-tooltip label="类目" width="80">
        <template v-slot="{ row }">{{ getCategoty(row) || '未匹配到类目' }}</template>
      </u-table-column>
      <u-table-column align="left" label="价格" prop="price" width="70" />
      <u-table-column align="left" label="重量(kg)" width="75">
        <template v-slot="{ row }">
          <el-input v-model="row.weight" size="mini" @keyup.enter.native="goodsListUpdate(row)" />
        </template>
      </u-table-column>
      <u-table-column align="left" label="体积" width="115">
        <template v-slot="{ row }">
          <ul>
            <li style="display: flex;align-items: center;">
              <p style="white-space: nowrap;margin-right: 5px;">长(cm) </p>
              <el-input v-model="row.long" size="mini" @keyup.enter.native="goodsListUpdate(row)" />
            </li>
            <li style="display: flex;align-items: center;">
              <p style="white-space: nowrap;padding-right: 5px;">宽(cm) </p>
              <el-input v-model="row.width" size="mini" @keyup.enter.native="goodsListUpdate(row)" />
            </li>
            <li style="display: flex;align-items: center;">
              <p style="white-space: nowrap;padding-right: 5px;">高(cm) </p>
              <el-input v-model="row.height" size="mini" @keyup.enter.native="goodsListUpdate(row)" />
            </li>
          </ul>
        </template>
      </u-table-column>
      <u-table-column align="left" label="库存" width="80" prop="stock" />
      <u-table-column align="left" label="操作" width="130">
        <template v-slot="scope">
          <div style="display: flex;align-items: center;">
            <el-button size="mini" @click="updateGoodsEdit(scope.row)">删除</el-button>
            <el-button size="mini" type="primary" @click="updateGoodsEdit(scope.row,1)">编辑</el-button>
          </div>
        </template>
      </u-table-column>
      <u-table-column align="left" label="操作状态" width="100">
        <template v-slot="{row}">
          <div
            class="goodsTableLine"
            style="height: 80px"
            :style="`color:${row.operation_type && row.operation_type.includes('收藏失败') && 'red' || '#000'}`"
          >
            {{ row.operation_type || '' }}
          </div>
        </template>
      </u-table-column>
    </u-table>
    <div class="on_new_dialog">
      <el-dialog
        title="商品编辑"
        width="1000px"
        top="2vh"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :modal="false"
        :visible.sync="goodsEditorVisible"
      >
        <goods-edit-details
          v-if="goodsEditorVisible"
          :goods-editor="goodsEditor"
          @goodsEditorCancel="goodsEditorCancel"
        />
      </el-dialog>
      <el-dialog
        title="编辑标题描述"
        width="620px"
        :close-on-click-modal="false"
        :modal="false"
        :visible.sync="titleDescribeVisible"
      >
        <div class="watermark_dialog">
          <div class="on_new_dialog_box">
            <div class="keepRight" style="width: 60px;">标签：</div>
            <el-radio v-model="titleDescribeTypeRadio" :label="0" size="mini">编辑标题</el-radio>
            <el-radio v-model="titleDescribeTypeRadio" :label="1" size="mini">编辑描述</el-radio>
          </div>
          <div v-if="titleDescribeTypeRadio === 1" class="on_new_dialog_box">
            <div class="keepRight" style="width: 60px;">商品描述：</div>
            <el-radio v-model="titleGoodsDescribeRadio" :label="0">自定义+SKU描述</el-radio>
            <el-radio v-model="titleGoodsDescribeRadio" :label="1">原描述</el-radio>
            <el-radio v-model="titleGoodsDescribeRadio" :label="2">原描述+自定义</el-radio>
            <el-radio v-model="titleGoodsDescribeRadio" :label="3">自定义</el-radio>
            <el-button size="mini" type="primary" @click="selectDescribe(0)">选择模板</el-button>
          </div>
          <div class="on_new_dialog_box" style="margin: 10px 0;">
            <div class="keepRight" style="width: 60px;">关键词：</div>
            <el-input
              v-model="titleDescribeKey"
              type="textarea"
              :rows="6"
              resize="none"
              style="width: 100%"
              size="mini"
              placeholder="请输入关键词，每个单词以逗号','隔开"
            />
          </div>
          <div class="on_new_dialog_box">
            <div class="keepRight" style="width: 50px;" />
            <el-radio v-model="titleDescribeHandleRadio" :label="0" size="mini">删除关键词</el-radio>
            <el-radio v-model="titleDescribeHandleRadio" :label="1" size="mini">添加到标题/描述前</el-radio>
            <el-radio v-model="titleDescribeHandleRadio" :label="2" size="mini">添加到标题/描述后</el-radio>
            <el-radio v-model="titleDescribeHandleRadio" :label="3" size="mini">替换标题</el-radio>
            <el-radio v-model="titleDescribeHandleRadio" :label="4" size="mini" style="margin-right: 0">替换关键词</el-radio>
            <el-tooltip class="item" effect="dark" content="原词与新词间用';'隔开，需替换多个关键词时用','间隔" placement="top">
              <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;" /></el-button>
            </el-tooltip>
          </div>
          <div style="display:flex;justify-content: space-evenly;margin: 15px 0;">
            <el-button size="mini" type="primary" @click="titleDescribeSet">确定</el-button>
            <el-button size="mini" @click="titleDescribeKey = ''; titleDescribeVisible = false">取消</el-button>
          </div>
        </div>
      </el-dialog>
      <el-dialog
        title="描述模板"
        width="500px"
        :close-on-click-modal="false"
        :modal="false"
        :visible.sync="describeVisible"
      >
        <div class="watermark_dialog">
          <div class="on_new_dialog_box">
            <div style="display: flex;align-items: center;">
              <div>标签：</div>
              <el-select v-model="describeConfigId" size="mini" style="width: 120px;" value="" @change="">
                <el-option v-for="(item,index) in describeLabelList" :key="index" :label="item.lable" :value="item.id" />
              </el-select>
            </div>
            <div style="display: flex;align-items: center;margin-left: 15px;">
              新增标签：
              <el-input v-model="describeConfig.tag" size="mini" style="width: 120px;" />
            </div>
          </div>
          <div class="on_new_dialog_box">
            <div style="white-space: nowrap">描述：</div>
            <el-input
              v-model="describeConfig.text"
              type="textarea"
              :rows="6"
              resize="none"
              style="width: 100%"
              placeholder=""
              size="mini"
            />
          </div>
          <div style="display:flex;justify-content: space-evenly;margin-top: 15px;">
            <el-button size="mini" type="primary" @click="selectDescribe(1)">保存</el-button>
            <el-button size="mini" @click="selectDescribe(2)">删除</el-button>
            <el-button size="mini" type="primary" @click="selectDescribe(3)">确定</el-button>
            <el-button size="mini" @click="selectDescribe(4)">取消</el-button>
          </div>
        </div>
      </el-dialog>
      <el-dialog
        title="商品标签"
        width="300px"
        top="25vh"
        :close-on-click-modal="false"
        :modal="false"
        :visible.sync="goodsTagVisible"
      >
        <goodsLabel v-if="goodsTagVisible" :goods-table-select="mallTableSelect" @goodsTagChange="goodsTagChange" />
      </el-dialog>
      <el-dialog
        title="类目映射"
        width="700px"
        top="25vh"
        :close-on-click-modal="false"
        :modal="false"
        :visible.sync="categoryVisible"
      >
        <categoryMapping
          v-if="categoryVisible"
          :goods-current="{}"
          :mall-list="[]"
          @categoryChange="categoryChange"
        />
      </el-dialog>
      <el-dialog
        title="设置商品重量和体积"
        width="300px"
        top="25vh"
        :close-on-click-modal="false"
        :modal="false"
        :visible.sync="goodsSizeVisible"
      >
        <goods-size v-if="goodsSizeVisible" @goodsSizeChange="goodsSizeChange" />
      </el-dialog>
    </div>
  </el-row>
</template>

<script>
import { source, sourceObj } from '../views/product-put-on/components/collection-platformId'
import goodsEditDetails from './goods-edit-details'
import categoryMapping from './category-mapping'
import goodsLabel from './goods-label'
import goodsSize from './goods-size'
import { batchOperation, copyText, getGoodsUrl, randomWord, selfAliYunTransImage, terminateThread } from '../util/util'
import CollectKeyWordApI from '@/views/product-put-on/components/collection-keyword-api'
import CollectLinkApI from '@/views/product-put-on/components/collection-link-api'
import CollectPublicApI from '@/views/product-put-on/components/collection-public-api'

export default {
  name: 'EditorOnNewGoods',
  components: { goodsEditDetails, categoryMapping, goodsLabel, goodsSize },
  props: {
    mallTable: {
      type: Array,
      default: []
    },
    isCollect: {
      type: Boolean,
      default() {
        return false
      }
    },
    GoodsDeliveryAddress: {
      type: Number,
      default() {
        return 0
      }
    },
    IsCollectDescriptionIsNull: {
      type: Boolean,
      default() {
        return false
      } },
    IsDefaultFilterSkuCount: {
      type: Boolean,
      default() {
        return true
      } },
    IsFilterLazadaDeliveryDay: {
      type: Boolean,
      default() {
        return false
      } },
    IsFilterShopeeDeliveryDay: {
      type: Boolean,
      default() {
        return false
      } },
    MinShoppeDeliveryDay: {
      type: Number,
      default() {
        return 0
      } },
    MaxShoppeDeliveryDay: {
      type: Number,
      default() {
        return 20
      } }
  },
  data() {
    return {
      shopeeGoodsDeliveryAddressDic: { // 收藏商品时使用
        'MY': 'Mainland China',
        'TW': '中國大陸',
        'VN': 'Nước ngoài',
        'ID': 'Luar Negeri',
        'PH': 'Mainland China',
        'TH': 'ต่างประเทศ',
        'SG': 'Mainland China',
        'BR': 'China Continental'
      },
      CollectPublicApInstance: new CollectPublicApI(this),
      CollectKeyWordApInstance: new CollectKeyWordApI(this), // 关键词采集
      collectLinkApInstance: new CollectLinkApI(this), // 链接采集
      isNoFoldShow: true, // 折叠
      mallTableSelect: [], // 商品选择列表
      categoryList: {},
      // 描述
      describeVisible: false,
      describeConfig: {
        describe: '',
        text: '',
        lable: '',
        tag: ''
      },
      describeConfigId: '',
      describeConfigText: '',
      describeLabelList: [],
      // 标题-描述
      titleDescribeVisible: false,
      titleDescribeKey: '',
      titleDescribeTypeRadio: 0,
      titleGoodsDescribeRadio: 0,
      titleDescribeHandleRadio: 1,
      // 数据统计
      statistics: {
        count: 0,
        scSuccess: 0,
        fySuccess: 0
      },
      goodsDescribeRadio: 1,
      // 翻译账户
      aLiUsername: '',
      aLiUsernameList: [],
      // 翻译
      translationConfig: {
        titleChecked: true,
        describeChecked: true,
        specChecked: true,
        languages: 'th', // 翻译语种
        failureType: '3', // 失败类型
        before: 'no', // 翻译前
        after: '' // 翻译后
      }, // 文字
      pictureConfig: {
        specChecked: true,
        shuffleChecked: true,
        deleteGoodsChecked: false,
        inventoryNumber: '10', // 翻译语种
        typeRadio: 2, // 单选
        checkedRadio: 0 // 单选
      }, // 图片
      languagesList: [
        {
          label: '泰语',
          value: 'th'
        }, {
          label: '越南语',
          value: 'vi'
        }, {
          label: '英文',
          value: 'en'
        }, {
          label: '繁体',
          value: 'zh-TW'
        }, {
          label: '中文',
          value: 'zh'
        }, {
          label: '印尼语',
          value: 'id'
        }, {
          label: '马来语',
          value: 'ms'
        }, {
          label: '波兰语',
          value: 'pl'
        }, {
          label: '不翻译',
          value: 'no'
        }],
      pictureLanguagesList: [
        {
          label: '英文',
          isShow: '1',
          value: 'en'
        }, {
          label: '中文',
          isShow: '2',
          free: true,
          value: 'zh'
        }, {
          label: '繁体',
          isShow: '1,2',
          value: 'zh-TW'
        }, {
          label: '泰语',
          isShow: '1,2',
          value: 'th'
        }, {
          label: '印尼语',
          isShow: '1,2',
          value: 'id'
        }, {
          label: '马来语',
          isShow: '1',
          value: 'ms'
        }, {
          label: '越南语',
          isShow: '1,2',
          value: 'vi'
        }, {
          label: '葡萄牙语',
          isShow: '1,2',
          free: true,
          value: 'pt'
        }, {
          label: '西班牙语',
          isShow: '1,2',
          free: true,
          value: 'es'
        }, {
          label: '法语',
          isShow: '2',
          value: 'fr'
        }],
      filterSimplifiedChecked: false, // 过滤简体
      threadNumber: '5', // 线程数量
      labelList: [],
      sourceObj: null,
      source: null,
      userInfo: null,
      goodsEditorVisible: false,
      goodsEditor: null,
      isTranslationText: true,
      uploadImgAdd: false,
      // 弹窗
      goodsTagVisible: false,
      categoryVisible: false,
      goodsSizeVisible: false,
      configLabelList: [],
      configLabel: '',
      isReplaceSize: true,
      isCollectShow: false
    }
  },
  computed: {
    // 获取标签名
    getLabelName() {
      return function(id, isTrue) {
        const labelName = this.labelList.find(item => {
          return item.id === id + ''
        })
        isTrue ? this.currentLabelName = labelName.label_name : ''
        return labelName?.label_name || ''
      }
    },
    getCategoty() {
      return function(row) {
        return row.category_name || this.categoryList[row.category_id]
      }
    }
  },
  watch: {
    mallTable: {
      handler(val) {
        // console.log(val)
      },
      deep: true
    },
    describeConfigId(val) {
      const item = this.describeLabelList.filter(i => i && i.id === val)[0]
      this.describeConfig.text = item && item.description || ''
      this.describeConfig.describe = item && item.description || ''
      this.describeConfig.lable = item && item.lable || ''
    },
    categoryList: {
      handler(val) {
      },
      deep: true
    },
    goodsDescribeRadio(val) {
      this.translationConfig.describeChecked = val > 0 && val < 4
    },
    configLabel(val) {
      this.setConfigData(val)
    }
  },
  created() {
    this.sourceObj = sourceObj // 采购映射
    this.source = source // 采购来源
    this.getLabelList()
    this.getValueFormat()
  },
  async mounted() {
    this.statistics.count = this.mallTable.length
    if (this.isCollect) {
      this.isCollectShow = this.isCollect
      await batchOperation(this.mallTable, this.saveGoods)
      this.isCollectShow = false
    }
    this.$refs.mallTableRef.toggleAllSelection()
    const getLabelsRes = await this.$api.getLabels()
    const getLabelsData = getLabelsRes.data
    if (getLabelsData.code === 200) {
      this.configLabelList = getLabelsData.data || []
      if (this.configLabelList.length > 0) {
        this.configLabel = this.configLabelList[this.configLabelList.length - 1]
      }
    }
    const userJson = await this.$appConfig.getUserConfig()
    const userInfo = await this.$appConfig.getUserInfo()
    this.userInfo = Object.assign(JSON.parse(userJson), userInfo)
    console.log('this.userInfo', this.userInfo)
    await this.showCategory()
    const buyerList = await this.$api.getBuyerList()
    buyerList.data.data.forEach(item => {
      if (item.type == 99 || item.type == -1) {
        this.aLiUsernameList.push(item)
      }
    })
  },
  methods: {
    // 开启任务
    async batchDealWith(type, data) {
      console.log('type ===', type)
      if (type !== 8) {
        if (this.mallTableSelect.length < 1) {
          this.$message.error('请选择一个商品信息')
          return false
        }
      }
      if (type !== 1) {
        const list = []
        this.mallTableSelect.forEach(item => {
          if (!item.isFailure) {
            list.push(item)
          }
        })
        this.mallTableSelect = list
      }
      if (type === 1) {
        const list = []
        this.mallTableSelect.forEach(item => {
          if (item.isFailure) {
            list.push(item)
          }
        })
        this.isCollectShow = true
        await batchOperation(list, this.saveGoods)
        this.isCollectShow = false
      } else if (type === 2) {
        await this.translationPrepare(1)
      } else if (type === 3) {
        this.titleDescribeVisible = true
      } else if (type === 4) {
        this.uploadImgAdd = true
        const selectIndex = this.mallTableSelect.findIndex(i => i.size_image_id)
        if (selectIndex > -1) {
          this.$confirm('批量新增尺寸图时，是否替换原有尺寸图?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.isReplaceSize = true
            setTimeout(() => {
              this.$refs['uploadImg'].$el.click()
            }, 100)
          }).catch(() => {
            this.isReplaceSize = false
            setTimeout(() => {
              this.$refs['uploadImg'].$el.click()
            }, 100)
          })
        } else {
          this.isReplaceSize = true
          setTimeout(() => {
            this.$refs['uploadImg'].$el.click()
          }, 100)
        }
      } else if (type === 5) {
        await this.translationPrepare(1)
        await this.batchDealWith(6)
      } else if (type === 6) {
        const goodsList = []
        this.mallTableSelect.forEach(i => {
          const temp = Object.assign(i, {
            category_name: this.getCategoty(i) || '未匹配到类目',
            sys_label_name: this.getLabelName(i.sys_label_id),
            sourceName: this.sourceObj[i.source + '']
          })
          if (this.filterSimplifiedChecked) {
            if (temp.language === 'zh-Hans') {
              const index = this.mallTable.findIndex(son => i.id === son.id)
              this.StatusName(i, '中文简体无法直接上新')
              return
            }
          }
          goodsList.push(temp)
        })
        if (goodsList.length > 0) {
          this.$BaseUtilService.gotoUploadTab('gotoUpload', JSON.stringify(goodsList))
        }
      } else if (type === 7) {
        for (const i of this.mallTableSelect) {
          const index = this.mallTable.findIndex(son => i.id === son.id)
          if (i.size_image_id) {
            const deleteGoodsImageJson = await this.$commodityService.deleteGoodsImage(2, i.id, '0')
            const deleteGoodsImage = JSON.parse(deleteGoodsImageJson)
            if (deleteGoodsImage.code === 200) {
              this.$set(this.mallTable[index], 'operation_type', '尺寸图删除成功')
              this.$set(this.mallTable[index], 'size_image_id', 0)
            } else {
              this.$set(this.mallTable[index], 'operation_type', '尺寸图删除失败')
            }
          } else {
            this.$set(this.mallTable[index], 'operation_type', '无尺寸图可删除')
          }
        }
      } else if (type === 8) {
        const list = []
        this.mallTable.forEach(item => {
          if (item.isFailure) {
            list.push(item)
          }
        })
        this.isCollectShow = true
        await batchOperation(list, this.saveGoods)
        this.isCollectShow = false
      } else if (type === 9) {
        terminateThread()
      } else if (type === 10) {
        this.goodsTagVisible = true
      } else if (type === 11) {
        await this.translationPrepare(3)
      } else if (type === 12) {
        for (const i of this.mallTableSelect) {
          const titleList = [...i.title]
          titleList[0] = titleList[0] && titleList[0].toLocaleUpperCase() || ''
          const param = {
            sysGoodsId: i.id,
            title: titleList.join('')
          }
          const collectGoodsJson = await this.$commodityService.updateCollectGoodsInfo(param)
          const collectGoodsRes = JSON.parse(collectGoodsJson)
          const index = this.mallTable.findIndex(son => i.id === son.id)
          if (collectGoodsRes.code === 200) {
            this.$set(this.mallTable[index], 'title', titleList.join(''))
            this.$set(this.mallTable[index], 'operation_type', '标题首字母大写修改成功')
          } else {
            this.$set(this.mallTable[index], 'operation_type', '标题首字母大写修改失败')
          }
        }
      } else if (type === 13) {
        const ids = [...this.mallTableSelect.map(i => i.id)]
        const addGoodsToTagJson = await this.$commodityService.addGoodsToTag('0', ids)
        console.log('addGoodsToTagJson', addGoodsToTagJson)
        const addGoodsToTagRes = JSON.parse(addGoodsToTagJson)
        this.mallTableSelect.forEach(item => {
          const index = this.mallTable.findIndex(son => item.id === son.id)
          if (addGoodsToTagRes.code === 200) {
            this.$set(this.mallTable[index], 'sys_label_id', '0')
            this.$set(this.mallTable[index], 'operation_type', '商品标签删除成功')
          } else {
            this.$set(this.mallTable[index], 'operation_type', '商品标签删除失败')
          }
        })
      } else if (type === 14) {
        this.categoryVisible = true
      } else if (type === 15) {
        await this.translationPrepare(2)
      } else if (type === 16) {
        this.goodsSizeVisible = true
      } else if (type === 17) {
        let mallList = this.mallTableSelect
        if (this.pictureConfig.deleteGoodsChecked) {
          mallList = []
          this.mallTableSelect.forEach(item => {
            if (item.stock < this.pictureConfig.inventoryNumber) {
              mallList.push(item)
            }
          })
        }
        const length = mallList.length
        this.$confirm('共选中' + length + '个商品是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          mallList.forEach(item => {
            this.updateGoodsEdit(item)
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    // 商品编辑控制
    async updateGoodsEdit(item, type) {
      if (type) {
        this.goodsEditor = item
        this.goodsEditorVisible = true
      } else {
        const json = await this.$commodityService.deleteCollectGoodsInfo([item.id])
        const index = this.mallTable.findIndex(i => i.id === item.id)
        const index1 = this.mallTableSelect.findIndex(i => i.id === item.id)
        this.mallTable.splice(index, 1)
        this.mallTableSelect.splice(index1, 1)
        const res = JSON.parse(json)
        if (res.code === 200) {
          this.$message.success('商品删除成功')
        } else {
          this.$message.success('商品删除失败')
        }
      }
    },
    async translationPrepare(type) {
      console.log('translationPrepare', type)
      const goodsList = []
      this.mallTableSelect.forEach(item => {
        if (type === 3 && item.operation_type && item.operation_type.includes('翻译失败')) {
          goodsList.push(item)
        } else if (type === 2 && this.translationConfig.before !== 'no') {
          goodsList.push(item)
        } else if (item.language.toLocaleUpperCase() !== this.translationConfig.languages.toLocaleUpperCase()) {
          if (item.language !== 'zh-Hans' || this.translationConfig.languages !== 'zh') {
            goodsList.push(item)
          }
        }
      })
      if (type === 2) {
        this.isTranslationText = false
      }
      console.log('goodsList', goodsList)
      if (goodsList.length > 0) {
        const res = await batchOperation(goodsList, this.translationDate, parseInt(this.threadNumber))
        this.isTranslationText = true
      }
      return
    },
    async titleDescribeSet() {
      const res = await batchOperation(this.mallTableSelect, this.titleDescribeUpdate, this.threadNumber)
      this.titleDescribeVisible = false
    },
    async titleDescribeUpdate(item, count = { count: 1 }) {
      const index = this.mallTable.findIndex(i => i.id === item.id)
      this.$set(this.mallTable[index], 'operation_type', '正在更新...')
      try {
        const neededTranslateInfoJson = await this.$commodityService.getNeededTranslateInfoV2(item.id)
        const neededTranslateInfoData = JSON.parse(neededTranslateInfoJson) && JSON.parse(neededTranslateInfoJson).data
        let tempText = ''
        if (this.titleDescribeTypeRadio) {
          const text = this.describeConfig.text || ''
          if (this.titleGoodsDescribeRadio === 0) {
            const tier_variation = neededTranslateInfoData.tier_variation
            const spec1List = tier_variation[tier_variation.spec1].join('\n')
            const spec2List = tier_variation[tier_variation.spec2].join('\n')
            tempText = text + '\n' + spec1List + '\n' + spec2List
          } else if (this.titleGoodsDescribeRadio === 1) {
            tempText = neededTranslateInfoData.description
          } else if (this.titleGoodsDescribeRadio === 2) {
            tempText = neededTranslateInfoData.description + text
          } else if (this.titleGoodsDescribeRadio === 3) {
            tempText = text
          }
        } else {
          tempText = neededTranslateInfoData.title
        }
        const titleDescribeKey = this.titleDescribeKey.replaceAll('，', ',')
        const keyList = titleDescribeKey.split(',')
        if (this.titleDescribeHandleRadio === 0) {
          keyList.forEach(i => {
            tempText = tempText.replaceAll(i, '')
          })
        } else if (this.titleDescribeHandleRadio === 1 || this.titleDescribeHandleRadio === 2) {
          const keyStr = keyList.join(' ')
          tempText = this.titleDescribeHandleRadio === 1 ? (keyStr + ' ' + tempText) : (tempText + ' ' + keyStr)
        } else if (this.titleDescribeHandleRadio === 3) {
          if (this.titleDescribeTypeRadio) {
            this.$message.error('此次操作为编辑商品描述')
            return false
          }
        } else if (this.titleDescribeHandleRadio === 4) {
          keyList.forEach(i => {
            let key = i.replaceAll('；', ';')
            key = key.split(';')
            const oldStr = key[0] || ''
            const newStr = key[1] || ''
            tempText = tempText.replaceAll(oldStr, newStr)
          })
        }
        const param = {
          sysGoodsId: item.id
        }
        if (this.titleDescribeTypeRadio) {
          param.description = tempText
        } else {
          param.title = tempText
        }
        console.log('updateCollectGoodsInfo - param', param)
        const collectGoods = await this.$commodityService.updateCollectGoodsInfo(param)
        console.log('collectGoods', collectGoods)
        if (param.title) {
          this.$set(this.mallTable[index], 'title', param.title)
        }
        this.$set(this.mallTable[index], 'operation_type', '更新成功')
      } catch (e) {
        this.$set(this.mallTable[index], 'operation_type', '更新失败')
        console.log('titleDescribeUpdate', e)
      } finally {
        count.count--
      }
    },
    async loginAliTranslation() {
      const login = await this.$buyerAccountService.loginAliTranslation()
      const params = {
        name: login.name,
        password: '',
        type: 99,
        site: login.country || '',
        loginInfo: login.login_info,
        ua: login.ua,
        cachePath: login.cache_path,
        proxyId: ''
      }
      const { data } = await this.$api.upLoadBuyAccount(params)
      if (data.code === 200) {
        this.aLiUsername = params.name
        const index = this.aLiUsernameList.findIndex(i => i.name === params.name)
        if (index >= 0) {
          this.aLiUsernameList[index] = params
        } else {
          this.aLiUsernameList.push(params)
        }
      } else {
        this.$message.error('阿里翻译账号上报失败')
      }
    },
    async joinAliTranslation() {
      if (!this.aLiUsername) {
        this.$message.error('请选择一个阿里翻译账号')
        return
      }
      const index = this.aLiUsernameList.findIndex(i => i.name === this.aLiUsername)
      const aLiUsername = this.aLiUsernameList[index]
      const param = {
        type: aLiUsername.type,
        name: aLiUsername.name,
        login_info: JSON.stringify(aLiUsername.login_info),
        cache_path: aLiUsername.cache_path || '',
        ua: aLiUsername.ua || '',
        loginCookies: aLiUsername.login_info
      }
      console.log(param)
      const data = await this.$buyerAccountService.aliTranslateCenter(param)
      console.log(data)
    },
    async deleteAliTranslation(id) {
      const index = this.aLiUsernameList.findIndex(i => i.id === id)
      const params = {
        name: this.aLiUsernameList[index].name,
        type: this.aLiUsernameList[index].type,
        site: this.aLiUsernameList[index].site
      }
      const { data } = await this.$api.deleteBuyAccount(params)
      if (data.code === 200) {
        this.aLiUsername = ''
        this.aLiUsernameList.splice(index, 1)
      } else {
        this.$message.error('阿里翻译账号删除失败')
      }
    },
    async selectDescribe(type) {
      if (type === 0) {
        const descriptionTemplateListJson = await this.$commodityService.descriptionTemplateList()
        const descriptionTemplateListRes = JSON.parse(descriptionTemplateListJson)
        this.describeLabelList = descriptionTemplateListRes.data || []
        console.log(this.describeLabelList)
        if (this.describeConfigId) {
          const item = this.describeLabelList.filter(i => i && i.id === this.describeConfigId)[0]
          this.describeConfig.text = item && item.description || this.describeConfig.text
          this.describeConfig.describe = item && item.description || this.describeConfig.describe
          this.describeConfig.lable = item && item.lable || ''
        } else {
          this.describeConfigId = this.describeLabelList[0] && this.describeLabelList[0].id || ''
        }
        this.describeVisible = true
      } else {
        if (type === 1) {
          const label = this.describeConfig.tag || this.describeConfig.lable
          const descriptionTemplate = await this.$commodityService.uploadDescriptionTemplate(label, this.describeConfig.text)
          const data = JSON.parse(descriptionTemplate)
          this.describeConfig.tag = ''
          this.describeConfigId = parseInt(data.data)
          this.describeConfig.describe = this.describeConfig.text
          this.describeVisible = false
          if (data.code === 200) {
            this.$message.success('保存成功')
          } else {
            this.$message.error('保存失败【请求异常】')
          }
        } else if (type === 2) {
          const resJson = await this.$commodityService.deleteDescriptionTemplate(this.describeConfigId)
          const res = JSON.parse(resJson)
          if (res.code === 200) {
            const index = this.describeLabelList.findIndex(son => son.id === this.describeConfigId)
            console.log(this.describeConfigId, this.describeLabelList, index)
            this.describeLabelList.splice(index, 1)
            this.describeConfigId = ''
            this.$message.success('删除成功')
          } else {
            this.$message.error('删除失败')
          }
        } else if (type === 3) {
          if (this.describeConfigId) {
            const index = this.describeLabelList.findIndex(son => son.id === this.describeConfigId)
            const label = this.describeLabelList[index].lable
            const descriptionTemplate = await this.$commodityService.uploadDescriptionTemplate(label, this.describeConfig.text)
            const data = JSON.parse(descriptionTemplate)
            this.describeConfig.tag = ''
            this.describeConfigId = parseInt(data.data)
            this.describeConfig.describe = this.describeConfig.text
            this.describeVisible = false
            if (data.code === 200) {
              this.$message.success('保存成功')
            } else {
              this.$message.error('保存失败【请求异常】')
            }
            this.describeVisible = false
          } else {
            this.$message.error('保存失败【参数异常】')
          }
        } else if (type === 4) {
          this.describeConfig.text = this.describeConfig.describe
          this.describeVisible = false
        }
      }
    },
    async translationDate(item, count = { count: 1 }) {
      const index = this.mallTable.findIndex(i => i.id === item.id)
      this.$set(this.mallTable[index], 'operation_type', '正在翻译...')
      try {
        let success = true
        if (this.isTranslationText && item.language.toLocaleUpperCase() !== this.translationConfig.languages) {
          success = await this.translationText(item, index)
        }
        if (this.translationConfig.before !== 'no' && (this.pictureConfig.shuffleChecked || this.pictureConfig.specChecked)) {
          const aLiUsernameIndex = this.aLiUsernameList.findIndex(i => i.name === this.aLiUsername)
          const aliAccount = this.aLiUsernameList[aLiUsernameIndex]
          if (!aliAccount && this.pictureConfig.typeRadio === 0) {
            this.$message.error('阿里图片翻译账户尚未登录')
            return false
          }
          success = await this.translationPicture(item, index)
        }
        success && ++this.statistics.fySuccess
        success && this.$set(this.mallTable[index], 'operation_type', '翻译成功')
      } catch (e) {
        this.$set(this.mallTable[index], 'operation_type', '翻译失败')
        console.log(e)
      } finally {
        count.count--
      }
    },
    translationText(item, index) {
      return new Promise(async resolve => {
        console.log('getNeededTranslateInfoV2 - param', item)
        let success = true
        try {
          const neededTranslateInfoJson = await this.$commodityService.getNeededTranslateInfoV2(item.id)
          const neededTranslateInfoData = JSON.parse(neededTranslateInfoJson) && JSON.parse(neededTranslateInfoJson).data
          // console.log(neededTranslateInfoData)
          const title = this.translationConfig.titleChecked && neededTranslateInfoData.title || ''
          const description = this.translationConfig.describeChecked && neededTranslateInfoData.description || ''
          const spec1 = this.translationConfig.specChecked && neededTranslateInfoData.spec1 || ''
          const spec2 = this.translationConfig.specChecked && neededTranslateInfoData.spec2 || ''
          const fromLanguage = item.language
          const toLanguage = this.translationConfig.languages
          const param = {
            sysGoodsId: item.id,
            uuid: this.userInfo.child_id,
            language: toLanguage,
            shortTitle: '',
            spec1: spec1,
            spec2: spec2
          }
          let itemmodelsJson = JSON.stringify(neededTranslateInfoData.itemmodels)
          console.log('翻译：', this.userInfo.translate_set)
          const saveGoodsJson = []
          if (this.userInfo.translate_set == '2') {
            const goodsTitleJson = await this.$BaseUtilService.getGoodsTranslateInfo(fromLanguage, toLanguage, title)
            const getGoodsTitle = JSON.parse(goodsTitleJson)
            if (getGoodsTitle && getGoodsTitle[title]) {
              param.title = getGoodsTitle[title]
            } else {
              const translationJson1 = title && await this.$translationBridgeService.getGoogleTransResult([title], fromLanguage, toLanguage)
              console.log('translationJson1', translationJson1)
              param.title = translationJson1 && translationJson1.Data[0] && translationJson1.Data[0].DstText || neededTranslateInfoData.title
              saveGoodsJson.push({
                srcLanguage: fromLanguage,
                toLanguage: toLanguage,
                fromText: title,
                toText: param.title,
                createdAt: Math.floor(new Date().getTime() / 1000)
              })
            }
            const getGoodsDescription = JSON.parse(await this.$BaseUtilService.getGoodsTranslateInfo(fromLanguage, toLanguage, description))
            if (getGoodsDescription && getGoodsDescription[description]) {
              param.description = getGoodsTitle[description]
            } else {
              const translationJson2 = description && await this.$translationBridgeService.getGoogleTransResult([description], fromLanguage, toLanguage)
              console.log('translationJson2', translationJson2)
              param.description = translationJson2 && translationJson2.Data[0] && translationJson2.Data[0].DstText || neededTranslateInfoData.description
              saveGoodsJson.push({
                srcLanguage: fromLanguage,
                toLanguage: toLanguage,
                fromText: description,
                toText: param.description,
                createdAt: Math.floor(new Date().getTime() / 1000)
              })
            }
            param.spec1 = neededTranslateInfoData.spec1
            param.spec2 = neededTranslateInfoData.spec2
            const tier_variation = neededTranslateInfoData.tier_variation
            console.log(neededTranslateInfoData, param)
            const spec1List = tier_variation[tier_variation.spec1].join('<><>') || ''
            const spec2List = tier_variation[tier_variation.spec2].join('<><>') || ''
            if (this.translationConfig.specChecked) {
              const getGoodsSpec1 = JSON.parse(await this.$BaseUtilService.getGoodsTranslateInfo(fromLanguage, toLanguage, spec1List))
              let spec1ListDstStr = ''
              if (getGoodsSpec1 && getGoodsSpec1[spec1List]) {
                spec1ListDstStr = getGoodsSpec1[spec1List]
              } else {
                const spec1ListJson = await this.$translationBridgeService.getGoogleTransResult([spec1List], fromLanguage, toLanguage)
                spec1ListDstStr = spec1ListJson.Data && spec1ListJson.Data[0] && spec1ListJson.Data[0].DstText
                saveGoodsJson.push({
                  srcLanguage: fromLanguage,
                  toLanguage: toLanguage,
                  fromText: spec1List,
                  toText: spec1ListDstStr,
                  createdAt: Math.floor(new Date().getTime() / 1000)
                })
              }
              if (spec1ListDstStr) {
                console.log('itemmodelsJson1', spec1ListDstStr, spec1List)
                spec1ListDstStr = spec1ListDstStr.replaceAll('> <', '><')
                spec1ListDstStr = spec1ListDstStr.replaceAll('< ><>', '<><>')
                spec1ListDstStr = spec1ListDstStr.replaceAll('<>< >', '<><>')
                spec1ListDstStr = spec1ListDstStr.replaceAll('< >< >', '<><>')
                const spec1ListDst = spec1ListDstStr.split('<><>')
                const spec1ListSrc = spec1List && spec1List.split('<><>')
                const spec1ListSort = this.getArraySrcLengthSort(spec1ListSrc)
                spec1ListSort.forEach(item => {
                  itemmodelsJson = itemmodelsJson.replaceAll('"sku_spec1":"' + spec1ListSrc[item], '"sku_spec1":"' + spec1ListDst[item])
                  itemmodelsJson = itemmodelsJson.replaceAll('"sku":"' + spec1ListSrc[item], '"sku":"' + spec1ListDst[item])
                })
              } else {
                // 谷歌翻译失败
              }
              const getGoodsSpec2 = JSON.parse(await this.$BaseUtilService.getGoodsTranslateInfo(fromLanguage, toLanguage, spec2List))
              let spec2ListDstStr = ''
              if (getGoodsSpec2 && getGoodsSpec2[spec2List]) {
                spec2ListDstStr = getGoodsSpec2[spec2List]
              } else {
                const spec2ListJson = await this.$translationBridgeService.getGoogleTransResult([spec2List], fromLanguage, toLanguage)
                spec2ListDstStr = spec2ListJson.Data && spec2ListJson.Data[0] && spec2ListJson.Data[0].DstText
                saveGoodsJson.push({
                  srcLanguage: fromLanguage,
                  toLanguage: toLanguage,
                  fromText: spec2List,
                  toText: spec2ListDstStr,
                  createdAt: Math.floor(new Date().getTime() / 1000)
                })
              }
              if (spec2ListDstStr) {
                console.log('itemmodelsJson2', spec2ListDstStr, spec2List)
                spec2ListDstStr = spec2ListDstStr.replaceAll('<> <>', '<><>')
                const spec2ListDst = spec2ListDstStr.split('<><>')
                const spec2ListSrc = spec2List && spec2List.split('<><>')
                const spec2ListSort = this.getArraySrcLengthSort(spec2ListSrc)
                spec2ListSort.forEach(item => {
                  itemmodelsJson = itemmodelsJson.replaceAll('"sku_spec2":"' + spec2ListSrc[item], '"sku_spec2":"' + spec2ListDst[item])
                  itemmodelsJson = itemmodelsJson.replaceAll('=|=' + spec2ListSrc[item] + '"', '=|=' + spec2ListDst[item] + '"')
                })
              } else {
                // 谷歌翻译失败
              }
            }
          } else if (this.userInfo.translate_set == '4') {
            const translationJson1 = title && await this.$translationBridgeService.getAliYunTransResult([title], fromLanguage, toLanguage)
            console.log('translationJson1', translationJson1)
            param.title = translationJson1 && translationJson1.Data[0] && translationJson1.Data[0].DstText || neededTranslateInfoData.title
            saveGoodsJson.push({
              srcLanguage: fromLanguage,
              toLanguage: toLanguage,
              fromText: title,
              toText: param.title,
              createdAt: Math.floor(new Date().getTime() / 1000)
            })
            const translationJson2 = description && await this.$translationBridgeService.getAliYunTransResult([description], fromLanguage, toLanguage)
            console.log('translationJson2', translationJson2)
            param.description = translationJson2 && translationJson2.Data[0] && translationJson2.Data[0].DstText || neededTranslateInfoData.description
            saveGoodsJson.push({
              srcLanguage: fromLanguage,
              toLanguage: toLanguage,
              fromText: description,
              toText: param.description,
              createdAt: Math.floor(new Date().getTime() / 1000)
            })
            param.spec1 = neededTranslateInfoData.spec1
            param.spec2 = neededTranslateInfoData.spec2
            const tier_variation = neededTranslateInfoData.tier_variation
            console.log(neededTranslateInfoData, param)
            if (this.translationConfig.specChecked) {
              const spec1List = tier_variation[tier_variation.spec1]
              const spec1ResultList = []
              for (let i = 0; i < spec1List.length; i++) {
                const item = spec1List[i]
                const getGoodsSpec1 = JSON.parse(await this.$BaseUtilService.getGoodsTranslateInfo(fromLanguage, toLanguage, item))
                if (getGoodsSpec1 && getGoodsSpec1[item]) {
                  spec1ResultList[i] = getGoodsSpec1[item]
                } else {
                  const itemJson = await this.$translationBridgeService.getAliYunTransResult([item], fromLanguage, toLanguage)
                  const itemDstStr = itemJson.Data && itemJson.Data[0] && itemJson.Data[0].DstText
                  spec1ResultList[i] = itemDstStr
                  saveGoodsJson.push({
                    srcLanguage: fromLanguage,
                    toLanguage: toLanguage,
                    fromText: item,
                    toText: itemDstStr,
                    createdAt: Math.floor(new Date().getTime() / 1000)
                  })
                }
              }
              const spec1ListSort = this.getArraySrcLengthSort(spec1List)
              spec1ListSort.forEach(item => {
                itemmodelsJson = itemmodelsJson.replaceAll('"sku_spec1":"' + spec1List[item], '"sku_spec1":"' + spec1ResultList[item])
                itemmodelsJson = itemmodelsJson.replaceAll('"sku":"' + spec1List[item], '"sku":"' + spec1ResultList[item])
              })
              const spec2List = tier_variation[tier_variation.spec2]
              const spec2ResultList = []
              for (let i = 0; i < spec2List.length; i++) {
                const item = spec2List[i]
                const getGoodsSpec2 = JSON.parse(await this.$BaseUtilService.getGoodsTranslateInfo(fromLanguage, toLanguage, item))
                if (getGoodsSpec2 && getGoodsSpec2[item]) {
                  spec2ResultList[i] = getGoodsSpec2[item]
                } else {
                  const itemJson = await this.$translationBridgeService.getAliYunTransResult([item], fromLanguage, toLanguage)
                  const itemDstStr = itemJson.Data && itemJson.Data[0] && itemJson.Data[0].DstText
                  spec2ResultList[i] = itemDstStr
                  saveGoodsJson.push({
                    srcLanguage: fromLanguage,
                    toLanguage: toLanguage,
                    fromText: item,
                    toText: itemDstStr,
                    createdAt: Math.floor(new Date().getTime() / 1000)
                  })
                }
              }
              const spec2ListSort = this.getArraySrcLengthSort(spec2List)
              spec2ListSort.forEach(item => {
                itemmodelsJson = itemmodelsJson.replaceAll('"sku_spec2":"' + spec2List[item], '"sku_spec2":"' + spec2ResultList[item])
                itemmodelsJson = itemmodelsJson.replaceAll('=|=' + spec2List[item] + '"', '=|=' + spec2ResultList[item] + '"')
              })
            }
          }
          await this.$BaseUtilService.saveGoodsTranslation(JSON.stringify(saveGoodsJson))
          itemmodelsJson = itemmodelsJson.replaceAll('"sku_spec1":', '"spec1":')
          itemmodelsJson = itemmodelsJson.replaceAll('"sku_spec2":', '"spec2":')
          itemmodelsJson = itemmodelsJson.replaceAll('"sku_sn":', '"skuSn":')
          itemmodelsJson = itemmodelsJson.replaceAll(/"id":[0-9]*,/ig, '')
          itemmodelsJson = itemmodelsJson.replaceAll(/"selection_id":[0-9]*,/ig, '')
          itemmodelsJson = itemmodelsJson.replaceAll(/"skuId":([0-9]*),/ig, '"skuId":"$1",')
          param['skuSpecs'] = itemmodelsJson
          param.language = toLanguage === 'zh' && 'zh-Hans' || toLanguage === 'zh-TW' && 'zh-Hant' || toLanguage
          console.log('saveTranslationData - param', param, JSON.parse(itemmodelsJson))
          const translationDataJson = await this.$commodityService.saveTranslationData(param)
          const translationDataRes = JSON.parse(translationDataJson)
          console.log('saveTranslationData - json', translationDataJson)
          if (translationDataRes.code === 200) {
            const temp = Object.assign(this.mallTable[index], translationDataRes.data, { operation_type: '翻译成功' })
            this.$set(this.mallTable, index, temp)
          } else {
            success = false
            this.$set(this.mallTable[index], 'operation_type', '翻译失败')
          }
        } catch (e) {
          success = false
          this.$set(this.mallTable[index], 'operation_type', '翻译失败')
          console.log(e)
        } finally {
          resolve(success)
        }
      })
    },
    translationPicture(item, index) {
      return new Promise(async resolve => {
        let success = true
        this.$set(this.mallTable[index], 'operation_type', '正在获取商品图...')
        try {
          const neededTranslateInfoJson = await this.$commodityService.getSpuDetailByIdV2(item.id)
          const neededTranslateInfoData = JSON.parse(neededTranslateInfoJson) && JSON.parse(neededTranslateInfoJson).data
          console.log('getSpuDetailByIdV2 - data', neededTranslateInfoData)
          const aLiUsernameIndex = this.aLiUsernameList.findIndex(i => i.name === this.aLiUsername)
          const aliAccount = this.aLiUsernameList[aLiUsernameIndex]
          console.log('aliAccount', aliAccount)
          if (this.pictureConfig.shuffleChecked) {
            const image1List = neededTranslateInfoData.images1 || [] // 轮播图
            const image1ListLength = image1List.length
            for (let i = 0; i < image1ListLength; i++) {
              const son = image1List[i]
              let imageData = ''
              this.$set(this.mallTable[index], 'operation_type', `正在翻译轮播图(${(i + 1)}/${image1ListLength})`)
              if (this.pictureConfig.typeRadio === 0) {
                const fromLa = this.translationConfig.before === 1 && 'zh' || 'en'
                const result = await selfAliYunTransImage(son, {
                  fromLanguage: fromLa,
                  toLanguage: this.translationConfig.after
                }, aliAccount, this)
                if (result) {
                  imageData = result
                } else {
                  continue
                }
              } else if (this.pictureConfig.typeRadio === 1) {
                const fromLa = this.translationConfig.before === 1 && 'zh' || 'en'
                const { Data } = await this.$translationBridgeService.getAliYunTranslateImg(son.img, fromLa, this.translationConfig.after)
                imageData = Data.Data && Data.Data.Url || son.img
              } else if (this.pictureConfig.typeRadio === 2) {
                console.log(son.img, this.translationConfig.after)
                const json = son && son.img && await this.$translationBridgeService.getYunTranslateImg(son.img, this.translationConfig.after) || ''
                console.log(json)
                if (json && json.Code === 200) {
                  imageData = json.Data && json.Data.Url || son.img
                } else {
                  imageData = son.img
                  this.$set(this.mallTable[index], 'operation_type', `轮播图(${(i + 1)}/${image1ListLength})失败${json.Msg}`)
                  success = false
                  return
                }
              }
              const res = await this.$commodityService.updateGoodsImage('1', item.id, son.id, imageData)
              console.log(res)
            }
          }
          if (this.pictureConfig.specChecked && success) {
            let itemmodels = JSON.stringify(neededTranslateInfoData.itemmodels)
            const spec_imageList = neededTranslateInfoData.spec_image || [] // 规格图
            const spec_imageListLength = spec_imageList.length
            for (let i = 0; i < spec_imageListLength; i++) {
              const son = spec_imageList[i]
              let imageData = ''
              this.$set(this.mallTable[index], 'operation_type', `正在翻译规格图(${(i + 1)}/${spec_imageListLength})`)
              if (this.pictureConfig.typeRadio === 0) {
                const fromLa = this.translationConfig.before === 1 && 'zh' || 'en'
                const result = await selfAliYunTransImage(son, {
                  fromLanguage: fromLa,
                  toLanguage: this.translationConfig.after
                }, aliAccount, this)
                if (result) {
                  imageData = result
                } else {
                  continue
                }
                console.log('selfAliYunTransImage', result)
              } else if (this.pictureConfig.typeRadio === 1) {
                const fromLa = this.translationConfig.before === 1 && 'zh' || 'en'
                const { Data } = await this.$translationBridgeService.getAliYunTranslateImg(son, fromLa, this.translationConfig.after)
                imageData = Data.Data && Data.Data.Url || son
              } else if (this.pictureConfig.typeRadio === 2) {
                const json = son && await this.$translationBridgeService.getYunTranslateImg(son, this.translationConfig.after) || ''
                console.log(json)
                if (json && json.Code === 200) {
                  imageData = json.Data && json.Data.Url || son
                } else {
                  imageData = son
                  this.$set(this.mallTable[index], 'operation_type', `规格图(${(i + 1)}/${image1ListLength})失败${json.Msg}`)
                  success = false
                }
              }
              itemmodels = itemmodels.replaceAll(son, imageData)
              const res = await this.$commodityService.updateGoodsSkuImage(item.id + '', imageData, son)
              console.log(res)
            }
            itemmodels = itemmodels.replaceAll(/"id":[0-9]*,/ig, '')
            itemmodels = itemmodels.replaceAll(/"sku":"(((?!",).)*)",/ig, '')
            itemmodels = itemmodels.replaceAll('"sku_spec1":', '"skuSpec1":')
            itemmodels = itemmodels.replaceAll('"sku_spec2":', '"skuSpec2":')
            itemmodels = itemmodels.replaceAll('"sku_image":', '"skuImage":')
            itemmodels = itemmodels.replaceAll('"sku_sn":', '"skuSn":')
            itemmodels = itemmodels.replaceAll('"sku_price":', '"skuPrice":')
            itemmodels = itemmodels.replaceAll(/"sku_stock":([0-9]*),/ig, '"skuStock":"$1",')
            console.log(itemmodels)
            const andUpdateSku = await this.$commodityService.saveAndUpdateSkuDatas(item.id, itemmodels)
            console.log(andUpdateSku)
          }
        } catch (e) {
          console.log(e)
          success = false
          this.$set(this.mallTable[index], 'operation_type', '翻译失败...')
        } finally {
          resolve(success)
        }
      })
    },
    handleSelectionChange(val) {
      const list = []
      val.forEach(item => {
        if (!item.isFailure) {
          list.push(item)
        }
      })
      this.mallTableSelect = list
      console.log(this.mallTableSelect)
    },
    getValueFormat() {
      let nowDay = new Date()
      let oldDay = nowDay - 3600 * 1000 * 24 * 2 // 前2天
      oldDay = new Date(nowDay - 3600 * 24 * 1000 * 2).toISOString().slice(0, 10)
      nowDay = nowDay.toISOString().slice(0, 10)
      this.value2 = [oldDay, nowDay]
    },
    setIsNoFoldShow() {
      this.isNoFoldShow = !this.isNoFoldShow
    },
    getArraySrcLengthSort(arr, type) {
      const sort = []
      for (let i = 0; i < arr.length; i++) {
        let index = 0
        for (let j = 0; j < arr.length; j++) {
          if (arr[i].length > arr[j].length) {
            ++index
          }
        }
        while (sort[index] || sort[index] === 0) {
          ++index
        }
        sort[index] = i
      }
      return type && sort || sort.reverse()
    },
    goodsEditorCancel(data) {
      if (data) {
        const index = this.mallTable.findIndex(i => i.id === data.sysGoodsId)
        const temp = Object.assign(this.mallTable[index], data)
        this.$set(this.mallTable, index, temp)
      }
      this.goodsEditorVisible = false
    },
    async showCategory() {
      for (const i in this.mallTable) {
        const item = this.mallTable[i]
        let category = this.categoryList[item.category_id] || ''
        if (!category) {
          const categoty = JSON.parse(JSON.stringify(this.categoryList))
          const site = item.extra_info && JSON.parse(item.extra_info).site || ''
          const res = await this.$collectService.getGoodsCat(item.category_id, item.source, site)
          category = res.split('|')[0] || ''
          const name = res.split('|')[1] || ''
          if (category && name) {
            categoty[name] = category || '未匹配到类目'
            this.categoryList = categoty
          }
        }
      }
    },
    async goodsListUpdate(item) {
      console.log('goodsListUpdate', item)
      const index = this.mallTable.findIndex(son => son.id === item.id)
      if (item) {
        const sysGoodsId = item.id
        const description = item.description
        const title = item.title
        const param = {
          sysGoodsId,
          description,
          title,
          weight: item.weight,
          long: item.long,
          height: item.height,
          width: item.width
        }
        const updateGoodsJson = await this.$commodityService.updateGoods(param)
        console.log(updateGoodsJson)
        const updateGoodsRes = JSON.parse(updateGoodsJson)
        if (updateGoodsRes.code === 200) {
          this.$set(this.mallTable[index], 'operation_type', '数据更新成功')
        } else {
          this.$set(this.mallTable[index], 'operation_type', '数据更新失败')
        }
      }
    },
    goToGoods(item) {
      const extra_info = item.extra_info && JSON.parse(item.extra_info) || {}
      const temp = Object.assign({ productId: item.goods_id }, extra_info)
      const goods = getGoodsUrl(item.source, temp)
      this.$BaseUtilService.openUrl(goods.url)
    },
    imageUpload(file) {
      const localFile = file.raw
      const reader = new FileReader()
      reader.readAsDataURL(localFile)
      this.uploadImgAdd = false
      reader.onload = async() => {
        const imgData = reader.result
        const name = randomWord(false, 32) + '_' + new Date().getTime()
        const temp = await this.$ossService.uploadFile(imgData, name + '.png')
        for (const i of this.mallTableSelect) {
          const index = this.mallTable.findIndex(son => i.id === son.id)
          if (i.language === 'zh-Hans') {
            this.$set(this.mallTable[index], 'operation_type', '简体数据无需添加尺寸图')
            continue
          }
          if (this.isReplaceSize || !i.size_image_id) {
            const storeGoodsSizeImagesJson = await this.$commodityService.storeGoodsSizeImages(i.id + '', temp)
            const storeGoodsSizeImagesRes = JSON.parse(storeGoodsSizeImagesJson)
            const success = temp && storeGoodsSizeImagesRes.code === 200
            this.$set(this.mallTable[index], 'operation_type', '尺寸图添加' + (success && '成功' || '失败'))
            success && this.$set(this.mallTable[index], 'size_image_id', 1)
          } else {
            this.$set(this.mallTable[index], 'operation_type', '已有尺寸图，未替换')
          }
        }
      }
    },
    goodsSizeChange(val) {
      console.log('goodsSizeChange', val)
      if (val) {
        this.mallTableSelect.forEach(async i => {
          const index = this.mallTable.findIndex(son => i.id === son.id)
          console.log(i)
          const sysGoodsId = i.id
          const description = i.description
          const title = i.title
          const updateGoodsJson = await this.$commodityService.updateGoods({ sysGoodsId, description, title, ...val })
          console.log(updateGoodsJson)
          const updateGoodsRes = JSON.parse(updateGoodsJson)
          if (updateGoodsRes.code === 200) {
            const temp = Object.assign(this.mallTable[index], val)
            this.$set(this.mallTable, index, temp)
            this.$set(this.mallTable[index], 'operation_type', '设置重量/体积成功')
          } else {
            this.$set(this.mallTable[index], 'operation_type', '设置重量/体积失败')
          }
        })
      }
      this.goodsSizeVisible = false
    },
    async goodsTagChange(val) {
      console.log('goodsTagChange', val)
      if (val) {
        const mallList = [...this.mallTableSelect.map(i => i.id)]
        this.mallTable.forEach((item, index) => {
          if (mallList.includes(item.id)) {
            this.$set(this.mallTable[index], 'sys_label_id', val.category && val.category.id)
          }
        })
        this.labelList = val.goodsTagList || []
        this.$emit('goodsTagChange', val)
      }
      this.goodsTagVisible = false
    },
    categoryChange(val) {
      console.log('categoryChange', val)
      if (val) {
        const attributesList = []
        val.attributesList.forEach(son => {
          const option = son.new_options_obj.find(i => i.value_id === son.options)
          attributesList.push({
            attributeId: son.attribute_id,
            attributeName: son.attribute_name,
            valueId: option.value_id,
            value: option.value
          })
        })
        this.mallTableSelect.forEach(async item => {
          const param = {
            relationCategoryId: item.category_id,
            country: val.country,
            platformId: item.source,
            platformCategoryId: val.categoryList[val.categoryList.length - 1].category_id,
            categoryAttributes: attributesList
          }
          const save = await this.$commodityService.saveCategoryRelation(param)
          console.log('saveCategoryRelation', save)
        })
      }
      this.categoryVisible = false
    },
    async getLabelList(type) {
      const goodsLabelList = await this.$appConfig.temporaryCacheInfo('get', 'goodsLabelList', '')
      if (goodsLabelList !== '{}') {
        const jsonData = JSON.parse(goodsLabelList)
        if (jsonData && jsonData.length > 0 && type !== 'refresh') {
          this.labelList = jsonData || []
          return
        }
      }
      const res = await this.personalLibraryAPInstance.getLabelList()
      if (res.code !== 200) {
        return this.$message.error(`获取标签列表失败:${res.code}:${res.data}`)
      }
      const data = res.data || []
      this.$appConfig.temporaryCacheInfo('save', 'goodsLabelList', data)
      this.$message.success('获取标签列表成功')
      this.labelList = data
    },
    async deleteConfigClick(item, index) {
      const deleteLabelJson = await this.$api.deleteLabel({ label: item })
      console.log('deleteLabelJson', deleteLabelJson)
      this.configLabelList.splice(index, 1)
    },
    async setConfigData(data) {
      const getLabelRes = await this.$api.getLabel({ label: data })
      const getLabelData = getLabelRes.data
      if (getLabelData.code === 200) {
        if (getLabelData.data) {
          const config = getLabelData.data && getLabelData.data.config
          this.pictureConfig.typeRadio = Number(config.AliImgTranslateType || this.pictureConfig.typeRadio) || 2 // 阿里图片翻译类型
          this.goodsDescribeRadio = Number(config.GoodDescribe || this.goodsDescribeRadio) // 商品描述
          this.translationConfig.titleChecked = config.IsTranslateTitle // 是否翻译标题
          this.translationConfig.specChecked = config.IsTranslateSpecification // 是否翻译规格信息
          this.translationConfig.describeChecked = config.IsTranslateDescribe // 是否翻译描述
          this.translationConfig.languages = config.TranslateLanguage || this.translationConfig.languages // 翻译语种
          this.threadNumber = config.ThreadNumStr || this.threadNumber // 线程数
          this.filterSimplifiedChecked = config.IsFilterSimpleData // 上新是否过滤简体数据
          this.pictureConfig.specChecked = config.TranslateSkuPic // 翻译sku图
          this.pictureConfig.shuffleChecked = config.TranslateLunBoPic // 翻译轮播图
          this.pictureConfig.deleteGoodsChecked = config.IsDeleteStocokLess // 是否 删除库存低于设定值的商品
          this.pictureConfig.inventoryNumber = config.Stock || this.pictureConfig.inventoryNumber // 库存值
          this.translationConfig.before = config.SourceLanguage || this.translationConfig.before // 图片翻译源语言
          this.translationConfig.after = config.TargetLanguage || this.translationConfig.after // 图片翻译目的语言
          this.translationConfig.failureType = config.SelectedFailType || this.translationConfig.failureType // 失败类型
        }
      }
    },
    async saveConfigLabel() {
      const label = this.configLabel
      if (!label) {
        this.$message.error('请先选择或创建标签名')
      }
      const config = {}
      config.AliImgTranslateType = this.pictureConfig.typeRadio // 阿里图片翻译类型
      config.GoodDescribe = this.goodsDescribeRadio // 商品描述
      config.IsTranslateTitle = this.translationConfig.titleChecked// 是否翻译标题
      config.IsTranslateSpecification = this.translationConfig.specChecked // 是否翻译规格信息
      config.IsTranslateDescribe = this.translationConfig.describeChecked // 是否翻译描述
      config.TranslateLanguage = this.translationConfig.languages // 翻译语种
      config.ThreadNumStr = this.threadNumber// 线程数
      config.IsFilterSimpleData = this.filterSimplifiedChecked // 上新是否过滤简体数据
      config.TranslateSkuPic = this.pictureConfig.specChecked // 翻译sku图
      config.TranslateLunBoPic = this.pictureConfig.shuffleChecked // 翻译轮播图
      config.IsDeleteStocokLess = this.pictureConfig.deleteGoodsChecked // 是否 删除库存低于设定值的商品
      config.Stock = this.pictureConfig.inventoryNumber // 库存值
      config.SourceLanguage = this.translationConfig.before // 图片翻译源语言
      config.TargetLanguage = this.translationConfig.after // 图片翻译目的语言
      config.SelectedFailType = this.translationConfig.failureType // 失败类型
      const param = {
        label,
        config
      }
      console.log(param)
      try {
        const saveLabelRes = await this.$api.saveLabel(param)
        if (saveLabelRes.data && saveLabelRes.data.code === 200) {
          if (!this.configLabelList.includes(label)) {
            this.configLabelList.push(label)
          }
          this.$message.success('配置标签保存成功')
        } else {
          this.$message.error('配置标签保存失败')
        }
      } catch (e) {
        this.$message.error('配置标签保存失败')
      }
    },
    copy(str) {
      copyText(str)
    },
    async saveGoods(item, count = { count: 1 }) {
      let res = null
      try {
        this.StatusName(item, `正在获取商品详情`)
        const res2 = await this.collectLinkApInstance.getGoodsDeail(item)
        if (res2.code !== 200) {
          this.StatusName(item, `收藏失败：${res2.data}`)
          this.$set(item, 'isFailure', true)
        } else {
          console.log('详情数据', res2.data)
          res = await this.CollectPublicApInstance.setGoodsData(item, res2.data)
          if (res.code === 200) {
            res.data.operation_type = '收藏成功'
            res.data.isFailure = false
            const index = this.mallTable.findIndex(son => son.id === item.id)
            this.$set(this.mallTable, index, res.data)
            this.statistics.scSuccess++
          } else {
            let errorStr = ''
            if (res.msg) {
              errorStr = res.msg
            } else {
              errorStr = '收藏失败：' + res.data
            }
            this.StatusName(item, errorStr)
            this.$set(item, 'isFailure', true)
          }
        }
      } catch (error) {
        if (res.msg) {
          error = res.msg
        } else {
          error = '收藏失败：' + res.data
        }
        this.StatusName(item, `${error}`)
        this.$set(item, 'isFailure', true)
        console.log(error)
      } finally {
        --count.count
      }
    },
    // 操作结果字段
    StatusName(item, msg, status) {
      const index = this.mallTable.findIndex(son => son.id === item.id)
      this.$set(this.mallTable[index], 'operation_type', msg)
      // this.$set(item, 'color', status ? 'green' : 'red')
    }
  }
}
</script>

<style lang="less" scoped>
@import '../module-less/product-put-less/shangxin.less';
</style>

<style lang="less">
.editor_on_new_goods {
  .el-radio {
    margin-right: 10px;

    .el-radio__label {
      padding-left: 5px;
    }
  }

  .el-checkbox {
    margin-right: 10px;

    .el-checkbox__label {
      padding-left: 5px;
    }
  }

  .el-input--mini .el-input__inner {
    padding-left: 8px;
    padding-right: 8px;
  }

  .select-right-30 {
    .el-input--mini .el-input__inner {
      padding-right: 30px;
    }
  }
}

</style>
