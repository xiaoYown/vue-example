import { shallowMount } from '@vue/test-utils';
import Test from '@/components/Test.vue';

describe('Test.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(Test, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg + ' world!');
  });
  // it('renders props.bool when passed', () => {
  //   const bool = true;
  //   const wrapper = shallowMount(Test, {
  //     propsData: { bool },
  //   });
  //   expect(wrapper.vm.bool).toBeTruthy;
  //   // 测试方法调用
  //   wrapper.vm.close();
  //   expect(wrapper.vm.bool).toBeTruthy;
  //   // 测试事件发送
  //   expect(wrapper.emmitted()['event-name']).toBeFalsy;
  // });
  // it('测试点击事件 能否触发子组件调用', () => {
  //   let fn = jest.fn();
  //   const wrapper = shallowMount(Test, {
  //     propsData: {
  //       lazyLoad: fn
  //     },
  //   });
  //   // 交互测试
  //   wrapper.find('.title').trigger('click');
  // });
});

// describe('Test.vue', () => {
//   it('renders props.msg when passed', () => {
//     const Sub = Vue.extend(Test);
//     const vm = new Sub({
//       propsData: {
//         msg: 'Hello'
//       }
//     });
//     vm.$mount();
//     expect(vm.$el.innerHTML).toContain('Hello world!');
//   });
// });
