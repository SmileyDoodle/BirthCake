<template>
  <div id="app">
    <Header></Header>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }

}
</script>

<style>
html {
  overflow-y: auto !important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: grid;
  min-height: 93vh;
  grid-template-rows: auto 1fr auto;
}


a {
  color: #2c3e50;
}
input {
  -webkit-user-select: auto !important;
}
.inputs-button-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem auto;
}
.inputs-button-wrap form {
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
}
.inputs-button-wrap input {
    margin: 0.2rem 0;
}
.inputs-button-wrap button {
    width: 100%;
    margin: 0.2rem 0;
}
.avatar-styling {
    object-fit: cover !important;
    height: 128px !important;
}
.figure {
    display: flex;
    justify-content: center;
    margin: 0 auto;
    background-size: cover;
    background-position: center;
    background-clip: content-box;
    border-radius: 50%;
}


@media only screen and (min-width: 1024px) {
#app {
  min-height: 100vh;
}
}
</style>
