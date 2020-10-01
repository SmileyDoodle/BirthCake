<template>
  <header>
      <div class="navbar-burger" @click="showNav = !showNav" :class="{ 'is-active': showNav }">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
     </div>
     <!--
    Using the v-bind: directive to reactively update the class attribute 'is-active' based on the showNav property.
    -->
    <div 
      class="navbar-menu" 
      :class="{ 'is-active': showNav }"
      v-show="$route.path==='/' || $route.path==='/signup' || $route.path==='/login' ? false : true"  
    >
      <div class="navbar-end">
        <a class="navbar-item">
          About
        </a>
        <a class="navbar-item" @click="logout()">
          Logout
        </a>
      </div>
    </div>
  </header>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export default {
    name: 'Header',
    data() {
    return {
      showNav: false
      }
    },
    methods: {
      logout() {
        firebase.auth().signOut().then(() => {
          // Sign-out successful.
          this.$router.go('/')
        }),
        err => {
            console.log(err);
          }
      }
  }
}
</script>

<style>
#header {
    height: 150px;
}
</style>