import { mount } from '@vue/test-utils';
import Todo from '@client/components/Todo.vue';
import { nextFrame } from '../../utils';

describe('Todo.vue', () => {
  let wrapper: ReturnType<typeof mount>;

  beforeEach(async () => {
    wrapper = mount(Todo);
    // wait for the ui update
    await nextFrame();
  });

  it('Given empty todo list', () => {
    expect(wrapper.find('ul.todo__list').exists()).toBe(true);
    expect(wrapper.findAll('ul > li').length).toBe(0);
  });

  it('Has text input', () => {
    const input = wrapper.find('input.todo__input');
    expect(input.exists()).toBe(true);
    expect(input.attributes('type')).toBe('text');
  });

  it('Has submit button', () => {
    const button = wrapper.find('.todo__submit');
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe('add');
  });

  it('Has loader element', () => {
    const loader = wrapper.find('.todo__loader');
    expect(loader.exists()).toBe(true);
  });
});
