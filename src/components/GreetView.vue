<script>
import { RouterLink } from 'vue-router'
import './main.css'
export default {
  name: 'GreetView',
  data() {
    return {
      userName: localStorage.getItem('userName') || ''
    }
  },
  methods: {
    storeNameAndNavigate() {
      localStorage.setItem('userName', this.userName)
      this.$store.commit('setUserName', this.userName)
    }
  }
}
</script>
<template>
  <section id="greet">
    <div class="greeting">
      <h3 class="title">
        Hello,
        <input id="name_field" type="text" placeholder="Name here" v-model="userName" />
      </h3>
      <RouterLink to="App">
        <button class="enter" @click="storeNameAndNavigate">Lets Get Started!</button>
      </RouterLink>
    </div>
  </section>
</template>
