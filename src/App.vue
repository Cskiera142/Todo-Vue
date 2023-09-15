<script setup>
import { ref, onMounted, computed, watch } from 'vue'
const tasks = ref([])
const name = ref('')
const input_content = ref('')
const input_priority = ref(null)

const tasks_ascending = computed(() =>
  tasks.value.sort((a, b) => {
    return b.createdAt - a.createdAt
  })
)

const addTask = () => {
  if (input_content.value.trim() === '' || input_priority.value === null) {
    return
  }

  tasks.value.push({
    content: input_content.value,
    priority: input_content.value,
    finished: false,
    createdAt: new Date().getTime()
  })
}

watch(
  tasks,
  (newVal) => {
    localStorage.setItem('todo', JSON.stringify(newVal))
  },
  { deep: true }
)

watch(name, (newVal) => {
  localStorage.setItem('name', newVal)
})
onMounted(() => {
  name.value = localStorage.getItem('name') || ''
})
</script>

<template>
  <div>
    <main class="app">
      <section class="greeting">
        <h2 class="title">Hello, <input type="text" placeholder="Name" v-model="name" /></h2>
        <section class="create-task">
          <h3>Task Item</h3>
          <form @submit.prevent="addTask">
            <h3>New task</h3>
            <input type="text" placeholder="Write new task here" v-model="input_content" />
            <div class="options">
              <span>Priority</span>
              <label>
                <input type="radio" class="priority high" value="high" v-model="input_priority" />
                <div>High</div>
              </label>
              <label>
                <input
                  type="radio"
                  class="priority medium"
                  value="medium"
                  v-model="input_priority"
                />
                <div>Medium</div></label
              >
              <label>
                <input type="radio" class="priority low" value="low" v-model="input_priority" />
                <div>Low</div></label
              >
            </div>
            <input type="submit" value="addTask" />
          </form>
        </section>
      </section>
    </main>
    <RouterView />
  </div>
</template>
