<template lang="jade">
  .emot(ref="wrap",:class="{size_l: size === 'l'}")
    .emot_area(@mousedown.stop="")
      .emot_shadow(v-html="html")
      .emot_pre(
        ref="pre",
        @click="setLastRange",
        @keyup="setLastRange",
        @input="setShadow",
        contenteditable="true"
      )
      
    .emot_msg
      emot-lib(@select="chooseEmot")
      // p.emot_send(@click="reply") 发送
</template>

<script>
  require('./emot.scss')

  export default {
    components: {
      'emot-lib': require('./lib.vue')
    },
    props: {
      size: String
    },
    data () {
      return {
        html: '',
        lastEditRange: null
      }
    },
    methods: {
      chooseEmot (em) {
        var src = '/static/em/' + em.replace(/\[|\]/g, '') + '.gif'
        var selection = window.getSelection()

        if (this.lastEditRange) {
          // 存在最后光标对象，选定对象清除所有光标并添加最后光标还原之前的状态
          selection.removeAllRanges()
          selection.addRange(this.lastEditRange)
        }

        var emotImg = document.createElement('img')
        emotImg.src = src
        emotImg.className = 'emot_cp'
        // console.log(selection)
        // console.log(selection.anchorNode)
        var anchor = selection.anchorNode
        if (anchor.nodeName === '#text') {
          // 如果是文本节点则先获取光标对象
          var range = selection.getRangeAt(0)
          // 获取光标对象的范围界定对象，一般就是textNode对象
          var textNode = range.startContainer
          // 获取光标位置
          var rangeStartOffset = range.startOffset
          var text = textNode.textContent
          var part1 = text.substring(0, rangeStartOffset)
          var part2 = text.substring(rangeStartOffset, text.length)
          var textNode1 = document.createTextNode(part1)
          var textNode2 = document.createTextNode(part2)
          var parent = textNode.parentNode
          parent.insertBefore(textNode1, textNode)
          parent.insertBefore(emotImg, textNode)
          parent.insertBefore(textNode2, textNode)
          parent.removeChild(textNode)
          // 文本节点在光标位置处插入新的表情内容
          // edit.appendChild(emotImg)
          // 光标移动到到原来的位置加上新内容的长度
          range = selection.getRangeAt(0)
          // range.setStart(textNode, rangeStartOffset + 1)
          // 光标开始和光标结束重叠
          // range.collapse(true)
          // 清除选定对象的所有光标对象
          // selection.removeAllRanges()
          // 插入新的光标对象
          // selection.addRange(range)
        } else if (anchor.nodeName === 'DIV') {
          if (anchor.childNodes.length > 0) {
            for (var i = 0; i < anchor.childNodes.length; i++) {
              if (i === selection.anchorOffset) {
                anchor.insertBefore(emotImg, anchor.childNodes[i])
              }
            }
            // anchor.insertBefore(emotImg, anchor.firstChild)
          } else {
            anchor.appendChild(emotImg)
          }
        }

        // this.lastEditRange = selection.getRangeAt(0)
      },
      setLastRange () {
        // 获取选定对象
        var selection = window.getSelection()
        // 设置最后光标对象
        this.lastEditRange = selection.getRangeAt(0)
      },
      setShadow () {
        this.html = this.$refs.pre.innerHTML
      }
    }
  }
</script>
