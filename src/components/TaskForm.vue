<template>
  <section class="create-task">
    <h3>CREATE A TASK</h3>
    <form id="new-task-form" @submit.prevent="addTask">
      <!-- Input fields for title, content, and priority -->
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Title of task"
        maxlength="30"
        v-model="inputTitle"
      />
      <input
        type="text"
        name="content"
        id="content"
        placeholder="e.g. code todo app"
        maxlength="100"
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
      <div class="options">
        <!-- Radio buttons for priority -->
      </div>
      <!-- Dropdown to select sorting option -->
      <div></div>
      <!-- Submit button -->
      <input type="submit" value="Add task" />
      <label class="sort" for="sort-select">Sort by:</label>
      <select id="sort-select" v-model="sortingTasks" @change="changeSortingOption">
        <option value="created_at">Most Recent</option>
        <option value="priority">Priority</option>
      </select>
    </form>
  </section>
</template>

<script>
export default {
  computed: {
    inputCategory: {
      get() {
        return this.$store.state.inputCategory
      },
      set(value) {
        this.$store.commit('SET_INPUT_CATEGORY', value)
      }
    },
    sortingTasks: {
      get() {
        return this.$store.state.sortingOptions
      },
      set(value) {
        this.$store.commit('SET_SORTING_OPTION', value)
      }
    },
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
    }
    // InputCategory computed property for priority
  },
  methods: {
    addTask() {
      this.$store.dispatch('addTask')
    },
    changeSortingOption() {
      this.$store.commit('SET_SORTING_OPTION', this.sortingTasks)
    }
  }
}
</script>
