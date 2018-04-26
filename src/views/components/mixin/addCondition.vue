<template lang="jade">
  section.p-add_cdt(
    :style="style",
    @click.stop=""
  )
    .p-add_cdt-wrap
      .p-add_cdt-close(@click="cancel('close')") ×
      .p-add_cdt-head 添加条件
      .p-add_cdt-ct
        h4.p-add_cdt-field 字段：
          span {{ field }}
        .p-add_cdt-related(
          v-for="cdt, index in pList",
          v-if="index < 3",
          :key="index"
        )
          .p-add_cdt-connection(v-if="index > 0")
            label
              global-radio(
                :name="'cdt_' + index",
                :mark="'and_' + index",
                :checked="cdt.connection === 'and'",
                @change="connectionChange"
              )
              span 并且
            label
              global-radio(
                :name="'cdt_' + index",
                :mark="'or_' + index",
                :checked="cdt.connection === 'or'",
                @change="connectionChange"
              )
              span 或者
          global-select(
            :name="index",
            :width="140",
            :zIndex="4 - index",
            :list="pSelectList",
            :selected="cdt.select",
            @select="selectChange"
          )
          global-select-input(
            :mark="index",
            :width="189",
            :zIndex="4 - index",
            :list="valueList",
            :value="cdt.values",
            :type="cdt.user",
            @select="valueChange",
            @enter="valueChange"
          )
          global-btn(
            :text="'删除'",
            :width="50",
            :height="26",
            :type="'fill'",
            @click="del(index)"
          )
        .p-add_cdt-push(v-if="pList.length < 3")
          global-btn(
            :type="'ghost'",
            :text="'添加条件'",
            @click="add"
          )
      .p-add_cdt-operate
        global-btn(
          :text="'取消'",
          :height="26",
          :type="'ghost'",
          @click="cancel('cancel')"
        )
        global-btn(
          :text="'保存'",
          :height="26",
          @click="save"
        )
</template>

<script>
  export default {
    name: 'add-condition',
    props: {
      zIndex: [Number, String],
      right: [Number, String],
      left: [Number, String],
      field: String,
      valueList: {
        type: Array,
        default () {
          return [
            {
              id: '1',
              txt: '登录名'
            }
          ]
        }
      },
      list: {
        type: Array,
        default () {
          return [
            {
              select: 'eq',
              values: '1',
              connection: 'and'
            }
          ]
        }
      }
    },
    computed: {
      style () {
        return {
          zIndex: this.zIndex,
          right: typeof this.right === 'number' ? this.right + 'px' : this.right,
          left: typeof this.left === 'number' ? this.left + 'px' : this.left
        }
      }
    },
    data () {
      return {
        pSelectList: [
          { id: 'eq', txt: '等于' },
          { id: 'ne', txt: '不等于' },
          { id: 'gt', txt: '大于' },
          { id: 'lt', txt: '小于' },
          { id: 'ge', txt: '大于等于' },
          { id: 'le', txt: '小于等于' },
          { id: 'isin', txt: '包含' },
          { id: 'notin', txt: '不包含' },
          { id: 'start', txt: '以...开头' },
          { id: 'end', txt: '以...结尾' }
        ],
        pList: []
      }
    },
    created () {
      this.pList = JSON.parse(JSON.stringify(this.list))
      window.addEventListener('click', this.close)
    },
    beforeDestroy () {
      window.removeEventListener('click', this.close)
    },
    methods: {
      del (index) {
        this.pList.splice(index, 1)
      },
      add () {
        if (this.pList.length < 3) {
          let item = {
            select: 'eq',
            values: '1',
            connection: 'and',
            user: 0
          }
          this.pList.push(item)
        }
      },
      connectionChange (data) {
        if (data.checked) {
          let connection = data.mark.split('_')[0]
          let index = parseInt(data.mark.split('_')[1])
          this.pList[index].connection = connection
        }
      },
      selectChange (data) {
        this.pList[data.name].select = data.id
      },
      /**
       * 赋值条件类型:
       * @param {Object} data - data.type:
       *    0: 直接使用 value 作为筛选条件
       *    1: 使用用户昵称作为筛选条件
       *    2: 使用自定义条件作为筛选条件
       */
      valueChange (data) {
        switch (data.type) {
          case 0:
            this.pList[data.mark].values = data.value
            break
          case 1:
            this.pList[data.mark].values = data.txt
            break
          case 2:
            this.pList[data.mark].values = data.txt
            break
          default:
            console.warn('type error')
        }
        this.$set(this.pList[data.mark], 'user', data.type)
      },
      save () {
        this.$emit('save', {
          data: JSON.parse(JSON.stringify(this.pList))
        })
      },
      close () {
        this.cancel('close')
      },
      cancel (status) {
        this.$emit('cancel', {
          status
        })
      }
    }
  }
</script>

<style lang="sass">
  @import '../../../assets/sass/theme';

  .p-add_cdt {
    position: absolute;
    width: 510px;
    height: 360px;
    border: 1px solid #dce0e9;
    line-height: normal;
    background-color: #fff;
    box-shadow: 0 1px 3px 0 rgba($std_sub_3, .6);
    &-close {
      position: absolute;
      right: 18px;
      top: 8px;
      color: #bcbeca;
      font-size: 26px;
      cursor: pointer;
    }
    &-head {
      height: 49px;
      font-size: 14px;
      line-height: 54px;
      padding-left: 50px;
      border-bottom: 1px solid #dce0e9;
    }
    &-field {
      font-size: 12px;
      line-height: 49px;
    }
    // 内容
    &-ct {
      padding: 0 50px;
    }
    &-push {
      padding-top: 14px;
      text-align: center;
    }
    &-connection {
      height: 40px;
      font-size: 0;
      line-height: 40px;
      text-align: center;
      .global__radio {
        vertical-align: middle;
        padding: 0 3px 0 6px;
      }
      span {
        display: inline-block;
        vertical-align: middle;
        font-size: 12px;
      }
    }
    &-operate {
      position: absolute;
      bottom: 25px;
      right: 50px;
    }
    // 保存/取消 操作
    &-operate {
      text-align: right;
    }
    // 调用的组件样式影响
    .global__select,
    .p-select_input,
    .global__btn {
      display: inline-block;
      vertical-align: top;
      margin: 0 0 0 10px;
    }
  }
</style>
