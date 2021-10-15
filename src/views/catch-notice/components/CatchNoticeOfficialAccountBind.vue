<!--仓库公众号绑定-->
<template>
  <div class="CatchNoticeOfficialAccountBind">
    <!-- <el-botton @click="">test</el-botton> -->
    <div class=" content">
      <h2 style="text-align:center">软件绑定星卓越公众号流程</h2>
      <div><span>为了更好的开展国内中转仓异常包裹处理服务，星卓越已经推出异常包裹信息微信推送功能，请各位用户务必按照以下流程绑定星卓越公众号，绑定后即可通过微信了解到异常包裹信息并进行处理。</span></div>
      <h3>绑定流程:</h3>
      <img src="" style="width:200px;height:200px" alt="">
      <div class="step1">
        1、扫描上方的星卓越公众号二维码，<span style="color:red">点击关注</span>,收到公众号回复即为<span style="color:red">关注成功</span>
        <div class="imageGroup">
          <img :src="image1">
          <div class="arrow">
            <div class="divArrow" />
          </div>
          <img :src="image2">
        </div>
      </div>
      <div class="step2">
        2、公众号关注成功后，在扫描下方的用户识别码，此二维码为<span style="color:red">软件账号唯一识别码（不同二维码信息不同）</span>扫描之后会弹出<span style="color:red">操作成功</span>的提示，即为账号绑定成功
        <div class="imageGroup">
          <!-- <img :src="image4"> -->
          <div class="arrow">
            <div class="divArrow" />
          </div>
          <img :src="image3">
        </div>
      </div>
      <div class="example">
        <h3>推送信息案例展示:</h3>
        <div class="tip1">如果您的包裹出现异常，仓库将会实时同步信息到公众号，点击进去即可获取到异常包裹状态。</div>
        <img :src="image4">
        <div class="tip2">并且将会在页面显示您的包裹的相关信息，如：<span style="color:red">图片，订单号，物流单号，异常原因，异常仓库备注，以及处理方式。</span>
          默认处理方式选择为<span style="color:red">暂未处理</span>，您可以选择如下几种处理方法（单选），选择项：</div>
        <ol>
          <li>退件</li>
          <li>暂存仓库</li>
          <li>坚持发货</li>
          <li>等待补货</li>
          <li>订单匹配完成</li>
          <li>处理完成</li>
        </ol>
        <img :src="image5">
        <div class="tip3">选择完毕提交信息之后，您的选择将实时同步给仓库操作人员，仓库操作人员将根据您的指令对您的异常包裹进行操作</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image1: require('@/assets/image/catch-notice/image1.png'),
      image2: require('@/assets/image/catch-notice/image2.png'),
      image3: require('@/assets/image/catch-notice/image3.png'),
      image4: require('@/assets/image/catch-notice/image4.jpg'),
      image5: require('@/assets/image/catch-notice/image5.png')
    }
  },
  mounted() {
    this.getQrCode()
  },
  methods: {
    async getQrCode() {
      const userInfo = await this.$appConfig.getUserInfo()
      const muid = userInfo.Muid
      const result = JSON.parse(await this.$XzyNetMessageService.get('http://user.xzygyl.com/api/wechat/qrCode', { Muid: muid }))
      console.log(result)
    }
  }
}
</script>
<style lang="less" scoped>
.CatchNoticeOfficialAccountBind{
  background: #fff;
  white-space: nowrap;
  overflow: hidden;
}
.content{
  width: 1200px;
  margin: auto;
}
.step1,.step2{
  .arrow{
    position: relative;
    width: 200px;
    .divArrow{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      height: 6px;
      width: 80%;
      padding-left: 30px;
      background: black;
      line-height: 40px;
      &:before{
        content: '';
          position: absolute;
          top: -12px;
          right: 4px;
          width: 30px;
          height: 30px;
          border-top: 6px solid black;
          border-right: 6px solid black;
          transform: rotate(45deg);
      }
    }
  }
  .imageGroup{
    margin-top: 10px;
    display: flex;
  }
}
.step2{
  margin-top: 20px;
}
.example{
  h3{
    margin: 20px 0;
  }
  img{
    margin-top: 10px;
  }
  .tip2{
    margin: 10px 0;
  }
  .tip3{
    margin: 20px 0 40px 0;
  }
  ol{list-style-type:none;counter-reset:sectioncounter;width:200px;}
   ol {
     li {
       margin: 10px 0;
       &:before{
        content:counter(sectioncounter) "、";
        counter-increment:sectioncounter;
       }
      }
    }
}
</style>
