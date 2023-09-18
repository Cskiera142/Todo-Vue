<template>
  <div :class="['task-item', { done: task.done }]">
    <label>
      <input type="checkbox" v-model="task.done" />
      <span
        :class="{
          bubble: true,
          high: task.category === 'high',
          medium: task.category === 'medium',
          low: task.category === 'low'
        }"
      ></span>
    </label>
    <div class="task-content">
      <div>
        <div class="inputContent" value="inputContent"></div>
      </div>
      <input
        type="text"
        :value="task.title"
        @input="updateTaskTitle"
        style="width: 20rem"
        maxlength="50"
      />
      <input
        type="text"
        :value="task.content"
        @input="updateTaskContent"
        style="width: 60rem"
        maxlength="101"
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
