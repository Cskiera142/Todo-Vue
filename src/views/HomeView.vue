<template>
  <div class="container">
    <div class="greeting-container">
      <h1>HELLO</h1>
      <h3>READY TO GET STARTED?</h3>
      <router-link class="task-nav" to="/taskcreator">Task List</router-link>
    </div>
  </div>
</template>

<script>
import '@/assets/main.css'
import { RouterLink } from 'vue-router'

export default {
  components: {
    RouterLink
  }
}
</script>
