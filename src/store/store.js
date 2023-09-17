import { createStore } from 'vuex'

export default createStore({
  state: {
    userName: '',
    tasks: [],
    inputContent: '',
    inputCategory: null
  },
  mutations: {
    SET_NAME(state, newName) {
      state.userName = newName // Corrected state property name
    },
    ADD_TASK(state, task) {
      state.tasks.push(task)
    },
    REMOVE_Task(state, task) {
      state.tasks = state.tasks.filter((t) => t !== task)
    },
    SET_INPUT_CONTENT(state, content) {
      state.inputContent = content
    },
    SET_INPUT_CATEGORY(state, category) {
      state.inputCategory = category
    }
  },
  actions: {
    addTask({ commit, state }) {
      if (state.inputContent.trim() === '' || state.inputCategory === null) {
        return
      }

      const newTask = {
        content: state.inputContent,
        category: state.inputCategory,
        done: false,
        editable: false,
        createdAt: new Date().getTime()
      }

      commit('ADD_TASK', newTask)
      commit('SET_INPUT_CONTENT', '')
      commit('SET_INPUT_CATEGORY', null)
    }
  },
  getters: {
    sortedTasks(state) {
      return state.tasks.slice().sort((a, b) => a.createdAt - b.createdAt)
    }
  }
})
