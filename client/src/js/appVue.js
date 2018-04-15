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
        price: 100,
        image: './src/img/product-placeholder.jpg'
      },{
        id: 2,
        name: 'TP Scroll',
        price: 150,
        image: './src/img/product-placeholder.jpg'
      },{
        id: 3,
        name: 'Holy Grail',
        price: 999000,
        image: './src/img/product-placeholder.jpg'
      },{
        id: 4,
        name: 'Radiance',
        price: 3800,
        image: './src/img/product-placeholder.jpg'
      },{
        id: 5,
        name: 'Iron Talon',
        price: 300,
        image: './src/img/product-placeholder.jpg'  
      },{
        id: 6,
        name: 'Platemail',
        price: 1400,
        image: './src/img/product-placeholder.jpg'  
      },{
        id: 7,
        name: 'Mango',
        price: 150,
        image: './src/img/product-placeholder.jpg'  
      },{
        id: 8,
        name: 'Demon Edge',
        price: 2200,
        image: './src/img/product-placeholder.jpg'  
      },{
        id: 9,
        name: 'Hand of Midas',
        price: 1950,
        image: './src/img/product-placeholder.jpg'  
      },{
        id: 10,
        name: 'Aghanim Scepter',
        price: 4200,
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
      return price = `$. ${price.toLocaleString()}`
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