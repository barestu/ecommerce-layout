Vue.component('item-list', {
  name: 'item-list',
  template: `
  <table class="table">
    <thead>
      <tr>
        <th>Item Image</th>
        <th>Item Name</th>
        <th>Item Category</th>
        <th>Item Price</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in itemList">
        <td>
          <img :src="item.img_url" style="width: 75px;" />
        </td>
        <td>{{ item.item_name }}</td>
        <td>category-added-here</td>
        <td>{{ item.item_price }}</td>
      </tr>
    </tbody>
  </table>
  `,

  props: [],
  data: function () {
    return {
      itemList: []
    }
  },

  methods: {
    showAllItem: function () {
      itemList: []

      axios.get('http://localhost:3000/item/')
      .then(response => {
        console.log('show all item', response.data.data)
        response.data.data.forEach(item => {
          this.itemList.push(item)
        })
      })
      .catch(error => {
        console.log('no result', error)
      })
    }
  },

  mounted: function () {
    this.$nextTick(function () {
      this.showAllItem()
    })
  }
})