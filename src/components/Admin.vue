<template>
  <div class="homepage">
    <h1>Add Item</h1>
    <h2>{{ message }}</h2>
    <p>See the <router-link to="/">Store</router-link></p>
    <div class="split">
      <div class="items-list">
        <h2>Items</h2>
        <ul>
          <li v-for="item of items" v-bind:key="item.id">
            <div class="single-item">
              <span class="delete" v-on:click="deleteItem(item)">X</span>
              <span class="item-label">{{ item.name }}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="add-item">
        <h2>Add Item</h2>
        <form v-on:submit="addItem">
          <input v-model="name" placeholder="Item Name" />
          <input v-model="price" placeholder="Item Price" />
          <input v-model="imageUrl" placeholder="Item Image Url" />
          <button type="submit">Add Item</button>
        </form>
      </div>
    </div>
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
      message: '',
      items: [],
    };
  },
  methods: {
    getItems: function() {
      apiService.getItems()
        .then(items => {
          this.items = items;
        });
    },
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
    deleteItem: function(item) {
      apiService.deleteItem(item)
        .then(() => {
          this.getItems();
          this.setMessage('Item Deleted');
          this.startResetMessageTimer();
        })
        .catch(e => {
          console.log('error deleting item. e = ', e);
          this.setMessage('There was an error deleting your item');
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
  mounted: function() {
    this.getItems();
  },
  // SPAのSEO対策?
  // mounted: function () {
  //   const title = window.document.getElementsByTagName('title')[0];
  //   title.textContent = 'mystore: admin';
  // },
};
</script>

<style>
* {
  box-sizing: border-box;
}

form {
  display: block;
  margin: auto;
}

input {
  margin: 5px 0;
  width: 100%;
  box-sizing: border-box;
  padding: 15px;
  display: block;
}

button {
  display: block;
  width: 100%;
  margin: 5px 0;
  padding: 15px;
}

.split {
  display: flex;
  justify-content: space-between;
}

.items-list,
.add-item {
  width: 46%;
  border: 1px solid #ddd;
  padding: 30px;
}

.items-list ul {
  padding: 0;
}

.items-list li {
  list-style: none;
}

.single-item {
  display: flex;
  justify-content: flex-start;
  margin: 6px 0;
}

.single-item .delete {
  margin-right: 20px;
  border: 1px solid #dd3131;
  background: #db5b5b;
  color: #fff;
  padding: 3px 8px;
  border-radius: 3px;
}

.single-item .item-label {

}
</style>
