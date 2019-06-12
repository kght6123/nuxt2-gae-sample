# nuxt2-gae-sample

> My superb Nuxt.js project

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

## [Memo] Initial Setup

### プロジェクト作成

```sh
npx create-nuxt-app nuxt2-gae-sample
# set server framework -> express
# add PWA + Linter / Formatter + Prettier + Axios
# set UI framework -> bootstrap
# set test framework -> none
# set rendering mode -> Universal
# set package manager -> npm
cd nuxt2-gae-sample
npm run dev # http://localhost:3000
# 外部アクセス可
npm run dev -- --hostname `ifconfig en0 | awk '/inet / { print $2 }'`
```

### PWAの設定

nuxt.config.jsに追記

```js
module.exports = {
  ...
  /*
   ** PWA manifest
   */
  manifest: {
    name: 'nuxt2-gae-sample',
    lang: 'ja'
  },
	...
};
```

### PWAの動作検証（本番モード）

```sh
# ビルド
npm run build
# サーバー起動
npm start
# 外部アクセス可
npm run start -- --hostname `ifconfig en0 | awk '/inet / { print $2 }'`
```

### GCPのプロジェクトを設定

```sh
gcloud config set project nuxt2-gae-sample
v
gcloud app deploy
gcloud app browse
```

### GCPのログを表示

