// 公用Mixin
import XLSX from 'xlsx'
export default {
  data() {
    return {
      showConsole: true, // 日志
      importTemplateData: '' // 导入数据
    }
  },
  methods: {
    // 改变日志显示状态
    changeshowConsole(status) {
      this.showConsole = status
    },
    // 点击复制
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
    },
    // 日志封装
    writeLog(msg, success = true) {
      if (!msg) return
      const color = success ? 'green' : 'red'
      const time = this.$dayjs(new Date(Date.now())).format('YYYY-MM-DD HH:mm:ss')
      this.consoleMsg = `<p style="color:${color}; margin-top: 8px;">${time}:${msg}</p>` + this.consoleMsg
    },
    // 封装notify方法
    notify(title, message, Type) {
      if (this.notifyInstance) {
        this.notifyInstance.close()
      }
      this.notifyInstance = this.$notify({
        title: title,
        message: message,
        type: Type
      })
    },
    // 导入Excel表格
    importTemplateEvent(file) {
      const files = { 0: file.raw }
      // 表格导入
      if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
        this.writeLog('上传格式不对,请上传xls、xlsx格式的文件', false)
        this.showConsole = false
        return
      }
      if (files.length <= 0) {
        this.writeLog('表格为空', false)
        return
      }
      const fileReader = new FileReader()
      fileReader.onload = ev => {
        const data = ev.target.result
        const workbook = XLSX.read(data, {
          type: 'binary'
        })
        const wsname = workbook.SheetNames[0] // 取第一张表
        let ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]) // 生成Json表格
        // console.log('ws表格里面的数据，且是json格式', ws)
        console.log(ws)
        this.importTemplateData = ws
        this.batchImport()
        ws = null
        this.$refs.importRef.value = ''
      }
      fileReader.readAsBinaryString(files[0])
    },
    // 处理文本域输入框
    handleKey(key) {
      return key
        .split('\n')
        .map(item => {
          return item.replace(/(^\s*)|(\s*$)/g, '')
        })
        .filter(item => {
          return item !== ''
        })
    }
  }
}
