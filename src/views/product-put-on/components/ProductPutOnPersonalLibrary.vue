<template>
  <div class="personal-container">
    <header>
      <div class="header-left">
        <p class="text">基础操作</p>
        <el-button type="primary" size="mini">批量添加尺寸图</el-button>
        <el-button type="primary" size="mini">批量删除尺寸图</el-button>
        <el-button type="primary" size="mini">一键上新</el-button>
        <el-button type="primary" size="mini">批量映射虾皮类目</el-button>
        <el-button type="primary" size="mini">标记优选商品</el-button>
        <el-button type="primary" size="mini">取消标记优选商品</el-button>
        <el-button type="primary" size="mini">标记商品标签</el-button>
        <el-button type="primary" size="mini">取消商品标签</el-button>
        <el-button type="primary" size="mini">翻译后的数据导出</el-button>
        <el-button type="primary" size="mini">批量设置重量/体积</el-button>
        <el-button type="primary" size="mini">取消收藏</el-button>
      </div>
      <div class="header-right">
        <p class="text">列表筛选</p>
        <ul class="search-list">
          <li>
            <p>采购来源：</p>
            <el-select placeholder="" size="mini">
              <el-option>全部</el-option>
            </el-select>
          </li>
          <li>
            <p>筛选时间：</p>
            <el-select placeholder="" size="mini">
              <el-option>全部</el-option>
            </el-select>
            <el-date-picker
              v-model="value2"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd"
              size="mini"
            />
          </li>
          <li>
            <p>优选商品：</p>
            <el-select placeholder="" size="mini">
              <el-option>全部</el-option>
            </el-select>
          </li>
          <li>
            <p>编辑状态：</p>
            <el-select placeholder="" size="mini">
              <el-option>全部</el-option>
            </el-select>
          </li>
          <li>
            <p>语种：</p>
            <el-select placeholder="" size="mini">
              <el-option>全部</el-option>
            </el-select>
          </li>
          <li>
            <p>价格区间：</p>
            <el-input size="mini" placeholder="" />
            <span class="slot">-</span>
            <el-input size="mini" placeholder="" />
          </li>
          <li>
            <p>商品ID：</p>
            <el-input size="mini" placeholder="" />
          </li>
          <li>
            <p>商品标签：</p>
            <el-select placeholder="" size="mini">
              <el-option>全部</el-option>
            </el-select>
          </li>
          <li>
            <el-button type="primary" size="mini">刷新</el-button>
            <el-button type="primary" size="mini">搜索</el-button>
          </li>
        </ul>
      </div>
    </header>
    <article>
      <p class="tip">尊敬的用户：您好，为提高私有选品库模块的性能，系统只能保存近30天的非精选商品数据，为保证部分精选商品不被清理，请将需要保留的商品标记为精选商品</p>
      <u-table
        ref="plTable"
        :max-height="Height"
        use-virtual
        :data-changes-scroll-top="false"
        :header-cell-style="{
          backgroundColor: '#f5f7fa',
        }"
        row-key="id"
        :big-data-checkbox="true"
        :border="false"
        @selection-change="handleSelectionChange"
      >
        <u-table-column align="center" type="selection" />
        <u-table-column align="center" type="index" label="序号" />
        <u-table-column align="center" label="标签" />
        <u-table-column align="center" label="采购来源" prop="GoodsId" />
        <u-table-column align="center" label="优选商品" prop="Title" />
        <u-table-column align="center" label="商品Id" prop="CategoryName">
          <template v-slot="{ row }">
            <p style="white-space: normal">{{ row.CategoryName }}</p>
          </template>
        </u-table-column>
        <u-table-column align="center" label="标题" prop="Price" width="500px" fit>
          <template v-slot="{ row }">
            <p style="white-space: normal">{{ row.Title }}</p>
          </template>
        </u-table-column>

        <u-table-column align="center" label="主图" prop="Sales">
          <template v-slot="{ row }">
            <div style="justify-content: center; display: flex">
              <img :src="row.Image" style="width: 56px; height: 56px" />
            </div>
          </template>
        </u-table-column>
        <u-table-column align="center" label="价格" />
        <u-table-column align="center" label="库存" prop="Origin" />
        <u-table-column align="center" label="销量" />
        <u-table-column align="center" label="重量(kg)" />
        <u-table-column align="center" label="体积" />
        <u-table-column align="center" label="翻译语种" />
        <u-table-column align="center" label="源平台类目名称" />
        <u-table-column align="center" label="更新时间" />
        <u-table-column align="center" label="收藏时间" />
        <u-table-column align="center" label="操作结果" />
      </u-table>
    </article>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@import '../../../module-less/product-put-less/personal-library.less';
</style>
