// test.js
const marked = require('../../utils/marked.min.js');
Page({
  // 数据
  data: {
    modes: ['html 解析', 'markdown 解析'],
    tagStyle: {}
  },
  // 页面加载
  onLoad(e) {
    if (!wx.canIUse('editor')) {
      wx.showModal({
        title: '失败',
        content: '微信版本过低，暂时无法使用此功能',
        showCancel: false
      })
      return wx.redirectTo({
        url: '/pages/index/index',
      });
    }
    wx.createSelectorQuery().select('#editor').context((res) => {
      this.editor = res.context;
    }).exec();
    var tagStyle = {
      pre: 'padding:1em 1em 0 1em;margin:.5em 0;border-radius:0.3em;background:#272822;color:#f8f8f2;line-height: 1.5;text-shadow:0 1px rgba(0,0,0,0.3);font-family:Consolas,Monaco,"Andale Mono","Ubuntu Mono",monospace;position:relative',
      code: 'background-color:#f0f0f0;font-size:85%;margin:0 3px;padding:2px 5px 2px 5px;border-radius:2px;font-family:SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace'
    }
    // markdown 表格样式
    if (e.index == '1') {
      tagStyle.table = 'width:100%;box-sizing:border-box;font-size:14px;border-collapse:collapse;border-top:1px solid #dfe2e5;border-left:1px solid #dfe2e5';
      tagStyle.th = 'border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5;padding:5px;font-weight:bold';
      tagStyle.td = 'border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5;padding:5px';
    }
    this.setData({
      index: e.index,
      tagStyle
    })
  },
  // 增加模板
  addTemplate(e) {
    var template;
    switch (e.target.dataset.type) {
      case 'table':
        if (this.data.index == '0')
          template =
          `<table border="1">
  <tr>
    <td>标题1</td>
    <td colspan="2">标题2</td>
  </tr>
  <tr>
    <td rowspan="2">内容1</td>
    <td>内容2</td>
    <td>内容3</td>
  </tr>
  <tr>
    <td>内容4</td>
    <td>内容5</td>
  </tr>
</table>`;
        else
          template =
          `| 标题1 | 标题2 |
|:---:|:---:|
| 内容1 | [链接](https://github.com/jin-yufeng/Parser) |
| 内容2 | 内容3 |`;
        break;
      case 'list':
        if (this.data.index == '0')
          template =
          `<ol>
  <li>类型1-1</li>
  <li>类型1-2</li>
</ol>
<ol type="A" start="3" style="margin-top:5px;">
  <li>类型2-3</li>
  <li>类型2-4</li>
</ol>
<ol type="I" start="5" style="margin-top:5px;">
  <li>类型3-5</li>
  <li>类型3-6</li>
</ol>
<ul style="margin-top:10px">
  <li>层级1
    <ul>
      <li>层级2
        <ul>
          <li>层级3</li>
        </ul>
      </li>
    </ul>
  </li>
</ul>`;
        else
          template =
          `- 无序列表1
- 无序列表2
1. 有序列表1
2. 有序列表2`;
        break;
      case 'img':
        if (this.data.index == '0')
          template =
          `<style>.desc{color:gray;font-size:12px;}</style>
<div style="text-align:center;">
  <img src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo1-1.jpg?sign=4ac0a0441f2c0e3c80909c11fcc278e2&t=1560246174" />
  <p class="desc">点击图片预览</p>
  </br>
  <svg width="200" height="100">
    <circle cx="100" cy="50" r="40" stroke="#3b5b81" stroke-width="2" fill="#5aa0b3" />
  </svg>
  <p class="desc">svg 图片</p>
  </br>
  <img src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo1-3.gif?sign=22dc3b4bb766e6ec77923d1b086ba6a0&t=1582804673" width="50%" ignore />
  <p class="desc">装饰图片不能预览</p>
</div>`;
        else
          template = '![示例图片](https://6874-html-foe72-1259071903.tcb.qcloud.la/demo1-1.jpg?sign=4ac0a0441f2c0e3c80909c11fcc278e2&t=1560246174)'
        break;
      case 'a':
        if (this.data.index == '0')
          template =
          `<div style="text-align:center">
  <a href="/pages/docs/docs?index=0">
    <img src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo1-1.jpg?sign=4ac0a0441f2c0e3c80909c11fcc278e2&t=1560246174" />
  </a>
  <p style="font-size:12px;color:gray">图片链接，点击可以跳转</p>
  <br />
  <a href="https://github.com/jin-yufeng/Parser">https://github.com/jin-yufeng/Parser</a>
  <p style="color:gray;font-size:12px">外部链接，点击可以复制</p>
</div>`;
        else
          template = '[GitHub 链接](https://github.com/jin-yufeng/Parser)';
        break;
      case 'code':
        if (this.data.index == '0')
          template = '<pre><code class="language-javascript">var i = 0;</code></pre>';
        else
          template = '```javascript\nvar i = 0;\n```';
        break;
    }
    this.editor.insertText({
      text: template
    })
  },
  input(e) {
    var text = e.detail.text;
    if (text.includes('\t')) text = text.replace(/\t/g, '    ');
    if (text.includes('&')) text = text.replace(/&/g, '&amp;');
    if (text.includes('pre')) text = text.replace(/</g, '&lt;');
    // 过长内容不再高亮
    if (e.detail.text.length > 10000) {
      this.setData({
        tooLong: true
      })
    } else
      this.setData({
        tooLong: false,
        code: '<pre style="white-space:pre-wrap;word-break:break-all"><code class="language-' + (this.data.index == '0' ? 'html' : 'md') + '-editor">' + text + '</code></pre>'
      })
  },
  // 清空内容
  clear() {
    this.editor.clear();
    this.setData({
      html: ''
    })
  },
  // 进行解析
  parse() {
    this.editor.getContents({
      success: (res) => {
        var html = res.text;
        if (!html)
          return wx.showModal({
            title: '失败',
            content: '内容不能为空！',
            showCancel: false
          })
        if (this.data.index == '1')
          html = marked(html);
        this.setData({
          html
        })
        wx.pageScrollTo({
          selector: '#result'
        })
      }
    })
  },
  // 文件读取
  file() {
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      extension: ['txt', this.data.index == '0' ? 'html' : 'md'],
      success: res => {
        this.editor.insertText({
          text: wx.getFileSystemManager().readFileSync(res.tempFiles[0].path, 'utf8')
        })
        wx.pageScrollTo({
          selector: '.weui-btn-area'
        })
      }
    })
  },
  // 页面分享
  onShareAppMessage() {
    return {
      title: this.data.modes[this.data.index],
      imageUrl: 'https://6874-html-foe72-1259071903.tcb.qcloud.la/share.png?sign=1d1c1938f23a3b1d8b34818599f9f0b4&t=1560250134'
    }
  }
})