<template>
  <div id="shot" class="hello">
    <h1>{{ msg }} Hello World!!</h1>
    <h2>{{ apiMsg }}</h2>
    <h3>API Links</h3>
    <button @click="apiPublic">Public API</button>
    <button @click="apiPrivate">Private API</button>
    <modal name="hello-world" :resizable="true" :adaptive="true" :draggable="true" :scrollable="true" height="auto">
      <div class="modal-header">
        <div @click="hide" class="modal-header-icon">
          <font-awesome-icon icon="times" size="2x" :style="{ color: 'rgba(0,0,0,0.50)' }" />
        </div>
      </div>
      <iframe id="feedback" src="https://docs.google.com/forms/d/e/1FAIpQLSeB5JTxpbVDRKkkTlpatHvzysWQAa1RHBIdSvGsygvxhyhIwQ/viewform?embedded=true" frameborder="0" marginheight="0" marginwidth="0">読み込んでいます...</iframe>
    </modal>
    <button @click="show">Show modal!!!</button>
    <button @click="screenshot">Screen Shot!!!</button>
    <button @click="share">共有</button>
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
  mounted() { if (process.browser) { this.screenshot(); } },
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
    },
    show () {
      this.$modal.show('hello-world');
    },
    hide () {
      this.$modal.hide('hello-world');
    },
    screenshot () {
      if (process.browser) { 
        const html2canvas = require('html2canvas');
        html2canvas(document.body).then(function (canvas) {
          document.body.appendChild(canvas)
        });
      }
    },
    share () {
      if (navigator.share) {
        // Chrome 61以上のAndroidと、iOS/MacのSafari 12.2以上で動く
        navigator.share({
          title: 'WebShare API Demo',
          url: 'https://codepen.io/ayoisaiah/pen/YbNazJ',
          text: 'demo pages.'
        }).then(() => {
          console.log('Thanks for sharing!');
        })
        .catch(console.error);
      } else {
        // fallback
        alert('ブラウザが対応してないよ！');
      }
    }
  }
}
</script>

<style>
.v--modal-overlay[data-modal="hello-world"] {
  backdrop-filter: blur(10px);
}
.v--modal {
  background-color: rgba(0,0,0,0.50);
  box-shadow: none;
}
.modal-header {
  position: relative;
  height: 2em;
}
.modal-header-icon {
  position: absolute;
  top: 0.15em;
  right: 1.2em;
  width: 1em;
  height: 1em;
}
#feedback {
  width: 100%;
  height: 75vh;
}
</style>
