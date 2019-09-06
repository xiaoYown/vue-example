export default {
  props: {
    data: String,
    render: Function
  },
  render (hyperscript) {
    // hyperscript 必须传递, 否则无法解析 jsx
    return this.render(hyperscript, this.data);
  }
};
