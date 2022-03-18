
<template>
  <div class="buy-link">
    <div class="link-show">
      <div v-for="(item, index) in platformLinkList" :key="index" class="item-box">
        <span>{{ item.label }}</span>
        <p>{{ item.purchase_url_all }}</p>
        <i class="el-icon-s-order" @click="copyItem(item.purchase_url_all)" />
      </div>
    </div>
    <div class="buy-content">
      <div v-for="(item, index) in rowBuyLinks" :key="index" class="item-box">
        <!-- <span class="mar-right spanWidth">采购类型</span>
        <el-select v-model="item.purchase_platform_id" size="mini" class="inputWidth" @change="changeSourceType($event,index)">
          <el-option :label="item.label" :value="item.value" v-for="(item, index) in goodsSourceListLink" :key="index"></el-option>
        </el-select> -->
        <span>采购地址{{ index + 1 }}</span>
        <el-input
          v-model="item.purchase_url"
          size="mini"
          clearable
          style="width: 600px"
          class="mar-right"
          @change="
            (val) => {
              changeLink(val, index)
            }
          "
        />
        <el-button size="mini" type="primary" @click="openUrl(item.purchase_url)">浏览</el-button>
        <el-button
          size="mini"
          type="primary"
          class="mar-right"
          @click="
            createUrlByIdVisible = true
            indexLink = index
          "
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
    <el-dialog v-if="createUrlByIdVisible" title="添加采购链接" :visible.sync="createUrlByIdVisible" width="500px" append-to-body>
      <div>
        <div class="content-link">
          <span class="mar-right spanWidth">商品ID</span>
          <el-input v-model="goodID" size="mini" clearable style="width: 200px" class="mar-right" />
          <span class="mar-right spanWidth">采购类型</span>
          <el-select v-model="sourceType" size="mini" class="inputWidth">
            <el-option v-for="(item, index) in goodsSourceListLink" :key="index" :label="item.label" :value="item.value" />
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
import { goodsSourceListLink, platformLinkList, lazadaBuyLinkList, lazadaBuyLinkObj } from './orderCenter'
export default {
  name: 'BuyLink',
  props: {
    linkRow: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      rowBuyLinks: [], // 目标行采购链接
      createUrlByIdVisible: false,
      radio: true,
      goodID: '',
      sourceType: '1',
      goodsSourceListLink: goodsSourceListLink,
      indexLink: -1,
      platformLinkList: platformLinkList,
      lazadaBuyLinkObj: lazadaBuyLinkObj,
    }
  },
  mounted() {
    this.addPurchaseLink()
  },
  methods: {
    changeLink(val, index) {
      if (!val) {
        return
      }
      const execPlatform = /(lazada)|(shopee)/g
      const platform = val.match(execPlatform)
      console.log(platform, 'platform')
      if (!platform) {
        return
      }
      if (platform && platform[0] === 'lazada') {
        const lazadaReg = /(http|https):\/\/?([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}/
        const lazadaMatch = val.match(lazadaReg)
        console.log(lazadaMatch, lazadaBuyLinkList.includes(lazadaMatch[0]))
        if (lazadaMatch && lazadaMatch[0]) {
          if (!lazadaBuyLinkList.includes(lazadaMatch[0])) {
            this.rowBuyLinks[index].purchase_url = ''
            return this.$message.warning('改地址无法采购请更换！')
          }
          let preUrl = lazadaMatch[0]
          console.log(preUrl, preUrl.indexOf(this.linkRow.country.toLowerCase()), this.linkRow.country.toLowerCase(), '0000')
          if (preUrl.indexOf(this.linkRow.country.toLowerCase()) < 0) {
            this.rowBuyLinks[index].purchase_url = ''
            return this.$message.warning('请填写正确站点的采购地址！')
          }
        } else {
          this.rowBuyLinks[index].purchase_url = ''
          return this.$message.warning('改地址无法采购请更换')
        }
      }else if(platform && platform[0] === 'shopee'){
        const shopeeReg = /(http|https):\/\/?([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}/
        const shopeeMatch = val.match(shopeeReg)
        if(shopeeMatch && shopeeMatch[0]){
          let preUrl = shopeeMatch[0]
          if (preUrl.indexOf(this.linkRow.country.toLowerCase()) < 0) {
            this.rowBuyLinks[index].purchase_url = ''
            return this.$message.warning('请填写正确站点的采购地址！')
          }
        }
      }
    },
    changeDefault(index) {
      this.rowBuyLinks.forEach((item, i) => {
        if (i !== index) {
          item.is_default = ''
        }
      })
    },
    changeSourceType(e, index) {
      console.log(e, index)
      const res = this.platformLinkList.find((item) => {
        return item.purchase_platform_id == e
      })
      this.rowBuyLinks[index].purchase_url = res.purchase_url_all
    },
    creatLink() {
      console.log('linkRow', this.linkRow)
      const res = this.platformLinkList.find((item) => {
        return item.purchase_platform_id == this.sourceType
      })
      let url = res ? res.purchase_url + this.goodID : ''
      if (this.sourceType == 8) {
        url = res ? res.purchase_url + this.goodID + '.html' : ''
      }
      if (this.sourceType == 9) {
        url = this.lazadaBuyLinkObj[this.linkRow.country.toLowerCase()] ? this.lazadaBuyLinkObj[this.linkRow.country.toLowerCase()] + '/products/i' + this.goodID + '.html' : ''
      }
      this.rowBuyLinks[this.indexLink].purchase_url = url
      this.rowBuyLinks[this.indexLink].purchase_platform_id = res ? res.purchase_platform_id : ''
      this.createUrlByIdVisible = false
      //默认勾选
      this.rowBuyLinks[this.indexLink].is_default = '1'
      this.changeDefault(this.indexLink)
    },
    deleteLink(index) {
      this.rowBuyLinks.splice(index, 1)
    },
    // 打开外部窗口
    async openUrl(url) {
      this.$BaseUtilService.openUrl(url)
    },
    // 添加采购链接
    addBuyLink() {
      const params = {
        note: '',
        purchase_url: '',
        purchase_goods_id: '',
        purchase_platform_id: '',
        is_default: '',
      }
      this.rowBuyLinks.push(params)
    },
    // 保存添加采购链接
    async saveAddLink() {
      for(let index=0;index<this.rowBuyLinks.length;index++){
        let item = this.rowBuyLinks[index]
        const execPlatform = /(yangkeduo.com)|(taobao.com)|(jingxi.com)|(jd.com)|(1688.com)|(tmall.com)|(pinduoduo.com)|(xiapibuy.com)|(taobao.global)|(lazada.com)|(lazada)|(shopee)/g
        const execGoods = /goods_id=([0-9]*)/
        const pddGoods = /goodsId=(\d+)/
        const execIDs = /id=([0-9]*)/
        const jxIDs = /sku=([0-9]*)/
        const tmGlobalIDs = /mpId=(\d+)/
        const jdlazada1688IDs = /(\d+)\.html/
        const shopeeIDs = /[^\/]+(?!.*\/)/
        const platform = item.purchase_url.match(execPlatform)

        if (!platform) {
          console.log(index,"000000")
          return this.$message.error(`采购链接错误，请检查！`)
        }
        if (!item.purchase_url.length) {
          return this.$message.error(`采购链接不能为空,请检查采购链接`)
        }
        console.log(platform, '4646546554',item.purchase_url.match(shopeeIDs))
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
        } else if (item.purchase_url.match(pddGoods)) {
          item.purchase_goods_id = item.purchase_url.match(pddGoods)[1]
        } else if (item.purchase_url.match(shopeeIDs)) {
          item.purchase_goods_id = item.purchase_url.match(shopeeIDs)[0]
        } else {
          return this.$message.error(`采购链接错误,请填写正确的采购链接或参考采购链接上边的提示信息`)
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
          case 'lazada':
          case 'lazada.com':
            item.purchase_platform_id = '9'
            break
          case 'shopee':
            item.purchase_platform_id = '11'
            break
          case 'xiapibuy.com':
            item.purchase_platform_id = '11'
            break
          case 'taobao.global':
            item.purchase_platform_id = '13'
            break
          default:
            item.purchase_platform_id = '0'
            break
        }
      }
      const params = {
        goods_id: this.linkRow.goods_info.goods_id,
        purchase_list: this.rowBuyLinks,
      }
      const res = await this.$api.savePurchase(params)
      if (res.data.code === 200) {
        this.$message.success(`保存成功!`)
        this.$emit('close')
      } else {
        this.$message.error(`保存失败${res.data.message}`)
      }
      console.log(res, 'res', params)
    },
    async addPurchaseLink() {
      const params = {
        goodsIdLists: this.linkRow.goods_info.goods_id,
      }
      const res = await this.$api.getPurchaseLists(params)
      if (res.data.code === 200) {
        const params = {
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
    // 点击复制
    copyItem(attr) {
      const target = document.createElement('div')
      target.id = 'tempTarget'
      target.style.opacity = '0'
      target.innerText = attr
      document.body.appendChild(target)
      try {
        const range = document.createRange()
        range.selectNode(target)
        window.getSelection().removeAllRanges()
        window.getSelection().addRange(range)
        document.execCommand('copy')
        window.getSelection().removeAllRanges()
        this.$message.success('复制成功')
      } catch (e) {
        // console.log('复制失败')
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
