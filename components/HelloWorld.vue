<template>
  <div class="hello">
    <h1>{{ msg }} Hello World!!</h1>
    <h2>{{ apiMsg }}</h2>
    <h3>API Links</h3>
    <button @click="apiPublic">Public API</button>
    <button @click="apiPrivate">Private API</button>
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
      apiMsg: 'API Message'
    }
  },
  mounted() {},
  methods: {
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
    }
  }
}
</script>
