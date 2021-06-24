<template>
  <div class="todo">
    <form class="todo__form" @submit.prevent="handleTodoSubmit">
      <input type="text" class="todo__input" placeholder="Add todo" v-model="inputValue" />
      <button class="todo__submit">add</button>
    </form>
    <ul class="todo__list">
      <li
        class="todo__item"
        :class="{ 'todo__item--checked': todo.completed }"
        v-for="todo in todos"
        :key="todo.id"
      >
        <input type="checkbox" :checked="todo.completed" />
        <span>{{ todo.message }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Todo } from '~types/todo.interface';
import ApiClient from '../assets/ApiClient';

export default defineComponent({
  name: 'Todo',

  setup() {
    const client = new ApiClient();
    const todos = ref<Array<Todo>>([]);
    const inputValue = ref<string>('');
    const isLoading = ref<boolean>(true);

    function handleTodoSubmit() {
      if (!inputValue.value.length) return;

      const message = inputValue.value;
      todos.value.push({ message });
      inputValue.value = '';

      addTodo(message);
    }

    async function fetchTodos() {
      try {
        const results = await client.getTodos();
        todos.value = results;
      } finally {
        isLoading.value = false;
      }
    }
    async function addTodo(message: string) {
      try {
        await client.createTodo({ message, completed: false });
      } finally {
        isLoading.value = false;
      }
    }

    fetchTodos();

    return {
      todos,
      inputValue,
      isLoading,
      handleTodoSubmit,
    };
  },
});
</script>

<style lang="stylus">
@import '../styles/colors.styl'

.todo
  position: relative
  margin: 60px auto
  padding: 40px
  min-height: 500px
  max-width: 400px
  width: 100%
  border: 1px solid $border
  border-radius: 4px
  background-color: $white
  box-shadow: 0 1px 40px $shadow
  &::after,
  &::before
    position: absolute
    bottom: 0
    left: 0
    z-index: -1
    display: block
    width: 100%
    height: 50px
    border: 1px solid $border
    border-radius: 4px
    background-color: $white
    box-shadow: 0 1px 20px $shadow
    content: ' '
  &::after
    opacity: 0.9
    transform: translate3d(0, 10px, 0) scale(0.95)
  &::before
    opacity: 0.5
    transform: translate3d(0, 20px, 0) scale(0.9)

.todo__form
  display: flex
  gap: 20px

.todo__input
  flex: 1
  padding: 0.5em
  border-width: 0 0 1px 0
  border-style: solid
  border-color: $dark
  font-size: 20px

.todo__submit
  padding: 0.5em 1em
  border: 0
  border-radius: 6px
  background-color: $gray
  color: $dark
  text-transform: uppercase
  font-weight: bold
  cursor: pointer
  &:hover
    opacity: 0.9

.todo__list
  padding: 0

.todo__item
  display: flex
  align-items: center
  padding: 0.5em
  font-size: 20px
  &:not(:last-child)
    border-bottom: 1px solid $border

.todo__item [type=checkbox]
  margin-inline-end: 20px

.todo__item--checked
  opacity: 0.8
  text-decoration-style: wavy
  text-decoration-line: line-through
  text-decoration-color: $dark
</style>
