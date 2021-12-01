<!--
 * @Author: your name
 * @Date: 2021-11-20 21:08:11
 * @LastEditTime: 2021-12-01 12:08:44
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \shopeeman-new\src\views\order-manager\components\orderCenter\addBuyLink.vue
-->

<template>
  <div class="buy-link">
    <div class="link-show">
      <div class="item-box" v-for="(item, index) in platformLinkList" :key="index">
        <span>{{ item.label }}</span>
        <p>{{ item.purchase_url_all }}</p>
        <i class="el-icon-s-order" @click="copyItem(item.purchase_url_all)"></i>
      </div>
    </div>
    <div class="buy-content">
      <div class="item-box" v-for="(item, index) in rowBuyLinks" :key="index">
        <!-- <span class="mar-right spanWidth">采购类型</span>
        <el-select v-model="item.purchase_platform_id" size="mini" class="inputWidth" @change="changeSourceType($event,index)">
          <el-option :label="item.label" :value="item.value" v-for="(item, index) in goodsSourceListLink" :key="index"></el-option>
        </el-select> -->
        <span>采购地址{{ index + 1 }}</span>
        <el-input v-model="item.purchase_url" size="mini" clearable style="width: 600px" class="mar-right" />
        <el-button size="mini" type="primary" @click="openUrl(item.purchase_url)">浏览</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="
            createUrlByIdVisible = true
            indexLink = index
          "
          class="mar-right"
          >使用商品ID生成</el-button
        >
        <span>备注:</span>
        <el-input v-model="item.note" size="mini" clearable style="width: 300px" class="mar-right" />
        <el-radio v-model="item.is_default" label="1" @change="changeDefault(index)">默认</el-radio>
        <el-button size="mini" type="primary" @click="deleteLink(index)">删除</el-button>
      </div>
    </div>
    <div class="btn-box">
      <el-button type="primary" size="mini" @click="saveAddLink">保 存</el-button>
      <el-button type="primary" size="mini" @click="addBuyLink">添 加</el-button>
    </div>
    <el-dialog title="添加采购链接" :visible.sync="createUrlByIdVisible" width="500px" v-if="createUrlByIdVisible" append-to-body>
      <div>
        <div class="content-link">
          <span class="mar-right spanWidth">商品ID</span>
          <el-input v-model="goodID" size="mini" clearable style="width: 200px" class="mar-right" />
          <span class="mar-right spanWidth">采购类型</span>
          <el-select v-model="sourceType" size="mini" class="inputWidth">
            <el-option :label="item.label" :value="item.value" v-for="(item, index) in goodsSourceListLink" :key="index"></el-option>
          </el-select>
        </div>
        <div class="content-link">
          <el-button type="primary" size="mini" @click="creatLink()">确 定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {  goodsSourceListLink, platformLinkList } from './orderCenter'
