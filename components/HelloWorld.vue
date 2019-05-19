<template>
  <div class="hello">
    <h1>{{ msg }} Hello {{ name }}!!</h1>
    <h2>{{ apiMsg }}</h2>
    <h3>API Links</h3>
    <button @click="signOut">Sign out</button>
    <button @click="apiPublic">Public API</button>
    <button @click="apiPrivate">Private API</button>
    <button @click="test">Test env</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      required: true,
      default: ''
    }
  },
  data() {
    return {
      apiMsg: 'API Message',
      name: this.$firebase.auth().currentUser
        ? this.$firebase.auth().currentUser.email
        : ''
    }
  },
  mounted() {},
  methods: {
    signOut: function() {
      this.$firebase
        .auth()
        .signOut()
        .then(() => {
          localStorage.removeItem('jwt')
          this.$router.push('/signin')
        })
    },
    apiPublic: async function() {
      const res = await axios.get('/v1/object/')
      this.apiMsg = res.data
    },
    apiPrivate: async function() {
      // alert(localStorage.getItem('jwt'));
      const res = await axios.get('/v1/user/', {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
      })
      this.apiMsg = res.data
    },
    test: function() {
      alert(process.env.VUE_APP_NAME) // test env
      alert(process.env.VUE_APP_FB_API_KEY)
    }
  }
}
</script>
