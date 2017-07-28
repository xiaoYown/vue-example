<template lang="jade">
  .xy__socket
    #chat.xy__socket-chat(ref="chat")
      .xy__socket-chat_item(
        v-for="item in chatCord",
        :class="{self: item.self}"
      )
        h4.xy__socket-guest(v-if="item.name") {{ item.name }}
        .xy__socket-chat_ctx
          {{ item.msg }}
    .xy__socket-bar
      input.xy__socket-msg(v-model="msg",@focus="bindEnter",@blur="remEnter")
      span.xy__socket-send(@click="send") send
</template>

<script>
  export default {
    data () {
      return {
        id: '',
        chatCord: [],
        msg: ''
      }
    },
    computed: {
      name () {
        return this.$store.state.user.userInfo.name
      }
    },
    sockets: {
      connect (res) {
        console.log(res)
        this.id = this.$socket.id
      },
      customEmit (val) {
        console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
      }
    },
    created () {
      this.$options.sockets['new message'] = this.newMessage
      this.$options.sockets['self_new message'] = this.newMessageSelf
    },
    methods: {
      send () {
        if (!this.msg) return
        this.$socket.emit('new message', {
          name: this.name,
          msg: this.msg
        })
      },
      newMessage (data) {
        this.addMsg({
          self: false,
          msg: data.msg,
          name: data.name
        })
      },
      newMessageSelf (data) {
        this.msg = ''
        this.addMsg({
          self: true,
          msg: data.msg
        })
      },
      addMsg (data) {
        this.chatCord.push(data)
      },
      bindEnter () {
        window.addEventListener('keyup', this.enter)
      },
      remEnter () {
        window.removeEventListener('keyup', this.enter)
      },
      enter (event) {
        if (event.keyCode === 13) {
          this.send()
        }
      }
    }
  }

</script>

<style lang="sass">
  .xy__socket {
    position: relative;
    width: 300px;
    height: 480px;
    border: 1px solid #d9d9d9;
    margin: 20px auto;
    &-chat {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 31px;
      left: 0;
      padding-bottom: 6px;
      overflow-y: auto;
      &::-webkit-scrollbar{
        width: 4px;
        height: 8px;
        background-color: #d8e1f9;
      }
      &::-webkit-scrollbar-thumb{
        border-radius: 8px;
        background-color: rgba(0,0,0,.6);
      }
      &_item {
        text-align: left;
        margin-top: 10px;
        padding-left: 6px;
        &.self {
          padding-right: 6px;
          text-align: right;
          .xy__socket-chat_ctx {
            border-color: #56aaff;
          }
        }
      }
      &_ctx {
        display: inline-block;
        max-width: 90%;
        padding: 4px 6px;
        border: 1px solid #e9e9e9;
        border-radius: 3px;
      }
    }
    &-guest {
      padding-left: 6px;
      color: #666;
    }
    &-bar {
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
      height: 30px;
      border-top: 1px solid #d9d9d9;
      line-height: 30px;
    }
    &-msg {
      position: absolute;
      top: 2px;
      bottom: 2px;
      left: 2px;
      width: 250px;
      padding: 4px;
      box-shadow: 0 0 4px #c9c9c9 inset;
      border-radius: 3px;
    }
    &-send {
      position: absolute;
      right: 0;
      background-color: #56aaff;
      color: #fff;padding: 0 6px;
      cursor: pointer;
    }
  }
</style>
