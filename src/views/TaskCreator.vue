<script>
import '@/assets/main.css'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  computed: {
    inputTitle: {
      get() {
        return this.$store.state.inputTitle
      },
      set(value) {
        this.$store.commit('SET_INPUT_TITLE', value)
      }
    },
    inputContent: {
      get() {
        return this.$store.state.inputContent
      },
      set(value) {
        this.$store.commit('SET_INPUT_CONTENT', value)
      }
    },
    inputCategory: {
      get() {
        return this.$store.state.inputCategory
      },
      set(value) {
        this.$store.commit('SET_INPUT_CATEGORY', value)
      }
    },
    sortingOptions: {
      get() {
        return this.$store.state.sortingOptions
      },
      set(value) {
        this.$store.commit('SET_SORTING_OPTION', value)
      }
    }
  },
  methods: {
    addTask() {
      this.$store.dispatch('addTask')
    },
    removeTask(task) {
      this.$store.commit('REMOVE_TASK', task)
    },
    updateSortingOption() {
      this.$store.commit('SET_SORTING_OPTION', this.sortingOptions)
    }
  }
}
</script>

<template>
  <main class="app">
    <section class="greeting">
      <h2 class="title">Welcome Back</h2>
    </section>

    <!-- Task Section -->
    <section class="create-task">
      <h3>CREATE A TASK</h3>

      <form id="new-task-form" @submit.prevent="addTask">
        <h4>What's on your task list?</h4>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title of task"
          v-model="inputTitle"
        />
        <input
          type="text"
          name="content"
          id="content"
          placeholder="e.g. code todo app"
          v-model="inputContent"
        />

        <!-- Priority Selector -->
        <h4>Priority</h4>
        <div class="options">
          <label>
            <input type="radio" name="category" value="high" v-model="inputCategory" />
            <span class="bubble high"></span>
            <div>High</div>
          </label>

          <label>
            <input type="radio" name="category" value="medium" v-model="inputCategory" />
            <span class="bubble medium"></span>
            <div>Medium</div>
          </label>

          <label>
            <input type="radio" name="category" value="low" v-model="inputCategory" />
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

    <!-- New Task Handler -->

    <section class="task-list">
      <h3>TASK LIST</h3>
      <div class="list" id="task-list">
        <div
          :key="i"
          v-for="(task, i) in $store.state.tasks"
          :class="`task-item ${task.done && 'done'}`"
        >
          <label>
            <input type="checkbox" v-model="task.done" />
            <span
              :class="`bubble ${
                task.category === 'high' ? 'high' : task.category === 'medium' ? 'medium' : 'low'
              }`"
            ></span>
          </label>
          <div class="task-content">
            <div>
              <div class="inputContent" value="inputContent"></div>
            </div>
            <input type="text" v-model="task.title" />

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
