<template>
  <section class="greeting">
    <h2 class="title">Welcome Back</h2>
  </section>

  <!-- Task Form Component -->
  <TaskForm />

  <!-- Task List Component -->
  <TaskList />

  <!-- Router View for Additional Routes -->
  <router-view />
</template>
<script>
import '@/assets/main.css'
import TaskForm from '../components/TaskForm.vue'
import TaskList from '../components/TaskList.vue'

export default {
  components: {
    TaskForm,
    TaskList
  }
}
</script>
