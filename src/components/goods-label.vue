<template>
  <div class="goods_tag_dialog">
    <div class="on_new_dialog_box">
      <div>商品标签：</div>
      <el-select v-model="goodsTagAction" size="mini" style="width: 200px;">
        <el-option
            v-for="item in goodsTagList"
            :key="item.id"
            :label="item.label_name"
            :value="item.label_name">
        </el-option>
      </el-select>
    </div>
    <div class="on_new_dialog_box" style="margin-top: 10px;">
      <div>当前标签：</div>
      <el-input size="mini" style="width: 200px;" v-model="goodsTagCurrent"></el-input>
    </div>
    <div class="on_new_dialog_box" style="justify-content: space-evenly;margin-top: 10px;">
      <el-button type="primary" size="mini" @click="updateGoodsTag">　确　定　</el-button>
      <el-button size="mini" @click="$emit('goodsTagChange','')">　取　消　</el-button>
    </div>
  </div>
</template>

<script>
  import {batchOperation} from '../util/util'
  export default {
    name: 'goods-label',
    props: {
      goodsTableSelect: {
        type: Array,
        default() {
          return []
        }
      },
    },
    data() {
      return {
        goodsTagList: [],
        goodsTagAction: '',
        goodsTagCurrent: ''
      }
    },
    watch: {
      goodsTagAction(val) {
        this.goodsTagCurrent = val
      },
    },
    async mounted() {
      await this.enterGoodsTag()
    },
    methods: {
      async updateGoodsTag() {
        if (this.goodsTagCurrent !== this.goodsTagAction) {
          let addGoodsTagJson = await this.$commodityService.addGoodsTag(this.goodsTagCurrent)
          let addGoodsTagRes = JSON.parse(addGoodsTagJson)
          if (addGoodsTagRes.code === 200) {
            let goodsTagListJson = await this.$commodityService.getGoodsTagList()
            let goodsTagListRes = JSON.parse(goodsTagListJson)
            this.goodsTagList = goodsTagListRes.data || []
            this.goodsTagAction = this.goodsTagCurrent
          } else {
            this.$message.error('商品标签设置失败')
            return
          }
        }
        let temp = this.goodsTagList.find(i => i.label_name === this.goodsTagAction)
        let data = []
        this.goodsTableSelect.forEach(item => {
          data.push(Object.assign(JSON.parse(JSON.stringify(item)), {sysLabelId: temp.id}))
        })
        await batchOperation(data, this.setGoodsTag)
        this.$emit('goodsTagChange',{category:temp})
      },
      async setGoodsTag(item, count = {count: 1}) {
        try {
          let addGoodsToTagJson = await this.$commodityService.addGoodsToTag(item.sysLabelId, [item.id])
          console.log(addGoodsToTagJson)
          let addGoodsToTagRes = JSON.parse(addGoodsToTagJson)
        } catch (e) {
          console.log(e)
          this.$message.error('设置失败')
        } finally {
          count.count--
        }
      },
      async enterGoodsTag() {
        let goodsTagListJson = await this.$commodityService.getGoodsTagList()
        let goodsTagListRes = JSON.parse(goodsTagListJson)
        console.log('goodsTagListRes',goodsTagListRes)
        this.goodsTagList = goodsTagListRes.data || []
      },
    }
  }
</script>

<style scoped>

</style>
