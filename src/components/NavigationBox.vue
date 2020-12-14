<template>
  <div class="navigation-box">
    <div class="navigation-item" v-for="item in bookmarks" :key="item.id">
      <h4 :id="item.id"></h4>
      <div class="navigation-item__body">
        <div class="favorite-item" v-for="fi in item.children" :key="fi.name">
          {{ fi.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavigationBox",
  data() {
    return {
      bookmarks: []
    }
  },
  created() {
    this.bookmarks = window.bookmarks;
  }
}
</script>

<style scoped lang="scss">

</style>