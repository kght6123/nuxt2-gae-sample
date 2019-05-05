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
