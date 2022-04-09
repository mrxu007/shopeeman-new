<template>
  <div style="padding:10px">
    <!-- <el-button style="margin: 10px;" size="mini" type="primary" @click="point">打印</el-button> -->
    <div id="faceId" :style="`width:${table_width+60}px;`">
      <el-table v-if="table_width>0" :data="goodsList" tooltip-effect="dark" class="tableContent">
        <el-table-column :label="headTitle" align="center">
          <el-table-column
            align="center"
            label="序号"
            width="60"
            type="index"
          />
          <el-table-column
            v-for="(gPros,index) in goodsProps"
            v-if="gPros.propName!=='goods_img'"
            :key="index"
            align="center"
            :prop="gPros.propName"
            :label="gPros.label"
            :width="gPros.width"
          />
          <el-table-column v-else align="center" :prop="gPros.propName" :label="gPros.label" :width="gPros.width">
            <template slot-scope="scope">
              <el-image :src="[scope.row.goods_img] | imageRender" style="width: 56px; height: 56px" />
            </template>
          </el-table-column>

        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
import md5 from 'js-md5'
import { Base64 } from 'js-base64'
export default {
  data() {
    return {
      goodsProps: [],
      goodsList: [],
      headTitle: '',
      table_width: 0,
      column:{
        country:{
          label: '站点',
          width: 60
        },
        platform_mall_name:{
          label: '店铺名称',
          width: 200
        },
        goods_name:{
          label: '商品名称',
          width: 300
        },
        outer_goods_id:{
          label: 'parentSKU',
          width: 200
        },
        order_sn:{
          label: '订单编号',
          width: 150
        },
        goods_count:{
          label: '商品数量',
          width: 100,
        },
        variation_name:{
          label: '商品规格',
          width: 150,
        },
        goodsLink:{
          label: '商品链接',
          width: 200,
        },
        goods_img:{
          label: '商品图片',
          width: 80,
        },
        created_time:{
          label: '订单创建时间',
          width: 180,
        },
        ship_by_date:{
          label: '截止发货时间',
          width: 180,
        },
        is_apply_tracking_no:{
          label: '是否已申请物流单号',
          width: 60,
        },
        hasLogistics:{
          label: '是否同步面单信息',
          width: 60,
        },
        order_status:{
          label: '发货状态',
          width: 60,
        },
        logistics_name:{
          label: '虾皮物流',
          width: 180,
        },
      },
    }
  },

  async created() {
    console.log(this.$route, '测试')
    if (this.$route.query) {
      const uid = this.$route.query.uid || ''
      const uuid = this.$route.query.uuid || ''
      const code = this.$route.query.code || ''
      let res = await this.$api.getCustomerFaceData({uid,uuid,code})
      console.log('goodsListJson' , res)
    }
    this.headTitle = '拣货清单(' + this.formatTime(new Date().getTime()) + ')'
    // const array = this.goodsProps.map(son => (son.width || 120))
    // const width = eval(array.join('+')) + 2
    // this.table_width = width || this.table_width
  },
  methods: {
    async point() {
      // 获得PDF的base64 （条形码ID,条形码显示数据,画布ID）
      await this.exportPdfData('#faceId')
    },
    // 时间格式转换
    add0(m) { return m < 10 ? '0' + m : m },
    formatTime(val) {
      var time = new Date(val)
      var y = time.getFullYear()
      var m = time.getMonth() + 1
      var d = time.getDate()
      var h = time.getHours()
      var mm = time.getMinutes()
      var s = time.getSeconds()
      return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s)
    },
    // 导出PDF
    exportPdfData(faceId) {
      html2Canvas(document.querySelector(faceId), {
        allowTaint: true,
        taintTest: false,
        useCORS: true,
        dpi: window.devicePixelRatio * 2, // 将分辨率提高到特定的DPI
        scale: 2 // 按比例增加分辨率
      }).then(canvas => {
        const contentWidth = canvas.width
        const contentHeight = canvas.height
        const pageHeight = contentWidth / 592.28 * 841.89
        let leftHeight = contentHeight
        let position = 0
        const imgWidth = 595.28
        const imgHeight = 592.28 / contentWidth * contentHeight
        const pageData = canvas.toDataURL('image/jpeg', 1.0)
        const PDF = new JsPDF('', 'pt', 'a4')
        if (leftHeight < pageHeight) {
          PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
        } else {
          while (leftHeight > 0) {
            PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= 841.89
            if (leftHeight > 0) {
              PDF.addPage()
            }
          }
        }
        PDF.save('自定义拣货单' + '.pdf') // 直接导出
      })
    }
  }
}
</script>
<style lang="less" scoped>
 /deep/.el-table__cell{
   border: 1px solid #222222;
   max-width: 120px;
   /deep/.cell{
    color: #222222;
   }
 }
 .tableContent{
   border: 1px solid #222222;

 }
 /deep/.el-table_1_column_1{
     .cell{
         font-weight: bold;
         font-size: 20px !important;
         color: #222222;
     }
 }
</style>
