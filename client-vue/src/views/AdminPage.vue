<template>
  <div class="container-fluid px-0 h-100">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-md navbar-dark bg-primary">
      <a class="navbar-brand" href="#">Amazonk/Admin</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarsExample04">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <button @click="logout" class="btn btn-outline-light">Logout</button>
          </li>
        </ul>
      </div>
    </nav>
    <!-- Add Item -->
    <div class="row justify-content-center mx-0">
      <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
        <h1 class="my-4 text-center">Add Item</h1>
        <form @submit.prevent="addItemEvent" class="px-5 border rounded">
          <div class="form-group my-4">
            <label>Name</label>
            <input type="text" class="form-control" v-model="newItem.item_name" placeholder="Item name">
          </div>
          <div class="form-group">
            <label>Price</label>
            <input type="text" class="form-control" v-model="newItem.item_price" placeholder="Item price">
          </div>
          <div class="form-group col-3 px-0">
            <label>Stock</label>
            <input type="text" class="form-control" v-model="newItem.item_stock">
          </div>
          <div class="form-group">
            <label>Category</label>
            <select class="custom-select" v-model="newItem.item_category">
              <option v-for="(category, index) in categories" :key="index" :value="category">{{ category }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>Image</label><br>
            <div v-if="newItem.img_url">
              <img :src="newItem.img_url" style="height: 75px;"/>
            </div>
          </div>
          <div class="custom-file">
            <input type="file" class="custom-file-input" name="img_url" value="" id="customFile">
            <label class="custom-file-label" for="customFile">Choose file</label>
          </div>
          <div class="form-group text-right mt-5">
            <button @click.prevent="clearForm" class="btn btn-secondary m-1">Clear</button>
            <button type="submit" class="btn btn-primary m-1">Submit</button>
          </div>
        </form>
      </div>
      <!-- Item List -->
      <div class="col-lg-9 col-md-9 col-sm-12 col-xs-12">
        <h1 class="my-4 text-center">Item List</h1>
        <table class="col-12 table table-bordered table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Item Image</th>
              <th scope="col">Item Name</th>
              <th scope="col">Item Stock</th>
              <th scope="col">Item Category</th>
              <th scope="col">Item Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <ItemList v-for="(item, index) in items" :item="item" :index="index" :key="index" />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert'
import ItemList from '@/components/ItemList.vue'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'AdminPage',
  components: {
    ItemList
  },
  data () {
    return {
      formData: new FormData(),
      newItem: {
        item_name: '',
        item_price: '',
        item_category: '',
        item_stock: '',
        img_url: ''
      },
      errorMsg: ''
    }
  },
  methods: {
    ...mapMutations([
      'setLogin',
      'setLogout'
    ]),
    ...mapActions([
      'getItems'
    ]),
    addItemEvent (event) {
      let payload = {
        formData: this.formData,
        newItem: this.newItem
      }
      this.createImage(event)
      this.$store.dispatch('addItems', payload)
      this.$store.dispatch('getItems')
    },
    createImage (event) {
      let files = event.target.elements.img_url.files
      let reader = new FileReader()

      reader.onload = (e) => {
        this.newItem.img_url = e.target.result
      }
      reader.readAsDataURL(files[0])
      this.formData.append('image_file', files[0])
    },
    clearForm () {
      this.newItem.item_name = ''
      this.newItem.item_price = ''
      this.newItem.item_category = ''
      this.newItem.item_stock = ''
      this.newItem.img_url = ''
      this.getItems()
    },
    logout () {
      swal({
        title: 'Logout',
        text: 'Are you sure want to logout?',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then((willLogout) => {
          if (willLogout) {
            localStorage.removeItem('token')
            this.setLogout()
            this.$router.push('/backdoor')
          }
        })
    }
  },
  computed: {
    ...mapState([
      'isLogin',
      'items',
      'categories'
    ])
  },
  mounted () {
    let token = localStorage.getItem('token')

    if (token) {
      this.setLogin()
    }

    if (this.isLogin) {
      this.getItems()
    } else {
      this.$router.push('/backdoor')
    }
  }
}
</script>

<style>
</style>
