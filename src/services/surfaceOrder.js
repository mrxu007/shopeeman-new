import api from '../network/jx-request'
import shopeemanService from './shopeeman-service'

export default class {
  $api = api;
  $shopeemanService = new shopeemanService()
  isStop = false;
  _this = null;
  pageSize = 40;
  writeLog = undefined
  orders = []
  constructor(that, writeLog) {
    this._this = that
    this.writeLog = writeLog
  }

  //手动同步/自动同步
  async start(orders) {
    this.orders = orders
    this.getPrintWaybillType()
    this.checkPackagePrintWaybillMultiShop()
    this.getSdConfig()
    let sdJobInfo = await this.createSdJobsMultiShop()
    if(sdJobInfo.code === 200){
      let jobId = sdJobInfo.data.list[0].job_id
      this.downloadSdJob(jobId)
    }
  }
  //获取面单类型
  async getPrintWaybillType() {
    let params = {
      shop_id: "333281690"
    }
    let res = await this.$shopeemanService.getPrintWaybillType('TH', params)
    console.log(res, "面单类型")
  }
  //获取包裹号
  async checkPackagePrintWaybillMultiShop() {
    let params = {
      "order_info_list": [{
        "order_id": 91435086166136,
        "shop_id": 333281690,
        "region_id": "TH"
      }],
      shop_id: "333281690"
    }
    let res = await this.$shopeemanService.checkPackagePrintWaybillMultiShop('TH', params)
    console.log(res, "包裹号")
  }
  //获取面单打印配置
  async getSdConfig() {
    let params = {
      shop_id: "333281690"
    }
    let res = await this.$shopeemanService.getSdConfig('TH', params)
    console.log(res, "打印配置")
  }
  //创建面单打印任务
  async createSdJobsMultiShop() {
    let params = {
      "record_generate_schema": false,
      "package_list": [{
        "order_id": 91435086166136,
        "package_number": "OFG91435086143634",
        "region_id": "TH",
        "shop_id": 333281690
      }],
      "generate_file_details": [{
        "file_type": "NORMAL_PDF",
        "file_name": "Air Waybill.Standard Delivery - ส่งธรรมดาในประเทศ",
        "file_contents": [1]
      }],
      shop_id: "333281690"
    }
    let res = await this.$shopeemanService.createSdJobsMultiShop('TH', params)
    console.log(res, "创建面单打印任务") 
    return res 
  }
  //下载面单信息
  async downloadSdJob(job_id){
    let params = {
      job_id: job_id,
      shop_id: "333281690"
    }
    let res = await this.$shopeemanService.downloadSdJob('TH', params)
    // console.log(res, "下载面单信息") 
  }

}