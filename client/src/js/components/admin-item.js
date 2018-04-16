Vue.component('admin-item', {
  name: 'admin-item',
  template: `
  <div class="container-fluid px-2 pt-3">
    <div class="row mx-0">
      <div class="col-3">
        <h1>Add Item</h1>
        <form @submit.prevent="addItem">
          <div>
            <label>Name</label>
            <input type="text" v-model="newItem.item_name" name="item_name" id="">
          </div>
          <div>
            <label>Price</label>
            <input type="text" v-model="newItem.item_price" name="item_price" id="">
          </div>
          <div>
            <label>Image</label><br>
            <div v-if="newItem.img_url">
              <img :src="newItem.img_url" style="height: 75px;"/>
            </div>
            <input type="file" name="img_url" value="">
          </div>
          <br>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>

      <div class="col-9">
        <h1>Table</h1>
      </div>
    </div>
  </div>
  `,
  props: [],
  data: function() {
    return {
      newItem: {
        item_name: '',
        item_price: '',
        img_url: '',
      }
    }
  },
  methods: {
    addItem: function (event) {
      console.log('clicked', this.newItem)
      this.onFileChange(event)

      event.target.reset()
    },

    onFileChange(event) {
      var files = event.target.elements.img_url.files
      console.log(files[0])
      this.createImage(files[0])
    },

    createImage(file) {
      var image = new Image()
      var reader = new FileReader()
      reader.onload = (e) => {
        this.newItem.img_url = e.target.result;
      };
      reader.readAsDataURL(file)
    },
  }
})