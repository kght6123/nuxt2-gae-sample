<template>
  <section class="container">
    <infinite-scroll />
  </section>
</template>

<script>
import InfiniteScroll from '~/components/InfiniteScroll.vue'

import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  components: {
    InfiniteScroll
  },
  head() {
    return {
      titleTemplate: null,
      title: 'サイト名'
    }
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
