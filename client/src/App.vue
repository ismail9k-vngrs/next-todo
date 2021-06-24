<template>
  <h1 class="header">todos</h1>
  <Todo />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Todo from './components/Todo.vue';

export default defineComponent({
  name: 'App',
  components: {
    Todo,
  },
});
</script>

<style lang="stylus">
@import 'styles/colors.styl'
@import 'styles/main.styl'

.header
  margin-top: 60px
  text-align: center
  font-weight: 200
  font-size: 40px
</style>
