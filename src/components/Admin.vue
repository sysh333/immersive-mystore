<template>
  <div class="homepage">
    <h1>Add Item</h1>
    <p>See the <a href="#" v-on:click="handleStoreClick">Store</a></p>
    <!-- TODO: Add Form -->
  </div>
</template>

<script>
import apiService from '../api-service';

export default {
  name: 'Admin',
  data() {
    return {

    };
  },
  methods: {
    handleStoreClick: function(evt) {
      evt.preventDefault();
      this.$router.push('/');
    }
  },
  // SPAのSEO対策?
  // mounted: function () {
  //   const title = window.document.getElementsByTagName('title')[0];
  //   title.textContent = 'mystore: admin';
  // },
};
</script>

<style scoped>

</style>
