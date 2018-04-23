import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert'
let baseUrl = 'http://localhost:3000'
let token = localStorage.getItem('token')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    cart: [],
    items: [],
    tempImgUrl: '',
    categories: [
      'Whey Protein',
      'Gainer',
      'Post-workout',
      'Pre-workout',
      'Creatine',
      'Fat Burner',
      'BCAA',
      'Amino Acid',
      'Accessories'
    ]
  },
  getters: {
  },
  mutations: {
    setItem (state, items) {
      state.items = items
    },

    setLogin (state) {
      state.isLogin = true
    },

    setLogout (state) {
      state.isLogin = false
    },

    addToCart (state, data) {
      let index = state.cart.findIndex(cartItem => cartItem._id === data._id)

      if (index === -1) {
        data.qty = 1
        state.cart.push(data)
      } else {
        let qty = state.cart[index].qty += 1
        state.cart[index].qty = qty
        let newData = state.cart[index]
        state.cart.splice(index, 1, newData)
      }
    },

    deleteFromCart (state, data) {
      state.cart.map((item, index) => {
        if (item._id === data._id) {
          state.cart.splice(index, 1)
        }
      })
    },

    increaseQty (state, data) {
      state.cart.map((item, index) => {
        if (item._id === data._id) {
          let qty = state.cart[index].qty += 1
          if (qty < 1) {
            qty = 1
          }
          state.cart[index].qty = qty
          let newData = state.cart[index]
          state.cart.splice(index, 1, newData)
        }
      })
    },

    decreaseQty (state, data) {
      state.cart.map((item, index) => {
        if (item._id === data._id) {
          let qty = state.cart[index].qty -= 1
          if (qty < 1) {
            qty = 1
          }
          state.cart[index].qty = qty
          let newData = state.cart[index]
          state.cart.splice(index, 1, newData)
        }
      })
    },

    addItem (state, data) {
      state.items.push(data)
      swal('Add item success!', ``, 'success')
    },

    updateItem (state, data) {
      state.items.map((item, index) => {
        if (item._id === data._id) {
          state.items.splice(index, 1, data)
          swal('Update data success!', ``, 'success')
        }
      })
    },

    setTempImgUrl (state, data) {
      state.tempImgUrl = data
    },

    deleteItem (state, data) {
      state.items.map((item, index) => {
        if (item._id === data._id) {
          state.items.splice(index, 1)
          swal('Delete data success!', ``, 'success')
        }
      })
    }

  },
  actions: {
    getItems: ({ commit }) => {
      axios.get(`${baseUrl}/item`)
        .then(response => {
          commit('setItem', response.data.data)
        })
        .catch(error => {
          console.log('no result', error)
        })
    },

    addItems: ({ commit }, payload) => {
      // Upload image first
      axios.post(`${baseUrl}/item/upload`, payload.formData, {
        headers: { token }
      })
        .then(response => {
          console.log('upload image success', payload.newItem, response)
          payload.newItem.img_url = response.data.link
          // Add item to DB
          axios.post(`${baseUrl}/item/add`, payload.newItem, {
            headers: { token }
          })
            .then(response => {
              console.log('add item success', response)
              commit('addItem', payload.newItem)
            })
            .catch(error => {
              console.log('add failed', error)
            })
        })
        .catch(error => {
          console.log('failed upload image', error)
        })
    },

    updateItems: ({ commit }, data) => {
      axios.put(`${baseUrl}/item/update/${data._id}`, data, {
        headers: { token }
      })
        .then(response => {
          console.log('update data success', response)
          commit('updateItem', data)
        })
        .catch(error => {
          console.log('update failed', error)
        })
    },

    uploadImage: ({ commit }, data) => {
      axios.post(`${baseUrl}/item/upload`, data, {
        headers: { token }
      })
        .then(response => {
          console.log('upload image success', response)
          commit('setTempImgUrl', response.data.link)
        })
        .catch(error => {
          console.log('upload image failed', error)
        })
    },

    deleteItems: ({ commit }, data) => {
      swal({
        title: 'Delete?',
        text: 'Are you sure want to delete this item?',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then((willDelete) => {
          if (willDelete) {
            axios.delete(`${baseUrl}/item/delete/${data._id}`, {
              headers: { token }
            })
              .then(response => {
                commit('deleteItem', data)
              })
              .catch(error => {
                console.log('delete failed', error)
              })
          }
        })
    }
  }
})
