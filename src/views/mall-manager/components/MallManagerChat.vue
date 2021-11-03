<template>
  <el-row class="contaniner">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="自动回复" name="autoReply" v-loading="autoReplyLoad">
        <el-row class="header">
          <el-col class="header-top">
            <storeChoose :source="'autoReply'" @changeMallList="changeMallList"
                         style="margin-bottom: 10px;"></storeChoose>
            <el-col :span="24" class="header-two-top">
              <el-button type="primary" size="mini"
                         @click="autoReplyVisible=true;autoReplyTitle='批量设置自动回复内容'">
                批量设置预设自动回复
              </el-button>
              <el-button type="primary" size="mini" @click="allSetAutoReply(1,'',1)">批量开启预设自动回复</el-button>
              <el-button type="" size="mini" @click="allSetAutoReply(0,'',1)">批量关闭预设自动回复</el-button>
              <el-button type="primary" size="mini" @click="autoReplyVisible=true;autoReplyTitle='批量设置离线回复内容'">
                批量设置离线自动回复
              </el-button>
              <el-button type="primary" size="mini" @click="allSetAutoReply(1)">批量开启离线自动回复</el-button>
              <el-button type="" size="mini" @click="allSetAutoReply(0)">批量关闭离线自动回复</el-button>
              <el-button type="primary" size="mini" @click="searchAutoReplyTable">搜索</el-button>
              <el-checkbox v-model="autoReplyShowConsole" size="mini" style="margin-left: 5px;">隐藏日志</el-checkbox>
            </el-col>
          </el-col>
        </el-row>
        <el-row class="article">
          <el-col :span="isShowLog && 20 || 24">
            <u-table ref="tableAutoReply"
                     :height="height"
                     :data="tableDataAutoReply"
                     use-virtual
                     :data-changes-scroll-top="false"
                     :row-height="rowHeight"
                     :border="false"
                     @selection-change="handleSelectionChange1"
                     @table-body-scroll="tableScroll">
              <u-table-column align="left" type="index" label="序列号" width="80">
                <template slot-scope="scope">
                  {{ scope.$index + 1 }}
                </template>
              </u-table-column>
              <u-table-column align="left" label="店铺名称" width="150">
                <template slot-scope="scope">
                  {{ scope.row.mall_alias_name || scope.row.platform_mall_name }}
                </template>
              </u-table-column>
              <u-table-column align="left" label="预设自动回复">
                <template slot-scope="scope">
                  <div class="reply_setting">
                    <el-switch
                        v-model="scope.row.auto_reply_status"
                        @click.native.stop="setAutoReply(scope.row)"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
                    <div v-if="scope.row.auto_reply_status && scope.row.auto_reply_content" class="reply_content">
                      {{scope.row.auto_reply_content}}
                    </div>
                  </div>
                </template>
              </u-table-column>
              <u-table-column align="left" label="离线自动回复">
                <template slot-scope="scope">
                  <div class="reply_setting">
                    <el-switch
                        v-model="scope.row.status"
                        @click.native.stop="setOfflineReply(scope.row)"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
                    <div v-if="scope.row.status && scope.row.content" class="reply_content">
                      {{scope.row.content}}
                    </div>
                  </div>
                </template>
              </u-table-column>
            </u-table>
          </el-col>
          <el-col v-if="isShowLog" :span="4">
            <div class="log-show" :style="`height:${height}px`"></div>
          </el-col>
        </el-row>
        <Logs ref="autoReplyLogs" clear v-model="autoReplyShowConsole"/>
      </el-tab-pane>
      <el-tab-pane label="常见问题助理" name="FAQAssistant" v-loading="FAQAssistantLoad">
        <el-row class="header">
          <el-col class="header-top">
            <storeChoose :source="'FAQAssistant'" @changeMallList="changeMallList"
                         style="margin-bottom: 10px"></storeChoose>
            <el-col :span="24" class="header-two-top">
              <el-button type="primary" size="mini" @click="allFaqsShopSettings(1,1)">批量开启</el-button>
              <el-button type="" size="mini" @click="allFaqsShopSettings(0,1)">批量关闭</el-button>
              <el-button type="primary" size="mini" @click="updateFaqsShop('批量添加常见问题')">
                批量添加常见问题
              </el-button>
              <el-button type="" size="mini" @click="allFaqsShopSettings()">批量删除常见问题</el-button>
              <el-button type="primary" size="mini" @click="scFaqsTable">搜索</el-button>
              <el-checkbox v-model="FAQAssistantShowConsole" size="mini" style="margin-left: 5px;">隐藏日志</el-checkbox>
            </el-col>
          </el-col>
        </el-row>
        <el-row class="article">
          <el-col :span="isShowLog && 20 || 24">
            <u-table ref="FAQAssistant"
                     :height="height"
                     use-virtual
                     :data-changes-scroll-top="false"
                     :row-height="rowHeight"
                     :data="tableDataFAQAssistant"
                     :border="false"
                     @selection-change="handleSelectionChange2"
                     @table-body-scroll="tableScroll">
              <u-table-column align="left" type="selection" width="50"/>
              <u-table-column align="left" type="index" label="序列号" width="80"/>
              <u-table-column align="left" label="店铺名称" width="150">
                <template slot-scope="scope">
                  {{ scope.row.mall_alias_name || scope.row.platform_mall_name }}
                </template>
              </u-table-column>
              <u-table-column align="left" label="分组名称" width="150">
                <template slot-scope="scope">
                  {{scope.row.group_name}}
                </template>
              </u-table-column>
              <u-table-column align="left" label="问候语" width="">
                <template slot-scope="scope">
                  {{scope.row.greeting_content}}
                </template>
              </u-table-column>
              <u-table-column align="left" label="常见问题助理" width="150">
                <template slot-scope="scope">
                  <el-switch
                      v-model="scope.row.faq_status"
                      @click.native.stop="setFaqsShopSettings(scope.row)"
                      active-color="#13ce66"
                      inactive-color="#ff4949">
                  </el-switch>
                </template>
              </u-table-column>
              <u-table-column align="left" label="操作" width="180">
                <template slot-scope="scope">
                  <el-button type="primary" @click="updateFaqsShop('编辑常见问题',scope.row)" size="mini">编辑
                  </el-button>
                  <el-button size="mini" @click="deleteFaqsShopSettings(scope.row)">删除</el-button>
                </template>
              </u-table-column>
            </u-table>
          </el-col>
          <el-col v-if="isShowLog" :span="4">
            <div class="log-show" :style="`height:${height}px`"></div>
          </el-col>
        </el-row>
        <Logs ref="FAQAssistantLogs" clear v-model="FAQAssistantShowConsole"/>
      </el-tab-pane>
      <el-tab-pane label="讯息快捷" name="messageQuickly" v-loading="messageQuicklyLoad">
        <el-row class="header">
          <el-col class="header-top">
            <storeChoose :source="'messageQuickly'" @changeMallList="changeMallList"
                         style="margin-bottom: 10px"></storeChoose>
            <el-col :span="24" class="header-two-top">
              <el-button type="primary" size="mini" @click="allSwitch_DeleteMessageShortcutsGroups(1,1)">批量开启
              </el-button>
              <el-button type="" size="mini" @click="allSwitch_DeleteMessageShortcutsGroups(0,1)">批量关闭</el-button>
              <el-button type="primary" size="mini" @click="addMessageQuickly()">批量添加</el-button>
              <el-button type="" size="mini" @click="allSwitch_DeleteMessageShortcutsGroups()">批量删除</el-button>
              <el-button type="primary" size="mini" @click="messageShortcutsGroupsTable">搜索</el-button>
              <el-checkbox v-model="messageQuicklyShowConsole" size="mini" style="margin-left: 5px;">隐藏日志</el-checkbox>
            </el-col>
          </el-col>
        </el-row>
        <el-row class="article">
          <el-col :span="isShowLog && 20 || 24">
            <u-table ref="tableMessageQuickly"
                     :height="height"
                     use-virtual
                     :data="tableDataMessageQuickly"
                     :data-changes-scroll-top="false"
                     :row-height="rowHeight"
                     :border="false"
                     @selection-change="handleSelectionChange3"
                     @table-body-scroll="tableScroll">
              <u-table-column align="left" type="selection" width="50"/>
              <u-table-column align="left" type="index" label="序列号" width="80"/>
              <u-table-column align="left" label="店铺名称" width="150">
                <template slot-scope="scope">
                  {{ scope.row.mall_alias_name || scope.row.platform_mall_name }}
                </template>
              </u-table-column>
              <u-table-column align="left" label="分组名称" width="150">
                <template slot-scope="scope">
                  {{ scope.row.name }}
                </template>
              </u-table-column>
              <u-table-column align="left" label="分组状态" width="100">
                <template slot-scope="scope">
                  <el-switch
                      v-model="scope.row.state"
                      @click.native.stop="switchMessageShortcutsGroups(scope.row)"
                      active-color="#13ce66"
                      inactive-color="#ff4949">
                  </el-switch>
                </template>
              </u-table-column>
              <u-table-column align="left" label="讯息内容">
                <template slot-scope="scope">
                  <div class="message_content">
                    <p v-for="item in scope.row.message_shortcuts" :key="item.id" class="contentP">{{item.content}}</p>
                  </div>
                </template>
              </u-table-column>
              <u-table-column align="left" label="操作" width="180">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="updateMessageQuickly(scope.row)">编辑</el-button>
                  <el-button size="mini" @click="deleteMessageShortcutsGroups(scope.row)">删除</el-button>
                </template>
              </u-table-column>
            </u-table>
          </el-col>
          <el-col v-if="isShowLog" :span="4">
            <div class="log-show" :style="`height:${height}px`"></div>
          </el-col>
        </el-row>
        <Logs ref="messageQuicklyLogs" clear v-model="messageQuicklyShowConsole"/>
      </el-tab-pane>
    </el-tabs>
    <div class="autoReply_dialog">
      <el-dialog :title="autoReplyTitle" :visible.sync="autoReplyVisible" :close-on-click-modal="false" width="40%">
        <div>
          <el-input size="mini" type="textarea" :rows="12"
                    placeholder="请输入内容" resize="none"
                    v-model="autoReplyText" style="margin-bottom: 10px;">
          </el-input>
          <div style="display: flex;justify-content: flex-end">
            <el-button type="primary" size="mini" @click="allSetAutoReply(-1,autoReplyText)">确定</el-button>
            <el-button size="mini" @click="autoReplyVisible = false">取消</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
    <div class="FAQAssistant_dialog">
      <el-dialog :title="FAQAssistantTitle" :visible.sync="FAQAssistantVisible" :close-on-click-modal="false"
                 width="40%">
        <div class="FAQAssistant_box" v-if="FAQAssistantAction">
          <div class="FAQAssistant_title">
            <div style="width: 110px;padding-right: 10px;text-align: right">分组</div>
            <el-input placeholder="请输入分组（长度<80）" style="flex: 1" size="mini"
                      v-model="FAQAssistantAction.group_name"></el-input>
          </div>
          <div class="FAQAssistant_title">
            <div style="width: 110px;padding-right: 10px;text-align: right">问候语</div>
            <el-input placeholder="请输入问候语（长度<80）" style="flex: 1" size="mini"
                      v-model="FAQAssistantAction.greeting_content"></el-input>
          </div>
          <div class="FAQAssistant_content">
            <div class="FAQAssistant_item" v-for="(item,index) in FAQAssistantAction.categorys" :key="index">
              <div class="item_title">
                <div style="width: 110px;padding-right: 10px;text-align: right">常见问题类型</div>
                <el-input placeholder="请输入问题类型（长度<80）" style="flex: 1" size="mini" v-model="item.title"></el-input>
              </div>
              <div class="item_content">
                <div style="width: 110px;padding-right: 10px;text-align: right">内容1</div>
                <div class="content_content">
                  <el-input placeholder="请输入具体问题（长度<80）" size="mini" v-model="item.questions[0].question"></el-input>
                  <el-input size="mini" type="textarea" :rows="3"
                            placeholder="请输入具体答案（长度<80）" resize="none"
                            v-model="item.questions[0].answer" style="margin: 10px 0;">
                  </el-input>
                </div>
              </div>
              <div class="item_content">
                <div style="width: 110px;padding-right: 10px;text-align: right">内容2</div>
                <div class="content_content">
                  <el-input placeholder="请输入具体问题（长度<80）" size="mini" v-model="item.questions[1].question"></el-input>
                  <el-input size="mini" type="textarea" :rows="3"
                            placeholder="请输入具体答案（长度<80）" resize="none"
                            v-model="item.questions[1].answer" style="margin: 10px 0;">
                  </el-input>
                </div>
              </div>
              <div class="item_content">
                <div style="width: 110px;padding-right: 10px;text-align: right">内容3</div>
                <div class="content_content">
                  <el-input placeholder="请输入具体问题（长度<80）" size="mini" v-model="item.questions[2].question"></el-input>
                  <el-input size="mini" type="textarea" :rows="3"
                            placeholder="请输入具体答案（长度<80）" resize="none"
                            v-model="item.questions[2].answer" style="margin: 10px 0;">
                  </el-input>
                </div>
              </div>
            </div>
          </div>
          <div style="display: flex;justify-content: center;padding-top: 10px;">
            <el-button size="mini" @click="updateCategorys(1)" type="primary">新增类型</el-button>
            <el-button size="mini" :disabled="FAQAssistantAction.categorys.length < 2"
                       @click="updateCategorys()" style="margin-left: 15px;">删除
            </el-button>
          </div>
          <div style="display: flex;justify-content: flex-end">
            <el-button type="primary" size="mini" @click="confirmFaqsShopSettings">确定</el-button>
            <el-button size="mini" @click="FAQAssistantVisible = false">取消</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
    <div class="messageQuickly_dialog">
      <el-dialog :title="messageQuicklyTitle" :visible.sync="messageQuicklyVisible" :close-on-click-modal="false"
                 width="60%">
        <div class="messageQuickly_box">
          <div class="messageQuickly_title">
            <div style="width: 80px;">群组名称</div>
            <el-input size="mini" v-model="messageQuicklyAction && messageQuicklyAction.name"></el-input>
          </div>
          <div class="messageQuickly_content">
            <div class="content" v-for="(item,index) in messageQuicklyAction && messageQuicklyAction.message_shortcuts"
                 :key="index">
              <div style="width: 60px;">讯息{{index + 1}}</div>
              <el-input size="mini" v-model="item.content"></el-input>
            </div>
          </div>
          <div class="messageQuickly_add">
            <el-button type="primary" size="mini" @click="addMessageQuicklyList">添 加 讯 息</el-button>
          </div>
          <div class="messageQuickly_footer">
            <el-button type="primary" size="mini" @click="messageShortcutsGroups_dialog">确定</el-button>
            <el-button size="mini" @click="messageQuicklyVisible = false">取消</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </el-row>
