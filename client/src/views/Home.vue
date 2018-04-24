<template>
  <div class="container-fluid px-0 h-100">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-md navbar-dark bg-primary">
      <a class="navbar-brand" href="#">Amazonk.</a>
      <!-- Collapse Nav Button -->
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- Navigation -->
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <!-- Search -->
        <div class="col-md-6 offset-md-2 py-2">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Search item" aria-label="Search Product" aria-describedby="basic-addon2">
            <div class="input-group-append">
              <button class="btn btn-outline-light" type="button"><span class="fa fa-search"></span></button>
            </div>
          </div>
        </div>
        <!-- Nav Button -->
        <ul class="navbar-nav ml-auto">
          <li class="py-2">
            <template v-if="cart.length > 0">
              <span class="badge badge-pill badge-danger notify">{{ cart.length }}</span>
            </template>
            <button type="button" class="btn btn-outline-light mr-1" data-toggle="modal" data-target="#exampleModalCenter">
              <span class="fa fa-shopping-cart"></span>
              Cart
            </button>
          </li>
          <li class="py-2">
            <button type="button" class="btn btn-outline-light ml-3 mr-3" data-toggle="modal">
              <span class="fa fa-user"></span>
              Login
            </button>
          </li>
        </ul>
        <!-- Modal Cart -->
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">User Cart</h5>
              </div>
              <div class="modal-body">
                <table class="table">
                  <thead class="thead-dark">
                    <tr>
                      <th scope="col" colspan="2">Product Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Total Price</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in cart" :item="item" :key="index" >
                      <td><img :src="item.img_url" style="height: 40px"></td>
                      <td>{{ item.item_name }}</td>
                      <td>{{ priceFormat(item.item_price) }}</td>
                      <td class="">
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <button class="btn btn-sm btn-outline-secondary" @click="decreaseQty(item)" type="button"> - </button>
                          </div>
                          <input type="text" class="form-control col-2 col-xs-2" v-model="item.qty" disabled>
                          <div class="input-group-append">
                            <button class="btn btn-sm btn-outline-secondary" @click="increaseQty(item)" type="button"> + </button>
                          </div>
                        </div>
                      </td>
                      <td>{{ subTotal(item.item_price, item.qty) }}</td>
                      <td>
                        <button @click="deleteFromCart(item)" type="button" class="close" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="4">
                        <p class="text-right">Total price: </p>
                      </td>
                      <td>{{ grandTotal }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal">Check Out</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="col-lg-9 col-md-10 mx-auto">
      <!-- Content -->
      <div class="row mx-0">
          <!-- Intro Carousel -->
        <div class="col-lg-9 col-xs-12 px-0">
          <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img class="d-block w-100" src="../assets/img/carousel-1.jpg" alt="First slide">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="../assets/img/carousel-2.jpg" alt="Second slide">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="../assets/img/carousel-3.jpg" alt="Third slide">
              </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>
        <!-- Categories -->
        <div class="col-lg-3 col-xs-12 border py-3 p-0">
          <h3 class="p-2">Categories >></h3>
          <div class="border"></div>
          <div v-for="(category, index) in categories" :key="index">
            <h6 class="pt-1 px-3">
              <a href="#">{{ category }}</a>
            </h6>
            <div class="border"></div>
          </div>
        </div>
      </div>
      <!-- Products -->
      <div class="row justify-content-center mt-2 mx-0">
        <!-- List of Item -->
        <ItemCard v-for="(item, index) in items" :item="item" :key="index" />
      </div>
    </div>

    <!-- Footer -->
    <div class="row mt-5 pt-5 mx-0">
      <div class="col-12 py-4 mx-auto bg-primary text-white">
        <footer class="footer">
          <p class="text-center">Created by Fandy Barestu 2018</p>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import ItemCard from '@/components/ItemCard.vue'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'home',
  components: {
    ItemCard
  },
  data () {
    return {

    }
  },
  methods: {
    ...mapMutations([
      'increaseQty',
      'decreaseQty',
      'deleteFromCart'
    ]),
    ...mapActions([
      'getItems'
    ]),
    priceFormat (price) {
      return `Rp. ${price.toLocaleString()}`
    },
    subTotal (price, qty) {
      return this.priceFormat(price * qty)
    }
  },
  computed: {
    ...mapState([
      'cart',
      'items',
      'categories'
    ]),
    grandTotal () {
      let total = 0
      this.cart.forEach(item => {
        total += item.item_price * item.qty
      })

      return this.priceFormat(total)
    }
  },
  mounted () {
    this.getItems()
  }
}
</script>

<style>
.notify {
  position: relative;
  font-size: 15px;
  top: -18px;
  left: 92px;
}
</style>
