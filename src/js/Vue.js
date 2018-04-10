new Vue ({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    items: [
      {
        id: 1,
        name: 'Produk Bagus 1',
        price: 50000,
        image: './src/img/product-placeholder.jpg'
      },{
        id: 2,
        name: 'Produk Biasa 2',
        price: 32000,
        image: './src/img/product-placeholder.jpg'
      },{
        id: 3,
        name: 'Holy Grail',
        price: 120000,
        image: './src/img/product-placeholder.jpg'
      },{
        id: 4,
        name: 'Radiance',
        price: 38000,
        image: './src/img/product-placeholder.jpg'
      },{
        id: 5,
        name: 'Iron Talon',
        price: 3000,
        image: './src/img/product-placeholder.jpg'  
      }
    ],
    cart: [],
    total: 0,
  },
  methods: {
    addToCart(item) {
      console.log('Add to cart')
      let index = this.cart.findIndex(cartItem => cartItem.id == item.id)

      if (index == -1) {
        item.qty = 1
        this.cart.push(item)
      } else {
        let qty = this.cart[index].qty + 1
        this.cart[index].qty = qty
        newItem = this.cart[index]
        this.cart.splice(index, 1, newItem)
      }
    },

    toRp(price) {
      return price = `Rp. ${price.toLocaleString()}`
    },

    subTotal(price, qty) {
      return price * qty;
    }
  },
  computed: {
    grandTotal() {
      let total = 0;
      this.cart.forEach(item => {
        total += item.price * item.qty
      });

      return this.toRp(total)
    }
  }
})