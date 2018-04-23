<template>
  <div class="d-flex flex-row" >
    <div class="card m-3" style="width: 214px;">
      <img class="card-img-top" :src="item.img_url" alt="N/A" />
      <div class="card-body p-2">
        <h6 class="card-title">{{ item.item_name }}</h6>
      </div>
      <div class="text-center p-2">
        <h4 class="card-text font-weight-bold">{{ priceFormat }}</h4>
        <button v-on:click="addToCart(item)" type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-sm">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'ItemCard',
  props: [
    'item'
  ],
  methods: {
    ...mapMutations([
      'addToCart'
    ])
  },
  computed: {
    priceFormat () {
      return `Rp. ${this.item.item_price.toLocaleString()}`
    }
  }
}
</script>

<style>

</style>
