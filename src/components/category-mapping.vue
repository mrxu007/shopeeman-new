<template>
  <div class="category-mapp contaniner">
    <div class="category_dialog">
      <div class="category_box">
        <div class="on_new_dialog_box" style="margin-bottom: 10px;">
          <div class="keepRight">店铺站点：</div>
          <div v-if="country">{{ country | chineseSite }}</div>
          <div v-else>
            <el-select v-model="countryOption" size="mini" filterable>
              <el-option v-for="(item, index) in countriesOption" :key="index" :label="item.label" :value="item.value" />
            </el-select></div>
        </div>
        <div class="on_new_dialog_box" v-for="(item,index) in categoryList" :key="index">
          <div class="keepRight">{{index+1}}级类目：</div>
          <el-select v-model="categoryAction[index]" @change="setCategory(categoryAction[index],index)" size="mini" filterable
                     style="width: 200px;">
            <el-option :value="''" label="全部"></el-option>
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
            <el-select v-model="item.options" size="mini" filterable style="width: 180px;">
              <el-option v-for="son in item.new_options_obj" :key="son.value_id"
                         :label="son.value" :value="son.value_id">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
    </div>
    <div class="on_new_dialog_box" style="margin-top: 25px;justify-content: space-evenly">
      <el-button v-if="mallList[0]" type="primary" size="mini" @click="confirmCategory(0)">　刷　新　</el-button>
      <el-button type="primary" size="mini" @click="confirmCategory()">　确　定　</el-button>
      <el-button size="mini" @click="$emit('categoryChange','')">　取　消　</el-button>
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
      },
      goodsCurrent: {
        type: Object,
        default() {
          return {}
        }
      },
      mallList: {
        type: Array,
        default() {
          return []
        }
      },
    },
    data() {
      return {
        countriesOption: this.$filters.countries_option,
        countryOption: 'TH',
        categoryAction: [],
        attributesCurrent: [],
        categoryList: [],
        attributesList: []
      }
    },
    watch:{
      countryOption(val){
        this.enterCategory()
      }
    },
    async mounted() {
      await this.enterCategory()
    },
    methods: {
      async confirmCategory(index = -1) {
        let country = this.country || this.countryOption
        let categoryList = []
        this.categoryList.forEach((item,index)=>{
          let temp = item.find(i=>i.category_id === this.categoryAction[index])
          temp && categoryList.push(temp)
        })
        let originCategoryId = this.goodsCurrent.originCategoryId || this.goodsCurrent.category_id
        let platformId = this.goodsCurrent.platform || this.goodsCurrent.source
        if (originCategoryId && platformId){
          if (this.goodsCurrent && index < 0) {
            let attributesList = []
            this.attributesList.forEach(son => {
              let option = son.new_options_obj.find(i => i.value_id === son.options)
              attributesList.push({
                attributeId: son.attribute_id,
                attributeName: son.attribute_name,
                valueId: option.value_id,
                value: option.value
              })
            })
            let param = {
              relationCategoryId: originCategoryId,
              country: this.country,
              platformId: platformId,
              platformCategoryId: categoryList[categoryList.length - 1].category_id,
              categoryAttributes: attributesList
            }
            let save = await this.$commodityService.saveCategoryRelation(param)
        }
          this.$emit('categoryChange', {
            categoryList: categoryList,
            attributesList: this.attributesList,
            country:country || this.countryOption
          })
        }
        else {
          index =index < 0 ? 0 : index
          let mall = this.mallList[index]
          let category_ids = this.categoryAction[this.categoryAction.length - 1]
          let param = {
            mallId: mall.platform_mall_id,
            category_ids: category_ids,
            brand_status: 1,
            cursor: 0,
            limit: 100
          }
          let brandListJson = await this.$shopeemanService.getBrandList(country, param, {headers: {'Content-Type': 'text/plain; charset=UTF-8'}})
          let brandListRes = JSON.parse(brandListJson)
          if (brandListRes.status >= 200 && brandListRes.status <= 300) {
            let brandListData = JSON.parse(brandListRes.data)
            if (brandListData.code === 0) {
              let brand_list = brandListData.data && brandListData.data.list[0] && brandListData.data.list[0].brand_list
              let brand_option = []
              brand_list.forEach(item => {
                brand_option.push({value: item.name, value_id: item.brand_id})
              })
              let uploadCateGoryAttrReq = [{
                'category_id': category_ids,
                'attribute_id': 0,
                'is_mandatory': 1,
                'attribute_name': 'Brand',
                'attribute_cn_name': '品牌',
                'attribute_type': 'STRING_TYPE',
                'country': country,
                'options': JSON.stringify(brand_option),
                'attribute_label': '',
                'is_key_attribute': 1
              }]
              try {
                let attributeTreeJson = await this.$shopeemanService.getAttributeTree(country, param, {headers: {'Content-Type': 'text/plain; charset=UTF-8'}})
                let attributeTreeRes = JSON.parse(attributeTreeJson)
                let attributeTreeData = JSON.parse(attributeTreeRes.data)
                let attribute_tree = attributeTreeData && attributeTreeData.data && attributeTreeData.data.list[0] && attributeTreeData.data.list[0].attribute_tree || []
                attribute_tree.forEach(item => {
                  let option = []
                  item.children.forEach(son => {
                    option.push({value: son.display_name || son.name, value_id: son.value_id})
                  })
                  uploadCateGoryAttrReq.push({
                    'category_id': category_ids,
                    'attribute_id': item.attribute_id,
                    'is_mandatory': item.mandatory && 1 || 0,
                    'attribute_name': item.display_name || item.name,
                    'attribute_cn_name': '',
                    'attribute_type': 'STRING_TYPE',
                    'country': country,
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
            this.$emit('categoryChange','')
          } else {
            await this.confirmCategory(++index)
          }
        }
      },
      async getAttribute() {
        let categoryId = this.categoryAction[this.categoryAction.length - 1] || this.categoryAction[this.categoryAction.length - 2] || '0'
        let country = this.country || this.countryOption
        let attributeJson = await this.$commodityService.getAttributeInfo(country, categoryId)
        let attributeRes = JSON.parse(attributeJson)
        this.attributesList = []
        if (attributeRes.code === 200) {
          let attributeList = attributeRes.data && attributeRes.data.attributes || []
          attributeList.forEach(item => {
            let index = this.attributesCurrent.findIndex(i => i.attribute_id === item.attribute_id)
            let attributesCurrent = this.attributesCurrent[index] && this.attributesCurrent[index].value_id || 0
            item.new_options_obj = item.new_options && JSON.parse(item.new_options) || []
            item.options = index > -1 && parseInt(attributesCurrent) || item.new_options_obj[0] && item.new_options_obj[0].value_id
            this.attributesList.push(item)
          })
          this.attributesCurrent = []
        }
      },
      setCategory(val, index) {
        this.categoryList.splice(index + 1, this.categoryList.length - index)
        this.categoryAction.splice(index + 1, this.categoryAction.length - index)
        this.enterCategory(val + '', ++index)
      },
      async enterCategory(categoryId = '0', index = 0, row = null,isParent = '1') {
        let country = this.country || this.countryOption
        if (index === 0 && this.attributesCurrent.length === 0) {
          this.categoryAction = row && row.categoryIdList || []
          if (this.goodsCurrent && (this.goodsCurrent.goodsId || this.goodsCurrent.goods_id)) {
            this.categoryAction = []
            let originCategoryId = this.goodsCurrent.originCategoryId || this.goodsCurrent.category_id
            let platformId = this.goodsCurrent.platform || this.goodsCurrent.source
            let categoryRelationJson = await this.$commodityService.getCategoryRelation(originCategoryId, country, platformId)
            let categoryRelationRes = JSON.parse(categoryRelationJson)
            console.log(categoryRelationRes)
            this.attributesCurrent = categoryRelationRes.data && categoryRelationRes.data.attributes || []
            categoryId = categoryRelationRes?.data?.category?.platform_category_id || categoryId
            isParent = 0
            this.categoryAction.unshift(categoryId)
          }
        }
        if (categoryId){
          let categoryList = JSON.parse(JSON.stringify(this.categoryList)) || []
          let categoryTbInfoJson = await this.$commodityService.getCategoryTbInfo(country, categoryId, isParent)
          let categoryTbInfoRes = JSON.parse(categoryTbInfoJson)
          if (categoryTbInfoRes.code === 200) {
            let categoryTbInfoData = categoryTbInfoRes.data
            console.log('categoryTbInfoData',categoryTbInfoData,this.categoryAction)
            if (isParent === 0){
              let parent_id = categoryTbInfoData?.categories[0].parent_id || 0
              parent_id && this.categoryAction.unshift(parent_id)
              isParent = parent_id === 0 && 1 || 0
              await this.enterCategory(parent_id+'', 0,null,isParent)
            }else{
              if (categoryTbInfoData && categoryTbInfoData.categories) {
                categoryList[index] = categoryTbInfoData.categories
                this.categoryList = categoryList
                this.categoryAction[index] = this.categoryAction[index] || categoryList[index][0].category_id
                await this.enterCategory(this.categoryAction[index] , ++index)
              } else {
                await this.getAttribute()
              }
            }
          }
        }else{
          await this.getAttribute(true)
        }
      },
    }
  }
</script>

<style lang="less">
  @import '../module-less/product-put-less/shangxin.less';
</style>
