<template>
  <section class="container">
    <div>
      <logo />
      <h1 class="title">
        nuxt2-gae-sample
      </h1>
      <h2 class="subtitle">
        My superb Nuxt.js project
      </h2>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green"
          >Documentation</a
        >
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
          >GitHub</a
        >
      </div>
      <form>
        <div class="form-group"></div>
        <NuxtLink to="/search" class="btn btn-info">Search</NuxtLink>
        <NuxtLink to="/about" class="btn btn-dark">About page</NuxtLink>
        <!-- ログイン中に表示される画面 -->
        <!-- <div v-if="isAuthenticated">
          {{ user.email }}でログイン中です。{{ name }}<br>
          <button @click="logout">Sign Out</button>
        </div> -->
        <!-- ログインしていない時に表示される画面 -->
        <!-- <div v-else> -->
          <NuxtLink to="/signin" class="btn btn-info">Sign In</NuxtLink>
          <!-- <NuxtLink to="/signup" class="btn btn-outline-info">Sign Up</NuxtLink> -->
        <!-- </div> -->
        <div v-if="isLoggedIn">
          {{username}} でログイン中です。
          <button @click="logout">Sign Out</button>
        </div>
      </form>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App." />
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import HelloWorld from '~/components/HelloWorld.vue'

import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  components: {
    Logo,
    HelloWorld
  },
  head() {
    return {
      titleTemplate: null,
      title: 'サイト名'
    }
  },
  data: function () {
    return {
      name: ''
    }
  },
  mounted() {
    // this.$firebase.auth().onAuthStateChanged((user) => {
    //   // onAuthStateChanged実行後のみ、ログインユーザ情報にアクセス可能
    //   this.setUser(user)
    //   console.log(user)
      
    //   this.name = this.$firebase.auth().currentUser
    //         ? this.$firebase.auth().currentUser.email
    //         : '';
    // })
  },
  computed: {
    ...mapState("auth", [
      "username"
    ]),
    ...mapGetters("auth", [
      "isLoggedIn"
    ])
    // ...mapState({
    //   user: state => state.auth.user
    // }),
    // // ...mapGetters({ isAuthenticated: 'auth/isAuthenticated' })
  },
  methods : {
    ...mapActions("auth", ["logout"]),
    // ...mapActions({ setUser: 'auth/setUser' }),
    // logout() {
      // this.$firebase.auth().signOut()
      // .then(() => {
      //   this.setUser(null)
      //   localStorage.removeItem('jwt')
      //   this.$router.push('/signin')
      // }).catch((error) => {
      //   alert(error)
      // })
    // }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
