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
    apiPublic: function() {
      console.log('GET Operation is start.')
      axios.get('/api/index')
        // GETがうまくいった場合の動作を記述
        .then(response => {
          console.log('status:', response.status);
          console.log('body:', response.data);
          this.apiMsg = response.data
        })
        // HTTP通信が失敗した場合の動作を記述
        .catch(err => {
          console.log('err:', err);
        })
        // 成功失敗に限らず行いたい動作を記述
        .finally(() => {
          console.log('GET Operation is end.')
        })
    },
    apiPrivate: function() {
      // alert(localStorage.getItem('jwt'));
      console.log('GET Operation is start.')
      this.$firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
        // Send token to your backend via HTTPS
        axios.get('/api/private', { params: { token: idToken/*localStorage.getItem('jwt')*/ } })
          // GETがうまくいった場合の動作を記述
          .then(response => {
            console.log('status:', response.status);
            console.log('body:', response.data);
            this.apiMsg = response.data
          })
          // HTTP通信が失敗した場合の動作を記述
          .catch(err => {
            console.log('err:', err);
          })
          // 成功失敗に限らず行いたい動作を記述
          .finally(() => {
            console.log('GET Operation is end.')
          })
        
      }).catch(function(error) {
        // Handle error
      });
    }
  }
}
</script>