</template>

<script>
  import storeChoose from '../../../components/store-choose'
  import { batchOperation } from '../../../util/util'

  export default {
    components: { storeChoose },
    data() {
      return {
        activeName: 'autoReply',
        source: 'autoReply',
        isShowLog: false,
        height: 300,
        rowHeight: 50,
        SiteList: {
          autoReply: [],
          FAQAssistant: [],
          messageQuickly: []
        },
        autoReplyVisible: false,
        autoReplyTitle: '',
        autoReplyText: '',
        tableDataAutoReply: [],
        selectDataAutoReply: [],
        FAQAssistantVisible: false,
        FAQAssistantTitle: '',
        FAQAssistantAction: null,
        tableDataFAQAssistant: [],
        selectDataFAQAssistant: [],
        messageQuicklyVisible: false,
        messageQuicklyTitle: '',
        messageQuicklyAction: null,
        tableDataMessageQuickly: [],
        selectDataMessageQuickly: [],
        autoReplyShowConsole: true,
        FAQAssistantShowConsole: true,
        messageQuicklyShowConsole: true,
        autoReplyLoad: 0,
        FAQAssistantLoad: 0,
        messageQuicklyLoad: 0
      }
    },
    watch: {},
    mounted() {

    },
    created() {
      this.resizeHeight()
      window.addEventListener('resize', (event) => {
        this.resizeHeight()
      })
    },
    methods: {
      changeMallList(data) {
        if (data.mallList.length > 0) {
          this.source = data.source
          this.SiteList[data.source] = data.mallList
        }
      },
      async searchAutoReplyTable() {
        this.tableDataAutoReply = []
        let mallList = this.SiteList.autoReply || []
        this.$refs.autoReplyLogs.writeLog('开始查询', true)
        mallList.forEach(async item => {
          let temp = {
            country: item.country,
            platform_mall_id: item.platform_mall_id,
            platform_mall_name: item.platform_mall_name,
            mall_alias_name: item.mall_alias_name
          }
          this.$refs.autoReplyLogs.writeLog(`正在获取店铺【${item.mall_alias_name || item.platform_mall_name}】的预设回复`, true)
          let resOfflineJson = await this.$shopeemanService.scOfflineReply(item.country, {
            shop_id: item.platform_mall_id,
            timezone: 8
          })
          let resChatJson = await this.$shopeemanService.scChatSetting(item.country, { shop_id: item.platform_mall_id })
          try {
            let resOffline = JSON.parse(resOfflineJson)
            let dataOffline = JSON.parse(resOffline.data)
            let resChat = JSON.parse(resChatJson)
            let dataChat = JSON.parse(resChat.data)
            console.log(resOffline, resChat)
            if (resOffline.status === 200) {
              this.$refs.autoReplyLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】的预设离线回复获取成功`, true)
              temp = Object.assign(temp, dataOffline, { status: dataOffline.status === 'enabled' })
            } else if (resOffline.status === 403) {
              this.$refs.autoReplyLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】的未登录`, false)
              return
            } else {
              this.$refs.autoReplyLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】的预设离线回复获取失败`, false)
            }
            if (resChat.status === 200) {
              this.$refs.autoReplyLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】的预设自动回复获取成功`, true)
              temp = Object.assign(temp, dataChat, { auto_reply_status: dataChat.auto_reply_status === 'enabled' })
            } else {
              this.$refs.autoReplyLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】的预设自动回复获取失败`, false)
            }
            let index = this.tableDataAutoReply.findIndex(i => i.platform_mall_id === temp.platform_mall_id)
            if (index > -1) {
              this.tableDataAutoReply.splice(index, 1, temp)
            } else {
              this.tableDataAutoReply.push(temp)
            }
          } catch (e) {
            this.$refs.autoReplyLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】的预设回复获取失败`, false)
          }
        })
      },
      async setAutoReply(item, auto_reply_content = '', type = -1) {
        if (!this.autoReplyLoad) {
          this.autoReplyLoad = 1
        }
        let auto_reply_status = item.auto_reply_status
        if (type > -1) {
          auto_reply_status = type && true || false
        }
        this.$refs.autoReplyLogs.writeLog(`正在设置店铺【${item.mall_alias_name || item.platform_mall_name}】的预设自动回复`, true)
        let setChatSettingJson = await this.$shopeemanService.setChatSetting(item.country, {
          shop_id: parseInt(item.platform_mall_id),
          auto_reply_status: auto_reply_status && 'enabled' || 'disabled',
          auto_reply_content: auto_reply_content || item.auto_reply_content
        })
        let setChatSettingRes = JSON.parse(setChatSettingJson)
        console.log('setChatSettingRes', setChatSettingRes)
        if (setChatSettingRes.state >= 200 && setChatSettingRes.state < 300) {
          this.$refs.autoReplyLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】的预设自动回复设置成功`, true)
          let data = JSON.parse(setChatSettingRes.data)
          let temp = Object.assign(item, data, { auto_reply_status: data.auto_reply_status === 'enabled' })
          let index = this.tableDataAutoReply.findIndex(i => i.platform_mall_id == item.platform_mall_id)
          this.tableDataAutoReply.splice(index, 1, temp)
        } else if (setChatSettingRes.status === 403) {
          this.$refs.autoReplyLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】的未登录`, false)
          return
        } else {
          this.$refs.autoReplyLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】的预设自动回复设置失败`, false)
        }
        if (!--this.autoReplyLoad) {
          this.searchAutoReplyTable()
        }
      },
      async setOfflineReply(item, content = '', type = -1) {
        if (!this.autoReplyLoad) {
          this.autoReplyLoad = 1
        }
        let status = item.status
        if (type > -1) {
          status = type && true || false
        }
        this.$refs.autoReplyLogs.writeLog(`正在设置店铺【${item.mall_alias_name || item.platform_mall_name}】的预设离线回复`, true)
        let param = {
          shop_id: parseInt(item.platform_mall_id),
          status: status && 'enabled' || 'disabled',
          content: content || item.content,
          timezone: 8,
          working_days: item.working_days
        }
        param = JSON.stringify(param).replace(/\s*(\d+):\s*(\d+):00/g, '$1:$2')
        let setOfflineReplyJson = await this.$shopeemanService.setOfflineReply(item.country, JSON.parse(param), { headers: { referer: '/portal/assistant/basic/autoReply' } })
        let setOfflineReplyRes = JSON.parse(setOfflineReplyJson)
        console.log(setOfflineReplyRes)
        if (setOfflineReplyRes.state >= 200 && setOfflineReplyRes.state < 300) {
          this.$refs.autoReplyLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】的预设离线回复设置成功`, true)
          let data = JSON.parse(setOfflineReplyRes.data)
          let temp = Object.assign(item, data, { status: data.status === 'enabled' })
          let index = this.tableDataAutoReply.findIndex(i => i.platform_mall_id == item.platform_mall_id)
          this.tableDataAutoReply.splice(index, 1, temp)
          console.log(this.tableDataAutoReply)
        } else if (setOfflineReplyRes.status === 403) {
          this.$refs.autoReplyLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】的未登录`, false)
          return
        } else {
          this.$refs.autoReplyLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】的预设离线回复设置失败`, false)
        }
        if (!--this.autoReplyLoad) {
          this.searchAutoReplyTable()
        }
      },
      allSetAutoReply(type, content, model) {
        if (this.autoReplyVisible) {
          this.autoReplyVisible = false
          model = this.autoReplyTitle === '批量设置自动回复内容'
        }
        this.autoReplyLoad = this.tableDataAutoReply.length
        this.tableDataAutoReply.forEach(item => {
          model && this.setAutoReply(item, content, type)
          !model && this.setOfflineReply(item, content, type)
        })
        console.log('完成')
      },

      async scFaqsTable() {
        this.tableDataFAQAssistant = []
        let mallList = this.SiteList.FAQAssistant || []
        this.$refs.FAQAssistantLogs.writeLog('开始查询', true)
        mallList.forEach(async item => {
          this.$refs.FAQAssistantLogs.writeLog(`正在获取店铺【${item.mall_alias_name || item.platform_mall_name}】的常见问题`, true)
          let faqsSettingJson = await this.$shopeemanService.scFaqs(item.country, {
            shop_id: item.platform_mall_id,
            group_type: 1
          })
          let temp = {
            country: item.country,
            platform_mall_id: item.platform_mall_id,
            platform_mall_name: item.platform_mall_name,
            mall_alias_name: item.mall_alias_name
          }
          let faqsSettingRes = JSON.parse(faqsSettingJson)
          if (faqsSettingRes.status >= 200 && faqsSettingRes.status < 300) {
            let faqsSettingDataJson = faqsSettingRes.data
            let faqsSettingData = JSON.parse(faqsSettingDataJson)
            this.$refs.FAQAssistantLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】的常见问题获取成功，共有${faqsSettingData.length || 0}条`, true)
            faqsSettingData.forEach(item => {
              item = Object.assign(item, temp, { faq_status: item.faq_status && true || false })
              let index = this.tableDataFAQAssistant.findIndex(i => i.faq_id === temp.faq_id)
              if (index > -1) {
                this.tableDataFAQAssistant.splice(index, 1, item)
              } else {
                this.tableDataFAQAssistant.push(item)
              }
            })
          } else if (faqsSettingRes.status === 403) {
            this.$refs.FAQAssistantLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】的未登录`, false)
            return
          } else {
            this.$refs.FAQAssistantLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】的常见问题获取失败`, false)
          }
          console.log('faqsSettingRes', faqsSettingRes)
        })
      },
      async setFaqsShopSettings(item, type = -1, data) {
        if (!this.FAQAssistantLoad) {
          this.FAQAssistantLoad = 1
        }
        this.$refs.FAQAssistantLogs.writeLog(`正在设置店铺【${item.mall_alias_name || item.platform_mall_name}】的常见问题`, true)
        let param = {
          shop_id: parseInt(item.platform_mall_id),
          faq_id: item.faq_id
        }
        if (data) {

        } else {
          let faq_status = item.faq_status && 1 || 0
          if (type > -1) {
            faq_status = type
          }
          param['faq_status'] = faq_status
        }
        let faqsShopSettingsJson = await this.$shopeemanService.faqsShopSettings(item.country, param)
        let faqsShopSettingsRes = JSON.parse(faqsShopSettingsJson)
        console.log('faqsShopSettingsRes', faqsShopSettingsRes)
        if (faqsShopSettingsRes.status >= 200 && faqsShopSettingsRes.status < 300) {
          this.$refs.FAQAssistantLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】的常见问题设置成功`, true)
        } else {
          this.$refs.FAQAssistantLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】的常见问题设置失败`, false)
        }
        if (!--this.FAQAssistantLoad) {
          this.scFaqsTable()
        }
      },
      async deleteFaqsShopSettings(item) {
        if (!this.FAQAssistantLoad) {
          this.FAQAssistantLoad = 1
        }
        this.$refs.FAQAssistantLogs.writeLog(`正在删除店铺【${item.mall_alias_name || item.platform_mall_name}】的常见问题`, true)
        let deleteFaqsShopJson = await this.$shopeemanService.deleteFaqsShopSettings(item.country, {
          shop_id: parseInt(item.platform_mall_id),
          faq_id: item.faq_id
        }, { headers: { referer: '/portal/assistant/faq','Content-Type':'application/json;charset=UTF-8' } })
        let deleteFaqsShopRes = JSON.parse(deleteFaqsShopJson)
        console.log('deleteFaqsShopRes',deleteFaqsShopRes)
        if (deleteFaqsShopRes.status >= 200 && deleteFaqsShopRes.status < 300) {
          this.$refs.FAQAssistantLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】的常见问题删除成功`, true)
        } else {
          this.$refs.FAQAssistantLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】的常见问题删除失败`, false)
        }
        if (!--this.FAQAssistantLoad) {
          this.scFaqsTable()
        }
      },
      async updateFaqsShopSettings(item, type) {
        if (!this.FAQAssistantLoad) {
          this.FAQAssistantLoad = 1
        }
        this.FAQAssistantVisible = false
        console.log('updateFaqsShopSettings', item)
        if (type) {
          this.$refs.FAQAssistantLogs.writeLog(`正在编辑店铺【${item.mall_alias_name || item.platform_mall_name}】的常见问题`, true)
          let param = {
            shop_id: parseInt(item.platform_mall_id),
            group_name: item.group_name,
            greeting_content: item.greeting_content,
            faq_id: item.faq_id,
            faq_type: item.faq_type,
            categorys: item.categorys,
            faq_status: item.faq_status && 1 || 0
          }
          let faqsShopSettingsJson = await this.$shopeemanService.faqsShopSettings(item.country, param)
          let faqsShopSettingsRes = JSON.parse(faqsShopSettingsJson)
          console.log('faqsShopSettingsRes', faqsShopSettingsRes)
          if (faqsShopSettingsRes.status >= 200 && faqsShopSettingsRes.status < 300) {
            this.$refs.FAQAssistantLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】的常见问题编辑成功`, true)
          } else {
            this.$refs.FAQAssistantLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】的常见问题编辑失败`, false)
          }
        } else {
          this.$refs.FAQAssistantLogs.writeLog(`正在添加店铺【${item.mall_alias_name || item.platform_mall_name}】的常见问题`, true)
          let param = {
            shop_id: parseInt(item.platform_mall_id),
            group_name: item.group_name,
            greeting_content: item.greeting_content,
            faq_status: item.faq_status && 1 || 0,
            faq_type: item.faq_type,
            categorys: item.categorys
          }
          let updateFaqsShopSettingsJson = await this.$shopeemanService.updateFaqsShopSettings(item.country, param)
          let updateFaqsShopSettingsRes = JSON.parse(updateFaqsShopSettingsJson)
          if (updateFaqsShopSettingsRes.status >= 200 && updateFaqsShopSettingsRes.status < 300) {
            this.$refs.FAQAssistantLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】的常见问题添加成功`, true)
          } else {
            this.$refs.FAQAssistantLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】的常见问题添加失败`, false)
          }
          console.log('updateFaqsShopSettingsRes', updateFaqsShopSettingsRes)
        }
        if (!--this.FAQAssistantLoad) {
          this.scFaqsTable()
        }
      },
      confirmFaqsShopSettings() {
        let platform_mall_id = this.FAQAssistantAction && this.FAQAssistantAction.platform_mall_id
        if (platform_mall_id) {
          this.updateFaqsShopSettings(this.FAQAssistantAction, 1)
        } else {
          this.FAQAssistantLoad = this.SiteList.FAQAssistant.length
          this.SiteList.FAQAssistant.forEach(item => {
            let param = JSON.parse(JSON.stringify(item))
            param = Object.assign(param, this.FAQAssistantAction)
            this.updateFaqsShopSettings(param)
          })
        }
      },
      updateFaqsShop(content, item) {
        this.FAQAssistantVisible = true
        this.FAQAssistantTitle = content
        if (content === '编辑常见问题') {
          let data = item
          console.log('updateFaqsShop', data)
          for (let i = 0; i < data.categorys.length; i++) {
            let question = data.categorys[i].questions || []
            question[0] = question[0] || { answer: '', is_fake: true, question: '' }
            question[1] = question[1] || { answer: '', is_fake: true, question: '' }
            question[2] = question[2] || { answer: '', is_fake: true, question: '' }
            data.categorys[i].questions = question
          }
          this.FAQAssistantAction = data
        } else {
          this.FAQAssistantAction = {
            group_name: '',
            greeting_content: '',
            faq_status: 0,
            faq_type: 1,
            categorys: [{
              is_fake: true,
              title: '',
              questions: [
                { answer: '', is_fake: true, question: '' },
                { answer: '', is_fake: true, question: '' },
                { answer: '', is_fake: true, question: '' }
              ]
            }]
          }
        }
      },
      updateCategorys(type) {
        if (type) {
          this.FAQAssistantAction.categorys.push({
            is_fake: true,
            title: '',
            questions: [
              { answer: '', is_fake: true, question: '' },
              { answer: '', is_fake: true, question: '' },
              { answer: '', is_fake: true, question: '' }
            ]
          })
        } else {
          if (this.FAQAssistantAction.categorys.length > 1) {
            this.FAQAssistantAction.categorys.splice(this.FAQAssistantAction.categorys.length - 1, 1)
          }
        }
      },
      allFaqsShopSettings(type, model) {
        this.FAQAssistantLoad = this.selectDataFAQAssistant.length
        if (this.selectDataFAQAssistant.length) {
          this.selectDataFAQAssistant.forEach(item => {
            model && this.setFaqsShopSettings(item, type)
            !model && this.deleteFaqsShopSettings(item, type)
          })
        } else {
          this.$message.error('至少选择一个常见问题')
        }
      },

      async messageShortcutsGroupsTable() {
        this.$refs.messageQuicklyLogs.writeLog('开始查询', true)
        this.tableDataMessageQuickly = []
        let mallList = this.SiteList.messageQuickly || []
        mallList.forEach(async item => {
          this.$refs.messageQuicklyLogs.writeLog(`正在获取店铺【${item.mall_alias_name || item.platform_mall_name}】的快捷讯息`, true)
          let shortcutsGroupsJson = await this.$shopeemanService.messageShortcutsGroups(item.country, {
            shop_id: item.platform_mall_id,
            group_type: 1
          })
          let temp = JSON.stringify({
            country: item.country,
            platform_mall_id: item.platform_mall_id,
            platform_mall_name: item.platform_mall_name,
            mall_alias_name: item.mall_alias_name
          })
          let shortcutsGroupsRes = JSON.parse(shortcutsGroupsJson)
          if (shortcutsGroupsRes.status >= 200 && shortcutsGroupsRes.status < 300) {
            let shortcutsGroupsDataJson = shortcutsGroupsRes.data
            let shortcutsGroupsData = JSON.parse(shortcutsGroupsDataJson)
            this.$refs.messageQuicklyLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】的快捷讯息获取成功，共${shortcutsGroupsData.length || 0}条`, true)
            shortcutsGroupsData.forEach(item => {
              let data = Object.assign(JSON.parse(temp), item, { state: item.state === 'enabled' })
              let index = this.tableDataMessageQuickly.findIndex(i => i.id === data.id)
              if (index > -1) {
                this.tableDataMessageQuickly.splice(index, 1, data)
              } else {
                this.tableDataMessageQuickly.push(data)
              }
            })
          } else if (shortcutsGroupsRes.status === 403) {
            this.$refs.messageQuicklyLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】的未登录`, false)
            return
          } else {
            this.$refs.messageQuicklyLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】的快捷讯息获取失败`, false)
          }
        })
        // this.$refs.tableAutoReply.toggleRowSelection(temp)
      },
      async switchMessageShortcutsGroups(item, type = -1, message) {
        if (!this.messageQuicklyLoad) {
          this.messageQuicklyLoad = 1
        }
        this.$refs.messageQuicklyLogs.writeLog(`正在设置店铺【${item.mall_alias_name || item.platform_mall_name}】的快捷讯息`, true)
        let param = {
          shop_id: parseInt(item.platform_mall_id),
          group_type: 1,
          id: item.id
        }
        if (message) {
          param['group_name'] = message.name
          param['message_shortcuts'] = message.message_shortcuts
        } else {
          let state = item.state
          if (type > -1) {
            state = type && true || false
          }
          param['state'] = state && 'enabled' || 'disabled'
        }
        let switchMessageShortcutsGroupsJson = await this.$shopeemanService.switchMessageShortcutsGroups(item.country,
          param, { headers: { referer: '/portal/assistant/basic/messageShortcuts' } })
        let switchMessageShortcutsGroupsRes = JSON.parse(switchMessageShortcutsGroupsJson)
        console.log(switchMessageShortcutsGroupsRes)
        if (switchMessageShortcutsGroupsRes.status >= 200 && switchMessageShortcutsGroupsRes.status < 300) {
          this.$refs.messageQuicklyLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】的快捷讯息设置成功`, true)
        } else {
          this.$refs.messageQuicklyLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】的快捷讯息设置失败`, false)
        }
        if (!--this.messageQuicklyLoad) {
          this.messageShortcutsGroupsTable()
        }
      },
      async addMessageShortcutsGroups(item) {
        if (!this.messageQuicklyLoad) {
          this.messageQuicklyLoad = 1
        }
        this.$refs.messageQuicklyLogs.writeLog(`正在添加店铺【${item.mall_alias_name || item.platform_mall_name}】的快捷讯息`, true)
        let setShortcutsGroupsJson = await this.$shopeemanService.setShortcutsGroups(item.country, {
          shop_id: parseInt(item.platform_mall_id),
          group_type: 1,
          group_name: this.messageQuicklyAction.name,
          message_shortcuts: this.messageQuicklyAction.message_shortcuts
        })// { headers: { referer: '/portal/assistant/basic/messageShortcuts' } }
        let setShortcutsGroupsRes = JSON.parse(setShortcutsGroupsJson)
        console.log('setShortcutsGroupsRes', setShortcutsGroupsRes)
        if (setShortcutsGroupsRes.status >= 200 && setShortcutsGroupsRes.status < 300) {
          this.$refs.messageQuicklyLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】的快捷讯息添加成功`, true)
        } else {
          this.$refs.messageQuicklyLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】的快捷讯息添加失败`, false)
        }
        if (!--this.messageQuicklyLoad) {
          this.messageShortcutsGroupsTable()
        }
      },
      async deleteMessageShortcutsGroups(item) {
        if (!this.messageQuicklyLoad) {
          this.messageQuicklyLoad = 1
        }
        this.$refs.messageQuicklyLogs.writeLog(`正在删除店铺【${item.mall_alias_name || item.platform_mall_name}】的快捷讯息`, true)
        let deleteMessageShortcutsGroupsJson = await this.$shopeemanService.deleteMessageShortcutsGroups(item.country, {
          shop_id: parseInt(item.platform_mall_id),
          group_type: 1,
          id: item.id
        }, { headers: { referer: '/portal/assistant/basic/messageShortcuts','Content-Type':'application/json;charset=UTF-8' } })//
        let deleteMessageShortcutsGroupsRes = JSON.parse(deleteMessageShortcutsGroupsJson)
        console.log('deleteMessageShortcutsGroupsRes',deleteMessageShortcutsGroupsRes)
        if (deleteMessageShortcutsGroupsRes.status >= 200 && deleteMessageShortcutsGroupsRes.status < 300) {
          this.$refs.messageQuicklyLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】的快捷讯息删除成功`, true)
        } else {
          this.$refs.messageQuicklyLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】的快捷讯息删除失败`, false)
        }
        if (!--this.messageQuicklyLoad) {
          this.messageShortcutsGroupsTable()
        }
      },
      allSwitch_DeleteMessageShortcutsGroups(type, model) {
        if (this.selectDataMessageQuickly.length) {
          this.messageQuicklyLoad = this.selectDataMessageQuickly.length
          this.selectDataMessageQuickly.forEach(item => {
            model && this.switchMessageShortcutsGroups(item, type)
            !model && this.deleteMessageShortcutsGroups(item, type)
          })
        } else {
          this.$message.error('至少选择一条讯息')
        }
      },
      addMessageQuickly() {
        this.messageQuicklyAction = {
          name: '',
          message_shortcuts: [{ content: '' }]
        }
        this.messageQuicklyTitle = '批量添加快捷讯息'
        this.messageQuicklyVisible = true
      },
      addMessageQuicklyList() {
        if (this.messageQuicklyAction.message_shortcuts.length < 20) {
          this.messageQuicklyAction.message_shortcuts.push({ content: '' })
        } else {
          this.$message.error('最多可添加20条讯息')
        }
      },
      updateMessageQuickly(data) {
        this.messageQuicklyAction = JSON.parse(JSON.stringify(data))
        this.messageQuicklyTitle = '编辑快捷讯息'
        this.messageQuicklyVisible = true
      },
      messageShortcutsGroups_dialog() {
        this.messageQuicklyVisible = false
        let type = this.messageQuicklyTitle === '编辑快捷讯息'
        if (type) {
          this.switchMessageShortcutsGroups(this.messageQuicklyAction, 0, this.messageQuicklyAction)
        } else {
          this.messageQuicklyLoad = this.SiteList[this.activeName].length
          this.SiteList[this.activeName].forEach(item => {
            this.addMessageShortcutsGroups(item)
          })
        }
      },

      handleClick() {

      },
      handleSelectionChange1(val) {
        this.selectDataAutoReply = val
      },
      handleSelectionChange2(val) {
        this.selectDataFAQAssistant = val
      },
      handleSelectionChange3(val) {
        this.selectDataMessageQuickly = val
      },
      resizeHeight() {
        let offerHeight = window.innerHeight
        this.height = offerHeight - 190
      },
      tableScroll() {

      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../module-less/mall-manager-less/mall-chat.less';
</style>

<style lang="less">
  .autoReply_dialog {
    .el-dialog__body {
      padding: 10px 20px;
      max-height: 70vh;
      overflow: auto;
    }
  }

  .FAQAssistant_dialog {
    .el-dialog__body {
      padding: 10px 20px;

      .FAQAssistant_box {
        .FAQAssistant_title, .item_title {
          display: flex;
          margin-bottom: 10px;
          margin-right: 35px;
        }

        .FAQAssistant_content {
          overflow: auto;
          max-height: 45vh;

          .FAQAssistant_item {
            margin-bottom: 10px;
          }
        }

        .item_content {
          display: flex;
          margin-right: 35px;

          .content_content {
            flex: 1;
          }
        }
      }
    }
  }

  .messageQuickly_dialog {
    .el-dialog__body {
      padding: 10px 20px;

      .messageQuickly_title {
        display: flex;
        align-items: center;
        margin-right: 55px;
        margin-bottom: 10px;

      }

      .messageQuickly_content {
        margin-right: 35px;
        max-height: 45vh;
        overflow: auto;

        .content {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          margin-right: 15px;
        }
      }

      .messageQuickly_add {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 5px;
        margin-bottom: 5px;
        margin-right: 35px;
      }

      .messageQuickly_footer {
        display: flex;
        justify-content: flex-end
      }
    }
  }
</style>
