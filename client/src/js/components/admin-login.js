Vue.component('admin-login', {
  name: 'admin-login',
  template: `
  <div class="login-form col-md-6 offset-md-3">
    <div class="text-center pt-4">
      <h1>Admin Page</h1>
    </div>

    <form class="text-center">
      <div class="form-signin mt-3">

        <input type="username" class="form-control" v-model="username" placeholder="Username">
        <input type="password" class="form-control" v-model="password" placeholder="Password">
  
        <div class="mt-4">
          <button type="submit" @click.prevent="login" class="btn btn-primary px-5 font-weight-bold">Login</button>
        </div>

      </div>
    </form>
  </div>
  `,
  props: [],
  data: function() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      console.log(this.username, this.password)

      axios.post('http://localhost:3000/user/login', {
        username: this.username,
        password: this.password
      })
      .then(response => {
        console.log('Login success', response)
        localStorage.setItem('token', response.data.token)
        window.location.href = '/admin-page.html'
      })
      .catch(err => {
        console.log('Login failed', err)
      })
    }
  }
})