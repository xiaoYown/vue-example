<template lang="jade">
  .xy-drag-container(
    :style="style",
    @mousedown="dragStart",
    @drag.prevent="",
    @dragstart.prevent="",
  )
    button.xy-rotate(
      @mousedown.stop="rotateStart"
    )
    span.xy-drag-resize.xy-resize-t-l(
      @mousedown.stop="resizeStart",
      @drag.prevent="",
      @dragstart.prevent="",
    )
      i( :style="cursorStyle.t_l")
    span.xy-drag-resize.xy-resize-t-c(
      @mousedown.stop="resizeStart",
      @drag.prevent="",
      @dragstart.prevent="",
    )
      i( :style="cursorStyle.t_c")
    span.xy-drag-resize.xy-resize-t-r(
      @mousedown.stop="resizeStart",
      @drag.prevent="",
      @dragstart.prevent="",
    )
      i( :style="cursorStyle.t_r")
    span.xy-drag-resize.xy-resize-m-l(
      @mousedown.stop="resizeStart",
      @drag.prevent="",
      @dragstart.prevent="",
      :style="{ 'top': axis.h/2 + 'px' }"
    )
      i( :style="cursorStyle.m_l")
    span.xy-drag-resize.xy-resize-m-r(
      @mousedown.stop="resizeStart",
      @drag.prevent="",
      @dragstart.prevent="",
      :style="{ 'top': axis.h/2 + 'px' }"
    )
      i( :style="cursorStyle.m_r")
    span.xy-drag-resize.xy-resize-b-l(
      ref="resize-b-l",
      @mousedown.stop="resizeStart",
      @drag.prevent="",
      @dragstart.prevent="",
      :style="{ 'top': axis.h + 'px' }"
    )
      i( :style="cursorStyle.b_l")
    span.xy-drag-resize.xy-resize-b-c(
      @mousedown.stop="resizeStart",
      @drag.prevent="",
      @dragstart.prevent="",
      :style="{ 'top': axis.h + 'px' }"
    )
      i( :style="cursorStyle.b_c")
    span.xy-drag-resize.xy-resize-b-r(
      @mousedown.stop="resizeStart",
      @drag.prevent="",
      @dragstart.prevent="",
      :style="{ 'top': axis.h + 'px' }"
    )
      i( :style="cursorStyle.b_r")
    span.xy-drag-resize.xy-resize-b-c(
      v-if="dragBar",
      :style="{ 'top': axis.h + 'px' }"
    )
      button.drag-btn(
        @mousedown="dragStart",
        @drag.prevent="",
        @dragstart.prevent="",
      ) D
</template>

