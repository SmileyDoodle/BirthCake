<template>
  <div class="login columns is-mobile is-centered">
    <div  class="column is-two-thirds">
      <h1>Hello</h1>
      <div class="inputs-button-wrap">
        <form autocomplete="off">
          <input
            class="button is-rounded column"
            name="email"
            type="email"
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
          <button class="button is-rounded" @click="login" type="button">Login</button>
          <button class="button is-rounded is-facebook social-button" @click="signinFacebook" type="button">
            <span class="icon">
              <i class="fab fa-facebook"></i>
            </span>
            <span>Facebook</span>
          </button>
          <button class="button is-rounded is-google social-button" @click="signinGoogle" type="button"> 
            <span class="icon">
              <i class="fab fa-google"></i>
            </span>
            <span>Google</span>
          </button>
        </form>
      </div>
      <p>Need an account? <router-link to="/signup" class="account">Sign up</router-link></p>
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
  name: 'LoginPage',
  data() {
    return {
      email: "",
      password: "",
    }
  },
  methods: {
    login() {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
          // Existing and future Auth states are now persisted in the current
          // session only. Closing the window would clear any existing state even
          // if a user forgets to sign out.
          // ...
          // New sign-in will be persisted with session persistence.
          return firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .catch(err => {
              console.log("login err", err);
            })
        })
        .catch(err => {
              console.log("firebase err", err);
            })
    },
    signinGoogle() {
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    },
    signinFacebook() {
      let provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
          this.$router.push({ path: 'information' });
        } else {
          console.log("err");
        }
      })
    },
    mounted() {
    firebase.auth().getRedirectResult().then((result) => {
          if (result.credential) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            // eslint-disable-next-line no-unused-vars
            var token = result.credential.accessToken;
            console.log('token ', token);
            console.log('result.user ', result.user);
            // ...            
            this.$router.push({ path: 'information' });
          }
          // The signed-in user info.
          // eslint-disable-next-line no-unused-vars
          var user = result.user;
        }).catch(function(error) {
            console.log('error ', error);
          // Handle Errors here.
          // eslint-disable-next-line no-unused-vars
          var errorCode = error.code;
          // eslint-disable-next-line no-unused-vars
          var errorMessage = error.message;
          // The email of the user's account used.
          // eslint-disable-next-line no-unused-vars
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          // eslint-disable-next-line no-unused-vars
          var credential = error.credential;
          // ...
        });
  }
}
</script>

<style>
.is-facebook {
  margin-top: 1rem !important;
}
.is-google {
  color: #fff;
  background-color: #4285F4;
}
</style>
