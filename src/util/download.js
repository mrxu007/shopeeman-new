import JSZip from 'jszip'
import FileSaver from 'file-saver'
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
import jsbarcode from 'jsbarcode'
import { Loading } from 'element-ui'

// 导出PDF
export function exportPdfData(id, sysSkuId, faceId) {
  jsbarcode(
    document.querySelector(id), sysSkuId,
    {
      displayValue: true // 是否在条形码下方显示文字
    }
  )
  return html2Canvas(document.querySelector(faceId), {
    allowTaint: true,
    taintTest: false,
    useCORS: true,
    // width: 300,
    height: 300,
    dpi: window.devicePixelRatio * 2, // 将分辨率提高到特定的DPI 提高四倍
    scale: 2 // 按比例增加分辨率
  }).then(canvas => {
    const contentWidth = canvas.width
    const contentHeight = canvas.height
    const pageHeight = contentWidth / 592.28 * 841.89
    let leftHeight = contentHeight
    let position = 0
    const imgWidth = 13.38
    const imgHeight = 16 / contentWidth * contentHeight
    const pageData = canvas.toDataURL('image/jpeg', 1.0)
    const PDF = new JsPDF('', 'in', [3.07086614173, 3.4645669])
    // const PDF = new JsPDF('', 'pt', 'a4')
    // 当内容未超过pdf一页显示的范围，无需分页
    if (leftHeight < pageHeight) {
      PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
    } else {
      while (leftHeight > 0) {
        PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
        leftHeight -= pageHeight
        position -= 841.89
        // 避免添加空白页
        if (leftHeight > 0) {
          PDF.addPage()
        }
      }
    }
    //  PDF.save(name + '.pdf') 直接导出
    const pdfBase64 = PDF.output('datauristring')// 获取到base64 的pdf
    return Promise.resolve(pdfBase64)
  })
}
/** *
 * @params ele 要下载的dom的class名称
 * @params String name  压缩包名称
 * @params Arrary arr   名称集合
 * **/
export function downloadZip(arrPDF, name) {
  setTimeout(() => {
    var loadingInstance = Loading.service({
      lock: true,
      text: '下载中',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    filesToRar(arrPDF, name)
    loadingInstance.close()
  }, 50)
}
function filesToRar(arrImages, filename) {
  const _this = this
  const zip = new JSZip()
  const cache = {}
  const promises = []
  var title = '正在加载压缩文件'
  for (const item of arrImages) {
    const promise = getImgArrayBuffer(item.fileUrl).then(data => {
      // 下载文件, 并存成ArrayBuffer对象(blob)
      zip.file(item.renameFileName, data, { binary: true }) // 逐个添加文件
      cache[item.renameFileName] = data
    })
    promises.push(promise)
  }
  Promise.all(promises).then(() => {
    zip.generateAsync({ type: 'blob' }).then(content => {
      title = '正在压缩'
      // 生成二进制流
      FileSaver.saveAs(content, filename) // 利用file-saver保存文件  自定义文件名
      title = '压缩完成'
    })
  }).catch(res => {
    _this.$message.error('文件压缩失败')
  })
}
// 获取文件blob
function getImgArrayBuffer(url) {
  const _this = this
  return new Promise((resolve, reject) => {
    // 通过请求获取文件blob格式
    const xmlhttp = new XMLHttpRequest()
    xmlhttp.open('GET', url, true)
    xmlhttp.responseType = 'blob'
    xmlhttp.onload = function() {
      if (this.status === 200) {
        resolve(this.response)
      } else {
        reject(this.status)
      }
    }
    xmlhttp.send()
  })
}
