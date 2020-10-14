<template>
  <header id="header">
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div
          class="navbar-brand" 
          :class="{ 'is-active': showNav, 'do-not-show': ($route.path==='/' || $route.path==='/signup' || $route.path==='/login') }"
        >
            <div class="back-wrap">
                <router-link 
                  to="/information"
                >
                  <img 
                    class="arrow" 
                    src="../assets/images/arrow.svg" 
                    alt="back"  
                    v-if="$route.path !== '/information'"
                  > 
                </router-link>
            </div>
            <div 
            class="navbar-burger" 
            @click="showNav = !showNav" 
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </div>
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
            <a class="navbar-item" @click="redirect()">
              About
            </a>
            <a class="navbar-item" @click="logout()">
              Logout
            </a>
          </div>
        </div>
    </nav>
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
      redirect() {
        this.$router.push('/about')
        this.showNav = !this.showNav
      },
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
  margin-top: 0.5rem;
}
.do-not-show {
  visibility: hidden;
}
.back-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;
}
.navbar-menu {
  position: absolute;
  width: 100%;
  opacity: 0.95;
}
</style>