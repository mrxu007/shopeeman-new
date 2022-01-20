
<template>
  <div class="advertisement">
    <div class="header-btn">
      <storeChoose @changeMallList="changeMallList" :is-all="false" />
    </div>
    <div class="select-btn">
      <div class="select-item">
        <div class="base-box">
          <span class="base-title">综合统计</span>
          <div class="base-item">
            <el-date-picker
              v-model="statisticalTime"
              size="mini"
              value-format="yyyy-MM-dd"
              type="daterange"
              style="width: 300px"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
            />
            <el-button type="primary" size="mini" class="mar-left" :disabled="loading" @click="batchGetAdventList">搜 索</el-button>
            <el-button type="primary" size="mini" :disabled="loading" @click="viewDetailVisible = true">查看详情</el-button>
            <el-button type="primary" size="mini" :disabled="loading" @click="exportData">导出数据</el-button>
            <div class="over-view">
              <div class="item">
                <span>余额</span>
                <span class="mar-left">{{ totalAnalysisData.balance }}</span>
              </div>
              <div class="item">
                <span>浏览数</span>
                <span lass="mar-left">{{ totalAnalysisData.impression }}</span>
              </div>
              <div class="item">
                <span>点击次数</span>
                <span class="mar-left">{{ totalAnalysisData.click }}</span>
              </div>
              <div class="item">
                <span>点击率</span>
                <span class="mar-left">{{ totalAnalysisData.impression == 0 ? 0 : ((totalAnalysisData.click / totalAnalysisData.impression) * 100).toFixed(2) }}%</span>
              </div>
              <div class="item">
                <span>订单数</span>
                <span class="mar-left">{{ totalAnalysisData.order }}</span>
              </div>
              <div class="item">
                <span>商品已出售</span>
                <span class="mar-left">{{ totalAnalysisData.order }}</span>
              </div>
              <div class="item">
                <span>销售金额</span>
                <span class="mar-left">{{ totalAnalysisData.orderGmv }}</span>
              </div>
              <div class="item">
                <span>花费</span>
                <span class="mar-left">{{ Number(totalAnalysisData.cost).toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="select-item">
        <div class="base-box">
          <span class="base-title">商品统计</span>
          <div class="base-item">
            <div class="select-row">
              <div class="item-box">
                <span>广告类型：</span>
                <el-select v-model="adventType" placeholder="请选择" size="mini" style="width: 140px">
                  <el-option v-for="item in adventTypeList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
              </div>
              <div class="item-box">
                <span>活动类型：</span>
                <el-select v-model="activeType" placeholder="请选择" size="mini" style="width: 140px">
                  <el-option label="全部" value="all"> </el-option>
                  <el-option v-for="item in activeTypeList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
              </div>
              <div class="item-box">
                <span>关键字：</span>
                <el-input size="mini" type="primary" v-model="keyWords" placeholder="可输入商品标题查询活动"></el-input>
              </div>
              <el-button type="primary" size="mini" class="mar-left" @click="batchGetAdventList" :disabled="loading">搜 索</el-button>
              <el-button type="primary" size="mini">停止搜索</el-button>
              <el-checkbox v-model="showConsole" class="mar-left">隐藏日志</el-checkbox>
            </div>
            <div class="select-row">
              <el-button type="primary" size="mini" :disabled="loading" @click="createSingleKeyword">创建单个商品关键字广告</el-button>
              <el-button type="primary" size="mini" :disabled="loading" @click="createBatchKeyword">创建批量商品关键字广告</el-button>
              <el-button type="primary" size="mini" :disabled="loading" @click="createRelevance">创建关联广告</el-button>
              <el-button type="primary" size="mini" @click="stopCreateAdvent">停止创建广告</el-button>
              <el-button type="primary" size="mini" plain :disabled="loading" @click="stopStartActive(1)">暂停广告活动</el-button>
              <el-button type="primary" size="mini" plain :disabled="loading" @click="stopStartActive(3)">继续广告活动</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <u-table
        ref="editPlTable"
        :data="tableData"
        use-virtual
        :height="550"
        :row-height="68"
        :data-changes-scroll-top="false"
        :border="false"
        :header-cell-style="{
          textAlign: 'center',
          backgroundColor: '#f5f7fa',
        }"
        @selection-change="handleSelectionChange"
      >
        <u-table-column align="center" type="selection" width="50" />
        <u-table-column align="center" type="index" label="序号" width="50" />
        <u-table-column width="120px" label="店铺名称" align="center" show-overflow-tooltip>
          <template slot-scope="{ row }"> {{ row.mallInfo.country }}-{{ row.mallInfo.mall_alias_name || row.mallInfo.platform_mall_name }} </template>
        </u-table-column>
        <u-table-column align="center" label="商品图片" width="80">
          <template slot-scope="scope">
            <el-tooltip effect="light" placement="right-end" :visible-arrow="false" :enterable="false" style="width: 32px; height: 32px; display: inline-block">
              <div slot="content">
                <el-image :src="[scope.row.image] | imageRender" style="width: 400px; height: 400px" />
              </div>
              <el-image v-bind:src="[scope.row.image, true] | imageRender" style="width: 32px; height: 32px"></el-image>
            </el-tooltip>
          </template>
        </u-table-column>
        <u-table-column align="center" label="商品ID" min-width="150" prop="product.itemid" />
        <u-table-column align="center" label="商品名称" min-width="150" prop="product.name" show-overflow-tooltip />
        <u-table-column align="center" label="活动类型" min-width="150" prop="campaign.state" show-overflow-tooltip>
          <template v-slot="{ row }">
            {{ activeState[row.campaign.state] }}
          </template>
        </u-table-column>
        <u-table-column align="center" label="活动日期" width="260" prop="price" show-overflow-tooltip>
          <template v-slot="{ row }">
            {{ `${$dayjs(row.campaign.start_time * 1000).format('YYYY/MM/DD HH:mm:ss')} - ${row.campaign.end_time == 0 ? '' : $dayjs(row.campaign.end_time * 1000).format('YYYY/MM/DD HH:mm:ss')}` }}
          </template>
        </u-table-column>
        <u-table-column align="center" label="预算" width="120" prop="promotion_price_after_tax">
          <template v-slot="{ row }">
            {{ dealWithQuota(row) }}
          </template>
        </u-table-column>
        <u-table-column align="center" label="浏览数" width="120" prop="report.impression.value" />
        <u-table-column align="center" label="点击次数" min-width="150" prop="report.click.value" />
        <u-table-column align="center" label="点击率(%)" min-width="150" prop="user_item_limit">
          <template v-slot="{ row }">
            {{ Number(row.report.impression.value) == 0 ? 0 : Math.round((Number(row.report.click.value) / Number(row.report.impression.value)) * 100).toFixed(2) }}
          </template>
        </u-table-column>
        <u-table-column align="center" label="订单数" min-width="150" prop="report.order_amount.value" />
        <u-table-column align="center" label="商品已出售" min-width="150" prop="report.order_amount.value" />
        <u-table-column align="center" label="销售金额" min-width="150" prop="report.order_gmv.value" />
        <u-table-column align="center" label="花费" min-width="150" prop="report.cost.value" />
        <u-table-column align="center" label="投资产出比" min-width="150" prop="user_item_limit">
          <template v-slot="{ row }">
            {{ Math.round(row.report.gmv_expense_ratio.value).toFixed(2) }}
          </template>
        </u-table-column>
        <u-table-column align="center" label="成本收入对比(%)" min-width="150" prop="user_item_limit">
          <template v-slot="{ row }">
            {{ Math.round(row.report.cir.value * 100).toFixed(2) }}
          </template>
        </u-table-column>
        <!-- <u-table-column align="center" label="操作状态" min-width="150" /> -->
      </u-table>
    </div>
    <Logs ref="Logs" clear v-model="showConsole" />
    <el-dialog v-if="viewDetailVisible" title="店铺综合统计详情概览" :visible.sync="viewDetailVisible" top="5vh" width="1200px" :close-on-click-modal="false">
      <el-table :data="totalData" style="width: 100%" height="300px">
        <el-table-column label="店铺名称" prop="id" width="160px" show-overflow-tooltip>
          <template slot-scope="{ row }"> {{ row.country }}-{{ row.mallName }} </template>
        </el-table-column>
        <el-table-column label="余额" prop="balance"> </el-table-column>
        <el-table-column label="浏览数" prop="impression"> </el-table-column>
        <el-table-column label="点击次数" prop="click"> </el-table-column>
        <el-table-column label="点击率(%)" prop="">
          <template v-slot="{ row }">
            {{ Number(row.impression) == 0 ? 0 : Math.round((Number(row.click) / Number(row.impression)) * 100).toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column label="订单数" prop="order"> </el-table-column>
        <el-table-column label="商品已出售" prop="order"> </el-table-column>
        <el-table-column label="销售金额" prop="orderGmv"> </el-table-column>
        <el-table-column label="花费" prop="cost">
          <template slot-scope="scope">
            <span>{{ Number(scope.row.cost).toFixed(2) }}</span>
          </template>
        </el-table-column>
        <el-table-column type="expand" label="查看明细" width="80">
          <template slot-scope="scope">
            <div v-for="(item, index) in analysisData[scope.row.mallId]" :key="index" class="expand-style" style="display: flex">
              <div>
                <span>{{ $dayjs(item.timestamp * 1000).format('YYYY/MM/DD HH:mm:ss') }}</span>
                <span class="mar-left">{{ item.impression }}</span>
              </div>
              <div>
                <span>{{ $dayjs(item.timestamp * 1000).format('YYYY/MM/DD HH:mm:ss') }}</span>
                <span class="mar-left">{{ item.click }}</span>
              </div>
              <div>
                <span>{{ $dayjs(item.timestamp * 1000).format('YYYY/MM/DD HH:mm:ss') }}</span>
                <span class="mar-left">{{ item.impression == 0 ? 0 : ((item.click / item.impression) * 100).toFixed(2) }}</span>
              </div>
              <div>
                <span>{{ $dayjs(item.timestamp * 1000).format('YYYY/MM/DD HH:mm:ss') }}</span>
                <span class="mar-left">{{ item.order_amount }}</span>
              </div>
              <div>
                <span>{{ $dayjs(item.timestamp * 1000).format('YYYY/MM/DD HH:mm:ss') }}</span>
                <span class="mar-left">{{ item.order_amount }}</span>
              </div>
              <div>
                <span>{{ $dayjs(item.timestamp * 1000).format('YYYY/MM/DD HH:mm:ss') }}</span>
                <span class="mar-left">{{ item.order_gmv }}</span>
              </div>
              <div>
                <span>{{ $dayjs(item.timestamp * 1000).format('YYYY/MM/DD HH:mm:ss') }}</span>
                <span class="mar-left">{{ item.cost }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog
      :visible.sync="createAdventVisible"
      v-if="createAdventVisible"
      top="7vh"
      title="创建广告关键字"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="1000px"
      @close="closeDialog"
    >
      <div class="create-style">
        <div class="warning-top">
          <p v-if="createType === 'single'">选择单个商品时，可选择是否开启自动选择关键字或手动选择关键字</p>
          <p v-else>
            选择两个及以上商品，shopee将自动管理广告关键字。相同的预算和时长设置将应用于每个广告。<br />
            最多20个商品，超过将自动选取前20个商品
          </p>
        </div>
        <el-button size="mini" type="primary" @click="goodsItemSelectorVisible = true">添加商品</el-button>
        <el-table
          :data="createChooseGoods"
          style="width: 100%; margin: 10px 0"
          max-height="200px"
          v-if="createChooseGoods.length"
          :row-style="{
            background: '#a9a9a9',
          }"
        >
          <el-table-column align="center" type="index" label="" width="20" />
          <el-table-column label="店铺名称" prop="id" width="180">
            <template slot-scope="{ row }"> {{ row.country }}-{{ row.mall_alias_name || row.platform_mall_name }} </template>
          </el-table-column>
          <el-table-column label="商品id" prop="itemid"> </el-table-column>
          <el-table-column label="商品图片" prop="impression" width="80">
            <template slot-scope="scope">
              <el-tooltip effect="light" placement="right-end" :visible-arrow="false" :enterable="false" style="width: 32px; height: 32px; display: inline-block">
                <div slot="content">
                  <el-image :src="[scope.row.image] | imageRender" style="width: 400px; height: 400px" />
                </div>
                <el-image v-bind:src="[scope.row.image, true] | imageRender" style="width: 32px; height: 32px"></el-image>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="价格" prop="price"> </el-table-column>
          <el-table-column label="已选商品数量">
            <template slot-scope="scope">
              <span>{{ createChooseGoods.length }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" prop="impression"> </el-table-column>
        </el-table>
        <div class="base-box mar-top">
          <span class="base-title">每个广告的预算</span>
          <div class="base-item">
            <el-radio v-model="budgetSingle" label="1">无限制</el-radio><br />
            <p v-if="budgetSingle == '1'" style="margin: 5px 0">根据您目前的广告预算余额，您的广告最多可获得0个点击数。</p>
            <el-radio v-model="budgetSingle" label="2">设定预算</el-radio>
            <div v-if="budgetSingle == '2'" class="item-box mar-top">
              <el-select v-model="budgetType" placeholder="请选择" style="width: 120px" size="mini">
                <el-option label="每日预算" value="day"> </el-option>
                <el-option label="总预算" value="total"> </el-option>
              </el-select>
              <el-input v-model="budget" size="mini" class="mar-left" style="width: 160px">
                <template slot="prepend">{{ country | siteCoin }}</template>
              </el-input>
            </div>
            <p v-if="budgetSingle === '2' && budgetType === 'day' && (!budget || budget < dailyBudgetMinLimit)" class="activeColor mar-top">预算必须大于{{ dailyBudgetMinLimit }}</p>
            <p v-if="budgetType === 'total' && (!budget || budget < totalBudgetMinLimit)" class="activeColor mar-top">预算必须大于{{ totalBudgetMinLimit }}</p>
            <p v-if="budget" class="mar-top">
              根据您目前的广告预算余额，您的广告最多可获得<span class="activeColor">{{
                budgetType === 'day' ? Math.floor(budget / dailySingleClickPrice) : Math.floor(budget / totalSingleClickPrice)
              }}</span
              >个点击数
            </p>
          </div>
        </div>
        <div class="base-box mar-top">
          <span class="base-title">每个广告的时长</span>
          <div class="base-item">
            <el-radio v-model="timeSingle" label="1">不限时</el-radio><br />
            <el-radio v-model="timeSingle" label="2">设定开始日期/结束日期</el-radio>
            <div v-if="timeSingle == '2'" class="item-box mar-top">
              <el-date-picker
                v-model="timeRange"
                size="mini"
                value-format="yyyy-MM-dd"
                type="daterange"
                style="width: 300px"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
              />
            </div>
          </div>
        </div>
        <!-- v-if="createType === 'single'-->
        <div class="base-box mar-top" v-if="createType === 'single'">
          <span class="base-title">关键字</span>
          <div class="base-item">
            <el-checkbox v-model="autoKeyword">自动选择</el-checkbox><br />
            <el-checkbox v-model="handleKeyword" @change="handleChangeKeyType">手动选择</el-checkbox>
            <div v-if="handleKeyword" class="mar-top">
              <div class="item-box">
                <el-button size="mini" type="primary" :disabled="loading" @click="batchChangeKey('keyPriceVisible')">批量修改出价</el-button>
                <el-button size="mini" type="primary" :disabled="loading" @click="batchChangeKey('keyTypeVisible')">批量编辑匹配类型</el-button>
                <el-button size="mini" type="primary" :disabled="loading" @click="batchChangeKey('delete')">批量删除</el-button>
              </div>
              <el-table :data="keyWordList" style="width: 100%; margin: 10px 0" max-height="360px" @selection-change="handleSelectionChangeKey" v-loading="keyListLoading">
                <el-table-column align="center" type="index" label="序号" width="40" />
                <el-table-column align="center" type="selection" width="50" fixed="left" />
                <el-table-column label="关键字" prop="keyword" width="120" show-overflow-tooltip />
                <el-table-column label="品质分数" prop="relevance"> </el-table-column>
                <el-table-column label="搜索量" prop="search_volume"> </el-table-column>
                <el-table-column label="匹配类型" prop="impression" width="140">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.algorithm" style="width: 120px" size="mini">
                      <el-option label="广泛匹配" value="kwrcmdv2"> </el-option>
                      <el-option label="精准匹配" value="kwrcmdv1"> </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="推荐出价" prop="recommend_price" width="80">
                  <template slot-scope="scope">
                    <span style="color: green">{{ country | siteCoin }}{{ Number(scope.row.recommend_price).toFixed(2) }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="点击出价" width="160" align="center">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.selfPrice" placeholder="请输入内容" size="mini" class="mar-left" style="width: 140px">
                      <template slot="prepend">{{ country | siteCoin }}</template>
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="setKeyDeleteSingle(scope.$index)">删 除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <div class="footer-btn">
          <el-button size="mini" type="primary" :disabled="loading" v-if="createType === 'single'" @click="publishAdvent">确认发布</el-button>
          <el-button size="mini" type="primary" :disabled="loading" v-if="createType === 'batch'" @click="batchCreateKeyWord">确认发布</el-button>
          <el-button size="mini" type="primary" @click="createAdventVisible = false">取消发布</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="goodsItemSelectorVisible" top="7vh" title="商品选择" :close-on-click-modal="false" :close-on-press-escape="false" width="1280px">
      <goodsItemSelector v-if="goodsItemSelectorVisible" :mall="selectMallList" @changeGoodsItem="changeGoodsItem" />
    </el-dialog>
    <el-dialog :visible.sync="keyPriceVisible" title="批量修改出价" :close-on-click-modal="false" :close-on-press-escape="false" width="500px" @close="closeKeyPrice">
      <div class="keyPrice-style">
        <div class="item">
          <el-radio v-model="keyPriceRadio" label="1">按金额增加/减少出价</el-radio>
          <div class="item-item">
            <el-select v-model="calcType" style="width: 100px" size="mini">
              <el-option label="增加" value="add"> </el-option>
              <el-option label="减少" value="sub"> </el-option>
            </el-select>
            <el-input v-model="keyPrice1" size="mini" class="mar-left" style="width: 140px">
              <template slot="prepend">{{ country | siteCoin }}</template>
            </el-input>
          </div>
        </div>
        <div class="item">
          <el-radio v-model="keyPriceRadio" label="2">按百分比增加/减少出价</el-radio>
          <div>
            <el-select v-model="calcType" style="width: 100px" size="mini">
              <el-option label="增加" value="add"> </el-option>
              <el-option label="减少" value="sub"> </el-option>
            </el-select>
            <el-input v-model="keyPrice2" size="mini" class="mar-left" style="width: 140px">
              <template slot="prepend">%</template>
            </el-input>
          </div>
        </div>
        <div class="item">
          <el-radio v-model="keyPriceRadio" label="3">设定出价为</el-radio>
          <div>
            <el-input v-model="keyPrice3" size="mini" class="mar-left" style="width: 140px">
              <template slot="prepend">{{ country | siteCoin }}</template>
            </el-input>
          </div>
        </div>
        <div class="item">
          <el-radio v-model="keyPriceRadio" label="4">设定出价为推荐价格</el-radio>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="keyPriceVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="setKeyPrice">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="keyTypeVisible" title="批量修改出价" :close-on-click-modal="false" :close-on-press-escape="false" width="500px" @close="closeKeyPrice">
      <div class="keyPrice-style">
        <el-radio v-model="keyType" label="kwrcmdv2">广泛匹配</el-radio><br />
        <p style="color: #a9a9a9" class="mar-top">只要搜寻包含此关键字，或与之有关的内容，您投放的广告就有机会出现</p>
        <el-radio v-model="keyType" label="kwrcmdv1" class="mar-top">精准匹配</el-radio>
        <p style="color: #a9a9a9" class="mar-top">只有搜寻此关键字时，您投放的广告才会出现</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="keyTypeVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="setKeyType">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="relevanceVisible" title="创建关联广告" :close-on-click-modal="false" :close-on-press-escape="false" width="1200px" @close="closeKeyPrice">
      <div class="relevance-style">
        <div class="base-box">
          <span class="base-title">设定关联广告</span>
          <div class="base-item">
            <p style="color: #a9a9a9">一次最多可以勾选十个商品</p>
            <div class="select-row">
              <el-button type="primary" size="mini" :disabled="loading" @click="1">添加商品</el-button>
              <el-button type="primary" size="mini" :disabled="loading" @click="1">批量修改出价</el-button>
              <el-button type="primary" size="mini" :disabled="loading" @click="1">批量编辑预算</el-button>
            </div>
            <div class="select-row">
              <el-table :data="relevanceList" style="width: 100%; margin: 10px 0" max-height="360px" @selection-change="handleSelectionChangeRelevance">
                <el-table-column align="center" type="index" label="序号" width="50" />
                <el-table-column align="center" type="selection" width="50" fixed="left" />
                <el-table-column label="店铺名称" prop="id" width="180" show-overflow-tooltip>
                  <template slot-scope="{ row }"> {{ row.country }}-{{ row.mall_alias_name || row.platform_mall_name }} </template>
                </el-table-column>
                <el-table-column label="商品ID" prop="relevance"> </el-table-column>
                <el-table-column label="商品图片" prop="search_volume"> </el-table-column>
                <el-table-column label="价格" prop="impression" width="140">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.algorithm" style="width: 120px" size="mini">
                      <el-option label="广泛匹配" value="kwrcmdv2"> </el-option>
                      <el-option label="精准匹配" value="kwrcmdv1"> </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="已选商品数量" prop="recommend_price" width="100">
                  <template slot-scope="scope">
                    <span style="color: green">{{ country | siteCoin }}{{ Number(scope.row.recommend_price).toFixed(2) }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="点击出价" width="160" align="center">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.selfPrice" placeholder="请输入内容" size="mini" class="mar-left" style="width: 140px">
                      <template slot="prepend">{{ country | siteCoin }}</template>
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column label="预算" width="160" align="center">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.selfPrice" placeholder="请输入内容" size="mini" class="mar-left" style="width: 140px">
                      <template slot="prepend">{{ country | siteCoin }}</template>
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column label="时间长度" width="160" align="center">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.selfPrice" placeholder="请输入内容" size="mini" class="mar-left" style="width: 140px">
                      <template slot="prepend">{{ country | siteCoin }}</template>
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="setKeyDeleteSingle(scope.$index)">删 除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <div class="base-box mar-top">
          <span class="base-title">显示位置设置</span>
          <div class="base-item">
            <p style="color: #a9a9a9">设置溢价率可使您的每个广告显示位置的出价更具有竞争力</p>
            <p style="color: #a9a9a9" class="mar-top">打开所有广告显示位置的状态，以获得更好的广告流量</p>
            <div class="special-row-style">
              <div class="box">
                <span class="title">显示位置</span>
                <span>相关商品-商品详情页面</span>
              </div>
              <div class="box">
                <span class="title">溢价</span>
                <span>增加出价</span>
                <el-input v-model="detailPrice" placeholder="请输入内容" size="mini" class="mar-left" style="width: 100px">
                  <template slot="append">%</template>
                </el-input>
              </div>
              <div class="box">
                <span class="title">状态</span>
                <el-switch v-model="detailRadio" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
              </div>
            </div>
            <div class="special-row-style">
              <div class="box">
                <span class="title">显示位置</span>
                <span>每日新发现-主页</span>
              </div>
              <div class="box">
                <span class="title">溢价</span>
                <span>增加出价</span>
                <el-input v-model="dailyPrice" placeholder="请输入内容" size="mini" class="mar-left" style="width: 100px">
                  <template slot="append">%</template>
                </el-input>
              </div>
              <div class="box">
                <span class="title">状态</span>
                <el-switch v-model="dailyRadio" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
              </div>
            </div>
            <div class="special-row-style">
              <div class="box">
                <span class="title">显示位置</span>
                <span>您可能喜欢-商品详情页面</span>
              </div>
              <div class="box">
                <span class="title">溢价</span>
                <span>增加出价</span>
                <el-input v-model="mayLikePrice" placeholder="请输入内容" size="mini" class="mar-left" style="width: 100px">
                  <template slot="append">%</template>
                </el-input>
              </div>
              <div class="box">
                <span class="title">状态</span>
                <el-switch v-model="mayLikeRaido" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="1">确认发布</el-button>
        <el-button size="mini" @click="relevanceVisible = false">取消发布</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import storeChoose from '../../../components/store-choose'
import goodsItemSelector from '../../../components/goods-item-selector'
import { batchOperation, delay, terminateThread, exportExcelDataCommon, creatDate } from '@/util/util'
export default {
  components: {
    storeChoose,
    goodsItemSelector,
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
      },
      selectMallList: [],
      country: 'TH',
      statisticalTime: [],
      showConsole: false,
      adventType: 'keyword', //广告类型
      adventTypeList: [
        {
          label: '关键字广告',
          value: 'keyword',
        },
        {
          label: '关联广告',
          value: 'targeting',
        },
      ], //广告类型
      activeType: 'all', //活动类型
      activeTypeList: [
        {
          label: '已预设',
          value: 'scheduled',
        },
        {
          label: '进行中',
          value: 'ongoing',
        },
        {
          label: '暂停中',
          value: 'paused',
        },
        {
          label: '已结束',
          value: 'ended',
        },
      ], //活动类型
      keyWords: '', //关键字,
      tableData: [],
      loading: false,
      multipleSelection: [],
      multipleSelectionKey: [],
      multipleSelectionRelevance: [],
      viewDetailVisible: false, //查看详情
      analysisData: {}, //综合统计数据
      totalData: [],
      totalAnalysisData: {
        balance: 0, //余额
        impression: 0, //浏览量
        click: 0, //点击次数
        order: 0, //订单数(商品已出售)
        orderGmv: 0, //销售金额
        cost: 0, //花费
      },
      activeState: {
        ended: '已结束',
        closed: '已结束',
        ongoing: '进行中',
        scheduled: '已预设',
        paused: '暂停中',
      },
      createAdventVisible: false, //广告弹窗
      createType: 'single',
      createChooseGoods: [], //创建弹窗选择的商品
      budgetSingle: '1', //每个广告的预算
      timeSingle: '1', //每个广告的时长
      autoKeyword: true,
      handleKeyword: false,
      selectGoods: [],
      goodsItemSelectorVisible: false,
      budgetType: 'day', //预算类型
      budget: 0, //预算
      timeRange: [], //广告时间
      keyWordList: [],
      keyPriceRadio: '1', //关键字出价
      calcType: 'add',
      keyPrice1: '',
      keyPrice2: '',
      keyPrice3: '',
      keyPriceVisible: false,
      keyListLoading: false,
      keyTypeVisible: false,
      keyType: '',
      dailyBudgetMinLimit: '', //点击量
      totalBudgetMinLimit: '', //点击量
      dailySingleClickPrice: '', //点击量
      totalSingleClickPrice: '', //点击量
      relevanceVisible: true, //关联广告
      detailPrice: 0,
      detailRadio: true,
      dailyPrice: 0,
      dailyRadio: true,
      mayLikePrice:0,
      mayLikeRaido: true,
    }
  },
  mounted() {
    this.statisticalTime = creatDate(1)
    let startTime = this.$dayjs(new Date().getTime()).format('YYYY-MM-DD')
    let endTime = this.$dayjs(new Date().getTime() + 16 * 24 * 60 * 60 * 1000).format('YYYY-MM-DD')
    this.timeRange = [startTime, endTime]
    console.log(this.timeRange, 'this.timeRange')
    this.setClickPrice()
  },
  methods: {
    //创建关联广告
    async createRelevance() {
      this.adventType = 'targeting'
      this.goodsItemSelectorVisible = true
    },
    //暂停或继续广告活动
    async stopStartActive(type) {
      //type 1 stop,
      if (!this.multipleSelection.length) {
        return this.$message.warning('请先选择数据！')
      }
      this.showConsole = false
      this.multipleSelection.forEach(async (item, index) => {
        let params = {
          campaignid_list: [item.campaign.campaignid],
          action: type,
          need_campaign: true,
          mallId: item.mallInfo.platform_mall_id,
        }
        let res = await this.$shopeemanService.stopStartAdvent(item.mallInfo.country, params)
        if (res.code === 200) {
          this.$refs.Logs.writeLog(`店铺【${item.mallInfo.mall_alias_name || item.mallInfo.platform_mall_name}】，商品【${item.product.itemid}】${type === 1 ? '暂停' : '继续'}广告成功！`, true)
        } else if (res.code === 403) {
          this.$refs.Logs.writeLog(
            `店铺【${item.mallInfo.mall_alias_name || item.mallInfo.platform_mall_name}】，商品【${item.product.itemid}】${type === 1 ? '暂停' : '继续'}广告失败，店铺未登录！`,
            false
          )
        } else {
          this.$refs.Logs.writeLog(
            `店铺【${item.mallInfo.mall_alias_name || item.mallInfo.platform_mall_name}】，商品【${item.product.itemid}】${type === 1 ? '暂停' : '继续'}广告失败，${res.data}！`,
            false
          )
        }
        if (index === this.multipleSelection.length - 1) {
          this.batchGetAdventList()
        }
      })
    },
    stopCreateAdvent() {
      terminateThread()
      this.$alert('正在停止操作，可能需要一些时间！', '提示', {
        confirmButtonText: '确定',
      })
    },
    createBatchKeyword() {
      if (!this.selectMallList.length) {
        return this.$message.warning('请选择店铺！')
      }
      this.createType = 'batch'
      this.createAdventVisible = true
    },
    //批量添加关键词广告
    async batchCreateKeyWord() {
      if (!this.createChooseGoods.length) {
        return this.$message.warning('请先选择商品！')
      }
      if (this.budgetSingle === '2' && !this.budget) {
        return this.$message.warning('请设置预算！')
      }
      this.showConsole = false
      await batchOperation(this.selectMallList, this.createBatchKeyWordAdvent)
      this.createAdventVisible = false
      this.batchGetAdventList()
    },
    async createBatchKeyWordAdvent(mall, count = { count: 1 }) {
      console.log('1111111111111111')
      try {
        this.$refs.Logs.writeLog(`店铺【${mall.mall_alias_name || mall.platform_mall_name}】开始创建广告`, true)
        let chooseGoods = this.createChooseGoods.filter((n) => n.platform_mall_id == mall.platform_mall_id)
        if (!chooseGoods.length) {
          return this.$refs.Logs.writeLog(`店铺【${mall.mall_alias_name || mall.platform_mall_name}】停止创建广告，该店铺未选择商品`, true)
        }
        let campaign_ads_list = []
        let campaign = {
          start_time: this.timeRange.length ? Math.round(new Date(this.timeRange[0]).getTime() / 1000) : 0,
          end_time: this.timeRange.length ? Math.round(new Date(this.timeRange[1]).getTime() / 1000) : 0,
          daily_quota: this.budgetType === 'day' ? this.budget : 0,
          total_quota: this.budgetType === 'total' ? this.budget : 0,
          status: 1,
        }
        chooseGoods.forEach((goods) => {
          let obj1 = {
            itemid: goods.itemid,
            status: 1,
            placement: 4,
            extinfo: {
              target_roi: 0,
            },
          }
          let advertisements = [obj1]
          let adsParams = {
            campaign: campaign,
            advertisements: advertisements,
          }
          campaign_ads_list.push(adsParams)
        })
        let params = {
          campaign_ads_list: campaign_ads_list,
          ads_audit_event: 4,
          mallId: mall.platform_mall_id,
        }
        this.showConsole = false
        let res = await this.$shopeemanService.createKeyAdvent(mall.country, params)
        if (res.code === 200) {
          this.$refs.Logs.writeLog(`店铺【${mall.mall_alias_name || mall.platform_mall_name}】创建广告成功`, true)
          // this.batchGetAdventList()
        } else if (res.code === 403) {
          this.$refs.Logs.writeLog(`店铺【${mall.mall_alias_name || mall.platform_mall_name}】创建广告失败，店铺未登录`, false)
        } else {
          this.$refs.Logs.writeLog(`店铺【${mall.mall_alias_name || mall.platform_mall_name}】创建广告失败，${res.data}`, false)
        }
      } catch (error) {
        console.log(error, 'error')
      } finally {
        --count.count
      }
    },
    //确定发布单个商品关键字广告
    async publishAdvent() {
      if (!this.autoKeyword && !this.handleKeyword && !this.multipleSelectionKey.length) {
        return this.$message.warning('请切换自动选择或至少选择一个关键字')
      }
      if (this.budgetSingle === '2' && !this.budget) {
        return this.$message.warning('请设置预算！')
      }
      this.loading = true
      console.log(this.timeRange)
      try {
        let campaign_ads_list = []
        let campaign = {
          start_time: this.timeRange.length ? Math.round(new Date(this.timeRange[0]).getTime() / 1000) : 0,
          end_time: this.timeRange.length ? Math.round(new Date(this.timeRange[1]).getTime() / 1000) : 0,
          daily_quota: this.budgetType === 'day' ? this.budget : 0,
          total_quota: this.budgetType === 'total' ? this.budget : 0,
          status: 1,
        }
        this.createChooseGoods.forEach((goods) => {
          let advertisements = []
          let obj1 = {
            itemid: goods.itemid,
            status: 1,
            placement: 4,
            extinfo: {
              target_roi: 0,
            },
          }
          advertisements.push(obj1)
          if (this.handleKeyword) {
            let keyList = []
            this.multipleSelectionKey.forEach((keyWords) => {
              let keyObj = {
                match_type: 0,
                keyword: keyWords.keyword,
                price: Number(keyWords.selfPrice),
                status: 1,
                algorithm: keyWords.algorithm,
              }
              keyList.push(keyObj)
            })
            let obj2 = {
              itemid: goods.itemid,
              status: 1,
              placement: 0,
              extinfo: {
                keywords: keyList,
              },
            }
            advertisements.push(obj2)
          }
          let adsParams = {
            campaign: campaign,
            advertisements: advertisements,
          }
          campaign_ads_list.push(adsParams)
        })
        let params = {
          campaign_ads_list: campaign_ads_list,
          ads_audit_event: 4,
          mallId: this.selectMallList[0].platform_mall_id,
        }
        this.showConsole = false
        let res = await this.$shopeemanService.createKeyAdvent(this.country, params)
        if (res.code === 200) {
          this.$refs.Logs.writeLog(`创建广告成功`, true)
          this.batchGetAdventList()
        } else if (res.code === 403) {
          this.$refs.Logs.writeLog(`创建广告失败，店铺未登录`, false)
        } else {
          this.$refs.Logs.writeLog(`创建广告失败，${res.data}`, false)
        }
        this.loading = false
        console.log(res, 'res===')
      } catch (error) {
        this.loading = false
        console.log(error, 'error')
      }
    },
    //批量修改出价
    batchChangeKey(key) {
      console.log(key)
      if (!this.multipleSelectionKey.length) {
        return this.$message.warning('请先勾选数据!')
      }
      if (key === 'delete') {
        this.setKeyDelete()
      } else {
        this[key] = true
      }
    },
    setKeyDeleteSingle(index) {
      this.keyWordList.splice(index, 1)
    },
    //批量删除关键字
    setKeyDelete() {
      this.multipleSelectionKey.forEach((item) => {
        let index = this.keyWordList.findIndex((m) => m.keyword === item.keyword)
        if (index > -1) {
          this.keyWordList.splice(index, 1)
        }
      })
    },
    //保存修改类型
    setKeyType() {
      this.multipleSelectionKey.forEach((item) => {
        let index = this.keyWordList.findIndex((m) => m.keyword === item.keyword)
        if (index > -1) {
          this.$set(this.keyWordList[index], 'algorithm', this.keyType)
        }
      })
    },
    //保存修改出价
    setKeyPrice() {
      this.multipleSelectionKey.forEach((item) => {
        let selfPrice = 0
        if (this.keyPriceRadio === '1') {
          selfPrice = this.calcType === 'add' ? Number(item.recommend_price) + Number(this.keyPrice1) : Number(item.recommend_price) - Number(this.keyPrice1)
        } else if (this.keyPriceRadio === '2') {
          selfPrice =
            this.calcType === 'add'
              ? Number(item.recommend_price) + (this.keyPrice2 / 100) * Number(item.recommend_price)
              : Number(item.recommend_price) - (this.keyPrice2 / 100) * Number(item.recommend_price)
        } else if (this.keyPriceRadio === '3') {
          selfPrice = this.keyPrice3
        } else if (this.keyPriceRadio === '4') {
          selfPrice = item.recommend_price
        }
        let index = this.keyWordList.findIndex((m) => m.keyword === item.keyword)
        if (index > -1) {
          this.$set(this.keyWordList[index], 'selfPrice', Number(selfPrice).toFixed(2))
        }
        console.log(this.keyWordList)
      })
      this.keyPriceVisible = false
    },
    //保存匹配类型
    setKeyType() {
      this.multipleSelectionKey.forEach((item) => {
        let index = this.keyWordList.findIndex((m) => m.keyword === item.keyword)
        if (index > -1) {
          this.$set(this.keyWordList[index], 'algorithm', this.keyType)
        }
      })
      this.keyTypeVisible = false
    },
    handleChangeKeyType() {
      console.log('handleKeyword', this.handleKeyword)
      if (this.handleKeyword) {
        this.getKeyWordList()
      }
    },
    async getKeyWordList() {
      let params = {
        itemid: this.createChooseGoods[0].itemid,
        keyword: '',
        count: 30,
        placement: 0,
        mallId: this.selectGoods[0].platform_mall_id,
      }
      this.keyListLoading = true
      let res = await this.$shopeemanService.getAdventKeyWordList(this.country, params)
      this.keyListLoading = false
      if (res.code === 200) {
        res.data.forEach((item) => {
          item['selfPrice'] = Number(item.recommend_price).toFixed(2)
        })
        this.keyWordList = res.data
      } else if (res.code === 403) {
        return this.$message.error('获取广告关键字失败，店铺未登录')
      } else {
        return this.$message.error('获取广告关键字失败!')
      }
    },
    //选择商品
    changeGoodsItem(val) {
      this.selectGoods = val.goodsList
      this.goodsItemSelectorVisible = false
      if (this.adventType === 'targeting') {
        this.dealWithTargetGoods(val.goodsList)
      } else {
        if (this.createType == 'single') {
          this.createAdventVisible = true
          this.createChooseGoods = val.goodsList.length ? [val.goodsList[0]] : []
          this.createChooseGoods.forEach((item) => {
            item.image = item.images.split(',')[0]
          })
          //获取广告关键字
          // this.getKeyWordList()
          console.log(this.createChooseGoods, 'this.createChooseGoods')
        } else if (this.createType == 'batch') {
          this.createChooseGoods = this.createChooseGoods.concat(val.goodsList)
          this.createChooseGoods.forEach((item) => {
            item.image = item.images.split(',')[0]
          })
        }
      }
    },
    //创建单个商品关键字广告
    async createSingleKeyword() {
      if (!this.selectMallList.length) {
        return this.$message.warning('请选择店铺！')
      }
      if (this.selectMallList.length !== 1) {
        return this.$alert('创建单个商品广告活动只支持单个店铺创建，请重新选择！', '提示', {
          confirmButtonText: '确定',
        })
      }
      this.createType = 'single'
      this.goodsItemSelectorVisible = true
    },
    //导出数据
    async exportData() {
      if (!this.tableData.length) {
        return this.$message.warning('没有可导出的数据！')
      }
      let num = 1
      let str = `<tr>
            <td>编号</td>
            <td>店铺</td>
            <td>商品图片</td>
            <td>商品ID</td>
            <td>商品名称</td>
            <td>活动类型</td>
            <td>活动日期</td>
            <td>预算</td>
            <td>浏览数</td>
            <td>点击次数</td>
            <td>点击率（%）</td>
            <td>订单数</td>
            <td>商品已出售</td>
            <td>销售金额</td>
            <td>花费</td>
            <td>投资产出比</td>
            <td>成本收入对比（%）</td>
            </tr>`
      this.tableData.forEach((item) => {
        str += `<tr><td>${num++}</td>
        <td>${item.mallInfo ? `${item.mallInfo.country}-${item.mallInfo.mall_alias_name || item.mallInfo.platform_mall_name}` : '' + '\t'}</td>
        <td>${item.image ? this.$filters.imageRender(item.image) : '' + '\t'}</td>
        <td>${item.product ? item.product.itemid : '' + '\t'}</td>
        <td>${item.product ? item.product.name : '' + '\t'}</td>
        <td>${item.campaign ? this.activeState[item.campaign.state] : '' + '\t'}</td>
        <td>${
          item.campaign.start_time
            ? `${$dayjs(item.campaign.start_time * 1000).format('YYYY/MM/DD HH:mm:ss')} - ${item.campaign.end_time == 0 ? '' : $dayjs(item.campaign.end_time * 1000).format('YYYY/MM/DD HH:mm:ss')}`
            : '' + '\t'
        }</td>
        <td>${this.dealWithQuota(item) + '\t'}</td>
        <td>${item.report ? item.report.impression.value : '' + '\t'}</td>
        <td>${item.report ? item.report.click.value : '' + '\t'}</td>
        <td>${Number(item.report.impression.value) == 0 ? 0 : Math.round((Number(item.report.click.value) / Number(item.report.impression.value)) * 100).toFixed(2) + '\t'}</td>
        <td>${item.report ? item.report.order_amount.value : '' + '\t'}</td>
        <td>${item.report ? item.report.order_amount.value : '' + '\t'}</td>
        <td>${item.report ? item.report.order_gmv.value : '' + '\t'}</td>
        <td>${item.report ? item.report.cost.value : '' + '\t'}</td>
        <td>${Math.round(item.report.gmv_expense_ratio.value).toFixed(2) + '\t'}</td>
        <td>${Math.round(row.report.cir.value * 100).toFixed(2) + '\t'}</td>
        </tr>
        `
      })
      exportExcelDataCommon('商品广告信息', str)
    },
    //获取用户余额
    async getMallBalance(mall) {
      let params = {
        need_create: 0,
        mallId: mall.platform_mall_id,
      }
      let res = await this.$shopeemanService.getMallBalance(mall.country, params)
      console.log(res, 'res')
      if (res.code === 200) {
        this.$refs.Logs.writeLog(`店铺【${mall.mall_alias_name || mall.platform_mall_name}】获取余额成功，余额【${res.data.balance}】`, true)
        return res.data.balance
      } else if (res.code === 403) {
        this.$refs.Logs.writeLog(`店铺【${mall.mall_alias_name || mall.platform_mall_name}】获取余额失败，店铺未登录`, false)
        return 0
      } else {
        this.$refs.Logs.writeLog(`店铺【${mall.mall_alias_name || mall.platform_mall_name}】获取余额失败，${res.data}`, false)
        return 0
      }
    },
    //图表数据
    async getAdventAnalysis(mall, balance) {
      let startTime = Math.round(new Date(this.statisticalTime[0]).getTime() / 1000)
      let endTime = Math.round(new Date(this.statisticalTime[1]).getTime() / 1000)
      let params = {
        start_time: startTime,
        end_time: endTime,
        agg_interval: 4,
        placement_list: [1, 2, 5],
        mallId: mall.platform_mall_id,
      }
      try {
        let res = await this.$shopeemanService.getAdventAnalysis(mall.country, params)
        if (res.code === 200) {
          let totalObj = {
            mallId: mall.platform_mall_id,
            mallName: mall.mall_alias_name || mall.platform_mall_name,
            country: mall.country,
            balance: balance, //余额
            impression: 0, //浏览量
            click: 0, //点击次数
            order: 0, //订单数(商品已出售)
            orderGmv: 0, //销售金额
            cost: 0, //花费
          }
          res.data.forEach((item) => {
            totalObj.impression += item.impression
            totalObj.click += item.click
            totalObj.order += item.order_amount
            totalObj.orderGmv += item.order_gmv
            totalObj.cost += item.cost
          })
          this.totalData.push(totalObj)
          this.analysisData[mall.platform_mall_id] = res.data
        } else if (res.code === 403) {
          this.$refs.Logs.writeLog(`店铺【${mall.mall_alias_name || mall.platform_mall_name}】综合统计数据获取失败，店铺未登录`, false)
        } else {
          this.$refs.Logs.writeLog(`店铺【${mall.mall_alias_name || mall.platform_mall_name}】综合统计数据获取失败，${res.data}`, false)
        }
      } catch (error) {
        console.log(error)
      }
    },
    //处理预算
    dealWithQuota(row) {
      if (Number(row.campaign.daily_quota) == 0 && Number(row.campaign.total_expense) == 0) {
        return '无限制'
      } else {
        if (Number(row.campaign.daily_quota) !== 0) {
          return `日预算-${row.campaign.daily_quota}`
        } else if (Number(row.campaign.total_expense) !== 0) {
          return `总预算-${row.campaign.daily_quota}`
        }
      }
    },
    //批量获取数据
    async batchGetAdventList() {
      if (!this.selectMallList.length) {
        return this.$message.warning('请选择店铺')
      }
      this.tableData = []
      this.analysisData = {}
      this.totalData = []
      this.loading = true
      this.totalAnalysisData = {
        balance: 0, //余额
        impression: 0, //浏览量
        click: 0, //点击次数
        order: 0, //订单数(商品已出售)
        orderGmv: 0, //销售金额
        cost: 0, //花费
      }
      await batchOperation(this.selectMallList, this.getAdventList)
      this.totalData.forEach((item) => {
        this.totalAnalysisData.balance += item.balance
        this.totalAnalysisData.impression += item.impression
        this.totalAnalysisData.click += item.click
        this.totalAnalysisData.order += item.order
        this.totalAnalysisData.orderGmv += item.orderGmv
        this.totalAnalysisData.cost += item.cost
      })
      this.$refs.Logs.writeLog('查询结束！', true)
      console.log(this.totalData, this.analysisData, '11111')
      this.loading = false
    },
    //列表数据
    async getAdventList(mall, count = { count: 1 }) {
      let startTime = Math.round(new Date(this.statisticalTime[0]).getTime() / 1000)
      let endTime = Math.round(new Date(this.statisticalTime[1]).getTime() / 1000)
      let limit = 40
      let mallCount = 0
      let balance = await this.getMallBalance(mall)
      this.getAdventAnalysis(mall, balance)
      try {
        let params = {
          start_time: startTime,
          end_time: endTime,
          campaign_type: this.adventType,
          filter_content: this.activeType,
          sort_key: 'mtime',
          sort_direction: 1,
          search_content: '',
          offset: 0,
          limit: limit,
          mallId: mall.platform_mall_id,
        }
        let res = await this.$shopeemanService.getAdventList(mall.country, params)

        if (res.code === 200) {
          let array = res.data.campaign_ads_list || []
          while (array.length) {
            mallCount += array.length
            array.forEach((item) => {
              item.mallInfo = mall
              item.image = item.product.images.split(',')[0]
            })
            this.tableData = this.tableData.concat(array)
            params.offset += limit
            let res = await this.$shopeemanService.getAdventList(mall.country, params)
            array = res.code === 200 ? res.data.campaign_ads_list : []
          }
          this.$refs.Logs.writeLog(`店铺【${mall.mall_alias_name || mall.platform_mall_name}】功获取到广告数量${mallCount}条`, true)
          console.log(res, 'res', this.tableData)
        } else if (res.code === 403) {
          this.$refs.Logs.writeLog(`店铺【${mall.mall_alias_name || mall.platform_mall_name}】获取广告失败，店铺未登录`, false)
        } else {
          this.$refs.Logs.writeLog(`店铺【${mall.mall_alias_name || mall.platform_mall_name}】获取广告失败，${res.data}`, false)
        }
      } catch (error) {
      } finally {
        --count.count
      }
    },
    handleSelectionChangeRelevance(val) {
      this.multipleSelectionRelevance = val
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSelectionChangeKey(val) {
      this.multipleSelectionKey = val
    },
    changeMallList(val) {
      this.selectMallList = val
      this.country = val.country
      this.setClickPrice()
    },
    setClickPrice() {
      switch (this.country) {
        case 'TH':
          this.dailyBudgetMinLimit = 20 //点击量
          this.totalBudgetMinLimit = 100 //点击量
          this.dailySingleClickPrice = 2.1 //点击量
          this.totalSingleClickPrice = 2.1 //点击量
          break
        case 'ID':
          this.dailyBudgetMinLimit = 2500 //点击量
          this.totalBudgetMinLimit = 25000 //点击量
          this.dailySingleClickPrice = 300 //点击量
          this.totalSingleClickPrice = 288 //点击量
          break
        case 'MY':
          this.dailyBudgetMinLimit = 2 //点击量
          this.totalBudgetMinLimit = 20 //点击量
          this.dailySingleClickPrice = 0.13 //点击量
          this.totalSingleClickPrice = 0.13 //点击量
          break
        case 'TW':
          this.dailyBudgetMinLimit = 20 //点击量
          this.totalBudgetMinLimit = 100 //点击量
          this.dailySingleClickPrice = 2.83 //点击量
          this.totalSingleClickPrice = 2.83 //点击量
          break
        case 'SG':
          this.dailyBudgetMinLimit = 2 //点击量
          this.totalBudgetMinLimit = 20 //点击量
          this.dailySingleClickPrice = 0.09 //点击量
          this.totalSingleClickPrice = 0.09 //点击量
          break
        case 'VN':
          this.dailyBudgetMinLimit = 5000 //点击量
          this.totalBudgetMinLimit = 5000 //点击量
          this.dailySingleClickPrice = 671 //点击量
          this.totalSingleClickPrice = 671 //点击量
          break
        case 'PH':
          this.dailyBudgetMinLimit = 20 //点击量
          this.totalBudgetMinLimit = 200 //点击量
          this.dailySingleClickPrice = 1.18 //点击量
          this.totalSingleClickPrice = 1.18 //点击量
          break
      }
    },
    closeDialog() {
      this.handleKeyword = false
      this.createChooseGoods = [] //创建弹窗选择的商品
      this.budgetSingle = '1' //每个广告的预算
      this.timeSingle = '1'
      this.budgetType = 'day' //预算类型
      this.budget = '' //预算
      this.keyType = ''
    },
    closeKeyPrice() {
      this.keyPriceRadio = '1' //关键字出价
      this.calcType = 'add'
      this.keyPrice1 = ''
      this.keyPrice2 = ''
      this.keyPrice3 = ''
    },
  },
}
</script>

<style lang="less" scoped>
.advertisement {
  padding: 10px;
  overflow: hidden;
  background: #fff;
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
.header-btn {
  margin: 10px 0;
}
.select-btn {
  margin: 0 10px 10px 10px;
  .select-item {
    margin-bottom: 10px;
  }
}
.content {
  margin-top: 20px;
}
.expand-style {
  display: flex;
  margin: 0 5px 5px 0;
  justify-content: flex-end;
  div {
    margin-left: 10px;
  }
}
.base-box {
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  padding: 10px;
  position: relative;
  // min-width: 702px;
  // height: 100%;
  .base-title {
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
  .base-item {
    .over-view {
      margin-top: 15px;
      display: flex;
      .item {
        width: 160px;
        span {
          font-size: 16px !important;
        }
      }
    }
    .select-row {
      display: flex;
      align-items: center;
      margin-top: 10px;
    }
    .item-box {
      display: flex;
      align-items: center;
      span {
        display: inline-block;
        width: 80px;
        text-align: right;
      }
    }
    .activeColor {
      color: red;
    }
    .special-row-style {
      margin-top: 20px;
      display: flex;
      align-items: center;
      font-size: 16px !important;
      .box {
        flex: 3;
        display: flex;
        align-items: center;
        .title {
          color: #000 !important;
          font-weight: 900;
          padding-right: 10px;
          margin-right: 5px;
          display: inline-block;
          border-right: 2px solid #dcdcdc;
        }
      }
    }
  }
}
.create-style {
  max-height: 600px;
  overflow-y: auto;
  .warning-top {
    margin-bottom: 10px;
    color: #a9a9a9;
  }
  .footer-btn {
    margin-top: 10px;
  }
}
.keyPrice-style {
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px 0;
    .item-item {
      display: flex;
      align-items: center;
    }
  }
}
.relevance-style {
}
</style>
