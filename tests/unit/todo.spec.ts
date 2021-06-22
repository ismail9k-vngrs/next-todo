import { shallowMount } from '@vue/test-utils';
import ToDo from '@/components/ToDo.vue';

describe('ToDo.vue', () => {
  let wrapper: any = null;
  beforeEach(() => {
    wrapper = shallowMount(ToDo);
  });

  it('Given empty ToDo list', () => {
    expect(wrapper.find('ul.todo__list').exists()).toBe(true);
    expect(wrapper.findAll('ul > li').length).toBe(0);
  });
});
