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