export default {
  name: 'BuyLink',
  data() {
    return {
      rowBuyLinks: [], //目标行采购链接
      createUrlByIdVisible: false,
      radio: true,
      goodID: '',
      sourceType: '1',
      goodsSourceListLink: goodsSourceListLink,
      indexLink: -1,
      platformLinkList:platformLinkList
    }
  },
  props: {
    linkRow: {
      type: Object,
      default: {},
    },
  },
  mounted() {
    this.addPurchaseLink()
  },
  methods: {
    changeDefault(index){
      this.rowBuyLinks.forEach((item,i)=>{
        if(i!==index){
          item.is_default = ''
        }
      })
    },
    changeSourceType(e, index) {
      console.log(e, index)
      let res = this.platformLinkList.find((item) => {
        return item.purchase_platform_id == e
      })
      this.rowBuyLinks[index].purchase_url = res.purchase_url_all
    },
    creatLink() {
      let res = this.platformLinkList.find((item) => {
        return item.purchase_platform_id == this.sourceType
      })
      let url = res ? res.purchase_url + this.goodID : ''
      if (this.sourceType == 8 || this.sourceType == 9) {
        url = res ? res.purchase_url + this.goodID + '.html' : ''
      }
      this.rowBuyLinks[this.indexLink].purchase_url = url
      this.rowBuyLinks[this.indexLink].purchase_platform_id = res ? res.purchase_platform_id : ''
      this.createUrlByIdVisible = false
    },
    deleteLink(index) {
      this.rowBuyLinks.splice(index, 1)
    },
    // 打开外部窗口
    async openUrl(url) {
      this.$BaseUtilService.openUrl(url)
    },
    //添加采购链接
    addBuyLink() {
      let params = {
        note: '',
        purchase_url: '',
        purchase_goods_id: '',
        purchase_platform_id: '',
        is_default: '',
      }
      this.rowBuyLinks.push(params)
    },
    //保存添加采购链接
    async saveAddLink() {
      if (this.rowBuyLinks.length == 0) {
        this.$notify({
          title: '采购地址管理',
          type: 'error',
          message: `采购地址不能设置为空`,
        })
        return
      }
      this.rowBuyLinks.forEach((item, index) => {
        let execPlatform = /(yangkeduo.com)|(taobao.com)|(jingxi.com)|(jd.com)|(1688.com)|(tmall.com)|(pinduoduo.com)|(xiapi.xiapibuy.com)|(taobao.global)|(lazada.com)/g
        let execGoods = /goods_id=([0-9]*)/
        let execIDs = /id=([0-9]*)/
        let jxIDs = /sku=([0-9]*)/
        let tmGlobalIDs = /mpId=([0-8]*)/
        let jdlazada1688IDs = /(\d+)\.html/
        let shopeeIDs =  /[^\/]+(?!.*\/)/
        let platform = item.purchase_url.match(execPlatform)
        if (!item.purchase_url.length) {
          return this.$notify({
            title: '采购地址管理',
            type: 'error',
            message: `采购链接不能为空,请检查采购链接`,
          })
        }
        console.log(item.purchase_url.match(execGoods))
        if (item.purchase_url.match(execGoods)) {
          item.purchase_goods_id = item.purchase_url.match(execGoods)[1]
        } else if (item.purchase_url.match(execIDs)) {
          item.purchase_goods_id = item.purchase_url.match(execIDs)[1]
        } else if (item.purchase_url.match(jxIDs)) {
          item.purchase_goods_id = item.purchase_url.match(jxIDs)[1]
        } else if (item.purchase_url.match(tmGlobalIDs)) {
          item.purchase_goods_id = item.purchase_url.match(tmGlobalIDs)[1]
        } else if (item.purchase_url.match(jdlazada1688IDs)) {
          item.purchase_goods_id = item.purchase_url.match(jdlazada1688IDs)[1]
        } else if (item.purchase_url.match(shopeeIDs)) {
          item.purchase_goods_id = item.purchase_url.match(shopeeIDs)[0]
        } else {
          return this.$notify({
            title: '采购地址管理',
            type: 'error',
            message: `采购链接错误,请填写正确的采购链接或参考采购链接右边的提示信息`,
          })
        }
        switch (platform[0]) {
          case 'yangkeduo.com':
            item.purchase_platform_id = '1'
            break
          case 'pinduoduo.com':
            item.purchase_platform_id = '1'
            break
          case 'taobao.com':
            item.purchase_platform_id = '2'
            break
          case 'tmall.com':
            item.purchase_platform_id = '3'
            break
          // case 'jd.com':
          //   item.purchase_platform_id = '4'
          //   break
          case 'jingxi.com':
            item.purchase_platform_id = '10'
            break
          case '1688.com':
            item.purchase_platform_id = '8'
            break
          case 'lazada.com':
            item.purchase_platform_id = '9'
            break
          case 'xiapi.xiapibuy.com':
            item.purchase_platform_id = '11'
            break
          case 'taobao.global':
            item.purchase_platform_id = '13'
            break
          default:
            item.purchase_platform_id = '0'
            break
        }
      })
      console.log(this.rowBuyLinks)
      let params = {
        goods_id: this.linkRow.goods_info.goods_id,
        purchase_list: this.rowBuyLinks,
      }
      let res = await this.$api.savePurchase(params)
      if(res.data.code === 200){
          this.$message.success(`保存成功!`)
          this.$emit('close')
      }else{
          this.$message.error(`保存失败${res.data.message}`)
      }
      console.log(res, 'res', params)
    },
    async addPurchaseLink() {
      let params = {
        goodsIdLists: this.linkRow.goods_info.goods_id,
      }
      let res = await this.$api.getPurchaseLists(params)
      if (res.data.code === 200) {
        let params = {
          note: '',
          purchase_url: '',
          purchase_platform_id: '',
          purchase_goods_id: '',
          is_default: '',
        }
        if (res.data.data[0].purchase_detail.length > 0) {
          this.rowBuyLinks = res.data.data[0].purchase_detail
        } else {
          this.rowBuyLinks = [params]
        }
      }
      console.log(this.rowBuyLinks, 'rowBuyLinks')
      this.addBuyLinkVisible = true
    },
    //点击复制
    copyItem(attr) {
      let target = document.createElement('div')
      target.id = 'tempTarget'
      target.style.opacity = '0'
      target.innerText = attr
      document.body.appendChild(target)
      try {
        let range = document.createRange()
        range.selectNode(target)
        window.getSelection().removeAllRanges()
        window.getSelection().addRange(range)
        document.execCommand('copy')
        window.getSelection().removeAllRanges()
        this.$message.success('复制成功')
      } catch (e) {
        //console.log('复制失败')
      }
      target.parentElement.removeChild(target)
    },
  },
}
</script>

<style lang="less" scoped>
.mar-right {
  margin-right: 10px;
}
.spanWidth {
  display: inline-block;
  width: 80px;
}
.buy-link {
  .link-show {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .buy-content {
    height: 300px;
    overflow: auto;
  }
  .item-box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    span {
      display: inline-block;
      width: 100px;
      text-align: right;
      margin-right: 10px;
    }
    i {
      font-size: 18px !important;
      color: red;
      margin-left: 10px;
      cursor: pointer;
    }
  }
  .btn-box {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.content-link {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}
</style>