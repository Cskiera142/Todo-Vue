<template>
  <div class="task-item">
    <!-- Render task title and content -->

    <label>
      <input type="checkbox" v-model="task.done" />
      <span
        :class="`bubble ${
          task.category === 'high' ? 'high' : task.category === 'medium' ? 'medium' : 'low'
        }`"
      ></span>
    </label>
    <div class="task-content">
      <input
        type="text"
        :value="task.title"
        @input="updateTaskTitle"
        style="width: 100%"
        maxlength="30"
      />
      <input
        type="text"
        :value="task.content"
        @input="updateTaskContent"
        style="width: 100%"
        maxlength="100"
      />
    </div>
    <div class="actions">
      <button class="delete" @click="removeTask">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    task: Object
  },
  methods: {
    updateTaskTitle(event) {
      const newTitle = event.target.value
      this.$emit('updateTaskTitle', { task: this.task, newTitle })
    },
    updateTaskContent(event) {
      const newContent = event.target.value
      this.$emit('updateTaskContent', { task: this.task, newContent })
    },
    removeTask() {
      this.$emit('removeTask', this.task)
    }
  }
}
</script>

<style scoped>
.task-item.done {
  text-decoration: line-through;
}
</style>