[Google Cloud Platform](https://console.cloud.google.com/logs/viewer?project=nuxt2-gae-sample&src=ac&resource=gae_app%2Fmodule_id%2Fdefault&minLogLevel=0&expandAll=false&timestamp=2019-05-05T11:19:50.222000000Z&customFacets=&limitCustomFacetWidth=true&dateRangeStart=2019-05-05T10:19:43.671Z&interval=PT1H&logName=projects%2Fnuxt2-gae-sample%2Flogs%2Fstderr&logName=projects%2Fnuxt2-gae-sample%2Flogs%2Fappengine.googleapis.com%252Frequest_log&scrollTimestamp=2019-05-05T11:14:59.554938000Z&dateRangeUnbound=forwardInTime)

OutOfMemoryError、F1は無理

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

### Firebase

```sh
npm install --save firebase firebase-admin firebaseui
```

### Stylus

```sh
npm install --save stylus stylus-loader
```

### OGPタグの設置

nuxt.config.js（デフォルト）とpages/index.vue（上書き）、pages/about.vue（ページ毎）に設定

### ESLintの無効

```js
/* eslint-disable */
```

### PersistedState

```sh
npm install --save vuex-persistedstate
```

## Uninstall express

```sh
npm remove express
rm -R server
# package.json の scripts を node_modules/.bin/nuxt に変更
```

## Vue.js modal

```sh
npm install --save vue-js-modal
```

## fortawesome

```sh
npm install --save @fortawesome/vue-fontawesome @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons
```

https://github.com/FortAwesome/vue-fontawesome#integrating-with-other-tools-and-frameworks

https://github.com/FortAwesome/vue-fontawesome#add-more-styles-or-pro-icons

## html2canvas

```sh
npm install --save html2canvas
```

## FirebaseUI(ja)化

Nuxt/VuexでFirebase Authenticationを使ってユーザー認証機能を作る
https://blog.ikedaosushi.com/entry/2019/04/17/201246

## Nuxtのデバック環境構築の手順

### 設定追加

nuxt.config.jsの63〜70に`config.devtool`の設定を追加

```json
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.devtool = 'inline-cheap-module-source-map' // この行を追加
        config.module.rules.push({

        })
      }
    }
  }
```

### Node.js側

メニューの「デバック」⇨「構成を開く」⇨「Node.js」

`.vscode/launch.json` のデバック構成を下記の様に修正

```json
{
  "type": "node",
  "request": "launch",
  "name": "Launch Program Node.js", // 修正
  "program": "${workspaceFolder}/server/index.js",
  "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/nodemon", // 追加
  "args": ["--watch","server"], // 追加
  "runtimeArgs": [], // 追加
  "env": { // 追加
    "NODE_ENV": "development",
    "NODE_ENV_HOST": "local"
  },
  "sourceMaps": true, // 追加
  "restart": true, // 追加
  "console": "integratedTerminal", // 追加
  "internalConsoleOptions": "neverOpen" // 追加
}
```

### Chrome側

メニューの「デバック」⇨「構成を追加」⇨「Chrome: Launch」

`.vscode/launch.json` の追加されたデバック構成を下記の様に修正

```json
{
  "type": "chrome",
  "request": "launch",
  "name": "Launch Chrome",
  "url": "http://localhost:3000", // ポート番号を3000に修正
  "webRoot": "${workspaceFolder}"
},
```

## Bootstrapのカスタマイズ

下記のサイトを参考に実施した
https://medium.com/coiney-product-team/%E3%81%86%E3%82%8F%E3%81%A3-%E7%A7%81%E3%81%AE%E3%82%B5%E3%82%A4%E3%83%88bootstrap%E3%81%8F%E3%81%95%E3%81%99%E3%81%8E-%E3%81%9F%E3%81%A3%E3%81%9F%E6%95%B0%E6%96%87%E5%AD%97%E5%A4%89%E3%81%88%E3%82%8B%E3%81%A0%E3%81%91%E3%81%A7bootstrap%E3%81%AE%E3%81%8F%E3%81%95%E3%81%BF%E3%81%8C%E6%8A%9C%E3%81%91%E3%82%8B7%E3%81%A4%E3%81%AEcss%E3%83%86%E3%82%AF%E3%83%8B%E3%83%83%E3%82%AF-6cd1c3b8410a

## WEBShareAPIについて

主のAndroidとiOSで対応しているので、その時の処理としてはありかも。

https://css-tricks.com/how-to-use-the-web-share-api/

## Cloud Datastoreを使ってみる

DatastoreはGAEを有効にしないと使えないので注意する

Cloud Firestore Datastoreモード(新)と、Cloud Datastore(旧)、Cloud Forestore Nativeモード(Firestore後継)がある。

https://cloud.google.com/firestore/docs/firestore-or-datastore?_ga=2.80797328.-645130026.1559095119

DatastoreモードではGQL(SQLもどき)が使えそう、しかし、Nativeモードは使えない。

BigQueryを使うことになりそう。（溶かさない様に気をつける）

https://medium.com/google-cloud-jp/firestore-bigquery-3b887a5bc27e

Cloud Firestore Nativeモードはfirebaseのコンソールから作るっぽい

### Firestoroの設計

https://qiita.com/1amageek/items/d606dcee9fbcf21eeec6

https://qiita.com/samuraikun/items/dfe7d1081f62359b0dcd

### Firestoreローカルエミュレータを使う

https://qiita.com/aono/items/56d987963d3c56466baf

#### Docker

https://github.com/Gnucki/firestore-emulator-hello-world

Node.jsやGoから接続するときのみ使える

### Firestoreの使い方（Web,Node.js）

https://firebase.google.com/docs/firestore/quickstart?hl=ja

### Firestoreセキュリティルールを設定する

https://firebase.google.com/docs/firestore/security/get-started?hl=ja

### Datastore接続モジュールのインストール

```sh
npm install --save @google-cloud/datastore
```

### Datasotreエミュレータのインストール

https://cloud.google.com/datastore/docs/tools/datastore-emulator?hl=ja

```sh
gcloud components install cloud-datastore-emulator
gcloud beta emulators datastore start #--data-dir=./dse
```

### Datastoreエミュレータへ接続する環境変数を設定

#### 自動

```sh
$(gcloud beta emulators datastore env-init)
npm run dev
$(gcloud beta emulators datastore env-unset)
```

#### 手動

```sh
gcloud beta emulators datastore env-init
# コマンドの指示に従う
npm run dev
gcloud beta emulators datastore env-unset
# コマンドの指示に従う
```

### 認証方法

```sh
gcloud auth application-default login
```

https://cloud.google.com/datastore/docs/tools/datastore-emulator?hl=ja

## スポットライトナビ（第七課題）

https://blog.knowledgecode.jp/entries/2017-12-16/searchlight-effect-using-svg.html

## tensorflow board＆tensorflow.jsを使ってみる（第二課題）

## 既存wordpressをGCPに移行する（第三課題）

## Riot.js（第六課題）

https://riot.js.org/ja/