<script>
  function reTain (num, n) {
    return Math.floor(num * Math.pow(10, n)) / Math.pow(10, n)
  }
  export default {
    props: {
      params: {
        type: Object,
        default () {
          return {
            x: 0,
            y: 0,
            h: 100,
            w: 100,
            r: 0
          }
        }
      },
      // 是否可以穿过
      cross: {
        type: Boolean,
        default: true
      },
      // 是否显示拖动元素
      dragBar: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        /* 功能状态 */
        isDrag  : false,
        isRotate: false,
        isResize: false,
        /* 数据存储 */
        axis:     {},
        axis_bf:  {},
        center: {},
        deg_op: 0,
        /* 样式存储 */
        style: {},
        /* 鼠标按下时坐标 */
        mouse: {},
        /* 距离计算坐标 */
        location: {},
        /* resizeBtn */
        resizeBtn: '',
        /* 鼠标样式 */
        cursorStyle: {}
      }
    },
    watch: {
      axis: {
        handler (newVal) {
          this.setStyle(newVal)
        },
        deep: true,
      },
    },
    created () {
      this.axis = {
        x: this.params.x,
        y: this.params.y,
        w: this.params.w,
        h: this.params.h,
        r: this.params.r
      }
      this.setCursor()
    },
    mounted () {
      document.body.addEventListener('mousemove', this.mousemove)
      document.body.addEventListener('mouseup', this.mouseup)
    },
    beforeDestroy () {
      document.body.removeEventListener('mousemove', this.mousemove)
      document.body.removeEventListener('mouseup', this.mouseup)
    },
    methods: {
      /* 提供外部调用 */
      setAxis (axis) {
        this.axis = axis
      },
      /* 组件参数渲染 */
      setStyle (axis) {
        this.style = {
          top   : axis.y + 'px',
          left  : axis.x + 'px',
          width : axis.w + 'px',
          height: this.cross ? 0 : axis.h + 'px',
          transform: 'rotate(' + axis.r + 'deg)',
          transformOrigin: axis.w/2 + 'px ' + axis.h/2 + 'px'
        }
        if( !this.cross ){
          this.style.border = '1px solid #ccc'
        }
      },
      setCursor () {
        let cursors = [
          'se-resize', 's-resize', 'sw-resize', 'w-resize', 
          'nw-resize', 's-resize', 'sw-resize', 'w-resize'
        ]
        let start = 0
        if( this.axis.r >= 337 || this.axis.r < 23 ){
          start = 0
        } else if ( this.axis.r >= 23  && this.axis.r < 68  ){
          start = 1
        } else if ( this.axis.r >= 68  && this.axis.r < 113 ){
          start = 2
        } else if ( this.axis.r >= 113 && this.axis.r < 158 ){
          start = 3
        } else if ( this.axis.r >= 158 && this.axis.r < 203 ){
          start = 4
        } else if ( this.axis.r >= 203 && this.axis.r < 248 ){
          start = 5
        } else if ( this.axis.r >= 248 && this.axis.r < 293 ){
          start = 6
        } else if ( this.axis.r >= 293 && this.axis.r < 337 ){
          start = 7
        }
        this.cursorStyle = {
          t_l: {cursor: cursors[start]},
          t_c: {cursor: cursors[(start + 1) > 7 ? (start + 1 - 8) : (start + 1)]},
          t_r: {cursor: cursors[(start + 2) > 7 ? (start + 2 - 8) : (start + 2)]},
          m_r: {cursor: cursors[(start + 3) > 7 ? (start + 3 - 8) : (start + 3)]},
          b_r: {cursor: cursors[(start + 4) > 7 ? (start + 4 - 8) : (start + 4)]},
          b_c: {cursor: cursors[(start + 5) > 7 ? (start + 5 - 8) : (start + 5)]},
          b_l: {cursor: cursors[(start + 6) > 7 ? (start + 6 - 8) : (start + 6)]},
          m_l: {cursor: cursors[(start + 7) > 7 ? (start + 7 - 8) : (start + 7)]}
        }
      },
      /* 记录鼠标位置 */
      setMouse (event) {
        let el;
        this.mouse = {
          x: event.clientX,
          y: event.clientY,
        }
        switch (this.resizeBtn) {
          case 't-r':
            el = 'b-l'
            break
        }
        if( this.$refs[`resize-${el}`] ){
          this.location = {
            x: this.$refs[`resize-${el}`].getBoundingClientRect().left,
            y: this.$refs[`resize-${el}`].getBoundingClientRect().top
          }
        }
      },
      /* 鼠标按下, 记录鼠标位置, 记录 变化前 坐标信息 */
      mosuedown (event) {
        this.setMouse(event);
        this.axis_bf = {
          x: this.axis.x,
          y: this.axis.y,
          w: this.axis.w,
          h: this.axis.h,
          r: this.axis.r
        }
      },
      /* 鼠标移动 */
      mousemove (event) {
        if( this.isDrag )   { 
          this.draging(event)
        }
        if( this.isResize ) { 
          this.resizing(event)
        }
        if( this.isRotate ) { 
          this.rotating(event)
        }
      },
      /* 鼠标松开 */
      mouseup (event) {
        if( this.isDrag )   { 
          this.dragend(event)
        }
        if( this.isResize ) { 
          this.resized(event)
        }
        if( this.isRotate ) { 
          this.rotated(event)
        }

        this.isDrag     = false
        this.isResize   = false
        this.isRotate   = false
      },
      /* 实时数据变化响应 */
      changing (axis) {
        this.setStyle(axis);
        this.$emit('changing', axis)
      },
      /* 变化最终结果响应 */
      changed (axis) {
        this.axis = axis;
        // console.log(JSON.stringify(axis))
        this.$emit('changed', axis)
        this.setCursor()
      },
      dragStart (event) {
        this.mosuedown(event)
        this.isDrag = true
      },
      resizeStart(event){
        this.resizeBtn = event.target.parentNode.className.match(/xy\-resize\-([^\s]+)(\s|$)/)[1]

        this.mosuedown(event)

        this.isResize  = true
      },
      rotateStart (event) {
        this.mosuedown(event)

        this.getCenter()

        let l_a = event.clientY - this.center.y,
            l_b = event.clientX - this.center.x;

        if( l_a < 0 && l_b >= 0 ){
          this.deg_op = Math.atan( l_b / -l_a )*180 / Math.PI
        } else if( l_a >= 0 && l_b > 0 ){
          this.deg_op = Math.atan( l_a / l_b )*180 / Math.PI + 90
        } else if(  l_a > 0 && l_b <= 0 ){
          this.deg_op = 270 - Math.atan( l_a / -l_b )*180 / Math.PI
        } else if(  l_a <= 0 && l_b < 0 ){
          this.deg_op = Math.atan( -l_a / -l_b )*180 / Math.PI + 270
        }
        this.isRotate   = true
      },
      draging (event) {
        if( event.clientX == 0 && event.clientY == 0 ) return
        let axis = {
          x: this.axis_bf.x + ( event.clientX - this.mouse.x ),
          y: this.axis_bf.y + ( event.clientY - this.mouse.y ),
          w: this.axis_bf.w,
          h: this.axis_bf.h,
          r: this.axis_bf.r
        }
        this.setAxis(axis)
        this.changing(axis)
      },
      dragend (event) {
        this.draging(event)
        this.changed(this.axis)
      },
      getCenter () {
        let center = {
          x: this.$el.offsetLeft  + this.axis.w/2,
          y: this.$el.offsetTop + 48 + this.axis.h/2
        }
        this.center = center
      },
      rotating (event) {
        if( event.clientX == 0 && event.clientY == 0 ) return

        let y_d = this.center.y - event.clientY,
            deg_ed = 0;
        if ( y_d < 0 ) {
          deg_ed = 180 - Math.atan( (event.clientX - this.center.x) / ( 0 - y_d ) ) * 180 / Math.PI
        } else {
          deg_ed = Math.atan( (event.clientX - this.center.x) / y_d ) * 180 / Math.PI
        }

        let deg = this.axis_bf.r + Math.floor(deg_ed - this.deg_op)

        this.axis.r = deg < 0 ? deg + 360 : deg >= 360 ? deg - 360 : deg

        this.changing(this.axis)
      },
      rotated () {
        this.changed(this.axis)
      },
      resizing (event) {
        // 鼠标位置与计算宽高相对点之间的距离
        let L = 0,
          // 未发生改变属性
          axis = {
            x: this.axis.x,
            y: this.axis.y,
            w: this.axis.w,
            h: this.axis.h
          },
          // 鼠标移动距离
          distance = {
            x: event.clientX - this.mouse.x,
            y: event.clientY - this.mouse.y
          },
          // x/y/w/h 变化值
          _axis = {
            x: 0,
            y: 0,
            w: 0,
            h: 0
          },
          // resize 前旋转角度与等腰三角形夹角
          deg_c = 0,
          // resizing 旋转角度与等腰三角形夹角
          deg_c_ = 0,
          // 距离计算夹角
          deg_l = 0,
          // resize 前旋转角度与等腰三角 腰 l
          z = 0,
          // resizing 旋转角度与等腰三角 腰 l
          _z = 0,
          // 发生旋转时稳定点坐标
          coord = { x: 0, y: 0 },
          // 发生旋转时不稳定点坐标
          _coord = { x: 0, y: 0 }

        switch (this.resizeBtn) {
          case 't-l':

            break
          case 't-c':

            break
          case 't-r':
            // 鼠标 - 静止点 距离
            L = Math.sqrt(Math.pow(event.clientX - this.location.x, 2) + Math.pow(event.clientY - this.location.y, 2))
            deg_l = (Math.acos(Math.abs(event.clientX - this.location.x) / L) * 180 / Math.PI - this.axis.r) * Math.PI / 180
            distance.x = Math.cos(deg_l) * L
            distance.y = Math.sin(deg_l) * L
            if (distance.x > distance.y || Math.abs(distance.x) > Math.abs(distance.y)) {
              axis.w = distance.x
              axis.h = distance.x
            } else {
              axis.w = distance.y
              axis.h = distance.y
            }
            axis.w = axis.w > 0 ? axis.w : 0
            axis.h = axis.h > 0 ? axis.h : 0
            axis.y = this.axis_bf.y + this.axis_bf.h - axis.h
            break
          case 'm-r':
            if (this.axis.r >= 0 && this.axis.r < 45) {
              _axis.w = distance.x / Math.cos(this.axis.r * Math.PI / 180)
            } else if (this.axis.r >= 45 && this.axis.r < 9) {
              _axis.w = distance.y / Math.sin(this.axis.r * Math.PI / 180)
            } else if (this.axis.r >= 90 && this.axis.r < 135) {
              _axis.w = distance.y / Math.sin(this.axis.r * Math.PI / 180)
            } else if (this.axis.r >= 135 && this.axis.r < 180) {
              _axis.w = distance.x / Math.cos(this.axis.r * Math.PI / 180)
            } else if (this.axis.r >= 180 && this.axis.r < 225) {
              _axis.w = distance.x / Math.cos(this.axis.r * Math.PI / 180)
            } else if (this.axis.r >= 225 && this.axis.r < 270) {
              _axis.w = distance.y / Math.sin(this.axis.r * Math.PI / 180)
            } else if (this.axis.r >= 270 && this.axis.r < 315) {
              _axis.w = distance.y / Math.sin(this.axis.r * Math.PI / 180)
            } else if (this.axis.r >= 315 && this.axis.r < 360) {
              _axis.w = distance.x / Math.cos(this.axis.r * Math.PI / 180)
            }

            axis.w = this.axis_bf.w + _axis.w

            if (axis.w < 0) {
              axis.w = 0
            }

            if (this.axis.r !== 0) {
              deg_c = Math.atan(this.axis_bf.h / this.axis_bf.w) + this.axis.r * Math.PI / 180
              deg_c_ = Math.atan(this.axis.h / this.axis.w) + this.axis.r * Math.PI / 180
              z = Math.sqrt((Math.pow(this.axis_bf.h, 2) + Math.pow(this.axis_bf.w, 2)) / 4)
              _z = Math.sqrt((Math.pow(this.axis.h, 2) + Math.pow(this.axis.w, 2)) / 4)

              coord = {
                x: this.axis_bf.x + this.axis_bf.w / 2 - z * Math.cos(deg_c),
                y: this.axis_bf.y + this.axis_bf.h / 2 - z * Math.sin(deg_c)
              }
              _coord = {
                x: this.axis.x + this.axis.w / 2 - _z * Math.cos(deg_c_),
                y: this.axis.y + this.axis.h / 2 - _z * Math.sin(deg_c_)
              }
              _axis = {
                x: coord.x - _coord.x,
                y: coord.y - _coord.y
              }
              axis.x = this.axis.x + _axis.x
              axis.y = this.axis.y + _axis.y
            }
            break
        }
        axis.x = reTain(axis.x, 2)
        axis.w = reTain(axis.w, 2)
        axis.y = reTain(axis.y, 2)
        axis.h = reTain(axis.h, 2)
        axis.r = this.axis.r

        this.setAxis(axis)

        this.changing(axis)
      },
      resized (event) {
        let axis = {
          x: this.axis.x,
          y: this.axis.y,
          w: this.axis.w,
          h: this.axis.h,
          r: this.axis.r
        }
        this.changed(axis)
      }
    }
  }
