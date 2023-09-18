<template>
  <section class="task-list">
    <h3>TASK LIST</h3>
    <div class="list" id="task-list">
      <TaskItem v-for="(task, i) in sortedTasks" :key="i" :task="task" @removeTask="removeTask" />
    </div>
  </section>
</template>

<script>
import TaskItem from './TaskItem.vue'

export default {
  components: {
    TaskItem
  },
  computed: {
    sortedTasks() {
      return this.$store.getters.sortedTasks
    }
  },
  methods: {
    removeTask(task) {
      this.$store.commit('REMOVE_TASK', task)
    }
  }
}
</script>
