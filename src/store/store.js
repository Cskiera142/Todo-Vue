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
    SET_SORTING_OPTION(state, sortingOption) {
      state.sortingOptions = sortingOption
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
    },
    removeTask({ commit }, task) {
      commit('REMOVE_TASK', task)
      console.log('delete')
    }
  },
  getters: {
    sortedTasks(state) {
      const tasks = [...state.tasks]

      if (state.sortingOptions === 'created_at') {
        tasks.sort((a, b) => b.createdAt - a.createdAt)
      } else if (state.sortingOptions === 'priority') {
        const priorityOrder = {
          high: 1,
          medium: 2,
          low: 3
        }
        tasks.sort((a, b) => priorityOrder[a.category] - priorityOrder[b.category])
      }

      return tasks
    }
  }
})
