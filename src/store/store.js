import { createStore } from 'vuex'

export default createStore({
  state: {
    tasks: [],
    inputTitle: '',
    inputContent: '',
    inputCategory: null,
    sortingOptions: 'created_at'
  },
  mutations: {
    ADD_TASK(state, task) {
      state.tasks.push(task)
      // console.log(task)
    },
    REMOVE_TASK(state, task) {
      state.tasks = state.tasks.filter((t) => t !== task)
    },
    SET_INPUT_TITLE(state, title) {
      state.inputTitle = title
    },
    SET_INPUT_CONTENT(state, content) {
      state.inputContent = content
    },
    SET_INPUT_CATEGORY(state, category) {
      state.inputCategory = category
    },
    SET_SORTING_OPTION(state, category) {
      state.sortingOptions = category
    }
  },
  actions: {
    addTask({ commit, state }) {
      if (state.inputContent.trim() === '' || state.inputCategory === null) {
        return
      }

      const newTask = {
        title: state.inputTitle,
        content: state.inputContent,
        category: state.inputCategory,
        done: false,
        editable: false,
        createdAt: new Date().getTime()
      }

      commit('ADD_TASK', newTask)
      commit('SET_INPUT_TITLE', '')
      commit('SET_INPUT_CONTENT', '')
      commit('SET_INPUT_CATEGORY', null)
      commit('SET_SORTING_OPTION', null)
    }
  },
  getters: {
    sortedTasks(state) {
      if (state.sortingOptions === 'created_at') {
        // Sort by createdAt timestamp
        return state.tasks.slice().sort((a, b) => a.createdAt - b.createdAt)
      } else if (state.sortingOptions === 'priority') {
        // Sort by priority (high > medium > low)
        const priorityOrder = { high: 1, medium: 2, low: 3 }
        return state.tasks.slice().sort((a, b) => {
          return priorityOrder[a.category] - priorityOrder[b.category]
        })
      }
      return state.tasks.slice()
    }
  }
})
