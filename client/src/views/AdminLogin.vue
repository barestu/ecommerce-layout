<template>
  <div class="container-fluid h-100">
    <div class="row justify-content-center h-100">
      <div class="col-lg-3 col-md-6 col-sm-7 col-xs-7 px-3 text-center my-auto">
        <h3 class="text-light m-4 font-weight-bold">Amazonk. <span class="font-weight-normal">| Admin Page</span></h3>
        <form>
          <div class="form-signin">
            <!-- Error -->
            <div v-if="errorMsg" class="alert alert-danger fade show" role="alert">
              <strong>Error!</strong> {{ errorMsg }}
            </div>
            <!-- Login Form -->
            <input type="text" v-model="username" class="form-control mt-2" placeholder="Username">
            <input type="password" v-model="password" class="form-control mt-2" placeholder="Password">
            <button type="submit" @click.prevent="login" class="btn btn-outline-light mt-4 px-5">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Backdoor',
  data () {
    return {
      username: '',
      password: '',
      errorMsg: ''
    }
  },
  methods: {
    ...mapMutations([
      'setLogin'
    ]),
    login () {
      this.$http.post('/user/login', {
        username: this.username,
        password: this.password
      })
        .then(response => {
          console.log('Login success', response)
          localStorage.setItem('token', response.data.token)
          this.setLogin()
          this.errorMsg = ''
          this.$router.push('/admin')
        })
        .catch(error => {
          console.log('Login failed', error)
          this.errorMsg = 'Invalid username/password!'
        })
    }
  }
}
</script>

<style scoped>
.container-fluid {
  background-color: #013243;
}
</style>
