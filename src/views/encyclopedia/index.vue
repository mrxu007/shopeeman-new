<template>
  <div class="detail">
    <ul>
      <li>
        <h2>温馨提示：</h2>
        <p>所有大陆域名的前台都无法登录账号，只有对应的本土域名才可以，本土域名开VPN能加快访问速度</p>
      </li>
      <li>
        <el-table
          :header-cell-style="{ background: '#f7fafa' }"
          :data="tableList"
          :row-style="{ height: '50px' }"
          height="calc(100vh - 70px)"
        >
          <el-table-column prop="webName" label="网页名称" min-width="100px" align="center" />
          <el-table-column prop="webAddress" label="网页地址" min-width="150px" align="center" show-overflow-tooltip />
          <el-table-column prop="" label="操作" min-width="150px" align="center">
            <template v-slot="{row}">
              <el-button type="primary" size="mini" @click="copy(row.webAddress)">复制</el-button>
            </template>
          </el-table-column>

        </el-table>
      </li>
    </ul>
  </div>
</template>

<script>

export default {

  data() {
    return {
      tableList: [
        { webName: '虾皮官网', webAddress: 'https://shopee.cn/' },
        { webName: '台湾站前台（大陆）', webAddress: 'https://xiapi.xiapibuy.com/' },
        { webName: '台湾站前台（本土）', webAddress: 'https://shopee.tw/' },
        { webName: '马来站前台（大陆）', webAddress: 'https://my.xiapibuy.com/' },
        { webName: '马来站前台（本土）', webAddress: 'https://shopee.com.my/' },
        { webName: '印尼站前台（大陆）', webAddress: 'https://id.xiapibuy.com/' },
        { webName: '印尼站前台（本土）', webAddress: 'https://shopee.co.id/' },
        { webName: '新加波站前台（大陆）', webAddress: 'https://sg.xiapibuy.com/' },
        { webName: '新加波站前台（本土）', webAddress: 'https://shopee.sg/' },
        { webName: '菲律宾站前台（大陆）', webAddress: 'https://ph.xiapibuy.com/' },
        { webName: '菲律宾站前台（本土）', webAddress: 'https://shopee.ph/' },
        { webName: '泰国站前台（大陆）', webAddress: 'https://th.xiapibuy.com/' },
        { webName: '泰国站前台（本土）', webAddress: 'https://shopee.co.th/' },
        { webName: '越南站前台（大陆）', webAddress: 'https://vn.xiapibuy.com/' },
        { webName: '越南站前台（本土）', webAddress: 'https://shopee.vn/' },
        { webName: '巴西站前台（大陆）', webAddress: 'https://br.xiapibuy.com/' },
        { webName: '巴西站前台（本土）', webAddress: 'https://shopee.com.br/' },
        { webName: '墨西哥站前台（本土）', webAddress: 'https://shopee.com.mx/' },
        { webName: '台湾站后台（大陆）', webAddress: 'https://seller.xiapi.shopee.cn/' },
        { webName: '台湾站后台（本土）', webAddress: 'https://seller.shopee.tw/' },
        { webName: '马来站后台（大陆）', webAddress: 'https://seller.my.shopee.cn/' },
        { webName: '马来站后台（本土）', webAddress: 'https://seller.shopee.com.my/' },
        { webName: '印尼站后台（大陆）', webAddress: 'https://seller.id.shopee.cn/' },
        { webName: '印尼站后台（本土）', webAddress: 'https://seller.shopee.co.id/' },
        { webName: '新加波站后台（大陆）', webAddress: 'https://seller.sg.shopee.cn/' },
        { webName: '新加波站后台（本土）', webAddress: 'https://seller.shopee.sg/' },
        { webName: '菲律宾站后台（大陆）', webAddress: 'https://seller.ph.shopee.cn/' },
        { webName: '菲律宾站后台（本土）', webAddress: 'https://seller.shopee.ph/' },
        { webName: '泰国站后台（大陆）', webAddress: 'https://seller.th.shopee.cn/' },
        { webName: '泰国站后台（本土）', webAddress: 'https://seller.shopee.co.th/' },
        { webName: '越南站后台（大陆）', webAddress: 'https://seller.vn.shopee.cn/' },
        { webName: '越南站后台（本土）', webAddress: 'https://banhang.shopee.vn/' },
        { webName: '巴西站后台（大陆）', webAddress: 'https://seller.br.shopee.cn/' },
        { webName: '巴西站后台（本土）', webAddress: 'https://seller.shopee.com.br/' },
        { webName: '墨西哥站后台（本土）', webAddress: 'https://seller.shopee.com.mx/' },
        { webName: '子母平台网址', webAddress: 'https://subaccount.shopee.com/login/' },
        { webName: '全球店铺平台网址', webAddress: 'https://seller.shopee.cn/' },
        { webName: '智能问答服务', webAddress: 'https://tbp.cloud.tencent.com/tbp-h5-v2/?AgentId=4E%2BpmqignBs4AWksiQAb9q8SAdctbUzoX3OYIdU0Z0%2B2YIoyxCUN722zLhiVtmq7VqkXiGwI48AMkU1b7FTkRfvEg0waP9sIPPxeHw6im40%3D&ufc=&ubc=&bfc=&bbc=&tfc=&tbc=' }

      ]
    }
  },
  created() {
  },
  methods: {
    copy(attr) {
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
    }
  }
}

</script>
<style lang="less" scoped>
.detail{
   width: 100%;
   height: 100%;
   background-color: white;
   padding: 10px;
    ul{
        width: 800px;
        li{
          margin-bottom: 10px;
          h2{
              margin-bottom: 5px;
          }
        }
}
    }
</style>
