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

export default defineComponent({
  name: 'Todo',
  setup() {
    const todos = ref<Array<Todo>>([]);
    const inputValue = ref<string>('');

    function handleButtonSubmit() {
      if (!inputValue.value.length) return;
      todos.value.push({ message: inputValue.value });
      inputValue.value = '';
    }

    return {
      todos,
      inputValue,
      handleButtonSubmit,
    };
  },
});
</script>

<style lang="stylus"></style>