</script>

<style lang="sass">
  .xy-drag-container{
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    height: 100px;
    box-sizing: border-box;
    cursor: move;
  }
  .xy-drag-resize{
    position: absolute;
    width:  0px;
    height: 0px;
    i{
      display: inline-block;
      box-sizing: border-box;
      vertical-align: top;
      border: 1px solid #999;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      margin: -6px 0 0 -5px; 
      background-color: #fff;
    }
    .drag-btn{
      width:  24px;
      height: 24px;
      text-align: center;
      background: #fff;
      border-radius: 50%;
      border: 1px solid #ccc;
      margin: 10px 0 0 -12px;
      cursor: move;
    }
  }
  .xy-resize-t-l{
    top: 0;
    left: 0;
    i{ cursor: nw-resize; }
  }
  .xy-resize-t-c{
    top: 0;
    left: 50%;
    i{ cursor: n-resize; }
  }
  .xy-resize-t-r{
    top: 0;
    right: 0;
    i{ cursor: ne-resize; }
  }
  .xy-resize-m-l{
    top: 50%;
    left: 0;
    i{ cursor: e-resize; }
  }
  .xy-resize-m-r{
    top: 50%;
    right: 0;
    i{ cursor: e-resize; }
  }
  .xy-resize-b-l{
    bottom: 0;
    left: 0;
    i{ cursor: sw-resize; }
  }
  .xy-resize-b-c{
    bottom: 0;
    left: 50%;
    i{ cursor: n-resize; }
  }
  .xy-resize-b-r{
    bottom: 0;
    right: 0;
    i{ cursor: se-resize; }
  }
  .xy-rotate{
    position: absolute;
    top: -60px;
    left: 50%;
    margin-left: -20px;
    width: 40px;
    height: 40px;
    border: 1px solid #999;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: #fff;
  }
  .box{
    position: absolute;
    top: 300px;
    left: 300px;
    width: 300px;
    height: 300px;
    background-color: #56aaff;
  }
</style>
