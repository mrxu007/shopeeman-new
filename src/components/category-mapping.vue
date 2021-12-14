<template>
<div class="category-mapp">
  <div class="category_dialog">
    <div class="category_box">
      <div class="on_new_dialog_box" style="margin-bottom: 10px;">
        <div class="keepRight">店铺站点：</div>
        {{ country | chineseSite }}
      </div>
      <div class="on_new_dialog_box" v-for="(item,index) in categoryList" :key="index">
        <div class="keepRight">{{index+1}}级类目：</div>
        <el-select v-model="categoryAction[index]" @change="setCategory(categoryAction[index],index)" size="mini"
                   style="width: 200px;">
          <el-option
              v-for="son in item"
              :key="son.id"
              :label="son.category_name+'('+son.category_cn_name+')'"
              :value="son.category_id">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="category_box" style="margin-left: 20px;">
      <div class="on_new_dialog_box" style="margin-bottom: 10px;">
        <div class="width_single_150">属性名称：</div>
        <div>属性值<span style="color:red">(必填)</span></div>
      </div>
      <div class="on_new_dialog_box line_height_28" v-for="(item,index) in attributesList" :key="index">
        <div class="width_single_150">{{item.attribute_name}}({{item.attribute_cn_name}})</div>
        <div>
          <el-select v-model="item.options" size="mini" style="width: 180px;">
            <el-option v-for="son in item.new_options_obj" :key="son.value_id" :label="son.value"
                       :value="son.value_id">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
  </div>
  <div class="on_new_dialog_box" style="margin-top: 25px;justify-content: space-evenly">
    <el-button type="primary" size="mini" @click="confirmCategory()">　确　定　</el-button>
    <el-button size="mini" @click="categoryVisible = false">　取　消　</el-button>
  </div>
</div>
</template>

