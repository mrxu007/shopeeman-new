/*
 * @Author: your name
 * @Date: 2021-12-06 21:05:10
 * @LastEditTime: 2021-12-06 21:16:33
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \shopeeman-new\src\views\order-manager\components\orderCenter\handleGoods.js
 */
async function setGoodsDelist(that,row){
    let params = [
        {
          id: Number(row.goods_info.goods_id),
          unlisted: true,
        },
      ]
      let data = {
        shop_id: row.mall_info.platform_mall_id,
      }
      let res = await that.$shopeemanService.handleGoodsDelist(row.country, data, params)
      if (res.code === 200) {
        that.$message.success(`商品下架成功！`)
      } else {
        that.$message.error(`${res.data}`)
      }
      console.log(res, 'res')
}
async function setGoodsDelete(that,row) {
      let params = {
        product_id_list: [Number(row.goods_info.goods_id)],
        shop_id: row.mall_info.platform_mall_id,
      }
      let res = await that.$shopeemanService.handleGoodsDelete(row.country, params)
      if (res.code === 200) {
        that.$message.success(`商品删除成功！`)
      } else {
        that.$message.error(`${res.data}`)
      }
    }
export { setGoodsDelist,setGoodsDelete }
