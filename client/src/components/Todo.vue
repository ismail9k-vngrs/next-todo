<template>
  <div class="todo">
    <div class="todo__loader" v-show="isLoading"></div>
    <form class="todo__form" @submit.prevent="handleTodoSubmit">
      <input type="text" class="todo__input" placeholder="Add todo" v-model="inputValue" />
      <button class="todo__submit">add</button>
    </form>
    <ul class="todo__list">
      <li
        class="todo__item"
        :class="{ 'todo__item--checked': todo.completed }"
        v-for="todo in todos"
        :key="todo._id"
      >
        <input
          type="checkbox"
          :checked="todo.completed"
          @change="($event) => handleTodoUpdate(todo._id, $event)"
        />
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

    async function handleTodoSubmit() {
      if (!inputValue.value.length) return;

      // Update client for instant feedback
      const message = inputValue.value;
      todos.value.push({ message });
      inputValue.value = '';

      // Create server data
      await addTodo(message);
    }

    async function handleTodoUpdate(id: string, event: Event) {
      const { checked } = event.target as HTMLInputElement;

      await updateTodo(id, { completed: checked });
    }

    async function handleTodoRemove(id: string) {
      await client.removeTodo(id);
      await fetchTodos();
    }

    async function fetchTodos() {
      isLoading.value = true;

      try {
        const results = await client.getTodos().catch(() => []);
        todos.value = results;
      } finally {
        isLoading.value = false;
      }
    }

    async function addTodo(message: string) {
      await client.createTodo({ message, completed: false });
      await fetchTodos();
    }

    async function updateTodo(id: string, todoData: Partial<Todo>) {
      await client.updateTodo(id, todoData);
      await fetchTodos();
    }

    fetchTodos();

    return {
      todos,
      inputValue,
      isLoading,
      handleTodoUpdate,
      handleTodoSubmit,
      handleTodoRemove,
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
  display: grid
  align-items: center
  padding: 0.5em
  font-size: 20px
  grid-template-columns: 30px 1fr 30px
  &:not(:last-child)
    border-bottom: 1px solid $border

.todo__remove
  padding: 0.5em
  border: 0
  border-radius: 6px
  background-color: transparent
  color: $red
  font-weight: bold
  cursor: pointer
  &:hover
    background-color: $gray

.todo__item--checked
  opacity: 0.8
  text-decoration-style: wavy
  text-decoration-line: line-through
  text-decoration-color: $border

.todo__loader
  position: absolute
  top: -1px
  right: 0
  left: 0
  overflow: hidden
  height: 4px
  &:after
    position: absolute
    left: 0
    display: block
    width: 50px
    height: 100%
    border-radius: 4px
    background-color: $dark
    content: ''
    animation: loaderAnimation 1s infinite linear

@keyframes loaderAnimation
  from
    transform: translate3d(-100%, 0, 0)
  to
    transform: translate3d(600px, 0, 0)
</style>
