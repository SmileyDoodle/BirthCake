<template>
  <div class="login columns is-mobile is-centered">
    <div  class="column is-two-thirds">
      <div class="desktop-login-wrap">
        <div class="error-msg">
          <p v-if="err">Wrong credentials</p>
        </div>
        <div class="inputs-button-wrap">
          <form autocomplete="off" class="login-form">
            <input
              class="button column login-input"
              name="email"
              type="email"
              placeholder="Email"
              v-model="email"
            />
            <input
              class="button column login-input"
              name="password"
              type="password"
              placeholder="Password"
              v-model="password"
            />
            <button class="button btn-colour" @click="login" type="button">Login</button>
            <button class="button is-facebook social-button" @click="signinFacebook" type="button">
              <span class="icon">
                <i class="fab fa-facebook"></i>
              </span>
              <span>Facebook</span>
            </button>
            <button class="button is-google social-button" @click="signinGoogle" type="button"> 
              <span class="icon">
                <i class="fab fa-google"></i>
              </span>
              <span>Google</span>
            </button>
          </form>
        </div>
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
      err: false,
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
            .then((result) => {
              if (result.user) {
                this.$router.push({ path: 'information' });
              }
            })
            .catch(() => {
              this.err = true;
              setTimeout(()=>{
                this.err = false
              }, 1000)
            })
        })
        .catch(() => {
              console.log("err");
            })
    },
    auth() {
      firebase.auth().getRedirectResult().then((result) => {
            if (result.credential) {
              // This gives you a Google Access Token. You can use it to access the Google API.
              // eslint-disable-next-line no-unused-vars
              var token = result.credential.accessToken;          
              this.$router.push({ path: 'information' });
            }
            // The signed-in user info.
            // eslint-disable-next-line no-unused-vars
            var user = result.user;
          }).catch(() => {
              console.log("err");
          });
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
  mounted() {
      this.auth();
  }
}
</script>

<style>
.error-msg {
  height: 1rem;
  font-size: 0.7rem;
  color: red;
}
.inputs-button-wrap {
  margin-top: 0.3rem;
}
.login-form {
  width: 85%;
}
.login-input {
  width: 100%;
}
.btn-colour {
    background-color: #3a5184;
    color: #fff;
}
.btn-colour:hover {
  color: #fff;
}
.is-facebook {
  margin-top: 1rem !important;
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
.desktop-login-wrap {
  width: 30%;
  margin: 0 auto;
}
.login-form {
  width: 100%;
}
}
</style>
