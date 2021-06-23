import { mount } from '@vue/test-utils';
import Todo from '@client/components/Todo.vue';

describe('Todo.vue', () => {
  let wrapper: ReturnType<typeof mount>;
  beforeEach(() => {
    wrapper = mount(Todo);
  });

  it('Given empty Todo list', () => {
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

  it('Adds new todo items', async () => {
    const input = wrapper.find('.todo__input');
    const button = wrapper.find('.todo__submit');

    await input.setValue('buy some milk');
    await button.trigger('click');

    const items = wrapper.findAll('ul > li');
    expect(items.length).toBe(1);
    expect(items[0].text()).toBe('buy some milk');
  });
});