/**
 * 阿里云 存储服务
 */
export default class AliyunOssService{
    nativeService=window["AliyunOSSBridgeService"];
    /**
     * 上传文件到服务器 成功返回文件url，失败返回null
     * @param {string} base64Str 要上传文件的base64字符串
     * @param {string} name 文件名称
     */
    uploadFile(base64Str,name){
       return this.nativeService.uploadFile(base64Str,name);
    }
    
}