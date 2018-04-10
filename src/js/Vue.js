new Vue ({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    categories: [
      'Whey Protein',
      'Gainer Milk',
      'BCAA',
      'Creatine',
      'Fat Burner',
      'Pre-workout',
      'Post-workout',
      'Accessories'
    ],
    items: [
      {
        id: 1,
        name: 'Healing Salve',
        price: 50000,
        image: './src/img/product-placeholder.jpg'
      },{
        id: 2,
        name: 'TP Scroll',
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

    decreaseQty(item) {
      console.log('(-) Qty')
      for (let i in this.cart) {
        if (this.cart[i].id == item.id) {
          let qty = this.cart[i].qty - 1
          if (qty < 1) {
            qty = 1
          }
          this.cart[i].qty = qty
          let newItem = this.cart[i]
          this.cart.splice(i, 1, newItem)
        }
      }
    },

    increaseQty(item) {
      console.log('(+) Qty')
      for (let i in this.cart) {
        if (this.cart[i].id == item.id) {
          let qty = this.cart[i].qty + 1
          this.cart[i].qty = qty
          let newItem = this.cart[i]
          this.cart.splice(i, 1, newItem)
        }
      }
    },

    deleteFromCart(item) {
      for (let i in this.cart) {
        if (this.cart[i].id == item.id) {
          this.cart.splice(i, 1)
        }
      }
    },

    toRp(price) {
      return price = `IDR. ${price.toLocaleString()}`
    },

    subTotal(price, qty) {
      return this.toRp(price * qty);
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