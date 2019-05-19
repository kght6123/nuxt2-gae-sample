<template>
  <div>
    <p>Hi from {{ name }}</p>
    <form>
      <div class="form-group"></div>
      <NuxtLink to="/" class="btn btn-dark">Home page</NuxtLink>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      meta: {
        title: 'Test-Page!',
        description: 'ページ個別のディスクリプション',
        type: 'article',
        url: 'https://example.com/test',
        image: 'https://example.com/img/ogp/test.jpg'
      }
    }
  },
  asyncData() {
    return {
      name: process.static ? 'static' : process.server ? 'server' : 'client'
    }
  },
  head() {
    return {
      title: this.meta.title,
      meta: [
        {
          hid: 'descrisption',
          name: 'description',
          content: this.meta.description
        },
        { hid: 'og:type', property: 'og:type', content: this.meta.type },
        { hid: 'og:title', property: 'og:title', content: this.meta.title },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.meta.description
        },
        { hid: 'og:url', property: 'og:url', content: this.meta.url },
        { hid: 'og:image', property: 'og:image', content: this.meta.image }
      ]
    }
  }
}
</script>
<style></style>
