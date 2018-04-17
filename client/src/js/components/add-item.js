Vue.component('add-item', {
  name: 'add-item',
  template: `
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
  `,
  props: [],
  data: function() {
    return {
      formData: new FormData(),
      newItem: {
        item_name: '',
        item_price: '',
        img_url: '',
      }
    }
  },
  methods: {
    addItem: function (event) {
      this.onFileChange(event)
      event.target.reset()

      axios.post('http://localhost:3000/item/upload', this.formData)
      .then(response => {
        console.log('upload success', response.data.link)
        this.newItem.img_url = response.data.link

        axios.post('http://localhost:3000/item/add', this.newItem)
        .then(response => {
          console.log('add item success', response)
        })
        .catch(error => {
          console.log('add item failed', error)
        })
      })
      .catch(error => {
        console.log('upload failed', error)
      })
    },

    onFileChange(event) {
      var files = event.target.elements.img_url.files
      // console.log(files[0])
      this.createImage(files[0])
      this.formData.append('image_file', files[0])
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