<template>
  <div class="todo">
    <ul class="todo__list">
      <li class="todo__item" v-for="item in items" :key="item">{{ item }}</li>
    </ul>

    <input type="text" class="todo__input" v-model="inputValue" />
    <button class="todo__submit" @click="handleButtonSubmit">add</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ToDo',
  setup() {
    const items = ref<Array<string>>([]);
    const inputValue = ref<string>('');

    function handleButtonSubmit() {
      if (!inputValue.value.length) return;
      items.value.push(inputValue.value);
      inputValue.value = '';
    }

    return {
      items,
      inputValue,
      handleButtonSubmit,
    };
  },
});
</script>

<style lang="stylus"></style>
