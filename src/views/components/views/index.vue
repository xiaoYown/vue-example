<template lang="jade">
  .wrap-components
    .ui-components-wrap
      xy-switch(
        :open="switchOpen",
        @open-change="openChange"
      )
        p.inline {{ switchOpen }}
    .ui-components-wrap
      xy-range(
        :percent="rangeNum",
        :min="rangParam.min",
        :max="rangParam.max",
        :unit="rangParam.unit",
        :val="rangParam.val",
        @range-change="rangeChange"
      )
      p {{ rangeNum }}
    .ui-components-wrap
      xy-select(
        :list="selectList",
        @select-change="selectChange"
      )
    .ui-components-wrap
      ul.pages-demo
        li(v-for="item in pagesListShow") {{ item }}
      xy-pages(
        :info="pagesInfo",
        @page-link="pageLink"
      )
    .ui-components-wrap
      xy-button(
        :size="'small'",
        @click="showModal = true"
      ) 删除
      xy-button(
        :type="'success'",
        @click="showModal = true"
      ) 删除
      xy-button(
        :size="'large'",
        :type="'warning'",
        @click="showModal = true"
      ) 删除
      xy-button(
        :type="'danger'",
        @click="showModal = true"
      ) 删除
      xy-button(
        disabled="true",
        @click="showModal = true"
      ) 删除
      transition(name="fade")
        xy-modal-confirm(
          v-if="showModal",
          :message="'确定删除数据集, 删除后将无法恢复'",
          @confirm="confirm"
        )
    .ui-components-wrap
      xy-button(
      ) loading
      // xy-loading
    .ui-components-wrap
      xy-emot
    .ui-components-wrap
      el-global
    .ui-components-wrap
      h4 全局弹窗(use 方式)
      div
        button(@click="xyPopup('alert')") alert
        | &nbsp;
        button(@click="xyPopup('confirm')") confirm
        | &nbsp;
        button(@click="xyPopup('prompt')") prompt
</template>

<script>
  require('sass/base.scss')
  
  const jquery = r => require.ensure([], () => r(require('jquery')), 'jquery')
  console.log(jquery)

  export default {
    name: 'xy-ui',
    components: {
      'xy-switch': require('components/ui/switch.vue'),
      'xy-range': require('components/ui/range.vue'),
      'xy-select': require('components/ui/select.vue'),
      'xy-pages': require('components/ui/pages.vue'),
      'xy-modal-confirm': require('components/modal/confirm.vue'),
      'xy-button': require('components/button/index.vue'),
      'xy-loading': require('components/loading/loading.vue'),
      'xy-emot': require('components/emot/emot.vue')
    },
    data () {
      return {
        switchOpen: true,
        rangeNum: 0.5,
        rangParam: {
          min: 0,
          max: 100,
          unit: 1,
          val: 50
        },
        selectList: [
          {
            id: '1',
            ct: '1111',
            checked: false
          }, {
            id: '2',
            ct: '2222',
            checked: false
          }, {
            id: '3',
            ct: '333',
            checked: false
          }, {
            id: '4',
            ct: '4444',
            checked: false
          }
        ],
        pagesList: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
        pagesInfo: {
          page: 1,
          pages: 10,
          pageSize: 10
        },
        pagesListShow: [],
        showModal: false
      }
    },
    created () {
      this.pageLink(this.pagesInfo)
    },
    methods: {
      openChange (bool) {
        this.switchOpen = bool
      },
      rangeChange (range) {
        this.rangeNum = range
      },
      selectChange (id) {
        console.log(id)
      },
      // pagesInfo 处理 , 主要为获取 pages
      pageLink (data) {
        this.pagesInfo.page = data.page
        this.pagesInfo.pageSize = data.pageSize
        let isInt = this.pagesList.length % data.pageSize === 0
        let pages = Math.floor(this.pagesList.length / data.pageSize)

        this.pagesInfo.pages = isInt ? pages : pages + 1
        this.pagesListChange(data)
      },
      // 列表获取
      pagesListChange (data) {
        let start = (this.pagesInfo.page - 1) * this.pagesInfo.pageSize
        this.pagesListShow = this.pagesList.slice(start, start + this.pagesInfo.pageSize)
      },
      confirm (data) {
        this.showModal = false
      },
      xyPopup (type) {
        if (type === 'alert') {
          this.$popup({
            type: 'alert',
            title: '提示',
            content: '您的信息有误'
          })
        } else if (type === 'confirm') {
          this.$popup({
            type: 'confirm',
            title: '提示',
            content: '确认删除',
            cb: (res) => {
              console.log(res)
              this.$closePopup()
            }
          })
        } else if (type === 'prompt') {
          this.$popup({
            type: 'prompt',
            title: '请输入内容',
            placeholder: '仅支持中文',
            cb: (res) => {
              console.log(res)
              this.$closePopup()
            }
          })
        }
      }
    }
  }
</script>

<style lang="sass">
  .wrap-components{
    position: absolute;
    top: 48px;
    bottom: 0;
    left: 0;
    right: 0;
    
    .inline{
      vertical-align: middle;
      margin-left: 10px;
    }
  }
  .ui-components-wrap{
    padding: 20px;

    .xy-range-wrap{
      width: 200px;
    }
    .pages-demo{
      li{
        display: inline-block;
        vertical-align: top;
        margin-right: 6px;
      }
    }
    [class^=xy-button] {
      margin-right: 10px;
    }
  }
</style>
