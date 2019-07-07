<template>
  <div class="infinite-scroll">
    <ul class="infinite-scroll-list">
      <li class="infinite-scroll-list-item" v-for="emoji in emojiList" :key="emoji.objectID" :title="emoji.name">{{ emoji.char }}{{ emoji.name }}</li>
    </ul>
    <infinite-loading 
      ref="infiniteLoading" 
      spinner="spiral"
      @infinite="infiniteHandler">
      <div slot="no-results"/>
    </infinite-loading>
  </div>
  <!--
  <div>
    <b-card class="my-2"
            v-for="emoji in emojiList" 
            :key="emoji.objectID"
            :title="emoji.name">
      <p>{{ emoji.char }}</p>
    </b-card>
  </div>-->
</template>

<script>
import * as algoliasearch from 'algoliasearch'

const client = algoliasearch(process.env.algoliaConfig.appId, process.env.algoliaConfig.apiKey)
// const index = client.initIndex(process.env.algoliaConfig.index)

export default {
  name: 'InfiniteScroll',
  mounted() {
    const _this = this
    _this.searchEmoji()
  },
  data: function () {
    return {
      count: 20,
      query: '',
      emojiList: [],
    }
  },
  methods: {
    infiniteHandler() {
      // setTimeout(() => {
      //   this.count += 20
      //   this.$refs.infiniteLoading.stateChanger.loaded()
      // }, 1000)
      searchEmoji()
    },
    async searchEmoji () {
      const queries = [{
            indexName: process.env.algoliaConfig.index,
            query: this.query,
            params: {
              // https://www.algolia.com/doc/api-reference/search-api-parameters/
              page: Math.floor(this.emojiList.length / 20) + 1, // 取得ページ
              hitsPerPage: 20, // 1ページのヒット数
            }}]
      const searchResult = await client.search(queries)
      this.emojiList = searchResult.hits

      this.$refs.infiniteLoading.stateChanger.loaded()
    }
  }
}
</script>

<style>
.infinite-scroll {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 680px;
  margin: 100px 0;
}

.infinite-scroll-list-item {
  height: 60px;
  margin: 10px 0;
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 10px;
}
</style>