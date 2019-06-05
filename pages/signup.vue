<template>
  <div class="signup">
    <h2>Sign up</h2>
    <input v-model="email" type="text" placeholder="eMail" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="signUp">Register</button>
    <p>
      Do you have an account?
      <NuxtLink to="/signin">
        sign in now!!
      </NuxtLink>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  data () {
    return {
      // email: '',
      // password: ''
    }
  },
  methods: {
    signUp: function () {
      // this.$firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(res => {
      //   alert('Create account: ' + res.user.email)
      // }).catch(error => {
      //   alert('Error message: ' + error.message)
      // })
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

.signup
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