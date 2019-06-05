<template>
  <div id="firebaseui-auth-container"/>
</template>

<script>
import 'firebaseui-web-ja/dist/firebaseui.css'

import { auth, authProviders } from '~/plugins/firebase'
// import firebaseui from 'firebaseui-web-ja/dist/npm__ja'

export default {
  name: 'FirebaseAuth',
  mounted() {
		console.log(auth)
    auth.onAuthStateChanged(user => {
      if (!user) {
        // if (process.browser) {
        const firebaseui = require('firebaseui-web-ja/dist/npm__ja');
        // }
        const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth)
        const config = {
          signInOptions: [
            authProviders.Email,
            authProviders.Google,
            authProviders.Facebook,
          ],
          callbacks: {
            // Nuxtのローカルサーバーで起こるCORSエラーのためこのように設定。本番環境では不要
            signInSuccessWithAuthResult: (authResult) => {
              window.location.href = "/"
              return false // falseを設定するとsignInSuccessUrlにはリダイレクトしない
            }
          },
          signInSuccessUrl: '/',
          signInFlow: 'popup', // ログインフロー設定。Nuxtのローカルサーバーで起こるCORSエラーがあるのでpopupがオススメです。
        }

        ui.start('#firebaseui-auth-container', config)
      }
    })
  }
}
// import firebase from '@firebase/app';
// import '@firebase/auth';
// // import firebase from 'firebase'
// // import 'firebase/auth'
// import 'firebaseui-web-ja/dist/firebaseui.css'

// export default {
//   mounted() {
// 		// const firebase = require('firebase/app');
// 		// require("firebase/auth");
// 		// require("firebase/database");
// 		console.log(firebase)

//     if (!firebase.apps.length && process.browser) {
// 			firebase.initializeApp(process.env.firebaseConfig);
			
// 			console.log(firebase.auth)
// 			const firebaseui = require('firebaseui-web-ja/dist/npm__ja');
// 			const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
// 			const uiConfig = {
// 					signInSuccessUrl: '/',
// 					signInOptions: [
// 						firebase.auth.GoogleAuthProvider.PROVIDER_ID,
// 					],
// 				};
//       ui.start("#firebaseui-auth-container", uiConfig);
//     }
//   },
// }
</script>