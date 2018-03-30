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
        | &nbsp;
        button(@click="cmpPopup('alert')") alert
    .ui-components-wrap
      #picker 选择
    .ui-components-wrap
      div(style="height: 20px;background: #efefef;")
        .upload--inner(:style="uploadProgress") {{ percentShow }}
    xy-popup(
      v-show="popupType",
      ref="xyPopup"
    )
</template>

<script>
  import config from 'config/config'

  import XySwitch from '@/components/ui/switch.vue'
  import XyRange from '@/components/ui/range.vue'
  import XySelect from '@/components/ui/select.vue'
  import XyPages from '@/components/ui/pages.vue'
  import XyConfirm from '@/components/modal/confirm.vue'
  import XyButton from '@/components/button/index.vue'
  import XyLoading from '@/components/loading/loading.vue'
  import XyEmot from '@/components/emot/emot.vue'
  import XyPopup from '@/tools/vue-popup/main.vue'
  // import WebUploader from 'webuploader'
  // const WebUploader = resolve => require.ensure([], () => resolve(require('webuploader')), 'webuploader')
  // async function getWebUploader () {
  //   let w = await require.ensure([], (require) => require('webuploader'), 'webuploader')
  //   return w
  // }

  export default {
    name: 'xy-ui',
    components: {
      'xy-switch': XySwitch,
      'xy-range': XyRange,
      'xy-select': XySelect,
      'xy-pages': XyPages,
      'xy-modal-confirm': XyConfirm,
      'xy-button': XyButton,
      'xy-loading': XyLoading,
      'xy-emot': XyEmot,
      'xy-popup': XyPopup
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
        showModal: false,
        popupType: '',
        uploadProgress: {
          width: 0
        },
        percentShow: '0%',
        webUploaderLoaded: false
      }
    },
    created () {
      this.pageLink(this.pagesInfo)
      console.log(this.$webUploader)
    },
    mounted () {
      this.bindWebUploader()
      // this.uploadOn()
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
        console.log(data)
        let start = (this.pagesInfo.page - 1) * this.pagesInfo.pageSize
        this.pagesListShow = this.pagesList.slice(start, start + this.pagesInfo.pageSize)
      },
      confirm (data) {
        console.log(data)
        this.showModal = false
      },
      /* popup 组件全局使用方法 */
      xyPopup (type) {
        switch (type) {
          case 'alert':
            this.$popup({
              type: 'alert',
              title: '提示',
              content: '您的信息有误',
              cb: (res) => {
                console.log(res)
                this.$closePopup()
              }
            })
            break
          case 'confirm':
            this.$popup({
              type: 'confirm',
              title: '提示',
              content: '确认删除',
              cb: (res) => {
                console.log(res)
                this.$closePopup()
              }
            })
            break
          case 'prompt':
            this.$popup({
              type: 'prompt',
              title: '请输入内容',
              placeholder: '仅支持中文',
              cb: (res) => {
                console.log(res)
                this.$closePopup()
              }
            })
            break
        }
      },
      /* popup 组件局部引入使用方法 */
      cmpPopup (type) {
        this.popupType = type
        switch (type) {
          case 'alert':
            this.$refs.xyPopup.show(type, {
              type: 'alert',
              title: '提示',
              content: '您的信息有误',
              cb (status) {
                console.log(status)
                this.close()
              }
            })
            break
        }
      },
      // 绑定 uploader 组件
      bindWebUploader () {
        if (this.$webUploader && !this.webUploaderLoaded) {
          this._uploadOn()
          this.webUploaderLoaded = 1
        } else if (!this.webUploaderLoaded) {
          setTimeout(this.bindWebUploader.bind(this), 100)
        }
      },
      // 使用全局
      _uploadOn () {
        var taskId = this.$webUploader.Base.guid() // 产生文件唯一标识符task_id
        var uploader = this.$webUploader.create({
          server: config.apiUrl + '/file/upload_file', // 上传分片地址
          pick: '#picker',
          auto: true,
          chunked: true,
          chunkSize: 20 * 1024 * 1024,
          chunkRetry: 3,
          threads: 1,
          duplicate: true,
          formData: { // 上传分片的http请求中一同携带的数据
            task_id: taskId
          }
        })
        uploader.on('startUpload', function () { // 开始上传时，调用该方法
          console.log('start')
        })
        uploader.on('uploadProgress', (file, percentage) => { // 一个分片上传成功后，调用该方法
          console.log(percentage)
          this.setPercent(percentage)
        })
        uploader.on('uploadSuccess', file => { // 整个文件的所有分片都上传成功后，调用该方法
          this.setPercent(1.01)
          var data = {
            'task_id': taskId,
            'ext': file.source['ext'],
            'type': file.source['type']
          }
          this.$http.get(config.apiUrl + '/file/upload_merge', {
            params: { ...data }
          })
            .then(res => {
              console.log(res)
            }, err => {
              console.log(err)
            })
        })
        uploader.on('uploadError', function (file) { // 上传过程中发生异常，调用该方法
          console.log('error', file)
        })
        uploader.on('uploadComplete', function (file) { // 上传结束，无论文件最终是否上传成功，该方法都会被调用
          console.log('end', file)
        })
      },
      // 直接异步绑定
      // uploadOn () {
      //   getWebUploader().then(WebUploader => {
      //     var taskId = WebUploader.Base.guid() // 产生文件唯一标识符task_id
      //     var uploader = WebUploader.create({
      //       server: config.apiUrl + '/file/upload_file', // 上传分片地址
      //       pick: '#picker',
      //       auto: true,
      //       chunked: true,
      //       chunkSize: 20 * 1024 * 1024,
      //       chunkRetry: 3,
      //       threads: 1,
      //       duplicate: true,
      //       formData: { // 上传分片的http请求中一同携带的数据
      //         task_id: taskId
      //       }
      //     })
      //     uploader.on('startUpload', function () { // 开始上传时，调用该方法
      //       console.log('start')
      //     })
      //     uploader.on('uploadProgress', (file, percentage) => { // 一个分片上传成功后，调用该方法
      //       console.log(percentage)
      //       this.setPercent(percentage)
      //     })
      //     uploader.on('uploadSuccess', file => { // 整个文件的所有分片都上传成功后，调用该方法
      //       this.setPercent(1.01)
      //       var data = {
      //         'task_id': taskId,
      //         'ext': file.source['ext'],
      //         'type': file.source['type']
      //       }
      //       this.$http.get(config.apiUrl + '/file/upload_merge', {
      //         params: { ...data }
      //       })
      //         .then(res => {
      //           console.log(res)
      //         }, err => {
      //           console.log(err)
      //         })
      //     })
      //     uploader.on('uploadError', function (file) { // 上传过程中发生异常，调用该方法
      //       console.log('error')
      //     })
      //     uploader.on('uploadComplete', function (file) { // 上传结束，无论文件最终是否上传成功，该方法都会被调用
      //       console.log('end')
      //     })
      //   })
      // },
      setPercent (percent) {
        let percentage = Math.floor(percent * 100) - 1
        percentage = percentage < 0 ? 0 : percentage > 100 ? 100 : percentage
        this.percentShow = percentage + '%'
        this.uploadProgress = {
          width: this.percentShow
        }
      },
      uploadOff () {
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
  .upload--inner {
    height: 100%;
    color: #fff;
    text-align: center;
    background: #56aaff;
  }
</style>
