<template>
  <tr class="align-top">
    <th scope="row">{{ index + 1 }}</th>
    <td>
      <img :src="item.img_url" alt="N/A" style="height: 55px;">
    </td>
    <td>{{ item.item_name }}</td>
    <td>{{ item.item_stock }}</td>
    <td>{{ item.item_category }}</td>
    <td>{{ priceFormat }}</td>
    <td>
      <button class="btn btn-sm m-1" data-toggle="modal" :data-target="targetUpdate">
        <span class="fa fa-edit"></span>
      </button>
      <button @click="deleteItems(item)" class="btn btn-sm m-1">
        <span class="fa fa-trash"></span>
      </button>
    </td>

    <!-- Modal -->
    <div class="modal modal fade" :id="idUpdate" tabindex="-1" role="dialog" aria-labelledby="ModalUpdate" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Update Item Data</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-left">
            <form @submit.prevent="updateItemEvent" class="px-5 border rounded">
              <div class="form-group my-4">
                <label>Name</label>
                <input type="text" class="form-control" v-model="updateData.item_name" placeholder="Item name">
              </div>
              <div class="form-group">
                <label>Price</label>
                <input type="text" class="form-control" v-model="updateData.item_price" placeholder="Item price">
              </div>
              <div class="form-group col-3 px-0">
                <label>Stock</label>
                <input type="text" class="form-control" v-model="updateData.item_stock">
              </div>
              <div class="form-group">
                <label>Category</label>
                <select class="custom-select" v-model="updateData.item_category">
                  <option v-for="(category, index) in categories" :key="index" :value="category">{{ category }}</option>
                </select>
              </div>
              <div class="form-group">
                <label>Image</label>
                <div v-if="updateData.img_url">
                  <img :src="updateData.img_url" style="height: 75px;"/>
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
        </div>
      </div>
    </div>
  </tr>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ItemList',
  data () {
    return {
      targetUpdate: `#modal${this.item._id}`,
      idUpdate: `modal${this.item._id}`,
      formData: new FormData(),
      updateData: {
        _id: this.item._id,
        item_name: this.item.item_name,
        item_price: this.item.item_price,
        item_category: this.item.item_category,
        item_stock: this.item.item_stock,
        img_url: this.item.img_url
      },
      errorMsg: ''
    }
  },
  props: [
    'item',
    'index'
  ],
  methods: {
    ...mapActions([
      'deleteItems'
    ]),
    updateItemEvent () {
      let files = event.target.elements.img_url.files

      if (files.length !== 0) {
        this.createImage(event)
        event.target.reset()
        this.$store.dispatch('uploadImage', this.formData)
        this.updateData.img_url = this.tempImgUrl
        setTimeout(() => {
          this.$store.dispatch('updateItems', this.updateData)
        }, 500)
      } else {
        this.$store.dispatch('updateItems', this.updateData)
      }

      this.$store.dispatch('getItems')
    },
    createImage (event) {
      let files = event.target.elements.img_url.files
      let reader = new FileReader()

      reader.onload = (e) => {
        this.updateData.img_url = e.target.result
      }
      reader.readAsDataURL(files[0])
      this.formData.append('image_file', files[0])
    },
    clearForm () {
      this.updateData.item_name = ''
      this.updateData.item_price = ''
      this.updateData.item_category = ''
      this.updateData.item_stock = ''
      this.updateData.img_url = ''
      this.$store.dispatch('getItems')
    }
  },
  computed: {
    ...mapState([
      'categories',
      'tempImgUrl'
    ]),
    priceFormat () {
      return `Rp. ${this.item.item_price.toLocaleString()}`
    }
  }
}
</script>

<style>

</style>
