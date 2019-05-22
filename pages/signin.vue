<template>
  <div class="signin">
    <h2>Sign in</h2>
    <input v-model="email" type="text" placeholder="eMail" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="signIn">Signin</button>
    <p>
      You don't have an account?
      <NuxtLink to="/signup">
        create account now!!
      </NuxtLink>
    </p>
  </div>
</template>

<script>

import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'Signin',
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  mounted() {
    this.$firebase.auth().onAuthStateChanged((user) => {
      this.setUser(user)
    })
  },
  methods: {
    ...mapActions({ setUser: 'auth/setUser' }),
    signIn: function () {
      this.$firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(res => {
        // https://firebase.google.com/docs/auth/admin/verify-id-tokens?hl=ja
        /*firebase.auth().currentUser*/res.user.getIdToken(/* forceRefresh */ true).then(function(idToken) {
          // Send token to your backend via HTTPS
          localStorage.setItem('jwt', idToken)
        }).catch(function(error) {
          // Handle error
          alert('get id token error message: ' + error.message)
        });
        this.$router.push('/')
      }, error => {
        alert('auth error message: ' + error.message)
      })
    }
  }
}
</script>

<style scoped lang="stylus">
h1, h2
  font-weight normal

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px

a
  color #42b983

.signin
  margin-top 20px
  display flex
  flex-flow column nowrap
  justify-content center
  align-items center

input
  margin 10px 0
  padding 10px

button
  margin 10px 0
  padding 10px

</style>