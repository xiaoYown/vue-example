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
</template>

<script>
  import './emot.scss'
  import EmotLib from './lib.vue'
  /**
    * @name Range
    * @grammar new UM.dom.Range(document)  => Range 实例
    * @desc 创建一个跟document绑定的空的Range实例
    * - ***startContainer*** 开始边界的容器节点,可以是elementNode或者是textNode
    * - ***startOffset*** 容器节点中的偏移量，如果是elementNode就是childNodes中的第几个，如果是textNode就是nodeValue的第几个字符
    * - ***endContainer*** 结束边界的容器节点,可以是elementNode或者是textNode
    * - ***endOffset*** 容器节点中的偏移量，如果是elementNode就是childNodes中的第几个，如果是textNode就是nodeValue的第几个字符
    * - ***document*** 跟range关联的document对象
    * - ***collapsed*** 是否是闭合状态
    */
  export default {
    components: {
      'emot-lib': EmotLib
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
        var range
        var start = 0 // 噶光标重设位置
        var anchor = selection.anchorNode
        if (anchor.nodeName === '#text') {
          // 如果是文本节点则先获取光标对象
          range = selection.getRangeAt(0)
          // 获取光标对象的范围界定对象，一般就是textNode对象
          var textNode = range.startContainer
          // 获取光标位置
          var rangeStartOffset = range.startOffset
          for (let i = 0, len = textNode.parentNode.childNodes.length; i < len; i++) {
            if (textNode.parentNode.childNodes[i] === textNode) {
              start = i + 2
              break
            }
          }
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
        } else if (anchor.nodeName === 'DIV') {
          let childLen = anchor.childNodes.length
          // 当光标点不在聚焦对象最后 & 聚焦对象 子对象个数为 0 时
          if (childLen > 0 && selection.anchorOffset !== childLen) {
            for (var i = 0; i < childLen; i++) {
              if (i === selection.anchorOffset) {
                start = i + 1
                anchor.insertBefore(emotImg, anchor.childNodes[i])
                break
              }
            }
          } else {
            start = childLen + 1
            anchor.appendChild(emotImg)
          }
          // 创建新的光标对象
          range = document.createRange()
        } else {
          if (anchor.nextSibling) {
            anchor.parentNode.insertBefore(anchor.nextSibling, emotImg)
          } else {
            anchor.parentNode.appendChild(emotImg)
          }
          // 创建新的光标对象
          range = document.createRange()
        }
        setTimeout(() => {
          // 光标对象的范围界定为新建的表情节点
          range.selectNodeContents(anchor)
          // 光标位置定位在表情节点的最大长度
          range.setStart(emotImg.parentNode, start)
          // range.startOffset = 1
          // 使光标开始和光标结束重叠
          range.collapse(true)
          // 清除选定对象的所有光标对象
          selection.removeAllRanges()
          // 插入新的光标对象
          selection.addRange(range)

          this.lastEditRange = selection.getRangeAt(0)
        }, 20)

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
