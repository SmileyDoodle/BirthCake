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
          <button class="button is-rounded is-facebook social-button" @click="signupFacebook">
            <span class="icon">
              <i class="fab fa-facebook"></i>
            </span>
            <span>Facebook</span>
          </button>
          <button class="button is-rounded is-google social-button" @click="signupGoogle">
            <span class="icon">
              <i class="fab fa-google"></i>
            </span>
            <span>Google</span>
          </button>
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
import firebase from 'firebase/app'
import 'firebase/auth' 
import 'firebase/firestore'
import 'bulma/css/bulma.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bulma-social/bin/bulma-social.min.css'

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
    },
    signupGoogle() {
        let provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then((result) =>  {
          // This gives you a Google Access Token. You can use it to access the Google API.
          // eslint-disable-next-line no-unused-vars
          let token = result.credential.accessToken;
          // The signed-in user info.
          // eslint-disable-next-line no-unused-vars
          let user = result.user;
          this.$router.push({ path: 'information' });
          // ...
        }).catch(function(error) {
          console.log("tell me the err", error)
          // Handle Errors here.
          // eslint-disable-next-line no-unused-vars
          let errorCode = error.code;
          // eslint-disable-next-line no-unused-vars
          let errorMessage = error.message;
          // The email of the user's account used.
          // eslint-disable-next-line no-unused-vars
          let email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          // eslint-disable-next-line no-unused-vars
          let credential = error.credential;
          // ...
        });
    },
    signupFacebook() {
      
    }
  },
}
</script>

<style>

</style>