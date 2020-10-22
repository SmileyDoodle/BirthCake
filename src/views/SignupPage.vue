<template>
  <div class="register columns is-mobile is-centered">
    <div  class="column is-two-thirds">
      <div class="inputs-button-wrap">
         <div class="desktop-signup-wrap">
          <div class="secret">
            <p>Use these credentials to login:</p>
            <p> <strong>email:</strong> john.doe@gmail.com </p>
            <p> <strong>password:</strong> abc123 </p>
          </div>
          <button class="button is-facebook social-button" @click="signupFacebook">
            <span class="icon">
              <i class="fab fa-facebook"></i>
            </span>
            <span>Facebook</span>
          </button>
          <button class="button is-google social-button" @click="signupGoogle">
            <span class="icon">
              <i class="fab fa-google"></i>
            </span>
            <span>Google</span>
          </button>
         </div>
      </div>
      <p>Have an account? <router-link to="/login" class="account">Login</router-link> </p>
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
    }
  },
  methods: {
    register() {
        this.secret = true;
    },
    signupGoogle() {
       var provider = new firebase.auth.GoogleAuthProvider();
       firebase.auth().signInWithRedirect(provider);
    },
    signupFacebook() {
      let provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    }
  },
  mounted() {
    firebase.auth().getRedirectResult().then((result) => {
          if (result.credential) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            // eslint-disable-next-line no-unused-vars
            var token = result.credential.accessToken;
            // ...
            console.log('token ', token);
            console.log('result.user ', result.user);
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
.secret {
  margin: 2rem 0;
}
.is-google {
  color: #fff;
  background-color: #4285F4;
}
.is-google:hover {
  color: #fff;
}
.account {
  color: #3a5184;
}


@media only screen and (min-width: 1024px) {
.desktop-signup-wrap {
  width: 30%;
}
}
</style>