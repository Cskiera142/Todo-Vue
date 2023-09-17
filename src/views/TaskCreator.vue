<script>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import '@/assets/main.css'

export default {
  name: 'TaskCreator',
  setup() {
    const store = useStore()
    const tasks = ref('')
    const userName = ref('')
    const input_content = ref('')
    const input_category = ref(null)
    const sortingOptions = ref('created_at')

    const tasksSorted = computed(() => {
      if (sortingOptions.value === 'created_at') {
        // Sort by createdAt timestamp
        return tasks.value.slice().sort((a, b) => b.createdAt - a.createdAt)
      } else if (sortingOptions.value === 'priority') {
        // Sort by priority (high > medium > low)
        return tasks.value.slice().sort((a, b) => {
          const priorityOrder = { high: 1, medium: 2, low: 3 }
          return priorityOrder[a.category] - priorityOrder[b.category]
        })
      }
      return tasks.value.slice()
    })

    watch(userName, (newVal) => {
      localStorage.setItem('name', newVal)
    })

    const addTask = () => {
      if (input_content.value.trim() === '' || input_category.value === null) {
        return
      }

      const newTask = {
        content: input_content.value,
        category: input_category.value,
        done: false,
        createdBy: userName.value,
        createdAt: new Date().getTime()
      }
      store.dispatch('addTask', newTask)

      input_content.value = ''
      input_category.value = null
    }

    return {
      userName,
      input_content,
      input_category,
      sortingOptions,
      tasksSorted
    }
  }
}
</script>

<template>
  <main class="app">
    <section class="greeting">
      <h2 class="title">
        Hello, <input type="text" id="name" placeholder="Name here" v-model="userName" />
      </h2>
    </section>

    <section class="create-task">
      <h3>CREATE A TASK</h3>

      <form id="new-task-form" @submit.prevent="addTask">
        <h4>What's on your task list?</h4>
        <input
          type="text"
          name="content"
          id="content"
          placeholder="e.g. code todo app"
          v-model="input_content"
        />

        <h4>Priority</h4>
        <div class="options">
          <label>
            <input
              type="radio"
              name="category"
              id="category1"
              value="high"
              v-model="input_category"
            />
            <span class="bubble high"></span>
            <div>High</div>
          </label>

          <label>
            <input
              type="radio"
              name="category"
              id="category1"
              value="medium"
              v-model="input_category"
            />
            <span class="bubble medium"></span>
            <div>Medium</div>
          </label>

          <label>
            <input
              type="radio"
              name="category"
              id="category2"
              value="low"
              v-model="input_category"
            />
            <span class="bubble low"></span>
            <div>Low</div>
          </label>
        </div>
        <!-- Dropdown to select sorting option -->
        <input type="submit" value="Add task" />
      </form>

      <div>
        <label class="sort" for="sort-select">Sort by:</label>
        <select id="sort-select" v-model="sortingOptions">
          <option value="created_at">Most Recent</option>
          <option value="priority">Priority</option>
        </select>
      </div>
    </section>

    <section class="task-list">
      <h3>TASK LIST</h3>
      <div class="list" id="task-list">
        <div :key="task" v-for="task in tasks" :class="`task-item ${task.done && 'done'}`">
          <label>
            <input type="checkbox" v-model="task.done" />
            <span
              :class="`bubble ${
                task.category === 'high' ? 'high' : task.category === 'medium' ? 'medium' : 'low'
              }`"
            ></span>
          </label>

          <div class="task-content">
            <div></div>
            <input type="text" v-model="task.content" />
          </div>

          <div class="actions">
            <button class="delete" @click="removeTask(task)">Delete</button>
          </div>
        </div>
      </div>
    </section>
  </main>
  <RouterView />
</template>
