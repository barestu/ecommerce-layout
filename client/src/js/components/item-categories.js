Vue.component('item-categories', {
  name: 'item-categories',
  template: `
  <div class="row d-flex flex-row p-0 m-0">
    <div class="py-0 col-md-12 col-sm-6 col-xs-6 border" v-for="category in categories">
      <a href="#">{{ category }}</a>
    </div>
  </div>
  `,
  props: ['categories']
})