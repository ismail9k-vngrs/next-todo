<template>
  <div class="todo">
    <ul class="todo__list">
      <li class="todo__item" v-for="todo in todos" :key="todo.id">{{ todo.message }}</li>
    </ul>

    <input type="text" class="todo__input" v-model="inputValue" />
    <button class="todo__submit" @click="handleButtonSubmit">add</button>
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

    function handleButtonSubmit() {
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
        console.log(todos.value);
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
      handleButtonSubmit,
    };
  },
});
</script>

<style lang="stylus"></style>
