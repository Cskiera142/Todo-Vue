import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

const app = createApp(App)

app.use(store)

app.mixin({
  beforeCreate() {
    // Load tasks from localStorage when the app initializes
    this.$store.dispatch('loadTasks')
  }
})

// Watch for changes in tasks and save them to localStorage
app.config.globalProperties.$store.watch(
  (state) => state.tasks,
  () => {
    app.config.globalProperties.$store.dispatch('saveTasks')
  },
  { deep: true }
)

app.use(router)
app.mount('#app')