<script>
  export default {
    name: 'category-mapping',
    props: {
      country: {
        type: String,
        default() {
          return ''
        }
      }
    },
    data() {
      return {
        categoryVisible: false,
        categoryAction: [],
        attributesCurrent: [],
        categoryList: [],
        attributesList:[]
      }
    },
    mounted(){
      this.enterCategory()
    },
    methods:{
      async getAttribute() {
        let categoryId = this.categoryAction[this.categoryAction.length - 1] + ''
        let attributeJson = await this.$commodityService.getAttributeInfo(this.country, categoryId)
        let attributeRes = JSON.parse(attributeJson)
        this.attributesList = []
        if (attributeRes.code === 200) {
          let attributeList = attributeRes.data && attributeRes.data.attributes
          attributeList.forEach(item => {
            console.log('attributesCurrent',this.attributesCurrent)
            let index = this.attributesCurrent.findIndex(i => i.attribute_id === item.attribute_id)
            let attributesCurrent = this.attributesCurrent[index] && this.attributesCurrent[index].value_id || 0
            item.new_options_obj = JSON.parse(item.new_options)
            item.options = index > -1 && parseInt(attributesCurrent) || item.new_options_obj[0].value_id
            this.attributesList.push(item)
          })
          this.attributesCurrent = []
        }
      },
      async confirmCategory(index = 0) {
        this.categoryVisible = false
        if (this.goodsCurrent) {
          if (this.goodsCurrent.goodsId) {
            let index = this.goodsTable.findIndex(i => i.goodsId === this.goodsCurrent.goodsId)
            let categoryId = this.categoryAction[this.categoryAction.length - 1]
            let category = this.categoryList[this.categoryList.length - 1].filter(i => i.category_id === categoryId)[0]
            let temp = Object.assign(JSON.parse(JSON.stringify(this.goodsTable[index])), {
              categoryIdList: this.categoryAction,
              categoryId: categoryId,
              categoryName: category.category_name + '(' + category.category_cn_name + ')'
            })
            this.goodsTable[index] = temp
            // this.goodsTable.splice(index,1,temp)
            let categoryAttributes = []
            this.attributesList.forEach(item => {
              let son = item.new_options_obj.filter(i => i.value_id === item.options)[0]
              categoryAttributes.push({
                attributeId: item.attribute_id,
                attributeName: item.attribute_name,
                valueId: son.value_id,
                value: son.value
              })
            })
            let param = {
              relationCategoryId: this.goodsCurrent.originCategoryId,
              country: this.country,
              platformId: this.goodsCurrent.platform,
              platformCategoryId: categoryId,
              categoryAttributes: categoryAttributes
            }
            console.log('saveCategoryRelation - param', param)
            this.$commodityService.saveCategoryRelation(param).then(res => {
              console.log('categoryRelationRes', res)
            })
          } else {
            this.goodsTableSelect.forEach(item => {
              let index = this.goodsTable.findIndex(i => i.goodsId === item.goodsId)
              let categoryId = this.categoryAction[this.categoryAction.length - 1]
              let category = this.categoryList[this.categoryList.length - 1].filter(i => i.category_id === categoryId)[0]
              let temp = Object.assign(JSON.parse(JSON.stringify(this.goodsTable[index])), {
                categoryIdList: this.categoryAction,
                categoryId: categoryId,
                categoryName: category.category_name + '(' + category.category_cn_name + ')'
              })
              item = temp
              this.goodsTable[index] = temp
              // this.goodsTable.splice(index,1,temp)
            })
            console.log(this.goodsTableSelect)
          }
        }
        else {
          let mall = this.mallList[index]
          let category_ids = this.categoryAction[this.categoryAction.length - 1]
          let param = {
            mallId: mall.platform_mall_id,
            category_ids: category_ids,
            brand_status: 1,
            cursor: 0,
            limit: 100
          }
          let brandListJson = await this.$shopeemanService.getBrandList(this.country, param, { headers: { 'Content-Type': 'text/plain; charset=UTF-8' } })
          let brandListRes = JSON.parse(brandListJson)
          if (brandListRes.status >= 200 && brandListRes.status <= 300) {
            let brandListData = JSON.parse(brandListRes.data)
            if (brandListData.code === 0) {
              let brand_list = brandListData.data && brandListData.data.list[0] && brandListData.data.list[0].brand_list
              let brand_option = []
              brand_list.forEach(item => {
                brand_option.push({ value: item.name, value_id: item.brand_id })
              })
              let uploadCateGoryAttrReq = [{
                'category_id': category_ids,
                'attribute_id': 0,
                'is_mandatory': 1,
                'attribute_name': 'Brand',
                'attribute_cn_name': '品牌',
                'attribute_type': 'STRING_TYPE',
                'country': this.country,
                'options': JSON.stringify(brand_option),
                'attribute_label': '',
                'is_key_attribute': 1
              }]
              try {
                let attributeTreeJson = await this.$shopeemanService.getAttributeTree(this.country, param, { headers: { 'Content-Type': 'text/plain; charset=UTF-8' } })
                let attributeTreeRes = JSON.parse(attributeTreeJson)
                let attributeTreeData = JSON.parse(attributeTreeRes.data)
                let attribute_tree = attributeTreeData && attributeTreeData.data && attributeTreeData.data.list[0] && attributeTreeData.data.list[0].attribute_tree || []
                attribute_tree.forEach(item => {
                  let option = []
                  item.children.forEach(son => {
                    option.push({ value: son.display_name || son.name, value_id: son.value_id })
                  })
                  uploadCateGoryAttrReq.push({
                    'category_id': category_ids,
                    'attribute_id': item.attribute_id,
                    'is_mandatory': item.mandatory && 1 || 0,
                    'attribute_name': item.display_name || item.name,
                    'attribute_cn_name': '',
                    'attribute_type': 'STRING_TYPE',
                    'country': this.country,
                    'options': JSON.stringify(option),
                    'attribute_label': '',
                    'is_key_attribute': 0
                  })
                })
              } catch (e) {
                console.log(e)
              } finally {
                let uploadCateGoryAttrJson = await this.$commodityService.uploadCateGoryAttr(uploadCateGoryAttrReq)
                let uploadCateGoryAttrRes = JSON.parse(uploadCateGoryAttrJson)
                if (uploadCateGoryAttrRes.code === 200) {
                  this.$message.success('同步成功')
                } else {
                  this.$message.error('同步失败')
                }
              }
            }
          } else {
            this.confirmCategory(++index)
          }
        }
      },
      setCategory(val, index) {
        this.categoryList.splice(index + 1, this.categoryList.length - index)
        this.categoryAction.splice(index + 1, this.categoryAction.length - index)
        this.enterCategory(val + '', ++index)
      },
      async enterCategory(categoryId = '0', index = 0, row = null) {
        if (index === 0) {
          this.categoryAction = row && row.categoryIdList || []
          if (row && row.goodsId || this.goodsTableSelect.length > 0) {
            this.goodsCurrent = row
            if (row && row.goodsId) {
              let categoryRelationJson = await this.$commodityService.getCategoryRelation(row.originCategoryId, this.country, row.platform + '')
              let categoryRelationRes = JSON.parse(categoryRelationJson)
              console.log('categoryRelationRes',categoryRelationRes)
              this.attributesCurrent = categoryRelationRes.data && categoryRelationRes.data.attributes || []
            }
          } else if (row) {
            this.$message.error('请选择一个商品信息')
            return false
          }
        }
        if ( row) {
          let categoryList = JSON.parse(JSON.stringify(this.categoryList)) || []
          let categoryTbInfoJson = await this.$commodityService.getCategoryTbInfo(this.country, categoryId)
          let categoryTbInfoRes = JSON.parse(categoryTbInfoJson)
          if (categoryTbInfoRes.code === 200) {
            let categoryTbInfoData = categoryTbInfoRes.data
            if (categoryTbInfoData && categoryTbInfoData.categories) {
              categoryList[index] = categoryTbInfoData.categories
              this.categoryList = categoryList
              this.categoryAction[index] = this.categoryAction[index] || categoryList[index][0].category_id
              this.enterCategory(this.categoryAction[index] + '', ++index)
            } else {
              this.getAttribute()
            }
          }
          this.categoryVisible = true
        } else {
          this.$message.error('请选择一个店铺')
          return false
        }
      },
    }
  }
</script>

<style lang="less" >
  @import '../module-less/product-put-less/shangxin.less';
</style>
