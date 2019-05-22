import Vue from 'vue'
import firebase from 'firebase'

/* eslint-disable */
if (!firebase.apps.length) {
  const config = {
    app: process.env.appName,
    apiKey: process.env.fbApiKey,
    authDomain: process.env.fbAuthDomain,
    databaseURL: process.env.fbDbUrl,
    projectId: process.env.fbProjectId,
    storageBucket: process.env.fbStorBkt,
    messagingSenderId: process.env.fbMsgSenderId
  }
  firebase.initializeApp(config)
  Vue.prototype.$firebase = firebase
}

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // User is signed in.
  } else {
    // No user is signed in.
  }
  // new Vue({
  //   router,
  //   store,
  //   render: h => h(App)
  // }).$mount('#app')
})
