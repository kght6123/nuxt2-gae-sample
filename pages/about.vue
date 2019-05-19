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
  asyncData() {
    return {
      name: process.static ? 'static' : process.server ? 'server' : 'client'
    }
  },
  head: {
    title: 'About page'
  }
}
</script>
<style></style>
