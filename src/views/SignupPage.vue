<template>
  <div class="register columns is-mobile is-centered">
    <div  class="column is-two-thirds">
      <h1>Hello</h1>
      <div class="inputs-button-wrap">
        <form v-if="!secret" autocomplete="off">
          <input
            class="button is-rounded column"
            name="email"
            placeholder="Email"
            v-model="email"
          />
          <input
            class="button is-rounded column"
            name="password"
            type="password"
            placeholder="Password"
            v-model="password"
          />
          <input
            class="button is-rounded column"
            name="password"
            type="password"
            placeholder="Repeat password"
          />
          <button class="button is-rounded" @click="register">Sign up</button>
        </form>
      </div>
      <p>Have an account? <router-link to="/login" class="account">Login</router-link> </p>
      <div v-if="secret" class="secret">
        <p>Use these credentials to login:</p>
        <p> email: john.doe@gmail.com </p>
        <p> password: abc123 </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
  data() {
    return {
      email: "",
      password: "",
      secret: false
    }
  },
  methods: {
    register() {
        this.secret = true;
    }
  },
}
</script>

<style>

</style>