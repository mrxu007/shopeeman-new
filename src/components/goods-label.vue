<template>
  <div class="goods_tag_dialog">
    <div class="on_new_dialog_box">
      <div>商品标签：</div>
      <el-select v-model="goodsTagAction" size="mini" style="width: 200px;">
        <el-option v-for="(item,index) in goodsTagList" :key="item.id" :value="item.label_name">
          <div style="display: flex;justify-content: space-between;align-items: center">
            <div>{{ item.label_name }}</div>
            <i class="el-icon-circle-close close-right" @click.stop="deleteClick(item.id,index)" />
          </div>
        </el-option>
      </el-select>
    </div>
    <div class="on_new_dialog_box" style="margin-top: 10px;">
      <div>当前标签：</div>
      <el-input v-model="goodsTagCurrent" size="mini" style="width: 200px;" />
    </div>
    <div class="on_new_dialog_box" style="justify-content: space-evenly;margin-top: 10px;">
      <el-button type="primary" size="mini" :loading="loadingBut" @click="updateGoodsTag">　确　定　</el-button>
      <el-button size="mini" @click="$emit('goodsTagChange','')">　取　消　</el-button>
    </div>
  </div>
</template>

<script>
import { batchOperation } from '../util/util'
export default {
  name: 'GoodsLabel',
  props: {
    goodsTableSelect: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      goodsTagList: [],
      goodsTagAction: '',
      goodsTagCurrent: '',
      loadingBut: false
    }
  },
  watch: {
    goodsTagAction(val) {
      this.goodsTagCurrent = val
    }
  },
  async mounted() {
    await this.enterGoodsTag()
  },
  methods: {
    async updateGoodsTag() {
      this.loadingBut = true
      if (this.goodsTagCurrent !== this.goodsTagAction) {
        const addGoodsTagJson = await this.$commodityService.addGoodsTag(this.goodsTagCurrent)
        const addGoodsTagRes = JSON.parse(addGoodsTagJson)
        if (addGoodsTagRes.code === 200) {
          const goodsTagListJson = await this.$commodityService.getGoodsTagList()
          const goodsTagListRes = JSON.parse(goodsTagListJson)
          this.goodsTagList = goodsTagListRes.data || []
          this.$appConfig.temporaryCacheInfo('save', 'goodsLabelList', goodsTagListRes.data)
          this.goodsTagAction = this.goodsTagCurrent
        } else {
          this.loadingBut = false
          this.$message.error('商品标签设置失败')
          return
        }
      }
      const temp = this.goodsTagList.find(i => i.label_name === this.goodsTagAction)
      const data = []
      this.goodsTableSelect.forEach(item => {
        data.push(Object.assign(JSON.parse(JSON.stringify(item)), { sysLabelId: temp.id }))
      })
      await batchOperation(data, this.setGoodsTag)
      this.loadingBut = false
      this.$emit('goodsTagChange', { category: temp, goodsTagList: this.goodsTagList })
      console.log({ category: temp, goodsTagList: this.goodsTagList })
    },
    async setGoodsTag(item, count = { count: 1 }) {
      try {
        const addGoodsToTagJson = await this.$commodityService.addGoodsToTag(item.sysLabelId, [item.id])
        console.log(addGoodsToTagJson)
        const addGoodsToTagRes = JSON.parse(addGoodsToTagJson)
      } catch (e) {
        console.log(e)
        this.$message.error('设置失败')
      } finally {
        count.count--
      }
    },
    async enterGoodsTag() {
      const goodsLabelList = await this.$appConfig.temporaryCacheInfo('get', 'goodsLabelList', '')
      const jsonData = JSON.parse(goodsLabelList)
      if (Object.keys(jsonData).length > 0) {
        this.goodsTagList = jsonData || []
      } else {
        const goodsTagListJson = await this.$commodityService.getGoodsTagList()
        const goodsTagListRes = JSON.parse(goodsTagListJson)
        this.goodsTagList = goodsTagListRes.data || []
        this.$appConfig.temporaryCacheInfo('save', 'goodsLabelList', goodsTagListRes.data)
      }
      this.goodsTagAction = this.goodsTagList[0].label_name
      this.goodsTagCurrent = this.goodsTagList[0].label_name
      // const goodsTagListJson = await this.$commodityService.getGoodsTagList()
      // const goodsTagListRes = JSON.parse(goodsTagListJson)
      // console.log('goodsTagListRes', goodsTagListRes)
      // this.goodsTagList = goodsTagListRes.data || []
      // this.goodsTagAction = this.goodsTagList[0].label_name
      // this.goodsTagCurrent = this.goodsTagList[0].label_name
    },
    async deleteClick(id, index) {
      this.goodsTagList.splice(index, 1)
      this.$commodityService.deleteGoodsTag([id])
      const goodsTagListJson = await this.$commodityService.getGoodsTagList()
      const goodsTagListRes = JSON.parse(goodsTagListJson)
      this.goodsTagList = goodsTagListRes.data || []
      this.$appConfig.temporaryCacheInfo('save', 'goodsLabelList', goodsTagListRes.data)
    }
  }
}
</script>

<style scoped>

</style>
