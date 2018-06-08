<template>
  <div class="homepage">
    <h1>Add Item</h1>
    <h2>{{ message }}</h2>
    <p>See the <router-link to="/">Store</router-link></p>
    <form v-on:submit="addItem">
      <input v-model="name" placeholder="Item Name" />
      <input v-model="price" placeholder="Item Price" />
      <input v-model="imageUrl" placeholder="Item Image Url" />
      <button type="submit">Add Item</button>
    </form>
  </div>
</template>

<script>
import apiService from '../api-service';

export default {
  name: 'Admin',
  data() {
    return {
      name: '',
      price: '',
      imageUrl: '',
      message: ''
    };
  },
  methods: {
    addItem: function(evt) {
      evt.preventDefault();
      apiService.createItem({
        name: this.name,
        price: this.price,
        imageUrl: this.imageUrl,
      })
        .then(() => {
          this.setMessage('Item Added');
          this.startResetMessageTimer();
        })
        .catch(e => {
          console.log('error saving account. e = ', e);
          this.setMessage('There was an error adding your item');
          this.startResetMessageTimer();
        });
    },
    setMessage: function(message) {
      this.message = message;
    },
    startResetMessageTimer: function() {
      setTimeout(() => {
        this.message = '';
      }, 2000);
    },
  },
  // SPAのSEO対策?
  // mounted: function () {
  //   const title = window.document.getElementsByTagName('title')[0];
  //   title.textContent = 'mystore: admin';
  // },
};
</script>

<style scoped>
form {
  display: block;
  margin: auto;
  width: 500px;
}

input {
  margin: 5px auto;
  box-sizing: border-box;
  width: 200px;
  padding: 15px;
  display: block;
}

button {
  display: block;
  margin: 5px auto;
  padding: 15px;
}
</style>
