export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    bool: Boolean,
  },
  mehtods: {
    close() {
      this.bool = false;
    },
  },
  render () {
    return <div class="Test">{{ msg }} world!</div>
  }
};
