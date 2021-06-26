import fetch from 'jest-fetch-mock';
import { mount } from '@vue/test-utils';
import Todo from '@client/components/Todo.vue';
import { nextFrame } from '../../utils';

describe('Todo.vue', () => {
  let wrapper: ReturnType<typeof mount>;

  beforeEach(async () => {
    fetch.once(JSON.stringify([{ message: 'Clean my car', completed: false }]));
    wrapper = mount(Todo);
    // wait for the ui update
    await nextFrame();
  });

  afterEach(fetch.resetMocks);

  it('Given empty Todo list when there are no todos', async () => {
    // clean all fetch mocks
    fetch.resetMocks();

    // persists that results is an empty array
    fetch.once(JSON.stringify([]));

    // reinitialize again
    wrapper = mount(Todo);
    await nextFrame();

    expect(wrapper.find('ul.todo__list').exists()).toBe(true);
    expect(wrapper.findAll('ul > li').length).toBe(0);
    expect(fetch.mock.calls.length).toEqual(1);
  });

  it('Fetch Todos list from server list', () => {
    expect(wrapper.find('ul.todo__list').exists()).toBe(true);
    expect(wrapper.findAll('ul > li').length).toBe(1);
    expect(wrapper.find('ul > li').text()).toBe('Clean my car');
    expect(fetch.mock.calls.length).toEqual(1);
  });

  it('Adds new todo items', async () => {
    // Create request
    fetch.once(JSON.stringify([{ message: 'Buy some milk', completed: false }]));

    const input = wrapper.find('.todo__input');
    const button = wrapper.find('.todo__submit');

    await input.setValue('Buy some milk');
    await button.trigger('submit');

    const items = wrapper.findAll('ul > li');
    expect(items.length).toBe(2);
    expect(items[1].text()).toBe('Buy some milk');
    expect(fetch.mock.calls.length).toEqual(2);
  });

  it('Update element on toggle checkbox', async () => {
    // Update request
    fetch.once(JSON.stringify({ success: true }));

    const itemsCheckbox = wrapper.find('ul > li > [type=checkbox]');

    await itemsCheckbox.trigger('change');
    expect(fetch.mock.calls.length).toEqual(2);
  });
});
