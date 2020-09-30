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
          <button class="button is-rounded">Login</button>
        </form>
      </div>
      <p>Need an account? <router-link to="/signin" class="account">Sign in</router-link></p>
    </div>
  </div>
</template>

<script>
// import firebase from 'firebase/app'
// import 'firebase/auth' 
// import 'firebase/firestore'

export default {
  name: 'LoginPage',
  data() {
    return {
      email: "",
      password: "",
    }
  },
  methods: {
//     login() {
//       firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
//         .then(() => {
//           // Existing and future Auth states are now persisted in the current
//           // session only. Closing the window would clear any existing state even
//           // if a user forgets to sign out.
//           // ...
//           // New sign-in will be persisted with session persistence.
//           return firebase.auth().signInWithEmailAndPassword(this.email, this.password)
//         })
//         .catch(err => {
//               console.log(err);
//             })
//     }
//   },
//   created() {
//     firebase.auth().onAuthStateChanged(user => {
//       if (user) {
//         if (window.localStorage.getItem('date') === null || window.localStorage.getItem('day') === null) {
//           this.$router.push({ path: 'edit' });
//         } else {
//           this.$router.push({ path: 'information' });
//         }
//       }
//     })
  }
}
</script>

<style>
.inputs-button-wrap {
    display: flex;
    justify-content: center;
    margin: 2rem 0;
}
.inputs-button-wrap input {
    margin: 0.5rem 0;
}
.inputs-button-wrap button {
    width: 100%;
}
</style>
