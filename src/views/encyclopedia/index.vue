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
        >
          <el-table-column prop="" label="网页名称" min-width="100px" align="center" />
          <el-table-column prop="" label="网页地址" min-width="150px" align="center" />
          <el-table-column prop="" label="操作" min-width="150px" align="center">
            <template v-slot="{row}">
              <el-button type="primary" size="mini" @click="copy(row)">复制</el-button>
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
      tableList: []
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
