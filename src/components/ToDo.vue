<template>
  <div class="todo">
    <ul class="todo__list">
      <li class="todo__item" v-for="item in items" :key="item">{{ item }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ToDo',
  props: {
    items: {
      type: Array,
    },
  },
});
</script>

<style lang="stylus"></style>
