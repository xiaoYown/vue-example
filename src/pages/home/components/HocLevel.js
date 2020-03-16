export default {
  props: {
    level: Number,
  },
  render () {
    /* hyperscript */
    /* eslint-disable */
    const TAG = `h${this.level}`;
    return <TAG>{ this.$slots.default }</TAG>;
    // 调用 hyperscript(原 createElement) 生成元素
    // return hyperscript('h1', {
    //   on: {
    //     click () {
    //       console.log('click');
    //     }
    //   },
    //   attr: {
    //     data: 'word'
    //   }
    // }, [hyperscript('span', {}, 'hello !')]);
  },
};
